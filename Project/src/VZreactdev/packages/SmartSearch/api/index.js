/**
 * Mocking client-server processing
 */
import _trendingTiles from "./trendingTiles.json";
import _suggestions from "./suggestions_v2.json";
import _answerTiles from "./answerTiles.json";
import _token from "./token.json";

const TIMEOUT = 500;

export default {
  fetchTrendingTiles: (cb, timeout) =>
    setTimeout(() => cb(_trendingTiles), timeout || TIMEOUT),
  fetchSuggestions: (cb, timeout) =>
    setTimeout(() => cb(_suggestions), timeout || TIMEOUT),
  fetchAnswerTiles: (cb, timeout) =>
    setTimeout(() => cb(_answerTiles), timeout || TIMEOUT),
  fetchToken: (cb, timeout) => setTimeout(() => cb(_token), timeout || TIMEOUT)
};
