import React from 'react';
import { Engine, Scene } from 'react-babylonjs'
import { ArcRotateCamera, MeshBuilder, HemisphericLight, Vector3, Mesh, StandardMaterial, Color3, VideoTexture } from '@babylonjs/core';

export default class Cube extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  meshPicked(mesh) {
    console.log('mesh picked:', mesh)
  }

  onSceneMount(e) {
    const { canvas, scene } = e;
    //canvas.style.width = "100%";
    
    var light = new HemisphericLight("Omni", new Vector3(10, 10, 0), scene);
    var camera = new ArcRotateCamera("Camera", -.9, 1.0, 20, new Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var video = MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    video.position.set(0, 0, -2.7);
    video.rotation.set(0, -Math.PI, 0);
    video.material = new StandardMaterial("material", scene);
    video.material.emissiveColor = new Color3(1, 1, 1);
    video.material.diffuseTexture = new VideoTexture("video", "textures/babylonjs.mp4", scene, true);

    var material = new StandardMaterial("material2", scene);
    material.diffuseColor = new Color3(1, 1, 1);
    material.alpha = .5;

    var plane2 = MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane2.position.set(0, 0, 2.7);
    plane2.rotation.set(0, -Math.PI, 0);
    plane2.material = material;

    var plane3 = MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane3.position.set(2.7, 0, 0);
    plane3.rotation.set(0, -Math.PI / 2, 0);
    plane3.material = material;

    var plane4 = MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane4.position.set(0, 2.7, 0);
    plane4.rotation.set(Math.PI / 2, 0, 0);
    plane4.material = material;

    var plane4 = MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane4.position.set(0, -2.7, 0);
    plane4.rotation.set(Math.PI / 2, 0, 0);
    plane4.material = material;

    var plane4 = MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane4.position.set(-2.7, 0, 0);
    plane4.rotation.set(0, -Math.PI / 2, 0);
    plane4.material = material;

    scene.getEngine().runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  }


  render() {
    return (
      <Engine antialias>
        <Scene
          onMeshPicked={this.meshPicked}
          onSceneMount={this.onSceneMount}
        />
      </Engine>
    )
  }

}

