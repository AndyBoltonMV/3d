import * as THREE from "three";

export const Truck = () => {
  const scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(200, 500, 300);
  scene.add(directionalLight);

  const aspectRatio = window.innerWidth / window.innerHeight;
  const cameraWidth = 150;
  const cameraHeight = cameraWidth / aspectRatio;
  const camera = new THREE.OrthographicCamera(
    cameraWidth / -2,
    cameraWidth / 2,
    cameraHeight / 2,
    cameraHeight / -2,
    1,
    1000
  );
  camera.position.set(200, 200, 200);
  camera.lookAt(scene.position);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const createWheels = () => {
    const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
  };

  const createWings = () => {
    const geometry = new THREE.BoxBufferGeometry(44, 12, 2);
    const material = new THREE.MeshLambertMaterial({ color: 0x880808 });
    const wing = new THREE.Mesh(geometry, material);
    return wing;
  };

  const buildTruck = () => {
    const truck = new THREE.Group();

    const backWheel = createWheels();
    backWheel.position.y = 6;
    backWheel.position.x = -30;
    truck.add(backWheel);

    const frontWheel = createWheels();
    frontWheel.position.y = 6;
    frontWheel.position.x = 30;
    truck.add(frontWheel);

    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry(80, 15, 30),
      new THREE.MeshLambertMaterial({ color: 0x880808 })
    );
    main.position.y = 12;
    truck.add(main);

    const cabin = new THREE.Mesh(
      new THREE.BoxBufferGeometry(34, 17, 30),
      new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    cabin.position.x = 21;
    cabin.position.y = 28;
    truck.add(cabin);

    const leftWing = createWings();
    leftWing.position.y = 25;
    leftWing.position.x = -18;
    leftWing.position.z = 14;
    truck.add(leftWing);

    const rightWing = createWings();
    rightWing.position.y = 25;
    rightWing.position.x = -18;
    rightWing.position.z = -14;
    truck.add(rightWing);

    return truck;
  };

  const truck = buildTruck();
  scene.add(truck);

  const animate = () => {
    truck.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();

  return <div />;
};
