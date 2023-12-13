import Slide from './Slide.js';
import * as THREE from '../CMapJS/Libs/three.module.js';
import {OrbitControls} from '../CMapJS/Libs/OrbitsControls.js';
import Renderer from '../CMapJS/Rendering/Renderer.js';
import * as Display from './Display.js';
import * as Hand from '../Data/hand_files.js';
import {glRenderer, scafEdgeMaterial, meshEdgeMaterial, ambiantLightInt, pointLightInt} from './parameters.js';
import {Clock} from '../CMapJS/Libs/three.module.js';


export const slide_fem = new Slide(
	function(DOM_FEM)
	{
        console.log(DOM_FEM.height);
		this.camera = new THREE.PerspectiveCamera(45, DOM_FEM.width / DOM_FEM.height, 0.1, 1000.0);
		this.camera.position.set(0, 0, 2);


		const meshLayer = 0;

		const contextFEM = DOM_FEM.getContext('2d');

		const controlsFEM = new OrbitControls(this.camera, DOM_FEM);

		this.scene = new THREE.Scene()
		const ambiantLight = new THREE.AmbientLight(0xFFFFFF, ambiantLightInt);
		const pointLight = new THREE.PointLight(0xFFFFFF, pointLightInt);
		pointLight.position.set(10,8,15);

		ambiantLight.layers.enable(meshLayer);
		pointLight.layers.enable(meshLayer);
		ambiantLight.layers.enable(meshLayer);
		pointLight.layers.enable(meshLayer);

		this.scene.add(pointLight);
		this.scene.add(ambiantLight);

		this.group = new THREE.Group;
		this.scene.add(this.group);

		const handGroup = new THREE.Group;
		this.group.add(handGroup);

		this.handVol = Display.loadVolumesView("mesh", Hand.hand_mesh);
		this.handVol.layers.set(meshLayer);
		handGroup.add(this.handVol);

		const axis = new THREE.Vector3(0, 1, 0);
		this.clock = new Clock(true);
		this.time = 0;

		this.on = 1;
		this.pause = function(){
			this.on = 1 - this.on;
		};

		handGroup.setRotationFromAxisAngle(new THREE.Vector3(-1,0,0), Math.PI / 3.75);

		this.loop = function(){
			if(this.running){
				glRenderer.setSize(DOM_FEM.width, DOM_FEM.height);
				this.time += this.clock.getDelta() * this.on;
				this.group.setRotationFromAxisAngle(axis, Math.PI / 90 * this.time);

				this.camera.layers.enable(meshLayer);
				glRenderer.render(this.scene, this.camera);
				contextFEM.clearRect(0, 0, DOM_FEM.width, DOM_FEM.height);
				contextFEM.drawImage(glRenderer.domElement, 0, 0);
				this.camera.layers.disable(meshLayer);

				requestAnimationFrame(this.loop.bind(this));
			}
		}
	});