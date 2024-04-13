import * as THREE from "three";

import Experience from "./Experience";

export default class Renderer {
  constructor({
    alpha = false,
    antialias = true,
    logarithmicDepthBuffer = false,
    toneMapping = THREE.AgXToneMapping,
    toneMappingExposure = 1.0,
    powerPreference = "high-performance",
    shadowMapType = THREE.PCFSoftShadowMap,
    shadowMapAutoUpdate = true,
    shadowMapEnabled = true,
    shadowMapSoft = true,
    shadowMapWidth = 1024,
    shadowMapHeight = 1024,
    backgroundColor = 0x000000,
  } = {}) {
    this.experience = new Experience();

    this.instance = new THREE.WebGLRenderer({
      alpha,
      antialias,
      logarithmicDepthBuffer,
      powerPreference,
    });

    this.instance.setSize(this.experience.width, this.experience.height);
    this.instance.setPixelRatio(this.experience.pixelRatio);

    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;

    this.instance.toneMapping = toneMapping;
    this.instance.toneMappingExposure = toneMappingExposure;

    this.instance.shadowMap.enabled = shadowMapEnabled;
    this.instance.shadowMap.type = shadowMapType;
    this.instance.shadowMap.autoUpdate = shadowMapAutoUpdate;
    this.instance.shadowMap.soft = shadowMapSoft;
    this.instance.shadowMap.width = shadowMapWidth;
    this.instance.shadowMap.height = shadowMapHeight;

    this.instance.setClearColor(new THREE.Color(backgroundColor));

    this.experience.container.appendChild(this.instance.domElement);
  }

  update() {
    this.instance.render(this.experience.scene, this.experience.camera.instance);
  }

  resize() {
    this.instance.setSize(this.experience.width, this.experience.height);
    this.instance.setPixelRatio(this.experience.pixelRatio);
  }
}
