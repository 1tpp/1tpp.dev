import * as THREE from "three";

(function () {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();

  // Add the renderer to the DOM
  document.getElementById("webgl").appendChild(renderer.domElement);

  renderer.setSize(window.innerWidth, window.innerHeight);

  // Resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
  });

  // Background transparent
  renderer.setClearColor(0x000000, 0);

  // Lights
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  // Camera Front View
  camera.position.z = 5;

  // Particles (Geometry) and Material for follow the mouse
  const geometry = new THREE.SphereGeometry(1, 20, 20);

  // Image texture
  const texture = new THREE.TextureLoader().load("public/1tpp.png");

  // Material
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Stars
  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
  }

  Array(200).fill().forEach(addStar);

  // Mouse Effect movement on the screen
  const mouse = {
    x: undefined,
    y: undefined,
  };

  // Mouse movement
  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  // Render Loop
  function animate() {
    requestAnimationFrame(animate);
    // Rotate the sphere
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.005;
    sphere.rotation.z += 0.01;

    // Follow the mouse movement at mouse.x and mouse.y position on the screen
    if (mouse.x && mouse.y) {
      const x = mouse.x * 0.01 - 0.5;
      const y = mouse.y * 0.01 - 0.5;

      camera.position.x += (x - camera.position.x) * 0.05;
      camera.position.y += (y - camera.position.y) * 0.05;
      camera.position.z += (x - camera.position.z) * 0.05;

      camera.lookAt(scene.position);
    }

    // solar system stars
    scene.rotation.y += 0.0025;

    renderer.render(scene, camera);
  }

  animate();
})();
