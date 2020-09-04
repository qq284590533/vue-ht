!function(H,M,p){"use strict";var s="ht",f=H[s],S=f.Default,j=S.isTouchable,J=f.Color,$="px",R="0",U="innerHTML",A="className",b="position",O="absolute",T="width",i="height",o="left",y="top",k="right",g="bottom",z="max-width",W="max-height",E=null,h="none",m="",C=H.parseInt,N=H.setTimeout,x=S.getInternal(),D=S.animate,Q=J.titleIconBackground,u=function(){return document},w=function(q){return u().createElement(q)},v=function(){return w("div")},I=function(){return w("canvas")},B=function(n,M,_){n.style.setProperty(M,_,E)},K=function(n,O){return n.style.getPropertyValue(O)},a=function(J,o){J.appendChild(o)},X=function(u,c){u.removeChild(c)},F=x.addEventListener,r=(x.removeEventListener,function(V){var t=V.scrollWidth,r=V.scrollHeight;return V===u().body&&(t=Math.max(t,u().documentElement.scrollWidth),r=Math.max(r,u().documentElement.scrollHeight)),{width:t,height:r}}),e=function(C){var e=C.touches[0];return e?e:C.changedTouches[0]};x.addMethod(S,{panelExpandIcon:{width:16,height:16,comps:[{type:"triangle",rect:[4,4,10,8],background:Q,rotation:3.14}]},panelCollapseIcon:{width:16,height:16,comps:[{type:"triangle",rect:[4,4,10,8],background:Q}]},panelLockIcon:{width:100,height:100,comps:[{type:"roundRect",rect:[10,50,80,40],borderWidth:10,borderColor:Q},{type:"shape",points:[37,45,37,20,37,13,43,13,63,13,69,13,70,19,70,44],segments:[1,2,3,2,3,2],borderWidth:10,borderColor:Q}]},panelUnLockIcon:{width:100,height:100,comps:[{type:"roundRect",rect:[10,50,80,40],borderWidth:10,borderColor:Q},{type:"shape",points:[37,45,37,20,37,13,43,13,63,13,69,13,70,19,70,26],segments:[1,2,3,2,3,2],borderWidth:10,borderColor:Q}]},panelMinimizeIcon:{width:100,height:100,comps:[{type:"shape",points:[10,35,35,35,35,10],segments:[1,2,2],borderWidth:8,borderColor:Q},{type:"shape",points:[90,35,65,35,65,10],segments:[1,2,2],borderWidth:8,borderColor:Q},{type:"shape",points:[10,65,35,65,35,90],segments:[1,2,2],borderWidth:8,borderColor:Q},{type:"shape",points:[65,90,65,65,90,65],segments:[1,2,2],borderWidth:8,borderColor:Q}]},panelRestoreIcon:{width:300,height:300,comps:[{type:"rect",rect:[10,24,268,56],background:Q},{type:"rect",rect:[10,118,268,56],background:Q},{type:"rect",rect:[10,213,268,56],background:Q}]},panelTitleLabelColor:S.labelSelectColor,panelTitleLabelFont:S.labelFont,panelContentLabelFont:S.labelFont,panelTitleBackground:J.titleBackground,panelSeparatorWidth:1,panelSeparatorColor:p},!0);var c=f.widget.Panel=function(V){var t=this,W=t._view=x.createView(null,t);t.$1i=0,t.$18i=new f.Notifier,t.$2i="leftTop",B(W,y,R),B(W,o,R),B(W,b,O),B(W,"overflow","hidden"),t._interactor=new P(t),t.setConfig(V),t.addEventListener(function(c){var v=t.getPanelConfig(c.id),r=v.content;("beginRestore"===c.kind||"betweenResize"===c.kind||"endToggle"===c.kind)&&(r&&r.invalidate&&r.invalidate(),v.items&&v.items.forEach(function(c){c&&c.content&&c.content.invalidate&&c.content.invalidate()}))})};S.def(c,M,{ms_v:1,_dragContainment:"parent",setConfig:function(F){function Z(K){K.expanded=!K.expanded,r.togglePanel(K.id,!0,!0)}if(F){for(var r=this,Y=r._view.parentNode;this._view.children.length;)this._view.removeChild(this._view.children[0]);r._config=F,r.$35i=[],F.expanded==E&&(F.expanded=F.expand!=E?F.expand:!0);var P=r._view,c=r.$24i(F,P,!0),D=c[2],M=F.width;r.$35i.push(c[1]),F.items&&F.items.forEach(function(y){y.expanded==E&&(y.expanded=y.expand!=E?y.expand:!0);var N=r.$24i(y,D.children[0]);r.$35i.push(N[1])});var N=v();B(N,T,10+$),B(N,i,10+$),B(N,b,O),B(N,g,R),B(N,k,R),N[A]="resize-area",a(P,N),r.$10i(),F.flowLayout&&B(P,b,"relative"),B(P,"opacity",R),a(u().body,P),M==E&&(M=P.offsetWidth),B(P,T,M+$),B(P,z,M+$);var h=F.content;h&&h.isSelfViewEvent&&(h.setX(0),h.setY(0),h.setWidth(M-2*(F.borderWidth||0)),h.setHeight(F.contentHeight)),F.items&&F.items.forEach(function(e){Z(e)}),F.buttons&&F.buttons.indexOf("toggle")<0||Z(F),F.minimized==E&&F.minimize!=E&&(F.minimized=F.minimize),F.minimized&&F.minimizable!==!1&&r.minimize(!0),X(u().body,P),B(P,"opacity",m),Y&&a(Y,P),r.iv()}},getPanelConfig:function(p){var m=this,P=m._config,z=P.items;if(P.id===p)return P;if(z)for(var u=0;u<z.length;u++){var g=z[u];if(g.id===p)return g}},getPanelView:function(y){for(var x=this,w=x.$35i,m=0;m<w.length;m++){var K=w[m],T=K.parentNode;if(T.$15i===y)return T}},setDragContainment:function(Y){this._dragContainment=Y},getDragContainment:function(){return this._dragContainment},$20i:function(){var k=this._config,t=k.restoreIconSize||24;return t},$5i:function(v){var x=v.titleIconSize||16;return j&&(x*=1.2),x},$4i:function(w){var f=w.titleHeight||S.widgetTitleHeight;return f},setTitle:function(U,T){if(T==E&&(T=this._config.id),T!=E){var a=this.getPanelConfig(T),N=this.getPanelView(T);a.title=U,N.querySelector(".panel-title span").innerHTML=U}},setInnerPanel:function(i){var m,j,H=this,U=i.id,C=H.$35i,z=!1;if(i.expanded==E&&(i.expanded=!0),U!=E){var s=H.getPanelConfig(U);if(s){z=!0;var Y,g=H.getPanelView(U),N=g.parentNode,b=g.children[0];if(g!==H._view){H.$11i();for(Y in s)delete s.key;for(Y in i)s[Y]=i[Y];m=H.$24i(i,N,!1,g),j=m[1],N.removeChild(g);for(var G=0;G<C.length;G++)if(C[G]===b){C.splice(G,1,j);break}H.$12i(),s.expanded=!s.expanded,H.togglePanel(s.id,!0,!0),H.iv()}}}if(!z){H.$11i(),m=H.$24i(i,H._view.children[1]),j=m[1],C.push(j),H._config.items||(H._config.items=[]);var d=H._config.items;if(d.push(i),H.$12i(),d.length>1){var _=d[d.length-2],v=H.getPanelView(_.id).children[0];B(v,"border-bottom",H.$55i(_))}i.expanded=!i.expanded,H.togglePanel(i.id,!0,!0),H.iv()}},removeInnerPanel:function(d){var e,P=this,E=-1,D=P._config.items;if(D)for(e=0;e<D.length;e++){var U=D[e];if(U.id===d){E=e;break}}if(P.$11i(),E>=0){var R=P.$35i,_=P.getPanelView(d),s=_.children[0];for(e=0;e<R.length;e++)if(R[e]===s){R.splice(e,1);break}D.splice(E,1),_.parentNode.removeChild(_)}if(P.$12i(),D.length>0){var k=D[D.length-1],g=P.getPanelView(k.id).children[0];B(g,"border-bottom",P.$55i(k))}},$6i:function(O){B(O,"cursor","pointer"),B(O,"display","inline-block"),B(O,"margin-right",(j?8:4)+$),B(O,"vertical-align",y)},$24i:function(r,F,D,n){var u=this,k=u._config.flowLayout,T=D?F:v(),Q=u.$50i(r),U=u.$3i(r,D);T[A]="ht-widget-panel"+(D?" outer-panel":" inner-panel"),r.borderWidth==E&&(r.borderWidth=D?2:0);var W=r.borderWidth;if(W="0 "+W+$+" "+W+$+" "+W+$+" ",B(T,"border-width",W),B(T,"border-color",r.titleBackground||S.panelTitleBackground),B(T,"border-style","solid"),a(T,U),a(T,Q),D||(n?F.insertBefore(T,n):a(F,T)),!k&&D&&r.minimizable!==!1){var O=I(),N=u.$20i(),p=r.restoreToolTip;x.setCanvas(O,N,N),O[A]="control-button button-minimize button-minimize-restore",u.$6i(O),B(O,"display","none"),a(F,O),O.title=p||""}var i=r.panelBackground||r.titleBackground||S.panelTitleBackground;if(B(T,"background-color",i),r.id==E){for(var h=u.$1i++;u.getPanelConfig(h);)h=u.$1i++;r.id=h}return T.$15i=r.id,r.width&&(T.style.width=r.width+$),[T,U,Q]},$9i:function(M){var m=I();m[A]="control-button button-toggle button-toggle-expand",m.title=M.toggleToolTip||"";var b=this.$4i(M),j=this.$5i(M);return this.$6i(m),x.setCanvas(m,j,b),m},$8i:function(g){var z=I(),v="control-button button-independent-switch";z[A]=g.independent===!0?v+" button-independent-switch-on":v+" button-independent-switch-off",z.title=g.independentSwitchToolTip||"";var m=this.$4i(g),Y=this.$5i(g);return this.$6i(z),x.setCanvas(z,Y,m),z},$7i:function(M){var d=I();d[A]="control-button button-minimize button-minimize-minimize",d.title=M.minimizeToolTip||"";var k=this.$4i(M),H=this.$5i(M);return this.$6i(d),x.setCanvas(d,H,k),d},$55i:function(e){var D=this._config,O=D.items,m=e.separatorWidth||S.panelSeparatorWidth,M=e.titleBackground||S.panelTitleBackground,J=e.expanded!==!1?M:e.separatorColor||S.panelSeparatorColor||S.brighter(M);return(D===e||O&&O.indexOf(e)===O.length-1)&&(m=0),m+$+" solid "+J},$3i:function(n,H){var L=this,d=L._config.flowLayout,z=v(),l=v(),K=L.$4i(n),m=n.titleBackground,Y=n.titleColor,f=n.titleIcon,E=n.buttons;if(z[A]="panel-title",B(z,b,"relative"),B(z,"background",m||S.panelTitleBackground),B(z,"color",Y||S.panelTitleLabelColor),B(z,y,R),B(z,"box-sizing","border-box"),B(z,"-moz-box-sizing","border-box"),B(z,"padding","0 5px 0 0"),B(z,T,"100%"),B(z,"cursor","default"),B(z,"white-space","nowrap"),B(z,"font",S.panelTitleLabelFont),f){var D=I();D[A]="control-button panel-title-icon";var j=L.$4i(n),V=L.$5i(n);L.$6i(D),x.setCanvas(D,V,j),a(z,D)}var J=w("span");B(J,"display","inline-block"),B(J,"margin-left","5px"),J[U]="<span>"+n.title+"</span>",a(z,J),B(z,"line-height",K+$),l[A]="panel-title-controls",B(l,b,O),B(l,o,R),B(l,k,5+$),B(l,y,R),B(l,g,R),B(l,"text-align",k);var t=function(){var z=L.$9i(n);a(l,z)},N=function(){if(!d&&H&&n.minimizable!==!1){var x=L.$7i(n);a(l,x)}},G=function(){if(!H){var u=L.$8i(n);a(l,u)}},q=function(b){var H=I();H[A]="control-button custombutton-"+b.name,H.title=b.toolTip||"",H._action=b.action;var z=L.$4i(n),T=L.$5i(n);L.$6i(H),x.setCanvas(H,T,z),a(l,H)};if(E)for(var c=0;c<E.length;c++){var X=E[c];"string"==typeof X?"minimize"===X?N():"independentSwitch"===X?G():"toggle"===X&&t():"object"==typeof X&&q(X)}else N(),t();return a(z,l),z},$50i:function(O){var n=v(),d=O.contentHeight,I=v();B(I,b,"relative"),n[A]="panel-body",B(n,"overflow","hidden");var u=O.contentBackground;if(u===p&&(u="white"),B(n,"background",u),B(n,"font",S.panelContentLabelFont),a(n,I),O.content){var m,D=O.content;D.getView?(a(I,D.getView()),m=I.children[0]):D instanceof Element?(a(I,D),m=I.children[0]):I[U]=D,D.isSelfViewEvent||m&&(B(m,T,"100%"),B(m,i,"100%")),d&&B(I,i,d+$)}return n},$10i:function(){var u=this,x=u._config,y=u._view,O=y.querySelector(".resize-area").style;O.display=x.flowLayout||x.minimized===!0||x.expanded===!1?h:"block"},$11i:function(){var F=this._view,H=F.children[1];this.$13i>=0?this.$13i++:this.$13i=1,B(H,W,m),B(F,z,m)},$12i:function(){var T=--this.$13i;if(0===T){var Z=this._view,_=Z.children[1];B(_,W,_.scrollHeight+$),B(Z,z,Z.offsetWidth+$)}},$14i:function(){var w=this._view,l=w.children[0],D=l.children[1].children,A=this._config,n=0;w.$26i=w.offsetWidth,n+=l.children[0].offsetWidth,A.titleIcon&&(n+=l.children[1].offsetWidth,D=l.children[2].children);for(var b=0;b<D.length;b++){var O=D[b];n+=O.offsetWidth+5}w.$51i=n+15},togglePanel:function(X,Y,c){function V(V){var F=V.target,s=F.parentNode,y=h.getPanelConfig(s.$15i);delete s.$19i,F!==L&&h.$12i(),h.$18i.fire({kind:"endToggle",target:h,id:y.id})}for(var h=this,C=h._view,L=C.children[1],r=E,N=h.$35i,M=N.length,u=h._config.exclusive,Z=h.$2i,K=[],o=h._config.narrowWhenCollapse,y=0;M>y;y++){var x=N[y],I=x.parentNode,J=I.$15i,U=h.getPanelConfig(J);J===X&&(r=I),!Y&&u&&U.expanded&&I!==C&&J!==X&&U.independent!==!0&&K.push(I)}if(r&&!r.$19i){r.$19i=!0;var O=r.children[1],Q=r.querySelector(".button-toggle"),v=h.getPanelConfig(r.$15i);if(!Q)return;r===C||v.expanded||v.independent===!0||K.forEach(function(o){h.togglePanel(o.$15i,!0)}),r!==C&&h.$11i();var F=200;if(c&&(F=0),h.$18i.fire({kind:"beginToggle",target:h,id:r.$15i}),v.expanded){var e=function(){Q[A]="control-button button-toggle",Q[A]+=Z.indexOf("Bottom")>=0?" button-toggle-expand":" button-toggle-collapse",B(O,T,O.clientWidth+$),v.expanded=!1,B(r.children[0],"border-bottom",h.$55i(v)),D(O).duration(F).set("opacity",R).set(W,R).end(V),o&&r===C&&D(r).duration(F).set(z,r.$51i+$).end(),r[A]+=" panel-collapse",D(r).duration(F).set("padding-bottom",R).end(),h.$28i(v,!0),h.$10i()};o&&r===C&&h.$14i(),e()}else Q[A]="control-button button-toggle",Q[A]+=Z.indexOf("Bottom")>=0?" button-toggle-collapse":" button-toggle-expand",B(O,T,m),v.expanded=!0,B(r.children[0],"border-bottom",h.$55i(v)),D(O).duration(F).set("opacity","1").set(W,O.scrollHeight+$).end(V),o&&r===C&&D(r).duration(F).set(z,(r.$26i||r.offsetWidth)+$).end(),r[A]=r[A].replace(" panel-collapse",m),D(r).duration(F).end(),h.$28i(v,!0),h.$10i()}},$16i:function(){var a=this._view,K=a.$22i,O=a.$23i,C=this.$2i;return K==E&&(C.indexOf(o)>=0?K=a.$22i=0:C.indexOf(k)>=0&&(K=a.$22i=100)),O==E&&(C.indexOf("Top")>=0?O=a.$23i=0:C.indexOf("Bottom")>=0&&(O=a.$23i=100)),[K,O]},$25i:function(){var D=this,O=D._view,X=O.$21i,f=D.$20i(),N=D.$16i(),E=N[0],H=N[1],Q=D.$2i;O.children[0].style.display=h,O.children[1].style.display=h,O.children[2].style.display=m,B(O,"padding",R),B(O,z,f+$),"leftTop"===Q?(B(O,o,C(K(O,o))+(X.width-f)*E/100+$),B(O,y,C(K(O,y))+(X.height-f)*H/100+$)):"leftBottom"===Q?(B(O,o,C(K(O,o))+(X.width-f)*E/100+$),B(O,g,C(K(O,g))+(X.height-f)*(1-H/100)+$)):"rightTop"===Q?(B(O,k,C(K(O,k))+(X.width-f)*(1-E/100)+$),B(O,y,C(K(O,y))+(X.height-f)*H/100+$)):"rightBottom"===Q&&(B(O,k,C(K(O,k))+(X.width-f)*(1-E/100)+$),B(O,g,C(K(O,g))+(X.height-f)*(1-H/100)+$)),O[A]+=" panel-minimized",D.$18i.fire({kind:"endMinimize",target:D,id:O.$15i})},$17i:function(){var v=this,Z=v._config,j=v._view;B(j,"-webkit-transform",m),B(j,"-ms-transform",m),B(j,"transform",m),Z.minimized?v.$25i():(v.$18i.fire({kind:"endRestore",target:v,id:Z.id}),j[A]=j[A].replace(" panel-minimized",m)),delete j.$19i},minimize:function(C){var z=this,F=z._view;if(!F.$19i&&F.children[0].style.display!==h){var d=z._config,Q=F.getBoundingClientRect(),l=z.$20i(),H=Q.width,M=Q.height,R=l/H,q=l/M,A=z.$16i(),L=A[0],v=A[1];F.$52i=R,F.$53i=q,F.$21i=Q,z.$18i.fire({kind:"beginMinimize",target:z,id:F.$15i});var S=200;C&&(S=0),d.minimized=!0,F.$19i=!0,d.expanded&&(F.$26i=F.offsetWidth);var X=L+"% "+v+"%";B(F,"-webkit-transform-origin",X),B(F,"-ms-transform-origin",X),B(F,"transform-origin",X),D(F).duration(S).scale(R,q).end(function(){z.$17i()}),z.$10i()}},restore:function(){var Y,M,c,G,e,j,H,b,O,q,J,f,L=this,l=L._view,F=l.parentNode,p=L._config;if(!l.$19i&&p.minimized){var _=l.$21i,U=l.$52i,a=l.$53i,P=(p.borderWidth+$,L.$20i()),t=r(F),Q=L.$2i;"leftTop"===Q?(Y=C(K(l,o)),c=C(K(l,y)),e=Y,H=c,O=Y+_.width-t.width,q=c+_.height-t.height,O>0&&(O>=Y?Y=0:Y-=O),q>0&&(q>=c?c=0:c-=q),J=100*((e-Y)/(_.width-P)),f=100*((H-c)/(_.height-P)),B(l,o,Y+$),B(l,y,c+$)):"leftBottom"===Q?(Y=C(K(l,o)),G=C(K(l,g)),e=Y,b=G,O=Y+_.width-t.width,q=G+_.height-t.height,O>0&&(O>=Y?Y=0:Y-=O),q>0&&(q>=G?G=0:G-=q),J=100*((e-Y)/(_.width-P)),f=100*(1-(b-G)/(_.height-P)),B(l,o,Y+$),B(l,g,G+$)):"rightTop"===Q?(M=C(K(l,k)),c=C(K(l,y)),j=M,H=c,O=M+_.width-t.width,q=c+_.height-t.height,O>0&&(O>=M?M=0:M-=O),q>0&&(q>=c?c=0:c-=q),J=100*(1-(j-M)/(_.width-P)),f=100*((H-c)/(_.height-P)),B(l,k,M+$),B(l,y,c+$)):"rightBottom"===Q&&(M=C(K(l,k)),G=C(K(l,g)),j=M,b=G,O=M+_.width-t.width,q=G+_.height-t.height,O>0&&(O>=M?M=0:M-=O),q>0&&(q>=G?G=0:G-=q),J=100*(1-(j-M)/(_.width-P)),f=100*(1-(b-G)/(_.height-P)),B(l,k,M+$),B(l,g,G+$)),l.children[0].style.display="block",l.children[1].style.display="block",l.children[2].style.display=h,B(l,"-webkit-transform","scale("+U+", "+a+")"),B(l,"-ms-transform","scale("+U+", "+a+")"),B(l,"transform","scale("+U+", "+a+")"),l.$22i=J,l.$23i=f,B(l,"-webkit-transform-origin",J+"% "+f+"%"),B(l,"-ms-transform-origin",J+"% "+f+"%"),B(l,"transform-origin",J+"% "+f+"%"),p.narrowWhenCollapse&&!p.expanded?B(l,z,l.$51i+$):B(l,z,l.$26i+$),L.$18i.fire({kind:"beginRestore",target:L,id:l.$15i}),l.$19i=!0,p.minimized=!1,N(function(){D(l).scale(1,1).end(function(){L.$17i()})},30),L.$10i()}},addEventListener:function(k,l,b){this.$18i.add(k,l,b)},removeEventListener:function(P,E){this.$18i.remove(P,E)},setPosition:function(W,x){var c=this._view,O=this.$2i;"leftTop"===O?(B(c,o,W+$),B(c,y,x+$),B(c,k,m),B(c,g,m)):"leftBottom"===O?(B(c,o,W+$),B(c,g,x+$),B(c,k,m),B(c,y,m)):"rightTop"===O?(B(c,k,W+$),B(c,y,x+$),B(c,o,m),B(c,g,m)):"rightBottom"===O&&(B(c,k,W+$),B(c,g,x+$),B(c,o,m),B(c,y,m)),delete c.$22i,delete c.$23i},getPosition:function(){var N=this._view,e=this.$2i;return"leftTop"===e?{x:C(K(N,o)),y:C(K(N,y))}:"leftBottom"===e?{x:C(K(N,o)),y:C(K(N,g))}:"rightTop"===e?{x:C(K(N,k)),y:C(K(N,y))}:"rightBottom"===e?{x:C(K(N,k)),y:C(K(N,g))}:void 0},setPositionRelativeTo:function(K){var V=this,X=V._view.querySelectorAll(".button-toggle"),q="control-button button-toggle",u=V.getPosition();V.$2i=K,V.setPosition(u.x,u.y);for(var $=0;$<X.length;$++){var B=X[$],n=V.getPanelConfig(B.parentNode.parentNode.parentNode.$15i);B[A]=n.expanded?K.indexOf("Bottom")>=0?q+" button-toggle-collapse":q+" button-toggle-expand":K.indexOf("Bottom")>=0?q+" button-toggle-expand":q+" button-toggle-collapse"}V.iv()},getPositionRelativeTo:function(){return this.$2i},invalidate:function(b){var A=this;A._68I||(A._68I=1,S.callLater(A.validate,A,E,b),A.onInvalidated&&A.onInvalidated(),A.fireViewEvent("invalidate"));var Y=this._config,x=Y.content;x&&x.invalidate&&x.invalidate(),Y.items&&Y.items.forEach(function(c){c&&c.content&&c.content.invalidate&&c.content.invalidate()})},getIconStretch:function(){var g=this._config.iconStretch||"fill";return g},$27i:function(u,E,V,Y,F){var J=x.initContext(u);x.translateAndScale(J,0,0,1),J.clearRect(0,0,V,V);var g=(V-Y)/2;S.drawStretchImage(J,S.getImage(E),this.getIconStretch(F),0,g,Y,Y),J.restore()},$28i:function(I){var p,u,w,N=this,v=I.id,s=N.getPanelView(v),m=s.querySelector(".button-toggle"),P=N.$2i.indexOf("Bottom")>=0;if(u=P?S.panelCollapseIcon:S.panelExpandIcon,w=P?S.panelExpandIcon:S.panelCollapseIcon,m){p=I.expanded?S.getImage(w):S.getImage(u);var B=N.$4i(I),b=N.$5i(I);N.$27i(m,p,B,b,"toggle")}},$29i:function(F){var L,q=this,N=F.id,r=q.getPanelView(N),m=r.querySelector(".button-independent-switch"),f=S.panelUnLockIcon,s=S.panelLockIcon;if(m){L=F.independent!==!0?S.getImage(s):S.getImage(f);var $=q.$4i(F),d=q.$5i(F);q.$27i(m,L,$,d,"switch")}},$30i:function(G){var L=this,c=G.id,q=L.getPanelView(c),W=q.querySelector(".button-minimize-minimize"),g=S.panelMinimizeIcon;if(W){var O=L.$4i(G),o=L.$5i(G);L.$27i(W,S.getImage(g),O,o,"miminize")}},$31i:function(V){var X=this,m=V.id,L=X.getPanelView(m),g=L.querySelector(".button-minimize-restore"),b=V.titleIcon||S.panelRestoreIcon;if(g){var U=X.$20i();X.$27i(g,S.getImage(b),U,U,"restore")}},$32i:function(a){var Z=this,M=a.id,T=Z.getPanelView(M);if(a.buttons){var N=a.buttons;N.forEach(function(D){var W=D.name,B=D.icon;if(W&&B){var M=T.querySelector(".custombutton-"+W);if(M){var X=Z.$4i(a),O=Z.$5i(a)-1;Z.$27i(M,S.getImage(B),X,O,"custom")}}})}},$33i:function(w){var t=this,J=w.id,B=t.getPanelView(J),x=B.querySelector(".panel-title-icon"),h=w.titleIcon;if(x&&h){var n=t.$4i(w),P=t.$5i(w);t.$27i(x,S.getImage(h),n,P,"title")}},validateImpl:function(){var M=this,z=M._config;M.$28i(z),M.$30i(z),M.$31i(z),M.$32i(z),M.$33i(z),z.items&&z.items.forEach(function(y){M.$28i(y),M.$29i(y),M.$32i(y)})}});var P=function(t){var q=this,U=t.getView();q.$34i=t,q.addListeners(),F(U,"dblclick",q.$42i.bind(q))};S.def(P,M,{ms_listener:1,getView:function(){return this.$34i.getView()},clear:function(){delete this.$37i,delete this.$38i,delete this.$36i,delete this.$39i},$42i:function(p){for(var v=this.$34i,n=p.target,D=v.$35i,J=D.length,R=0;J>R;R++){var i=D[R];i.contains(n)&&(p.preventDefault(),v.togglePanel(i.parentNode.$15i))}},handle_touchstart:function(h){var H=this,O=H.$34i,s=O._config,C=s.flowLayout,N=h;if(S.isLeftButton(h)){var I=h.target,J=O.getView().children[0],o=O.getView().querySelector(".button-minimize-restore");j&&(N=e(h));var u=H.$40i={x:N.pageX,y:N.pageY};H.$41i={x:u.x,y:u.y},(!C&&J.contains(I)||o&&o.contains(I))&&(H.$38i=!0,S.startDragging(H,h)),!C&&H.handle_mousemove(h)&&(H.$37i=!0,S.startDragging(H,h),O.$11i())}},handle_mousedown:function(T){this.handle_touchstart(T)},handle_touchend:function(e){var W=this,P=W.$34i,K=e.target,d=P.$35i,H=d.length,V=0,D=P.getView(),X=D.querySelector(".button-minimize"),l=D.querySelector(".button-minimize-restore");if(!W.$39i&&!W.$36i){if(X&&X.contains(K)||l&&l.contains(K))e.preventDefault(),P._config.minimized?P.restore():P.minimize();else for(;H>V;V++){var T=d[V],v=T.parentNode,Z=v.$15i,k=P.getPanelConfig(Z),N=T.querySelector(".button-toggle"),u=T.querySelector(".button-independent-switch");if(N===K)e.preventDefault(),P.togglePanel(Z);else if(u===K){e.preventDefault();var p="button-independent-switch-off",i="button-independent-switch-on";k.independent=k.independent==E?!0:!k.independent,u[A]=k.independent?u[A].replace(p,i):u[A].replace(i,p),P.$29i(k)}else K[A]&&K[A].indexOf("control-button custombutton-")>=0&&T.contains(K)&&K._action.call(P,k,P.getPanelView(Z),e)}delete W.$40i,delete W.$41i}},handle_mouseup:function(f){this.handle_touchend(f)},handleWindowTouchEnd:function(){var i=this,b=i.$34i;i.$37i&&i.$36i?(b.$18i.fire({kind:"endResize",target:b,id:b.getView().$15i}),b.$12i()):i.$38i&&i.$39i&&b.$18i.fire({kind:"endMove",target:b,id:b.getView().$15i}),this.clear()},handleWindowMouseUp:function(G){this.handleWindowTouchEnd(G)},handle_mousemove:function(C){var f=this,P=f.getView(),q=P.querySelector(".resize-area"),N=q.getBoundingClientRect(),T={x:N.left,y:N.top,width:N.width,height:N.height};C=j?e(C):C;var d=C.clientX,n=C.clientY,$=f.$34i._config;return $.expanded&&$.minimized!==!0&&S.containsPoint(T,{x:d,y:n})?(P.style.cursor="nwse-resize",!0):(P.style.cursor=m,void 0)},handleWindowTouchMove:function(E){E.preventDefault();var x=E;j&&(x=e(E));var u=this,H=u.$40i,O=u.$41i;if(!(O.x==H.x&&O.y==H.y&&S.getDistance(O,{x:x.pageX,y:x.pageY})<=1)){var s=u.$34i,L=u.getView(),l=L.parentNode,R=s._config,J=R.resizeMode||"wh",W=x.pageX-H.x,d=x.pageY-H.y,f=s.$2i;if(u.$37i){var p=L.children[1].children[0],t=L.offsetWidth,M=p.offsetHeight,h=t+W,v=M+d;h=Math.max(h,100),v=Math.max(v,100),"w"===J?(B(L,T,h+$),R.width=h):"h"===J?(B(p,i,v+$),R.contentHeight=v):"wh"===J&&(B(L,T,h+$),B(p,i,v+$),R.width=h,R.contentHeight=v),f.indexOf("right")>=0&&B(L,k,C(K(L,k))-(h-t)+$),f.indexOf("Bottom")>=0&&B(L,g,C(K(L,g))-(v-M)+$),H.x=x.pageX,H.y=x.pageY;var G=R.content;G&&G.isSelfViewEvent&&(G.setX(0),G.setY(0),G.setWidth(R.width-2*(R.borderWidth||0)),G.setHeight(R.contentHeight)),u.$36i?s.$18i.fire({kind:"betweenResize",target:s,id:s.getView().$15i}):(u.$36i=!0,s.$18i.fire({kind:"beginResize",target:s,id:s.getView().$15i}))}else if(u.$38i){var P,Z,X,F,N,c,_,I,w,Q,V=L.getBoundingClientRect(),z=V.width,U=V.height,D=r(l),A=D.width,b=D.height,q=s._dragContainment;"leftTop"===f?(P=C(K(L,o))||0,X=C(K(L,y))||0,N=P+W,_=X+d,"parent"===q&&(N+z>A&&(N=A-z),_+U>b&&(_=b-U),0>N&&(N=0),0>_&&(_=0)),w=N-P,Q=_-X,s.setPosition(N,_),H.x+=w,H.y+=Q):"rightBottom"===f?(Z=C(K(L,k))||0,F=C(K(L,g))||0,c=Z-W,I=F-d,"parent"===q&&(0>c&&(c=0),0>I&&(I=0),c+z>A&&(c=A-z),I+U>b&&(I=b-U)),w=c-Z,Q=I-F,s.setPosition(c,I),H.x-=w,H.y-=Q):"rightTop"===f?(Z=C(K(L,k))||0,X=C(K(L,y))||0,c=Z-W,_=X+d,"parent"===q&&(0>c&&(c=0),0>_&&(_=0),c+z>A&&(c=A-z),_+U>b&&(_=b-U)),w=c-Z,Q=_-X,s.setPosition(c,_),H.x-=w,H.y+=Q):"leftBottom"===f&&(P=C(K(L,o))||0,F=C(K(L,g))||0,N=P+W,I=F-d,"parent"===q&&(0>N&&(N=0),0>I&&(I=0),N+z>A&&(N=A-z),I+U>b&&(I=b-U)),w=N-P,Q=I-F,s.setPosition(N,I),H.x+=w,H.y-=Q),u.$39i?s.$18i.fire({kind:"betweenMove",target:s,id:s.getView().$15i}):(u.$39i=!0,s.$18i.fire({kind:"beginMove",target:s,id:s.getView().$15i}))}}},handleWindowMouseMove:function(P){this.handleWindowTouchMove(P)}});var Z=f.widget.PanelGroup=function(K){var y=this,v=y._view=x.createView(null,y);v.style.border="1px dashed black",v.style.position="absolute",v.style.background="rgba(120, 120, 120, 0.4)",y.$48i=new f.List,y._tolerance=100,y._config=K||{hGap:0,vGap:0},y.bindHandlePanelMove=y.handlePanelMove.bind(y),y.bindHandlePanelEvent=y.handlePanelEvent.bind(y),y.invalidate()};S.def(Z,M,{invalidate:function(){var i=this;i._68I||(i._68I=1,N(function(){i.validate()},50))},validate:function(){if(this._68I){delete this._68I;var M=this.$48i.get(0);if(M){var C=M.getView().parentNode;C&&(this.layoutPanels(C,"leftTop"),this.layoutPanels(C,"rightTop"),this.layoutPanels(C,"leftBottom"),this.layoutPanels(C,"rightBottom"))}}},setLeftTopPanels:function(){var R=this,z=R.$43i,I=R.$48i;z==E&&(z=R.$43i=new f.List);for(var M=0;M<arguments.length;M++){var t=arguments[M];if("string"==typeof t)z.$49i=t;else{if(t._config.flowLayout)continue;t.setPositionRelativeTo("leftTop"),z.contains(t)||z.add(t),I.contains(t)||R.add(t)}}},setRightTopPanels:function(){var c=this,l=c.$44i,R=c.$48i;l==E&&(l=c.$44i=new f.List);for(var o=0;o<arguments.length;o++){var z=arguments[o];if("string"==typeof z)l.$49i=z;else{if(z._config.flowLayout)continue;z.setPositionRelativeTo("rightTop"),l.contains(z)||l.add(z),R.contains(z)||c.add(z)}}},setLeftBottomPanels:function(){var G=this,o=G.$45i,l=G.$48i;o==E&&(o=G.$45i=new f.List);for(var L=0;L<arguments.length;L++){var q=arguments[L];if("string"==typeof q)o.$49i=q;else{if(q._config.flowLayout)continue;q.setPositionRelativeTo("leftBottom"),o.contains(q)||o.add(q),l.contains(q)||G.add(q)}}},setRightBottomPanels:function(){var c=this,L=c.$46i,R=c.$48i;L==E&&(L=c.$46i=new f.List);for(var m=0;m<arguments.length;m++){var D=arguments[m];if("string"==typeof D)L.$49i=D;else{if(D._config.flowLayout)continue;D.setPositionRelativeTo("rightBottom"),L.contains(D)||L.add(D),R.contains(D)||c.add(D)}}},add:function(S){if(!S._config.flowLayout){var L=this,W=L.$48i;W.contains(S)||(S.addEventListener(L.bindHandlePanelMove),S.addEventListener(L.bindHandlePanelEvent),W.add(S))}},remove:function(i){var W=this,M=W.$48i;M.contains(i)&&(i.removeEventListener(W.bindHandlePanelMove),i.removeEventListener(W.bindHandlePanelEvent),M.remove(i),W.$43i.contains(i)&&W.$43i.remove(i),W.$44i.contains(i)&&W.$44i.remove(i),W.$45i.contains(i)&&W.$45i.remove(i),W.$46i.contains(i)&&W.$46i.remove(i))},layoutPanels:function(n,N,y){var W=this,c=W._config,O=c.hGap||0,p=c.vGap||0;if(n){var l=W.$43i;if("leftBottom"===N?l=W.$45i:"rightTop"===N?l=W.$44i:"rightBottom"===N&&(l=W.$46i),!l)return;var i=l.$49i,q=O,T=p;if(n.contains(W._view)&&n.removeChild(W._view),l&&l.size()>0)for(var t=0;t<l.size();t++){var Q=l.get(t),D=Q.getView();n=n||D.parentNode,y!==t?Q.setPosition(q,T):("leftTop"===N?(W._view.style.right="",W._view.style.bottom="",W._view.style.left=q+$,W._view.style.top=T+$):"leftBottom"===N?(W._view.style.right="",W._view.style.top="",W._view.style.left=q+$,W._view.style.bottom=T+$):"rightTop"===N?(W._view.style.left="",W._view.style.bottom="",W._view.style.right=q+$,W._view.style.top=T+$):"rightBottom"===N&&(W._view.style.left="",W._view.style.top="",W._view.style.right=q+$,W._view.style.bottom=T+$),W._view.style.width=D.offsetWidth+$,W._view.style.height=D.offsetHeight+$,n.insertBefore(W._view,D)),"h"===i?q+=D.offsetWidth+O:"v"===i&&(T+=D.offsetHeight+p)}}},handlePanelEvent:function(z){if("beginToggle"===z.kind||"endToggle"===z.kind||"beginRestore"===z.kind||"endMinimize"===z.kind||"endResize"===z.kind){var H=this,R=z.target,l=R.getView(),S=l.parentNode,I=H.$43i,s=H.$44i,A=H.$45i,j=H.$46i,J=H._config,W=E,G=E,_=R.$47i;if(_==E&&(_=R.$47i=0),"beginToggle"===z.kind?_=R.$47i=_+1:"endToggle"===z.kind&&(_=R.$47i=_-1),I&&I.contains(R)?(W="leftTop",G=I):A&&A.contains(R)?(W="leftBottom",G=A):s&&s.contains(R)?(W="rightTop",G=s):j&&j.contains(R)&&(W="rightBottom",G=j),"beginToggle"===z.kind&&W&&1===_){var n=v(),c=n.style,V=G.$49i,C="each";c.fontSize="0",c.position="absolute",c.width="100%","leftTop"===W?(c.left=0,c.top=0):"leftBottom"===W?(c.left=0,c.bottom=0,"v"===V&&(C="reverseEach")):"rightTop"===W?(c.right=0,c.top=0,c.textAlign="right","h"===V&&(C="reverseEach")):"rightBottom"===W&&(c.right=0,c.bottom=0,c.textAlign="right",C="reverseEach"),G[C](function(h){var f=h.getView(),X=f.style,F=v();X.position="static",F.style.textAlign="left",F.style.position="relative",F.style.display="inline-block","leftTop"===W?(F.style.marginLeft=J.hGap+$,F.style.marginTop=J.vGap+$):"leftBottom"===W?(F.style.marginLeft=J.hGap+$,F.style.marginBottom=J.vGap+$):"rightTop"===W?(F.style.marginRight=J.hGap+$,F.style.marginTop=J.vGap+$):"rightBottom"===W&&(F.style.marginRight=J.hGap+$,F.style.marginBottom=J.vGap+$),F.appendChild(f),n.appendChild(F),"h"===V?F.style.verticalAlign="leftTop"===W||"rightTop"===W?"top":"bottom":n.appendChild(w("br"))}),H.$54i=n,S.appendChild(n)}else"endToggle"===z.kind&&W&&0===_?N(function(){S=S.parentNode.parentNode,S.removeChild(H.$54i),delete H.$54i,G.each(function(D){var E=D.getView(),M=E.style;M.position="absolute",S.appendChild(E)}),H.layoutPanels(S,W)},30):("beginRestore"===z.kind||"endMinimize"===z.kind||"endResize"===z.kind)&&W&&H.layoutPanels(S,W)}},handlePanelMove:function(G){if(!(G.kind.indexOf("Move")<0)){var m=this,n=m._config,v=n.hGap||0,R=n.vGap||0,H=G.target,N=H._view,O=N.getBoundingClientRect(),Y=O.width,B=O.height,U=Y/2,F=B/2,T=N.parentNode,w=m.$43i,X=m.$44i,o=m.$45i,J=m.$46i,g=T.getBoundingClientRect(),b=m._tolerance;if("endMove"===G.kind){var K=m._corner;K&&(H.setPositionRelativeTo(K),m.layoutPanels(T,K)),delete m._corner}if("betweenMove"===G.kind){var u=g.left,V=g.top,q=g.width,a=g.height,y=O.left+Y/2,k=O.top+B/2;w==E&&(w=m.$43i=new f.List),o==E&&(o=m.$45i=new f.List),X==E&&(X=m.$44i=new f.List),J==E&&(J=m.$46i=new f.List),delete m._corner,w.contains(H)?(w.remove(H),m.layoutPanels(T,"leftTop")):o.contains(H)?(o.remove(H),m.layoutPanels(T,"leftBottom")):X.contains(H)?(X.remove(H),m.layoutPanels(T,"rightTop")):J.contains(H)&&(J.remove(H),m.layoutPanels(T,"rightBottom"));var Q=function(Y,A){var B=u+v,P=V+R;if(0===A.size()){var e=B+U,K=P+F;"leftBottom"===Y?K=V+a-R-F:"rightTop"===Y?e=u+q-v-U:"rightBottom"===Y&&(e=u+q-v-U,K=V+a-R-F);var z=y-e,w=k-K,n=Math.sqrt(z*z+w*w);if(b>n)return m._corner=Y,A.add(H),m.layoutPanels(T,Y,0),!0}else if(1===A.size()){var d=A.get(0),D=d.getView().getBoundingClientRect(),_=D.left+U,f=D.top+F,S=D.left+D.width+v+U,$=P+F,J=B+U,W=D.top+D.height+R+F;"leftBottom"===Y?(f=D.top+D.height-F,$=V+a-R-F,W=D.top-R-F):"rightTop"===Y?(_=D.left+D.width-U,S=D.left-v-U,J=u+q-v-U):"rightBottom"===Y&&(_=D.left+D.width-U,f=D.top+D.height-F,S=D.left-v-U,$=V+a-R-F,J=u+q-v-U,W=D.top-R-F);var r=y-_,O=k-f,c=y-S,l=k-$,p=y-J,G=k-W,M=C(Math.sqrt(r*r+O*O)),L=C(Math.sqrt(c*c+l*l)),N=C(Math.sqrt(p*p+G*G)),g=[M,L,N];g.sort(function(e,V){return e-V});var o=g[0];if(b>o){if(m._corner=Y,o===M)return A.add(H,0),m.layoutPanels(T,Y,0),!0;if(o===L)return A.add(H),A.$49i="h",m.layoutPanels(T,Y,1),!0;if(o===N)return A.add(H),A.$49i="v",m.layoutPanels(T,Y,1),!0}}else if(A.size()>1){for(var j=E,X={},x=[],t=A.$49i,Q=0;Q<A.size();Q++){var Z=A.get(Q),I=Z.getView(),s=I.getBoundingClientRect(),h=s.left+U,i=s.top+F;"leftBottom"===Y?i=s.top+s.height-F:"rightTop"===Y?h=s.left+s.width-U:"rightBottom"===Y&&(h=s.left+s.width-U,i=s.top+s.height-F),Q===A.size()-1&&(j=s);var z=y-h,w=k-i,n=C(Math.sqrt(z*z+w*w));X[n]=Q,x.push(n)}"leftTop"===Y&&"h"===t?(e=j.left+j.width+v+U,K=P+F):"leftTop"===Y&&"v"===t?(e=B+U,K=j.top+j.height+R+F):"leftBottom"===Y&&"h"===t?(e=j.left+j.width+v+U,K=V+a-R-F):"leftBottom"===Y&&"v"===t?(e=B+U,K=j.top-R-F):"rightTop"===Y&&"h"===t?(e=j.left-v-U,K=P+F):"rightTop"===Y&&"v"===t?(e=u+q-v-U,K=j.top+j.height+R+F):"rightBottom"===Y&&"h"===t?(e=j.left-v-U,K=V+a-R-F):"rightBottom"===Y&&"v"===t&&(e=u+q-v-U,K=j.top-R-F),z=y-e,w=k-K,n=C(Math.sqrt(z*z+w*w)),X[n]=Q,x.push(n),x.sort(function(b,O){return b-O});var o=x[0];if(b>o)return m._corner=Y,A.add(H,X[o]),m.layoutPanels(T,Y,X[o]),!0}};Q("leftTop",w)||Q("leftBottom",o)||Q("rightTop",X)||Q("rightBottom",J)}}}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);