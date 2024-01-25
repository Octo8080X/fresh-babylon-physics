import { useSignal } from "@preact/signals";
import BabylonSimulationControl from "../islands/BabylonSimulationControl.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">
          Babylon.js Physics simulation by 'Havok'.
        </h1>
        <BabylonSimulationControl count={count} />
        <div id="babylonMount" width="400" height="400"></div>
        <div id="chartMount" width="600" height="300"></div>
      </div>
    </div>
  );
}
//<canvas id="renderCanvas" width="400" height="400"></canvas>
