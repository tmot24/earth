precision highp float;

varying vec2 vUV;

uniform float time;
uniform float PI;

void main(void) {
    vec2 uvCenter = vUV * 2.0 - 1.0;

    float radialDistance = length(uvCenter);

    float wave = cos((radialDistance - time) * 2.0 * PI * 5.0) * 0.5 + 0.5;

    wave*= 1.0 - radialDistance;

    gl_FragColor = vec4(wave, wave, wave, 1.0);
}