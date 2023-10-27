import * as THREE from 'three';

export default function Skybox() {
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

    return skybox;
}