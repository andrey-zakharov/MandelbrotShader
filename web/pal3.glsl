/**
 * k.x - length of z
 * k.y - iteration
 * k.z - is it outside
 */
void pallete(vec2 pos, vec4 k) {
    float v = (float(k.y) - (log(log(k.x)) / log(2.0))) / float(MAXK);
    gl_FragColor = vec4(sin(v * 3.0), sin(v*4.0), sin(v*5.0), 1.0);
}
