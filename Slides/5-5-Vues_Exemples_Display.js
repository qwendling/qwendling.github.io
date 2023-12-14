import Slide from './Slide.js';
import * as THREE from '../CMapJS/Libs/three.module.js';
import {OrbitControls} from '../CMapJS/Libs/OrbitsControls.js';
import Renderer from '../CMapJS/Rendering/Renderer.js';
import * as Display from './Display.js';
import * as Kitten from '../Data/kitten_vues.js';
import {glRenderer, scafEdgeMaterial, meshEdgeMaterial, ambiantLightInt, pointLightInt} from './parameters.js';
import {Clock} from '../CMapJS/Libs/three.module.js';
import { loadCmap3 } from '../CMapJS/IO/VolumesFormats/CMap3IO.js';


export const slide_vues = new Slide(
	function(DOM_Meca,DOM_Geom,DOM_Contact)
	{
		this.camera = new THREE.PerspectiveCamera(45, DOM_Meca.width / DOM_Meca.height, 0.1, 10000.0);
		this.camera.position.set(2000, 0, 2);
		console.log(DOM_Meca.width);


		const meshMecaLayer = 0;
		const meshGeomLayer = 1;
		const meshContactLayer = 2;

		const contextMeca= DOM_Meca.getContext('2d');
		const contextGeom= DOM_Geom.getContext('2d');
		const contextContact= DOM_Contact.getContext('2d');

		const controlsMeca = new OrbitControls(this.camera, DOM_Meca);
		const controlsGeom = new OrbitControls(this.camera, DOM_Geom);
		const controlsContact = new OrbitControls(this.camera, DOM_Contact);

		this.scene = new THREE.Scene()


		this.group = new THREE.Group;
		this.scene.add(this.group);

		const kittenGroup = new THREE.Group;
		this.group.add(kittenGroup);

		this.kitten0 = Display.loadVolumesView("mesh", Kitten.kitten_meca);
		this.kitten0.layers.set(meshMecaLayer);
		kittenGroup.add(this.kitten0);

    const kitten1 = loadCmap3('mesh',Kitten.kitten_geom);
    this.kitten1 = new Renderer(kitten1);
    this.kitten1.volumes.create({layer: meshGeomLayer}).addTo(kittenGroup);
		/*this.kitten1 = Display.loadVolumesView("mesh", Kitten.kitten_geom);

		this.kitten1.layers.set(meshGeomLayer);
		kittenGroup.add(this.kitten1);*/

		this.kitten2 = Display.loadVolumesView("mesh", Kitten.kitten_contact);
		this.kitten2.layers.set(meshContactLayer);
		kittenGroup.add(this.kitten2);

		const axis = new THREE.Vector3(0, 1, 0);
		this.clock = new Clock(true);
		this.time = 0;

		this.on = 1;
		this.pause = function(){
			this.on = 1 - this.on;
		};

		kittenGroup.setRotationFromAxisAngle(new THREE.Vector3(0,-1,0), -Math.PI/2.);

		this.loop = function(){
			if(this.running){
				glRenderer.setSize(DOM_Meca.width, DOM_Meca.height);
				this.time += this.clock.getDelta() * this.on;
				this.group.setRotationFromAxisAngle(axis, Math.PI / 90 * this.time);

				this.camera.layers.enable(meshMecaLayer);
				glRenderer.render(this.scene, this.camera);
				contextMeca.clearRect(0, 0, DOM_Meca.width, DOM_Meca.height);
				contextMeca.drawImage(glRenderer.domElement, 0, 0);
				this.camera.layers.disable(meshMecaLayer);

				this.camera.layers.enable(meshGeomLayer);
				glRenderer.render(this.scene, this.camera);
				contextGeom.clearRect(0, 0, DOM_Geom.width, DOM_Geom.height);
				contextGeom.drawImage(glRenderer.domElement, 0, 0);
				this.camera.layers.disable(meshGeomLayer);

				this.camera.layers.enable(meshContactLayer);
				glRenderer.render(this.scene, this.camera);
				contextContact.clearRect(0, 0, DOM_Contact.width, DOM_Contact.height);
				contextContact.drawImage(glRenderer.domElement, 0, 0);
				this.camera.layers.disable(meshContactLayer);
				

				requestAnimationFrame(this.loop.bind(this));
			}
		}
	});