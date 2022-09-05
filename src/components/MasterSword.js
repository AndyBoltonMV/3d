import * as THREE from "three";

export const MasterSword = () => {
  const scene = new THREE.Scene(); //Create scene
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //Set renderer, antialias for smooth edges, alpha to remove background
  renderer.setClearColor(0xffffff, 1); //Set background to white

  //Nice shadow handling
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  //Ambient light softens directional light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  //Directional light to work with shadow map
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(100, 500, 300);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  //Handling camera size and perspective
  const aspectRatio = window.innerWidth / window.innerHeight;
  const cameraWidth = 150;
  const cameraHeight = cameraWidth / aspectRatio;
  const camera = new THREE.OrthographicCamera(
    cameraWidth / -1,
    cameraWidth / 1,
    cameraHeight / 1,
    cameraHeight / -1,
    1,
    1000
  );
  camera.position.set(200, 200, 200);
  camera.lookAt(scene.position);

  //Function for creating Triforce triple triangle group
  const createTriforce = () => {
    const triforce = new THREE.Group();

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(3.75, 0);
    shape.lineTo(0, 6.495); //Quick Maffs
    shape.lineTo(-3.75, 0);
    const extrudeSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({ color: 0xffd700 });
    const topMesh = new THREE.Mesh(geometry, material);
    const leftMesh = new THREE.Mesh(geometry, material);
    const rightMesh = new THREE.Mesh(geometry, material);

    topMesh.position.y = 6.495;

    leftMesh.position.x = 3.75;

    rightMesh.position.x = -3.75;

    triforce.add(topMesh);
    triforce.add(leftMesh);
    triforce.add(rightMesh);

    triforce.rotation.y = 1.6;

    return triforce;
  };

  //Function for creating the pedestal
  const createPedestal = () => {
    const pedestal = new THREE.Group();

    const baseGeometry = new THREE.BoxGeometry(42.4, 12, 42.4);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x88808c });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    pedestal.add(base);

    const topGeometry = new THREE.CylinderGeometry(25, 30, 12, 4, 1);
    const topMaterial = new THREE.MeshLambertMaterial({ color: 0x88808c });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.rotation.y = 0.785;
    top.position.y = 12;
    pedestal.add(top);

    //Adding Triforce to pedestal
    const triforce = createTriforce();
    triforce.position.x = 22;
    pedestal.add(triforce);

    return pedestal;
  };

  //Function for creating Sword
  const createSword = () => {
    const sword = new THREE.Group();

    const bladeGeometry = new THREE.BoxGeometry(2, 2, 75);
    bladeGeometry.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 4));
    bladeGeometry.applyMatrix4(new THREE.Matrix4().makeScale(1, 3, 1));
    const bladeMaterial = new THREE.MeshPhongMaterial({ color: 0xc0c0c0 });
    const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
    blade.rotation.x = 1.56;
    blade.position.y = 30;
    sword.add(blade);

    //Cross guard needed to be drawn with lineTo method
    const x = 0;
    const y = 0;
    const guardShape = new THREE.Shape();
    guardShape.moveTo(x, y);
    guardShape.lineTo(x - 3.8, y - 3.8);
    guardShape.lineTo(x - 3.8, y);
    guardShape.lineTo(x - 4.8, y + 3.8);
    guardShape.lineTo(x - 6.8, y - 1);
    guardShape.lineTo(x - 9.8, y - 1);
    guardShape.lineTo(x - 5.8, y + 5.8);
    guardShape.lineTo(x, y + 4.8); //middle
    guardShape.lineTo(x + 5.8, y + 5.8);
    guardShape.lineTo(x + 9.8, y - 1);
    guardShape.lineTo(x + 6.8, y - 1);
    guardShape.lineTo(x + 4.8, y + 3.8);
    guardShape.lineTo(x + 3.8, y);
    guardShape.lineTo(x + 3.8, y - 3.8);

    const extrudeSettings = {
      steps: 2,
      depth: 0.7,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    };

    const guardGeometry = new THREE.ExtrudeGeometry(
      guardShape,
      extrudeSettings
    );
    const guardMaterial = new THREE.MeshPhongMaterial({ color: 0x342c5b });
    const guard = new THREE.Mesh(guardGeometry, guardMaterial);
    guard.rotation.y = 1.56;
    guard.position.y = 67;
    guard.position.z = -0.35;
    guard.position.x = -0.35;

    sword.add(guard);

    const handleGeometry = new THREE.CylinderGeometry(1.5, 1.5, 17, 32);
    const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x342c5b });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.y = 80;
    sword.add(handle);

    const pommelGeometry = new THREE.SphereGeometry(2, 32, 16);
    const pommelMaterial = new THREE.MeshPhongMaterial({ color: 0x342c5b });
    const pommel = new THREE.Mesh(pommelGeometry, pommelMaterial);
    pommel.position.y = 89;
    sword.add(pommel);

    //Add Triforce to blade and orient it
    const triforce = createTriforce();
    triforce.position.y += 62;
    triforce.position.x += 1;
    triforce.position.z -= 1.5;
    triforce.rotation.z = 1.05;
    triforce.scale.set(0.3, 0.3, 0.3);

    sword.add(triforce);

    return sword;
  };

  //Init method that brings all the individual models together
  const createModel = () => {
    const model = new THREE.Group();
    const pedestal = createPedestal();
    const sword = createSword();

    model.add(sword);
    model.add(pedestal);

    return model;
  };

  const model = createModel();
  model.position.y = -20;
  scene.add(model);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const animate = () => {
    requestAnimationFrame(animate);
    model.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();
};
