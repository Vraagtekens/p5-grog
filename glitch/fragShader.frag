precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D texture;
uniform float noise;

void main() {
        vec2 uv = vTexCoord;
        uv.y = 1.0 - uv.y;
        vec2 offset = vec2(noise, 0.0);

        vec4 color = texture2D(texture, vTexCoord);
        color.r = texture2D(texture, uv + offset).r;
        color.g = texture2D(texture, uv).g;
        color.b = texture2D(texture, uv - offset).b;

        // gl_FragColor = vec4(vTexCoord.x, vTexCoord.y, 1.0, 1.0); 
        gl_FragColor = color;
}