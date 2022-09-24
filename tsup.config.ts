import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/react.ts"],
  format: ["esm"],
  shims: false,
  dts: true,
  bundle: true,
  minify: true,
  clean: true,
  splitting: false,
  env: {
    NODE_ENV: process.env.NODE_ENV || "production",
  },
})
