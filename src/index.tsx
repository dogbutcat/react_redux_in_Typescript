import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
// import { Provider } from 'react-redux';

import { todoApp } from './reducer/reducer';
import App, { HomeProps } from './app';
import createProvider from './createProvider';

interface Window {
    devToolsExtension: any;
}

let store = createStore(todoApp, window.devToolsExtension && window.devToolsExtension());
const Provider = createProvider<HomeProps>()
let rootEl = document.getElementById('app');

render(
    <Provider store={store} target={App}>
    </Provider>,
    rootEl
)
