import GameObject from "@/features/scene/gameObject.ts";

interface MirrorModifier {
    type: "mirror"
    axis: {
        x: boolean
        y: boolean
        z: boolean
    }
}

export const createMirrorModifier = (): MirrorModifier => ({
    type: "mirror",
    axis: {
        x: false,
        y: false,
        z: false,
    }
})
export const applyMirrorModifier = (modifier: MirrorModifier, objects: GameObject[]): GameObject[] => {
    let modifiedObjects: GameObject[] = [...objects]

    if (modifier.axis.x) {
        const objs = modifiedObjects.map(obj => {
            const mirror = {
                ...obj.transform.position,
                x: -obj.transform.position.x,
            }

            const mr = {
                w: obj.transform.rotation.w,
                x: obj.transform.rotation.x,
                y: -obj.transform.rotation.y,
                z: -obj.transform.rotation.z,
            }

            return {
                ...obj,
                transform: {
                    ...obj.transform,
                    position: mirror,
                    rotation: mr,
                }
            }
        })

        modifiedObjects = [...modifiedObjects, ...objs]
    }

    if (modifier.axis.y) {
        const objs = modifiedObjects.map(obj => {
            const mirror = {
                ...obj.transform.position,
                y: -obj.transform.position.y,
            }

            const mr = {
                w: obj.transform.rotation.w,
                x: -obj.transform.rotation.x,
                y: obj.transform.rotation.y,
                z: -obj.transform.rotation.z,
            }

            return {
                ...obj,
                transform: {
                    ...obj.transform,
                    position: mirror,
                    rotation: mr,
                }
            }
        })

        modifiedObjects = [...modifiedObjects, ...objs]
    }

    if (modifier.axis.z) {
        const objs = modifiedObjects.map(obj => {
            const mirror = {
                ...obj.transform.position,
                z: -obj.transform.position.z,
            }

            const mr = {
                w: obj.transform.rotation.w,
                x: -obj.transform.rotation.x,
                y: -obj.transform.rotation.y,
                z: obj.transform.rotation.z,
            }

            return {
                ...obj,
                transform: {
                    ...obj.transform,
                    position: mirror,
                    rotation: mr,
                }
            }
        })

        modifiedObjects = [...modifiedObjects, ...objs]
    }

    return modifiedObjects
}

export default MirrorModifier

