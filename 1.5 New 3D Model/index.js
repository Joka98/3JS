import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 45;
const aspect = (w / h);
const near = 0.01;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 5);
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

//Background
//----------
const bgTexture = new THREE.TextureLoader().load("assets/Background/jellyfishes-underwater-deep-ocean-dark-black-background-5k-7952x5304-1770.jpg");
const bgGeometry = new THREE.PlaneGeometry(10, 6.6);
const bgMaterial = new THREE.MeshBasicMaterial({map: bgTexture});
const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
bgMesh.position.set(0, 0, -1);
scene.add(bgMesh)


//GLASS MATERIAL
//--------------
const mat = new THREE.MeshPhysicalMaterial({ 
    roughness: 0.15,
    transmission: 0.95,
    thickness: 2, //Add refraction
});

//3D MODEL
//--------
const loader = new GLTFLoader();

loader.load("src/dragon.glb", function ( gltf ) {

    const dragon = gltf.scene.children.find((mesh) => mesh.name === "Dragon");

    const geometry = dragon.geometry.clone();

    geometry.rotateX(Math.PI / 2);
    geometry.translate(0, -4, 0);

    const mesh = new THREE.Mesh(geometry, mat);
    mesh.scale.set(0.2, 0.2, 0.2);

    scene.add (mesh);
})

/*
new THREE.GLTFLoader().load("src/dragon.glb", (gltf) => {
    const dragon = gltf.scene.children.find((mesh) => mesh.name === "Dragon");

    const geometry = dragon.geometry.clone();

    const mesh = new THREE.Mesh(geometry, mat);
    scene.add(mesh);

    dragon.geometry.dispose();
    dragon.mat.dispose();
});
/*
new THREE.GLTFLoader().load("src/dragon.glb", (gltf) => {
    const dragon = gltf.scene.children.find((mesh) => mesh.name === "Dragon");

    // Just copy the geometry from the loaded model
    const geometry = dragon.geometry.clone();

    // Create a new mesh and place it in the scene
    const mesh = new THREE.Mesh(geometry, mat);
    scene.add(mesh);

    // Discard the model
    dragon.geometry.dispose();
    dragon.material.dispose();
  });
*/

//LUZ
//---
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 5, 0);
scene.add(light);
const light2 = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, -10, 0);
scene.add(light2);

//animação
//--------
function animate(t = 0) {
    requestAnimationFrame(animate);


    
    renderer.render(scene, camera);
    controls.update();
}

animate();






