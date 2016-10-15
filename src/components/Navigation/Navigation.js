/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Navigation.scss";
import Link from "../Link";
import translations from "../../store/locales/en";

function Navigation({className}) {
  return (
    <div className={cx(s.root, className)} role='navigation'>
      <Link className={s.link} to='/about'>{translations.components.navigation.about}</Link>
      <Link className={s.link} to='/contact'>{translations.components.navigation.contact}</Link>
      <span className={s.spacer}> | </span>
      <Link className={s.link} to='/login'>{translations.components.navigation.log_in}</Link>
      <span className={s.spacer}>or</span>
      <Link className={cx(s.link, s.highlight)} to='/register'>{translations.components.navigation.sign_up}</Link>
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string
};

export default withStyles(s)(Navigation);
