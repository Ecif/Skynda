package me.skynda.vehicle.service;

import me.skynda.vehicle.dto.VehicleModelDto;
import me.skynda.vehicle.dto.request.VehicleModelRequestDto;
import me.skynda.vehicle.dto.response.VehicleModelResponseDto;
import me.skynda.vehicle.entity.VehicleModel;

import java.util.List;

public interface VehicleModelService {
    /**
     * Gets all data from the database
     * @return all vehicle models
     */
    List<VehicleModelResponseDto> get(VehicleModelRequestDto dto);

    /**
     * Adds new vehicle model
     * E.g. BMW
     * @param vehicleModelDto Added vehicle model's dto
     * @return Added vehicle model's db model
     */
    VehicleModel save(VehicleModelDto vehicleModelDto);
}
