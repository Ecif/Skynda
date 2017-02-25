import React from "react";
import {Field, FieldArray} from 'redux-form';
import TextField from 'material-ui/TextField';
import {Card, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import {Row, Col} from "react-bootstrap";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Dropzone from "react-dropzone";
import Select from "react-select";
import ReactIconDelete from 'react-icons/lib/md/delete';
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import {AlphaPicker, CirclePicker, TwitterPicker} from 'react-color';
import ReactDOM from 'react-dom';
import { BootstrapTable as bt, TableHeaderColumn } from 'react-bootstrap-table';
import {fieldListWrapper, renderImage} from "../../../../../components/FormRenderers/index";
import {colorHashes} from "../../../../../../../utils/constants";

const styleDeleteIcon = {
  position: "absolute",
  // border: "1px solid black",
  borderRadius: "30px",
  right: "40px",
  background: "white"
};
const ReactIconDeleteWrapped = (props) => (<ReactIconDelete {...props} width="32" height="32" style={styleDeleteIcon}/>);
const crop = {width: 90, aspect: 16/9};

/*
 ====================================
 MATERIAL UI
 ====================================
 */

export const renderTextField = ({input, label, errors, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <TextField hintText={label} floatingLabelText={label} errorText={errors && errors[input.name] || touched && error} {...input} {...custom} />
    </Col>
  </Row>
);

/*
 ====================================
 FIELD ARRAYS
 ====================================
 */
export const descriptionRenderer = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.label,
  block: (<div>
    {fields.map((name, index) =>
      <Card key={index} className="vehicle-component--list-card">
        <Row>
          <Col smOffset={1} sm={9}>
            <Field name={`${name}.title`} type="text" component={renderTextField} placeholder={`Title #${index + 1}`}/>
            <Field name={`${name}.content`} type="text" component={renderTextField} multiLine={true} rows={4}
                   placeholder={`Description #${index + 1}`}/>
          </Col>
          <Col sm={2}>
            <FloatingActionButton mini={true} secondary={true} onClick={() => fields.remove(index)}>
              <ContentRemove />
            </FloatingActionButton>
          </Col>
        </Row>
      </Card>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </div>)
});

export const renderReportItems = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.label,
  block: (<div>
    {fields.map((name, index) =>
      <Card key={index} className="vehicle-component--list-card">
        <Row>
          <Col smOffset={1} md={9}>
            <Field name={`${name}.title`} type="text" component={renderTextField} placeholder={`Title #${index + 1}`}/>
            <Field name={`${name}.description`} type="text" component={renderTextField} multiLine={true} rows={4}
                   placeholder={`Description #${index + 1}`}/>
          </Col>
          <Col sm={2}>
            <FloatingActionButton mini={true} secondary={true} onClick={() => fields.remove(index)}>
              <ContentRemove />
            </FloatingActionButton>
          </Col>
        </Row>
      </Card>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </div>)
});

export const renderFeatures = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.label,
  block: (<div>
    {fields.map((name, index) =>
      <Card key={index} className="vehicle-component--list-card">
        <Row>
          <Col smOffset={1} sm={9}>
            <Field name={`${name}.name`} type="text" component={renderTextField} placeholder={`Feature #${index + 1}`}/>
          </Col>
          <Col sm={2}>
            <FloatingActionButton mini={true} secondary={true} onClick={() => fields.remove(index)}>
              <ContentRemove />
            </FloatingActionButton>
          </Col>
        </Row>
      </Card>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </div>)
});

export const renderFaults = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.label,
  block: (<div>
    {fields.map((field, index) => {
      return (<Card key={index} className="vehicle-component--list-card">
        <Row>
          <Col smOffset={1} sm={9}>
            <Field name={`${field}.file`} component={({input, i}) => (
              <input  className="btn btn-default" type="file"
                 onChange={e => {
                   custom.onFaultFileAdd(e, index);
                 }}
              />)}
            />
            <Field name={`${field}.text`} type="text" component={renderTextField} placeholder={`Text #${index + 1}`}/>
            <Field name={`${field}.image.url`} type="text" component={obj => renderImage(obj, "PIC IN DATABASE")}/>
            <br/>
            <Field name={`${field}.image.base64File`} type="text" component={obj => renderImage(obj, "UPLOADED PIC")}/>
          </Col>
          <Col sm={2}>
            <FloatingActionButton mini={true} secondary={true} onClick={(e) => {
              fields.remove(index);
            }}>
              <ContentRemove />
            </FloatingActionButton>
          </Col>
        </Row>
      </Card>
      );
      }
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </div>)
});

export const MainImageCardField = (props) => (<Card className="vehicle-component--card-background">
  <CardHeader title={<h2>{props.title}</h2>} />
  <CardMedia>
    <Field name="mainImage.url" component={({input, i}) => (<div>
      {input.value ? (<img src={input.value} width={400}/>) : ""}
    </div>)}/>
  </CardMedia>
  <CardText>
    <span>a) Specify image url:</span>
    <Field name="mainImage.url" type="text" component={renderTextField} label="URL" />

    <br/>

    <span>b) ...or upload using image uploader:</span>
    <Field name="mainImage.base64File" component={({input, i}) => (<div>
      {input.value
        ? (<div>
          <ReactCrop src={input.value} crop={crop} onComplete={props.onMainImageCropComplete} />
          {/*<img src={input.value} width={400}/>*/}
          <ReactIconDeleteWrapped onClick={e => props.onMainImageRemove(e)}/>
        </div>)
        : <input className="btn btn-default" type="file" onChange={e => props.onMainImageUpload(e)}/>}
    </div>)}/>
  </CardText>
  {props.children}
</Card>);

