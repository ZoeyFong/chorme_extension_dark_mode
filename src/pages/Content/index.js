import { isDarkAlready } from './utils';
import { NAMESPACE } from '../../const';
import { getStorageKey } from '../../utils';

const bgColor = getComputedStyle(document.body).backgroundColor;
const isDarkBg = isDarkAlready(bgColor);

const tabKey = getStorageKey({ url: location.href });

const retrieveFlagFromStorage = async () => {
  const store = await chrome.storage.sync.get(tabKey);
  return store[tabKey] !== 'off';
};

const changeClass = (shouldOpen) => {
  if (shouldOpen && !isDarkBg) {
    document.documentElement.classList.add(NAMESPACE);
  } else {
    document.documentElement.classList.remove(NAMESPACE);
  }
};

chrome.runtime.onMessage.addListener(async ({ type, shouldOpen }) => {
  if (type !== NAMESPACE) return;
  if (typeof shouldOpen === 'undefined') {
    shouldOpen = await retrieveFlagFromStorage();
  } else {
    chrome.runtime.sendMessage({
      isDarkBg,
      type: NAMESPACE,
      host: location.host,
    });
  }
  changeClass(shouldOpen);
});
