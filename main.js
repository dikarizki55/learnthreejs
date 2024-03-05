import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(2, 3, 2);
controls.target.set(0, 1, 0.5);
controls.update();

// var loader = new THREE.JSONLoader();
// loader.load("./glb3d/scene.json", function (geometry) {
//   var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());

//   mesh.position.x = 0;
//   mesh.position.y = 0;
//   mesh.position.z = 0;
//   scene.add(mesh);
// });

const loader = new GLTFLoader();

loader.load(
  "./glb3d/scene.glb",
  function (gltf) {
    console.log(gltf.scene);

    gltf.scene.traverse(function (child) {
      // child.castShadow = true;

      if (child.isPointLight) {
        child.castShadow = true;
        // child.receiveShadow = true;
      } else {
        if (child.name == "Plane") {
          child.receiveShadow = true;
        }
        child.castShadow = true;
      }
    });

    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// const light = new THREE.PointLight(0xffffff, 5, 5);
// light.position.set(0, 2.785, 0);
// light.castShadow = true;
// // light.shadow.bias = -0.004;
// scene.add(light);

// const box = new THREE.BoxGeometry(1, 1, 1);
// const boxmaterial = new THREE.MeshStandardMaterial({
//   color: 0x323837,
// });
// const cube = new THREE.Mesh(box, boxmaterial);
// cube.castShadow = true;
// cube.receiveShadow = true;
// cube.position.set(1, 0, 0);
// scene.add(cube);

// const geometry = new THREE.PlaneGeometry(10, 10);
// const material = new THREE.MeshStandardMaterial({
//   color: 0x323837,
// });
// const plane = new THREE.Mesh(geometry, material);
// plane.rotation.set(-Math.PI / 2, 0, 0);
// plane.receiveShadow = true;
// scene.add(plane);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

function animate() {
  //   requestAnimationFrame(animate);

  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  //   renderer.render(scene, camera);

  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

animate();
