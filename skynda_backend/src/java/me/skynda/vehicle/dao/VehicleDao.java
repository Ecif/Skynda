package me.skynda.vehicle.dao;

import me.skynda.classification.dto.ButtonAttributesDto;
import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.entities.Vehicle;
import me.skynda.common.helper.CastHelper;
import me.skynda.common.helper.JsonHelper;
import me.skynda.common.interfaces.daos.*;
import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.common.entities.Vehicle;
import org.dozer.Mapper;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.validation.Errors;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class VehicleDao extends BaseEntityDao<Vehicle> implements IVehicleDao {

    private final IVehicleReportDao reportDao;
    private final IVehicleReviewDao reviewDao;
    private final IVehicleFeatureDao vehicleFeatureDao;
    private final Mapper mapper;

    private static Logger logger = LoggerFactory.getLogger(VehicleDao.class);

    @Autowired
    public VehicleDao(IVehicleReportDao reportDao,IVehicleReviewDao reviewDao,
                      IVehicleFeatureDao vehicleFeatureDao, Mapper mapper) {
        this.reportDao = reportDao;
        this.reviewDao = reviewDao;
        this.vehicleFeatureDao = vehicleFeatureDao;
        this.mapper = mapper;
    }

    @Override
    public Vehicle get(Serializable id) {
        return get(id, true);
    }

    @Override
    public Vehicle get(Serializable id, Boolean isActive) {
        Session session = getSession();
        Vehicle queryResponse = null;
        List reports = null;
        List reviews = null;
        List features = null;

        try {
            Criteria vehicleCriteria = session
                    .createCriteria(Vehicle.class, "vehicle");

            vehicleCriteria.add(Restrictions.eq("id", id));

            if(isActive){
                vehicleCriteria.add(Restrictions.isNull("archived"));
                reports = reportDao.getAllBy(id);
                reviews = reviewDao.getAllBy(id);
                features = vehicleFeatureDao.getAllBy(id);
            }

            queryResponse = (Vehicle) vehicleCriteria.uniqueResult();

            if(queryResponse != null && isActive){
                queryResponse.setReportCategories(reports);
                queryResponse.setReviews(reviews);
                queryResponse.setVehicleFeatures(features);
            }

        } catch (Exception e) {
            logger.error("get failed. id: " + JsonHelper.toJson(id) + ", isActive: " + isActive, e);
            e.printStackTrace();
        }

        return queryResponse;
    }

    @Override
    public void deleteEntity(Vehicle vehicle, DeleteResponseDto response) {
        Transaction tx = null;
        Session session = getSession();
        Date now = new Date();
        try {
            tx = session.beginTransaction();
            int queryResponse = session
                    .createSQLQuery(
                            "UPDATE vehicle " +
                                    "SET archived = :archived " +
                                    "WHERE id = :id")
                    .setParameter("archived", now)
                    .setParameter("id", vehicle.getId())
                    .executeUpdate();

            if (queryResponse < 1) {
                Exception exception = new Exception("Vehicle Delete failed: No such item found.");
                logger.error("deleteEntity failed. ", exception);
                throw exception;
            }

            tx.commit();
            response.setSuccess(true);

        } catch (Exception e) {
            logger.error("deleteEntity failed. ", e);
            e.printStackTrace();
            response.setError(e.getMessage());
            response.setSuccess(false);

            assert tx != null;
            tx.rollback();
        }
    }

    @Override
    public List<Vehicle> search(SearchRequestDto params) {
        try{
            Session session = getSession();
            Criteria vehicleCriteria = session
                    .createCriteria(Vehicle.class, "vehicle")
                    .createAlias("model", "model");

            if (params.Models != null && !params.Models.isEmpty()) {
                Collection<Integer> modelList = params.Models.stream()
                        .map(ButtonAttributesDto::getValue)
                        .collect(Collectors.toCollection(ArrayList::new));
                vehicleCriteria.add(Restrictions.in("model.id", modelList));
            }
            else if (params.Brands != null && !params.Brands.isEmpty()) {
                Collection<Integer> brandList = params.Brands.stream()
                        .map(ButtonAttributesDto::getValue)
                        .collect(Collectors.toCollection(ArrayList::new));
                vehicleCriteria.createAlias("vehicle.model.vehicleManufacturer", "manufacturer");
                vehicleCriteria.add(Restrictions.in("manufacturer.id", brandList));
            }

            // TODO: Color outside search
            ////Vehicle outside color
            if (params.Colors != null && !params.Colors.isEmpty()) {
                Collection<String> colorList = params.Colors.stream()
                        .map(ButtonAttributesDto::getValue)
                        .map(this::mapColorIdToHex)
                        .filter(hex -> !Objects.equals(hex, ""))
                        .collect(Collectors.toCollection(ArrayList::new));
                vehicleCriteria.add(Restrictions.in("vehicle.colorOutsideHex", colorList));
            }

            //Vehicle feature
            if (params.Features != null && !params.Features.isEmpty()) {
                Collection<Integer> featureList = params.Features.stream()
                        .map(ButtonAttributesDto::getValue)
                        .collect(Collectors.toCollection(ArrayList::new));
                vehicleCriteria.createAlias("vehicle.features", "vehicleFeature");
                vehicleCriteria.add(Restrictions.in("vehicleFeature.feature.id", featureList));
            }
            ////Doors
            if (params.Doors != null && !params.Doors.isEmpty()) {
                ArrayList<Integer> doorValues = params.Doors.stream()
                                .map(ButtonAttributesDto::getValue)
                                .collect(Collectors.toCollection(ArrayList::new));
                Integer doors = Collections.min(doorValues);
                vehicleCriteria.add(Restrictions.ge("model.doors", doors));
            }

            if (params.Seats != null && !params.Seats.isEmpty()) {
                ArrayList<Integer> seatValues = params.Seats.stream()
                        .map(ButtonAttributesDto::getValue)
                        .collect(Collectors.toCollection(ArrayList::new));
                Integer seats = Collections.min(seatValues);
                vehicleCriteria.add(Restrictions.ge("model.seats", seats));
            }
            ////Transmission type(classification)
            if (params.Transmission != null && !params.Transmission.isEmpty()) {
                Collection<Integer> transmissionList = params.Transmission.stream()
                        .map(ButtonAttributesDto::getValue)
                        .collect(Collectors.toCollection(ArrayList::new));
                vehicleCriteria.createAlias("vehicle.model.transmission", "transmission");
                vehicleCriteria.add(Restrictions.in("transmission.id", transmissionList));
            }

            if (params.FuelType != null && !params.FuelType.isEmpty()) {
                Collection<Integer> fuelTypeList = params.FuelType.stream()
                        .map(ButtonAttributesDto::getValue)
                        .collect(Collectors.toCollection(ArrayList::new));
                vehicleCriteria.createAlias("vehicle.model.fuelType", "fuelType");
                vehicleCriteria.add(Restrictions.in("fuelType.id", fuelTypeList));
            }

            if (params.Mileage != null) {
            BigDecimal[] values = CastHelper.AttributesToBigDecimal(params.Mileage);
                Criterion conjunction = Restrictions.conjunction()
                        .add(Restrictions.ge("vehicle.mileage", values[0]))
                        .add(Restrictions.le("vehicle.mileage", values[1]));
                vehicleCriteria.add(conjunction);
            }

            if (params.Price != null) {
                BigDecimal[] values = CastHelper.AttributesToBigDecimal(params.Price);
                Criterion conjunction = Restrictions.conjunction()
                        .add(Restrictions.ge("vehicle.price", values[0]))
                        .add(Restrictions.le("vehicle.price", values[1]));
                vehicleCriteria.add(conjunction);
            }

            if (params.Year != null) {
                Criterion conjunction = Restrictions.conjunction()
                        .add(Restrictions.ge("model.year", params.Year.getMin().intValue()))
                        .add(Restrictions.le("model.year", params.Year.getMax().intValue())) ;
                vehicleCriteria.add(conjunction);
            }

            if (params.PetrolConsumption != null) {
                BigDecimal[] values = CastHelper.AttributesToBigDecimal(params.PetrolConsumption);

                Criterion disjunctionMin = Restrictions.disjunction()
                        .add(Restrictions.ge("vehicle.fuelCity", values[0]))
                        .add(Restrictions.ge("vehicle.fuelHighway", values[0]));

                Criterion disjunctionMax = Restrictions.disjunction()
                        .add(Restrictions.le("vehicle.fuelCity", values[1]))
                        .add(Restrictions.le("vehicle.fuelHighway", values[1]));

                Criterion petrolCriterion = Restrictions.conjunction()
                        .add(disjunctionMin)
                        .add(disjunctionMax);
                vehicleCriteria.add(petrolCriterion);
            }

            if (params.Power != null) {
                Criterion conjunction = Restrictions.conjunction()
                        .add(Restrictions.ge("model.horsePower", params.getPower().getMin().intValue()))
                        .add(Restrictions.le("model.horsePower", params.getPower().getMax().intValue())) ;
                vehicleCriteria.add(conjunction);
            }

            List<Vehicle>  result = (ArrayList<Vehicle>) vehicleCriteria.list();

            return result;

        }catch (Exception ex){
            logger.error("search failed. params: " + JsonHelper.toJson(params), ex);
            throw ex;
        }
    }

    @Override
    public Vehicle saveOrUpdate(Vehicle vehicle, Errors bindingResult) {
        Transaction tx = null;
        Session session = getSession();
        try {
            tx = session.beginTransaction();

            if (vehicle.getId() == null) {
                session.save(vehicle);
            } else {
                Criteria existingCriteria = session.createCriteria(Vehicle.class, "vehicle")
                        .add(Restrictions.eq("id", vehicle.getId()))
                        .add(Restrictions.isNull("archived"));

                Vehicle existingItem = (Vehicle) existingCriteria.uniqueResult();

                if (existingItem == null) {
                    throw new Exception("Vehicle is null");
                }

                existingItem = mapper.map(vehicle, Vehicle.class);

                session.update(existingItem);

                vehicle = existingItem;
            }

            tx.commit();
        } catch (Exception e) {
            if(tx != null)
                tx.rollback();

            logger.error("saveOrUpdate failed. vehicle: " + JsonHelper.toJson(vehicle), e);
            bindingResult.rejectValue("saveOrUpdateFailed", e.getMessage());
            e.printStackTrace();
            vehicle = null;
        }

        return vehicle;
    }


    private String mapColorIdToHex(Integer colorId) {
        switch (colorId) {
            case 1:  return "#f44336";
            case 2:  return "#e91e63";
            case 3:  return "#9c27b0";
            case 4:  return "#673ab7";
            case 5:  return "#3f51b5";
            case 6:  return "#2196f3";
            case 7:  return "#03a9f4";
            case 8:  return "#00bcd4";
            case 9:  return "#009688";
            case 10: return "#4caf50";
            case 11: return "#8bc34a";
            case 12: return "#cddc39";
            case 13: return "#ffeb3b";
            case 14: return "#ffc107";
            case 15: return "#ff9800";
            case 16: return "#ff5722";
            case 17: return "#795548";
            case 18: return "#607d8b";
            default: return "";
        }
    }
}


