import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { BabylonPlugin } from "./plugins/babylon_plugin.ts";

export default defineConfig({
  plugins: [tailwind(), BabylonPlugin()],
});
