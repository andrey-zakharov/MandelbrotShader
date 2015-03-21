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

      if( e.wheelDeltaX < 0 ) { //zoom in
        onZoomIn(e);
      }

      if( e.wheelDeltaX > 0 ) { //zoom out

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

onZoomIn(MouseEvent e) {
  e.client;
}

uidraw() {

}