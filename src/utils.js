import { NAMESPACE } from './const';

export const getHost = (url) => {
  const arr = url.replace(/^.*\/\/(.*)/, '$1').split('/');
  return arr[0];
};

export const getStorageKey = ({ url }) => {
  const host = getHost(url);
  return `${NAMESPACE}_for_${host}`;
};
