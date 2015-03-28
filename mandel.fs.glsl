
precision highp  float;/// looks like it doest affect anything

uniform lowp vec4 u_color;
uniform vec2 u_viewport;
//uniform vec2 u_minrange;
//uniform vec2 u_maxrange;
uniform vec4 u_range; // xy - min, zw - max
uniform lowp int u_kmax;
varying vec2 v_texCoord;

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

vec4 getKmax( in vec2 c ) {
  vec4 res = vec4(0.0, 0.0, 0.0, 0.0);

  vec2 z = c;

  for (int k = 0; k < 500; k++ ) {
    z = f( z, c );

    if ( length(z) >= 2.0 ) {
      res.x = length(z);
      res.y = float(k);
      return res; // return k где  мы расходимся в бесконечность
    }
  }

  res.x = length(z);
  return res;

}
void main() {
    vec2 pos = vec2(
      (v_texCoord.x),// / (u_range.z - u_range.x),
      (v_texCoord.y)// / (u_range.w - u_range.y)
    );
    vec4 k = getKmax(pos);
    gl_FragColor.r = (k.r - 2.0) / 2.0;
    gl_FragColor.g = k.g / float(u_kmax);

    gl_FragColor.a = 1.0;
}
  