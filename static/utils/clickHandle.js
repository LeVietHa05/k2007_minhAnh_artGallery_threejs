import * as THREE from 'three';
import { displayPaintingInfo, hidePaintingInfo } from './paintingInfo.js';

let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
export let isNearPainting = false;
export let isClickedPainting = false;
export let isHoverPainting = false;
export let paintingToShow = null;

export let isEdit = false;
let isDragging = false;
let offset = new THREE.Vector3();
let offset2 = new THREE.Vector3();

document.querySelector('#edit_button').addEventListener('click', (e) => {
    isEdit = !isEdit;
    e.target.textContent = "Edit mode: " + (isEdit ? "ON" : "OFF");
})

export function clickHandle(renderer, camera, paintings, frames) {
    renderer.domElement.addEventListener('mousedown', (e) => {
        //normalize mouse position because it is not in the same scale as the camera
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        frames.forEach(outlines => {
            outlines.visible = false;
        });

        const intersects = raycaster.intersectObjects(paintings);
        if (intersects.length > 0) {
            paintingToShow = intersects[0].object;
            console.log(paintingToShow.userData.info.title);
            let paintingID = paintingToShow.userData.info.paintingID;
            console.log(paintingID);
            frames[paintingID].visible = !frames[paintingID].visible;
            if (!isEdit) {
                isClickedPainting = true;
                // displayPaintingInfo(painting.userData.info);
                //window.open(painting.userData.link, '_blank');
            } else {
                isDragging = true;
                isClickedPainting = false;
                const intersectionPoint = intersects[0].point;
                offset.copy(intersectionPoint).sub(paintingToShow.position);
                //somehow the frame group 's position is relative to the painting
                offset2.copy(paintingToShow.position).sub(frames[paintingID].position);
            }
        } else {
            isClickedPainting = false;
            // hidePaintingInfo();
        }


    }, false);
}

export function nearCheck(camera, paintings) {
    if (!isEdit) {
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
}

export function hoverHandle(renderer, camera, paintings, frames) {
    renderer.domElement.addEventListener('mousemove', (e) => {
        //normalize mouse position because it is not in the same scale as the camera
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        // console.log(mouse);
        if (!isEdit) {
            onHover(camera, paintings, frames);
        } else {
            if (isDragging && paintingToShow) {
                raycaster.setFromCamera(mouse, camera);
                const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), -paintingToShow.position.z);
                const newPoint = new THREE.Vector3();

                raycaster.ray.intersectPlane(planeZ, newPoint);
                paintingToShow.position.copy(newPoint.sub(offset));
                // console.log(paintingToShow.position);

                let paintingID = paintingToShow.userData.info.paintingID;
                frames[paintingID].position.copy(newPoint.sub(offset2));
                // console.log(frames[paintingID].position);
            }
        }
    }, false);

    renderer.domElement.addEventListener('mouseup', (e) => {
        isDragging = false;
    }, false);
}
function onHover(camera, paintings, frames) {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(paintings);

    if (intersects.length > 0) {
        isHoverPainting = true;
        paintingToShow = intersects[0].object;
        let paintingID = paintingToShow.userData.info.paintingID;
        console.log(paintingID);
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

}