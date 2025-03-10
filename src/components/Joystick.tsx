import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Joystick({ joystickPosition, setJoystickPosition }: { joystickPosition: { x: number, y: number }, setJoystickPosition: (joystickPosition: { x: number, y: number }) => void }) {
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(joystickPosition.x);
  const y = useMotionValue(joystickPosition.y);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  useEffect(() => {
    let animationFrameId: number;
    const threshold = 0.5;

    const animate = () => {
      if (!isDragging) {
        const currentX = x.get();
        const currentY = y.get();
        const deltaX = joystickPosition.x - currentX;
        const deltaY = joystickPosition.y - currentY;

        if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) {
          x.set(joystickPosition.x);
          y.set(joystickPosition.y);
          return;
        }

        const newX = currentX + deltaX * 0.3;
        const newY = currentY + deltaY * 0.3;
        x.set(newX);
        y.set(newY);

        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [joystickPosition, x, y, isDragging]);

  return (
    <div className="joystick-base">
      <motion.div
        className="joystick"
        style={{
          rotateX,
          rotateY,
          x,
          y,
        }}
        drag
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.4}
        whileTap={{ cursor: "grabbing" }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          if ((info.offset.x - joystickPosition.x)**2 + (info.offset.y - joystickPosition.y)**2 > 100) {
            setJoystickPosition({ x: info.offset.x, y: info.offset.y });
          }
        }}
        onDragEnd={() => {
          setIsDragging(false);
          setJoystickPosition({ x: 0, y: 0 });
        }}
      />
    </div>
  );
}