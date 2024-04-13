import * as THREE from "three";

import Experience from "./Experience";
import { CAMERA_TYPE } from "./constants";

export default class Camera {
  constructor({
    type = CAMERA_TYPE.PERSPECTIVE,
    near = 0.1,
    far = 1000,
    position = new THREE.Vector3(0, 0, 5),
    lookAt = new THREE.Vector3(),
    fov = 45,
    frustum = 16,
  } = {}) {
    this.experience = new Experience();
    this.aspect = this.experience.width / this.experience.height;
    this.type = type;
    this.near = near;
    this.far = far;
    this.position = position;
    this.lookAt = lookAt;
    this.fov = fov;
    this.frustum = frustum;

    this.init();
  }

  init() {
    if (this.type === CAMERA_TYPE.PERSPECTIVE) {
      this.initPerspectiveCamera();
    } else if (this.type === CAMERA_TYPE.ORTHOGRAPHIC) {
      this.initOrthographicCamera();
    }

    this.instance.position.copy(this.position);
    this.instance.lookAt(this.lookAt);
  }

  initPerspectiveCamera() {
    this.instance = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
  }

  initOrthographicCamera() {
    this.instance = new THREE.OrthographicCamera(
      -this.aspect * this.frustum,
      this.aspect * this.frustum,
      this.frustum,
      -this.frustum,
      this.near,
      this.far
    );
  }

  update() {
    this.instance.position.copy(this.position);
    this.instance.lookAt(this.lookAt);

    this.instance.updateProjectionMatrix();
    this.instance.updateMatrixWorld();
  }

  resize() {
    this.aspect = this.experience.width / this.experience.height;
    this.instance.aspect = this.aspect;

    if (this.type === CAMERA_TYPE.ORTHOGRAPHIC) {
      this.instance.left = -this.aspect * this.frustum;
      this.instance.right = this.aspect * this.frustum;
      this.instance.top = this.frustum;
      this.instance.bottom = -this.frustum;
    }

    this.instance.updateProjectionMatrix();
  }
}
