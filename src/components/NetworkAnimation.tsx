import { useEffect, useRef } from 'react';

export default function NetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    const nodeCount = 50;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.8 + 0.6),
        radius: Math.random() * 3 + 2,
        opacity: Math.random() * 0.4 + 0.8
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        const fadeStart = canvas.height * 0.2;
        if (node.y < fadeStart) {
          node.opacity *= 0.98;
        }

        if (node.y < -50 || node.opacity < 0.01) {
          node.x = Math.random() * canvas.width;
          node.y = canvas.height + Math.random() * 100;
          node.vx = (Math.random() - 0.5) * 0.4;
          node.vy = -(Math.random() * 0.8 + 0.6);
          node.opacity = Math.random() * 0.4 + 0.8;
        }

        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${node.opacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(0, 255, 136, ${node.opacity * 0.8})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            const lineOpacity = Math.min(node.opacity, otherNode.opacity) * 0.5 * (1 - distance / 150);
            ctx.strokeStyle = `rgba(0, 255, 136, ${lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
