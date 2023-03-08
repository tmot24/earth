precision highp float;

uniform float time;
uniform float PI;

varying vec2 vUV;
varying vec3 vNORMAL;

// Градиент между двумя цветами
vec3 lerp(vec3 colorOne, vec3 colorTwo, float value) {
    return (colorOne + value*(colorTwo-colorOne));
}

void main(void) {
    float xOffset = cos(vUV.x * 2.0 * PI * 8.0) * 0.01;

    float wave = cos((vUV.y + xOffset - time) * 2.0 * PI * 5.0) * 0.5 + 0.5;

    float up = 1.0 - vUV.y;

    float topBottomRemover = abs(vNORMAL.y) == 1.0 ? 0.0 : 1.0;

    wave *= up * topBottomRemover;

    vec3 gradient = lerp(vec3(1.0, 1.0, 1.0), vec3(0.0, 1.0, 0.0), vUV.y);

    gl_FragColor = vec4(gradient * wave, 1.0);
}
