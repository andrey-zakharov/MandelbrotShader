library mandel;
import 'dart:html';
import 'dart:web_gl';
import 'dart:typed_data';
import 'dart:math';
import 'package:stats/stats.dart';
import 'package:tweenengine/tweenengine.dart';
import 'package:datgui/datgui.dart';

part 'ui.dart';
part 'field.dart';

final String VS_SHADER_FILE = 'mandel.vs.glsl';
final String FS_SHADER_FILE = 'mandel.fs.glsl';

CanvasElement canvas;
Controls controls;
TweenManager animManager;
Field field;
var gl;


Stats stats = new Stats();

main() {
  initGL();
  if(gl == null) return;
  
  //
  //new FileReader(VS_SHADER_FILE).readAsText(blob)
  //HttpRequest.getString(VS_SHADER_FILE).then(print);

  HttpRequest.getString(VS_SHADER_FILE).then((String vshader) =>
    HttpRequest.getString(FS_SHADER_FILE).then((String fshader) {
  
      field = new Field(gl, vshader, fshader);
      initUI();
  
      document.body.children.add(stats.container);
      stats.container.style.position = 'absolute';
      stats.container.style.bottom = '0px';
      update();
  
    }));
 
      
      //querySelector("#shader-vx").text, querySelector("#shader-fx").text);
  print("loading...");
}

update() {
  //lastUpdate = 0;
  window.animationFrame.then(draw);
}

num lastUpdate = 0.0;

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


status(String message) {
  var status = querySelector('#status');
  status.innerHtml = '<p>${message}</p>';
}




initGL() {

  canvas = new Element.tag('canvas');
  //document.body.appendChild( container );
  document.body.children.add(canvas);
  canvas.width = document.body.clientWidth;
  canvas.height = window.innerHeight;
  gl = canvas.getContext("webgl");
  if (gl == null) gl = canvas.getContext("experimental-webgl");
  if (gl == null) {
    status('Простите, ваш браузер не поддерживает WebGl');
    return null;
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
  status('');
  return gl;
}


onResize(e) {
  canvas.width = document.body.clientWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
  update();
}


