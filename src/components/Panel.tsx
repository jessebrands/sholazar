import React from "react";

interface PanelProps {
    onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Panel(props: React.PropsWithChildren<PanelProps>) {
    return (
        <div className="rounded bg-gray-900 p-1" onClick={props.onClick}>
            {props.children}
        </div>
    )
}