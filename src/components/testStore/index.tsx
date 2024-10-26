import { memo, useEffect } from "react";
import { effects } from "../../store";
import { NodeEntityManager } from "../../store/entities/nodes";
import { useEntities, useEntity } from "../../store/entityManager";
import { PortEntityManager } from "../../store/entities/port";

const Port = memo((props: { id: string }) => {
  const port = useEntity(PortEntityManager, props.id);

  const onEditPortColor = () => {
    effects.editPortColor(props.id, "red");
  };

  useEffect(() => {});

  return (
    <div>
      <button onClick={onEditPortColor}>Edit port color</button>
      <div>Port: {port.id}</div>
      <div>{port.color}</div>
    </div>
  );
});

const BasicNode = memo((props: { id: string }) => {
  const entity = useEntity(NodeEntityManager, props.id);

  useEffect(() => {}, [entity]);

  const editHint = () => {
    NodeEntityManager.editEntity(props.id, (node) => {
      node.hint = "qweqw";
      return node;
    });
  };

  const addPortHandler = () => {
    effects.addPortToNode(entity.id);
  };

  return (
    <div>
      <div style={{ padding: 10 }}>
        <button onClick={editHint}>Edit hint</button>
        <button onClick={addPortHandler}>Add a port</button>
        <div>
          {entity.id}:{entity.x} {entity.y}
        </div>
      </div>

      <div>
        {entity.ports.map((item) => (
          <Port key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
});

export const TestStore = () => {
  const nodes = useEntities(NodeEntityManager);

  useEffect(() => {});

  const addNodeHandler = () => {
    effects.addNode();
  };

  return (
    <div className="sidebar">
      <button onClick={addNodeHandler}>Add node</button>
      <ul>
        {nodes.map((item) => {
          return <BasicNode {...item} key={item.id} />;
        })}
      </ul>
    </div>
  );
};
