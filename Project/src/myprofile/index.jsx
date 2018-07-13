import 'babel-polyfill'
import React from 'react'
import {HashRouter}  from 'react-router-dom';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import ReactRouter from './routes'
import configureStore from '../store/configureStore'
import rootReducer from './reducers'

import initStyle from '../assets/js/globalStyles'

import 'vz-odt-styles/fonts.css'
import 'vz-odt-styles/index.css'

initStyle()

const store = configureStore(rootReducer)

render(
  <Provider store={store}>
  <HashRouter>
    <ReactRouter/>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)
