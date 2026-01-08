import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const HexagonalWaveBanner = () => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#111213");

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.2, 6);
    camera.lookAt(0, 0, 0);

    // Renderer setup with performance optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio <= 1, // Only enable on lower DPI screens
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap at 1.5 for performance
    containerRef.current.appendChild(renderer.domElement);

    // Adaptive grid density based on device performance
    const getGridSize = () => {
      const isMobile = window.innerWidth < 768;
      const isLowEnd = navigator.hardwareConcurrency <= 4;

      if (isMobile || isLowEnd) {
        return { rows: 20, cols: 35 }; // Reduced for mobile/low-end
      }
      return { rows: 28, cols: 48 }; // Reduced from 35x60
    };

    // Create optimized hexagonal grid with merged geometry
    const createHexGrid = () => {
      const { rows, cols } = getGridSize();
      const size = 0.15;
      const h = size * Math.sqrt(0.8);

      // Use single geometry and instancing concept
      const allVertices = [];
      const allIndices = [];
      const hexData = [];
      let vertexOffset = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const xOff = (row % 2) * 1.5 * size;
          const x = col * 3 * size + xOff - cols * 1.5 * size;
          const z = row * h - rows * h * 0.5;

          // Create vertices for this hexagon
          const hexPoints = [];
          for (let i = 0; i < 7; i++) {
            const angle = (Math.PI / 3) * i;
            const vx = x + size * Math.cos(angle);
            const vz = z + size * Math.sin(angle);
            hexPoints.push(vx, 0, vz);
            allVertices.push(vx, 0, vz);
          }

          // Create indices for this hexagon
          for (let j = 0; j < 6; j++) {
            allIndices.push(vertexOffset + j, vertexOffset + j + 1);
          }

          hexData.push({
            centerX: x,
            centerZ: z,
            startIdx: vertexOffset,
          });

          vertexOffset += 7;
        }
      }

      // Create single merged geometry
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(allVertices, 3)
      );
      geometry.setIndex(allIndices);

      // Store original positions for wave calculation
      const originalPositions = new Float32Array(allVertices);

      return { geometry, hexData, originalPositions };
    };

    const { geometry, hexData, originalPositions } = createHexGrid();

    // Single material for all hexagons (much more efficient)
    const material = new THREE.LineBasicMaterial({
      color: "#fff",
      linewidth: 1,
    });

    // Create single mesh
    const hexMesh = new THREE.LineSegments(geometry, material);
    hexMesh.rotation.x = -1.57; // -90 degrees in radians
    hexMesh.position.y = -1.5;
    scene.add(hexMesh);

    // Use color attribute for per-hexagon colors
    const colors = new Float32Array(geometry.attributes.position.count * 3);
    const baseColor = new THREE.Color("#2b2b2b");
    for (let i = 0; i < colors.length; i += 3) {
      colors[i] = baseColor.r;
      colors[i + 1] = baseColor.g;
      colors[i + 2] = baseColor.b;
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    material.vertexColors = true;

    // Throttled mouse move handler
    let lastMouseUpdate = 0;
    const handleMouseMove = (event) => {
      const now = Date.now();
      if (now - lastMouseUpdate < 16) return; // Throttle to ~60fps
      lastMouseUpdate = now;

      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      targetMouseRef.current.x = x;
      targetMouseRef.current.y = y;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Reusable objects to avoid garbage collection
    const vector = new THREE.Vector3();
    const mousePos = new THREE.Vector3();
    const hoverColor = new THREE.Color("#ffffff");
    const baseColorObj = new THREE.Color("#2b2b2b");
    const tempColor = new THREE.Color();

    // Animation loop with performance monitoring
    let lastTime = Date.now();
    let frames = 0;
    let fps = 60;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      // Calculate FPS
      frames++;
      const now = Date.now();
      if (now - lastTime > 1000) {
        fps = frames;
        frames = 0;
        lastTime = now;
      }

      // Skip frames if FPS drops too low
      if (fps < 30 && frames % 2 === 0) return;

      // Smooth mouse interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.15;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.15;

      const time = Date.now() * 0.001;

      // Create raycaster for precise mouse picking
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(
        new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
        camera
      );

      // Create an invisible plane at the hexagon grid level to raycast against
      const planeGeometry = new THREE.PlaneGeometry(100, 100);
      const planeMesh = new THREE.Mesh(planeGeometry);
      planeMesh.rotation.copy(hexMesh.rotation);
      planeMesh.position.copy(hexMesh.position);
      planeMesh.updateMatrixWorld();

      // Find intersection point
      const intersects = raycaster.intersectObject(planeMesh);

      let mouseX = 0;
      let mouseZ = 0;

      if (intersects.length > 0) {
        // Get the intersection point in local space of the hex mesh
        const intersectPoint = intersects[0].point;
        const localPoint = hexMesh.worldToLocal(intersectPoint.clone());
        mouseX = localPoint.x;
        mouseZ = localPoint.z;
      }

      // Update positions and colors
      const positions = geometry.attributes.position.array;
      const colorAttr = geometry.attributes.color.array;

      // Batch process hexagons
      hexData.forEach((hex) => {
        const { centerX, centerZ, startIdx } = hex;

        // Calculate distance from mouse to hexagon center
        const dx = centerX - mouseX;
        const dz = centerZ - mouseZ;
        const distToMouse = Math.sqrt(dx * dx + dz * dz);

        // Hover effect - optimized color calculation
        const hoverRadius = 0.6;
        let targetColor;

        if (distToMouse < hoverRadius) {
          const hoverStrength = Math.pow(1 - distToMouse / hoverRadius, 2);
          tempColor.copy(hoverColor).lerp(baseColorObj, 1 - hoverStrength * 0.8);
          targetColor = tempColor;
        } else {
          targetColor = baseColorObj;
        }

        // Apply wave animation to all vertices of this hexagon
        for (let i = 0; i < 7; i++) {
          const idx = (startIdx + i) * 3;
          const x = originalPositions[idx];
          const z = originalPositions[idx + 2];

          // Optimized wave calculation
          const wave1 = Math.sin(x * 0.5 + time * 1.5) * 0.4;
          const wave2 = Math.cos(z * 0.5 - time * 1.2) * 0.4;
          const wave3 = Math.sin((x + z) * 0.3 + time * 0.8) * 0.3;

          // Mouse interaction - lift effect with proper falloff
          const distFromMouse = Math.sqrt((x - mouseX) ** 2 + (z - mouseZ) ** 2);
          const mouseWave = Math.exp(-distFromMouse * 2) * 1.5;

          positions[idx + 1] = wave1 + wave2 + wave3 + mouseWave;

          // Update color
          colorAttr[idx] = targetColor.r;
          colorAttr[idx + 1] = targetColor.g;
          colorAttr[idx + 2] = targetColor.b;
        }
      });

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        transform: "rotate(-10deg) scale(1.4)",
        transformOrigin: "center",
      }}
    />
  );
};

export default HexagonalWaveBanner;