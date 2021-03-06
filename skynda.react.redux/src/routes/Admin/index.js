/**
 * Created by jevgenir on 10/21/2016.
 */
import VehiclesRoute from "./routes/Vehicles";
import VehicleModelsRoute from "./routes/VehicleModels";
import ClassifiersRoute from "./routes/Classifiers";
import ImagesRoute from "./routes/Images";
import VehicleReportsRoute from "./routes/VehicleReports";
import VehicleReviewsRoute from "./routes/VehicleReviews";
import Features from "./routes/Features";
import {onEnterAdminOrVehicleManager} from "utils/routerUtils";

export default (store) => ({
  path: "admin",
  getComponent(nextState, callBack) {
    require.ensure([], (require) => {
      callBack(null, require("./AdminView").default);
    })
  },
  childRoutes: [
    VehiclesRoute(store),
    VehicleModelsRoute(store),
    ClassifiersRoute(store),
    ImagesRoute(store),
    VehicleReportsRoute(store),
    VehicleReviewsRoute(store),
    Features(store)
  ],

  /**
   * Router helper function to check if we need to be redirected.
   * @param nextState
   * @param replace
   */
  onEnter: (nextState, replace) => {
    onEnterAdminOrVehicleManager(nextState, replace);
  }
})
