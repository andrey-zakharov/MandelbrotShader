library mandel;
import 'dart:html';
import 'dart:web_gl';
import 'dart:typed_data';
import 'dart:math';
import 'package:stats/stats.dart';
import 'package:tweenengine/tweenengine.dart';
import 'dart:js';
//import 'package:datgui/datgui.dart';

part 'ui.dart';
part 'field.dart';
part 'spot.dart';

final String VS_SHADER_FILE = 'plain.vs.glsl';
final String FS_SHADER_FILE = 'mandel.ds.glsl';
final List FS_PALLETE_FILES = ['pal1.glsl', 'pal2.glsl', 'pal3.glsl'];
int currentPallete = 0;
final String FS_JULIA_SHADER_FILE = 'julia.fs.glsl';

//CanvasElement canvas;
TweenManager animManager;
GlView mview, jview;
Controls mcontrols, jcontrols;
String _cachedMandelShader;

Stats stats = new Stats();

main() {
  
  //
  //new FileReader(VS_SHADER_FILE).readAsText(blob)
  //HttpRequest.getString(VS_SHADER_FILE).then(print);
  status("Initializing UI...");
  initUI();

  status("Loading...");
  HttpRequest.getString(VS_SHADER_FILE).then((String vshader) =>
      HttpRequest.getString(FS_JULIA_SHADER_FILE).then((String julia_fshader) =>
          HttpRequest.getString(FS_SHADER_FILE).then((String fshader) =>
            HttpRequest.getString(FS_PALLETE_FILES[currentPallete]).then((String pal) {
    
      _cachedMandelShader = fshader;
      mview = new GlView("mandel", vshader, fshader + pal);
      if(mview == null) return;
      mcontrols = new Controls(mview);

      
      jview = new GlView("julia", vshader, julia_fshader);
      if(jview == null) return;
      jcontrols = new Controls(jview);
      
      mview.canvas.onContextMenu.listen(updateJConst);
      mview.canvas.onMouseMove.listen((MouseEvent e ) {
      //mcontrols.onDragEvent.forElement(mview.canvas).listen((CustomEvent e) {
        if ((mcontrols.buttons & Controls.MOUSE_BTN_RIGHT) != 0 ) {
          updateJConst(e);
        }
      });
      
      document.body.children.add(stats.container);
      stats.container.style.position = 'absolute';
      stats.container.style.top = '0px';
      stats.container.style.right = '0px';
      
      mview.field.setSpot(jview.field.getJuliaConst());
      mview.update();
      jview.update();
      status('');
  
    }))));
 
      
      //querySelector("#shader-vx").text, querySelector("#shader-fx").text);
  //print("loading...");
}

void updateJConst(MouseEvent e) {
  e.preventDefault();
  jview.field.setJuliaConst(mview.field.mapToRange(e.layer));
  mview.field.setSpot(jview.field.getJuliaConst()); // update spot
  jview.update();
  //mview.update();
}

status(String message) {
  var status = querySelector('#status');
  print(message);
  status.innerHtml = '<p>${message}</p>';
}
