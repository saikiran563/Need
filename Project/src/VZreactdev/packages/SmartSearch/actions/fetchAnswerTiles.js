import axios from "axios";
import mockAPI from "../api";
import qs from "qs";

export const FETCH_ANSWER_TILES_BEGIN = "search/FETCH_ANSWERS_BEGIN";
export const FETCH_ANSWERS = "search/FETCH_TRENDING";
export const FETCH_ANSWER_TILES_SUCCESS = "search/FETCH_ANSWERS_SUCCESS";
/**https://autochatva.verizonwireless.com/cv/cbav/secured/api/search/init */
export const API_ANSWERS_URL = reactGlobals.askVZUrl
  ? reactGlobals.askVZUrl
  : "/cv/cbav/secured/api/search";
export const API_OS_ANSWERS_URL = reactGlobals.oneSearchUrl
  ? reactGlobals.oneSearchUrl
  : "/onesearch/results";
/*export const API_OS_ANSWERS_URL = "https://10.118.3.163:8080/onesearch/results";*/

export const fetchAnswers = (type, payload, conversationToken) => dispatch => {
  dispatch(fetchAnswersBegin());

  let cancelAskVzFetchRequest;
  let cancelOneSearchFetchRequest;
  const httpClient = axios.create();
  httpClient.defaults.timeout = reactGlobals.searchTimeout
    ? reactGlobals.searchTimeout
    : 10000;

  const httpClientAZ = axios.create({
    headers: { "Content-Type": "text/plain" }
  });
  httpClientAZ.defaults.timeout = reactGlobals.searchTimeout
    ? reactGlobals.searchTimeout
    : 10000;
  const onSuccess = response => {
    debugger;
    //const json = response.data;
    //dispatch(fetchSuggestionsSuccess(json.data.suggestionList, inputValue));
    console.log("== on Success:", response);
    if (response.data.cards.length > 0) {
      dispatch(fetchAnswersSuccess(response.data));
    } else {
      redirectToSearch(payload);
    }
  };

  const onError = error => {
    debugger;
    console.log("== on Error:", error);
    redirectToSearch(payload);
    //if (!axios.isCancel(error)) {
      //dispatch(fetchAnswersFail(error));
    //}
  };

  if (cancelAskVzFetchRequest) {
    console.log("== cancelAskVzFetchRequest");
    cancelAskVzFetchRequest();
  }
  if (cancelOneSearchFetchRequest) {
    console.log("== cancelOneSearchFetchRequest");
    cancelOneSearchFetchRequest();
  }

  const postAskVz = () => {
  debugger;
    console.log("== postAskVZ");
    if (conversationToken) {
      return httpClientAZ({
        url: API_ANSWERS_URL,
        timeout: 20000,
        withCredentials: true,
        responseType: "json",
        method: "post",
        headers: {
          Accept: "application/json",
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
        userText: payload,
        conversationToken: conversationToken,
      tile_type: type,
        section: "postpay",
        origin: "1digital",
        category: "overview"
        })
      }) /**httpClient
        .post(API_ANSWERS_URL, {
        userText: payload,
        conversationToken: conversationToken,
      tile_type: type,
        section: "postpay",
        origin: "1digital",
        category: "overview"
        })**/
        .then(function(resp) {
          return resp;
        })
        .catch(function(err) {
          debugger;
          return undefined;
    });
    } else {
      return httpClientAZ({
        url: API_ANSWERS_URL,
        timeout: 20000,
        withCredentials: true,
        responseType: "json",
        method: "post",
        headers: {
          Accept: "application/json",
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
        userText: payload,
        tile_type: type,
        section: "postpay",
        origin: "1digital",
        category: "overview"
        })
        })
        .then(function(resp) {
          return resp;
        })
        .catch(function(err) {
          debugger;
          return undefined;
      });
    }
  };
  const postOneSearch = () => {
    debugger;
    console.log("== postOneSearch");
    return httpClient
      .post(API_OS_ANSWERS_URL, {
        query: payload,
        source: "myv"
      })
      .then(function(resp) {
        return resp;
      })
      .catch(function(err) {
        debugger;
        return undefined;
    });
  };
  if (reactGlobals.discoverHubOneSearch && reactGlobals.discoverHubAskVZ) {
    debugger;
    axios
      .all([postAskVz(), postOneSearch()])
      .then(
        axios.spread(function(avResp, osResp) {
          console.log("== both reqs complete", avResp, osResp);
          debugger;
          if (
            avResp &&
            avResp.status == 200 &&
            avResp.data.cards &&
            avResp.data.cards.length > 0 &&
            osResp &&
            osResp.status == 200 &&
            osResp.data.results &&
            osResp.data.results.length > 0
          ) {
            let combinedResp = {};
            combinedResp.data = {};
            combinedResp.data.conversationToken = avResp.data.conversationToken;
            if (
              !reactGlobals.discoverHubChat &&
              osResp.data.results.length > 0
            ) {
              let mappedOSResp = mapOStoAV(osResp.data.results.slice(0, 3));
            avResp.data.cards = avResp.data.cards.map(card => {
              card.background = "black";
              return card;
            });
              combinedResp.data.cards = [
                avResp.data.cards[0],
                mappedOSResp[0],
                mappedOSResp[1],
                mappedOSResp[2]
              ];
            } else if (reactGlobals.discoverHubChat) {
              let mappedOSResp = mapOStoAV(osResp.data.results.slice(0, 2));
              let avModResp = findChatInAVResp(avResp.data.cards);
              if (avModResp.length > 0) {
              avResp.data.cards = avResp.data.cards.map(card => {
                card.background = "black";
                return card;
              });
                combinedResp.data.cards = [
                  avModResp[0],
                  mappedOSResp[0],
                  mappedOSResp[1],
                  avModResp[1]
                ];
              } else {
                redirectToSearch(payload);
              }
            } else {
              redirectToSearch(payload);
            }
            onSuccess(combinedResp);
          } else if (
            avResp &&
            avResp.status == 200 &&
            avResp.data.cards &&
            avResp.data.cards.length > 0
          ) {
          avResp.data.cards = avResp.data.cards.map(card => {
            card.background = "black";
            return card;
          });
            avResp.data.cards = avResp.data.cards.slice(0, 4);
            onSuccess(avResp);
          } else if (
            osResp &&
            osResp.status == 200 &&
            osResp.data.results &&
            osResp.data.results.length > 0
          ) {
            let mappedOSResp = mapOStoAV(osResp.data.results.slice(0, 4));
            let finalResp = {};
            finalResp.data = {};
            finalResp.data.cards = [...mappedOSResp];
            onSuccess(finalResp);
          } else {
            redirectToSearch(payload);
          }
        })
      )
      .catch(onError);
  } else if (reactGlobals.discoverHubOneSearch) {
    postOneSearch()
      .then(osResp => {
        if (
          osResp &&
          osResp.status == 200 &&
          osResp.data.results &&
          osResp.data.results.length > 0
        ) {
          let mappedOSResp = mapOStoAV(osResp.data.results.slice(0, 4));
          let finalResp = {};
          finalResp.data = {};
          finalResp.data.cards = [...mappedOSResp];
          onSuccess(finalResp);
        } else {
          redirectToSearch(payload);
        }
      })
    .catch(onError);
  } else if (reactGlobals.discoverHubAskVZ) {
    postAskVz()
      .then(avResp => {
        if (
          avResp &&
          avResp.status == 200 &&
          avResp.data.cards &&
          avResp.data.cards.length > 0
        ) {
          avResp.data.cards = avResp.data.cards.map(card => {
            card.background = "black";
            return card;
          });
          onSuccess(avResp);
        } else {
          redirectToSearch(payload);
        }
      })
      .catch(onError);
  } else {
    redirectToSearch(payload);
  }

  const findChatInAVResp = cards => {
    let resp = [];
    let chatCard = undefined;
    for (var i = 0; i < cards.length; i++) {
      let isChat =
        _.get(cards[i], "action.function_name") == "EchannelVera.init({})";
      if (isChat) {
        chatCard = cards[i];
      }
      if (resp.length < 2 && !isChat) {
        resp.push(cards[i]);
      }
    }
    if (resp.length > 0 && chatCard) {
      resp[1] = chatCard;
    }
    return resp;
  };
  const mapOStoAV = osRespResults => {
    let mappedOSResp = {};
    return (mappedOSResp.cards = osRespResults.map(result => {
      return mapResultToCard(result);
    }));
  };
  const mapResultToCard = result => {
    let card = {};
    card.heading = result.recordTitle;
    if (result.recordIntent == "shop") {
      card.eyebrow = result.brand ? result.brand : "";
      card.action = {};
      card.action.type = "link";
      card.action.url = reactGlobals.shopDomain
        ? reactGlobals.shopDomain + result.recordLabel
        : result.recordLabel;
      card.action.target = "_self";
      card.subheading =
        result.recordDisplayPricePrefix &&
        result.recordDisplayPrice &&
        result.recordDisplayPriceSuffix
          ? result.recordDisplayPricePrefix +
            " " +
            result.recordDisplayPrice +
            result.recordDisplayPriceSuffix
          : "";
      card.subheading2 = result.recordDisplayPriceText
        ? `${result.recordDisplayPriceText}`
        : ``;
    } else {
      card.eyebrow = result.recordLabel ? result.recordLabel : "";
      card.action = {};
      card.action.type = "link";
      card.action.url = result.recordUrl;
      card.action.target = "_self";
      card.subheading = result.recordDescription
        ? result.recordDescription
        : "";
    }
    return card;
  };
  const useMockApi = () => {
  mockAPI.fetchAnswerTiles(response => {
      console.log("== mock api from inside else");
      dispatch(fetchAnswersSuccess(response.data));
  });
  };

  const redirectToSearch = () => {
    if (reactGlobals.searchDomain) {
      window.location = reactGlobals.searchDomain + payload;
    } else {
      window.location = "/search/vzwSearch?N=129&Ntt=" + payload;
    }
  };
};
export const fetchAnswersBegin = () => ({
  type: FETCH_ANSWER_TILES_BEGIN
});
export const fetchAnswersSuccess = data => ({
  type: FETCH_ANSWER_TILES_SUCCESS,
  data
});
