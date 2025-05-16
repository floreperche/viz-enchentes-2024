// Based on the tutorial from Dan Greenheck, https://github.com/dgreenheck/threejs-water-shader


varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}