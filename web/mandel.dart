library mandel;
import 'dart:html';
import 'dart:web_gl';
import 'dart:typed_data';

Element canvas;
var gl;

main() {
  initGL();
  initGeom(initShaders());
  draw();
}

initGeom(Program program) {
  //Задаём координаты в трехмерном пространстве
  Float32List vertices = new Float32List.fromList(
      [-1.0, 1.0, 0.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
                       1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0]);
  //Создаём буфер и загружаем в него координаты
  gl.bindBuffer(RenderingContext.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferDataTyped(RenderingContext.ARRAY_BUFFER, vertices, RenderingContext.STATIC_DRAW);
//Указываем сколько вершин нарисовано
  int numItems = 4;
// Устанавливаем позицию, которая будет передана в вершинный шейдер
  int aPosition = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 3, RenderingContext.FLOAT, false, 0, 0);

//Очищаем холст заливая его новым цветом(RedGreenBlueAlpha)
  gl.clearColor(0.0, 0.0, 0.0, 1);
  gl.clear(RenderingContext.COLOR_BUFFER_BIT);

// Устанавливаем цвет, который будет передан фрагментному шейдеру
  UniformLocation uColor = gl.getUniformLocation(program, "uColor");
// Как и для очистки холста он задаётся в формате RGBA
  gl.uniform4fv(uColor, new Float32List.fromList([0.5, 0.9, 0.9, 1.0]));
}

initShaders() {



  String vsSource = """
    attribute vec3 aPosition;
    void main() 
    {
        gl_Position = vec4(aPosition, 1);
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
  Shader fs = gl.createShader(RenderingContext.FRAGMENT_SHADER);
  gl.shaderSource(fs, fsSource);
  gl.compileShader(fs);

// Загружаем шейдеры в GPU
  Program p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  gl.useProgram(p);
//Проверяем всё ли удачно скомпилировалось.
  if (!gl.getShaderParameter(vs, RenderingContext.COMPILE_STATUS)) {
    print(gl.getShaderInfoLog(vs));
  }

  if (!gl.getShaderParameter(fs, RenderingContext.COMPILE_STATUS)) {
    print(gl.getShaderInfoLog(fs));
  }

  if (!gl.getProgramParameter(p, RenderingContext.LINK_STATUS)) {
    print(gl.getProgramInfoLog(p));
  }

  return p;
}
initGL() {
  var status = querySelector('#status');
  canvas = new Element.tag('canvas');
  //document.body.appendChild( container );
  document.body.children.add(canvas);
  gl = canvas.getContext("webgl");
  if (gl == null) gl = canvas.getContext("experimental-webgl");
  if (gl == null) {
    status.innerHtml = '<p>Простите, ваш браузер не поддерживает WebGl</p>';
    return;
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
}

initScene() {

}

draw() {
  gl.drawArrays(RenderingContext.TRIANGLES, 0, 4);
}
