import * as THREE from 'three';

export function createWalls(scene) {
    const textureLoader = new THREE.TextureLoader();
    let wallGroup = new THREE.Group();
    scene.add(wallGroup);

    const wallTexture = textureLoader.load('./img/white-plaster-texture.jpg');
    const wallTexture2 = textureLoader.load('./img/full-frame-white-wooden-plank.jpg', (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(17, 1);
    });

    //front wall 
    const frontWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.01),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    frontWall.position.z = -25;

    //left wall
    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 20, 50),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    leftWall.position.x = -25;

    //right wall
    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 20, 50),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    rightWall.position.x = 25;

    //back wall
    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.01),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    backWall.position.z = 25;

    //three walls in the middle of the room
    const wall1 = new THREE.Mesh(
        new THREE.BoxGeometry(25, 20, 1),
        new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
    )
    wall1.position.z = 12.425;

    const wall2 = new THREE.Mesh(
        new THREE.BoxGeometry(25, 20,1),
        new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
    )
    wall2.position.z = -12.425;

    const wall3 = new THREE.Mesh(
        new THREE.BoxGeometry(25, 20, 1),
        new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
    )
    wall3.position.z = 0;

    wallGroup.add(frontWall, leftWall, rightWall, backWall, wall1, wall2, wall3);

    return wallGroup;
}