import { useState } from 'react';
import './App.css'
import Canvas from './components/canvas/Canvas'
import { IOmostRegion, SAMPLE_REGIONS } from './omost_region';
import { Row, Col } from 'antd';
import RegionPrompt from './components/RegionPrompt';

function App() {
  const [regions, setRegions] = useState<IOmostRegion[]>(SAMPLE_REGIONS);
  return (
    <>
      <Row id="editor-root">
        <Col span={12}>
          <RegionPrompt regions={regions}></RegionPrompt>
        </Col>
        <Col span={12}>
          <Canvas width={540} height={540} regions={regions}></Canvas>
        </Col>
      </Row>
    </>
  )
}

export default App
