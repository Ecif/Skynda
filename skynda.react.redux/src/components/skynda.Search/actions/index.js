import ACTIONS from "./constants"

export const setIsSearching = (value) => ({
  type: ACTIONS.SET_IS_SEARCHING,
  value
});

export const toggleAdvanced = (value) => ({
  type: ACTIONS.TOGGLE_ADVANCED_SEARCH,
  value
});

export const setBaseValues = (value) => ({
  type: ACTIONS.SET_BASE_VALUES,
  payload: value
});

export const updateSliderValue = (value) => ({
  type: ACTIONS.SET_SLIDER_VALUE,
  payload: value
});

export const toggleButtonGroupValue = (value) => ({
  type: ACTIONS.TOGGLE_BUTTON_GROUP_VALUE,
  payload: value
});

export const setSearchResults = (value) => ({
  type: ACTIONS.SET_SEARCH_RESULTS,
  payload: value
});