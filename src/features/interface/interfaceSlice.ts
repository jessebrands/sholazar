import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {State} from "@/app/store.ts";
import {selectObjectById} from "@/features/scene";

interface InterfaceState {
    selection?: string,
}

const initialState: InterfaceState = {}

const interfaceSlice = createSlice({
    name: "interface",
    initialState: initialState,
    reducers: {
        selectionCleared(state) {
            state.selection = undefined
        },
        selected(state, action: PayloadAction<string>) {
            state.selection = action.payload
        }
    }
})

export const {selected, selectionCleared} = interfaceSlice.actions

export const selectSelection = (state: State) => state.interface.selection

export const selectSelectedObject = (state: State) => {
    if (state.interface.selection) {
        return selectObjectById(state, state.interface.selection)
    }
    return undefined
}

const interfaceReducer = interfaceSlice.reducer

export default interfaceReducer
