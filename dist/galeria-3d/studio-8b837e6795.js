import * as THREE from './vendor/three.module.min.js';
import {createFather,createDog,updateCharacter,act} from './characters-8b837e6795.js';
const $=id=>document.getElementById(id),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let renderer,scene,camera,pair,father,dog,subject='both',angle=.25,elevation=.1,distance=3.5,spinning=false,walking=false,last=0,time=0,pinching=false,lastTap=0;
const pointers=new Map();
const center=new THREE.Vector3(0,.94,0);
function announce(text){$('studio-status').textContent=text;}
function minDistance(){return subject==='dog'?1:1.6;}
function defaultDistance(){return subject==='dog'?2.1:3.5;}
function showModel(){
 if(!renderer)init();else resize();
}
function cameraPose(){camera.position.set(center.x+Math.sin(angle)*distance*Math.cos(elevation),center.y+Math.sin(elevation)*distance,center.z+Math.cos(angle)*distance*Math.cos(elevation));camera.lookAt(center);const a=((angle%(Math.PI*2))+Math.PI*2)%(Math.PI*2);$('angle-label').textContent=Math.round(a*180/Math.PI)+'°';}
function resize(){if(!renderer)return;const el=$('studio-canvas'),w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.6));renderer.setSize(w,h,false);const aspect=w/h;camera.aspect=aspect;camera.fov=aspect<1?Math.min(50,40+(1-aspect)*16):40;camera.updateProjectionMatrix();cameraPose();}
function init(){try{
 renderer=new THREE.WebGLRenderer({antialias:true});renderer.setClearColor('#e8e5dd');renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;$('studio-canvas').append(renderer.domElement);
 scene=new THREE.Scene();scene.fog=new THREE.Fog('#e8e5dd',10,22);camera=new THREE.PerspectiveCamera(40,1,.03,40);scene.add(new THREE.HemisphereLight('#e3ecf3','#b6a68a',2));const key=new THREE.DirectionalLight('#fff1d7',2.4);key.position.set(-3,6,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-4;key.shadow.camera.right=4;key.shadow.camera.top=4;key.shadow.camera.bottom=-4;key.shadow.normalBias=.02;scene.add(key);const rim=new THREE.DirectionalLight('#b5cdd7',1.2);rim.position.set(3,3,-3);scene.add(rim);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshStandardMaterial({color:'#dfdbd0',roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-.018;floor.receiveShadow=true;scene.add(floor);const disc=new THREE.Mesh(new THREE.CylinderGeometry(1.25,1.25,.045,96),new THREE.MeshStandardMaterial({color:'#cecbbf',roughness:1}));disc.position.y=-.025;disc.receiveShadow=true;scene.add(disc);
 pair=new THREE.Group();scene.add(pair);father=createFather();dog=createDog();father.position.x=-.30;dog.position.set(.47,0,.1);dog.rotation.y=-.16;pair.add(father,dog);announce('Cargando los personajes…');Promise.all([father.userData.ready,dog.userData.ready]).then(()=>announce('Personajes listos. Puedes girarlos, acercarte con dos dedos, saludar y acariciar a Floki.'));
 const el=$('studio-canvas');
 el.addEventListener('pointerdown',e=>{
  try{el.setPointerCapture(e.pointerId);}catch{}
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false});
  if(pointers.size>=2)pinching=true;
  spinning=false;$('spin').setAttribute('aria-pressed','false');
 });
 el.addEventListener('pointermove',e=>{
  const p=pointers.get(e.pointerId);if(!p)return;
  if(Math.hypot(e.clientX-p.startX,e.clientY-p.startY)>6)p.moved=true;
  if(pointers.size===2){
   pinching=true;
   const other=[...pointers.entries()].find(([k])=>k!==e.pointerId)?.[1];
   if(other){
    const before=Math.hypot(p.x-other.x,p.y-other.y);
    const after=Math.hypot(e.clientX-other.x,e.clientY-other.y);
    distance=THREE.MathUtils.clamp(distance+(before-after)*0.011,minDistance(),6);
    cameraPose();
   }
  }else if(!pinching){
   angle-=(e.clientX-p.x)*.007;
   elevation=THREE.MathUtils.clamp(elevation+(e.clientY-p.y)*.004,-.15,.6);
   cameraPose();
  }
  p.x=e.clientX;p.y=e.clientY;
 });
 const endPointer=e=>{
  const p=pointers.get(e.pointerId);
  if(p&&!p.moved&&!pinching&&pointers.size===1){
   const now=performance.now();
   if(now-lastTap<320){
    angle=.25;elevation=.1;distance=defaultDistance();cameraPose();
    lastTap=0;
   }else lastTap=now;
  }
  pointers.delete(e.pointerId);
  if(pointers.size===0)pinching=false;
 };
 for(const type of ['pointerup','pointercancel','lostpointercapture'])el.addEventListener(type,endPointer);
 el.addEventListener('wheel',e=>{e.preventDefault();distance=THREE.MathUtils.clamp(distance+e.deltaY*.003,minDistance(),6);cameraPose();},{passive:false});
 el.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();angle+=(e.key==='ArrowLeft'?-1:1)*.15;cameraPose();}});
 new ResizeObserver(resize).observe(el);resize();requestAnimationFrame(frame);
 }catch(error){announce('El visor 3D no ha podido iniciarse en este navegador. Puedes descargar los modelos 3D para verlos en otra aplicación.');console.error(error);}}
