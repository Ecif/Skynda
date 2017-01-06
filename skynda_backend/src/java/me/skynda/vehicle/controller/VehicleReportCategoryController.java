package me.skynda.vehicle.controller;

import me.skynda.common.controller.BaseController;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.vehicle.dto.VehicleReportCategoryAdminDto;
import me.skynda.common.interfaces.services.VehicleReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by jevgenir on 11/14/2016.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api")
public class VehicleReportCategoryController extends BaseController {

    @Autowired
    private VehicleReportService service;

    @RequestMapping(value = "/vehicle-reports", method = RequestMethod.GET)
    public List<VehicleReportCategoryAdminDto> getAll() {
        return service.getAll();
    }

    @RequestMapping(value = "/vehicle-report/{id}", method = RequestMethod.GET)
    public VehicleReportCategoryAdminDto get(@PathVariable("id") Integer id) {
        return service.getSingleBy(id);
    }

    @RequestMapping(value = "/vehicle-report", method = RequestMethod.POST)
    public CreateOrUpdateResponseDto add(@RequestBody VehicleReportCategoryAdminDto dto, BindingResult bindingResult) {
        dto.setId(null);
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-report/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public CreateOrUpdateResponseDto update(@PathVariable("id") Integer id,
                                            @RequestBody VehicleReportCategoryAdminDto dto,
                                            BindingResult bindingResult) {
        dto.setId(id);
        return service.createOrUpdate(dto, bindingResult);
    }

    @RequestMapping(value = "/vehicle-report/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Integer id) {
        return service.delete(id);
    }
}