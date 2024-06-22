import {configureStore} from "@reduxjs/toolkit";
import interfaceReducer from "../features/interface/interfaceSlice.ts";
import sceneReducer from "../features/scene";

const store = configureStore({
    reducer: {
        interface: interfaceReducer,
        scene: sceneReducer,
    }
})

export type Store = typeof store
export type State = ReturnType<Store['getState']>
export type Dispatch = Store['dispatch']

export default store
