import { Layer, Rect, Stage, Text } from "react-konva";
import { BasicNode } from "../node";
import { useRef, useState } from "react";
import { Stage as StageType } from "konva/lib/Stage";
import { useEntities } from "../../store/entityManager";
import { NodeEntityManager } from "../../store/entities/nodes";

const NodesLayer = () => {
  const nodes = useEntities(NodeEntityManager);

  return (
    <Layer>
      {nodes.map((node, index) => (
        <BasicNode key={index} {...node} />
      ))}
    </Layer>
  );
};

export const CanvasEntry = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const stageRef = useRef<StageType>(null);

  const handleWheel = (event: any) => {
    event.evt.preventDefault();
    const currentStageRef = stageRef.current;

    if (currentStageRef) {
      const stage = currentStageRef!.getStage();

      if (event.evt.ctrlKey) {
        const oldScale = stage.scaleX();

        const mousePointTo = {
          x: stage.getPointerPosition()!.x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition()!.y / oldScale - stage.y() / oldScale,
        };

        const unboundedNewScale = oldScale - event.evt.deltaY * 0.01;
        let newScale = unboundedNewScale;
        if (unboundedNewScale < 0.1) {
          newScale = 0.1;
        } else if (unboundedNewScale > 10.0) {
          newScale = 10.0;
        }

        const newPosition = {
          x:
            -(mousePointTo.x - stage.getPointerPosition()!.x / newScale) *
            newScale,
          y:
            -(mousePointTo.y - stage.getPointerPosition()!.y / newScale) *
            newScale,
        };

        setScale(newScale);
        setPosition(newPosition);
      } else {
        const dragDistanceScale = 0.75;
        const newPosition = {
          x: position.x - dragDistanceScale * event.evt.deltaX,
          y: position.y - dragDistanceScale * event.evt.deltaY,
        };

        setPosition(newPosition);
      }
    }
  };

  return (
    <Stage
      scaleX={scale}
      scaleY={scale}
      onWheel={handleWheel}
      ref={stageRef}
      x={position.x}
      y={position.y}
      width={1000}
      height={1000}
      style={{ border: "2px solid black" }}
    >
      <Layer>
        <Rect fill="#8187e1" width={1000} height={1000} />
      </Layer>
      <NodesLayer />
    </Stage>
  );
};
