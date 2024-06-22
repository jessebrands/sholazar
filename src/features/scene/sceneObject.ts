import {v4 as uuid} from "uuid";
import Transform, {createTransform} from "@/features/scene/transform.ts";
import Modifier from "@/features/scene/modifier.ts";
import GameObject, {createGameObject} from "@/features/scene/gameObject.ts";

export enum NodeType {
    COLLECTION = 0,
    MODEL = 1,
}

export interface Node {
    uuid: string;
    name: string;
    children: string[];
}

function createNode(name: string): Node {
    return {
        uuid: uuid(),
        name: name,
        children: []
    }
}

export interface ObjectNode extends Node {
    transform: Transform
}

function createObjectNode(name: string): ObjectNode {
    return {
        ...createNode(name),
        transform: createTransform(),
    }
}

export interface Collection extends Node {
    type: NodeType.COLLECTION
    enabled: boolean
}

export function createCollection(): Collection {
    return {
        ...createNode("Collection"),
        type: NodeType.COLLECTION,
        enabled: true,
    }
}

export interface Model extends ObjectNode {
    type: NodeType.MODEL
    gameObject: GameObject
    modifiers: Modifier[]
}

export function createModel(): Model {
    return {
        ...createObjectNode("Model"),
        type: NodeType.MODEL,
        gameObject: createGameObject(),
        modifiers: []
    }
}

type SceneObject = Collection | Model

export default SceneObject
