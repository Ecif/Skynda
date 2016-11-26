package me.skynda.vehicle.dto;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
public class CategoriesDto {
	
	private String title;
	private List<PointsDto> items;

}
