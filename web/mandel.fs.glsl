//1M zoom
#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif

uniform lowp vec4 u_color;
uniform vec2 u_viewport;
uniform vec2 u_c;
uniform float u_spot_radius; // calc from current range
uniform vec4 u_range; // xy - min, zw - max

varying vec2 v_texCoord;
#define MAXK 250

vec2 mult(in vec2 a, in vec2 b) {
  return vec2(
    a.x*b.x - a.y*b.y,
    a.x*b.y + a.y*b.x
  );
}


vec2 f( in vec2 z, in vec2 c ) {
  vec2 newr = mult(z, z) + c;
  return newr;
}

float R( in vec2 c ) {
  return (1.0 + sqrt( 1.0 + 4.0*length(c) )) / 2.0;
}

vec4 getKmax( in vec2 c ) {
  vec4 res = vec4(0.01, 0.01, 0.01, 0.0);

  vec2 z = c;

  for (int k = 0; k < MAXK; k++ ) {
    z = f( z, c );

    if ( length(z) >= 2.0 ) {
      res.x = length(z);
      res.y = float(k);
      //res.z = R(c);
      return res; // return k где  мы расходимся в бесконечность
    }
  }

  res.x = length(z);
  res.y = float(MAXK);
  return res;

}
void main() {
    vec2 pos = vec2(
      (v_texCoord.x),// / (u_range.z - u_range.x),
      (v_texCoord.y)// / (u_range.w - u_range.y)
    );
    vec4 k = getKmax(pos);
    float maxr = R(pos); 
    gl_FragColor.r = 0.0;
    gl_FragColor.g = k.y / float(MAXK);
    gl_FragColor.b = k.x >= maxr ? (k.x - maxr) * (k.y / float(MAXK)) / maxr : k.x / maxr;
    gl_FragColor.a = 1.0;

  // spot
    if( length(pos-u_c) <= u_spot_radius ) {
      gl_FragColor.r = 1.0;
      gl_FragColor.g *= .5;
      gl_FragColor.b *= .5;
    }

}
  