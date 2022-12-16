import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import earthTexture from "./assets/earth.jpg";
import "./style.css";

import {
  vertexShader,
  fragmentShader,
  atmosphereFragmentShader,
  atmosphereVertexShader,
} from "./shaders/index.js";

import { PointsMaterial } from "three";

const canvas = document.querySelector("#three");
let width = canvas.offsetWidth;
let height = canvas.offsetHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

camera.position.set(0, 0, 22);

//texture loader

const textureLoader = new THREE.TextureLoader();

// add objects

const geometry = new THREE.SphereGeometry(10, 50, 40);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    earthTexture: {
      value: textureLoader.load(earthTexture),
    },
  },
});
const earth = new THREE.Mesh(geometry, material);

//atmosphere

const atmosphereGeo = new THREE.SphereGeometry(13, 50, 40);
const atmosphereMat = new THREE.ShaderMaterial({
  vertexShader: atmosphereVertexShader,
  fragmentShader: atmosphereFragmentShader,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
});
const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);

//stars

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new PointsMaterial({
  color: 0xffffff,
});

const starVertices = [];
for (let i = 0; i < 2000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);

const stars = new THREE.Points(starGeometry, starMaterial);

scene.add(earth, atmosphere, stars);

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
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;

  camera.aspect = width / height;
  renderer.setSize(width, height);
  camera.updateProjectionMatrix();
});

if (width < 450) camera.position.set(0, 0, 37);
