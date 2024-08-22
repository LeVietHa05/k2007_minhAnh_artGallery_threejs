
import * as THREE from 'three';
import { displayPaintingInfo, hidePaintingInfo } from './paintingInfo.js';
import { updateMovement } from './movement.js';

export function setupRendering(
    scene,
    camera,
    renderer,
    paintings,
    controls,
    walls,
) {
    const clock = new THREE.Clock();

    let render = function () {
        const delta = clock.getDelta();
        updateMovement(delta, controls, camera, walls);

        // camera.layers.set(1);
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    render();
}