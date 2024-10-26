export type EntityBaseType<T extends { [key: string]: any } = { [key: string]: any }> = {
    id: string,
    order: number
} & T

export type BaseNodeType = EntityBaseType<{
    x: number,
    y: number,
    hint: string,
    ports: PortType[]
}>

export type PortType = EntityBaseType<{
    color: 'black' | 'red',
    order: number
}>

export type EventType = {
    type: string,
    entity: any
}