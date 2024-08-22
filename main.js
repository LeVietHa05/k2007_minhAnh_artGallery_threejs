
import { scene, setupScene } from './utils/scene.js';
import { createWalls } from './utils/walls.js';
import { createFloor } from './utils/floor.js';
import { createCeiling } from './utils/ceiling.js';
import { setupLights } from './utils/lighting.js';
import { createBoundingBoxes } from './utils/boundingBox.js';
import { createPaintings } from './utils/paintings.js';
import { setupRendering } from './utils/rendering.js';
import { setupEventListeners } from './utils/eventListeners.js';
import { addObjectToScene } from './utils/sceneHelper.js';
// import { setupAudio } from './utils/audioGuide.js';
import { clickHandle, hoverHandle } from './utils/clickHandle.js';
import { createGlowingFrame } from './utils/bloom.js';

export let { camera, controls, renderer } = setupScene();

// setupAudio(camera);

const walls = createWalls(scene);

const floor = createFloor(scene);

const ceiling = createCeiling(scene);

const paintings = createPaintings(scene);
console.log(paintings);

setupLights(scene, paintings);

createBoundingBoxes(walls)

createBoundingBoxes(paintings)

addObjectToScene(scene, paintings);

const glowingFrame = createGlowingFrame(scene, paintings);

setupEventListeners(controls);

// clickHandle(renderer, camera, paintings, glowingFrame);
hoverHandle(renderer, camera, paintings, glowingFrame);

setupRendering(scene, camera, renderer, paintings, controls, walls);