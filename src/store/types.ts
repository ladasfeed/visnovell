export type EntityBaseType<
  T extends { [key: string]: any } = { [key: string]: any }
> = {
  id: string;
  order: number;
} & T;

export type BaseNodeType = EntityBaseType<{
  hint: string;
  ports: PortType[];
}> &
  PosType;

export type PortType = EntityBaseType<{
  color: "black" | "red";
  order: number;
}>;

export type PosType = {
  x: number;
  y: number;
};

export type EventType = {
  type: string;
  entity: any;
};
