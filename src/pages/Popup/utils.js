import { NAMESPACE } from '../../const';

export const getTab = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return tabs.length ? tabs[0] : null;
};

export const sendTabMsg = (tabId, shouldOpen) => {
  chrome.tabs.sendMessage(tabId, {
    shouldOpen,
    type: NAMESPACE,
  });
};

// try fix same domain different path
export const getStorageKey = ({ url, title }) => {
  const domain = url.replace(/.*:\/\/|\/.*$/g, '');
  return `${NAMESPACE}_for_${encodeURIComponent(domain + title)}`;
};
