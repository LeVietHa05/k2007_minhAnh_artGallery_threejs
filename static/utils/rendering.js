
import * as THREE from 'three';
import { displayPaintingInfo, hidePaintingInfo } from './paintingInfo.js';
import { updateMovement } from './movement.js';
import { isClickedPainting, isHoverPainting, isNearPainting, paintingToShow, nearCheck } from './clickHandle.js';

export function setupRendering(
    scene,
    camera,
    renderer,
    paintings,
    frames,
    controls,
    walls,
) {
    const clock = new THREE.Clock();

    let render = function () {
        const delta = clock.getDelta();
        updateMovement(delta, controls, camera, walls);
        // nearCheck(camera, paintings,frames);
        if (isNearPainting || isClickedPainting || isHoverPainting) {
            displayPaintingInfo(paintingToShow.userData.info);
        } else {
            hidePaintingInfo();
        }
        // camera.layers.set(1);
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    render();
}