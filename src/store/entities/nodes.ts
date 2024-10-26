import { EntityManager } from "../entityManager";
import { BaseNodeType } from "../types";

export const NodeEntityManager = new EntityManager<BaseNodeType>({
    x: 0,
    y: 0,
    hint: 'qwe',
    ports: []
});