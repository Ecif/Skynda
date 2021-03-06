import fetch from "isomorphic-fetch";
import remoteConfig from "store/remoteConfig";
import {handle, getDefaultHeaders} from "../utils/serviceHandler";

export const VehicleService = {
  deleteItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}`, {
      method: "DELETE",
      headers: getDefaultHeaders()
    }));
  },
  publishItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}/publish`, {
      method: "PUT",
      headers: getDefaultHeaders()
    }));
  },
  unpublishItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}/unpublish`, {
      method: "PUT",
      headers: getDefaultHeaders()
    }));
  },
  getList: function () {
    return handle(fetch(`${remoteConfig.remote}/api/vehicles`, {
      method: "GET",
      headers: getDefaultHeaders()
    }))
  },
  fetchItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  },
  fetchAdminItem: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}/detailed`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  },
  getDataAsync: function (id) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${id}`, {
      method: "GET",
      headers: getDefaultHeaders()
    }));
  },
  search: function (searchValues) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/search`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(searchValues)
    }));
  },
  createItem: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  },
  updateItem: function (data) {
    return handle(fetch(`${remoteConfig.remote}/api/vehicle/${data.id}`, {
      method: "PUT",
      headers: getDefaultHeaders(),
      body: JSON.stringify(data)
    }));
  }
};
