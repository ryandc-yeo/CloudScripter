import { defineConfig } from "vite";
import commonjs from "@rollup/plugin-commonjs";
import react from "@vitejs/plugin-react-swc";

export const updateCommonjsPlugin = () => {
  const commonJs22 = commonjs({
    include: [/node_modules/],
    extensions: [".js", ".cjs"],
    strictRequires: true,
  });

  return {
    name: "new-common-js",
    options(rawOptions) {
      const plugins = Array.isArray(rawOptions.plugins)
        ? [...rawOptions.plugins]
        : rawOptions.plugins
          ? [rawOptions.plugins]
          : [];

      const index = plugins.findIndex(
        (plugin) => plugin && plugin.name === "commonjs",
      );
      if (index !== -1) {
        plugins.splice(index, 1, commonJs22);
      }

      const nextConfig = { ...rawOptions, plugins };
      return commonJs22.options.call(this, nextConfig);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  optimizeDeps: {
    include: ["linked-dep"],
  },
  build: {
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  plugins: [react(), updateCommonjsPlugin()],
  define: {
    global: {},
  },
});
