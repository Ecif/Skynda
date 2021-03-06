import React from 'react';
import {Field, change} from 'redux-form';
import {toastr} from "react-redux-toastr";
import {Card, CardText} from 'material-ui/Card';
import {Row, Col, Modal} from "react-bootstrap";
import _ from "underscore";
import "./Vehicle.component.scss";
import {ROUTE_PARAMS, FORM_MODE, VEHICLE_FORM_KEY} from "../../../constants/Vehicles.constant";
import {ImagesCardField as ImagesCard} from "./FormRenderers";
import {
  renderTextField,
  selectRenderer,
  ErrorBlockRenderer,
  ColorRenderer,
  renderCheckbox
} from "../../../../../components/FormRenderers";
import {ROUTE_PARAMS as VEHICLE_MODEL_ROUTE_PARAMS} from "../../../../VehicleModels/constants/VehicleModel.constant";
import VehicleModel from "../../../../VehicleModels/routes/VehicleModel/containers/VehicleModel.container";
import {CropToolCard} from "../../../../../../../components/ReduxForm/CropTool";
import VehicleFeaturesAndDescriptionsCard from "./Vehicle.features-and-descriptions-card.component";
import VehicleReviewsCardComponent from "./Vehicle.reviews-card.component";
import VehicleReportsCardComponent from "./Vehicle.reports-card.component";
import {SubmitCardActionsComponent as SubmitCardActions} from "./FormRenderers";
import {TrivenLoader} from "../../../../../../../components/Triven";
class Vehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params[ROUTE_PARAMS.VEHICLE_ID],
      isVehicleModelDialogOpen: false,
      newModelTitle: ""
    };
  }

  componentDidMount() {
    this.props.onHandleLoad(this.props.params[ROUTE_PARAMS.VEHICLE_ID]);
    this.props.getVehicleModelsList();
    this.props.vehicleFeaturesGetList();
    this.props.getVehicleReportsList(this.props.params[ROUTE_PARAMS.VEHICLE_ID]);
    this.props.getVehicleReviewsList(this.props.params[ROUTE_PARAMS.VEHICLE_ID]);
    this.props.getFuels();
    this.props.getTransmissions();
  }

  onSetField = (name, value, event) => {
    this.props.dispatch(change(VEHICLE_FORM_KEY, name, value))
  };

  /**
   * Select2 on change option
   * @param name - field name, like transmission.id, or firstname
   * @param chosenOption - object {label: string (visible text), value: int (ID)}
   */
    // TODO: cure this cancer :O
  onSelectItemChange = (name, chosenOption) => {
    const hackName = name.replace(".id", "");
    if (chosenOption.value !== chosenOption.label) {
      this.props.dispatch(change(VEHICLE_FORM_KEY, hackName, {id: chosenOption.value}));
    } else if (hackName === "vehicleModel") {
      // this.openVehicleModelDialog(null);
      this.setState({isVehicleModelDialogOpen: true});
      this.setState({newModelTitle: chosenOption.value})
    }
  };

  // openVehicleModelDialog = (e) => {
  //   if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
  //     e.preventDefault(); // stop event propagation to avoid form submission.
  // };

  /**
   *
   * @param e - event, if exists. E.g. button click event.
   * @param value - vehicle model id
   */
    // TODO: eraldi failisse - VehicleSublistActions/Vehicle.close-vehicle-model-dialog.action.js
  closeVehicleModelDialog = (e, value) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    this.setState({isVehicleModelDialogOpen: false});

    const promise = this.props.getVehicleModelsList();
    if (value && promise) {
      promise.then(() => {
        this.onSelectItemChange("model", {value})
      });
    }
  };

  setField = (name, value) => {
    this.props.dispatch(change(VEHICLE_FORM_KEY, name, value));
  };

  setFieldValue = (name, selectedItem) => {
    this.props.dispatch(change(VEHICLE_FORM_KEY, name, selectedItem.value));
  };


  render() {
    const vehicleReports = this.props.vehicleReports && !this.props.vehicleReports.isFetching
      ? this.props.vehicleReports.items : [];
    const vehicleReviews = this.props.vehicleReviews && !this.props.vehicleReviews.isFetching
      ? this.props.vehicleReviews.items : [];
    const featuresList = this.props.featuresList && !this.props.featuresList.isFetching
      ? this.props.featuresList.items : [];
    const vehicleModels = this.props.vehicleModels && !this.props.vehicleModels.isFetching
      ? this.props.vehicleModels.items.map(item => ({label: item.displayName, value: item.id}))
      : [];
    const fuels = !this.props.fuel.isFetching
      ? this.props.fuel.items.map(item => ({label: item.name, value: item.id}))
      : [];
    const transmissions = !this.props.transmission.isFetching
      ? this.props.transmission.items.map(item => ({label: item.name, value: item.id}))
      : [];

    // const colors = this.props.colors && !this.props.colors.isFetching
    //   ? this.props.colors.items.map(item => ({label: item.name, value: item.id}))
    //   : [];

    // Validation errors
    const errors = this.props.errors;

    const isUpdating = this.props.formModeVehicle === FORM_MODE.UPDATING;
    const submitCardActions = <SubmitCardActions disabled={this.props.isFetching}
                                                 onSubmit={this.props.onHandleSubmit}/>;
    const isFetching = this.props.isFetching;

    return (<div>
        <form>
          <ErrorBlockRenderer errors={errors}/>

          <Row>
            <Col xs={12}>
              {isUpdating
                ? <h3><span className="label label-primary">ID: {this.props.id}</span></h3>
                : <h3><span className="label label-success">{this.props.formModeVehicle}</span></h3>}
            </Col>
          </Row>
          <TrivenLoader isLoading={isFetching}>

            <Row>
              <Col md={6} xs={12}>
                <CropToolCard
                  name="mainImage"
                  reduxFormName={VEHICLE_FORM_KEY}
                  title="Main image"
                  errors={errors}
                  isLoading={isFetching}
                >
                </CropToolCard>
                <br/>

                {/* TODO: See panna Vehicle.main-card.component.js */}

                <Card style={isFetching ? {backgroundColor: 'rgba(0, 0, 0, 0.1)'} : {}}>
                  <CardText>
                    <Field name="isSold" label="Is Sold" component={renderCheckbox} errors={errors}/>

                    {this.props.vehicleModels.isFetching
                      ? <div>Loading...</div>
                      : ( <div>
                          <Field name="vehicleModel.id" label="Vehicle model *"
                                 component={selectRenderer(vehicleModels, this.onSelectItemChange)}/>
                          <Modal show={this.state.isVehicleModelDialogOpen} onHide={this.closeVehicleModelDialog}>
                            <Modal.Header closeButton>
                              <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <VehicleModel params={{
                                [VEHICLE_MODEL_ROUTE_PARAMS.VEHICLE_MODEL_ID]: "new",
                                [VEHICLE_MODEL_ROUTE_PARAMS.VEHICLE_MODEL_TITLE]: this.state.newModelTitle
                              }}
                                            onSubmitCustom={this.closeVehicleModelDialog}/>
                            </Modal.Body>
                          </Modal></div>
                      )
                    }


                    <Field name="price" label="Price *" component={renderTextField} type="number"/>
                    <Field name="mileage" label="Mileage *" component={renderTextField} type="number"/>
                    <Field name="horsePower" label="Horsepower *" component={renderTextField} type="number"/>
                    <Field name="engine" label="Engine *" component={renderTextField}/>
                    <Field name="year" label="Year *" component={renderTextField} type="number"/>

                    {this.props.fuel.isFetching
                      ? <div>Loading...</div>
                      : <Field name="fuelTypeId" label="Fuel type *"
                               component={selectRenderer(fuels, this.setFieldValue)}/>}

                    {this.props.transmission.isFetching
                      ? <div>Loading...</div>
                      : <Field name="transmissionId" label="Transmission *"
                               component={selectRenderer(transmissions, this.setFieldValue)}/>}

                    <label>Fuel:</label><br/>
                    <Field name="fuelCity" label="Fuel City" component={renderTextField} type="number"/>
                    <Field name="fuelHighway" label="Fuel Highway" component={renderTextField} type="number"/>
                    <br/>

                    <label>History:</label><br/>
                    <Field name="vinCode" label="Vin Code *" component={renderTextField}/>
                    <Field name="registrationNumber" label="Registration Number *" component={renderTextField}/>
                    <Field name="foundHistory" label="Found history *" component={renderTextField} multiLine={true} rows={4}/>
                    <br/>

                    <label>Safety:</label><br/>
                    <Field name="safetyStars" label="Safety Stars" component={renderTextField} type="number" max="5" min="0"/>
                    <Field name="safetyUrl" label="Safety Url" component={renderTextField}/>

                    <Field name="colorInsideHex"
                           label="Color inside *"
                           onChangeComplete={this.onSetField}
                           component={ColorRenderer}/>

                    <Field name="colorOutsideHex"
                           label="Color outside *"
                           onChangeComplete={this.onSetField}
                           component={ColorRenderer}/>
                  </CardText>
                  {submitCardActions}
                </Card>

                <br/>

                <VehicleFeaturesAndDescriptionsCard featuresList={featuresList} setField={this.setField}>
                  {submitCardActions}
                </VehicleFeaturesAndDescriptionsCard>
              </Col>

              {isUpdating && !isNaN(this.state.id) ?
                (<Col md={6} xs={12}>
                  <ImagesCard
                    onImageFileUpload={this.props.onImageFileUpload}
                    onImageFileRemove={this.props.onImageFileRemove}
                    isLoading={isFetching}>
                    {submitCardActions}
                  </ImagesCard>
                </Col>) :
                ""}
            </Row>
          </TrivenLoader>

        </form>

        <br/>

        {isUpdating && !isNaN(this.state.id) ?
          <Row>
            <Col sm={12}>
              <div>
                <VehicleReportsCardComponent
                  vehicleReports={vehicleReports}
                  vehicleId={this.props.id}
                  getVehicleReportsList={this.props.getVehicleReportsList}
                  deleteSingleReportItem={this.props.deleteSingleReportItem}
                />
                <br/>
                <VehicleReviewsCardComponent
                  vehicleReviews={vehicleReviews}
                  vehicleId={this.props.id}
                  getVehicleReviewsList={this.props.getVehicleReviewsList}
                  deleteSingleReview={this.props.deleteSingleReview}
                />
              </div>
            </Col>
          </Row>
          : ""
        }
      </div>
    )
  }
}

