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
  Point offset;
  DragData(this.offset);
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

  final num minSelection = 5.0;
  Point mouseSt;
  //Element _el;
  //Field field; // to control
  GlView view;
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

  Controls(this.view) {
    var _el = view.canvas;
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
    status("Square: ${view.field.range.width * view.field.range.height}, ${view.field.range}");
  }

  onMouseDown(MouseEvent e) {
  }

  onMouseMove(MouseEvent e) {
      
      if( e.which == 1 ) { //LEFT
        view.canvas.dispatchEvent(new CustomEvent('fielddrag', detail: new DragData(e.movement)));
      }
      
      //status("btn:${e.button} ${e.which} ${view.field.range} - ${e.layer}  /  ${view.field.scaleToRange(e.client)} ");
      updateStatus();
  }

  onMouseUp(MouseEvent e) {
  }

  EventStreamProvider<CustomEvent> onDragEvent = new EventStreamProvider('fielddrag');
  EventStreamProvider<CustomEvent> onUpdateEvent = new EventStreamProvider('fieldupdate');



  onCanvasDrag(CustomEvent e) {
    Point relative = view.field.scaleToRange(e.detail.offset);
    
    if( zoomer != null ) {
      zoomer.kill();
    }
    
    view.field.moveViewport(view.field.range.left - relative.x, view.field.range.top - relative.y);
    /*zoomer = new Tween.to( field, Field.TWEEN_DRAG, 1)
      ..targetRelative = [-relative.x, -relative.y]
      ..start(animManager);*/
    view.update();
    updateStatus();
  
  }
  
  Tween zoomer = null;
  
  onZoomIn(MouseEvent e) {
    zoomTo( view.field.mapToRange(e.layer), 1.62 );
    
  }
  
  onZoomOut(MouseEvent e) {
    zoomTo( view.field.mapToRange(e.layer), 1/1.62 );
  }
  
  zoomTo( Point c, num zoom ) {
    Rectangle zoomOrig = view.field.range;
    if( zoomer != null ) {
      zoomOrig = new Rectangle( 
          zoomer.targetValues[0], zoomer.targetValues[1],
          zoomer.targetValues[2], zoomer.targetValues[3]
      );
    }
    
  
    // get new zoom range as golden mean
    num w = zoomOrig.width / zoom;
    num h = zoomOrig.height / zoom;
    Point zoomOrigCenter = new Point( zoomOrig.left + zoomOrig.width/2, zoomOrig.top + zoomOrig.height/2 );
    Point zoomCenter = new Point(zoomOrigCenter.x + (c.x-zoomOrigCenter.x)/3, zoomOrigCenter.y + (c.y-zoomOrigCenter.y)/3);
    num x = zoomCenter.x - w/2;
    num y = zoomCenter.y - h/2;
    //print( [ x, y, w, h ] );
    
    if( zoomer != null ) {
      zoomer.kill();
    }
    
    if( animate ) {
      zoomer = new Tween.to(view.field, Field.TWEEN_ZOOM, 5)
        ..targetValues = [ x, y, w, h ]
        ..easing = TweenEquations.easeOutExpo
        ..start(animManager)
        ..callback = resetZoom;
    } else {
      view.field.setRange(new Rectangle(x,y,w,h));
      
    }
  
    view.update();// start anim
    updateStatus();
    
  }
  
  void resetZoom(_, __) {
    zoomer = null;
  }
  
  void onContext(MouseEvent e) {

  }
}
