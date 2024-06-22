import React from "react";

import {useDispatch, useSelector} from "@/app/hooks.ts";
import {nodeUpdated, selectObjectById, selectRootObject} from "@/features/scene";
import SceneObjectIcon from "@/features/scene/components/SceneObjectIcon.tsx";
import EditableLabel from "@/components/EditableLabel.tsx";
import Panel from "@/components/Panel.tsx";
import {selected, selectionCleared, selectSelection} from "@/features/interface/interfaceSlice.ts";
import classNames from "classnames";

interface ItemProps {
    uuid: string
    editable?: boolean
    selectable?: boolean
}

function Item(props: ItemProps) {
    const dispatch = useDispatch()
    const object = useSelector(state => selectObjectById(state, props.uuid))
    const selectedUuid = useSelector(selectSelection)

    const editable = props.editable === undefined ? true : props.editable
    const selectable = props.selectable === undefined ? true : props.selectable

    if (!object) {
        return <div>Invalid UUID</div>
    }

    const {type, name, children, uuid} = object
    const isSelected = selectedUuid === uuid

    const rename = (name: string) => {
        dispatch(nodeUpdated({...object, name}))
    }

    const select = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (selectable && !isSelected) {
            dispatch(selected(uuid))
        }
        ev.stopPropagation()
    }

    const styles = classNames("flex gap-0.5 items-center w-full rounded px-0.5", {
        "hover:bg-gray-800": !isSelected,
        "bg-blue-600 hover:bg-blue-500 text-white": isSelected
    })

    return (
        <li>
            <div className={styles} onClick={select}>
                <SceneObjectIcon type={type} size="20px"/>
                <EditableLabel value={name} onChange={rename} editable={editable}/>
            </div>
            <ul className="ml-5">
                {children.map(c => <Item key={c} uuid={c}/>)}
            </ul>
        </li>
    )
}

export default function SceneOutliner() {
    const rootUuid = useSelector(selectRootObject).uuid
    const dispatch = useDispatch()

    return (
        <Panel onClick={() => dispatch(selectionCleared())}>
            <ul>
                <Item uuid={rootUuid} editable={false} selectable={false}/>
            </ul>
        </Panel>
    );
}
