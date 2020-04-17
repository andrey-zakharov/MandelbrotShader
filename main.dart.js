(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$ise=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isd)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="e"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="q"){processStatics(init.statics[b1]=b2.q,b3)
delete b2.q}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cM"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cM"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cM(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.J=function(){}
var dart=[["","",,H,{"^":"",mb:{"^":"e;a"}}],["","",,J,{"^":"",
q:function(a){return void 0},
bX:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bU:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cS==null){H.kR()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(new P.b4("Return interceptor for "+H.h(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$ci()]
if(v!=null)return v
v=H.l5(a)
if(v!=null)return v
if(typeof a=="function")return C.F
y=Object.getPrototypeOf(a)
if(y==null)return C.p
if(y===Object.prototype)return C.p
if(typeof w=="function"){Object.defineProperty(w,$.$get$ci(),{value:C.j,enumerable:false,writable:true,configurable:true})
return C.j}return C.j},
d:{"^":"e;",
t:function(a,b){return a===b},
gv:function(a){return H.ap(a)},
j:["dG",function(a){return H.bG(a)}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationTimeline|AppBannerPromptResult|AudioListener|AudioParam|BarProp|Bluetooth|BluetoothAdvertisingData|BluetoothCharacteristicProperties|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|CHROMIUMSubscribeUniform|CHROMIUMValuebuffer|CSS|Cache|CacheStorage|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|CircularGeofencingRegion|Client|Clients|CompositorProxy|ConsoleBase|Coordinates|Credential|CredentialsContainer|Crypto|CryptoKey|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|EXTBlendMinMax|EXTColorBufferFloat|EXTDisjointTimerQuery|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|EffectModel|Entry|EntrySync|FederatedCredential|FileEntry|FileEntrySync|FileError|FileReaderSync|FileWriterSync|FontFace|FormData|GamepadButton|Geofencing|GeofencingRegion|Geolocation|Geoposition|HMDVRDevice|HTMLAllCollection|Headers|IDBCursor|IDBCursorWithValue|IDBFactory|IDBIndex|IDBKeyRange|IDBObjectStore|IdleDeadline|ImageBitmap|ImageBitmapRenderingContext|InjectedScriptHost|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|Iterator|KeyframeEffect|MIDIInputMap|MIDIOutputMap|MediaDeviceInfo|MediaDevices|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaMetadata|MediaSession|MemoryInfo|MessageChannel|Metadata|MutationObserver|MutationRecord|NFC|NavigatorStorageUtils|NavigatorUserMediaError|NodeFilter|NonDocumentTypeChildNode|NonElementParentNode|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvas|PagePopupController|PasswordCredential|PerformanceCompositeTiming|PerformanceEntry|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceObserver|PerformanceObserverEntryList|PerformanceRenderTiming|PerformanceResourceTiming|PerformanceTiming|PeriodicWave|Permissions|PositionError|PositionSensorVRDevice|Presentation|PushManager|PushMessageData|PushSubscription|RTCCertificate|RTCIceCandidate|RTCSessionDescription|RTCStatsReport|RTCStatsResponse|ReadableByteStream|ReadableByteStreamReader|ReadableStreamReader|Request|Response|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPreserveAspectRatio|SVGUnitTypes|Screen|Selection|ServicePort|SharedArrayBuffer|SourceInfo|SpeechRecognitionAlternative|SpeechSynthesisVoice|StorageInfo|StorageManager|StorageQuota|Stream|StyleMedia|StylePropertyMap|SubtleCrypto|SyncManager|TextMetrics|TrackDefault|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRDevice|VREyeParameters|VRFieldOfView|VRPositionState|VTTRegion|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGLActiveInfo|WebGLBuffer|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLUniformLocation|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitCSSMatrix|WebKitMutationObserver|WindowClient|WorkerConsole|Worklet|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|mozRTCIceCandidate|mozRTCSessionDescription"},
hZ:{"^":"d;",
j:function(a){return String(a)},
gv:function(a){return a?519018:218159},
$iscK:1},
dB:{"^":"d;",
t:function(a,b){return null==b},
j:function(a){return"null"},
gv:function(a){return 0}},
cj:{"^":"d;",
gv:function(a){return 0},
j:["dI",function(a){return String(a)}],
$isi_:1},
ii:{"^":"cj;"},
bm:{"^":"cj;"},
bk:{"^":"cj;",
j:function(a){var z=a[$.$get$df()]
return z==null?this.dI(a):J.a5(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
bh:{"^":"d;$ti",
eB:function(a,b){if(!!a.immutable$list)throw H.c(new P.r(b))},
cC:function(a,b){if(!!a.fixed$length)throw H.c(new P.r(b))},
ep:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0)z.push(w)
if(a.length!==y)throw H.c(new P.G(a))}v=z.length
if(v===y)return
this.si(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
E:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.G(a))}},
a1:function(a,b){return new H.bD(a,b,[H.K(a,0),null])},
bq:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.G(a))}throw H.c(H.bg())},
cT:function(a,b){return this.bq(a,b,null)},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
gbp:function(a){if(a.length>0)return a[0]
throw H.c(H.bg())},
bU:function(a,b,c,d,e){var z,y,x
this.eB(a,"setRange")
P.dR(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.D(P.b2(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.hX())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
cv:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.G(a))}return!1},
A:function(a,b){var z
for(z=0;z<a.length;++z)if(J.O(a[z],b))return!0
return!1},
j:function(a){return P.bx(a,"[","]")},
gD:function(a){return new J.d8(a,a.length,0,null,[H.K(a,0)])},
gv:function(a){return H.ap(a)},
gi:function(a){return a.length},
si:function(a,b){this.cC(a,"set length")
if(b<0)throw H.c(P.b2(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.E(a,b))
if(b>=a.length||b<0)throw H.c(H.E(a,b))
return a[b]},
k:function(a,b,c){if(!!a.immutable$list)H.D(new P.r("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.E(a,b))
if(b>=a.length||b<0)throw H.c(H.E(a,b))
a[b]=c},
$isl:1,
$asl:I.J,
$isb:1,
$asb:null,
$isa:1,
$asa:null},
ma:{"^":"bh;$ti"},
d8:{"^":"e;a,b,c,d,$ti",
gu:function(){return this.d},
p:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.aS(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bi:{"^":"d;",
bz:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.c(new P.r(""+a+".toInt()"))},
eN:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.c(new P.r(""+a+".floor()"))},
a2:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.r(""+a+".round()"))},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
aU:function(a){return-a},
w:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a+b},
B:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a-b},
X:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a*b},
J:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
aC:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
if((a|0)===a)if(b>=1||!1)return a/b|0
return this.cq(a,b)},
ap:function(a,b){return(a|0)===a?a/b|0:this.cq(a,b)},
cq:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.r("Result of truncating division is "+H.h(z)+": "+H.h(a)+" ~/ "+b))},
aX:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
if(b<0)throw H.c(H.P(b))
return b>31?0:a<<b>>>0},
bh:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
I:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a<b},
R:function(a,b){if(typeof b!=="number")throw H.c(H.P(b))
return a>b},
$isa3:1},
dA:{"^":"bi;",$isa3:1,$isu:1},
dz:{"^":"bi;",$isa3:1},
bj:{"^":"d;",
cG:function(a,b){if(b<0)throw H.c(H.E(a,b))
if(b>=a.length)H.D(H.E(a,b))
return a.charCodeAt(b)},
b4:function(a,b){if(b>=a.length)throw H.c(H.E(a,b))
return a.charCodeAt(b)},
w:function(a,b){if(typeof b!=="string")throw H.c(P.c6(b,null,null))
return a+b},
dD:function(a,b,c){var z
if(c>a.length)throw H.c(P.b2(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
dC:function(a,b){return this.dD(a,b,0)},
bY:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.D(H.P(c))
if(b<0)throw H.c(P.bI(b,null,null))
if(typeof c!=="number")return H.k(c)
if(b>c)throw H.c(P.bI(b,null,null))
if(c>a.length)throw H.c(P.bI(c,null,null))
return a.substring(b,c)},
dE:function(a,b){return this.bY(a,b,null)},
fp:function(a){return a.toLowerCase()},
fq:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.b4(z,0)===133){x=J.i0(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cG(z,w)===133?J.i1(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
X:function(a,b){var z,y
if(typeof b!=="number")return H.k(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.r)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
j:function(a){return a},
gv:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gi:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.E(a,b))
if(b>=a.length||b<0)throw H.c(H.E(a,b))
return a[b]},
$isl:1,
$asl:I.J,
$isp:1,
q:{
dC:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
i0:function(a,b){var z,y
for(z=a.length;b<z;){y=C.f.b4(a,b)
if(y!==32&&y!==13&&!J.dC(y))break;++b}return b},
i1:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.f.cG(a,z)
if(y!==32&&y!==13&&!J.dC(y))break}return b}}}}],["","",,H,{"^":"",
bg:function(){return new P.a9("No element")},
hY:function(){return new P.a9("Too many elements")},
hX:function(){return new P.a9("Too few elements")},
a:{"^":"X;$ti",$asa:null},
b0:{"^":"a;$ti",
gD:function(a){return new H.dE(this,this.gi(this),0,null,[H.C(this,"b0",0)])},
E:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){b.$1(this.n(0,y))
if(z!==this.gi(this))throw H.c(new P.G(this))}},
A:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){if(J.O(this.n(0,y),b))return!0
if(z!==this.gi(this))throw H.c(new P.G(this))}return!1},
bE:function(a,b){return this.dH(0,b)},
a1:function(a,b){return new H.bD(this,b,[H.C(this,"b0",0),null])},
ay:function(a,b){var z,y,x
z=H.B([],[H.C(this,"b0",0)])
C.b.si(z,this.gi(this))
for(y=0;y<this.gi(this);++y){x=this.n(0,y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
ax:function(a){return this.ay(a,!0)}},
dE:{"^":"e;a,b,c,d,$ti",
gu:function(){return this.d},
p:function(){var z,y,x,w
z=this.a
y=J.R(z)
x=y.gi(z)
if(this.b!==x)throw H.c(new P.G(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.n(z,w);++this.c
return!0}},
cm:{"^":"X;a,b,$ti",
gD:function(a){return new H.ia(null,J.bb(this.a),this.b,this.$ti)},
gi:function(a){return J.bc(this.a)},
$asX:function(a,b){return[b]},
q:{
bC:function(a,b,c,d){if(!!a.$isa)return new H.cd(a,b,[c,d])
return new H.cm(a,b,[c,d])}}},
cd:{"^":"cm;a,b,$ti",$isa:1,
$asa:function(a,b){return[b]}},
ia:{"^":"ch;a,b,c,$ti",
p:function(){var z=this.b
if(z.p()){this.a=this.c.$1(z.gu())
return!0}this.a=null
return!1},
gu:function(){return this.a},
$asch:function(a,b){return[b]}},
bD:{"^":"b0;a,b,$ti",
gi:function(a){return J.bc(this.a)},
n:function(a,b){return this.b.$1(J.f3(this.a,b))},
$asb0:function(a,b){return[b]},
$asa:function(a,b){return[b]},
$asX:function(a,b){return[b]}},
ec:{"^":"X;a,b,$ti",
gD:function(a){return new H.j0(J.bb(this.a),this.b,this.$ti)},
a1:function(a,b){return new H.cm(this,b,[H.K(this,0),null])}},
j0:{"^":"ch;a,b,$ti",
p:function(){var z,y
for(z=this.a,y=this.b;z.p();)if(y.$1(z.gu())===!0)return!0
return!1},
gu:function(){return this.a.gu()}},
dt:{"^":"e;$ti"}}],["","",,H,{"^":"",
bp:function(a,b){var z=a.ar(b)
if(!init.globalState.d.cy)init.globalState.f.aw()
return z},
eQ:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.q(y).$isb)throw H.c(P.c5("Arguments to main must be a List: "+H.h(y)))
init.globalState=new H.jN(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$dx()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.jn(P.bB(null,H.bn),0)
x=P.u
y.z=new H.aD(0,null,null,null,null,null,0,[x,H.cC])
y.ch=new H.aD(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.jM()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.hQ,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.jO)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.Y(null,null,null,x)
v=new H.bJ(0,null,!1)
u=new H.cC(y,new H.aD(0,null,null,null,null,null,0,[x,H.bJ]),w,init.createNewIsolate(),v,new H.aB(H.bY()),new H.aB(H.bY()),!1,!1,[],P.Y(null,null,null,null),null,null,!1,!0,P.Y(null,null,null,null))
w.H(0,0)
u.c_(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.aO(a,{func:1,args:[,]}))u.ar(new H.le(z,a))
else if(H.aO(a,{func:1,args:[,,]}))u.ar(new H.lf(z,a))
else u.ar(a)
init.globalState.f.aw()},
hU:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.hV()
return},
hV:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.r("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.r('Cannot extract URI from "'+z+'"'))},
hQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bO(!0,[]).a7(b.data)
y=J.R(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bO(!0,[]).a7(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bO(!0,[]).a7(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.Y(null,null,null,q)
o=new H.bJ(0,null,!1)
n=new H.cC(y,new H.aD(0,null,null,null,null,null,0,[q,H.bJ]),p,init.createNewIsolate(),o,new H.aB(H.bY()),new H.aB(H.bY()),!1,!1,[],P.Y(null,null,null,null),null,null,!1,!0,P.Y(null,null,null,null))
p.H(0,0)
n.c_(0,o)
init.globalState.f.a.S(0,new H.bn(n,new H.hR(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aw()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aV(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aw()
break
case"close":init.globalState.ch.W(0,$.$get$dy().h(0,a))
a.terminate()
init.globalState.f.aw()
break
case"log":H.hP(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.aE(["command","print","msg",z])
q=new H.aK(!0,P.b6(null,P.u)).M(q)
y.toString
self.postMessage(q)}else P.a4(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
hP:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.aE(["command","log","msg",a])
x=new H.aK(!0,P.b6(null,P.u)).M(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.F(w)
z=H.S(w)
y=P.ae(z)
throw H.c(y)}},
hS:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dM=$.dM+("_"+y)
$.dN=$.dN+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aV(f,["spawned",new H.bQ(y,x),w,z.r])
x=new H.hT(a,b,c,d,z)
if(e===!0){z.cu(w,w)
init.globalState.f.a.S(0,new H.bn(z,x,"start isolate"))}else x.$0()},
kg:function(a){return new H.bO(!0,[]).a7(new H.aK(!1,P.b6(null,P.u)).M(a))},
le:{"^":"i:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
lf:{"^":"i:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
jN:{"^":"e;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",q:{
jO:function(a){var z=P.aE(["command","print","msg",a])
return new H.aK(!0,P.b6(null,P.u)).M(z)}}},
cC:{"^":"e;a,b,c,f3:d<,eE:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cu:function(a,b){if(!this.f.t(0,a))return
if(this.Q.H(0,b)&&!this.y)this.y=!0
this.bi()},
fk:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.W(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.f(v,w)
v[w]=x
if(w===y.c)y.c7();++y.d}this.y=!1}this.bi()},
ev:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
fj:function(a){var z,y,x
if(this.ch==null)return
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.D(new P.r("removeRange"))
P.dR(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dB:function(a,b){if(!this.r.t(0,a))return
this.db=b},
eR:function(a,b,c){var z=J.q(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){J.aV(a,c)
return}z=this.cx
if(z==null){z=P.bB(null,null)
this.cx=z}z.S(0,new H.jH(a,c))},
eQ:function(a,b){var z
if(!this.r.t(0,a))return
z=J.q(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){this.aj()
return}z=this.cx
if(z==null){z=P.bB(null,null)
this.cx=z}z.S(0,this.gf4())},
eS:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.a4(a)
if(b!=null)P.a4(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.a5(a)
y[1]=b==null?null:J.a5(b)
for(x=new P.bo(z,z.r,null,null,[null]),x.c=z.e;x.p();)J.aV(x.d,y)},
ar:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.F(u)
v=H.S(u)
this.eS(w,v)
if(this.db===!0){this.aj()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gf3()
if(this.cx!=null)for(;t=this.cx,!t.gU(t);)this.cx.d5().$0()}return y},
bs:function(a){return this.b.h(0,a)},
c_:function(a,b){var z=this.b
if(z.cJ(0,a))throw H.c(P.ae("Registry: ports must be registered only once."))
z.k(0,a,b)},
bi:function(){var z=this.b
if(z.gi(z)-this.c.a>0||this.y||!this.x)init.globalState.z.k(0,this.a,this)
else this.aj()},
aj:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.ai(0)
for(z=this.b,y=z.gdl(z),y=y.gD(y);y.p();)y.gu().e5()
z.ai(0)
this.c.ai(0)
init.globalState.z.W(0,this.a)
this.dx.ai(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
J.aV(w,z[v])}this.ch=null}},"$0","gf4",0,0,2]},
jH:{"^":"i:2;a,b",
$0:function(){J.aV(this.a,this.b)}},
jn:{"^":"e;a,b",
eH:function(){var z=this.a
if(z.b===z.c)return
return z.d5()},
d9:function(){var z,y,x
z=this.eH()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.cJ(0,init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gU(y)}else y=!1
else y=!1
else y=!1
if(y)H.D(P.ae("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gU(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aE(["command","close"])
x=new H.aK(!0,new P.ep(0,null,null,null,null,null,0,[null,P.u])).M(x)
y.toString
self.postMessage(x)}return!1}z.fh()
return!0},
cm:function(){if(self.window!=null)new H.jo(this).$0()
else for(;this.d9(););},
aw:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cm()
else try{this.cm()}catch(x){z=H.F(x)
y=H.S(x)
w=init.globalState.Q
v=P.aE(["command","error","msg",H.h(z)+"\n"+H.h(y)])
v=new H.aK(!0,P.b6(null,P.u)).M(v)
w.toString
self.postMessage(v)}}},
jo:{"^":"i:2;a",
$0:function(){if(!this.a.d9())return
P.iW(C.m,this)}},
bn:{"^":"e;a,b,c",
fh:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ar(this.b)}},
jM:{"^":"e;"},
hR:{"^":"i:0;a,b,c,d,e,f",
$0:function(){H.hS(this.a,this.b,this.c,this.d,this.e,this.f)}},
hT:{"^":"i:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.aO(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.aO(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.bi()}},
ef:{"^":"e;"},
bQ:{"^":"ef;b,a",
a4:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gca())return
x=H.kg(b)
if(z.geE()===y){y=J.R(x)
switch(y.h(x,0)){case"pause":z.cu(y.h(x,1),y.h(x,2))
break
case"resume":z.fk(y.h(x,1))
break
case"add-ondone":z.ev(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fj(y.h(x,1))
break
case"set-errors-fatal":z.dB(y.h(x,1),y.h(x,2))
break
case"ping":z.eR(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.eQ(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.H(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.W(0,y)
break}return}init.globalState.f.a.S(0,new H.bn(z,new H.jQ(this,x),"receive"))},
t:function(a,b){if(b==null)return!1
return b instanceof H.bQ&&J.O(this.b,b.b)},
gv:function(a){return this.b.gba()}},
jQ:{"^":"i:0;a,b",
$0:function(){var z=this.a.b
if(!z.gca())z.e_(0,this.b)}},
cD:{"^":"ef;b,c,a",
a4:function(a,b){var z,y,x
z=P.aE(["command","message","port",this,"msg",b])
y=new H.aK(!0,P.b6(null,P.u)).M(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
t:function(a,b){if(b==null)return!1
return b instanceof H.cD&&J.O(this.b,b.b)&&J.O(this.a,b.a)&&J.O(this.c,b.c)},
gv:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.aX()
y=this.a
if(typeof y!=="number")return y.aX()
x=this.c
if(typeof x!=="number")return H.k(x)
return(z<<16^y<<8^x)>>>0}},
bJ:{"^":"e;ba:a<,b,ca:c<",
e5:function(){this.c=!0
this.b=null},
e_:function(a,b){if(this.c)return
this.b.$1(b)},
$isiw:1},
iS:{"^":"e;a,b,c",
dT:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.S(0,new H.bn(y,new H.iU(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.a2(new H.iV(this,b),0),a)}else throw H.c(new P.r("Timer greater than 0."))},
q:{
iT:function(a,b){var z=new H.iS(!0,!1,null)
z.dT(a,b)
return z}}},
iU:{"^":"i:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
iV:{"^":"i:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aB:{"^":"e;ba:a<",
gv:function(a){var z=this.a
if(typeof z!=="number")return z.fw()
z=C.d.bh(z,0)^C.d.ap(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aB){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aK:{"^":"e;a,b",
M:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.k(0,a,z.gi(z))
z=J.q(a)
if(!!z.$iscn)return["buffer",a]
if(!!z.$isbE)return["typed",a]
if(!!z.$isl)return this.dv(a)
if(!!z.$ishO){x=this.gds()
w=z.ga9(a)
w=H.bC(w,x,H.C(w,"X",0),null)
w=P.cl(w,!0,H.C(w,"X",0))
z=z.gdl(a)
z=H.bC(z,x,H.C(z,"X",0),null)
return["map",w,P.cl(z,!0,H.C(z,"X",0))]}if(!!z.$isi_)return this.dw(a)
if(!!z.$isd)this.dg(a)
if(!!z.$isiw)this.aA(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbQ)return this.dz(a)
if(!!z.$iscD)return this.dA(a)
if(!!z.$isi){v=a.$static_name
if(v==null)this.aA(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaB)return["capability",a.a]
if(!(a instanceof P.e))this.dg(a)
return["dart",init.classIdExtractor(a),this.du(init.classFieldsExtractor(a))]},"$1","gds",2,0,1],
aA:function(a,b){throw H.c(new P.r((b==null?"Can't transmit:":b)+" "+H.h(a)))},
dg:function(a){return this.aA(a,null)},
dv:function(a){var z=this.dt(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aA(a,"Can't serialize indexable: ")},
dt:function(a){var z,y,x
z=[]
C.b.si(z,a.length)
for(y=0;y<a.length;++y){x=this.M(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
du:function(a){var z
for(z=0;z<a.length;++z)C.b.k(a,z,this.M(a[z]))
return a},
dw:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aA(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.si(y,z.length)
for(x=0;x<z.length;++x){w=this.M(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
dA:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dz:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gba()]
return["raw sendport",a]}},
bO:{"^":"e;a,b",
a7:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.c5("Bad serialized message: "+H.h(a)))
switch(C.b.gbp(a)){case"ref":if(1>=a.length)return H.f(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.f(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.B(this.aq(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.B(this.aq(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.aq(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.B(this.aq(x),[null])
y.fixed$length=Array
return y
case"map":return this.eK(a)
case"sendport":return this.eL(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.eJ(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.aB(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aq(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.h(a))}},"$1","geI",2,0,1],
aq:function(a){var z,y,x
z=J.R(a)
y=0
while(!0){x=z.gi(a)
if(typeof x!=="number")return H.k(x)
if(!(y<x))break
z.k(a,y,this.a7(z.h(a,y)));++y}return a},
eK:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.bz()
this.b.push(w)
y=J.fl(y,this.geI()).ax(0)
for(z=J.R(y),v=J.R(x),u=0;u<z.gi(y);++u){if(u>=y.length)return H.f(y,u)
w.k(0,y[u],this.a7(v.h(x,u)))}return w},
eL:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.O(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bs(w)
if(u==null)return
t=new H.bQ(u,x)}else t=new H.cD(y,w,x)
this.b.push(t)
return t},
eJ:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.R(y)
v=J.R(x)
u=0
while(!0){t=z.gi(y)
if(typeof t!=="number")return H.k(t)
if(!(u<t))break
w[z.h(y,u)]=this.a7(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
kJ:function(a){return init.types[a]},
eI:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.q(a).$isn},
h:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.a5(a)
if(typeof z!=="string")throw H.c(H.P(a))
return z},
ap:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
dO:function(a){var z,y,x,w,v,u,t,s
z=J.q(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.w||!!J.q(a).$isbm){v=C.o(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.f.b4(w,0)===36)w=C.f.dE(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.eJ(H.bV(a),0,null),init.mangledGlobalNames)},
bG:function(a){return"Instance of '"+H.dO(a)+"'"},
mM:[function(){return Date.now()},"$0","kj",0,0,26],
iu:function(){var z,y
if($.bH!=null)return
$.bH=1000
$.aG=H.kj()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.bH=1e6
$.aG=new H.iv(y)},
aF:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
it:function(a){var z=H.aF(a).getUTCFullYear()+0
return z},
ir:function(a){var z=H.aF(a).getUTCMonth()+1
return z},
im:function(a){var z=H.aF(a).getUTCDate()+0
return z},
io:function(a){var z=H.aF(a).getUTCHours()+0
return z},
iq:function(a){var z=H.aF(a).getUTCMinutes()+0
return z},
is:function(a){var z=H.aF(a).getUTCSeconds()+0
return z},
ip:function(a){var z=H.aF(a).getUTCMilliseconds()+0
return z},
cs:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
return a[b]},
dP:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.P(a))
a[b]=c},
k:function(a){throw H.c(H.P(a))},
f:function(a,b){if(a==null)J.bc(a)
throw H.c(H.E(a,b))},
E:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ac(!0,b,"index",null)
z=J.bc(a)
if(!(b<0)){if(typeof z!=="number")return H.k(z)
y=b>=z}else y=!0
if(y)return P.z(b,a,"index",null,z)
return P.bI(b,"index",null)},
P:function(a){return new P.ac(!0,a,null,null)},
cL:function(a){if(typeof a!=="number")throw H.c(H.P(a))
return a},
c:function(a){var z
if(a==null)a=new P.cq()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eR})
z.name=""}else z.toString=H.eR
return z},
eR:function(){return J.a5(this.dartException)},
D:function(a){throw H.c(a)},
aS:function(a){throw H.c(new P.G(a))},
F:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.lj(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.bh(x,16)&8191)===10)switch(w){case 438:return z.$1(H.ck(H.h(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.h(y)+" (Error "+w+")"
return z.$1(new H.dL(v,null))}}if(a instanceof TypeError){u=$.$get$e0()
t=$.$get$e1()
s=$.$get$e2()
r=$.$get$e3()
q=$.$get$e7()
p=$.$get$e8()
o=$.$get$e5()
$.$get$e4()
n=$.$get$ea()
m=$.$get$e9()
l=u.P(y)
if(l!=null)return z.$1(H.ck(y,l))
else{l=t.P(y)
if(l!=null){l.method="call"
return z.$1(H.ck(y,l))}else{l=s.P(y)
if(l==null){l=r.P(y)
if(l==null){l=q.P(y)
if(l==null){l=p.P(y)
if(l==null){l=o.P(y)
if(l==null){l=r.P(y)
if(l==null){l=n.P(y)
if(l==null){l=m.P(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dL(y,l==null?null:l.method))}}return z.$1(new H.j_(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dT()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ac(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dT()
return a},
S:function(a){var z
if(a==null)return new H.eq(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eq(a,null)},
ld:function(a){if(a==null||typeof a!='object')return J.V(a)
else return H.ap(a)},
kI:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.k(0,a[y],a[x])}return b},
kX:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bp(b,new H.kY(a))
case 1:return H.bp(b,new H.kZ(a,d))
case 2:return H.bp(b,new H.l_(a,d,e))
case 3:return H.bp(b,new H.l0(a,d,e,f))
case 4:return H.bp(b,new H.l1(a,d,e,f,g))}throw H.c(P.ae("Unsupported number of arguments for wrapped closure"))},
a2:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.kX)
a.$identity=z
return z},
fF:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.q(c).$isb){z.$reflectionInfo=c
x=H.iy(z).r}else x=c
w=d?Object.create(new H.iE().constructor.prototype):Object.create(new H.c9(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a6
$.a6=J.w(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.db(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.kJ,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.da:H.ca
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.db(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
fC:function(a,b,c,d){var z=H.ca
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
db:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.fE(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fC(y,!w,z,b)
if(y===0){w=$.a6
$.a6=J.w(w,1)
u="self"+H.h(w)
w="return function(){var "+u+" = this."
v=$.aW
if(v==null){v=H.bw("self")
$.aW=v}return new Function(w+H.h(v)+";return "+u+"."+H.h(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.a6
$.a6=J.w(w,1)
t+=H.h(w)
w="return function("+t+"){return this."
v=$.aW
if(v==null){v=H.bw("self")
$.aW=v}return new Function(w+H.h(v)+"."+H.h(z)+"("+t+");}")()},
fD:function(a,b,c,d){var z,y
z=H.ca
y=H.da
switch(b?-1:a){case 0:throw H.c(new H.iB("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fE:function(a,b){var z,y,x,w,v,u,t,s
z=H.fA()
y=$.d9
if(y==null){y=H.bw("receiver")
$.d9=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fD(w,!u,x,b)
if(w===1){y="return function(){return this."+H.h(z)+"."+H.h(x)+"(this."+H.h(y)+");"
u=$.a6
$.a6=J.w(u,1)
return new Function(y+H.h(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.h(z)+"."+H.h(x)+"(this."+H.h(y)+", "+s+");"
u=$.a6
$.a6=J.w(u,1)
return new Function(y+H.h(u)+"}")()},
cM:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.q(c).$isb){c.fixed$length=Array
z=c}else z=c
return H.fF(a,b,z,!!d,e,f)},
kG:function(a){var z=J.q(a)
return"$S" in z?z.$S():null},
aO:function(a,b){var z
if(a==null)return!1
z=H.kG(a)
return z==null?!1:H.eH(z,b)},
li:function(a){throw H.c(new P.fL(a))},
bY:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
eF:function(a){return init.getIsolateTag(a)},
B:function(a,b){a.$ti=b
return a},
bV:function(a){if(a==null)return
return a.$ti},
eG:function(a,b){return H.cU(a["$as"+H.h(b)],H.bV(a))},
C:function(a,b,c){var z=H.eG(a,b)
return z==null?null:z[c]},
K:function(a,b){var z=H.bV(a)
return z==null?null:z[b]},
aR:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.eJ(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.h(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.aR(z,b)
return H.kh(a,b)}return"unknown-reified-type"},
kh:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.aR(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.aR(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.aR(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.kH(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.aR(r[p],b)+(" "+H.h(p))}w+="}"}return"("+w+") => "+z},
eJ:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.ct("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.C=v+", "
u=a[y]
if(u!=null)w=!1
v=z.C+=H.aR(u,c)}return w?"":"<"+z.j(0)+">"},
cU:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
bS:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bV(a)
y=J.q(a)
if(y[b]==null)return!1
return H.eC(H.cU(y[d],z),c)},
eC:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.T(a[y],b[y]))return!1
return!0},
cN:function(a,b,c){return a.apply(b,H.eG(b,c))},
T:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="bF")return!0
if('func' in b)return H.eH(a,b)
if('func' in a)return b.builtin$cls==="m4"||b.builtin$cls==="e"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.aR(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.eC(H.cU(u,z),x)},
eB:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.T(z,v)||H.T(v,z)))return!1}return!0},
kp:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.T(v,u)||H.T(u,v)))return!1}return!0},
eH:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.T(z,y)||H.T(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eB(x,w,!1))return!1
if(!H.eB(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.T(o,n)||H.T(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.T(o,n)||H.T(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.T(o,n)||H.T(n,o)))return!1}}return H.kp(a.named,b.named)},
nZ:function(a){var z=$.cR
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
nX:function(a){return H.ap(a)},
nW:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
l5:function(a){var z,y,x,w,v,u
z=$.cR.$1(a)
y=$.bT[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bW[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eA.$2(a,z)
if(z!=null){y=$.bT[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bW[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cT(x)
$.bT[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bW[z]=x
return x}if(v==="-"){u=H.cT(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eM(a,x)
if(v==="*")throw H.c(new P.b4(z))
if(init.leafTags[z]===true){u=H.cT(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eM(a,x)},
eM:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bX(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cT:function(a){return J.bX(a,!1,null,!!a.$isn)},
lc:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bX(z,!1,null,!!z.$isn)
else return J.bX(z,c,null,null)},
kR:function(){if(!0===$.cS)return
$.cS=!0
H.kS()},
kS:function(){var z,y,x,w,v,u,t,s
$.bT=Object.create(null)
$.bW=Object.create(null)
H.kN()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eO.$1(v)
if(u!=null){t=H.lc(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
kN:function(){var z,y,x,w,v,u,t
z=C.C()
z=H.aN(C.z,H.aN(C.E,H.aN(C.n,H.aN(C.n,H.aN(C.D,H.aN(C.A,H.aN(C.B(C.o),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cR=new H.kO(v)
$.eA=new H.kP(u)
$.eO=new H.kQ(t)},
aN:function(a,b){return a(b)||b},
ix:{"^":"e;a,b,c,d,e,f,r,x",q:{
iy:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.ix(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
iv:{"^":"i:0;a",
$0:function(){return C.d.eN(1000*this.a.now())}},
iZ:{"^":"e;a,b,c,d,e,f",
P:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
q:{
aa:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.iZ(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bL:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
e6:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dL:{"^":"M;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.h(this.a)
return"NullError: method not found: '"+H.h(z)+"' on null"}},
i5:{"^":"M;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.h(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.h(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.h(this.a)+")"},
q:{
ck:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.i5(a,y,z?null:b.receiver)}}},
j_:{"^":"M;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
lj:{"^":"i:1;a",
$1:function(a){if(!!J.q(a).$isM)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eq:{"^":"e;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
kY:{"^":"i:0;a",
$0:function(){return this.a.$0()}},
kZ:{"^":"i:0;a,b",
$0:function(){return this.a.$1(this.b)}},
l_:{"^":"i:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
l0:{"^":"i:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
l1:{"^":"i:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
i:{"^":"e;",
j:function(a){return"Closure '"+H.dO(this).trim()+"'"},
gdq:function(){return this},
gdq:function(){return this}},
dV:{"^":"i;"},
iE:{"^":"dV;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
c9:{"^":"dV;a,b,c,d",
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.c9))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.ap(this.a)
else y=typeof z!=="object"?J.V(z):H.ap(z)
z=H.ap(this.b)
if(typeof y!=="number")return y.fz()
return(y^z)>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.h(this.d)+"' of "+H.bG(z)},
q:{
ca:function(a){return a.a},
da:function(a){return a.c},
fA:function(){var z=$.aW
if(z==null){z=H.bw("self")
$.aW=z}return z},
bw:function(a){var z,y,x,w,v
z=new H.c9("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
iB:{"^":"M;a",
j:function(a){return"RuntimeError: "+H.h(this.a)}},
aD:{"^":"e;a,b,c,d,e,f,r,$ti",
gi:function(a){return this.a},
gU:function(a){return this.a===0},
ga9:function(a){return new H.i7(this,[H.K(this,0)])},
gdl:function(a){return H.bC(this.ga9(this),new H.i4(this),H.K(this,0),H.K(this,1))},
cJ:function(a,b){var z
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.c
if(z==null)return!1
return this.e8(z,b)}else return this.f_(b)},
f_:function(a){var z=this.d
if(z==null)return!1
return this.au(this.aG(z,this.at(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.an(z,b)
return y==null?null:y.ga8()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.an(x,b)
return y==null?null:y.ga8()}else return this.f0(b)},
f0:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.aG(z,this.at(a))
x=this.au(y,a)
if(x<0)return
return y[x].ga8()},
k:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bd()
this.b=z}this.bZ(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bd()
this.c=y}this.bZ(y,b,c)}else{x=this.d
if(x==null){x=this.bd()
this.d=x}w=this.at(b)
v=this.aG(x,w)
if(v==null)this.bg(x,w,[this.be(b,c)])
else{u=this.au(v,b)
if(u>=0)v[u].sa8(c)
else v.push(this.be(b,c))}}},
W:function(a,b){if(typeof b==="string")return this.ck(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ck(this.c,b)
else return this.f1(b)},
f1:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.aG(z,this.at(a))
x=this.au(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cs(w)
return w.ga8()},
ai:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
E:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.G(this))
z=z.c}},
bZ:function(a,b,c){var z=this.an(a,b)
if(z==null)this.bg(a,b,this.be(b,c))
else z.sa8(c)},
ck:function(a,b){var z
if(a==null)return
z=this.an(a,b)
if(z==null)return
this.cs(z)
this.c3(a,b)
return z.ga8()},
be:function(a,b){var z,y
z=new H.i6(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cs:function(a){var z,y
z=a.gem()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
at:function(a){return J.V(a)&0x3ffffff},
au:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.O(a[y].gcY(),b))return y
return-1},
j:function(a){return P.ib(this)},
an:function(a,b){return a[b]},
aG:function(a,b){return a[b]},
bg:function(a,b,c){a[b]=c},
c3:function(a,b){delete a[b]},
e8:function(a,b){return this.an(a,b)!=null},
bd:function(){var z=Object.create(null)
this.bg(z,"<non-identifier-key>",z)
this.c3(z,"<non-identifier-key>")
return z},
$ishO:1,
$isN:1,
$asN:null},
i4:{"^":"i:1;a",
$1:function(a){return this.a.h(0,a)}},
i6:{"^":"e;cY:a<,a8:b@,c,em:d<,$ti"},
i7:{"^":"a;a,$ti",
gi:function(a){return this.a.a},
gD:function(a){var z,y
z=this.a
y=new H.i8(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
E:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.G(z))
y=y.c}}},
i8:{"^":"e;a,b,c,d,$ti",
gu:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.G(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
kO:{"^":"i:1;a",
$1:function(a){return this.a(a)}},
kP:{"^":"i:13;a",
$2:function(a,b){return this.a(a,b)}},
kQ:{"^":"i:3;a",
$1:function(a){return this.a(a)}},
i2:{"^":"e;a,b,c,d",
j:function(a){return"RegExp/"+this.a+"/"},
$isiz:1,
q:{
i3:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.h_("Illegal RegExp pattern ("+String(w)+")",a,null))}}}}],["","",,H,{"^":"",
kH:function(a){var z=H.B(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
eN:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
et:function(a){return a},
bR:function(a){return a},
cn:{"^":"d;",$iscn:1,"%":"ArrayBuffer"},
bE:{"^":"d;",$isbE:1,"%":"DataView;ArrayBufferView;co|dF|dH|cp|dG|dI|an"},
co:{"^":"bE;",
gi:function(a){return a.length},
$isn:1,
$asn:I.J,
$isl:1,
$asl:I.J},
cp:{"^":"dH;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.E(a,b))
return a[b]},
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.D(H.E(a,b))
a[b]=c}},
dF:{"^":"co+x;",$asn:I.J,$asl:I.J,
$asb:function(){return[P.az]},
$asa:function(){return[P.az]},
$isb:1,
$isa:1},
dH:{"^":"dF+dt;",$asn:I.J,$asl:I.J,
$asb:function(){return[P.az]},
$asa:function(){return[P.az]}},
an:{"^":"dI;",
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.D(H.E(a,b))
a[b]=c},
$isb:1,
$asb:function(){return[P.u]},
$isa:1,
$asa:function(){return[P.u]}},
dG:{"^":"co+x;",$asn:I.J,$asl:I.J,
$asb:function(){return[P.u]},
$asa:function(){return[P.u]},
$isb:1,
$isa:1},
dI:{"^":"dG+dt;",$asn:I.J,$asl:I.J,
$asb:function(){return[P.u]},
$asa:function(){return[P.u]}},
mo:{"^":"cp;",$isb:1,
$asb:function(){return[P.az]},
$isa:1,
$asa:function(){return[P.az]},
"%":"Float32Array"},
mp:{"^":"cp;",$isb:1,
$asb:function(){return[P.az]},
$isa:1,
$asa:function(){return[P.az]},
"%":"Float64Array"},
mq:{"^":"an;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.E(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.u]},
$isa:1,
$asa:function(){return[P.u]},
"%":"Int16Array"},
mr:{"^":"an;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.E(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.u]},
$isa:1,
$asa:function(){return[P.u]},
"%":"Int32Array"},
ms:{"^":"an;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.E(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.u]},
$isa:1,
$asa:function(){return[P.u]},
"%":"Int8Array"},
mt:{"^":"an;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.E(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.u]},
$isa:1,
$asa:function(){return[P.u]},
"%":"Uint16Array"},
mu:{"^":"an;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.E(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.u]},
$isa:1,
$asa:function(){return[P.u]},
"%":"Uint32Array"},
mv:{"^":"an;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.E(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.u]},
$isa:1,
$asa:function(){return[P.u]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
mw:{"^":"an;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.D(H.E(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.u]},
$isa:1,
$asa:function(){return[P.u]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
j7:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.kq()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.a2(new P.j9(z),1)).observe(y,{childList:true})
return new P.j8(z,y,x)}else if(self.setImmediate!=null)return P.kr()
return P.ks()},
nv:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.a2(new P.ja(a),0))},"$1","kq",2,0,9],
nw:[function(a){++init.globalState.f.b
self.setImmediate(H.a2(new P.jb(a),0))},"$1","kr",2,0,9],
nx:[function(a){P.cu(C.m,a)},"$1","ks",2,0,9],
ev:function(a,b){if(H.aO(a,{func:1,args:[P.bF,P.bF]})){b.toString
return a}else{b.toString
return a}},
kk:function(){var z,y
for(;z=$.aL,z!=null;){$.b8=null
y=z.b
$.aL=y
if(y==null)$.b7=null
z.a.$0()}},
nV:[function(){$.cG=!0
try{P.kk()}finally{$.b8=null
$.cG=!1
if($.aL!=null)$.$get$cx().$1(P.eD())}},"$0","eD",0,0,2],
ez:function(a){var z=new P.ed(a,null)
if($.aL==null){$.b7=z
$.aL=z
if(!$.cG)$.$get$cx().$1(P.eD())}else{$.b7.b=z
$.b7=z}},
ko:function(a){var z,y,x
z=$.aL
if(z==null){P.ez(a)
$.b8=$.b7
return}y=new P.ed(a,null)
x=$.b8
if(x==null){y.b=z
$.b8=y
$.aL=y}else{y.b=x.b
x.b=y
$.b8=y
if(y.b==null)$.b7=y}},
eP:function(a){var z=$.t
if(C.c===z){P.aM(null,null,C.c,a)
return}z.toString
P.aM(null,null,z,z.bk(a,!0))},
nT:[function(a){},"$1","kt",2,0,27],
kl:[function(a,b){var z=$.t
z.toString
P.b9(null,null,z,a,b)},function(a){return P.kl(a,null)},"$2","$1","kv",2,2,5,0],
nU:[function(){},"$0","ku",0,0,2],
kn:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.F(u)
y=H.S(u)
$.t.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.aT(x)
w=t
v=x.gY()
c.$2(w,v)}}},
kc:function(a,b,c,d){var z=a.bm(0)
if(!!J.q(z).$isaf&&z!==$.$get$be())z.bD(new P.kf(b,c,d))
else b.N(c,d)},
kd:function(a,b){return new P.ke(a,b)},
kb:function(a,b,c){$.t.toString
a.aZ(b,c)},
iW:function(a,b){var z=$.t
if(z===C.c){z.toString
return P.cu(a,b)}return P.cu(a,z.bk(b,!0))},
cu:function(a,b){var z=C.a.ap(a.a,1000)
return H.iT(z<0?0:z,b)},
j3:function(){return $.t},
b9:function(a,b,c,d,e){var z={}
z.a=d
P.ko(new P.km(z,e))},
ew:function(a,b,c,d){var z,y
y=$.t
if(y===c)return d.$0()
$.t=c
z=y
try{y=d.$0()
return y}finally{$.t=z}},
ey:function(a,b,c,d,e){var z,y
y=$.t
if(y===c)return d.$1(e)
$.t=c
z=y
try{y=d.$1(e)
return y}finally{$.t=z}},
ex:function(a,b,c,d,e,f){var z,y
y=$.t
if(y===c)return d.$2(e,f)
$.t=c
z=y
try{y=d.$2(e,f)
return y}finally{$.t=z}},
aM:function(a,b,c,d){var z=C.c!==c
if(z)d=c.bk(d,!(!z||!1))
P.ez(d)},
j9:{"^":"i:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
j8:{"^":"i:14;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
ja:{"^":"i:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
jb:{"^":"i:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
eg:{"^":"e;$ti",
eD:[function(a,b){if(a==null)a=new P.cq()
if(this.a.a!==0)throw H.c(new P.a9("Future already completed"))
$.t.toString
this.N(a,b)},function(a){return this.eD(a,null)},"cI","$2","$1","geC",2,2,5,0]},
ee:{"^":"eg;a,$ti",
aL:function(a,b){var z=this.a
if(z.a!==0)throw H.c(new P.a9("Future already completed"))
z.e2(b)},
N:function(a,b){this.a.e3(a,b)}},
k6:{"^":"eg;a,$ti",
aL:function(a,b){var z=this.a
if(z.a!==0)throw H.c(new P.a9("Future already completed"))
z.am(b)},
N:function(a,b){this.a.N(a,b)}},
ej:{"^":"e;bf:a<,b,c,d,e,$ti",
geu:function(){return this.b.b},
gcX:function(){return(this.c&1)!==0},
geV:function(){return(this.c&2)!==0},
gcW:function(){return this.c===8},
eT:function(a){return this.b.b.bx(this.d,a)},
f5:function(a){if(this.c!==6)return!0
return this.b.b.bx(this.d,J.aT(a))},
eP:function(a){var z,y,x
z=this.e
y=J.j(a)
x=this.b.b
if(H.aO(z,{func:1,args:[,,]}))return x.fm(z,y.gL(a),a.gY())
else return x.bx(z,y.gL(a))},
eU:function(){return this.b.b.d7(this.d)}},
a_:{"^":"e;aJ:a<,b,eq:c<,$ti",
gej:function(){return this.a===2},
gbc:function(){return this.a>=4},
da:function(a,b){var z,y,x
z=$.t
if(z!==C.c){z.toString
if(b!=null)b=P.ev(b,z)}y=new P.a_(0,z,null,[null])
x=b==null?1:3
this.b_(new P.ej(null,y,x,a,b,[H.K(this,0),null]))
return y},
G:function(a){return this.da(a,null)},
bD:function(a){var z,y
z=$.t
y=new P.a_(0,z,null,this.$ti)
if(z!==C.c)z.toString
z=H.K(this,0)
this.b_(new P.ej(null,y,8,a,null,[z,z]))
return y},
b_:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gbc()){y.b_(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.aM(null,null,z,new P.ju(this,a))}},
cj:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gbf()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gbc()){v.cj(a)
return}this.a=v.a
this.c=v.c}z.a=this.aI(a)
y=this.b
y.toString
P.aM(null,null,y,new P.jB(z,this))}},
aH:function(){var z=this.c
this.c=null
return this.aI(z)},
aI:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gbf()
z.a=y}return y},
am:function(a){var z,y
z=this.$ti
if(H.bS(a,"$isaf",z,"$asaf"))if(H.bS(a,"$isa_",z,null))P.bP(a,this)
else P.ek(a,this)
else{y=this.aH()
this.a=4
this.c=a
P.aJ(this,y)}},
N:[function(a,b){var z=this.aH()
this.a=8
this.c=new P.bu(a,b)
P.aJ(this,z)},function(a){return this.N(a,null)},"fA","$2","$1","gb6",2,2,5,0],
e2:function(a){var z
if(H.bS(a,"$isaf",this.$ti,"$asaf")){this.e4(a)
return}this.a=1
z=this.b
z.toString
P.aM(null,null,z,new P.jw(this,a))},
e4:function(a){var z
if(H.bS(a,"$isa_",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.aM(null,null,z,new P.jA(this,a))}else P.bP(a,this)
return}P.ek(a,this)},
e3:function(a,b){var z
this.a=1
z=this.b
z.toString
P.aM(null,null,z,new P.jv(this,a,b))},
dX:function(a,b){this.a=4
this.c=a},
$isaf:1,
q:{
ek:function(a,b){var z,y,x
b.a=1
try{a.da(new P.jx(b),new P.jy(b))}catch(x){z=H.F(x)
y=H.S(x)
P.eP(new P.jz(b,z,y))}},
bP:function(a,b){var z,y,x
for(;a.gej();)a=a.c
z=a.gbc()
y=b.c
if(z){b.c=null
x=b.aI(y)
b.a=a.a
b.c=a.c
P.aJ(b,x)}else{b.a=2
b.c=a
a.cj(y)}},
aJ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=J.aT(v)
t=v.gY()
y.toString
P.b9(null,null,y,u,t)}return}for(;b.gbf()!=null;b=s){s=b.a
b.a=null
P.aJ(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gcX()||b.gcW()){q=b.geu()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=J.aT(v)
t=v.gY()
y.toString
P.b9(null,null,y,u,t)
return}p=$.t
if(p==null?q!=null:p!==q)$.t=q
else p=null
if(b.gcW())new P.jE(z,x,w,b).$0()
else if(y){if(b.gcX())new P.jD(x,b,r).$0()}else if(b.geV())new P.jC(z,x,b).$0()
if(p!=null)$.t=p
y=x.b
if(!!J.q(y).$isaf){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.aI(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.bP(y,o)
return}}o=b.b
b=o.aH()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
ju:{"^":"i:0;a,b",
$0:function(){P.aJ(this.a,this.b)}},
jB:{"^":"i:0;a,b",
$0:function(){P.aJ(this.b,this.a.a)}},
jx:{"^":"i:1;a",
$1:function(a){var z=this.a
z.a=0
z.am(a)}},
jy:{"^":"i:15;a",
$2:function(a,b){this.a.N(a,b)},
$1:function(a){return this.$2(a,null)}},
jz:{"^":"i:0;a,b,c",
$0:function(){this.a.N(this.b,this.c)}},
jw:{"^":"i:0;a,b",
$0:function(){var z,y
z=this.a
y=z.aH()
z.a=4
z.c=this.b
P.aJ(z,y)}},
jA:{"^":"i:0;a,b",
$0:function(){P.bP(this.b,this.a)}},
jv:{"^":"i:0;a,b,c",
$0:function(){this.a.N(this.b,this.c)}},
jE:{"^":"i:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.eU()}catch(w){y=H.F(w)
x=H.S(w)
if(this.c){v=J.aT(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.bu(y,x)
u.a=!0
return}if(!!J.q(z).$isaf){if(z instanceof P.a_&&z.gaJ()>=4){if(z.gaJ()===8){v=this.b
v.b=z.geq()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.G(new P.jF(t))
v.a=!1}}},
jF:{"^":"i:1;a",
$1:function(a){return this.a}},
jD:{"^":"i:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.eT(this.c)}catch(x){z=H.F(x)
y=H.S(x)
w=this.a
w.b=new P.bu(z,y)
w.a=!0}}},
jC:{"^":"i:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.f5(z)===!0&&w.e!=null){v=this.b
v.b=w.eP(z)
v.a=!1}}catch(u){y=H.F(u)
x=H.S(u)
w=this.a
v=J.aT(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.bu(y,x)
s.a=!0}}},
ed:{"^":"e;a,b"},
aI:{"^":"e;$ti",
a1:function(a,b){return new P.jP(b,this,[H.C(this,"aI",0),null])},
E:function(a,b){var z,y
z={}
y=new P.a_(0,$.t,null,[null])
z.a=null
z.a=this.ak(new P.iK(z,this,b,y),!0,new P.iL(y),y.gb6())
return y},
gi:function(a){var z,y
z={}
y=new P.a_(0,$.t,null,[P.u])
z.a=0
this.ak(new P.iM(z),!0,new P.iN(z,y),y.gb6())
return y},
ax:function(a){var z,y,x
z=H.C(this,"aI",0)
y=H.B([],[z])
x=new P.a_(0,$.t,null,[[P.b,z]])
this.ak(new P.iO(this,y),!0,new P.iP(y,x),x.gb6())
return x}},
iK:{"^":"i;a,b,c,d",
$1:function(a){P.kn(new P.iI(this.c,a),new P.iJ(),P.kd(this.a.a,this.d))},
$S:function(){return H.cN(function(a){return{func:1,args:[a]}},this.b,"aI")}},
iI:{"^":"i:0;a,b",
$0:function(){return this.a.$1(this.b)}},
iJ:{"^":"i:1;",
$1:function(a){}},
iL:{"^":"i:0;a",
$0:function(){this.a.am(null)}},
iM:{"^":"i:1;a",
$1:function(a){++this.a.a}},
iN:{"^":"i:0;a,b",
$0:function(){this.b.am(this.a.a)}},
iO:{"^":"i;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.cN(function(a){return{func:1,args:[a]}},this.a,"aI")}},
iP:{"^":"i:0;a,b",
$0:function(){this.b.am(this.a)}},
iH:{"^":"e;$ti"},
bN:{"^":"e;aJ:e<,$ti",
bt:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.cB()
if((z&4)===0&&(this.e&32)===0)this.c8(this.gce())},
d3:function(a){return this.bt(a,null)},
d6:function(a){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gU(z)}else z=!1
if(z)this.r.aV(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.c8(this.gcg())}}}},
bm:function(a){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.b2()
z=this.f
return z==null?$.$get$be():z},
b2:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.cB()
if((this.e&32)===0)this.r=null
this.f=this.cd()},
b1:["dJ",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cn(b)
else this.b0(new P.ji(b,null,[H.C(this,"bN",0)]))}],
aZ:["dK",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cp(a,b)
else this.b0(new P.jk(a,b,null))}],
e1:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.co()
else this.b0(C.t)},
cf:[function(){},"$0","gce",0,0,2],
ci:[function(){},"$0","gcg",0,0,2],
cd:function(){return},
b0:function(a){var z,y
z=this.r
if(z==null){z=new P.k1(null,null,0,[H.C(this,"bN",0)])
this.r=z}z.H(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aV(this)}},
cn:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.by(this.a,a)
this.e=(this.e&4294967263)>>>0
this.b3((z&4)!==0)},
cp:function(a,b){var z,y
z=this.e
y=new P.je(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.b2()
z=this.f
if(!!J.q(z).$isaf&&z!==$.$get$be())z.bD(y)
else y.$0()}else{y.$0()
this.b3((z&4)!==0)}},
co:function(){var z,y
z=new P.jd(this)
this.b2()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.q(y).$isaf&&y!==$.$get$be())y.bD(z)
else z.$0()},
c8:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.b3((z&4)!==0)},
b3:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gU(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gU(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cf()
else this.ci()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aV(this)},
dU:function(a,b,c,d,e){var z,y
z=a==null?P.kt():a
y=this.d
y.toString
this.a=z
this.b=P.ev(b==null?P.kv():b,y)
this.c=c==null?P.ku():c}},
je:{"^":"i:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aO(y,{func:1,args:[P.e,P.aH]})
w=z.d
v=this.b
u=z.b
if(x)w.fn(u,v,this.c)
else w.by(u,v)
z.e=(z.e&4294967263)>>>0}},
jd:{"^":"i:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.d8(z.c)
z.e=(z.e&4294967263)>>>0}},
cy:{"^":"e;aP:a*,$ti"},
ji:{"^":"cy;b,a,$ti",
bu:function(a){a.cn(this.b)}},
jk:{"^":"cy;L:b>,Y:c<,a",
bu:function(a){a.cp(this.b,this.c)},
$ascy:I.J},
jj:{"^":"e;",
bu:function(a){a.co()},
gaP:function(a){return},
saP:function(a,b){throw H.c(new P.a9("No events after a done."))}},
jR:{"^":"e;aJ:a<,$ti",
aV:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.eP(new P.jS(this,a))
this.a=1},
cB:function(){if(this.a===1)this.a=3}},
jS:{"^":"i:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gaP(x)
z.b=w
if(w==null)z.c=null
x.bu(this.b)}},
k1:{"^":"jR;b,c,a,$ti",
gU:function(a){return this.c==null},
H:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saP(0,b)
this.c=b}}},
kf:{"^":"i:0;a,b,c",
$0:function(){return this.a.N(this.b,this.c)}},
ke:{"^":"i:16;a,b",
$2:function(a,b){P.kc(this.a,this.b,a,b)}},
cz:{"^":"aI;$ti",
ak:function(a,b,c,d){return this.e9(a,d,c,!0===b)},
d0:function(a,b,c){return this.ak(a,null,b,c)},
e9:function(a,b,c,d){return P.jt(this,a,b,c,d,H.C(this,"cz",0),H.C(this,"cz",1))},
c9:function(a,b){b.b1(0,a)},
eg:function(a,b,c){c.aZ(a,b)},
$asaI:function(a,b){return[b]}},
ei:{"^":"bN;x,y,a,b,c,d,e,f,r,$ti",
b1:function(a,b){if((this.e&2)!==0)return
this.dJ(0,b)},
aZ:function(a,b){if((this.e&2)!==0)return
this.dK(a,b)},
cf:[function(){var z=this.y
if(z==null)return
z.d3(0)},"$0","gce",0,0,2],
ci:[function(){var z=this.y
if(z==null)return
z.d6(0)},"$0","gcg",0,0,2],
cd:function(){var z=this.y
if(z!=null){this.y=null
return z.bm(0)}return},
fB:[function(a){this.x.c9(a,this)},"$1","ged",2,0,function(){return H.cN(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"ei")}],
fD:[function(a,b){this.x.eg(a,b,this)},"$2","gef",4,0,17],
fC:[function(){this.e1()},"$0","gee",0,0,2],
dW:function(a,b,c,d,e,f,g){this.y=this.x.a.d0(this.ged(),this.gee(),this.gef())},
$asbN:function(a,b){return[b]},
q:{
jt:function(a,b,c,d,e,f,g){var z,y
z=$.t
y=e?1:0
y=new P.ei(a,null,null,null,null,z,y,null,null,[f,g])
y.dU(b,c,d,e,g)
y.dW(a,b,c,d,e,f,g)
return y}}},
jP:{"^":"cz;b,a,$ti",
c9:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.F(w)
x=H.S(w)
P.kb(b,y,x)
return}b.b1(0,z)}},
bu:{"^":"e;L:a>,Y:b<",
j:function(a){return H.h(this.a)},
$isM:1},
ka:{"^":"e;"},
km:{"^":"i:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cq()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.a5(y)
throw x}},
jU:{"^":"ka;",
d8:function(a){var z,y,x,w
try{if(C.c===$.t){x=a.$0()
return x}x=P.ew(null,null,this,a)
return x}catch(w){z=H.F(w)
y=H.S(w)
x=P.b9(null,null,this,z,y)
return x}},
by:function(a,b){var z,y,x,w
try{if(C.c===$.t){x=a.$1(b)
return x}x=P.ey(null,null,this,a,b)
return x}catch(w){z=H.F(w)
y=H.S(w)
x=P.b9(null,null,this,z,y)
return x}},
fn:function(a,b,c){var z,y,x,w
try{if(C.c===$.t){x=a.$2(b,c)
return x}x=P.ex(null,null,this,a,b,c)
return x}catch(w){z=H.F(w)
y=H.S(w)
x=P.b9(null,null,this,z,y)
return x}},
bk:function(a,b){if(b)return new P.jV(this,a)
else return new P.jW(this,a)},
ey:function(a,b){return new P.jX(this,a)},
h:function(a,b){return},
d7:function(a){if($.t===C.c)return a.$0()
return P.ew(null,null,this,a)},
bx:function(a,b){if($.t===C.c)return a.$1(b)
return P.ey(null,null,this,a,b)},
fm:function(a,b,c){if($.t===C.c)return a.$2(b,c)
return P.ex(null,null,this,a,b,c)}},
jV:{"^":"i:0;a,b",
$0:function(){return this.a.d8(this.b)}},
jW:{"^":"i:0;a,b",
$0:function(){return this.a.d7(this.b)}},
jX:{"^":"i:1;a,b",
$1:function(a){return this.a.by(this.b,a)}}}],["","",,P,{"^":"",
bz:function(){return new H.aD(0,null,null,null,null,null,0,[null,null])},
aE:function(a){return H.kI(a,new H.aD(0,null,null,null,null,null,0,[null,null]))},
hW:function(a,b,c){var z,y
if(P.cH(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ba()
y.push(a)
try{P.ki(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.dU(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bx:function(a,b,c){var z,y,x
if(P.cH(a))return b+"..."+c
z=new P.ct(b)
y=$.$get$ba()
y.push(a)
try{x=z
x.C=P.dU(x.gC(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.C=y.gC()+c
y=z.gC()
return y.charCodeAt(0)==0?y:y},
cH:function(a){var z,y
for(z=0;y=$.$get$ba(),z<y.length;++z)if(a===y[z])return!0
return!1},
ki:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gD(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.p())return
w=H.h(z.gu())
b.push(w)
y+=w.length+2;++x}if(!z.p()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gu();++x
if(!z.p()){if(x<=4){b.push(H.h(t))
return}v=H.h(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gu();++x
for(;z.p();t=s,s=r){r=z.gu();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.h(t)
v=H.h(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
Y:function(a,b,c,d){return new P.jI(0,null,null,null,null,null,0,[d])},
dD:function(a,b){var z,y,x
z=P.Y(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.aS)(a),++x)z.H(0,a[x])
return z},
ib:function(a){var z,y,x
z={}
if(P.cH(a))return"{...}"
y=new P.ct("")
try{$.$get$ba().push(a)
x=y
x.C=x.gC()+"{"
z.a=!0
a.E(0,new P.ic(z,y))
z=y
z.C=z.gC()+"}"}finally{z=$.$get$ba()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gC()
return z.charCodeAt(0)==0?z:z},
ep:{"^":"aD;a,b,c,d,e,f,r,$ti",
at:function(a){return H.ld(a)&0x3ffffff},
au:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcY()
if(x==null?b==null:x===b)return y}return-1},
q:{
b6:function(a,b){return new P.ep(0,null,null,null,null,null,0,[a,b])}}},
jI:{"^":"jG;a,b,c,d,e,f,r,$ti",
gD:function(a){var z=new P.bo(this,this.r,null,null,[null])
z.c=this.e
return z},
gi:function(a){return this.a},
A:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.e7(b)},
e7:function(a){var z=this.d
if(z==null)return!1
return this.aF(z[this.aD(a)],a)>=0},
bs:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.A(0,a)?a:null
else return this.ek(a)},
ek:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aD(a)]
x=this.aF(y,a)
if(x<0)return
return J.cW(y,x).gc4()},
E:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.G(this))
z=z.b}},
H:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.c0(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.c0(x,b)}else return this.S(0,b)},
S:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.jK()
this.d=z}y=this.aD(b)
x=z[y]
if(x==null)z[y]=[this.b5(b)]
else{if(this.aF(x,b)>=0)return!1
x.push(this.b5(b))}return!0},
W:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.c1(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.c1(this.c,b)
else return this.en(0,b)},
en:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aD(b)]
x=this.aF(y,b)
if(x<0)return!1
this.c2(y.splice(x,1)[0])
return!0},
ai:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
c0:function(a,b){if(a[b]!=null)return!1
a[b]=this.b5(b)
return!0},
c1:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.c2(z)
delete a[b]
return!0},
b5:function(a){var z,y
z=new P.jJ(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c2:function(a){var z,y
z=a.ge6()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aD:function(a){return J.V(a)&0x3ffffff},
aF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.O(a[y].gc4(),b))return y
return-1},
$isa:1,
$asa:null,
q:{
jK:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
jJ:{"^":"e;c4:a<,b,e6:c<"},
bo:{"^":"e;a,b,c,d,$ti",
gu:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.G(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
jG:{"^":"iC;$ti"},
bA:{"^":"cr;$ti"},
cr:{"^":"e+x;$ti",$asb:null,$asa:null,$isb:1,$isa:1},
x:{"^":"e;$ti",
gD:function(a){return new H.dE(a,this.gi(a),0,null,[H.C(a,"x",0)])},
n:function(a,b){return this.h(a,b)},
E:function(a,b){var z,y
z=this.gi(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gi(a))throw H.c(new P.G(a))}},
bq:function(a,b,c){var z,y,x
z=this.gi(a)
for(y=0;y<z;++y){x=this.h(a,y)
if(b.$1(x)===!0)return x
if(z!==this.gi(a))throw H.c(new P.G(a))}throw H.c(H.bg())},
cT:function(a,b){return this.bq(a,b,null)},
a1:function(a,b){return new H.bD(a,b,[H.C(a,"x",0),null])},
ay:function(a,b){var z,y,x
z=H.B([],[H.C(a,"x",0)])
C.b.si(z,this.gi(a))
for(y=0;y<this.gi(a);++y){x=this.h(a,y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
ax:function(a){return this.ay(a,!0)},
j:function(a){return P.bx(a,"[","]")},
$isb:1,
$asb:null,
$isa:1,
$asa:null},
ic:{"^":"i:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.C+=", "
z.a=!1
z=this.b
y=z.C+=H.h(a)
z.C=y+": "
z.C+=H.h(b)}},
i9:{"^":"b0;a,b,c,d,$ti",
gD:function(a){return new P.jL(this,this.c,this.d,this.b,null,this.$ti)},
E:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.D(new P.G(this))}},
gU:function(a){return this.b===this.c},
gi:function(a){return(this.c-this.b&this.a.length-1)>>>0},
n:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(typeof b!=="number")return H.k(b)
if(0>b||b>=z)H.D(P.z(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
ai:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
j:function(a){return P.bx(this,"{","}")},
d5:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.bg());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
S:function(a,b){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=b
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.c7();++this.d},
c7:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.B(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.b.bU(y,0,w,z,x)
C.b.bU(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dP:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.B(z,[b])},
$asa:null,
q:{
bB:function(a,b){var z=new P.i9(null,0,0,0,[b])
z.dP(a,b)
return z}}},
jL:{"^":"e;a,b,c,d,e,$ti",
gu:function(){return this.e},
p:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.D(new P.G(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
iD:{"^":"e;$ti",
Z:function(a,b){var z
for(z=J.bb(b);z.p();)this.H(0,z.gu())},
a1:function(a,b){return new H.cd(this,b,[H.K(this,0),null])},
j:function(a){return P.bx(this,"{","}")},
E:function(a,b){var z
for(z=new P.bo(this,this.r,null,null,[null]),z.c=this.e;z.p();)b.$1(z.d)},
br:function(a,b){var z,y
z=new P.bo(this,this.r,null,null,[null])
z.c=this.e
if(!z.p())return""
if(b===""){y=""
do y+=H.h(z.d)
while(z.p())}else{y=H.h(z.d)
for(;z.p();)y=y+b+H.h(z.d)}return y.charCodeAt(0)==0?y:y},
$isa:1,
$asa:null},
iC:{"^":"iD;$ti"}}],["","",,P,{"^":"",
di:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.a5(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fV(a)},
fV:function(a){var z=J.q(a)
if(!!z.$isi)return z.j(a)
return H.bG(a)},
ae:function(a){return new P.js(a)},
cl:function(a,b,c){var z,y
z=H.B([],[c])
for(y=J.bb(a);y.p();)z.push(y.gu())
if(b)return z
z.fixed$length=Array
return z},
a4:function(a){H.eN(H.h(a))},
iA:function(a,b,c){return new H.i2(a,H.i3(a,!1,!0,!1),null,null)},
cK:{"^":"e;"},
"+bool":0,
cc:{"^":"e;a,b",
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.cc))return!1
return this.a===b.a&&!0},
gv:function(a){var z=this.a
return(z^C.a.bh(z,30))&1073741823},
j:function(a){var z,y,x,w,v,u,t,s
z=P.fM(H.it(this))
y=P.bd(H.ir(this))
x=P.bd(H.im(this))
w=P.bd(H.io(this))
v=P.bd(H.iq(this))
u=P.bd(H.is(this))
t=P.fN(H.ip(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
return s},
gf6:function(){return this.a},
dN:function(a,b){var z
if(!(Math.abs(this.a)>864e13))z=!1
else z=!0
if(z)throw H.c(P.c5(this.gf6()))},
q:{
fM:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.h(z)
if(z>=10)return y+"00"+H.h(z)
return y+"000"+H.h(z)},
fN:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bd:function(a){if(a>=10)return""+a
return"0"+a}}},
az:{"^":"a3;"},
"+double":0,
ak:{"^":"e;aE:a<",
w:function(a,b){return new P.ak(this.a+b.gaE())},
B:function(a,b){return new P.ak(this.a-b.gaE())},
X:function(a,b){if(typeof b!=="number")return H.k(b)
return new P.ak(C.d.a2(this.a*b))},
aC:function(a,b){if(b===0)throw H.c(new P.h8())
if(typeof b!=="number")return H.k(b)
return new P.ak(C.a.aC(this.a,b))},
I:function(a,b){return C.a.I(this.a,b.gaE())},
R:function(a,b){return C.a.R(this.a,b.gaE())},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.ak))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
j:function(a){var z,y,x,w,v
z=new P.fT()
y=this.a
if(y<0)return"-"+new P.ak(0-y).j(0)
x=z.$1(C.a.ap(y,6e7)%60)
w=z.$1(C.a.ap(y,1e6)%60)
v=new P.fS().$1(y%1e6)
return""+C.a.ap(y,36e8)+":"+H.h(x)+":"+H.h(w)+"."+H.h(v)},
aU:function(a){return new P.ak(0-this.a)}},
fS:{"^":"i:10;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fT:{"^":"i:10;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
M:{"^":"e;",
gY:function(){return H.S(this.$thrownJsError)}},
cq:{"^":"M;",
j:function(a){return"Throw of null."}},
ac:{"^":"M;a,b,c,d",
gb8:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gb7:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.h(z)
w=this.gb8()+y+x
if(!this.a)return w
v=this.gb7()
u=P.di(this.b)
return w+v+": "+H.h(u)},
q:{
c5:function(a){return new P.ac(!1,null,null,a)},
c6:function(a,b,c){return new P.ac(!0,a,b,c)},
fy:function(a){return new P.ac(!1,null,a,"Must not be null")}}},
dQ:{"^":"ac;e,f,a,b,c,d",
gb8:function(){return"RangeError"},
gb7:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.h(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.h(z)
else if(x>z)y=": Not in range "+H.h(z)+".."+H.h(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.h(z)}return y},
q:{
bI:function(a,b,c){return new P.dQ(null,null,!0,a,b,"Value not in range")},
b2:function(a,b,c,d,e){return new P.dQ(b,c,!0,a,d,"Invalid value")},
dR:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.b2(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.b2(b,a,c,"end",f))
return b}}},
h7:{"^":"ac;e,i:f>,a,b,c,d",
gb8:function(){return"RangeError"},
gb7:function(){if(J.eT(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.h(z)},
q:{
z:function(a,b,c,d,e){var z=e!=null?e:J.bc(b)
return new P.h7(b,z,!0,a,c,"Index out of range")}}},
r:{"^":"M;a",
j:function(a){return"Unsupported operation: "+this.a}},
b4:{"^":"M;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.h(z):"UnimplementedError"}},
a9:{"^":"M;a",
j:function(a){return"Bad state: "+this.a}},
G:{"^":"M;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.h(P.di(z))+"."}},
ih:{"^":"e;",
j:function(a){return"Out of Memory"},
gY:function(){return},
$isM:1},
dT:{"^":"e;",
j:function(a){return"Stack Overflow"},
gY:function(){return},
$isM:1},
fL:{"^":"M;a",
j:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.h(z)+"' during its initialization"}},
js:{"^":"e;a",
j:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.h(z)}},
h_:{"^":"e;a,b,aQ:c>",
j:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(x.length>78)x=C.f.bY(x,0,75)+"..."
return y+"\n"+x}},
h8:{"^":"e;",
j:function(a){return"IntegerDivisionByZeroException"}},
fW:{"^":"e;a,cb,$ti",
j:function(a){return"Expando:"+H.h(this.a)},
h:function(a,b){var z,y
z=this.cb
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.D(P.c6(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.cs(b,"expando$values")
return y==null?null:H.cs(y,z)},
k:function(a,b,c){var z,y
z=this.cb
if(typeof z!=="string")z.set(b,c)
else{y=H.cs(b,"expando$values")
if(y==null){y=new P.e()
H.dP(b,"expando$values",y)}H.dP(y,z,c)}}},
u:{"^":"a3;"},
"+int":0,
X:{"^":"e;$ti",
a1:function(a,b){return H.bC(this,b,H.C(this,"X",0),null)},
bE:["dH",function(a,b){return new H.ec(this,b,[H.C(this,"X",0)])}],
E:function(a,b){var z
for(z=this.gD(this);z.p();)b.$1(z.gu())},
ay:function(a,b){return P.cl(this,!0,H.C(this,"X",0))},
ax:function(a){return this.ay(a,!0)},
gi:function(a){var z,y
z=this.gD(this)
for(y=0;z.p();)++y
return y},
gaf:function(a){var z,y
z=this.gD(this)
if(!z.p())throw H.c(H.bg())
y=z.gu()
if(z.p())throw H.c(H.hY())
return y},
n:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.fy("index"))
if(b<0)H.D(P.b2(b,0,null,"index",null))
for(z=this.gD(this),y=0;z.p();){x=z.gu()
if(b===y)return x;++y}throw H.c(P.z(b,this,"index",null,y))},
j:function(a){return P.hW(this,"(",")")}},
ch:{"^":"e;$ti"},
b:{"^":"e;$ti",$asb:null,$isa:1,$asa:null},
"+List":0,
N:{"^":"e;$ti",$asN:null},
bF:{"^":"e;",
gv:function(a){return P.e.prototype.gv.call(this,this)},
j:function(a){return"null"}},
"+Null":0,
a3:{"^":"e;"},
"+num":0,
e:{"^":";",
t:function(a,b){return this===b},
gv:function(a){return H.ap(this)},
j:function(a){return H.bG(this)},
toString:function(){return this.j(this)}},
aH:{"^":"e;"},
iG:{"^":"e;a,b",
aa:function(a){var z=this.b
this.a=z==null?$.aG.$0():z},
dS:function(){if($.bK==null){H.iu()
$.bK=$.bH}}},
p:{"^":"e;"},
"+String":0,
ct:{"^":"e;C<",
gi:function(a){return this.C.length},
j:function(a){var z=this.C
return z.charCodeAt(0)==0?z:z},
q:{
dU:function(a,b,c){var z=J.bb(b)
if(!z.p())return a
if(c.length===0){do a+=H.h(z.gu())
while(z.p())}else{a+=H.h(z.gu())
for(;z.p();)a=a+c+H.h(z.gu())}return a}}}}],["","",,W,{"^":"",
fK:function(a,b,c,d){var z,y,x
z=document.createEvent("CustomEvent")
J.fp(z,d)
if(!J.q(d).$isb)if(!J.q(d).$isN){y=d
if(typeof y!=="string"){y=d
y=typeof y==="number"}else y=!0}else y=!0
else y=!0
if(y)try{d=new P.k3([],[]).ac(d)
J.bZ(z,a,!0,!0,d)}catch(x){H.F(x)
J.bZ(z,a,!0,!0,null)}else J.bZ(z,a,!0,!0,null)
return z},
fU:function(a,b,c){var z,y
z=document.body
y=(z&&C.k).O(z,a,b,c)
y.toString
z=new H.ec(new W.a1(y),new W.kz(),[W.o])
return z.gaf(z)},
lD:[function(a){return"wheel"},"$1","kK",2,0,28],
aX:function(a){var z,y,x
z="element tag unavailable"
try{y=J.ff(a)
if(typeof y==="string")z=a.tagName}catch(x){H.F(x)}return z},
aZ:function(a,b,c){return W.h5(a,null,null,b,null,null,null,c).G(new W.h4())},
h5:function(a,b,c,d,e,f,g,h){var z,y,x,w
z=W.bf
y=new P.a_(0,$.t,null,[z])
x=new P.ee(y,[z])
w=new XMLHttpRequest()
C.v.ff(w,"GET",a,!0)
z=W.mN
W.I(w,"load",new W.h6(x,w),!1,z)
W.I(w,"error",x.geC(),!1,z)
w.send()
return y},
ay:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
en:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
eu:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.jh(a)
if(!!J.q(z).$ism)return z
return}else return a},
cI:function(a){var z=$.t
if(z===C.c)return a
return z.ey(a,!0)},
y:{"^":"W;","%":"HTMLBRElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLImageElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
lm:{"^":"y;aM:href}",
j:function(a){return String(a)},
$isd:1,
"%":"HTMLAnchorElement"},
lo:{"^":"y;aM:href}",
j:function(a){return String(a)},
$isd:1,
"%":"HTMLAreaElement"},
ai:{"^":"d;",$ise:1,"%":"AudioTrack"},
lq:{"^":"dn;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.ai]},
$isa:1,
$asa:function(){return[W.ai]},
$isn:1,
$asn:function(){return[W.ai]},
$isl:1,
$asl:function(){return[W.ai]},
"%":"AudioTrackList"},
dk:{"^":"m+x;",
$asb:function(){return[W.ai]},
$asa:function(){return[W.ai]},
$isb:1,
$isa:1},
dn:{"^":"dk+A;",
$asb:function(){return[W.ai]},
$asa:function(){return[W.ai]},
$isb:1,
$isa:1},
lr:{"^":"y;aM:href}","%":"HTMLBaseElement"},
c7:{"^":"d;",$isc7:1,"%":";Blob"},
c8:{"^":"y;",$isc8:1,$ism:1,$isd:1,"%":"HTMLBodyElement"},
ls:{"^":"y;F:name=","%":"HTMLButtonElement"},
fB:{"^":"y;",
bL:function(a,b,c){var z=a.getContext(b,P.kA(c,null))
return z},
"%":"HTMLCanvasElement"},
lt:{"^":"o;i:length=",$isd:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
lu:{"^":"m;",$ism:1,$isd:1,"%":"CompositorWorker"},
aj:{"^":"d;",$ise:1,"%":"CSSCharsetRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
lv:{"^":"h9;i:length=","%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
h9:{"^":"d+fJ;"},
fJ:{"^":"e;"},
cb:{"^":"aY;eb:_dartDetail}",
gcP:function(a){var z,y
z=a._dartDetail
if(z!=null)return z
z=a.detail
y=new P.j5([],[],!1)
y.c=!0
return y.ac(z)},
eh:function(a,b,c,d,e){return a.initCustomEvent(b,!0,!0,e)},
$iscb:1,
$ise:1,
"%":"CustomEvent"},
lw:{"^":"d;i:length=",
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
lx:{"^":"d;l:x=,m:y=","%":"DeviceAcceleration"},
fO:{"^":"y;","%":"HTMLDivElement"},
ly:{"^":"o;",$isd:1,"%":"DocumentFragment|ShadowRoot"},
lz:{"^":"d;",
j:function(a){return String(a)},
"%":"DOMException"},
lA:{"^":"fP;",
gl:function(a){return a.x},
gm:function(a){return a.y},
"%":"DOMPoint"},
fP:{"^":"d;",
gl:function(a){return a.x},
gm:function(a){return a.y},
"%":";DOMPointReadOnly"},
fQ:{"^":"d;",
j:function(a){return"Rectangle ("+H.h(a.left)+", "+H.h(a.top)+") "+H.h(this.ga3(a))+" x "+H.h(this.ga0(a))},
t:function(a,b){var z
if(b==null)return!1
z=J.q(b)
if(!z.$isH)return!1
return a.left===z.gav(b)&&a.top===z.gaz(b)&&this.ga3(a)===z.ga3(b)&&this.ga0(a)===z.ga0(b)},
gv:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.ga3(a)
w=this.ga0(a)
return W.en(W.ay(W.ay(W.ay(W.ay(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gbA:function(a){return new P.L(a.left,a.top,[null])},
gbl:function(a){return a.bottom},
ga0:function(a){return a.height},
gav:function(a){return a.left},
gbw:function(a){return a.right},
gaz:function(a){return a.top},
ga3:function(a){return a.width},
gl:function(a){return a.x},
gm:function(a){return a.y},
$isH:1,
$asH:I.J,
"%":";DOMRectReadOnly"},
lB:{"^":"hu;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[P.p]},
$isa:1,
$asa:function(){return[P.p]},
$isn:1,
$asn:function(){return[P.p]},
$isl:1,
$asl:function(){return[P.p]},
"%":"DOMStringList"},
ha:{"^":"d+x;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},
hu:{"^":"ha+A;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},
lC:{"^":"d;i:length=","%":"DOMTokenList"},
jf:{"^":"bA;b9:a<,b",
gi:function(a){return this.b.length},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
k:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.f(z,b)
this.a.replaceChild(c,z[b])},
gD:function(a){var z=this.ax(this)
return new J.d8(z,z.length,0,null,[H.K(z,0)])},
gbp:function(a){var z=this.a.firstElementChild
if(z==null)throw H.c(new P.a9("No elements"))
return z},
$asbA:function(){return[W.W]},
$ascr:function(){return[W.W]},
$asb:function(){return[W.W]},
$asa:function(){return[W.W]}},
W:{"^":"o;cc:namespaceURI=,fo:tagName=",
gex:function(a){return new W.jl(a)},
gcD:function(a){return new W.jm(a)},
gaK:function(a){return P.a8(a.clientLeft,a.clientTop,a.clientWidth,a.clientHeight,null)},
gaQ:function(a){return P.a8(C.d.a2(a.offsetLeft),C.d.a2(a.offsetTop),C.d.a2(a.offsetWidth),C.d.a2(a.offsetHeight),null)},
j:function(a){return a.localName},
O:["aY",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.dh
if(z==null){z=H.B([],[W.dJ])
y=new W.dK(z)
z.push(W.el(null))
z.push(W.er())
$.dh=y
d=y}else d=z
z=$.dg
if(z==null){z=new W.es(d)
$.dg=z
c=z}else{z.a=d
c=z}}if($.ad==null){z=document
y=z.implementation.createHTMLDocument("")
$.ad=y
$.ce=y.createRange()
y=$.ad
y.toString
x=y.createElement("base")
J.fq(x,z.baseURI)
$.ad.head.appendChild(x)}z=$.ad
if(z.body==null){z.toString
y=z.createElement("body")
z.body=y}z=$.ad
if(!!this.$isc8)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.ad.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.b.A(C.H,a.tagName)){$.ce.selectNodeContents(w)
v=$.ce.createContextualFragment(b)}else{w.innerHTML=b
v=$.ad.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.ad.body
if(w==null?z!=null:w!==z)J.fn(w)
c.bS(v)
document.adoptNode(v)
return v},function(a,b,c){return this.O(a,b,c,null)},"eG",null,null,"gfF",2,5,null,0,0],
scZ:function(a,b){this.aB(a,b)},
aW:function(a,b,c,d){a.textContent=null
a.appendChild(this.O(a,b,c,d))},
aB:function(a,b){return this.aW(a,b,null,null)},
bK:function(a){return a.getBoundingClientRect()},
gd2:function(a){return new W.eh(a,"click",!1,[W.Z])},
$isW:1,
$iso:1,
$ism:1,
$ise:1,
$isd:1,
"%":";Element"},
kz:{"^":"i:1;",
$1:function(a){return!!J.q(a).$isW}},
lE:{"^":"y;F:name=","%":"HTMLEmbedElement"},
lF:{"^":"aY;L:error=","%":"ErrorEvent"},
aY:{"^":"d;",
d4:function(a){return a.preventDefault()},
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|ClipboardEvent|CloseEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
m:{"^":"d;",
e0:function(a,b,c,d){return a.addEventListener(b,H.a2(c,1),!1)},
eo:function(a,b,c,d){return a.removeEventListener(b,H.a2(c,1),!1)},
$ism:1,
$ise:1,
"%":"AnalyserNode|Animation|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioContext|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioSourceNode|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|CanvasCaptureMediaStreamTrack|ChannelMergerNode|ChannelSplitterNode|ConvolverNode|CrossOriginServiceWorkerClient|DOMApplicationCache|DelayNode|DynamicsCompressorNode|EventSource|GainNode|IDBDatabase|IIRFilterNode|JavaScriptAudioNode|MIDIAccess|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MediaStreamTrack|MessagePort|NetworkInformation|Notification|OfflineAudioContext|OfflineResourceList|Oscillator|OscillatorNode|PannerNode|Performance|PermissionStatus|PresentationAvailability|PresentationReceiver|PresentationRequest|RTCDTMFSender|RTCPeerConnection|RealtimeAnalyserNode|ScreenOrientation|ScriptProcessorNode|ServicePortCollection|ServiceWorkerContainer|ServiceWorkerRegistration|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|WaveShaperNode|WorkerPerformance|mozRTCPeerConnection|webkitAudioContext|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;dk|dn|dl|dp|dm|dq"},
lY:{"^":"y;F:name=","%":"HTMLFieldSetElement"},
a7:{"^":"c7;",$isa7:1,$ise:1,"%":"File"},
ds:{"^":"hv;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isds:1,
$isn:1,
$asn:function(){return[W.a7]},
$isl:1,
$asl:function(){return[W.a7]},
$isb:1,
$asb:function(){return[W.a7]},
$isa:1,
$asa:function(){return[W.a7]},
"%":"FileList"},
hb:{"^":"d+x;",
$asb:function(){return[W.a7]},
$asa:function(){return[W.a7]},
$isb:1,
$isa:1},
hv:{"^":"hb+A;",
$asb:function(){return[W.a7]},
$asa:function(){return[W.a7]},
$isb:1,
$isa:1},
lZ:{"^":"m;L:error=","%":"FileReader"},
m_:{"^":"m;L:error=,i:length=","%":"FileWriter"},
m1:{"^":"m;",
fH:function(a,b,c){return a.forEach(H.a2(b,3),c)},
E:function(a,b){b=H.a2(b,3)
return a.forEach(b)},
"%":"FontFaceSet"},
m3:{"^":"y;i:length=,F:name=",
aa:function(a){return a.reset()},
"%":"HTMLFormElement"},
al:{"^":"d;",$ise:1,"%":"Gamepad"},
m5:{"^":"d;i:length=","%":"History"},
m6:{"^":"hw;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.o]},
$isa:1,
$asa:function(){return[W.o]},
$isn:1,
$asn:function(){return[W.o]},
$isl:1,
$asl:function(){return[W.o]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
hc:{"^":"d+x;",
$asb:function(){return[W.o]},
$asa:function(){return[W.o]},
$isb:1,
$isa:1},
hw:{"^":"hc+A;",
$asb:function(){return[W.o]},
$asa:function(){return[W.o]},
$isb:1,
$isa:1},
bf:{"^":"h3;fl:responseText=",
fO:function(a,b,c,d,e,f){return a.open(b,c,!0,f,e)},
ff:function(a,b,c,d){return a.open(b,c,d)},
a4:function(a,b){return a.send(b)},
$isbf:1,
$ism:1,
$ise:1,
"%":"XMLHttpRequest"},
h4:{"^":"i:18;",
$1:function(a){return J.fe(a)}},
h6:{"^":"i:1;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
y=z.status
if(typeof y!=="number")return y.al()
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.a
if(y)v.aL(0,z)
else v.cI(a)}},
h3:{"^":"m;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
m7:{"^":"y;F:name=","%":"HTMLIFrameElement"},
dw:{"^":"d;",$isdw:1,"%":"ImageData"},
m9:{"^":"y;F:name=",$isW:1,$isd:1,$ism:1,"%":"HTMLInputElement"},
by:{"^":"eb;eA:charCode=",$isby:1,$ise:1,"%":"KeyboardEvent"},
mc:{"^":"y;F:name=","%":"HTMLKeygenElement"},
me:{"^":"y;aM:href}","%":"HTMLLinkElement"},
mf:{"^":"d;",
j:function(a){return String(a)},
"%":"Location"},
mg:{"^":"y;F:name=","%":"HTMLMapElement"},
mj:{"^":"y;L:error=","%":"HTMLAudioElement|HTMLMediaElement|HTMLVideoElement"},
mk:{"^":"d;i:length=","%":"MediaList"},
ml:{"^":"y;F:name=","%":"HTMLMetaElement"},
mm:{"^":"id;",
fu:function(a,b,c){return a.send(b,c)},
a4:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
id:{"^":"m;","%":"MIDIInput;MIDIPort"},
am:{"^":"d;",$ise:1,"%":"MimeType"},
mn:{"^":"hG;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isn:1,
$asn:function(){return[W.am]},
$isl:1,
$asl:function(){return[W.am]},
$isb:1,
$asb:function(){return[W.am]},
$isa:1,
$asa:function(){return[W.am]},
"%":"MimeTypeArray"},
hm:{"^":"d+x;",
$asb:function(){return[W.am]},
$asa:function(){return[W.am]},
$isb:1,
$isa:1},
hG:{"^":"hm+A;",
$asb:function(){return[W.am]},
$asa:function(){return[W.am]},
$isb:1,
$isa:1},
Z:{"^":"eb;ez:button=",
gaK:function(a){return new P.L(a.clientX,a.clientY,[null])},
gaQ:function(a){var z,y,x
if(!!a.offsetX)return new P.L(a.offsetX,a.offsetY,[null])
else{if(!J.q(W.eu(a.target)).$isW)throw H.c(new P.r("offsetX is only supported on elements"))
z=W.eu(a.target)
y=[null]
x=new P.L(a.clientX,a.clientY,y).B(0,J.fg(J.fj(z)))
return new P.L(J.d3(x.a),J.d3(x.b),y)}},
gaN:function(a){return new P.L(a.layerX,a.layerY,[null])},
$isZ:1,
$ise:1,
"%":"PointerEvent;DragEvent|MouseEvent"},
mx:{"^":"d;",$isd:1,"%":"Navigator"},
a1:{"^":"bA;a",
gaf:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.c(new P.a9("No elements"))
if(y>1)throw H.c(new P.a9("More than one element"))
return z.firstChild},
Z:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
k:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.f(y,b)
z.replaceChild(c,y[b])},
gD:function(a){var z=this.a.childNodes
return new W.du(z,z.length,-1,null,[H.C(z,"A",0)])},
gi:function(a){return this.a.childNodes.length},
h:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.f(z,b)
return z[b]},
$asbA:function(){return[W.o]},
$ascr:function(){return[W.o]},
$asb:function(){return[W.o]},
$asa:function(){return[W.o]}},
o:{"^":"m;aR:parentNode=,bv:previousSibling=",
gf8:function(a){return new W.a1(a)},
fi:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
j:function(a){var z=a.nodeValue
return z==null?this.dG(a):z},
$iso:1,
$ism:1,
$ise:1,
"%":"Document|HTMLDocument|XMLDocument;Node"},
my:{"^":"d;",
fg:[function(a){return a.previousNode()},"$0","gbv",0,0,7],
"%":"NodeIterator"},
mz:{"^":"hH;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.o]},
$isa:1,
$asa:function(){return[W.o]},
$isn:1,
$asn:function(){return[W.o]},
$isl:1,
$asl:function(){return[W.o]},
"%":"NodeList|RadioNodeList"},
hn:{"^":"d+x;",
$asb:function(){return[W.o]},
$asa:function(){return[W.o]},
$isb:1,
$isa:1},
hH:{"^":"hn+A;",
$asb:function(){return[W.o]},
$asa:function(){return[W.o]},
$isb:1,
$isa:1},
mB:{"^":"y;F:name=","%":"HTMLObjectElement"},
mC:{"^":"y;F:name=","%":"HTMLOutputElement"},
mD:{"^":"y;F:name=","%":"HTMLParamElement"},
mE:{"^":"d;",$isd:1,"%":"Path2D"},
mG:{"^":"cv;i:length=","%":"Perspective"},
ao:{"^":"d;i:length=",$ise:1,"%":"Plugin"},
mH:{"^":"hI;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.ao]},
$isa:1,
$asa:function(){return[W.ao]},
$isn:1,
$asn:function(){return[W.ao]},
$isl:1,
$asl:function(){return[W.ao]},
"%":"PluginArray"},
ho:{"^":"d+x;",
$asb:function(){return[W.ao]},
$asa:function(){return[W.ao]},
$isb:1,
$isa:1},
hI:{"^":"ho+A;",
$asb:function(){return[W.ao]},
$asa:function(){return[W.ao]},
$isb:1,
$isa:1},
mK:{"^":"iQ;l:x=,m:y=","%":"PositionValue"},
mL:{"^":"m;",
a4:function(a,b){return a.send(b)},
"%":"PresentationConnection"},
mO:{"^":"d;",
bK:function(a){return a.getBoundingClientRect()},
"%":"Range"},
mU:{"^":"cv;l:x=,m:y=","%":"Rotation"},
mV:{"^":"m;",
a4:function(a,b){return a.send(b)},
"%":"DataChannel|RTCDataChannel"},
mW:{"^":"d;bn:deltaY=","%":"ScrollState"},
mX:{"^":"y;i:length=,F:name=","%":"HTMLSelectElement"},
mY:{"^":"m;",$ism:1,$isd:1,"%":"SharedWorker"},
mZ:{"^":"y;F:name=","%":"HTMLSlotElement"},
aq:{"^":"m;",$ism:1,$ise:1,"%":"SourceBuffer"},
n_:{"^":"dp;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.aq]},
$isa:1,
$asa:function(){return[W.aq]},
$isn:1,
$asn:function(){return[W.aq]},
$isl:1,
$asl:function(){return[W.aq]},
"%":"SourceBufferList"},
dl:{"^":"m+x;",
$asb:function(){return[W.aq]},
$asa:function(){return[W.aq]},
$isb:1,
$isa:1},
dp:{"^":"dl+A;",
$asb:function(){return[W.aq]},
$asa:function(){return[W.aq]},
$isb:1,
$isa:1},
ar:{"^":"d;",$ise:1,"%":"SpeechGrammar"},
n0:{"^":"hJ;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.ar]},
$isa:1,
$asa:function(){return[W.ar]},
$isn:1,
$asn:function(){return[W.ar]},
$isl:1,
$asl:function(){return[W.ar]},
"%":"SpeechGrammarList"},
hp:{"^":"d+x;",
$asb:function(){return[W.ar]},
$asa:function(){return[W.ar]},
$isb:1,
$isa:1},
hJ:{"^":"hp+A;",
$asb:function(){return[W.ar]},
$asa:function(){return[W.ar]},
$isb:1,
$isa:1},
n1:{"^":"aY;L:error=","%":"SpeechRecognitionError"},
as:{"^":"d;i:length=",$ise:1,"%":"SpeechRecognitionResult"},
n3:{"^":"d;",
h:function(a,b){return a.getItem(b)},
k:function(a,b,c){a.setItem(b,c)},
E:function(a,b){var z,y
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
gi:function(a){return a.length},
$isN:1,
$asN:function(){return[P.p,P.p]},
"%":"Storage"},
at:{"^":"d;",$ise:1,"%":"CSSStyleSheet|StyleSheet"},
iQ:{"^":"d;","%":"CalcLength|KeywordValue|LengthValue|NumberValue|SimpleLength|TransformValue;StyleValue"},
iR:{"^":"y;",
O:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.aY(a,b,c,d)
z=W.fU("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
new W.a1(y).Z(0,J.fb(z))
return y},
"%":"HTMLTableElement"},
n7:{"^":"y;",
O:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.aY(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.q.O(z.createElement("table"),b,c,d)
z.toString
z=new W.a1(z)
x=z.gaf(z)
x.toString
z=new W.a1(x)
w=z.gaf(z)
y.toString
w.toString
new W.a1(y).Z(0,new W.a1(w))
return y},
"%":"HTMLTableRowElement"},
n8:{"^":"y;",
O:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.aY(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.q.O(z.createElement("table"),b,c,d)
z.toString
z=new W.a1(z)
x=z.gaf(z)
y.toString
x.toString
new W.a1(y).Z(0,new W.a1(x))
return y},
"%":"HTMLTableSectionElement"},
dW:{"^":"y;",
aW:function(a,b,c,d){var z
a.textContent=null
z=this.O(a,b,c,d)
a.content.appendChild(z)},
aB:function(a,b){return this.aW(a,b,null,null)},
$isdW:1,
"%":"HTMLTemplateElement"},
n9:{"^":"y;F:name=","%":"HTMLTextAreaElement"},
au:{"^":"m;",$ism:1,$ise:1,"%":"TextTrack"},
av:{"^":"m;",$ism:1,$ise:1,"%":"TextTrackCue|VTTCue"},
nc:{"^":"hK;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isn:1,
$asn:function(){return[W.av]},
$isl:1,
$asl:function(){return[W.av]},
$isb:1,
$asb:function(){return[W.av]},
$isa:1,
$asa:function(){return[W.av]},
"%":"TextTrackCueList"},
hq:{"^":"d+x;",
$asb:function(){return[W.av]},
$asa:function(){return[W.av]},
$isb:1,
$isa:1},
hK:{"^":"hq+A;",
$asb:function(){return[W.av]},
$asa:function(){return[W.av]},
$isb:1,
$isa:1},
nd:{"^":"dq;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isn:1,
$asn:function(){return[W.au]},
$isl:1,
$asl:function(){return[W.au]},
$isb:1,
$asb:function(){return[W.au]},
$isa:1,
$asa:function(){return[W.au]},
"%":"TextTrackList"},
dm:{"^":"m+x;",
$asb:function(){return[W.au]},
$asa:function(){return[W.au]},
$isb:1,
$isa:1},
dq:{"^":"dm+A;",
$asb:function(){return[W.au]},
$asa:function(){return[W.au]},
$isb:1,
$isa:1},
ne:{"^":"d;i:length=","%":"TimeRanges"},
aw:{"^":"d;",
gaK:function(a){return new P.L(C.d.a2(a.clientX),C.d.a2(a.clientY),[null])},
$ise:1,
"%":"Touch"},
nf:{"^":"hL;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.aw]},
$isa:1,
$asa:function(){return[W.aw]},
$isn:1,
$asn:function(){return[W.aw]},
$isl:1,
$asl:function(){return[W.aw]},
"%":"TouchList"},
hr:{"^":"d+x;",
$asb:function(){return[W.aw]},
$asa:function(){return[W.aw]},
$isb:1,
$isa:1},
hL:{"^":"hr+A;",
$asb:function(){return[W.aw]},
$asa:function(){return[W.aw]},
$isb:1,
$isa:1},
ng:{"^":"d;i:length=","%":"TrackDefaultList"},
cv:{"^":"d;","%":"Matrix|Skew;TransformComponent"},
nj:{"^":"cv;l:x=,m:y=","%":"Translation"},
nk:{"^":"d;",
fP:[function(a){return a.parentNode()},"$0","gaR",0,0,7],
fg:[function(a){return a.previousNode()},"$0","gbv",0,0,7],
"%":"TreeWalker"},
eb:{"^":"aY;cP:detail=","%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
nl:{"^":"d;",
j:function(a){return String(a)},
$isd:1,
"%":"URL"},
nn:{"^":"m;i:length=","%":"VideoTrackList"},
nq:{"^":"d;i:length=","%":"VTTRegionList"},
nr:{"^":"m;",
a4:function(a,b){return a.send(b)},
"%":"WebSocket"},
bM:{"^":"Z;",
gbn:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.c(new P.r("deltaY is not supported"))},
$isbM:1,
$isZ:1,
$ise:1,
"%":"WheelEvent"},
j1:{"^":"m;",
ga_:function(a){var z,y
z=P.a3
y=new P.a_(0,$.t,null,[z])
this.c5(a)
this.cl(a,W.cI(new W.j2(new P.k6(y,[z]))))
return y},
cl:function(a,b){return a.requestAnimationFrame(H.a2(b,1))},
c5:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isd:1,
$ism:1,
"%":"DOMWindow|Window"},
j2:{"^":"i:1;a",
$1:function(a){this.a.aL(0,a)}},
ns:{"^":"m;",$ism:1,$isd:1,"%":"Worker"},
nt:{"^":"m;",$isd:1,"%":"CompositorWorkerGlobalScope|DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope|SharedWorkerGlobalScope|WorkerGlobalScope"},
nu:{"^":"d;",
aa:function(a){return a.reset()},
"%":"XSLTProcessor"},
ny:{"^":"o;F:name=,cc:namespaceURI=","%":"Attr"},
nz:{"^":"d;bl:bottom=,a0:height=,av:left=,bw:right=,az:top=,a3:width=",
j:function(a){return"Rectangle ("+H.h(a.left)+", "+H.h(a.top)+") "+H.h(a.width)+" x "+H.h(a.height)},
t:function(a,b){var z,y,x
if(b==null)return!1
z=J.q(b)
if(!z.$isH)return!1
y=a.left
x=z.gav(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaz(b)
if(y==null?x==null:y===x){y=a.width
x=z.ga3(b)
if(y==null?x==null:y===x){y=a.height
z=z.ga0(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){var z,y,x,w
z=J.V(a.left)
y=J.V(a.top)
x=J.V(a.width)
w=J.V(a.height)
return W.en(W.ay(W.ay(W.ay(W.ay(0,z),y),x),w))},
gbA:function(a){return new P.L(a.left,a.top,[null])},
$isH:1,
$asH:I.J,
"%":"ClientRect"},
nA:{"^":"hM;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isn:1,
$asn:function(){return[P.H]},
$isl:1,
$asl:function(){return[P.H]},
$isb:1,
$asb:function(){return[P.H]},
$isa:1,
$asa:function(){return[P.H]},
"%":"ClientRectList|DOMRectList"},
hs:{"^":"d+x;",
$asb:function(){return[P.H]},
$asa:function(){return[P.H]},
$isb:1,
$isa:1},
hM:{"^":"hs+A;",
$asb:function(){return[P.H]},
$asa:function(){return[P.H]},
$isb:1,
$isa:1},
nB:{"^":"hN;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.aj]},
$isa:1,
$asa:function(){return[W.aj]},
$isn:1,
$asn:function(){return[W.aj]},
$isl:1,
$asl:function(){return[W.aj]},
"%":"CSSRuleList"},
ht:{"^":"d+x;",
$asb:function(){return[W.aj]},
$asa:function(){return[W.aj]},
$isb:1,
$isa:1},
hN:{"^":"ht+A;",
$asb:function(){return[W.aj]},
$asa:function(){return[W.aj]},
$isb:1,
$isa:1},
nC:{"^":"o;",$isd:1,"%":"DocumentType"},
nD:{"^":"fQ;",
ga0:function(a){return a.height},
ga3:function(a){return a.width},
gl:function(a){return a.x},
gm:function(a){return a.y},
"%":"DOMRect"},
nE:{"^":"hx;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isn:1,
$asn:function(){return[W.al]},
$isl:1,
$asl:function(){return[W.al]},
$isb:1,
$asb:function(){return[W.al]},
$isa:1,
$asa:function(){return[W.al]},
"%":"GamepadList"},
hd:{"^":"d+x;",
$asb:function(){return[W.al]},
$asa:function(){return[W.al]},
$isb:1,
$isa:1},
hx:{"^":"hd+A;",
$asb:function(){return[W.al]},
$asa:function(){return[W.al]},
$isb:1,
$isa:1},
nG:{"^":"y;",$ism:1,$isd:1,"%":"HTMLFrameSetElement"},
nJ:{"^":"hy;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.o]},
$isa:1,
$asa:function(){return[W.o]},
$isn:1,
$asn:function(){return[W.o]},
$isl:1,
$asl:function(){return[W.o]},
"%":"MozNamedAttrMap|NamedNodeMap"},
he:{"^":"d+x;",
$asb:function(){return[W.o]},
$asa:function(){return[W.o]},
$isb:1,
$isa:1},
hy:{"^":"he+A;",
$asb:function(){return[W.o]},
$asa:function(){return[W.o]},
$isb:1,
$isa:1},
nN:{"^":"m;",$ism:1,$isd:1,"%":"ServiceWorker"},
nO:{"^":"hz;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.as]},
$isa:1,
$asa:function(){return[W.as]},
$isn:1,
$asn:function(){return[W.as]},
$isl:1,
$asl:function(){return[W.as]},
"%":"SpeechRecognitionResultList"},
hf:{"^":"d+x;",
$asb:function(){return[W.as]},
$asa:function(){return[W.as]},
$isb:1,
$isa:1},
hz:{"^":"hf+A;",
$asb:function(){return[W.as]},
$asa:function(){return[W.as]},
$isb:1,
$isa:1},
nP:{"^":"hA;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isn:1,
$asn:function(){return[W.at]},
$isl:1,
$asl:function(){return[W.at]},
$isb:1,
$asb:function(){return[W.at]},
$isa:1,
$asa:function(){return[W.at]},
"%":"StyleSheetList"},
hg:{"^":"d+x;",
$asb:function(){return[W.at]},
$asa:function(){return[W.at]},
$isb:1,
$isa:1},
hA:{"^":"hg+A;",
$asb:function(){return[W.at]},
$asa:function(){return[W.at]},
$isb:1,
$isa:1},
nR:{"^":"d;",$isd:1,"%":"WorkerLocation"},
nS:{"^":"d;",$isd:1,"%":"WorkerNavigator"},
jc:{"^":"e;b9:a<",
E:function(a,b){var z,y,x,w,v
for(z=this.ga9(this),y=z.length,x=this.a,w=0;w<z.length;z.length===y||(0,H.aS)(z),++w){v=z[w]
b.$2(v,x.getAttribute(v))}},
ga9:function(a){var z,y,x,w,v,u
z=this.a.attributes
y=H.B([],[P.p])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.f(z,w)
v=z[w]
u=J.j(v)
if(u.gcc(v)==null)y.push(u.gF(v))}return y},
$isN:1,
$asN:function(){return[P.p,P.p]}},
jl:{"^":"jc;a",
h:function(a,b){return this.a.getAttribute(b)},
k:function(a,b,c){this.a.setAttribute(b,c)},
gi:function(a){return this.ga9(this).length}},
jm:{"^":"dd;b9:a<",
V:function(){var z,y,x,w,v
z=P.Y(null,null,null,P.p)
for(y=this.a.className.split(" "),x=y.length,w=0;w<y.length;y.length===x||(0,H.aS)(y),++w){v=J.d4(y[w])
if(v.length!==0)z.H(0,v)}return z},
bF:function(a){this.a.className=a.br(0," ")},
gi:function(a){return this.a.classList.length},
A:function(a,b){return typeof b==="string"&&this.a.classList.contains(b)},
H:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.add(b)
return!y},
W:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.remove(b)
return y}},
dj:{"^":"e;a,$ti"},
jp:{"^":"aI;a,b,c,$ti",
ak:function(a,b,c,d){return W.I(this.a,this.b,a,!1,H.K(this,0))},
d0:function(a,b,c){return this.ak(a,null,b,c)}},
eh:{"^":"jp;a,b,c,$ti"},
jq:{"^":"iH;a,b,c,d,e,$ti",
bm:function(a){if(this.b==null)return
this.ct()
this.b=null
this.d=null
return},
bt:function(a,b){if(this.b==null)return;++this.a
this.ct()},
d3:function(a){return this.bt(a,null)},
d6:function(a){if(this.b==null||this.a<=0)return;--this.a
this.cr()},
cr:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.eV(x,this.c,z,!1)}},
ct:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.eW(x,this.c,z,!1)}},
dV:function(a,b,c,d,e){this.cr()},
q:{
I:function(a,b,c,d,e){var z=c==null?null:W.cI(new W.jr(c))
z=new W.jq(0,a,b,z,!1,[e])
z.dV(a,b,c,!1,e)
return z}}},
jr:{"^":"i:1;a",
$1:function(a){return this.a.$1(a)}},
cA:{"^":"e;dj:a<",
ag:function(a){return $.$get$em().A(0,W.aX(a))},
a6:function(a,b,c){var z,y,x
z=W.aX(a)
y=$.$get$cB()
x=y.h(0,H.h(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
dY:function(a){var z,y
z=$.$get$cB()
if(z.gU(z)){for(y=0;y<262;++y)z.k(0,C.G[y],W.kL())
for(y=0;y<12;++y)z.k(0,C.i[y],W.kM())}},
q:{
el:function(a){var z,y
z=document.createElement("a")
y=new W.jY(z,window.location)
y=new W.cA(y)
y.dY(a)
return y},
nH:[function(a,b,c,d){return!0},"$4","kL",8,0,12],
nI:[function(a,b,c,d){var z,y,x,w,v
z=d.gdj()
y=z.a
y.href=c
x=y.hostname
z=z.b
w=z.hostname
if(x==null?w==null:x===w){w=y.port
v=z.port
if(w==null?v==null:w===v){w=y.protocol
z=z.protocol
z=w==null?z==null:w===z}else z=!1}else z=!1
if(!z)if(x==="")if(y.port===""){z=y.protocol
z=z===":"||z===""}else z=!1
else z=!1
else z=!0
return z},"$4","kM",8,0,12]}},
A:{"^":"e;$ti",
gD:function(a){return new W.du(a,this.gi(a),-1,null,[H.C(a,"A",0)])},
$isb:1,
$asb:null,
$isa:1,
$asa:null},
dK:{"^":"e;a",
ag:function(a){return C.b.cv(this.a,new W.ig(a))},
a6:function(a,b,c){return C.b.cv(this.a,new W.ie(a,b,c))}},
ig:{"^":"i:1;a",
$1:function(a){return a.ag(this.a)}},
ie:{"^":"i:1;a,b,c",
$1:function(a){return a.a6(this.a,this.b,this.c)}},
jZ:{"^":"e;dj:d<",
ag:function(a){return this.a.A(0,W.aX(a))},
a6:["dL",function(a,b,c){var z,y
z=W.aX(a)
y=this.c
if(y.A(0,H.h(z)+"::"+b))return this.d.ew(c)
else if(y.A(0,"*::"+b))return this.d.ew(c)
else{y=this.b
if(y.A(0,H.h(z)+"::"+b))return!0
else if(y.A(0,"*::"+b))return!0
else if(y.A(0,H.h(z)+"::*"))return!0
else if(y.A(0,"*::*"))return!0}return!1}],
dZ:function(a,b,c,d){var z,y,x
this.a.Z(0,c)
z=b.bE(0,new W.k_())
y=b.bE(0,new W.k0())
this.b.Z(0,z)
x=this.c
x.Z(0,C.I)
x.Z(0,y)}},
k_:{"^":"i:1;",
$1:function(a){return!C.b.A(C.i,a)}},
k0:{"^":"i:1;",
$1:function(a){return C.b.A(C.i,a)}},
k7:{"^":"jZ;e,a,b,c,d",
a6:function(a,b,c){if(this.dL(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(J.cY(a).a.getAttribute("template")==="")return this.e.A(0,b)
return!1},
q:{
er:function(){var z=P.p
z=new W.k7(P.dD(C.h,z),P.Y(null,null,null,z),P.Y(null,null,null,z),P.Y(null,null,null,z),null)
z.dZ(null,new H.bD(C.h,new W.k8(),[H.K(C.h,0),null]),["TEMPLATE"],null)
return z}}},
k8:{"^":"i:1;",
$1:function(a){return"TEMPLATE::"+H.h(a)}},
k5:{"^":"e;",
ag:function(a){var z=J.q(a)
if(!!z.$isdS)return!1
z=!!z.$isv
if(z&&W.aX(a)==="foreignObject")return!1
if(z)return!0
return!1},
a6:function(a,b,c){if(b==="is"||C.f.dC(b,"on"))return!1
return this.ag(a)}},
du:{"^":"e;a,b,c,d,$ti",
p:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cW(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gu:function(){return this.d}},
jg:{"^":"e;a",$ism:1,$isd:1,q:{
jh:function(a){if(a===window)return a
else return new W.jg(a)}}},
dJ:{"^":"e;"},
jY:{"^":"e;a,b"},
es:{"^":"e;a",
bS:function(a){new W.k9(this).$2(a,null)},
ao:function(a,b){var z
if(b==null){z=a.parentNode
if(z!=null)z.removeChild(a)}else b.removeChild(a)},
es:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.cY(a)
x=y.gb9().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w===!0?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.F(t)}v="element unprintable"
try{v=J.a5(a)}catch(t){H.F(t)}try{u=W.aX(a)
this.er(a,b,z,v,u,y,x)}catch(t){if(H.F(t) instanceof P.ac)throw t
else{this.ao(a,b)
window
s="Removing corrupted element "+H.h(v)
if(typeof console!="undefined")console.warn(s)}}},
er:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.ao(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.ag(a)){this.ao(a,b)
window
z="Removing disallowed element <"+H.h(e)+"> from "+J.a5(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.a6(a,"is",g)){this.ao(a,b)
window
z="Removing disallowed type extension <"+H.h(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.ga9(f)
y=H.B(z.slice(0),[H.K(z,0)])
for(x=f.ga9(f).length-1,z=f.a;x>=0;--x){if(x>=y.length)return H.f(y,x)
w=y[x]
if(!this.a.a6(a,J.fs(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.h(e)+" "+w+'="'+H.h(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.q(a).$isdW)this.bS(a.content)}},
k9:{"^":"i:19;a",
$2:function(a,b){var z,y,x,w,v,u
x=this.a
switch(a.nodeType){case 1:x.es(a,b)
break
case 8:case 11:case 3:case 4:break
default:x.ao(a,b)}z=a.lastChild
for(x=a==null;null!=z;){y=null
try{y=J.fd(z)}catch(w){H.F(w)
v=z
if(x){u=J.j(v)
if(u.gaR(v)!=null){u.gaR(v)
u.gaR(v).removeChild(v)}}else a.removeChild(v)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=y}}}}],["","",,P,{"^":"",
kF:function(a){var z,y,x,w,v
if(a==null)return
z=P.bz()
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.aS)(y),++w){v=y[w]
z.k(0,v,a[v])}return z},
kA:function(a,b){var z
if(a==null)return
z={}
if(b!=null)b.$1(z)
J.f6(a,new P.kB(z))
return z},
kC:function(a){var z,y
z=new P.a_(0,$.t,null,[null])
y=new P.ee(z,[null])
a.then(H.a2(new P.kD(y),1))["catch"](H.a2(new P.kE(y),1))
return z},
k2:{"^":"e;",
as:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x)if(z[x]===a)return x
z.push(a)
this.b.push(null)
return y},
ac:function(a){var z,y,x,w,v,u
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
y=J.q(a)
if(!!y.$iscc)return new Date(a.a)
if(!!y.$isiz)throw H.c(new P.b4("structured clone of RegExp"))
if(!!y.$isa7)return a
if(!!y.$isc7)return a
if(!!y.$isds)return a
if(!!y.$isdw)return a
if(!!y.$iscn||!!y.$isbE)return a
if(!!y.$isN){x=this.as(a)
w=this.b
v=w.length
if(x>=v)return H.f(w,x)
u=w[x]
z.a=u
if(u!=null)return u
u={}
z.a=u
if(x>=v)return H.f(w,x)
w[x]=u
y.E(a,new P.k4(z,this))
return z.a}if(!!y.$isb){x=this.as(a)
z=this.b
if(x>=z.length)return H.f(z,x)
u=z[x]
if(u!=null)return u
return this.eF(a,x)}throw H.c(new P.b4("structured clone of other type"))},
eF:function(a,b){var z,y,x,w,v
z=J.R(a)
y=z.gi(a)
x=new Array(y)
w=this.b
if(b>=w.length)return H.f(w,b)
w[b]=x
for(v=0;v<y;++v){w=this.ac(z.h(a,v))
if(v>=x.length)return H.f(x,v)
x[v]=w}return x}},
k4:{"^":"i:6;a,b",
$2:function(a,b){this.a.a[a]=this.b.ac(b)}},
j4:{"^":"e;",
as:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
ac:function(a){var z,y,x,w,v,u,t,s,r
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
x=new P.cc(y,!0)
x.dN(y,!0)
return x}if(a instanceof RegExp)throw H.c(new P.b4("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.kC(a)
w=Object.getPrototypeOf(a)
if(w===Object.prototype||w===null){v=this.as(a)
x=this.b
u=x.length
if(v>=u)return H.f(x,v)
t=x[v]
z.a=t
if(t!=null)return t
t=P.bz()
z.a=t
if(v>=u)return H.f(x,v)
x[v]=t
this.eO(a,new P.j6(z,this))
return z.a}if(a instanceof Array){v=this.as(a)
x=this.b
if(v>=x.length)return H.f(x,v)
t=x[v]
if(t!=null)return t
u=J.R(a)
s=u.gi(a)
t=this.c?new Array(s):a
if(v>=x.length)return H.f(x,v)
x[v]=t
if(typeof s!=="number")return H.k(s)
x=J.ag(t)
r=0
for(;r<s;++r)x.k(t,r,this.ac(u.h(a,r)))
return t}return a}},
j6:{"^":"i:6;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.ac(b)
J.eU(z,a,y)
return y}},
kB:{"^":"i:20;a",
$2:function(a,b){this.a[a]=b}},
k3:{"^":"k2;a,b"},
j5:{"^":"j4;a,b,c",
eO:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.aS)(z),++x){w=z[x]
b.$2(w,a[w])}}},
kD:{"^":"i:1;a",
$1:function(a){return this.a.aL(0,a)}},
kE:{"^":"i:1;a",
$1:function(a){return this.a.cI(a)}},
dd:{"^":"e;",
bj:function(a){if($.$get$de().b.test(a))return a
throw H.c(P.c6(a,"value","Not a valid class token"))},
j:function(a){return this.V().br(0," ")},
gD:function(a){var z,y
z=this.V()
y=new P.bo(z,z.r,null,null,[null])
y.c=z.e
return y},
E:function(a,b){this.V().E(0,b)},
a1:function(a,b){var z=this.V()
return new H.cd(z,b,[H.K(z,0),null])},
gi:function(a){return this.V().a},
A:function(a,b){if(typeof b!=="string")return!1
this.bj(b)
return this.V().A(0,b)},
bs:function(a){return this.A(0,a)?a:null},
H:function(a,b){this.bj(b)
return this.f7(0,new P.fI(b))},
W:function(a,b){var z,y
this.bj(b)
z=this.V()
y=z.W(0,b)
this.bF(z)
return y},
f7:function(a,b){var z,y
z=this.V()
y=b.$1(z)
this.bF(z)
return y},
$isa:1,
$asa:function(){return[P.p]}},
fI:{"^":"i:1;a",
$1:function(a){return a.H(0,this.a)}}}],["","",,P,{"^":"",mT:{"^":"m;L:error=","%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest"},nh:{"^":"m;L:error=","%":"IDBTransaction"}}],["","",,P,{"^":"",
b5:function(a,b){if(typeof b!=="number")return H.k(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
eo:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
L:{"^":"e;l:a>,m:b>,$ti",
j:function(a){return"Point("+H.h(this.a)+", "+H.h(this.b)+")"},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.L))return!1
return J.O(this.a,b.a)&&J.O(this.b,b.b)},
gv:function(a){var z,y
z=J.V(this.a)
y=J.V(this.b)
return P.eo(P.b5(P.b5(0,z),y))},
w:function(a,b){var z=J.j(b)
return new P.L(J.w(this.a,z.gl(b)),J.w(this.b,z.gm(b)),this.$ti)},
B:function(a,b){var z=J.j(b)
return new P.L(J.Q(this.a,z.gl(b)),J.Q(this.b,z.gm(b)),this.$ti)},
X:function(a,b){return new P.L(J.U(this.a,b),J.U(this.b,b),this.$ti)}},
jT:{"^":"e;$ti",
gbw:function(a){return J.w(this.a,this.c)},
gbl:function(a){return J.w(this.b,this.d)},
j:function(a){return"Rectangle ("+H.h(this.a)+", "+H.h(this.b)+") "+H.h(this.c)+" x "+H.h(this.d)},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
z=J.q(b)
if(!z.$isH)return!1
y=this.a
x=J.q(y)
if(x.t(y,z.gav(b))){w=this.b
v=J.q(w)
z=v.t(w,z.gaz(b))&&J.O(x.w(y,this.c),z.gbw(b))&&J.O(v.w(w,this.d),z.gbl(b))}else z=!1
return z},
gv:function(a){var z,y,x,w,v,u
z=this.a
y=J.q(z)
x=y.gv(z)
w=this.b
v=J.q(w)
u=v.gv(w)
z=J.V(y.w(z,this.c))
w=J.V(v.w(w,this.d))
return P.eo(P.b5(P.b5(P.b5(P.b5(0,x),u),z),w))},
gbA:function(a){return new P.L(this.a,this.b,this.$ti)}},
H:{"^":"jT;av:a>,az:b>,a3:c>,a0:d>,$ti",$asH:null,q:{
a8:function(a,b,c,d,e){var z,y
z=J.aP(c)
z=z.I(c,0)?J.U(z.aU(c),0):c
y=J.aP(d)
y=y.I(d,0)?J.U(y.aU(d),0):d
return new P.H(a,b,z,y,[e])}}}}],["","",,P,{"^":"",ll:{"^":"aC;",$isd:1,"%":"SVGAElement"},ln:{"^":"v;",$isd:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},lG:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEBlendElement"},lH:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEColorMatrixElement"},lI:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEComponentTransferElement"},lJ:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFECompositeElement"},lK:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEConvolveMatrixElement"},lL:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEDiffuseLightingElement"},lM:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEDisplacementMapElement"},lN:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEFloodElement"},lO:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEGaussianBlurElement"},lP:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEImageElement"},lQ:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEMergeElement"},lR:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEMorphologyElement"},lS:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFEOffsetElement"},lT:{"^":"v;l:x=,m:y=","%":"SVGFEPointLightElement"},lU:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFESpecularLightingElement"},lV:{"^":"v;l:x=,m:y=","%":"SVGFESpotLightElement"},lW:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFETileElement"},lX:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFETurbulenceElement"},m0:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGFilterElement"},m2:{"^":"aC;l:x=,m:y=","%":"SVGForeignObjectElement"},h0:{"^":"aC;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},aC:{"^":"v;",$isd:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},m8:{"^":"aC;l:x=,m:y=",$isd:1,"%":"SVGImageElement"},b_:{"^":"d;",$ise:1,"%":"SVGLength"},md:{"^":"hB;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.b_]},
$isa:1,
$asa:function(){return[P.b_]},
"%":"SVGLengthList"},hh:{"^":"d+x;",
$asb:function(){return[P.b_]},
$asa:function(){return[P.b_]},
$isb:1,
$isa:1},hB:{"^":"hh+A;",
$asb:function(){return[P.b_]},
$asa:function(){return[P.b_]},
$isb:1,
$isa:1},mh:{"^":"v;",$isd:1,"%":"SVGMarkerElement"},mi:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGMaskElement"},b1:{"^":"d;",$ise:1,"%":"SVGNumber"},mA:{"^":"hC;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.b1]},
$isa:1,
$asa:function(){return[P.b1]},
"%":"SVGNumberList"},hi:{"^":"d+x;",
$asb:function(){return[P.b1]},
$asa:function(){return[P.b1]},
$isb:1,
$isa:1},hC:{"^":"hi+A;",
$asb:function(){return[P.b1]},
$asa:function(){return[P.b1]},
$isb:1,
$isa:1},mF:{"^":"v;l:x=,m:y=",$isd:1,"%":"SVGPatternElement"},mI:{"^":"d;l:x=,m:y=","%":"SVGPoint"},mJ:{"^":"d;i:length=","%":"SVGPointList"},mP:{"^":"d;l:x=,m:y=","%":"SVGRect"},mQ:{"^":"h0;l:x=,m:y=","%":"SVGRectElement"},dS:{"^":"v;",$isdS:1,$isd:1,"%":"SVGScriptElement"},n4:{"^":"hD;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.p]},
$isa:1,
$asa:function(){return[P.p]},
"%":"SVGStringList"},hj:{"^":"d+x;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},hD:{"^":"hj+A;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},fz:{"^":"dd;a",
V:function(){var z,y,x,w,v,u
z=this.a.getAttribute("class")
y=P.Y(null,null,null,P.p)
if(z==null)return y
for(x=z.split(" "),w=x.length,v=0;v<x.length;x.length===w||(0,H.aS)(x),++v){u=J.d4(x[v])
if(u.length!==0)y.H(0,u)}return y},
bF:function(a){this.a.setAttribute("class",a.br(0," "))}},v:{"^":"W;",
gcD:function(a){return new P.fz(a)},
scZ:function(a,b){this.aB(a,b)},
O:function(a,b,c,d){var z,y,x,w,v,u
z=H.B([],[W.dJ])
z.push(W.el(null))
z.push(W.er())
z.push(new W.k5())
c=new W.es(new W.dK(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.k).eG(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.a1(w)
u=z.gaf(z)
for(;z=u.firstChild,z!=null;)v.appendChild(z)
return v},
gd2:function(a){return new W.eh(a,"click",!1,[W.Z])},
$isv:1,
$ism:1,
$isd:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},n5:{"^":"aC;l:x=,m:y=",$isd:1,"%":"SVGSVGElement"},n6:{"^":"v;",$isd:1,"%":"SVGSymbolElement"},dX:{"^":"aC;","%":";SVGTextContentElement"},na:{"^":"dX;",$isd:1,"%":"SVGTextPathElement"},nb:{"^":"dX;l:x=,m:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},b3:{"^":"d;",$ise:1,"%":"SVGTransform"},ni:{"^":"hE;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.b3]},
$isa:1,
$asa:function(){return[P.b3]},
"%":"SVGTransformList"},hk:{"^":"d+x;",
$asb:function(){return[P.b3]},
$asa:function(){return[P.b3]},
$isb:1,
$isa:1},hE:{"^":"hk+A;",
$asb:function(){return[P.b3]},
$asa:function(){return[P.b3]},
$isb:1,
$isa:1},nm:{"^":"aC;l:x=,m:y=",$isd:1,"%":"SVGUseElement"},no:{"^":"v;",$isd:1,"%":"SVGViewElement"},np:{"^":"d;",$isd:1,"%":"SVGViewSpec"},nF:{"^":"v;",$isd:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},nK:{"^":"v;",$isd:1,"%":"SVGCursorElement"},nL:{"^":"v;",$isd:1,"%":"SVGFEDropShadowElement"},nM:{"^":"v;",$isd:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",lp:{"^":"d;i:length=","%":"AudioBuffer"}}],["","",,P,{"^":"",mR:{"^":"d;cR:drawingBufferHeight=,bo:drawingBufferWidth=",
cw:function(a,b,c){return a.attachShader(b,c)},
cz:function(a,b,c){return a.bindBuffer(b,c)},
cA:function(a,b,c,d){return a.bufferData(b,c,d)},
cE:function(a,b){return a.clear(b)},
cF:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
cH:function(a,b){return a.compileShader(b)},
cK:function(a){return a.createBuffer()},
cL:function(a){return a.createProgram()},
cM:function(a,b){return a.createShader(b)},
cN:function(a,b){return a.deleteShader(b)},
cO:function(a,b,c){return a.detachShader(b,c)},
cQ:function(a,b,c,d){return a.drawArrays(b,c,d)},
cS:function(a,b){return a.enableVertexAttribArray(b)},
bH:function(a,b,c){return a.getActiveAttrib(b,c)},
bI:function(a,b){return a.getAttachedShaders(b)},
bJ:function(a,b,c){return a.getAttribLocation(b,c)},
bM:function(a,b){return a.getProgramInfoLog(b)},
bN:function(a,b,c){return a.getProgramParameter(b,c)},
bO:function(a,b){return a.getShaderInfoLog(b)},
bP:function(a,b,c){return a.getShaderParameter(b,c)},
bQ:function(a,b){return a.getShaderSource(b)},
bR:function(a,b,c){return a.getUniformLocation(b,c)},
d_:function(a,b){return a.linkProgram(b)},
bV:function(a,b,c){return a.shaderSource(b,c)},
dc:function(a,b,c){return a.uniform1f(b,c)},
dd:function(a,b,c){return a.uniform1i(b,c)},
bB:function(a,b,c,d){return a.uniform2f(b,c,d)},
de:function(a,b,c){return a.uniform2fv(b,c)},
df:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
dk:function(a,b){return a.useProgram(b)},
dm:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
dn:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGLRenderingContext"},mS:{"^":"d;cR:drawingBufferHeight=,bo:drawingBufferWidth=",
cw:function(a,b,c){return a.attachShader(b,c)},
cz:function(a,b,c){return a.bindBuffer(b,c)},
cA:function(a,b,c,d){return a.bufferData(b,c,d)},
cE:function(a,b){return a.clear(b)},
cF:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
cH:function(a,b){return a.compileShader(b)},
cK:function(a){return a.createBuffer()},
cL:function(a){return a.createProgram()},
cM:function(a,b){return a.createShader(b)},
cN:function(a,b){return a.deleteShader(b)},
cO:function(a,b,c){return a.detachShader(b,c)},
cQ:function(a,b,c,d){return a.drawArrays(b,c,d)},
cS:function(a,b){return a.enableVertexAttribArray(b)},
bH:function(a,b,c){return a.getActiveAttrib(b,c)},
bI:function(a,b){return a.getAttachedShaders(b)},
bJ:function(a,b,c){return a.getAttribLocation(b,c)},
bM:function(a,b){return a.getProgramInfoLog(b)},
bN:function(a,b,c){return a.getProgramParameter(b,c)},
bO:function(a,b){return a.getShaderInfoLog(b)},
bP:function(a,b,c){return a.getShaderParameter(b,c)},
bQ:function(a,b){return a.getShaderSource(b)},
bR:function(a,b,c){return a.getUniformLocation(b,c)},
d_:function(a,b){return a.linkProgram(b)},
bV:function(a,b,c){return a.shaderSource(b,c)},
dc:function(a,b,c){return a.uniform1f(b,c)},
dd:function(a,b,c){return a.uniform1i(b,c)},
bB:function(a,b,c,d){return a.uniform2f(b,c,d)},
de:function(a,b,c){return a.uniform2fv(b,c)},
df:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
dk:function(a,b){return a.useProgram(b)},
dm:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
dn:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
$isd:1,
"%":"WebGL2RenderingContext"},nQ:{"^":"d;",$isd:1,"%":"WebGL2RenderingContextBase"}}],["","",,P,{"^":"",n2:{"^":"hF;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.z(b,a,null,null,null))
return P.kF(a.item(b))},
k:function(a,b,c){throw H.c(new P.r("Cannot assign element of immutable List."))},
n:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.N]},
$isa:1,
$asa:function(){return[P.N]},
"%":"SQLResultSetRowList"},hl:{"^":"d+x;",
$asb:function(){return[P.N]},
$asa:function(){return[P.N]},
$isb:1,
$isa:1},hF:{"^":"hl+A;",
$asb:function(){return[P.N]},
$asa:function(){return[P.N]},
$isb:1,
$isa:1}}],["","",,M,{"^":"",iF:{"^":"e;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
fE:[function(a){var z
J.fm(a)
z=this.y+1
this.sd1(0,z)
this.sd1(0,z%2)},"$1","gel",2,0,8],
ea:function(){var z,y,x
z=document
y=z.createElement("div")
y.id="stats"
W.I(y,"mousedown",this.gel(),!1,W.Z)
y.style.cssText="width:80px;opacity:0.9;cursor:pointer"
this.z=y
y=z.createElement("div")
y.id="fps"
y.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002"
this.Q=y
this.z.appendChild(y)
y=z.createElement("div")
y.id="fpsText"
y.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px"
y.textContent="FPS"
this.dx=y
this.Q.appendChild(y)
y=z.createElement("div")
y.id="fpsGraph"
y.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff"
this.db=y
this.Q.appendChild(y)
for(;this.db.children.length<74;){x=z.createElement("span")
x.style.cssText="width:1px;height:30px;float:left;background-color:#113"
this.db.appendChild(x)}y=z.createElement("div")
y.id="ms"
y.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none"
this.ch=y
this.z.appendChild(y)
y=z.createElement("div")
y.id="msText"
y.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px"
y.textContent="MS"
this.cx=y
this.ch.appendChild(y)
y=z.createElement("div")
y.id="msGraph"
y.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0"
this.cy=y
this.ch.appendChild(y)
for(;this.cy.children.length<74;){x=z.createElement("span")
x.style.cssText="width:1px;height:30px;float:left;background-color:#131"
this.cy.appendChild(x)}},
sd1:function(a,b){var z
if(this.y!==b){this.y=b
switch(b){case 0:z=this.Q.style
z.display="block"
z=this.ch.style
z.display="none"
break
case 1:z=this.Q.style
z.display="none"
z=this.ch.style
z.display="block"
break}}},
di:function(a,b){var z,y,x
z=new W.jf(a,a.children)
y=z.gbp(z)
a.appendChild(y)
z=y.style
x=""+C.d.bz(b)+"px"
z.height=x},
eM:function(a){var z,y,x,w
z=this.a
y=z.b
if(y==null)y=$.aG.$0()
x=J.cV(J.U(J.Q(y,z.a),1000),$.bK)
y=z.b
if(y==null)y=$.aG.$0()
y=J.cV(J.U(J.Q(y,z.a),1000),$.bK)
this.b=y
this.c=Math.min(this.c,H.cL(y))
this.d=Math.max(this.d,H.cL(y))
this.cx.textContent=H.h(y)+" MS ("+H.h(this.c)+" - "+H.h(this.d)+")"
y=this.cy
w=this.b
if(typeof w!=="number")return w.K()
this.di(y,Math.min(30,30-w/200*30));++this.x
if(J.eS(x,1000)){y=this.x
w=this.b
if(typeof w!=="number")return H.k(w)
w=C.a.bz(C.x.a2(y*1000/w))
this.e=w
this.f=Math.min(this.f,w)
this.r=Math.max(this.r,w)
this.dx.textContent=""+w+" FPS ("+H.h(this.f)+" - "+H.h(this.r)+")"
this.di(this.db,Math.min(30,30-this.e/100*30))
y=z.b
z.a=y==null?$.aG.$0():y
this.x=0}return x},
dR:function(){this.ea()}}}],["","",,B,{"^":"",bv:{"^":"e;",
aa:["dF",function(a){this.a=-2
this.b=0
this.d=!1
this.c=!1
this.y=0
this.x=0
this.r=0
this.f=0
this.e=0
this.cy=!1
this.cx=!1
this.ch=!1
this.Q=!1
this.z=!1
this.db=null
this.dx=8
this.dy=null
this.fx=!0
this.fr=!0}],
aj:function(){this.cx=!0},
gf2:function(){return this.ch===!0||this.cx===!0},
ah:function(a){var z,y
z=this.db
if(z!=null){y=this.dx
if(typeof y!=="number")return y.ad()
y=(y&a)>0}else y=!1
if(y)z.$2(a,this)},
aT:function(a,b){var z,y,x
if(this.z!==!0||this.cy===!0||this.cx===!0)return
this.y=b
if(this.Q!==!0){z=this.x
if(typeof z!=="number")return z.w()
y=this.e
if(typeof y!=="number")return H.k(y)
if(z+b>=y){this.eZ()
this.Q=!0
this.c=!0
this.a=0
z=this.y
y=this.e
x=this.x
if(typeof y!=="number")return y.B()
if(typeof x!=="number")return H.k(x)
if(typeof z!=="number")return z.B()
this.y=z-(y-x)
this.x=0
this.ah(1)
this.ah(2)}}if(this.Q===!0){z=this.c!==!0
if(z){y=this.b
if(typeof y!=="number")return y.al()
y=this.a
if(typeof y!=="number")return y.I()
if(y<0){y=this.x
x=this.y
if(typeof y!=="number")return y.w()
if(typeof x!=="number")return H.k(x)
x=y+x>=0
y=x}else y=!1}else y=!1
if(y){this.c=!0
this.a=0
z=this.x
if(typeof z!=="number")return H.k(z)
b=0-z
z=this.y
if(typeof z!=="number")return z.B()
this.y=z-b
this.x=0
this.ah(1)
this.ah(2)
z=this.a
if(typeof z!=="number")return z.B()
this.ab(z,z-1,this.c,b)}else{if(z){z=this.b
if(typeof z!=="number")return z.al()
y=this.a
if(typeof y!=="number")return y.R()
if(y>z*2){z=this.x
y=this.y
if(typeof z!=="number")return z.w()
if(typeof y!=="number")return H.k(y)
y=z+y<0
z=y}else z=!1}else z=!1
if(z){this.c=!0
z=this.b
if(typeof z!=="number")return z.X()
this.a=z*2
z=this.x
if(typeof z!=="number")return H.k(z)
b=0-z
z=this.y
if(typeof z!=="number")return z.B()
this.y=z-b
this.x=this.f
this.ah(16)
this.ah(32)
z=this.a
if(typeof z!=="number")return z.w()
this.ab(z,z+1,this.c,b)}}this.fs()
z=this.b
if(typeof z!=="number")return z.al()
y=this.a
if(typeof y!=="number")return y.R()
z=y>z*2||y<0
this.ch=z}z=this.x
y=this.y
if(typeof z!=="number")return z.w()
if(typeof y!=="number")return H.k(y)
this.x=z+y
this.y=0},
fs:function(){var z,y,x,w,v,u,t
while(!0){z=this.a
if(typeof z!=="number")return z.al()
if(z>=0){y=this.b
if(typeof y!=="number")return y.X()
y=z<=y*2}else y=!1
if(!y){y=this.b
if(typeof y!=="number")return y.I()
y=!1}else y=!0
if(!y)break
y=this.c
x=y===!0
w=!x
if(w){v=this.x
u=this.y
if(typeof v!=="number")return v.w()
if(typeof u!=="number")return H.k(u)
u=v+u<=0
v=u}else v=!1
if(v){this.c=!0;--z
this.a=z
y=this.x
if(typeof y!=="number")return H.k(y)
t=0-y
y=this.y
if(typeof y!=="number")return y.B()
this.y=y-t
this.x=this.f
if(this.d===!0&&Math.abs(C.a.J(z,4))===2)this.cV()
else this.cU()
z=this.db
if(z!=null){y=this.dx
if(typeof y!=="number")return y.ad()
y=(y&32)>0}else y=!1
if(y)z.$2(32,this)
z=this.a
if(typeof z!=="number")return z.w()
this.ab(z,z+1,this.c,t)}else{if(w){w=this.x
v=this.y
if(typeof w!=="number")return w.w()
if(typeof v!=="number")return H.k(v)
u=this.r
if(typeof u!=="number")return H.k(u)
u=w+v>=u
w=u}else w=!1
if(w){this.c=!0;++z
this.a=z
y=this.r
x=this.x
if(typeof y!=="number")return y.B()
if(typeof x!=="number")return H.k(x)
t=y-x
x=this.y
if(typeof x!=="number")return x.B()
this.y=x-t
this.x=0
if(this.d===!0&&Math.abs(C.a.J(z,4))===2)this.cU()
else this.cV()
z=this.db
if(z!=null){y=this.dx
if(typeof y!=="number")return y.ad()
y=(y&2)>0}else y=!1
if(y)z.$2(2,this)
z=this.a
if(typeof z!=="number")return z.B()
this.ab(z,z-1,this.c,t)}else{if(x){w=this.x
v=this.y
if(typeof w!=="number")return w.w()
if(typeof v!=="number")return H.k(v)
v=w+v<0
w=v}else w=!1
if(w){this.c=!1;--z
this.a=z
y=this.x
if(typeof y!=="number")return H.k(y)
t=0-y
y=this.y
if(typeof y!=="number")return y.B()
this.y=y-t
this.x=0
this.ab(z,z+1,!1,t)
z=this.db
if(z!=null){y=this.dx
if(typeof y!=="number")return y.ad()
y=(y&64)>0}else y=!1
if(y)z.$2(64,this)
z=this.a
if(typeof z!=="number")return z.I()
if(z<0){z=this.b
if(typeof z!=="number")return z.al()
z=!0}else z=!1
if(z){z=this.db
if(z!=null){y=this.dx
if(typeof y!=="number")return y.ad()
y=(y&128)>0}else y=!1
if(y)z.$2(128,this)}else this.x=this.r}else{if(x){w=this.x
v=this.y
if(typeof w!=="number")return w.w()
if(typeof v!=="number")return H.k(v)
u=this.f
if(typeof u!=="number")return H.k(u)
u=w+v>u
w=u}else w=!1
if(w){this.c=!1;++z
this.a=z
y=this.f
x=this.x
if(typeof y!=="number")return y.B()
if(typeof x!=="number")return H.k(x)
t=y-x
x=this.y
if(typeof x!=="number")return x.B()
this.y=x-t
this.x=y
this.ab(z,z-1,!1,t)
z=this.db
if(z!=null){y=this.dx
if(typeof y!=="number")return y.ad()
y=(y&4)>0}else y=!1
if(y)z.$2(4,this)
z=this.a
y=this.b
if(typeof y!=="number")return y.X()
if(typeof z!=="number")return z.R()
if(z>y*2&&!0){z=this.db
if(z!=null){y=this.dx
if(typeof y!=="number")return y.ad()
y=(y&8)>0}else y=!1
if(y)z.$2(8,this)}this.x=0}else{t=this.y
if(x){if(typeof t!=="number")return t.B()
this.y=t-t
x=this.x
if(typeof x!=="number")return x.w()
this.x=x+t
this.ab(z,z,y,t)
break}else{if(typeof t!=="number")return t.B()
this.y=t-t
z=this.x
if(typeof z!=="number")return z.w()
this.x=z+t
break}}}}}}}},ij:{"^":"e;a,b,c,$ti",
dQ:function(a,b){this.a=P.bB(null,null)}},ik:{"^":"e;a,b,$ti"},bl:{"^":"bv;fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx",
aa:function(a){var z,y
this.dF(0)
this.fy=null
this.go=null
this.id=null
this.k1=-1
this.k2=null
this.k3=null
this.r1=!1
this.k4=!1
this.rx=0
this.r2=0
z=this.y1.length
y=$.ax
if(z!==y)this.y1=new Float32Array(H.et(y))
z=this.y2.length
y=(2+$.cw)*$.ax
if(z!==y)this.y2=new Float32Array(H.et(y))},
gaS:function(){return this.x1},
eZ:function(){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.fy==null)return
z=this.ry
this.ec(z)
y=this.x2
x=y.length
w=z.length
v=this.x1
u=v.length
t=0
while(!0){s=this.r2
if(typeof s!=="number")return H.k(s)
if(!(t<s))break
if(t>=u)return H.f(v,t)
s=v[t]
if(this.r1===!0){if(t>=w)return H.f(z,t)
r=z[t]}else r=0
v[t]=J.w(s,r)
q=0
while(!0){s=this.rx
if(typeof s!=="number")return H.k(s)
if(!(q<s))break
s=this.r2
if(typeof s!=="number")return H.k(s)
s=q*s+t
if(s>=x)return H.f(y,s)
r=y[s]
if(this.r1===!0){if(t>=w)return H.f(z,t)
p=z[t]}else p=0
y[s]=C.y.w(r,p);++q}if(this.k4===!0){if(t>=w)return H.f(z,t)
o=z[t]
z[t]=v[t]
v[t]=o}++t}},
ab:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
if(this.fy==null||this.k2==null)return
z=c!==!0
if(z){if(typeof a!=="number")return a.R()
if(typeof b!=="number")return H.k(b)
y=a>b}else y=!1
if(y){if(this.d===!0){if(typeof b!=="number")return b.J()
z=Math.abs(C.a.J(b,4))===2}else z=!1
this.a5(z?this.ry:this.x1)
return}if(z){if(typeof a!=="number")return a.I()
if(typeof b!=="number")return H.k(b)
z=a<b}else z=!1
if(z){if(this.d===!0){if(typeof b!=="number")return b.J()
z=Math.abs(C.a.J(b,4))===2}else z=!1
this.a5(z?this.x1:this.ry)
return}z=this.f
if(typeof z!=="number")return z.I()
y=z<1e-11
if(y){if(typeof d!=="number")return d.R()
x=d>-1e-11}else x=!1
if(x){if(this.d===!0){if(typeof a!=="number")return a.J()
z=Math.abs(C.a.J(a,4))===2}else z=!1
this.a5(z?this.x1:this.ry)
return}if(y){if(typeof d!=="number")return d.I()
y=d<1e-11}else y=!1
if(y){if(this.d===!0){if(typeof a!=="number")return a.J()
z=Math.abs(C.a.J(a,4))===2}else z=!1
this.a5(z?this.ry:this.x1)
return}if(this.d===!0){if(typeof a!=="number")return a.J()
y=Math.abs(C.a.J(a,4))===2}else y=!1
w=this.x
if(y){if(typeof w!=="number")return H.k(w)
w=z-w}y=this.k2
if(typeof w!=="number")return w.K()
v=y.a.$1(w/z)
if(this.rx===0||this.k3==null){z=this.ry
y=z.length
x=this.x1
u=x.length
t=J.cQ(v)
s=0
while(!0){r=this.r2
if(typeof r!=="number")return H.k(r)
if(!(s<r))break
r=this.y1
if(s>=y)return H.f(z,s)
q=z[s]
if(s>=u)return H.f(x,s)
q=J.w(q,t.X(v,J.Q(x[s],q)))
if(s>=r.length)return H.f(r,s)
r[s]=q;++s}}else{z=this.x2
y=z.length
x=this.ry
u=x.length
t=this.x1
r=t.length
s=0
while(!0){q=this.r2
if(typeof q!=="number")return H.k(q)
if(!(s<q))break
p=this.y2
if(s>=u)return H.f(x,s)
o=x[s]
n=p.length
if(0>=n)return H.f(p,0)
p[0]=o
o=this.rx
if(typeof o!=="number")return H.k(o)
m=1+o
if(s>=r)return H.f(t,s)
l=t[s]
if(m>=n)return H.f(p,m)
p[m]=l
for(k=0;k<o;k=j){j=k+1
m=k*q+s
if(m>=y)return H.f(z,m)
m=z[m]
if(j>=n)return H.f(p,j)
p[j]=m}q=this.y1
o=this.k3.a.$3(v,p,o+2)
if(s>=q.length)return H.f(q,s)
q[s]=o;++s}}this.a5(this.y1)},
cV:function(){if(this.fy==null)return
this.a5(this.ry)},
cU:function(){if(this.fy==null)return
this.a5(this.x1)},
ec:function(a){var z=this.id
if(z!=null)return z.ft(this.fy,this,this.k1,a)
else{z=this.fy
if(!!J.q(z).$ise_)return z.dr(this,this.k1,a)}return 0},
a5:function(a){var z,y,x,w,v,u
z=this.id
if(z!=null)z.fv(this.fy,this,this.k1,a)
else{z=this.fy
y=J.q(z)
if(!!y.$ise_)switch(this.k1){case 1:x=a.length
if(0>=x)return H.f(a,0)
w=a[0]
if(1>=x)return H.f(a,1)
x=a[1]
v=z.z
y.ae(z,P.a8(w,x,v.c,v.d,null))
break
case 2:x=a.length
if(0>=x)return H.f(a,0)
w=a[0]
if(1>=x)return H.f(a,1)
v=a[1]
if(2>=x)return H.f(a,2)
u=a[2]
if(3>=x)return H.f(a,3)
y.ae(z,P.a8(w,v,u,a[3],null))
break}}}},kx:{"^":"i:11;",
$1:function(a){a.aa(0)}},ky:{"^":"i:11;",
$1:function(a){J.fo(a)}},kw:{"^":"i:0;",
$0:function(){var z,y,x,w,v,u
z=[P.a3]
y=H.B(new Array($.ax),z)
x=new Array($.ax)
x.fixed$length=Array
x=H.B(x,z)
w=H.B(new Array($.cw*$.ax),z)
v=H.B(new Array($.ax),z)
u=new Array((2+$.cw)*$.ax)
u.fixed$length=Array
z=new B.bl(null,null,null,null,null,null,null,null,null,null,y,x,w,v,H.B(u,z),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.aa(0)
return z}},iX:{"^":"e;a,b",
aT:function(a,b){var z,y
z=this.a
C.b.cC(z,"removeWhere")
C.b.ep(z,new B.iY(),!0)
if(!this.b)if(b>=0)for(y=0;y<z.length;++y)z[y].aT(0,b)
else for(y=z.length-1;y>=0;--y){if(y>=z.length)return H.f(z,y)
z[y].aT(0,b)}},
gi:function(a){return this.a.length}},iY:{"^":"i:21;",
$1:function(a){var z
if(a.gf2()&&a.fr===!0){z=$.$get$dY()
if(!z.a.A(0,a)){z.b.a.$1(a)
z.a.S(0,a)}return!0}return!1}}}],["","",,Z,{"^":"",
nY:[function(){Z.a0("Initializing UI...")
Z.kT()
Z.a0("Loading...")
W.aZ("plain.vs.glsl",null,null).G(new Z.lb())},"$0","eK",0,0,0],
lk:[function(a){var z=J.j(a)
z.d4(a)
$.bq.c.bT($.ah.c.aO(z.gaN(a)))
z=$.bq
z.toString
C.e.ga_(window).G(z.gT())},"$1","la",2,0,8],
a0:function(a){var z=document.querySelector("#status")
P.a4(a)
J.fr(z,"<p>"+H.h(a)+"</p>")},
kT:function(){var z,y
$.cJ=new B.iX(H.B([],[B.bv]),!1)
$.ax=4
z=document
y=z.querySelector("#help")
z=J.d0(z.querySelector("#help-sign"))
W.I(z.a,z.b,new Z.kU(y),!1,H.K(z,0))
z=J.d0(y)
W.I(z.a,z.b,new Z.kV(y),!1,H.K(z,0))
W.I(window,"keypress",new Z.kW(),!1,W.by)},
l3:function(){var z,y
Z.a0("Changing pallete...")
z=$.$get$cf()
y=$.cO+1
$.cO=y
W.aZ(z[y%3],null,null).G(new Z.l4())},
lg:function(){var z,y
Z.a0("Loading precise shader...")
z=$.$get$cg()
y=$.cP+1
$.cP=y
W.aZ(z[y%2],null,null).G(new Z.lh())},
il:{"^":"e;a,b",
j:function(a){return this.b}},
fX:{"^":"e;a,b,c,d,e,f,r,x,y,z,Q,ch",
eX:function(a,b){var z,y,x
z=J.c1(this.a,35633)
J.c4(this.a,z,a)
J.c0(this.a,z)
if(J.bt(this.a,z,35713)!==!0){P.a4(J.ab(this.a,z))
Z.a0(J.ab(this.a,z))
throw H.c(P.ae(J.ab(this.a,z)))}y=J.c1(this.a,35632)
J.c4(this.a,y,b)
J.c0(this.a,y)
if(J.bt(this.a,y,35713)!==!0){P.a4(J.ab(this.a,y))
Z.a0(J.ab(this.a,y))
throw H.c(P.ae(J.ab(this.a,y)))}x=J.f_(this.a)
J.c_(this.a,x,z)
J.c_(this.a,x,y)
J.d2(this.a,x)
if(J.c3(this.a,x,35714)!==!0){P.a4(J.aU(this.a,x))
Z.a0(J.aU(this.a,x))
throw H.c(P.ae(J.aU(this.a,x)))}J.d6(this.a,x)
return x},
dh:function(a){var z,y,x
z=J.c1(this.a,35632)
J.c4(this.a,z,a)
J.c0(this.a,z)
if(J.bt(this.a,z,35713)!==!0){P.a4(J.ab(this.a,z))
Z.a0(J.ab(this.a,z))
throw H.c(P.ae(J.ab(this.a,z)))}y=this.b
if(y!=null){x=J.d1(this.a,y)
y=J.R(x)
J.f1(this.a,this.b,y.h(x,1))
J.f0(this.a,y.h(x,1))
J.c_(this.a,this.b,z)
J.d2(this.a,this.b)
if(J.c3(this.a,this.b,35714)!==!0){P.a4(J.aU(this.a,this.b))
Z.a0(J.aU(this.a,this.b))
throw H.c(P.ae(J.aU(this.a,this.b)))}J.d6(this.a,this.b)}},
eY:function(){var z,y,x,w,v,u,t,s
z=J.aA(this.a,this.b,"u_color")
y=J.aA(this.a,this.b,"u_viewport")
x=J.aA(this.a,this.b,"u_kmax")
w=J.aA(this.a,this.b,"u_range")
this.bT(new P.L(-0.8,0.156,[null]))
v=this.a
u=J.j(v)
u.bB(v,y,u.gbo(v),J.c2(this.a))
v=this.a
u=this.z
t=J.w(u.b,u.d)
s=this.z
J.fw(v,w,u.a,t,J.w(s.a,s.c),this.z.b)
J.fv(this.a,z,new Float32Array(H.bR([0.5,0.9,0.9,1])))
if(x!=null)J.ft(this.a,x,this.c)},
eW:function(){var z=this.r
this.bb(this.b,"a_texture",this.y,z)
this.bb(this.b,"a_position",this.x,z)
this.ch=this.bb(this.b,"a_range",this.c6(),z)},
ei:function(a,b,c,d,e){var z,y,x,w,v,u
z=J.fi(this.a,a,b)
if(z===-1){P.a4('No such attribute: "'+b+'" in program '+J.a5(a))
y=J.c3(this.a,a,35721)
if(typeof y!=="number")return H.k(y)
x=0
for(;x<y;++x){w=J.fh(this.a,a,x)
H.eN(H.h(w.type)+" "+H.h(w.name)+" "+H.h(w.size))}v=J.f5(J.d1(this.a,a),new Z.fY(this))
P.a4(J.fk(this.a,v))
return}u=J.eZ(this.a)
J.bs(this.a,34962,u)
J.cX(this.a,34962,c,35044)
J.fx(this.a,z,d,e,!1,0,0)
J.f4(this.a,z)
J.bs(this.a,34962,null)
return u},
bb:function(a,b,c,d){return this.ei(a,b,c,d,5126)},
c6:function(){var z,y,x,w,v,u,t,s,r,q
z=this.z
y=J.w(z.b,z.d)
x=this.z
x=J.w(x.a,x.c)
w=this.z
v=w.b
u=w.a
w=J.w(v,w.d)
t=this.z
t=J.w(t.a,t.c)
s=this.z
r=J.w(s.a,s.c)
q=this.z
return new Float32Array(H.bR([z.a,y,x,v,u,v,u,w,t,s.b,r,J.w(q.b,q.d)]))},
ae:function(a,b){var z,y,x
z=this.z.c
if(typeof z!=="number")return H.k(z)
this.z=b
if(1/z<1000){z=b.c
if(typeof z!=="number")return H.k(z)}z=this.ch
y=this.c6()
J.bs(this.a,34962,z)
J.cX(this.a,34962,y,35044)
J.bs(this.a,34962,null)
y=this.z
y=J.w(y.c,y.d)
if(typeof y!=="number")return y.K()
x=J.aA(this.a,this.b,"u_spot_radius")
if(x!=null)J.d5(this.a,x,y/500)},
dr:function(a,b,c){var z,y
switch(b){case 1:z=this.z
y=c.length
if(0>=y)return H.f(c,0)
c[0]=z.a
if(1>=y)return H.f(c,1)
c[1]=z.b
return 2
case 2:z=this.z
y=c.length
if(0>=y)return H.f(c,0)
c[0]=z.a
if(1>=y)return H.f(c,1)
c[1]=z.b
if(2>=y)return H.f(c,2)
c[2]=z.c
if(3>=y)return H.f(c,3)
c[3]=z.d
return 4}return 0},
aO:function(a){var z,y,x,w,v,u
z=J.U(a.a,this.z.c)
y=J.d_(this.a)
if(typeof z!=="number")return z.K()
if(typeof y!=="number")return H.k(y)
x=this.z
w=x.a
if(typeof w!=="number")return H.k(w)
x=J.U(a.b,x.d)
v=J.c2(this.a)
if(typeof x!=="number")return x.K()
if(typeof v!=="number")return H.k(v)
u=this.z.b
if(typeof u!=="number")return H.k(u)
return new P.L(z/y+w,x/v+u,[null])},
bT:function(a){var z,y,x,w,v
z=J.aA(this.a,this.b,"u_c")
if(z==null)return
this.e=a
y=a.a
x=a.b
J.fu(this.a,z,y,x)
w=(1+Math.sqrt(1+4*Math.sqrt(H.cL(J.w(J.U(y,y),J.U(x,x))))))/2
x=-w
y=2*w
this.ae(0,P.a8(x,x,y,y,null))
v=J.aA(this.a,this.b,"u_R")
if(v!=null)J.d5(this.a,v,w)},
$ise_:1},
fY:{"^":"i:1;a",
$1:function(a){return J.O(J.bt(this.a.a,a,35663),35633)}},
lb:{"^":"i:3;",
$1:function(a){return W.aZ("julia.fs.glsl",null,null).G(new Z.l9(a))}},
l9:{"^":"i:3;a",
$1:function(a){var z,y
z=$.$get$cg()
y=$.cP
if(y>=2)return H.f(z,y)
return W.aZ(z[y],null,null).G(new Z.l8(this.a,a))}},
l8:{"^":"i:3;a,b",
$1:function(a){var z,y
z=$.$get$cf()
y=$.cO
if(y>=3)return H.f(z,y)
return W.aZ(z[y],null,null).G(new Z.l7(this.a,this.b,a))}},
l7:{"^":"i:3;a,b,c",
$1:function(a){var z,y
z=this.c
$.cF=z
$.cE=a
y=this.a
z=Z.dv("mandel",y,J.w(z,a))
$.ah=z
$.eL=Z.dc(z)
y=Z.dv("julia",y,this.b)
$.bq=y
y.c.ae(0,P.a8(-2,-2,4,4,null))
$.l2=Z.dc($.bq)
y=W.Z
W.I($.ah.a,"contextmenu",Z.la(),!1,y)
W.I($.ah.a,"mousemove",new Z.l6(),!1,y)
y=document.body
y.children
y.appendChild($.$get$br().z)
y=$.$get$br().z
z=y.style
z.position="absolute"
z=y.style
z.top="0px"
z=y.style
z.right="0px"
z=$.ah
z.toString
C.e.ga_(window).G(z.gT())
z=$.bq
z.toString
C.e.ga_(window).G(z.gT())
Z.a0("")}},
l6:{"^":"i:4;",
$1:function(a){if(($.eL.b&4)!==0)Z.lk(a)}},
kU:{"^":"i:1;a",
$1:function(a){return J.cZ(this.a).W(0,"hide")}},
kV:{"^":"i:1;a",
$1:function(a){return J.cZ(this.a).H(0,"hide")}},
kW:{"^":"i:22;",
$1:function(a){if(J.f8(a)===112)Z.l3()
if(a.charCode===100)Z.lg()}},
l4:{"^":"i:3;",
$1:function(a){var z
$.cE=a
$.ah.c.dh(J.w($.cF,a))
Z.a0("")
z=$.ah
z.toString
C.e.ga_(window).G(z.gT())}},
lh:{"^":"i:3;",
$1:function(a){var z
$.cF=a
$.ah.c.dh(J.w(a,$.cE))
Z.a0("")
z=$.ah
z.toString
C.e.ga_(window).G(z.gT())}},
fR:{"^":"e;aQ:a>,b,c"},
h1:{"^":"e;a,b,c,d,e",
bX:function(a,b,c){C.u.aB(this.d,b)
if(c!=null)this.d.classList.add(c)},
bW:function(a,b){return this.bX(a,b,null)},
fG:[function(a){var z=$.$get$br().a
if(z.b!=null){z.a=J.w(z.a,J.Q($.aG.$0(),z.b))
z.b=null}z=J.Q(a,this.e)
if(typeof z!=="number")return z.K()
this.e=a
$.cJ.aT(0,z/1000)
z=this.c
J.eY(z.a,0,0,0,1)
J.eX(z.a,16384)
J.f2(z.a,4,0,C.a.aC(z.x.length,z.r))
$.$get$br().eM(0)
if($.cJ.a.length>0){z=window
C.e.c5(z)
C.e.cl(z,W.cI(this.gT()))}},"$1","gT",2,0,23],
dO:function(a,b,c){var z,y,x,w,v,u,t
z=document
y=z.createElement("div")
y.id=a
z.body.appendChild(y)
x=z.createElement("div")
this.d=x
x.classList.add("field-status")
y.appendChild(this.d)
x=y.clientWidth
w=y.clientHeight
v=z.createElement("canvas")
if(x!=null)v.width=x
if(w!=null)v.height=w
this.a=v
u=P.aE(["alpha",!0,"depth",!1,"stencil",!1,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
t=C.l.bL(v,"webgl",u)
if(t==null)t=C.l.bL(v,"experimental-webgl",u)
this.b=t
if(t==null){this.bX(0,"\u041f\u0440\u043e\u0441\u0442\u0438\u0442\u0435, \u0432\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 WebGl http://webglreport.com/","error")
throw H.c(new P.b4("http://webglreport.com/"))}z=this.a
J.d7(t,0,0,z.width,z.height)
W.I(window,"resize",new Z.h2(this,y),!1,W.aY)
y.appendChild(this.a)
z=this.b
x=$.fZ
w=-x
w=new Z.fX(z,null,250,null,null,C.J,2,new Float32Array(H.bR([w,w,x,x,w,x,w,w,x,x,x,w])),new Float32Array(H.bR([0,0,1,1,0,1,0,0,1,1,1,0])),P.a8(-2,-1.5,3,3,null),null,null)
w.b=w.eX(b,c)
w.eW()
w.eY()
this.c=w
w=w.z.c
if(typeof w!=="number")return H.k(w)
this.bW(0,"zoom: "+H.h(1/w))},
q:{
dv:function(a,b,c){var z=new Z.h1(null,null,null,null,0)
z.dO(a,b,c)
return z}}},
h2:{"^":"i:1;a,b",
$1:function(a){var z,y,x
z=this.a
y=z.a
x=this.b
y.width=x.clientWidth
y.height=x.clientHeight
J.d7(z.b,0,0,y.width,y.height)
C.e.ga_(window).G(z.gT())}},
fG:{"^":"e;a,b,c,d,e,f,r,x",
bC:function(){var z,y
z=this.c
y=z.c.z.c
if(typeof y!=="number")return H.k(y)
z.bW(0,"zoom: "+H.h(1/y))},
fK:[function(a,b){var z,y
z=this.b
y=J.f7(b)
if(typeof y!=="number")return H.k(y)
this.b=(z|C.a.aX(1,y))>>>0
this.e=new P.L(b.clientX,b.clientY,[null])},"$1","gfb",2,0,4],
fL:[function(a,b){var z
if((this.b&1)>0){z=J.j(b)
this.c.a.dispatchEvent(W.fK("fielddrag",!0,!0,new Z.fR(z.gaK(b).B(0,this.e),this.b,b)))
this.e=z.gaK(b)}this.bC()},"$1","gfc",2,0,4],
fM:[function(a,b){this.b=0
this.e=null},"$1","gfd",2,0,4],
fI:[function(a){var z,y,x,w,v,u
z=this.c
y=z.c
x=J.fc(J.f9(a))
y.toString
w=J.U(x.gl(x),y.z.c)
v=J.c2(y.a)
if(typeof w!=="number")return w.K()
if(typeof v!=="number")return H.k(v)
x=J.U(x.b,y.z.d)
y=J.d_(y.a)
if(typeof x!=="number")return x.K()
if(typeof y!=="number")return H.k(y)
u=this.x
if(u!=null)u.aj()
u=z.c
v=J.Q(u.z.a,w/v)
y=J.Q(z.c.z.b,x/y)
x=u.z
u.ae(0,P.a8(v,y,x.c,x.d,null))
z.toString
C.e.ga_(window).G(z.gT())
this.bC()},"$1","gf9",2,0,24],
fN:[function(a){this.bG(this.c.c.aO(J.fa(a)),1.62)},"$1","gfe",2,0,4],
bG:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.c
y=z.c.z
x=this.x
if(x!=null){x=x.gaS()
if(0>=x.length)return H.f(x,0)
x=x[0]
w=this.x.gaS()
if(1>=w.length)return H.f(w,1)
w=w[1]
v=this.x.gaS()
if(2>=v.length)return H.f(v,2)
v=v[2]
u=this.x.gaS()
if(3>=u.length)return H.f(u,3)
y=P.a8(x,w,v,u[3],null)}x=y.c
if(typeof x!=="number")return x.K()
t=x/b
w=y.d
if(typeof w!=="number")return w.K()
s=w/b
x=J.w(y.a,x/2)
w=J.w(y.b,w/2)
v=J.Q(a.a,x)
if(typeof v!=="number")return v.K()
v=J.w(x,v/3)
x=J.Q(a.b,w)
if(typeof x!=="number")return x.K()
x=J.w(w,x/3)
r=J.Q(v,t/2)
q=J.Q(x,s/2)
x=this.x
if(x!=null)x.aj()
z.c.ae(0,P.a8(r,q,t,s,null))
z.toString
C.e.ga_(window).G(z.gT())
this.bC()},
fJ:[function(a){},"$1","gfa",2,0,8],
dM:function(a){var z,y,x
z=this.c.a
y=W.Z
W.I(z,"mousedown",this.gfb(this),!1,y)
W.I(z,"mouseup",this.gfd(this),!1,y)
W.I(z,"mousemove",this.gfc(this),!1,y)
W.I(z,"dblclick",this.gfe(),!1,W.aY)
x=this.f
W.I(z,x.a,this.gf9(),!1,H.K(x,0))
W.I(z,"contextmenu",this.gfa(),!1,y)
W.I(z,W.kK().$1(z),new Z.fH(this),!1,W.bM)},
q:{
dc:function(a){var z=[null]
z=new Z.fG(5,0,a,!1,null,new W.dj("fielddrag",z),new W.dj("fieldupdate",z),null)
z.dM(a)
return z}}},
fH:{"^":"i:25;a",
$1:function(a){var z,y
z=J.j(a)
y=z.gbn(a)
if(typeof y!=="number")return y.R()
if(y>0){y=this.a
y.bG(y.c.c.aO(z.gaN(a)),0.6172839506172839)}y=z.gbn(a)
if(typeof y!=="number")return y.I()
if(y<0){y=this.a
y.bG(y.c.c.aO(z.gaN(a)),1.62)}}}},1]]
setupProgram(dart,0)
J.q=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dA.prototype
return J.dz.prototype}if(typeof a=="string")return J.bj.prototype
if(a==null)return J.dB.prototype
if(typeof a=="boolean")return J.hZ.prototype
if(a.constructor==Array)return J.bh.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bk.prototype
return a}if(a instanceof P.e)return a
return J.bU(a)}
J.R=function(a){if(typeof a=="string")return J.bj.prototype
if(a==null)return a
if(a.constructor==Array)return J.bh.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bk.prototype
return a}if(a instanceof P.e)return a
return J.bU(a)}
J.ag=function(a){if(a==null)return a
if(a.constructor==Array)return J.bh.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bk.prototype
return a}if(a instanceof P.e)return a
return J.bU(a)}
J.aP=function(a){if(typeof a=="number")return J.bi.prototype
if(a==null)return a
if(!(a instanceof P.e))return J.bm.prototype
return a}
J.cQ=function(a){if(typeof a=="number")return J.bi.prototype
if(typeof a=="string")return J.bj.prototype
if(a==null)return a
if(!(a instanceof P.e))return J.bm.prototype
return a}
J.eE=function(a){if(typeof a=="string")return J.bj.prototype
if(a==null)return a
if(!(a instanceof P.e))return J.bm.prototype
return a}
J.j=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bk.prototype
return a}if(a instanceof P.e)return a
return J.bU(a)}
J.w=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.cQ(a).w(a,b)}
J.O=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.q(a).t(a,b)}
J.eS=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aP(a).R(a,b)}
J.eT=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aP(a).I(a,b)}
J.U=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.cQ(a).X(a,b)}
J.Q=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aP(a).B(a,b)}
J.cV=function(a,b){return J.aP(a).aC(a,b)}
J.cW=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.eI(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.R(a).h(a,b)}
J.eU=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.eI(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.ag(a).k(a,b,c)}
J.eV=function(a,b,c,d){return J.j(a).e0(a,b,c,d)}
J.bZ=function(a,b,c,d,e){return J.j(a).eh(a,b,c,d,e)}
J.eW=function(a,b,c,d){return J.j(a).eo(a,b,c,d)}
J.c_=function(a,b,c){return J.j(a).cw(a,b,c)}
J.bs=function(a,b,c){return J.j(a).cz(a,b,c)}
J.cX=function(a,b,c,d){return J.j(a).cA(a,b,c,d)}
J.eX=function(a,b){return J.ag(a).cE(a,b)}
J.eY=function(a,b,c,d,e){return J.j(a).cF(a,b,c,d,e)}
J.c0=function(a,b){return J.j(a).cH(a,b)}
J.eZ=function(a){return J.j(a).cK(a)}
J.f_=function(a){return J.j(a).cL(a)}
J.c1=function(a,b){return J.j(a).cM(a,b)}
J.f0=function(a,b){return J.j(a).cN(a,b)}
J.f1=function(a,b,c){return J.j(a).cO(a,b,c)}
J.f2=function(a,b,c,d){return J.j(a).cQ(a,b,c,d)}
J.f3=function(a,b){return J.ag(a).n(a,b)}
J.f4=function(a,b){return J.j(a).cS(a,b)}
J.f5=function(a,b){return J.ag(a).cT(a,b)}
J.f6=function(a,b){return J.ag(a).E(a,b)}
J.cY=function(a){return J.j(a).gex(a)}
J.f7=function(a){return J.j(a).gez(a)}
J.f8=function(a){return J.j(a).geA(a)}
J.cZ=function(a){return J.j(a).gcD(a)}
J.f9=function(a){return J.j(a).gcP(a)}
J.c2=function(a){return J.j(a).gcR(a)}
J.d_=function(a){return J.j(a).gbo(a)}
J.aT=function(a){return J.j(a).gL(a)}
J.V=function(a){return J.q(a).gv(a)}
J.bb=function(a){return J.ag(a).gD(a)}
J.fa=function(a){return J.j(a).gaN(a)}
J.bc=function(a){return J.R(a).gi(a)}
J.fb=function(a){return J.j(a).gf8(a)}
J.fc=function(a){return J.j(a).gaQ(a)}
J.d0=function(a){return J.j(a).gd2(a)}
J.fd=function(a){return J.j(a).gbv(a)}
J.fe=function(a){return J.j(a).gfl(a)}
J.ff=function(a){return J.j(a).gfo(a)}
J.fg=function(a){return J.j(a).gbA(a)}
J.fh=function(a,b,c){return J.j(a).bH(a,b,c)}
J.d1=function(a,b){return J.j(a).bI(a,b)}
J.fi=function(a,b,c){return J.j(a).bJ(a,b,c)}
J.fj=function(a){return J.j(a).bK(a)}
J.aU=function(a,b){return J.j(a).bM(a,b)}
J.c3=function(a,b,c){return J.j(a).bN(a,b,c)}
J.ab=function(a,b){return J.j(a).bO(a,b)}
J.bt=function(a,b,c){return J.j(a).bP(a,b,c)}
J.fk=function(a,b){return J.j(a).bQ(a,b)}
J.aA=function(a,b,c){return J.j(a).bR(a,b,c)}
J.d2=function(a,b){return J.j(a).d_(a,b)}
J.fl=function(a,b){return J.ag(a).a1(a,b)}
J.fm=function(a){return J.j(a).d4(a)}
J.fn=function(a){return J.ag(a).fi(a)}
J.fo=function(a){return J.j(a).aa(a)}
J.aV=function(a,b){return J.j(a).a4(a,b)}
J.fp=function(a,b){return J.j(a).seb(a,b)}
J.fq=function(a,b){return J.j(a).saM(a,b)}
J.fr=function(a,b){return J.j(a).scZ(a,b)}
J.c4=function(a,b,c){return J.j(a).bV(a,b,c)}
J.d3=function(a){return J.aP(a).bz(a)}
J.fs=function(a){return J.eE(a).fp(a)}
J.a5=function(a){return J.q(a).j(a)}
J.d4=function(a){return J.eE(a).fq(a)}
J.d5=function(a,b,c){return J.j(a).dc(a,b,c)}
J.ft=function(a,b,c){return J.j(a).dd(a,b,c)}
J.fu=function(a,b,c,d){return J.j(a).bB(a,b,c,d)}
J.fv=function(a,b,c){return J.j(a).de(a,b,c)}
J.fw=function(a,b,c,d,e,f){return J.j(a).df(a,b,c,d,e,f)}
J.d6=function(a,b){return J.j(a).dk(a,b)}
J.fx=function(a,b,c,d,e,f,g){return J.j(a).dm(a,b,c,d,e,f,g)}
J.d7=function(a,b,c,d,e){return J.j(a).dn(a,b,c,d,e)}
I.aQ=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.k=W.c8.prototype
C.l=W.fB.prototype
C.u=W.fO.prototype
C.v=W.bf.prototype
C.w=J.d.prototype
C.b=J.bh.prototype
C.x=J.dz.prototype
C.a=J.dA.prototype
C.y=J.dB.prototype
C.d=J.bi.prototype
C.f=J.bj.prototype
C.F=J.bk.prototype
C.p=J.ii.prototype
C.q=W.iR.prototype
C.j=J.bm.prototype
C.e=W.j1.prototype
C.r=new P.ih()
C.t=new P.jj()
C.c=new P.jU()
C.m=new P.ak(0)
C.z=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.A=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.n=function(hooks) { return hooks; }

C.B=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.C=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.D=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.E=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.o=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.G=H.B(I.aQ(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.p])
C.H=I.aQ(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.I=I.aQ([])
C.h=H.B(I.aQ(["bind","if","ref","repeat","syntax"]),[P.p])
C.i=H.B(I.aQ(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.p])
C.J=new Z.il(0,"Precise.SINGLE")
$.dM="$cachedFunction"
$.dN="$cachedInvocation"
$.bH=null
$.aG=null
$.a6=0
$.aW=null
$.d9=null
$.cR=null
$.eA=null
$.eO=null
$.bT=null
$.bW=null
$.cS=null
$.aL=null
$.b7=null
$.b8=null
$.cG=!1
$.t=C.c
$.dr=0
$.bK=null
$.ad=null
$.ce=null
$.dh=null
$.dg=null
$.ax=3
$.cw=0
$.fZ=1
$.cP=0
$.cO=2
$.cJ=null
$.ah=null
$.bq=null
$.eL=null
$.l2=null
$.cF=null
$.cE=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["df","$get$df",function(){return H.eF("_$dart_dartClosure")},"ci","$get$ci",function(){return H.eF("_$dart_js")},"dx","$get$dx",function(){return H.hU()},"dy","$get$dy",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.dr
$.dr=z+1
z="expando$key$"+z}return new P.fW(null,z,[P.u])},"e0","$get$e0",function(){return H.aa(H.bL({
toString:function(){return"$receiver$"}}))},"e1","$get$e1",function(){return H.aa(H.bL({$method$:null,
toString:function(){return"$receiver$"}}))},"e2","$get$e2",function(){return H.aa(H.bL(null))},"e3","$get$e3",function(){return H.aa(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"e7","$get$e7",function(){return H.aa(H.bL(void 0))},"e8","$get$e8",function(){return H.aa(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"e5","$get$e5",function(){return H.aa(H.e6(null))},"e4","$get$e4",function(){return H.aa(function(){try{null.$method$}catch(z){return z.message}}())},"ea","$get$ea",function(){return H.aa(H.e6(void 0))},"e9","$get$e9",function(){return H.aa(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cx","$get$cx",function(){return P.j7()},"be","$get$be",function(){var z,y
z=P.bF
y=new P.a_(0,P.j3(),null,[z])
y.dX(null,z)
return y},"ba","$get$ba",function(){return[]},"em","$get$em",function(){return P.dD(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"cB","$get$cB",function(){return P.bz()},"de","$get$de",function(){return P.iA("^\\S+$",!0,!1)},"dZ","$get$dZ",function(){var z=new B.ik(null,null,[B.bl])
z.a=new B.kx()
z.b=new B.ky()
return z},"dY","$get$dY",function(){var z,y,x
z=$.$get$dZ()
y=B.bl
x=new B.ij(null,z,null,[y])
x.dQ(z,y)
x.c=new B.kw()
return x},"cg","$get$cg",function(){return["mandel.fs.glsl","mandel.ds.glsl"]},"cf","$get$cf",function(){return["pal1.glsl","pal2.glsl","pal3.glsl"]},"br","$get$br",function(){var z=new P.iG(0,0)
z.dS()
z=new M.iF(z,0,1000,0,0,1000,0,0,0,null,null,null,null,null,null,null)
z.dR()
return z}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,args:[P.p]},{func:1,args:[W.Z]},{func:1,v:true,args:[P.e],opt:[P.aH]},{func:1,args:[,,]},{func:1,ret:W.o},{func:1,v:true,args:[W.Z]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.p,args:[P.u]},{func:1,args:[B.bl]},{func:1,ret:P.cK,args:[W.W,P.p,P.p,W.cA]},{func:1,args:[,P.p]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,],opt:[,]},{func:1,args:[,P.aH]},{func:1,v:true,args:[,P.aH]},{func:1,args:[W.bf]},{func:1,v:true,args:[W.o,W.o]},{func:1,args:[P.p,,]},{func:1,args:[B.bv]},{func:1,args:[W.by]},{func:1,args:[P.a3]},{func:1,args:[W.cb]},{func:1,args:[W.bM]},{func:1,ret:P.a3},{func:1,v:true,args:[P.e]},{func:1,ret:P.p,args:[W.m]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.li(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.aQ=a.aQ
Isolate.J=a.J
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.eQ(Z.eK(),b)},[])
else (function(b){H.eQ(Z.eK(),b)})([])})})()