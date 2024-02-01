import { useEffect, useState } from "preact/hooks";
import { SimulateResult } from "../routes/api/sim.ts";
import BabylonPositionsChart from "../components/physics01/BabylonPositionsChart.tsx";
import BabylonAppLoader from "../components/physics01/BabylonAppLoader.tsx";
import BabylonAppForm from "../components/physics01/BabylonAppForm.tsx";

async function getSimulateData(x: number, z: number): Promise<SimulateResult> {
  const res = await fetch(`/api/sim?x=${x}&z=${z}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json() as SimulateResult;
}

export default function BabylonSimulation01() {
  const [valueX, setValueX] = useState(-0.5);
  const [valueZ, setValueZ] = useState(-0.5);
  const [simulateData, setSimulateData] = useState({});

  useEffect(() => {
    const call = async () => {
      const data = await getSimulateData(valueX, valueZ);
      setSimulateData(data);
    };
    call();
  }, []);

  const onSubmit = (e: Event) => {
    e.preventDefault();
    const call = async () => {
      const data = await getSimulateData(valueX, valueZ);
      setSimulateData(data);
    };
    call();
  };

  return (
    <>
      <div class="py-4">
        <div>
          <p class="font-medium text-gray-900 dark:text-white">
            Ball drop coordinate
          </p>
        </div>
        <div>
          <BabylonAppForm
            onSubmit={onSubmit}
            valueX={valueX}
            setValueX={setValueX}
            valueZ={valueZ}
            setValueZ={setValueZ}
          />
        </div>
      </div>
      <div class="md:flex">
        <div class="w-1/2 min-h-[400px] min-w-[400px] bg-white p-1">
          <BabylonAppLoader data={simulateData} />
        </div>
        <div class="w-1/2 min-h-[400px] min-w-[400px] bg-white p-1">
          <BabylonPositionsChart data={simulateData} />
        </div>
      </div>
    </>
  );
}
