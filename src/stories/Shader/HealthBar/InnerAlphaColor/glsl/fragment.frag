precision highp float;

varying vec2 vUV;

uniform float health;

// Градиент между двумя цветами
vec3 lerp(vec3 colorOne, vec3 colorTwo, float value) {
    return (colorOne + value*(colorTwo-colorOne));
}

// Диапазон градиента
float inverseLerp(float start, float end, float value) {
    return (value-start)/(end-start);
}

// Рамки от 0.0 до 1.0
float saturate(float value) {
    return max(0.0, min(1.0, value));
}

void main(void) {
    vec3 background = vec3(0.0, 0.0, 0.0);
    vec3 red = vec3(1.0, 0.0, 0.0);
    vec3 green = vec3(0.0, 1.0, 0.0);

    // говорим зафиксировать значения на координатах, за их пределами изменения не будут происходить
    float inverseLerpHealth = inverseLerp(0.2, 0.8, health);

    //  дело в том что в inverseLerp выходит за граицы 0 и 1
    float saturateHealthClor = saturate(inverseLerpHealth);

    vec3 healthBarColor = lerp(red, green, saturateHealthClor);

    //    float byPart = floor(vUV.x * 8.0) / 8.0;
    //    vec3 healthBarMask = health > byPart ? healthBarColor : background;
    vec4 healthBar = health > vUV.x ? vec4(healthBarColor, 1.0) : vec4(background, 1.0);

    gl_FragColor = healthBar;
}