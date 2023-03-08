precision highp float;

uniform float startColor;
uniform float endColor;
uniform float time;
uniform float PI;

varying vec2 vUV;

// Диапазон градиента
float inverseLerp(float start, float end, float value) {
    return (value-start)/(end-start);
}

// Градиент между двумя цветами
vec3 lerp(vec3 colorOne, vec3 colorTwo, float value) {
    return (colorOne + value*(colorTwo-colorOne));
}

// Рамки от 0.0 до 1.0
float saturate(float value) {
    return max(0.0, min(1.0, value));
}

void main(void) {
    float t = saturate(inverseLerp(startColor, endColor, vUV.x));
    vec3 outColor = lerp(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), t);
    gl_FragColor = vec4(outColor, 1.0);
}
