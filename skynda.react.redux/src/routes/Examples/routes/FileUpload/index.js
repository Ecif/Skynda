/**
 * Created by jevgenir on 10/29/2016.
 */
import {injectReducer} from '../../../../store/reducers';

export default (store) => ({
  path: "file-upload",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const FileUploadContainer = require("./containers/FileUploadContainer").default;
      cb(null, FileUploadContainer);
    })
  }
})
