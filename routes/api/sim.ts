import { FreshContext } from "$fresh/server.ts";
import { NullEngine } from "npm:@babylonjs/core/Engines/index.js";
import * as BABYLON from "npm:@babylonjs/core/index.js";
import HavokPhysics from "npm:@babylonjs/havok";

const havok = await HavokPhysics(false);
const engine = new NullEngine();

interface SimulateResultLogState {
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
}
export type SimulateResultObjectsKeys = "ball" | "box" | "ground";

export type SimulateResultLog = {
  [key in SimulateResultObjectsKeys]: SimulateResultLogState;
};
export type SimulateResultLogs = SimulateResultLog[];

export interface SimulateResultObjectSphere {
  type: "sphere";
  params: { diameter: number };
}

export interface SimulateResultObjectBox {
  type: "box";
  params: { height: number; width: number; depth: number };
}
export interface SimulateResultObjectGround {
  type: "ground";
  params: { width: number; height: number };
}

type SimulateResultObject =
  | SimulateResultObjectSphere
  | SimulateResultObjectBox
  | SimulateResultObjectGround;

export type SimulateResultObjects = {
  [key in SimulateResultObjectsKeys]: SimulateResultObject;
};

export interface SimulateResult {
  log: SimulateResultLogs;
  objects: SimulateResultObjects;
}

function simulate(x: number, z: number) {
  const scene = new BABYLON.Scene(engine);
  const plugin = new BABYLON.HavokPlugin(false, havok);

  scene.enablePhysics(
    new BABYLON.Vector3(0, -9.8, 0),
    plugin,
  );

  new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0.8,
    100,
    BABYLON.Vector3.Zero(),
    scene,
  );

  const ground = BABYLON.MeshBuilder.CreateGround(
    "Ground",
    { width: 10, height: 10 },
    scene,
  );

  new BABYLON.PhysicsAggregate(
    ground,
    BABYLON.PhysicsShapeType.BOX,
    { mass: 0, friction: 10 },
    scene,
  );

  const ballMesh = BABYLON.MeshBuilder.CreateSphere(
    "ball",
    { diameter: 1.0 },
    scene,
  );

  ballMesh.position = new BABYLON.Vector3(x, 10, z);

  new BABYLON.PhysicsAggregate(
    ballMesh,
    BABYLON.PhysicsShapeType.SPHERE,
    { mass: 1, friction: 0.1 },
    scene,
  );

  const boxMesh = BABYLON.MeshBuilder.CreateBox(
    `box`,
    { height: 1, width: 1, depth: 1 },
    scene,
  );

  boxMesh.position = new BABYLON.Vector3(0, 0.5, 0);

  new BABYLON.PhysicsAggregate(
    boxMesh,
    BABYLON.PhysicsShapeType.BOX,
    { mass: 1, friction: 0.1 },
    scene,
  );

  const log = [];

  const objects = {
    ball: {
      type: "sphere",
      params: { diameter: 1.0 },
    },
    box: {
      type: "box",
      params: { height: 1, width: 1, depth: 1 },
    },
    ground: {
      type: "ground",
      params: { width: 10, height: 10 },
    },
  };

  for (let i = 0; i < 300; i++) {
    scene.getPhysicsEngine()?.setTimeStep(1);

    const logData = {
      ball: {
        position: {
          x: ballMesh.position.x,
          y: ballMesh.position.y,
          z: ballMesh.position.z,
        },
        rotation: {
          x: ballMesh.rotation.x,
          y: ballMesh.rotation.y,
          z: ballMesh.rotation.z,
        },
      },
      box: {
        position: {
          x: boxMesh.position.x,
          y: boxMesh.position.y,
          z: boxMesh.position.z,
        },
        rotation: {
          x: boxMesh.rotation.x,
          y: boxMesh.rotation.y,
          z: boxMesh.rotation.z,
        },
      },
      ground: {
        position: {
          x: ground.position.x,
          y: ground.position.y,
          z: ground.position.z,
        },
        rotation: {
          x: ground.rotation.x,
          y: ground.rotation.y,
          z: ground.rotation.z,
        },
      },
    };

    log.push(logData);
    scene.render();
  }

  return { log, objects };
}

export const handler = (req: Request, _ctx: FreshContext): Response => {
  const url = req.url;
  const search = (new URL(url)).search;
  let x = 0;
  let z = 0;
  if (search) {
    const params = new URLSearchParams(search);
    x = Number(params.get("x"));
    z = Number(params.get("z"));
  }

  const result = simulate(x, z);
  return new Response(JSON.stringify(result));
};
