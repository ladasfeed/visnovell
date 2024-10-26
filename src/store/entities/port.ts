import { EntityManager } from "../entityManager";
import { PortType } from "../types";

export const PortEntityManager = new EntityManager<PortType>({
    color: 'black',
});
