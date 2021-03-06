import { connect } from "react-redux";
import { toggleLoading, setCarData, getDataAsync, sendEmailAsync, sendQuestionByEmailAsync } from "../reducers";


import Details from "../components/Details";
import {REDUCER_KEY__DETAILS_CHECKOUT_INFO} from "../components/CheckoutPanel/constants/Details.checkout.constants";

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  toggleLoading,
  setCarData,
  getDataAsync,
  sendEmailAsync,
  sendQuestionByEmailAsync
};

const mapStateToProps = (state) => ({
  isLoading : state.isLoading,
  car_data: state.carData,
  isCheckoutSubmitted: state[REDUCER_KEY__DETAILS_CHECKOUT_INFO].isSuccessfullySent === true,
  isShowThanksToVehicleId: state[REDUCER_KEY__DETAILS_CHECKOUT_INFO].isSuccessfullySentVehicleId,
});

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

 import { createSelector } from 'reselect'
 const counter = (state) => state.counter
 const tripleCount = createSelector(counter, (count) => count * 3)
 const mapStateToProps = (state) => ({
 counter: tripleCount(state)
 })

 Selectors can compute derived data, allowing Redux to store the minimal possible state.
 Selectors are efficient. A selector is not recomputed unless one of its arguments change.
 Selectors are composable. They can be used as input to other selectors.
 https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Details);
