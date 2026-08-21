"use client";

import React, { useEffect, useRef, useState } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function ThreeDMedallion() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 240;
    let height = 240;

    const resizeCanvas = () => {
      width = canvas.parentElement?.clientWidth || 240;
      height = canvas.parentElement?.clientHeight || 240;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create a 3D dual-conical diamond gem structure (luxury accessory emblem)
    const points: Point3D[] = [
      { x: 0, y: -70, z: 0 },    // Top vertex [0]
      { x: 0, y: 70, z: 0 },     // Bottom vertex [1]
      
      // Middle Ring (8 vertices)
      { x: 45 * Math.cos(0), y: 0, z: 45 * Math.sin(0) },                         // [2]
      { x: 45 * Math.cos(Math.PI / 4), y: 0, z: 45 * Math.sin(Math.PI / 4) },     // [3]
      { x: 45 * Math.cos(Math.PI / 2), y: 0, z: 45 * Math.sin(Math.PI / 2) },     // [4]
      { x: 45 * Math.cos(3 * Math.PI / 4), y: 0, z: 45 * Math.sin(3 * Math.PI / 4) }, // [5]
      { x: 45 * Math.cos(Math.PI), y: 0, z: 45 * Math.sin(Math.PI) },             // [6]
      { x: 45 * Math.cos(5 * Math.PI / 4), y: 0, z: 45 * Math.sin(5 * Math.PI / 4) }, // [7]
      { x: 45 * Math.cos(3 * Math.PI / 2), y: 0, z: 45 * Math.sin(3 * Math.PI / 2) }, // [8]
      { x: 45 * Math.cos(7 * Math.PI / 4), y: 0, z: 45 * Math.sin(7 * Math.PI / 4) }, // [9]
    ];

    // Connectivity lines
    const edges: [number, number][] = [
      // Top connections
      [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
      // Bottom connections
      [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9],
      // Ring connections
      [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 2]
    ];

    let angleX = 0.4;
    let angleY = 0.5;
    let angleZ = 0.1;

    // Track mouse movements to tilt the emblem dynamically
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mousePos.current.targetX = x * 0.003;
      mousePos.current.targetY = y * 0.003;
    };

    const handleMouseLeave = () => {
      mousePos.current.targetX = 0;
      mousePos.current.targetY = 0;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth damp/spring for mouse interaction
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.1;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.1;

      // Base auto rotation speeds
      const autoRotateSpeed = isHovered ? 0.025 : 0.008;
      angleY += autoRotateSpeed + mousePos.current.x * 0.5;
      angleX += 0.004 + mousePos.current.y * 0.5;
      angleZ += 0.002;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // Center point
      const cx = width / 2;
      const cy = height / 2;
      const perspective = 300; // Camera perspective distance

      // Project 3D points to 2D
      const projectedPoints = points.map((p) => {
        // Rotation around X axis
        let y1 = p.y * cosX - p.z * sinX;
        let z1 = p.y * sinX + p.z * cosX;

        // Rotation around Y axis
        let x2 = p.x * cosY + z1 * sinY;
        let z2 = -p.x * sinY + z1 * cosY;

        // Rotation around Z axis
        let x3 = x2 * cosZ - y1 * sinZ;
        let y3 = x2 * sinZ + y1 * cosZ;

        // Depth perspective projection
        const scale = perspective / (perspective + z2);
        return {
          x: x3 * scale + cx,
          y: y3 * scale + cy,
          depth: z2, // for depth-based stroke lighting
        };
      });

      // Draw elegant outer spinning halo glow ring (simulates 3D space)
      ctx.beginPath();
      ctx.arc(cx, cy, isHovered ? 78 : 70, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(197, 187, 175, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw lines / edges with depth shading
      edges.forEach(([p1Idx, p2Idx]) => {
        const p1 = projectedPoints[p1Idx];
        const p2 = projectedPoints[p2Idx];

        // Average depth of the two vertices
        const avgDepth = (p1.depth + p2.depth) / 2;
        
        // Shading maps: deeper in screen = darker
        const alpha = Math.max(0.15, Math.min(0.8, (120 - avgDepth) / 200));
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(197, 187, 175, ${alpha})`;
        ctx.lineWidth = isHovered ? 1.5 : 1.0;
        ctx.stroke();
      });

      // Draw vertices as small glowing champagne beads
      projectedPoints.forEach((p, idx) => {
        const alpha = Math.max(0.2, Math.min(0.95, (120 - p.depth) / 200));
        ctx.beginPath();
        ctx.arc(p.x, p.y, idx < 2 ? 3.5 : 2.5, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(232, 200, 129, ${alpha})`; // Champagne-gold beads
        ctx.fill();
        
        // Draw tiny outer glow ring around top and bottom peaks
        if (idx < 2 && isHovered) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
          ctx.strokeStyle = `rgba(232, 200, 129, ${alpha * 0.4})`;
          ctx.stroke();
        }
      });

      // Render a clean, elegant "V" monogram floating at the center of the medallion
      ctx.font = "italic 300 24px 'Cormorant Garamond', serif";
      ctx.fillStyle = isHovered ? "rgba(46, 36, 33, 0.95)" : "rgba(46, 36, 33, 0.65)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "2px";
      ctx.fillText("V", cx, cy);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-48 sm:w-56 lg:w-60 h-48 sm:h-56 lg:h-60 flex items-center justify-center cursor-pointer group"
      title="Interactive 3D Emblem — Hold & Drag"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block select-none z-10" />
      
      {/* Background radial shadow glow */}
      <div className="absolute w-3/4 h-3/4 bg-champagne/20 rounded-full blur-2xl -z-0 opacity-40 group-hover:scale-125 transition-transform duration-1000" />
      
      {/* Tasteful subtle 3D hover instructions */}
      <div className="absolute -bottom-2 text-[8px] font-semibold tracking-widest text-taupe uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-sans select-none z-20">
        INTERACT 3D
      </div>
    </div>
  );
}
