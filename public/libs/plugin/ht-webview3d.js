!function(X){"use strict";function p(N){var V,v,r,T,s,m,y,E=[],M=0;V=c.createDiv(),V.style.overflow="hidden";var J=N.getView();J.insertBefore(V,N.getCanvas()),v=B.Default.createDiv(),v.style.WebkitTransformStyle="preserve-3d",v.style.MozTransformStyle="preserve-3d",v.style.transformStyle="preserve-3d",V.appendChild(v),[{event:"mousedown",style:"none"},{event:"mouseup",style:"auto"},{event:"touchstart",style:"none"},{event:"touchend",style:"auto"}].forEach(function(E){var C=E.style;o.addEventListener(J,E.event,function(){V.style.pointerEvents=C})}),this.updateWebView=function(){if(N.getWidth()&&N.getHeight()){var O=N.getCanvas(),K=1*O.style.width.slice(0,-2),Z=1*O.style.height.slice(0,-2);(E[0]!==K||E[1]!==Z)&&(E[0]=K,E[1]=Z,V.style.width=K+"px",V.style.height=Z+"px",v.style.width=K+"px",v.style.height=Z+"px");var k=N._projectMatrix[5]*E[1]/2;k!==r&&(r=k,V.style.WebkitPerspective=r+"px",V.style.MozPerspective=r+"px",V.style.perspective=r+"px"),m="translateZ("+r+"px)"+b(N._viewMatrix);var F=m+"translate("+E[0]/2+"px,"+E[1]/2+"px)";T===F||s||(v.style.WebkitTransform=F,v.style.MozTransform=F,v.style.transform=F,T=F),M++,y=!1,N.dm().each(function(s){s.isWebView&&R(s)});for(var p,g=v.children,C=[],i=0,o=g.length;o>i;i++)p=g[i],p._isHtWebView&&p._renderCookie!==M&&C.push(p);C.length&&C.forEach(function(r){v.removeChild(r)})}};var W=new Array(16),R=function(L){var S=L.getAttach();if(S){S.parentElement!==v&&v.appendChild(S),S._renderCookie=M,y=!0;var u=L.getFinalScale3d(),P=L._prefrenceSize;P&&P[0]?P[1]||(P[1]=P[0]/u[0]*u[1]):P=[u[0],u[1]],S.style.width=P[0]+"px",S.style.height=P[1]+"px";var t=1/P[0],_=1/P[1],k=1,O=L.mat;W[0]=O[0]*t,W[1]=O[1]*t,W[2]=O[2]*t,W[3]=O[3]*t,W[4]=O[4]*_,W[5]=O[5]*_,W[6]=O[6]*_,W[7]=O[7]*_,W[8]=O[8]*k,W[9]=O[9]*k,W[10]=O[10]*k,W[11]=O[11]*k,W[12]=O[12],W[13]=O[13],W[14]=O[14],W[15]=O[15];var f=w(W,s?"translate("+E[0]/2+"px,"+E[1]/2+"px)"+m:""),z=S.$a2;z!==f&&(S.$a2=f,S.style.WebkitTransform=f,S.style.MozTransform=f,S.style.transform=f)}}}function A(v){return Math.abs(v)<1e-10?0:v}function b(e){var F=e;return"matrix3d("+A(F[0])+","+A(-F[1])+","+A(F[2])+","+A(F[3])+","+A(F[4])+","+A(-F[5])+","+A(F[6])+","+A(F[7])+","+A(F[8])+","+A(-F[9])+","+A(F[10])+","+A(F[11])+","+A(F[12])+","+A(-F[13])+","+A(F[14])+","+A(F[15])+")"}function w(K,P){var i=K,m="matrix3d("+A(i[0])+","+A(i[1])+","+A(i[2])+","+A(i[3])+","+A(-i[4])+","+A(-i[5])+","+A(-i[6])+","+A(-i[7])+","+A(i[8])+","+A(i[9])+","+A(i[10])+","+A(i[11])+","+A(i[12])+","+A(i[13])+","+A(i[14])+","+A(i[15])+")";return"translate(-50%,-50%)"+(P||"")+m}var $="ht",B=X[$],c=B.Default,o=c.getInternal(),d=o.superCall,L=B.graph3d.Graph3dView,O=L.prototype.validateImpl;L.prototype.validateImpl=function(){O.call(this);var t=this._webViewRenderer;t||(t=this._webViewRenderer=new p(this)),t.updateWebView()};var Y=B.WebView3d=function(){var q=this;d(Y,q),q.s({shape3d:"billboard","shape3d.reverse.flip":!0})},G=[1,1,1,1],V=[0,0,0,0];c.def($+"."+"WebView3d",B.Node,{ms_ac:["attach"],isWebView:!0,attachDOM:function(G,n,_){if(!G)return this.detachDOM();if("string"==typeof G){var I=document.createElement("iframe");I.src=G,G=I}var N=G.style;N.position="absolute",N.border=0,N.outline=0,N.padding=0,N.margin=0,G._isHtWebView=!0,this.setAttach(G),this._prefrenceSize=[n,_],this.s("shape3d.blend",V)},detachDOM:function(){this.setAttach(null),this.s("shape3d.blend",this.getBgColor())},setBgColor:function(k){this.a("defaultBgColor",k),this.getAttach()||this.s("shape3d.blend",k)},getBgColor:function(){return this.a("defaultBgColor")||G}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);