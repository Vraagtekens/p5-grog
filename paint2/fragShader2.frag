precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D texture;
uniform float noise;

void main() {
        vec2 uv = vTexCoord;
        uv.y = 1.0 - uv.y;
        vec2 offset = vec2(noise, 0.0);

        vec4 color = texture2D(texture, uv);


        // gl_FragColor = vec4(vTexCoord.x, vTexCoord.y, 1.0, 1.0); 
        vec3 color2 = vec3(vTexCoord.x, vTexCoord.y, 1.0);
        // gl_FragColor = vec4(mix(color.rgb, color2, 0.5), 1.0);
        gl_FragColor = vec4(color.rgb, 1.0);
}