import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider.jsx";
import * as THREE from "three";
import { motion } from "framer-motion";
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';

const BackgroundCanvas = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const wavesRef = useRef(null);
  const blobsRef = useRef([]);
  const frameIdRef = useRef(null);
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);
  const noiseRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize the 3D scene
    const container = containerRef.current;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    cameraRef.current = camera;

    // Create WebGL renderer with alpha
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create a more detailed plane with wave animation
    const planeGeometry = new THREE.PlaneGeometry(30, 30, 50, 50);

    // Create material with a subtle gradient
    const primaryColor = theme === 'dark' ? 0x3B82F6 : 0x3B82F6; // Primary blue
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.15 : 0.1
    });

    const waves = new THREE.Mesh(planeGeometry, planeMaterial);
    waves.rotation.x = -Math.PI / 3;
    waves.position.y = -5;
    waves.position.z = -5;
    scene.add(waves);
    wavesRef.current = waves;

    // Create floating blobs (modern design element)
    const createBlob = (position, color, size, speed) => {
      const geometry = new THREE.IcosahedronGeometry(size, 4);
      const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: theme === 'dark' ? 0.2 : 0.15
      });

      const blob = new THREE.Mesh(geometry, material);
      blob.position.set(position.x, position.y, position.z);
      blob.userData = {
        speed: speed,
        rotationAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize()
      };

      scene.add(blob);
      return blob;
    };

    // Add multiple blobs with different properties
    const blob1 = createBlob(
      { x: -8, y: 3, z: -5 },
      theme === 'dark' ? 0x4F46E5 : 0x4F46E5, // Indigo
      1.5,
      0.3
    );

    const blob2 = createBlob(
      { x: 8, y: -2, z: -8 },
      theme === 'dark' ? 0x8B5CF6 : 0x8B5CF6, // Violet
      2,
      0.2
    );

    const blob3 = createBlob(
      { x: 0, y: 6, z: -12 },
      theme === 'dark' ? 0xEC4899 : 0xEC4899, // Pink
      2.5,
      0.15
    );

    blobsRef.current = [blob1, blob2, blob3];

    setLoaded(true);

    // Animation function - enhanced modern animation
    const animate = () => {
      if (!wavesRef.current || !rendererRef.current || !cameraRef.current || !sceneRef.current) return;

      const positions = wavesRef.current.geometry.attributes.position;
      const time = performance.now() * 0.0005; // Use a very slow time factor

      // Animate wave with more complex pattern
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        // Create more complex wave pattern
        const z = Math.sin((x + time) * 0.5) * 0.5 +
                 Math.sin((y + time) * 0.5) * 0.5 +
                 Math.sin((x + y + time) * 0.3) * 0.2;

        positions.setZ(i, z);
      }

      positions.needsUpdate = true;

      // Slow rotation for the wave
      wavesRef.current.rotation.z = time * 0.1;

      // Animate the floating blobs
      blobsRef.current.forEach(blob => {
        // Rotate each blob around its own axis
        const axis = blob.userData.rotationAxis;
        const speed = blob.userData.speed;

        blob.rotateOnAxis(axis, speed * 0.01);

        // Add gentle floating motion
        blob.position.y += Math.sin(time * speed) * 0.005;

        // Subtle scale pulsing
        const scale = 1 + Math.sin(time * speed * 0.5) * 0.05;
        blob.scale.set(scale, scale, scale);
      });

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Clean up
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }

      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }

      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  // Update materials based on theme
  useEffect(() => {
    if (!wavesRef.current || !wavesRef.current.material) return;

    // Update wave material
    const waveMaterial = wavesRef.current.material;

    if (theme === 'dark') {
      waveMaterial.opacity = 0.15;
      waveMaterial.color.set(0x3B82F6);
    } else {
      waveMaterial.opacity = 0.1;
      waveMaterial.color.set(0x3B82F6);
    }

    // Update blob materials
    if (blobsRef.current.length > 0) {
      const blob1 = blobsRef.current[0];
      const blob2 = blobsRef.current[1];
      const blob3 = blobsRef.current[2];

      if (blob1 && blob1.material) {
        blob1.material.opacity = theme === 'dark' ? 0.2 : 0.15;
        blob1.material.color.set(0x4F46E5); // Indigo
      }

      if (blob2 && blob2.material) {
        blob2.material.opacity = theme === 'dark' ? 0.2 : 0.15;
        blob2.material.color.set(0x8B5CF6); // Violet
      }

      if (blob3 && blob3.material) {
        blob3.material.opacity = theme === 'dark' ? 0.2 : 0.15;
        blob3.material.color.set(0xEC4899); // Pink
      }
    }
  }, [theme]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-[100vh] z-[-1] hero-bg-limit"
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    />
  );
};

export default BackgroundCanvas;
