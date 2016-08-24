part of mandel;

int animSteps = 0;
//GUI gui;


initUI() {
  animManager = new TweenManager();
  Tween.combinedAttributesLimit = 4;
  animManager.resume();
  
  var helpPopup = querySelector("#help"); 
  
  querySelector("#help-sign").onClick.listen((e) => helpPopup.classes.remove("hide"));
  helpPopup.onClick.listen((e) => helpPopup.classes.add("hide"));
  
  window.onKeyPress.listen((KeyboardEvent e) {
    //print("${e.keyCode} ${e.charCode} ${e.which}");
    
    if( e.charCode == 'p'.codeUnitAt(0) ) {
      loadNextPallete();
    }
    
    if( e.charCode == 'd'.codeUnitAt(0) ) {
          switchPrecise();
        }
  });
  
}


loadNextPallete() {
  status("Changing pallete...");
  HttpRequest.getString(FS_PALLETE_FILES[++currentPallete % FS_PALLETE_FILES.length]).then((String pal) {
    _cachedMandelPallete = pal;
    mview.field.updateFragmentShader(_cachedMandelShader + pal);
    status("");
    mview.update();
    
  });
   
}

switchPrecise() {
  status("Loading precise shader...");
    HttpRequest.getString(FS_SHADER_FILES[++currentShader % FS_SHADER_FILES.length]).then((String sh) {
      _cachedMandelShader = sh;
      mview.field.updateFragmentShader(sh + _cachedMandelPallete);
      status("");
      mview.update();
    });
}

class DragData {
  Point offset;
  int buttons;
  MouseEvent origin;
  DragData(this.offset, this.buttons, this.origin);
}

class GlView {
 
  CanvasElement canvas;
  RenderingContext gl;
  Field field;
  Element _status;
  
  num lastUpdate = 0.0;

  GlView(String id, String vs, String fs) {
    //canvas.attributes["id"] = id;
    Element container = new DivElement();
    container.id = id;
    document.body.children.add(container);

    _status = new DivElement();
    _status.classes.add("field-status");
    container.children.add(_status);

    canvas = new CanvasElement(
        width: container.clientWidth,
        height: container.clientHeight
    );

    gl = canvas.getContext3d(depth:false);
    
    if (gl == null) {
      status('Простите, ваш браузер не поддерживает WebGl http://webglreport.com/', "error");
      throw new UnimplementedError("http://webglreport.com/");
    }

    //print(gl.getSupportedExtensions());


    gl.viewport(0, 0, canvas.width, canvas.height);
    window.onResize.listen((e) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      update();
    });

    container.children.add(canvas);

    field = new Field(gl, vs, fs );
    status( "zoom: ${field.getZoom()}");

  }
  
  updateFragShader(String shader) {
    
  }
  
  status(var st, [String cssClassName]) {
    _status.innerHtml= "${st}";
    if ( cssClassName != null ) _status.classes.add(cssClassName);
  }

  dropStatus() => _status.classes.clear();
  
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
  
  static const int MOUSE_BTN_LEFT = 1;
  static const int MOUSE_BTN_MIDDLE = 1 << 1;
  static const int MOUSE_BTN_RIGHT = 1 << 2;
  

  final num minSelection = 5.0;
  int buttons = 0;

  //Element _el;
  //Field field; // to control
  GlView view;
  bool _animate = false;
  Point _dragOrigin;
  bool get animate => _animate;
  void set animate(bool v) {
    if ( !v && zoomer != null ) {
      zoomer.forceToEnd(1);
      zoomer.kill();
      zoomer = null;
    }
    _animate = v;
  }

  EventStreamProvider<CustomEvent> onDragEvent = new EventStreamProvider('fielddrag');
  EventStreamProvider<CustomEvent> onUpdateEvent = new EventStreamProvider('fieldupdate');


  Controls(this.view) {
    var _el = view.canvas;
    _el.onMouseDown.listen(onMouseDown);
    _el.onMouseUp.listen(onMouseUp);
    _el.onMouseMove.listen(onMouseMove);
    _el.onDoubleClick.listen(onZoomIn);

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
    //status("Square: ${view.field.range.width * view.field.range.height}, ${view.field.range}");
    view.status( "zoom: ${view.field.getZoom()}");
  }

  onMouseDown(MouseEvent e) {
    
    buttons |=  1 << e.button;
    //print("onMouseDown: ${e.button} ${buttons}");
    _dragOrigin = e.client;
  }

  Point movement(ev) {
      /*JsObject evnt = new JsObject.fromBrowserObject(ev);
      if (evnt['webkitMovementX'] != null)
        return ev.movement;
      else
        return new Point(evnt['mozMovementX'], evnt['mozMovementY']);*/
    return ev.client - _dragOrigin;
  }
  
  onMouseMove(MouseEvent e) {
      if( buttons & MOUSE_BTN_LEFT > 0 ) { //LEFT
        //print(e.movement);
        view.canvas.dispatchEvent(
            new CustomEvent('fielddrag', 
              detail: new DragData(movement(e), buttons, e)));
        _dragOrigin = e.client;
      }
      
      //status("btn:${buttons} ${view.field.range} - ${e.layer}  /  ${view.field.scaleToRange(e.client)} ");
      updateStatus();
  }

  onMouseUp(MouseEvent e) {
    // it doesn't comes in e.button what button is UP.
    //buttons ^= 1 << e.button;
    // it comes in e.button is still pressed
    //buttons &= 1 << e.button;
    // no. it doesn't works completely
    buttons = 0;
    _dragOrigin = null;
    //print("onMouseUp: ${e.button} ${buttons}");
  }


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