function frame(now){requestAnimationFrame(frame);const dt=Math.min((now-(last||now))/1000,.05);last=now;if(document.hidden)return;time+=dt;if(spinning&&!reduced.matches){angle+=dt*.3;cameraPose();}updateCharacter(father,time,dt,walking,!reduced.matches);updateCharacter(dog,time,dt,walking,!reduced.matches);renderer.render(scene,camera);}
document.querySelectorAll('[data-subject]').forEach(button=>button.onclick=()=>{subject=button.dataset.subject;father.visible=subject!=='dog';dog.visible=subject!=='father';father.position.x=subject==='both'?-.3:0;dog.position.x=subject==='both'?.47:0;center.set(subject==='both'?.03:0,subject==='dog'?.42:.94,0);distance=defaultDistance();document.querySelectorAll('[data-subject]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$('hello').disabled=subject==='dog';$('pet').disabled=subject==='father';cameraPose();announce(subject==='dog'?'Floki, desde todos los ángulos.':subject==='father'?'Enric, desde todos los ángulos.':'Enric y Floki juntos.');});
document.querySelectorAll('[data-angle]').forEach(button=>button.onclick=()=>{angle=Number(button.dataset.angle);spinning=false;$('spin').setAttribute('aria-pressed','false');cameraPose();});
$('hello').onclick=()=>{act(father,'wave');announce('Enric te saluda.');};$('pet').onclick=()=>{act(dog,'pet');announce('Floki responde moviendo la cola.');};
$('walk').onclick=()=>{walking=!walking;$('walk').setAttribute('aria-pressed',String(walking));$('walk').textContent=walking?'Detener pasos':'Animar pasos';announce(walking?'Animación de pasos activada.':'Animación de pasos detenida.');};
$('spin').onclick=()=>{spinning=!spinning;$('spin').setAttribute('aria-pressed',String(spinning));announce(spinning?'Giro automático activado.':'Giro automático detenido.');};
$('closer').onclick=()=>{distance=Math.max(minDistance(),distance-.3);cameraPose();};$('farther').onclick=()=>{distance=Math.min(6,distance+.3);cameraPose();};
reduced.addEventListener('change',()=>{if(reduced.matches){walking=false;spinning=false;$('walk').setAttribute('aria-pressed','false');$('spin').setAttribute('aria-pressed','false');$('walk').textContent='Animar pasos';}});

showModel();
