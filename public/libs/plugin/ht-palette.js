!function(j,a,g){"use strict";var C="px",D="0",u="innerHTML",S="className",R=ht.Default,w=ht.Color,n=ht.Node,B="position",k="top",h="left",Q=R.animate,K=R.getInternal(),v="width",D="0",Z="none",y="max-height",W="font",H="background",s="border-box",E="user-select",I="box-sizing",O="overflow",l=R.isTouchable,K=R.getInternal(),o=w.titleIconBackground,$=R.scrollBarInteractiveSize,t=/msie 9/.test(j.navigator?j.navigator.userAgent.toLowerCase():""),p=null,z=function(){return document},x=function(v){return z().createElement(v)},P=function(){return x("div")},d=function(){var q=P(),K=q.style;return K.msTouchAction=Z,K.cursor="default",l&&K.setProperty("-webkit-tap-highlight-color","rgba(0, 0, 0, 0)",p),K.position="absolute",K.left=D,K.top=D,q},T=function(){return x("canvas")},m=function(){return document.body},c=function(O,F,k){O.style.setProperty(F,k,p)},N=function(V,M){V.style.removeProperty(M)},f=function(a,C,L){R.def(ht.widget[a],C,L)},J=function(g,k){g.appendChild(k)},L=function(r,h){r.removeChild(h)},V=K.addEventListener;K.removeEventListener,K.addMethod(R,{paletteExpandIcon:{width:16,height:16,comps:[{type:"triangle",rect:[4,4,10,8],background:o,rotation:3.14}]},paletteCollapseIcon:{width:16,height:16,comps:[{type:"triangle",rect:[4,4,10,8],background:o}]},paletteTitleLabelColor:R.labelSelectColor,paletteTitleLabelFont:R.labelFont,paletteContentLabelFont:R.labelFont,paletteContentLabelColor:"#777",paletteContentBackground:"#fff",paletteTitleHeight:R.widgetTitleHeight,paletteTitleBackground:w.titleBackground,paletteTitleHoverBackground:w.titleBackground,paletteSeparatorWidth:1,paletteSeparatorColor:g,paletteItemHoverBorderColor:w.highlight,paletteItemSelectBackground:w.highlight},!0);var X=".palette-item:hover{border: 1px solid "+R.paletteItemHoverBorderColor+" !important}"+" .palette-header:hover{background: "+R.paletteTitleHoverBackground+" !important}",r=document.createElement("style");l||(r.styleSheet?r.styleSheet.cssText=X:r.appendChild(z().createTextNode(X))),z().getElementsByTagName("head")[0].appendChild(r);var A=function(C){var X=this;X.$22h=C,X.addListeners()};R.def(A,a,{ms_listener:1,getView:function(){return this.$22h.getView()},$26h:function(){var K=this;K.$36h&&m().removeChild(K.$36h),K.$23h=K.$24h=K.$25h=K.$35h=K.$36h=p},handle_touchstart:function(W){for(var c,h=this,d=h.$22h,z=W.target,m=d.sm(),Z=d.dm(),f="palette-header",y="palette-header-tool",n="palette-item",v=!1,Y=!1,o=!1;z&&(z[S]||"").indexOf(f)<0&&(z[S]||"").indexOf(n)<0;)z=z.parentNode;if(z&&z[S].indexOf(y)>=0?v=!0:z&&z[S].indexOf(f)>=0?o=!0:z&&z[S].indexOf(n)>=0&&(Y=!0),R.isLeftButton(W))if(h.$27h(W))h.$24h=R.getClientPoint(W),h.$25h=d.ty();else if(v){R.preventDefault(W),c=z.parentNode.$11h;var T=Z.getDataById(c),C=T.s("tools")[z.toolIndex];C.action&&C.action.call(d)}else if(o){R.preventDefault(W),c=z.$11h;var T=Z.getDataById(c);T.isExpanded()?T.setExpanded(!1):T.setExpanded(!0)}else if(Y){c=z.$11h;var X=Z.getDataById(c);m.ss(X),d.handleDragAndDrop&&(R.preventDefault(W),X.s("draggable")&&(d.handleDragAndDrop(W,"prepare"),h.$35h=0)),X.s("draggable")||(R.preventDefault(W),h.$24h=R.getClientPoint(W),h.$25h=d.ty())}else R.preventDefault(W),h.$24h=R.getClientPoint(W),h.$25h=d.ty();else h.$26h(W)},handle_mousedown:function(z){this.handle_touchstart(z)},handle_mousewheel:function(Z){this.handleScroll(Z,Z.wheelDelta/40,Z.wheelDelta!==Z.wheelDeltaX)},handle_DOMMouseScroll:function(H){this.handleScroll(H,-H.detail,1)},handleScroll:function(X,z,w){var Y=this.$22h;R.preventDefault(X),w&&Y._41o()&&Y.ty(Y.ty()+20*z)},handle_mouseup:function(h){this.handle_touchend(h)},handle_touchend:function(L){var d=this;d.$37h(L),d.$26h(L)},handleWindowMouseUp:function(k){this.handleWindowTouchEnd(k)},handleWindowTouchEnd:function(W){var H=this;H.$37h(W),H.$26h(W)},$37h:function(Y){var F=this,u=F.$22h;2===F.$35h&&(F.$35h=3,u.handleDragAndDrop(Y,"end"))},handleWindowMouseMove:function(Y){this.handleWindowTouchMove(Y)},handleWindowTouchMove:function(u){var b=this,m=b.$22h,B=b.$23h,N=b.$24h,r=b.$25h,j=R.getClientPoint(u),i=m._29I,z=b.$36h;if(1===b.$35h||2===b.$35h){if(b.$35h=2,m.handleDragAndDrop(u,"between"),l){var D=u.touches[0];u=D?D:u.changedTouches[0]}z.style.left=u.pageX-parseInt(z.width)/2+C,z.style.top=u.pageY-parseInt(z.height)/2+C}else"p"===B?m.ty(r+j.y-N.y):"v"===B&&m.ty(r+(N.y-j.y)/i.height*m._59I)},handle_mousemove:function(W){this.handle_touchmove(W)},handle_touchmove:function(j){if(!R.isDragging()&&R.isLeftButton(j)){var n=this,P=n.$22h,p=n.$27h(j);if(n.$24h){if(!n.$23h){if(R.getDistance(R.getClientPoint(j),n.$24h)<2)return;n.$23h=p?"v":"p",R.startDragging(n)}}else if(p)P._43o();else if(0===n.$35h){if(n.$35h=1,P.handleDragAndDrop(j,"begin"),l){var a=j.touches[0];j=a?a:j.changedTouches[0]}var Q=n.$36h=new Image,Y=P.$10h[P.sm().ld().getId()].querySelector(".image-box"),o=parseInt(Y.style.width),d=parseInt(Y.style.height);Q.draggable=!1,Q.src=Y.toDataURL(),Q.width=o,Q.height=d,Q.style.position="absolute",Q.style.left=j.pageX-o/2+C,Q.style.top=j.pageY-d/2+C,m().appendChild(Q),R.startDragging(n)}}},$27h:function(i){var u=this.$22h,s=u.getView(),O=s.getBoundingClientRect(),L=u._29I,C=i.clientX-O.left+s.scrollLeft;return u._41o()&&L.x+L.width-C<$}}),ht.widget.Palette=function(G){var h=this,t=h._view=K.createView(null,h);h.$9h={},h.$10h={},h.$4h={},h._29I={x:0,y:0,width:0,height:0},h._59I=0,h.dm(G?G:new ht.DataModel),t[S]="ht-widget-palette",h.$29h=new A(h),c(t,H,R.paletteContentBackground),c(t,O,"auto"),c(t,I,s),c(t,"-moz-"+I,s),c(t,"-webkit-"+E,Z),c(t,"-moz-"+E,Z),c(t,"-ms-"+E,Z),c(t,E,Z),c(t,"position","absolute"),c(t,"overflow","hidden"),J(t,h._79O=d()),V(t,"dragstart",function(C){C.dataTransfer&&(C.dataTransfer.setData("Text","nodeid:"+C.target.$11h),C.dataTransfer.effectAllowed="all",h.$29h.$26h())})},f("Palette",a,{ms_v:1,ms_fire:1,ms_dm:1,ms_sm:1,ms_vs:1,ms_bnb:1,ms_ac:["itemImageWidth","itemImageHeight","itemImagePadding","itemMargin","layout","autoHideScrollBar","scrollBarSize","scrollBarColor"],$30h:0,_itemImagePadding:4,_itemImageWidth:70,_itemImageHeight:50,_itemMargin:10,_layout:"largeicons",_autoHideScrollBar:R.autoHideScrollBar,_scrollBarSize:R.scrollBarSize,_scrollBarColor:R.scrollBarColor,getViewRect:function(){return this._29I},ty:function(j){return j==p?this.getTranslateY():(this.setTranslateY(j),void 0)},setTranslateY:function(y){if(this.$32h==p){var J=this,z=J.$33h(y),j=J.$30h;J.$30h=z,J.fp("translateY",j,z)}},getTranslateY:function(){return this.$30h},setLayout:function(J){var c,s,K=this,B=K._layout;K._layout=J,"smallicons"===J?c=s=20:"iconsonly"===J?c=s=50:(c=70,s=50),K.setItemImageWidth(c),K.setItemImageHeight(s),K.setItemImagePadding(4),K.fp("layout",B,J)},getDataAt:function(I){for(var E=I.target;E&&E.$11h==p;)E=E.parentNode;return E&&E.$11h!=p?this.getDataModel().getDataById(E.$11h):void 0},$20h:function(){var N=16;return l&&(N*=1.2),N},$19h:function(){return R.paletteTitleHeight},$18h:function(){var L=R.paletteSeparatorWidth,E=R.paletteTitleBackground,Q=R.paletteSeparatorColor||R.brighter(E);return L+C+" solid "+Q},$17h:function(n){c(n,"cursor","pointer"),c(n,"display","inline-block"),c(n,"margin-right",(l?8:4)+C),c(n,"vertical-align",k)},$1h:function(E){var A=this,L=P(),$=P(),q=x("span");L[S]="palette-header",c(L,B,"relative"),c(L,H,R.paletteTitleBackground),c(L,"color",R.paletteTitleLabelColor),c(L,k,D),c(L,I,s),c(L,"-moz-"+I,s),c(L,"padding","0 5px 0 0"),c(L,"border-top",A.$18h()),c(L,v,"100%"),c(L,"cursor","pointer"),c(L,"white-space","nowrap"),c(L,O,"hidden"),c(L,W,R.paletteTitleLabelFont),c(L,"line-height",A.$19h()+C),L.$11h=E.getId();var X=T(),V=A.$19h(),e=A.$20h();A.$17h(X),K.setCanvas(X,e,V),J(L,X);var w=E.s("tools");if(w)for(var l=0;l<w.length;l++){var _=T();A.$17h(_),K.setCanvas(_,e,V),_[S]="palette-header-tool palette-header-tool"+E.getId()+"-"+l,_.style.position="absolute",_.style.right=(e+10)*l+"px",_.toolIndex=l,J(L,_)}return X[S]="palette-toggle-icon-"+E.getId(),$[S]="palette-content",c($,"max-height",0+C),c($,W,R.paletteContentLabelFont),c($,O,"hidden"),$.$11h=E.getId(),A.$9h[E.getId()]=$,q[u]=E.getName(),c(q,W,R.paletteTitleLabelFont),J(L,X),J(L,q),[L,$]},$2h:function(p){var n=this,A=n._layout,b=t&&p.s("draggable")?x("a"):P(),$=T(),B=P(),d=p.getName()||"",X=p.s("title")||p.getToolTip()||d,H=n._itemMargin;$[S]="image-box";var s=n.getItemImageWidth(),f=n.getItemImageHeight();return K.setCanvas($,s,f),J(b,$),B[u]=d,B[S]="label-box","iconsonly"!==A&&J(b,B),b[S]="palette-item",c(b,"vertical-align",k),c(b,"cursor","pointer"),c(b,"border-radius",5+C),c(b,"border","1px solid transparent"),c(b,"text-align","center"),c(b,"display","inline-block"),c(b,"margin-left",H+C),c(b,"margin-top",H+C),c(b,"color",R.paletteContentLabelColor),"smallicons"===A?(c($,"vertical-align","middle"),c(b,"margin-left",2+C),c(b,"margin-top",2+C),c(b,"padding",2+C),c(b,"text-align",h),c(B,"display","inline-block"),c(B,"min-width",n.$21h+n._itemMargin+C)):"largeicons"===A&&(c(B,"max-width",s+C),c(B,"overflow","hidden")),b.$11h=p.getId(),X&&(b.title=X),p.s("draggable")&&!n.handleDragAndDrop&&(t?(b.href="#",c(b,"text-decoration",Z)):b.draggable="true"),b},$16h:function(A,f,I,M){var q=K.initContext(A);K.translateAndScale(q,0,0,1),q.clearRect(0,0,I,I);var v=(I-M)/2;R.drawStretchImage(q,R.getImage(f),"fill",0,v,M,M),q.restore()},$15h:function(g){var e=this,_=g.getId(),L=e._view.querySelector(".palette-toggle-icon-"+_),I=g.isExpanded()?R.paletteCollapseIcon:R.paletteExpandIcon;if(L&&I){var B=e.$19h(),q=e.$20h();e.$16h(L,I,B,q)}},_drawToolsIcon:function(L){var O=this,P=L.s("tools");if(P)for(var _=0;_<P.length;_++){var Q=O._view.querySelector(".palette-header-tool"+L.getId()+"-"+_),k=P[_].icon,U=O.$19h(),w=O.$20h();O.$16h(Q,k,U,w)}},$14h:function(u){var d=this,c=u.getId(),s=d.$10h[c].querySelector(".image-box"),G=u.getImage(),b=u.s("image.stretch");if(s&&G){var L=K.initContext(s),A=d.getItemImagePadding();A="smallicons"===d._layout?A/2:A;var h=d.getItemImageWidth()-2*A,H=d.getItemImageHeight()-2*A;K.translateAndScale(L,0,0,1),L.clearRect(0,0,h,H),R.drawStretchImage(L,R.getImage(G),b,A,A,h,H,u,d,d.getBodyColor(u)),L.restore()}},validateImpl:function(){var Z,W,s,d=this,X=d.$9h,$=d._layout,w=d.$10h,m=d.$4h,e=d._view,l=d.dm();if(d.$13h&&(delete d.$13h,m={},l.each(function(w){m[w.getId()]=w})),"smallicons"===$)for(var o in m){var S=m[o];if(S instanceof n){var t=S.getName()||"",B=R.getTextSize(R.paletteContentLabelFont,t).width;d.$21h!=p&&d.$21h>B||(d.$21h=B)}}for(var o in m){s=m[o];var M,a;if(l.contains(s)){if(s instanceof ht.Group){var q,V=d.$1h(s),A=w[s.getId()];A&&(q=A.nextSibling,L(e,q),L(e,A)),W=l.getSiblings(s).indexOf(s);var g=e.children[2*W]||d._79O;g&&g.parentNode?(e.insertBefore(V[0],g),e.insertBefore(q||V[1],g)):(e.appendChild(V[0]),e.appendChild(q||V[1])),w[s.getId()]=V[0],Z=X[s.getId()]=q||V[1],a=s.$12h;var i=s.s("promptText");a||(s.$12h=x("div"),s.$12h[u]=i||"",a=s.$12h),0===s.getChildren().size()?Z.contains(a)||J(Z,a):Z.contains(a)&&L(Z,a)}else if(M=s.getParent()){var I=d.$2h(s),h=w[s.getId()];Z=X[M.getId()],h&&L(h.parentNode,h),W=l.getSiblings(s).indexOf(s);var K=Z.children[W];K?Z.insertBefore(I,K):J(Z,I),w[s.getId()]=I,d.$14h(s)}}else{var U=w[s.getId()],v=U.parentNode;if(s instanceof ht.Group){var j=U.nextSibling;L(e,U),L(e,j),delete X[s.getId()]}else L(v,U),0===v.children.length&&(M=l.getDataById(v.$11h),M&&(a=M.$12h,a&&!v.contains(a)&&J(v,a)));delete w[s.getId()]}}d.$4h={};var z=function(){var m=d._59I,_=0;d.$32h!=p&&(clearInterval(d.$32h),_=0,delete d.$32h),d.$32h=setInterval(function(){d.$31h(),m===d._59I?(_++,_>=2&&(clearInterval(d.$32h),delete d.$32h)):(_=0,m=d._59I)},30)};for(var k in X)if(Z=X[k],s=l.getDataById(X[k].$11h),d.$15h(s),d._drawToolsIcon(s),s.isExpanded()){if(Z.style.maxHeight===0+C){var N=Z.scrollHeight+d._itemMargin+C;Q(Z).duration(200).set(y,N).set("padding-bottom",d._itemMargin+C).end(function(){return function(){z()}}(N))}else Z.style.maxHeight=Z.scrollHeight+C;Z.style.paddingBottom=d._itemMargin+C}else Z.style.maxHeight!==0+C&&Q(Z).duration(200).set(y,D).set("padding-bottom",D).end(function(){return function(){z()}}(Z));d.$28h(),d.$31h()},$31h:function(){for(var D=this,r=D._view,Z=0,M=r.children,u=0;u<M.length;u++){var o=M[u];o.className&&o.className.indexOf("palette-")>=0&&(Z+=o.offsetHeight)}D._59I=Z,D.$30h=D.$33h(D.ty());var v=D.ty();r.scrollTop=-v,D._29I={x:0,y:-v,width:r.clientWidth,height:r.clientHeight},c(D._79O,k,-v+C),D._93I()},$33h:function(b){var Z=this,x=Z._29I.height-Z._59I;return x>b&&(b=x),b>0?0:Math.round(b)},redraw:function(){this.$13h||(this.$13h=1,this.iv())},onPropertyChanged:function(a){["autoHideScrollBar","scrollBarSize","scrollBarColor","translateY"].indexOf(a.property)<0&&this.redraw(),"translateY"===a.property&&(this.iv(),this._43o())},findDataByName:function(z){for(var c=this.dm().getDatas(),T=0;T<c.size();T++){var t=c.get(T);if(t.getName()===z)return t}},setDataModel:function(W){var h=this,w=h._dataModel,m=h._selectionModel;w!==W&&(w&&(w.umm(h.$6h,h),w.umd(h.$8h,h),w.umh(h.$7h,h),m||w.sm().ums(h.$28h,h)),h._dataModel=W,W.mm(h.$6h,h),W.md(h.$8h,h),W.mh(h.$7h,h),m?m._21I(W):W.sm().ms(h.$28h,h),h.sm().setSelectionMode("single"),h.fp("dataModel",w,W))},$6h:function(H){var s=this,t=s._view,C=H.data,Z=s.$4h;"add"===H.kind?Z[C.getId()]=C:"remove"===H.kind?Z[C.getId()]=C:"clear"===H.kind&&(s.$10h={},s.$9h={},s.$4h={},t[u]=""),s.iv()},$7h:function(z){var T=this,n=z.data;T.$4h[n.getId()]=n,T.iv()},$8h:function(v){var U=this,_=v.data,J=v.property;"expanded"===J?U.iv():(U.$4h[_.getId()]=_,U.iv())},$28h:function(){var Z,j=this,i=j.sm(),h="palette-item",p=i.ld();this.dm().each(function(b){Z=j.$10h[b.getId()],Z&&Z[S].indexOf(h)>=0&&(b===p?c(Z,H,R.paletteItemSelectBackground):N(Z,H))})}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);