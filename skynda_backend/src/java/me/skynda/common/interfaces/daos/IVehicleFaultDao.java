package me.skynda.common.interfaces.daos;

import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.FaultBaseDto;
import me.skynda.vehicle.entities.Vehicle;
import me.skynda.vehicle.entities.VehicleFault;
import me.skynda.common.db.SkyndaBaseEntityDao;

import java.io.Serializable;
import java.util.List;

public interface IVehicleFaultDao extends SkyndaBaseEntityDao<VehicleFault> {
    List<VehicleFault> getCategoryFaults(Integer categoryId);
    void deleteEntity(VehicleFault fault, DeleteResponseDto response);
    VehicleFault saveOrUpdate(VehicleFault vehicleFault);
    List getActiveFaults(Serializable reportCategoryId);
}
