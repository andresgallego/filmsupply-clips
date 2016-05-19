import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import createApp, { store } from './App';

const App = createApp(React);

const mapStateToProps = state => {
  return {
    clips: state.allClips.clips,
    filters: state.allFilters.filters
  };
};
const Filter = connect(mapStateToProps)(App);

render(
  <Provider store={store}>
    <Filter></Filter>
  </Provider>,
  document.getElementById('root')
);
