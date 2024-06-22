import DraggableNumberInput from "@/components/controls/DraggableNumberInput.tsx";
import Lina from "@/lina"

interface RotationInputProps {
    rotation: Lina.Quaternion
    onChange: (rotation: Lina.Quaternion) => void
}

export default function RotationInput(props: RotationInputProps) {
    const {roll, pitch, yaw} = Lina.quat.toEuler(props.rotation)

    const updateRotation = (r: number, p: number, y: number) => {
        props.onChange(Lina.quat.fromEuler(r, p, y))
    }

    return (
        <div className="flex flex-col">
            <DraggableNumberInput value={Lina.toDegrees(roll)} increment={1}
                                  onChange={v => updateRotation(Lina.toRadians(v), pitch, yaw)}
                                  className="border-b-0 rounded-b-none"/>
            <DraggableNumberInput value={Lina.toDegrees(pitch)} increment={1}
                                  onChange={v => updateRotation(roll, Lina.toRadians(v), yaw)}
                                  className="rounded-none"/>
            <DraggableNumberInput value={Lina.toDegrees(yaw)} increment={1}
                                  onChange={v => updateRotation(roll, pitch, Lina.toRadians(v))}
                                  className="border-t-0 rounded-t-none"/>
        </div>
    )
}
