import { useRef, useState } from 'react';
import { Group, Layer, Stage } from 'react-konva';

import SelectionBox from './SelectionBox';
import Konva from 'konva';
import { IOmostRegion } from '../../omost_region';

interface CanvasProps { width: number, height: number, regions: IOmostRegion[] }

const Canvas: React.FC<CanvasProps> = ({ width, height, regions }) => {
  const xRatio = Math.floor(width / 90);
  const yRatio = Math.floor(height / 90);
  const xUnit = 5 * xRatio;
  const yUnit = 5 * yRatio;

  function regionToSelectionBox(region: IOmostRegion, index: number): SelectionBox {
    const [a, b, c, d] = region.rect;
    return {
      index: index,
      x: c * xRatio,
      y: a * yRatio,
      width: (d - c) * xRatio,
      height: (b - a) * yRatio,
      color: region.color,
    };
  }

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
        <Layer>
          {regions.map((region, index) => {
            const initialBox = regionToSelectionBox(region, index);
            return <Group key={index}>
              <SelectionBox
                box={initialBox}
                activeBoxIndex={activeBoxIndex}
                xUnit={xUnit}
                yUnit={yUnit}
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
            </Group>;
          })}
        </Layer>
      </Stage>
    </>
  );
};

export default Canvas;
