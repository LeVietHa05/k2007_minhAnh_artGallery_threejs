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

//texture loader
let textureLoader = new THREE.TextureLoader();
let floorTexture = textureLoader.load('img/floorTexture.jpg');

//floor plane 
let floorPlaneGeometry = new THREE.PlaneGeometry(50, 50, 10, 10) //width, height, widthSegments, heightSegments
let floorPlaneMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture, //texture
    side: THREE.DoubleSide//side: THREE.DoubleSide to see both sides
})
let floorPlane = new THREE.Mesh(floorPlaneGeometry, floorPlaneMaterial);
floorPlane.rotation.x = Math.PI / 2; //rotate the plane to be horizontal
floorPlane.position.y = -1; //move the plane down
scene.add(floorPlane)

//walls
const wallGroup = new THREE.Group();//to hold the walls
scene.add(wallGroup);
//front wall
const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.01),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
frontWall.position.z = -25;

//left wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.01, 20, 50),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
leftWall.position.x = -25;
//right wall
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.01, 20, 50),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
rightWall.position.x = 25;
wallGroup.add(rightWall, leftWall, frontWall);

//create bounding box for the walls
for (let i = 0; i < wallGroup.children.length; i++) {
    //BBOX is the bounding box of the object (manually created )
    wallGroup.children[i].BBOx = new THREE.Box3().setFromObject(wallGroup.children[i]);
}

//ceiling
const ceiling = new THREE.Mesh(
    new THREE.BoxGeometry(50, 0.1, 50),
    new THREE.MeshBasicMaterial({ color: 'yellow' })
)
ceiling.position.y = 10;
scene.add(ceiling);


//control  when press key
document.addEventListener('keydown', onKeyDown, false);
function onKeyDown(e) {
    let keyCode = e.which;
    if (keyCode == 87 || keyCode == 38) { //W key
        camera.position.z -= 0.1;
    } else if (keyCode == 83 || keyCode == 40) { //S key
        camera.position.z += 0.1;
    } else if (keyCode == 65 || keyCode == 37) { //A key
        camera.position.x -= 0.1;
    } else if (keyCode == 68 || keyCode == 39) { //D key
        camera.position.x += 0.1;
    }
}

let renderLoop = function () {
    mesh.rotation.x += 0.1 //rotate the mesh
    mesh.rotation.y += 0.1 //rotate the mesh
    //render
    renderer.render(scene, camera);
    requestAnimationFrame(renderLoop);
}

// Call the render loop
renderLoop();
