import { Slider } from "@mui/material";

export default function PropertySlider(
  { value, setValue, label, min, max, step, isExponential = false }: 
  { value: number, setValue: (value: number) => void, label: string, min: number, max: number, step: number, isExponential?: boolean }) {
  return (
    <div className="slider">
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        scale={isExponential ? (x) => Math.exp(x) : undefined}
        valueLabelDisplay="auto"
        onChange={(_, value) => {
          setValue(value as number);
        }}
      />
      <div className="slider-label">{label}: {value}</div>
    </div>
  );
}