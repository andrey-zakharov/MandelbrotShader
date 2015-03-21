part of mandel;


/// entire field of view
class Field implements Tweenable {
  var gl;
  Program program; // shaders

  Field(this.gl) {
    program = initShaders();
    initBuffers();
    initUniforms();
  }

  draw() {

    gl.clearColor(0.0, 0.0, 0.0, 1);
    gl.clear(RenderingContext.COLOR_BUFFER_BIT);
    gl.drawArrays(RenderingContext.TRIANGLES, 0, vertices.length ~/ _dims);
  }

  var _fractalTexture;

  final int _dims = 2;

  static num planeSize = 1.0; // around 0,0

  final Float32List vertices = new Float32List.fromList([
    -planeSize, -planeSize,
    planeSize, planeSize,
    -planeSize, planeSize,

    -planeSize, -planeSize,
    planeSize, planeSize,
    planeSize, -planeSize
  ]);

  Rectangle range = new Rectangle(-2.0, -1.5, 3, 3);

  Buffer vertexBuffer;
  Buffer rangeBuffer;


  initShaders() {

    Shader vs = gl.createShader(RenderingContext.VERTEX_SHADER);
    gl.shaderSource(vs, querySelector("#shader-vx").text);
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

  initUniforms() {


    UniformLocation uColor = gl.getUniformLocation(program, "u_color");
    UniformLocation viewport = gl.getUniformLocation(program, "u_viewport");
    UniformLocation kmax = gl.getUniformLocation(program, "u_kmax");
    UniformLocation u_range = gl.getUniformLocation(program, "u_range");
// Как и для очистки холста он задаётся в формате RGBA
    gl.uniform2f(viewport, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.uniform4f(u_range, range.left, range.bottom, range.right, range.top);
    gl.uniform2fv(uColor, new Float32List.fromList([0.5, 0.9, 0.9, 1.0]));
    gl.uniform1i(kmax, 20);
  }



  initBuffers() {

    int aPosition = gl.getAttribLocation(program, "a_position");
    int aRange = gl.getAttribLocation(program, "a_range");

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(RenderingContext.ARRAY_BUFFER, vertexBuffer);
    gl.bufferDataTyped(RenderingContext.ARRAY_BUFFER, vertices, RenderingContext.STATIC_DRAW);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, _dims, RenderingContext.FLOAT, false, 0, 0);

    rangeBuffer = gl.createBuffer();
    loadRangeBuffer();

    gl.bindBuffer(RenderingContext.ARRAY_BUFFER, rangeBuffer);
    gl.enableVertexAttribArray(aRange);
    gl.vertexAttribPointer(aRange, _dims, RenderingContext.FLOAT, false, 0, 0);
  }

  loadRangeBuffer() {
    gl.bindBuffer(RenderingContext.ARRAY_BUFFER, rangeBuffer);
    Float32List rangeList = new Float32List.fromList([
        range.left, range.bottom,
        range.right, range.top,
        range.left, range.top,

        range.left, range.bottom,
        range.right, range.top,
        range.right, range.bottom

    ]);
    gl.bufferDataTyped(RenderingContext.ARRAY_BUFFER, rangeList, RenderingContext.STATIC_DRAW);
    gl.bindBuffer(RenderingContext.ARRAY_BUFFER, null);
  }

  setRange(Rectangle newRange) {
    this.range = newRange;
    loadRangeBuffer();
  }

  // unused
  initTexture() {

    _fractalTexture = gl.createTexture();
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }


  @override
  int getTweenableValues(Tween tween, int tweenType, List<num> returnValues) {
    switch ( tweenType ) {
      case TWEEN_DRAG:
        returnValues[0] = this.range.left;
        returnValues[1] = this.range.top;
        return 2;
    }

    return 0;
  }

  @override
  void setTweenableValues(Tween tween, int tweenType, List<num> newValues) {
    switch (tweenType) {
      case TWEEN_DRAG:
        moveViewport(newValues[0], newValues[1]);
    }
  }

  Point scaleToRange( Point drag ) {
    return new Point (
      drag.x * range.width / canvas.clientWidth,
      drag.y * range.height / canvas.clientHeight
    );
  }

  void moveViewport( num x, num y ) {
    setRange( new Rectangle(x, y, range.width, range.height ));
  }

  static const int TWEEN_DRAG = 1;
  static const int TWEEN_DRAG_Y = 2;
}