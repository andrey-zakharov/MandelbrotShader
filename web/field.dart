part of mandel;

enum Precise { SINGLE, DOUBLE, QUART }


class ShaderVertexAttribute {
  String attrName; //in shader
  
}

/// entire field of view
class Field implements Tweenable {
  RenderingContext gl;
  Program program; // shaders
  int kmax = 250;
  double zoom; 
  Point _currentC; // current const of Julia set
  
  Precise currentPrecise = Precise.SINGLE;
  //var _fractalTexture;
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
  
  final Float32List texCoords = new Float32List.fromList([
     .0,  .0,
    1.0, 1.0,
     .0, 1.0,
    
     .0,  .0,
    1.0, 1.0,
    1.0,  .0
  ]);

  Rectangle range = new Rectangle(-2.0, -1.5, 3, 3);

  Buffer vertexBuffer;
  Buffer rangeBuffer = null;

  Field(this.gl, String vertexShader, String fragmentShader) {
    program = initProgram(vertexShader, fragmentShader);
    initAttributes();
    initUniforms();
  }
  
  //void reset() { setRange(new Rectangle(-2.0, -1.5, 3, 3)); update(); }

  draw() {
    gl.clearColor(0.0, 0.0, 0.0, 1);
    gl.clear(RenderingContext.COLOR_BUFFER_BIT);
    gl.drawArrays(RenderingContext.TRIANGLES, 0, vertices.length ~/ _dims);
  }

