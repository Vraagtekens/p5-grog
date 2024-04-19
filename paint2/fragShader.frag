precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D texture;
uniform float noise;

void main() {
        vec2 uv = vTexCoord;
        uv.y = 1.0 - uv.y;
        vec2 offset = vec2(noise, 0.0);

        vec4 color = texture2D(texture, uv);

        // color.r = texture2D(texture, uv + offset).r;
        // color.g = texture2D(texture, uv).g;
        // color.b = texture2D(texture, uv - offset).b;

        // gl_FragColor = vec4(vTexCoord.x, vTexCoord.y, 1.0, 1.0); 
        // gl_FragColor = color; 

        vec2 imageResolution = vec2(600.0, 400.0);
        imageResolution = imageResolution / 10.0;
        vec2 texelSize = 0.0 / imageResolution;

        // const float kernelSize = 0.0;
        // const float kernelSize = 0.1;
        const float kernelSize = 0.5;
        // const float kernelSize = 2.0;
        // const float kernelSize = 3.0;
        vec3 boxBlurColor = vec3(0.0);
        // note: if kernelSize == 1.0, then boxBlurDivisor == 9.0
        float boxBlurDivisor = pow(2.0 * kernelSize + 1.0, 2.0);
        for (float i = -kernelSize; i <= kernelSize; i++) {
            for (float j = -kernelSize; j <= kernelSize; j++) {
                vec4 texture2 = texture2D(texture, uv + vec2(i, j) * texelSize);
                boxBlurColor = boxBlurColor + texture2.rgb;
            }
        }
        boxBlurColor = boxBlurColor / boxBlurDivisor;

        // gl_FragColor = vec4(vTexCoord.x, vTexCoord.y, 1.0, 1.0); 
        // gl_FragColor = vec4(boxBlurColor, 1.0); 

        gl_FragColor = vec4(mix(color.rgb, boxBlurColor, 0.7), 1.0);
        // gl_FragColor = vec4(boxBlurColor, 1.0);
        // gl_FragColor = vec4(color.rgb, 1.0);


}