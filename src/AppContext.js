import React from 'react';

export const AppContext = React.createContext();

const initialState = {
    Contacts: [
      {
        id: 1001,
        firstname: 'Tony',
        lastname: 'Stark',
        phone: '512-555-5555',
        email: 'tony@starkindustries.com'
      },
      {
        id: 1002,
        firstname: 'Bruce',
        lastname: 'Banner',
        phone: '512-555-5678',
        email: 'iamhulk@gmail.com'
      },
      {
        id: 1003,
        firstname: 'Wanda',
        lastname: 'Romanoff',
        phone: '512-555-1234',
        email: 'scarletwitch@gmail.com'
      },
    ],
    lastContactId: 1003,
  };

  function usePersistState(key, defaultValue) {
    const [state, setState] = React.useState(() => {
      const persistedState = sessionStorage.getItem(key);
      return persistedState ? JSON.parse(persistedState) : defaultValue;
    });
  
    React.useEffect(() => {
      window.sessionStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);
    return [state, setState];
  }

  export default function Context(props) {
    const [appState, setAppState] = usePersistState("state", initialState);
    const context = React.useMemo(() => ({appState, setAppState}), [appState, setAppState]);

    return (
        <AppContext.Provider value={context} {...props} />
    );
  }