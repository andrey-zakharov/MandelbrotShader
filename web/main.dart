library mandel;
import 'dart:html';
import 'dart:web_gl';
import 'dart:typed_data';

Element canvas;
var gl;

final int dims = 2;

num planeSize = 1.0; // around 0,0

final Float32List vertices = new Float32List.fromList( [
      -planeSize, -planeSize,
       planeSize,  planeSize,
      -planeSize,  planeSize,

      -planeSize, -planeSize,
       planeSize,  planeSize,
       planeSize, -planeSize
] );

num x1 = -2.0, y1 = -1.5, x2 = 1.0, y2 = 1.5;

Float32List range = new Float32List.fromList( [
                                               x1, y1,
                                               x2, y2,
                                               x1, y2, 
                                               x1, y1,
                                               x2, y2,
                                               x2, y1
                                       ] );


Buffer vertexBuffer;
Buffer rangeBuffer;


main() {
  initGL();
  initGeom(initShaders());
  draw();
}

status( String message ) {
  var status = querySelector('#status');
  status.innerHtml = '<p>${message}</p>';
}

initBuffers(Program program) {
  int aPosition = gl.getAttribLocation(program, "a_position");
  int aRange = gl.getAttribLocation(program, "a_range");
  
  vertexBuffer = gl.createBuffer();
  gl.bindBuffer(RenderingContext.ARRAY_BUFFER, vertexBuffer);
  gl.bufferDataTyped(RenderingContext.ARRAY_BUFFER, vertices, RenderingContext.STATIC_DRAW);
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, dims, RenderingContext.FLOAT, false, 0, 0);
  
  rangeBuffer = gl.createBuffer();
  gl.bindBuffer(RenderingContext.ARRAY_BUFFER, rangeBuffer);
  gl.bufferDataTyped(RenderingContext.ARRAY_BUFFER, range, RenderingContext.STATIC_DRAW);
  gl.enableVertexAttribArray(aRange);
  gl.vertexAttribPointer(aRange, dims, RenderingContext.FLOAT, false, 0, 0);
}

initGeom(Program program) {

  // Устанавливаем позицию, которая будет передана в вершинный шейдер

  initBuffers(program);
                                


//Очищаем холст заливая его новым цветом(RedGreenBlueAlpha)
  gl.clearColor(0.0, 0.0, 0.0, 1);
  gl.clear(RenderingContext.COLOR_BUFFER_BIT);


  UniformLocation uColor = gl.getUniformLocation(program, "u_color");
  UniformLocation viewport = gl.getUniformLocation(program, "u_viewport");
  UniformLocation kmax = gl.getUniformLocation(program, "u_kmax");
  UniformLocation u_range = gl.getUniformLocation(program, "u_range");
// Как и для очистки холста он задаётся в формате RGBA
  gl.uniform2f(viewport,  canvas.width, canvas.height);
  gl.uniform4f(u_range, x1, y1, x2, y2);
  gl.uniform2fv(uColor, new Float32List.fromList([0.5, 0.9, 0.9, 1.0]));
  gl.uniform1i(kmax, 20);
}

initShaders() {

  Shader vs = gl.createShader(RenderingContext.VERTEX_SHADER);
  gl.shaderSource(vs,querySelector("#shader-vx").text );
  gl.compileShader(vs);
  if (!gl.getShaderParameter(vs, RenderingContext.COMPILE_STATUS)) {
    print(gl.getShaderInfoLog(vs));
    status(gl.getShaderInfoLog(vs));
    throw new Exception(gl.getShaderInfoLog(vs));
  }

  Shader fs = gl.createShader(RenderingContext.FRAGMENT_SHADER);
  //gl.shaderSource(fs, fsSource);
  gl.shaderSource(fs, querySelector("#shader-fx").text);
  gl.compileShader(fs);
  if (!gl.getShaderParameter(fs, RenderingContext.COMPILE_STATUS)) {
    print(gl.getShaderInfoLog(fs));
    status(gl.getShaderInfoLog(fs));
    throw new Exception(gl.getShaderInfoLog(fs));
  }

// Загружаем шейдеры в GPU
  Program p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  gl.useProgram(p);
  if (!gl.getProgramParameter(p, RenderingContext.LINK_STATUS)) {
    print(gl.getProgramInfoLog(p));
    status(gl.getShaderInfoLog(p));
    throw new Exception(gl.getShaderInfoLog(p));
  }

  return p;
}

initGL() {

  canvas = new Element.tag('canvas');
  //document.body.appendChild( container );
  document.body.children.add(canvas);
  canvas.width = canvas.parent.clientWidth;
  canvas.height = window.screen.height;
  gl = canvas.getContext("webgl");
  if (gl == null) gl = canvas.getContext("experimental-webgl");
  if (gl == null) {
    status('Простите, ваш браузер не поддерживает WebGl');
    return;
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
  status('');
}

initScene() {

}

draw() {
  gl.drawArrays(RenderingContext.TRIANGLES, 0, vertices.length ~/ dims);
}
