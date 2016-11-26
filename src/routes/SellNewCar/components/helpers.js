/**
 * Created by jevgenir on 11/8/2016.
 */

import React from "react";
import {Row, Col} from "react-bootstrap";

/**
 * Wraps a login-register row consistently
 * @param block
 */
export const rowWrapper = (block) =>
  (<Row style={{"margin": "2px", "padding": "2px"}}>
    <Col xs={12} >{block}</Col>
  </Row>);
