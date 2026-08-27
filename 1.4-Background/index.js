import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";


const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true});
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

//THE DICE
//--------
const geo = new THREE.IcosahedronGeometry(1, 0);
const mat = new THREE.MeshPhysicalMaterial({ 
    roughness: 0.15,
    transmission: 0.95,
    thickness: 2, //Add refraction
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

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
    
    mesh.rotation.y = t * 0.0005;
    mesh.rotation.x = t * 0.0001;
    mesh.rotation.z = t * 0.0001;
    
    renderer.render(scene, camera);
    controls.update();
}

animate();






