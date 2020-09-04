!function(f,N){"use strict";var F=ht.AlarmSeverity=function(Q,e,f,F,m){this.value=Q,this.name=e,this.nickName=f,this.color=F,this.displayName=m};ht.Default.def("ht.AlarmSeverity",N,{toString:function(){return this.displayName||this.name}}),function(){F.severities=new ht.List,F._vm={},F._nm={},F._cp=function(v,a){if(v&&a){var Y=v.value-a.value;return Y>0?1:0>Y?-1:0}return v&&!a?1:!v&&a?-1:0},F.each=function($,N){F.severities.each($,N)},F.getSortFunction=function(){return F._cp},F.setSortFunction=function(R){F._cp=R,F.severities.sort(R)},F.add=function(d,w,Q,H,K){var j=new F(d,w,Q,H,K);return F._vm[d]=j,F._nm[w]=j,F.severities.add(j),F.severities.sort(F._cp),j},F.remove=function(r){var n=F._nm[r];return n&&(delete F._nm[r],delete F._vm[n.value],F.severities.remove(n)),n},F.CRITICAL=F.add(500,"Critical","C","#FF0000"),F.MAJOR=F.add(400,"Major","M","#FFA000"),F.MINOR=F.add(300,"Minor","m","#FFFF00"),F.WARNING=F.add(200,"Warning","W","#00FFFF"),F.INDETERMINATE=F.add(100,"Indeterminate","N","#C800FF"),F.CLEARED=F.add(0,"Cleared","R","#00FF00"),F.isClearedAlarmSeverity=function(N){return N?0===N.value:!1},F.getByName=function(q){return F._nm[q]},F.getByValue=function(C){return F._vm[C]},F.clear=function(){F.severities.clear(),F._vm={},F._nm={}},F.compare=function(d,r){return F._cp(d,r)}}();var y=ht.AlarmState=function(H){this._d=H,this._nm={},this._am={},this._ps=null,this._haa=null,this._hna=null,this._hoa=null,this._hta=null,this._hls=!1,this._aac=0,this._nac=0};ht.Default.def("ht.AlarmState",N,{_ep:!0,_f:function(){this._c1(),this._c2(),this._c3(),this._c4(),this._c5(),this._c6(),this._c7(),this._d.fp("alarmState",null,this)},getHighestAcknowledgedAlarmSeverity:function(){return this._haa},getHighestNewAlarmSeverity:function(){return this._hna},getHighestOverallAlarmSeverity:function(){return this._hoa},getHighestNativeAlarmSeverity:function(){return this._hta},hasLessSevereNewAlarms:function(){return this._hls},_c1:function(){var m=null;for(var n in this._am)n=F.getByName(n),F.isClearedAlarmSeverity(n)||0!==this.getAcknowledgedAlarmCount(n)&&(m=m?F.compare(m,n)>0?m:n:n);this._haa=m},_c2:function(){var O=null;for(var _ in this._nm)_=F.getByName(_),F.isClearedAlarmSeverity(_)||0!==this.getNewAlarmCount(_)&&(O=O?F.compare(O,_)>0?O:_:_);this._hna=O},_c3:function(){if(!this._hna)return this._hls=!1,void 0;for(var r in this._nm)if(r=F.getByName(r),!F.isClearedAlarmSeverity(r)&&0!==this.getNewAlarmCount(r)&&F.compare(this._hna,r)>0)return this._hls=!0,void 0;this._hls=!1},_c4:function(){var y=this._haa,Q=this._hna,k=this._ps;this._hoa=y,F.compare(Q,this._hoa)>0&&(this._hoa=Q),F.compare(k,this._hoa)>0&&(this._hoa=k)},_c5:function(){var d=this._haa,D=this._hna;this._hta=d,F.compare(D,this._hta)>0&&(this._hta=D)},increaseAcknowledgedAlarm:function(z,n){if(0!==n){n=n||1;var l=this._am[z.name]||0;l+=n,this._am[z.name]=l,this._f()}},increaseNewAlarm:function(L,t){if(0!==t){t=t||1;var o=this._nm[L.name]||0;o+=t,this._nm[L.name]=o,this._f()}},decreaseAcknowledgedAlarm:function(p,i){if(0!==i){i||(i=1);var n=this._am[p.name]||0;if(n-=i,0>n)throw"Alarm count can not be negative";this._am[p.name]=n,this._f()}},decreaseNewAlarm:function(l,d){if(0!==d){d||(d=1);var _=this._nm[l.name]||0;if(_-=d,0>_)throw"Alarm count can not be negative";this._nm[l.name]=_,this._f()}},acknowledgeAlarm:function(h){this.decreaseNewAlarm(h,1),this.increaseAcknowledgedAlarm(h,1)},acknowledgeAllAlarms:function(i){if(i){var D=this.getNewAlarmCount(i);this.decreaseNewAlarm(i,D),this.increaseAcknowledgedAlarm(i,D)}else for(var U in this._nm)this.acknowledgeAllAlarms(F.getByName(U))},_c6:function(){this._aac=0;for(var W in this._am)W=F.getByName(W),this._aac+=this.getAcknowledgedAlarmCount(W)},getAcknowledgedAlarmCount:function(e){return e?this._am[e.name]||0:this._aac},getAlarmCount:function(D){return this.getAcknowledgedAlarmCount(D)+this.getNewAlarmCount(D)},_c7:function(){this._nac=0;for(var s in this._nm)this._nac+=this.getNewAlarmCount(F.getByName(s))},getNewAlarmCount:function(D){return D?this._nm[D.name]||0:this._nac},setNewAlarmCount:function(E,M){this._nm[E.name]=M,this._f()},removeAllNewAlarms:function(H){H?delete this._nm[H]:this._nm={},this._f()},setAcknowledgedAlarmCount:function(E,Q){this._am[E.name]=Q,this._f()},removeAllAcknowledgedAlarms:function(g){g?delete this._am[g.name]:this._am={},this._f()},isEmpty:function(){return!this._hoa},clear:function(){this._am={},this._nm={},this._f()},getPropagateSeverity:function(){return this._ps},setPropagateSeverity:function(P){if(this._ep||(P=null),this._ps!==P){var q=this._ps;this._ps=P,this._f(),this._d.fp("propagateSeverity",q,P)}},isEnablePropagation:function(){return this._ep},setEnablePropagation:function(o){var y=this._ep;this._ep=o,this._d.fp("enablePropagation",y,o)&&(o||this.setPropagateSeverity(null))}});var k=ht.AlarmStatePropagator=function(a){this._dataModel=a,this._enable=!1,this._isPropagating=!1};ht.Default.def("ht.AlarmStatePropagator",N,{getDataModel:function(){return this._dataModel},isEnable:function(){return this._enable},setEnable:function(u){this._enable!==u&&(this._enable=u,this._enable?(this._dataModel.mm(this.handleDataModelChange,this),this._dataModel.md(this.handleDataPropertyChange,this),this._dataModel.each(function(L){this.propagate(L)},this)):(this._dataModel.umm(this.handleDataModelChange,this),this._dataModel.umd(this.handleDataPropertyChange,this)))},handleDataModelChange:function(x){x.data&&this.propagate(x.data)},handleDataPropertyChange:function(l){if("alarmState"===l.property||"enablePropagation"===l.property)this.propagate(l.data);else if("parent"===l.property){var q=l.oldValue;q&&this.propagate(q),this.propagate(l.data)}},propagate:function(S){S&&!this._isPropagating&&(this._isPropagating=!0,this.propagateToTop(S),this._isPropagating=!1)},propagateToTop:function(y){for(this.propagateToParent(null,y);y&&y.getParent();)this.propagateToParent(y,y.getParent()),y=y.getParent()},propagateToParent:function(_,v){var U=null;v.getChildren().each(function(e){var T=e.getAlarmState().getHighestOverallAlarmSeverity();F.compare(T,U)>0&&(U=T)}),v.getAlarmState().setPropagateSeverity(U)}}),ht.AlarmStateStatistics=function(x){this.sumNew=0,this.sumAcked=0,this.sumTotal=0,this.severtiyMap={},this.dataMap={},this.setDataModel(x)},ht.Default.def("ht.AlarmStateStatistics",N,{ms_fire:1,getDataModel:function(){return this._dataModel},setDataModel:function(U){var b=this._dataModel;b!==U&&(b&&(b.umd(this.handleDataPropertyChange,this),b.umm(this.handleDataModelChange,this),this.severtiyMap={},this.dataMap={}),this._dataModel=U,this.reset(),U.md(this.handleDataPropertyChange,this),U.mm(this.handleDataModelChange,this),this.fp("dataModel",b,U))},dispose:function(){this._dataModel.umd(this.handleDataPropertyChange,this),this._dataModel.umm(this.handleDataModelChange,this),delete this._dataModel},handleDataPropertyChange:function(d){"alarmState"===d.property&&(this.increase(d.data),this.fireAlarmStateChange())},handleDataModelChange:function(N){"add"===N.kind?(this.increase(N.data),this.fireAlarmStateChange()):"remove"===N.kind?(this.decrease(N.data),this.fireAlarmStateChange()):"clear"===N.kind&&(this.severtiyMap={},this.dataMap={},this.fireAlarmStateChange())},fireAlarmStateChange:function(){this.sumAcked=0,this.sumNew=0,this.sumTotal=0,F.each(function(t){var h=this.getSumInfo(t);this.sumAcked+=h.ackedCount,this.sumNew+=h.newCount,this.sumTotal+=h.totalCount},this),this.fp("alarmState",!1,!0)},getNewAlarmCount:function(W){if(!W)return this.sumNew;var h=this.getSumInfo(W);return h.newCount},getAcknowledgedAlarmCount:function(i){if(!i)return this.sumAcked;var v=this.getSumInfo(i);return v.ackedCount},getTotalAlarmCount:function(M){if(!M)return this.sumTotal;var f=this.getSumInfo(M);return f.totalCount},getSumInfo:function(D){var s=this.severtiyMap[D.name];return s||(s={},s.newCount=0,s.ackedCount=0,s.totalCount=0,this.severtiyMap[D.name]=s),s},decrease:function(y){var i=this.dataMap[y.getId()];i&&(delete this.dataMap[y.getId()],F.each(function(z){var h=i[z.name],j=this.getSumInfo(z);j.newCount=j.newCount-h.newCount,j.ackedCount=j.ackedCount-h.ackedCount,j.totalCount=j.totalCount-h.totalCount},this))},increase:function(y){if(this.decrease(y),!this._filterFunc||this._filterFunc(y)){var r={},P=y.getAlarmState();this.dataMap[y.getId()]=r,F.each(function(g){var u={};u.newCount=P.getNewAlarmCount(g),u.ackedCount=P.getAcknowledgedAlarmCount(g),u.totalCount=P.getAlarmCount(g),r[g.name]=u;var J=this.getSumInfo(g);J.newCount=J.newCount+u.newCount,J.ackedCount=J.ackedCount+u.ackedCount,J.totalCount=J.totalCount+u.totalCount},this)}},reset:function(){this.severtiyMap={},this.dataMap={},this._dataModel.each(this.increase,this),this.fireAlarmStateChange()},setFilterFunc:function(L){var b=this._filterFunc;this._filterFunc=L,this.reset(),this.fp("filterFunc",b,L)},getFilterFunc:function(){return this._filterFunc}});var Z=ht.Data.prototype;Z.getAlarmState=function(){return this._alarmState||(this._alarmState=new y(this))},Z=ht.DataModel.prototype,Z.isEnableAlarmStatePropagator=function(){return!!this._alarmStatePropagator&&this._alarmStatePropagator.isEnable()},Z.setEnableAlarmStatePropagator=function(t){t!=this.isEnableAlarmStatePropagator()&&(t?(this._alarmStatePropagator=new k(this)).setEnable(!0):this._alarmStatePropagator.setEnable(!1))},Z=ht.graph.GraphView.prototype,Z.getNote2=function(P){var j=P.getAlarmState().getHighestNewAlarmSeverity();if(j){var o=P.getAlarmState().getNewAlarmCount(j)+j.nickName;return P.getAlarmState().hasLessSevereNewAlarms()&&(o+="+"),o}return P.s("note2")},Z.getNote2Background=function(w){var E=w.getAlarmState().getHighestNewAlarmSeverity();return E?E.color:w.s("note2.background")},Z.getBodyColor=function(L){var a=L.getAlarmState().getHighestNativeAlarmSeverity();return a?a.color:L.s("body.color")},Z.getBorderColor=function(h){var r=h.getAlarmState().getPropagateSeverity();return r?r.color:h.s("border.color")},Z=ht.widget.TreeView.prototype,Z.getBorderColor=function(P){var s=P.getAlarmState().getPropagateSeverity();return s?s.color:P.s("border.color")},Z.getIcon=function(W){return W.getIcon()?"__alarmIcon__":null},Z=ht.widget.TreeTableView.prototype,Z.getBorderColor=function(_){var E=_.getAlarmState().getPropagateSeverity();return E?E.color:_.s("border.color")},Z.getIcon=function(i){return i.getIcon()?"__alarmIcon__":null},ht.Default.setImage("__alarmIcon__",{width:16,height:16,comps:[{type:"image",name:{func:function(W){return W.getIcon()}},color:{func:function(O){var i=O.getAlarmState().getHighestNativeAlarmSeverity();return i?i.color:O.s("body.color")}},rect:[0,0,16,16]}]});var _=ht.Style;_["note2.expanded"]=!0,_["note2.color"]="#000"}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);