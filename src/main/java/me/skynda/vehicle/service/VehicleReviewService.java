package me.skynda.vehicle.service;

import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleAdminDto;
import me.skynda.vehicle.dto.VehicleReportAdminDto;
import me.skynda.vehicle.dto.VehicleReviewAdminDto;
import org.springframework.validation.BindingResult;

import java.util.List;

/**
 * Created by jevgenir on 11/14/2016.
 */
public interface VehicleReviewService {
    List<VehicleReviewAdminDto> getAll();

    VehicleReviewAdminDto getSingleBy(Long id);

    CreateOrUpdateResponseDto createOrUpdate(VehicleReportAdminDto dto, BindingResult bindingResult);

    DeleteResponseDto delete(Long id);

}
