#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif

attribute vec2 a_texture;
attribute vec2 a_position;
attribute vec2 a_range;

varying vec2 v_texCoord; // 0.0 ... 1.0
varying vec2 v_range;

void main()
{
    v_range = a_range;
    v_texCoord = a_texture;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
