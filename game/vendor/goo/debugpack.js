/* Goo Engine debugpack 
 * Copyright 2015 Goo Technologies AB
 */
(function(window){function f(){"use strict";
define("goo/debugpack/BoundingVolumeMeshBuilder",["goo/renderer/bounds/BoundingBox","goo/renderer/bounds/BoundingSphere","goo/util/MeshBuilder","goo/renderer/MeshData","goo/math/Transform"],function(e,t,n,r,i){function s(){}function o(e,t,n){var i=[e,t,n,e,t,-n,e,-t,n,e,-t,-n,-e,t,n,-e,t,-n,-e,-t,n,-e,-t,-n],s=[0,1,0,2,1,3,2,3,4,5,4,6,5,7,6,7,0,4,1,5,2,6,3,7],o=new r(r.defaultMap([r.POSITION]),i.length/3,s.length);return o.getAttributeBuffer(r.POSITION).set(i),o.getIndexBuffer().set(s),o.indexLengths=null,o.indexModes=["Lines"],o}function u(e,t){e=e||1,t=t||8;var n=[],i=[],s=Math.PI*2/t;for(var o=0,u=0;o<t;o++,u+=s)n.push(Math.cos(u)*e,Math.sin(u)*e,0),i.push(o,o+1);i[i.length-1]=0;var a=new r(r.defaultMap([r.POSITION]),t,i.length);return a.getAttributeBuffer(r.POSITION).set(n),a.getIndexBuffer().set(i),a.indexLengths=null,a.indexModes=["Lines"],a}function a(e){e=e||1;var t=new n,r=128,s=u(e,r),o;o=new i,t.addMeshData(s,o),o=new i,o.rotation.fromAngles(0,Math.PI/2,0),o.update(),t.addMeshData(s,o),o=new i,o.rotation.fromAngles(Math.PI/2,Math.PI/2,0),o.update(),t.addMeshData(s,o);var a=t.build();return a[0]}return s.buildBox=function(e){var t=o(e.xExtent,e.yExtent,e.zExtent);return t},s.buildSphere=function(e){var t=a(e.radius);return t},s.build=function(n){if(n instanceof e)return s.buildBox(n);if(n instanceof t)return s.buildSphere(n)},s}),define("goo/debugpack/shapes/LightDebug",["goo/renderer/MeshData","goo/util/MeshBuilder","goo/math/Transform","goo/shapes/Sphere","goo/renderer/light/PointLight","goo/renderer/light/DirectionalLight","goo/renderer/light/SpotLight"],function(e,t,n,r,i,s,o){function u(){this._ball=new r(12,12,.3),this._pointLightMesh=u._buildPointLightMesh(),this._spotLightMesh=u._buildSpotLightMesh(),this._directionalLightMesh=u._buildDirectionalLightMesh()}function a(t,n){t=t||1,n=n||8;var r=[],i=[],s=Math.PI*2/n;for(var o=0,u=0;o<n;o++,u+=s)r.push(Math.cos(u)*t,Math.sin(u)*t,0),i.push(o,o+1);i[i.length-1]=0;var a=new e(e.defaultMap([e.POSITION]),n,i.length);return a.getAttributeBuffer(e.POSITION).set(r),a.getIndexBuffer().set(i),a.indexLengths=null,a.indexModes=["Lines"],a}function f(){var e=1,r=new t,i=128,s=a(e,i),o;o=new n,r.addMeshData(s,o),o=new n,o.rotation.fromAngles(0,Math.PI/2,0),o.update(),r.addMeshData(s,o),o=new n,o.rotation.fromAngles(Math.PI/2,Math.PI/2,0),o.update(),r.addMeshData(s,o);var u=r.build();return u[0]}function l(t){t=t||8;var n=[0,0,0],r=[],i=Math.PI*2/t;for(var s=0,o=0;s<t;s++,o+=i)n.push(Math.cos(o),Math.sin(o),1),r.push(0,s+1);var u=new e(e.defaultMap([e.POSITION]),t+1,r.length);return u.getAttributeBuffer(e.POSITION).set(n),u.getIndexBuffer().set(r),u.indexLengths=null,u.indexModes=["Lines"],u}function c(){var e=-1,r=new t,i=64,s=2,o=e/2,u=o;for(var f=1;f<=s;f++){var c=a(u*f,i),h=new n;h.translation.set(0,0,o*f),h.update(),r.addMeshData(c,h)}var p=l(4),h=new n;h.scale.set(u*s,u*s,o*s),h.update(),r.addMeshData(p,h);var d=r.build();return d[0]}function h(t){t=t||8;var n=[],r=[],i=Math.PI*2/t;for(var s=0,o=0;s<t;s++,o+=i)n.push(Math.cos(o),Math.sin(o),0),n.push(Math.cos(o),Math.sin(o),1),r.push(s*2,s*2+1);var u=new e(e.defaultMap([e.POSITION]),t*2,r.length);return u.getAttributeBuffer(e.POSITION).set(n),u.getIndexBuffer().set(r),u.indexLengths=null,u.indexModes=["Lines"],u}function p(){var e=new t,r=64,i=2,s=10/i,o=1;for(var u=0;u<i;u++){var f=a(o,r),l=new n;l.translation.set(0,0,-s*u),l.update(),e.addMeshData(f,l)}var c=h(4),l=new n;l.scale.set(o,o,-s*i),l.update(),e.addMeshData(c,l);var p=e.build();return p[0]}return u.prototype.getMesh=function(e,t){if(e instanceof i)return t.full?[this._ball,this._pointLightMesh]:[this._ball];if(e instanceof o)return t.full?[this._ball,this._spotLightMesh]:[this._ball];if(e instanceof s)return t.full?[this._ball,this._directionalLightMesh]:[this._ball]},u._buildPointLightMesh=function(){return f()},u._buildSpotLightMesh=function(){return c()},u._buildDirectionalLightMesh=function(){return p()},u}),define("goo/debugpack/shapes/CameraDebug",["goo/renderer/MeshData","goo/util/MeshBuilder","goo/math/Transform","goo/shapes/Box","goo/shapes/Cylinder"],function(e,t,n,r,i){function s(){this._camera=s.buildCamera()}return s.prototype.getMesh=function(e,t){return t.full?[this._camera,s.buildFrustum(e)]:[this._camera]},s.buildFrustum=function(t){var n=t.near,r=t.far,i=t.aspect,s,o;if(t.projectionMode===0){var u=Math.tan(t.fov/2*Math.PI/180);s=u*r,o=u*n}else{var a=t.size||100;s=a,o=a}var f,l,c,h;f={x:-s*i,y:s,z:-r},l={x:-s*i,y:-s,z:-r},c={x:s*i,y:-s,z:-r},h={x:s*i,y:s,z:-r};var p,d,v,m;p={x:-o*i,y:o,z:-n},d={x:-o*i,y:-o,z:-n},v={x:o*i,y:-o,z:-n},m={x:o*i,y:o,z:-n};var g=[];g.push(f.x,f.y,f.z),g.push(l.x,l.y,l.z),g.push(c.x,c.y,c.z),g.push(h.x,h.y,h.z),g.push(p.x,p.y,p.z),g.push(d.x,d.y,d.z),g.push(v.x,v.y,v.z),g.push(m.x,m.y,m.z);var y=[];y.push(0,1),y.push(1,2),y.push(2,3),y.push(3,0),y.push(4,5),y.push(5,6),y.push(6,7),y.push(7,4),y.push(0,4),y.push(1,5),y.push(2,6),y.push(3,7);var b=new e(e.defaultMap([e.POSITION]),8,24);return b.getAttributeBuffer(e.POSITION).set(g),b.getIndexBuffer().set(y),b.indexLengths=null,b.indexModes=["Lines"],b},s.buildCamera=function(){var s=new t,o=new n,u=new i(32,.6),a=new i(32,.6),f=new r(.3,1,1.6),l=new r(.2,.15,.7);l.applyFunction(e.POSITION,function(e){return[e.x+e.x/((e.z+1.1)*.3),e.y+e.y/((e.z+1.1)*.3),e.z]}),o.translation.setDirect(0,0,0),o.update(),s.addMeshData(l,o),o.translation.setDirect(0,0,1.3),o.update(),s.addMeshData(f,o),o.scale.setDirect(1,1,.5),o.setRotationXYZ(0,Math.PI/2,0),o.translation.setDirect(0,1.2,.6),o.update(),s.addMeshData(u,o),o.translation.setDirect(0,1.2,2),o.update(),s.addMeshData(a,o);var c=s.build();return c[0]},s}),define("goo/debugpack/shapes/MeshRendererDebug",["goo/renderer/MeshData"],function(e){function t(){this._meshes=[n(1,1,1),null]}function n(t,n,r){var i=[t,n,r,t,n,-r,t,-n,r,t,-n,-r,-t,n,r,-t,n,-r,-t,-n,r,-t,-n,-r],s=[0,1,0,2,1,3,2,3,4,5,4,6,5,7,6,7,0,4,1,5,2,6,3,7],o=new e(e.defaultMap([e.POSITION]),i.length/3,s.length);return o.getAttributeBuffer(e.POSITION).set(i),o.getIndexBuffer().set(s),o.indexLengths=null,o.indexModes=["Lines"],o}return t.prototype.getMesh=function(){return this._meshes},t}),define("goo/debugpack/shapes/SkeletonDebug",["goo/shapes/Box","goo/math/Transform","goo/animationpack/Joint","goo/util/MeshBuilder","goo/renderer/MeshData"],function(e,t,n,r,i){function s(){}var o=new t;return s.prototype.getMesh=function(e){var t=e._skeleton._joints;return[this._buildLines(t),this._buildBoxes(t)]},s.prototype._buildBoxes=function(t){var n=new r,s=new e(2,2,2);s.attributeMap.WEIGHTS=i.createAttribute(4,"Float"),s.attributeMap.JOINTIDS=i.createAttribute(4,"Float"),s.rebuildData(),s.rebuild();for(var u=0;u<t.length;u++)o.matrix.copy(t[u]._inverseBindPose.matrix).invert(),this._stuffBox(s,t[u]),n.addMeshData(s,o);var a=n.build(),f=a[0];return this._buildPaletteMap(f,t),f},s.prototype._buildLines=function(e){var t=[],r=[],s=[],u=[],a=0,f=o.matrix.data;for(var l=0;l<e.length;l++){var c=e[l];if(c._parentIndex!==n.NO_PARENT){var h=e[c._parentIndex];r.push(1,0,0,0,1,0,0,0),s.push(c._index,0,0,0,h._index,0,0,0),u.push(a*2,a*2+1),a++,o.matrix.copy(c._inverseBindPose.matrix).invert(),t.push(f[12],f[13],f[14]),o.matrix.copy(h._inverseBindPose.matrix).invert(),t.push(f[12],f[13],f[14])}}var p=new i(i.defaultMap([i.POSITION,i.WEIGHTS,i.JOINTIDS]),t.length/3,u.length);return p.indexModes=["Lines"],p.getAttributeBuffer(i.POSITION).set(t),p.getAttributeBuffer(i.WEIGHTS).set(r),p.getAttributeBuffer(i.JOINTIDS).set(s),p.getIndexBuffer().set(u),this._buildPaletteMap(p,e),p},s.prototype._stuffBox=function(e,t){var n=e.getAttributeBuffer("WEIGHTS"),r=e.getAttributeBuffer("JOINTIDS");for(var i=0;i<n.length;i+=4)n[i]=1,r[i]=t._index},s.prototype._buildPaletteMap=function(e,t){var n=[];for(var r=0;r<t.length;r++)n[r]=t[r]._index;e.paletteMap=n,e.weightsPerVertex=4},s}),define("goo/debugpack/DebugDrawHelper",["goo/entities/components/LightComponent","goo/entities/components/CameraComponent","goo/entities/components/MeshRendererComponent","goo/animationpack/SkeletonPose","goo/renderer/light/PointLight","goo/renderer/light/DirectionalLight","goo/renderer/light/SpotLight","goo/debugpack/shapes/LightDebug","goo/debugpack/shapes/CameraDebug","goo/debugpack/shapes/MeshRendererDebug","goo/debugpack/shapes/SkeletonDebug","goo/renderer/Material","goo/renderer/Util","goo/renderer/shaders/ShaderLib","goo/renderer/shaders/ShaderBuilder","goo/math/Transform","goo/renderer/Camera","goo/renderer/Renderer"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g){var y={},b=new u,w=new a,E=new f,S=new l;return y.getRenderablesFor=function(e,t){var n,i;if(e.type==="LightComponent")n=b.getMesh(e.light,t),i=new c(p.simpleColored,"DebugDrawLightMaterial");else if(e.type==="CameraComponent")n=w.getMesh(e.camera,t),i=new c(p.simpleLit,"DebugDrawCameraMaterial"),i.uniforms.materialAmbient=[.4,.4,.4,1],i.uniforms.materialDiffuse=[.6,.6,.6,1],i.uniforms.materialSpecular=[0,0,0,1];else if(e.type==="MeshRendererComponent")n=E.getMesh(),i=new c(p.simpleColored,"DebugMeshRendererComponentMaterial");else if(e instanceof r){n=S.getMesh(e,t);var s=[new c(p.uber,"SkeletonDebugMaterial"),new c(p.uber,"SkeletonDebugMaterial")],o=[],u=s.length;while(u--){var i=s[u];i.depthState={enabled:!1,write:!1},i.renderQueue=3e3,i.uniforms.materialDiffuse=[0,0,0,1],i.uniforms.materialDiffuse[u]=.8,i.uniforms.materialAmbient=[0,0,0,1],i.uniforms.materialAmbient[u]=.5,o[u]={meshData:n[u],transform:new v,materials:[i],currentPose:e}}return o}return n.map(function(e){return{meshData:e,transform:new v,materials:[i]}})},y.update=function(e,t,n){if(t.camera&&t.camera.changedProperties){var n=t.camera;e.length>1&&(n.far/n.near!==e[1].farNear||n.fov!==e[1].fov||n.size!==e[1].size||n.aspect!==e[1].aspect||n.projectionMode!==e[1].projectionMode)&&(e[1].meshData=a.buildFrustum(n),e[1].farNear=n.far/n.near,e[1].fov=n.fov,e[1].size=n.size,e[1].aspect=n.aspect,e[1].projectionMode=n.projectionMode),t.camera.changedProperties=!1}y[t.type].updateMaterial(e[0].materials[0],t),e[1]&&y[t.type].updateMaterial(e[1].materials[0],t),e[1]&&y[t.type].updateTransform(e[1].transform,t);var r=g.mainCamera;if(r){var i=r.translation,o=e[0].transform.translation.distance(i)/30;r.projectionMode===m.Parallel&&(o=(r._frustumTop-r._frustumBottom)/20),e[0].transform.scale.setDirect(o,o,o),e[0].transform.update(),t.light&&t.light instanceof s&&(e[1]&&e[1].transform.scale.scale(o),e[1]&&e[1].transform.update())}},y.LightComponent={},y.CameraComponent={},y.LightComponent.updateMaterial=function(e,t){var n=t.light,r=e.uniforms.color=e.uniforms.color||[];r[0]=n.color.data[0],r[1]=n.color.data[1],r[2]=n.color.data[2]},y.LightComponent.updateTransform=function(e,t){var n=t.light;if(!(n instanceof s)){var r=n.range;e.scale.setDirect(r,r,r);if(n instanceof o){var i=n.angle*Math.PI/180,u=Math.tan(i/2);e.scale.mulDirect(u,u,1)}}e.update()},y.CameraComponent.updateMaterial=function(e){e.uniforms.color=e.uniforms.color||[1,1,1]},y.CameraComponent.updateTransform=function(){},y}),define("goo/debugpack/components/MarkerComponent",["goo/entities/components/Component","goo/debugpack/BoundingVolumeMeshBuilder"],function(e,t){function n(n){e.apply(this,arguments),this.type="MarkerComponent";var r=n.meshRendererComponent.worldBound;this.meshData=t.build(r)}return n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n}),define("goo/debugpack/systems/MarkerSystem",["goo/entities/systems/System","goo/renderer/Material","goo/renderer/shaders/ShaderLib","goo/debugpack/components/MarkerComponent","goo/renderer/Renderer","goo/math/Transform"],function(e,t,n,r,i,s){function o(r){e.call(this,"MarkerSystem",["MarkerComponent"]),this.material=new t(n.simpleColored),this.material.depthState.enabled=!1,this.material.shader.uniforms.color=[0,1,0],this.goo=r,this.renderer=this.goo.renderer,this.entities=[],this.goo.callbacks.push(function(){for(var e=0;e<this.entities.length;e++){var t=this.entities[e];if(t.hasComponent("MarkerComponent")){var n=new s;n.copy(t.transformComponent.worldTransform),n.setRotationXYZ(0,0,0),n.scale.setDirect(1,1,1),n.update();var r={meshData:t.markerComponent.meshData,materials:[this.material],transform:n};this.goo.renderer.render(r,i.mainCamera,[],null,!1)}}}.bind(this))}return o.prototype=Object.create(e.prototype),o.prototype.process=function(e){this.entities=e},o}),define("goo/debugpack/Debugger",["goo/debugpack/components/MarkerComponent","goo/debugpack/systems/MarkerSystem"],function(MarkerComponent,MarkerSystem){function Debugger(e){this.goo=null,this.exportPicked=e||!1,this.picked=null,this.oldPicked=null}function createPanel(){var e=document.createElement("div");e.id="debugdiv";var t='<span style="font-size: x-small;font-family: sans-serif">Filter</span><br /><textarea cols="30" id="debugparams">name, Compo, tran, data</textarea><br /><span style="font-size: x-small;font-family: sans-serif">Result</span><br /><textarea readonly rows="10" cols="30" id="debugtex">Click on an entity</textarea><br />';t+='<hr /><span style="font-size: x-small;font-family: sans-serif">REPL</span><br /><textarea readonly rows="10" cols="30" id="replouttex">...</textarea><br /><textarea cols="30" id="replintex">entity.</textarea>',e.innerHTML=t,e.style.position="absolute",e.style.zIndex="2001",e.style.backgroundColor="#DDDDDD",e.style.left="10px",e.style.top="100px",e.style.webkitTouchCallout="none",e.style.webkitUserSelect="none",e.style.khtmlUserSelect="none",e.style.mozUserSelect="none",e.style.msUserSelect="none",e.style.userSelect="none",e.style.padding="3px",e.style.borderRadius="6px",document.body.appendChild(e)}function getFilterList(e){return e.split(",").map(function(e){return e.replace(/(^[\s]+|[\s]+$)/g,"")}).filter(function(e){return e.length>0}).map(function(e){return new RegExp(e)})}function stringifyTypedArray(e){if(e.length===0)return"[]";var t="["+e[0];for(var n=1;n<e.length;n++)t+=" "+e[n];return t+="]",t}function filterProperties(e,t,n,r){if(t.length===0)return"No interests specified;\n\nSome popular interests: is, tran, Compo\n\nEvery entry separated by a comma is a regex";if(r<0)return n+"REACHED MAXIMUM DEPH\n";if(e===null)return n+"null\n";var i=typeof e;if(i==="undefined"||i==="number"||i==="boolean"||i==="string"||e instanceof Array&&(typeof e[0]=="string"||typeof e[0]=="number"||typeof e[0]=="boolean"))return n+JSON.stringify(e)+"\n";if(Object.prototype.toString.call(e).indexOf("Array]")!==-1)return n+stringifyTypedArray(e)+"\n";var s=[];for(var o in e)if(e.hasOwnProperty(o)){if(typeof e[o]=="function")continue;for(var u in t)if(t[u].test(o)){var a=filterProperties(e[o],t,n+" ",r-1);s.push(n+o+"\n"+a);break}}return s.join("")}function updateMarker(e,t){e!==t?(t!==null&&t.hasComponent("MarkerComponent")&&t.clearComponent("MarkerComponent"),e!==null&&e.setComponent(new MarkerComponent(e))):e.hasComponent("MarkerComponent")?e.clearComponent("MarkerComponent"):e.setComponent(new MarkerComponent(e))}function displayInfo(e){var t=getFilterList(document.getElementById("debugparams").value);e&&console.log("==> ",e);var n=filterProperties(e,t,"",20),r=document.getElementById("debugtex");r.value=n}return Debugger.prototype._setUpREPL=function(){var lastCommStr="";document.getElementById("replintex").addEventListener("keyup",function(event){event.stopPropagation();var replinElemHandle=document.getElementById("replintex"),reploutElemHandle=document.getElementById("replouttex");if(event.keyCode===13&&!event.shiftKey){var commStr=replinElemHandle.value.substr(0,replinElemHandle.value.length-1);lastCommStr=commStr;var entity=this.picked,goo=this.goo;void entity,void goo;var resultStr="";try{resultStr+=eval(commStr)}catch(err){resultStr+=err}replinElemHandle.value="entity.",reploutElemHandle.value+="\n-------\n"+resultStr,displayInfo(this.picked)}else event.keyCode===38&&(replinElemHandle.value=lastCommStr)}.bind(this),!1)},Debugger.prototype._setUpPicking=function(){document.addEventListener("mouseup",function(e){e.stopPropagation();var t=e.pageX,n=e.pageY;this.goo.pick(t,n,function(e){var t=this.goo.world.entityManager.getEntityByIndex(e);t&&(this.oldPicked=this.picked,this.picked=t,this.picked===this.oldPicked&&(this.picked=null),this.exportPicked&&(window.picked=this.picked),displayInfo(this.picked),updateMarker(this.picked,this.oldPicked))}.bind(this))}.bind(this),!1)},Debugger.prototype.inject=function(e){return this.goo=e,createPanel(),this.goo.world.getSystem("MarkerSystem")||this.goo.world.setSystem(new MarkerSystem(this.goo)),this._setUpPicking(),document.getElementById("debugparams").addEventListener("keyup",function(){displayInfo(this.picked)}.bind(this)),this._setUpREPL(),this},Debugger}),define("goo/debugpack/EntityCounter",[],function(){function e(e){this.goo=null,this.skipFrames=e||20,this.texHandle=null}function t(){var e=document.createElement("div");e.id="_entitycounterdiv";var t='<span style="font-size: x-small;font-family: sans-serif">Counter</span><br /><textarea cols="30" rows="6" id="_entitycountertex">...</textarea>';return e.innerHTML=t,e.style.position="absolute",e.style.zIndex="2001",e.style.backgroundColor="#BBBBBB",e.style.left="10px",e.style.bottom="10px",e.style.webkitTouchCallout="none",e.style.webkitUserSelect="none",e.style.khtmlUserSelect="none",e.style.mozUserSelect="none",e.style.msUserSelect="none",e.style.userSelect="none",e.style.padding="3px",e.style.borderRadius="6px",document.body.appendChild(e),document.getElementById("_entitycountertex")}return e.prototype.inject=function(e){this.goo=e,this.texHandle=t();var n=this,r=0;return this.goo.callbacks.push(function(){r--;if(r<=0){r=n.skipFrames;var e="";for(var t in n.goo.world._systems){var i=n.goo.world._systems[t];e+=i.type+": "+i._activeEntities.length+"\n"}n.texHandle.value=e}}),this},e}),define("goo/debugpack/systems/DebugRenderSystem",["goo/entities/systems/System","goo/entities/SystemBus","goo/renderer/SimplePartitioner","goo/renderer/Material","goo/renderer/shaders/ShaderLib","goo/renderer/Util","goo/debugpack/DebugDrawHelper"],function(e,t,n,r,i,s,o){function u(){e.call(this,"DebugRenderSystem",["TransformComponent"]),this._renderablesTree={},this.renderList=[],this.preRenderers=[],this.composers=[],this.doRender={CameraComponent:!1,LightComponent:!1,MeshRendererComponent:!1,SkeletonPose:!1},this.inserted(),this._interestComponents=["CameraComponent","LightComponent"],this.camera=null,this.lights=[],this.currentTpf=0,this.scale=20;var n=this;t.addListener("goo.setCurrentCamera",function(e){n.camera=e.camera}),t.addListener("goo.setLights",function(e){n.lights=e}),this.selectionRenderable=o.getRenderablesFor({type:"MeshRendererComponent"}),this.selectionActive=!1,this.oldSelectionActive=!1}return u.prototype=Object.create(e.prototype),u.prototype.constructor=u,u.prototype.inserted=function(){},u.prototype.deleted=function(e){delete this._renderablesTree[e.id]},u.prototype.process=function(e,t){var n=this.renderList.length=0,r;for(var i=0;i<e.length;i++){var s=e[i];for(var u=0,a=this._interestComponents.length;u<a;u++){var f=this._interestComponents[u];if(!s._hidden&&s.hasComponent(f)){var l=s.getComponent(f),c={full:this.doRender[f]||s.getComponent(f).forceDebug},h=this._renderablesTree[s.id]=this._renderablesTree[s.id]||{};h[f]&&(h[f].length===2&&c.full||h[f].length===1&&!c.full)?r=h[f]:(r=o.getRenderablesFor(l,c),r.forEach(function(e){e.id=s.id,e._index=s._index}),h[f]=r),r.forEach(function(e){e.transform.translation.setVector(s.transformComponent.worldTransform.translation),e.transform.rotation.copy(s.transformComponent.worldTransform.rotation),e.transform.scale.setDirect(1,1,1),e.transform.update()}),o.update(r,l,this.camera),r.forEach(function(e){this.renderList[n++]=e}.bind(this))}}if(this.doRender.SkeletonPose&&s.meshDataComponent&&s.meshDataComponent.currentPose){var p=s.meshDataComponent.currentPose,h=this._renderablesTree[s.id]=this._renderablesTree[s.id]||{};h.skeleton?r=h.skeleton:(r=o.getRenderablesFor(p),r.forEach(function(e){e.id=s.id}),h.skeleton=r),r.forEach(function(e){e.transform.copy(s.transformComponent.worldTransform),this.renderList[n++]=e}.bind(this))}}this.selectionActive&&(this.renderList[n++]=this.selectionRenderable[0]),this.renderList.length=n,this.currentTpf=t},u.prototype.render=function(e){e.checkResize(this.camera),this.camera&&e.render(this.renderList,this.camera,this.lights,null,!1)},u.prototype.renderToPick=function(e,t){e.renderToPick(this.renderList,this.camera,!1,t)},u.prototype.invalidateHandles=function(e){var t=Object.keys(this._renderablesTree);t.forEach(function(t){var n=this._renderablesTree[t],r=Object.keys(n);r.forEach(function(t){var r=n[t];r.forEach(function(t){t.materials.forEach(function(t){e.invalidateMaterial(t)}),e.invalidateMeshData(t.meshData)})})}.bind(this)),this.selectionRenderable[0].materials.forEach(function(t){e.invalidateMaterial(t)}),e.invalidateMeshData(this.selectionRenderable[0].meshData)},u}),require(["goo/debugpack/BoundingVolumeMeshBuilder","goo/debugpack/DebugDrawHelper","goo/debugpack/Debugger","goo/debugpack/EntityCounter","goo/debugpack/components/MarkerComponent","goo/debugpack/shapes/CameraDebug","goo/debugpack/shapes/LightDebug","goo/debugpack/shapes/MeshRendererDebug","goo/debugpack/shapes/SkeletonDebug","goo/debugpack/systems/DebugRenderSystem","goo/debugpack/systems/MarkerSystem"],function(e,t,n,r,i,s,o,u,a,f,l){var c=window.goo;if(!c)return;c.BoundingVolumeMeshBuilder=e,c.DebugDrawHelper=t,c.Debugger=n,c.EntityCounter=r,c.MarkerComponent=i,c.CameraDebug=s,c.LightDebug=o,c.MeshRendererDebug=u,c.SkeletonDebug=a,c.DebugRenderSystem=f,c.MarkerSystem=l}),define("goo/debugpack/debugpack",function(){});
}try{
if(window.localStorage&&window.localStorage.gooPath){
window.require.config({
paths:{goo:localStorage.gooPath}
});
}else f()
}catch(e){f()}
})(window)