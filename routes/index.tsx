import BabylonSimulation01 from "../islands/BabylonSimulation01.tsx";
import Links from "../components/Links.tsx";
export default function Home() {
  return (
    <div class="px-4 py-4 mx-auto bg-[#EFEFFF] min-h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold p-2">
          Babylon.js Physics simulation by 'Havok' on Fresh!
        </h1>
        <BabylonSimulation01 />
        <div class="max-w-screen-md mt-1 px-3 flex flex-col items-center justify-center text-center bg-white">
          <Links />
        </div>
      </div>
    </div>
  );
}
