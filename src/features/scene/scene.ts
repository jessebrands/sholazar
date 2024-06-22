import SceneObject from "@/features/scene/sceneObject.ts";

type Scene = {
    objects: SceneObject[]
}

export const findObjectById = (scene: Scene, uuid: string) => scene.objects.find(o => o.uuid === uuid)

export default Scene
