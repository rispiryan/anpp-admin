import tsconfigPaths from "vite-tsconfig-paths";
import { checker } from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "REACT_APP_");

export default {
  plugins: [
    react(),
    checker({
      eslint:
        process.env.NODE_ENV === "development" && !env.REACT_APP_SKIP_ESLINT
          ? {
              lintCommand: "eslint ./src --ext .ts,.tsx",
              dev: { logLevel: ["error"] },
            }
          : undefined,
      typescript: true,
    }),
    svgr(),
    tsconfigPaths(),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    ...Object.keys(env).reduce((mappedEnv, envKey) => {
      // @ts-ignore
      mappedEnv[`process.env.${envKey}`] = JSON.stringify(env[envKey]);

      return mappedEnv;
    }, {}),
  },
  css: {
    modules: {
      generateScopedName: "[name]_[local]_[hash:base64:5]",
      localsConvention: "camelCaseOnly",
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : undefined,
    target: "esnext",
  },
  resolve: {
    alias: {
      "@modules": "/src/modules",
    },
  },
  build: {
    sourcemap: "hidden",
    outDir: "build",
  },
  server: {
    port: 3000,
  },
};
