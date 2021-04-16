import React from 'react';
import Routes from './routes';

import Store from './store/storeGlobalState';

const App = () => {
  return (
    <Store>
      <Routes />
    </Store>
  );
}

export default App;