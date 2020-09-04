!function(z,D){"use strict";var n="ht",G=z[n],$="position",x="absolute",R="px",v="left",L="top",P="innerHTML",C="className",T="width",M="height",g="0",O="display",t="none",f="visibility",w="user-select",h="margin",j="padding",S=null,A=G.Color,i=G.Default,W=i.getInternal(),r=z.setTimeout,X=z.setInterval,V=z.clearTimeout,m=z.clearInterval,d=z.parseInt,U=i.isLeftButton,s=i.isDragging,N=i.startDragging,Q=i.getDistance,K=i.isTouchable,Z=A.widgetIconHighlight,J=A.widgetIconBorder,E=A.widgetIconGradient,b=function(){return document},o=function(g,v){return g.querySelectorAll(v)},F=function(F){var I=b().createElement(F);return"ul"===F&&(B(I,$,"relative"),B(I,h,g),B(I,j,g),B(I,"list-style",t),B(I,"box-sizing","border-box"),B(I,"-moz-box-sizing","border-box"),B(I,O,"inline-block"),B(I,"vertical-align","text-bottom"),B(I,"border","1px solid "+i.contextMenuBorderColor),B(I,"box-shadow","0 0 16px 1px "+i.contextMenuShadowColor),B(I,"overflow","hidden"),i.contextMenuBorderRadius&&B(I,"border-radius",i.contextMenuBorderRadius+R)),I},I=function(Y){var n=Y.touches[0];return n?n:Y.changedTouches[0]},k=function(){return F("div")},y=function(){return F("canvas")},B=function(q,i,V){q.style.setProperty(i,V,S)},a=function(w,H,m){i.def(G.widget[w],H,m)},H=function(Y,w){Y.appendChild(w)},e=function(Q,b){Q.removeChild(b)},l=W.addEventListener,u=W.removeEventListener;W.addMethod(i,{contextMenuCheckIcon:{width:16,height:16,comps:[{type:"border",rect:[1,1,14,14],width:1,color:J},{type:"shape",points:[13,3,7,12,4,8],borderWidth:2,borderColor:Z}]},contextMenuRadioIcon:{width:16,height:16,comps:[{type:"circle",rect:[2,2,12,12],borderWidth:1,borderColor:J},{type:"circle",rect:[4,4,8,8],borderWidth:1,borderColor:Z,gradient:i.imageGradient,gradientColor:E,background:Z}]},contextMenuLabelFont:(K?"16":"13")+"px arial, sans-serif",contextMenuLabelColor:"#000",contextMenuBackground:"#fff",contextMenuDisabledLabelColor:"#888",contextMenuHoverBackground:"#648BFE",contextMenuHoverLabelColor:"#fff",contextMenuSeparatorWidth:1,contextMenuSeparatorColor:"#E5E5E5",contextMenuScrollerColor1:"#FDFDFD",contextMenuScrollerColor2:"#D3D3D3",contextMenuScrollerBorderColor:"#C3C3C3",contextMenuBorderColor:"#C3C3C3",contextMenuShadowColor:"rgba(128, 128, 128, 0.5)",contextMenuBorderRadius:5,contextMenuSubmenuMark:"▶"},!0);var p=function(O){var A=this,f=O._view;if(A.$11b=O,A.addListeners(),l(f,"contextmenu",function(h){h.preventDefault()}),!K){var T=A.$37b=A.$36b.bind(A);l(f,"mouseover",T),l(f,"mouseout",T)}};i.def(p,D,{ms_listener:1,getView:function(){return this.$11b._view},handle_touchstart:function(P){if(i.preventDefault(P),U(P)){for(var d=this,S=d.$11b,m=d.getView(),g=m.children,E=0;E<g.length;E++){var p=g[E],D=p.$24b,B=p.$25b;if(D&&D.contains(P.target))return S.scrollUp(p),d.$28b=r(function(){d.$29b=X(function(){S.scrollUp(p)},100)},500),N(d,P),void 0;if(B&&B.contains(P.target))return S.scrollDown(p),d.$28b=r(function(){d.$29b=X(function(){S.scrollDown(p)},100)},500),N(d,P),void 0}K&&(P=I(P)),d.$30b={x:P.pageX,y:P.pageY}}},handle_mousedown:function(E){this.handle_touchstart(E)},handle_touchend:function(s){if(U(s)){var Y=this,B=Y.$30b,c=K?{x:I(s).pageX,y:I(s).pageY}:{x:s.pageX,y:s.pageY};if(!B||Q(B,c)>1)return delete Y.$30b,void 0;for(var k=Y.getView(),o=Y.$11b,d=s.target,F=S,z=S,t=o._items,v=k.$26b,$=0;$<v.length;$++)if(z=v[$],z.contains(d)){F=z.getAttribute("data-id");break}if(F&&t){var f=o.$17b(t,function(w){return w._id===F});if(f){var u=!1;f.disabled instanceof Function?u=f.disabled.call(o,f):f.disabled===!0&&(u=!0),u||(f.items?K&&Y.$36b(z,!0):o.$1b(f,s))}}delete Y.$30b}},$36b:function(O,w){if(!s()){var p,T=this,V=T.$11b,Y=T.getView(),h=V.$20b||Y.children[0],M=V.$19b,Q=Y.$26b,G=Y.children,z=O.target,P=Y.getBoundingClientRect(),r=i.getWindowInfo(),l=r.width,k=r.height,E=function(U){for(var u=0;u<G.length;u++){var P=G[u],h=new RegExp(U+"$"),r=P[C];if(r&&(h.test(r)||r.indexOf(U+" ")>=0))return P}},$=function(F){for(var R=0;R<Q.length;R++){var T=Q[R],E=new RegExp(F+"$"),X=T[C];if(X&&(E.test(X)||X.indexOf(F+" ")>=0))return T}},A=function(f){var m=$("menu-item"+f.$45b),n=m.getBoundingClientRect(),J=n.top-P.top,o=n.left-P.left;B(f,L,J+R),B(f,v,o+n.width+R);var F=f.getBoundingClientRect(),C=F.top,u=F.left,z=F.height,Q=F.width,d=C+z+2,M=u+Q+2;d>k&&B(f,L,J+k-d+R),M>l&&B(f,v,o-Q+R)};if(w)p=O;else{if("mouseover"===O.type){for(var t=0;t<Q.length;t++){var N=Q[t];if(N.contains(z)){p=N;break}}if(!p&&M){var m=M.parentNode,x=E("submenu"+M.getAttribute("data-id"));(x&&x.contains(z)||m&&m.contains(z))&&(p=M)}}else if("mouseout"===O.type){for(var c=!1,a=O.relatedTarget,t=0;t<G.length;t++){var q=G[t];if("hidden"!==q.style.visibility&&q.contains(a)){c=!0;break}}if(c)return}!p&&h&&(p=$("menu-item"+(h.$45b||"NaN")))}if(p!=M){if(M)for(var y=M;y;){if(y[C]=y[C].replace(" menu-item-hover",""),y[C].indexOf("disabled")<0){var U=V.getItemByProperty("_id",y.getAttribute("data-id"));null!=U.background?U.background instanceof Function?B(y,"background-color",U.background.call(V,U)):B(y,"background-color",U.background):B(y,"background-color",i.contextMenuBackground),B(y,"color",i.contextMenuLabelColor)}var J=E("submenu"+y.getAttribute("data-id"));J&&B(J,f,"hidden");var S=y.parentNode;y=$("menu-item"+(S.$45b||"NaN"))}if(p){for(var W=p,K=[];W;){W[C]+=" menu-item-hover",W[C].indexOf("disabled")<0&&(B(W,"background-color",i.contextMenuHoverBackground),B(W,"color",i.contextMenuHoverLabelColor));var g=E("submenu"+W.getAttribute("data-id"));g&&(B(g,f,"visible"),K.push(g));var S=W.parentNode;W=$("menu-item"+(S.$45b||"NaN"))}K.reverse(),K.forEach(function(J){A(J)})}}V.$19b=p,V.$20b=p?p.parentNode:Y.children[0]}},handle_mouseup:function(O){this.handle_touchend(O)},handleWindowTouchEnd:function(){var F=this;F.$28b!=S&&(V(F.$28b),delete F.$28b),F.$29b!=S&&(m(F.$29b),delete F.$29b),delete F.$34b,delete F.$30b,delete F.$35b},handleWindowMouseUp:function(t){this.handleWindowTouchEnd(t)},handle_mousemove:function(s){this.handle_touchmove(s)},handle_touchmove:function(A){if(!s()&&U(A)){for(var H=this,g=H.getView().children,C=S,n=0;n<g.length;n++){var d=g[n];if(d.contains(A.target)){C=d;break}}var L=H.$30b,o=K?{x:I(A).pageX,y:I(A).pageY}:{x:A.pageX,y:A.pageY};C&&L&&Q(L,o)>2&&(N(H,A),H.$34b=C,H.$35b=C.$18b)}},handleWindowTouchMove:function(d){d.preventDefault();var t=this,A=t.$11b,a=t.$34b,r=t.$35b,l=t.$30b;if(l&&a){var c=K?{x:I(d).pageX,y:I(d).pageY}:{x:d.pageX,y:d.pageY},k=c.y-l.y;k>0?A.scrollUp(a,a.$18b-(r-k)):A.scrollDown(a,r-k-a.$18b)}},handleWindowMouseMove:function(l){this.handleWindowTouchMove(l)},$10b:function(h,G){h.preventDefault();for(var y=this,w=y.getView().children,s=S,$=0;$<w.length;$++){var W=w[$];if(W.contains(h.target)){s=W;break}}if(s){var C=this.$11b,D=C.getRowHeight();Math.abs(G)>.05&&(G>0?C.scrollUp(s,G*D):0>G&&C.scrollDown(s,-G*D))}},handle_mousewheel:function(O){this.$10b(O,O.wheelDelta/40)},handle_DOMMouseScroll:function(Y){this.$10b(Y,-Y.detail)},$44b:function(t){this.getView().contains(t.target)||this.$11b.hide()},$41b:function(x){this.$11b.show(x)},$4b:function(c,b){var n=this.$11b;if(b=b||n._items,b&&b.length&&c.keyCode){var Y=[c.keyCode];c.shiftKey&&Y.push(16),c.ctrlKey&&Y.push(17),c.altKey&&Y.push(18),/mac/.test(z.navigator?z.navigator.userAgent.toLowerCase():"")?c.metaKey&&Y.push(17):c.metaKey&&Y.push(91),Y.sort();var y=Y.join(),Z=n.$17b(b,function(L){if(L.key){var I=L.key.slice(0);return I.sort(),y===I.join()}});if(Z){Z.preventDefault!==!1&&c.preventDefault();var S=!1;Z.disabled instanceof Function?S=Z.disabled.call(n,Z):Z.disabled===!0&&(S=!0),S||n.$1b(Z,c)}}},$39b:function(n){var c=this,N=I(n);c.$32b={x:N.pageX,y:N.pageY}},$38b:function(G){var w=this,J=I(G);w.$31b={x:J.pageX,y:J.pageY},w.$33b=r(function(){w.$31b&&(w.$32b?Q(w.$31b,w.$32b)<10&&w.$11b.show(G):w.$11b.show(G)),delete w.$33b,delete w.$31b,delete w.$32b},600)},$40b:function(){var n=this;n.$33b!=S&&(V(n.$33b),delete n.$33b,delete n.$31b,delete n.$32b)}}),G.widget.ContextMenu=function(j){var R=this,A=R._view=W.createView(null,R);A[C]="ht-widget-contextmenu",R.setItems(j),R.$13b=new p(R),B(A,"font",i.contextMenuLabelFont),B(A,$,x),B(A,"cursor","default"),B(A,"-webkit-"+w,t),B(A,"-moz-"+w,t),B(A,"-ms-"+w,t),B(A,w,t),B(A,"box-sizing","border-box"),B(A,"-moz-box-sizing","border-box"),i.baseZIndex!=S&&B(A,"z-index",d(i.baseZIndex)+2+""),R.$3b=function(T){R.$13b.$4b(T)}},a("ContextMenu",D,{$5b:0,_items:S,$21b:S,_enableGlobalKey:!1,ms_v:1,enableGlobalKey:function(){var X=this,Z=X._enableGlobalKey;Z===!1&&(l(b(),"keydown",X.$3b),X._enableGlobalKey=!0)},disableGlobalKey:function(){this._enableGlobalKey=!1,u(b(),"keydown",this.$3b)},setItems:function(J){this._items=J},getItems:function(){return this._items},setVisibleFunc:function(b){this.$16b=b},setLabelMaxWidth:function(S){this.$43b=S},$1b:function(f,I){var K=this;if("check"===f.type)f.selected=!f.selected;else if("radio"===f.type){var G=f.groupId;K.$17b(K._items,function(J){J.groupId===G&&(J.selected=!1)}),f.selected=!0}if(K.hide(),f.action)f.action.apply(f.scope||K,[f,I]);else if(f.href){var U=f.linkTarget||"_self";z.open(f.href,U)}},getItemById:function(D){return this.getItemByProperty("id",D)},setItemVisible:function(O,e){var D=this.getItemById(O);D&&(D.visible=e)},getItemByProperty:function(d,f,X){var r=this;if(X=X||r._items,!X||0===X.length)return S;var N=r.$17b(X,function(g){return g[d]===f});return N||S},scrollUp:function(z,M){var R=this;if(M=M==S?20:M,M=d(M),0!==M){var D=0;z.$18b>M&&(D=z.$18b-M),R.$42b(z,D),z.scrollTop=D,z.$18b=D}},scrollDown:function(Y,m){var s=this;if(m=m==S?20:m,m=d(m),0!==m){var b=Y.$22b,U=Y.$23b,r=b-U;U+Y.$18b+m<b&&(r=Y.$18b+m),s.$42b(Y,r),Y.scrollTop=r,Y.$18b=r}},$42b:function(u,w){w=w==S?u.$18b:w;var a=u.$24b,l=u.$25b;a&&(B(a,"top",w+R),0==w?B(a,O,t):B(a,O,"block")),l&&(B(l,"bottom",-w+R),w==u.$22b-u.$23b?B(l,O,t):B(l,O,"block"))},getRowHeight:function(){return this._view.querySelector(".menu-item").offsetHeight},$17b:function(s,r){for(var w=0;w<s.length;w++){var M=s[w];if(r(M))return M;if(M.items){var u=this.$17b(M.items,r);if(u)return u}}},$2b:function(o,Q){for(var A=this,a=0;a<o.length;a++){A.$5b++;var c=o[a];if(c.visible!==!1)if(i.isFunction(c.visible)&&c.visible()===!1)this._clearItemId(c);else if(!A.$16b||A.$16b.call(A,c)){var v=F("li"),D=A.$5b+"";if(B(v,"white-space","nowrap"),B(v,O,"block"),"separator"===c||c.separator===!0){var _=k();_[C]="separator",B(_,M,i.contextMenuSeparatorWidth+R),B(_,"background",i.contextMenuSeparatorColor),H(v,_)}else{c._id=D,v.setAttribute("data-id",D);var Y=F("span"),m=F("span"),p=y(),s=k();if(B(Y,O,"inline-block"),B(Y,M,"1.2em"),B(m,O,"inline-block"),B(m,M,"1.2em"),B(m,"line-height","1.2em"),p[C]="prefix",B(p,O,"inline-block"),B(p,T,"1em"),B(p,M,"1em"),B(p,"vertical-align","middle"),B(p,h,"0 0.2em"),"check"===c.type&&c.selected?p[C]+=" check-prefix":"radio"===c.type&&c.selected&&(p[C]+=" radio-prefix"),H(v,p),c.icon){var I=y();I[C]="contextmenu-item-icon",B(I,O,"inline-block"),B(I,M,"1.2em"),B(I,T,"1.2em"),B(I,"margin-right","0.2em"),B(I,"float","left"),I.$50b=c.icon,I._item=c,H(Y,I)}if(m[P]=c.label,H(Y,m),H(v,Y),s[C]="suffix",B(s,O,"inline-block"),B(s,"margin-left","1em"),B(s,"margin-right","0.4em"),B(s,"text-align","right"),B(s,"font-size","75%"),c.items&&(s[P]=i.contextMenuSubmenuMark),c.suffix&&(s[P]=c.suffix),H(v,s),v[C]="menu-item menu-item"+D,null!=c.background?c.background instanceof Function?B(v,"background-color",c.background.call(A,c)):B(v,"background-color",c.background):B(v,"background-color",i.contextMenuBackground),B(v,"color",i.contextMenuLabelColor),B(v,j,"3px 0"),c.disabled instanceof Function){var n=c.disabled.call(A,c);n&&(v[C]+=" disabled",B(v,"color",i.contextMenuDisabledLabelColor))}else c.disabled&&(v[C]+=" disabled",B(v,"color",i.contextMenuDisabledLabelColor));if(c.items){A.$21b||(A.$21b=new G.List);var J=F("ul");J[C]="submenu"+D,J.$45b=D,B(J,f,"hidden"),B(J,$,x),H(A._view,J),A.$21b.add(J),A.$2b(c.items,J)}}H(Q,v)}else this._clearItemId(c);else this._clearItemId(c)}},rebuild:function(){var z=this,C=z._items,v=z._view;if(v&&(v[P]="",z.$21b=S,z.$5b=0,z.$19b=S,z.$20b=S,v.$26b=S,C&&0!==C.length)){var g=F("ul",z._r);H(v,g),z.$2b(C,g)}},addTo:function(w){if(w){var a=this,U=a.$13b;if(a.$12b=w,a.$9b=function($){U.$44b($)},a.$27b=function(Q){U.$41b(Q)},K){var J=a.$6b=function(q){U.$38b(q)},e=a.$7b=function(M){U.$39b(M)},T=a.$8b=function(Q){U.$40b(Q)};l(w,"touchstart",J,!0),l(w,"touchmove",e),l(w,"touchend",T)}else l(w,"contextmenu",a.$27b)}},showOnView:function(T,M,F){T=T.getView?T.getView():T;var A=i.getWindowInfo(),t=T.getBoundingClientRect();this.show(t.left+A.left+M,t.top+A.top+F)},show:function(E,r,Z){var n=this,Z=Z==S?!0:!1,t=n._view;if(t){if(n.invalidate(),1===arguments.length){var M=E;if(K){var h=I(M);E=h.pageX,r=h.pageY}else E=M.pageX,r=M.pageY}var W=i.getWindowInfo(),Q=W.width,z=W.height,y=W.left,X=W.top,m={pageX:E,pageY:r,clientX:E-y,clientY:r-X,target:1,originEvent:M},J=m.clientX,q=m.clientY,u=function(Y){Y.style.height=z-6+R;var J=k(),y=k(),S=function(j){B(j,$,x),B(j,"text-align","center"),B(j,T,"100%"),B(j,"font-size",10+R),B(j,"padding","2px 0"),B(j,"border","0px solid "+i.contextMenuScrollerBorderColor),B(j,"background-color",i.contextMenuScrollerColor1),j.style.backgroundImage="-webkit-linear-gradient(top, "+i.contextMenuScrollerColor1+", "+i.contextMenuScrollerColor2+")",j.style.backgroundImage="linear-gradient(to bottom, "+i.contextMenuScrollerColor1+", "+i.contextMenuScrollerColor2+")"};J[C]="menu-arrow-item menu-arrow-item-top",y[C]="menu-arrow-item menu-arrow-item-bottom",S(J),B(J,"top",g),B(J,"left",g),B(J,"border-bottom-width",1+R),J[P]="▲",S(y),B(y,"bottom",g),B(y,"left",g),B(y,"border-top-width",1+R),y[P]="▼",Y.$24b=J,Y.$25b=y,Y.$18b=Y.scrollTop,Y.$22b=Y.scrollHeight,Y.$23b=Y.clientHeight,H(Y,J),H(Y,y),n.$42b(Y)};n.beforeShow&&n.beforeShow(m);var G=n._items;if(G&&(M&&M.preventDefault(),G.length)){n.rebuild(),i.appendToScreen(t),t.$26b=o(t,".menu-item");var F=t.children[0];F.offsetHeight>z&&u(F);var A=q+(Z?1:0),j=J+(Z?1:0),D=function(h){for(var D=0,v=0,o=0,K=n.$43b;o<h.children.length;o++){var f=h.children[o];if(f.getAttribute("data-id")){var Z=f.children[1],$=f.children[2],w=Z.children;if(K){var Y=w[0];w.length>1&&(Y=w[1]),Y.offsetWidth>K&&(Y[P]="<marquee scrollamount='3'>"+Y[P]+"</marquee>",Y.children[0].style.verticalAlign="text-bottom",B(Y,T,K+R),B(Y,O,"inline-block"))}var e=Z.offsetWidth,l=$.offsetWidth;e>D&&(D=e),l>v&&(v=l)}}for(o=0;o<h.children.length;o++){var f=h.children[o];if(f.getAttribute("data-id")){var Z=f.children[1],$=f.children[2],X=Z.children[0],c=Z.children[1];!c&&X.style.width&&B(X,T,D+R),B(Z,T,D+R),B($,T,v+R)}}};D(F);var c=q+3+t.offsetHeight,Y=J+3+t.offsetWidth;c>z?B(t,L,A-(c-z)+X+R):B(t,L,A+X+R),Y>Q?B(t,v,j-(Y-Q)+y+R):B(t,v,j+y+R);var p=n.$21b;p&&p.each(function(c){D(c),c.offsetHeight>z&&u(c)}),n.$9b&&l(b(),K?"touchstart":"mousedown",n.$9b,!0),n.afterShow&&n.afterShow(m),n.$47b()}}},isShowing:function(){return this._view?this._view.parentNode!=S:!1},getRelatedView:function(){return this.$12b},hide:function(){var Y=this,c=Y._view;c&&c.parentNode&&(e(c.parentNode,c),u(b(),K?"touchstart":"mousedown",Y.$9b,!0),Y.afterHide&&Y.afterHide())},dispose:function(){var A=this,I=A.$12b,W=A._view;W&&(W.parentNode&&e(W.parentNode,W),A.disableGlobalKey(),I&&(K?(u(I,"touchstart",A.$6b,!0),u(I,"touchmove",A.$7b),u(I,"touchend",A.$8b)):u(I,"contextmenu",A.$27b)),A._view=A._items=A.$21b=A.$19b=A.$12b=A.beforeShow=A.afterShow=A.afterHide=A.$9b=A.$3b=A.$6b=A.$7b=A.$8b=A.$27b=S)},$46b:function(q,l,O,h,s){var e=W.initContext(q);W.translateAndScale(e,0,0,1),e.clearRect(0,0,O,h),i.drawStretchImage(e,i.getImage(l),"fill",0,0,O,h,s,this),e.restore()},$47b:function(){var w,V,D,B=this,L=B._view;if(B.isShowing()){var c=o(L,".check-prefix");for(D=0;D<c.length;D++){var T=c[D];w=T.clientWidth,V=T.clientHeight,T.$48b=w,T.$49b=V,W.setCanvas(T,w,V)}var K=o(L,".radio-prefix");for(D=0;D<K.length;D++){var l=K[D];w=l.clientWidth,V=l.clientHeight,l.$48b=w,l.$49b=V,W.setCanvas(l,w,V)}var e=o(L,".contextmenu-item-icon");for(D=0;D<e.length;D++){var R=e[D];w=R.clientWidth,V=R.clientHeight,R.$48b=w,R.$49b=V,W.setCanvas(R,w,V)}}},validateImpl:function(){var L,$,F,B=this,d=B._view;if(B.isShowing()){var y=o(d,".check-prefix");for(F=0;F<y.length;F++){var t=y[F];L=t.$48b,$=t.$49b,L&&$&&B.$46b(t,i.contextMenuCheckIcon,L,$)}var Q=o(d,".radio-prefix");for(F=0;F<Q.length;F++){var S=Q[F];L=S.$48b,$=S.$49b,L&&$&&B.$46b(S,i.contextMenuRadioIcon,L,$)}var N=o(d,".contextmenu-item-icon");for(F=0;F<N.length;F++){var T=N[F];L=T.$48b,$=T.$49b,L&&$&&B.$46b(T,i.getImage(T.$50b),L,$,T._item)}}},_clearItemId:function(k){var s=this;delete k._id,k.items&&k.items.forEach(function(H){s._clearItemId(H)})}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);