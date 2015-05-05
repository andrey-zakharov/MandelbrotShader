//1M zoom
#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif

uniform vec2 u_viewport;
uniform vec2 u_c;
uniform float u_spot_radius; // calc from current range
uniform vec4 u_range; // xy - min, zw - max

varying vec2 v_texCoord;
varying vec2 v_range;
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
  float dist = 1e20;
  vec2 point = vec2(-0.5, 0.0);
  

  vec4 res = vec4(0.01, 0.01, 0.01, 0.0);

  vec2 z = c;

  for (int k = 0; k < MAXK; k++ ) {
    z = f( z, c );
    dist = min( dist, length(z-point) );

    if ( z.x*z.x + z.y*z.y >= 4.0 ) {
      res.x = length(z);
      res.y = float(k);
      res.z = 1.0;
      res.a = dist;
      //res.z = R(c);
      return res; // return k где  мы расходимся в бесконечность
    }
  }

  res.x = length(z);
  res.y = float(MAXK);
  res.z = 0.0;
  res.a = dist;
  return res;

}
/**
 * k.x - length of z
 * k,y - iteration
 * k.z - is it outside
 */
void pallete(in vec2 pos, in vec4 k);
void main() {
    pallete(v_texCoord, getKmax(v_range));
}
