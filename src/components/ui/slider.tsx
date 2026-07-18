import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  id?: string;
  min?: number;
  max?: number;
  value?: number[];
  defaultValue?: number[];
  className?: string;
  onValueChange?: (value: number[]) => void;
}

export function Slider({
  id,
  min = 0,
  max = 100,
  value,
  className,
  onValueChange,
}: SliderProps) {
  const currentVal = value ? value[0] : min;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.([Number(e.target.value)]);
  };

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={currentVal}
        onChange={handleChange}
        className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
        style={{
          background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((currentVal - min) / (max - min)) * 100}%, #262626 ${((currentVal - min) / (max - min)) * 100}%, #262626 100%)`
        }}
      />
    </div>
  );
}
