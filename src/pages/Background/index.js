import { NAMESPACE } from '../../const';

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.sendMessage(tabId, {
    type: NAMESPACE,
  });
});
