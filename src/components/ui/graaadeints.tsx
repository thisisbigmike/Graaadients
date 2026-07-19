"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Copy, 
  Download, 
  Plus, 
  Trash2, 
  Check, 
  RefreshCw, 
  X, 
  Sliders
} from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Slider } from "./slider";
import { Switch } from "./switch";

interface ColorStop {
  color: string;
  position: number;
}

interface Preset {
  name: string;
  type: "linear" | "radial";
  angle: number;
  noiseOpacity: number;
  colors: ColorStop[];
}

const PRESETS: Preset[] = [
  {
    name: "Sunset Silk",
    type: "linear",
    angle: 135,
    noiseOpacity: 12,
    colors: [
      { color: "#ff9a9e", position: 0 },
      { color: "#fecfef", position: 50 },
      { color: "#a1c4fd", position: 100 },
    ],
  },
  {
    name: "Neon Cyber",
    type: "linear",
    angle: 225,
    noiseOpacity: 18,
    colors: [
      { color: "#00f2fe", position: 0 },
      { color: "#4facfe", position: 40 },
      { color: "#000000", position: 100 },
    ],
  },
  {
    name: "Aurora Sky",
    type: "linear",
    angle: 45,
    noiseOpacity: 15,
    colors: [
      { color: "#a8ff78", position: 0 },
      { color: "#78ffd6", position: 100 },
    ],
  },
  {
    name: "Deep Ocean",
    type: "radial",
    angle: 0,
    noiseOpacity: 10,
    colors: [
      { color: "#1e3c72", position: 0 },
      { color: "#2a5298", position: 100 },
    ],
  },
  {
    name: "Coral Dream",
    type: "linear",
    angle: 120,
    noiseOpacity: 12,
    colors: [
      { color: "#ff758c", position: 0 },
      { color: "#ff7eb3", position: 100 },
    ],
  },
  {
    name: "Cosmic Dust",
    type: "radial",
    angle: 0,
    noiseOpacity: 25,
    colors: [
      { color: "#30cfd0", position: 0 },
      { color: "#330867", position: 100 },
    ],
  },
  {
    name: "Emerald Glow",
    type: "linear",
    angle: 60,
    noiseOpacity: 8,
    colors: [
      { color: "#0ba360", position: 0 },
      { color: "#3cba92", position: 100 },
    ],
  },
  {
    name: "Magic Hour",
    type: "linear",
    angle: 150,
    noiseOpacity: 14,
    colors: [
      { color: "#f857a6", position: 0 },
      { color: "#ff5858", position: 100 },
    ],
  },
  {
    name: "Orchid Velvet",
    type: "radial",
    angle: 0,
    noiseOpacity: 16,
    colors: [
      { color: "#b92b27", position: 0 },
      { color: "#1565c0", position: 100 },
    ],
  },
  {
    name: "Solar Flare",
    type: "linear",
    angle: 270,
    noiseOpacity: 20,
    colors: [
      { color: "#f12711", position: 0 },
      { color: "#f5af19", position: 100 },
    ],
  },
  {
    name: "Midnight Mist",
    type: "linear",
    angle: 45,
    noiseOpacity: 22,
    colors: [
      { color: "#0f2027", position: 0 },
      { color: "#203a43", position: 50 },
      { color: "#2c5364", position: 100 },
    ],
  },
  {
    name: "Sweet Sherbet",
    type: "linear",
    angle: 135,
    noiseOpacity: 10,
    colors: [
      { color: "#ffecd2", position: 0 },
      { color: "#fcb69f", position: 100 },
    ],
  },
];

const RESOLUTION_PRESETS = [
  { name: "Default Square", width: 1000, height: 1000 },
  { name: "Full HD", width: 1920, height: 1080 },
  { name: "4K Ultra HD", width: 3840, height: 2160 },
  { name: "Phone Wallpaper", width: 1080, height: 1920 },
  { name: "Twitter Banner", width: 1500, height: 500 },
  { name: "Custom", width: 0, height: 0 },
];

