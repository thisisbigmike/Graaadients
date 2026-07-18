import Image from "next/image";
import Link from "next/link";
import { GradientGenerator } from "@/components/ui/graaadeints";

import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default function Gradients() {
  return (
    <div className="relative min-h-screen bg-[#07070a] text-slate-100 selection:bg-indigo-500 selection:text-white overflow-x-hidden pb-24">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="pt-24 pb-12 flex flex-col items-center justify-center text-center space-y-6">
          <p className="text-xs md:text-sm font-extrabold uppercase tracking-[0.25em] text-indigo-400">
            Introducing
          </p>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white select-none filter drop-shadow-sm bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent">
            Graaadients
          </h1>

          <p className="max-w-2xl text-slate-400 text-sm md:text-lg font-light leading-relaxed">
            +5000 abstract gradient elements and backgrounds for your amazing design projects. Fully customizable, interactive, and free.
          </p>

          {/* Breadcrumb Navigation */}
          <div className="pt-4">
            <Breadcrumb>
              <BreadcrumbList className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                    Graaadients
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Core Generator Component */}
        <div className="mt-8">
          <GradientGenerator />
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center space-y-2">
          <p className="text-slate-400 font-semibold text-sm">
            All gradients are 100% free.
          </p>
          <p className="text-xs text-slate-500">
            Adjust color stops, angle, noise, and download custom visual assets.
          </p>
        </div>
      </div>
    </div>
  );
}

export { Gradients };
