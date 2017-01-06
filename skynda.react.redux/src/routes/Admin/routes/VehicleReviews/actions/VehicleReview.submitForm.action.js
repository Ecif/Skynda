/**
 * Created by zekar on 10/23/2016.
 */
import {FORM_MODE} from "../constants/VehicleReview.constant";
import remoteConfig from "store/remoteConfig";
import {fromSpringToReduxFormError} from "../../../../../utils/formUtils";
import {SubmissionError} from 'redux-form';

/**
 * Is executed on form submit. Not a redux action.
 * @returns {any}
 */
export function formSubmit(data, formMode) {
  return formMode == FORM_MODE.ADDING
    ? createVehicleAsync(data)
    : updateVehicleAsync(data);
}

export function onFormSubmitSuccess(isSuccess) {
  if (!!isSuccess) {
    browserHistory.push(`/admin/vehicle-reviews`);
  }
}

export function onFormSubmitError() {
  console.log("error");
}

/**
 *
 * @param data - vehicle-review input fields sent to the server
 * @returns {*|Promise.<TResult>|Promise<U>|Thenable<U>}
 */
function createVehicleAsync(data) {
  return fetch(`${remoteConfig.remote}/api/vehicle-review`, {
    method: "POST",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      if (!resp.success) {
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
      return resp;
    })
}

/**
 * Private. Updates vehicle-review
 * @param data - vehicle-review input fields sent to the server
 */
function updateVehicleAsync(data) {
  return fetch(`${remoteConfig.remote}/api/vehicle-review/${data.id}`, {
    method: "PUT",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.success) {
        throw new SubmissionError(fromSpringToReduxFormError(resp.errors));
      }
    })
}