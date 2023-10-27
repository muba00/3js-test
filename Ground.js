import * as THREE from 'three';

export default function Ground() {

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

    return ground;
}