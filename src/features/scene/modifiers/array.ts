import Lina from "@/lina";
import Transform, {addTransforms, createTransform} from "@/features/scene/transform.ts";
import GameObject from "@/features/scene/gameObject.ts";

interface ArrayModifier {
    type: "array"
    count: number
    transform: Transform
}

export const createArrayModifier = (): ArrayModifier => ({
    type: "array",
    count: 2,
    transform: createTransform(),
})

export const applyArrayModifier = (modifier: ArrayModifier, objects: GameObject[]): GameObject[] => {
    let modifiedObjects: GameObject[] = []
    let transform = createTransform()

    for (let i = 0; i < modifier.count; i++) {
        modifiedObjects = [...modifiedObjects, ...objects.map(obj => ({
            ...obj,
            transform: {
                ...obj.transform,
                position: Lina.quat.rotate(transform.rotation, Lina.vec3.add(
                    obj.transform.position,
                    transform.position
                )),
                rotation: Lina.quat.multiply(obj.transform.rotation, transform.rotation),
                scale: obj.transform.scale * transform.scale,
            }
        }))]
        transform = addTransforms(transform, modifier.transform)
    }
    return modifiedObjects
}

export default ArrayModifier
