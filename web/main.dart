library mandel;
import 'dart:html';
import 'dart:web_gl';
import 'dart:typed_data';

Element canvas;
var gl;

final int dims = 2;

final Float32List vertices = new Float32List.fromList( [
      -1.0, -1.0,
       1.0,  1.0,
      -1.0,  1.0,

      -1.0, -1.0,
       1.0,  1.0,
       1.0, -1.0
] );

main() {
  initGL();
  initGeom(initShaders());
  draw();
}

status( String message ) {
  var status = querySelector('#status');
  status.innerHtml = '<p>${message}</p>';
}

initGeom(Program program) {

  //Создаём буфер и загружаем в него координаты
  gl.bindBuffer(RenderingContext.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferDataTyped(RenderingContext.ARRAY_BUFFER, vertices, RenderingContext.STATIC_DRAW);

// Устанавливаем позицию, которая будет передана в вершинный шейдер
  int aPosition = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, dims, RenderingContext.FLOAT, false, 0, 0);

//Очищаем холст заливая его новым цветом(RedGreenBlueAlpha)
  gl.clearColor(0.0, 0.0, 0.0, 1);
  gl.clear(RenderingContext.COLOR_BUFFER_BIT);

// Устанавливаем цвет, который будет передан фрагментному шейдеру
  UniformLocation uColor = gl.getUniformLocation(program, "uColor");
// Как и для очистки холста он задаётся в формате RGBA
  gl.uniform4fv(uColor, new Float32List.fromList([0.5, 0.9, 0.9, 1.0]));
  
  gl.uniform2fv(uColor, new Float32List.fromList([0.5, 0.9, 0.9, 1.0]));
}

initShaders() {



  String vsSource = """
    attribute vec2 aPosition;
    varying vec2 v_texCoord;

    void main() 
    {
        v_texCoord = aPosition;
        gl_Position.xy = aPosition;

    }""";

// Фрагментный шейдер
  String fsSource = """
    precision mediump float;
    uniform vec4 uColor;
    void main() {
        gl_FragColor = uColor;
    }""";
//Шейдеры написаны, теперь их надо скомпилировать и загрузить в контекст.
//Компилируем
  Shader vs = gl.createShader(RenderingContext.VERTEX_SHADER);
  gl.shaderSource(vs, vsSource);
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
