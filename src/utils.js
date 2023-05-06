import { NAMESPACE } from './const';

export const getDomainAndFirstPath = (url) => {
  const domainWithPath = url.replace(/^.*\/\/(.*)/, '$1').split('/');
  return domainWithPath[0] + (domainWithPath[1] || '');
};

export const getStorageKey = ({ url }) => {
  const domainAndFirstPath = getDomainAndFirstPath(url);
  return `${NAMESPACE}_for_${domainAndFirstPath}`;
};
