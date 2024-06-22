import Scene, {findObjectById} from "@/features/scene/scene.ts";
import {applyModifier} from "@/features/scene/modifier.ts";
import Lina from "@/lina";
import GameObject from "@/features/scene/gameObject.ts";
import Transform, {addTransforms, createTransform} from "@/features/scene/transform.ts";
import SceneObject, {Model, NodeType} from "@/features/scene/sceneObject.ts";

function processCollection(): GameObject[] {
    return []
}

function processModel(_: Scene, model: Model, origin: Transform): GameObject[] {
    const object = model.gameObject
    let objects: GameObject[] = [object]
    model.modifiers.forEach(modifier => objects = applyModifier(modifier, objects))

    // Apply origin offset to the objects
    return objects.map(obj => {
        const localTranslation: Transform = {
            position: Lina.vec3.add(
                Lina.quat.rotate(model.transform.rotation, obj.transform.position),
                model.transform.position
            ),
            rotation: Lina.quat.multiply(model.transform.rotation, obj.transform.rotation),
            scale: obj.transform.scale * model.transform.scale,
        }

        return {
            ...obj,
            transform: addTransforms(origin, localTranslation),
        }
    });
}

function invoke(scene: Scene, object: SceneObject, origin: Transform): GameObject[] {
    switch (object.type) {
        case NodeType.COLLECTION:
            return processCollection()

        case NodeType.MODEL:
            return processModel(scene, object, origin)
    }
}

function processObject(scene: Scene, object: SceneObject, origin: Transform): GameObject[] {
    const children = object.children
        .map(uuid => findObjectById(scene, uuid)) as SceneObject[]

    return [
        ...invoke(scene, object, origin),
        ...children.flatMap(child => processObject(scene, child, origin))
    ]
}

export function toCommand(object: GameObject): string {
    const {id, transform} = object
    const {x, y, z} = transform.position
    const {yaw, pitch, roll} = Lina.quat.toEuler(transform.rotation)
    const scale = transform.scale

    return `.gob sp ${id}`
        + (Lina.notZero(x) ? ` m f ${Lina.round(x)}` : '')
        + (Lina.notZero(y) ? ` m l ${Lina.round(y)}` : '')
        + (Lina.notZero(z) ? ` m u ${Lina.round(z)}` : '')
        + (Lina.notZero(yaw) ? ` t ${Lina.round(Lina.toDegrees(yaw))}` : '')
        + (Lina.notZero(pitch) ? ` p ${Lina.round(Lina.toDegrees(pitch))}` : '')
        + (Lina.notZero(roll) ? ` rol ${Lina.round(Lina.toDegrees(roll))}` : '')
        + (Lina.notZero(scale - 1) ? ` sc ${Lina.round(scale)}` : '')
}


export function generateObjects(scene: Scene, rootUuid: string): GameObject[] {
    const origin = createTransform()
    const rootObject = findObjectById(scene, rootUuid)
    if (!rootObject) {
        return []
    }

    return processObject(scene, rootObject, origin)
}