export function GradientGenerator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Core customizer state
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState<number>(135);
  const [noiseOpacity, setNoiseOpacity] = useState<number>(12);
  const [colors, setColors] = useState<ColorStop[]>([
    { color: "#ff9a9e", position: 0 },
    { color: "#fecfef", position: 50 },
    { color: "#a1c4fd", position: 100 },
  ]);
  
  // Customizer meta states
  const [selectedPreset, setSelectedPreset] = useState<string | null>("Sunset Silk");
  const [activeTab, setActiveTab] = useState<"presets" | "editor">("editor");
  const [toast, setToast] = useState<string | null>(null);
  
  // Export modal state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportPreset, setExportPreset] = useState(RESOLUTION_PRESETS[1]); // Default to Full HD
  const [customWidth, setCustomWidth] = useState<string>("1920");
  const [customHeight, setCustomHeight] = useState<string>("1080");

  // Load preset helper
  const handleLoadPreset = (preset: Preset) => {
    setGradientType(preset.type);
    setAngle(preset.angle);
    setNoiseOpacity(preset.noiseOpacity);
    setColors(preset.colors.map(c => ({ ...c })));
    setSelectedPreset(preset.name);
  };

  // Check if current settings match a preset
  useEffect(() => {
    const matchingPreset = PRESETS.find((preset) => {
      if (preset.type !== gradientType) return false;
      if (preset.type === "linear" && preset.angle !== angle) return false;
      if (preset.noiseOpacity !== noiseOpacity) return false;
      if (preset.colors.length !== colors.length) return false;
      return preset.colors.every((c, i) => c.color.toLowerCase() === colors[i].color.toLowerCase() && c.position === colors[i].position);
    });
    setSelectedPreset(matchingPreset ? matchingPreset.name : null);
  }, [gradientType, angle, noiseOpacity, colors]);

  // Update a single stop color
  const handleColorChange = (index: number, newColor: string) => {
    const updated = [...colors];
    updated[index].color = newColor;
    setColors(updated);
  };

  // Update a single stop position
  const handlePositionChange = (index: number, newPos: number) => {
    const updated = [...colors];
    updated[index].position = newPos;
    setColors(updated);
  };

  // Add stop
  const handleAddStop = () => {
    if (colors.length >= 5) return;
    
    // Insert new stop at midpoints
    const sorted = [...colors].sort((a, b) => a.position - b.position);
    let newPos = 50;
    
    // Find biggest gap
    let maxGap = 0;
    let gapIndex = 0;
    for (let i = 0; i < sorted.length - 1; i++) {
      const gap = sorted[i+1].position - sorted[i].position;
      if (gap > maxGap) {
        maxGap = gap;
        gapIndex = i;
      }
    }
    
    if (sorted.length > 0) {
      newPos = Math.round(sorted[gapIndex].position + maxGap / 2);
    }

    // Generate random color
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    const updated = [...colors, { color: randomColor, position: newPos }].sort((a, b) => a.position - b.position);
    setColors(updated);
  };

  // Remove stop
  const handleRemoveStop = (index: number) => {
    if (colors.length <= 2) return;
    const updated = colors.filter((_, i) => i !== index);
    setColors(updated);
  };

  // Randomize colors
  const handleRandomize = () => {
    const updated = colors.map((stop) => ({
      ...stop,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
    }));
    setColors(updated);
  };

  // CSS generator helper
  const getCSSCode = (customColors = colors, customType = gradientType, customAngle = angle) => {
    const stopsStr = customColors
      .map((c) => `${c.color} ${c.position}%`)
      .join(", ");
    
    if (customType === "linear") {
      return `background: linear-gradient(${customAngle}deg, ${stopsStr});`;
    } else {
      return `background: radial-gradient(circle at center, ${stopsStr});`;
    }
  };

  // Trigger Toast Notification
  const triggerToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  // Copy CSS to clipboard
  const handleCopyCSS = () => {
    const css = getCSSCode();
    navigator.clipboard.writeText(css);
    triggerToast("CSS copied to clipboard!");
  };

  // Copy specific preset CSS directly
  const handleCopyPresetCSS = (e: React.MouseEvent, preset: Preset) => {
    e.stopPropagation();
    const css = getCSSCode(preset.colors, preset.type, preset.angle);
    navigator.clipboard.writeText(css);
    triggerToast(`Copied ${preset.name} CSS!`);
  };

  // Render on main canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleRender = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width * dpr;
      const h = rect.height * dpr;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);

      // Create gradient stop mapping
      let grad;
      if (gradientType === "linear") {
        const angleRad = (angle * Math.PI) / 180;
        const length = Math.abs(w * Math.sin(angleRad)) + Math.abs(h * Math.cos(angleRad));
        const x1 = w / 2 - (length / 2) * Math.sin(angleRad);
        const y1 = h / 2 + (length / 2) * Math.cos(angleRad);
        const x2 = w / 2 + (length / 2) * Math.sin(angleRad);
        const y2 = h / 2 - (length / 2) * Math.cos(angleRad);
        grad = ctx.createLinearGradient(x1, y1, x2, y2);
      } else {
        const radius = Math.sqrt((w / 2) ** 2 + (h / 2) ** 2);
        grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, radius);
      }

      colors.forEach((stop) => {
        const pos = Math.max(0, Math.min(100, stop.position)) / 100;
        grad.addColorStop(pos, stop.color);
      });

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Render Noise Layer
      if (noiseOpacity > 0) {
        ctx.save();
        ctx.globalAlpha = noiseOpacity / 100;
        ctx.globalCompositeOperation = "overlay";

        const noiseSize = 128;
        const noiseCanvas = document.createElement("canvas");
        noiseCanvas.width = noiseSize;
        noiseCanvas.height = noiseSize;
        const nCtx = noiseCanvas.getContext("2d");
        if (nCtx) {
          const imgData = nCtx.createImageData(noiseSize, noiseSize);
          const data = imgData.data;
          for (let i = 0; i < data.length; i += 4) {
            const val = Math.floor(Math.random() * 255);
            data[i] = val;
            data[i + 1] = val;
            data[i + 2] = val;
            data[i + 3] = 255;
          }
          nCtx.putImageData(imgData, 0, 0);
          
          const pattern = ctx.createPattern(noiseCanvas, "repeat");
          if (pattern) {
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, w, h);
          }
        }
        ctx.restore();
      }
    };

    handleRender();

    const resizeObserver = new ResizeObserver(() => {
      handleRender();
    });
    
    resizeObserver.observe(canvas);
    return () => {
      resizeObserver.disconnect();
    };
  }, [colors, gradientType, angle, noiseOpacity]);

  // Handle image export
  const handleExportImage = () => {
    let width = exportPreset.width;
    let height = exportPreset.height;

    if (exportPreset.name === "Custom") {
      width = parseInt(customWidth) || 1920;
      height = parseInt(customHeight) || 1080;
    }

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = width;
    exportCanvas.height = height;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    // Draw gradient
    let grad;
    if (gradientType === "linear") {
      const angleRad = (angle * Math.PI) / 180;
      const length = Math.abs(width * Math.sin(angleRad)) + Math.abs(height * Math.cos(angleRad));
      const x1 = width / 2 - (length / 2) * Math.sin(angleRad);
      const y1 = height / 2 + (length / 2) * Math.cos(angleRad);
      const x2 = width / 2 + (length / 2) * Math.sin(angleRad);
      const y2 = height / 2 - (length / 2) * Math.cos(angleRad);
      grad = ctx.createLinearGradient(x1, y1, x2, y2);
    } else {
      const radius = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
      grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, radius);
    }

    colors.forEach((stop) => {
      grad.addColorStop(stop.position / 100, stop.color);
    });

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Overlay grain noise
    if (noiseOpacity > 0) {
      ctx.save();
      ctx.globalAlpha = noiseOpacity / 100;
      ctx.globalCompositeOperation = "overlay";

      const noiseSize = 128;
      const noiseCanvas = document.createElement("canvas");
      noiseCanvas.width = noiseSize;
      noiseCanvas.height = noiseSize;
      const nCtx = noiseCanvas.getContext("2d");
      if (nCtx) {
        const imgData = nCtx.createImageData(noiseSize, noiseSize);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.floor(Math.random() * 255);
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = 255;
        }
        nCtx.putImageData(imgData, 0, 0);
        
        const pattern = ctx.createPattern(noiseCanvas, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
        }
      }
      ctx.restore();
    }

    // Trigger download link
    const link = document.createElement("a");
    const prefixName = selectedPreset 
      ? selectedPreset.toLowerCase().replace(/\s+/g, "_") 
      : "gradient";
    const colorsSuffix = colors.map((c) => c.color.replace("#", "").toLowerCase()).join("_");
    
    link.download = `${prefixName}_${colorsSuffix}_${width}x${height}.jpg`;
    link.href = exportCanvas.toDataURL("image/jpeg", 0.95);
    link.click();
    
    setIsExportModalOpen(false);
    triggerToast("Export completed successfully!");
  };

  return (
    <div className="w-full relative">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-indigo-950/95 border border-indigo-500/30 text-indigo-200 px-5 py-3 rounded-full shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider">{toast}</span>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Live Canvas Preview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/40 p-4 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-indigo-500/20">
            {/* Aspect Ratio Box containing the Live Canvas */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full object-cover block"
              />
              
              {/* Overlay Preset Badges */}
              <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-2">
                <span className="bg-black/65 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/10">
                  {gradientType} {gradientType === "linear" && `${angle}°`}
                </span>
                {selectedPreset && (
                  <span className="bg-indigo-950/80 backdrop-blur-md text-indigo-300 text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-full border border-indigo-500/20 self-start">
                    ★ {selectedPreset}
                  </span>
                )}
              </div>

              {/* Noise Opacity Overlay Indicator */}
              {noiseOpacity > 0 && (
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-slate-300 text-[10px] uppercase font-semibold tracking-wider px-3 py-1 rounded-full border border-white/5 pointer-events-none">
                  Grain: {noiseOpacity}%
                </div>
              )}

              {/* Interactive Hover Actions */}
              <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleCopyCSS}
                  className="w-12 h-12 rounded-full"
                  title="Copy CSS Properties"
                >
                  <Copy className="w-5 h-5 text-white" />
                </Button>
                <Button 
                  variant="default" 
                  size="icon" 
                  onClick={() => setIsExportModalOpen(true)}
                  className="w-12 h-12 rounded-full"
                  title="Download High-Res"
                >
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick CSS Preview Component */}
          <div className="p-5 rounded-2xl border border-white/10 bg-neutral-950/60 backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex-1 font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-nowrap scrollbar-thin select-all py-1">
              <code>{getCSSCode()}</code>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopyCSS} 
              className="shrink-0 flex items-center gap-2 border-white/10 text-xs py-1.5 rounded-lg"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy CSS
            </Button>
          </div>

          {/* Large Action bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              onClick={handleRandomize} 
              className="flex-1 flex items-center justify-center gap-2 py-6 rounded-2xl font-semibold border-white/10 animate-all duration-200"
            >
              <RefreshCw className="w-4 h-4 text-indigo-400" />
              Randomize Colors
            </Button>
            <Button 
              variant="default" 
              onClick={() => setIsExportModalOpen(true)} 
              className="flex-1 flex items-center justify-center gap-2 py-6 rounded-2xl font-semibold shadow-lg shadow-indigo-600/30 animate-all duration-200"
            >
              <Download className="w-4 h-4" />
              Download High-Res JPG
            </Button>
          </div>
        </div>

        {/* Right Column: Customizer & Presets Tabs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Beautiful Glass tab Selector */}
          <div className="flex bg-neutral-900/60 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === "editor"
                  ? "bg-white/10 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Editor Controls
            </button>
            <button
              onClick={() => setActiveTab("presets")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === "presets"
                  ? "bg-white/10 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Curated Gallery
            </button>
          </div>

          {/* TAB 1: Editor Controls */}
          {activeTab === "editor" && (
            <div className="space-y-6 bg-neutral-900/30 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              
              {/* Gradient Settings Box */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-indigo-400">
                  Gradient Direction
                </h4>
                
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950/40 border border-white/5">
                  <div className="space-y-0.5">
                    <Label htmlFor="gradient-type" className="text-slate-200 font-semibold text-sm">
                      Radial Pattern
                    </Label>
                    <p className="text-[11px] text-slate-400 font-light">Toggle between radial and linear directions</p>
                  </div>
                  <Switch
                    id="gradient-type"
                    checked={gradientType === "radial"}
                    onCheckedChange={(checked) => setGradientType(checked ? "radial" : "linear")}
                  />
                </div>

                {gradientType === "linear" && (
                  <div className="space-y-3 p-4 rounded-xl bg-neutral-950/40 border border-white/5 animate-in fade-in duration-200">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="angle-slider" className="text-slate-200 text-xs font-bold">
                        Angle ({angle}°)
                      </Label>
                      <span className="text-[10px] text-slate-400 font-mono">-360° to 360°</span>
                    </div>
                    <Slider
                      id="angle-slider"
                      min={-360}
                      max={360}
                      value={[angle]}
                      onValueChange={(val) => setAngle(val[0])}
                    />
                  </div>
                )}
              </div>

              {/* Color Stops Controls */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-indigo-400">
                    Color Stops ({colors.length}/5)
                  </h4>
                  {colors.length < 5 && (
                    <button 
                      onClick={handleAddStop}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Stop
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {colors.map((stop, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950/40 border border-white/5 transition-all hover:border-white/10"
                    >
                      {/* Premium Color Picker container */}
                      <div className="relative w-9 h-9 rounded-full border border-white/20 overflow-hidden cursor-pointer shadow-inner shrink-0">
                        <input
                          type="color"
                          value={stop.color}
                          onChange={(e) => handleColorChange(index, e.target.value)}
                          className="absolute inset-[-6px] w-[calc(100%+12px)] h-[calc(100%+12px)] cursor-pointer"
                        />
                      </div>

                      {/* Color Hex Input code */}
                      <div className="w-20 shrink-0">
                        <Input
                          type="text"
                          value={stop.color.toUpperCase()}
                          onChange={(e) => handleColorChange(index, e.target.value)}
                          maxLength={7}
                          className="h-8 px-2 text-xs font-mono border-white/5 bg-neutral-900/60"
                        />
                      </div>

                      {/* Position slider */}
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-[9px] text-slate-400">
                          <span>Stop {index + 1}</span>
                          <span>{stop.position}%</span>
                        </div>
                        <Slider
                          min={0}
                          max={100}
                          value={[stop.position]}
                          onValueChange={(val) => handlePositionChange(index, val[0])}
                          className="py-1"
                        />
                      </div>

                      {/* Remove stop button */}
                      {colors.length > 2 && (
                        <button
                          onClick={() => handleRemoveStop(index)}
                          className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-500/10 shrink-0 cursor-pointer"
                          title="Delete Stop"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Noise Grain Engine settings */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-indigo-400">
                  Grain Noise Overlay
                </h4>
                
                <div className="space-y-3 p-4 rounded-xl bg-neutral-950/40 border border-white/5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="noise-slider" className="text-slate-200 text-xs font-bold">
                      Grain Opacity ({noiseOpacity}%)
                    </Label>
                    <span className="text-[10px] text-slate-400 font-mono">0% to 100%</span>
                  </div>
                  <Slider
                    id="noise-slider"
                    min={0}
                    max={100}
                    value={[noiseOpacity]}
                    onValueChange={(val) => setNoiseOpacity(val[0])}
                  />
                  <p className="text-[10px] text-slate-400 leading-relaxed font-light mt-1">
                    Adds premium noise micro-textures. Keep it around 5-15% for subtle styling, or turn up for raw grunge aesthetics.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Curated Presets Gallery */}
          {activeTab === "presets" && (
            <div className="grid grid-cols-2 gap-4 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin">
              {PRESETS.map((preset) => {
                // Generate simple CSS inline background preview string
                const previewStops = preset.colors.map(c => `${c.color} ${c.position}%`).join(", ");
                const bgStyle = preset.type === "linear" 
                  ? `linear-gradient(${preset.angle}deg, ${previewStops})`
                  : `radial-gradient(circle at center, ${previewStops})`;

                const isCurrent = selectedPreset === preset.name;

                return (
                  <div
                    key={preset.name}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleLoadPreset(preset)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleLoadPreset(preset);
                      }
                    }}
                    className={`relative p-3 rounded-2xl border text-left flex flex-col gap-3 group/card transition-all duration-300 select-none cursor-pointer hover:scale-[1.02] ${
                      isCurrent
                        ? "bg-indigo-950/20 border-indigo-500/50 shadow-md shadow-indigo-500/5"
                        : "bg-neutral-900/30 border-white/10 hover:border-white/20 hover:bg-neutral-900/50"
                    }`}
                  >
                    {/* Circle Gradient Preview */}
                    <div 
                      className="w-full aspect-[16/10] rounded-xl relative shadow-inner overflow-hidden border border-white/5 flex items-end justify-end p-2"
                      style={{ background: bgStyle }}
                    >
                      {/* Grain effect overlay in card */}
                      {preset.noiseOpacity > 0 && (
                        <div 
                          className="absolute inset-0 pointer-events-none opacity-20"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                          }}
                        />
                      )}
                      
                      {/* Quick copy CSS button in card */}
                      <button
                        onClick={(e) => handleCopyPresetCSS(e, preset)}
                        className="bg-black/60 hover:bg-black/80 text-white rounded-lg p-1.5 border border-white/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 shadow-md cursor-pointer"
                        title="Copy Preset CSS"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Meta info info card */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-xs font-bold truncate">
                          {preset.name}
                        </span>
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-indigo-400" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                        {preset.type} • {preset.colors.length} stops
                      </span>
                    </div>
                  </div>
                );
               })}
             </div>
           )}
 
         </div>
 
       </div>
 
       {/* Choose Export Size Modal */}
       {isExportModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-300">
           <div className="relative w-full max-w-md bg-neutral-950 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
             
             {/* Modal Header */}
             <div className="flex items-center justify-between border-b border-white/10 pb-4">
               <div className="space-y-1">
                 <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                   <Download className="w-5 h-5 text-indigo-400" /> Export Options
                 </h3>
                 <p className="text-xs text-slate-400 font-light">Select or input custom render parameters</p>
               </div>
               <button 
                 onClick={() => setIsExportModalOpen(false)} 
                 className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-xl cursor-pointer"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
 
             {/* Sizes Presets Grid */}
             <div className="grid grid-cols-2 gap-3">
               {RESOLUTION_PRESETS.map((preset) => {
                 const isSelected = exportPreset.name === preset.name;
                 return (
                   <button
                     key={preset.name}
                     onClick={() => setExportPreset(preset)}
                     className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all select-none cursor-pointer hover:border-indigo-500/30 ${
                       isSelected
                         ? "bg-indigo-950/20 border-indigo-500/50 text-indigo-300"
                         : "bg-neutral-900/40 border-white/5 text-slate-300 hover:bg-neutral-900/60"
                     }`}
                   >
                     <span className="text-xs font-bold text-white">{preset.name}</span>
                     <span className="text-[10px] text-slate-400 font-mono">
                       {preset.name === "Custom" ? "Input custom px" : `${preset.width} × ${preset.height} px`}
                     </span>
                   </button>
                 );
               })}
             </div>

            {/* Custom Width/Height Dimensions Inputs */}
            {exportPreset.name === "Custom" && (
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-900/40 border border-white/5 animate-in slide-in-from-top-3 duration-250">
                <div className="space-y-1.5">
                  <Label htmlFor="custom-width" className="text-[11px] text-slate-400 uppercase font-bold">
                    Width (px)
                  </Label>
                  <Input
                    id="custom-width"
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    placeholder="1920"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="custom-height" className="text-[11px] text-slate-400 uppercase font-bold">
                    Height (px)
                  </Label>
                  <Input
                    id="custom-height"
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    placeholder="1080"
                    className="h-9 text-xs"
                  />
                </div>
              </div>
            )}

            {/* Export File Name Hint */}
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-[10px] text-slate-400 font-light flex flex-col gap-1">
              <span className="font-bold text-white">Naming Pattern:</span>
              <code className="font-mono text-indigo-300/80 leading-normal truncate">
                {selectedPreset 
                  ? `${selectedPreset.toLowerCase().replace(/\s+/g, "_")}_${colors.map((c) => c.color.replace("#", "").toLowerCase()).join("_")}_${exportPreset.name === "Custom" ? customWidth : exportPreset.width}x${exportPreset.name === "Custom" ? customHeight : exportPreset.height}.jpg`
                  : `gradient_${colors.map((c) => c.color.replace("#", "").toLowerCase()).join("_")}_${exportPreset.name === "Custom" ? customWidth : exportPreset.width}x${exportPreset.name === "Custom" ? customHeight : exportPreset.height}.jpg`
                }
              </code>
            </div>

            {/* Final Render/Export Action buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsExportModalOpen(false)}
                className="flex-1 py-5 text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button 
                variant="default" 
                onClick={handleExportImage}
                className="flex-1 py-5 text-xs rounded-xl shadow-md shadow-indigo-600/30"
              >
                Render & Export
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
