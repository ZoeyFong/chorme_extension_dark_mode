import { NAMESPACE } from '../../const';
import { isDarkAlready } from './utils';

const bgColor = getComputedStyle(document.body).backgroundColor;
const isDarkBg = isDarkAlready(bgColor);

if (!isDarkBg) {
  document.documentElement.classList.add(NAMESPACE);
}

chrome.runtime.onMessage.addListener(({ type, shouldOpen }) => {
  if (type !== NAMESPACE) return;
  if (shouldOpen) {
    document.documentElement.classList.add(NAMESPACE);
  } else {
    document.documentElement.classList.remove(NAMESPACE);
  }
});
