package me.skynda.blobstorage.dto.temp;

import lombok.Data;
import me.skynda.vehicle.dto.VehicleFeatureDto;

import java.util.List;

@Data
public class FileTestUpload3 {

    private String name;
    private List<VehicleFeatureDto> features;
}
