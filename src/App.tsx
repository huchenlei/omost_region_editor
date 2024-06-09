import { useEffect, useState } from 'react';
import './App.css'
import Canvas from './components/canvas/Canvas'
import { IOmostRegion, SAMPLE_REGIONS } from './omost_region';
import { Row, Col } from 'antd';
import RegionPrompt from './components/RegionPrompt';

interface IOmostEditorMessage {
  type: "update" | "save";
  regions?: IOmostRegion[];
}

function App() {
  const [regions, setRegions] = useState<IOmostRegion[]>(SAMPLE_REGIONS);
  const [activeRegionIndex, setActiveRegionIndex] = useState<number>(-1); // Index of the active selection box [-1 if none

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window.parent) {
        return;
      }

      // Decode the message
      const message: IOmostEditorMessage = JSON.parse(event.data);

      if (message.type === "update") {
        // Update the regions state
        setRegions(message.regions!);
      } else if (message.type === "save") {
        // Save the regions to the parent window
        window.parent.postMessage(JSON.stringify({
          type: "save",
          regions: regions,
        }), "*");
      } else {
        console.error("Invalid message type: ", message.type);
      }
    };

    // Add event listener
    window.addEventListener("message", handleMessage);

    // Cleanup function
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [regions]);

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
