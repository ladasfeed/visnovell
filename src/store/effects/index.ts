import type { store as Store } from ".."
import { PortType } from "../types";

export const effectsBuilder = (store: typeof Store) => ({
    addPortToNode: (nodeId: string) => {
        const port = store.port.addEntity({ color: 'black', order: 0 });

        store.node.editEntity(nodeId, (node) => {
            node.ports.push(port)
            return node
        })
    },
    addNode: () => {
        store.node.addEntity({
            hint: 'Hehe',
            ports: [],
            x: 0,
            y: 0
        })
    },
    moveNode: (id: string, { x, y }: { x: number, y: number }) => {
        store.node.editEntity(id, (node) => ({
            ...node,
            x,
            y
        }))
    },
    editPortColor: (portId: string, color: PortType['color']) => {
        store.port.editEntity(portId, (port) => {
            port.color = color
            return port
        })
    }
})

// Current stage?