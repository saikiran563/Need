import axios from "axios";
import mockAPI from "../api";

import VendorScripts from "vz-odt-components/VendorScripts/VendorScripts";

export const FETCH_TRENDING_TILES_BEGIN = "search/FETCH_TRENDING_TILES_BEGIN";
export const FETCH_TRENDING_TILES = "search/FETCH_TRENDING";
export const FETCH_TRENDING_TILES_SUCCESS =
  "search/FETCH_TRENDING_TILES_SUCCESS";

export const API_TRENDING_TILES_URL = reactGlobals.trendingTilesUrl
  ? reactGlobals.trendingTilesUrl
  : "/support/1d/data/secure/trending";

export const fetchTrendingTiles = (type, payload) => dispatch => {
  dispatch(fetchTrendingTilesBegin());

  let cancelFetchRequest;

  const onSuccess = response => {
    //const json = response.data;
    //dispatch(fetchSuggestionsSuccess(json.data.suggestionList, inputValue));
    const json = response;
    json.data.liveTiles.map((tile, index) => {
      let cta = [];
      if (_.has(tile, "tileSectionBottom.tileLink")) cta.push(">");
      else{
        const cta1ButtonText = _.get(
          tile,
          "tileSectionBottom.tileButton[0].buttonText"
        );
        const cta2ButtonText = _.get(
          tile,
          "tileSectionBottom.tileButton[1].buttonText"
        );
        if (cta1ButtonText !== "" && cta1ButtonText !== undefined)
          cta.push(cta1ButtonText);
        if (cta2ButtonText !== "" && cta2ButtonText !== undefined)
          cta.push(cta2ButtonText);
      }
      let vzwDLPagePCI = VendorScripts.vzwDLPagePCI(
        0,
        "MVO",
        "L1",
        index,
        tile.tileKey.replace("LT", "TT"),
        cta
      );
      tile.vzwDLPagePCI = vzwDLPagePCI;
    });
    dispatch(fetchTrendingTilesSuccess(json.data));
    reactGlobals.completedAPICount = reactGlobals.completedAPICount - 1;
  };

  const onError = error => {
    reactGlobals.completedAPICount = reactGlobals.completedAPICount - 1;
    if (!axios.isCancel(error)) {
      dispatch(fetchTrendingTilesFail(error));
    }
    /*
  mockAPI.fetchTrendingTiles(response => {
    dispatch(fetchTrendingTilesSuccess(response.data.liveTiles));
  });*/
  };

  if (cancelFetchRequest) {
    cancelFetchRequest();
  }

  axios({
    url: API_TRENDING_TILES_URL,
    timeout: 20000,
    withCredentials: true,
    responseType: "json",
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "text/plain"
    },
    data: JSON.stringify({ pageType: "overview", count: "4" })
        })
    /** 
  axios
    .post(
      API_TRENDING_TILES_URL,
      { pageType: "overview", count: "4" },
      {
        cancelToken: new axios.CancelToken(function(c) {
          cancelFetchRequest = c;
        })
      }
    )*/
    .then(onSuccess)
    .catch(onError);
};
export const fetchTrendingTilesBegin = () => ({
  type: FETCH_TRENDING_TILES_BEGIN
});
export const fetchTrendingTilesSuccess = data => ({
  type: FETCH_TRENDING_TILES_SUCCESS,
  data
});
