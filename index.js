import * as THREE from 'three'

console.log(THREE)

// Create a scene
const scene = new THREE.Scene()
// Create a camera
const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
)
scene.add(camera)
camera.position.z = 5 // Move the camera back 5 units

// Create a renderer
const renderer = new THREE.WebGLRenderer(
    {
        antialias: true, // Enable antialiasing
    })
renderer.setSize(window.innerWidth, window.innerHeight) // Set the size of the renderer to the size of the window
renderer.setClearColor('#fff', 1) // Set the background color of the renderer to black
document.body.appendChild(renderer.domElement) // Append the renderer to the body

//let there be light
// Ambient light
let ambientLight = new THREE.AmbientLight(0x101010) //color, intensity
// ambientLight.position = camera.position //light position follows camera
scene.add(ambientLight)

// Directional light
let sunlight = new THREE.DirectionalLight(0xdddddd, 1.0) //color, intensity
sunlight.position.y = 15;
scene.add(sunlight)

//cube
let geometry = new THREE.BoxGeometry(1, 1, 1) //geometry is like a blueprint, shape and size
let material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) //material is like the paint
let mesh = new THREE.Mesh(geometry, material) //mesh is the object created from the geometry and material
scene.add(mesh)

//render
renderer.render(scene, camera);