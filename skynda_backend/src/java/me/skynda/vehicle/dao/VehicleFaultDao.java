package me.skynda.vehicle.dao;

import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.interfaces.daos.IImageDao;
import me.skynda.common.db.BaseEntityDao;
import me.skynda.common.interfaces.daos.IVehicleFaultDao;
import me.skynda.vehicle.dto.FaultBaseDto;
import me.skynda.vehicle.dto.ImageDto;
import me.skynda.image.entities.Image;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleFault;
import me.skynda.vehicle.entities.VehicleReportItem;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Repository
public class VehicleFaultDao extends BaseEntityDao<VehicleFault> implements IVehicleFaultDao {

    @Autowired
    private IImageDao imageDao;



    @Override
    public List<VehicleFault> getCategoryFaults(Integer categoryId) {
        Session session = getSession();
        List items = null;

        try {
            Query query = session.createQuery("SELECT item FROM VehicleFault as item " +
                    "WHERE item.reportCategoryId = :categoryId " +
                    "AND item.archived IS NULL")
                    .setParameter("categoryId", categoryId);
            items = query.list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return items;
    }

    @Override
    public void deleteEntity(VehicleFault fault, DeleteResponseDto response) {
        Transaction tx = null;
        Session session = getSession();
        Date now = new Date();
        try {
            tx = session.beginTransaction();
            int queryResponse = session
                    .createQuery(
                            "UPDATE VehicleFault " +
                                    "SET archived = :archived " +
                                    "WHERE id = :id AND vehicle_report_category_id = :categoryId")
                    .setParameter("archived", now)
                    .setParameter("id", fault.getId())
                    .setParameter("categoryId", fault.getReportCategoryId())

                    .executeUpdate();

            if (queryResponse < 1) {
                throw new Exception("Vehicle Report Item Delete failed: No such item found.");
            }

            tx.commit();
            response.setSuccess(true);
        } catch (Exception e) {
            e.printStackTrace();
            response.setError(e.getMessage());
            response.setSuccess(false);
            assert tx != null;
            tx.rollback();
        }
    }

    @Override
    public VehicleFault saveOrUpdate(VehicleFault vehicleFault) {
        Transaction tx = null;
        Session session = getSession();
        try {
            tx = session.beginTransaction();

            if (vehicleFault.getId() == null) {
                session.save(vehicleFault);
            } else {
                VehicleFault existingItem =
                        (VehicleFault) session.createQuery("SELECT item FROM VehicleFault as item " +
                                "WHERE item.id = :id AND item.reportCategoryId = :categoryId " +
                                "AND item.archived IS NULL")
                                .setParameter("id", vehicleFault.getId())
                                .setParameter("categoryId", vehicleFault.getReportCategoryId())
                                .uniqueResult();

                if (existingItem == null) {
                    throw new Exception("Vehicle Fault is null");
                }

                existingItem.setText(vehicleFault.getText());
                existingItem.setImage(vehicleFault.getImage());
                existingItem.setReportCategoryId(vehicleFault.getReportCategoryId());

                session.update(existingItem);

                vehicleFault = existingItem;
            }

            tx.commit();
        } catch (Exception e) {
            if(tx != null) tx.rollback();
            e.printStackTrace();
        }

        return vehicleFault;
    }

    @Override
    public List getActiveFaults(Serializable reportCategoryId) {
        Session session = getSession();
        try {

            Criteria faults = session.createCriteria(VehicleFault.class, "item")
                    .add(Restrictions.eq("reportCategoryId", reportCategoryId))
                    .add(Restrictions.isNull("archived"));

            return faults.list();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

}
