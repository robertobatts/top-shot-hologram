import React from 'react';
import { Engine, Scene } from 'react-babylonjs';
import { ArcRotateCamera, MeshBuilder, HemisphericLight, Vector3, Mesh, StandardMaterial, Color3, VideoTexture, Texture, BoundingInfo } from '@babylonjs/core';
import webHadlers from "./utils/webHandlers";

var copyScene;

export default class Cube extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidUpdate(prevProps) {
    if (copyScene && this.props.selectedCube != prevProps.selectedCube) {
      var video = copyScene.getMeshByName("video");
      video.material.diffuseTexture = new VideoTexture("video", webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[0]), copyScene, true);
      video.material.alpha = 1;
      var photo1 = copyScene.getMeshByName("photo1");
      photo1.material.diffuseTexture = new Texture(webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[1]), copyScene);
      photo1.material.alpha = 1;
      var photo2 = copyScene.getMeshByName("photo2");
      photo2.material.diffuseTexture = new Texture(webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[2]), copyScene);
      photo2.material.alpha = 1;
      var photo3 = copyScene.getMeshByName("photo3");
      photo3.material.diffuseTexture = new Texture(webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[3]), copyScene);
      photo3.material.alpha = 1;
      var photo4 = copyScene.getMeshByName("photo4");
      photo4.material.diffuseTexture = new Texture(webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[4]), copyScene);
      photo4.material.alpha = 1;
      var photo5 = copyScene.getMeshByName("photo5");
      photo5.material.diffuseTexture = new Texture(webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[5]), copyScene);
      photo5.material.alpha = 1;
      if (!this.props.selectedCube.borderColor) {
        copyScene.getBoundingBoxRenderer().enabled = false;
      } else {
        copyScene.getBoundingBoxRenderer().enabled = true;
        copyScene.getBoundingBoxRenderer().frontColor = Color3.FromInts(this.props.selectedCube.borderColor.r, this.props.selectedCube.borderColor.g, this.props.selectedCube.borderColor.b);

      }
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
    video.material.alpha = .8;
    video.setBoundingInfo(new BoundingInfo(new Vector3(-2.7, -2.7, 0), new Vector3(2.7, 2.7, 0)));
    video.showBoundingBox = true;

    var photo1 = MeshBuilder.CreatePlane("photo1", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    photo1.position.set(0, 0, 2.7);
    photo1.rotation.set(0, -Math.PI, 0);
    photo1.material = new StandardMaterial("material2", scene);
    photo1.material.diffuseColor = new Color3(1, 1, 1);
    photo1.material.alpha = .8;
    photo1.setBoundingInfo(new BoundingInfo(new Vector3(2.7, 2.7, 0), new Vector3(-2.7, -2.7, 0)));
    photo1.showBoundingBox = true;

    var photo2 = MeshBuilder.CreatePlane("photo2", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    photo2.position.set(2.7, 0, 0);
    photo2.rotation.set(0, -Math.PI / 2, 0);
    photo2.material = new StandardMaterial("material3", scene);
    photo2.material.diffuseColor = new Color3(1, 1, 1);
    photo2.material.alpha = .8;
    photo2.setBoundingInfo(new BoundingInfo(new Vector3(-2.7, -2.7, 0), new Vector3(2.7, 2.7, 0)));
    photo2.showBoundingBox = true;

    var photo3 = MeshBuilder.CreatePlane("photo3", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    photo3.position.set(0, 2.7, 0);
    photo3.rotation.set(Math.PI / 2, 0, 0);
    photo3.material = new StandardMaterial("material4", scene);
    photo3.material.diffuseColor = new Color3(1, 1, 1);
    photo3.material.alpha = .8;
    photo3.setBoundingInfo(new BoundingInfo(new Vector3(-2.7, -2.7, 0), new Vector3(2.7, 2.7, 0)));
    photo3.showBoundingBox = true;

    var photo4 = MeshBuilder.CreatePlane("photo4", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    photo4.position.set(0, -2.7, 0);
    photo4.rotation.set(Math.PI / 2, 0, 0);
    photo4.material = new StandardMaterial("material5", scene);
    photo4.material.diffuseColor = new Color3(1, 1, 1);
    photo4.material.alpha = .8;
    photo4.setBoundingInfo(new BoundingInfo(new Vector3(2.7, 2.7, 0), new Vector3(-2.7, -2.7, 0)));
    photo4.showBoundingBox = true;

    var photo5 = MeshBuilder.CreatePlane("photo5", { size: 5, sideOrientation: Mesh.DOUBLESIDE }, scene);
    photo5.position.set(-2.7, 0, 0);
    photo5.rotation.set(0, -Math.PI / 2, 0);
    photo5.material = new StandardMaterial("material6", scene);
    photo5.material.diffuseColor = new Color3(1, 1, 1);
    photo5.material.alpha = .8;
    photo4.setBoundingInfo(new BoundingInfo(new Vector3(2.7, 2.7, 0), new Vector3(-2.7, -2.7, 0)));
    photo4.showBoundingBox = true;

    scene.getBoundingBoxRenderer().enabled = false;
    scene.getBoundingBoxRenderer().showBackLines = false;

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

