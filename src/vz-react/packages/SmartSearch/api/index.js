/**
 * Mocking client-server processing
 */
import _trendingTiles from './trendingTiles.json'
import _suggestions from './suggestions.json'
import _answerTiles from './answerTiles.json'

const TIMEOUT = 500

export default {
  fetchTrendingTiles: (cb, timeout) =>
    setTimeout(() => cb(_trendingTiles), timeout || TIMEOUT),
  fetchSuggestions: (cb, timeout) =>
    setTimeout(() => cb(_suggestions), timeout || TIMEOUT),
  fetchAnswers: (cb, timeout) =>
    setTimeout(() => cb(_answerTiles), timeout || TIMEOUT),
}
