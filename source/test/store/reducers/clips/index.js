import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import test from 'tape';
import deepFreeze from 'deep-freeze';
import { fetchClips } from 'actions/clips';
import { allClips } from 'store/reducers/clips';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

test('clips', nest => {
  const allClipsProps = settings => Object.assign({}, {
    isFetching: false,
    clips: []
  }, settings);

  nest.test('...get clips initial state', assert => {
    const message = `should set { isFetching: false, clips: []  }`;

    const expected = allClipsProps();
    const actual = allClips();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });

  nest.test('REQUEST_CLIPS action', assert => {
    const message = `should set { isFetching: true, clips: [] }`;

    const stateBefore = allClipsProps();

    const action = {
      type: 'REQUEST_CLIPS'
    };

    const expected = allClipsProps({ isFetching: true });

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = allClips(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });

  nest.test('RECEIVE_CLIPS action', assert => {
    const message = `should set {
      isFetching: true,
      clips
    }`;

    const stateBefore = allClipsProps();

    const action = {
      type: 'RECEIVE_CLIPS',
      clips: ['mom and baby', 'family of three']
    };

    const expected = allClipsProps({
      clips: ['mom and baby', 'family of three']
    });

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = allClips(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });

  nest.test('...async actions', assert => {
    const message = 'creates RECEIVE_CLIPS when fetching clips has been done';

    const expected = {
      type: 'RECEIVE_CLIPS',
      clips: true
    };

    const store = mockStore({ clips: [] });

    store.dispatch(fetchClips())
      .then(data => {
        const actual = {
          type: data.type,
          clips: data.clips.length > 0
        };
        assert.deepEqual(actual, expected, message);
        assert.end();
      });
  });
});
