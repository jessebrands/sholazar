import * as React from "react"
import * as THREE from "three"

import {useSelector} from "@/app/hooks.ts";
import {selectGeneratedObjects} from "@/features/scene";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

export default function Renderer() {
    const [renderer, setRenderer] = React.useState<THREE.WebGLRenderer | undefined>(undefined);
    const [camera] = React.useState<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(90, 1, 0.1, 1000));
    const [scene, setScene] = React.useState<THREE.Scene>(new THREE.Scene());
    const [controls, setControls] = React.useState<OrbitControls | undefined>()
    const objects = useSelector(selectGeneratedObjects)

    const canvasRef = React.createRef<HTMLCanvasElement>()

    React.useEffect(() => {
        camera.position.set(0, 2.5, 5)
        camera.lookAt(0, 0, 0)
    }, [camera])

    React.useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const observer = new ResizeObserver(() => {
                const width = canvas.clientWidth
                const height = canvas.clientHeight
                console.log("Resizing viewport to:", width, height)
                if (renderer) {
                    renderer.setSize(width, height, false)
                    renderer.setPixelRatio(window.devicePixelRatio)
                }
                camera.aspect = width / height
                camera.updateProjectionMatrix()
            })

            observer.observe(canvas, {box: "content-box"})
            return () => observer.disconnect()
        }
    }, [canvasRef, renderer, camera])

    React.useEffect(() => {
        const canvas = canvasRef.current
        if (canvas && !renderer) {
            // Create a Three.js renderer on this canvas.
            const r = new THREE.WebGLRenderer({canvas, antialias: true})
            setControls(new OrbitControls(camera, canvas))
            r.setClearColor("#4A4A4A")
            setRenderer(r)
        }
    }, [canvasRef, renderer, scene, camera])

    // When our renderer, scene, or camera change we must rebuild the render loop.
    React.useEffect(() => {
        const canvas = canvasRef.current
        if (canvas && renderer) {
            renderer.setAnimationLoop(() => {
                controls?.update()
                renderer.render(scene, camera)
            })
        }
    }, [canvasRef, renderer, scene, camera, controls])

    // When the scene graph is updated, we must reflect that change here.
    React.useEffect(() => {
        const geometry = new THREE.BoxGeometry(0.5, 0.1, 2)
        const material = new THREE.MeshStandardMaterial({color: "#e0e0e0", flatShading: true})
        const newScene = new THREE.Scene()
        newScene.add(new THREE.AmbientLight(0xFFFFFF, 0.05))

        const sun = new THREE.DirectionalLight(0xFFFFFF, 1)
        newScene.add(sun)
        sun.position.set(40, 40, -40)

        const mesh = new THREE.InstancedMesh(geometry, material, objects.length)
        mesh.receiveShadow = true

        // Loop over our objects and assign them to the scene:
        objects.forEach((obj, i) => {
            const {x, y, z} = obj.transform.position;
            const r = obj.transform.rotation;
            const s = obj.transform.scale;

            mesh.setMatrixAt(i, new THREE.Matrix4().compose(
                new THREE.Vector3(y, z, -x),
                new THREE.Quaternion(-r.y, -r.z, r.x, r.w),
                new THREE.Vector3(s, s, s)
            ))
        })

        newScene.add(mesh)
        setScene(newScene)
    }, [objects, setScene])

    return (
        <canvas className="rounded w-full h-full overflow-hidden"
                style={{minWidth: "0 !important", minHeight: "0 !important"}}
                ref={canvasRef}/>
    )
}
