import _ from "underscore";
import {browserHistory} from "react-router";
import {change} from "redux-form";
import {FORM_MODE, REDUCER_KEYS, FORMS} from "../../../constants/VehicleReview.constant";
import {VehicleReviewService} from "../../../../../../../webServices";
import {toastr} from "react-redux-toastr";

export const ADD_REQUEST = 'VEHICLE_REVIEW/ADD_REQUEST';
export const ADD_SUCCESS = 'VEHICLE_REVIEW/ADD_SUCCESS';
export const ADD_FAILURE = 'VEHICLE_REVIEW/ADD_FAILURE';

export const EDIT_REQUEST = 'VEHICLE_REVIEW/EDIT_REQUEST';
export const EDIT_SUCCESS = 'VEHICLE_REVIEW/EDIT_SUCCESS';
export const EDIT_FAILURE = 'VEHICLE_REVIEW/EDIT_FAILURE';

function addRequest() {
  return {
    type: ADD_REQUEST,
    isFetching: true,
    formMode: FORM_MODE.ADDING_REVIEW
  }
}

function addSuccess() {
  return {
    type: ADD_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE.UPDATING_REVIEW
  }
}

function addFailure(errors) {
  return {
    type: ADD_FAILURE,
    isFetching: false,
    formMode: FORM_MODE.ADDING_REVIEW,
    errors
  }
}

function editRequest() {
  return {
    type: EDIT_REQUEST,
    isFetching: true,
    formMode: FORM_MODE.UPDATING_REVIEW
  }
}

function editSuccess() {
  return {
    type: EDIT_SUCCESS,
    isFetching: false,
    formMode: FORM_MODE.UPDATING_REVIEW
  }
}

function editFailure(errors) {
  return {
    type: EDIT_FAILURE,
    isFetching: false,
    formMode: FORM_MODE.UPDATING,
    errors
  }
}

function submitCreate(item, onSubmitCustom) {
  return async (dispatch) => {
    dispatch(addRequest());
    try {
      const resp = await VehicleReviewService.createItem(item.vehicleId, item);
      dispatch(addSuccess());
      if (_.isFunction(onSubmitCustom)) {
        onSubmitCustom(null, resp.id);
      } else {
        dispatch(change(FORMS.VEHICLE_FORM_REPORT, "id", resp.id));
        browserHistory.replace("/admin/vehicle-report/" + resp.id);
      }
      toastr.success("Success", "Create successful");
    } catch (error) {
      dispatch(addFailure(error.modelState));
      toastr.error("Oh no!", "Create failed: " +  error.message);
    }
  }
}

function submitEdit(item, onSubmitCustom) {
  return async (dispatch) => {
    dispatch(editRequest());
    try {
      const resp = await VehicleReviewService.updateItem(item.vehicleId, item.id, item);
      dispatch(editSuccess());
      if (_.isFunction(onSubmitCustom)) {
        onSubmitCustom(null, resp.id);
      }
      toastr.success("Success", "Update successful");
    } catch (error) {
      dispatch(editFailure(error.modelState));
      toastr.error("Oh no!", "Update failed " + error.message);
    }
  }
}

export default function submit(onSubmitCustom) {
  return (dispatch, getState) => {
    try {
      const state = getState();
      const formValues = state.form[FORMS.VEHICLE_FORM_REVIEW].values;
      const formMode = state[REDUCER_KEYS.VEHICLE_REVIEW_DATA].formMode;

      console.log("formMode", formMode);
      if (formMode === FORM_MODE.ADDING_REVIEW) {
        dispatch(submitCreate(formValues, onSubmitCustom))
      }
      else if (formMode === FORM_MODE.UPDATING_REVIEW) {
        dispatch(submitEdit(formValues, onSubmitCustom));
      }
    }catch (error){
      console.log(error);
      toastr.error("Oh no!", "Create/update failed. Check form values or contact support.", error);
    }

  }
}
