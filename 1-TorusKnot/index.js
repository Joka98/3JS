import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = (w / h);
const near = 0.1;
const far = 50;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 30;
//camera.position.y = 3;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

//const geo = new THREE.IcosahedronGeometry(1.0, 2);
const geo = new THREE.TorusKnotGeometry(8.1, 3, 65, 7);
const mat = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.0001)
mesh.add(wireMesh);

const hemilight = new THREE.HemisphereLight(0x8c65f7, 0x93f5af)
scene.add(hemilight);



function animate(t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.00003;
    mesh.rotation.x = t * 0.00003;
    mesh.rotation.z = t * 0.00003;
    //mesh.scale.setScalar(Math.cos(t * 0.0018) + 1.2);
    renderer.render(scene, camera);
    controls.update();
}

animate();






