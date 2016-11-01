import React from 'react';
import {connect} from 'react-redux'
import {updateSearchValues, toggleButtonGroupValue} from '../actions'
import CarSearchButtonGroup from "../components/CarSearch/CarSearchButtonGroup";

const mapStateToProps = (state, ownProps) => {
  return {
    options: ownProps.options,
    shape: ownProps.shape,
    type: ownProps.type
  };
};


const mapDispatchToProps =   {
  onToggle: (value) => (dispatch, getState) => {
    dispatch(toggleButtonGroupValue(getState().buttonGroupValues, value));
  }
};

const SliderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CarSearchButtonGroup);

export default SliderContainer
