
precision highp  float;

attribute vec2 a_position;
attribute vec2 a_range;
varying vec2 v_texCoord;

void main()
{
    v_texCoord = a_range;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
