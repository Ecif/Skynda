package me.skynda.common.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "vehicle_report_category")
public class VehicleReport implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "vehicle_id", nullable = false)
    private Integer vehicleId;

    @OneToMany(mappedBy = "parentId", fetch = FetchType.LAZY)
    private List<VehicleReportItem> items;

    @Column(name = "inspector_name")
    private String inspector;

    @Column(name = "archived")
    private Date archived;

    @OneToMany(mappedBy = "reportCategoryId", fetch = FetchType.LAZY)
    private List<VehicleFault> faults;
}