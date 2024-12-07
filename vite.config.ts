import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".mp3") || assetInfo.name?.endsWith(".wav")) {
            return "assets/sounds/[name].[ext]";
          }
          return "assets/[name].[ext]";
        },
      },
    },
  },
});
