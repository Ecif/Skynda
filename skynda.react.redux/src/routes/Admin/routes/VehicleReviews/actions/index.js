/**
 * Created by zekar on 10/23/2016.
 */

import clear from "./VehicleReview.clear.action";
import load from "./VehicleReview.load.action";
import {formSubmit, onFormSubmitSuccess, onFormSubmitError} from "./VehicleReview.submitForm.action";
import fillWithFakeData from "./VehicleReview.fillWithFakeData.action";
import getList from "./VehicleReviews.getList.action";
import deleteItem from "./VehicleReviews.deleteItem.action";

export {
  clear,
  load,
  formSubmit,
  onFormSubmitSuccess,
  onFormSubmitError,
  fillWithFakeData,
  getList,
  deleteItem
}