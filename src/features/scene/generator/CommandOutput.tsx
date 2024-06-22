import {useSelector} from "react-redux";
import {selectGeneratedObjects} from "@/features/scene";
import Panel from "@/components/Panel.tsx";
import {toCommand} from "@/features/scene/generator/commands.ts";

export default function CommandOutput() {
    const objects = useSelector(selectGeneratedObjects);

    return (
        <Panel>
            <textarea className="w-full text-sm appearance-none rounded bg-gray-800 text-gray-300 font-mono scrollbar-hide resize-none outline-none"
                      value={objects.map((obj) => toCommand(obj)).join('\n')} readOnly={true}
                      rows={10} spellCheck={false}/>
            <div className="flex gap-4 flex-row text-sm">
                <div>Objects: {objects.length}</div>
            </div>
        </Panel>
    )
}