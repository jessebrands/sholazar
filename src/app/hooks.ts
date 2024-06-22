import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
    useStore as useReduxStore
} from "react-redux"

import {Dispatch, Store, State} from "./store"

export const useDispatch = useReduxDispatch.withTypes<Dispatch>()
export const useSelector = useReduxSelector.withTypes<State>()
export const useStore = useReduxStore.withTypes<Store>()
