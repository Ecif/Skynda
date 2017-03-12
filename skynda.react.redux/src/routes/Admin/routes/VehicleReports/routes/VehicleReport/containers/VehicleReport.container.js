import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {
  load,
  submit as onHandleSubmit,
  onFaultFileUpload,
  onFaultRemove
} from "../actions";
import ViewComponent from "../components/VehicleReport.component";
import {FORMS, REDUCER_KEYS} from "../../../constants/VehicleReport.constant";
import {getList as getVehiclesList} from "../../../../Vehicles/actions";

// Decorate the form component
const DecoratedViewComponent = reduxForm({
  form: FORMS.VEHICLE_FORM_REPORT
})(ViewComponent);

const mapDispatchToProps = {
  load,
  getVehiclesList,
  onHandleSubmit,
  onFaultFileUpload,
  onFaultRemove,
};

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state[REDUCER_KEYS.VEHICLE_REPORT_DATA].isFetching,
    initialValues: state[REDUCER_KEYS.VEHICLE_REPORT_DATA].data,
    vehicles: state[REDUCER_KEYS.VEHICLES],

    onSubmitCustom: ownProps.onSubmitCustom
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedViewComponent);
