precision highp float;

varying vec2 vUV;

uniform float health;
uniform sampler2D textureRainbow;

void main(void) {
    vec3 background = vec3(0.0, 0.0, 0.0);
    //    Нужно научиться не повторять (по умолчанию) текстуру в шейдере, а растянуть
    //    vec4 rainbowValue = texture2D(textureRainbow, vec2(health, vUV.y));
    vec4 rainbowValue = texture2D(textureRainbow, vec2(abs(health - 0.01), vUV.y));

    vec4 healthBar = health > vUV.x ? rainbowValue : vec4(background, 1.0);

    gl_FragColor = healthBar;
}