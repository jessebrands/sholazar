const PRECISION = 10e-4
const RADIANS_PER_DEGREE = 1 / 180 * Math.PI

const copySign = (a: number, b: number): number => Math.sign(a) === Math.sign(b) ? a : -a

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Lina {
    export const toDegrees = (rad: number) => rad / RADIANS_PER_DEGREE
    export const toRadians = (deg: number) => deg * RADIANS_PER_DEGREE
    export const notZero = (n: number, p: number = PRECISION): boolean => n >= p || n <= -p
    export const round = (n: number): number => Math.round(n * 10e2) / 10e2

    export type Vector2 = {
        x: number,
        y: number
    }

    export type Vector3 = {
        x: number
        y: number
        z: number
    }

    export type Vector4 = {
        x: number,
        y: number,
        z: number,
        w: number,
    }

    export type Quaternion = {
        w: number
        x: number
        y: number
        z: number
    }

    // eslint-disable-next-line @typescript-eslint/no-namespace
    export namespace vec3 {
        export const add = (a: Vector3, b: Vector3): Vector3 => ({
            x: a.x + b.x,
            y: a.y + b.y,
            z: a.z + b.z,
        })

        export const multiply = (v: Vector3, s: number): Vector3 => ({
            x: v.x * s,
            y: v.y * s,
            z: v.z * s,
        })

        export const dot = (a: Vector3, b: Vector3): number => a.x * b.x + a.y * b.y

        export const cross = (a: Vector3, b: Vector3): Vector3 => ({
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x,
        })

        export const magnitude = (v: Vector3): number => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)

        export const normalize = (v: Vector3): Vector3 => {
            const mag = magnitude(v)
            return {
                x: v.x / mag,
                y: v.y / mag,
                z: v.z / mag,
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-namespace
    export namespace quat {
        export const identity = (): Quaternion => ({
            w: 1,
            x: 0,
            y: 0,
            z: 0
        })

        export const isQuaternion = (q: unknown): q is Quaternion => {
            return (q as Quaternion).w !== undefined
                && (q as Quaternion).x !== undefined
                && (q as Quaternion).y !== undefined
                && (q as Quaternion).z !== undefined
        }

        export const isEqual = (a: Quaternion, b: Quaternion): boolean => {
            const w = Math.abs(a.w - b.w) <= PRECISION
            const x = Math.abs(a.x - b.x) <= PRECISION
            const y = Math.abs(a.y - b.y) <= PRECISION
            const z = Math.abs(a.z - b.z) <= PRECISION
            return w && x && y && z
        }

        export const multiply = (a: Quaternion, b: Quaternion): Quaternion => ({
            w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
            x: a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y,
            y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
            z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
        })

        export const fromEuler = (roll: number, pitch: number, yaw: number): Quaternion => {
            const cr = Math.cos(roll * 0.5)
            const sr = Math.sin(roll * 0.5)
            const cp = Math.cos(pitch * 0.5)
            const sp = Math.sin(pitch * 0.5)
            const cy = Math.cos(yaw * 0.5)
            const sy = Math.sin(yaw * 0.5)

            return {
                w: cy * cr * cp + sy * sr * sp,
                x: cy * sr * cp - sy * cr * sp,
                y: cy * cr * sp + sy * sr * cp,
                z: sy * cr * cp - cy * sr * sp,
            }
        }

        export const toEuler = (q: Quaternion): { roll: number, pitch: number, yaw: number } => {
            // Roll
            const sr_cp = 2.0 * (q.w * q.x + q.y * q.z)
            const cr_cp = 1.0 - 2.0 * (q.x * q.x + q.y * q.y)

            // Pitch
            const sp = 2.0 * (q.w * q.y - q.z * q.x)

            // Yaw
            const sy_cp = 2.0 * (q.w * q.z + q.x * q.y)
            const cy_cp = 1.0 - 2.0 * (q.y * q.y + q.z * q.z)

            return {
                roll: Math.atan2(sr_cp, cr_cp),
                pitch: (Math.abs(sp) >= 1) ? copySign(Math.PI / 2, sp) : Math.asin(sp),
                yaw: Math.atan2(sy_cp, cy_cp),
            }
        }

        export const rotate = (q: Quaternion, v: Vector3): Vector3 => {
            const {w, x, y, z} = q;

            return {
                x: w * w * v.x + 2 * y * w * v.z - 2 * z * w * v.y + x * x * v.x + 2 * y * x * v.y + 2 * z * x * v.z - z * z * v.x - y * y * v.x,
                y: 2 * x * y * v.x + y * y * v.y + 2 * z * y * v.z + 2 * w * z * v.x - z * z * v.y + w * w * v.y - 2 * x * w * v.z - x * x * v.y,
                z: 2 * x * z * v.x + 2 * y * z * v.y + z * z * v.z - 2 * w * y * v.x - y * y * v.z + 2 * w * x * v.y - x * x * v.z + w * w * v.z,
            }
        }
    }
}

export default Lina
