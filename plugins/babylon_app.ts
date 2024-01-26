import * as BABYLON from "npm:@babylonjs/core/index.js";
import type {
  SimulateResult,
  SimulateResultObjectBox,
  SimulateResultObjectGround,
  SimulateResultObjectsKeys,
  SimulateResultObjectSphere,
} from "../routes/api/sim.ts";

function startBabylon(data: SimulateResult) {
  const canvas = document.createElement("canvas");
  canvas.id = `renderCanvas${(new Date()).getTime()}`;
  canvas.style.width = "400px";
  canvas.style.height = "400px";
  document.body.appendChild(canvas);

  document.getElementById("babylonMount")!.appendChild(canvas);

  const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });

  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    (Math.PI * 60) / 180,
    (Math.PI * 120) / 180,
    -30,
    BABYLON.Vector3.Zero(),
    scene,
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);

  new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 100, 0),
    scene,
  );

  const objects: { [key in SimulateResultObjectsKeys]: BABYLON.Mesh | null } = {
    ball: null,
    box: null,
    ground: null,
  };
  const objectKeys = Object.keys(data.objects) as Array<
    SimulateResultObjectsKeys
  >;

  function isBoxType(src: unknown): src is SimulateResultObjectBox {
    if (!src) {
      return false;
    }
    if (typeof src !== "object") {
      return false;
    }
    if (!("type" in src)) {
      return false;
    }
    return src.type === "box";
  }
  function isSphereType(src: unknown): src is SimulateResultObjectSphere {
    if (!src) {
      return false;
    }
    if (typeof src !== "object") {
      return false;
    }
    if (!("type" in src)) {
      return false;
    }
    return src.type === "sphere";
  }
  function isGroundType(src: unknown): src is SimulateResultObjectGround {
    if (!src) {
      return false;
    }
    if (typeof src !== "object") {
      return false;
    }
    if (!("type" in src)) {
      return false;
    }
    return src.type === "ground";
  }

  objectKeys.forEach((key) => {
    const object = data.objects[key];

    if (isBoxType(object)) {
      objects[key] = BABYLON.MeshBuilder.CreateBox(
        key,
        object.params,
        scene,
      );
    } else if (isSphereType(object)) {
      objects[key] = BABYLON.MeshBuilder.CreateSphere(
        key,
        object.params,
        scene,
      );
    } else if (isGroundType(object)) {
      objects[key] = BABYLON.MeshBuilder.CreateGround(
        key,
        object.params,
        scene,
      );
    }
  });

  let i = 0;
  engine.runRenderLoop(function () {
    if (i >= data.log.length) {
      i = 0;
    }
    objectKeys.forEach((key) => {
      if (!objects[key] || objects[key] === null) {
        return;
      }
      objects[key]!.position.x = data.log[i][key].position.x;
      objects[key]!.position.y = data.log[i][key].position.y;
      objects[key]!.position.z = data.log[i][key].position.z;
      objects[key]!.rotation.x = data.log[i][key].rotation.x;
      objects[key]!.rotation.y = data.log[i][key].rotation.y;
      objects[key]!.rotation.z = data.log[i][key].rotation.z;
    });

    i++;
    scene.render();
  });

  const deleteView = () => {
    engine.stopRenderLoop();
    engine.dispose();
    engine.views = [];
    document.getElementById("babylonMount")!.removeChild(canvas);
  };

  return { deleteView };
}

declare global {
  interface Window {
    startBabylon: typeof startBabylon;
  }
}

export default function babylonApp() {
  window.startBabylon = startBabylon;
}
