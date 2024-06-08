import { useRef, useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';

import SelectionBox from './SelectionBox';
import Konva from 'konva';

const initialBox = {
  x: 100,
  y: 100,
  width: 256,
  height: 256,
};

const Canvas = () => {
  const [selectionBox, setSelectionBox] = useState(initialBox);
  const stageRef = useRef<Konva.Stage>(null); // Ref to access the Konva Stage

  return (
    <>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          <Text
            x={selectionBox.x}
            y={selectionBox.y - 20}
            text={`${Math.abs(selectionBox.width)} x ${Math.abs(selectionBox.height)}`}
            fontSize={14}
            fill="black"
          />
          <SelectionBox
            init={initialBox}
            onTransform={setSelectionBox}>
          </SelectionBox>
        </Layer>
      </Stage>
    </>
  );
};

export default Canvas;
