
import * as Scene from './utils/scene.js';
import * as Wall from './utils/walls.js';
import * as Floor from './utils/floor.js';
import * as Ceil from './utils/ceiling.js';
import * as Lighting from './utils/lighting.js';
import * as Bounding from './utils/boundingBox.js';
import * as Paint from './utils/paintings.js';
import * as Render from './utils/rendering.js';
import * as Setup from './utils/eventListeners.js';
import * as Helper from './utils/sceneHelper.js';
// import { setupAudio } from './utils/audioGuide.js';
import { clickHandle, hoverHandle } from './utils/clickHandle.js';
import { createGlowingFrame } from './utils/bloom.js';

export let { camera, controls, renderer } = Scene.setupScene();

// setupAudio(camera);

const walls = Wall.createWalls(Scene.scene);

const floor = Floor.createFloor(Scene.scene);

const ceiling = Ceil.createCeiling(Scene.scene);

const paintings = Paint.createPaintings(Scene.scene);
console.log(paintings);

Lighting.setupLights(Scene.scene, paintings);

Bounding.createBoundingBoxes(walls)

Bounding.createBoundingBoxes(paintings)

Helper.addObjectToScene(Scene.scene, paintings);

const glowingFrame = createGlowingFrame(Scene.scene, paintings);

Setup.setupEventListeners(controls);

clickHandle(renderer, camera, paintings, glowingFrame);
hoverHandle(renderer, camera, paintings, glowingFrame);

Render.setupRendering(Scene.scene, camera, renderer, paintings, controls, walls);