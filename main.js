import * as THREE from "three";
import { AmbientLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import earthTexture from "./assets/earth.jpg";
import "./style.css";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#three"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0, 0, 30);

//texture loader

const textureLoader = new THREE.TextureLoader();

// add objects

const geometry = new THREE.SphereGeometry(10, 50, 40);
const material = new THREE.MeshLambertMaterial({
  map: textureLoader.load(earthTexture),
});
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 18, 100);

const ambientLight = new THREE.AmbientLight(0x111111);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

// game loop

function animate() {
  controls.update();
  earth.rotation.y += 0.001;
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();

//resize

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});
