/* Goo Engine waterpack 
 * Copyright 2015 Goo Technologies AB
 */
(function(window){function f(){"use strict";
define("goo/addons/waterpack/FlatWaterRenderer",["goo/renderer/MeshData","goo/renderer/Shader","goo/renderer/Camera","goo/math/Plane","goo/renderer/pass/RenderTarget","goo/math/Vector3","goo/math/Vector4","goo/renderer/Material","goo/renderer/Texture","goo/renderer/TextureCreator","goo/renderer/shaders/ShaderBuilder","goo/renderer/shaders/ShaderFragment"],function(e,t,n,r,i,s,o,u,a,f,l,c){function h(e){e=e||{},this.useRefraction=e.useRefraction!==undefined?e.useRefraction:!0,this.waterCamera=new n(45,1,.1,2e3),this.renderList=[],this.waterPlane=new r;var t=Math.floor(window.innerWidth/(e.divider||2)),l=Math.floor(window.innerHeight/(e.divider||2));this.reflectionTarget=new i(t,l),this.useRefraction&&(this.refractionTarget=new i(t,l),this.depthTarget=new i(t,l));var c=new u(p,"WaterMaterial");c.shader.setDefine("REFRACTION",this.useRefraction),c.cullState.enabled=!1;var h=null;if(e.normalsTexture)h=e.normalsTexture;else if(e.normalsUrl){var v=e.normalsUrl||"../resources/water/waternormals3.png";h=(new f).loadTexture2D(v)}else{var m=new Uint8Array([127,127,255,255]);h=new a(m,null,1,1)}c.setTexture("NORMAL_MAP",h),c.setTexture("REFLECTION_MAP",this.reflectionTarget),this.waterMaterial=c,this.skybox=null,this.followCam=!0,this.updateWaterPlaneFromEntity=e.updateWaterPlaneFromEntity!==undefined?this.updateWaterPlaneFromEntity:!0,this.calcVect=new s,this.camReflectDir=new s,this.camReflectUp=new s,this.camReflectLeft=new s,this.camLocation=new s,this.camReflectPos=new s,this.offset=new s,this.clipPlane=new o,this.waterEntity=null,this.depthMaterial=new u(d,"depth")}h.prototype.process=function(e,t,n,r,i){if(!this.waterEntity)return;t=t.filter(function(e){return e.meshRendererComponent.isReflectable});var s=this.waterPlane;this.waterCamera.copy(r),this.updateWaterPlaneFromEntity&&(s.constant=this.waterEntity.transformComponent.worldTransform.translation.y);var o=r.translation.y>s.constant;this.waterEntity.skip=!0;if(o){this.useRefraction&&(n.process(this.waterCamera,t,this.renderList),this.clipPlane.setDirect(s.normal.x,-s.normal.y,s.normal.z,-s.constant),this.waterCamera.setToObliqueMatrix(this.clipPlane),this.depthMaterial.uniforms.waterHeight=s.constant,e.render(this.renderList,this.waterCamera,i,this.depthTarget,!0,this.depthMaterial),e.render(this.renderList,this.waterCamera,i,this.refractionTarget,!0),this.waterMaterial.getTexture("REFRACTION_MAP")||(this.waterMaterial.setTexture("REFRACTION_MAP",this.refractionTarget),this.waterMaterial.setTexture("DEPTH_MAP",this.depthTarget)));var u=this.calcVect,a=this.camReflectDir,f=this.camReflectUp,l=this.camReflectLeft,c=this.camLocation,h=this.camReflectPos;c.setVector(r.translation);var p=s.pseudoDistance(c)*2;u.setVector(s.normal).mulDirect(p,p,p),h.setVector(c.subVector(u)),c.setVector(r.translation).addVector(r._direction),p=s.pseudoDistance(c)*2,u.setVector(s.normal).mulDirect(p,p,p),a.setVector(c.subVector(u)).subVector(h).normalize(),c.setVector(r.translation).addVector(r._up),p=s.pseudoDistance(c)*2,u.setVector(s.normal).mulDirect(p,p,p),f.setVector(c.subVector(u)).subVector(h).normalize(),l.setVector(f).cross(a).normalize(),this.waterCamera.translation.setVector(h),this.waterCamera._direction.setVector(a),this.waterCamera._up.setVector(f),this.waterCamera._left.setVector(l),this.waterCamera.normalize(),this.waterCamera.update();if(this.skybox&&this.followCam){var d=this.skybox.transformComponent.worldTransform;d.translation.setVector(h),d.update()}}this.waterMaterial.shader.uniforms.abovewater=o,n.process(this.waterCamera,t,this.renderList),e.setRenderTarget(this.reflectionTarget),e.clear();if(this.skybox)if(this.skybox instanceof Array){this.clipPlane.setDirect(s.normal.x,s.normal.y,s.normal.z,s.constant),this.waterCamera.setToObliqueMatrix(this.clipPlane,10);for(var v=0;v<this.skybox.length;v++)e.render(this.skybox[v],this.waterCamera,i,this.reflectionTarget,!1),this.skybox[v].skip=!0}else e.render(this.skybox,this.waterCamera,i,this.reflectionTarget,!1),this.skybox.skip=!0;this.clipPlane.setDirect(s.normal.x,s.normal.y,s.normal.z,s.constant),this.waterCamera.setToObliqueMatrix(this.clipPlane),e.render(this.renderList,this.waterCamera,i,this.reflectionTarget,!1),this.waterEntity.skip=!1;if(this.skybox)if(this.skybox instanceof Array)for(var v=0;v<this.skybox.length;v++)this.skybox[v].skip=!1;else this.skybox.skip=!1;if(o&&this.skybox&&this.followCam){var m=r.translation,d=this.skybox.transformComponent.worldTransform;d.translation.setVector(m).addVector(this.offset),d.update(),this.waterCamera._updatePMatrix=!0}},h.prototype.setSkyBox=function(e){this.skybox=e,e.meshRendererComponent&&(this.skybox.meshRendererComponent.materials[0].depthState.enabled=!1,this.skybox.meshRendererComponent.materials[0].renderQueue=0,this.skybox.meshRendererComponent.cullMode="Never")},h.prototype.setWaterEntity=function(e){this.waterEntity=e,this.waterEntity.meshRendererComponent.materials[0]=this.waterMaterial};var p={defines:{REFRACTION:!1},attributes:{vertexPosition:e.POSITION,vertexNormal:e.NORMAL},uniforms:{viewMatrix:t.VIEW_MATRIX,projectionMatrix:t.PROJECTION_MATRIX,worldMatrix:t.WORLD_MATRIX,normalMatrix:t.NORMAL_MATRIX,cameraPosition:t.CAMERA,normalMap:"NORMAL_MAP",reflection:"REFLECTION_MAP",refraction:"REFRACTION_MAP",depthmap:"DEPTH_MAP",vertexTangent:[1,0,0,1],waterColor:[.0625,.0625,.0625],abovewater:!0,fogColor:[1,1,1],sunDirection:[.66,.66,.33],sunColor:[1,1,.5],sunShininess:100,sunSpecPower:4,fogStart:0,fogScale:2e3,timeMultiplier:1,time:t.TIME,distortionMultiplier:.025,fresnelPow:2,normalMultiplier:3,fresnelMultiplier:1,waterScale:5,doFog:!0,resolution:t.RESOLUTION},vshader:["attribute vec3 vertexPosition;","attribute vec3 vertexNormal;","uniform vec4 vertexTangent;","uniform mat4 viewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 worldMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform float waterScale;","varying vec2 texCoord0;","varying vec3 eyeVec;","varying vec4 viewCoords;","varying vec3 worldPos;","void main(void) {","	worldPos = (worldMatrix * vec4(vertexPosition, 1.0)).xyz;","	texCoord0 = worldPos.xz * waterScale;","	vec3 n = normalize(normalMatrix * vec3(vertexNormal.x, vertexNormal.y, -vertexNormal.z));","	vec3 t = normalize(normalMatrix * vertexTangent.xyz);","	vec3 b = cross(n, t) * vertexTangent.w;","	mat3 rotMat = mat3(t, b, n);","	vec3 eyeDir = worldPos - cameraPosition;","	eyeVec = eyeDir * rotMat;","	viewCoords = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);","	gl_Position = viewCoords;","}"].join("\n"),fshader:["uniform sampler2D normalMap;","uniform sampler2D reflection;","#ifdef REFRACTION","uniform sampler2D refraction;","uniform sampler2D depthmap;","#endif","uniform vec3 waterColor;","uniform bool abovewater;","uniform vec3 fogColor;","uniform float fogStart;","uniform float fogScale;","uniform float time;","uniform float timeMultiplier;","uniform float distortionMultiplier;","uniform float fresnelPow;","uniform vec3 sunDirection;","uniform vec3 sunColor;","uniform float sunShininess;","uniform float sunSpecPower;","uniform float normalMultiplier;","uniform float fresnelMultiplier;","uniform bool doFog;","uniform vec2 resolution;","varying vec2 texCoord0;","varying vec3 eyeVec;","varying vec4 viewCoords;","varying vec3 worldPos;","vec4 combineTurbulence(in vec2 coords) {","	float t = time * timeMultiplier;","	vec4 coarse1 = texture2D(normalMap, coords * vec2(0.0012, 0.001) + vec2(0.019 * t, 0.021 * t));","	vec4 coarse2 = texture2D(normalMap, coords * vec2(0.001, 0.0011) + vec2(-0.017 * t, 0.016 * t));","	vec4 detail1 = texture2D(normalMap, coords * vec2(0.008) + vec2(0.06 * t, 0.03 * t));","	vec4 detail2 = texture2D(normalMap, coords * vec2(0.006) + vec2(0.05 * t, -0.04 * t));","	return (detail1 * 0.25 + detail2 * 0.25 + coarse1 * 0.75 + coarse2 * 1.0) / 2.25 - 0.48;","}","#ifdef REFRACTION",c.methods.unpackDepth,"#endif","void main(void)","{","	float fogDist = clamp((viewCoords.z-fogStart)/fogScale,0.0,1.0);","	vec2 normCoords = texCoord0;","	vec4 noise = combineTurbulence(normCoords);","	vec3 normalVector = normalize(noise.xyz * vec3(normalMultiplier, normalMultiplier, 1.0));","	vec3 localView = normalize(eyeVec);","	float fresnel = dot(normalize(normalVector * vec3(fresnelMultiplier, fresnelMultiplier, 1.0)), localView);","	if ( abovewater == false ) {","		fresnel = -fresnel;","	}","	fresnel *= 1.0 - fogDist;","	float fresnelTerm = 1.0 - fresnel;","	fresnelTerm = pow(fresnelTerm, fresnelPow);","	fresnelTerm = clamp(fresnelTerm, 0.0, 1.0);","	fresnelTerm = fresnelTerm * 0.95 + 0.05;","	vec2 projCoord = viewCoords.xy / viewCoords.q;","	projCoord = (projCoord + 1.0) * 0.5;","	projCoord.y -= 1.0 / resolution.y;","#ifdef REFRACTION","	float depth = unpackDepth(texture2D(depthmap, projCoord));","	vec2 projCoordRefr = projCoord;","	projCoordRefr += (normalVector.xy * distortionMultiplier) * smoothstep(0.0, 0.5, depth);","	projCoordRefr = clamp(projCoordRefr, 0.001, 0.999);","	depth = unpackDepth(texture2D(depthmap, projCoordRefr));","#endif","	projCoord += (normalVector.xy * distortionMultiplier);","	projCoord = clamp(projCoord, 0.001, 0.999);","	if ( abovewater == true ) {","		projCoord.x = 1.0 - projCoord.x;","	}","	vec4 waterColorX = vec4(waterColor, 1.0);","	vec4 reflectionColor = texture2D(reflection, projCoord);","	if ( abovewater == false ) {","		reflectionColor *= vec4(0.8,0.9,1.0,1.0);","		vec4 endColor = mix(reflectionColor,waterColorX,fresnelTerm);","		gl_FragColor = mix(endColor,waterColorX,fogDist);","	}","	else {","		vec3 sunSpecReflection = normalize(reflect(-sunDirection, normalVector));","		float sunSpecDirection = max(0.0, dot(localView, sunSpecReflection));","		vec3 specular = pow(sunSpecDirection, sunShininess) * sunSpecPower * sunColor;","		vec4 endColor = waterColorX;","#ifdef REFRACTION","		vec4 refractionColor = texture2D(refraction, projCoordRefr) * vec4(0.7);","		endColor = mix(refractionColor, waterColorX, depth);","#endif","		endColor = mix(endColor, reflectionColor, fresnelTerm);","		if (doFog) {","			gl_FragColor = (vec4(specular, 1.0) + mix(endColor,reflectionColor,fogDist)) * (1.0-fogDist) + vec4(fogColor, 1.0) * fogDist;","		} else {","			gl_FragColor = vec4(specular, 1.0) + mix(endColor,reflectionColor,fogDist);","		}","	}","}"].join("\n")},d={processors:[l.animation.processor],defines:{WEIGHTS:!0,JOINTIDS:!0},attributes:{vertexPosition:e.POSITION,vertexJointIDs:e.JOINTIDS,vertexWeights:e.WEIGHTS},uniforms:{viewMatrix:t.VIEW_MATRIX,projectionMatrix:t.PROJECTION_MATRIX,worldMatrix:t.WORLD_MATRIX,waterHeight:0,waterDensity:.05},vshader:["attribute vec3 vertexPosition;","uniform mat4 viewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 worldMatrix;","varying vec4 worldPosition;",l.animation.prevertex,"void main(void) {","mat4 wMatrix = worldMatrix;",l.animation.vertex,"worldPosition = wMatrix * vec4(vertexPosition, 1.0);","gl_Position = projectionMatrix * viewMatrix * worldPosition;","}"].join("\n"),fshader:["uniform float waterHeight;","uniform float waterDensity;",c.methods.packDepth,"varying vec4 worldPosition;","void main(void)","{","float linearDepth = clamp(pow((waterHeight - worldPosition.y) * waterDensity, 0.25), 0.0, 0.999);","gl_FragColor = packDepth(linearDepth);","}"].join("\n")};return h}),define("goo/addons/waterpack/ProjectedGrid",["goo/renderer/MeshData","goo/math/Vector2","goo/math/Vector3","goo/math/Vector4","goo/math/Matrix4x4","goo/renderer/Camera","goo/math/MathUtils"],function(e,t,n,r,i,s,o){function u(o,u){this.densityX=o!==undefined?o:20,this.densityY=u!==undefined?u:20,this.projectorCamera=new s(45,1,.1,2e3),this.mainCamera=new s(45,1,.1,2e3),this.freezeProjector=!1,this.upperBound=20,this.origin=new r,this.direction=new r,this.source=new t,this.rangeMatrix=new i,this.intersectBottomLeft=new r,this.intersectTopLeft=new r,this.intersectTopRight=new r,this.intersectBottomRight=new r,this.planeIntersection=new n,this.freezeProjector=!1,this.projectorMinHeight=50,this.intersections=[];for(var a=0;a<24;a++)this.intersections.push(new n);this.connections=[0,3,1,2,0,4,1,5,2,6,3,7,4,7,5,6];var f=this.densityX*this.densityY,l=(this.densityX-1)*(this.densityY-1)*6,c=e.defaultMap([e.POSITION,e.TEXCOORD0]);e.call(this,c,f,l),this.rebuild()}return u.prototype=Object.create(e.prototype),u.prototype.constructor=u,u.prototype.update=function(e){var t=this.upperBound,s=this.mainCamera;if(!s)return;this.freezeProjector||s.copy(e);var u=s.translation;u.y>0&&u.y<t+s.near?s.translation.setDirect(u.x,t+s.near,u.z):u.y<0&&u.y>-t-s.near&&s.translation.setDirect(u.x,-t-s.near,u.z);var a=s.calculateFrustumCorners(),f=0,l=new n;for(var c=0;c<8;c++){var h=this.connections[c*2],p=this.connections[c*2+1];(a[h].y>t&&a[p].y<t||a[h].y<t&&a[p].y>t)&&this.getWorldIntersectionSimple(t,a[h],a[p],this.intersections[f++],l),(a[h].y>-t&&a[p].y<-t||a[h].y<-t&&a[p].y>-t)&&this.getWorldIntersectionSimple(-t,a[h],a[p],this.intersections[f++],l)}for(var c=0;c<8;c++)a[c].y<t&&a[c].y>-t&&this.intersections[f++].set(a[c]);if(f===0)return!1;var d=this.projectorCamera;d.copy(s);if(d.translation.y>0&&d._direction.y>0||d.translation.y<0&&d._direction.y<0){d._direction.y=-d._direction.y;var v=new n;v.setVector(d._direction).cross(d._left).normalize(),d._up.setVector(v)}var h=this.source,m=this.planeIntersection;h.setDirect(.5,.5),this.getWorldIntersection(0,h,d.getViewProjectionInverseMatrix(),m);var g=d.translation;if(g.y>0&&g.y<this.projectorMinHeight*2){var y=(this.projectorMinHeight*2-g.y)/(this.projectorMinHeight*2);d.translation.setDirect(g.x,this.projectorMinHeight*2-this.projectorMinHeight*y,g.z)}else if(g.y<0&&g.y>-this.projectorMinHeight*2){var y=(-this.projectorMinHeight*2-g.y)/(-this.projectorMinHeight*2);d.translation.setDirect(g.x,-this.projectorMinHeight*2+this.projectorMinHeight*y,g.z)}m.subVector(d.translation),m.y=0;var b=m.length();b>Math.abs(d.translation.y)?(m.normalize(),m.scale(Math.abs(d.translation.y))):b<o.EPSILON&&(m.addVector(d._up),m.y=0,m.normalize(),m.scale(.1)),m.addVector(d.translation),m.y=0,d.lookAt(m,n.UNIT_Y);var w=d.getViewProjectionMatrix(),E=new r,S=this.intersections;for(var c=0;c<f;c++)E.setDirect(S[c].x,0,this.intersections[c].z,1),w.applyPost(E),S[c].setDirect(E.x,E.y,0),S[c].div(E.w);var x=Number.MAX_VALUE,T=-Number.MAX_VALUE,N=Number.MAX_VALUE,C=-Number.MAX_VALUE;for(var c=0;c<f;c++)S[c].x<x&&(x=S[c].x),S[c].x>T&&(T=S[c].x),S[c].y<N&&(N=S[c].y),S[c].y>C&&(C=S[c].y);var k=this.rangeMatrix;k.setIdentity(),k.e00=T-x,k.e11=C-N,k.e03=x,k.e13=N;var L=d.getViewProjectionInverseMatrix();return i.combine(L,k,k),h.setDirect(.5,.5),this.getWorldIntersectionHomogenous(0,h,k,this.intersectBottomLeft),h.setDirect(.5,1),this.getWorldIntersectionHomogenous(0,h,k,this.intersectTopLeft),h.setDirect(1,1),this.getWorldIntersectionHomogenous(0,h,k,this.intersectTopRight),h.setDirect(1,.5),this.getWorldIntersectionHomogenous(0,h,k,this.intersectBottomRight),!0},u.prototype.getWorldIntersectionHomogenous=function(e,t,n,r){this.calculateIntersection(e,t,n),r.setVector(this.origin)},u.prototype.getWorldIntersection=function(e,t,n,r){this.calculateIntersection(e,t,n),r.setDirect(this.origin.x,this.origin.y,this.origin.z).div(this.origin.w)},u.prototype.getWorldIntersectionSimple=function(e,t,n,r,i){var s=r.setVector(t),o=i.setVector(n).subVector(s),u=(e-s.y)/o.y;return o.scale(u),s.addVector(o),u>=0&&u<=1},u.prototype.calculateIntersection=function(e,t,n){this.origin.setDirect(t.x*2-1,t.y*2-1,-1,1),this.direction.setDirect(t.x*2-1,t.y*2-1,1,1),n.applyPost(this.origin),n.applyPost(this.direction),this.direction.sub(this.origin);if(Math.abs(this.direction.y)>o.EPSILON){var r=(e-this.origin.y)/this.direction.y;this.direction.scale(r)}else this.direction.normalize(),this.direction.mul(this.mainCamera._frustumFar);this.origin.add(this.direction)},u.prototype.rebuild=function(){var t=this.getAttributeBuffer(e.POSITION),n=this.getAttributeBuffer(e.TEXCOORD0),r=this.getIndexBuffer(),i=this.densityX,s=this.densityY;for(var o=0;o<i;o++)for(var u=0;u<s;u++)t[(o+u*i)*3+0]=o,t[(o+u*i)*3+1]=0,t[(o+u*i)*3+2]=u,n[(o+u*i)*2+0]=o/(i-1),n[(o+u*i)*2+1]=u/(s-1);var a=0;for(var f=0;f<i*(s-1);f++){if(f%(i*(Math.floor(f/i)+1)-1)===0&&f!==0)continue;r[a++]=f,r[a++]=1+i+f,r[a++]=1+f,r[a++]=f,r[a++]=i+f,r[a++]=1+i+f}return this},u}),define("goo/addons/waterpack/ProjectedGridWaterRenderer",["goo/renderer/MeshData","goo/renderer/Shader","goo/renderer/Camera","goo/math/Plane","goo/renderer/pass/RenderTarget","goo/renderer/pass/FullscreenPass","goo/math/Vector3","goo/renderer/Material","goo/renderer/TextureCreator","goo/renderer/shaders/ShaderLib","goo/renderer/shaders/ShaderFragment"],function(e,t,n,r,i,s,o,u,a,f,l){function c(t){this.waterCamera=new n(45,1,.1,2e3),this.renderList=[],this.waterPlane=new r,t=t||{};var l=window.innerWidth/(t.divider||4),c=window.innerHeight/(t.divider||4);this.renderTarget=new i(l,c),l=window.innerWidth/(t.divider||1),c=window.innerHeight/(t.divider||1),this.heightTarget=new i(l,c,{type:"Float"}),this.normalTarget=new i(l,c,{}),this.fullscreenPass=new s(f.normalmap),this.fullscreenPass.material.shader.uniforms.resolution=[l,c];var d=this.waterMaterial=new u(h,"WaterMaterial");d.cullState.enabled=!1,d.setTexture("NORMAL_MAP",(new a).loadTexture2D("../resources/water/waternormals3.png")),d.setTexture("REFLECTION_MAP",this.renderTarget),d.setTexture("BUMP_MAP",this.heightTarget),d.setTexture("NORMAL_MAP_COARSE",this.normalTarget);var v=this.materialWire=new u(f.simple,"mat");v.wireframe=!0,v.wireframeColor=[0,0,0],this.calcVect=new o,this.camReflectDir=new o,this.camReflectUp=new o,this.camReflectLeft=new o,this.camLocation=new o,this.camReflectPos=new o,this.waterEntity=null;var m=this.projData=new e(e.defaultMap([e.POSITION]),4,6);m.getAttributeBuffer(e.POSITION).set([0,0,0,1,0,0,1,1,0,0,1,0]),m.getIndexBuffer().set([1,3,0,2,3,1]);var g=new u(p,"mat");this.projRenderable={meshData:m,materials:[g]}}c.prototype.updateHelper=function(t,n,r,i){var s=this.projData.getAttributeBuffer(e.POSITION);s[0]=t.x/t.w,s[1]=0,s[2]=t.z/t.w,s[3]=n.x/n.w,s[4]=0,s[5]=n.z/n.w,s[6]=r.x/r.w,s[7]=0,s[8]=r.z/r.w,s[9]=i.x/i.w,s[10]=0,s[11]=i.z/i.w,this.projData.setVertexDataUpdated()},c.prototype.process=function(e,t,n,r,i){var s=this.waterEntity.meshDataComponent.meshData;s.update(r),this.waterMaterial.shader.uniforms.intersectBottomLeft=[s.intersectBottomLeft.x,s.intersectBottomLeft.y,s.intersectBottomLeft.z,s.intersectBottomLeft.w],this.waterMaterial.shader.uniforms.intersectBottomRight=[s.intersectBottomRight.x,s.intersectBottomRight.y,s.intersectBottomRight.z,s.intersectBottomRight.w],this.waterMaterial.shader.uniforms.intersectTopLeft=[s.intersectTopLeft.x,s.intersectTopLeft.y,s.intersectTopLeft.z,s.intersectTopLeft.w],this.waterMaterial.shader.uniforms.intersectTopRight=[s.intersectTopRight.x,s.intersectTopRight.y,s.intersectTopRight.z,s.intersectTopRight.w],this.updateHelper(s.intersectBottomLeft,s.intersectBottomRight,s.intersectTopRight,s.intersectTopLeft),e.render(this.projRenderable,r,i,this.heightTarget,!0),this.fullscreenPass.render(e,this.normalTarget,this.heightTarget,0);var o=this.waterPlane;this.waterCamera.copy(r),o.constant=this.waterEntity.transformComponent.transform.translation.y;var u=r.translation.y>o.constant;if(u){var a=this.calcVect,f=this.camReflectDir,l=this.camReflectUp,c=this.camReflectLeft,h=this.camLocation,p=this.camReflectPos;h.set(r.translation);var d=o.pseudoDistance(h);a.set(o.normal).mul(d*2),p.set(h.sub(a)),h.set(r.translation).add(r._direction),d=o.pseudoDistance(h),a.set(o.normal).mul(d*2),f.set(h.sub(a)).sub(p).normalize(),h.set(r.translation).add(r._up),d=o.pseudoDistance(h),a.set(o.normal).mul(d*2),l.set(h.sub(a)).sub(p).normalize(),c.set(l).cross(f).normalize(),this.waterCamera.translation.set(p),this.waterCamera._direction.set(f),this.waterCamera._up.set(l),this.waterCamera._left.set(c),this.waterCamera.normalize(),this.waterCamera.update();if(this.skybox){var v=this.skybox.transformComponent.worldTransform;v.translation.setVector(p),v.update()}}this.waterMaterial.shader.uniforms.abovewater=u,this.waterEntity.skip=!0,this.renderList.length=0,n.process(this.waterCamera,t,this.renderList),e.render(this.renderList,this.waterCamera,i,this.renderTarget,!0),this.waterEntity.skip=!1;if(u&&this.skybox){var m=r.translation,v=this.skybox.transformComponent.worldTransform;v.translation.setVector(m),v.update()}},c.prototype.setSkyBox=function(e){this.skybox=e},c.prototype.setWaterEntity=function(e){this.waterEntity=e,this.waterEntity.meshRendererComponent.cullMode="Never",this.waterEntity.meshRendererComponent.materials[0]=this.waterMaterial;var t=this.waterEntity.meshDataComponent.meshData;this.waterMaterial.shader.uniforms.density=[t.densityX,t.densityY]};var h={attributes:{vertexUV0:e.TEXCOORD0},uniforms:{viewMatrix:t.VIEW_MATRIX,projectionMatrix:t.PROJECTION_MATRIX,worldMatrix:t.WORLD_MATRIX,normalMatrix:t.NORMAL_MATRIX,cameraPosition:t.CAMERA,normalMap:"NORMAL_MAP",reflection:"REFLECTION_MAP",bump:"BUMP_MAP",normalMapCoarse:"NORMAL_MAP_COARSE",vertexNormal:[0,-1,0],vertexTangent:[1,0,0,1],waterColor:[15,15,15],abovewater:!0,fogColor:[1,1,1,1],sunDirection:[.66,-0.1,.66],coarseStrength:.25,detailStrength:2,fogStart:0,camNear:t.NEAR_PLANE,camFar:t.FAR_PLANE,time:t.TIME,intersectBottomLeft:[0,0,0,0],intersectTopLeft:[0,0,0,0],intersectTopRight:[0,0,0,0],intersectBottomRight:[0,0,0,0],grid:!1,heightMultiplier:50,density:[1,1]},vshader:["attribute vec2 vertexUV0;","uniform vec3 vertexNormal;","uniform vec4 vertexTangent;","uniform mat4 viewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 worldMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform float time;","uniform vec3 sunDirection;","uniform float coarseStrength;","uniform float heightMultiplier;","uniform sampler2D bump;","uniform vec4 intersectBottomLeft;","uniform vec4 intersectTopLeft;","uniform vec4 intersectTopRight;","uniform vec4 intersectBottomRight;","varying vec2 texCoord0;","varying vec2 texCoord1;","varying vec3 eyeVec;","varying vec3 sunDir;","varying vec4 viewCoords;","varying vec3 worldPos;","varying vec3 normal;","void main(void) {","	vec4 pointTop = mix(intersectTopLeft, intersectTopRight, vertexUV0.x);","	vec4 pointBottom = mix(intersectBottomLeft, intersectBottomRight, vertexUV0.x);","	vec4 pointFinal = mix(pointTop, pointBottom, 1.0 - vertexUV0.y);","	pointFinal.xz /= pointFinal.w;","	pointFinal.y = 0.0;","	vec4 screenpos = projectionMatrix * viewMatrix * worldMatrix * vec4(pointFinal.xyz, 1.0);","	vec2 projCoord = screenpos.xy / screenpos.q;","	projCoord = (projCoord + 1.0) * 0.5;","	float height = texture2D(bump, projCoord).x;","	pointFinal.y = height * heightMultiplier;","	texCoord1 = vertexUV0;","	vec4 pos = worldMatrix * vec4(pointFinal.xyz, 1.0);","	worldPos = pos.xyz;","	texCoord0 = worldPos.xz * 2.0;","	vec3 n = normalize(normalMatrix * vertexNormal);","	vec3 t = normalize(normalMatrix * vertexTangent.xyz);","	vec3 b = cross(n, t) * vertexTangent.w;","	mat3 rotMat = mat3(t, b, n);","	vec3 eyeDir = worldPos - cameraPosition;","	eyeVec = eyeDir * rotMat;","	sunDir = sunDirection * rotMat;","	viewCoords = projectionMatrix * viewMatrix * pos;","	gl_Position = viewCoords;","}"].join("\n"),fshader:["uniform sampler2D normalMap;","uniform sampler2D reflection;","uniform sampler2D normalMapCoarse;","uniform vec3 waterColor;","uniform bool abovewater;","uniform vec4 fogColor;","uniform float time;","uniform bool grid;","uniform vec2 density;","uniform float camNear;","uniform float camFar;","uniform float fogStart;","uniform float coarseStrength;","uniform float detailStrength;","varying vec2 texCoord0;","varying vec2 texCoord1;","varying vec3 eyeVec;","varying vec3 sunDir;","varying vec4 viewCoords;","varying vec3 worldPos;","varying vec3 normal;","const vec3 sunColor = vec3(1.0, 0.96, 0.96);","vec4 getNoise(vec2 uv) {","    vec2 uv0 = (uv/123.0)+vec2(time/17.0, time/29.0);","    vec2 uv1 = uv/127.0-vec2(time/-19.0, time/31.0);","    vec2 uv2 = uv/vec2(897.0, 983.0)+vec2(time/51.0, time/47.0);","    vec2 uv3 = uv/vec2(991.0, 877.0)-vec2(time/59.0, time/-63.0);","    vec4 noise = (texture2D(normalMap, uv0)) +","                 (texture2D(normalMap, uv1)) +","                 (texture2D(normalMap, uv2)*3.0) +","                 (texture2D(normalMap, uv3)*3.0);","    return noise/4.0-1.0;","}","void main(void)","{","	vec2 projCoord = viewCoords.xy / viewCoords.q;","	projCoord = (projCoord + 1.0) * 0.5;","	float fs = camFar * fogStart;","	float fogDist = clamp(max(viewCoords.z - fs, 0.0)/(camFar - camNear - fs), 0.0, 1.0);","	vec3 coarseNormal = texture2D(normalMapCoarse, projCoord).xyz * 2.0 - 1.0;","	vec2 normCoords = texCoord0;","	vec4 noise = getNoise(normCoords);","	vec3 normalVector = normalize(noise.xyz * vec3(1.8 * detailStrength, 1.8 * detailStrength, 1.0) + coarseNormal.xyz * vec3(1.8 * coarseStrength, 1.8 * coarseStrength, 1.0));","	vec3 localView = normalize(eyeVec);","	float fresnel = dot(normalize(normalVector*vec3(1.0, 1.0, 1.0)), localView);","	if ( abovewater == false ) {","		fresnel = -fresnel;","	}","	float fresnelTerm = 1.0 - fresnel;","	fresnelTerm *= fresnelTerm;","	fresnelTerm *= fresnelTerm;","	fresnelTerm = fresnelTerm * 0.95 + 0.05;","	if ( abovewater == true ) {","		projCoord.x = 1.0 - projCoord.x;","	}","	projCoord += (normalVector.xy * 0.05);","	projCoord = clamp(projCoord, 0.001, 0.999);"," vec4 waterColorX = vec4(waterColor / 255.0, 1.0);","	vec4 reflectionColor = texture2D(reflection, projCoord);","	if ( abovewater == false ) {","		reflectionColor *= vec4(0.8,0.9,1.0,1.0);","		vec4 endColor = mix(reflectionColor,waterColorX,fresnelTerm);","		gl_FragColor = mix(endColor,waterColorX,fogDist);","	}","	else {","		vec3 diffuse = vec3(0.0);","		vec3 specular = vec3(0.0);","		vec3 sunreflection = normalize(reflect(-sunDir, normalVector));","		float direction = max(0.0, dot(localView, sunreflection));","		specular += pow(direction, 100.0)*sunColor * 2.0;","		diffuse += max(dot(sunDir, normalVector),0.0)*sunColor*0.4;","		vec4 endColor = mix(waterColorX,reflectionColor,fresnelTerm);","		gl_FragColor = mix(vec4(diffuse*0.0 + specular, 1.0) + mix(endColor,reflectionColor,fogDist), fogColor, fogDist);","	}","	if (grid) {","		vec2 low = abs(fract(texCoord1*density)-0.5);","		float dist = 1.0 - step(min(low.x, low.y), 0.05);","		gl_FragColor *= vec4(dist);","	}","}"].join("\n")},p={attributes:{vertexPosition:e.POSITION},uniforms:{viewMatrix:t.VIEW_MATRIX,projectionMatrix:t.PROJECTION_MATRIX,worldMatrix:t.WORLD_MATRIX,time:t.TIME},vshader:["attribute vec3 vertexPosition;","uniform mat4 viewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 worldMatrix;","varying vec4 worldPos;","varying vec4 viewCoords;","void main(void) {","	worldPos = worldMatrix * vec4(vertexPosition, 1.0);","	viewCoords = viewMatrix * worldPos;","	gl_Position = projectionMatrix * viewMatrix * worldPos;","}"].join("\n"),fshader:["precision mediump float;","uniform float time;","varying vec4 worldPos;","varying vec4 viewCoords;",l.noise3d,"vec4 getNoise(sampler2D map, vec2 uv) {","    vec2 uv0 = (uv/223.0)+vec2(time/17.0, time/29.0);","    vec2 uv1 = uv/327.0-vec2(time/-19.0, time/31.0);","    vec2 uv2 = uv/vec2(697.0, 983.0)+vec2(time/151.0, time/147.0);","    vec2 uv3 = uv/vec2(791.0, 877.0)-vec2(time/259.0, time/263.0);","    vec4 noise = (texture2D(map, uv0)*0.0) +","                 (texture2D(map, uv1)*0.0) +","                 (texture2D(map, uv2)*0.0) +","                 (texture2D(map, uv3)*10.0);","    return noise/5.0-1.0;","}","void main(void)","{","	float fogDist = clamp(-viewCoords.z / 1000.0, 0.0, 1.0);","	gl_FragColor = vec4((snoise(vec3(worldPos.xz * 0.008, time * 0.4))+snoise(vec3(worldPos.xz * 0.02, time * 0.8))*0.5)/10.0);","}"].join("\n")};return c}),define("goo/addons/waterpack/WaterRegister",["goo/scripts/Scripts","goo/addons/waterpack/FlatWaterRenderer","goo/addons/waterpack/ProjectedGridWaterRenderer"],function(e){var t=["goo/scripts/Scripts","goo/addons/waterpack/FlatWaterRenderer","goo/addons/waterpack/ProjectedGridWaterRenderer"];for(var n=1;n<t.length;n++){var r=t[n].slice(t[n].lastIndexOf("/")+1);e.addClass(r,arguments[n])}}),require(["goo/addons/waterpack/FlatWaterRenderer","goo/addons/waterpack/ProjectedGrid","goo/addons/waterpack/ProjectedGridWaterRenderer","goo/addons/waterpack/WaterRegister"],function(e,t,n,r){var i=window.goo;if(!i)return;i.FlatWaterRenderer=e,i.ProjectedGrid=t,i.ProjectedGridWaterRenderer=n,i.WaterRegister=r}),define("goo/addons/waterpack/waterpack",function(){});
}try{
if(window.localStorage&&window.localStorage.gooPath){
window.require.config({
paths:{goo:localStorage.gooPath}
});
}else f()
}catch(e){f()}
})(window)