

import * as THREE from 'three'
import { paintingData } from './paintingData.js'

export function createGlowingFrame(scene) {
    let frames = [];
    for (let i = 0; i < paintingData.length; i++) {
        const paintingWidth = paintingData[i].width;
        const paintingHeight = paintingData[i].height;
        const frameThickness = 0.01;
        // Create a group to hold all the outlines
        const outlineGroup = new THREE.Group();

        const frameMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            // emissive: 0xEBD3F8,
            emissive: 0xff0000,
            emissiveIntensity: 1,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        })

        const topOutline = new THREE.Mesh(
            new THREE.PlaneGeometry(paintingWidth + frameThickness, frameThickness),
            frameMaterial
        );
        topOutline.position.set(paintingData[i].position.x, paintingData[i].position.y + paintingHeight / 2 + frameThickness / 2, paintingData[i].position.z + 0.01);

        const bottomOutline = new THREE.Mesh(
            new THREE.PlaneGeometry(paintingWidth + frameThickness, frameThickness),
            frameMaterial
        );
        bottomOutline.position.set(paintingData[i].position.x, paintingData[i].position.y - paintingHeight / 2 - frameThickness / 2, paintingData[i].position.z + 0.01);

        const leftOutline = new THREE.Mesh(
            new THREE.PlaneGeometry(frameThickness, paintingHeight + frameThickness),
            frameMaterial
        );
        leftOutline.position.set(paintingData[i].position.x - paintingWidth / 2 - frameThickness / 2, paintingData[i].position.y, paintingData[i].position.z + 0.01);

        const rightOutline = new THREE.Mesh(
            new THREE.PlaneGeometry(frameThickness, paintingHeight + frameThickness),
            frameMaterial
        );
        rightOutline.position.set(paintingData[i].position.x + paintingWidth / 2 + frameThickness / 2, paintingData[i].position.y, paintingData[i].position.z + 0.01);


        outlineGroup.add(topOutline, bottomOutline, leftOutline, rightOutline);
        outlineGroup.visible = false;
        scene.add(outlineGroup);
        frames.push(outlineGroup);
    }
    return frames;
}