  initProgram(String vshader, String fshader) {

    Shader vs = gl.createShader(RenderingContext.VERTEX_SHADER);
    gl.shaderSource(vs, vshader);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, RenderingContext.COMPILE_STATUS)) {
      print(gl.getShaderInfoLog(vs));
      status(gl.getShaderInfoLog(vs));
      throw new Exception(gl.getShaderInfoLog(vs));
    }

    Shader fs = gl.createShader(RenderingContext.FRAGMENT_SHADER);
    //gl.shaderSource(fs, fsSource);
    gl.shaderSource(fs, fshader);
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
    
    if (!gl.getProgramParameter(p, RenderingContext.LINK_STATUS)) {
      print(gl.getProgramInfoLog(p));
      status(gl.getProgramInfoLog(p));
      throw new Exception(gl.getProgramInfoLog(p));
    }
    
    gl.useProgram(p);

    return p;
  }
  
  updateFragmentShader(String fshader) {
    Shader fs = gl.createShader(RenderingContext.FRAGMENT_SHADER);
    //gl.shaderSource(fs, fsSource);
    gl.shaderSource(fs, fshader);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, RenderingContext.COMPILE_STATUS)) {
      print(gl.getShaderInfoLog(fs));
      status(gl.getShaderInfoLog(fs));
      throw new Exception(gl.getShaderInfoLog(fs));
    }
    
    if( program != null ) {
        var shaders = gl.getAttachedShaders(program);
        gl.detachShader(program, shaders[1]);
        gl.deleteShader(shaders[1]);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, RenderingContext.LINK_STATUS)) {
          print(gl.getProgramInfoLog(program));
          status(gl.getProgramInfoLog(program));
          throw new Exception(gl.getProgramInfoLog(program));
        }
        
        gl.useProgram(program);
        
    }
  }

  num R( Point c ) {
    return (1.0 + sqrt( 1.0 + 4.0*c.magnitude) ) / 2.0;
  }
  
  initUniforms() {


    UniformLocation uColor = gl.getUniformLocation(program, "u_color");
    UniformLocation viewport = gl.getUniformLocation(program, "u_viewport");
    UniformLocation u_kmax = gl.getUniformLocation(program, "u_kmax");
    UniformLocation u_range = gl.getUniformLocation(program, "u_range");
    
    setJuliaConst(new Point( -0.8, 0.156));
      //var c = new Point( -0.74543, 0.11301 );
      //gl.uniform2f(u_c, -0.8, 0.156);
      //gl.uniform2f(u_c,  0.285,  0.01);
     // gl.uniform2f(u_c,  -0.0085 , 0.71);
    
    gl.uniform2f(viewport, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.uniform4f(u_range, range.left, range.bottom, range.right, range.top);
    gl.uniform2fv(uColor, new Float32List.fromList([0.5, 0.9, 0.9, 1.0]));
    if(u_kmax!=null) { gl.uniform1i(u_kmax, kmax); }
  }



  initAttributes() {
    _initVertexAttribute(program, "a_texture", texCoords, itemsPerVertex: _dims );
    _initVertexAttribute(program, "a_position", vertices, itemsPerVertex: _dims );
    rangeBuffer = _initVertexAttribute(program, "a_range", _getRangeBuffer(), itemsPerVertex: _dims );
  }

  Buffer _initVertexAttribute(Program program, String attrName, Float32List data,
                       {itemsPerVertex: 4, type: RenderingContext.FLOAT} ) {
    int idx = gl.getAttribLocation(program, attrName);
    
    if( idx == -1 ) {
      print("No such attribute: \"${attrName}\" in program ${program}");
      var an = gl.getProgramParameter(program, RenderingContext.ACTIVE_ATTRIBUTES);
      
      for(int i = 0; i < an; i++ ) {
        ActiveInfo ai = gl.getActiveAttrib(program, i);
        print("${ai.type} ${ai.name} ${ai.size}");
      }
      
      Shader vs = gl.getAttachedShaders(program)
        .firstWhere((sh) => 
            gl.getShaderParameter(sh, RenderingContext.SHADER_TYPE) == RenderingContext.VERTEX_SHADER);
      print(gl.getShaderSource(vs));
      return null;
    }
    
    //print("${attrName} = ${idx}");
    
    Buffer buffer = gl.createBuffer();
    gl.bindBuffer(RenderingContext.ARRAY_BUFFER, buffer);
    gl.bufferData(RenderingContext.ARRAY_BUFFER, data, RenderingContext.STATIC_DRAW);
    gl.vertexAttribPointer(idx, itemsPerVertex, type, false, 0, 0);
    gl.enableVertexAttribArray(idx);
    gl.bindBuffer(RenderingContext.ARRAY_BUFFER, null);
    return buffer;
  }
  
  _loadData(Buffer buffer, var data) {
      gl.bindBuffer(RenderingContext.ARRAY_BUFFER, buffer);
      gl.bufferData(RenderingContext.ARRAY_BUFFER, data, RenderingContext.STATIC_DRAW);
      gl.bindBuffer(RenderingContext.ARRAY_BUFFER, null);
  }
  
  _getRangeBuffer() => new Float32List.fromList([
    range.left, range.bottom,
    range.right, range.top,
    range.left, range.top,

    range.left, range.bottom,
    range.right, range.top,
    range.right, range.bottom
  ]);

  _loadRangeBuffer() => _loadData(rangeBuffer, _getRangeBuffer());
  
  num getZoom() => 1 / range.width;
  
  setRange(Rectangle newRange) {
    
    num prevZoom = this.getZoom();
    this.range = newRange;
    if( prevZoom < 1000.0 && getZoom() >= 1000.0 ) { // fired
      //changePrecise;  
    }
    
    _loadRangeBuffer();
    setSpotRadius((this.range.width+this.range.height)/500.0);
  }
  
  setSpotRadius(double radius) {
    UniformLocation u_spot = gl.getUniformLocation(program, "u_spot_radius");
    if( u_spot != null ) {
      gl.uniform1f(u_spot, radius);
    }
  }


  // unused
  initTexture() {

    //_fractalTexture = gl.createTexture();
    gl.texParameteri(RenderingContext.TEXTURE_2D, RenderingContext.TEXTURE_MIN_FILTER, RenderingContext.NEAREST);
    gl.texParameteri(RenderingContext.TEXTURE_2D, RenderingContext.TEXTURE_MAG_FILTER, RenderingContext.NEAREST);
    gl.texParameteri(RenderingContext.TEXTURE_2D, RenderingContext.TEXTURE_WRAP_S, RenderingContext.CLAMP_TO_EDGE);
    gl.texParameteri(RenderingContext.TEXTURE_2D, RenderingContext.TEXTURE_WRAP_T, RenderingContext.CLAMP_TO_EDGE);
  }


  @override
  int getTweenableValues(Tween tween, int tweenType, List<num> returnValues) {
    switch ( tweenType ) {
      case TWEEN_DRAG:
        returnValues[0] = this.range.left;
        returnValues[1] = this.range.top;
        return 2;
      case TWEEN_ZOOM:
        returnValues[0] = this.range.left;
        returnValues[1] = this.range.top;
        returnValues[2] = this.range.width;
        returnValues[3] = this.range.height;
        return 4;
    }

    return 0;
  }

  @override
  void setTweenableValues(Tween tween, int tweenType, List<num> newValues) {
    switch (tweenType) {
      case TWEEN_DRAG:
        moveViewport(newValues[0], newValues[1]);
        break;
      case TWEEN_ZOOM:
        //print("anim zoom ${newValues[0]}");
        setRange( new Rectangle( newValues[0], newValues[1], newValues[2], newValues[3] ) );
        break;
    }
  }

  Point scaleToRange( Point drag ) {
    // move zero to half point, then scale to current range
    return new Point (
      drag.x * range.width / gl.drawingBufferHeight,
      drag.y * range.height / gl.drawingBufferWidth
    );
  }
  
  /// p from canvas
  Point mapToRange( Point p ) {
    return new Point (
      p.x * range.width / gl.drawingBufferWidth + range.left,
      p.y * range.height / gl.drawingBufferHeight + range.top
    );
  }

  void moveViewport( num x, num y ) {
    setRange( new Rectangle(x, y, range.width, range.height ));
  }

  static const int TWEEN_DRAG = 1;
  static const int TWEEN_ZOOM = 2;
  
  Point getJuliaConst() => _currentC;
  
  void setJuliaConst(Point c) {
    
    UniformLocation u_c = gl.getUniformLocation(program, "u_c");
    if ( u_c == null ) return; //there is not such uniform in this shader

    _currentC = c;
    gl.uniform2f(u_c, c.x, c.y );
    var r = R(c);
    setRange( new Rectangle(-r, -r, 2*r, 2*r) );
    UniformLocation u_R = gl.getUniformLocation(program, "u_R");

    if( u_R != null ) {
      gl.uniform1f(u_R, r);
    }
    //update();

  }
  
  setSpot(Point c) {
    UniformLocation u_c = gl.getUniformLocation(program, "u_c");
    if ( u_c == null ) return;
    _currentC = c;
    gl.uniform2f(u_c, c.x, c.y );
  }
}
