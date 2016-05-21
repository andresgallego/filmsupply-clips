import fetch from 'isomorphic-fetch';

const requestFilters = () => {
  return {
    type: 'REQUEST_FILTERS'
  };
};

const receiveFilters = filters => {
  return {
    type: 'RECEIVE_FILTERS',
    filters
  };
};

const getFiltersAndSubfilters = json => {
  const filters = json.data.map(filter => {
    return {
      id: filter.id,
      filterName: filter.name,
      filterCount: 0,
      subfilters: filter.categories.data.map(cat => {
        return {
          id: cat.id,
          name: cat.name
        };
      })
    };
  });
  return filters;
};

export const fetchFilters = () => {
  return dispatch => {
    dispatch(requestFilters());
    return fetch(`https://api.filmsupply.com/api/clips/filters`)
      .then(res => res.json())
      .then(json => getFiltersAndSubfilters(json))
      .then(filters => dispatch(receiveFilters(filters)))
      .catch(err => console.log(err));
  };
};
