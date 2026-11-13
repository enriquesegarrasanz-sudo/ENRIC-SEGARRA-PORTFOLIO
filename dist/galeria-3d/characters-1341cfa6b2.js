import * as THREE from './vendor/three.module.min.js';
import {createFather,createDog} from './sculptures-1341cfa6b2.js';
export {createFather,createDog};
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);

export function act(character,action,duration=3.2){if(!character?.userData?.rig||character.userData.rig.loading)return;character.userData.rig.action=action;character.userData.rig.elapsed=0;character.userData.rig.duration=duration;}
export function updateCharacter(character,time,dt,walking=false,animate=true){
 const r=character.userData.rig;if(!r||r.loading)return;r.elapsed+=dt;if(r.elapsed>(r.duration||3.2))r.action='idle';
 const human=!!r.arms,pet=r.action==='pet',wave=r.action==='wave',present=r.action==='present',strength=animate?THREE.MathUtils.clamp(typeof walking==='number'?walking:Number(walking),0,1):0;
 const cycle=r.gaitPhase??time*(human?7.2:10.08),amount=(human?.30:.25)*strength;
 r.body.position.y=animate?(strength>.02?Math.abs(Math.sin(cycle))*(human?.009:.008)*strength:(pet?Math.abs(Math.sin(time*7.5))*.014:Math.sin(time*1.8)*.003)):0;
 r.body.rotation.x=human?-.018*strength:(pet?-.06+Math.sin(time*6)*.03:.01*strength);
 r.body.rotation.z=Math.sin(cycle)*(human?.008:.012)*strength;
 r.legs.forEach((leg,i)=>{const phase=human?i*Math.PI:[0,Math.PI,Math.PI,0][i];leg.rotation.x=Math.sin(cycle+phase)*amount;if(leg.userData.knee)leg.userData.knee.rotation.x=strength*Math.max(0,Math.sin(cycle+phase))*.32;});
 r.head.rotation.x=(animate ? (pet ? .16+Math.sin(time*5.5)*.07 : Math.sin(time*.8)*.025) : 0)+.025*strength;
 r.head.rotation.y=animate&&strength<.03?(pet?Math.sin(time*3.2)*.14:Math.sin(time*.6)*.08):0;
 if(human){
  r.arms.forEach((arm,i)=>{arm.rotation.x=-Math.sin(cycle+i*Math.PI)*amount*.48;arm.rotation.z=(i?1:-1)*(.1+Math.abs(Math.sin(cycle))*.018*strength);arm.userData.fore.rotation.x=-.09*strength;});
  if(wave&&animate){r.arms[1].rotation.z=2.25+Math.sin(r.elapsed*8.5)*.14;r.arms[1].userData.fore.rotation.x=-.32;r.head.rotation.x+=.06*Math.sin(r.elapsed*2.4);r.head.rotation.y=Math.sin(r.elapsed*1.8)*.10;}
  else if(present&&animate){r.arms[0].rotation.z=-0.68-Math.sin(r.elapsed*3.2)*.08;r.arms[0].rotation.x=-0.42;r.arms[0].userData.fore.rotation.x=-0.38;r.head.rotation.y=-0.16+Math.sin(r.elapsed*1.6)*.08;}
 }else{
  r.tail.rotation.z=animate?Math.sin(time*(pet?15:6.5))*(pet?.62:.18):0;
 }
}
export function attachCompanions(world){
 const father=createFather(),dog=createDog();world.scene.add(father,dog);const chars=[father,dog];world.companions={father,dog,chars,targets:[V(),V()],visible:false};
 chars.forEach((object,i)=>{const work={id:i?'dog':'father',kind:'character',code:i?'FLOKI':'ENRIC SEGARRA',title:i?'Floki':'Enric Segarra',description:i?'Pelaje negro, collar blanco y una mirada atenta. Acarícialo para que mueva la cola.':'El artista como anfitrión. Barba blanca, camiseta jaspeada y las gafas colgadas de siempre.',object,center:V(),radius:i?2.1:2.75};object.userData.work=work;object.traverse(o=>{if(o.isMesh)o.userData.work=work;});world.pickables.push(object);});positionCompanions(world,0,true);setCompanionsVisible(world,false);
}
export function setCompanionsVisible(world,visible){if(!world.companions)return;world.companions.visible=visible;world.companions.chars.forEach(c=>c.visible=visible);}
function clampCompanionTarget(world,target){
 const b=world.bounds;
 target.x=THREE.MathUtils.clamp(target.x,b.minX+.6,b.maxX-.6);
 target.z=THREE.MathUtils.clamp(target.z,b.minZ+.6,b.maxZ-.6);
 for(const o of world.colliders){
  const vx=target.x-o.x,vz=target.z-o.z,d=Math.hypot(vx,vz),r=o.r+.45;
  if(d<r){target.x=o.x+(vx/(d||1))*r;target.z=o.z+(vz/(d||1))*r;}
 }
 target.x=THREE.MathUtils.clamp(target.x,b.minX+.6,b.maxX-.6);
 target.z=THREE.MathUtils.clamp(target.z,b.minZ+.6,b.maxZ-.6);
 target.y=world.heightAt?world.heightAt(target.x,target.z):0;
 return target;
}
export function positionCompanions(world,index,instant=false){const c=world.companions;if(!c)return;const stop=world.stops[index],dx=stop.look[0]-stop.pos[0],dz=stop.look[2]-stop.pos[2],length=Math.hypot(dx,dz)||1,fx=dx/length,fz=dz/length,sx=-fz,sz=fx;
 for(let i=0;i<2;i++){const side=i?1.10:.30,front=i?3.0:3.25;const target=clampCompanionTarget(world,c.targets[i].set(stop.pos[0]+fx*front+sx*side,0,stop.pos[2]+fz*front+sz*side));
  c.chars[i].userData.faceAngle=Math.atan2(-fx,-fz);if(instant){c.chars[i].position.copy(target);c.chars[i].rotation.y=c.chars[i].userData.faceAngle;}}
}
export function stageCompanionsForPreview(world,mode,stagePos,faceCamAngle,instant=false){
 const c=world?.companions;if(!c)return null;
 const rx=Math.cos(faceCamAngle),rz=-Math.sin(faceCamAngle);
 const fx=Math.sin(faceCamAngle),fz=Math.cos(faceCamAngle);
 const showFather=mode==='avatar'||mode==='enric'||mode==='guided';
 const showDog=mode==='avatar'||mode==='floki'||mode==='guided';
 c.visible=showFather||showDog;
 c.father.visible=showFather;
 c.dog.visible=showDog;
 const fOffSide=mode==='enric'?0:(mode==='guided'?-0.48:-0.36);
 const dOffSide=mode==='floki'?0:(mode==='guided'?0.58:0.48);
 const dOffFwd=mode==='floki'?0.18:0.24;
 const fTarget=clampCompanionTarget(world,c.targets[0].set(stagePos.x+rx*fOffSide,0,stagePos.z+rz*fOffSide));
 const dTarget=clampCompanionTarget(world,c.targets[1].set(stagePos.x+rx*dOffSide+fx*dOffFwd,0,stagePos.z+rz*dOffSide+fz*dOffFwd));
 c.father.userData.faceAngle=faceCamAngle+(mode==='guided'?0.22:0.06);
 c.dog.userData.faceAngle=faceCamAngle+(mode==='floki'?0:-0.14);
 if(instant){
  c.father.position.copy(fTarget);c.father.rotation.y=c.father.userData.faceAngle;
  c.dog.position.copy(dTarget);c.dog.rotation.y=c.dog.userData.faceAngle;
 }
 if(showFather)act(c.father,mode==='guided'?'present':'wave',4.8);
 if(showDog)act(c.dog,'pet',4.8);
 c.father.userData.work.center.copy(c.father.position).add(V(0,.95,0));
 c.dog.userData.work.center.copy(c.dog.position).add(V(0,.45,0));
 return {fTarget,dTarget};
}
export function flankCompanionsForInspection(world,workCenter,orbitAngle,orbitRadius,visitMode,dt,time,animate=true){
 const c=world?.companions;if(!c?.visible||!workCenter)return;
 const flankR=Math.max((orbitRadius||2.4)+0.85,2.45);
 const specs=[
  {char:c.father,active:visitMode==='avatar'||visitMode==='enric'||visitMode==='guided',ang:orbitAngle-1.08,r:flankR},
  {char:c.dog,active:visitMode==='avatar'||visitMode==='floki'||visitMode==='guided',ang:orbitAngle+1.06,r:Math.max(1.95,flankR-0.25)}
 ];
 specs.forEach((sp,i)=>{
  if(!sp.active){sp.char.visible=false;return;}
  sp.char.visible=true;
  const target=clampCompanionTarget(world,V(workCenter.x+Math.sin(sp.ang)*sp.r,0,workCenter.z+Math.cos(sp.ang)*sp.r));
  const delta=target.clone().sub(sp.char.position),dist=delta.length();
  const walking=dist>0.06;
  if(walking){
   const step=Math.min(dist,Math.max(0.02,dt*3.6));
   sp.char.position.addScaledVector(delta.normalize(),step);
   if(world.heightAt)sp.char.position.y=world.heightAt(sp.char.position.x,sp.char.position.z);
   sp.char.userData.rig.gaitPhase=(sp.char.userData.rig.gaitPhase||0)+step*(i?3.2:3.0);
  }
  const lookYaw=Math.atan2(workCenter.x-sp.char.position.x,workCenter.z-sp.char.position.z);
  const dYaw=lookYaw-sp.char.rotation.y;
  sp.char.rotation.y+=Math.atan2(Math.sin(dYaw),Math.cos(dYaw))*Math.min(1,dt*7.5);
  updateCharacter(sp.char,time,dt,walking?0.65:0,animate);
  sp.char.userData.work.center.copy(sp.char.position).add(V(0,i?.45:.95,0));
 });
}
export function updateCompanions(world,time,dt,animate=true,freeze=false){const c=world.companions;if(!c?.visible)return;c.chars.forEach((character,i)=>{const delta=c.targets[i].clone().sub(character.position),distance=delta.length(),walking=distance>.035&&!freeze;if(walking){const step=Math.min(distance,dt*1.85);character.position.addScaledVector(delta.normalize(),step);if(world.heightAt)character.position.y=world.heightAt(character.position.x,character.position.z);character.userData.rig.gaitPhase=(character.userData.rig.gaitPhase||0)+step*(i?3.2:3);const angle=Math.atan2(delta.x,delta.z),d=angle-character.rotation.y;character.rotation.y+=Math.atan2(Math.sin(d),Math.cos(d))*Math.min(1,dt*8);}else if(!freeze){const d=character.userData.faceAngle-character.rotation.y;character.rotation.y+=Math.atan2(Math.sin(d),Math.cos(d))*Math.min(1,dt*4.5);}updateCharacter(character,time,dt,walking,animate);character.userData.work.center.copy(character.position).add(V(0,i?.45:.95,0));});}
