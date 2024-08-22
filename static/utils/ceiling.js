import * as THREE from 'three';

export function createCeiling(scene) {
    const textureLoader = new THREE.TextureLoader();
    const ceilingTexture = textureLoader.load('./img/white-plaster-texture.jpg');

    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshLambertMaterial({
        //not shiny texture for the ceiling
        map: ceilingTexture,
        side: THREE.DoubleSide,
    });

    const ceiling = new THREE.Mesh(planeGeometry, planeMaterial);

    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 10; //

    scene.add(ceiling);

    return ceiling;
}