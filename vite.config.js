import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default function myDefineConfig({ command, mode }) {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      postcss: "./postcss.config.js",
    },
  }
}
