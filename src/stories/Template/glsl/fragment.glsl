// Поскольку позиции вершин должны быть максимально точными,
// все числа с плавающей запятой должны быть установлены как имеющие высокую точность.
precision highp float;

// varying
vec2 vUV;

// uniforms
sampler2D texture;

// code
void main(void) {
    gl_FragColor = vec4(texture2D(texture, vUV), 1.0);
}