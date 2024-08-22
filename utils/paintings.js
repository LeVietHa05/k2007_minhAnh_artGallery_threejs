import * as THREE from 'three';

import { paintingData } from './paintingData.js';

export function createPaintings(scene) {
    let paintings = [];
    paintingData.forEach(data => {
        const painting = new THREE.Mesh(
            new THREE.PlaneGeometry(data.width, data.height),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(data.imgSrc) })
        );

        painting.position.set(data.position.x, data.position.y, data.position.z);
        painting.rotation.y = data.rotationY;

        //to show the painting info when look later
        painting.userData = {
            info: data.info,
            type: 'painting',
            link: "https://www.google.com"
        }

        paintings.castShadow = true;
        paintings.receiveShadow = true;

        paintings.push(painting);
    })

    return paintings;
}