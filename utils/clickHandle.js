import * as THREE from 'three';
import { displayPaintingInfo, hidePaintingInfo } from './paintingInfo.js';

let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
export let isNearPainting = false;
export let isClickedPainting = false;
export let isHoverPainting = false;
export let paintingToShow = null;

export function clickHandle(renderer, camera, paintings, frames) {
    renderer.domElement.addEventListener('click', (e) => {
        //normalize mouse position because it is not in the same scale as the camera
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        onclick(camera, paintings, frames);

    }, false);
}

export function nearCheck(camera, paintings) {
    const distanceThreshold = 8.0;
    let painting = paintings.find(painting => {
        return camera.position.distanceTo(painting.position) < distanceThreshold;
    })
    if (painting) {
        paintingToShow = painting;
        isNearPainting = true;
    } else {
        isNearPainting = false;
    }
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
        isHoverPainting = true;
        paintingToShow = intersects[0].object;
        let paintingID = paintingToShow.userData.info.paintingID;
        frames.forEach(outlines => {
            outlines.visible = false;
        });
        frames[paintingID].visible = !frames[paintingID].visible;
        // displayPaintingInfo(painting.userData.info);
    }
    else {
        isHoverPainting = false;
        // hidePaintingInfo();
        frames.forEach(outlines => {
            outlines.visible = false;
        });
    }
}

function onclick(camera, paintings, frames) {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(paintings);

    if (intersects.length > 0) {
        isClickedPainting = true;
        paintingToShow = intersects[0].object;
        console.log(paintingToShow.userData.info.title);
        let paintingID = paintingToShow.userData.info.paintingID;
        frames.forEach(outlines => {
            outlines.visible = false;
        });
        frames[paintingID].visible = !frames[paintingID].visible;
        // displayPaintingInfo(painting.userData.info);
        //window.open(painting.userData.link, '_blank');
    }
    else {
        isClickedPainting = false;
        // hidePaintingInfo();
        frames.forEach(outlines => {
            outlines.visible = false;
        });
    }
}