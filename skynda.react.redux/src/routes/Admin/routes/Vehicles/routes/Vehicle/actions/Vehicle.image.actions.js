import {FORMS} from "../../../constants/Vehicle.constant";
import {arrayPush, arrayRemove, change} from 'redux-form';
import {imageUtil} from "utils/allUtils";

// ------------------------------------
// Image Helpers
// ------------------------------------

export function onMainImageUpload(e) {
  return (dispatch) => {
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      dispatch(change(FORMS.VEHICLE_FORM, "mainImage.base64File", base64File));
    });
  }
}

export function onMainImageRemove(e) {
  return (dispatch) => {
    dispatch(change(FORMS.VEHICLE_FORM, "mainImage.base64File", null));
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
  }
}

export function onMainImageCropComplete(crop, pixelCrop) {
  return (dispatch) => {
    dispatch(change(FORMS.VEHICLE_FORM, "mainImage.cropInfo", {
      width: crop.width,
      height: crop.height,
      x: crop.x,
      y: crop.y,
      crop: false
    }));
  }
}

// Ideas to crop image in client
// 1. https://gist.github.com/DominicTobias/b1fb501349893922ec7f
// 2. https://gist.github.com/DominicTobias/6aa43d03bc12232ef723

export function onImageFileUpload(acceptedFiles) {
  return (dispatch, getState) => {
    acceptedFiles.forEach(file => {
      imageUtil.imageFileToBase64(file, (base64File) => {
        dispatch(arrayPush(FORMS.VEHICLE_FORM, `images`, {image: {base64File}}));
      });
    });
  }
}

export function onImageFileRemove(e, index) {
  return (dispatch) => {
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
    dispatch(arrayRemove(FORMS.VEHICLE_FORM, "images", index));
  }
}

export function onFaultFileUpload(e, index) {
  return (dispatch) => {
    imageUtil.imageFileToBase64(e.target.files[0], (base64File) => {
      dispatch(change(FORMS.VEHICLE_FORM, `faults[${index}].image.base64File`, base64File));
    });
  }
}

export function onFaultRemove(e, index) {
  return (dispatch) => {
    dispatch(arrayRemove(FORMS.VEHICLE_FORM, "faults", index));
    // TODO: use arrayPop and push the item into filesToDelete {blobName, containerName}
  }
}

export default {
  onMainImageUpload,
  onMainImageRemove,
  onImageFileUpload,
  onImageFileRemove,
  onFaultFileUpload,
  onFaultRemove
}