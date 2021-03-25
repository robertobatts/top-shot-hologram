import React from 'react';
import { Engine, Scene } from 'react-babylonjs';
import { ArcRotateCamera, MeshBuilder, HemisphericLight, Vector3, Mesh, StandardMaterial, Color3, VideoTexture, Texture } from '@babylonjs/core';
import webHadlers from "./utils/webHandlers";

var copyScene;

export default class Cube extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidUpdate(prevProps) {
    if (copyScene && this.props.mediaIds != prevProps.mediaIds) {
    copyScene.getMeshByName("video").material.diffuseTexture = new VideoTexture("video", webHadlers.getTopShotVideoLink(this.props.mediaIds[0]), copyScene, true);
    copyScene.getMeshByName("photo1").material.diffuseTexture = new Texture(webHadlers.getTopShotVideoLink(this.props.mediaIds[1]), copyScene);
    copyScene.getMeshByName("photo2").material.diffuseTexture = new Texture(webHadlers.getTopShotVideoLink(this.props.mediaIds[2]), copyScene);
    copyScene.getMeshByName("photo3").material.diffuseTexture = new Texture(webHadlers.getTopShotVideoLink(this.props.mediaIds[3]), copyScene);
    copyScene.getMeshByName("photo4").material.diffuseTexture = new Texture(webHadlers.getTopShotVideoLink(this.props.mediaIds[4]), copyScene);
    copyScene.getMeshByName("photo5").material.diffuseTexture = new Texture(webHadlers.getTopShotVideoLink(this.props.mediaIds[5]), copyScene);
    //video.computeWorldMatrix();
    }
  }

  meshPicked(mesh) {
    console.log('mesh picked:', mesh)
  }

  onSceneMount(e) {
    const { canvas, scene } = e;
    copyScene = scene;

    scene.clearColor = new Color3.Black();
    var light1 = new HemisphericLight("Omni", new Vector3(10, 10, 10), scene);
    light1.intensity = .9;
    light1.specular = new Color3.Black();
    var light2 = new HemisphericLight("Omni", new Vector3(-10, -10, -10), scene);
    light2.intensity = .9;
    light2.specular = new Color3.Black();
    var camera = new ArcRotateCamera("Camera", -.9, 1.0, 15, new Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var video = MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    video.position.set(0, 0, -2.7);
    video.rotation.set(0, -Math.PI, 0);
    video.material = new StandardMaterial("material1", scene);
    video.material.diffuseColor = new Color3(1, 1, 1);
    video.material.alpha = .9;

    var photo1 = MeshBuilder.CreatePlane("photo1", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    photo1.position.set(0, 0, 2.7);
    photo1.rotation.set(0, -Math.PI, 0);
    photo1.material = new StandardMaterial("material2", scene);
    photo1.material.diffuseColor = new Color3(1, 1, 1);
    photo1.material.alpha = .9;

    var photo2 = MeshBuilder.CreatePlane("photo2", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    photo2.position.set(2.7, 0, 0);
    photo2.rotation.set(0, -Math.PI / 2, 0);
    photo2.material = new StandardMaterial("material3", scene);
    photo2.material.diffuseColor = new Color3(1, 1, 1);
    photo2.material.alpha = .9;
  
    var photo3 = MeshBuilder.CreatePlane("photo3", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    photo3.position.set(0, 2.7, 0);
    photo3.rotation.set(Math.PI / 2, 0, 0);
    photo3.material = new StandardMaterial("material4", scene);
    photo3.material.diffuseColor = new Color3(1, 1, 1);
    photo3.material.alpha = .9;

    var photo4 = MeshBuilder.CreatePlane("photo4", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    photo4.position.set(0, -2.7, 0);
    photo4.rotation.set(Math.PI / 2, 0, 0);
    photo4.material = new StandardMaterial("material5", scene);
    photo4.material.diffuseColor = new Color3(1, 1, 1);
    photo4.material.alpha = .9

    var photo5 = MeshBuilder.CreatePlane("photo5", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    photo5.position.set(-2.7, 0, 0);
    photo5.rotation.set(0, -Math.PI / 2, 0);
    photo5.material = new StandardMaterial("material6", scene);
    photo5.material.diffuseColor = new Color3(1, 1, 1);
    photo5.material.alpha = .9;

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
          onMeshPicked={this.meshPicked.bind(this)}
          onSceneMount={this.onSceneMount.bind(this)}
        />
      </Engine>
    )
  }

}

