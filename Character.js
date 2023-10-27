import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';


export default class Character {

    constructor(name, scene, coords = { x: 0, y: 0, z: 0 }) {
        this.mixer = null;
        this.name = name;
        this.loadModel(scene, coords);
    }

    static states = {
        "idle": "sophie/Idle.fbx",
        "walking": "sophie/Walking.fbx",
        "running": "sophie/Fast Running.fbx",
        "Step Hip Hop Dance": "sophie/Step Hip Hop Dance.fbx",
        "Sitting idle": "sophie/Sitting Idle.fbx",
    }

    loadModel(scene, coords = { x: 0, y: 0, z: 0 }) {
        let loader = new FBXLoader();
        loader.load('sophie.fbx', function (model) {
            model.scale.set(0.01, 0.01, 0.01);
            model.position.set(coords.x, coords.y, coords.z);

            let animLoader = new FBXLoader();
            animLoader.load(Character.states['Sitting idle'], function (anim) {
                Character.mixer = new THREE.AnimationMixer(model);
                let action = Character.mixer.clipAction(anim.animations[0]);
                action.play();
            });

            scene.add(model);
        });
    }

    update(delta) {
        if (Character.mixer) {
            Character.mixer.update(delta);
        }
    }


}
