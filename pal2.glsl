/**
 * k.x - length of z
 * k,y - iteration
 * k.z - is it outside
 */
void pallete(vec2 pos, vec4 k) {

 if (k.z != 0.0) {
    gl_FragColor.r = sin(k.y / 3.0);
    gl_FragColor.g = cos(k.y / 6.0);
    gl_FragColor.b = cos(k.y / 12.0 + 3.14 / 4.0);
    gl_FragColor.a = 1.0;
  } else {
    gl_FragColor = vec4(0.05, 0.05, 0.05, 1.0);
  }
}
