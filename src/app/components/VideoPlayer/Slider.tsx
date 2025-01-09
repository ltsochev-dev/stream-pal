import { forwardRef } from "react";
import styles from "./slider.module.css";

interface SliderProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
}

console.log(styles); // Log the styles object

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ min, max, value, step, className, onChange }, ref) => (
    <div className={styles.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`${styles.slider} ${className}`}
        style={{
          backgroundSize: `${((value - min) / (max - min)) * 100}% 100%`,
        }}
        ref={ref}
      />
    </div>
  )
);

Slider.displayName = "Slider";

export default Slider;
