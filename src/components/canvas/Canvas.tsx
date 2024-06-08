import { useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';

import SelectionBox from './SelectionBox';
import Konva from 'konva';
import { IOmostRegion } from '../../omost_region';

interface CanvasProps { width: number, height: number, regions: IOmostRegion[] }

function regionToSelectionBox(region: IOmostRegion, index: number): SelectionBox {
  const [a, b, c, d] = region.rect.map(v => v * 2);
  return {
    index: index,
    x: c,
    y: a,
    width: d - c,
    height: b - a,
    color: region.color,
  };
}

const Canvas: React.FC<CanvasProps> = ({ width, height, regions }) => {
  const [selectionBoxes, setSelectionBoxes] = useState(regions.map(regionToSelectionBox));
  const [activeBoxIndex, setActiveBoxIndex] = useState<number>(-1); // Index of the active selection box [-1 if none

  const stageRef = useRef<Konva.Stage>(null); // Ref to access the Konva Stage

  return (
    <>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
      >
        {regions.map((region, index) => {
          const initialBox = regionToSelectionBox(region, index);
          return <Layer key={index}>
            <SelectionBox
              box={initialBox}
              activeBoxIndex={activeBoxIndex}
              onTransform={(newProps: SelectionBox) => {
                const newBoxes = selectionBoxes.slice();
                newBoxes[index] = newProps;
                setSelectionBoxes(newBoxes);
              }}
              onClick={() => {
                if (activeBoxIndex === index) {
                  setActiveBoxIndex(-1);
                } else {
                  setActiveBoxIndex(index);
                }
              }}>
            </SelectionBox>
          </Layer>;
        })}
      </Stage>
    </>
  );
};

export default Canvas;
