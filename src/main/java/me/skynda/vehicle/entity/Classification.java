package me.skynda.vehicle.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.net.InetAddress;
import java.util.Date;

@Entity
@Data
@Table(name = "classification")
public class Classification implements Serializable{
    @Id
    @Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "is_imported")
    private Boolean isImported;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "value")
    private String value;

    @Column(name = "modifier_user_id")
    private Integer modifierUserId;

    @Column(name = "modifier_user_ip")
    private InetAddress modifierUserIp;

    @Column(name = "archived")
    private Date archived;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @Column(name = "classification_type_id")
    @JoinColumn(name = "classification_type_id")
    private ClassificationType classificationType;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "value2")
    private String value2;

}
