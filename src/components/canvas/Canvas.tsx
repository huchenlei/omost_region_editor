import { useRef, useState } from 'react';
import { Group, Layer, Stage } from 'react-konva';

import SelectionBox from './SelectionBox';
import Konva from 'konva';
import { IOmostRegion } from '../../omost_region';

interface CanvasProps {
  width: number;
  height: number;
  regions: IOmostRegion[];

  activeRegionIndex: number;
  setActiveRegionIndex: (index: number) => void;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const xRatio = Math.floor(props.width / 90);
  const yRatio = Math.floor(props.height / 90);
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

  const [selectionBoxes, setSelectionBoxes] = useState(props.regions.map(regionToSelectionBox));

  const stageRef = useRef<Konva.Stage>(null); // Ref to access the Konva Stage

  return (
    <>
      <Stage
        ref={stageRef}
        width={props.width}
        height={props.height}
      >
        <Layer>
          {props.regions.map((region, index) => {
            const initialBox = regionToSelectionBox(region, index);
            return <Group key={index}>
              <SelectionBox
                box={initialBox}
                activeBoxIndex={props.activeRegionIndex}
                xUnit={xUnit}
                yUnit={yUnit}
                onTransform={(newProps: SelectionBox) => {
                  const newBoxes = selectionBoxes.slice();
                  newBoxes[index] = newProps;
                  setSelectionBoxes(newBoxes);
                }}
                onClick={() => {
                  if (props.activeRegionIndex === index) {
                    props.setActiveRegionIndex(-1);
                  } else {
                    props.setActiveRegionIndex(index);
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
