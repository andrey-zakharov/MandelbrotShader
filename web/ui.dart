part of mandel;

int animSteps = 0;

class Controls {

  final num minSelection = 1.0;
  Point mouseSt;
  Element _el;

  Controls(this._el) {

    _el.onMouseDown.listen(onMouseDown);
    _el.onMouseMove.listen(onMouseMove);
    _el.onMouseUp.listen(onMouseUp);

    _el.onMouseWheel.listen((WheelEvent e) {
      print( e.wheelDeltaY );

      if( e.wheelDeltaY < 0 ) { //zoom in
        onZoomOut(e);
      }

      if( e.wheelDeltaY > 0 ) { //zoom out
        onZoomIn(e);
      }
    });
  }

  onMouseDown(MouseEvent e) {
      mouseSt = new Point(e.client.x, e.client.y);
      //add to scene selection rect
  }

  onMouseMove(MouseEvent e) {
      if( mouseSt != null && mouseSt.squaredDistanceTo(e.client) >= minSelection ) {
        _el.dispatchEvent(new CustomEvent('drag', detail: new DragData(mouseSt, e.client)));
        mouseSt = e.client;
      }
  }

  onMouseUp(MouseEvent e) {
    if( mouseSt != null ) {
      //print( "${mouseSt.x}x${mouseSt.y} - ${e.client.x}x${e.client.y}");
      mouseSt = null;

    }
  }

  EventStreamProvider<CustomEvent> onDrag = new EventStreamProvider('drag');

}

class DragData {
  Point previous;
  Point current;
  DragData(this.previous, this.current);
}

initUI() {
  window.onResize.listen(onResize);
  animManager = new TweenManager();
  Tween.combinedAttributesLimit = 4;
  controls = new Controls(canvas);
  controls.onDrag.forElement(canvas).listen(onDrag);
  //controls.onDraw
}

onDrag(CustomEvent e) {
  //print("Jere: ${e}");
  Point relative = e.detail.current - e.detail.previous;

  //print("${relative} ${field.scaleToRange(relative)}");
  relative = field.scaleToRange(relative);
  field.moveViewport(field.range.left-relative.x, field.range.top-relative.y);
  /*new Tween.to( field, Field.TWEEN_DRAG, 0.5)
    ..targetRelative = [-relative.x, -relative.y]
    ..start(animManager);*/
  update();

}

Tween zoomer = null;

onZoomIn(WheelEvent e) {
  zoomTo( field.scaleToRange(e.client), 1.62 );
  
}

onZoomOut(WheelEvent e) {
  zoomTo( field.scaleToRange(e.client), 1/1.62 );
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
  print( [ x, y, w, h ] );
  
  if( zoomer == null ) {
  
    zoomer = new Tween.to(field, Field.TWEEN_ZOOM, 20)
      ..targetValues = [ x, y, w, h ]
      ..start(animManager)
      ..callback = resetZoom;
  
    update();// start anim
    
  } else {
    zoomer.targetValues = [ x, y, w, h ];
    zoomer.duration = 20;
  }
}

void resetZoom(_, __) {
  zoomer = null;
}

uidraw() {

}