package me.skynda.vehicle.controller;

import java.util.List;

import me.skynda.common.interfaces.services.IVehicleService;
import me.skynda.vehicle.dto.request.SearchRequestDto;
import me.skynda.common.controller.BaseController;
import me.skynda.common.dto.CreateOrUpdateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.SearchResponseDto;
import me.skynda.vehicle.dto.VehicleAdminDto;
import me.skynda.vehicle.dto.VehicleDetailedDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api")
public class VehicleController extends BaseController {

    private final IVehicleService vehicleService;

    @Autowired
    public VehicleController(IVehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @RequestMapping(value = "/vehicles", method = RequestMethod.GET)
    public List<VehicleDetailedDto> getAll(@RequestBody(required = false) SearchRequestDto dto) {
        return vehicleService.getVehicles();
    }

    @RequestMapping(value = "/vehicle/{id}", method = RequestMethod.GET)
    public VehicleAdminDto get(@PathVariable("id") Integer id) {
        return vehicleService.getVehicle(id);
    }

    @RequestMapping(value = "/vehicle/{id}/detailed", method = RequestMethod.GET, produces = "application/json")
    public VehicleDetailedDto getDetailed(@PathVariable("id") Integer id) {
        return vehicleService.getVehicleDetailed(id);
    }

	@RequestMapping(value = "/vehicle", method = RequestMethod.POST)
    public CreateOrUpdateResponseDto add(@RequestBody VehicleAdminDto vehicleAdminDto, BindingResult bindingResult) {
        vehicleAdminDto.setId(null);
        return vehicleService.createOrUpdateVehicle(vehicleAdminDto, bindingResult);
    }

    @RequestMapping(value = "/vehicle/{id}", method = RequestMethod.PUT, consumes = "application/json", produces = "application/json")
    public CreateOrUpdateResponseDto update(@PathVariable("id") Integer id,
                                            @RequestBody VehicleAdminDto vehicleAdminDto,
                                            BindingResult bindingResult) {
        vehicleAdminDto.setId(id);
        return vehicleService.createOrUpdateVehicle(vehicleAdminDto, bindingResult);
    }

    @RequestMapping(value = "/vehicle/{id}", method = RequestMethod.DELETE, consumes = "application/json")
    public DeleteResponseDto delete(@PathVariable("id") Integer id) {
        return vehicleService.deleteVehicle(id);
    }

    @RequestMapping(value = "/vehicle/search", method = RequestMethod.POST, consumes = "application/json")
    public SearchResponseDto search(@RequestBody SearchRequestDto searchParams){
        return vehicleService.search(searchParams);
    }
}
