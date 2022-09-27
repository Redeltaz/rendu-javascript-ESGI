import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
    root: resolve("src"),
    server: {
        port: 8000,
        host: "0.0.0.0"
    }
})