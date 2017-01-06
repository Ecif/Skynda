package me.skynda.vehicle.dao;

import me.skynda.common.db.SkyndaBaseEntityDaoImpl;
import me.skynda.common.interfaces.daos.VehicleReviewDao;
import me.skynda.vehicle.entities.VehicleReview;
import org.springframework.stereotype.Repository;

/**
 * Created by jevgenir on 11/14/2016.
 */
@Repository
public class VehicleReviewDaoImpl   extends SkyndaBaseEntityDaoImpl<VehicleReview> implements VehicleReviewDao {
}