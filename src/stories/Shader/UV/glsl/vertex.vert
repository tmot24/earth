precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 worldViewProjection;
uniform mat4 view;
uniform float scale;
uniform float offset;

varying vec2 vUV;
varying vec3 vNORMAL;

void main(void) {
    gl_Position = worldViewProjection * vec4(position, 1.0);

    vUV = uv;
}