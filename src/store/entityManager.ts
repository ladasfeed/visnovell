import React, { useEffect, useId } from "react";
import { EntityBaseType, EventType } from "./types";

export class EntityManager<EntityType extends EntityBaseType, Optional extends Partial<Omit<EntityType, 'id'>> = {}> {
    public entities: {
        [key: string]: EntityType
    } = {};
    public innerIdIncrementor: number = 0;

    private defaultValue: Partial<Omit<EntityType, "id">>;
    public subscribers: {
        [entityId: string]: {
            [callbackId: string]: (enitity: any) => void
        }
    } = {};
    public listSubscribers: {
        [callbackId: string]: (entities: EntityType[]) => void
    } = {};
    public events: EventType[] = [];
    public eventsSubscriber?: (event: EventType) => void;

    constructor(defaultValue: Partial<Omit<EntityType, "id">>) {
        this.defaultValue = defaultValue;
    }

    public getEntities(mode?: 'asArray') {
        if (mode === 'asArray') {
            return Object.values(this.entities).sort((a, b) => a.order - b.order)
        }

        return this.entities
    }

    private addEvent(event: EventType) {
        this.events.push(event);

        if (this.eventsSubscriber) {
            this.eventsSubscriber(event);
        }
    }

    public subscribeAll(cb: (event: EntityType | EntityType[]) => void) {

    }

    public subscribeToList(subscriberId: string, cb: (entities: EntityType[]) => void) {
        this.listSubscribers[subscriberId] = cb;

        return () => {
            delete this.listSubscribers[subscriberId];
        }
    }

    public notifiyListSubscribers() {
        Object.values(this.listSubscribers).forEach((cb) => {
            cb(Object.values(this.entities).sort((a, b) => a.order - b.order))
        })
    }

    public addEntity(entity: Optional) {
        const id = String(Math.floor(Math.random() * 10000));

        this.entities[id] = {
            ...(entity as Omit<EntityType, 'id'>),
            ...(JSON.parse(JSON.stringify(this.defaultValue)) as Omit<EntityType, 'id'>),
            order: this.innerIdIncrementor++,
            id
        } as EntityType;
        this.subscribers[id] = {};

        this.notifiyListSubscribers();

        this.addEvent({
            type: 'create',
            entity: this.entities[id]
        })

        return this.entities[id];
    }

    public removeEntity(id: string) {
        delete this.entities[id];

        this.addEvent({
            type: 'delete',
            entity: { id }
        })

        this.notifiyListSubscribers();
    }
    public subscribe(cb: (enitity: any) => void, id: string, subscriberId: string) {
        if (!this.subscribers[id]) {
            this.subscribers[id] = {}
        }

        const cbId = subscriberId;
        this.subscribers[id][cbId] = cb;

        return () => {
            delete this.subscribers[id][cbId];
        }
    }

    public editEntity(id: string, enitityOrCallback: EntityType | ((entity: EntityType) => EntityType)) {
        const newEntity = typeof enitityOrCallback === 'function' ? enitityOrCallback(this.entities[id]) : enitityOrCallback;

        this.entities[id] = { ...newEntity };

        // this.addEvent({
        //     type: 'edit',
        //     entity: this.entities[id]
        // })

        Object.values(this.subscribers[id]).forEach(cb => {
            cb(this.entities[id])
        })
    }
    public getEntity(id: string) {
        return this.entities[id];
    }
}

type GenericOf<T> = T extends EntityManager<infer X> ? X : never;

export const useEntity = <T extends EntityManager<any>, Entity extends GenericOf<T>>(store: T, id: string): Entity => {
    const subscriberId = useId();
    const [entity, setEntity] = React.useState<any | null>(store.getEntity(id))

    useEffect(() => {
        console.log('rednered ')
        const unsubscribe = store.subscribe((newEntity) => {
            setEntity(newEntity)
        }, id, subscriberId)

        return unsubscribe
    }, [])

    return entity
}


export const useEntities = <T extends EntityManager<any>, Entity extends GenericOf<T>>(store: T): Entity[] => {
    const subscriberId = useId();
    const [entites, setEntities] = React.useState(store.getEntities('asArray') as Entity[]);

    useEffect(() => {
        const unsubscribe = store.subscribeToList(subscriberId, (newEntity) => {
            setEntities(newEntity)
        })

        return unsubscribe
    }, [])

    return entites
}

// Edit image -> we have an id of node entity -> editEntiy ( Image ) -> 
// Add character to a node -> Node.images is an array of ids -> create a new image entity, call ImagesStore -> edit NodeEnitity ( add image to array ) -> rerender
// If image is edited -> rerender only image since it is subscribed to its entity