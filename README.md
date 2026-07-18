# Graaadients | Premium Abstract Gradient Generator

**Graaadients** is a state-of-the-art web application designed for creators, designer teams, and web developers to create, customize, copy, and export beautiful abstract background gradients with interactive canvas grain noise.

Developed using Next.js, React 19, TypeScript, and Tailwind CSS v4.

---

## 🚀 Key Features

*   **Curated Presets Gallery**: Contains 12 beautifully selected presets (e.g. *Sunset Silk*, *Neon Cyber*, *Aurora Sky*, *Deep Ocean*).
*   **Instant CSS Export**: Copy optimized CSS properties directly from preset cards or the main customizer with clean visual toast animations.
*   **Interactive Customizer Canvas**:
    *   **Color Stops Control**: Add/remove up to 5 custom gradient stops, edit positions, and customize color codes using the native color pickers.
    *   **Full Angle Range**: Rotate linear gradients with an expanded range supporting negative angles from **`-360°` to `360°`**.
    *   **Radial Support**: Toggle between Linear and Radial gradient patterns instantly.
*   **Grain Noise Engine**: Customize and overlay realistic grain noise onto the gradient using custom canvas pixel mapping.
*   **Choose Export Size Modal**: Download high-resolution JPG files at exact resolutions:
    *   **Default Square** (1000 × 1000 px)
    *   **Full HD** (1920 × 1080 px)
    *   **4K Ultra HD** (3840 × 2160 px)
    *   **Phone Wallpaper** (1080 × 1920 px)
    *   **Twitter Banner** (1500 × 500 px)
    *   **Custom Dimensions** (any user-input Width × Height)
*   **Color-Aware File Naming**: Generated images are automatically named using their gradient settings and color hex values (e.g., `sunset_silk_ff9a9e_fecfef_a1c4fd_1920x1080.jpg` or `gradient_ff0000_ffffff_0000ff_1080x1920.jpg`).

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js (App Router)](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons**: `dicons` (Designali Icon Library)
*   **Graphics & Rendering**: HTML5 Canvas API

---

## 📦 Getting Started

### 1. Install Dependencies

Clone or open the directory and run:

```bash
npm install
```

### 2. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to run the app.

### 3. Build for Production

Compile typescript checking and construct optimized production assets:

```bash
npm run build
```

---

## 📁 File Structure

```text
src/
├── app/
│   ├── globals.css      # Core styles & custom scrollbar
│   ├── layout.tsx       # Next.js HTML layout with SEO metadata
│   └── page.tsx         # Premium Hero introductory structure
├── components/
│   └── ui/
│       ├── button.tsx       # Custom premium variants (glassmorphism hover states)
│       ├── input.tsx        # Translucent styled color stop positioning inputs
│       ├── label.tsx        # Styled form label elements
│       ├── slider.tsx       # Dynamic input range slider mimicking Radix API
│       ├── switch.tsx       # Radial/Linear/Noise toggle switch components
│       ├── breadcrumb.tsx   # Simplified title layout badge component
│       └── graaadeints.tsx  # Core gradient canvas, editor & modal logic
└── lib/
    └── utils.ts         # Utility merger (clsx + tailwind-merge)
```
# Graaadients
