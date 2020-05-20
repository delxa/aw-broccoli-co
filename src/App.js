import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Components/Header'
import Footer from './Components/Footer'
import Splash from './Components/Splash'

import styled from 'styled-components'

const Page = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`

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
