import { useEffect, useRef, useState } from 'react';
import './App.css'
import Canvas from './components/canvas/Canvas'
import { IOmostRegion, SAMPLE_REGIONS } from './omost_region';
import { Row, Col } from 'antd';
import RegionPrompt from './components/RegionPrompt';

interface IOmostEditorIncomingMessage {
  type: "update" | "save";
  regions?: IOmostRegion[];
}

interface IOMostEditorOutgoingMessage {
  type: "ready" | "save";
  regions?: IOmostRegion[];
}

function App() {
  const [regions, setRegions] = useState<IOmostRegion[]>(SAMPLE_REGIONS);
  const [activeRegionIndex, setActiveRegionIndex] = useState<number>(-1); // Index of the active selection box [-1 if none
  const latestRegions = useRef<IOmostRegion[]>(regions);

  useEffect(() => {
    latestRegions.current = regions;
  }, [regions]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window.parent) {
        return;
      }

      // Decode the message
      const message: IOmostEditorIncomingMessage = event.data;

      if (message.type === "update") {
        // Update the regions state
        setRegions(message.regions!);
      } else if (message.type === "save") {
        // Save the regions to the parent window
        window.parent.postMessage({
          type: "save",
          regions: latestRegions.current,
        } as IOMostEditorOutgoingMessage, "*");
      } else {
        console.error("Invalid message type: ", message.type);
      }
    };

    // Add event listener
    window.addEventListener("message", handleMessage);

    // Acknowledge the parent window
    if (window.parent !== window.top) {
      window.parent.postMessage({ type: "ready" } as IOMostEditorOutgoingMessage, "*");
    }

    // Cleanup function
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <Row id="editor-root">
        <Col span={12} style={{padding: "10px"}}>
          <RegionPrompt
            regions={regions}
            setRegions={setRegions}
            activeRegionIndex={activeRegionIndex}
            setActiveRegionIndex={setActiveRegionIndex}
          ></RegionPrompt>
        </Col>
        <Col span={12} style={{padding: "10px"}}>
          <Canvas
            width={540}
            height={540}
            regions={regions}
            activeRegionIndex={activeRegionIndex}
            setActiveRegionIndex={setActiveRegionIndex}
            setRegions={setRegions}
          ></Canvas>
        </Col>
      </Row>
    </>
  )
}

export default App
