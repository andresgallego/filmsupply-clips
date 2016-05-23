import fetch from 'isomorphic-fetch';
import _ from 'lodash';

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

const listOfCategoriesId = categories => {
  const lisfOfCategories = categories.map(cat => {
    return `categories[]=${cat.id}`;
  });
  return lisfOfCategories;
};

export const makeUrlHash = categories => {
  const categoriesId = categories.map(cat=> {
    return cat.id;
  });
  const UniqIds = _.uniq(categoriesId);
  const lisfOfParams = UniqIds.map(id => `categories=${id}`);
  const joinParams = lisfOfParams.join('&');
  return joinParams;
};

const concatUrl = categories => {
  const lisfOfCategories = listOfCategoriesId(categories);
  const joinCategories = lisfOfCategories.join('&');
  return joinCategories;
};

export const fetchClipsByFilters = categories => {
  const urlCategories = concatUrl(categories);
  return dispatch => {
    dispatch(requestClips());
    return fetch(`https://api.filmsupply.com/api/clips?${urlCategories}`)
      .then(res => res.json())
      .then(json => getThumbUrl(json))
      .then(thumbUrl => dispatch(receiveClips(thumbUrl)))
      .catch(err => console.log(err));
  };
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
