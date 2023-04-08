import * as THREE from "https://unpkg.com/three/build/three.module.js";


/* import { default as Stats } from "https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js";
const clock = new THREE.Clock();
const stats = Stats();
document.body.appendChild(stats.dom); */

let scene = new THREE.Scene();
/* scene.background = new THREE.Color('gray');
scene.fog = new THREE.Fog('gray', 1, 5); */

/* const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight); */

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);
let cameraTarget = new THREE.Vector3(0, 2, 0);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(25, 25, 25);

/* directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2000;
directionalLight.shadow.mapSize.height = 2000;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = - 10;
directionalLight.shadow.camera.left = - 10;
directionalLight.shadow.camera.right = 10; */

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

scene.add(directionalLight);

//plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(4000, 4000),
    new THREE.MeshPhongMaterial({ color: 0xd1d1d1, dithering: true })
);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

//BufferGeometry
var vertices = new Float32Array( [
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0
    ] );

let geometry = new THREE.BufferGeometry();

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(vertices), 3)
);

let material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });

let mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);

scene.add(mesh);

function render() {
  requestAnimationFrame(render);

  camera.lookAt(cameraTarget);

  renderer.render(scene, camera);
}
render();