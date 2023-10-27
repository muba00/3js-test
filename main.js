import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Character from './Character.js';
import "./LoadingScreen.js";
import Skybox from './Skybox.js';
import Ground from './Ground.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const stats = new Stats();
document.body.appendChild(stats.dom);

let mixer = null;
const clock = new THREE.Clock();


// skybox
const skybox = new Skybox();
scene.add(skybox);


// ground
const ground = new Ground();
scene.add(ground);


// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;


const loader = new GLTFLoader();
// Load a glb resource
loader.load('scull_cup.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(0, 0.3, -3);
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});

// Load a glb resource
loader.load('lambo.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(3, 0.12, -2);
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});


// Load a glb resource
loader.load('coffee_bag.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(2, 0.57, 1.3);
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});


// Load a glb resource
loader.load('trash.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(-3, 0, -2);
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});


// // Load a glb resource
// loader.load('dirty_squatting_toilet.glb', function (gltf) {
//     const model = gltf.scene;
//     model.position.set(0, 0, 0);
//     // scale
//     model.scale.set(0.04, 0.04, 0.04);
//     // rotate 90 degrees
//     model.rotation.y = Math.PI / 2;
//     scene.add(model);
// }, undefined, function (error) {
//     console.error(error);
// });


const sophia = new Character("Sophia", scene, { x: 0, y: 0, z: 0 }, mixer);


// soft white light
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

// directional light
const dirlight = new THREE.DirectionalLight(0xffffff, 3);
dirlight.position.set(40, 100, 100);
scene.add(dirlight);

// hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 1);
scene.add(hemisphereLight);

camera.position.set(-1, 2, 3);

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    stats.update();

    const delta = clock.getDelta();
    sophia.animate(delta);

    renderer.render(scene, camera);
}
animate();


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);