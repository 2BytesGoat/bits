import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    target: "es2022",
    loader: { ".css": "text" },
    external: ["preact", "@quartz-community/types"],
  },
  {
    entry: ["src/components/index.ts"],
    outDir: "dist/components",
    format: ["esm"],
    sourcemap: true,
    target: "es2022",
    loader: { ".css": "text", ".txt": "text" },
    external: ["preact", "@quartz-community/types"],
  },
])