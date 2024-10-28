import { Group, Line, Rect } from "react-konva";
import { PosType } from "../../store/types";
import { useEntity } from "../../store/entityManager";
import { PortEntityManager } from "../../store/entities/port";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { useRef, useState } from "react";
import * as Konva from "konva/lib/shapes/Line";

type PropsType = { id: string } & PosType;

const PORT_SIZE = 50;
const LINE_STROKE_WIDTH = 2;
const LINE_START_POS = PORT_SIZE / 2 - LINE_STROKE_WIDTH;

export const Port = (props: PropsType) => {
  const entity = useEntity(PortEntityManager, props.id);
  const lineRef = useRef<Konva.Line<Konva.LineConfig>>(null);
  const [isLine, setIsLine] = useState(false);

  const onDragStart = (e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => {
    e.cancelBubble = true;
    setIsLine(true);

    console.log(e, "DRag event");
  };

  const onDragMove = (e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => {
    e.target.x(props.x);
    e.target.y(props.y);
    console.log(lineRef);

    const stage = e.target.getStage();
    const pointerPosition = stage!.getPointerPosition();
    const offset = { x: e.target.parent?.attrs.x, y: e.target.parent?.attrs.y };

    const imageClickX =
      pointerPosition!.x - offset.x * stage!.attrs.scaleX - stage!.attrs.x;
    const imageClickY =
      pointerPosition!.y - offset.y * stage!.attrs.scaleY - stage!.attrs.y;

    if (lineRef.current) {
      lineRef.current.points([
        LINE_START_POS,
        LINE_START_POS,
        imageClickX / stage!.attrs.scaleX,
        imageClickY / stage!.attrs.scaleX,
      ]);
    }
  };

  const onDragEnd = (e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => {
    setIsLine(false);
    // @ts-ignore
    e.connect = true;
    console.log(e, "DRag event");
  };

  return (
    <>
      <Group
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragMove={onDragMove}
        draggable
        x={props.x}
        y={props.y}
        width={PORT_SIZE}
        height={PORT_SIZE}
        onClick={() => console.log("??")}
      >
        <Rect fill={entity.color} width={PORT_SIZE} height={PORT_SIZE} />
        <Line
          stroke="green"
          ref={lineRef}
          strokeWidth={2}
          points={[
            LINE_START_POS,
            LINE_START_POS,
            LINE_START_POS,
            LINE_START_POS,
          ]}
        />
      </Group>
    </>
  );
};
