package me.skynda.vehicle.entities;

import javax.persistence.*;

import lombok.Data;

import java.io.Serializable;

@Entity
@Data
@Table(name = "vehicle_report_category")
public class VehicleReportCategory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "vehicle_id", nullable = false)
    private Integer vehicleId;

}