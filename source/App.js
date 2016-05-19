import createClips from 'components/clips';
import createFilters from 'components/filters';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { fetchClips } from 'actions/clips';
import { fetchFilters } from 'actions/filters';
import { allClips } from 'store/reducers/clips';
import { allFilters, selectedFilter } from 'store/reducers/filters';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  allClips,
  selectedFilter,
  allFilters,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // let us dispatch functions
    loggerMiddleware // neat middleware that logs actions
  )
);

const addFilter = filter => store.dispatch({ type: 'ADD_FILTER', filter });
const removeFilter = filter => store.dispatch({ type: 'REMOVE_FILTER', filter });

store.dispatch(fetchClips());
store.dispatch(fetchFilters());


export default React => () => {
  const Clip = createClips(React);
  const Filter = createFilters(React);
  const state = store.getState();
  const filterProps = {
    filters: state.allFilters.filters,
    addFilter,
    removeFilter
  };
  return (
    <div className="content">
      <Filter { ...filterProps } />
      <Clip clips={state.allClips.clips} />
    </div>
  );
};
