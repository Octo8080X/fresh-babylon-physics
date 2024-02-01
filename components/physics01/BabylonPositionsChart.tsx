import { useEffect, useRef, useState } from "preact/hooks";
import { Chart, ChartConfiguration } from "npm:chart.js/auto";
import { SimulateResult, SimulateResultLog } from "../../routes/api/sim.ts";

function calcGraphData(src: SimulateResult): ChartConfiguration {
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

interface ChartProps {
  data: SimulateResult;
}

export default function BabylonPositionsChart(props: ChartProps) {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    console.log("BabylonPositionsChart useEffect");
    if (!chart && props.data.log && props.data.log.length > 0) {
      const tmp = calcGraphData(props.data);
      const ctx = chartRef.current.getContext("2d");
      const canvasElement = chartRef.current;
      canvasElement.style.width = "400px";
      canvasElement.style.height = "400px";

      setChart(() => ({ chart: new Chart(ctx, tmp) }));
    }
    if (chart) {
      const tmp = calcGraphData(props.data);
      chart.chart.data = tmp.data;
      chart.chart.options = tmp.options;
      chart.chart.update();
    }
  }, [props.data.log]);

  return (
    <>
      <canvas ref={chartRef} />
    </>
  );
}
