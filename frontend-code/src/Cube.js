import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import webHadlers from './utils/webHandlers';

var hologramScene;

export default class Cube extends React.Component {

  constructor(props) {
    super(props);

    this.state = { isProjecting: false }
  }

  componentDidUpdate(prevProps) {
    if (hologramScene && this.props.selectedCube != prevProps.selectedCube) {
      this.updateScene(hologramScene);
    }
  }

  updateScene(sceneToUpdate) {
    var video = sceneToUpdate.getMeshByName("video");
    video.material.diffuseTexture = new BABYLON.VideoTexture("video", webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[0]), sceneToUpdate, true);
    video.material.alpha = 1;
    var photo1 = sceneToUpdate.getMeshByName("photo1");
    photo1.material.diffuseTexture = new BABYLON.Texture(webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[1]), sceneToUpdate);
    photo1.material.alpha = 1;
    var photo2 = sceneToUpdate.getMeshByName("photo2");
    photo2.material.diffuseTexture = new BABYLON.Texture(webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[2]), sceneToUpdate);
    photo2.material.alpha = 1;
    var photo3 = sceneToUpdate.getMeshByName("photo3");
    photo3.material.diffuseTexture = new BABYLON.Texture(webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[3]), sceneToUpdate);
    photo3.material.alpha = 1;
    var photo4 = sceneToUpdate.getMeshByName("photo4");
    photo4.material.diffuseTexture = new BABYLON.Texture(webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[4]), sceneToUpdate);
    photo4.material.alpha = 1;
    var photo5 = sceneToUpdate.getMeshByName("photo5");
    photo5.material.diffuseTexture = new BABYLON.Texture(webHadlers.getTopShotVideoLink(this.props.selectedCube.mediaIdsAsString[5]), sceneToUpdate);
    photo5.material.alpha = 1;

    var glow = sceneToUpdate.getGlowLayerByName("glow");
    var border1 = sceneToUpdate.getMeshByName("border1");
    var border2 = sceneToUpdate.getMeshByName("border2");
    if (!this.props.selectedCube.borderColor) {
      glow.intensity = 0;
      border1.isVisible = false;
      border2.isVisible = false;
    } else {
      border1.isVisible = true;
      border2.isVisible = true;
      glow.intensity = 1.5;
      var color = BABYLON.Color3.FromInts(this.props.selectedCube.borderColor.r, this.props.selectedCube.borderColor.g, this.props.selectedCube.borderColor.b);
      glow.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
        if (mesh.name === "border1" || mesh.name === "border2") {
          result.set(color.r, color.g, color.b, 1);
        } else {
          result.set(0, 0, 0, 0);
        }
      }
    }
  }


  render() {
    return (
      <>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.isProjecting}
                onChange={(e) => this.handleSwitch(e.target.checked)}
                name="checkedB"
                color="primary"
              />
            }
            label="Phone Projector"
          />
        </FormGroup>
        <canvas id="canvas-hologram" style={{ height: "70vw", width: "70vw" }}></canvas>
      </>
    )
  }

  handleSwitch(checked) {
    this.setState({ isProjecting: checked }, () => {
      this.buildCanvas(checked);
    });
  }

  componentDidMount() {
    this.buildCanvas(this.state.isProjecting);
  }

  buildCanvas(holografic) {
    var canvas;
    canvas = document.getElementById("canvas-hologram");
    var engine = null;
    var sceneToRender = null;
    var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };
    var sa1 = 0;
    window.eval('var time = 0;');
    function CreateScene() {

      var scene = new BABYLON.Scene(engine);

      scene.clearColor = new BABYLON.Color4(0., 0., 0., 1.);

      var camera1 = new BABYLON.ArcRotateCamera("Camera1",  -.9, 1.0, 15, new BABYLON.Vector3.Zero(), scene);
      camera1.target = new BABYLON.Vector3(0., 0., 0.);
      scene.activeCameras.push(camera1);
      scene.activeCamera = camera1;
      scene.activeCamera.attachControl(canvas);
      if (holografic) {
        var camera2 = new BABYLON.ArcRotateCamera("Camera2", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
        camera2.target = camera1.target;
        var camera3 = new BABYLON.ArcRotateCamera("Camera2", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
        camera3.target = camera1.target;
        var camera4 = new BABYLON.ArcRotateCamera("Camera2", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
        camera4.target = camera1.target;
        var camera5 = new BABYLON.ArcRotateCamera("Camera2", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
        camera5.target = camera1.target;

        camera2.position = camera1.position;
        camera3.position = camera1.position;
        camera4.position = camera1.position;

        scene.activeCameras.push(camera2);
        scene.activeCameras.push(camera3);
        scene.activeCameras.push(camera4);
        scene.activeCameras.push(camera5);

        var viewport1 = new BABYLON.Viewport(0.0, 0.5, 0.49, 0.5);
        var viewport2 = new BABYLON.Viewport(0.5, 0.5, 0.49, 0.5);
        var viewport3 = new BABYLON.Viewport(0.5, 0.0, 0.49, 0.5);
        var viewport4 = new BABYLON.Viewport(0.0, 0.0, 0.49, 0.5);
        var viewport5 = new BABYLON.Viewport(0.46, 0.46, 0.08, 0.08);
        camera1.viewport = viewport1;
        camera2.viewport = viewport2;
        camera3.viewport = viewport3;
        camera4.viewport = viewport4;
        camera5.viewport = viewport5;
      }

      var light1 = new BABYLON.HemisphericLight("Omni", new BABYLON.Vector3(10, 10, 10), scene);
      light1.intensity = .9;
      light1.specular = new BABYLON.Color3.Black();
      var light2 = new BABYLON.HemisphericLight("Omni", new BABYLON.Vector3(-10, -10, -10), scene);
      light2.intensity = .9;
      light2.specular = new BABYLON.Color3.Black();

      var video = BABYLON.MeshBuilder.CreatePlane("video", { size: 5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
      video.position.set(0, 0, -2.7);
      video.rotation.set(0, 0, 0);
      video.material = new BABYLON.StandardMaterial("material1", scene);
      video.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      video.material.alpha = .8;

      var photo1 = BABYLON.MeshBuilder.CreatePlane("photo1", { size: 5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
      photo1.position.set(0, 0, 2.7);
      photo1.rotation.set(0, -Math.PI, 0);
      photo1.material = new BABYLON.StandardMaterial("material2", scene);
      photo1.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      photo1.material.alpha = .8;

      var photo2 = BABYLON.MeshBuilder.CreatePlane("photo2", { size: 5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
      photo2.position.set(2.7, 0, 0);
      photo2.rotation.set(0, -Math.PI / 2, 0);
      photo2.material = new BABYLON.StandardMaterial("material3", scene);
      photo2.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      photo2.material.alpha = .8;

      var photo3 = BABYLON.MeshBuilder.CreatePlane("photo3", { size: 5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
      photo3.position.set(0, 2.7, 0);
      photo3.rotation.set(Math.PI / 2, 0, 0);
      photo3.material = new BABYLON.StandardMaterial("material4", scene);
      photo3.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      photo3.material.alpha = .8;

      var photo4 = BABYLON.MeshBuilder.CreatePlane("photo4", { size: 5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
      photo4.position.set(0, -2.7, 0);
      photo4.rotation.set(Math.PI / 2, 0, 0);
      photo4.material = new BABYLON.StandardMaterial("material5", scene);
      photo4.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      photo4.material.alpha = .8;

      var photo5 = BABYLON.MeshBuilder.CreatePlane("photo5", { size: 5, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
      photo5.position.set(-2.7, 0, 0);
      photo5.rotation.set(0, Math.PI / 2, 0);
      photo5.material = new BABYLON.StandardMaterial("material6", scene);
      photo5.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      photo5.material.alpha = .8;

      var points1 = [new BABYLON.Vector3(2.7, 2.7, 2.7), new BABYLON.Vector3(2.7, -2.7, 2.7), new BABYLON.Vector3(2.7, -2.7, -2.7),
      new BABYLON.Vector3(2.7, 2.7, -2.7), new BABYLON.Vector3(2.7, 2.7, 2.7), new BABYLON.Vector3(-2.7, 2.7, 2.7),
      new BABYLON.Vector3(-2.7, -2.7, 2.7), new BABYLON.Vector3(2.7, -2.7, 2.7)];
      var points2 = [new BABYLON.Vector3(-2.7, -2.7, -2.7), new BABYLON.Vector3(-2.7, -2.7, 2.7), new BABYLON.Vector3(-2.7, 2.7, 2.7),
      new BABYLON.Vector3(-2.7, 2.7, -2.7), new BABYLON.Vector3(-2.7, -2.7, -2.7), new BABYLON.Vector3(2.7, -2.7, -2.7),
      new BABYLON.Vector3(2.7, 2.7, -2.7), new BABYLON.Vector3(-2.7, 2.7, -2.7)];
      var path3d1 = new BABYLON.Path3D(points1);
      var border1 = BABYLON.Mesh.CreateLines("border1", path3d1.getPoints(), scene);
      var path3d2 = new BABYLON.Path3D(points2);
      var border2 = BABYLON.Mesh.CreateLines("border2", path3d2.getPoints(), scene);
      var gl = new BABYLON.GlowLayer("glow", scene);
      gl.addIncludedOnlyMesh(border1);
      gl.addIncludedOnlyMesh(border2);

      if (holografic) {
        BABYLONX.ShaderBuilder.InitializeEngine();

        var s22 = new BABYLONX.ShaderBuilder()
          .Map({ index: 'current', uv: 'rotate_xy(vec2(1.-1.*vuv.x,vuv.y) ,vec2(0.5), -90.0 )' })

          //.Map({ index: 'current' })
          .BuildPostProcess(camera3, scene, 1.0, {
            onApply: function (ef) {

            }
          });

        var s22 = new BABYLONX.ShaderBuilder()
          .Map({ index: 'current', uv: 'rotate_xy(vec2( vuv.x,vuv.y) ,vec2(0.5), -90.0 )' })

          //.Map({ index: 'current' })
          .BuildPostProcess(camera4, scene, 1.0, {
            onApply: function (ef) {

            }
          });



        s22 = new BABYLONX.ShaderBuilder()
          .Map({ index: 'current', uv: 'rotate_xy(vec2( 1.-vuv.x, 1.-vuv.y) ,vec2(0.5), -90.0 )' })


          .BuildPostProcess(camera2, scene, 1.0, {
            onApply: function (ef) {

            }
          });

        s22 = new BABYLONX.ShaderBuilder()
          .Map({ index: 'current', uv: 'rotate_xy(vec2( vuv.x, 1.-vuv.y) ,vec2(0.5), -90.0 )' })

          .BuildPostProcess(camera1, scene, 1.0, {
            onApply: function (ef) {

            }
          });

        scene.registerBeforeRender(function () {

          camera2.alpha = camera1.alpha;
          camera2.beta = camera1.beta;
          camera2.radius = camera1.radius;
          camera2.target = camera1.target;
          camera2.position = camera1.position;

          camera5.alpha = camera1.alpha;
          camera5.beta = camera1.beta;
          camera5.radius = camera1.radius;
          camera5.target = camera1.target;
          camera5.position = camera1.position;

          camera3.alpha = camera1.alpha;
          camera3.beta = camera1.beta;
          camera3.radius = camera1.radius;
          camera3.target = camera1.target;
          camera3.position = camera1.position;

          camera4.alpha = camera1.alpha;
          camera4.beta = camera1.beta;
          camera4.radius = camera1.radius;
          camera4.target = camera1.target;
          camera4.position = camera1.position;
        });

      }

      return scene;
    }
    var engine;
    var initFunction = async function () {
      var asyncEngineCreation = async function () {
        try {
          return createDefaultEngine();
        } catch (e) {
          console.log("the available createEngine function failed. Creating the default engine instead");
          return createDefaultEngine();
        }
      }

      engine = await asyncEngineCreation();
      if (!engine) throw 'engine should not be null.';
      hologramScene = CreateScene();
    };
    initFunction().then(() => {
      if (this.props.selectedCube) {
        this.updateScene(hologramScene);
      }
      sceneToRender = hologramScene;
      engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
          sceneToRender.render();
        }
      });
    });

    // Resize
    window.addEventListener("resize", function () {
      engine.resize();
    });
  }

}

