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
    video.material.diffuseTexture = new VideoTexture("video", "https://assets.nbatopshot.com/editions/1_metallic_gold_le_rare/1fc9b2f1-d444-4645-a12a-7d0500214fa2/play_1fc9b2f1-d444-4645-a12a-7d0500214fa2_1_metallic_gold_le_rare_capture_Animated_1080_1920_Black.mp4", scene, true);

    var plane2 = MeshBuilder.CreatePlane("image2", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane2.position.set(0, 0, 2.7);
    plane2.rotation.set(0, -Math.PI, 0);
    plane2.material = new StandardMaterial("material2", scene);
    plane2.material.diffuseColor = new Color3(1, 1, 1);
    plane2.material.alpha = .8;
    plane2.material.diffuseTexture = new Texture("https://assets.nbatopshot.com/resize/editions/1_metallic_gold_le_rare/1fc9b2f1-d444-4645-a12a-7d0500214fa2/play_1fc9b2f1-d444-4645-a12a-7d0500214fa2_1_metallic_gold_le_rare_capture_Game_2880_2880_Black.jpg", scene);

    var plane3 = MeshBuilder.CreatePlane("image3", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    plane3.position.set(2.7, 0, 0);
    plane3.rotation.set(0, -Math.PI / 2, 0);
    plane3.material = new StandardMaterial("material3", scene);
    plane3.material.diffuseColor = new Color3(1, 1, 1);
    plane3.material.alpha = .8;
    plane3.material.diffuseTexture = new Texture("https://assets.nbatopshot.com/resize/editions/1_metallic_gold_le_rare/1fc9b2f1-d444-4645-a12a-7d0500214fa2/play_1fc9b2f1-d444-4645-a12a-7d0500214fa2_1_metallic_gold_le_rare_capture_Category_2880_2880_Black.jpg", scene);

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

