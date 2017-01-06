/**
 * Created by jevgenir on 10/26/2016.
 */
import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {setVehicleReviews} from "../reducers/SetVehicleReports.reducer";
import {REDUCER_KEYS} from "../constants/VehicleReport.constant";

export default function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLES_DATA].items;

    return fetch(`${remoteConfig.remote}/api/vehicle-report/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(resp => {
        items = items.filter(c => c.id !== id);
        dispatch(setVehicleReviews({isFetching: false, items: items}));
      })
      .catch(err => {
        console.error(err);
      });
  };
}