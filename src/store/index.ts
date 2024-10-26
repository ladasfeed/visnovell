import { effectsBuilder } from "./effects";
import { NodeEntityManager } from "./entities/nodes";
import { PortEntityManager } from "./entities/port";

export const store = {
    node: NodeEntityManager,
    port: PortEntityManager,

}

export const effects = effectsBuilder(store)