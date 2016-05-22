import createClips from 'components/clips';
import createFilters from 'components/filters';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { fetchClips, fetchClipsByFilters } from 'actions/clips';
import { fetchFilters } from 'actions/filters';
import { allClips } from 'store/reducers/clips';
import { allFilters, selectedFilter } from 'store/reducers/filters';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  allClips,
  selectedFilter,
  allFilters
});

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // let us dispatch functions
    loggerMiddleware // neat middleware that logs actions
  )
);

const filterCounter = filter => {
  const getAllFilters = store.getState().allFilters;
  // filter function to retrieve the filter that should increment or decrement
  return getAllFilters.filters.filter(filterUpdated => {
    return filter.filterName === filterUpdated.filterName;
  });
};

const incrementFilterCounter = filter => {
  const incrementedFilter = filterCounter(filter);
  // add 1 to filterCount prop
  incrementedFilter[0].filterCount = incrementedFilter[0].filterCount + 1;
};

const decrementFilterCounter = filter => {
  const decrementedFilter = filterCounter(filter);
  // substract 1 to filterCount prop
  decrementedFilter[0].filterCount = decrementedFilter[0].filterCount - 1;
};

const addFilter = (filter, filterParent) => {
  store.dispatch({ type: 'ADD_FILTER', filter });
  // As you add filters with the checkboxes the filter count should increment
  incrementFilterCounter(filterParent);
  let categories = store.getState().selectedFilter;
  // fetch clips by selected filters
  store.dispatch(fetchClipsByFilters(categories));
};

const removeFilter = (filter, filterParent) => {
  store.dispatch({ type: 'REMOVE_FILTER', filter });
  // As you remove filters with the checkboxes the filter count should decrement
  decrementFilterCounter(filterParent);
  let categories = store.getState().selectedFilter;
  // fetch clips by selected filters
  store.dispatch(fetchClipsByFilters(categories));
};

const clearFilterCount = () => {
  const getAllFilters = store.getState().allFilters;
  return getAllFilters.filters.map(filter => {
    filter.filterCount = 0;
  });
};

const clearAll = () => {
  store.dispatch({ type: 'CLEAR_ALL' });
  clearFilterCount();
  store.dispatch(fetchClips());
};

// First load of clips and filters
store.dispatch(fetchClips());
store.dispatch(fetchFilters());

export default React => () => {
  const Clip = createClips(React);
  const Filter = createFilters(React);
  const state = store.getState();
  const filterProps = {
    filters: state.allFilters.filters,
    selectedFilter: state.selectedFilter,
    addFilter,
    removeFilter,
    clearAll
  };
  const styles = {
    content: {
      display: 'flex'
    }
  };
  return (
    <div className="content" style={ styles.content }>
      <Filter { ...filterProps } />
      <Clip clips={state.allClips.clips} />
    </div>
  );
};
