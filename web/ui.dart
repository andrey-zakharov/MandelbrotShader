part of mandel;

Point mouseSt;
final num minSelection = 10.0;

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
}


uidraw() {

}