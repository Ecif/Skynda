import React from "react";
import Slider from "rc-slider";
import {Row, Col} from "react-bootstrap";
import reactMixin from "react-mixin";
import setTimeoutMixin from "../../mixins/settimeout";
import {Localize} from 'react-redux-i18n';

class SliderWrapper extends React.Component {

  onSliderChange = (value) => {
    this.clearTimeouts();
    this.setTimeout(() => {
      this.props.onSliderChange({
        value: value,
        type: this.props.type,
        units: this.props.units
      });
    }, 100);
  };

  render() {
    const {min, max, units, step, defaultMin, defaultMax} = this.props;

    return (<div className='range-slider-wrapper'>
      <label>{this.props.title}</label>

      <Row className='range-slider-wrapper__labels'>
        <Col md={6}>
          {min} {units}
        </Col>
        <Col md={6}>
          <span className='pull-right'>
            {
              max.toString().length > 4
                ? <Localize value={max}/>
                : max
            } {units}
          </span>
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Slider range
                  allowCross={false}
                  defaultValue={[min, max]}
                  min={defaultMin}
                  max={defaultMax}
                  step={step}
                  onChange={this.onSliderChange}/>
        </Col>
      </Row>
    </div>);
  }
}

SliderWrapper.propTypes = {
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  units: React.PropTypes.string,
  onSliderChange: React.PropTypes.func.isRequired,
  step: React.PropTypes.number.isRequired
};

reactMixin(SliderWrapper.prototype, setTimeoutMixin);

export default SliderWrapper;
