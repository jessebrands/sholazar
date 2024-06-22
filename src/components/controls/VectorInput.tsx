import DraggableNumberInput from "@/components/controls/DraggableNumberInput.tsx";
import Lina from "@/lina";

interface VectorInputProps {
    vector: Lina.Vector3
    onChange: (value: Lina.Vector3) => void
}

export default function VectorInput(props: VectorInputProps) {
    const vec = props.vector
    const {x, y, z} = vec

    return (
        <div className="flex flex-col">
            <DraggableNumberInput value={x} onChange={x => props.onChange({...vec, x})}
                                  className="border-b-0 rounded-b-none"/>
            <DraggableNumberInput value={y} onChange={y =>  props.onChange({...vec, y})}
                                  className="rounded-none"/>
            <DraggableNumberInput value={z} onChange={z =>  props.onChange({...vec, z})}
                                  className="border-t-0 rounded-t-none"/>
        </div>
    )
}
