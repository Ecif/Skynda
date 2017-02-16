import {ACTIONS} from "../../../constants/Vehicle.constant";

export const setVehicleFeaturesList = (state = {isFetching: false, items: []}, action) => {
  switch (action.type) {
    case ACTIONS.SET_VEHICLE_FEATURES_DATA: {
      return action.payload;
    }

    default:
      return state;
  }
};
