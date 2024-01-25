import { Plugin } from "$fresh/server.ts";

export function BabylonPlugin(): Plugin {
  return {
    name: "babylon-plugin",
    entrypoints: {
      babylon_app: import.meta.resolve(`./babylon_app.ts`),
    },
    render(ctx) {
      ctx.render();
      return {
        scripts: [
          {
            entrypoint: "babylon_app",
            state: {},
          },
        ],
      };
    },
  };
}
