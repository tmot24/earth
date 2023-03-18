precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;
uniform float time;
uniform float PI;

// Varying
varying vec2 vUV;

void main(void) {
    vec3 pos = position;

    vec2 uvCenter = uv * 2.0 - 1.0;

    float radialDistance = length(uvCenter);

    float wave = cos((radialDistance - time) * 2.0 * PI * 5.0) * 0.1 + 0.5;

    wave*= 1.0 - radialDistance;

    gl_Position = worldViewProjection * vec4(position.x, wave, position.z, 1.0);

    vUV = uv;
}