// Import Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { fragment, vertex } from 'three/src/renderers/shaders/ShaderLib/background.glsl.js';


const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;

    void main() {
        vec2 gridUv = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
        vec2 centerOfPixel = gridUv + vec2(1.0 / 40.0, 1.0 / 40.0);

        vec2 mouseDirection = u_mouse - u_prevMouse;
        vec2 pixelToMouseDirection = centerOfPixel - u_prevMouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

        vec2 uvOffset = strength * -mouseDirection * 0.3;
        vec2 uv = vUv - uvOffset;
        vec4 color = texture2D(uTexture, uv);
        gl_FragColor = color;
    }
`;

let scene, camera, renderer;
let easeFactor = 0.02;
let mousePosition = {x: 0.5, y: 0.5};
let prevPosition = {x: 0.5, y: 0.5};
let targetPosition = {x: 0.5, y: 0.5};


// Set up the renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x000000, 1); // Set background color
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


// Create the scene
scene = new THREE.Scene();

// Set up the camera
camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(2, 2, 10);


//plane
const textureLoader = new THREE.TextureLoader();
const newMaterial = textureLoader.load('background.jpg');

const plane =  new THREE.Mesh(
    new THREE.PlaneGeometry(30,30),
    new THREE.ShaderMaterial({
        uniforms: {
            uTexture: { type: 't', value: newMaterial }, 
            u_mouse: { type: 'v2', value: new THREE.Vector2() },
            u_prevMouse: { type: 'v2', value: new THREE.Vector2() },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    })
)
scene.add(plane);


// Add mouse move listener to update mouse position
document.addEventListener('mousemove', (event) => {
    prevPosition = { ...targetPosition };
    // Update target position with normalized mouse coordinates
    targetPosition.x = event.clientX / window.innerWidth;
    targetPosition.y = event.clientY / window.innerHeight;
}, false);



// Animate the scene
function animateScene() {
    requestAnimationFrame(animateScene);

    // Smooth mouse movement for better animation
    mousePosition.x += (targetPosition.x - mousePosition.x) * easeFactor;
    mousePosition.y += (targetPosition.y - mousePosition.y) * easeFactor;

    // Set the current mouse position in the shader
    plane.material.uniforms.u_mouse.value.set(
        mousePosition.x, 
        1.0 - mousePosition.y);

    plane.material.uniforms.u_prevMouse.value.set(
        prevPosition.x, 
        1.0 - prevPosition.y
    );
    

    renderer.render(scene, camera);
}

animateScene();
