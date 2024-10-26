import { Group, Image, Text } from "react-konva";
import useImage from "use-image";
import { effects } from "../../store";
import { useEntity } from "../../store/entityManager";
import { NodeEntityManager } from "../../store/entities/nodes";
import Konva from "konva";

const IMG =
  "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg";

export const BasicNode = ({ id }: { id: string }) => {
  const entity = useEntity(NodeEntityManager, id);
  const [image] = useImage(IMG);

  const onDragMove = (event: Konva.KonvaEventObject<DragEvent>) => {
    // console.log(event, "event");
    effects.moveNode(id, {
      x: Math.floor(event.target.attrs.x),
      y: Math.floor(event.target.attrs.y),
    });
  };

  return (
    <Group
      onDragEnd={onDragMove}
      x={entity.x - (entity.x % 50)}
      y={entity.y - (entity.y % 50)}
      draggable={true}
      width={200}
      height={150}
    >
      <Image image={image} width={100} height={100} />
      <Text onClick={() => console.log(12312)} text="Blob" />
    </Group>
  );
};
