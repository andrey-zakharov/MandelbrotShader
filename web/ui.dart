part of mandel;

Point mouseSt;
final num minSelection = 10.0;

int animSteps = 0;

initUI() {
  window.onResize.listen(onResize);
  canvas.onMouseDown.listen((e) {
    mouseSt = new Point(e.client.x, e.client.y);
    //add to scene selection rect
  });

  canvas.onMouseMove.listen((e) {

    if( mouseSt != null && mouseSt.squaredDistanceTo(e.client) >= minSelection ) {

      // enable draw

    }
  });

  canvas.onMouseUp.listen((e) {
    if( mouseSt != null ) {


      print( "${mouseSt.x}x${mouseSt.y} - ${e.client.x}x${e.client.y}");


    }
  });
  
  canvas.onMouseWheel.listen((WheelEvent e) {
    if( e.wheelDeltaX < 0 ) { //zoom in
      onZoomIn(e);
    }
    
    if( e.wheelDeltaX > 0 ) { //zoom out
      
    }
  });
}

onZoomIn(MouseEvent e) {
  e.client;
}

uidraw() {
  if( animSteps > 0 ) {
    window.requestAnimationFrame((_)=>draw);
    animSteps--;
  }
}