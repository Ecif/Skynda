package me.skynda.common.interfaces.daos;

import me.skynda.common.db.SkyndaBaseEntityDao;
import me.skynda.vehicle.dto.VehicleReportItemDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleReportCategory;

import java.util.List;

/**
 * Created by jevgenir on 11/20/2016.
 */
public interface VehicleReportItemDao extends SkyndaBaseEntityDao<VehicleReportCategory> {
    void addMultipleToVehicle(Vehicle addedVehicle, List<VehicleReportItemDto> reportItems);
}