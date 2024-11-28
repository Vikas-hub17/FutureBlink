import React from 'react';
import Flowchart from './components/Flowchart';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <h1>Email Marketing Flowchart</h1>
      <Flowchart />
    </>
  );
};

export default App;
