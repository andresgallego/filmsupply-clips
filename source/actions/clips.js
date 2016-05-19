import fetch from 'isomorphic-fetch';

const requestClips = () => {
  return {
    type: 'REQUEST_CLIPS'
  };
};

const receiveClips = clips => {
  return {
    type: 'RECEIVE_CLIPS',
    clips
  };
};

const getThumbUrl = json => {
  const movies = json.data.map(clip => clip.movie);
  const thumbs = movies.map(movie => movie.data.thumb);
  const paths = thumbs.map(thumb => thumb.paths);
  const thumbUrl = paths.map((src, id) => {
    return {id, src};
  });
  return thumbUrl;
};

export const fetchClips = () => {
  return dispatch => {
    dispatch(requestClips());
    return fetch(`https://api.filmsupply.com/api/clips`)
      .then(res => res.json())
      .then(json => getThumbUrl(json))
      .then(thumbUrl => dispatch(receiveClips(thumbUrl)))
      .catch(err => console.log(err));
  };
};
