import 'babel-polyfill'
import React from 'react'
import {HashRouter}  from 'react-router-dom';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import ReactRouter from './routes'
import configureStore from '../store/configureStore'
import rootReducer from './reducers'
import ErrorBoundary from './components/QuickLinks/ErrorBoundary'

import initStyle from '../assets/js/globalStyles'

//import 'vz-odt-styles/fonts.css'
//import 'vz-odt-styles/index.css'

initStyle()

const store = configureStore(rootReducer)

render(
  <Provider store={store}>
  <HashRouter>
    <ErrorBoundary>
    <ReactRouter/>
    </ErrorBoundary>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)
