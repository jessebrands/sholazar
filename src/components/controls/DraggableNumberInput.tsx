import classNames from "classnames";
import React from "react";
import Lina from "@/lina";

interface DraggableNumberInputProps {
    deadZone?: number
    increment?: number
    className?: string;
    value: number
    onChange: (value: number) => void
}

export default function DraggableNumberInput(props: DraggableNumberInputProps) {
    const deadZone = props.deadZone !== undefined ? props.deadZone : 3
    const increment = props.increment !== undefined ? props.increment : 0.1
    const value = props.value

    const inputRef = React.useRef<HTMLInputElement>(null)

    const styles = classNames(
        "cursor-e-resize bg-gray-950 border border-gray-700 rounded text-center outline-none",
        props.className
    )

    const startDrag = (ev: React.MouseEvent<HTMLInputElement>) => {
        const startX = ev.clientX
        const startValue = value

        const endDrag = (ev: MouseEvent) => {
            if (Math.abs(startX - ev.clientX) < deadZone && inputRef.current) {
                inputRef.current.focus()
                inputRef.current.select()
            }

            document.removeEventListener("mouseup", endDrag)
            document.removeEventListener("mousemove", update)
        }

        const update = (ev: MouseEvent) => {
            const delta = startX - ev.clientX
            if (Math.abs(delta) > deadZone) {
                const d = delta > 0 ? delta - deadZone : delta + deadZone
                props.onChange(startValue + -d * increment)
            }
        }

        ev.preventDefault()
        document.addEventListener("mouseup", endDrag)
        document.addEventListener("mousemove", update)

        return () => {
            document.removeEventListener("mouseup", endDrag)
            document.removeEventListener("mousemove", update)
        }
    }

    return (
        <input type="number" className={styles} onMouseDown={startDrag} ref={inputRef}
               onChange={ev => props.onChange(ev.target.valueAsNumber)} value={Lina.round(value)}/>
    )
}
