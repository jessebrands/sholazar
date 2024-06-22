import * as Phosphor from "@phosphor-icons/react"
import {NodeType} from "@/features/scene/sceneObject.ts";

interface SceneObjectIconProps {
    type: NodeType
    size?: string | number
}

export default function SceneObjectIcon(props: SceneObjectIconProps) {
    switch (props.type) {
        case NodeType.COLLECTION: return <Phosphor.Package size={props.size} />
        case NodeType.MODEL: return <Phosphor.Cube size={props.size} />
        default: return <Phosphor.QuestionMark weight={"bold"} size={props.size} />
    }
}
