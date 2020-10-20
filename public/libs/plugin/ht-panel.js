!function(b,G,d){"use strict";var z="ht",n=b[z],U=n.Default,A=U.isTouchable,X=U.isTouchEvent,o=n.Color,$="px",l="0",x="innerHTML",I="className",W="position",t="absolute",f="width",Z="height",j="left",e="top",B="right",w="bottom",P="max-width",u="max-height",h=null,C="none",g="",E=b.parseInt,N=b.setTimeout,K=U.getInternal(),S=U.animate,J=o.titleIconBackground,L=function(){return document},k=function(M){return L().createElement(M)},Q=function(){return k("div")},D=function(){return k("canvas")},O=function(Z,J,r){Z.style.setProperty(J,r,h)},H=function(y,d){return y.style.getPropertyValue(d)},s=function(l,A){l.appendChild(A)},i=function(A,e){A.removeChild(e)},V=K.addEventListener,p=(K.removeEventListener,function(T){var g=T.scrollWidth,R=T.scrollHeight;return T===L().body&&(g=Math.max(g,L().documentElement.scrollWidth),R=Math.max(R,L().documentElement.scrollHeight)),{width:g,height:R}}),c=function(u){var B=u.touches[0];return B?B:u.changedTouches[0]};K.addMethod(U,{panelExpandIcon:{width:16,height:16,comps:[{type:"triangle",rect:[4,4,10,8],background:J,rotation:3.14}]},panelCollapseIcon:{width:16,height:16,comps:[{type:"triangle",rect:[4,4,10,8],background:J}]},panelLockIcon:{width:100,height:100,comps:[{type:"roundRect",rect:[10,50,80,40],borderWidth:10,borderColor:J},{type:"shape",points:[37,45,37,20,37,13,43,13,63,13,69,13,70,19,70,44],segments:[1,2,3,2,3,2],borderWidth:10,borderColor:J}]},panelUnLockIcon:{width:100,height:100,comps:[{type:"roundRect",rect:[10,50,80,40],borderWidth:10,borderColor:J},{type:"shape",points:[37,45,37,20,37,13,43,13,63,13,69,13,70,19,70,26],segments:[1,2,3,2,3,2],borderWidth:10,borderColor:J}]},panelMinimizeIcon:{width:100,height:100,comps:[{type:"shape",points:[10,35,35,35,35,10],segments:[1,2,2],borderWidth:8,borderColor:J},{type:"shape",points:[90,35,65,35,65,10],segments:[1,2,2],borderWidth:8,borderColor:J},{type:"shape",points:[10,65,35,65,35,90],segments:[1,2,2],borderWidth:8,borderColor:J},{type:"shape",points:[65,90,65,65,90,65],segments:[1,2,2],borderWidth:8,borderColor:J}]},panelRestoreIcon:{width:300,height:300,comps:[{type:"rect",rect:[10,24,268,56],background:J},{type:"rect",rect:[10,118,268,56],background:J},{type:"rect",rect:[10,213,268,56],background:J}]},panelTitleLabelColor:U.labelSelectColor,panelTitleLabelFont:U.labelFont,panelContentLabelFont:U.labelFont,panelTitleBackground:o.titleBackground,panelSeparatorWidth:1,panelSeparatorColor:d},!0);var T=n.widget.Panel=function(d){var H=this,B=H._view=K.createView(null,H);H.$1i=0,H.$18i=new n.Notifier,H.$2i="leftTop",O(B,e,l),O(B,j,l),O(B,W,t),O(B,"overflow","hidden"),H._interactor=new Y(H),H.setConfig(d),H.addEventListener(function(y){var K=H.getPanelConfig(y.id),g=K.content;("beginRestore"===y.kind||"betweenResize"===y.kind||"endToggle"===y.kind)&&(g&&g.invalidate&&g.invalidate(),K.items&&K.items.forEach(function(z){z&&z.content&&z.content.invalidate&&z.content.invalidate()}))})};U.def(T,G,{ms_v:1,_dragContainment:"parent",setConfig:function(k){function Y(e){e.expanded=!e.expanded,M.togglePanel(e.id,!0,!0)}if(k){for(var M=this,u=M._view.parentNode;this._view.children.length;)this._view.removeChild(this._view.children[0]);M._config=k,M.$35i=[],k.expanded==h&&(k.expanded=k.expand!=h?k.expand:!0);var K=M._view,T=M.$24i(k,K,!0),v=T[2],U=k.width;M.$35i.push(T[1]),k.items&&k.items.forEach(function(B){B.expanded==h&&(B.expanded=B.expand!=h?B.expand:!0);var e=M.$24i(B,v.children[0]);M.$35i.push(e[1])});var R=Q();O(R,f,10+$),O(R,Z,10+$),O(R,W,t),O(R,w,l),O(R,B,l),R[I]="resize-area",s(K,R),M.$10i(),k.flowLayout&&O(K,W,"relative"),O(K,"opacity",l),s(L().body,K),U==h&&(U=K.offsetWidth),O(K,f,U+$),O(K,P,U+$);var D=k.content;D&&D.isSelfViewEvent&&(D.setX(0),D.setY(0),D.setWidth(U-2*(k.borderWidth||0)),D.setHeight(k.contentHeight)),k.items&&k.items.forEach(function(A){Y(A)}),k.buttons&&k.buttons.indexOf("toggle")<0||Y(k),k.minimized==h&&k.minimize!=h&&(k.minimized=k.minimize),k.minimized&&k.minimizable!==!1&&M.minimize(!0),i(L().body,K),O(K,"opacity",g),u&&s(u,K),M.iv()}},getPanelConfig:function(L){var i=this,y=i._config,V=y.items;if(y.id===L)return y;if(V)for(var B=0;B<V.length;B++){var t=V[B];if(t.id===L)return t}},getPanelView:function(Y){for(var i=this,p=i.$35i,o=0;o<p.length;o++){var s=p[o],T=s.parentNode;if(T.$15i===Y)return T}},setDragContainment:function(L){this._dragContainment=L},getDragContainment:function(){return this._dragContainment},$20i:function(){var c=this._config,P=c.restoreIconSize||24;return P},$5i:function(R){var j=R.titleIconSize||16;return A&&(j*=1.2),j},$4i:function(B){var u=B.titleHeight||U.widgetTitleHeight;return u},setTitle:function(m,J){if(J==h&&(J=this._config.id),J!=h){var o=this.getPanelConfig(J),Q=this.getPanelView(J);o.title=m,Q.querySelector(".panel-title span").innerHTML=m}},setInnerPanel:function(E){var d,i,r=this,b=E.id,u=r.$35i,L=!1;if(E.expanded==h&&(E.expanded=!0),b!=h){var M=r.getPanelConfig(b);if(M){L=!0;var v,H=r.getPanelView(b),X=H.parentNode,t=H.children[0];if(H!==r._view){r.$11i();for(v in M)delete M.key;for(v in E)M[v]=E[v];d=r.$24i(E,X,!1,H),i=d[1],X.removeChild(H);for(var Y=0;Y<u.length;Y++)if(u[Y]===t){u.splice(Y,1,i);break}r.$12i(),M.expanded=!M.expanded,r.togglePanel(M.id,!0,!0),r.iv()}}}if(!L){r.$11i(),d=r.$24i(E,r._view.children[1]),i=d[1],u.push(i),r._config.items||(r._config.items=[]);var Z=r._config.items;if(Z.push(E),r.$12i(),Z.length>1){var K=Z[Z.length-2],C=r.getPanelView(K.id).children[0];O(C,"border-bottom",r.$55i(K))}E.expanded=!E.expanded,r.togglePanel(E.id,!0,!0),r.iv()}},removeInnerPanel:function(v){var R,i=this,g=-1,o=i._config.items;if(o)for(R=0;R<o.length;R++){var F=o[R];if(F.id===v){g=R;break}}if(i.$11i(),g>=0){var p=i.$35i,I=i.getPanelView(v),K=I.children[0];for(R=0;R<p.length;R++)if(p[R]===K){p.splice(R,1);break}o.splice(g,1),I.parentNode.removeChild(I)}if(i.$12i(),o.length>0){var Y=o[o.length-1],M=i.getPanelView(Y.id).children[0];O(M,"border-bottom",i.$55i(Y))}},$6i:function(Q){O(Q,"cursor","pointer"),O(Q,"display","inline-block"),O(Q,"margin-right",(A?8:4)+$),O(Q,"vertical-align",e)},$24i:function(m,B,X,t){var Y=this,N=Y._config.flowLayout,i=X?B:Q(),C=Y.$50i(m),T=Y.$3i(m,X);i[I]="ht-widget-panel"+(X?" outer-panel":" inner-panel"),m.borderWidth==h&&(m.borderWidth=X?2:0);var c=m.borderWidth;if(c="0 "+c+$+" "+c+$+" "+c+$+" ",O(i,"border-width",c),O(i,"border-color",m.titleBackground||U.panelTitleBackground),O(i,"border-style","solid"),s(i,T),s(i,C),X||(t?B.insertBefore(i,t):s(B,i)),!N&&X&&m.minimizable!==!1){var q=D(),H=Y.$20i(),v=m.restoreToolTip;K.setCanvas(q,H,H),q[I]="control-button button-minimize button-minimize-restore",Y.$6i(q),O(q,"display","none"),s(B,q),q.title=v||""}var E=m.panelBackground||m.titleBackground||U.panelTitleBackground;if(O(i,"background-color",E),m.id==h){for(var A=Y.$1i++;Y.getPanelConfig(A);)A=Y.$1i++;m.id=A}return i.$15i=m.id,m.width&&(i.style.width=m.width+$),[i,T,C]},$9i:function(z){var h=D();h[I]="control-button button-toggle button-toggle-expand",h.title=z.toggleToolTip||"";var a=this.$4i(z),E=this.$5i(z);return this.$6i(h),K.setCanvas(h,E,a),h},$8i:function(S){var t=D(),$="control-button button-independent-switch";t[I]=S.independent===!0?$+" button-independent-switch-on":$+" button-independent-switch-off",t.title=S.independentSwitchToolTip||"";var R=this.$4i(S),O=this.$5i(S);return this.$6i(t),K.setCanvas(t,O,R),t},$7i:function(i){var u=D();u[I]="control-button button-minimize button-minimize-minimize",u.title=i.minimizeToolTip||"";var x=this.$4i(i),o=this.$5i(i);return this.$6i(u),K.setCanvas(u,o,x),u},$55i:function(p){var M=this._config,s=M.items,w=p.separatorWidth||U.panelSeparatorWidth,x=p.titleBackground||U.panelTitleBackground,l=p.expanded!==!1?x:p.separatorColor||U.panelSeparatorColor||U.brighter(x);return(M===p||s&&s.indexOf(p)===s.length-1)&&(w=0),w+$+" solid "+l},$3i:function(b,C){var T=this,y=T._config.flowLayout,L=Q(),m=Q(),u=T.$4i(b),z=b.titleBackground,p=b.titleColor,F=b.titleIcon,q=b.buttons;if(L[I]="panel-title",O(L,W,"relative"),O(L,"background",z||U.panelTitleBackground),O(L,"color",p||U.panelTitleLabelColor),O(L,e,l),O(L,"box-sizing","border-box"),O(L,"-moz-box-sizing","border-box"),O(L,"padding","0 5px 0 0"),O(L,f,"100%"),O(L,"cursor","default"),O(L,"white-space","nowrap"),O(L,"font",U.panelTitleLabelFont),F){var i=D();i[I]="control-button panel-title-icon";var G=T.$4i(b),r=T.$5i(b);T.$6i(i),K.setCanvas(i,r,G),s(L,i)}var A=k("span");O(A,"display","inline-block"),O(A,"margin-left","5px"),A[x]="<span>"+b.title+"</span>",s(L,A),O(L,"line-height",u+$),m[I]="panel-title-controls",O(m,W,t),O(m,j,l),O(m,B,5+$),O(m,e,l),O(m,w,l),O(m,"text-align",B);var o=function(){var B=T.$9i(b);s(m,B)},a=function(){if(!y&&C&&b.minimizable!==!1){var L=T.$7i(b);s(m,L)}},V=function(){if(!C){var a=T.$8i(b);s(m,a)}},E=function(G){var j=D();j[I]="control-button custombutton-"+G.name,j.title=G.toolTip||"",j._action=G.action;var _=T.$4i(b),C=T.$5i(b);T.$6i(j),K.setCanvas(j,C,_),s(m,j)};if(q)for(var P=0;P<q.length;P++){var d=q[P];"string"==typeof d?"minimize"===d?a():"independentSwitch"===d?V():"toggle"===d&&o():"object"==typeof d&&E(d)}else a(),o();return s(L,m),L},$50i:function(q){var p=Q(),L=q.contentHeight,C=Q();O(C,W,"relative"),p[I]="panel-body",O(p,"overflow","hidden");var j=q.contentBackground;if(j===d&&(j="white"),O(p,"background",j),O(p,"font",U.panelContentLabelFont),s(p,C),q.content){var E,V=q.content;V.getView?(s(C,V.getView()),E=C.children[0]):V instanceof Element?(s(C,V),E=C.children[0]):C[x]=V,V.isSelfViewEvent||E&&(O(E,f,"100%"),O(E,Z,"100%")),L&&O(C,Z,L+$)}return p},$10i:function(){var o=this,q=o._config,G=o._view,a=G.querySelector(".resize-area").style;a.display=q.flowLayout||q.minimized===!0||q.expanded===!1?C:"block"},$11i:function(){var o=this._view,b=o.children[1];this.$13i>=0?this.$13i++:this.$13i=1,O(b,u,g),O(o,P,g)},$12i:function(){var L=--this.$13i;if(0===L){var q=this._view,e=q.children[1];O(e,u,e.scrollHeight+$),O(q,P,q.offsetWidth+$)}},$14i:function(){var p=this._view,C=p.children[0],X=C.children[1].children,_=this._config,k=0;p.$26i=p.offsetWidth,k+=C.children[0].offsetWidth,_.titleIcon&&(k+=C.children[1].offsetWidth,X=C.children[2].children);for(var A=0;A<X.length;A++){var M=X[A];k+=M.offsetWidth+5}p.$51i=k+15},togglePanel:function(c,w,L){function v(t){var H=t.target,e=H.parentNode,i=s.getPanelConfig(e.$15i);delete e.$19i,H!==n&&s.$12i(),s.$18i.fire({kind:"endToggle",target:s,id:i.id})}for(var s=this,m=s._view,n=m.children[1],U=h,D=s.$35i,W=D.length,R=s._config.exclusive,X=s.$2i,B=[],J=s._config.narrowWhenCollapse,i=0;W>i;i++){var Y=D[i],V=Y.parentNode,C=V.$15i,j=s.getPanelConfig(C);C===c&&(U=V),!w&&R&&j.expanded&&V!==m&&C!==c&&j.independent!==!0&&B.push(V)}if(U&&!U.$19i){U.$19i=!0;var r=U.children[1],K=U.querySelector(".button-toggle"),E=s.getPanelConfig(U.$15i);if(!K)return;U===m||E.expanded||E.independent===!0||B.forEach(function(j){s.togglePanel(j.$15i,!0)}),U!==m&&s.$11i();var y=200;if(L&&(y=0),s.$18i.fire({kind:"beginToggle",target:s,id:U.$15i}),E.expanded){var Z=function(){K[I]="control-button button-toggle",K[I]+=X.indexOf("Bottom")>=0?" button-toggle-expand":" button-toggle-collapse",O(r,f,r.clientWidth+$),E.expanded=!1,O(U.children[0],"border-bottom",s.$55i(E)),S(r).duration(y).set("opacity",l).set(u,l).end(v),J&&U===m&&S(U).duration(y).set(P,U.$51i+$).end(),U[I]+=" panel-collapse",S(U).duration(y).set("padding-bottom",l).end(),s.$28i(E,!0),s.$10i()};J&&U===m&&s.$14i(),Z()}else K[I]="control-button button-toggle",K[I]+=X.indexOf("Bottom")>=0?" button-toggle-collapse":" button-toggle-expand",O(r,f,g),E.expanded=!0,O(U.children[0],"border-bottom",s.$55i(E)),S(r).duration(y).set("opacity","1").set(u,r.scrollHeight+$).end(v),J&&U===m&&S(U).duration(y).set(P,(U.$26i||U.offsetWidth)+$).end(),U[I]=U[I].replace(" panel-collapse",g),S(U).duration(y).end(),s.$28i(E,!0),s.$10i()}},$16i:function(){var N=this._view,v=N.$22i,m=N.$23i,t=this.$2i;return v==h&&(t.indexOf(j)>=0?v=N.$22i=0:t.indexOf(B)>=0&&(v=N.$22i=100)),m==h&&(t.indexOf("Top")>=0?m=N.$23i=0:t.indexOf("Bottom")>=0&&(m=N.$23i=100)),[v,m]},$25i:function(){var z=this,b=z._view,k=b.$21i,W=z.$20i(),U=z.$16i(),r=U[0],Q=U[1],Y=z.$2i;b.children[0].style.display=C,b.children[1].style.display=C,b.children[2].style.display=g,O(b,"padding",l),O(b,P,W+$),"leftTop"===Y?(O(b,j,E(H(b,j))+(k.width-W)*r/100+$),O(b,e,E(H(b,e))+(k.height-W)*Q/100+$)):"leftBottom"===Y?(O(b,j,E(H(b,j))+(k.width-W)*r/100+$),O(b,w,E(H(b,w))+(k.height-W)*(1-Q/100)+$)):"rightTop"===Y?(O(b,B,E(H(b,B))+(k.width-W)*(1-r/100)+$),O(b,e,E(H(b,e))+(k.height-W)*Q/100+$)):"rightBottom"===Y&&(O(b,B,E(H(b,B))+(k.width-W)*(1-r/100)+$),O(b,w,E(H(b,w))+(k.height-W)*(1-Q/100)+$)),b[I]+=" panel-minimized",z.$18i.fire({kind:"endMinimize",target:z,id:b.$15i})},$17i:function(){var W=this,o=W._config,k=W._view;O(k,"-webkit-transform",g),O(k,"-ms-transform",g),O(k,"transform",g),o.minimized?W.$25i():(W.$18i.fire({kind:"endRestore",target:W,id:o.id}),k[I]=k[I].replace(" panel-minimized",g)),delete k.$19i},minimize:function(n){var r=this,R=r._view;if(!R.$19i&&R.children[0].style.display!==C){var T=r._config,i=R.getBoundingClientRect(),Z=r.$20i(),M=i.width,I=i.height,L=Z/M,t=Z/I,X=r.$16i(),P=X[0],H=X[1];R.$52i=L,R.$53i=t,R.$21i=i,r.$18i.fire({kind:"beginMinimize",target:r,id:R.$15i});var e=200;n&&(e=0),T.minimized=!0,R.$19i=!0,T.expanded&&(R.$26i=R.offsetWidth);var N=P+"% "+H+"%";O(R,"-webkit-transform-origin",N),O(R,"-ms-transform-origin",N),O(R,"transform-origin",N),S(R).duration(e).scale(L,t).end(function(){r.$17i()}),r.$10i()}},restore:function(){var h,u,X,x,n,v,c,T,a,d,m,g,Z=this,_=Z._view,t=_.parentNode,V=Z._config;if(!_.$19i&&V.minimized){var i=_.$21i,q=_.$52i,k=_.$53i,J=(V.borderWidth+$,Z.$20i()),L=p(t),f=Z.$2i;"leftTop"===f?(h=E(H(_,j)),X=E(H(_,e)),n=h,c=X,a=h+i.width-L.width,d=X+i.height-L.height,a>0&&(a>=h?h=0:h-=a),d>0&&(d>=X?X=0:X-=d),m=100*((n-h)/(i.width-J)),g=100*((c-X)/(i.height-J)),O(_,j,h+$),O(_,e,X+$)):"leftBottom"===f?(h=E(H(_,j)),x=E(H(_,w)),n=h,T=x,a=h+i.width-L.width,d=x+i.height-L.height,a>0&&(a>=h?h=0:h-=a),d>0&&(d>=x?x=0:x-=d),m=100*((n-h)/(i.width-J)),g=100*(1-(T-x)/(i.height-J)),O(_,j,h+$),O(_,w,x+$)):"rightTop"===f?(u=E(H(_,B)),X=E(H(_,e)),v=u,c=X,a=u+i.width-L.width,d=X+i.height-L.height,a>0&&(a>=u?u=0:u-=a),d>0&&(d>=X?X=0:X-=d),m=100*(1-(v-u)/(i.width-J)),g=100*((c-X)/(i.height-J)),O(_,B,u+$),O(_,e,X+$)):"rightBottom"===f&&(u=E(H(_,B)),x=E(H(_,w)),v=u,T=x,a=u+i.width-L.width,d=x+i.height-L.height,a>0&&(a>=u?u=0:u-=a),d>0&&(d>=x?x=0:x-=d),m=100*(1-(v-u)/(i.width-J)),g=100*(1-(T-x)/(i.height-J)),O(_,B,u+$),O(_,w,x+$)),_.children[0].style.display="block",_.children[1].style.display="block",_.children[2].style.display=C,O(_,"-webkit-transform","scale("+q+", "+k+")"),O(_,"-ms-transform","scale("+q+", "+k+")"),O(_,"transform","scale("+q+", "+k+")"),_.$22i=m,_.$23i=g,O(_,"-webkit-transform-origin",m+"% "+g+"%"),O(_,"-ms-transform-origin",m+"% "+g+"%"),O(_,"transform-origin",m+"% "+g+"%"),V.narrowWhenCollapse&&!V.expanded?O(_,P,_.$51i+$):O(_,P,_.$26i+$),Z.$18i.fire({kind:"beginRestore",target:Z,id:_.$15i}),_.$19i=!0,V.minimized=!1,N(function(){S(_).scale(1,1).end(function(){Z.$17i()})},30),Z.$10i()}},addEventListener:function(B,j,v){this.$18i.add(B,j,v)},removeEventListener:function(E,_){this.$18i.remove(E,_)},setPosition:function(N,l){var i=this._view,E=this.$2i;"leftTop"===E?(O(i,j,N+$),O(i,e,l+$),O(i,B,g),O(i,w,g)):"leftBottom"===E?(O(i,j,N+$),O(i,w,l+$),O(i,B,g),O(i,e,g)):"rightTop"===E?(O(i,B,N+$),O(i,e,l+$),O(i,j,g),O(i,w,g)):"rightBottom"===E&&(O(i,B,N+$),O(i,w,l+$),O(i,j,g),O(i,e,g)),delete i.$22i,delete i.$23i},getPosition:function(){var Z=this._view,y=this.$2i;return"leftTop"===y?{x:E(H(Z,j)),y:E(H(Z,e))}:"leftBottom"===y?{x:E(H(Z,j)),y:E(H(Z,w))}:"rightTop"===y?{x:E(H(Z,B)),y:E(H(Z,e))}:"rightBottom"===y?{x:E(H(Z,B)),y:E(H(Z,w))}:void 0},setPositionRelativeTo:function(s){var e=this,w=e._view.querySelectorAll(".button-toggle"),o="control-button button-toggle",r=e.getPosition();e.$2i=s,e.setPosition(r.x,r.y);for(var Q=0;Q<w.length;Q++){var d=w[Q],C=e.getPanelConfig(d.parentNode.parentNode.parentNode.$15i);d[I]=C.expanded?s.indexOf("Bottom")>=0?o+" button-toggle-collapse":o+" button-toggle-expand":s.indexOf("Bottom")>=0?o+" button-toggle-expand":o+" button-toggle-collapse"}e.iv()},getPositionRelativeTo:function(){return this.$2i},invalidate:function(i){var q=this;q._68I||(q._68I=1,U.callLater(q.validate,q,h,i),q.onInvalidated&&q.onInvalidated(),q.fireViewEvent("invalidate"));var d=this._config,w=d.content;w&&w.invalidate&&w.invalidate(),d.items&&d.items.forEach(function(i){i&&i.content&&i.content.invalidate&&i.content.invalidate()})},getIconStretch:function(){var F=this._config.iconStretch||"fill";return F},$27i:function(f,g,N,v,w){var i=K.initContext(f);K.translateAndScale(i,0,0,1),i.clearRect(0,0,N,N);var D=(N-v)/2;U.drawStretchImage(i,U.getImage(g),this.getIconStretch(w),0,D,v,v),i.restore()},$28i:function(E){var m,B,M,Z=this,r=E.id,j=Z.getPanelView(r),t=j.querySelector(".button-toggle"),A=Z.$2i.indexOf("Bottom")>=0;if(B=A?U.panelCollapseIcon:U.panelExpandIcon,M=A?U.panelExpandIcon:U.panelCollapseIcon,t){m=E.expanded?U.getImage(M):U.getImage(B);var c=Z.$4i(E),D=Z.$5i(E);Z.$27i(t,m,c,D,"toggle")}},$29i:function(N){var X,P=this,g=N.id,y=P.getPanelView(g),x=y.querySelector(".button-independent-switch"),c=U.panelUnLockIcon,V=U.panelLockIcon;if(x){X=N.independent!==!0?U.getImage(V):U.getImage(c);var M=P.$4i(N),o=P.$5i(N);P.$27i(x,X,M,o,"switch")}},$30i:function(A){var s=this,P=A.id,m=s.getPanelView(P),Z=m.querySelector(".button-minimize-minimize"),K=U.panelMinimizeIcon;if(Z){var l=s.$4i(A),e=s.$5i(A);s.$27i(Z,U.getImage(K),l,e,"miminize")}},$31i:function(a){var r=this,n=a.id,x=r.getPanelView(n),d=x.querySelector(".button-minimize-restore"),y=a.titleIcon||U.panelRestoreIcon;if(d){var h=r.$20i();r.$27i(d,U.getImage(y),h,h,"restore")}},$32i:function(c){var w=this,N=c.id,E=w.getPanelView(N);if(c.buttons){var q=c.buttons;q.forEach(function(g){var x=g.name,W=g.icon;if(x&&W){var N=E.querySelector(".custombutton-"+x);if(N){var T=w.$4i(c),I=w.$5i(c)-1;w.$27i(N,U.getImage(W),T,I,"custom")}}})}},$33i:function(i){var k=this,F=i.id,$=k.getPanelView(F),J=$.querySelector(".panel-title-icon"),N=i.titleIcon;if(J&&N){var Z=k.$4i(i),j=k.$5i(i);k.$27i(J,U.getImage(N),Z,j,"title")}},validateImpl:function(){var r=this,e=r._config;r.$28i(e),r.$30i(e),r.$31i(e),r.$32i(e),r.$33i(e),e.items&&e.items.forEach(function(_){r.$28i(_),r.$29i(_),r.$32i(_)})}});var Y=function(N){var l=this,E=N.getView();l.$34i=N,l.addListeners(),V(E,"dblclick",l.$42i.bind(l))};U.def(Y,G,{ms_listener:1,getView:function(){return this.$34i.getView()},clear:function(){delete this.$37i,delete this.$38i,delete this.$36i,delete this.$39i},$42i:function(y){for(var x=this.$34i,E=y.target,C=x.$35i,J=C.length,m=0;J>m;m++){var z=C[m];z.contains(E)&&(y.preventDefault(),x.togglePanel(z.parentNode.$15i))}},handle_touchstart:function(q){var F=this,w=F.$34i,k=w._config,Q=k.flowLayout,O=q;if(U.isLeftButton(q)){var h=q.target,t=w.getView().children[0],T=w.getView().querySelector(".button-minimize-restore");X(q)&&(O=c(q));var J=F.$40i={x:O.pageX,y:O.pageY};F.$41i={x:J.x,y:J.y},(!Q&&t.contains(h)||T&&T.contains(h))&&(F.$38i=!0,U.startDragging(F,q)),!Q&&F.handle_mousemove(q)&&(F.$37i=!0,U.startDragging(F,q),w.$11i())}},handle_mousedown:function(f){this.handle_touchstart(f)},handle_touchend:function(z){var E=this,N=E.$34i,s=z.target,B=N.$35i,X=B.length,a=0,O=N.getView(),L=O.querySelector(".button-minimize"),g=O.querySelector(".button-minimize-restore");if(!E.$39i&&!E.$36i){if(L&&L.contains(s)||g&&g.contains(s))z.preventDefault(),N._config.minimized?N.restore():N.minimize();else for(;X>a;a++){var D=B[a],f=D.parentNode,A=f.$15i,R=N.getPanelConfig(A),d=D.querySelector(".button-toggle"),p=D.querySelector(".button-independent-switch");if(d===s)z.preventDefault(),N.togglePanel(A);else if(p===s){z.preventDefault();var v="button-independent-switch-off",H="button-independent-switch-on";R.independent=R.independent==h?!0:!R.independent,p[I]=R.independent?p[I].replace(v,H):p[I].replace(H,v),N.$29i(R)}else s[I]&&s[I].indexOf("control-button custombutton-")>=0&&D.contains(s)&&s._action.call(N,R,N.getPanelView(A),z)}delete E.$40i,delete E.$41i}},handle_mouseup:function(j){this.handle_touchend(j)},handleWindowTouchEnd:function(){var A=this,Q=A.$34i;A.$37i&&A.$36i?(Q.$18i.fire({kind:"endResize",target:Q,id:Q.getView().$15i}),Q.$12i()):A.$38i&&A.$39i&&Q.$18i.fire({kind:"endMove",target:Q,id:Q.getView().$15i}),this.clear()},handleWindowMouseUp:function(P){this.handleWindowTouchEnd(P)},handle_mousemove:function(l){var $=this,O=$.getView(),Q=O.querySelector(".resize-area"),_=Q.getBoundingClientRect(),n={x:_.left,y:_.top,width:_.width,height:_.height};l=X(l)?c(l):l;var r=l.clientX,I=l.clientY,H=$.$34i._config;return H.expanded&&H.minimized!==!0&&U.containsPoint(n,{x:r,y:I})?(O.style.cursor="nwse-resize",!0):(O.style.cursor=g,void 0)},handleWindowTouchMove:function(C){C.preventDefault();var A=C;X(C)&&(A=c(C));var h=this,R=h.$40i,S=h.$41i;if(!(S.x==R.x&&S.y==R.y&&U.getDistance(S,{x:A.pageX,y:A.pageY})<=1)){var b=h.$34i,K=h.getView(),J=K.parentNode,u=b._config,r=u.resizeMode||"wh",V=A.pageX-R.x,g=A.pageY-R.y,F=b.$2i;if(h.$37i){var z=K.children[1].children[0],I=K.offsetWidth,m=z.offsetHeight,T=I+V,n=m+g;T=Math.max(T,100),n=Math.max(n,100),"w"===r?(O(K,f,T+$),u.width=T):"h"===r?(O(z,Z,n+$),u.contentHeight=n):"wh"===r&&(O(K,f,T+$),O(z,Z,n+$),u.width=T,u.contentHeight=n),F.indexOf("right")>=0&&O(K,B,E(H(K,B))-(T-I)+$),F.indexOf("Bottom")>=0&&O(K,w,E(H(K,w))-(n-m)+$),R.x=A.pageX,R.y=A.pageY;var y=u.content;y&&y.isSelfViewEvent&&(y.setX(0),y.setY(0),y.setWidth(u.width-2*(u.borderWidth||0)),y.setHeight(u.contentHeight)),h.$36i?b.$18i.fire({kind:"betweenResize",target:b,id:b.getView().$15i}):(h.$36i=!0,b.$18i.fire({kind:"beginResize",target:b,id:b.getView().$15i}))}else if(h.$38i){var q,i,P,a,Y,D,N,v,W,x,l=K.getBoundingClientRect(),d=l.width,L=l.height,k=p(J),s=k.width,G=k.height,Q=b._dragContainment;"leftTop"===F?(q=E(H(K,j))||0,P=E(H(K,e))||0,Y=q+V,N=P+g,"parent"===Q&&(Y+d>s&&(Y=s-d),N+L>G&&(N=G-L),0>Y&&(Y=0),0>N&&(N=0)),W=Y-q,x=N-P,b.setPosition(Y,N),R.x+=W,R.y+=x):"rightBottom"===F?(i=E(H(K,B))||0,a=E(H(K,w))||0,D=i-V,v=a-g,"parent"===Q&&(0>D&&(D=0),0>v&&(v=0),D+d>s&&(D=s-d),v+L>G&&(v=G-L)),W=D-i,x=v-a,b.setPosition(D,v),R.x-=W,R.y-=x):"rightTop"===F?(i=E(H(K,B))||0,P=E(H(K,e))||0,D=i-V,N=P+g,"parent"===Q&&(0>D&&(D=0),0>N&&(N=0),D+d>s&&(D=s-d),N+L>G&&(N=G-L)),W=D-i,x=N-P,b.setPosition(D,N),R.x-=W,R.y+=x):"leftBottom"===F&&(q=E(H(K,j))||0,a=E(H(K,w))||0,Y=q+V,v=a-g,"parent"===Q&&(0>Y&&(Y=0),0>v&&(v=0),Y+d>s&&(Y=s-d),v+L>G&&(v=G-L)),W=Y-q,x=v-a,b.setPosition(Y,v),R.x+=W,R.y-=x),h.$39i?b.$18i.fire({kind:"betweenMove",target:b,id:b.getView().$15i}):(h.$39i=!0,b.$18i.fire({kind:"beginMove",target:b,id:b.getView().$15i}))}}},handleWindowMouseMove:function(o){this.handleWindowTouchMove(o)}});var F=n.widget.PanelGroup=function(S){var Q=this,P=Q._view=K.createView(null,Q);P.style.border="1px dashed black",P.style.position="absolute",P.style.background="rgba(120, 120, 120, 0.4)",Q.$48i=new n.List,Q._tolerance=100,Q._config=S||{hGap:0,vGap:0},Q.bindHandlePanelMove=Q.handlePanelMove.bind(Q),Q.bindHandlePanelEvent=Q.handlePanelEvent.bind(Q),Q.invalidate()};U.def(F,G,{invalidate:function(){var n=this;n._68I||(n._68I=1,N(function(){n.validate()},50))},validate:function(){if(this._68I){delete this._68I;var V=this.$48i.get(0);if(V){var E=V.getView().parentNode;E&&(this.layoutPanels(E,"leftTop"),this.layoutPanels(E,"rightTop"),this.layoutPanels(E,"leftBottom"),this.layoutPanels(E,"rightBottom"))}}},setLeftTopPanels:function(){var T=this,p=T.$43i,M=T.$48i;p==h&&(p=T.$43i=new n.List);for(var Q=0;Q<arguments.length;Q++){var b=arguments[Q];if("string"==typeof b)p.$49i=b;else{if(b._config.flowLayout)continue;b.setPositionRelativeTo("leftTop"),p.contains(b)||p.add(b),M.contains(b)||T.add(b)}}},setRightTopPanels:function(){var o=this,z=o.$44i,_=o.$48i;z==h&&(z=o.$44i=new n.List);for(var r=0;r<arguments.length;r++){var F=arguments[r];if("string"==typeof F)z.$49i=F;else{if(F._config.flowLayout)continue;F.setPositionRelativeTo("rightTop"),z.contains(F)||z.add(F),_.contains(F)||o.add(F)}}},setLeftBottomPanels:function(){var y=this,j=y.$45i,v=y.$48i;j==h&&(j=y.$45i=new n.List);for(var k=0;k<arguments.length;k++){var R=arguments[k];if("string"==typeof R)j.$49i=R;else{if(R._config.flowLayout)continue;R.setPositionRelativeTo("leftBottom"),j.contains(R)||j.add(R),v.contains(R)||y.add(R)}}},setRightBottomPanels:function(){var L=this,U=L.$46i,p=L.$48i;U==h&&(U=L.$46i=new n.List);for(var l=0;l<arguments.length;l++){var M=arguments[l];if("string"==typeof M)U.$49i=M;else{if(M._config.flowLayout)continue;M.setPositionRelativeTo("rightBottom"),U.contains(M)||U.add(M),p.contains(M)||L.add(M)}}},add:function(G){if(!G._config.flowLayout){var b=this,T=b.$48i;T.contains(G)||(G.addEventListener(b.bindHandlePanelMove),G.addEventListener(b.bindHandlePanelEvent),T.add(G))}},remove:function(O){var s=this,Z=s.$48i;Z.contains(O)&&(O.removeEventListener(s.bindHandlePanelMove),O.removeEventListener(s.bindHandlePanelEvent),Z.remove(O),s.$43i.contains(O)&&s.$43i.remove(O),s.$44i.contains(O)&&s.$44i.remove(O),s.$45i.contains(O)&&s.$45i.remove(O),s.$46i.contains(O)&&s.$46i.remove(O))},layoutPanels:function(h,N,l){var i=this,Q=i._config,H=Q.hGap||0,K=Q.vGap||0;if(h){var F=i.$43i;if("leftBottom"===N?F=i.$45i:"rightTop"===N?F=i.$44i:"rightBottom"===N&&(F=i.$46i),!F)return;var b=F.$49i,a=H,d=K;if(h.contains(i._view)&&h.removeChild(i._view),F&&F.size()>0)for(var S=0;S<F.size();S++){var E=F.get(S),J=E.getView();h=h||J.parentNode,l!==S?E.setPosition(a,d):("leftTop"===N?(i._view.style.right="",i._view.style.bottom="",i._view.style.left=a+$,i._view.style.top=d+$):"leftBottom"===N?(i._view.style.right="",i._view.style.top="",i._view.style.left=a+$,i._view.style.bottom=d+$):"rightTop"===N?(i._view.style.left="",i._view.style.bottom="",i._view.style.right=a+$,i._view.style.top=d+$):"rightBottom"===N&&(i._view.style.left="",i._view.style.top="",i._view.style.right=a+$,i._view.style.bottom=d+$),i._view.style.width=J.offsetWidth+$,i._view.style.height=J.offsetHeight+$,h.insertBefore(i._view,J)),"h"===b?a+=J.offsetWidth+H:"v"===b&&(d+=J.offsetHeight+K)}}},handlePanelEvent:function(z){if("beginToggle"===z.kind||"endToggle"===z.kind||"beginRestore"===z.kind||"endMinimize"===z.kind||"endResize"===z.kind){var Y=this,o=z.target,p=o.getView(),O=p.parentNode,u=Y.$43i,f=Y.$44i,s=Y.$45i,B=Y.$46i,D=Y._config,V=h,j=h,w=o.$47i;if(w==h&&(w=o.$47i=0),"beginToggle"===z.kind?w=o.$47i=w+1:"endToggle"===z.kind&&(w=o.$47i=w-1),u&&u.contains(o)?(V="leftTop",j=u):s&&s.contains(o)?(V="leftBottom",j=s):f&&f.contains(o)?(V="rightTop",j=f):B&&B.contains(o)&&(V="rightBottom",j=B),"beginToggle"===z.kind&&V&&1===w){var R=Q(),q=R.style,d=j.$49i,x="each";q.fontSize="0",q.position="absolute",q.width="100%","leftTop"===V?(q.left=0,q.top=0):"leftBottom"===V?(q.left=0,q.bottom=0,"v"===d&&(x="reverseEach")):"rightTop"===V?(q.right=0,q.top=0,q.textAlign="right","h"===d&&(x="reverseEach")):"rightBottom"===V&&(q.right=0,q.bottom=0,q.textAlign="right",x="reverseEach"),j[x](function(p){var n=p.getView(),T=n.style,U=Q();T.position="static",U.style.textAlign="left",U.style.position="relative",U.style.display="inline-block","leftTop"===V?(U.style.marginLeft=D.hGap+$,U.style.marginTop=D.vGap+$):"leftBottom"===V?(U.style.marginLeft=D.hGap+$,U.style.marginBottom=D.vGap+$):"rightTop"===V?(U.style.marginRight=D.hGap+$,U.style.marginTop=D.vGap+$):"rightBottom"===V&&(U.style.marginRight=D.hGap+$,U.style.marginBottom=D.vGap+$),U.appendChild(n),R.appendChild(U),"h"===d?U.style.verticalAlign="leftTop"===V||"rightTop"===V?"top":"bottom":R.appendChild(k("br"))}),Y.$54i=R,O.appendChild(R)}else"endToggle"===z.kind&&V&&0===w?N(function(){O=O.parentNode.parentNode,O.removeChild(Y.$54i),delete Y.$54i,j.each(function(z){var T=z.getView(),y=T.style;y.position="absolute",O.appendChild(T)}),Y.layoutPanels(O,V)},30):("beginRestore"===z.kind||"endMinimize"===z.kind||"endResize"===z.kind)&&V&&Y.layoutPanels(O,V)}},handlePanelMove:function(q){if(!(q.kind.indexOf("Move")<0)){var Y=this,f=Y._config,w=f.hGap||0,M=f.vGap||0,a=q.target,g=a._view,z=g.getBoundingClientRect(),x=z.width,Z=z.height,T=x/2,X=Z/2,c=g.parentNode,u=Y.$43i,S=Y.$44i,Q=Y.$45i,r=Y.$46i,U=c.getBoundingClientRect(),L=Y._tolerance;if("endMove"===q.kind){var K=Y._corner;K&&(a.setPositionRelativeTo(K),Y.layoutPanels(c,K)),delete Y._corner}if("betweenMove"===q.kind){var F=U.left,m=U.top,j=U.width,C=U.height,o=z.left+x/2,O=z.top+Z/2;u==h&&(u=Y.$43i=new n.List),Q==h&&(Q=Y.$45i=new n.List),S==h&&(S=Y.$44i=new n.List),r==h&&(r=Y.$46i=new n.List),delete Y._corner,u.contains(a)?(u.remove(a),Y.layoutPanels(c,"leftTop")):Q.contains(a)?(Q.remove(a),Y.layoutPanels(c,"leftBottom")):S.contains(a)?(S.remove(a),Y.layoutPanels(c,"rightTop")):r.contains(a)&&(r.remove(a),Y.layoutPanels(c,"rightBottom"));var d=function(_,n){var y=F+w,J=m+M;if(0===n.size()){var e=y+T,S=J+X;"leftBottom"===_?S=m+C-M-X:"rightTop"===_?e=F+j-w-T:"rightBottom"===_&&(e=F+j-w-T,S=m+C-M-X);var l=o-e,f=O-S,P=Math.sqrt(l*l+f*f);if(L>P)return Y._corner=_,n.add(a),Y.layoutPanels(c,_,0),!0}else if(1===n.size()){var N=n.get(0),v=N.getView().getBoundingClientRect(),I=v.left+T,x=v.top+X,k=v.left+v.width+w+T,V=J+X,s=y+T,B=v.top+v.height+M+X;"leftBottom"===_?(x=v.top+v.height-X,V=m+C-M-X,B=v.top-M-X):"rightTop"===_?(I=v.left+v.width-T,k=v.left-w-T,s=F+j-w-T):"rightBottom"===_&&(I=v.left+v.width-T,x=v.top+v.height-X,k=v.left-w-T,V=m+C-M-X,s=F+j-w-T,B=v.top-M-X);var u=o-I,z=O-x,A=o-k,Z=O-V,H=o-s,Q=O-B,D=E(Math.sqrt(u*u+z*z)),W=E(Math.sqrt(A*A+Z*Z)),R=E(Math.sqrt(H*H+Q*Q)),G=[D,W,R];G.sort(function(f,P){return f-P});var b=G[0];if(L>b){if(Y._corner=_,b===D)return n.add(a,0),Y.layoutPanels(c,_,0),!0;if(b===W)return n.add(a),n.$49i="h",Y.layoutPanels(c,_,1),!0;if(b===R)return n.add(a),n.$49i="v",Y.layoutPanels(c,_,1),!0}}else if(n.size()>1){for(var g=h,U={},q=[],r=n.$49i,d=0;d<n.size();d++){var t=n.get(d),p=t.getView(),$=p.getBoundingClientRect(),K=$.left+T,i=$.top+X;"leftBottom"===_?i=$.top+$.height-X:"rightTop"===_?K=$.left+$.width-T:"rightBottom"===_&&(K=$.left+$.width-T,i=$.top+$.height-X),d===n.size()-1&&(g=$);var l=o-K,f=O-i,P=E(Math.sqrt(l*l+f*f));U[P]=d,q.push(P)}"leftTop"===_&&"h"===r?(e=g.left+g.width+w+T,S=J+X):"leftTop"===_&&"v"===r?(e=y+T,S=g.top+g.height+M+X):"leftBottom"===_&&"h"===r?(e=g.left+g.width+w+T,S=m+C-M-X):"leftBottom"===_&&"v"===r?(e=y+T,S=g.top-M-X):"rightTop"===_&&"h"===r?(e=g.left-w-T,S=J+X):"rightTop"===_&&"v"===r?(e=F+j-w-T,S=g.top+g.height+M+X):"rightBottom"===_&&"h"===r?(e=g.left-w-T,S=m+C-M-X):"rightBottom"===_&&"v"===r&&(e=F+j-w-T,S=g.top-M-X),l=o-e,f=O-S,P=E(Math.sqrt(l*l+f*f)),U[P]=d,q.push(P),q.sort(function(d,T){return d-T});var b=q[0];if(L>b)return Y._corner=_,n.add(a,U[b]),Y.layoutPanels(c,_,U[b]),!0}};d("leftTop",u)||d("leftBottom",Q)||d("rightTop",S)||d("rightBottom",r)}}}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);