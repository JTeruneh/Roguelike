// a generally accessible datastore object

export let DATASTORE = {};
clearDatastore();

// ==========

export function clearDatastore() {
  DATASTORE = {
    ID_SEQ: 2,
    GAME: {},
    MAPS: {},
  };
}
