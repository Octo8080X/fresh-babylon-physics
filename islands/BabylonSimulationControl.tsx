/// <reference lib="dom" />
import type { Signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Chart from "npm:chart.js/auto";
import { useEffect, useState } from "preact/hooks";
import { raw } from "https://deno.land/x/hono@v4.0.0-rc.2/helper/html/index.ts";

interface CounterProps {
  count: Signal<number>;
}

function getGraphData(src: any) {
  const point = [];
  for (let i = 0; i < src.log.length; i++) {
    point.push(i);
  }
  const dataX = src.log.map((d: any) => d.ball.position.x);
  const dataY = src.log.map((d: any) => d.ball.position.y);
  const dataZ = src.log.map((d: any) => d.ball.position.z);

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

export default function BabylonSimulationControl(props: CounterProps) {
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
      const data = await res.json();
      const point = [];
      for (let i = 0; i < data.log.length; i++) {
        point.push(i);
      }
      const rowCanvas = document.createElement("canvas");
      rowCanvas.style.width = "600px";
      rowCanvas.style.height = "400px";
      setCanvas(rowCanvas);
      document.getElementById("chartMount")?.appendChild(rowCanvas);

      new Chart(rowCanvas, getGraphData(data));
      const rowResource = window.startBabylon(data);
      setResource(rowResource);
    };
    call();
  }, []);

  const onSubmit = async (e: Event) => {
    console.log("onSubmit");
    e.preventDefault();
    console.log(resource);
    resource.deleteView();
    const res = await fetch(`/api/sim?x=${valueX}&z=${valueZ}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    document.getElementById("chartMount")?.removeChild(canvas);
    const rowCanvas = document.createElement("canvas");
    rowCanvas.style.width = "600px";
    rowCanvas.style.height = "400px";
    setCanvas(rowCanvas);
    document.getElementById("chartMount")?.appendChild(rowCanvas);
    new Chart(rowCanvas, getGraphData(data));

    const rowResource = window.startBabylon(data);
    setResource(rowResource);
  };
  return (
    <div class="flex gap-8 py-6">
      <form onSubmit={onSubmit}>
        <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">X axis</label>
          <input
            type="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={valueX}
            onChange={(e) => setValueX(Number(e.target.value))}
            min="-5"
            max="5"
            step="0.1"
          />
        </div>
        <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Z axis</label>
          <input
            type="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={valueZ}
            onChange={(e) => setValueZ(Number(e.target.value))}
            min="-5"
            max="5"
            step="0.1"
          />
        </div>
        <div class="mb-5">
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
    </div>
  );
}
