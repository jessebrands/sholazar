import ArrayModifier, {applyArrayModifier} from "@/features/scene/modifiers/array.ts";
import MirrorModifier, {applyMirrorModifier} from "@/features/scene/modifiers/mirror.ts";
import GameObject from "@/features/scene/gameObject.ts";

type Modifier = ArrayModifier | MirrorModifier

export const applyModifier = (modifier: Modifier, objects: GameObject[]): GameObject[] => {
    switch (modifier.type) {
        case "array":
            return applyArrayModifier(modifier, objects)

        case "mirror":
            return applyMirrorModifier(modifier, objects)

        default:
            return [...objects]
    }
}

export default Modifier
