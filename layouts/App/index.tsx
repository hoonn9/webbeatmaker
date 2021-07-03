import React from 'react';
import Workspace from '../Workstation';
import { WorkstationContext } from '@contexts/WorkstationContext';
import Header from '@components/Header';
import '../../tailwind.css';

const App = () => {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <WorkstationContext>
        <Workspace />
      </WorkstationContext>
    </div>
  );
};

export default App;
