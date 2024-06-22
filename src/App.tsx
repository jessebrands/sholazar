import SceneOutliner from "./features/scene/components/SceneOutliner.tsx";
import Renderer from "@/features/scene/renderer/Renderer.tsx";
import CommandOutput from "@/features/scene/generator/CommandOutput.tsx";
import Toolbar from "@/features/interface/Toolbar.tsx";
import SceneObjectProperties from "@/features/scene/components/SceneObjectProperties.tsx";

function App() {
    return (
        <div className="grid h-screen w-screen grid-rows-layout grid-cols-layout gap-1 p-2">
            <div className="col-span-3"></div>
            <Toolbar/>
            <Renderer/>
            <div className="grid grid-rows-2 gap-1">
                <SceneOutliner/>
                <SceneObjectProperties />
            </div>
            <div className="col-span-3">
                <CommandOutput/>
            </div>
        </div>
    )
}

export default App
