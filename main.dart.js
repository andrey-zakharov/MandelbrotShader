(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
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
b5.$isa=b4
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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isi)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="a"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="q"){processStatics(init.statics[b1]=b2.q,b3)
delete b2.q}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
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
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
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
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cx"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cx"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cx(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.ac=function(){}
var dart=[["","",,H,{"^":"",lr:{"^":"a;a"}}],["","",,J,{"^":"",
l:function(a){return void 0},
bJ:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bH:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cE==null){H.kc()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(new P.aR("Return interceptor for "+H.d(y(a,z))))}w=H.ks(a)
if(w==null){if(typeof a=="function")return C.N
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.T
else return C.V}return w},
i:{"^":"a;",
t:function(a,b){return a===b},
gC:function(a){return H.al(a)},
j:["dD",function(a){return H.bv(a)}],
"%":"CanvasRenderingContext2D|DOMError|DOMImplementation|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLActiveInfo|WebGLBuffer|WebGLProgram|WebGLShader|WebGLUniformLocation"},
hy:{"^":"i;",
j:function(a){return String(a)},
gC:function(a){return a?519018:218159},
$iscw:1},
dm:{"^":"i;",
t:function(a,b){return null==b},
j:function(a){return"null"},
gC:function(a){return 0}},
c6:{"^":"i;",
gC:function(a){return 0},
j:["dF",function(a){return String(a)}],
$ishz:1},
hS:{"^":"c6;"},
ba:{"^":"c6;"},
b5:{"^":"c6;",
j:function(a){var z=a[$.$get$d9()]
return z==null?this.dF(a):J.Z(z)}},
b2:{"^":"i;",
eD:function(a,b){if(!!a.immutable$list)throw H.c(new P.H(b))},
cz:function(a,b){if(!!a.fixed$length)throw H.c(new P.H(b))},
em:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0)z.push(w)
if(a.length!==y)throw H.c(new P.E(a))}v=z.length
if(v===y)return
this.si(a,v)
for(x=0;x<z.length;++x)this.u(a,x,z[x])},
G:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.E(a))}},
ac:function(a,b){return H.b(new H.bs(a,b),[null,null])},
aH:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.d(a[x])
if(x>=z)return H.e(y,x)
y[x]=w}return y.join(b)},
bD:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.E(a))}throw H.c(H.aN())},
cH:function(a,b){return this.bD(a,b,null)},
H:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gaZ:function(a){if(a.length>0)return a[0]
throw H.c(H.aN())},
bZ:function(a,b,c,d,e){var z,y,x
this.eD(a,"set range")
P.dE(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.w(P.av(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.hw())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
cv:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.E(a))}return!1},
B:function(a,b){var z
for(z=0;z<a.length;++z)if(J.N(a[z],b))return!0
return!1},
j:function(a){return P.bp(a,"[","]")},
gD:function(a){return H.b(new J.bV(a,a.length,0,null),[H.v(a,0)])},
gC:function(a){return H.al(a)},
gi:function(a){return a.length},
si:function(a,b){this.cz(a,"set length")
if(b<0)throw H.c(P.av(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.B(a,b))
if(b>=a.length||b<0)throw H.c(H.B(a,b))
return a[b]},
u:function(a,b,c){if(!!a.immutable$list)H.w(new P.H("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.B(a,b))
if(b>=a.length||b<0)throw H.c(H.B(a,b))
a[b]=c},
$isT:1,
$asT:I.ac,
$isj:1,
$asj:null,
$ism:1},
lq:{"^":"b2;"},
bV:{"^":"a;a,b,c,d",
gv:function(){return this.d},
p:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.aE(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
b3:{"^":"i;",
gcO:function(a){return a===0?1/a<0:a<0},
bM:function(a,b){return a%b},
ar:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.c(new P.H(""+a))},
aq:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.H(""+a))},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gC:function(a){return a&0x1FFFFFFF},
b7:function(a){return-a},
w:function(a,b){if(typeof b!=="number")throw H.c(H.L(b))
return a+b},
E:function(a,b){if(typeof b!=="number")throw H.c(H.L(b))
return a-b},
a0:function(a,b){if(typeof b!=="number")throw H.c(H.L(b))
return a*b},
J:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
aR:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else{if(typeof b!=="number")H.w(H.L(b))
return this.ar(a/b)}},
az:function(a,b){return(a|0)===a?a/b|0:this.ar(a/b)},
bb:function(a,b){if(typeof b!=="number")throw H.c(H.L(b))
if(b<0)throw H.c(H.L(b))
return b>31?0:a<<b>>>0},
bx:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
M:function(a,b){if(typeof b!=="number")throw H.c(H.L(b))
return a<b},
O:function(a,b){if(typeof b!=="number")throw H.c(H.L(b))
return a>b},
$isI:1},
dl:{"^":"b3;",$isaZ:1,$isI:1,$isr:1},
dk:{"^":"b3;",$isaZ:1,$isI:1},
b4:{"^":"i;",
aA:function(a,b){if(b<0)throw H.c(H.B(a,b))
if(b>=a.length)throw H.c(H.B(a,b))
return a.charCodeAt(b)},
w:function(a,b){if(typeof b!=="string")throw H.c(P.bU(b,null,null))
return a+b},
dz:function(a,b,c){var z
H.jV(c)
if(c>a.length)throw H.c(P.av(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
dw:function(a,b){return this.dz(a,b,0)},
bc:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.w(H.L(c))
if(b<0)throw H.c(P.bx(b,null,null))
if(typeof c!=="number")return H.k(c)
if(b>c)throw H.c(P.bx(b,null,null))
if(c>a.length)throw H.c(P.bx(c,null,null))
return a.substring(b,c)},
dB:function(a,b){return this.bc(a,b,null)},
fJ:function(a){return a.toLowerCase()},
fK:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.aA(z,0)===133){x=J.hA(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.aA(z,w)===133?J.hB(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
a0:function(a,b){var z,y
if(typeof b!=="number")return H.k(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.w)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
j:function(a){return a},
gC:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gi:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.B(a,b))
if(b>=a.length||b<0)throw H.c(H.B(a,b))
return a[b]},
$isT:1,
$asT:I.ac,
$isu:1,
q:{
dn:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 6158:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
hA:function(a,b){var z,y
for(z=a.length;b<z;){y=C.f.aA(a,b)
if(y!==32&&y!==13&&!J.dn(y))break;++b}return b},
hB:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.f.aA(a,z)
if(y!==32&&y!==13&&!J.dn(y))break}return b}}}}],["","",,H,{"^":"",
bc:function(a,b){var z=a.aC(b)
if(!init.globalState.d.cy)init.globalState.f.aL()
return z},
eJ:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isj)throw H.c(P.b0("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.jf(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$di()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.iS(P.br(null,H.bb),0)
y.z=H.b(new H.aj(0,null,null,null,null,null,0),[P.r,H.cp])
y.ch=H.b(new H.aj(0,null,null,null,null,null,0),[P.r,null])
if(y.x===!0){x=new H.je()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.hp,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.jg)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.b(new H.aj(0,null,null,null,null,null,0),[P.r,H.by])
w=P.U(null,null,null,P.r)
v=new H.by(0,null,!1)
u=new H.cp(y,x,w,init.createNewIsolate(),v,new H.aq(H.bL()),new H.aq(H.bL()),!1,!1,[],P.U(null,null,null,null),null,null,!1,!0,P.U(null,null,null,null))
w.A(0,0)
u.c5(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.be()
x=H.aB(y,[y]).a5(a)
if(x)u.aC(new H.kC(z,a))
else{y=H.aB(y,[y,y]).a5(a)
if(y)u.aC(new H.kD(z,a))
else u.aC(a)}init.globalState.f.aL()},
ht:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.hu()
return},
hu:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.H("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.H('Cannot extract URI from "'+H.d(z)+'"'))},
hp:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bC(!0,[]).a8(b.data)
y=J.M(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bC(!0,[]).a8(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bC(!0,[]).a8(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.b(new H.aj(0,null,null,null,null,null,0),[P.r,H.by])
p=P.U(null,null,null,P.r)
o=new H.by(0,null,!1)
n=new H.cp(y,q,p,init.createNewIsolate(),o,new H.aq(H.bL()),new H.aq(H.bL()),!1,!1,[],P.U(null,null,null,null),null,null,!1,!0,P.U(null,null,null,null))
p.A(0,0)
n.c5(0,o)
init.globalState.f.a.U(new H.bb(n,new H.hq(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aL()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aI(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aL()
break
case"close":init.globalState.ch.Z(0,$.$get$dj().h(0,a))
a.terminate()
init.globalState.f.aL()
break
case"log":H.ho(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.at(["command","print","msg",z])
q=new H.ax(!0,P.aV(null,P.r)).P(q)
y.toString
self.postMessage(q)}else P.Y(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
ho:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.at(["command","log","msg",a])
x=new H.ax(!0,P.aV(null,P.r)).P(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.C(w)
z=H.P(w)
throw H.c(P.a7(z))}},
hr:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dz=$.dz+("_"+y)
$.dA=$.dA+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aI(f,["spawned",new H.bE(y,x),w,z.r])
x=new H.hs(a,b,c,d,z)
if(e===!0){z.cu(w,w)
init.globalState.f.a.U(new H.bb(z,x,"start isolate"))}else x.$0()},
jJ:function(a){return new H.bC(!0,[]).a8(new H.ax(!1,P.aV(null,P.r)).P(a))},
kC:{"^":"f:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
kD:{"^":"f:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
jf:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",q:{
jg:function(a){var z=P.at(["command","print","msg",a])
return new H.ax(!0,P.aV(null,P.r)).P(z)}}},
cp:{"^":"a;a,b,c,fh:d<,eJ:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cu:function(a,b){if(!this.f.t(0,a))return
if(this.Q.A(0,b)&&!this.y)this.y=!0
this.by()},
fD:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.Z(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.e(v,w)
v[w]=x
if(w===y.c)y.cb();++y.d}this.y=!1}this.by()},
eu:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
fC:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.w(new P.H("removeRange"))
P.dE(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dt:function(a,b){if(!this.r.t(0,a))return
this.db=b},
f4:function(a,b,c){var z=J.l(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){J.aI(a,c)
return}z=this.cx
if(z==null){z=P.br(null,null)
this.cx=z}z.U(new H.j9(a,c))},
f3:function(a,b){var z
if(!this.r.t(0,a))return
z=J.l(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){this.ao()
return}z=this.cx
if(z==null){z=P.br(null,null)
this.cx=z}z.U(this.gfi())},
f5:function(a,b){var z,y
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.Y(a)
if(b!=null)P.Y(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.Z(a)
y[1]=b==null?null:J.Z(b)
for(z=H.b(new P.aU(z,z.r,null,null),[null]),z.c=z.a.e;z.p();)J.aI(z.d,y)},
aC:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.C(u)
w=t
v=H.P(u)
this.f5(w,v)
if(this.db===!0){this.ao()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfh()
if(this.cx!=null)for(;t=this.cx,!t.gY(t);)this.cx.cW().$0()}return y},
bH:function(a){return this.b.h(0,a)},
c5:function(a,b){var z=this.b
if(z.cD(a))throw H.c(P.a7("Registry: ports must be registered only once."))
z.u(0,a,b)},
by:function(){var z=this.b
if(z.gi(z)-this.c.a>0||this.y||!this.x)init.globalState.z.u(0,this.a,this)
else this.ao()},
ao:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.an(0)
for(z=this.b,y=z.gd5(z),y=y.gD(y);y.p();)y.gv().e0()
z.an(0)
this.c.an(0)
init.globalState.z.Z(0,this.a)
this.dx.an(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
J.aI(w,z[v])}this.ch=null}},"$0","gfi",0,0,2]},
j9:{"^":"f:2;a,b",
$0:function(){J.aI(this.a,this.b)}},
iS:{"^":"a;a,b",
eQ:function(){var z=this.a
if(z.b===z.c)return
return z.cW()},
d_:function(){var z,y,x
z=this.eQ()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.cD(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gY(y)}else y=!1
else y=!1
else y=!1
if(y)H.w(P.a7("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gY(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.at(["command","close"])
x=new H.ax(!0,H.b(new P.ed(0,null,null,null,null,null,0),[null,P.r])).P(x)
y.toString
self.postMessage(x)}return!1}z.fA()
return!0},
co:function(){if(self.window!=null)new H.iT(this).$0()
else for(;this.d_(););},
aL:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.co()
else try{this.co()}catch(x){w=H.C(x)
z=w
y=H.P(x)
w=init.globalState.Q
v=P.at(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.ax(!0,P.aV(null,P.r)).P(v)
w.toString
self.postMessage(v)}}},
iT:{"^":"f:2;a",
$0:function(){if(!this.a.d_())return
P.ip(C.j,this)}},
bb:{"^":"a;a,b,c",
fA:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aC(this.b)}},
je:{"^":"a;"},
hq:{"^":"f:0;a,b,c,d,e,f",
$0:function(){H.hr(this.a,this.b,this.c,this.d,this.e,this.f)}},
hs:{"^":"f:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.be()
w=H.aB(x,[x,x]).a5(y)
if(w)y.$2(this.b,this.c)
else{x=H.aB(x,[x]).a5(y)
if(x)y.$1(this.b)
else y.$0()}}z.by()}},
e3:{"^":"a;"},
bE:{"^":"e3;b,a",
aQ:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gce())return
x=H.jJ(b)
if(z.geJ()===y){y=J.M(x)
switch(y.h(x,0)){case"pause":z.cu(y.h(x,1),y.h(x,2))
break
case"resume":z.fD(y.h(x,1))
break
case"add-ondone":z.eu(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fC(y.h(x,1))
break
case"set-errors-fatal":z.dt(y.h(x,1),y.h(x,2))
break
case"ping":z.f4(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.f3(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.A(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.Z(0,y)
break}return}y=init.globalState.f
w="receive "+H.d(b)
y.a.U(new H.bb(z,new H.ji(this,x),w))},
t:function(a,b){if(b==null)return!1
return b instanceof H.bE&&J.N(this.b,b.b)},
gC:function(a){return this.b.gbq()}},
ji:{"^":"f:0;a,b",
$0:function(){var z=this.a.b
if(!z.gce())z.dV(this.b)}},
cq:{"^":"e3;b,c,a",
aQ:function(a,b){var z,y,x
z=P.at(["command","message","port",this,"msg",b])
y=new H.ax(!0,P.aV(null,P.r)).P(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
t:function(a,b){if(b==null)return!1
return b instanceof H.cq&&J.N(this.b,b.b)&&J.N(this.a,b.a)&&J.N(this.c,b.c)},
gC:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.bb()
y=this.a
if(typeof y!=="number")return y.bb()
x=this.c
if(typeof x!=="number")return H.k(x)
return(z<<16^y<<8^x)>>>0}},
by:{"^":"a;bq:a<,b,ce:c<",
e0:function(){this.c=!0
this.b=null},
dV:function(a){if(this.c)return
this.ec(a)},
ec:function(a){return this.b.$1(a)},
$ishY:1},
ik:{"^":"a;a,b,c",
dQ:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.U(new H.bb(y,new H.im(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ab(new H.io(this,b),0),a)}else throw H.c(new P.H("Timer greater than 0."))},
q:{
il:function(a,b){var z=new H.ik(!0,!1,null)
z.dQ(a,b)
return z}}},
im:{"^":"f:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
io:{"^":"f:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aq:{"^":"a;bq:a<",
gC:function(a){var z=this.a
if(typeof z!=="number")return z.fX()
z=C.d.bx(z,0)^C.d.az(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aq){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ax:{"^":"a;a,b",
P:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.u(0,a,z.gi(z))
z=J.l(a)
if(!!z.$isc9)return["buffer",a]
if(!!z.$isbt)return["typed",a]
if(!!z.$isT)return this.dn(a)
if(!!z.$ishn){x=this.gdk()
w=a.gab()
w=H.b7(w,x,H.x(w,"K",0),null)
w=P.b6(w,!0,H.x(w,"K",0))
z=z.gd5(a)
z=H.b7(z,x,H.x(z,"K",0),null)
return["map",w,P.b6(z,!0,H.x(z,"K",0))]}if(!!z.$ishz)return this.dq(a)
if(!!z.$isi)this.d1(a)
if(!!z.$ishY)this.aP(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbE)return this.dr(a)
if(!!z.$iscq)return this.ds(a)
if(!!z.$isf){v=a.$static_name
if(v==null)this.aP(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaq)return["capability",a.a]
if(!(a instanceof P.a))this.d1(a)
return["dart",init.classIdExtractor(a),this.dm(init.classFieldsExtractor(a))]},"$1","gdk",2,0,1],
aP:function(a,b){throw H.c(new P.H(H.d(b==null?"Can't transmit:":b)+" "+H.d(a)))},
d1:function(a){return this.aP(a,null)},
dn:function(a){var z=this.dl(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aP(a,"Can't serialize indexable: ")},
dl:function(a){var z,y,x
z=[]
C.b.si(z,a.length)
for(y=0;y<a.length;++y){x=this.P(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
dm:function(a){var z
for(z=0;z<a.length;++z)C.b.u(a,z,this.P(a[z]))
return a},
dq:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aP(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.si(y,z.length)
for(x=0;x<z.length;++x){w=this.P(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
ds:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dr:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbq()]
return["raw sendport",a]}},
bC:{"^":"a;a,b",
a8:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.b0("Bad serialized message: "+H.d(a)))
switch(C.b.gaZ(a)){case"ref":if(1>=a.length)return H.e(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.e(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.b(this.aB(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.b(this.aB(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.aB(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.b(this.aB(x),[null])
y.fixed$length=Array
return y
case"map":return this.eT(a)
case"sendport":return this.eU(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.eS(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.aq(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aB(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.d(a))}},"$1","geR",2,0,1],
aB:function(a){var z,y,x
z=J.M(a)
y=0
while(!0){x=z.gi(a)
if(typeof x!=="number")return H.k(x)
if(!(y<x))break
z.u(a,y,this.a8(z.h(a,y)));++y}return a},
eT:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.c8()
this.b.push(w)
y=J.fm(y,this.geR()).aM(0)
for(z=J.M(y),v=J.M(x),u=0;u<z.gi(y);++u){if(u>=y.length)return H.e(y,u)
w.u(0,y[u],this.a8(v.h(x,u)))}return w},
eU:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.N(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bH(w)
if(u==null)return
t=new H.bE(u,x)}else t=new H.cq(y,w,x)
this.b.push(t)
return t},
eS:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.M(y)
v=J.M(x)
u=0
while(!0){t=z.gi(y)
if(typeof t!=="number")return H.k(t)
if(!(u<t))break
w[z.h(y,u)]=this.a8(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
fI:function(){throw H.c(new P.H("Cannot modify unmodifiable Map"))},
eB:function(a){return init.getTypeFromName(a)},
k4:function(a){return init.types[a]},
ez:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isa0},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.Z(a)
if(typeof z!=="string")throw H.c(H.L(a))
return z},
al:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cf:function(a){var z,y,x,w,v,u,t,s
z=J.l(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.E||!!J.l(a).$isba){v=C.q(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.f.aA(w,0)===36)w=C.f.dB(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.eA(H.cC(a),0,null),init.mangledGlobalNames)},
bv:function(a){return"Instance of '"+H.cf(a)+"'"},
lP:[function(){return Date.now()},"$0","jL",0,0,26],
hW:function(){var z,y
if($.bw!=null)return
$.bw=1000
$.b8=H.jL()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.bw=1e6
$.b8=new H.hX(y)},
au:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
ce:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.L(a))
return a[b]},
dB:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.L(a))
a[b]=c},
k:function(a){throw H.c(H.L(a))},
e:function(a,b){if(a==null)J.aG(a)
throw H.c(H.B(a,b))},
B:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a6(!0,b,"index",null)
z=J.aG(a)
if(!(b<0)){if(typeof z!=="number")return H.k(z)
y=b>=z}else y=!0
if(y)return P.as(b,a,"index",null,z)
return P.bx(b,"index",null)},
L:function(a){return new P.a6(!0,a,null,null)},
es:function(a){if(typeof a!=="number")throw H.c(H.L(a))
return a},
jV:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.L(a))
return a},
et:function(a){return a},
c:function(a){var z
if(a==null)a=new P.cd()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eL})
z.name=""}else z.toString=H.eL
return z},
eL:function(){return J.Z(this.dartException)},
w:function(a){throw H.c(a)},
aE:function(a){throw H.c(new P.E(a))},
C:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.kH(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.bx(x,16)&8191)===10)switch(w){case 438:return z.$1(H.c7(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.dy(v,null))}}if(a instanceof TypeError){u=$.$get$dP()
t=$.$get$dQ()
s=$.$get$dR()
r=$.$get$dS()
q=$.$get$dW()
p=$.$get$dX()
o=$.$get$dU()
$.$get$dT()
n=$.$get$dZ()
m=$.$get$dY()
l=u.S(y)
if(l!=null)return z.$1(H.c7(y,l))
else{l=t.S(y)
if(l!=null){l.method="call"
return z.$1(H.c7(y,l))}else{l=s.S(y)
if(l==null){l=r.S(y)
if(l==null){l=q.S(y)
if(l==null){l=p.S(y)
if(l==null){l=o.S(y)
if(l==null){l=r.S(y)
if(l==null){l=n.S(y)
if(l==null){l=m.S(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dy(y,l==null?null:l.method))}}return z.$1(new H.it(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dH()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a6(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dH()
return a},
P:function(a){var z
if(a==null)return new H.ee(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ee(a,null)},
kA:function(a){if(a==null||typeof a!='object')return J.S(a)
else return H.al(a)},
ev:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.u(0,a[y],a[x])}return b},
kj:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bc(b,new H.kk(a))
case 1:return H.bc(b,new H.kl(a,d))
case 2:return H.bc(b,new H.km(a,d,e))
case 3:return H.bc(b,new H.kn(a,d,e,f))
case 4:return H.bc(b,new H.ko(a,d,e,f,g))}throw H.c(P.a7("Unsupported number of arguments for wrapped closure"))},
ab:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.kj)
a.$identity=z
return z},
fG:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.i_(z).r}else x=c
w=d?Object.create(new H.i7().constructor.prototype):Object.create(new H.bY(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a_
$.a_=J.q(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.d5(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.k4,x)
else if(u&&typeof x=="function"){q=t?H.d4:H.bZ
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.d5(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
fD:function(a,b,c,d){var z=H.bZ
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
d5:function(a,b,c){var z,y,x,w,v,u
if(c)return H.fF(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fD(y,!w,z,b)
if(y===0){w=$.aJ
if(w==null){w=H.bn("self")
$.aJ=w}w="return function(){return this."+H.d(w)+"."+H.d(z)+"();"
v=$.a_
$.a_=J.q(v,1)
return new Function(w+H.d(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aJ
if(v==null){v=H.bn("self")
$.aJ=v}v=w+H.d(v)+"."+H.d(z)+"("+u+");"
w=$.a_
$.a_=J.q(w,1)
return new Function(v+H.d(w)+"}")()},
fE:function(a,b,c,d){var z,y
z=H.bZ
y=H.d4
switch(b?-1:a){case 0:throw H.c(new H.i1("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fF:function(a,b){var z,y,x,w,v,u,t,s
z=H.fA()
y=$.d3
if(y==null){y=H.bn("receiver")
$.d3=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fE(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.a_
$.a_=J.q(u,1)
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.a_
$.a_=J.q(u,1)
return new Function(y+H.d(u)+"}")()},
cx:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.fG(a,b,z,!!d,e,f)},
kB:function(a,b){var z=J.M(b)
throw H.c(H.fC(H.cf(a),z.bc(b,3,z.gi(b))))},
ki:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.l(a)[b]
else z=!0
if(z)return a
H.kB(a,b)},
kG:function(a){throw H.c(new P.fO("Cyclic initialization for static "+H.d(a)))},
aB:function(a,b,c){return new H.i2(a,b,c,null)},
er:function(a,b){var z=a.builtin$cls
if(b==null||b.length===0)return new H.i4(z)
return new H.i3(z,b,null)},
be:function(){return C.v},
bL:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b:function(a,b){a.$builtinTypeInfo=b
return a},
cC:function(a){if(a==null)return
return a.$builtinTypeInfo},
ex:function(a,b){return H.eK(a["$as"+H.d(b)],H.cC(a))},
x:function(a,b,c){var z=H.ex(a,b)
return z==null?null:z[c]},
v:function(a,b){var z=H.cC(a)
return z==null?null:z[b]},
cG:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.eA(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.a.j(a)
else return},
eA:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bA("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.d(H.cG(u,c))}return w?"":"<"+H.d(z)+">"},
eK:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
jR:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.Q(a[y],b[y]))return!1
return!0},
cy:function(a,b,c){return a.apply(b,H.ex(b,c))},
Q:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.ey(a,b)
if('func' in a)return b.builtin$cls==="h5"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.cG(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.d(H.cG(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.jR(H.eK(v,z),x)},
ep:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.Q(z,v)||H.Q(v,z)))return!1}return!0},
jQ:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.Q(v,u)||H.Q(u,v)))return!1}return!0},
ey:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.Q(z,y)||H.Q(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.ep(x,w,!1))return!1
if(!H.ep(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}}return H.jQ(a.named,b.named)},
mr:function(a){var z=$.cD
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
mp:function(a){return H.al(a)},
mo:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
ks:function(a){var z,y,x,w,v,u
z=$.cD.$1(a)
y=$.bG[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bI[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eo.$2(a,z)
if(z!=null){y=$.bG[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bI[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cF(x)
$.bG[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bI[z]=x
return x}if(v==="-"){u=H.cF(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eF(a,x)
if(v==="*")throw H.c(new P.aR(z))
if(init.leafTags[z]===true){u=H.cF(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eF(a,x)},
eF:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bJ(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cF:function(a){return J.bJ(a,!1,null,!!a.$isa0)},
ky:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bJ(z,!1,null,!!z.$isa0)
else return J.bJ(z,c,null,null)},
kc:function(){if(!0===$.cE)return
$.cE=!0
H.kd()},
kd:function(){var z,y,x,w,v,u,t,s
$.bG=Object.create(null)
$.bI=Object.create(null)
H.k8()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eH.$1(v)
if(u!=null){t=H.ky(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
k8:function(){var z,y,x,w,v,u,t
z=C.K()
z=H.aA(C.H,H.aA(C.M,H.aA(C.r,H.aA(C.r,H.aA(C.L,H.aA(C.I,H.aA(C.J(C.q),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cD=new H.k9(v)
$.eo=new H.ka(u)
$.eH=new H.kb(t)},
aA:function(a,b){return a(b)||b},
fH:{"^":"a;",
j:function(a){return P.ds(this)},
u:function(a,b,c){return H.fI()},
$isaQ:1},
h6:{"^":"fH;a",
bo:function(){var z=this.$map
if(z==null){z=new H.aj(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.ev(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.bo().h(0,b)},
G:function(a,b){this.bo().G(0,b)},
gi:function(a){var z=this.bo()
return z.gi(z)}},
hZ:{"^":"a;a,b,c,d,e,f,r,x",q:{
i_:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.hZ(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hX:{"^":"f:0;a",
$0:function(){return C.d.ar(Math.floor(1000*this.a.now()))}},
is:{"^":"a;a,b,c,d,e,f",
S:function(a){var z,y,x
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
a3:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.is(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bB:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
dV:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dy:{"^":"G;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+H.d(z)+"' on null"}},
hF:{"^":"G;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.d(z)+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.d(z)+"' on '"+H.d(y)+"' ("+H.d(this.a)+")"},
q:{
c7:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hF(a,y,z?null:b.receiver)}}},
it:{"^":"G;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
kH:{"^":"f:1;a",
$1:function(a){if(!!J.l(a).$isG)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ee:{"^":"a;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
kk:{"^":"f:0;a",
$0:function(){return this.a.$0()}},
kl:{"^":"f:0;a,b",
$0:function(){return this.a.$1(this.b)}},
km:{"^":"f:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
kn:{"^":"f:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ko:{"^":"f:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
f:{"^":"a;",
j:function(a){return"Closure '"+H.cf(this)+"'"},
gd6:function(){return this},
gd6:function(){return this}},
dJ:{"^":"f;"},
i7:{"^":"dJ;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bY:{"^":"dJ;a,b,c,d",
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bY))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gC:function(a){var z,y
z=this.c
if(z==null)y=H.al(this.a)
else y=typeof z!=="object"?J.S(z):H.al(z)
z=H.al(this.b)
if(typeof y!=="number")return y.fY()
return(y^z)>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.bv(z)},
q:{
bZ:function(a){return a.a},
d4:function(a){return a.c},
fA:function(){var z=$.aJ
if(z==null){z=H.bn("self")
$.aJ=z}return z},
bn:function(a){var z,y,x,w,v
z=new H.bY("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fB:{"^":"G;a",
j:function(a){return this.a},
q:{
fC:function(a,b){return new H.fB("CastError: Casting value of type "+H.d(a)+" to incompatible type "+H.d(b))}}},
i1:{"^":"G;a",
j:function(a){return"RuntimeError: "+H.d(this.a)}},
bz:{"^":"a;"},
i2:{"^":"bz;a,b,c,d",
a5:function(a){var z=this.e6(a)
return z==null?!1:H.ey(z,this.a_())},
e6:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
a_:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$ism6)z.v=true
else if(!x.$isda)z.ret=y.a_()
y=this.b
if(y!=null&&y.length!==0)z.args=H.dF(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.dF(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.eu(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].a_()}z.named=w}return z},
j:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.d(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.d(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.eu(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.d(z[s].a_())+" "+s}x+="}"}}return x+(") -> "+H.d(this.a))},
q:{
dF:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].a_())
return z}}},
da:{"^":"bz;",
j:function(a){return"dynamic"},
a_:function(){return}},
i4:{"^":"bz;a",
a_:function(){var z,y
z=this.a
y=H.eB(z)
if(y==null)throw H.c("no type for '"+z+"'")
return y},
j:function(a){return this.a}},
i3:{"^":"bz;a,b,c",
a_:function(){var z,y,x,w
z=this.c
if(z!=null)return z
z=this.a
y=[H.eB(z)]
if(0>=y.length)return H.e(y,0)
if(y[0]==null)throw H.c("no type for '"+z+"<...>'")
for(z=this.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.aE)(z),++w)y.push(z[w].a_())
this.c=y
return y},
j:function(a){var z=this.b
return this.a+"<"+(z&&C.b).aH(z,", ")+">"}},
aj:{"^":"a;a,b,c,d,e,f,r",
gi:function(a){return this.a},
gY:function(a){return this.a===0},
gab:function(){return H.b(new H.hH(this),[H.v(this,0)])},
gd5:function(a){return H.b7(this.gab(),new H.hE(this),H.v(this,0),H.v(this,1))},
cD:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.c6(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.c6(y,a)}else return this.fd(a)},
fd:function(a){var z=this.d
if(z==null)return!1
return this.aG(this.aV(z,this.aF(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.av(z,b)
return y==null?null:y.gaa()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.av(x,b)
return y==null?null:y.gaa()}else return this.fe(b)},
fe:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.aV(z,this.aF(a))
x=this.aG(y,a)
if(x<0)return
return y[x].gaa()},
u:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bt()
this.b=z}this.c1(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bt()
this.c=y}this.c1(y,b,c)}else{x=this.d
if(x==null){x=this.bt()
this.d=x}w=this.aF(b)
v=this.aV(x,w)
if(v==null)this.bw(x,w,[this.be(b,c)])
else{u=this.aG(v,b)
if(u>=0)v[u].saa(c)
else v.push(this.be(b,c))}}},
Z:function(a,b){if(typeof b==="string")return this.c2(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.c2(this.c,b)
else return this.ff(b)},
ff:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.aV(z,this.aF(a))
x=this.aG(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.c3(w)
return w.gaa()},
an:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.E(this))
z=z.c}},
c1:function(a,b,c){var z=this.av(a,b)
if(z==null)this.bw(a,b,this.be(b,c))
else z.saa(c)},
c2:function(a,b){var z
if(a==null)return
z=this.av(a,b)
if(z==null)return
this.c3(z)
this.c7(a,b)
return z.gaa()},
be:function(a,b){var z,y
z=H.b(new H.hG(a,b,null,null),[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c3:function(a){var z,y
z=a.gdW()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aF:function(a){return J.S(a)&0x3ffffff},
aG:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.N(a[y].gcM(),b))return y
return-1},
j:function(a){return P.ds(this)},
av:function(a,b){return a[b]},
aV:function(a,b){return a[b]},
bw:function(a,b,c){a[b]=c},
c7:function(a,b){delete a[b]},
c6:function(a,b){return this.av(a,b)!=null},
bt:function(){var z=Object.create(null)
this.bw(z,"<non-identifier-key>",z)
this.c7(z,"<non-identifier-key>")
return z},
$ishn:1,
$isaQ:1},
hE:{"^":"f:1;a",
$1:function(a){return this.a.h(0,a)}},
hG:{"^":"a;cM:a<,aa:b@,c,dW:d<"},
hH:{"^":"K;a",
gi:function(a){return this.a.a},
gD:function(a){var z,y
z=this.a
y=new H.hI(z,z.r,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.c=z.e
return y},
G:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.E(z))
y=y.c}},
$ism:1},
hI:{"^":"a;a,b,c,d",
gv:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.E(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
k9:{"^":"f:1;a",
$1:function(a){return this.a(a)}},
ka:{"^":"f:11;a",
$2:function(a,b){return this.a(a,b)}},
kb:{"^":"f:3;a",
$1:function(a){return this.a(a)}},
hC:{"^":"a;a,b,c,d",
j:function(a){return"RegExp/"+this.a+"/"},
$isi0:1,
q:{
hD:function(a,b,c,d){var z,y,x,w
H.et(a)
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.h4("Illegal RegExp pattern ("+String(w)+")",a,null))}}}}],["","",,H,{"^":"",
aN:function(){return new P.a2("No element")},
hx:function(){return new P.a2("Too many elements")},
hw:function(){return new P.a2("Too few elements")},
aP:{"^":"K;",
gD:function(a){return H.b(new H.dq(this,this.gi(this),0,null),[H.x(this,"aP",0)])},
G:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){b.$1(this.H(0,y))
if(z!==this.gi(this))throw H.c(new P.E(this))}},
B:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){if(J.N(this.H(0,y),b))return!0
if(z!==this.gi(this))throw H.c(new P.E(this))}return!1},
as:function(a,b){return this.dE(this,b)},
ac:function(a,b){return H.b(new H.bs(this,b),[H.x(this,"aP",0),null])},
aN:function(a,b){var z,y,x
z=H.b([],[H.x(this,"aP",0)])
C.b.si(z,this.gi(this))
for(y=0;y<this.gi(this);++y){x=this.H(0,y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
aM:function(a){return this.aN(a,!0)},
$ism:1},
dq:{"^":"a;a,b,c,d",
gv:function(){return this.d},
p:function(){var z,y,x,w
z=this.a
y=J.M(z)
x=y.gi(z)
if(this.b!==x)throw H.c(new P.E(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.H(z,w);++this.c
return!0}},
dr:{"^":"K;a,b",
gD:function(a){var z=new H.hK(null,J.b_(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gi:function(a){return J.aG(this.a)},
H:function(a,b){return this.V(J.bi(this.a,b))},
V:function(a){return this.b.$1(a)},
$asK:function(a,b){return[b]},
q:{
b7:function(a,b,c,d){if(!!J.l(a).$ism)return H.b(new H.c1(a,b),[c,d])
return H.b(new H.dr(a,b),[c,d])}}},
c1:{"^":"dr;a,b",$ism:1},
hK:{"^":"c5;a,b,c",
p:function(){var z=this.b
if(z.p()){this.a=this.V(z.gv())
return!0}this.a=null
return!1},
gv:function(){return this.a},
V:function(a){return this.c.$1(a)},
$asc5:function(a,b){return[b]}},
bs:{"^":"aP;a,b",
gi:function(a){return J.aG(this.a)},
H:function(a,b){return this.V(J.bi(this.a,b))},
V:function(a){return this.b.$1(a)},
$asaP:function(a,b){return[b]},
$asK:function(a,b){return[b]},
$ism:1},
e0:{"^":"K;a,b",
gD:function(a){var z=new H.iu(J.b_(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
iu:{"^":"c5;a,b",
p:function(){for(var z=this.a;z.p();)if(this.V(z.gv())===!0)return!0
return!1},
gv:function(){return this.a.gv()},
V:function(a){return this.b.$1(a)}},
dg:{"^":"a;"}}],["","",,H,{"^":"",
eu:function(a){var z=H.b(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{"^":"",
iA:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.jS()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ab(new P.iC(z),1)).observe(y,{childList:true})
return new P.iB(z,y,x)}else if(self.setImmediate!=null)return P.jT()
return P.jU()},
m7:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ab(new P.iD(a),0))},"$1","jS",2,0,7],
m8:[function(a){++init.globalState.f.b
self.setImmediate(H.ab(new P.iE(a),0))},"$1","jT",2,0,7],
m9:[function(a){P.ch(C.j,a)},"$1","jU",2,0,7],
ej:function(a,b){var z=H.be()
z=H.aB(z,[z,z]).a5(a)
if(z){b.toString
return a}else{b.toString
return a}},
jM:function(){var z,y
for(;z=$.ay,z!=null;){$.aX=null
y=z.b
$.ay=y
if(y==null)$.aW=null
z.a.$0()}},
mn:[function(){$.ct=!0
try{P.jM()}finally{$.aX=null
$.ct=!1
if($.ay!=null)$.$get$cj().$1(P.eq())}},"$0","eq",0,0,2],
en:function(a){var z=new P.e1(a,null)
if($.ay==null){$.aW=z
$.ay=z
if(!$.ct)$.$get$cj().$1(P.eq())}else{$.aW.b=z
$.aW=z}},
jP:function(a){var z,y,x
z=$.ay
if(z==null){P.en(a)
$.aX=$.aW
return}y=new P.e1(a,null)
x=$.aX
if(x==null){y.b=z
$.aX=y
$.ay=y}else{y.b=x.b
x.b=y
$.aX=y
if(y.b==null)$.aW=y}},
eI:function(a){var z=$.o
if(C.c===z){P.az(null,null,C.c,a)
return}z.toString
P.az(null,null,z,z.bA(a,!0))},
jO:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.C(u)
z=t
y=H.P(u)
$.o.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.aF(x)
w=t
v=x.ga1()
c.$2(w,v)}}},
jF:function(a,b,c,d){var z=a.bC(0)
if(!!J.l(z).$isai)z.bS(new P.jI(b,c,d))
else b.R(c,d)},
jG:function(a,b){return new P.jH(a,b)},
jE:function(a,b,c){$.o.toString
a.bf(b,c)},
ip:function(a,b){var z=$.o
if(z===C.c){z.toString
return P.ch(a,b)}return P.ch(a,z.bA(b,!0))},
ch:function(a,b){var z=C.a.az(a.a,1000)
return H.il(z<0?0:z,b)},
bd:function(a,b,c,d,e){var z={}
z.a=d
P.jP(new P.jN(z,e))},
ek:function(a,b,c,d){var z,y
y=$.o
if(y===c)return d.$0()
$.o=c
z=y
try{y=d.$0()
return y}finally{$.o=z}},
em:function(a,b,c,d,e){var z,y
y=$.o
if(y===c)return d.$1(e)
$.o=c
z=y
try{y=d.$1(e)
return y}finally{$.o=z}},
el:function(a,b,c,d,e,f){var z,y
y=$.o
if(y===c)return d.$2(e,f)
$.o=c
z=y
try{y=d.$2(e,f)
return y}finally{$.o=z}},
az:function(a,b,c,d){var z=C.c!==c
if(z)d=c.bA(d,!(!z||!1))
P.en(d)},
iC:{"^":"f:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
iB:{"^":"f:12;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
iD:{"^":"f:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
iE:{"^":"f:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
ai:{"^":"a;"},
e5:{"^":"a;",
eI:[function(a,b){a=a!=null?a:new P.cd()
if(this.a.a!==0)throw H.c(new P.a2("Future already completed"))
$.o.toString
this.R(a,b)},function(a){return this.eI(a,null)},"cC","$2","$1","geH",2,2,13,0]},
e2:{"^":"e5;a",
cB:function(a,b){var z=this.a
if(z.a!==0)throw H.c(new P.a2("Future already completed"))
z.dZ(b)},
R:function(a,b){this.a.e_(a,b)}},
jz:{"^":"e5;a",
R:function(a,b){this.a.R(a,b)}},
e8:{"^":"a;bv:a<,b,c,d,e",
ges:function(){return this.b.b},
gcL:function(){return(this.c&1)!==0},
gf8:function(){return(this.c&2)!==0},
gcK:function(){return this.c===8},
f6:function(a){return this.b.b.bO(this.d,a)},
fl:function(a){if(this.c!==6)return!0
return this.b.b.bO(this.d,J.aF(a))},
f2:function(a){var z,y,x,w
z=this.e
y=H.be()
y=H.aB(y,[y,y]).a5(z)
x=J.h(a)
w=this.b
if(y)return w.b.fG(z,x.ga9(a),a.ga1())
else return w.b.bO(z,x.ga9(a))},
f7:function(){return this.b.b.cY(this.d)}},
a4:{"^":"a;ay:a@,b,eo:c<",
gef:function(){return this.a===2},
gbs:function(){return this.a>=4},
d0:function(a,b){var z,y
z=$.o
if(z!==C.c){z.toString
if(b!=null)b=P.ej(b,z)}y=H.b(new P.a4(0,z,null),[null])
this.bg(H.b(new P.e8(null,y,b==null?1:3,a,b),[null,null]))
return y},
I:function(a){return this.d0(a,null)},
bS:function(a){var z,y
z=$.o
y=new P.a4(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.bg(H.b(new P.e8(null,y,8,a,null),[null,null]))
return y},
bg:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gbs()){y.bg(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.az(null,null,z,new P.iW(this,a))}},
cl:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gbv()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gbs()){v.cl(a)
return}this.a=v.a
this.c=v.c}z.a=this.aX(a)
y=this.b
y.toString
P.az(null,null,y,new P.j3(z,this))}},
aW:function(){var z=this.c
this.c=null
return this.aX(z)},
aX:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gbv()
z.a=y}return y},
au:function(a){var z
if(!!J.l(a).$isai)P.bD(a,this)
else{z=this.aW()
this.a=4
this.c=a
P.aw(this,z)}},
R:[function(a,b){var z=this.aW()
this.a=8
this.c=new P.bl(a,b)
P.aw(this,z)},function(a){return this.R(a,null)},"fZ","$2","$1","gbl",2,2,14,0],
dZ:function(a){var z
if(!!J.l(a).$isai){if(a.a===8){this.a=1
z=this.b
z.toString
P.az(null,null,z,new P.iY(this,a))}else P.bD(a,this)
return}this.a=1
z=this.b
z.toString
P.az(null,null,z,new P.iZ(this,a))},
e_:function(a,b){var z
this.a=1
z=this.b
z.toString
P.az(null,null,z,new P.iX(this,a,b))},
$isai:1,
q:{
j_:function(a,b){var z,y,x,w
b.say(1)
try{a.d0(new P.j0(b),new P.j1(b))}catch(x){w=H.C(x)
z=w
y=H.P(x)
P.eI(new P.j2(b,z,y))}},
bD:function(a,b){var z,y,x
for(;a.gef();)a=a.c
z=a.gbs()
y=b.c
if(z){b.c=null
x=b.aX(y)
b.a=a.a
b.c=a.c
P.aw(b,x)}else{b.a=2
b.c=a
a.cl(y)}},
aw:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.aF(v)
x=v.ga1()
z.toString
P.bd(null,null,z,y,x)}return}for(;b.gbv()!=null;b=u){u=b.a
b.a=null
P.aw(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gcL()||b.gcK()){s=b.ges()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.aF(v)
r=v.ga1()
y.toString
P.bd(null,null,y,x,r)
return}q=$.o
if(q==null?s!=null:q!==s)$.o=s
else q=null
if(b.gcK())new P.j6(z,x,w,b).$0()
else if(y){if(b.gcL())new P.j5(x,b,t).$0()}else if(b.gf8())new P.j4(z,x,b).$0()
if(q!=null)$.o=q
y=x.b
r=J.l(y)
if(!!r.$isai){p=b.b
if(!!r.$isa4)if(y.a>=4){o=p.c
p.c=null
b=p.aX(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.bD(y,p)
else P.j_(y,p)
return}}p=b.b
b=p.aW()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
iW:{"^":"f:0;a,b",
$0:function(){P.aw(this.a,this.b)}},
j3:{"^":"f:0;a,b",
$0:function(){P.aw(this.b,this.a.a)}},
j0:{"^":"f:1;a",
$1:function(a){var z=this.a
z.a=0
z.au(a)}},
j1:{"^":"f:15;a",
$2:function(a,b){this.a.R(a,b)},
$1:function(a){return this.$2(a,null)}},
j2:{"^":"f:0;a,b,c",
$0:function(){this.a.R(this.b,this.c)}},
iY:{"^":"f:0;a,b",
$0:function(){P.bD(this.b,this.a)}},
iZ:{"^":"f:0;a,b",
$0:function(){var z,y
z=this.a
y=z.aW()
z.a=4
z.c=this.b
P.aw(z,y)}},
iX:{"^":"f:0;a,b,c",
$0:function(){this.a.R(this.b,this.c)}},
j6:{"^":"f:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.f7()}catch(w){v=H.C(w)
y=v
x=H.P(w)
if(this.c){v=J.aF(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.bl(y,x)
u.a=!0
return}if(!!J.l(z).$isai){if(z instanceof P.a4&&z.gay()>=4){if(z.gay()===8){v=this.b
v.b=z.geo()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.I(new P.j7(t))
v.a=!1}}},
j7:{"^":"f:1;a",
$1:function(a){return this.a}},
j5:{"^":"f:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.f6(this.c)}catch(x){w=H.C(x)
z=w
y=H.P(x)
w=this.a
w.b=new P.bl(z,y)
w.a=!0}}},
j4:{"^":"f:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.fl(z)===!0&&w.e!=null){v=this.b
v.b=w.f2(z)
v.a=!1}}catch(u){w=H.C(u)
y=w
x=H.P(u)
w=this.a
v=J.aF(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.bl(y,x)
s.a=!0}}},
e1:{"^":"a;a,b"},
am:{"^":"a;",
ac:function(a,b){return H.b(new P.jh(b,this),[H.x(this,"am",0),null])},
G:function(a,b){var z,y
z={}
y=H.b(new P.a4(0,$.o,null),[null])
z.a=null
z.a=this.ap(new P.id(z,this,b,y),!0,new P.ie(y),y.gbl())
return y},
gi:function(a){var z,y
z={}
y=H.b(new P.a4(0,$.o,null),[P.r])
z.a=0
this.ap(new P.ig(z),!0,new P.ih(z,y),y.gbl())
return y},
aM:function(a){var z,y
z=H.b([],[H.x(this,"am",0)])
y=H.b(new P.a4(0,$.o,null),[[P.j,H.x(this,"am",0)]])
this.ap(new P.ii(this,z),!0,new P.ij(z,y),y.gbl())
return y}},
id:{"^":"f;a,b,c,d",
$1:function(a){P.jO(new P.ib(this.c,a),new P.ic(),P.jG(this.a.a,this.d))},
$signature:function(){return H.cy(function(a){return{func:1,args:[a]}},this.b,"am")}},
ib:{"^":"f:0;a,b",
$0:function(){return this.a.$1(this.b)}},
ic:{"^":"f:1;",
$1:function(a){}},
ie:{"^":"f:0;a",
$0:function(){this.a.au(null)}},
ig:{"^":"f:1;a",
$1:function(a){++this.a.a}},
ih:{"^":"f:0;a,b",
$0:function(){this.b.au(this.a.a)}},
ii:{"^":"f;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.cy(function(a){return{func:1,args:[a]}},this.a,"am")}},
ij:{"^":"f:0;a,b",
$0:function(){this.b.au(this.a)}},
ia:{"^":"a;"},
me:{"^":"a;"},
e4:{"^":"a;ay:e@",
bJ:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.cw()
if((z&4)===0&&(this.e&32)===0)this.cc(this.gcg())},
cU:function(a){return this.bJ(a,null)},
cX:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gY(z)}else z=!1
if(z)this.r.b8(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cc(this.gcj())}}}},
bC:function(a){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bj()
return this.f},
bj:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.cw()
if((this.e&32)===0)this.r=null
this.f=this.cf()},
bi:["dG",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cp(a)
else this.bh(H.b(new P.iN(a,null),[null]))}],
bf:["dH",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cr(a,b)
else this.bh(new P.iP(a,b,null))}],
dY:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cq()
else this.bh(C.x)},
ci:[function(){},"$0","gcg",0,0,2],
ck:[function(){},"$0","gcj",0,0,2],
cf:function(){return},
bh:function(a){var z,y
z=this.r
if(z==null){z=H.b(new P.ju(null,null,0),[null])
this.r=z}z.A(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.b8(this)}},
cp:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bP(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bk((z&4)!==0)},
cr:function(a,b){var z,y
z=this.e
y=new P.iI(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bj()
z=this.f
if(!!J.l(z).$isai)z.bS(y)
else y.$0()}else{y.$0()
this.bk((z&4)!==0)}},
cq:function(){var z,y
z=new P.iH(this)
this.bj()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isai)y.bS(z)
else z.$0()},
cc:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bk((z&4)!==0)},
bk:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gY(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gY(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.ci()
else this.ck()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.b8(this)},
dR:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ej(b,z)
this.c=c}},
iI:{"^":"f:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aB(H.be(),[H.er(P.a),H.er(P.aa)]).a5(y)
w=z.d
v=this.b
u=z.b
if(x)w.fH(u,v,this.c)
else w.bP(u,v)
z.e=(z.e&4294967263)>>>0}},
iH:{"^":"f:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cZ(z.c)
z.e=(z.e&4294967263)>>>0}},
ck:{"^":"a;b1:a@"},
iN:{"^":"ck;b,a",
bK:function(a){a.cp(this.b)}},
iP:{"^":"ck;a9:b>,a1:c<,a",
bK:function(a){a.cr(this.b,this.c)},
$asck:I.ac},
iO:{"^":"a;",
bK:function(a){a.cq()},
gb1:function(){return},
sb1:function(a){throw H.c(new P.a2("No events after a done."))}},
jj:{"^":"a;ay:a@",
b8:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.eI(new P.jk(this,a))
this.a=1},
cw:function(){if(this.a===1)this.a=3}},
jk:{"^":"f:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gb1()
z.b=w
if(w==null)z.c=null
x.bK(this.b)}},
ju:{"^":"jj;b,c,a",
gY:function(a){return this.c==null},
A:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sb1(b)
this.c=b}}},
jI:{"^":"f:0;a,b,c",
$0:function(){return this.a.R(this.b,this.c)}},
jH:{"^":"f:16;a,b",
$2:function(a,b){P.jF(this.a,this.b,a,b)}},
cm:{"^":"am;",
ap:function(a,b,c,d){return this.e2(a,d,c,!0===b)},
cP:function(a,b,c){return this.ap(a,null,b,c)},
e2:function(a,b,c,d){return P.iV(this,a,b,c,d,H.x(this,"cm",0),H.x(this,"cm",1))},
cd:function(a,b){b.bi(a)},
eb:function(a,b,c){c.bf(a,b)},
$asam:function(a,b){return[b]}},
e7:{"^":"e4;x,y,a,b,c,d,e,f,r",
bi:function(a){if((this.e&2)!==0)return
this.dG(a)},
bf:function(a,b){if((this.e&2)!==0)return
this.dH(a,b)},
ci:[function(){var z=this.y
if(z==null)return
z.cU(0)},"$0","gcg",0,0,2],
ck:[function(){var z=this.y
if(z==null)return
z.cX()},"$0","gcj",0,0,2],
cf:function(){var z=this.y
if(z!=null){this.y=null
return z.bC(0)}return},
h_:[function(a){this.x.cd(a,this)},"$1","ge8",2,0,function(){return H.cy(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"e7")}],
h1:[function(a,b){this.x.eb(a,b,this)},"$2","gea",4,0,17],
h0:[function(){this.dY()},"$0","ge9",0,0,2],
dS:function(a,b,c,d,e,f,g){var z,y
z=this.ge8()
y=this.gea()
this.y=this.x.a.cP(z,this.ge9(),y)},
$ase4:function(a,b){return[b]},
q:{
iV:function(a,b,c,d,e,f,g){var z=$.o
z=H.b(new P.e7(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.dR(b,c,d,e,g)
z.dS(a,b,c,d,e,f,g)
return z}}},
jh:{"^":"cm;b,a",
cd:function(a,b){var z,y,x,w,v
z=null
try{z=this.er(a)}catch(w){v=H.C(w)
y=v
x=H.P(w)
P.jE(b,y,x)
return}b.bi(z)},
er:function(a){return this.b.$1(a)}},
bl:{"^":"a;a9:a>,a1:b<",
j:function(a){return H.d(this.a)},
$isG:1},
jD:{"^":"a;"},
jN:{"^":"f:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cd()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.Z(y)
throw x}},
jm:{"^":"jD;",
cZ:function(a){var z,y,x,w
try{if(C.c===$.o){x=a.$0()
return x}x=P.ek(null,null,this,a)
return x}catch(w){x=H.C(w)
z=x
y=H.P(w)
return P.bd(null,null,this,z,y)}},
bP:function(a,b){var z,y,x,w
try{if(C.c===$.o){x=a.$1(b)
return x}x=P.em(null,null,this,a,b)
return x}catch(w){x=H.C(w)
z=x
y=H.P(w)
return P.bd(null,null,this,z,y)}},
fH:function(a,b,c){var z,y,x,w
try{if(C.c===$.o){x=a.$2(b,c)
return x}x=P.el(null,null,this,a,b,c)
return x}catch(w){x=H.C(w)
z=x
y=H.P(w)
return P.bd(null,null,this,z,y)}},
bA:function(a,b){if(b)return new P.jn(this,a)
else return new P.jo(this,a)},
ez:function(a,b){return new P.jp(this,a)},
h:function(a,b){return},
cY:function(a){if($.o===C.c)return a.$0()
return P.ek(null,null,this,a)},
bO:function(a,b){if($.o===C.c)return a.$1(b)
return P.em(null,null,this,a,b)},
fG:function(a,b,c){if($.o===C.c)return a.$2(b,c)
return P.el(null,null,this,a,b,c)}},
jn:{"^":"f:0;a,b",
$0:function(){return this.a.cZ(this.b)}},
jo:{"^":"f:0;a,b",
$0:function(){return this.a.cY(this.b)}},
jp:{"^":"f:1;a,b",
$1:function(a){return this.a.bP(this.b,a)}}}],["","",,P,{"^":"",
c8:function(){return H.b(new H.aj(0,null,null,null,null,null,0),[null,null])},
at:function(a){return H.ev(a,H.b(new H.aj(0,null,null,null,null,null,0),[null,null]))},
hv:function(a,b,c){var z,y
if(P.cu(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aY()
y.push(a)
try{P.jK(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.dI(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bp:function(a,b,c){var z,y,x
if(P.cu(a))return b+"..."+c
z=new P.bA(b)
y=$.$get$aY()
y.push(a)
try{x=z
x.a=P.dI(x.gaj(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.a=y.gaj()+c
y=z.gaj()
return y.charCodeAt(0)==0?y:y},
cu:function(a){var z,y
for(z=0;y=$.$get$aY(),z<y.length;++z)if(a===y[z])return!0
return!1},
jK:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gD(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.p())return
w=H.d(z.gv())
b.push(w)
y+=w.length+2;++x}if(!z.p()){if(x<=5)return
if(0>=b.length)return H.e(b,-1)
v=b.pop()
if(0>=b.length)return H.e(b,-1)
u=b.pop()}else{t=z.gv();++x
if(!z.p()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
if(0>=b.length)return H.e(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gv();++x
for(;z.p();t=s,s=r){r=z.gv();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.e(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.e(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
U:function(a,b,c,d){return H.b(new P.ja(0,null,null,null,null,null,0),[d])},
dp:function(a,b){var z,y,x
z=P.U(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.aE)(a),++x)z.A(0,a[x])
return z},
ds:function(a){var z,y,x
z={}
if(P.cu(a))return"{...}"
y=new P.bA("")
try{$.$get$aY().push(a)
x=y
x.a=x.gaj()+"{"
z.a=!0
J.cL(a,new P.hL(z,y))
z=y
z.a=z.gaj()+"}"}finally{z=$.$get$aY()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gaj()
return z.charCodeAt(0)==0?z:z},
ed:{"^":"aj;a,b,c,d,e,f,r",
aF:function(a){return H.kA(a)&0x3ffffff},
aG:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcM()
if(x==null?b==null:x===b)return y}return-1},
q:{
aV:function(a,b){return H.b(new P.ed(0,null,null,null,null,null,0),[a,b])}}},
ja:{"^":"j8;a,b,c,d,e,f,r",
gD:function(a){var z=H.b(new P.aU(this,this.r,null,null),[null])
z.c=z.a.e
return z},
gi:function(a){return this.a},
B:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.e1(b)},
e1:function(a){var z=this.d
if(z==null)return!1
return this.aU(z[this.aS(a)],a)>=0},
bH:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.B(0,a)?a:null
else return this.eg(a)},
eg:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aS(a)]
x=this.aU(y,a)
if(x<0)return
return J.cI(y,x).gc8()},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.E(this))
z=z.b}},
A:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.c4(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.c4(x,b)}else return this.U(b)},
U:function(a){var z,y,x
z=this.d
if(z==null){z=P.jc()
this.d=z}y=this.aS(a)
x=z[y]
if(x==null)z[y]=[this.bu(a)]
else{if(this.aU(x,a)>=0)return!1
x.push(this.bu(a))}return!0},
Z:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cm(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cm(this.c,b)
else return this.ej(b)},
ej:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aS(a)]
x=this.aU(y,a)
if(x<0)return!1
this.cs(y.splice(x,1)[0])
return!0},
an:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
c4:function(a,b){if(a[b]!=null)return!1
a[b]=this.bu(b)
return!0},
cm:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cs(z)
delete a[b]
return!0},
bu:function(a){var z,y
z=new P.jb(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cs:function(a){var z,y
z=a.gei()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aS:function(a){return J.S(a)&0x3ffffff},
aU:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.N(a[y].gc8(),b))return y
return-1},
$ism:1,
q:{
jc:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
jb:{"^":"a;c8:a<,b,ei:c<"},
aU:{"^":"a;a,b,c,d",
gv:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.E(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
j8:{"^":"i5;"},
aO:{"^":"bu;"},
bu:{"^":"a+a8;",$isj:1,$asj:null,$ism:1},
a8:{"^":"a;",
gD:function(a){return H.b(new H.dq(a,this.gi(a),0,null),[H.x(a,"a8",0)])},
H:function(a,b){return this.h(a,b)},
G:function(a,b){var z,y
z=this.gi(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gi(a))throw H.c(new P.E(a))}},
gaZ:function(a){if(this.gi(a)===0)throw H.c(H.aN())
return this.h(a,0)},
bD:function(a,b,c){var z,y,x
z=this.gi(a)
for(y=0;y<z;++y){x=this.h(a,y)
if(b.$1(x)===!0)return x
if(z!==this.gi(a))throw H.c(new P.E(a))}throw H.c(H.aN())},
cH:function(a,b){return this.bD(a,b,null)},
as:function(a,b){return H.b(new H.e0(a,b),[H.x(a,"a8",0)])},
ac:function(a,b){return H.b(new H.bs(a,b),[null,null])},
aN:function(a,b){var z,y,x
z=H.b([],[H.x(a,"a8",0)])
C.b.si(z,this.gi(a))
for(y=0;y<this.gi(a);++y){x=this.h(a,y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
aM:function(a){return this.aN(a,!0)},
j:function(a){return P.bp(a,"[","]")},
$isj:1,
$asj:null,
$ism:1},
hL:{"^":"f:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.d(a)
z.a=y+": "
z.a+=H.d(b)}},
hJ:{"^":"aP;a,b,c,d",
gD:function(a){var z=new P.jd(this,this.c,this.d,this.b,null)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
G:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.w(new P.E(this))}},
gY:function(a){return this.b===this.c},
gi:function(a){return(this.c-this.b&this.a.length-1)>>>0},
H:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(typeof b!=="number")return H.k(b)
if(0>b||b>=z)H.w(P.as(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
an:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
j:function(a){return P.bp(this,"{","}")},
cW:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.aN());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
U:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.cb();++this.d},
cb:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.b(z,[H.v(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bZ(y,0,w,z,x)
C.b.bZ(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dM:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.b(z,[b])},
$ism:1,
q:{
br:function(a,b){var z=H.b(new P.hJ(null,0,0,0),[b])
z.dM(a,b)
return z}}},
jd:{"^":"a;a,b,c,d,e",
gv:function(){return this.e},
p:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.w(new P.E(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.e(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
i6:{"^":"a;",
a2:function(a,b){var z
for(z=J.b_(b);z.p();)this.A(0,z.gv())},
ac:function(a,b){return H.b(new H.c1(this,b),[H.v(this,0),null])},
j:function(a){return P.bp(this,"{","}")},
G:function(a,b){var z
for(z=H.b(new P.aU(this,this.r,null,null),[null]),z.c=z.a.e;z.p();)b.$1(z.d)},
aH:function(a,b){var z,y,x
z=H.b(new P.aU(this,this.r,null,null),[null])
z.c=z.a.e
if(!z.p())return""
y=new P.bA("")
if(b===""){do y.a+=H.d(z.d)
while(z.p())}else{y.a=H.d(z.d)
for(;z.p();){y.a+=b
y.a+=H.d(z.d)}}x=y.a
return x.charCodeAt(0)==0?x:x},
H:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.d2("index"))
if(b<0)H.w(P.av(b,0,null,"index",null))
for(z=H.b(new P.aU(this,this.r,null,null),[null]),z.c=z.a.e,y=0;z.p();){x=z.d
if(b===y)return x;++y}throw H.c(P.as(b,this,"index",null,y))},
$ism:1},
i5:{"^":"i6;"}}],["","",,P,{"^":"",
dd:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.Z(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fW(a)},
fW:function(a){var z=J.l(a)
if(!!z.$isf)return z.j(a)
return H.bv(a)},
a7:function(a){return new P.iU(a)},
b6:function(a,b,c){var z,y
z=H.b([],[c])
for(y=J.b_(a);y.p();)z.push(y.gv())
if(b)return z
z.fixed$length=Array
return z},
Y:function(a){var z=H.d(a)
H.eG(z)},
cw:{"^":"a;"},
"+bool":0,
c0:{"^":"a;a,b",
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.c0))return!1
return this.a===b.a&&!0},
gC:function(a){var z=this.a
return(z^C.a.bx(z,30))&1073741823},
j:function(a){var z,y,x,w,v,u,t
z=P.fP(H.au(this).getUTCFullYear()+0)
y=P.b1(H.au(this).getUTCMonth()+1)
x=P.b1(H.au(this).getUTCDate()+0)
w=P.b1(H.au(this).getUTCHours()+0)
v=P.b1(H.au(this).getUTCMinutes()+0)
u=P.b1(H.au(this).getUTCSeconds()+0)
t=P.fQ(H.au(this).getUTCMilliseconds()+0)
return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"},
gfm:function(){return this.a},
dK:function(a,b){var z=this.a
if(!(Math.abs(z)>864e13)){if(Math.abs(z)===864e13);z=!1}else z=!0
if(z)throw H.c(P.b0(this.gfm()))},
q:{
fP:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.d(z)
if(z>=10)return y+"00"+H.d(z)
return y+"000"+H.d(z)},
fQ:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
b1:function(a){if(a>=10)return""+a
return"0"+a}}},
aZ:{"^":"I;"},
"+double":0,
af:{"^":"a;aT:a<",
w:function(a,b){return new P.af(this.a+b.gaT())},
E:function(a,b){return new P.af(this.a-b.gaT())},
a0:function(a,b){if(typeof b!=="number")return H.k(b)
return new P.af(C.d.aq(this.a*b))},
aR:function(a,b){if(b===0)throw H.c(new P.hf())
if(typeof b!=="number")return H.k(b)
return new P.af(C.a.aR(this.a,b))},
M:function(a,b){return C.a.M(this.a,b.gaT())},
O:function(a,b){return C.a.O(this.a,b.gaT())},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.af))return!1
return this.a===b.a},
gC:function(a){return this.a&0x1FFFFFFF},
j:function(a){var z,y,x,w,v
z=new P.fU()
y=this.a
if(y<0)return"-"+new P.af(-y).j(0)
x=z.$1(C.a.bM(C.a.az(y,6e7),60))
w=z.$1(C.a.bM(C.a.az(y,1e6),60))
v=new P.fT().$1(C.a.bM(y,1e6))
return""+C.a.az(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
b7:function(a){return new P.af(-this.a)}},
fT:{"^":"f:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fU:{"^":"f:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
G:{"^":"a;",
ga1:function(){return H.P(this.$thrownJsError)}},
cd:{"^":"G;",
j:function(a){return"Throw of null."}},
a6:{"^":"G;a,b,c,d",
gbn:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbm:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.d(z)+")":""
z=this.d
x=z==null?"":": "+H.d(z)
w=this.gbn()+y+x
if(!this.a)return w
v=this.gbm()
u=P.dd(this.b)
return w+v+": "+H.d(u)},
q:{
b0:function(a){return new P.a6(!1,null,null,a)},
bU:function(a,b,c){return new P.a6(!0,a,b,c)},
d2:function(a){return new P.a6(!1,null,a,"Must not be null")}}},
dD:{"^":"a6;e,f,a,b,c,d",
gbn:function(){return"RangeError"},
gbm:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else{if(typeof x!=="number")return x.O()
if(typeof z!=="number")return H.k(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
q:{
bx:function(a,b,c){return new P.dD(null,null,!0,a,b,"Value not in range")},
av:function(a,b,c,d,e){return new P.dD(b,c,!0,a,d,"Invalid value")},
dE:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.av(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.av(b,a,c,"end",f))
return b}}},
he:{"^":"a6;e,i:f>,a,b,c,d",
gbn:function(){return"RangeError"},
gbm:function(){if(J.eN(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
q:{
as:function(a,b,c,d,e){var z=e!=null?e:J.aG(b)
return new P.he(b,z,!0,a,c,"Index out of range")}}},
H:{"^":"G;a",
j:function(a){return"Unsupported operation: "+this.a}},
aR:{"^":"G;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.d(z):"UnimplementedError"}},
a2:{"^":"G;a",
j:function(a){return"Bad state: "+this.a}},
E:{"^":"G;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.dd(z))+"."}},
hR:{"^":"a;",
j:function(a){return"Out of Memory"},
ga1:function(){return},
$isG:1},
dH:{"^":"a;",
j:function(a){return"Stack Overflow"},
ga1:function(){return},
$isG:1},
fO:{"^":"G;a",
j:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
iU:{"^":"a;a",
j:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
h4:{"^":"a;a,b,b2:c>",
j:function(a){var z,y
z=""!==this.a?"FormatException: "+this.a:"FormatException"
y=this.b
if(y.length>78)y=C.f.bc(y,0,75)+"..."
return z+"\n"+y}},
hf:{"^":"a;",
j:function(a){return"IntegerDivisionByZeroException"}},
fX:{"^":"a;a,b",
j:function(a){return"Expando:"+H.d(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.w(P.bU(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.ce(b,"expando$values")
return y==null?null:H.ce(y,z)},
u:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.ce(b,"expando$values")
if(y==null){y=new P.a()
H.dB(b,"expando$values",y)}H.dB(y,z,c)}}},
h5:{"^":"a;"},
r:{"^":"I;"},
"+int":0,
K:{"^":"a;",
ac:function(a,b){return H.b7(this,b,H.x(this,"K",0),null)},
as:["dE",function(a,b){return H.b(new H.e0(this,b),[H.x(this,"K",0)])}],
G:function(a,b){var z
for(z=this.gD(this);z.p();)b.$1(z.gv())},
aN:function(a,b){return P.b6(this,!0,H.x(this,"K",0))},
aM:function(a){return this.aN(a,!0)},
gi:function(a){var z,y
z=this.gD(this)
for(y=0;z.p();)++y
return y},
gai:function(a){var z,y
z=this.gD(this)
if(!z.p())throw H.c(H.aN())
y=z.gv()
if(z.p())throw H.c(H.hx())
return y},
H:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.d2("index"))
if(b<0)H.w(P.av(b,0,null,"index",null))
for(z=this.gD(this),y=0;z.p();){x=z.gv()
if(b===y)return x;++y}throw H.c(P.as(b,this,"index",null,y))},
j:function(a){return P.hv(this,"(",")")}},
c5:{"^":"a;"},
j:{"^":"a;",$asj:null,$isK:1,$ism:1},
"+List":0,
aQ:{"^":"a;"},
lK:{"^":"a;",
j:function(a){return"null"}},
"+Null":0,
I:{"^":"a;"},
"+num":0,
a:{"^":";",
t:function(a,b){return this===b},
gC:function(a){return H.al(this)},
j:function(a){return H.bv(this)},
toString:function(){return this.j(this)}},
aa:{"^":"a;"},
i9:{"^":"a;a,b",
dv:function(a){var z,y
z=this.a==null
if(!z&&this.b==null)return
y=$.b8
if(z)this.a=y.$0()
else{this.a=J.J(y.$0(),J.J(this.b,this.a))
this.b=null}},
ad:function(a){var z
if(this.a==null)return
z=$.b8.$0()
this.a=z
if(this.b!=null)this.b=z},
gcG:function(){var z,y
z=this.a
if(z==null)return 0
y=this.b
return y==null?J.J($.b8.$0(),this.a):J.J(y,z)},
dP:function(){H.hW()
$.cg=$.bw}},
u:{"^":"a;"},
"+String":0,
bA:{"^":"a;aj:a<",
gi:function(a){return this.a.length},
j:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
q:{
dI:function(a,b,c){var z=J.b_(b)
if(!z.p())return a
if(c.length===0){do a+=H.d(z.gv())
while(z.p())}else{a+=H.d(z.gv())
for(;z.p();)a=a+c+H.d(z.gv())}return a}}}}],["","",,W,{"^":"",
fN:function(a,b,c,d){var z,y,x
z=document.createEvent("CustomEvent")
J.fr(z,d)
if(!J.l(d).$isj)if(!J.l(d).$isaQ){y=d
if(typeof y!=="string"){y=d
y=typeof y==="number"}else y=!0}else y=!0
else y=!0
if(y)try{d=new P.jw([],[]).af(d)
J.bM(z,a,b,c,d)}catch(x){H.C(x)
J.bM(z,a,b,c,null)}else J.bM(z,a,b,c,null)
return z},
fV:function(a,b,c){var z,y
z=document.body
y=(z&&C.i).W(z,a,b,c)
y.toString
z=new W.W(y)
z=z.as(z,new W.jW())
return z.gai(z)},
kX:[function(a){return"wheel"},"$1","k5",2,0,27],
aK:function(a){var z,y,x
z="element tag unavailable"
try{y=J.cR(a)
if(typeof y==="string")z=J.cR(a)}catch(x){H.C(x)}return z},
aM:function(a,b,c){return W.hc(a,null,null,b,null,null,null,c).I(new W.hb())},
hc:function(a,b,c,d,e,f,g,h){var z,y,x
z=H.b(new P.e2(H.b(new P.a4(0,$.o,null),[W.aL])),[W.aL])
y=new XMLHttpRequest()
C.D.fv(y,"GET",a,!0)
x=C.A.b_(y)
H.b(new W.F(0,x.a,x.b,W.A(new W.hd(z,y)),!1),[H.v(x,0)]).F()
x=C.y.b_(y)
H.b(new W.F(0,x.a,x.b,W.A(z.geH()),!1),[H.v(x,0)]).F()
y.send()
return z.a},
ao:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
ec:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
ei:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.iM(a)
if(!!J.l(z).$isy)return z
return}else return a},
A:function(a){var z=$.o
if(z===C.c)return a
return z.ez(a,!0)},
t:{"^":"D;","%":"HTMLAppletElement|HTMLBRElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
kK:{"^":"t;bF:hostname=,aE:href},bL:port=,b4:protocol=",
j:function(a){return String(a)},
$isi:1,
"%":"HTMLAnchorElement"},
fz:{"^":"y;",$isfz:1,$isy:1,$isa:1,"%":"Animation"},
kM:{"^":"t;bF:hostname=,aE:href},bL:port=,b4:protocol=",
j:function(a){return String(a)},
$isi:1,
"%":"HTMLAreaElement"},
kN:{"^":"t;aE:href}","%":"HTMLBaseElement"},
bW:{"^":"i;",$isbW:1,"%":";Blob"},
bX:{"^":"t;",$isbX:1,$isy:1,$isi:1,"%":"HTMLBodyElement"},
kO:{"^":"t;L:name=","%":"HTMLButtonElement"},
kP:{"^":"t;k:height%,l:width%",
bW:function(a,b,c){return a.getContext(b,P.k_(c,null))},
dc:function(a,b,c,d,e,f,g){var z,y
z=P.at(["alpha",!0,"depth",!1,"stencil",!1,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
y=this.bW(a,"webgl",z)
return y==null?this.bW(a,"experimental-webgl",z):y},
da:function(a,b){return this.dc(a,!0,!0,b,!0,!1,!1)},
"%":"HTMLCanvasElement"},
kR:{"^":"p;i:length=",$isi:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
kS:{"^":"ah;aY:client=","%":"CrossOriginConnectEvent"},
kT:{"^":"hg;i:length=","%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hg:{"^":"i+fM;"},
fM:{"^":"a;"},
c_:{"^":"ah;e4:_dartDetail}",
gcF:function(a){var z,y
z=a._dartDetail
if(z!=null)return z
z=a.detail
y=new P.iy([],[],!1)
y.c=!0
return y.af(z)},
ed:function(a,b,c,d,e){return a.initCustomEvent(b,!0,!0,e)},
$isc_:1,
$isa:1,
"%":"CustomEvent"},
kU:{"^":"p;",$isi:1,"%":"DocumentFragment|ShadowRoot"},
kV:{"^":"i;",
j:function(a){return String(a)},
"%":"DOMException"},
fR:{"^":"i;",
j:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(this.gl(a))+" x "+H.d(this.gk(a))},
t:function(a,b){var z
if(b==null)return!1
z=J.l(b)
if(!z.$isa9)return!1
return a.left===z.gaI(b)&&a.top===z.gaO(b)&&this.gl(a)===z.gl(b)&&this.gk(a)===z.gk(b)},
gC:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gl(a)
w=this.gk(a)
return W.ec(W.ao(W.ao(W.ao(W.ao(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gbQ:function(a){return H.b(new P.z(a.left,a.top),[null])},
gbB:function(a){return a.bottom},
gk:function(a){return a.height},
gaI:function(a){return a.left},
gbN:function(a){return a.right},
gaO:function(a){return a.top},
gl:function(a){return a.width},
gm:function(a){return a.x},
gn:function(a){return a.y},
$isa9:1,
$asa9:I.ac,
"%":";DOMRectReadOnly"},
kW:{"^":"i;i:length=","%":"DOMSettableTokenList|DOMTokenList"},
iJ:{"^":"aO;bp:a<,b",
gi:function(a){return this.b.length},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
u:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
this.a.replaceChild(c,z[b])},
A:function(a,b){this.a.appendChild(b)
return b},
gD:function(a){var z=this.aM(this)
return H.b(new J.bV(z,z.length,0,null),[H.v(z,0)])},
gaZ:function(a){var z=this.a.firstElementChild
if(z==null)throw H.c(new P.a2("No elements"))
return z},
$asaO:function(){return[W.D]},
$asbu:function(){return[W.D]},
$asj:function(){return[W.D]}},
D:{"^":"p;dA:style=,fI:tagName=",
gex:function(a){return new W.iQ(a)},
gam:function(a){return new W.iJ(a,a.children)},
gcA:function(a){return new W.iR(a)},
gaY:function(a){return P.a1(a.clientLeft,a.clientTop,a.clientWidth,a.clientHeight,null)},
gb2:function(a){return P.a1(C.d.aq(a.offsetLeft),C.d.aq(a.offsetTop),C.d.aq(a.offsetWidth),C.d.aq(a.offsetHeight),null)},
j:function(a){return a.localName},
W:["bd",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.dc
if(z==null){z=H.b([],[W.cc])
y=new W.dx(z)
z.push(W.e9(null))
z.push(W.ef())
$.dc=y
d=y}else d=z
z=$.db
if(z==null){z=new W.eg(d)
$.db=z
c=z}else{z.a=d
c=z}}if($.ag==null){z=document.implementation.createHTMLDocument("")
$.ag=z
$.c2=z.createRange()
z=$.ag
z.toString
x=z.createElement("base")
J.fs(x,document.baseURI)
$.ag.head.appendChild(x)}z=$.ag
if(!!this.$isbX)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.ag.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.b.B(C.P,a.tagName)){$.c2.selectNodeContents(w)
v=$.c2.createContextualFragment(b)}else{w.innerHTML=b
v=$.ag.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.ag.body
if(w==null?z!=null:w!==z)J.fo(w)
c.bX(v)
document.adoptNode(v)
return v},function(a,b,c){return this.W(a,b,c,null)},"eM",null,null,"gh5",2,5,null,0,0],
scN:function(a,b){this.b9(a,b)},
ba:function(a,b,c,d){a.textContent=null
a.appendChild(this.W(a,b,c,d))},
b9:function(a,b){return this.ba(a,b,null,null)},
bV:function(a){return a.getBoundingClientRect()},
gcR:function(a){return C.k.K(a)},
gbI:function(a){return C.l.K(a)},
gcS:function(a){return C.m.K(a)},
gaJ:function(a){return C.n.K(a)},
gaK:function(a){return C.o.K(a)},
gb3:function(a){return C.p.K(a)},
gcT:function(a){return C.W.K(a)},
$isD:1,
$isp:1,
$isy:1,
$isa:1,
$isi:1,
"%":";Element"},
jW:{"^":"f:1;",
$1:function(a){return!!J.l(a).$isD}},
kY:{"^":"t;k:height%,L:name=,l:width%","%":"HTMLEmbedElement"},
kZ:{"^":"ah;a9:error=","%":"ErrorEvent"},
ah:{"^":"i;",
cV:function(a){return a.preventDefault()},
$isa:1,
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|DefaultSessionStartEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PopStateEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
y:{"^":"i;",
dX:function(a,b,c,d){return a.addEventListener(b,H.ab(c,1),!1)},
el:function(a,b,c,d){return a.removeEventListener(b,H.ab(c,1),!1)},
$isy:1,
$isa:1,
"%":"CrossOriginServiceWorkerClient|MediaStream;EventTarget"},
lh:{"^":"t;L:name=","%":"HTMLFieldSetElement"},
df:{"^":"bW;",$isdf:1,"%":"File"},
lk:{"^":"t;i:length=,L:name=",
ad:function(a){return a.reset()},
"%":"HTMLFormElement"},
ll:{"^":"hk;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.as(b,a,null,null,null))
return a[b]},
u:function(a,b,c){throw H.c(new P.H("Cannot assign element of immutable List."))},
H:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.p]},
$ism:1,
$isa0:1,
$asa0:function(){return[W.p]},
$isT:1,
$asT:function(){return[W.p]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
hh:{"^":"i+a8;",$isj:1,
$asj:function(){return[W.p]},
$ism:1},
hk:{"^":"hh+bo;",$isj:1,
$asj:function(){return[W.p]},
$ism:1},
aL:{"^":"ha;fF:responseText=",
hd:function(a,b,c,d,e,f){return a.open(b,c,!0,f,e)},
fv:function(a,b,c,d){return a.open(b,c,d)},
aQ:function(a,b){return a.send(b)},
$isaL:1,
$isy:1,
$isa:1,
"%":"XMLHttpRequest"},
hb:{"^":"f:18;",
$1:function(a){return J.fe(a)}},
hd:{"^":"f:1;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
y=z.status
if(typeof y!=="number")return y.at()
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.a
if(y)v.cB(0,z)
else v.cC(a)}},
ha:{"^":"y;","%":";XMLHttpRequestEventTarget"},
lm:{"^":"t;k:height%,L:name=,l:width%","%":"HTMLIFrameElement"},
ln:{"^":"t;k:height%,l:width%","%":"HTMLImageElement"},
lp:{"^":"t;k:height%,L:name=,l:width%",$isD:1,$isi:1,$isy:1,"%":"HTMLInputElement"},
bq:{"^":"e_;",
geC:function(a){return a.charCode},
$isbq:1,
$isa:1,
"%":"KeyboardEvent"},
ls:{"^":"t;L:name=","%":"HTMLKeygenElement"},
lt:{"^":"t;aE:href}","%":"HTMLLinkElement"},
lu:{"^":"i;",
j:function(a){return String(a)},
"%":"Location"},
lv:{"^":"t;L:name=","%":"HTMLMapElement"},
hM:{"^":"t;a9:error=","%":"HTMLAudioElement;HTMLMediaElement"},
ly:{"^":"t;L:name=","%":"HTMLMetaElement"},
lz:{"^":"hN;",
fV:function(a,b,c){return a.send(b,c)},
aQ:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
hN:{"^":"y;","%":"MIDIInput;MIDIPort"},
V:{"^":"e_;eB:button=",
gaY:function(a){return H.b(new P.z(a.clientX,a.clientY),[null])},
gb2:function(a){var z,y,x
if(!!a.offsetX)return H.b(new P.z(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.l(W.ei(z)).$isD)throw H.c(new P.H("offsetX is only supported on elements"))
y=W.ei(z)
x=H.b(new P.z(a.clientX,a.clientY),[null]).E(0,J.fg(J.fj(y)))
return H.b(new P.z(J.cY(x.a),J.cY(x.b)),[null])}},
gbG:function(a){return H.b(new P.z(a.layerX,a.layerY),[null])},
$isV:1,
$isa:1,
"%":"PointerEvent;DragEvent|MouseEvent"},
lJ:{"^":"i;",$isi:1,"%":"Navigator"},
W:{"^":"aO;a",
gai:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.c(new P.a2("No elements"))
if(y>1)throw H.c(new P.a2("More than one element"))
return z.firstChild},
a2:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
u:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.e(y,b)
z.replaceChild(c,y[b])},
gD:function(a){return C.S.gD(this.a.childNodes)},
gi:function(a){return this.a.childNodes.length},
h:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$asaO:function(){return[W.p]},
$asbu:function(){return[W.p]},
$asj:function(){return[W.p]}},
p:{"^":"y;fj:lastChild=,fo:nodeType=,fw:parentNode=,fz:previousSibling=",
gfp:function(a){return new W.W(a)},
fB:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
fE:function(a,b){var z,y
try{z=a.parentNode
J.eS(z,b,a)}catch(y){H.C(y)}return a},
j:function(a){var z=a.nodeValue
return z==null?this.dD(a):z},
ek:function(a,b){return a.removeChild(b)},
en:function(a,b,c){return a.replaceChild(b,c)},
$isp:1,
$isy:1,
$isa:1,
"%":"Document|HTMLDocument|XMLDocument;Node"},
hO:{"^":"hl;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.as(b,a,null,null,null))
return a[b]},
u:function(a,b,c){throw H.c(new P.H("Cannot assign element of immutable List."))},
H:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.p]},
$ism:1,
$isa0:1,
$asa0:function(){return[W.p]},
$isT:1,
$asT:function(){return[W.p]},
"%":"NodeList|RadioNodeList"},
hi:{"^":"i+a8;",$isj:1,
$asj:function(){return[W.p]},
$ism:1},
hl:{"^":"hi+bo;",$isj:1,
$asj:function(){return[W.p]},
$ism:1},
lL:{"^":"t;k:height%,L:name=,l:width%","%":"HTMLObjectElement"},
lM:{"^":"t;L:name=","%":"HTMLOutputElement"},
lN:{"^":"t;L:name=","%":"HTMLParamElement"},
dC:{"^":"ah;",$isa:1,"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
lQ:{"^":"i;",
bV:function(a){return a.getBoundingClientRect()},
"%":"Range"},
lU:{"^":"t;i:length=,L:name=","%":"HTMLSelectElement"},
lV:{"^":"ah;a9:error=","%":"SpeechRecognitionError"},
lY:{"^":"t;",
W:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.bd(a,b,c,d)
z=W.fV("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
new W.W(y).a2(0,J.f7(z))
return y},
"%":"HTMLTableElement"},
lZ:{"^":"t;",
W:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.bd(a,b,c,d)
z=document.createDocumentFragment()
y=document
y=J.cK(y.createElement("table"),b,c,d)
y.toString
y=new W.W(y)
x=y.gai(y)
x.toString
y=new W.W(x)
w=y.gai(y)
z.toString
w.toString
new W.W(z).a2(0,new W.W(w))
return z},
"%":"HTMLTableRowElement"},
m_:{"^":"t;",
W:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.bd(a,b,c,d)
z=document.createDocumentFragment()
y=document
y=J.cK(y.createElement("table"),b,c,d)
y.toString
y=new W.W(y)
x=y.gai(y)
z.toString
x.toString
new W.W(z).a2(0,new W.W(x))
return z},
"%":"HTMLTableSectionElement"},
dK:{"^":"t;",
ba:function(a,b,c,d){var z
a.textContent=null
z=this.W(a,b,c,d)
a.content.appendChild(z)},
b9:function(a,b){return this.ba(a,b,null,null)},
$isdK:1,
"%":"HTMLTemplateElement"},
m0:{"^":"t;L:name=","%":"HTMLTextAreaElement"},
e_:{"^":"ah;cF:detail=","%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
m4:{"^":"hM;k:height%,l:width%","%":"HTMLVideoElement"},
aS:{"^":"V;",
gcE:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.c(new P.H("deltaY is not supported"))},
$isaS:1,
$isV:1,
$isa:1,
"%":"WheelEvent"},
iv:{"^":"y;",
ga3:function(a){var z=H.b(new P.jz(H.b(new P.a4(0,$.o,null),[P.I])),[P.I])
this.c9(a)
this.cn(a,W.A(new W.iw(z)))
return z.a},
cn:function(a,b){return a.requestAnimationFrame(H.ab(b,1))},
c9:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isi:1,
$isy:1,
"%":"DOMWindow|Window"},
iw:{"^":"f:1;a",
$1:function(a){var z=this.a.a
if(z.a!==0)H.w(new P.a2("Future already completed"))
z.au(a)}},
ma:{"^":"p;L:name=","%":"Attr"},
mb:{"^":"i;bB:bottom=,k:height=,aI:left=,bN:right=,aO:top=,l:width=",
j:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(a.width)+" x "+H.d(a.height)},
t:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isa9)return!1
y=a.left
x=z.gaI(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaO(b)
if(y==null?x==null:y===x){y=a.width
x=z.gl(b)
if(y==null?x==null:y===x){y=a.height
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gC:function(a){var z,y,x,w
z=J.S(a.left)
y=J.S(a.top)
x=J.S(a.width)
w=J.S(a.height)
return W.ec(W.ao(W.ao(W.ao(W.ao(0,z),y),x),w))},
gbQ:function(a){return H.b(new P.z(a.left,a.top),[null])},
$isa9:1,
$asa9:I.ac,
"%":"ClientRect"},
mc:{"^":"p;",$isi:1,"%":"DocumentType"},
md:{"^":"fR;",
gk:function(a){return a.height},
gl:function(a){return a.width},
gm:function(a){return a.x},
gn:function(a){return a.y},
"%":"DOMRect"},
mg:{"^":"t;",$isy:1,$isi:1,"%":"HTMLFrameSetElement"},
mj:{"^":"hm;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.as(b,a,null,null,null))
return a[b]},
u:function(a,b,c){throw H.c(new P.H("Cannot assign element of immutable List."))},
H:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.p]},
$ism:1,
$isa0:1,
$asa0:function(){return[W.p]},
$isT:1,
$asT:function(){return[W.p]},
"%":"MozNamedAttrMap|NamedNodeMap"},
hj:{"^":"i+a8;",$isj:1,
$asj:function(){return[W.p]},
$ism:1},
hm:{"^":"hj+bo;",$isj:1,
$asj:function(){return[W.p]},
$ism:1},
iG:{"^":"a;bp:a<",
G:function(a,b){var z,y,x,w,v
for(z=this.gab(),y=z.length,x=this.a,w=0;w<z.length;z.length===y||(0,H.aE)(z),++w){v=z[w]
b.$2(v,x.getAttribute(v))}},
gab:function(){var z,y,x,w,v
z=this.a.attributes
y=H.b([],[P.u])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.e(z,w)
v=z[w]
if(v.namespaceURI==null)y.push(J.f5(v))}return y},
$isaQ:1,
$asaQ:function(){return[P.u,P.u]}},
iQ:{"^":"iG;a",
h:function(a,b){return this.a.getAttribute(b)},
u:function(a,b,c){this.a.setAttribute(b,c)},
gi:function(a){return this.gab().length}},
iR:{"^":"d7;bp:a<",
T:function(){var z,y,x,w,v
z=P.U(null,null,null,P.u)
for(y=this.a.className.split(" "),x=y.length,w=0;w<y.length;y.length===x||(0,H.aE)(y),++w){v=J.cZ(y[w])
if(v.length!==0)z.A(0,v)}return z},
bT:function(a){this.a.className=a.aH(0," ")},
gi:function(a){return this.a.classList.length},
B:function(a,b){return typeof b==="string"&&this.a.classList.contains(b)},
A:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.add(b)
return!y},
Z:function(a,b){var z,y,x
z=this.a.classList
y=z.contains(b)
z.remove(b)
x=y
return x}},
O:{"^":"a;a",
f1:function(a,b){var z=new W.e6(a,this.a,!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
b_:function(a){return this.f1(a,!1)},
bE:function(a,b){var z=new W.cl(a,this.a,!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
K:function(a){return this.bE(a,!1)}},
e6:{"^":"am;a,b,c",
ap:function(a,b,c,d){var z=new W.F(0,this.a,this.b,W.A(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.F()
return z},
cP:function(a,b,c){return this.ap(a,null,b,c)}},
cl:{"^":"e6;a,b,c"},
F:{"^":"ia;a,b,c,d,e",
bC:function(a){if(this.b==null)return
this.ct()
this.b=null
this.d=null
return},
bJ:function(a,b){if(this.b==null)return;++this.a
this.ct()},
cU:function(a){return this.bJ(a,null)},
cX:function(){if(this.b==null||this.a<=0)return;--this.a
this.F()},
F:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.eP(x,this.c,z,!1)}},
ct:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.eR(x,this.c,z,!1)}}},
iK:{"^":"a;a",
bE:function(a,b){var z=new W.cl(a,this.e5(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
K:function(a){return this.bE(a,!1)},
e5:function(a){return this.a.$1(a)}},
cn:{"^":"a;d4:a<",
ak:function(a){return $.$get$ea().B(0,W.aK(a))},
a7:function(a,b,c){var z,y,x
z=W.aK(a)
y=$.$get$co()
x=y.h(0,H.d(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
dT:function(a){var z,y
z=$.$get$co()
if(z.gY(z)){for(y=0;y<262;++y)z.u(0,C.O[y],W.k6())
for(y=0;y<12;++y)z.u(0,C.h[y],W.k7())}},
$iscc:1,
q:{
e9:function(a){var z,y
z=document
y=z.createElement("a")
z=new W.jq(y,window.location)
z=new W.cn(z)
z.dT(a)
return z},
mh:[function(a,b,c,d){return!0},"$4","k6",8,0,10],
mi:[function(a,b,c,d){var z,y,x,w,v
z=d.gd4()
y=z.a
x=J.h(y)
x.saE(y,c)
w=x.gbF(y)
z=z.b
v=z.hostname
if(w==null?v==null:w===v){w=x.gbL(y)
v=z.port
if(w==null?v==null:w===v){w=x.gb4(y)
z=z.protocol
z=w==null?z==null:w===z}else z=!1}else z=!1
if(!z)if(x.gbF(y)==="")if(x.gbL(y)==="")z=x.gb4(y)===":"||x.gb4(y)===""
else z=!1
else z=!1
else z=!0
return z},"$4","k7",8,0,10]}},
bo:{"^":"a;",
gD:function(a){return H.b(new W.h3(a,this.gi(a),-1,null),[H.x(a,"bo",0)])},
$isj:1,
$asj:null,
$ism:1},
dx:{"^":"a;a",
ak:function(a){return C.b.cv(this.a,new W.hQ(a))},
a7:function(a,b,c){return C.b.cv(this.a,new W.hP(a,b,c))}},
hQ:{"^":"f:1;a",
$1:function(a){return a.ak(this.a)}},
hP:{"^":"f:1;a,b,c",
$1:function(a){return a.a7(this.a,this.b,this.c)}},
jr:{"^":"a;d4:d<",
ak:function(a){return this.a.B(0,W.aK(a))},
a7:["dI",function(a,b,c){var z,y
z=W.aK(a)
y=this.c
if(y.B(0,H.d(z)+"::"+b))return this.d.ev(c)
else if(y.B(0,"*::"+b))return this.d.ev(c)
else{y=this.b
if(y.B(0,H.d(z)+"::"+b))return!0
else if(y.B(0,"*::"+b))return!0
else if(y.B(0,H.d(z)+"::*"))return!0
else if(y.B(0,"*::*"))return!0}return!1}],
dU:function(a,b,c,d){var z,y,x
this.a.a2(0,c)
z=b.as(0,new W.js())
y=b.as(0,new W.jt())
this.b.a2(0,z)
x=this.c
x.a2(0,C.Q)
x.a2(0,y)}},
js:{"^":"f:1;",
$1:function(a){return!C.b.B(C.h,a)}},
jt:{"^":"f:1;",
$1:function(a){return C.b.B(C.h,a)}},
jA:{"^":"jr;e,a,b,c,d",
a7:function(a,b,c){if(this.dI(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(J.cM(a).a.getAttribute("template")==="")return this.e.B(0,b)
return!1},
q:{
ef:function(){var z,y
z=P.dp(C.t,P.u)
y=H.b(new H.bs(C.t,new W.jB()),[null,null])
z=new W.jA(z,P.U(null,null,null,P.u),P.U(null,null,null,P.u),P.U(null,null,null,P.u),null)
z.dU(null,y,["TEMPLATE"],null)
return z}}},
jB:{"^":"f:1;",
$1:function(a){return"TEMPLATE::"+H.d(a)}},
jy:{"^":"a;",
ak:function(a){var z=J.l(a)
if(!!z.$isdG)return!1
z=!!z.$isn
if(z&&W.aK(a)==="foreignObject")return!1
if(z)return!0
return!1},
a7:function(a,b,c){if(b==="is"||C.f.dw(b,"on"))return!1
return this.ak(a)}},
h3:{"^":"a;a,b,c,d",
p:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cI(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gv:function(){return this.d}},
iL:{"^":"a;a",$isy:1,$isi:1,q:{
iM:function(a){if(a===window)return a
else return new W.iL(a)}}},
cc:{"^":"a;"},
jq:{"^":"a;a,b"},
eg:{"^":"a;a",
bX:function(a){new W.jC(this).$2(a,null)},
ax:function(a,b){var z
if(b==null){z=a.parentNode
if(z!=null)z.removeChild(a)}else b.removeChild(a)},
eq:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.cM(a)
x=y.gbp().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w===!0?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.C(t)}v="element unprintable"
try{v=J.Z(a)}catch(t){H.C(t)}try{u=W.aK(a)
this.ep(a,b,z,v,u,y,x)}catch(t){if(H.C(t) instanceof P.a6)throw t
else{this.ax(a,b)
window
s="Removing corrupted element "+H.d(v)
if(typeof console!="undefined")console.warn(s)}}},
ep:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.ax(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.ak(a)){this.ax(a,b)
window
z="Removing disallowed element <"+H.d(e)+"> from "+J.Z(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.a7(a,"is",g)){this.ax(a,b)
window
z="Removing disallowed type extension <"+H.d(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gab()
y=H.b(z.slice(),[H.v(z,0)])
for(x=f.gab().length-1,z=f.a;x>=0;--x){if(x>=y.length)return H.e(y,x)
w=y[x]
if(!this.a.a7(a,J.ft(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.d(e)+" "+w+'="'+H.d(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.l(a).$isdK)this.bX(a.content)}},
jC:{"^":"f:19;a",
$2:function(a,b){var z,y,x,w,v
x=this.a
w=a
switch(J.f6(w)){case 1:x.eq(w,b)
break
case 8:case 11:case 3:case 4:break
default:x.ax(w,b)}z=J.cP(a)
for(;null!=z;){y=null
try{y=J.fd(z)}catch(v){H.C(v)
x=z
w=a
if(w==null){if(J.fc(x)!=null)x.parentNode.removeChild(x)}else J.eQ(w,x)
z=null
y=J.cP(a)}if(z!=null)this.$2(z,a)
z=y}}}}],["","",,P,{"^":""}],["","",,P,{"^":"",kJ:{"^":"ar;",$isi:1,"%":"SVGAElement"},kL:{"^":"n;",$isi:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},l_:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEBlendElement"},l0:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEColorMatrixElement"},l1:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEComponentTransferElement"},l2:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFECompositeElement"},l3:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEConvolveMatrixElement"},l4:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEDiffuseLightingElement"},l5:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEDisplacementMapElement"},l6:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEFloodElement"},l7:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEGaussianBlurElement"},l8:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEImageElement"},l9:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEMergeElement"},la:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEMorphologyElement"},lb:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFEOffsetElement"},lc:{"^":"n;m:x=,n:y=","%":"SVGFEPointLightElement"},ld:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFESpecularLightingElement"},le:{"^":"n;m:x=,n:y=","%":"SVGFESpotLightElement"},lf:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFETileElement"},lg:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFETurbulenceElement"},li:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGFilterElement"},lj:{"^":"ar;k:height=,l:width=,m:x=,n:y=","%":"SVGForeignObjectElement"},h7:{"^":"ar;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},ar:{"^":"n;",$isi:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},lo:{"^":"ar;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGImageElement"},lw:{"^":"n;",$isi:1,"%":"SVGMarkerElement"},lx:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGMaskElement"},lO:{"^":"n;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGPatternElement"},lR:{"^":"i;m:x=,n:y=","%":"SVGRect"},lS:{"^":"h7;k:height=,l:width=,m:x=,n:y=","%":"SVGRectElement"},dG:{"^":"n;",$isdG:1,$isi:1,"%":"SVGScriptElement"},iF:{"^":"d7;a",
T:function(){var z,y,x,w,v,u
z=this.a.getAttribute("class")
y=P.U(null,null,null,P.u)
if(z==null)return y
for(x=z.split(" "),w=x.length,v=0;v<x.length;x.length===w||(0,H.aE)(x),++v){u=J.cZ(x[v])
if(u.length!==0)y.A(0,u)}return y},
bT:function(a){this.a.setAttribute("class",a.aH(0," "))}},n:{"^":"D;",
gcA:function(a){return new P.iF(a)},
gam:function(a){return new P.h0(a,new W.W(a))},
scN:function(a,b){this.b9(a,b)},
W:function(a,b,c,d){var z,y,x,w,v
z=H.b([],[W.cc])
d=new W.dx(z)
z.push(W.e9(null))
z.push(W.ef())
z.push(new W.jy())
c=new W.eg(d)
y='<svg version="1.1">'+b+"</svg>"
z=document.body
x=(z&&C.i).eM(z,y,c)
w=document.createDocumentFragment()
x.toString
z=new W.W(x)
v=z.gai(z)
for(;z=v.firstChild,z!=null;)w.appendChild(z)
return w},
gcR:function(a){return C.k.K(a)},
gbI:function(a){return C.l.K(a)},
gcS:function(a){return C.m.K(a)},
gaJ:function(a){return C.n.K(a)},
gaK:function(a){return C.o.K(a)},
gb3:function(a){return C.p.K(a)},
gcT:function(a){return C.B.K(a)},
$isn:1,
$isy:1,
$isi:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},lW:{"^":"ar;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGSVGElement"},lX:{"^":"n;",$isi:1,"%":"SVGSymbolElement"},dL:{"^":"ar;","%":";SVGTextContentElement"},m1:{"^":"dL;",$isi:1,"%":"SVGTextPathElement"},m2:{"^":"dL;m:x=,n:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},m3:{"^":"ar;k:height=,l:width=,m:x=,n:y=",$isi:1,"%":"SVGUseElement"},m5:{"^":"n;",$isi:1,"%":"SVGViewElement"},mf:{"^":"n;",$isi:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},mk:{"^":"n;",$isi:1,"%":"SVGCursorElement"},ml:{"^":"n;",$isi:1,"%":"SVGFEDropShadowElement"},mm:{"^":"n;",$isi:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",lT:{"^":"i;eX:drawingBufferHeight=,eY:drawingBufferWidth=",
ew:function(a,b,c){return a.attachShader(b,c)},
ey:function(a,b,c){return a.bindBuffer(b,c)},
eA:function(a,b,c,d){return a.bufferData(b,c,d)},
eE:function(a,b){return a.clear(b)},
eF:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
eG:function(a,b){return a.compileShader(b)},
eL:function(a){return a.createBuffer()},
eN:function(a){return a.createProgram()},
eO:function(a,b){return a.createShader(b)},
eP:function(a,b){return a.deleteShader(b)},
eV:function(a,b,c){return a.detachShader(b,c)},
eW:function(a,b,c,d){return a.drawArrays(b,c,d)},
eZ:function(a,b){return a.enableVertexAttribArray(b)},
d7:function(a,b,c){return a.getActiveAttrib(b,c)},
d8:function(a,b){return a.getAttachedShaders(b)},
d9:function(a,b,c){return a.getAttribLocation(b,c)},
dd:function(a,b){return a.getProgramInfoLog(b)},
de:function(a,b,c){return a.getProgramParameter(b,c)},
df:function(a,b){return a.getShaderInfoLog(b)},
dg:function(a,b,c){return a.getShaderParameter(b,c)},
dh:function(a,b){return a.getShaderSource(b)},
dj:function(a,b,c){return a.getUniformLocation(b,c)},
fk:function(a,b){return a.linkProgram(b)},
du:function(a,b,c){return a.shaderSource(b,c)},
fL:function(a,b,c){return a.uniform1f(b,c)},
fM:function(a,b,c){return a.uniform1i(b,c)},
fN:function(a,b,c,d){return a.uniform2f(b,c,d)},
fO:function(a,b,c){return a.uniform2fv(b,c)},
fP:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
fR:function(a,b){return a.useProgram(b)},
fS:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
fT:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGLRenderingContext"}}],["","",,P,{"^":""}],["","",,P,{"^":"",kQ:{"^":"a;"}}],["","",,P,{"^":"",
aT:function(a,b){if(typeof b!=="number")return H.k(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
eb:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
bK:function(a,b){if(typeof b!=="number")throw H.c(P.b0(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.d.gcO(b)||isNaN(b))return b
return a}return a},
eD:function(a,b){if(typeof b!=="number")throw H.c(P.b0(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.a.gcO(a))return b
return a},
z:{"^":"a;m:a>,n:b>",
j:function(a){return"Point("+H.d(this.a)+", "+H.d(this.b)+")"},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.z))return!1
return J.N(this.a,b.a)&&J.N(this.b,b.b)},
gC:function(a){var z,y
z=J.S(this.a)
y=J.S(this.b)
return P.eb(P.aT(P.aT(0,z),y))},
w:function(a,b){var z=J.h(b)
z=new P.z(J.q(this.a,z.gm(b)),J.q(this.b,z.gn(b)))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
E:function(a,b){var z=J.h(b)
z=new P.z(J.J(this.a,z.gm(b)),J.J(this.b,z.gn(b)))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
a0:function(a,b){var z=new P.z(J.R(this.a,b),J.R(this.b,b))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
jl:{"^":"a;",
gbN:function(a){return J.q(this.a,this.c)},
gbB:function(a){return J.q(this.b,this.d)},
j:function(a){return"Rectangle ("+H.d(this.a)+", "+H.d(this.b)+") "+H.d(this.c)+" x "+H.d(this.d)},
t:function(a,b){var z,y,x,w,v
if(b==null)return!1
z=J.l(b)
if(!z.$isa9)return!1
y=this.a
x=J.l(y)
if(x.t(y,z.gaI(b))){w=this.b
v=J.l(w)
z=v.t(w,z.gaO(b))&&J.N(x.w(y,this.c),z.gbN(b))&&J.N(v.w(w,this.d),z.gbB(b))}else z=!1
return z},
gC:function(a){var z,y,x,w,v,u
z=this.a
y=J.l(z)
x=y.gC(z)
w=this.b
v=J.l(w)
u=v.gC(w)
z=J.S(y.w(z,this.c))
w=J.S(v.w(w,this.d))
return P.eb(P.aT(P.aT(P.aT(P.aT(0,x),u),z),w))},
gbQ:function(a){var z=new P.z(this.a,this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
a9:{"^":"jl;aI:a>,aO:b>,l:c>,k:d>",$asa9:null,q:{
a1:function(a,b,c,d,e){var z,y
z=J.aC(c)
z=z.M(c,0)?J.R(z.b7(c),0):c
y=J.aC(d)
return H.b(new P.a9(a,b,z,y.M(d,0)?J.R(y.b7(d),0):d),[e])}}}}],["","",,H,{"^":"",
eh:function(a){return a},
bF:function(a){return a},
c9:{"^":"i;",$isc9:1,"%":"ArrayBuffer"},
bt:{"^":"i;",$isbt:1,"%":"DataView;ArrayBufferView;ca|dt|dv|cb|du|dw|ak"},
ca:{"^":"bt;",
gi:function(a){return a.length},
$isa0:1,
$asa0:I.ac,
$isT:1,
$asT:I.ac},
cb:{"^":"dv;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.B(a,b))
return a[b]},
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.w(H.B(a,b))
a[b]=c}},
dt:{"^":"ca+a8;",$isj:1,
$asj:function(){return[P.aZ]},
$ism:1},
dv:{"^":"dt+dg;"},
ak:{"^":"dw;",
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.w(H.B(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.r]},
$ism:1},
du:{"^":"ca+a8;",$isj:1,
$asj:function(){return[P.r]},
$ism:1},
dw:{"^":"du+dg;"},
lA:{"^":"cb;",$isj:1,
$asj:function(){return[P.aZ]},
$ism:1,
"%":"Float32Array"},
lB:{"^":"cb;",$isj:1,
$asj:function(){return[P.aZ]},
$ism:1,
"%":"Float64Array"},
lC:{"^":"ak;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.B(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.r]},
$ism:1,
"%":"Int16Array"},
lD:{"^":"ak;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.B(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.r]},
$ism:1,
"%":"Int32Array"},
lE:{"^":"ak;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.B(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.r]},
$ism:1,
"%":"Int8Array"},
lF:{"^":"ak;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.B(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.r]},
$ism:1,
"%":"Uint16Array"},
lG:{"^":"ak;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.B(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.r]},
$ism:1,
"%":"Uint32Array"},
lH:{"^":"ak;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.B(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.r]},
$ism:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
lI:{"^":"ak;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.B(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.r]},
$ism:1,
"%":";Uint8Array"}}],["","",,H,{"^":"",
eG:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,M,{"^":"",i8:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
h2:[function(a){var z
J.fn(a)
z=this.y+1
this.scQ(0,z)
this.scQ(0,C.a.J(z,2))},"$1","geh",2,0,6],
e3:function(){var z,y,x
z=document
z=z.createElement("div")
z.id="stats"
y=J.fa(z)
H.b(new W.F(0,y.a,y.b,W.A(this.geh()),!1),[H.v(y,0)]).F()
z.style.cssText="width:80px;opacity:0.9;cursor:pointer"
this.z=z
z=document
z=z.createElement("div")
z.id="fps"
z.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002"
this.Q=z
this.z.appendChild(z)
z=document
z=z.createElement("div")
z.id="fpsText"
z.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px"
z.textContent="FPS"
this.dx=z
this.Q.appendChild(z)
z=document
z=z.createElement("div")
z.id="fpsGraph"
z.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff"
this.db=z
this.Q.appendChild(z)
for(;z=J.cN(this.db),z.gi(z)<74;){z=document
x=z.createElement("span")
x.style.cssText="width:1px;height:30px;float:left;background-color:#113"
this.db.appendChild(x)}z=document
z=z.createElement("div")
z.id="ms"
z.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none"
this.ch=z
this.z.appendChild(z)
z=document
z=z.createElement("div")
z.id="msText"
z.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px"
z.textContent="MS"
this.cx=z
this.ch.appendChild(z)
z=document
z=z.createElement("div")
z.id="msGraph"
z.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0"
this.cy=z
this.ch.appendChild(z)
for(;z=J.cN(this.cy),z.gi(z)<74;){z=document
x=z.createElement("span")
x.style.cssText="width:1px;height:30px;float:left;background-color:#131"
this.cy.appendChild(x)}},
scQ:function(a,b){var z
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
d3:function(a,b){var z,y,x
z=J.h(a)
y=z.gam(a)
x=y.gaZ(y)
z.gam(a).A(0,x)
z=J.ff(x)
y=""+C.d.ar(b)+"px"
z.height=y},
f_:function(){var z,y,x,w
z=this.a
y=J.cH(J.R(z.gcG(),1000),$.cg)
x=J.cH(J.R(z.gcG(),1000),$.cg)
this.b=x
this.c=P.bK(this.c,x)
this.d=P.eD(this.d,this.b)
this.cx.textContent=H.d(this.b)+" MS ("+H.d(this.c)+" - "+this.d+")"
x=this.cy
w=this.b
if(typeof w!=="number")return w.N()
this.d3(x,P.bK(30,30-w/200*30));++this.x
if(J.eM(y,1000)){x=this.x
w=this.b
if(typeof w!=="number")return H.k(w)
w=C.a.ar(C.F.aq(x*1000/w))
this.e=w
this.f=P.bK(this.f,w)
this.r=P.eD(this.r,this.e)
this.dx.textContent=""+this.e+" FPS ("+H.d(this.f)+" - "+this.r+")"
this.d3(this.db,P.bK(30,30-this.e/100*30))
z.ad(0)
this.x=0}return y},
dO:function(){this.e3()}}}],["","",,P,{"^":"",
k_:function(a,b){var z
if(a==null)return
z={}
if(b!=null)b.$1(z)
J.cL(a,new P.k0(z))
return z},
k1:function(a){var z=H.b(new P.e2(H.b(new P.a4(0,$.o,null),[null])),[null])
a.then(H.ab(new P.k2(z),1))["catch"](H.ab(new P.k3(z),1))
return z.a},
jv:{"^":"a;",
aD:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x)if(z[x]===a)return x
z.push(a)
this.b.push(null)
return y},
af:function(a){var z,y,x,w,v,u
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
y=J.l(a)
if(!!y.$isc0)return new Date(a.a)
if(!!y.$isi0)throw H.c(new P.aR("structured clone of RegExp"))
if(!!y.$isdf)return a
if(!!y.$isbW)return a
if(!!y.$isc9||!!y.$isbt)return a
if(!!y.$isaQ){x=this.aD(a)
w=this.b
v=w.length
if(x>=v)return H.e(w,x)
u=w[x]
z.a=u
if(u!=null)return u
u={}
z.a=u
if(x>=v)return H.e(w,x)
w[x]=u
y.G(a,new P.jx(z,this))
return z.a}if(!!y.$isj){x=this.aD(a)
z=this.b
if(x>=z.length)return H.e(z,x)
u=z[x]
if(u!=null)return u
return this.eK(a,x)}throw H.c(new P.aR("structured clone of other type"))},
eK:function(a,b){var z,y,x,w,v
z=J.M(a)
y=z.gi(a)
x=new Array(y)
w=this.b
if(b>=w.length)return H.e(w,b)
w[b]=x
for(v=0;v<y;++v){w=this.af(z.h(a,v))
if(v>=x.length)return H.e(x,v)
x[v]=w}return x}},
jx:{"^":"f:5;a,b",
$2:function(a,b){this.a.a[a]=this.b.af(b)}},
ix:{"^":"a;",
aD:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
af:function(a){var z,y,x,w,v,u,t,s,r
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
z=new P.c0(y,!0)
z.dK(y,!0)
return z}if(a instanceof RegExp)throw H.c(new P.aR("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.k1(a)
x=Object.getPrototypeOf(a)
if(x===Object.prototype||x===null){w=this.aD(a)
v=this.b
u=v.length
if(w>=u)return H.e(v,w)
t=v[w]
z.a=t
if(t!=null)return t
t=P.c8()
z.a=t
if(w>=u)return H.e(v,w)
v[w]=t
this.f0(a,new P.iz(z,this))
return z.a}if(a instanceof Array){w=this.aD(a)
z=this.b
if(w>=z.length)return H.e(z,w)
t=z[w]
if(t!=null)return t
v=J.M(a)
s=v.gi(a)
t=this.c?new Array(s):a
if(w>=z.length)return H.e(z,w)
z[w]=t
if(typeof s!=="number")return H.k(s)
z=J.ad(t)
r=0
for(;r<s;++r)z.u(t,r,this.af(v.h(a,r)))
return t}return a}},
iz:{"^":"f:5;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.af(b)
J.eO(z,a,y)
return y}},
k0:{"^":"f:20;a",
$2:function(a,b){this.a[a]=b}},
jw:{"^":"jv;a,b"},
iy:{"^":"ix;a,b,c",
f0:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.aE)(z),++x){w=z[x]
b.$2(w,a[w])}}},
k2:{"^":"f:1;a",
$1:function(a){return this.a.cB(0,a)}},
k3:{"^":"f:1;a",
$1:function(a){return this.a.cC(a)}},
d7:{"^":"a;",
bz:function(a){if($.$get$d8().b.test(H.et(a)))return a
throw H.c(P.bU(a,"value","Not a valid class token"))},
j:function(a){return this.T().aH(0," ")},
gD:function(a){var z=this.T()
z=H.b(new P.aU(z,z.r,null,null),[null])
z.c=z.a.e
return z},
G:function(a,b){this.T().G(0,b)},
ac:function(a,b){var z=this.T()
return H.b(new H.c1(z,b),[H.v(z,0),null])},
gi:function(a){return this.T().a},
B:function(a,b){if(typeof b!=="string")return!1
this.bz(b)
return this.T().B(0,b)},
bH:function(a){return this.B(0,a)?a:null},
A:function(a,b){this.bz(b)
return this.fn(new P.fL(b))},
Z:function(a,b){var z,y
this.bz(b)
z=this.T()
y=z.Z(0,b)
this.bT(z)
return y},
H:function(a,b){return this.T().H(0,b)},
fn:function(a){var z,y
z=this.T()
y=a.$1(z)
this.bT(z)
return y},
$ism:1},
fL:{"^":"f:1;a",
$1:function(a){return a.A(0,this.a)}},
h0:{"^":"aO;a,b",
gaw:function(){var z=this.b
z=z.as(z,new P.h1())
return H.b7(z,new P.h2(),H.x(z,"K",0),null)},
G:function(a,b){C.b.G(P.b6(this.gaw(),!1,W.D),b)},
u:function(a,b,c){var z=this.gaw()
J.fp(z.V(J.bi(z.a,b)),c)},
A:function(a,b){this.b.a.appendChild(b)},
gi:function(a){return J.aG(this.gaw().a)},
h:function(a,b){var z=this.gaw()
return z.V(J.bi(z.a,b))},
gD:function(a){var z=P.b6(this.gaw(),!1,W.D)
return H.b(new J.bV(z,z.length,0,null),[H.v(z,0)])},
$asaO:function(){return[W.D]},
$asbu:function(){return[W.D]},
$asj:function(){return[W.D]}},
h1:{"^":"f:1;",
$1:function(a){return!!J.l(a).$isD}},
h2:{"^":"f:1;",
$1:function(a){return H.ki(a,"$isD")}}}],["","",,Z,{"^":"",
mq:[function(){Z.X("Initializing UI...")
Z.ke()
Z.X("Loading...")
W.aM("plain.vs.glsl",null,null).I(new Z.kx())},"$0","eC",0,0,0],
kI:[function(a){var z=J.h(a)
z.cV(a)
$.bf.c.bY($.ae.c.b0(z.gbG(a)))
z=$.bf
z.toString
C.e.ga3(window).I(z.gX())},"$1","kz",2,0,6],
X:function(a){var z=document.querySelector("#status")
P.Y(a)
J.cW(z,"<p>"+H.d(a)+"</p>")},
ke:function(){var z,y
z=new B.iq(H.b([],[B.bm]),!1)
$.cv=z
$.an=4
z.b=!1
y=document.querySelector("#help")
z=J.cQ(document.querySelector("#help-sign"))
H.b(new W.F(0,z.a,z.b,W.A(new Z.kf(y)),!1),[H.v(z,0)]).F()
z=J.cQ(y)
H.b(new W.F(0,z.a,z.b,W.A(new Z.kg(y)),!1),[H.v(z,0)]).F()
z=C.z.b_(window)
H.b(new W.F(0,z.a,z.b,W.A(new Z.kh()),!1),[H.v(z,0)]).F()},
kq:function(){var z,y
Z.X("Changing pallete...")
z=$.$get$c3()
y=$.cz+1
$.cz=y
W.aM(z[C.a.J(y,3)],null,null).I(new Z.kr())},
kE:function(){var z,y
Z.X("Loading precise shader...")
z=$.$get$c4()
y=$.cA+1
$.cA=y
W.aM(z[C.a.J(y,2)],null,null).I(new Z.kF())},
hV:{"^":"a;a",
j:function(a){return C.R.h(0,this.a)}},
fY:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch",
fa:function(a,b){var z,y,x
z=J.bP(this.a,35633)
J.bT(this.a,z,a)
J.bO(this.a,z)
if(J.bk(this.a,z,35713)!==!0){P.Y(J.a5(this.a,z))
Z.X(J.a5(this.a,z))
throw H.c(P.a7(J.a5(this.a,z)))}y=J.bP(this.a,35632)
J.bT(this.a,y,b)
J.bO(this.a,y)
if(J.bk(this.a,y,35713)!==!0){P.Y(J.a5(this.a,y))
Z.X(J.a5(this.a,y))
throw H.c(P.a7(J.a5(this.a,y)))}x=J.eW(this.a)
J.bN(this.a,x,z)
J.bN(this.a,x,y)
J.cU(this.a,x)
if(J.bS(this.a,x,35714)!==!0){P.Y(J.aH(this.a,x))
Z.X(J.aH(this.a,x))
throw H.c(P.a7(J.aH(this.a,x)))}J.d0(this.a,x)
return x},
d2:function(a){var z,y,x
z=J.bP(this.a,35632)
J.bT(this.a,z,a)
J.bO(this.a,z)
if(J.bk(this.a,z,35713)!==!0){P.Y(J.a5(this.a,z))
Z.X(J.a5(this.a,z))
throw H.c(P.a7(J.a5(this.a,z)))}y=this.b
if(y!=null){x=J.cT(this.a,y)
y=J.M(x)
J.eY(this.a,this.b,y.h(x,1))
J.eX(this.a,y.h(x,1))
J.bN(this.a,this.b,z)
J.cU(this.a,this.b)
if(J.bS(this.a,this.b,35714)!==!0){P.Y(J.aH(this.a,this.b))
Z.X(J.aH(this.a,this.b))
throw H.c(P.a7(J.aH(this.a,this.b)))}J.d0(this.a,this.b)}},
fb:function(){var z,y,x,w,v,u,t,s
z=J.ap(this.a,this.b,"u_color")
y=J.ap(this.a,this.b,"u_viewport")
x=J.ap(this.a,this.b,"u_kmax")
w=J.ap(this.a,this.b,"u_range")
this.bY(H.b(new P.z(-0.8,0.156),[null]))
v=this.a
v.uniform2f(y,J.bR(v),J.bQ(this.a))
v=this.a
u=this.z
t=J.q(u.b,u.d)
s=this.z
J.fx(v,w,u.a,t,J.q(s.a,s.c),this.z.b)
J.fw(this.a,z,new Float32Array(H.bF([0.5,0.9,0.9,1])))
if(x!=null)J.fu(this.a,x,this.c)},
f9:function(){var z=this.r
this.br(this.b,"a_texture",this.y,z)
this.br(this.b,"a_position",this.x,z)
this.ch=this.br(this.b,"a_range",this.ca(),z)},
ee:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=J.fi(this.a,a,b)
if(z===-1){P.Y('No such attribute: "'+b+'" in program '+J.Z(a))
y=J.bS(this.a,a,35721)
if(typeof y!=="number")return H.k(y)
x=0
for(;x<y;++x){w=J.fh(this.a,a,x)
v=H.d(w.type)+" "+H.d(w.name)+" "+H.d(w.size)
H.eG(v)}u=J.f0(J.cT(this.a,a),new Z.fZ(this))
P.Y(J.fl(this.a,u))
return}t=J.eV(this.a)
J.bh(this.a,34962,t)
J.cJ(this.a,34962,c,35044)
J.fy(this.a,z,d,e,!1,0,0)
J.f_(this.a,z)
J.bh(this.a,34962,null)
return t},
br:function(a,b,c,d){return this.ee(a,b,c,d,5126)},
ca:function(){var z,y,x,w,v,u,t,s,r,q
z=this.z
y=J.q(z.b,z.d)
x=this.z
x=J.q(x.a,x.c)
w=this.z
v=w.b
u=w.a
w=J.q(v,w.d)
t=this.z
t=J.q(t.a,t.c)
s=this.z
r=J.q(s.a,s.c)
q=this.z
return new Float32Array(H.bF([z.a,y,x,v,u,v,u,w,t,s.b,r,J.q(q.b,q.d)]))},
ah:function(a,b){var z,y,x
z=this.z.c
if(typeof z!=="number")return H.k(z)
this.z=b
if(1/z<1000){z=b.c
if(typeof z!=="number")return H.k(z)
z=1/z>=1000}else z=!1
if(z);z=this.ch
y=this.ca()
J.bh(this.a,34962,z)
J.cJ(this.a,34962,y,35044)
J.bh(this.a,34962,null)
y=this.z
y=J.q(y.c,y.d)
if(typeof y!=="number")return y.N()
x=J.ap(this.a,this.b,"u_spot_radius")
if(x!=null)J.d_(this.a,x,y/500)},
di:function(a,b,c){var z,y
switch(b){case 1:z=this.z
y=c.length
if(0>=y)return H.e(c,0)
c[0]=z.a
if(1>=y)return H.e(c,1)
c[1]=z.b
return 2
case 2:z=this.z
y=c.length
if(0>=y)return H.e(c,0)
c[0]=z.a
if(1>=y)return H.e(c,1)
c[1]=z.b
if(2>=y)return H.e(c,2)
c[2]=z.c
if(3>=y)return H.e(c,3)
c[3]=z.d
return 4}return 0},
b0:function(a){var z,y,x,w,v,u
z=J.R(a.a,this.z.c)
y=J.bR(this.a)
if(typeof z!=="number")return z.N()
if(typeof y!=="number")return H.k(y)
x=this.z
w=x.a
if(typeof w!=="number")return H.k(w)
x=J.R(a.b,x.d)
v=J.bQ(this.a)
if(typeof x!=="number")return x.N()
if(typeof v!=="number")return H.k(v)
u=this.z.b
if(typeof u!=="number")return H.k(u)
return H.b(new P.z(z/y+w,x/v+u),[null])},
bY:function(a){var z,y,x,w,v
z=J.ap(this.a,this.b,"u_c")
if(z==null)return
this.e=a
y=a.a
x=a.b
J.fv(this.a,z,y,x)
w=(1+Math.sqrt(H.es(1+4*Math.sqrt(H.es(J.q(J.R(y,y),J.R(x,x)))))))/2
x=-w
y=2*w
this.ah(0,P.a1(x,x,y,y,null))
v=J.ap(this.a,this.b,"u_R")
if(v!=null)J.d_(this.a,v,w)},
$isdO:1},
fZ:{"^":"f:1;a",
$1:function(a){return J.bk(this.a.a,a,35663)===35633}},
kx:{"^":"f:3;",
$1:function(a){return W.aM("julia.fs.glsl",null,null).I(new Z.kw(a))}},
kw:{"^":"f:3;a",
$1:function(a){var z,y
z=$.$get$c4()
y=$.cA
if(y>=2)return H.e(z,y)
return W.aM(z[y],null,null).I(new Z.kv(this.a,a))}},
kv:{"^":"f:3;a,b",
$1:function(a){var z,y
z=$.$get$c3()
y=$.cz
if(y>=3)return H.e(z,y)
return W.aM(z[y],null,null).I(new Z.ku(this.a,this.b,a))}},
ku:{"^":"f:3;a,b,c",
$1:function(a){var z,y
z=this.c
$.cs=z
$.cr=a
y=this.a
z=Z.dh("mandel",y,J.q(z,a))
$.ae=z
$.eE=Z.d6(z)
y=Z.dh("julia",y,this.b)
$.bf=y
y.c.ah(0,P.a1(-2,-2,4,4,null))
$.kp=Z.d6($.bf)
y=J.f9($.ae.a)
H.b(new W.F(0,y.a,y.b,W.A(Z.kz()),!1),[H.v(y,0)]).F()
y=J.fb($.ae.a)
H.b(new W.F(0,y.a,y.b,W.A(new Z.kt()),!1),[H.v(y,0)]).F()
y=document.body
y.children
y.appendChild($.$get$bg().z)
y=$.$get$bg().z
z=y.style
z.position="absolute"
z=y.style
z.top="0px"
z=y.style
z.right="0px"
z=$.ae
z.toString
C.e.ga3(window).I(z.gX())
z=$.bf
z.toString
C.e.ga3(window).I(z.gX())
Z.X("")}},
kt:{"^":"f:4;",
$1:function(a){if(($.eE.b&4)!==0)Z.kI(a)}},
kf:{"^":"f:1;a",
$1:function(a){return J.bj(this.a).Z(0,"hide")}},
kg:{"^":"f:1;a",
$1:function(a){return J.bj(this.a).A(0,"hide")}},
kh:{"^":"f:21;",
$1:function(a){if(J.f2(a)===112)Z.kq()
if(a.charCode===100)Z.kE()}},
kr:{"^":"f:3;",
$1:function(a){var z
$.cr=a
$.ae.c.d2(J.q($.cs,a))
Z.X("")
z=$.ae
z.toString
C.e.ga3(window).I(z.gX())}},
kF:{"^":"f:3;",
$1:function(a){var z
$.cs=a
$.ae.c.d2(J.q(a,$.cr))
Z.X("")
z=$.ae
z.toString
C.e.ga3(window).I(z.gX())}},
fS:{"^":"a;b2:a>,b,c"},
h8:{"^":"a;a,b,c,d,e",
c0:function(a,b,c){J.cW(this.d,b)
if(c!=null)J.bj(this.d).A(0,c)},
c_:function(a,b){return this.c0(a,b,null)},
h6:[function(a){var z,y
$.$get$bg().a.dv(0)
z=J.J(a,this.e)
if(typeof z!=="number")return z.N()
this.e=a
$.cv.b6(z/1000)
z=this.c
J.eU(z.a,0,0,0,1)
J.eT(z.a,16384)
J.eZ(z.a,4,0,C.a.aR(z.x.length,z.r))
$.$get$bg().f_()
if($.cv.a.length>0){z=window
y=this.gX()
C.e.c9(z)
C.e.cn(z,W.A(y))}},"$1","gX",2,0,22],
dL:function(a,b,c){var z,y,x,w,v,u
z=document
y=z.createElement("div")
y.id=a
document.body.appendChild(y)
z=document
z=z.createElement("div")
this.d=z
J.bj(z).A(0,"field-status")
z=J.h(y)
z.gam(y).A(0,this.d)
x=y.clientWidth
w=y.clientHeight
v=document
u=v.createElement("canvas")
if(x!=null)J.cX(u,x)
if(w!=null)J.cV(u,w)
this.a=u
x=J.fk(u,!1)
this.b=x
if(x==null){this.c0(0,"\u041f\u0440\u043e\u0441\u0442\u0438\u0442\u0435, \u0432\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 WebGl http://webglreport.com/","error")
throw H.c(new P.aR("http://webglreport.com/"))}J.d1(x,0,0,J.cS(this.a),J.cO(this.a))
x=C.C.b_(window)
H.b(new W.F(0,x.a,x.b,W.A(new Z.h9(this,y)),!1),[H.v(x,0)]).F()
z.gam(y).A(0,this.a)
z=this.b
x=$.h_
w=-x
w=new Z.fY(z,null,250,null,null,C.U,2,new Float32Array(H.bF([w,w,x,x,w,x,w,w,x,x,x,w])),new Float32Array(H.bF([0,0,1,1,0,1,0,0,1,1,1,0])),P.a1(-2,-1.5,3,3,null),null,null)
w.b=w.fa(b,c)
w.f9()
w.fb()
this.c=w
w=w.z.c
if(typeof w!=="number")return H.k(w)
this.c_(0,"zoom: "+H.d(1/w))},
q:{
dh:function(a,b,c){var z=new Z.h8(null,null,null,null,0)
z.dL(a,b,c)
return z}}},
h9:{"^":"f:1;a,b",
$1:function(a){var z,y
z=this.a
y=this.b
J.cX(z.a,y.clientWidth)
J.cV(z.a,y.clientHeight)
J.d1(z.b,0,0,J.cS(z.a),J.cO(z.a))
C.e.ga3(window).I(z.gX())}},
fJ:{"^":"a;a,b,c,d,e,f,r,x",
bR:function(){var z,y
z=this.c
y=z.c.z.c
if(typeof y!=="number")return H.k(y)
z.c_(0,"zoom: "+H.d(1/y))},
h9:[function(a,b){var z,y
z=this.b
y=J.f1(b)
if(typeof y!=="number")return H.k(y)
this.b=(z|C.a.bb(1,y))>>>0
this.e=H.b(new P.z(b.clientX,b.clientY),[null])},"$1","gaJ",2,0,4],
ha:[function(a,b){var z
if((this.b&1)>0){z=J.h(b)
this.c.a.dispatchEvent(W.fN("fielddrag",!0,!0,new Z.fS(J.J(z.gaY(b),this.e),this.b,b)))
this.e=z.gaY(b)}this.bR()},"$1","gaK",2,0,4],
hb:[function(a,b){this.b=0
this.e=null},"$1","gb3",2,0,4],
h7:[function(a){var z,y,x,w,v,u
z=this.c
y=z.c
x=J.f8(J.f3(a))
y.toString
w=J.R(x.gm(x),y.z.c)
v=J.bQ(y.a)
if(typeof w!=="number")return w.N()
if(typeof v!=="number")return H.k(v)
x=J.R(x.b,y.z.d)
y=J.bR(y.a)
if(typeof x!=="number")return x.N()
if(typeof y!=="number")return H.k(y)
u=H.b(new P.z(w/v,x/y),[null])
y=this.x
if(y!=null)y.ao()
y=z.c
x=J.J(y.z.a,u.a)
w=J.J(z.c.z.b,u.b)
v=y.z
y.ah(0,P.a1(x,w,v.c,v.d,null))
z.toString
C.e.ga3(window).I(z.gX())
this.bR()},"$1","gfq",2,0,23],
hc:[function(a){this.bU(this.c.c.b0(J.f4(a)),1.62)},"$1","gfu",2,0,4],
bU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.c
y=z.c.z
x=this.x
if(x!=null){x=x.gb5()
if(0>=x.length)return H.e(x,0)
x=x[0]
w=this.x.gb5()
if(1>=w.length)return H.e(w,1)
w=w[1]
v=this.x.gb5()
if(2>=v.length)return H.e(v,2)
v=v[2]
u=this.x.gb5()
if(3>=u.length)return H.e(u,3)
y=P.a1(x,w,v,u[3],null)}x=y.c
if(typeof x!=="number")return x.N()
t=x/b
w=y.d
if(typeof w!=="number")return w.N()
s=w/b
r=H.b(new P.z(J.q(y.a,x/2),J.q(y.b,w/2)),[null])
w=r.a
x=J.J(a.a,w)
if(typeof x!=="number")return x.N()
x=J.q(w,x/3)
w=r.b
v=J.J(a.b,w)
if(typeof v!=="number")return v.N()
q=H.b(new P.z(x,J.q(w,v/3)),[null])
p=J.J(q.a,t/2)
o=J.J(q.b,s/2)
x=this.x
if(x!=null)x.ao()
z.c.ah(0,P.a1(p,o,t,s,null))
z.toString
C.e.ga3(window).I(z.gX())
this.bR()},
h8:[function(a){},"$1","gfs",2,0,6],
dJ:function(a){var z,y,x
z=this.c.a
y=J.h(z)
x=y.gaJ(z)
H.b(new W.F(0,x.a,x.b,W.A(this.gaJ(this)),!1),[H.v(x,0)]).F()
x=y.gb3(z)
H.b(new W.F(0,x.a,x.b,W.A(this.gb3(this)),!1),[H.v(x,0)]).F()
x=y.gaK(z)
H.b(new W.F(0,x.a,x.b,W.A(this.gaK(this)),!1),[H.v(x,0)]).F()
x=y.gcS(z)
H.b(new W.F(0,x.a,x.b,W.A(this.gfu()),!1),[H.v(x,0)]).F()
x=this.f
x=H.b(new W.cl(z,x.a,!1),[H.v(x,0)])
H.b(new W.F(0,x.a,x.b,W.A(this.gfq()),!1),[H.v(x,0)]).F()
x=y.gbI(z)
H.b(new W.F(0,x.a,x.b,W.A(this.gfs()),!1),[H.v(x,0)]).F()
y=y.gcT(z)
H.b(new W.F(0,y.a,y.b,W.A(new Z.fK(this)),!1),[H.v(y,0)]).F()},
q:{
d6:function(a){var z=new Z.fJ(5,0,a,!1,null,H.b(new W.O("fielddrag"),[null]),H.b(new W.O("fieldupdate"),[null]),null)
z.dJ(a)
return z}}},
fK:{"^":"f:24;a",
$1:function(a){var z=J.h(a).gcE(a)
if(typeof z!=="number")return z.O()
if(z>0){z=this.a
z.bU(z.c.c.b0(H.b(new P.z(a.layerX,a.layerY),[null])),0.6172839506172839)}z=C.u.gcE(a)
if(typeof z!=="number")return z.M()
if(z<0){z=this.a
z.bU(z.c.c.b0(C.u.gbG(a)),1.62)}}}},1],["","",,B,{"^":"",bm:{"^":"a;",
ad:["dC",function(a){this.a=-2
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
ao:function(){this.cx=!0},
gfg:function(){return this.ch===!0||this.cx===!0},
al:function(a){var z
if(this.db!=null){z=this.dx
if(typeof z!=="number")return z.ag()
z=(z&a)>0}else z=!1
if(z)this.a4(a,this)},
b6:function(a){var z,y,x
if(this.z!==!0||this.cy===!0||this.cx===!0)return
this.y=a
if(this.Q!==!0){z=this.x
if(typeof z!=="number")return z.w()
y=this.e
if(typeof y!=="number")return H.k(y)
if(z+a>=y){this.fc()
this.Q=!0
this.c=!0
this.a=0
z=this.y
y=this.e
x=this.x
if(typeof y!=="number")return y.E()
if(typeof x!=="number")return H.k(x)
if(typeof z!=="number")return z.E()
this.y=z-(y-x)
this.x=0
this.al(1)
this.al(2)}}if(this.Q===!0){z=this.c!==!0
if(z){y=this.b
if(typeof y!=="number")return y.at()
y=this.a
if(typeof y!=="number")return y.M()
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
a=0-z
z=this.y
if(typeof z!=="number")return z.E()
this.y=z-a
this.x=0
this.al(1)
this.al(2)
z=this.a
if(typeof z!=="number")return z.E()
this.ae(z,z-1,this.c,a)}else{if(z){z=this.b
if(typeof z!=="number")return z.at()
y=this.a
if(typeof y!=="number")return y.O()
if(y>z*2){z=this.x
y=this.y
if(typeof z!=="number")return z.w()
if(typeof y!=="number")return H.k(y)
y=z+y<0
z=y}else z=!1}else z=!1
if(z){this.c=!0
z=this.b
if(typeof z!=="number")return z.a0()
this.a=z*2
z=this.x
if(typeof z!=="number")return H.k(z)
a=0-z
z=this.y
if(typeof z!=="number")return z.E()
this.y=z-a
this.x=this.f
this.al(16)
this.al(32)
z=this.a
if(typeof z!=="number")return z.w()
this.ae(z,z+1,this.c,a)}}this.fQ()
z=this.b
if(typeof z!=="number")return z.at()
y=this.a
if(typeof y!=="number")return y.O()
z=y>z*2||y<0
this.ch=z}z=this.x
y=this.y
if(typeof z!=="number")return z.w()
if(typeof y!=="number")return H.k(y)
this.x=z+y
this.y=0},
fQ:function(){var z,y,x,w,v,u,t
while(!0){z=this.a
if(typeof z!=="number")return z.at()
if(z>=0){y=this.b
if(typeof y!=="number")return y.a0()
y=z<=y*2}else y=!1
if(!y){y=this.b
if(typeof y!=="number")return y.M()
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
if(typeof y!=="number")return y.E()
this.y=y-t
this.x=this.f
if(this.d===!0&&Math.abs(C.a.J(z,4))===2)this.cJ()
else this.cI()
if(this.db!=null){z=this.dx
if(typeof z!=="number")return z.ag()
z=(z&32)>0}else z=!1
if(z)this.a4(32,this)
z=this.a
if(typeof z!=="number")return z.w()
this.ae(z,z+1,this.c,t)}else{if(w){w=this.x
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
if(typeof y!=="number")return y.E()
if(typeof x!=="number")return H.k(x)
t=y-x
x=this.y
if(typeof x!=="number")return x.E()
this.y=x-t
this.x=0
if(this.d===!0&&Math.abs(C.a.J(z,4))===2)this.cI()
else this.cJ()
if(this.db!=null){z=this.dx
if(typeof z!=="number")return z.ag()
z=(z&2)>0}else z=!1
if(z)this.a4(2,this)
z=this.a
if(typeof z!=="number")return z.E()
this.ae(z,z-1,this.c,t)}else{if(x){w=this.x
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
if(typeof y!=="number")return y.E()
this.y=y-t
this.x=0
this.ae(z,z+1,!1,t)
if(this.db!=null){z=this.dx
if(typeof z!=="number")return z.ag()
z=(z&64)>0}else z=!1
if(z)this.a4(64,this)
z=this.a
if(typeof z!=="number")return z.M()
if(z<0){z=this.b
if(typeof z!=="number")return z.at()
z=!0}else z=!1
if(z){if(this.db!=null){z=this.dx
if(typeof z!=="number")return z.ag()
z=(z&128)>0}else z=!1
if(z)this.a4(128,this)}else this.x=this.r}else{if(x){w=this.x
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
if(typeof y!=="number")return y.E()
if(typeof x!=="number")return H.k(x)
t=y-x
x=this.y
if(typeof x!=="number")return x.E()
this.y=x-t
this.x=y
this.ae(z,z-1,!1,t)
if(this.db!=null){z=this.dx
if(typeof z!=="number")return z.ag()
z=(z&4)>0}else z=!1
if(z)this.a4(4,this)
z=this.a
y=this.b
if(typeof y!=="number")return y.a0()
if(typeof z!=="number")return z.O()
if(z>y*2&&!0){if(this.db!=null){z=this.dx
if(typeof z!=="number")return z.ag()
z=(z&8)>0}else z=!1
if(z)this.a4(8,this)}this.x=0}else{t=this.y
if(x){if(typeof t!=="number")return t.E()
this.y=t-t
x=this.x
if(typeof x!=="number")return x.w()
this.x=x+t
this.ae(z,z,y,t)
break}else{if(typeof t!=="number")return t.E()
this.y=t-t
z=this.x
if(typeof z!=="number")return z.w()
this.x=z+t
break}}}}}}},
a4:function(a,b){return this.db.$2(a,b)}},hT:{"^":"a;a,b,c",
dN:function(a,b){this.a=P.br(null,null)}},hU:{"^":"a;a,b",
ft:function(a){return this.a.$1(a)}},b9:{"^":"bm;fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx",
ad:function(a){var z,y
this.dC(this)
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
y=$.an
if(z!==y)this.y1=new Float32Array(H.eh(y))
z=this.y2.length
y=(2+$.ci)*$.an
if(z!==y)this.y2=new Float32Array(H.eh(y))},
gb5:function(){return this.x1},
fc:function(){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.fy==null)return
z=this.ry
this.e7(z)
y=this.x2
x=y.length
w=z.length
v=this.x1
u=v.length
t=0
while(!0){s=this.r2
if(typeof s!=="number")return H.k(s)
if(!(t<s))break
if(t>=u)return H.e(v,t)
s=v[t]
if(this.r1===!0){if(t>=w)return H.e(z,t)
r=z[t]}else r=0
v[t]=J.q(s,r)
q=0
while(!0){s=this.rx
if(typeof s!=="number")return H.k(s)
if(!(q<s))break
s=this.r2
if(typeof s!=="number")return H.k(s)
s=q*s+t
if(s>=x)return H.e(y,s)
r=y[s]
if(this.r1===!0){if(t>=w)return H.e(z,t)
p=z[t]}else p=0
y[s]=C.G.w(r,p);++q}if(this.k4===!0){if(t>=w)return H.e(z,t)
o=z[t]
z[t]=v[t]
v[t]=o}++t}},
ae:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
if(this.fy==null||this.k2==null)return
z=c!==!0
if(z){if(typeof a!=="number")return a.O()
if(typeof b!=="number")return H.k(b)
y=a>b}else y=!1
if(y){if(this.d===!0){if(typeof b!=="number")return b.J()
z=Math.abs(C.a.J(b,4))===2}else z=!1
this.a6(z?this.ry:this.x1)
return}if(z){if(typeof a!=="number")return a.M()
if(typeof b!=="number")return H.k(b)
z=a<b}else z=!1
if(z){if(this.d===!0){if(typeof b!=="number")return b.J()
z=Math.abs(C.a.J(b,4))===2}else z=!1
this.a6(z?this.x1:this.ry)
return}z=this.f
if(typeof z!=="number")return z.M()
y=z<1e-11
if(y){if(typeof d!=="number")return d.O()
x=d>-1e-11}else x=!1
if(x){if(this.d===!0){if(typeof a!=="number")return a.J()
z=Math.abs(C.a.J(a,4))===2}else z=!1
this.a6(z?this.x1:this.ry)
return}if(y){if(typeof d!=="number")return d.M()
y=d<1e-11}else y=!1
if(y){if(this.d===!0){if(typeof a!=="number")return a.J()
z=Math.abs(C.a.J(a,4))===2}else z=!1
this.a6(z?this.ry:this.x1)
return}if(this.d===!0){if(typeof a!=="number")return a.J()
y=Math.abs(C.a.J(a,4))===2}else y=!1
w=this.x
if(y){if(typeof w!=="number")return H.k(w)
w=z-w}y=this.k2
if(typeof w!=="number")return w.N()
v=y.h3(w/z)
if(this.rx===0||this.k3==null){z=this.ry
y=z.length
x=this.x1
u=x.length
t=J.cB(v)
s=0
while(!0){r=this.r2
if(typeof r!=="number")return H.k(r)
if(!(s<r))break
r=this.y1
if(s>=y)return H.e(z,s)
q=z[s]
if(s>=u)return H.e(x,s)
q=J.q(q,t.a0(v,J.J(x[s],q)))
if(s>=r.length)return H.e(r,s)
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
if(s>=u)return H.e(x,s)
o=x[s]
n=p.length
if(0>=n)return H.e(p,0)
p[0]=o
o=this.rx
if(typeof o!=="number")return H.k(o)
m=1+o
if(s>=r)return H.e(t,s)
l=t[s]
if(m>=n)return H.e(p,m)
p[m]=l
for(k=0;k<o;k=j){j=k+1
m=k*q+s
if(m>=y)return H.e(z,m)
m=z[m]
if(j>=n)return H.e(p,j)
p[j]=m}q=this.y1
o=this.k3.h4(v,p,o+2)
if(s>=q.length)return H.e(q,s)
q[s]=o;++s}}this.a6(this.y1)},
cJ:function(){if(this.fy==null)return
this.a6(this.ry)},
cI:function(){if(this.fy==null)return
this.a6(this.x1)},
e7:function(a){var z=this.id
if(z!=null)return z.fU(this.fy,this,this.k1,a)
else{z=this.fy
if(!!J.l(z).$isdO)return z.di(this,this.k1,a)}return 0},
a6:function(a){var z,y,x,w,v,u
z=this.id
if(z!=null)z.fW(this.fy,this,this.k1,a)
else{z=this.fy
y=J.l(z)
if(!!y.$isdO){x=this.k1
z.toString
switch(x){case 1:x=a.length
if(0>=x)return H.e(a,0)
w=a[0]
if(1>=x)return H.e(a,1)
x=a[1]
v=z.z
y.ah(z,P.a1(w,x,v.c,v.d,null))
break
case 2:x=a.length
if(0>=x)return H.e(a,0)
w=a[0]
if(1>=x)return H.e(a,1)
v=a[1]
if(2>=x)return H.e(a,2)
u=a[2]
if(3>=x)return H.e(a,3)
y.ah(z,P.a1(w,v,u,a[3],null))
break}}}}},jY:{"^":"f:9;",
$1:function(a){a.ad(0)}},jZ:{"^":"f:9;",
$1:function(a){J.fq(a)}},jX:{"^":"f:0;",
$0:function(){var z,y,x,w,v
z=H.b(new Array($.an),[P.I])
y=new Array($.an)
y.fixed$length=Array
y=H.b(y,[P.I])
x=H.b(new Array($.ci*$.an),[P.I])
w=H.b(new Array($.an),[P.I])
v=new Array((2+$.ci)*$.an)
v.fixed$length=Array
v=new B.b9(null,null,null,null,null,null,null,null,null,null,z,y,x,w,H.b(v,[P.I]),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
v.ad(0)
return v}},iq:{"^":"a;a,b",
b6:function(a){var z,y
z=this.a
C.b.cz(z,"removeWhere")
C.b.em(z,new B.ir(),!0)
if(!this.b)if(a>=0)for(y=0;y<z.length;++y)z[y].b6(a)
else for(y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
z[y].b6(a)}},
gi:function(a){return this.a.length}},ir:{"^":"f:25;",
$1:function(a){var z
if(a.gfg()&&a.fr===!0){z=$.$get$dM()
if(!z.a.B(0,a)){z.b.ft(a)
z.a.U(a)}return!0}return!1}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dl.prototype
return J.dk.prototype}if(typeof a=="string")return J.b4.prototype
if(a==null)return J.dm.prototype
if(typeof a=="boolean")return J.hy.prototype
if(a.constructor==Array)return J.b2.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b5.prototype
return a}if(a instanceof P.a)return a
return J.bH(a)}
J.M=function(a){if(typeof a=="string")return J.b4.prototype
if(a==null)return a
if(a.constructor==Array)return J.b2.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b5.prototype
return a}if(a instanceof P.a)return a
return J.bH(a)}
J.ad=function(a){if(a==null)return a
if(a.constructor==Array)return J.b2.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b5.prototype
return a}if(a instanceof P.a)return a
return J.bH(a)}
J.aC=function(a){if(typeof a=="number")return J.b3.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.ba.prototype
return a}
J.cB=function(a){if(typeof a=="number")return J.b3.prototype
if(typeof a=="string")return J.b4.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.ba.prototype
return a}
J.ew=function(a){if(typeof a=="string")return J.b4.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.ba.prototype
return a}
J.h=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.b5.prototype
return a}if(a instanceof P.a)return a
return J.bH(a)}
J.q=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.cB(a).w(a,b)}
J.N=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).t(a,b)}
J.eM=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aC(a).O(a,b)}
J.eN=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aC(a).M(a,b)}
J.R=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.cB(a).a0(a,b)}
J.J=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aC(a).E(a,b)}
J.cH=function(a,b){return J.aC(a).aR(a,b)}
J.cI=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.ez(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.M(a).h(a,b)}
J.eO=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.ez(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.ad(a).u(a,b,c)}
J.eP=function(a,b,c,d){return J.h(a).dX(a,b,c,d)}
J.bM=function(a,b,c,d,e){return J.h(a).ed(a,b,c,d,e)}
J.eQ=function(a,b){return J.h(a).ek(a,b)}
J.eR=function(a,b,c,d){return J.h(a).el(a,b,c,d)}
J.eS=function(a,b,c){return J.h(a).en(a,b,c)}
J.bN=function(a,b,c){return J.h(a).ew(a,b,c)}
J.bh=function(a,b,c){return J.h(a).ey(a,b,c)}
J.cJ=function(a,b,c,d){return J.h(a).eA(a,b,c,d)}
J.eT=function(a,b){return J.ad(a).eE(a,b)}
J.eU=function(a,b,c,d,e){return J.h(a).eF(a,b,c,d,e)}
J.bO=function(a,b){return J.h(a).eG(a,b)}
J.eV=function(a){return J.h(a).eL(a)}
J.cK=function(a,b,c,d){return J.h(a).W(a,b,c,d)}
J.eW=function(a){return J.h(a).eN(a)}
J.bP=function(a,b){return J.h(a).eO(a,b)}
J.eX=function(a,b){return J.h(a).eP(a,b)}
J.eY=function(a,b,c){return J.h(a).eV(a,b,c)}
J.eZ=function(a,b,c,d){return J.h(a).eW(a,b,c,d)}
J.bi=function(a,b){return J.ad(a).H(a,b)}
J.f_=function(a,b){return J.h(a).eZ(a,b)}
J.f0=function(a,b){return J.ad(a).cH(a,b)}
J.cL=function(a,b){return J.ad(a).G(a,b)}
J.cM=function(a){return J.h(a).gex(a)}
J.f1=function(a){return J.h(a).geB(a)}
J.f2=function(a){return J.h(a).geC(a)}
J.cN=function(a){return J.h(a).gam(a)}
J.bj=function(a){return J.h(a).gcA(a)}
J.f3=function(a){return J.h(a).gcF(a)}
J.bQ=function(a){return J.h(a).geX(a)}
J.bR=function(a){return J.h(a).geY(a)}
J.aF=function(a){return J.h(a).ga9(a)}
J.S=function(a){return J.l(a).gC(a)}
J.cO=function(a){return J.h(a).gk(a)}
J.b_=function(a){return J.ad(a).gD(a)}
J.cP=function(a){return J.h(a).gfj(a)}
J.f4=function(a){return J.h(a).gbG(a)}
J.aG=function(a){return J.M(a).gi(a)}
J.f5=function(a){return J.h(a).gL(a)}
J.f6=function(a){return J.h(a).gfo(a)}
J.f7=function(a){return J.h(a).gfp(a)}
J.f8=function(a){return J.h(a).gb2(a)}
J.cQ=function(a){return J.h(a).gcR(a)}
J.f9=function(a){return J.h(a).gbI(a)}
J.fa=function(a){return J.h(a).gaJ(a)}
J.fb=function(a){return J.h(a).gaK(a)}
J.fc=function(a){return J.h(a).gfw(a)}
J.fd=function(a){return J.h(a).gfz(a)}
J.fe=function(a){return J.h(a).gfF(a)}
J.ff=function(a){return J.h(a).gdA(a)}
J.cR=function(a){return J.h(a).gfI(a)}
J.fg=function(a){return J.h(a).gbQ(a)}
J.cS=function(a){return J.h(a).gl(a)}
J.fh=function(a,b,c){return J.h(a).d7(a,b,c)}
J.cT=function(a,b){return J.h(a).d8(a,b)}
J.fi=function(a,b,c){return J.h(a).d9(a,b,c)}
J.fj=function(a){return J.h(a).bV(a)}
J.fk=function(a,b){return J.h(a).da(a,b)}
J.aH=function(a,b){return J.h(a).dd(a,b)}
J.bS=function(a,b,c){return J.h(a).de(a,b,c)}
J.a5=function(a,b){return J.h(a).df(a,b)}
J.bk=function(a,b,c){return J.h(a).dg(a,b,c)}
J.fl=function(a,b){return J.h(a).dh(a,b)}
J.ap=function(a,b,c){return J.h(a).dj(a,b,c)}
J.cU=function(a,b){return J.h(a).fk(a,b)}
J.fm=function(a,b){return J.ad(a).ac(a,b)}
J.fn=function(a){return J.h(a).cV(a)}
J.fo=function(a){return J.ad(a).fB(a)}
J.fp=function(a,b){return J.h(a).fE(a,b)}
J.fq=function(a){return J.h(a).ad(a)}
J.aI=function(a,b){return J.h(a).aQ(a,b)}
J.fr=function(a,b){return J.h(a).se4(a,b)}
J.cV=function(a,b){return J.h(a).sk(a,b)}
J.fs=function(a,b){return J.h(a).saE(a,b)}
J.cW=function(a,b){return J.h(a).scN(a,b)}
J.cX=function(a,b){return J.h(a).sl(a,b)}
J.bT=function(a,b,c){return J.h(a).du(a,b,c)}
J.cY=function(a){return J.aC(a).ar(a)}
J.ft=function(a){return J.ew(a).fJ(a)}
J.Z=function(a){return J.l(a).j(a)}
J.cZ=function(a){return J.ew(a).fK(a)}
J.d_=function(a,b,c){return J.h(a).fL(a,b,c)}
J.fu=function(a,b,c){return J.h(a).fM(a,b,c)}
J.fv=function(a,b,c,d){return J.h(a).fN(a,b,c,d)}
J.fw=function(a,b,c){return J.h(a).fO(a,b,c)}
J.fx=function(a,b,c,d,e,f){return J.h(a).fP(a,b,c,d,e,f)}
J.d0=function(a,b){return J.h(a).fR(a,b)}
J.fy=function(a,b,c,d,e,f,g){return J.h(a).fS(a,b,c,d,e,f,g)}
J.d1=function(a,b,c,d,e){return J.h(a).fT(a,b,c,d,e)}
I.aD=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.i=W.bX.prototype
C.D=W.aL.prototype
C.E=J.i.prototype
C.b=J.b2.prototype
C.F=J.dk.prototype
C.a=J.dl.prototype
C.G=J.dm.prototype
C.d=J.b3.prototype
C.f=J.b4.prototype
C.N=J.b5.prototype
C.S=W.hO.prototype
C.T=J.hS.prototype
C.V=J.ba.prototype
C.u=W.aS.prototype
C.e=W.iv.prototype
C.v=new H.da()
C.w=new P.hR()
C.x=new P.iO()
C.c=new P.jm()
C.j=new P.af(0)
C.k=H.b(new W.O("click"),[W.V])
C.l=H.b(new W.O("contextmenu"),[W.V])
C.m=H.b(new W.O("dblclick"),[W.ah])
C.y=H.b(new W.O("error"),[W.dC])
C.z=H.b(new W.O("keypress"),[W.bq])
C.A=H.b(new W.O("load"),[W.dC])
C.n=H.b(new W.O("mousedown"),[W.V])
C.o=H.b(new W.O("mousemove"),[W.V])
C.p=H.b(new W.O("mouseup"),[W.V])
C.B=H.b(new W.O("mousewheel"),[W.aS])
C.C=H.b(new W.O("resize"),[W.ah])
C.H=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.I=function(hooks) {
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
C.q=function getTagFallback(o) {
  var constructor = o.constructor;
  if (typeof constructor == "function") {
    var name = constructor.name;
    if (typeof name == "string" &&
        name.length > 2 &&
        name !== "Object" &&
        name !== "Function.prototype") {
      return name;
    }
  }
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.r=function(hooks) { return hooks; }

C.J=function(getTagFallback) {
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
C.L=function(hooks) {
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
C.K=function() {
  function typeNameInChrome(o) {
    var constructor = o.constructor;
    if (constructor) {
      var name = constructor.name;
      if (name) return name;
    }
    var s = Object.prototype.toString.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = Object.prototype.toString.call(object);
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
    getTag: typeNameInChrome,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.M=function(hooks) {
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
C.O=H.b(I.aD(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.u])
C.P=I.aD(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.Q=I.aD([])
C.t=H.b(I.aD(["bind","if","ref","repeat","syntax"]),[P.u])
C.h=H.b(I.aD(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.u])
C.R=new H.h6([0,"Precise.SINGLE",1,"Precise.DOUBLE",2,"Precise.QUART"])
C.U=new Z.hV(0)
C.W=H.b(new W.iK(W.k5()),[W.aS])
$.dz="$cachedFunction"
$.dA="$cachedInvocation"
$.bw=null
$.b8=null
$.a_=0
$.aJ=null
$.d3=null
$.cD=null
$.eo=null
$.eH=null
$.bG=null
$.bI=null
$.cE=null
$.ay=null
$.aW=null
$.aX=null
$.ct=!1
$.o=C.c
$.de=0
$.cg=null
$.ag=null
$.c2=null
$.dc=null
$.db=null
$.h_=1
$.cA=0
$.cz=2
$.cv=null
$.ae=null
$.bf=null
$.eE=null
$.kp=null
$.cs=null
$.cr=null
$.an=3
$.ci=0
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
I.$lazy(y,x,w)}})(["d9","$get$d9",function(){return init.getIsolateTag("_$dart_dartClosure")},"di","$get$di",function(){return H.ht()},"dj","$get$dj",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.de
$.de=z+1
z="expando$key$"+z}return H.b(new P.fX(null,z),[P.r])},"dP","$get$dP",function(){return H.a3(H.bB({
toString:function(){return"$receiver$"}}))},"dQ","$get$dQ",function(){return H.a3(H.bB({$method$:null,
toString:function(){return"$receiver$"}}))},"dR","$get$dR",function(){return H.a3(H.bB(null))},"dS","$get$dS",function(){return H.a3(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"dW","$get$dW",function(){return H.a3(H.bB(void 0))},"dX","$get$dX",function(){return H.a3(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dU","$get$dU",function(){return H.a3(H.dV(null))},"dT","$get$dT",function(){return H.a3(function(){try{null.$method$}catch(z){return z.message}}())},"dZ","$get$dZ",function(){return H.a3(H.dV(void 0))},"dY","$get$dY",function(){return H.a3(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cj","$get$cj",function(){return P.iA()},"aY","$get$aY",function(){return[]},"ea","$get$ea",function(){return P.dp(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"co","$get$co",function(){return P.c8()},"d8","$get$d8",function(){return new H.hC("^\\S+$",H.hD("^\\S+$",!1,!0,!1),null,null)},"c4","$get$c4",function(){return["mandel.fs.glsl","mandel.ds.glsl"]},"c3","$get$c3",function(){return["pal1.glsl","pal2.glsl","pal3.glsl"]},"bg","$get$bg",function(){var z=new P.i9(null,null)
z.dP()
z=new M.i8(z,0,1000,0,0,1000,0,0,0,null,null,null,null,null,null,null)
z.dO()
return z},"dN","$get$dN",function(){var z=H.b(new B.hU(null,null),[B.b9])
z.a=new B.jY()
z.b=new B.jZ()
return z},"dM","$get$dM",function(){var z,y,x
z=$.$get$dN()
y=B.b9
x=H.b(new B.hT(null,z,null),[y])
x.dN(z,y)
x.c=new B.jX()
return x}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,args:[P.u]},{func:1,args:[W.V]},{func:1,args:[,,]},{func:1,v:true,args:[W.V]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.u,args:[P.r]},{func:1,args:[B.b9]},{func:1,ret:P.cw,args:[W.D,P.u,P.u,W.cn]},{func:1,args:[,P.u]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.a],opt:[P.aa]},{func:1,v:true,args:[,],opt:[P.aa]},{func:1,args:[,],opt:[,]},{func:1,args:[,P.aa]},{func:1,v:true,args:[,P.aa]},{func:1,args:[W.aL]},{func:1,v:true,args:[W.p,W.p]},{func:1,args:[P.u,,]},{func:1,args:[W.bq]},{func:1,args:[P.I]},{func:1,args:[W.c_]},{func:1,args:[W.aS]},{func:1,args:[B.bm]},{func:1,ret:P.I},{func:1,ret:P.u,args:[W.y]}]
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
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.kG(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
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
Isolate.aD=a.aD
Isolate.ac=a.ac
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.eJ(Z.eC(),b)},[])
else (function(b){H.eJ(Z.eC(),b)})([])})})()