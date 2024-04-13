import * as THREE from "three";

import Camera from "./Camera";
import Renderer from "./Renderer";
import { CAMERA_TYPE } from "./constants";

export default class Experience {
  static instance = null;

  constructor({
    domElement = document.body,
    width = window.innerWidth,
    height = window.innerHeight,
    cameraConfig = {
      type: CAMERA_TYPE.PERSPECTIVE,
      near: 0.1,
      far: 1000,
      position: new THREE.Vector3(0, 0, 5),
      lookAt: new THREE.Vector3(),
      fov: 45,
      frustum: 16,
    },
    rendererConfig = {
      alpha: false,
      antialias: true,
      logarithmicDepthBuffer: false,
      toneMapping: THREE.AgXToneMapping,
      toneMappingExposure: 1.0,
      powerPreference: "high-performance",
      shadowMapType: THREE.PCFSoftShadowMap,
      shadowMapAutoUpdate: true,
      shadowMapEnabled: true,
      shadowMapSoft: true,
      shadowMapWidth: 1024,
      shadowMapHeight: 1024,
      backgroundColor: 0x000000,
    },
  } = {}) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;

    this.container = domElement;
    this.width = width;
    this.height = height;

    this.cameraConfig = cameraConfig;
    this.rendererConfig = rendererConfig;

    this.init();
  }

  init() {
    this.initScene();
    this.initCamera();
    this.initRenderer();

    this.addEventListeners();
    this.update();
  }

  addEventListeners() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  initScene() {
    this.scene = new THREE.Scene();
  }

  initCamera() {
    this.camera = new Camera(this.cameraConfig);
  }

  initRenderer() {
    this.renderer = new Renderer(this.rendererConfig);
  }

  update() {
    window.requestAnimationFrame(() => {
      this.update();
    });

    this.camera.update();
    this.renderer.update();
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
}
