import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Character from './Character.js';



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
let materialAray = []
let texture_ft = new THREE.TextureLoader().load('skybox/penguins/arid_ft.jpg');
let texture_bk = new THREE.TextureLoader().load('skybox/penguins/arid_bk.jpg');
let texture_up = new THREE.TextureLoader().load('skybox/penguins/arid_up.jpg');
let texture_dn = new THREE.TextureLoader().load('skybox/penguins/arid_dn.jpg');
let texture_rt = new THREE.TextureLoader().load('skybox/penguins/arid_rt.jpg');
let texture_lf = new THREE.TextureLoader().load('skybox/penguins/arid_lf.jpg');

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





const loadingScreen = document.getElementById('loading-screen');
const loadingMessage = document.getElementById('loading-message');
const progressBar = document.getElementById('loading-bar');

THREE.DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};
THREE.DefaultLoadingManager.onLoad = function () {
    console.log('Loading Complete!');
    loadingScreen.remove();
};
THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    loadingMessage.innerHTML = 'Loaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'
    const progress = itemsLoaded / itemsTotal;
    progressBar.style.width = `${progress * 100}%`;
    // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};
THREE.DefaultLoadingManager.onError = function (url) {
    // console.log('There was an error loading ' + url);
    loadingMessage.innerHTML = 'There was an error loading ' + url;
};





// Load a texture for the ground
let textureLoader = new THREE.TextureLoader();
let terrainTexture = textureLoader.load('ground/mossy_cobblestone_diff_4k.jpg');

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

const dirlight = new THREE.DirectionalLight(0xffffff, 1.5);
dirlight.position.set(40, 100, 100);
scene.add(dirlight);

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