import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import test from 'tape';
import deepFreeze from 'deep-freeze';
import { fetchFilters } from 'actions/filters';
import { selectedFilter, allFilters } from 'store/reducers/filters';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

test('filters', nest => {
  const allFiltersProps = settings => Object.assign({}, {
    isFetching: false,
    filters: []
  }, settings);

  nest.test('REQUEST_FILTERS action', assert => {
    const message = `should set { isFetching: true, filters: [] }`;

    const stateBefore = allFiltersProps();

    const action = {
      type: 'REQUEST_FILTERS'
    };

    const expected = allFiltersProps({ isFetching: true });

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = allFilters(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });

  nest.test('...async action', assert => {
    const message = 'creates RECEIVE_FILTERS when fetching filters has been done';

    const expected = {
      type: 'RECEIVE_FILTERS',
      filters: true
    };

    const store = mockStore({ filters: [] });

    store.dispatch(fetchFilters())
      .then(data => {
        const actual = {
          type: data.type,
          filters: data.filters.length > 0
        };
        assert.deepEqual(actual, expected, message);
        assert.end();
      });
  });

  nest.test('selectedFilter initial state', assert => {
    const message = `should set state = [] `;

    const expected = [];
    const actual = selectedFilter();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });

  nest.test('ADD_FILTER action', assert => {
    const message = `add filters when select checkbox`;

    const stateBefore = [];

    const action = {
      type: 'ADD_FILTER',
      filter: {
        id: 0,
        name: 'Baby / Infant'
      }
    };

    const expected = [
      {
        id: 0,
        name: 'Baby / Infant'
      }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = selectedFilter(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });

  nest.test('REMOVE_FILTER action', assert => {
    const message = 'remove filters when unselect checkbox';

    const stateBefore = [
      {
        id: 0,
        name: 'Baby / Infant'
      },
      {
        id: 1,
        name: 'Teenager'
      }
    ];

    const action = {
      type: 'REMOVE_FILTER',
      filter: {
        id: 1,
        name: 'Teenager'
      }
    };

    const expected = [
      {
        id: 0,
        name: 'Baby / Infant'
      }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = selectedFilter(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();

  });

  nest.test('CLEAR_ALL action', assert => {
    const message = 'empty selectedFilter array';

    const stateBefore = [
      {
        id: 0,
        name: 'Baby / Infant'
      },
      {
        id: 1,
        name: 'Teenager'
      }
    ];

    const action = {
      type: 'CLEAR_ALL'
    };

    const expected = [];

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = selectedFilter(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();

  });
});
