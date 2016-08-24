//148k -zoom on mediump
#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
uniform lowp vec4 u_color;
uniform vec2 u_viewport;
uniform vec4 u_range; // xy - min, zw - max
uniform vec2 u_c;
uniform float u_R; // precalculate
varying vec2 v_texCoord;
varying vec2 v_range;
#define KMAX 250

vec2 mult(in vec2 a, in vec2 b) {
  return vec2(
    a.x*b.x - a.y*b.y,
    a.x*b.y + a.y*b.x
  );
}


vec2 f( in vec2 z ) {
  vec2 newr = mult(z, z) + u_c;
  return newr;
}

float R( in vec2 c ) {
  return (1.0 + sqrt( 1.0 + 4.0*length(c) )) / 2.0;
}

vec4 getKmax( in vec2 p ) {
  vec4 res = vec4(0.0, 0.0, 0.01, 0.0);

  vec2 z = p;

  for(int i = 0; i < KMAX; i++) {
    z = f( z );

    if ( length(z) > u_R ) {
      res.x = length(z) / u_R;
      res.y = float(i);
      //res.z = R(c);
      return res;
    }
  }

  res.x = length(z) / u_R;
  res.y = float(KMAX);
  return res;

}
void main() {
    vec2 pos = vec2(
      (v_range.x),// / (u_range.z - u_range.x),
      (v_range.y)// / (u_range.w - u_range.y)
    );
    vec4 k = getKmax(pos);
    gl_FragColor.a = 1.0;

//    if( k.y < float(u_kmax) ) { // out of set
      float value = k.y / float(KMAX);
      gl_FragColor.r = value/3.0;
      gl_FragColor.g = 1.0-value;
      gl_FragColor.b = k.x;

/*  } else {
      gl_FragColor.b = k.x;
      gl_FragColor.g = k.g / float(u_kmax);
      gl_FragColor.r = 0.0;
    }*/
    
}
  