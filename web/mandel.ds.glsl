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


// double precise complex: vec4,
// xy - float, float is for real
// zw - float, float is for im
vec2 ds_set(in float a) { return vec2(a, 0.0); }

 // set complex from simple a
vec4 ds_complex_set(in vec2 a) { return vec4(a.x, 0.0, a.y, 0.0); }

vec2 ds_add (in vec2 dsa, in vec2 dsb) {
  vec2 dsc;
  float t1, t2, e;

  t1 = dsa.x + dsb.x;
  e = t1 - dsa.x;
  t2 = ((dsb.x - e) + (dsa.x - (t1 - e))) + dsa.y + dsb.y;

  dsc.x = t1 + t2;
  dsc.y = t2 - (dsc.x - t1);
  return dsc;
}

vec2 ds_mul (in vec2 dsa, in vec2 dsb) {
  vec2 dsc;
  float c11, c21, c2, e, t1, t2;
  float a1, a2, b1, b2, cona, conb, split = 8193.;

  cona = dsa.x * split;
  conb = dsb.x * split;
  a1 = cona - (cona - dsa.x);
  b1 = conb - (conb - dsb.x);
  a2 = dsa.x - a1;
  b2 = dsb.x - b1;

  c11 = dsa.x * dsb.x;
  c21 = a2 * b2 + (a2 * b1 + (a1 * b2 + (a1 * b1 - c11)));

  c2 = dsa.x * dsb.y + dsa.y * dsb.x;

  t1 = c11 + c2;
  e = t1 - c11;
  t2 = dsa.y * dsb.y + ((c2 - e) + (c11 - (t1 - e))) + c21;

  dsc.x = t1 + t2;
  dsc.y = t2 - (dsc.x - t1);

  return dsc;
}

vec4 mult(in vec4 a, in vec4 b) {
  return vec2(
    ds_mul(a.xy, b.xy) - a.y*b.y,
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
 * k.y - iteration
 * k.z - is it outside
 */
void pallete(in vec2 pos, in vec4 k);
void main() {
    pallete(v_texCoord, getKmax(v_texCoord));
}
  