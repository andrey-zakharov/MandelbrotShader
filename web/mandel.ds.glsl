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

// Substract: res = ds_sub(a, b) => res = a - b
vec2 ds_sub (vec2 dsa, vec2 dsb) {
  vec2 dsc;
  float e, t1, t2;

  t1 = dsa.x - dsb.x;
  e = t1 - dsa.x;
  t2 = ((-dsb.x - e) + (dsa.x - (t1 - e))) + dsa.y - dsb.y;

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

// Compare: res = -1 if a < b
//              = 0 if a == b
//              = 1 if a > b
float ds_compare(vec2 dsa, vec2 dsb) {
  if (dsa.x < dsb.x) return -1.;
  else if (dsa.x == dsb.x) {
    if (dsa.y < dsb.y) return -1.;
    else if (dsa.y == dsb.y) return 0.;
      else return 1.;
  } else return 1.;
}

vec4 complex_mult(in vec4 a, in vec4 b) {
  vec2 mxy = ds_sub( ds_mul(a.xy, b.xy), ds_mul(a.zw, b.zw) );
  vec2 mzw = ds_add( ds_mul(a.xy, b.zw), ds_mul(a.zw, b.xy) );
  return vec4( mxy, mzw );
}

vec4 complex_add( in vec4 a, in vec4 b ) {
  return vec4( ds_add(a.xy, b.xy), ds_add( a.zw, b.zw ) );
}

vec2 complex_sqlen( in vec4 a ) {
  return ds_add( ds_mul( a.xy, a.xy ), ds_mul( a.zw, a.zw ) );
}

vec4 f( in vec4 z, in vec4 c ) {
  return complex_add( complex_mult(z, z), c );
}

float R( in vec2 c ) {
  return (1.0 + sqrt( 1.0 + 4.0*length(c) )) / 2.0;
}

vec4 getKmax( in vec4 c ) {
  float dist = 1e20;
  vec2 point = vec2(-0.5, 0.0);
  

  vec4 res = vec4(0.01, 0.01, 0.01, 0.0);

  vec4 z = c;

  for (int k = 0; k < MAXK; k++ ) {
    z = f( z, c );
    //dist = min( dist, length(z-point) );

    if ( ds_compare(complex_sqlen(z), vec2(4.0, 0.0)) > .0 ) {
      res.x = length(z.xz); // get rounded RE (x) and IM(z) parts
      res.y = float(k);
      res.z = 1.0;
      res.a = dist;
      //res.z = R(c);
      return res; // return k где  мы расходимся в бесконечность
    }
  }

  res.x = length(z.xz);
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
    pallete(v_texCoord, getKmax(vec4(v_texCoord.x, 0.0, v_texCoord.y, 0.0)));
}
  