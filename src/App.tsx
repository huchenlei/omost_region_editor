import { useState } from 'react';
import './App.css'
import Canvas from './components/canvas/Canvas'
import { IOmostRegion, SAMPLE_REGIONS } from './omost_region';

function App() {
  const [regions, setRegions] = useState<IOmostRegion[]>(SAMPLE_REGIONS);
  return (
    <>
      <Canvas width={512} height={512} regions={regions}></Canvas>
    </>
  )
}

export default App
