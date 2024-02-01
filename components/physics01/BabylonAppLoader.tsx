import { useEffect, useRef, useState } from "preact/hooks";
import { SimulateResult, SimulateResultLog } from "../../routes/api/sim.ts";
import { startBabylon } from "./BabylonApp.ts";

interface BabylonAppLoaderProps {
  data: SimulateResult;
}

export default function BabylonAppLoader(props: BabylonAppLoaderProps) {
  const canvasRef = useRef(null);
  const [babylonApp, setBabylonApp] = useState(null);

  useEffect(() => {
    console.log("BabylonAppLoader useEffect");
    const canvasElement = canvasRef.current;

    if (babylonApp) {
      console.log("BabylonAppLoader useEffect deleteView");
      babylonApp.deleteView();
      setBabylonApp(startBabylon(canvasElement, props.data));
    }
    console.log(babylonApp);
    if (!babylonApp && props.data.log && props.data.log.length > 0) {
      console.log("BabylonAppLoader useEffect startBabylon");
      setBabylonApp(startBabylon(canvasElement, props.data));
    }
  }, [props.data.log]);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
}
