import React from 'react';
import Workspace from '../Workspace';
import { TrackContext } from '@contexts/TrackContext';
import Header from '@components/Header';
import '../../tailwind.css';

const App = () => {
  return (
    <div>
      <Header />
      <TrackContext>
        <Workspace />
      </TrackContext>
    </div>
  );
};

export default App;
