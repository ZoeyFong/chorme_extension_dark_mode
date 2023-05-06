import React, { useEffect, useState } from 'react';
import { getStorageKey } from '../../utils';
import { NAMESPACE } from '../../const';
import './Popup.css';

const Popup = () => {
  const [isOn, setOn] = useState(undefined);
  const [disabled, setDisabled] = useState(false);
  const [host, setHost] = useState('');

  const handleToggle = async () => {
    const shouldOpen = !isOn;
    setOn(shouldOpen);

    chrome.tabs.query({ currentWindow: true, active: true }).then(([tab]) => {
      if (!tab) return;

      const tabKey = getStorageKey(tab);
      if (shouldOpen) {
        chrome.storage.sync.remove(tabKey);
      } else {
        chrome.storage.sync.set({ [tabKey]: 'off' });
      }

      chrome.tabs.sendMessage(tab.id, {
        shouldOpen,
        type: NAMESPACE,
        tab,
      });
    });
  };

  const listener = ({ type, isDarkBg, host }) => {
    if (type !== NAMESPACE) return;
    setDisabled(isDarkBg);
    setHost(host);
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(listener);

    chrome.tabs.query({ currentWindow: true, active: true }).then(([tab]) => {
      if (!tab) return;

      const tabKey = getStorageKey(tab);

      chrome.storage.sync.get(tabKey, (v) => {
        const shouldOpen = v[tabKey] !== 'off';
        setOn(shouldOpen);

        chrome.tabs.sendMessage(tab.id, {
          shouldOpen,
          type: NAMESPACE,
          tab,
        });
      });
    });

    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, []);

  return (
    <>
      <div className="App">
        <p className="host"> {host} </p>
        {typeof isOn === 'undefined' ? (
          <div className="loading" />
        ) : (
          <label className={`switch ${disabled && 'disabled'}`}>
            <input
              type="checkbox"
              checked={isOn}
              onChange={handleToggle}
              disabled={disabled}
            />
            <span className="slider round" />
          </label>
        )}
      </div>
      {disabled && <p className="tips">This page has dark mode turned on</p>}
    </>
  );
};

export default Popup;
