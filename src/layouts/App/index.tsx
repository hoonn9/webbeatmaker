import React from 'react';
import Workspace from '../Workstation';
import { WorkstationContext } from '@contexts/WorkstationContext';
import Header from '@components/Header';

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <WorkstationContext>
        <Workspace />
      </WorkstationContext>
    </div>
  );
};

export default App;
