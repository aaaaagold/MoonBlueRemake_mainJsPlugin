"use strict";
/*:
 * @plugindesc 月藍要用的無參數免調整客製化插件全部都塞在這裡_HEAD
 * @author agold404
 *
 * @help .
 * 
 * This plugin can be renamed as you want.
 */


"use strict";
/*:
 * @plugindesc 第一下命中ㄉTP + note區寫獲得tp
 * @author agold404
 * @help HEAD: 把floor拿掉
 *
 * 道具、技能note區
 * <firstHitTp:數字>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Action.prototype;
k='applyItemUserEffect';
r=p[k]; (p[k]=function(){
	this.subject().gainSilentTp(this.item().tpGain * this.subject().tcr);
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc 修改重複上狀態的回合數為取大；修正buff/debuff轉換時的回合數殘留問題
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Battler.prototype;
k='resetStateCounts';
r=p[k]; (p[k]=function(stateId){
	const state = $dataStates[stateId];
	this._stateTurns[stateId] = Math.max(this._stateTurns[stateId]||0 , ~~((state.maxTurns-state.minTurns+1)*Math.random()) + state.minTurns);
}).ori=r;
k='addBuff';
r=p[k]; (p[k]=function(paramId,turns){
	if(this.isAlive()){
		const lv=this._buffs[paramId];
		this.increaseBuff(paramId);
		if(!(this._buffs[paramId]*lv>0)) this._buffTurns[paramId] = 0;
		if(this.isBuffAffected(paramId)){
			this.overwriteBuffTurns(paramId, turns);
		}
		this._result.pushAddedBuff(paramId);
		this.refresh();
	}
}).ori=r;
k='addDebuff';
r=p[k]; (p[k]=function(paramId,turns){
	if(this.isAlive()){
		const lv=this._buffs[paramId];
		this.decreaseBuff(paramId);
		if(!(this._buffs[paramId]*lv>0)) this._buffTurns[paramId] = 0;
		if(this.isDebuffAffected(paramId)){
			this.overwriteBuffTurns(paramId, turns);
		}
		this._result.pushAddedDebuff(paramId);
		this.refresh();
	}
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc Game_Action.prototype.executeHpDamage ㄉ target.onDamage(value); 改 target.onDamage(value,this.subject());
 * @author agold404
 * @help 啊原廠扣就ㄓㄓ啊
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_BattlerBase.prototype;
p.traitsMap_sum=function f(code){
	const rtv=new Map();
	for(let x=0,arr=this.traits(code);x!==arr.length;++x){
		const id=arr[x].dataId;
		rtv.set(id,(rtv.get(id)|0)+arr[x].value);
	}
	return rtv;
};
p.param=function(paramId){
	return Math.round(
		(this.paramBase(paramId).clamp(
			this.paramMin(paramId),
			this.paramMax(paramId)
		)+this.paramPlus(paramId))*this.paramRate(paramId)*this.paramBuffRate(paramId)
	)
};
}

Game_Battler.prototype.onDamageMp=(val,subject)=>{};

{ const p=Game_Action.prototype;
p.executeHpDamage=function(trgt,val){
	const isD=this.isDrain();
	if(isD && trgt.hp<val) val=trgt.hp;
	this.makeSuccess(trgt);
	trgt.gainHp(-val);
	if(0<val){
		const s=this.subject();
		trgt.onDamage(val,s);
		if(isD) this.gainDrainedHp(val,s,trgt);
	}
};
p.executeMpDamage=function(trgt,val){
	const isD=this.isDrain();
	if(isD && trgt.mp<val) val=trgt.mp;
	this.makeSuccess(trgt);
	trgt.gainMp(-val);
	if(0<val){
		const s=this.subject();
		trgt.onDamageMp(val,s);
		if(isD) this.gainDrainedMp(val,s,trgt);
	}
};
p.gainDrainedHp=function(val,subject,trgt){ subject.gainHp(val); };
p.gainDrainedMp=function(val,subject,trgt){ subject.gainMp(val); };
}

})();


﻿"use strict";
/*:
 * @plugindesc 定義一種trait，可將某種裝備欄位重複增加
 * @author agold404
 * @help 可在角色、職業、敵人、狀態中新增此trait <addEquipAmount:[編輯器中的裝備欄位1要增加幾個,編輯器中的裝備欄位2要增加幾個,...,(原本有幾個裝備欄位就打幾個數字)]>
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const func_numEquType=()=>$dataSystem.equipTypes.length-1;
const traitkw='TRAIT_ADD_EQUIP_AMOUNT';

const addFunc=(obj,key,f)=>{
	const r=obj[key];
	(obj[key]=f).ori=r;
	return f;
};

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
	// $dataWeapons.forEach(f.forEach); // do not add this trait to prevent trouble cases
	// $dataArmors.forEach(f.forEach); // do not add this trait to prevent trouble cases
	$dataEnemies.forEach(f.forEach);
	$dataStates.forEach(f.forEach);
	return f.ori.apply(this,arguments);
}).ori=r;
p[k].forEach=dataobj=>{ if(!dataobj) return;
	const meta=dataobj.meta;
	if(meta.addEquipAmount){
		const arr=JSON.parse(meta.addEquipAmount);
		for(let x=0,xs=func_numEquType();x!==xs;++x){
			dataobj.traits.push({code:gbb[traitkw],dataId:x+1,value:arr[x]-0||0});
		}
	}
};
}

{ const p=Game_Actor.prototype;
addFunc(p,'getAddedEquipAmount',function(equipTypeId){ // equipTypeId starts from 1
	return this.traitsSum(gbb[traitkw],equipTypeId);
});
addFunc(p,'equipSlots',function f(){
	const slots=[],cnts=[];
	for(let i=1;i!==$dataSystem.equipTypes.length;++i){
		cnts[i]=this.getAddedEquipAmount(i)+1;
	}
	let firstShield;
	for(let i=1;i!==$dataSystem.equipTypes.length;++i){
		for(let cnt=0;cnt<cnts[i];++cnt){
			if(firstShield===undefined && i===2) firstShield=slots.length;
			slots.push(i);
		}
	}
	if(firstShield < slots.length && this.isDualWield()){
		slots[firstShield]=1;
	}
	return slots;
});
addFunc(p,'arrangeEquipPosInArray',function(){
	const slots=this.equipSlots(),equips=this.equips(),equipTbl=[];
	for(let x=$dataSystem.equipTypes.length;--x;) equipTbl[x]=[];
	for(let x=equips.length;x--;) if(equips[x]) equipTbl[equips[x].etypeId].push(equips[x]);
if(0){
	const equipTypeCnt=[];
	for(let x=0;x!==slots.length;++x){
		equipTypeCnt[slots[x]]|=0;
		++equipTypeCnt[slots[x]];
	}
}
	while(this._equips.length<slots.length) this._equips.push(new Game_Item());
	for(let x=0;x!==slots.length;++x) this._equips[x].setObject(equipTbl[slots[x]].pop());
	this._equips.length=slots.length;
	for(let x=$dataSystem.equipTypes.length;--x;) while(equipTbl[x].length) this.tradeItemWithParty(null, equipTbl[x].pop());
});
addFunc(p,'refresh',function f(){
	this.arrangeEquipPosInArray();
	return f.ori.apply(this,arguments);
});
addFunc(p,'clearEquipments',function f(){
	for(let x=this.equipSlots().length;x--;){
		if(this.isEquipChangeOk(x)){
			this.changeEquip(x, null);
		}
	}
});
}

})();


﻿"use strict";
/*:
 * @plugindesc refine btlr states
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const cf=(p,k,f,tbl,is_putDeepest,is_notUsingOri)=>{
	if(is_putDeepest && p[k] && p[k].ori){
		let fp=p[k],fc=p[k].ori;
		do{
			if(fc.ori){
				fp=fc;
				fc=fc.ori;
			}else break;
		}while(fc);
		(fp.ori=f).ori=fc;
	}else{
		const r=p[k];
		p[k]=f;
		f.ori=is_notUsingOri?undefined:r;
	}
	f.tbl=tbl;
	return p;
};
function cfc(p){
	if(this===window || (typeof globalThis!=='undefined'&&this===globalThis)) throw new Error('call a constructor without new');
	this._p=p;
}
cfc.prototype.constructor=cfc;
cfc.prototype.add=function(key,f,t,d,u){
	cf(this._p,key,f,t,d,u);
	return this;
};

t=[
(id1,id2)=>$dataStates[id2].priority-$dataStates[id1].priority||id1-id2,
id=>$dataStates[id],
];

new cfc(Game_BattlerBase.prototype).add('eraseState',function f(stateId){
	if(this._states.uniquePop(stateId)===undefined) return false;
	delete this._stateTurns[stateId];
	return true;
},t,true,true).add('addNewState',function f(stateId){
	if(this._states.uniqueHas(stateId)) return false;
	if(stateId===this.deathStateId()){
		this.die();
	}
	const restricted=this.isRestricted();
	this._states.uniquePush(stateId);
	//this.sortStates();
	if(!restricted && this.isRestricted()) {
		this.onRestrict();
	}
	return true;
},t,true,true).add('states',function f(){
	return this._states.slice().sort(f.tbl[0]).map(f.tbl[1]);
},t,true,true).add('isStateAffected',function f(stateId){
	return this._states.uniqueHas(stateId);
},t,true,true);

})();


﻿"use strict";
/*:
 * @plugindesc YEP又在搞 ( Game_Battler._damagePopup MV預設boolean，YEP改Array(當queue)，init那邊沒改 )
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Battler.prototype;
k='initMembers';
r=p[k]; (p[k]=function f(){
	const rtv=f.ori.apply(this,arguments);
	this.clearDamagePopup();
	return rtv;
}).ori=r;
}

})();


﻿"use strict";
/*:
 * @plugindesc obtainEscapeCode 新增 ; 中斷\\用
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

const p=Window_Base.prototype;
k='obtainEscapeCode';
(p[k]=function f(textState){
	textState.index++;
	const regExp=f.tbl[0];
	const arr=regExp.exec(textState.text.slice(textState.index));
	if(arr){
		textState.index+=arr[0].length;
		return arr[0].toUpperCase();
	}else return '';
}).ori=undefined;
p[k].tbl=[
/^[\$\.\|\^!><\{\}\\;]|^[A-Z]+/i,
];

})();


﻿"use strict";
/*:
 * @plugindesc refine Game_Interpreter.prototype.setupChoices
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

{ const p=Game_Interpreter.prototype;
p.setupChoices=function(params){
	const choices=params[0].clone(); // mappingTbl
	const cancelT=params[1]<choices.length?params[1]:-2,defaultT=params[2]||0;
	const positionT=params.length>3?params[3]:2,bg=params[4]||0;
	const gmsg=$gameMessage;
	gmsg.setChoices(choices,defaultT,cancelT);
	gmsg.setChoiceBackground(bg);
	gmsg.setChoicePositionType(positionT);
	gmsg.setChoiceCallback(this.setupChoices_callBack.bind(this));
};
p.setupChoices_callBack=function(n){
	this._branch[this._indent]=n; // mappingTbl
};
}

})();


﻿"use strict";
/*:
 * @plugindesc 都 array.map 過ㄌ, 是在 concat 尛
 * @author agold404
 * @help .
 * 
 * This plugin can be renamed as you want.
 */

(()=>{ let k,r,t;

Game_Enemy.prototype.traitObjects=function(){
	return Game_Battler.prototype.traitObjects.call(this).concat_inplace(this.enemy());
};

Game_Actor.prototype.traitObjects = function() {
	const objects=Game_Battler.prototype.traitObjects.call(this);
	objects.push(this.actor(),this.currentClass());
	const equips=this.equips();
	for(let i=0,sz=equips.length;i!==sz;++i) equips[i] && objects.push(equips[i]);
	return objects;
};

(Game_BattlerBase.prototype.allTraits=function f(){
    return this.traitObjects().reduce(f.tbl[0],[]);
}).tbl=[
function(r,obj){ return r.concat_inplace(obj.traits); },
];

})();
