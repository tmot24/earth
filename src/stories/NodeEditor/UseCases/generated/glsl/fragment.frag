// Fragment shader
#if defined(WEBGL2) || defines(WEBGPU)
precision highp sampler2DArray;
#endif
precision highp float;

uniform float u_Float;

varying vec3 v_position;


const float SKEWFACTOR = 1.0/3.0;
const float UNSKEWFACTOR = 1.0/6.0;
const float SIMPLEX_CORNER_POS = 0.5;
const float SIMPLEX_TETRAHADRON_HEIGHT = 0.70710678118654752440084436210485;

float SimplexPerlin3D(vec3 P){
    float u_ceilingValue = 1.0;
    float u_floorValue = 0.0;
    vec3 u_ceilingColor = vec3(0.30196078431372547, 0.32941176470588235, 0.8705882352941177);
    vec3 u_ceilingColor1 = vec3(0.4235294117647059, 0.09411764705882353, 0.06666666666666667);

    P.x = P == vec3(0., 0., 0.) ? 0.00001 : P.x;
    P *= SIMPLEX_TETRAHADRON_HEIGHT;
    vec3 Pi = floor(P + dot(P, vec3(SKEWFACTOR)));    vec3 x0 = P - Pi + dot(Pi, vec3(UNSKEWFACTOR));
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 Pi_1 = min(g.xyz, l.zxy);
    vec3 Pi_2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - Pi_1 + UNSKEWFACTOR;
    vec3 x2 = x0 - Pi_2 + SKEWFACTOR;
    vec3 x3 = x0 - SIMPLEX_CORNER_POS;
    vec4 v1234_x = vec4(x0.x, x1.x, x2.x, x3.x);
    vec4 v1234_y = vec4(x0.y, x1.y, x2.y, x3.y);
    vec4 v1234_z = vec4(x0.z, x1.z, x2.z, x3.z);
    Pi.xyz = Pi.xyz - floor(Pi.xyz * (1.0 / 69.0)) * 69.0;
    vec3 Pi_inc1 = step(Pi, vec3(69.0 - 1.5)) * (Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi_inc1.xy) + vec2(50.0, 161.0).xyxy;
    Pt *= Pt;
    vec4 V1xy_V2xy = mix(Pt.xyxy, Pt.zwzw, vec4(Pi_1.xy, Pi_2.xy));
    Pt = vec4(Pt.x, V1xy_V2xy.xz, Pt.z) * vec4(Pt.y, V1xy_V2xy.yw, Pt.w);
    const vec3 SOMELARGEFLOATS = vec3(635.298681, 682.357502, 668.926525);
    const vec3 ZINC = vec3(48.500388, 65.294118, 63.934599);
    vec3 lowz_mods = vec3(1.0 / (SOMELARGEFLOATS.xyz + Pi.zzz * ZINC.xyz));
    vec3 highz_mods = vec3(1.0 / (SOMELARGEFLOATS.xyz + Pi_inc1.zzz * ZINC.xyz));
    Pi_1 = (Pi_1.z < 0.5) ? lowz_mods : highz_mods;
    Pi_2 = (Pi_2.z < 0.5) ? lowz_mods : highz_mods;
    vec4 hash_0 = fract(Pt * vec4(lowz_mods.x, Pi_1.x, Pi_2.x, highz_mods.x)) - 0.49999;
    vec4 hash_1 = fract(Pt * vec4(lowz_mods.y, Pi_1.y, Pi_2.y, highz_mods.y)) - 0.49999;
    vec4 hash_2 = fract(Pt * vec4(lowz_mods.z, Pi_1.z, Pi_2.z, highz_mods.z)) - 0.49999;
    vec4 grad_results = inversesqrt(hash_0 * hash_0 + hash_1 * hash_1 + hash_2 * hash_2) * (hash_0 * v1234_x + hash_1 * v1234_y + hash_2 * v1234_z);
    const float FINAL_NORMALIZATION = 37.837227241611314102871574478976;
    vec4 kernel_weights = v1234_x * v1234_x + v1234_y * v1234_y + v1234_z * v1234_z;
    kernel_weights = max(0.5 - kernel_weights, 0.0);
    kernel_weights = kernel_weights*kernel_weights*kernel_weights;
    return dot(kernel_weights, grad_results) * FINAL_NORMALIZATION;
}

#include<helperFunctions>



void main(void) {
    float u_Float1 = 2.0;
    float u_ceilingValue = 1.0;
    float u_floorValue = 0.0;
    vec3 u_ceilingColor = vec3(0.30196078431372547, 0.32941176470588235, 0.8705882352941177);
    vec3 u_ceilingColor1 = vec3(0.4235294117647059, 0.09411764705882353, 0.06666666666666667);
    vec3 output10 = v_position * u_Float;
    float output9 = SimplexPerlin3D(output10);
    float output8 = output9 * u_Float1;
    vec3 xyz3 = vec3(output8, 0.0, 0.0).xyz;
    float x = xyz3.x;
    float output7 = step(u_ceilingValue, x);
    float output12 = -1.0 * x;
    float output11 = step(u_floorValue, output12);
    float output6 = output7 + output11;
    float output5 = 1. - output6;
    float output4 = output5 * x;
    vec3 gradientTempColor = vec3(0, 0, 0);
    float gradientTempPosition;
    gradientTempPosition = clamp((output4 - 0.0) / (1.0 -  0.0), 0.0, 1.0) * step(1.0, 1.0);
    gradientTempColor = mix(gradientTempColor, vec3(1, 1, 1), gradientTempPosition);
    vec3 output3 = gradientTempColor;
    vec3 output14 = u_ceilingColor * output7;
    vec3 output15 = u_ceilingColor1 * output11;
    vec3 output13 = output14 + output15;
    vec3 output2 = output3 + output13;
    gl_FragColor = vec4(output2, 1.0);
    #ifdef CONVERTTOLINEAR0
    gl_FragColor = toLinearSpace(gl_FragColor);
    #endif
    #ifdef CONVERTTOGAMMA0
    gl_FragColor = toGammaSpace(gl_FragColor);
    #endif

}