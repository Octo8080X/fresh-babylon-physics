import { useSignal } from "@preact/signals";
import BabylonSimulationControl from "../islands/BabylonSimulationControl.tsx";
import IconBrandGithub from "tabler_icons_tsx/tsx/brand-github.tsx";

export default function Home() {
  return (
    <div class="px-4 py-4 mx-auto bg-[#EFEFFF] min-h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold p-2">
          Babylon.js Physics simulation by 'Havok' on Fresh!
        </h1>
        <BabylonSimulationControl />
        <div class="md:flex">
          <div
            id="babylonMount"
            class="w-1/2 min-h-[400px] min-w-[400px] bg-white p-1"
          >
          </div>
          <div
            id="chartMount"
            class="w-1/2 min-h-[400px] min-w-[400px] bg-white p-1"
          >
          </div>
        </div>
        <div class="max-w-screen-md mt-1 px-3 flex flex-col items-center justify-center text-center bg-white">
          <h3 class="text-xl font-bold p-2">
            Links
          </h3>
          <ol>
            <li class="mb-2">
              <a
                href="https://github.com/Octo8080X/fresh-babylon-physics"
                class="text-blue-500 hover:text-gray-600 dark:text-blue-400 dark:hover:text-gray-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="flex">
                  <IconBrandGithub class="w-6 h-6" />
                  <p>Octo8080X/fresh-babylon-physics</p>
                </div>
              </a>
            </li>
            <li class="mb-2">
              <a
                href="https://fresh.deno.dev/"
                class="text-blue-500 hover:text-gray-600 dark:text-blue-400 dark:hover:text-gray-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="flex">
                  <img src="/logo.svg" class="w-6 h-6" alt="Babylon.js" />
                  <p>Fresh</p>
                </div>
              </a>
            </li>
            <li class="mb-2">
              <a
                href="https://www.babylonjs.com/"
                class="text-blue-500 hover:text-gray-600 dark:text-blue-400 dark:hover:text-gray-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="flex">
                  <img
                    src="/babylon-js-seeklogo.svg"
                    class="w-6 h-6"
                    alt="Babylon.js"
                  />
                  <p>Babylon.js</p>
                </div>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
