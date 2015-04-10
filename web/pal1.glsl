void pallete(vec2 pos, vec4 k) {

    float maxr = R(pos); 
    gl_FragColor.r = 0.0;
    gl_FragColor.g = k.y / float(MAXK);
    gl_FragColor.b = k.x >= maxr ? (k.x - maxr) * (k.y / float(MAXK)) / maxr : k.x / maxr;
    gl_FragColor.a = 1.0;

}
