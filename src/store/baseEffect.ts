import { EntityBaseType } from "./types";

export class BaseEffect<Entity extends EntityBaseType> {
    public store = {};

    constructor() { }
}