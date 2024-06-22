import Lina from "@/lina";

type Transform = {
    position: Lina.Vector3
    rotation: Lina.Quaternion
    scale: number
}

export function createTransform(): Transform {
    return {
        position: {x: 0, y: 0, z: 0},
        rotation: Lina.quat.identity(),
        scale: 1.0,
    }
}

export function addTransforms(a: Transform, b: Transform): Transform {
    return {
        position: Lina.vec3.add(a.position, b.position),
        rotation: Lina.quat.multiply(a.rotation, b.rotation),
        scale: a.scale * b.scale,
    }
}

export default Transform
