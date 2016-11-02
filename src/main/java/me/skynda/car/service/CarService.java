package me.skynda.car.service;

import java.util.List;

import me.skynda.car.dto.CarDto;
import me.skynda.car.dto.CarManufacturerDto;
import me.skynda.car.dto.SingleCarDataDto;
import me.skynda.car.model.CarManufacturer;
import me.skynda.common.dto.CreateResponseDto;
import me.skynda.common.dto.DeleteResponseDto;
import me.skynda.common.dto.UpdateResponseDto;
import org.springframework.validation.BindingResult;

public interface CarService {

	/**
	 * Gets all data from the database
	 * @return all cars
	 */
	List<SingleCarDataDto> getCars();

	/**
	 * Adds new car for sale
	 * @param carDto Added car's dto
	 * @return Response
	 */
	CreateResponseDto createOrUpdateCarForSale(CarDto carDto, BindingResult bindingResult);

//	/**
//	 * Updates an existing car for sale
//	 * @param carDto Updated car's dto
//	 * @return Response
//	 */
//	UpdateResponseDto updateCarForSale(CarDto carDto, BindingResult bindingResult);

	/**
	 * Gets a single car. Used for udpating a car.
	 * @param id car's id
	 * @return single car's dto
	 */
	CarDto getCar(Long id);
	/**
	 * Gets a single car. Used for displaying full info about the car to the user
	 * @param id car's id
	 * @return single car's dto
	 */
	SingleCarDataDto getCarDetailed(Long id);
	
	/**
	 * Delets a single car
	 * @param id car's id
	 * @return Is the deletion successful or not
	 */
	DeleteResponseDto deleteCar(Long id);

}
