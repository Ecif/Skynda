import React from "react";
import {Row, Col} from "react-bootstrap";
import "./Details.overview.scss";
import {Translate} from 'react-redux-i18n';

import Skblock from "../BlockContainer";

import imageOverview1 from "static/images/standard/group-114@2x.png";
import imageOverview2 from "static/images/standard/group-115@2x.png";
import imageOverview3 from "static/images/standard/group-116@2x.png";
import imageOverview4 from "static/images/standard/group-117@2x.png";
import imageOverview5 from "static/images/standard/group-119@2x.png";
import imageOverview6 from "static/images/standard/group-120@2x.png";
import imageOverview7 from "static/images/standard/group-121@2x.png";

class Overview extends React.Component {
  render() {
    let {mileage, drive, engine, horsePower, transmission, doors, seats, colorOutsideHex, colorInsideHex} = this.props.overview;
    const overview = [
      {label: `${mileage} km`, iconUrl: imageOverview1},
      {label: drive, iconUrl: imageOverview2},
      {label: `${engine} (${horsePower} kW)`, iconUrl: imageOverview3},
      {label: transmission, iconUrl: imageOverview4},
      {label: `${doors} ust ${seats} istekohta`, iconUrl: imageOverview5},
    ];
    const colors = [
      {value: colorOutsideHex, iconUrl: imageOverview6},
      {value: colorInsideHex, iconUrl: imageOverview7}
    ]

    return (<Skblock header={<Translate value="details.components.overview.header"/>}>
      <Row>
        <Col xs={12} className="sk_details__overview_flex-container">
          {overview.map((item, i) =>
            (<div key={i} className="sk_details__overview_flex-container-item">
              <img src={item.iconUrl} alt='' className='overview__overview-icon' /><br />
              <span className='overview__overview-label'>{item.label}</span>
            </div>))}
          {colors.map((item, i) =>
            (<div key={i} className="sk_details__overview_flex-container-item">
              <img src={item.iconUrl} alt='' className='overview__overview-icon' /><br />
              <span className='overview__overview-label'>
                <div style={{background: item.value || "black"}}
                     className="">&nbsp;</div>
              </span>
            </div>))}
        </Col>
      </Row>
    </Skblock>);
  }
}

Overview.propTypes = {
  overview: React.PropTypes.shape({
    manufacturer: React.PropTypes.string.isRequired,
    engine: React.PropTypes.string.isRequired,
    horsePower: React.PropTypes.number.isRequired,
    mileage: React.PropTypes.number,
    transmission: React.PropTypes.string.isRequired,
    drive: React.PropTypes.string.isRequired,
    colorOutsideHex: React.PropTypes.string,
    colorInsideHex: React.PropTypes.string,
    doors: React.PropTypes.number.isRequired,
    seats: React.PropTypes.number.isRequired
  })
};

export default Overview;
