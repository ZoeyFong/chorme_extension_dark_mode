import React, { useEffect, useState } from 'react';
import { getStorageKey } from '../../utils';
import { NAMESPACE } from '../../const';
import './Popup.css';

const Popup = () => {
  const [isOn, setOn] = useState(undefined);

  const handleToggle = async () => {
    const shouldOpen = !isOn;
    setOn(shouldOpen);

    chrome.tabs.query({ currentWindow: true, active: true }).then(([tab]) => {
      if (!tab) return;

      if (shouldOpen) {
        chrome.storage.sync.remove(getStorageKey(tab));
      } else {
        chrome.storage.sync.set({ [getStorageKey(tab)]: 'off' });
      }

      chrome.tabs.sendMessage(tab.id, {
        shouldOpen,
        type: NAMESPACE,
        tab,
      });
    });
  };

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }).then(([tab]) => {
      if (!tab) return;

      chrome.storage.sync.get(getStorageKey(tab), (v) => {
        const shouldOpen = v[getStorageKey(tab)] !== 'off';
        setOn(shouldOpen);
      });
    });
  }, []);

  // const openGit = () => {
  //   window.open(
  //     'https://github.com/ZoeyFong/chorme_extension_dark_mode.git',
  //     '_blank'
  //   );
  // };

  return (
    <div className="App">
      <b> Dark Mode </b>
      {typeof isOn === 'undefined' ? (
        <div className="loading" />
      ) : (
        <label className="switch">
          <input type="checkbox" checked={isOn} onChange={handleToggle} />
          <span className="slider round" />
        </label>
      )}
      <p className="tips">Effect on this single tab</p>
      {/* <p className="tips" onClick={openGit}>
        Github 🔗
      </p> */}
    </div>
  );
};

export default Popup;
