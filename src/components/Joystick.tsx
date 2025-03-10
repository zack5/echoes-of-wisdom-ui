import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Joystick({ joystickPosition, setJoystickPosition }: { joystickPosition: { x: number, y: number }, setJoystickPosition: (joystickPosition: { x: number, y: number }) => void }) {
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(joystickPosition.x);
  const y = useMotionValue(joystickPosition.y);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  useEffect(() => {
    if (!isDragging) {
      x.set(joystickPosition.x);
      y.set(joystickPosition.y);
    }
  }, [joystickPosition, x, y, isDragging]);

  return (
    <div className="joystick-base">
      <motion.div
        className="joystick"
        style={{
          rotateX,
          rotateY,
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
        animate={isDragging ? undefined : { x: joystickPosition.x, y: joystickPosition.y }}
        transition={isDragging ? { duration: 0.1 } : undefined}
      />
    </div>
  );
}