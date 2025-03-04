import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Joystick({ joystickPosition, setJoystickPosition }: { joystickPosition: { x: number, y: number }, setJoystickPosition: (joystickPosition: { x: number, y: number }) => void }) {

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  return (
    <div className="joystick-base">
      <motion.div
        className="joystick"
        style={{
          x,
          y,
          rotateX,
          rotateY,
        }}
        drag
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.4}
        whileTap={{ cursor: "grabbing" }}
        onDrag={(_, info) => {
          if ((info.offset.x - joystickPosition.x)**2 + (info.offset.y - joystickPosition.y)**2 > 100) {
            setJoystickPosition({ x: info.offset.x, y: info.offset.y });
          }
        }}
        onDragEnd={() => {
          setJoystickPosition({ x: 0, y: 0 });
        }}
      />
    </div>
  );
}