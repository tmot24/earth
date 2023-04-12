// Vertex shader
#if defined(WEBGL2) || defines(WEBGPU)
precision highp sampler2DArray;
#endif
precision highp float;

attribute vec3 position;


uniform mat4 world;
uniform mat4 worldViewProjection;
uniform float Float;
uniform float Float1;
uniform float ceilingValue;
uniform float floorValue;
uniform vec3 ceilingColor;
uniform vec3 ceilingColor1;


varying vec3 v_position;

void main(void) {
    vec4 output1 = world * vec4(position, 1.0);
    vec4 output0 = worldViewProjection * output1;
    gl_Position = output0;
    v_position = position;

}