/**
 * Based on the tutorial from Dan Greenheck, https://github.com/dgreenheck/threejs-water-shader
 * And adapted for the need of this project
 */

import * as THREE from 'three';
import causticsVertexShader from './shaders/caustics.vert?raw';
import causticsFragmentShader from './shaders/caustics.frag?raw';

export class Ground extends THREE.Mesh {
	constructor(options = {}) {
		super();
		this.material = new THREE.ShaderMaterial({
			vertexShader: causticsVertexShader,
			fragmentShader: causticsFragmentShader,
			uniforms: {
				uTexture: { value: options.texture },
				uTime: { value: 0 },
				uCausticsColor: { value: new THREE.Color('#745856') },
				uCausticsIntensity: { value: 0.2 },
				uCausticsScale: { value: 10.0 },
				uCausticsSpeed: { value: 0.5 },
				uCausticsThickness: { value: 0.4 },
				uCausticsOffset: { value: 0.75 },
			},
		});

		this.geometry = new THREE.PlaneGeometry(12, 10);
		this.rotation.x = -Math.PI * 0.5;
		this.position.y = -0.2;
	}

	update(time) {
		this.material.uniforms.uTime.value = time;
	}
}
