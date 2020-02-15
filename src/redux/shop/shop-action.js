import * as actionTypes from "../actionTypes";

export const updateCollections = collectionsMap => {
  return {
    type: actionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
  };
};
