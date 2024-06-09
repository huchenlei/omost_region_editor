import { useState } from 'react';
import './App.css'
import Canvas from './components/canvas/Canvas'
import { IOmostRegion, SAMPLE_REGIONS } from './omost_region';
import { Row, Col } from 'antd';
import RegionPrompt from './components/RegionPrompt';

function App() {
  const [regions, setRegions] = useState<IOmostRegion[]>(SAMPLE_REGIONS);
  const [activeRegionIndex, setActiveRegionIndex] = useState<number>(-1); // Index of the active selection box [-1 if none

  return (
    <>
      <Row id="editor-root">
        <Col span={12}>
          <RegionPrompt
            regions={regions}
            activeRegionIndex={activeRegionIndex}
            setActiveRegionIndex={setActiveRegionIndex}
          ></RegionPrompt>
        </Col>
        <Col span={12}>
          <Canvas
            width={540}
            height={540}
            regions={regions}
            activeRegionIndex={activeRegionIndex}
            setActiveRegionIndex={setActiveRegionIndex}
          ></Canvas>
        </Col>
      </Row>
    </>
  )
}

export default App
