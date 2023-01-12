import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: resolve("src"),
    server: {
        port: 8000,
        host: "0.0.0.0",
    },
    build: {
        outDir: resolve("dist"),
        rollupOptions: {
            input: {
                index: resolve(__dirname, "src/index.html"),
                settings: resolve(__dirname, "src/settings.html"),
                calculator: resolve(__dirname, "src/calculator.html"),
                clock: resolve(__dirname, "src/clock.html"),
            },
        },
    },
});
