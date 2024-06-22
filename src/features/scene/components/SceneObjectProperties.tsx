
import Panel from "@/components/Panel.tsx";
import {useSelector} from "@/app/hooks.ts";
import {selectSelectedObject} from "@/features/interface/interfaceSlice.ts";
import SceneObject from "@/features/scene/sceneObject.ts";

interface PropertiesSwitchProps {
    object: SceneObject
}

function PropertiesSwitch(props: PropertiesSwitchProps) {
    const {object} = props;
    switch (object.type) {
        default:
            return <></>
    }
}

export default function SceneObjectProperties() {
    const selectedObject = useSelector(selectSelectedObject)

    if (!selectedObject) return <></>

    return (
        <Panel>
            <PropertiesSwitch object={selectedObject}/>
        </Panel>
    )
}
