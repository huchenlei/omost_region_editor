import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef, useState } from "react";
import { Rect, Transformer } from "react-konva";
import { Box } from "konva/lib/shapes/Transformer";
import Konva from "konva";

interface SelectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
  color: [number, number, number];
}

interface SelectionBoxProps {
  init: SelectionBox;
  onTransform: (newProps: SelectionBox) => void;
}

const roundToNearest = (num: number, mod: number) => Math.round(num / mod) * mod;
const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(value, max));
};
const dimConstraint = (num: number): number => clamp(roundToNearest(num, 64), 256, 1024);

const SelectionBox: React.FC<SelectionBoxProps> = ({ init, onTransform }) => {
  // Enable group-drag only when user interact with the selection box.
  const [isGroupDraggable, setIsGroupDraggable] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const rectRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    // Check if the transformer ref and the rect ref are defined
    if (isSelected && trRef.current && rectRef.current) {
      // Attach the transformer to the rect
      trRef.current.nodes([rectRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const boundBoxFunc = (oldBox: Box, newBox: Box): Box => {
    const adjustedWidth = dimConstraint(newBox.width);
    const adjustedHeight = dimConstraint(newBox.height);
    const dw = adjustedWidth - newBox.width;
    const dh = adjustedHeight - newBox.height;
    const dx = newBox.x - oldBox.x;
    const dy = newBox.y - oldBox.y;

    const newX = newBox.x - (dx !== 0 ? dw : 0);
    const newY = newBox.y - (dy !== 0 ? dh : 0);
    return {
      x: newX,
      y: newY,
      width: adjustedWidth,
      height: adjustedHeight,
      rotation: newBox.rotation,
    };
  };

  const initialStrokeWidth = 2;
  const handleTransform = () => {
    const node = rectRef.current;
    if (node) {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      node.strokeWidth(initialStrokeWidth / Math.max(scaleX, scaleY));
      const scaledWidth = node.width() * scaleX;
      const scaledHeight = node.height() * scaleY;
      node.scaleX(1);
      node.scaleY(1);
      node.width(scaledWidth);
      node.height(scaledHeight);

      const pos = node.getPosition();
      onTransform({
        x: Math.round(pos.x),
        y: Math.round(pos.y),
        width: Math.round(node.width()),
        height: Math.round(node.height()),
        color: init.color,
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
      x: Math.round(pos.x),
      y: Math.round(pos.y),
      height: node.height(),
      width: node.width(),
      color: init.color,
    });
  };

  return <>
    <Rect
      ref={rectRef}
      x={init.x}
      y={init.y}
      width={init.width}
      height={init.height}
      stroke="black"
      fill={`rgb(${init.color.join(',')})`}
      strokeWidth={2}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsSelected(!isSelected)}
      onTransform={handleTransform}
      draggable={isGroupDraggable}
      onDragMove={handleGroupDragMove}
    />
    {isSelected && (
      <Transformer
        ref={trRef}
        attachedTo={rectRef}
        boundBoxFunc={boundBoxFunc}
        // Specify only the corners to have control points
        enabledAnchors={[
          'top-left',
          'top-right',
          'bottom-left',
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