library mandel;
import 'dart:html';
import 'dart:web_gl';
import 'dart:typed_data';
import 'dart:math';
import 'package:stats/stats.dart';
import 'package:tweenengine/tweenengine.dart';
//import 'package:datgui/datgui.dart';

part 'ui.dart';
part 'field.dart';

final String VS_SHADER_FILE = 'plain.vs.glsl';
final String FS_SHADER_FILE = 'mandel.fs.glsl';
final String FS_JULIA_SHADER_FILE = 'julia.fs.glsl';

//CanvasElement canvas;

TweenManager animManager;
GlView mview, jview;


Stats stats = new Stats();

main() {
  
  //
  //new FileReader(VS_SHADER_FILE).readAsText(blob)
  //HttpRequest.getString(VS_SHADER_FILE).then(print);

  HttpRequest.getString(VS_SHADER_FILE).then((String vshader) =>
      HttpRequest.getString(FS_JULIA_SHADER_FILE).then((String julia_fshader) =>
    HttpRequest.getString(FS_SHADER_FILE).then((String fshader) {
    
      mview = new GlView("mandel", vshader, fshader);
      if(mview == null) return;
      
      jview = new GlView("julia", vshader, julia_fshader);
      if(jview == null) return;
      
      document.body.children.add(stats.container);
      stats.container.style.position = 'absolute';
      stats.container.style.bottom = '0px';
      mview.update();
      jview.update();
      status('');
  
    })));
 
      
      //querySelector("#shader-vx").text, querySelector("#shader-fx").text);
  print("loading...");
}



status(String message) {
  var status = querySelector('#status');
  status.innerHtml = '<p>${message}</p>';
}
