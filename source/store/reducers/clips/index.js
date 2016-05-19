const assign = Object.assign;

export const allClips = (
    state = { isFetching: false, clips: [] }, { clips, type } = {}
  ) => {
  switch (type) {
    case 'REQUEST_CLIPS':
      return assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_CLIPS':
      return assign({}, state, {
        clips,
        isFetching: false
      });
    default:
      return state;
  }
};
