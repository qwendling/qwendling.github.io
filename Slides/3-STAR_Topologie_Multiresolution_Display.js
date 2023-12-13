import Slide from './Slide.js';
import * as THREE from '../CMapJS/Libs/three.module.js';
import {OrbitControls} from '../CMapJS/Libs/OrbitsControls.js';
import Renderer from '../CMapJS/Rendering/Renderer.js';
import * as Display from './Display.js';
import * as BunnyMR from '../Data/bunny_multires.js';
import {glRenderer, scafEdgeMaterial, meshEdgeMaterial, ambiantLightInt, pointLightInt} from './parameters.js';
import {Clock} from '../CMapJS/Libs/three.module.js';


export const slide_multires = new Slide(
	function(DOM_Res0,DOM_Res1,DOM_Res2,DOM_Res3)
	{
		this.camera = new THREE.PerspectiveCamera(45, DOM_Res0.width / DOM_Res0.height, 0.1, 10000.0);
		this.camera.position.set(2000, 0, 2);
		console.log(DOM_Res0.width);


		const meshres0Layer = 0;
		const meshres1Layer = 1;
		const meshres2Layer = 2;
		const meshres3Layer = 3;

		const contextRes0= DOM_Res0.getContext('2d');
		const contextRes1= DOM_Res1.getContext('2d');
		const contextRes2= DOM_Res2.getContext('2d');
		const contextRes3= DOM_Res3.getContext('2d');

		const controlsRes0 = new OrbitControls(this.camera, DOM_Res0);
		const controlsRes1 = new OrbitControls(this.camera, DOM_Res1);
		const controlsRes2 = new OrbitControls(this.camera, DOM_Res2);
		const controlsRes3 = new OrbitControls(this.camera, DOM_Res3);

		this.scene = new THREE.Scene()
		/*const ambiantLight = new THREE.AmbientLight(0xFFFFFF, ambiantLightInt);
		const pointLight = new THREE.PointLight(0xFFFFFF, pointLightInt);
		pointLight.position.set(10,8000,15);*/

		//ambiantLight.layers.enable(meshres0Layer);
		//pointLight.layers.enable(meshres0Layer);
		//ambiantLight.layers.enable(meshres1Layer);
		//pointLight.layers.enable(meshres1Layer);
		//ambiantLight.layers.enable(meshres2Layer);
		//pointLight.layers.enable(meshres2Layer);
		//ambiantLight.layers.enable(meshres3Layer);
		//pointLight.layers.enable(meshres3Layer);


		//this.scene.add(pointLight);
		//this.scene.add(ambiantLight);

		this.group = new THREE.Group;
		this.scene.add(this.group);

		const bunnyGroup = new THREE.Group;
		this.group.add(bunnyGroup);

		this.bunny0 = Display.loadVolumesView("mesh", BunnyMR.bunny_res0);
		this.bunny0.layers.set(meshres0Layer);
		bunnyGroup.add(this.bunny0);

		this.bunny1 = Display.loadVolumesView("mesh", BunnyMR.bunny_res1);
		this.bunny1.layers.set(meshres1Layer);
		bunnyGroup.add(this.bunny1);

		this.bunny2 = Display.loadVolumesView("mesh", BunnyMR.bunny_res2);
		this.bunny2.layers.set(meshres2Layer);
		bunnyGroup.add(this.bunny2);

		this.bunny3 = Display.loadVolumesView("mesh", BunnyMR.bunny_res3);
		this.bunny3.layers.set(meshres3Layer);
		bunnyGroup.add(this.bunny3);

		const axis = new THREE.Vector3(0, 1, 0);
		this.clock = new Clock(true);
		this.time = 0;

		this.on = 1;
		this.pause = function(){
			this.on = 1 - this.on;
		};

		bunnyGroup.setRotationFromAxisAngle(new THREE.Vector3(0,-1,0), -Math.PI/2.);

		this.loop = function(){
			if(this.running){
				glRenderer.setSize(DOM_Res0.width, DOM_Res0.height);
				this.time += this.clock.getDelta() * this.on;
				this.group.setRotationFromAxisAngle(axis, Math.PI / 90 * this.time);

				this.camera.layers.enable(meshres0Layer);
				glRenderer.render(this.scene, this.camera);
				contextRes0.clearRect(0, 0, DOM_Res0.width, DOM_Res0.height);
				contextRes0.drawImage(glRenderer.domElement, 0, 0);
				this.camera.layers.disable(meshres0Layer);

				this.camera.layers.enable(meshres1Layer);
				glRenderer.render(this.scene, this.camera);
				contextRes1.clearRect(0, 0, DOM_Res1.width, DOM_Res1.height);
				contextRes1.drawImage(glRenderer.domElement, 0, 0);
				this.camera.layers.disable(meshres1Layer);

				this.camera.layers.enable(meshres2Layer);
				glRenderer.render(this.scene, this.camera);
				contextRes2.clearRect(0, 0, DOM_Res2.width, DOM_Res2.height);
				contextRes2.drawImage(glRenderer.domElement, 0, 0);
				this.camera.layers.disable(meshres2Layer);
				
				this.camera.layers.enable(meshres3Layer);
				glRenderer.render(this.scene, this.camera);
				contextRes3.clearRect(0, 0, DOM_Res3.width, DOM_Res3.height);
				contextRes3.drawImage(glRenderer.domElement, 0, 0);
				this.camera.layers.disable(meshres3Layer);

				requestAnimationFrame(this.loop.bind(this));
			}
		}
	});