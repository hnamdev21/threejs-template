import * as THREE from "three";

import { blenderStandardMaterial, CAMERA_TYPE } from "./constants";
import Experience from "./Experience";

const experience = new Experience({
  cameraConfig: {
    type: CAMERA_TYPE.ORTHOGRAPHIC,
    near: 0.1,
    far: 10000,
    frustum: 16,
    position: new THREE.Vector3(100, 100, 100),
  },
  rendererConfig: {
    alpha: true,
    backgroundColor: "#17171b",
  },
});

const geometry = new THREE.BoxGeometry();
const material = blenderStandardMaterial;
const cube = new THREE.Mesh(geometry, material);
experience.scene.add(cube);

initLights();
animate();

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  requestAnimationFrame(animate);
}

function initLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  experience.scene.add(ambientLight);
  const directionalLightOne = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLightOne.position.set(10, 0, 0);
  experience.scene.add(directionalLightOne);
  const directionalLightTwo = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLightTwo.position.set(0, 0, 10);
  experience.scene.add(directionalLightTwo);
  const directionalLightThree = new THREE.DirectionalLight(0xffffff, 5);
  directionalLightThree.position.set(0, 10, 0);
  experience.scene.add(directionalLightThree);
}
