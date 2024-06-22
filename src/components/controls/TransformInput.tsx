import DraggableNumberInput from "@/components/controls/DraggableNumberInput.tsx";
import RotationInput from "@/components/controls/RotationInput.tsx";
import VectorInput from "@/components/controls/VectorInput.tsx";
import Lina from "@/lina";
import Transform from "@/features/scene/transform.ts";

interface TransformInputProps {
    transform: Transform
    onChange: (value: Transform) => void
}

export default function TransformInput(props: TransformInputProps) {
    const t = props.transform

    const updatePosition = (position: Lina.Vector3) => props.onChange({...t, position})
    const updateRotation = (rotation: Lina.Quaternion) => props.onChange({...t, rotation})
    const updateScale = (scale: number) => props.onChange({...t, scale})

    return (
        <div className="grid grid-cols-properties gap-1 gap-y-2">
            <div>Position</div>
            <VectorInput vector={t.position} onChange={updatePosition}/>

            <div>Rotation</div>
            <RotationInput rotation={t.rotation} onChange={updateRotation}/>

            <div>Scale</div>
            <div className="flex flex-col">
                <DraggableNumberInput value={t.scale} onChange={updateScale}/>
            </div>
        </div>
    )
}
