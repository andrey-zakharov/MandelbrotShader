part of mandel;

int animSteps = 0;
//GUI gui;


initUI() {
  animManager = new TweenManager();
  Tween.combinedAttributesLimit = 4;
  animManager.resume();
}

class DragData {
  Point previous;
  Point current;
  DragData(this.previous, this.current);
}

class GlView {
 
  CanvasElement canvas;
  RenderingContext gl;
  Field field;
  Controls controls;
  
  num lastUpdate = 0.0;

  GlView(String id, String vs, String fs) {
    canvas = new CanvasElement(
        width: document.body.clientWidth~/2, 
        height: window.innerHeight
    );
    canvas.attributes["id"] = id;
    document.body.children.add(canvas);
    gl = canvas.getContext3d();
    
    if (gl == null) {
      status('Простите, ваш браузер не поддерживает WebGl');
      return;
    }
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    window.onResize.listen(this.onResize);

    field = new Field(gl, vs, fs );
    controls = new Controls(canvas, field);

  }
  
  
  
  void onResize(e) {
    this.canvas.width = document.body.clientWidth~/2;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, canvas.width, canvas.height);
  }
  
  update() {
    window.animationFrame.then(draw);
  }
  
  
  draw(num delta) {
    
    stats.begin();
    num deltaTime = (delta - lastUpdate) / 1000;
    //print(deltaTime);
    lastUpdate = delta;
    animManager.update(deltaTime);
    
    field.draw();
    
    stats.end();
    if( animManager.length > 0 ) {
      window.requestAnimationFrame(draw);
      //animSteps--;
    }
  }
}



class Controls {

  final num minSelection = 1.0;
  Point mouseSt;
  Element _el;
  Field field; // to control
  bool _animate = false;
  bool get animate => _animate;
  void set animate(bool v) {
    if ( !v && zoomer != null ) {
      zoomer.forceToEnd(1);
      zoomer.kill();
      zoomer = null;
    }
    _animate = v;
  }

  Controls(this._el, this.field) {

    _el.onMouseDown.listen(onMouseDown);
    _el.onMouseMove.listen(onMouseMove);
    _el.onDoubleClick.listen(onZoomIn);
    _el.onMouseUp.listen(onMouseUp);
    onDragEvent.forElement(_el).listen(onCanvasDrag);
    _el.onContextMenu.listen(onContext);

    _el.onMouseWheel.listen((WheelEvent e) {
      //print( e.deltaY );

      if( e.deltaY > 0 ) { //zoom in
        onZoomOut(e);
      }

      if( e.deltaY < 0 ) { //zoom out
        onZoomIn(e);
      }
    });
  }
  
  updateStatus() {
    status("Square: ${field.range.width * field.range.height}, ${field.range}");
  }

  onMouseDown(MouseEvent e) {
      mouseSt = new Point(e.client.x, e.client.y);
      if( e.button == 2 ) {
        e.preventDefault();
        
      }
      //add to scene selection rect
  }

  onMouseMove(MouseEvent e) {
      if( mouseSt != null && mouseSt.squaredDistanceTo(e.client) >= minSelection ) {
        _el.dispatchEvent(new CustomEvent('fielddrag', detail: new DragData(mouseSt, e.client)));
        mouseSt = e.client;
      }
      
      //status("${field.range} - ${e.client}  /  ${field.scaleToRange(e.client)}");
      updateStatus();
  }

  onMouseUp(MouseEvent e) {
    if( mouseSt != null ) {
      //print( "${mouseSt.x}x${mouseSt.y} - ${e.client.x}x${e.client.y}");
      mouseSt = null;

    }
  }

  EventStreamProvider<CustomEvent> onDragEvent = new EventStreamProvider('fielddrag');



  onCanvasDrag(CustomEvent e) {
    //print("Jere: ${e}");
    Point relative = e.detail.current - e.detail.previous;
  
    //print("${relative} ${field.scaleToRange(relative)}");
    relative = field.scaleToRange(relative);
    
    if( zoomer != null ) {
      zoomer.kill();
    }
    
    field.moveViewport(field.range.left - relative.x, field.range.top - relative.y);
    /*zoomer = new Tween.to( field, Field.TWEEN_DRAG, 1)
      ..targetRelative = [-relative.x, -relative.y]
      ..start(animManager);*/
    //update();
    updateStatus();
  
  }
  
  Tween zoomer = null;
  
  onZoomIn(MouseEvent e) {
    zoomTo( field.mapToRange(e.client), 1.62 );
    
  }
  
  onZoomOut(MouseEvent e) {
    zoomTo( field.mapToRange(e.client), 1/1.62 );
  }
  
  zoomTo( Point c, num zoom ) {
    Rectangle zoomOrig = field.range;
    if( zoomer != null ) {
      zoomOrig = new Rectangle( 
          zoomer.targetValues[0], zoomer.targetValues[1],
          zoomer.targetValues[2], zoomer.targetValues[3]
      );
    }
    
  
    // get new zoom range as golden mean
    num w = zoomOrig.width / zoom;
    num h = zoomOrig.height / zoom;
    num x = c.x - w/2;
    num y = c.y - h/2;
    //print( [ x, y, w, h ] );
    
    if( zoomer != null ) {
      zoomer.kill();
    }
    
    if( animate ) {
      zoomer = new Tween.to(field, Field.TWEEN_ZOOM, 5)
        ..targetValues = [ x, y, w, h ]
        ..easing = TweenEquations.easeOutExpo
        ..start(animManager)
        ..callback = resetZoom;
    } else {
      field.setRange(new Rectangle(x,y,w,h));
      
    }
  
    update();// start anim
    updateStatus();
    
  }
  
  void resetZoom(_, __) {
    zoomer = null;
  }
  
  void onContext(MouseEvent e) {
    e.preventDefault();
    //print(e.client);
    field.setJuliaConst(field.scaleToRange(e.client));
  }
}
