import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
import { Rect, Transformer } from "react-konva";
import { Box } from "konva/lib/shapes/Transformer";
import Konva from "konva";

interface SelectionBox {
  index: number,
  x: number;
  y: number;
  width: number;
  height: number;
  color: [number, number, number];
}

interface SelectionBoxProps {
  box: SelectionBox;
  activeBoxIndex: number;

  // Unit length of the grid
  xUnit: number;
  yUnit: number;

  onTransform: (newProps: SelectionBox) => void;
  onClick: () => void;
}

const roundToNearest = (num: number, mod: number) => Math.round(num / mod) * mod;
const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(value, max));
};

const SelectionBox: React.FC<SelectionBoxProps> = ({ box, activeBoxIndex, xUnit, yUnit, onTransform, onClick }) => {
  const xConstraint = (num: number): number => clamp(roundToNearest(num, xUnit), xUnit, 18 * xUnit);
  const yConstraint = (num: number): number => clamp(roundToNearest(num, yUnit), yUnit, 18 * yUnit);

  // Enable group-drag only when user interact with the selection box.
  const [isGroupDraggable, setIsGroupDraggable] = useState(false);
  const rectRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const isActive = activeBoxIndex === box.index;
  const noActive = activeBoxIndex === -1;
  if (isActive && rectRef.current && trRef.current) {
    // Attach the transformer to the rect
    trRef.current.nodes([rectRef.current]);
    trRef.current.getLayer()?.batchDraw();
  }

  const boundBoxFunc = (_: Box, newBox: Box): Box => {
    return {
      x: xConstraint(newBox.x),
      y: yConstraint(newBox.y),
      width: xConstraint(newBox.width),
      height: yConstraint(newBox.height),
      rotation: newBox.rotation,
    };
  };

  const dragBoundFunc = (pos: Konva.Vector2d): Konva.Vector2d => {
    // pos contains the position the node is being dragged to
    // Get the stage dimensions
    const stageWidth = 18 * xUnit;
    const stageHeight = 18 * yUnit;

    // Get the shape dimensions
    const shapeWidth = box.width;
    const shapeHeight = box.height;

    return {
      x: roundToNearest(clamp(pos.x, 0, stageWidth - shapeWidth), xUnit),
      y: roundToNearest(clamp(pos.y, 0, stageHeight - shapeHeight), yUnit),
    };
  };

  const boxialStrokeWidth = 2;
  const handleTransform = () => {
    const node = rectRef.current;
    if (node) {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      node.strokeWidth(boxialStrokeWidth / Math.max(scaleX, scaleY));
      const scaledWidth = node.width() * scaleX;
      const scaledHeight = node.height() * scaleY;
      node.scaleX(1);
      node.scaleY(1);
      node.width(scaledWidth);
      node.height(scaledHeight);

      const pos = node.getPosition();
      onTransform({
        ...box,
        x: Math.round(pos.x),
        y: Math.round(pos.y),
        width: Math.round(node.width()),
        height: Math.round(node.height()),
      });
      node.getLayer()?.batchDraw();
    }
  };

  const handleMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
    const container = e.target.getStage()?.container();
    if (container)
      container.style.cursor = 'grab';
    // Enable dragging for the group when interaction starts with the selection rect.
    setIsGroupDraggable(true);
  };
  const handleMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
    const container = e.target.getStage()?.container();
    if (container)
      container.style.cursor = 'default';
    // Disable dragging for the group when interaction ends.
    setIsGroupDraggable(false);
  };

  const handleGroupDragMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isGroupDraggable) return;
    const pos = e.target.getPosition();
    const node = rectRef.current;
    if (!node) return;
    onTransform({
      ...box,
      x: Math.round(pos.x),
      y: Math.round(pos.y),
      height: node.height(),
      width: node.width(),
    });
  };

  return <>
    <Rect
      ref={rectRef}
      x={box.x}
      y={box.y}
      width={box.width}
      height={box.height}
      stroke={isActive ? "black" : "transparent"}
      fill={`rgb(${box.color.join(',')})`}
      opacity={isActive || noActive ? 1 : 0.5}
      strokeWidth={1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onTransform={handleTransform}
      draggable={isGroupDraggable}
      dragBoundFunc={dragBoundFunc}
      onDragMove={handleGroupDragMove}
    />
    {isActive && (
      <Transformer
        ref={trRef}
        attachedTo={rectRef}
        boundBoxFunc={boundBoxFunc}
        // Specify only the corners to have control points
        enabledAnchors={[
          'bottom-right',
        ]}
        rotateEnabled={false}
        keepRatio={false}
        // Customize the appearance and behavior of the transformer
        borderEnabled={false}
        anchorSize={8}
        anchorStroke="black"
        anchorFill="#ddd"
      />)
    }
  </>
};

export default SelectionBox;