import * as THREE from 'three';

export function createWalls(scene) {
    const textureLoader = new THREE.TextureLoader();
    let wallGroup = new THREE.Group();
    scene.add(wallGroup);

    const wallTexture = textureLoader.load('./img/white-plaster-texture.jpg');

    //front wall 
    const frontWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.01),
        new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
    )
    frontWall.position.z = -25;

    //left wall
    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 20, 50),
        new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
    )
    leftWall.position.x = -25;

    //right wall
    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 20, 50),
        new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
    )
    rightWall.position.x = 25;

    //back wall
    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.01),
        new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
    )
    backWall.position.z = 25;

    wallGroup.add(frontWall, leftWall, rightWall, backWall);

    return wallGroup;
}