import { NAMESPACE } from '../../const';

chrome.tabs.onActivated.addListener(({ tabId }) => {
  console.log('onActivated');
  chrome.tabs.sendMessage(tabId, {
    type: NAMESPACE,
  });
});

chrome.tabs.onUpdated.addListener((tabId, info) => {
  if (info.status === 'complete') {
    console.log('complete');
    chrome.tabs.sendMessage(tabId, {
      type: NAMESPACE,
    });
  }
});
