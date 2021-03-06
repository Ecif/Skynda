import React from "react";
import Skblock from "../BlockContainer";
import "../Details.scss";
import "./Details.inspectors-report.scss";
import SimpleCarousel from "../../../../components/SlickCarousel";
import {Row, Col} from "react-bootstrap";
import imageCarInspector from "./assets/carinspector2.jpg";
import {Translate} from 'react-redux-i18n';
import {Image} from "react-bootstrap";
import _ from "underscore";
import MultilineText from "../../../../components/MultilineText";


/**
 * Inspector's report
 */
class InspectorsReport extends React.Component {
  render() {
    const {reportCategories, inspector, faults} = this.props.report;

    return (
      <div>
        {reportCategories && !_.isEmpty(reportCategories)
          ?
          <Skblock header={<Translate value="details.components.inspector_report.header"/>}>
            <div className="inspectors-report">
              <Row className="inspector-block">
                <Col md={3}>
                  <Image src={imageCarInspector} circle width={130} alt="happy" />
                </Col>
                <Col md={9} className='sk_details__certified_developer'>
                  {inspector}
                </Col>
              </Row>

              <Col sm={12}>
                {reportCategories.map((category, i) =>  (
                  <Row key={i} className="line-item">
                    <h3>
                      {/*{category.title}*/}
                    </h3>
                    {category.items.map((item, i ) => (
                      <Row key={i}>
                        <div className="blue_title_report_item">{item.title}</div>
                        <div className="multiline_text_line_height">
                          <MultilineText value={item.text}/>
                        </div>
                      </Row>
                    ))}
                  </Row>))}
              </Col>

              <Row>
                <Col xs={12}>
                  <SimpleCarousel images={faults} title={<Translate value="details.components.inspector_report.pic_dents_txt"/>} />
                </Col>
              </Row>
            </div>
          </Skblock> : ""
        }
      </div>

      );
  }
}
export default InspectorsReport;

InspectorsReport.propTypes = {
  reportCategories: React.PropTypes.shape({
    reports: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      inspector: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
      items: React.PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string,
        text: React.PropTypes.string,
        pass: React.PropTypes.bool
      }))
    })),
    faults: React.PropTypes.arrayOf(React.PropTypes.shape({
      text: React.PropTypes.string,
      img: React.PropTypes.string
    }))
  }),
  sendQuestionByEmailAsync: React.PropTypes.func.isRequired
};

