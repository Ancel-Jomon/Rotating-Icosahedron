import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const h = window.innerHeight;
const w = window.innerWidth;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const asratio = w / h;
const near = 0.1;
const far = 10;
const camerra = new THREE.PerspectiveCamera(fov, asratio, near, far);
camerra.position.z = 2;
const scene = new THREE.Scene();
const controls = new OrbitControls(camerra, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.04;
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color: "rgb(255, 255, 255)",
  flatShading: true,
});
const wiremat = new THREE.MeshBasicMaterial({
  color: "rgb(255, 255, 255)",

  wireframe: true,
});

const mesh = new THREE.Mesh(geo, mat);
const wiremesh = new THREE.Mesh(geo, wiremat);
wiremesh.scale.setScalar(1.01);

scene.add(mesh);
mesh.add(wiremesh);
const hemilight = new THREE.HemisphereLight(
  "rgb(204, 50, 50)",
  "rgb(111, 12, 187)"
);
scene.add(hemilight);

function animate(t = 0) {
  requestAnimationFrame(animate);

  mesh.rotation.y += 0.01;
  renderer.render(scene, camerra);
  controls.update();
}

animate();
