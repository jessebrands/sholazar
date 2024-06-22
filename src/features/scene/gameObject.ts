import Transform, {createTransform} from "@/features/scene/transform.ts";

export interface Color {
    mode: "tint" | "overlay"
    red: number
    green: number
    blue: number
    alpha: number
    saturation: number
}

type GameObject = {
    id: number
    transform: Transform,
    color: Color,
    animation: number
    visibility: number
    collision: boolean
    spell: number
}

export const createGameObject = (): GameObject => ({
    id: 0,
    transform: createTransform(),
    color: {
        mode: "tint",
        red: 1.0,
        green: 1.0,
        blue: 1.0,
        alpha: 0.0,
        saturation: 1.0,
    },
    animation: 0,
    visibility: 0,
    collision: true,
    spell: 0,
})

export default GameObject
