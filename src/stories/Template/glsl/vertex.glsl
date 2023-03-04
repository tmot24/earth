// Поскольку позиции вершин должны быть максимально точными,
// все числа с плавающей запятой должны быть установлены как имеющие высокую точность.
precision highp float;

// attributes
attribute vec3 position;
attribute vec2 uv;

// uniforms
uniform mat4 worldViewProjection;

// varing
vec2 vUV;

// code
void main(void) {
    gl_Position = worldViewProjection * vec4(position, 1.0);
    vUV = uv;
}