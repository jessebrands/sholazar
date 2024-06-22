import * as Phosphor from "@phosphor-icons/react"
import {useDispatch} from "@/app/hooks.ts";
import {nodeAdded} from "@/features/scene";
import {selected} from "@/features/interface/interfaceSlice.ts";
import {createModel} from "@/features/scene/sceneObject.ts";

export default function Toolbar() {
    const dispatch = useDispatch()

    const addGameObject = () => {
        const model = createModel()
        dispatch(nodeAdded(model))
        dispatch(selected(model.uuid))
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="rounded border p-0.5 border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700"
                 onClick={addGameObject}>
                <Phosphor.Cube size={32} color="white"/>
            </div>
        </div>
    )
}
