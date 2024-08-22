import * as THREE from 'three';
import { displayPaintingInfo, hidePaintingInfo } from './paintingInfo.js';

let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

export function clickHandle(renderer, camera, paintings, frames) {
    renderer.domElement.addEventListener('click', (e) => {
        //normalize mouse position because it is not in the same scale as the camera
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        onclick(camera, paintings, frames);

    }, false);
}

export function hoverHandle(renderer, camera, paintings, frames) {
    renderer.domElement.addEventListener('mousemove', (e) => {
        //normalize mouse position because it is not in the same scale as the camera
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        // console.log(mouse);
        onHover(camera, paintings, frames);
    }, false);
}

function onHover(camera, paintings, frames) {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(paintings);

    if (intersects.length > 0) {
        const painting = intersects[0].object;
        let paintingID = painting.userData.info.paintingID;
        frames.forEach(outlines => {
            outlines.visible = false;
        });
        frames[paintingID].visible = !frames[paintingID].visible;
        displayPaintingInfo(painting.userData.info);
    }
    else {
        hidePaintingInfo();
        frames.forEach(outlines => {
            outlines.visible = false;
        });
    }
}

function onclick(camera, paintings, frames) {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(paintings);

    if (intersects.length > 0) {
        const painting = intersects[0].object;
        console.log(painting.userData.info.title);
        let paintingID = painting.userData.info.paintingID;
        frames.forEach(outlines => {
            outlines.visible = false;
        });
        frames[paintingID].visible = !frames[paintingID].visible;
        displayPaintingInfo(painting.userData.info);
        //window.open(painting.userData.link, '_blank');
    }
    else {
        hidePaintingInfo();
        frames.forEach(outlines => {
            outlines.visible = false;
        });
    }
}