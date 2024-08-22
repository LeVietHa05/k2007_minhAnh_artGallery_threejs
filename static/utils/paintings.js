import * as THREE from 'three'

export async function createPaintings(scene) {
    let paintings = [];
    let frames = [];
    let paintingData = [];
    const frameThickness = 0.01;
    fetch('/paintingData')
        .then(res => res.json())
        .then(e => {
            paintingData = e;
            paintingData.forEach(data => {
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
                    new THREE.PlaneGeometry(data.width + frameThickness, frameThickness),
                    frameMaterial
                );
                topOutline.position.set(data.position.x, data.position.y + data.height / 2 + frameThickness / 2, data.position.z + 0.01);

                const bottomOutline = new THREE.Mesh(
                    new THREE.PlaneGeometry(data.width + frameThickness, frameThickness),
                    frameMaterial
                );
                bottomOutline.position.set(data.position.x, data.position.y - data.height / 2 - frameThickness / 2, data.position.z + 0.01);

                const leftOutline = new THREE.Mesh(
                    new THREE.PlaneGeometry(frameThickness, data.height + frameThickness),
                    frameMaterial
                );
                leftOutline.position.set(data.position.x - data.width / 2 - frameThickness / 2, data.position.y, data.position.z + 0.01);

                const rightOutline = new THREE.Mesh(
                    new THREE.PlaneGeometry(frameThickness, data.height + frameThickness),
                    frameMaterial
                );
                rightOutline.position.set(data.position.x + data.width / 2 + frameThickness / 2, data.position.y, data.position.z + 0.01);


                outlineGroup.add(topOutline, bottomOutline, leftOutline, rightOutline);
                outlineGroup.visible = false;


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
                scene.add(painting, outlineGroup);
                paintings.push(painting);
                frames.push(outlineGroup);
            })
        })
    return { paintings, frames };
}