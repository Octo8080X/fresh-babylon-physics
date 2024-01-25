import * as BABYLON from "npm:@babylonjs/core/index.js";

function startBabylon(data: { log: any[]; objects: any[] }) {
  console.log("Hello from babylon_app.ts");

  //const canvas = document.getElementById("renderCanvas");
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

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 100, 0),
    scene,
  );

  const objects = {};
  const objectKeys = Object.keys(data.objects);
  objectKeys.forEach((key: string) => {
    console.log(data.objects[key]);
    if (data.objects[key].type === "box") {
      objects[key] = BABYLON.MeshBuilder.CreateBox(
        key,
        data.objects[key].params,
        scene,
      );
    } else if (data.objects[key].type === "sphere") {
      objects[key] = BABYLON.MeshBuilder.CreateSphere(
        key,
        data.objects[key].params,
        scene,
      );
    } else if (data.objects[key].type === "ground") {
      objects[key] = BABYLON.MeshBuilder.CreateGround(
        key,
        data.objects[key].params,
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
      objects[key].position.x = data.log[i][key].position.x;
      objects[key].position.y = data.log[i][key].position.y;
      objects[key].position.z = data.log[i][key].position.z;
      objects[key].rotation.x = data.log[i][key].rotation.x;
      objects[key].rotation.y = data.log[i][key].rotation.y;
      objects[key].rotation.z = data.log[i][key].rotation.z;
    });

    i++;
    scene.render();
  });

  const deleteView = () => {
    console.log("Unregistering view");
    engine.stopRenderLoop();
    engine.dispose();
    engine.views = [];
    console.log(document.getElementById("babylonMount")?.ATTRIBUTE_NODE);
    document.getElementById("babylonMount")!.removeChild(canvas);
  };

  return { deleteView };
}

export default function babylonApp() {
  window.startBabylon = startBabylon;
}
