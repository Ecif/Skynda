import {REDUCER_KEYS} from "../constants/VehicleReport.constant";
import {VehicleReportService} from "../../../../../webServices"
import {toastr} from "react-redux-toastr";

export const DELETE_REQUEST = "VEHICLE_REPORT/DELETE_REQUEST";
export const DELETE_SUCCESS = "VEHICLE_REPORT/DELETE_SUCCESS";
export const DELETE_FAILURE = "VEHICLE_REPORT/DELETE_FAILURE";

export function deleteRequest() {
  return {
    type: DELETE_REQUEST,
    isFetching: true,
    errors: {}
  };
}

export function deleteSuccess(items) {
  return {
    type: DELETE_SUCCESS,
    isFetching: false,
    items: items,
    errors: {}
  };
}

export function deleteFailure(errors) {
  return {
    type: DELETE_FAILURE,
    isFetching: false,
    errors
  };
}

export default function deleteItem(id) {
  return async (dispatch, getState) => {
    try{
      dispatch(deleteRequest());
      const state = getState();
      await VehicleReportService.deleteItem(id);
      let items = state[REDUCER_KEYS.VEHICLES_REPORTS_DATA].items;
      items = items.filter(c => c.id !== id);
      dispatch(deleteSuccess(items));
      toastr.success("Success", "Delete successful!");
    }catch (error){
      dispatch(deleteFailure(error));
      toastr.success("Oh no!", "Delete failed!");
      throw error;
    }
  };
}
