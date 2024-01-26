/// <reference lib="dom" />
import type { Signal } from "@preact/signals";
import Chart, { ChartConfiguration } from "npm:chart.js/auto";
import { useEffect, useState } from "preact/hooks";
import { SimulateResult, SimulateResultLog } from "../routes/api/sim.ts";
import { tailwind } from "$fresh/plugins/tailwind.ts";

function getGraphData(src: SimulateResult): ChartConfiguration {
  const point = [];
  for (let i = 0; i < src.log.length; i++) {
    point.push(i);
  }
  const dataX = src.log.map((d: SimulateResultLog) => d.ball.position.x);
  const dataY = src.log.map((d: SimulateResultLog) => d.ball.position.y);
  const dataZ = src.log.map((d: SimulateResultLog) => d.ball.position.z);

  return {
    type: "line",
    data: {
      labels: point,
      datasets: [{
        label: "X axis",
        data: dataX,
        borderWidth: 1,
      }, {
        label: "Y axis",
        data: dataY,
        borderWidth: 1,
      }, {
        label: "Z axis",
        data: dataZ,
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
}

function createChart(
  parent: HTMLElement,
  data: ChartConfiguration,
): HTMLCanvasElement {
  const rowCanvas = document.createElement("canvas");
  rowCanvas.style.width = "400px";
  rowCanvas.style.height = "400px";
  document.getElementById("chartMount")?.appendChild(rowCanvas);

  new Chart(rowCanvas, data);
  return rowCanvas;
}
function destroyChart(parent: HTMLElement, target: HTMLCanvasElement): void {
  parent.removeChild(target);
}

export default function BabylonSimulationControl() {
  const [valueX, setValueX] = useState(-0.5);
  const [valueZ, setValueZ] = useState(-0.5);
  const [canvas, setCanvas] = useState(null);
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const call = async () => {
      const res = await fetch(`/api/sim?x=${valueX}&z=${valueZ}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json() as SimulateResult;

      setCanvas(
        createChart(
          document.getElementById("chartMount") as HTMLElement,
          getGraphData(data),
        ),
      );
      setResource(window.startBabylon(data));
    };
    call();
  }, []);

  const onSubmit = async (e: Event) => {
    e.preventDefault();

    resource.deleteView();
    destroyChart(document.getElementById("chartMount")!, canvas);

    const res = await fetch(`/api/sim?x=${valueX}&z=${valueZ}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setCanvas(
      createChart(
        document.getElementById("chartMount") as HTMLElement,
        getGraphData(data),
      ),
    );
    setResource(window.startBabylon(data));
  };
  return (
    <div class="py-4">
      <div>
        <p class="font-medium text-gray-900 dark:text-white">
          Ball drop coordinate
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div class="sm:flex">
          <div class="mb-2 mr-3 flex">
            <label
              for="x-axis"
              class="w-20 block mt-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              X axis
            </label>
            <input
              type="number"
              name="x-axis"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={valueX}
              onChange={(e) => setValueX(Number(e.target.value))}
              min="-5"
              max="5"
              step="0.1"
            />
          </div>
          <div class="mb-2 mr-3 flex">
            <label
              for="z-axis"
              class="w-20 block mt-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              Z axis
            </label>
            <input
              type="number"
              name="z-axis"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={valueZ}
              onChange={(e) => setValueZ(Number(e.target.value))}
              min="-5"
              max="5"
              step="0.1"
            />
          </div>
          <div class="mb-2 mr-3">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-max"
            >
              Update param!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
