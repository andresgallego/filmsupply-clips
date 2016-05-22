const assign = Object.assign;

export const selectedFilter = (
    state = [], { filter, type } = {}
  ) => {
  switch (type) {
    case 'ADD_FILTER':
      return [
        ...state,
        {
          id: filter.id,
          name: filter.name
        }
      ];
    case 'REMOVE_FILTER':
      const removedFilter = state.filter(uncheckedFilter => {
        return filter.id === uncheckedFilter.id;
      });

      const index = state.map(item => item.id).indexOf(removedFilter[0].id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    case 'CLEAR_ALL':
      state = [];
      return state;
    default:
      return state;
  }
};

export const allFilters = (
    state = { isFetching: false, filters: [] }, { filters, type } = {}
  ) => {
  switch (type) {
    case 'REQUEST_FILTERS':
      return assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_FILTERS':
      return assign({}, state, {
        filters,
        isFetching: false
      });
    default:
      return state;
  }
};
