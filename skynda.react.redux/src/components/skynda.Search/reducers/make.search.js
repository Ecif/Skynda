import fetch from "isomorphic-fetch";
import remoteConfig from "../../../store/remoteConfig";
import {setIsSearching, setSearchResults} from './../actions';
import NProgress from "react-nprogress";

/***
 * Async skynda.Search for vehicles. Use redux-thunk
 * Set isSearching & searchResults
 */
export const searchCarAsync = () => (dispatch, getState) => {
  var searchValues = {...getState().searchValues};
  dispatch(setIsSearching(true));
  NProgress.start();
  return fetch(`${remoteConfig.remote}/api/vehicle/search`, {
    method: "POST",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(searchValues)
  })
    .then(resp => resp.json())
    .then(resp => {
      dispatch(setSearchResults(resp.vehicles));
      dispatch(setIsSearching(false));
      NProgress.done();
    }).catch(err => {
      console.log("Car skynda.Search failed =>", err);
      dispatch(setIsSearching(false));
      NProgress.done();
  });
};