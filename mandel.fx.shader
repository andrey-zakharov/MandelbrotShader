      #ifdef GL_ES
            precision highp float;
      #endif

    uniform vec4 u_color;
    uniform vec2 u_viewport;
    uniform int u_kmax;
    varying vec2 v_texCoord;

    void main() {
        vec2 pos = vec2(
          (v_texCoord.x + 1.0) / 2.0,
          (v_texCoord.y + 1.0) / 2.0
        );
        vec4 k = getKmax(pos); 
        gl_FragColor.r = (k.r - 2.0) / 2.0;
        gl_FragColor.g = k.g / float(u_kmax);

        gl_FragColor.a = 1.0;
      }

    vec2 mult(vec2 a, vec2 b) {
      return vec2(
        a.x*b.x - a.y*b.y,
        a.x*b.y + a.y*b.x
      );
    }

    vec4 getKmax( vec2 c ) {
      vec4 res = vec4(0.0, 0.0, 0.0, 0.0);
      int k = 0;
      vec2 z = c;

      while ( k < u_kmax ) {
        z = f( z, c );

        if ( length(z) >= 2.0 ) {
          res.x = length(z);
          res.y = float(k);
          return res; // return k где  мы расходимся в бесконечность
        }
        k++;
      }

      res.x = length(z);
      return res;

    }

    vec2 f( vec2 z, vec2 c ) {
      vec2 newr = mult(z, z) + c;
      return newr;
    }