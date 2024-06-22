import React from "react"

interface EditableLabelProps {
    value: string
    editable?: boolean
    onChange: (value: string) => void
}

export default function EditableLabel(props: EditableLabelProps) {
    const {value, onChange} = props
    const editable = props.editable === true

    const [editing, setEditing] = React.useState(false)
    const [newValue, setNewValue] = React.useState<string>(value)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        const input = inputRef.current
        if (editing && input) {
            input.focus()
            input.select()
        }
    }, [editing, inputRef])

    const startEditing = () => {
        if (editable) {
            setEditing(true)
            setNewValue(value)
        }
    }

    const stopEditing = () => {
        if (editable) {
            setEditing(false)
            if (newValue !== value) onChange(newValue)
        }
    }

    const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === "Enter") stopEditing()
    }

    return (
        !editing ? (
            <span className="text-md w-full" onDoubleClick={startEditing}>{value}</span>
        ) : (
            <input name="label-value" type="text" value={newValue} ref={inputRef}
                   className="appearance-none bg-gray-950 text-gray-50 outline-none rounded w-full text-md"
                   onChange={ev => setNewValue(ev.currentTarget.value)}
                   onBlur={stopEditing} onKeyDown={onKeyDown}/>
        )
    )
}
