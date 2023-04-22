import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

let scene = new THREE.Scene();

const div = document.querySelector('.threejs');

const red = document.getElementById('red');
const blue = document.getElementById('blue');
const green = document.getElementById('green');

const lights = document.querySelectorAll('input[type="checkbox"]');

let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(-5, 10, 13);
let cameraTarget = new THREE.Vector3(0, -2, 0);

camera.lookAt(cameraTarget);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( 600, 600);
div.appendChild( renderer.domElement);

renderer.shadowMap.enabled = true;

const canvas = document.querySelector("canvas");

const controls = new OrbitControls(camera, canvas);

//light 1 (main light)
const mainLight = new THREE.DirectionalLight(0xffffff, 0.7);
mainLight.position.set(-25, 25, 25);
mainLight.castShadow = true;
scene.add(mainLight);

//light 2 (Fill light)
const fillLight = new THREE.SpotLight(0xffffff, 1);
fillLight.position.set(0, 25, 25);
fillLight.castShadow = true;
scene.add(fillLight);

//light 3 (Rim light)
const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
rimLight.position.set(5, 25, -5);
rimLight.castShadow = true;
scene.add(rimLight);

//plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshPhongMaterial({ color: 0xbbbbbb, dithering: true })
);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

//BufferGeometry
var vertices = new Float32Array( [
  -10.0, 0.0,  1.0,
   10.0, 0.0,  1.0,
   10.0,  10.0,  1.0,
  
   10.0,  10.0,  1.0,
  -10.0,  10.0,  1.0,
  -10.0, 0.0,  1.0
  ] );
  
let geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
var material = new THREE.MeshPhongMaterial( { color: 0x23a6a4, dithering: true } );
geometry.computeVertexNormals();
var mesh = new THREE.Mesh( geometry, material );
mesh.position.set(0,0,-10);
scene.add(mesh);

//cube
var boxGeometry = new THREE.BoxGeometry(2, 2, 2);
var basicMaterial = new THREE.MeshPhongMaterial({color: 0xC8C8C8, dithering: true});
basicMaterial.color.setRGB(1,0,0);
var cube = new THREE.Mesh(boxGeometry, basicMaterial);
cube.position.set(2,1,-3);
cube.castShadow = true;
scene.add(cube);

//pyramid
var pyramidVertices = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1];
var pyramidIndices = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];

let pyramidGeometry = new THREE.BufferGeometry();

pyramidGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(pyramidVertices), 3)
);
pyramidGeometry.setIndex(pyramidIndices);
pyramidGeometry.computeVertexNormals();

let pyramidMaterial = new THREE.MeshPhongMaterial({ color: 0xC8C8C8, dithering: true});
pyramidMaterial.color.setRGB(1,0,0);

let pyramidMesh = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
pyramidMesh.position.set(-2, 0.5, -2);
pyramidMesh.rotation.y = 45 * Math.PI / 180;
pyramidMesh.rotation.x = 120 * Math.PI / 180;

pyramidMesh.castShadow = true;

scene.add(pyramidMesh);

function render() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);

  for(let light of lights)
  {

    if(light.checked && light.id == 'mainLight')
      mainLight.intensity = 0.7;
    else if(light.id == 'mainLight')
      mainLight.intensity = 0;

    if(light.checked && light.id == 'rimLight')
      rimLight.intensity = 0.5;
    else if(light.id == 'rimLight')
      rimLight.intensity = 0;

    if(light.checked && light.id == 'fillLight')
      fillLight.intensity = 0.3;
    else if(light.id == 'fillLight')
      fillLight.intensity = 0;

    
  }

}
render();

red.addEventListener('focus', ()=>{
  pyramidMaterial.color.setRGB(1,0,0);
  basicMaterial.color.setRGB(1,0,0);
});

blue.addEventListener('focus', ()=>{
  pyramidMaterial.color.setRGB(0,0,1);
  basicMaterial.color.setRGB(0,0,1);
});

green.addEventListener('focus', ()=>{
  pyramidMaterial.color.setRGB(0,1,0);
  basicMaterial.color.setRGB(0,1,0);
});

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

  camera.aspect = div.clientWidth / div.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(div.clientWidth, div.clientHeight);
}