precision highp float;

varying vec2 vUV;

uniform sampler2D textureGrass;
uniform sampler2D textureSand;
uniform sampler2D textureUssr;

// Градиент между двумя текстурами
vec4 lerp(vec4 textureOne, vec4 textureTwo, float pattern) {
    return (textureOne + pattern*(textureTwo-textureOne));
}

void main(void) {
    vec4 grass = texture2D(textureGrass, vUV);
    vec4 sand = texture2D(textureSand, vUV);
    float pattern = texture2D(textureUssr, vUV).x;

    vec4 lerpTexture = lerp(sand, grass, pattern);

    gl_FragColor = lerpTexture;
}