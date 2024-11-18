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
//camera.position.z = 30;
//camera.position.y = 3;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1, 0);
const mat = new THREE.MeshPhysicalMaterial({ 
    roughness: 0.15,
    transmission: 0.95,
    thickness: 2, //Add refraction
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshStandardMaterial({
    color: 0x8c65f7,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.0001)
mesh.add(wireMesh);


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 5, 0);
scene.add(light);
const light2 = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, -10, 0);
scene.add(light2);

/*
const hemilight = new THREE.HemisphereLight(0xffffff, 0xffffff)
scene.add(hemilight);
*/


function animate(t = 0) {
    requestAnimationFrame(animate);
    
    mesh.rotation.y = t * 0.0005;
    mesh.rotation.x = t * 0.0001;
    mesh.rotation.z = t * 0.0001;
    //mesh.scale.setScalar(Math.cos(t * 0.0018) + 1.2);
    
    renderer.render(scene, camera);
    controls.update();
}

animate();






