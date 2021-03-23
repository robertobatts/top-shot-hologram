import React from 'react';
import { Engine, Scene } from 'react-babylonjs'
import { ArcRotateCamera, MeshBuilder, HemisphericLight, Vector3, Mesh, StandardMaterial, Color3, VideoTexture, Texture } from '@babylonjs/core';

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
    
    var light = new HemisphericLight("Omni", new Vector3(10, 10, 0), scene);
    var camera = new ArcRotateCamera("Camera", -.9, 1.0, 20, new Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var video = MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    video.position.set(0, 0, -2.7);
    video.rotation.set(0, -Math.PI, 0);
    video.material = new StandardMaterial("material", scene);
    video.material.emissiveColor = new Color3(1, 1, 1);
    video.material.diffuseTexture = new VideoTexture("video", "http://localhost:8081/api/top-shot-video/605a6c2eccfde85d86239b27", scene, true);

    var plane2 = MeshBuilder.CreatePlane("image2", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane2.position.set(0, 0, 2.7);
    plane2.rotation.set(0, -Math.PI, 0);
    plane2.material = new StandardMaterial("material2", scene);
    plane2.material.diffuseColor = new Color3(1, 1, 1);
    plane2.material.alpha = .8;
    plane2.material.diffuseTexture = new Texture("http://localhost:8081/api/top-shot-photo/605a6c2eccfde85d86239b26", scene);

    var plane3 = MeshBuilder.CreatePlane("image3", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane3.position.set(2.7, 0, 0);
    plane3.rotation.set(0, -Math.PI / 2, 0);
    plane3.material = new StandardMaterial("material3", scene);
    plane3.material.diffuseColor = new Color3(1, 1, 1);
    plane3.material.alpha = .8;
    plane3.material.diffuseTexture = new Texture("http://localhost:8081/api/get-top-shot-photo", scene);

    var plane4 = MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane4.position.set(0, 2.7, 0);
    plane4.rotation.set(Math.PI / 2, 0, 0);
    plane4.material = new StandardMaterial("material4", scene);
    plane4.material.diffuseColor = new Color3(1, 1, 1);
    plane4.material.alpha = .8;

    var plane5 = MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane5.position.set(0, -2.7, 0);
    plane5.rotation.set(Math.PI / 2, 0, 0);
    plane5.material = new StandardMaterial("material5", scene);
    plane5.material.diffuseColor = new Color3(1, 1, 1);
    plane5.material.alpha = .8

    var plane6 = MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane6.position.set(-2.7, 0, 0);
    plane6.rotation.set(0, -Math.PI / 2, 0);
    plane6.material = new StandardMaterial("material6", scene);
    plane6.material.diffuseColor = new Color3(1, 1, 1);
    plane6.material.alpha = .8;

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

