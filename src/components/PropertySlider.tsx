import { Slider } from "@mui/material";

export default function PropertySlider(
  { value, setValue, label, min, max, step, subLabel = "", scale = undefined }: 
  { value: number, setValue: (value: number) => void, label: string, min: number, max: number, step: number, 
    subLabel?: string, scale?: "exponential" | "log" | "polynomial" }) {
  return (
    <div className="slider">
      <div className="slider-label">{label}: {value}</div>
      <div className="slider-sublabel">{subLabel}</div>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        scale={scale === "exponential"
          ? (x) => Math.exp(x) : 
          scale === "log"
            ? (x) => Math.log(x)
            : scale === "polynomial"
              ? (x) => Math.pow(x, 2)
              : undefined}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => Math.trunc(value * 100) / 100}
        onChange={(_, value) => {
          setValue(value as number);
        }}
      />
    </div>
  );
}