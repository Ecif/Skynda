import React from 'react';

import Skblock from '../details.skblock';
import '../../details.scss';
import './Details.reviews.scss';
import {Row, Col, Button} from 'react-bootstrap';

// Images
import image_star from './../../../../static/images/standard/star@2x.png';
import image_unstar from './../../../../static/images/standard/star-1@2x.png';

const max_stars = 5;
const Star = (props) => (<img key={props.idx} className="sk_safety__details__star pull-right"
                              width="24" src={props.src}/>);

class Reviews extends React.Component {
  render() {
    const stars = this.props.stars || 3;
    const reviews = this.props.reviews;

    return (<Skblock header={'Reviews'}>
      {reviews.map((review) => (<div className="panel panel-default">
          <div className="panel-body">
            <Row className="sk_details__reviews__header">
              <Col md={6}>
                <img src={review.logoUrl} alt="LOGO"/>
              </Col>
              <Col md={6}>
                {Array.from({ length: max_stars - review.rating}).map((_, idx) => <Star idx={idx} src={image_unstar} />)}
                {Array.from({ length: review.rating}).map((_, idx) => <Star idx={idx} src={image_star} />)}
              </Col>
            </Row>
            <Row className="sk_details__reviews__body">
              <Col md={12}>
                {review.text}
              </Col>
            </Row>
            {review.videoUrl ? (<Row className="sk_details__reviews__body">
              <Col md={12}>
                {/* Youtube video? */}
              </Col>
            </Row>) : ""}
            <Row className="sk_details__reviews__footer">
              <Col md={12}>
                <Button className="pull-right sk_details__reviews__button-read-more">Read More</Button>
              </Col>
            </Row>
          </div>
        </div>
      ))}
    </Skblock>);
  }
}

Reviews.propTypes = {
  reviews: React.PropTypes.arrayOf(React.PropTypes.shape({
    logoUrl: React.PropTypes.string,
    rating: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    videoUrl: React.PropTypes.string
  })).isRequired
};

export default Reviews;
