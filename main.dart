library mandel;
import 'dart:html';
import 'dart:web_gl';
import 'dart:typed_data';
import 'dart:math';
import 'package:stats/stats.dart';
import 'package:tweenengine/tweenengine.dart';

part 'ui.dart';
part 'field.dart';

Element canvas;
Controls controls;
TweenManager animManager;
Field field;
var gl;


Stats stats = new Stats();

main() {
  initGL();
  if(gl == null) return;

  field = new Field(gl);

  initUI();

  document.body.children.add(stats.container);
  stats.container.style.position = 'absolute';
  stats.container.style.bottom = '0px';
  update();

}

update() {
  window.animationFrame.then(draw);
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

num lastUpdate = 0;

draw(num delta) {
  stats.begin();
  num deltaTime = (delta - lastUpdate) / 1000;
  lastUpdate = delta;
  animManager.update(delta);

  field.draw();

  if( animManager.length > 0 ) {
    window.requestAnimationFrame(draw);
    //animSteps--;
  }

  stats.end();
}

calcFractal() {

  //webgl.getParameter(webgl.MAX_TEXTURE_SIZE)
  //gl.bindTexture(gl.TEXTURE_2D, fractalTexture);
  stats.begin();
  gl.drawArrays(RenderingContext.TRIANGLES, 0, vertices.length ~/ dims);
  var pixels = new Uint8Array(width * height * 4);
  gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  stats.end();
}
