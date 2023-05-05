import React, { useEffect, useState } from 'react';
import { getTab, sendTabMsg, getStorageKey } from './utils';
import './Popup.css';

const Popup = () => {
  const [isOn, setOn] = useState(true);

  const handleToggle = async () => {
    const shouldOpen = !isOn;
    setOn(shouldOpen);

    getTab().then((tab) => {
      if (!tab) return;

      if (shouldOpen) {
        chrome.storage.sync.remove(getStorageKey(tab));
      } else {
        chrome.storage.sync.set({ [getStorageKey(tab)]: 'off' });
      }

      sendTabMsg(tab.id, shouldOpen);
    });
  };

  useEffect(() => {
    getTab().then((tab) => {
      if (!tab) return;

      chrome.storage.sync.get(getStorageKey(tab), (v) => {
        const shouldOpen = v[getStorageKey(tab)] !== 'off';

        if (!shouldOpen) {
          sendTabMsg(tab.id, false);
        }
        setOn(shouldOpen);
      });
    });
  }, []);

  return (
    <div className="App">
      <b> Dark Mode </b>
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider round" />
      </label>
      <p className="tips">Effect on this single tab</p>
    </div>
  );
};

export default Popup;
