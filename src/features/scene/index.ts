import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {State} from "@/app/store.ts";
import {v4 as uuid} from "uuid";
import Scene, {findObjectById} from "@/features/scene/scene.ts"
import {createArrayModifier} from "@/features/scene/modifiers/array.ts";
import {generateObjects} from "@/features/scene/generator/commands.ts";
import {createMirrorModifier} from "@/features/scene/modifiers/mirror.ts";
import Lina from "@/lina";
import {createTransform} from "@/features/scene/transform.ts";
import SceneObject, {Collection, createCollection, createModel} from "@/features/scene/sceneObject.ts";
import {createGameObject} from "@/features/scene/gameObject.ts";

const rootUuid = uuid()
const childUuid = uuid()

const initialState: Scene = {
    objects: [
        {
            ...createCollection(),
            uuid: rootUuid,
            name: "Scene",
            children: [childUuid]
        },
        {
            ...createModel(),
            uuid: childUuid,
            name: "Steps",
            gameObject: {
                ...createGameObject(),
                id: 715955,
                transform: {
                    ...createTransform(),
                    position: {x: 3.5, y: 0, z: 0.45},
                    rotation: Lina.quat.fromEuler(0, 0, 0),
                }
            },
            modifiers: [
                {
                    ...createArrayModifier(),
                    count: 100,
                    transform: {
                        ...createTransform(),
                        position: { x: 0, y: 0, z: 0.45 },
                        rotation: Lina.quat.fromEuler(Math.PI * 2 / 200, Math.PI * 2 / 100, Math.PI * 2 / 45),
                        scale: 1.01,
                    }
                },
                {
                    ...createMirrorModifier(),
                    axis: {
                        x: true,
                        y: true,
                        z: true,
                    }
                }
            ]
        }
    ]
}

const index = createSlice({
    name: "scene",
    initialState: initialState,
    reducers: {
        nodeAdded(state, action: PayloadAction<SceneObject>) {
            const root = findObjectById(state, rootUuid)
            if (root) {
                root.children.push(action.payload.uuid)
                state.objects.push(action.payload)
            }
        },
        nodeUpdated(state, action: PayloadAction<SceneObject>) {
            const index = state.objects.findIndex(o => o.uuid === action.payload.uuid)
            state.objects[index] = action.payload
        }
    }
})

export const {nodeAdded, nodeUpdated} = index.actions

export const selectObjectById = (state: State, uuid: string) => findObjectById(state.scene, uuid)
export const selectRootObject = (state: State) => findObjectById(state.scene, rootUuid) as Collection

export const selectGeneratedObjects = createSelector(
    (state: State) => state.scene,
    (scene) => generateObjects(scene, rootUuid)
)

const sceneReducer = index.reducer

export default sceneReducer
