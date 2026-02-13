import { useState } from 'react';
import './App.css';
import Letter from './components/Letter';
import Proposal from './components/Proposal';

function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="app-container">
      <Letter 
        isOpened={isOpened} 
        onOpen={() => setIsOpened(true)}
        onClose={() => setIsOpened(false)}
      >
        <Proposal />
      </Letter>
    </div>
  );
}

export default App;
