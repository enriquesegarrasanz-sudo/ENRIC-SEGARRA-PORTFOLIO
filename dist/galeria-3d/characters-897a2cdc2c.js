import * as THREE from './vendor/three.module.min.js';
import {createFather,createDog} from './sculptures-897a2cdc2c.js';
export {createFather,createDog};
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);

export function act(character,action){if(character.userData.rig.loading)return;character.userData.rig.action=action;character.userData.rig.elapsed=0;}
export function updateCharacter(character,time,dt,walking=false,animate=true){
 const r=character.userData.rig;if(!r||r.loading)return;r.elapsed+=dt;if(r.elapsed>3)r.action='idle';
 const human=!!r.arms,pet=r.action==='pet',wave=r.action==='wave',strength=animate?THREE.MathUtils.clamp(typeof walking==='number'?walking:Number(walking),0,1):0;
 const cycle=r.gaitPhase??time*(human?7.2:10.08),amount=(human?.30:.25)*strength;
 r.body.position.y=animate?(strength>.02?Math.abs(Math.sin(cycle))*(human?.009:.008)*strength:Math.sin(time*1.8)*.003):0;
 r.body.rotation.x=human?-.018*strength:.01*strength;
 r.body.rotation.z=Math.sin(cycle)*(human?.008:.012)*strength;
 r.legs.forEach((leg,i)=>{const phase=human?i*Math.PI:[0,Math.PI,Math.PI,0][i];leg.rotation.x=Math.sin(cycle+phase)*amount;if(leg.userData.knee)leg.userData.knee.rotation.x=strength*Math.max(0,Math.sin(cycle+phase))*.32;});
 r.head.rotation.x=(animate ? (pet ? .15+Math.sin(time*5)*.06 : Math.sin(time*.8)*.025) : 0)+.025*strength;
 r.head.rotation.y=animate&&strength<.03?Math.sin(time*.6)*.08:0;
 if(human){r.arms.forEach((arm,i)=>{arm.rotation.x=-Math.sin(cycle+i*Math.PI)*amount*.48;arm.rotation.z=(i?1:-1)*(.1+Math.abs(Math.sin(cycle))*.018*strength);arm.userData.fore.rotation.x=-.09*strength;});if(wave&&animate){r.arms[1].rotation.z=2.25+Math.sin(r.elapsed*9)*.12;r.arms[1].userData.fore.rotation.x=-.32;r.head.rotation.x+=.06*Math.sin(r.elapsed*2);}}
 else {r.tail.rotation.z=animate?Math.sin(time*(pet?15:6))*(pet?.6:.16):0;}
}
export function attachCompanions(world){
 const father=createFather(),dog=createDog();world.scene.add(father,dog);const chars=[father,dog];world.companions={father,dog,chars,targets:[V(),V()],visible:false};
 chars.forEach((object,i)=>{const work={id:i?'dog':'father',kind:'character',code:i?'FLOKI':'ENRIC SEGARRA',title:i?'Floki':'Enric Segarra',description:i?'Pelaje negro, collar blanco y una mirada atenta. Acarícialo para que mueva la cola.':'El artista como anfitrión. Barba blanca, camiseta jaspeada y las gafas colgadas de siempre.',object,center:V(),radius:i?2.1:2.75};object.userData.work=work;object.traverse(o=>{if(o.isMesh)o.userData.work=work;});world.pickables.push(object);});positionCompanions(world,0,true);setCompanionsVisible(world,false);
}
export function setCompanionsVisible(world,visible){if(!world.companions)return;world.companions.visible=visible;world.companions.chars.forEach(c=>c.visible=visible);}
export function positionCompanions(world,index,instant=false){const c=world.companions;if(!c)return;const stop=world.stops[index],dx=stop.look[0]-stop.pos[0],dz=stop.look[2]-stop.pos[2],length=Math.hypot(dx,dz)||1,fx=dx/length,fz=dz/length,sx=-fz,sz=fx;
 for(let i=0;i<2;i++){const side=i?1.10:.30,front=i?3.0:3.25;const target=c.targets[i].set(stop.pos[0]+fx*front+sx*side,0,stop.pos[2]+fz*front+sz*side);const b=world.bounds;target.x=THREE.MathUtils.clamp(target.x,b.minX+.6,b.maxX-.6);target.z=THREE.MathUtils.clamp(target.z,b.minZ+.6,b.maxZ-.6);for(const o of world.colliders){const vx=target.x-o.x,vz=target.z-o.z,d=Math.hypot(vx,vz),r=o.r+.45;if(d<r){target.x=o.x+(vx/(d||1))*r;target.z=o.z+(vz/(d||1))*r;}}target.y=world.heightAt?world.heightAt(target.x,target.z):0;
  c.chars[i].userData.faceAngle=Math.atan2(-fx,-fz);if(instant){c.chars[i].position.copy(target);c.chars[i].rotation.y=c.chars[i].userData.faceAngle;}}
}
export function updateCompanions(world,time,dt,animate=true,freeze=false){const c=world.companions;if(!c?.visible)return;c.chars.forEach((character,i)=>{const delta=c.targets[i].clone().sub(character.position),distance=delta.length(),walking=distance>.035&&!freeze;if(walking){const step=Math.min(distance,dt*1.7);character.position.addScaledVector(delta.normalize(),step);if(world.heightAt)character.position.y=world.heightAt(character.position.x,character.position.z);character.userData.rig.gaitPhase=(character.userData.rig.gaitPhase||0)+step*(i?3.2:3);const angle=Math.atan2(delta.x,delta.z),d=angle-character.rotation.y;character.rotation.y+=Math.atan2(Math.sin(d),Math.cos(d))*Math.min(1,dt*8);}else if(!freeze){const d=character.userData.faceAngle-character.rotation.y;character.rotation.y+=Math.atan2(Math.sin(d),Math.cos(d))*Math.min(1,dt*4);}updateCharacter(character,time,dt,walking,animate);character.userData.work.center.copy(character.position).add(V(0,i?.45:.95,0));});}
