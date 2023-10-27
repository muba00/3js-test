import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// skybox
let materialAray = []
let texture_ft = new THREE.TextureLoader().load('public/skybox/penguins/arid_ft.jpg');
let texture_bk = new THREE.TextureLoader().load('public/skybox/penguins/arid_bk.jpg');
let texture_up = new THREE.TextureLoader().load('public/skybox/penguins/arid_up.jpg');
let texture_dn = new THREE.TextureLoader().load('public/skybox/penguins/arid_dn.jpg');
let texture_rt = new THREE.TextureLoader().load('public/skybox/penguins/arid_rt.jpg');
let texture_lf = new THREE.TextureLoader().load('public/skybox/penguins/arid_lf.jpg');

materialAray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialAray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialAray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialAray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialAray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialAray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

for (let i = 0; i < 6; i++)
    materialAray[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
let skybox = new THREE.Mesh(skyboxGeo, materialAray);
scene.add(skybox);




// Load a texture for the ground
let textureLoader = new THREE.TextureLoader();
let terrainTexture = textureLoader.load('public/ground/mossy_cobblestone_diff_4k.jpg');

// Adjust the texture scale
terrainTexture.repeat.set(6, 6); // Increase the values to make the texture smaller or decrease to make it larger
terrainTexture.wrapS = THREE.RepeatWrapping;
terrainTexture.wrapT = THREE.RepeatWrapping;

// Create a ground material
let groundMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,  // Color of the material
    roughness: 0.7,   // Adjust roughness as needed
    metalness: 0.0,   // Adjust metalness as needed
    map: terrainTexture,  // Apply the terrain texture
});

// Create a ground plane
let groundGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
let ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);


// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;


const loader = new GLTFLoader();
// Load a glTF resource
loader.load('public/scull_cup.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(0, 0.3, -3);
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});

// Load a glTF resource
loader.load('public/lambo.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(3, 0.12, -2);
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});


// Load a glTF resource
loader.load('public/coffee_bag.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(2, 0.57, 1.3);
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});


// Load a glTF resource
loader.load('public/trash.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(-3, 0, -2);
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});


// Load a FBX resource
const fbxLoader = new FBXLoader();
fbxLoader.load("public/sophie.fbx", function (object) {
    object.scale.set(0.01, 0.01, 0.01);
    object.position.set(0, 0, 0);
    scene.add(object);
});


// soft white light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const sunlight = new THREE.DirectionalLight(0xffffff, 1);
sunlight.position.set(40, 100, 100);
scene.add(sunlight);

camera.position.z = 0.6;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();