export const ImagesCardField = (props) => (<Card className="vehicle-component--card-background">
  <CardHeader title={<h2>Images</h2>} />
  <CardText>
    <Row>
      <Col xs={12}>
        <div style={{marginBottom: "10px"}}>
          <Dropzone onDrop={props.onImageFileUpload} multiple={true}>
            <div style={{padding: "10px"}}>
              Try dropping some files here, or click to select files to upload.
            </div>
          </Dropzone>
        </div>

        <FieldArray name="images" component={({fields}) => (<div>
          {fields.map((field, index) => {
            const componentFn = ({input}) =>
              (input.value
                ? (<div>
                  <img src={input.value} width="100%"/>
                  <ReactIconDeleteWrapped onClick={e => props.onImageFileRemove(e, index)}/>
                </div>)
                : (<div></div>));
            return (<div key={index}>
              <Field name={`${field}.image.url`} type="text" component={componentFn}/>
              <Field name={`${field}.image.base64File`} type="text" component={componentFn}/>
              <hr />
            </div>);
          })}</div>)}/>
      </Col>
    </Row>
  </CardText>
  {props.children}
</Card>);

export const selectRenderer = (items, onChange, isMulti = false) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label" htmlFor={input.name}>{label}</label>
      <Select.Creatable name={input.name} value={input.value} options={items} onChange={value => onChange(input.name, value)}
              multi={isMulti}
      />
    </Col>
  </Row>
);

export const selectFeaturesRenderer = (items, onChange, isMulti = false) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label" htmlFor={input.name}>{label}</label>
      <Select name={input.name} value={input.value} options={items}
              onChange={value => onChange(input.name, value)}
                        multi={isMulti}
      />
    </Col>
  </Row>
);

export const ErrorBlockRenderer = ({errors}) => {
  return errors.length > 0 ? (
    <Row>
      <Col xs={12}>
        <div className="panel panel-danger">
          <div className="panel-heading">Panel heading</div>
          <ul className="list-group">
            {errors.map((error, i) => (
              <li key={i} className="list-group-item"><b>{error.code}</b>: {error.defaultMessage}</li>
            ))}
          </ul>
        </div>
      </Col>
    </Row>) : <div></div>;
};

export class ColorRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  onToggle = () => {
    this.setState({expanded: !this.state.expanded})
  };

  onChangeComplete = (color, event) => {
    this.onToggle({expanded: false});
    this.props.onChangeComplete(this.props.input.name, color.hex, event);
  };

  render() {
    const {input, label} = this.props;

    return (
      <Row style={{marginBottom: "10px"}}>
        <Col sm={12}>
          <label className="sell-your-car__label"  htmlFor={input.name}>{label}</label>
          <div style={{background: input.value || "black"}}
               className="sell-your-car__color-renderer-display"
               onClick={e => this.onToggle()}>&nbsp;</div>

          {this.state.expanded
            ? (<CirclePicker colors={colorHashes}
                             onChangeComplete={this.onChangeComplete}
                             color={input.value}
                             triangle="hide"/>)
            : ""}
        </Col>
      </Row>
    );
  }
}

class BootstrapTable extends bt {
  componentDidMount() {
    super.componentDidMount();
    const { onAdd } = this.props.options || {};
    const dom = ReactDOM.findDOMNode(this);
    const addButton = dom.getElementsByClassName('react-bs-table-add-btn')[0];
    if (addButton) {
      addButton.onclick = function onclick(event) {
        event.stopPropagation();
        onAdd();
      };
    }
  }

  render() {
    return super.render({ ...this.props });
  }
}


export {
  BootstrapTable,
  TableHeaderColumn
};