import React from 'react';
import './App.css';

import { Page } from './Components/Styled/StyledComponents'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Splash from './Components/Splash'

function App() {
  return (
    <Page>
      <Header />
      <Splash />
      <Footer />
    </Page>
  );
}

export default App;
