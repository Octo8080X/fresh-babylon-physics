import IconBrandGithub from "tabler_icons_tsx/tsx/brand-github.tsx";

export default function Links() {
  return (
    <>
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
    </>
  );
}