Vehicle.propTypes = {
  onHandleLoad: React.PropTypes.func.isRequired,
  onHandleSubmit: React.PropTypes.func.isRequired,
  getVehicleModelsList: React.PropTypes.func.isRequired,
  getVehicleReportsList: React.PropTypes.func.isRequired,
  deleteSingleReportItem: React.PropTypes.func.isRequired,
  getVehicleReviewsList: React.PropTypes.func.isRequired,
  deleteSingleReview: React.PropTypes.func.isRequired,
  vehicleFeaturesGetList: React.PropTypes.func.isRequired,
  onImageFileRemove: React.PropTypes.func,
  onImageFileUpload: React.PropTypes.func,
  onMainImageCropComplete: React.PropTypes.func,
  getFuels: React.PropTypes.func,
  getTransmissions: React.PropTypes.func,
  vehicleModels: React.PropTypes.shape({
    isFetching: React.PropTypes.bool,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      modelCode: React.PropTypes.string.isRequired,
      displayName: React.PropTypes.string.isRequired
    }))
  }),

  colors: React.PropTypes.shape({
    isFetching: React.PropTypes.bool,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired
    }))
  }),

  // vehicle data
  initialValues: React.PropTypes.shape({
    vehicleModelsCode: React.PropTypes.string,
    reportCategories: React.PropTypes.array,
    fuelCity: React.PropTypes.number,
    fuelHighway: React.PropTypes.number,
    fuelAverage: React.PropTypes.number,
    id: React.PropTypes.number,
    images: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number,
        original: React.PropTypes.string,
        thumbnail: React.PropTypes.string
      })
    ),
    isSold: React.PropTypes.bool,
    mileage: React.PropTypes.number,
    performance: React.PropTypes.shape({
      compressionRatio: React.PropTypes.number,
      compressionType: React.PropTypes.string,
      configuration: React.PropTypes.string,
      cylinders: React.PropTypes.string,
      displacement: React.PropTypes.string,
      doors: React.PropTypes.number,
      drivenWheels: React.PropTypes.string,
      fuelType: React.PropTypes.string,
      horsePower: React.PropTypes.number,
      powerTrain: React.PropTypes.string,
      size: React.PropTypes.number,
      torque: React.PropTypes.number,
      totalValves: React.PropTypes.number
    }),
    price: React.PropTypes.number,
    registrationNumber: React.PropTypes.string,
    safetyStars: React.PropTypes.number,
    vinCode: React.PropTypes.string,
    additionalInfo: React.PropTypes.string
  })
};

export default Vehicle;
