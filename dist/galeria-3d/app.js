import {attachCompanions,setCompanionsVisible,positionCompanions,updateCompanions,updateCharacter,act} from './characters.js';
let visitMode='mute';
const $=id=>document.getElementById(id);
let api=null,activeSpace='gallery',currentStop=0,entered=false,selected=null,moving=!matchMedia('(prefers-reduced-motion: reduce)').matches,touring=false,tourTimer=0,previousFocus=null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const state={keys:new Set(),pointers:new Map(),yaw:0,pitch:0,transition:null,player:null,avatarHeading:Math.PI,walkBlend:0,movingAt:-10,nearbyWork:null,proximityClock:0,inspectReturn:null,orbitAngle:0,orbitElev:.1,orbitRadius:4,lastFrame:0,time:0,hover:null,dragging:false,frame:0,pixelScale:1.5,slowFrames:0,walkTarget:null,joyX:0,joyY:0,joyActive:false};
let THREE,ART,ORGANIC_IDS,CURVED_PLANE_IDS,MOBILE_GALLERY_IDS,renderer,camera,world,worlds={},raycaster,mouse,updateMobiles,createGallery,createGarden,createDrawingsRoom,createOrganicRoom,createCurvedPlanesRoom,createMobilesRoom,setSculpturePresentation,getSculpturePresentation,setWorldNightMode;
let isNightMode=false,musicActive=false,audioCtx=null,musicMaster=null,musicTimer=0;
const isFlatArt=k=>k==='painting'||k==='drawing';
const hasDual3D=w=>!!w&&(w.kind==='sculpture'||(w.kind==='mobile'&&!!w.glb));
const SCULPTURE_MODES={ai3d:{short:'Volumen 3D',note:'Volumen 3D con el moldeado, la textura de alta definición y los colores originales de la fotografía de estudio.'},billboard:{short:'Imagen en 3D',note:'Fotografía real de estudio en el espacio 3D. Cambia automáticamente entre frente, perfil y reverso al rodearla.'}};
const catalogUrl=w=>{const base=location.port==='5188'?`${location.protocol}//${location.hostname}:4173/`:'../';return w?.catalogId?`${base}#/obra/${w.catalogId}`:`${base}#/obra`;};
function renderAngles(box,w,after){if(!box)return;if(!w?.views||w.views.length<2){box.hidden=true;box.replaceChildren();return;}box.hidden=false;box.replaceChildren();const n=w.views.length;w.views.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.textContent=v.label.replace('Vista ','');b.className=i===(w.viewIndex||0)?'active':'';b.onclick=e=>{e.stopPropagation();w.manualView=true;w.setView?.(i);if(selected===w&&(getSculpturePresentation?.()||'ai3d')==='ai3d'){const targetAng=w.baseRotation+(n<=3?(i===0?0:i===1&&n===3?Math.PI/2:Math.PI):(i/n)*Math.PI*2);state.orbitAngle=targetAng;orbitCamera();}after?.(i);};box.append(b);});}
function applySculptureMode(mode){if(!SCULPTURE_MODES[mode])return;if(setSculpturePresentation){for(const w of Object.values(worlds))setSculpturePresentation(w,mode);}$('sculpture-mode-label')&&($('sculpture-mode-label').textContent=SCULPTURE_MODES[mode].short);document.querySelectorAll('[data-scmode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scmode===mode)));if(hasDual3D(selected)){orbitCamera();}announce(`Vista 3D en modo: ${SCULPTURE_MODES[mode].short}`);}
document.querySelectorAll('[data-scmode]').forEach(b=>b.addEventListener('click',()=>applySculptureMode(b.dataset.scmode)));
if($('sculpture-mode-btn'))$('sculpture-mode-btn').onclick=()=>{const order=['ai3d','billboard'],cur=getSculpturePresentation?getSculpturePresentation():'ai3d';applySculptureMode(order[(order.indexOf(cur)+1)%order.length]);};
const isPlayerMode=()=>visitMode==='avatar'||visitMode==='floki';
const fail=message=>{$('loading').hidden=true;$('fallback').hidden=false;$('status').textContent=message;document.body.classList.add('entered');$('intro').hidden=true;$('tourbar').hidden=true;$('minimap').hidden=true;$('motion').hidden=true;$('mode-guided').disabled=true;$('mode-avatar').disabled=true;$('mode-floki').disabled=true;$('companion-panel').hidden=true;$('nearby-work').hidden=true;$('enter').disabled=true;};
function openDialog(id){stopTour();state.keys.clear();hideNearby();previousFocus=document.activeElement;$(id).showModal();}
function closeDialog(dialog){dialog.close();previousFocus?.focus?.();}
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeDialog(b.closest('dialog'))));
document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d);}});});
$('help-open').onclick=()=>openDialog('help');$('about-open').onclick=()=>openDialog('about');
document.querySelector('.skip').onclick=e=>{e.preventDefault();openDialog('collection');};
$('collection-open').onclick=()=>openDialog('collection');$('fallback-collection').onclick=()=>openDialog('collection');
$('photo-image').onerror=()=>{$('photo-caption').textContent='No se ha podido cargar la fotografía. Comprueba tu conexión y vuelve a abrirla.';};
const kindLabel=k=>k==='mobile'?'MÓVIL':k==='sculpture'?'ESCULTURA':k==='drawing'?'DIBUJO':'PINTURA';
function renderCollection(){if(!ART)return;const GARDEN_WORK_IDS=['mov016','mov017','mov018','mov019','mov022','mov023','mov025','mov026','mov028','mov032','mov033'];const items=activeSpace==='mobiles'?ART.filter(a=>(MOBILE_GALLERY_IDS||[]).includes(a.id)):activeSpace==='garden'?ART.filter(a=>GARDEN_WORK_IDS.includes(a.id)):activeSpace==='drawings'?ART.filter(a=>a.kind==='drawing'):activeSpace==='organic'?ART.filter(a=>(ORGANIC_IDS||[]).includes(a.id)):activeSpace==='curvos'?ART.filter(a=>(CURVED_PLANE_IDS||[]).includes(a.id)):ART.filter(a=>a.kind!=='drawing'&&!(ORGANIC_IDS||[]).includes(a.id)&&!(CURVED_PLANE_IDS||[]).includes(a.id)&&!(MOBILE_GALLERY_IDS||[]).includes(a.id));$('work-count').textContent=String(items.length).padStart(2,'0');$('work-grid').replaceChildren();items.forEach(a=>{const button=document.createElement('button');button.className='work-card';const img=document.createElement('img');img.src=a.image;img.alt=a.title;img.loading='lazy';const small=document.createElement('small');small.textContent=`${kindLabel(a.kind)} · ${a.code}`;const title=document.createElement('strong');title.textContent=a.title;const action=document.createElement('span');action.textContent=renderer?'Acercarse a la obra ↗':'Ver fotografía ↗';button.append(img,small,title,action);button.onclick=()=>{closeDialog($('collection'));if(renderer)inspect(world.works.find(w=>w.id===a.id));else showPhoto(a);};$('work-grid').append(button);});if(activeSpace==='garden'){const button=document.createElement('button');button.className='work-card';const img=document.createElement('img');img.src='assets/parque.webp';img.alt='Fotografía del terreno y sus árboles';img.loading='lazy';const small=document.createElement('small');small.textContent='ARCHIVO · PARCELA COLLADO DELS LLOPS';const title=document.createElement('strong');title.textContent='El lugar de partida (Náquera)';const action=document.createElement('span');action.textContent='Ver fotografía del parque ↗';button.append(img,small,title,action);button.onclick=()=>{closeDialog($('collection'));showPhoto({image:'assets/parque.webp',title:'La parcela real bajo el Gran Algarrobo',code:'COLLADO DELS LLOPS · NÁQUERA',kind:'environment'});};$('work-grid').append(button);}}
function showPhoto(w){if(!w?.image)return;const idx=w.viewIndex||0;$('photo-image').src=w.views?.[idx]?.src||w.image;$('photo-image').alt=w.title;$('photo-title').textContent=w.title;$('photo-code').textContent=w.code;if($('photo-catalog')){$('photo-catalog').href=catalogUrl(w);$('photo-catalog').hidden=w.kind==='environment';}renderAngles($('photo-angles'),w,i=>{$('photo-image').src=w.views[i].src;renderAngles($('photo-angles'),w);renderAngles($('inspect-angles'),w);renderAngles($('nearby-angles'),w);if($('inspect-thumb')&&selected===w)$('inspect-thumb').src=w.views[i].src;if($('nearby-image')&&state.nearbyWork===w)$('nearby-image').src=w.views[i].src;});$('photo-caption').textContent=w.kind==='mobile'||w.kind==='sculpture'?'Fotografía original de estudio del archivo de Enric Segarra.':w.kind==='environment'?'Fotografía de referencia del archivo. El espacio virtual interpreta este entorno; su distribución no es una reproducción topográfica.':'Fotografía del archivo, en su versión de estudio.';openDialog('photo');}
function hideNearby(){state.nearbyWork=null;$('nearby-work').hidden=true;document.body.classList.remove('nearby-active');}
function updateNearby(dt){state.proximityClock+=dt;if(state.proximityClock<.12)return;state.proximityClock=0;if(activeSpace==='mobiles')updateMobileGameUI();if(!entered||selected||hasDialog()){hideNearby();return;}const p=isPlayerMode()?state.player:camera.position;let nearest=null,best=Infinity;for(const work of world.works){const distance=Math.hypot(p.x-work.center.x,p.z-work.center.z),limit=isFlatArt(work.kind)?3.4:work.kind==='sculpture'?3.6:5;if(distance<3.4&&work.kind==='mobile'&&!work.awakened){work.awakened=true;work.spin=Math.max(work.spin,1.05);updateMobileGameUI();}if(distance>=limit)continue;if(isFlatArt(nearest?.kind)&&!isFlatArt(work.kind))continue;if(isFlatArt(work.kind)&&!isFlatArt(nearest?.kind)||distance<best){nearest=work;best=distance;}}if(!nearest){hideNearby();return;}const idx=nearest.viewIndex||0,src=nearest.views?.[idx]?.src||nearest.image;if(state.nearbyWork?.id!==nearest.id||state.nearbyWorkView!==idx){state.nearbyWork=nearest;state.nearbyWorkView=idx;$('nearby-image').src=src;$('nearby-image').alt=`Fotografía de ${nearest.title}`;$('nearby-code').textContent=`${kindLabel(nearest.kind)} · ${nearest.code}`;$('nearby-title').textContent=nearest.title;if($('nearby-catalog'))$('nearby-catalog').href=catalogUrl(nearest);if($('nearby-scmode'))$('nearby-scmode').hidden=!hasDual3D(nearest);if($('nearby-explore'))$('nearby-explore').textContent=isFlatArt(nearest.kind)?'Acercarse a la obra':'Ver de cerca 360°';renderAngles($('nearby-angles'),nearest,i=>{$('nearby-image').src=nearest.views[i].src;state.nearbyWorkView=i;renderAngles($('nearby-angles'),nearest);});}$('nearby-work').hidden=false;document.body.classList.add('nearby-active');if($('nearby-thumb-wrap'))$('nearby-thumb-wrap').onclick=()=>state.nearbyWork&&showPhoto(state.nearbyWork);}
$('nearby-open').onclick=()=>state.nearbyWork&&showPhoto(state.nearbyWork);
$('nearby-explore').onclick=()=>state.nearbyWork&&inspect(state.nearbyWork);
function announce(message){$('status').textContent=message;}
function enter(){entered=true;$('intro').hidden=true;document.body.classList.add('entered');$('movement').hidden=false;$('walk-hint').hidden=false;$('viewport').focus({preventScroll:true});$('companion-panel').hidden=visitMode!=='guided';if($('mobile-game-panel'))$('mobile-game-panel').hidden=activeSpace!=='mobiles';updateMobileGameUI();}
$('enter').onclick=enter;
function stopTour(){touring=false;tourTimer=0;$('tour-toggle').setAttribute('aria-pressed','false');$('tour-label').textContent=visitMode==='guided'?'Reanudar guía':'Recorrido guiado';$('play-symbol').textContent='▷';}
function updateMotion(){ $('motion').setAttribute('aria-pressed',String(moving));$('motion').setAttribute('aria-label',moving?'Pausar movimiento de las obras':'Activar movimiento de las obras');$('motion').firstChild.textContent=moving?'Ⅱ ':'▷ ';}
updateMotion();$('motion').onclick=()=>{moving=!moving;updateMotion();announce(moving?'Movimiento de las obras activado':'Movimiento de las obras pausado');};
reduced.addEventListener?.('change',e=>{if(e.matches){moving=false;updateMotion();stopTour();}});
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else announce('Este navegador no permite pantalla completa.');}catch{announce('No se ha podido activar la pantalla completa.');}};
$('map-toggle').onclick=()=>{const hidden=!$('map-body').hidden;$('map-body').hidden=hidden;$('map-toggle').textContent=hidden?'+':'−';$('map-toggle').setAttribute('aria-expanded',String(!hidden));$('map-toggle').setAttribute('aria-label',hidden?'Mostrar plano':'Ocultar plano');};
function anglesFor(position,target){const d=target.clone().sub(position);return{yaw:Math.atan2(-d.x,-d.z),pitch:Math.atan2(d.y,Math.hypot(d.x,d.z))};}
function lookCamera(dt=0){
 if(isPlayerMode()&&!selected){
  const p=state.player,blend=dt?1-Math.exp(-9*dt):1,baseY=world.heightAt?world.heightAt(p.x,p.z):0;
  state.cameraYaw=(state.cameraYaw??state.yaw)+shortest(state.cameraYaw??state.yaw,state.yaw)*blend;
  const yaw=state.cameraYaw,distance=Math.max(.8,avatarCameraRoom(p,yaw)),openness=THREE.MathUtils.clamp((distance-.8)/3,0,1);
  const height=baseY+THREE.MathUtils.lerp(visitMode==='floki'?1.65:2.2,3.15,openness),aim=baseY+THREE.MathUtils.lerp(visitMode==='floki'?.65:1.15,1.3,openness),ahead=openness;
  const desired=new THREE.Vector3(p.x+Math.sin(yaw)*distance,height-state.pitch*openness*2,p.z+Math.cos(yaw)*distance);
  const target=new THREE.Vector3(p.x-Math.sin(yaw)*ahead,aim+state.pitch*openness*1.5,p.z-Math.cos(yaw)*ahead);
  camera.position.lerp(desired,blend);const b=world.bounds;
  camera.position.x=THREE.MathUtils.clamp(camera.position.x,b.minX+.12,b.maxX-.12);
  camera.position.z=THREE.MathUtils.clamp(camera.position.z,b.minZ+.12,b.maxZ-.12);
  state.cameraLook??=target.clone();state.cameraLook.lerp(target,blend);camera.lookAt(state.cameraLook);return;
 }
 camera.rotation.order='YXZ';camera.rotation.set(state.pitch,state.yaw,0);
}
function applyAngles(position,target){const a=anglesFor(position,target);state.yaw=a.yaw;state.pitch=a.pitch;lookCamera();}
function mapPoint(x,z){const b=world.bounds;return[15+(x-b.minX)/(b.maxX-b.minX)*140,10+(z-b.minZ)/(b.maxZ-b.minZ)*140];}
function updateMap(){if(!world)return;const p=isPlayerMode()&&state.player?state.player:camera.position;const[x,y]=mapPoint(p.x,p.z);$('map-user').setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(-state.yaw*180/Math.PI).toFixed(1)})`);}
function drawMap(){const ns='http://www.w3.org/2000/svg';$('map-dots').replaceChildren();const svg=$('map-boundary')?.ownerSVGElement;let decor=svg?.querySelector('#map-decor');if(svg&&!decor){decor=document.createElementNS(ns,'g');decor.id='map-decor';svg.insertBefore(decor,$('map-path'));}if(decor)decor.replaceChildren();if($('map-boundary')){if(world.boundaryPolygon?.length){const pts=world.boundaryPolygon.map(([px,pz],i)=>{const[sx,sy]=mapPoint(px,pz);return`${i?'L':'M'}${sx.toFixed(1)},${sy.toFixed(1)}`;}).join('')+'Z';$('map-boundary').setAttribute('d',pts);}else{$('map-boundary').setAttribute('d','M15 10H155V150H15Z');}}if(decor&&world.mapFeatures){const mf=world.mapFeatures,b=world.bounds;if(mf.senderos){mf.senderos.forEach(pathPts=>{const d=pathPts.map(([px,pz],i)=>{const[sx,sy]=mapPoint(px,pz);return`${i?'L':'M'}${sx.toFixed(1)},${sy.toFixed(1)}`;}).join('');const p=document.createElementNS(ns,'path');p.setAttribute('d',d);p.setAttribute('fill','none');p.setAttribute('stroke','#cbb994');p.setAttribute('stroke-width','2.2');p.setAttribute('stroke-linecap','round');p.setAttribute('stroke-linejoin','round');p.setAttribute('opacity','0.7');decor.append(p);});}if(mf.bancalCentral){const d=mf.bancalCentral.map(([px,pz],i)=>{const[sx,sy]=mapPoint(px,pz);return`${i?'L':'M'}${sx.toFixed(1)},${sy.toFixed(1)}`;}).join('');const p=document.createElementNS(ns,'path');p.setAttribute('d',d);p.setAttribute('fill','none');p.setAttribute('stroke','#9c927e');p.setAttribute('stroke-width','1.6');decor.append(p);}if(mf.acequiaNorte){const d=mf.acequiaNorte.map(([px,pz],i)=>{const[sx,sy]=mapPoint(px,pz);return`${i?'L':'M'}${sx.toFixed(1)},${sy.toFixed(1)}`;}).join('');const p=document.createElementNS(ns,'path');p.setAttribute('d',d);p.setAttribute('fill','none');p.setAttribute('stroke','#5f9ea8');p.setAttribute('stroke-width','1.8');p.setAttribute('opacity','0.85');decor.append(p);}if(mf.caseta){const[cx,cz,cw,cl,rot]=mf.caseta,[sx,sy]=mapPoint(cx,cz),sw=cw/(b.maxX-b.minX)*140,sh=cl/(b.maxZ-b.minZ)*140,r=document.createElementNS(ns,'rect');r.setAttribute('x',(-sw/2).toFixed(1));r.setAttribute('y',(-sh/2).toFixed(1));r.setAttribute('width',sw.toFixed(1));r.setAttribute('height',sh.toFixed(1));r.setAttribute('rx','1.5');r.setAttribute('fill','#9c6b42');r.setAttribute('stroke','#593a22');r.setAttribute('stroke-width','0.9');r.setAttribute('transform',`translate(${sx.toFixed(1)} ${sy.toFixed(1)}) rotate(${(-rot).toFixed(1)})`);decor.append(r);}if(mf.trees){mf.trees.forEach(([tx,tz,tr,kind])=>{const[sx,sy]=mapPoint(tx,tz),sr=Math.max(2.2,tr/(b.maxX-b.minX)*140),c=document.createElementNS(ns,'circle');c.setAttribute('cx',sx.toFixed(1));c.setAttribute('cy',sy.toFixed(1));c.setAttribute('r',sr.toFixed(1));c.setAttribute('fill',kind==='reeds'?'#c84232':kind==='algarrobo'?'#3f632c':kind==='pine'?'#4d7338':'#728861');c.setAttribute('stroke',kind==='algarrobo'?'#28421b':'none');c.setAttribute('stroke-width','0.6');c.setAttribute('opacity',kind==='reeds'?'0.82':kind==='algarrobo'?'0.65':'0.48');decor.append(c);});}}const route=[];world.stops.forEach((s,i)=>{const[x,y]=mapPoint(s.pos[0],s.pos[2]);route.push(`${i?'L':'M'}${x},${y}`);const g=document.createElementNS(ns,'g');g.setAttribute('transform',`translate(${x} ${y})`);g.setAttribute('role','button');g.setAttribute('tabindex','0');g.setAttribute('aria-label',`Ir a ${s.title}`);g.dataset.index=i;const c=document.createElementNS(ns,'circle');c.setAttribute('r','8.5');const text=document.createElementNS(ns,'text');text.setAttribute('text-anchor','middle');text.setAttribute('y','3');text.textContent=i+1;g.append(c,text);g.onclick=()=>{stopTour();goStop(i);};g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();stopTour();goStop(i);}};$('map-dots').append(g);});$('map-path').setAttribute('d',route.join(''));updateStopUI();}
function updateStopUI(){const s=world.stops[currentStop];$('stop-number').textContent=`${String(currentStop+1).padStart(2,'0')} / ${String(world.stops.length).padStart(2,'0')}`;$('stop-title').textContent=s.title;[...$('map-dots').children].forEach((g,i)=>g.classList.toggle('active',i===currentStop));}
function validPosition(p){const b=world.bounds;p.x=Math.max(b.minX,Math.min(b.maxX,p.x));p.z=Math.max(b.minZ,Math.min(b.maxZ,p.z));for(const o of world.colliders){const dx=p.x-o.x,dz=p.z-o.z,d=Math.hypot(dx,dz),r=o.r+.3;if(d<r){p.x=o.x+(d?dx/d:1)*r;p.z=o.z+(d?dz/d:0)*r;}}p.x=Math.max(b.minX,Math.min(b.maxX,p.x));p.z=Math.max(b.minZ,Math.min(b.maxZ,p.z));return p;}
function avatarCameraRoom(p,yaw=state.yaw){const b=world.bounds,dx=Math.sin(yaw),dz=Math.cos(yaw);let room=visitMode==='floki'?4.8:5.2;if(Math.abs(dx)>.001)room=Math.min(room,((dx>0?b.maxX-.25:b.minX+.25)-p.x)/dx);if(Math.abs(dz)>.001)room=Math.min(room,((dz>0?b.maxZ-.25:b.minZ+.25)-p.z)/dz);return Math.max(0,room);}
function placeAvatar(){if(!state.player)return;const shortage=Math.max(0,4.5-avatarCameraRoom(state.player));if(shortage){state.player.x-=Math.sin(state.yaw)*shortage;state.player.z-=Math.cos(state.yaw)*shortage;validPosition(state.player);}state.cameraYaw=state.yaw;state.cameraLook=null;lookCamera();}
function avatarDogTarget(){const p=state.player,t=validPosition(new THREE.Vector3(p.x+Math.cos(state.yaw)*.95-Math.sin(state.yaw)*.35,0,p.z-Math.sin(state.yaw)*.95-Math.cos(state.yaw)*.35));if(world.heightAt)t.y=world.heightAt(t.x,t.z);return t;}
function goStop(index,instant=false){if(!renderer)return;leaveInspection(false);enter();currentStop=(index+world.stops.length)%world.stops.length;const s=world.stops[currentStop];if(!isPlayerMode())positionCompanions(world,currentStop,instant||reduced.matches);companionMessage();const to=new THREE.Vector3(...s.pos),gy=world.heightAt?world.heightAt(to.x,to.z):0,look=visitMode==='guided'?world.companions.targets[0].clone().lerp(world.companions.targets[1],.45).add(new THREE.Vector3(0,1,0)):new THREE.Vector3(...s.look),angles=anglesFor(to,look);if(isPlayerMode()){state.player.set(to.x,gy,to.z);state.yaw=angles.yaw;state.avatarHeading=angles.yaw+Math.PI;state.pitch=0;state.transition=null;placeAvatar();if(visitMode==='floki')world.companions.dog.position.copy(state.player);else{world.companions.father.position.copy(state.player);world.companions.dog.position.copy(avatarDogTarget());}}else if(instant||reduced.matches){camera.position.copy(to);state.yaw=angles.yaw;state.pitch=angles.pitch;state.transition=null;lookCamera();}else{state.transition={from:camera.position.clone(),to,fromYaw:state.yaw,toYaw:angles.yaw,fromPitch:state.pitch,toPitch:angles.pitch,elapsed:0,duration:visitMode==='guided'?Math.max(2.2,camera.position.distanceTo(to)/1.65):2.1};}updateStopUI();updateMobileGameUI();announce(`Parada ${currentStop+1}: ${s.title}`);}
$('prev-stop').onclick=()=>{stopTour();goStop(currentStop-1);};$('next-stop').onclick=()=>{stopTour();goStop(currentStop+1);};
$('tour-toggle').onclick=()=>{if(!renderer)return;if(touring){stopTour();return;}if(visitMode!=='guided'){setVisitMode('guided');return;}startTour();};
function startTour(){leaveInspection();enter();touring=true;tourTimer=0;$('tour-toggle').setAttribute('aria-pressed','true');$('tour-label').textContent='Pausar guía';$('play-symbol').textContent='Ⅱ';companionMessage();announce(`Enric y Floki te acompañan: ${world.stops[currentStop].title}.`);}
function inspect(w){if(!w||!renderer)return;stopTour();state.transition=null;state.walkTarget=null;if(world?.walkRing)world.walkRing.visible=false;state.keys.clear();enter();hideNearby();state.inspectReturn={position:camera.position.clone(),yaw:state.yaw,pitch:state.pitch,player:state.player?.clone()};selected=w;if(hasDual3D(w))w.manualView=false;if(w.kind==='mobile'){w.awakened=true;w.spin=Math.max(w.spin,1.15);updateMobileGameUI();}document.body.classList.add('inspecting');$('inspection').hidden=false;$('hover-label').hidden=true;$('movement').hidden=true;$('walk-hint').hidden=true;$('inspect-code').textContent=`${kindLabel(w.kind)} · ${w.code}`;$('inspect-title').textContent=w.title;$('inspect-description').textContent=w.description;if($('sculpture-modes')){$('sculpture-modes').hidden=!hasDual3D(w);const lbl=$('sculpture-modes').querySelector('.modes-label');if(lbl)lbl.textContent=w.kind==='mobile'?'CÓMO VER EL MÓVIL EN 3D:':'CÓMO VER LA ESCULTURA EN 3D:';}if($('inspect-photo-card')){$('inspect-photo-card').hidden=w.kind==='character';if(w.kind!=='character'&&$('inspect-thumb')){$('inspect-thumb').src=w.views?.[w.viewIndex||0]?.src||w.image;$('inspect-thumb').alt=w.title;}}if($('inspect-catalog')){$('inspect-catalog').hidden=w.kind==='character';$('inspect-catalog').href=catalogUrl(w);}renderAngles($('inspect-angles'),w,i=>{if($('inspect-thumb'))$('inspect-thumb').src=w.views[i].src;renderAngles($('inspect-angles'),w);});$('impulse').hidden=isFlatArt(w.kind);const scMode=getSculpturePresentation?getSculpturePresentation():'ai3d';$('inspect-note').textContent=hasDual3D(w)?SCULPTURE_MODES[scMode].note:w.kind==='mobile'?'Reconstrucción 3D equilibrada en el espacio a partir de la obra real.':w.kind==='drawing'?'Obra original sobre papel de la serie «Dibujo y espacio». Pulsa en la imagen para ampliarla a pantalla completa.':'Fotografía de la obra real. Denominación descriptiva provisional.';document.querySelector('.orbit-tools span').textContent=!isFlatArt(w.kind)?'GIRAR 360°':'VER DETALLE';$('orbit-left').hidden=$('orbit-right').hidden=isFlatArt(w.kind);$('original').hidden=w.kind==='character';state.orbitAngle=Math.atan2(camera.position.x-w.center.x,camera.position.z-w.center.z);state.orbitElev=w.kind==='mobile'?-.12:.04;state.orbitRadius=w.radius*(innerWidth<700?1.9:1);if(w.kind==='character'){state.orbitAngle=w.object.rotation.y;state.orbitElev=.09;$('inspect-code').textContent=w.code;$('inspect-note').textContent='Primer prototipo cartoon en 3D. Gíralo para verlo desde todos los lados.';$('impulse').hidden=false;$('impulse').textContent=w.id==='father'?'Saludar a Enric ↗':'Acariciar al perro ♡';document.querySelector('.orbit-tools span').textContent='GIRAR 360°';}else{$('impulse').innerHTML=w.kind==='sculpture'?`Siguiente ángulo (${(w.viewIndex||0)+1}/${w.views.length}) <span>↻</span>`:'Soplar corriente de aire <span>↻</span>';}if(isFlatArt(w.kind)){state.orbitAngle=Math.atan2(w.view.x-w.center.x,w.view.z-w.center.z);state.orbitElev=0;}resize();orbitCamera();announce(`Explorando ${w.title}. Arrastra para girar alrededor o mirar desde abajo; pulsa Escape para volver.`);}
function orbitCamera(){if(!selected)return;const center=selected.center;const position=new THREE.Vector3(center.x+Math.sin(state.orbitAngle)*state.orbitRadius*Math.cos(state.orbitElev),center.y+Math.sin(state.orbitElev)*state.orbitRadius,center.z+Math.cos(state.orbitAngle)*state.orbitRadius*Math.cos(state.orbitElev));validPosition(position);const gy=world?.heightAt?world.heightAt(position.x,position.z):0;position.y=Math.max(gy+.55,Math.min(activeSpace==='garden'?gy+9:activeSpace==='mobiles'?8.8:6,position.y));camera.position.copy(position);applyAngles(position,center);if(hasDual3D(selected)){updateMobiles(world,state.time,0,false,camera.position);const scMode=getSculpturePresentation?getSculpturePresentation():'ai3d';$('inspect-note').textContent=SCULPTURE_MODES[scMode].note;$('impulse').hidden=false;if(selected.kind==='sculpture')$('impulse').innerHTML=`Siguiente ángulo (${(selected.viewIndex||0)+1}/${selected.views.length}) <span>↻</span>`;if($('inspect-thumb'))$('inspect-thumb').src=selected.views?.[selected.viewIndex||0]?.src||selected.image;renderAngles($('inspect-angles'),selected,i=>{if($('inspect-thumb'))$('inspect-thumb').src=selected.views[i].src;renderAngles($('inspect-angles'),selected);});}}
function leaveInspection(restore=true){if(!selected)return;if(hasDual3D(selected))selected.manualView=false;selected=null;document.body.classList.remove('inspecting');$('inspection').hidden=true;$('movement').hidden=!entered;$('walk-hint').hidden=!entered;resize();if(restore&&state.inspectReturn){camera.position.copy(state.inspectReturn.position);state.yaw=state.inspectReturn.yaw;state.pitch=state.inspectReturn.pitch;if(state.inspectReturn.player)state.player.copy(state.inspectReturn.player);lookCamera();}state.inspectReturn=null;}
$('inspect-close').onclick=()=>leaveInspection();$('original').onclick=()=>selected&&showPhoto(selected);if($('inspect-thumb-box'))$('inspect-thumb-box').onclick=()=>selected&&showPhoto(selected);
$('impulse').onclick=()=>{if(selected?.kind==='character'){act(selected.object,selected.id==='father'?'wave':'pet');moving=true;updateMotion();announce(selected.id==='father'?'Enric te saluda.':'El perro mueve la cola.');return;}if(selected?.kind==='sculpture'){selected.manualView=true;selected.setView((selected.viewIndex||0)+1);const i=selected.viewIndex,n=selected.views.length;if((getSculpturePresentation?.()||'ai3d')==='ai3d')state.orbitAngle=selected.baseRotation+(n<=3?(i===0?0:i===1&&n===3?Math.PI/2:Math.PI):(i/n)*Math.PI*2);orbitCamera();announce(`Mostrando ${selected.views[selected.viewIndex].label} de ${selected.title}.`);return;}if(selected){selected.spin=Math.min(selected.spin+1.8,3.2);selected.awakened=true;if(world)world.windImpulse=1.4;moving=true;updateMotion();updateMobileGameUI();announce('Corriente de aire aplicada al móvil.');}};
$('orbit-left').onclick=()=>{if(selected?.kind==='sculpture')selected.manualView=false;state.orbitAngle-=Math.PI/6;orbitCamera();};$('orbit-right').onclick=()=>{if(selected?.kind==='sculpture')selected.manualView=false;state.orbitAngle+=Math.PI/6;orbitCamera();};
function zoom(amount){if(selected){state.orbitRadius=Math.max(isFlatArt(selected.kind)?1.3:selected.kind==='character'?.65:selected.kind==='sculpture'?1.55:2.3,Math.min(9,state.orbitRadius+amount));orbitCamera();}}$('zoom-in').onclick=()=>zoom(-.5);$('zoom-out').onclick=()=>zoom(.5);
async function switchSpace(id){if(!['gallery','garden','drawings','organic','curvos','mobiles'].includes(id))return;stopTour();leaveInspection(false);hideNearby();activeSpace=id;state.keys.clear();state.transition=null;currentStop=0;entered=false;document.body.classList.remove('entered','inspecting');document.body.classList.toggle('garden',id==='garden');document.body.classList.toggle('drawings',id==='drawings');document.body.classList.toggle('organic',id==='organic');document.body.classList.toggle('curvos',id==='curvos');document.body.classList.toggle('mobiles',id==='mobiles');if($('mobile-game-panel'))$('mobile-game-panel').hidden=true;$('intro').hidden=false;$('movement').hidden=true;$('walk-hint').hidden=true;$('scene-title').innerHTML=id==='gallery'?'La forma<br>del aire<span>.</span>':id==='garden'?'El jardín<br>que se mueve<span>.</span>':id==='drawings'?'El trazo y<br>el espacio<span>.</span>':id==='organic'?'La materia<br>orgánica<span>.</span>':id==='curvos'?'El pliegue<br>y el vacío<span>.</span>':'El mirador<br>del aire<span>.</span>';$('scene-copy').innerHTML=id==='gallery'?'Un espacio para detenerse.<br>Esculturas reales, móviles y pintura,<br>desde todos los puntos de vista.':id==='garden'?'Recreación 3D de la parcela real en Náquera.<br>Caseta de madera, acequias, algarrobo<br>y móviles en el Jardín de las Lagartijas.':id==='drawings'?'Una gran sala longitudinal<br>para recorrer sin prisa las 48 obras<br>de la serie «Dibujo y espacio».':id==='organic'?'Un amplio salón diáfano para rodear<br>las 8 esculturas de «Formas orgánicas»<br>en Volumen 3D e Imagen en 3D.':id==='curvos'?'Un gran salón escultórico para rodear<br>las 12 obras de «Planos curvos y volúmenes<br>abiertos» en Volumen 3D e Imagen en 3D.':'33 móviles suspendidos en tres alturas.<br>Míralos desde abajo, sube a las pasarelas<br>y despiértalos con corrientes de aire.';$('enter').innerHTML=id==='gallery'?'Entrar en la galería <span>↗</span>':id==='garden'?'Entrar en el jardín <span>↗</span>':id==='drawings'?'Entrar en la sala de dibujo <span>↗</span>':id==='organic'?'Entrar en Formas orgánicas <span>↗</span>':id==='curvos'?'Entrar en Planos curvos <span>↗</span>':'Entrar al Mirador del Aire <span>↗</span>';$('scene-location').textContent=id==='gallery'?'GALERÍA BLANCA':id==='garden'?'JARDÍN DE LAS LAGARTIJAS':id==='drawings'?'SALA DE DIBUJO':id==='organic'?'SALA DE FORMAS ORGÁNICAS':id==='curvos'?'SALA DE PLANOS CURVOS':'EL MIRADOR DEL AIRE · MÓVILES';$('scene-subtitle').textContent=id==='gallery'?'SALA 01 · ESCULTURA, MÓVILES Y PINTURA':id==='garden'?'COLLADO DELS LLOPS (NÁQUERA) · RECREACIÓN 3D DE LA PARCELA Y MÓVILES':id==='drawings'?'SALA 03 · SERIE DIBUJO Y ESPACIO (48 OBRAS)':id==='organic'?'SALA 04 · SERIE FORMAS ORGÁNICAS (08 OBRAS · 3D + 2D)':id==='curvos'?'SALA 05 · PLANOS CURVOS Y VOLÚMENES ABIERTOS (12 OBRAS · 3D + 2D)':'SALA 06 · 33 MÓVILES EN 3 ALTURAS (0M · +1.7M · +3.2M · 3D + 2D-3D)';if($('sculpture-mode-btn'))$('sculpture-mode-btn').hidden=id==='drawings';if($('motion'))$('motion').hidden=id==='drawings'||id==='organic'||id==='curvos';document.querySelectorAll('[data-space]').forEach(b=>{b.classList.toggle('active',b.dataset.space===id);b.setAttribute('aria-pressed',String(b.dataset.space===id));});if(renderer){$('loading').hidden=false;await new Promise(resolve=>requestAnimationFrame(resolve));if(!worlds[id])worlds[id]=id==='gallery'?createGallery():id==='garden'?createGarden():id==='drawings'?createDrawingsRoom():id==='organic'?createOrganicRoom():id==='curvos'?createCurvedPlanesRoom():createMobilesRoom();world=worlds[id];if(setWorldNightMode)setWorldNightMode(world,isNightMode);if(!world.companions)attachCompanions(world);setCompanionsVisible(world,visitMode!=='mute');if(visitMode==='floki')world.companions.father.visible=false;positionCompanions(world,0,true);updateCompanions(world,0,0,false);$('companion-panel').hidden=true;const s=world.stops[0],gy=world.heightAt?world.heightAt(s.pos[0],s.pos[2]):0;camera.position.set(...s.pos);state.player=new THREE.Vector3(s.pos[0],gy,s.pos[2]);applyAngles(camera.position,new THREE.Vector3(...s.look));if(isPlayerMode()){state.avatarHeading=state.yaw+Math.PI;placeAvatar();if(visitMode==='floki')world.companions.dog.position.copy(state.player);else{world.companions.father.position.copy(state.player);world.companions.dog.position.copy(avatarDogTarget());}}drawMap();resize();renderer.shadowMap.needsUpdate=true;$('loading').hidden=true;}renderCollection();if(visitMode==='guided')setVisitMode('guided');const hashOut=id==='garden'?'#jardin':id==='drawings'?'#dibujo':id==='organic'?'#formas-organicas':id==='curvos'?'#planos-curvos':id==='mobiles'?'#moviles':'#galeria';history.replaceState(null,'',location.search+hashOut);updateMobileGameUI();announce(id==='gallery'?'Galería blanca preparada':id==='garden'?'Jardín de las Lagartijas preparado':id==='drawings'?'Sala de Dibujo preparada':id==='organic'?'Sala de Formas orgánicas preparada':id==='curvos'?'Sala de Planos curvos y volúmenes abiertos preparada':'Sala Aérea de Móviles preparada');}
document.querySelectorAll('[data-space]').forEach(b=>b.onclick=()=>switchSpace(b.dataset.space));
function cancelNavigation(){stopTour();state.transition=null;}
function move(forward,side,dt){
 cancelNavigation();const playerMode=isPlayerMode(),speed=(visitMode==='floki'?3.15:2.4)*dt;
 if(playerMode){state.yaw-=side*1.65*dt;state.avatarHeading=state.yaw+Math.PI;side=0;}
 const old=playerMode?state.player:camera.position,p=old.clone();
 p.x+=(-Math.sin(state.yaw)*forward+Math.cos(state.yaw)*side)*speed;
 p.z+=(-Math.cos(state.yaw)*forward-Math.sin(state.yaw)*side)*speed;
 validPosition(p);const gy=world.heightAt?world.heightAt(p.x,p.z):0;p.y=playerMode?gy:gy+1.72;
 if(playerMode){
  const distance=Math.hypot(p.x-old.x,p.z-old.z);if(distance<.0001)return;
  state.movingAt=state.time;const controlled=visitMode==='floki'?world.companions.dog:world.companions.father;
  controlled.userData.rig.gaitPhase=(controlled.userData.rig.gaitPhase||0)+distance*(visitMode==='floki'?3.2:3)*Math.sign(forward);
  state.player.copy(p);
 }else camera.position.copy(p);
}
function hasDialog(){return !!document.querySelector('dialog[open]');}
const keyMap={KeyW:'forward',ArrowUp:'forward',KeyS:'back',ArrowDown:'back',KeyA:'left',ArrowLeft:'left',KeyD:'right',ArrowRight:'right'};
addEventListener('keydown',e=>{if(e.key==='Escape'&&!hasDialog()){leaveInspection();stopTour();}if(hasDialog()||!renderer)return;if(e.code==='KeyV'&&!e.repeat&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){e.preventDefault();setVisitMode(visitMode==='mute'?'avatar':visitMode==='avatar'?'floki':visitMode==='floki'?'guided':'mute');return;}if(keyMap[e.code]&&!['INPUT','TEXTAREA','SELECT','BUTTON'].includes(document.activeElement?.tagName)){e.preventDefault();if(selected)return;enter();const direction=keyMap[e.code];if(!state.keys.has(direction))move(direction==='forward'?1:direction==='back'?-1:0,direction==='right'?1:direction==='left'?-1:0,.016);state.keys.add(direction);}});
addEventListener('keyup',e=>state.keys.delete(keyMap[e.code]));addEventListener('blur',()=>{state.keys.clear();state.pointers.clear();});
document.querySelectorAll('[data-move]').forEach(b=>{b.onpointerdown=e=>{if(!renderer)return;e.preventDefault();enter();state.walkTarget=null;if(world?.walkRing)world.walkRing.visible=false;b.setPointerCapture(e.pointerId);const direction=b.dataset.move;move(direction==='forward'?1:direction==='back'?-1:0,direction==='right'?1:direction==='left'?-1:0,.016);state.keys.add(direction);};b.onpointerup=b.onpointercancel=b.onlostpointercapture=()=>state.keys.delete(b.dataset.move);});if($('joystick-pad')){const pad=$('joystick-pad'),knob=$('joystick-knob'),updateJoy=e=>{const r=pad.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,maxR=r.width*.36;let dx=e.clientX-cx,dy=e.clientY-cy;const d=Math.hypot(dx,dy);if(d>maxR){dx=dx/d*maxR;dy=dy/d*maxR;}state.joyX=dx/maxR;state.joyY=dy/maxR;if(knob)knob.style.transform=`translate(calc(-50% + ${dx.toFixed(1)}px), calc(-50% + ${dy.toFixed(1)}px))`;},endJoy=()=>{state.joyActive=false;state.joyX=0;state.joyY=0;if(knob)knob.style.transform='translate(-50%,-50%)';};pad.onpointerdown=e=>{if(!renderer)return;e.preventDefault();enter();state.walkTarget=null;if(world?.walkRing)world.walkRing.visible=false;pad.setPointerCapture(e.pointerId);state.joyActive=true;updateJoy(e);};pad.onpointermove=e=>{if(state.joyActive)updateJoy(e);};pad.onpointerup=pad.onpointercancel=pad.onlostpointercapture=endJoy;}
function pickHit(e){const r=renderer.domElement.getBoundingClientRect();mouse.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObjects(world.pickables.filter(o=>o.visible&&!(visitMode==='avatar'&&o===world.companions.father)&&!(visitMode==='floki'&&o===world.companions.dog)),true);return hits[0];}function pick(e){return pickHit(e)?.object;}
function setupPointer(){const canvas=renderer.domElement;canvas.addEventListener('pointerdown',e=>{if(hasDialog())return;canvas.setPointerCapture(e.pointerId);state.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY});state.dragging=false;$('viewport').focus({preventScroll:true});cancelNavigation();});canvas.addEventListener('pointermove',e=>{const p=state.pointers.get(e.pointerId);if(p){const dx=e.clientX-p.x,dy=e.clientY-p.y;if(Math.hypot(e.clientX-p.startX,e.clientY-p.startY)>5)state.dragging=true;if(state.pointers.size===2){const other=[...state.pointers.entries()].find(([k])=>k!==e.pointerId)?.[1];if(other&&selected){const before=Math.hypot(p.x-other.x,p.y-other.y),after=Math.hypot(e.clientX-other.x,e.clientY-other.y);zoom((before-after)*.012);}}else if(selected){if(!isFlatArt(selected.kind)){if(hasDual3D(selected))selected.manualView=false;state.orbitAngle-=dx*.006;state.orbitElev=Math.max(-.76,Math.min(.68,state.orbitElev+dy*.004));orbitCamera();}}else{if(state.dragging)enter();state.yaw-=dx*.004;state.pitch=Math.max(-.55,Math.min(.78,state.pitch-dy*.0025));if(!isPlayerMode())lookCamera();}p.x=e.clientX;p.y=e.clientY;}else if(e.pointerType==='mouse'&&!selected){const hit=pick(e);state.hover=hit?.userData.work||null;$('hover-label').hidden=!state.hover;if(state.hover){$('hover-label').firstChild.textContent=state.hover.title+' ';$('hover-label').style.left=e.clientX+'px';$('hover-label').style.top=Math.max(70,e.clientY-document.querySelector('.topbar').offsetHeight-25)+'px';}canvas.style.cursor=state.hover?'pointer':'grab';}});
 canvas.addEventListener('pointerup',e=>{const p=state.pointers.get(e.pointerId);if(p&&!state.dragging&&state.pointers.size===1&&!selected){const hit=pickHit(e),obj=hit?.object;if(obj?.userData.lookUpMobile){lookUpUnderMobile(obj.userData.lookUpMobile);}else if(obj?.userData.work)inspect(obj.userData.work);else if(obj?.userData.stop!==undefined)goStop(obj.userData.stop);else if(obj?.userData.isFloor&&hit.point){enter();stopTour();state.transition=null;const dest=validPosition(hit.point.clone()),gy=world.heightAt?world.heightAt(dest.x,dest.z):0;dest.y=gy;state.walkTarget=dest;if(world.walkRing){world.walkRing.position.set(dest.x,gy+.028,dest.z);world.walkRing.visible=true;}}}state.pointers.delete(e.pointerId);});canvas.addEventListener('pointercancel',e=>state.pointers.delete(e.pointerId));canvas.addEventListener('lostpointercapture',e=>state.pointers.delete(e.pointerId));canvas.addEventListener('pointerleave',()=>{$('hover-label').hidden=true;});canvas.addEventListener('wheel',e=>{e.preventDefault();if(hasDialog())return;if(selected)zoom(e.deltaY*.004);else{enter();state.walkTarget=null;if(world?.walkRing)world.walkRing.visible=false;move(e.deltaY<0?1:-1,0,.2);}},{passive:false});canvas.addEventListener('contextmenu',e=>e.preventDefault());canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();stopTour();fail('La sesión 3D se ha interrumpido. Recarga la página para volver a intentarlo.');});}
function resize(){if(!renderer)return;const width=$('viewport').clientWidth,height=$('viewport').clientHeight;const deviceRatio=Math.min(devicePixelRatio||1,state.pixelScale);const pixelCount=width*height*deviceRatio*deviceRatio;const ratio=deviceRatio*Math.min(1,Math.sqrt(2100000/pixelCount));renderer.setPixelRatio(ratio);renderer.setSize(width,height,false);camera.aspect=width/height;camera.clearViewOffset();if(selected)camera.setViewOffset(width,height,width>=700?-width*.11:0,width<700?height*.21:0,width,height);camera.updateProjectionMatrix();world&&(world.dirty=true);}
const shortest=(a,b)=>Math.atan2(Math.sin(b-a),Math.cos(b-a));
function updateAvatar(dt){
 const c=world.companions;if(!c?.visible||!state.player)return;
 const controlled=visitMode==='floki'?c.dog:c.father;controlled.position.copy(state.player);
 if(!selected){state.avatarHeading=state.yaw+Math.PI;controlled.rotation.y+=shortest(controlled.rotation.y,state.avatarHeading)*(1-Math.exp(-9*dt));}
 const walking=!selected&&state.time-state.movingAt<.18;
 state.walkBlend=THREE.MathUtils.lerp(state.walkBlend,walking?1:0,Math.min(1,dt*(walking?11:6)));
 updateCharacter(controlled,state.time,dt,state.walkBlend,!reduced.matches);
 if(visitMode==='avatar'){
  const dog=c.dog,target=avatarDogTarget(),delta=target.clone().sub(dog.position),distance=delta.length();
  if(distance>.08&&!selected){const step=Math.min(distance,dt*Math.min(3.4,distance*4));dog.position.addScaledVector(delta.normalize(),step);dog.userData.rig.gaitPhase=(dog.userData.rig.gaitPhase||0)+step*3.2;dog.rotation.y+=shortest(dog.rotation.y,Math.atan2(delta.x,delta.z))*(1-Math.exp(-7*dt));}
  c.dogWalk=THREE.MathUtils.lerp(c.dogWalk||0,distance>.08&&!selected?1:0,1-Math.exp(-7*dt));
  updateCharacter(dog,state.time,dt,c.dogWalk,!reduced.matches);
 }
 c.father.userData.work.center.copy(c.father.position).add(new THREE.Vector3(0,.95,0));c.dog.userData.work.center.copy(c.dog.position).add(new THREE.Vector3(0,.45,0));
}
function animate(now){state.frame=requestAnimationFrame(animate);if(document.hidden||!world)return;const dt=Math.min((now-(state.lastFrame||now))/1000,.06);state.lastFrame=now;const paused=hasDialog();if(!paused){state.time+=dt;if(!selected&&(state.keys.size)){state.walkTarget=null;if(world.walkRing)world.walkRing.visible=false;let f=Number(state.keys.has('forward'))-Number(state.keys.has('back')),s=Number(state.keys.has('right'))-Number(state.keys.has('left'));if(f&&s&&!isPlayerMode()){f*=Math.SQRT1_2;s*=Math.SQRT1_2;}move(f,s,dt);}else if(!selected&&state.joyActive){state.walkTarget=null;if(world.walkRing)world.walkRing.visible=false;if(isPlayerMode())move(-state.joyY,state.joyX,dt);else{state.yaw-=state.joyX*1.65*dt;lookCamera();move(-state.joyY,0,dt);}}else if(!selected&&state.walkTarget){const cur=isPlayerMode()?state.player:camera.position,dx=state.walkTarget.x-cur.x,dz=state.walkTarget.z-cur.z,dist=Math.hypot(dx,dz);if(world.walkRing)world.walkRing.scale.setScalar(.88+.14*Math.sin(state.time*6));if(dist<.22){state.walkTarget=null;if(world.walkRing)world.walkRing.visible=false;}else{const targetYaw=Math.atan2(-dx,-dz);state.yaw+=shortest(state.yaw,targetYaw)*Math.min(1,dt*8.5);if(isPlayerMode())state.avatarHeading=state.yaw+Math.PI;else{state.pitch=THREE.MathUtils.lerp(state.pitch,0,Math.min(1,dt*5));lookCamera();}move(Math.min(1.15,Math.max(.45,dist*.85)),0,dt);}}if(state.transition){const t=state.transition;t.elapsed+=dt;const a=Math.min(1,t.elapsed/t.duration),v=a*a*(3-2*a);camera.position.lerpVectors(t.from,t.to,v);validPosition(camera.position);state.yaw=t.fromYaw+shortest(t.fromYaw,t.toYaw)*v;state.pitch=THREE.MathUtils.lerp(t.fromPitch,t.toPitch,v);lookCamera();if(a>=1)state.transition=null;}if(touring&&!state.transition){const c=world.companions,arrived=c.chars.every((character,i)=>character.position.distanceTo(c.targets[i])<.12);if(arrived){tourTimer+=dt;if(tourTimer>=14){tourTimer=0;if(currentStop===world.stops.length-1){stopTour();$('companion-message').textContent+=' El recorrido ha terminado; puedes explorar libremente.';announce('Recorrido completado. Puedes seguir explorando libremente.');}else goStop(currentStop+1);}}}updateMobiles(world,state.time,dt,moving,camera.position);if(isPlayerMode()){updateAvatar(dt);if(!selected)lookCamera(dt);}else updateCompanions(world,state.time,dt,moving&&!reduced.matches,selected?.kind==='character');}updateNearby(dt);renderer.render(world.scene,camera);updateMap();if(dt>.037&&state.time>5){state.slowFrames++;if(state.slowFrames>100&&state.pixelScale>1){state.pixelScale=1;renderer.shadowMap.enabled=false;resize();}}else state.slowFrames=Math.max(0,state.slowFrames-1);}
async function init(){try{api=await import('./world.js?v=20261101-jardin-v4');({THREE,ART,ORGANIC_IDS,CURVED_PLANE_IDS,MOBILE_GALLERY_IDS,updateMobiles,createGallery,createGarden,createDrawingsRoom,createOrganicRoom,createCurvedPlanesRoom,createMobilesRoom,setSculpturePresentation,getSculpturePresentation,setWorldNightMode}=api);renderCollection();renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance',alpha:false});renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;renderer.shadowMap.enabled=innerWidth>=700;renderer.shadowMap.type=THREE.PCFSoftShadowMap;camera=new THREE.PerspectiveCamera(55,1,.08,150);raycaster=new THREE.Raycaster();mouse=new THREE.Vector2();state.pixelScale=innerWidth<700?1.3:1.5;$('viewport').append(renderer.domElement);setupPointer();new ResizeObserver(resize).observe($('viewport'));const h=location.hash.toLowerCase();const params=new URLSearchParams(location.search);await switchSpace(h==='#jardin'?'garden':h==='#dibujo'||h==='#dibujos'?'drawings':h==='#formas-organicas'||h==='#organicas'||h==='#escultura-organica'?'organic':h==='#planos-curvos'||h==='#curvos'||h==='#volumenes-abiertos'?'curvos':h==='#moviles'||h==='#mirador-del-aire'?'mobiles':'gallery');renderCollection();const scParam=params.get('modo');if(scParam==='billboard'||scParam==='ai3d')applySculptureMode(scParam);const requestedMode=params.get('visita');if(requestedMode==='acompanada')setVisitMode('guided');else if(requestedMode==='personaje')setVisitMode('avatar');else if(requestedMode==='floki')setVisitMode('floki');const nivelParam=params.get('nivel');if(activeSpace==='mobiles'&&nivelParam!==null){enter();if(nivelParam==='abajo')lookUpUnderMobile();else jumpToElevation(Number(nivelParam)||0);}else if(params.get('autoenter')==='1'){enter();}requestAnimationFrame(animate);}catch(error){console.error('No se ha podido iniciar la experiencia 3D.',error);renderer=null;renderCollection();fail('El espacio 3D no está disponible. Puedes explorar las fotografías.');}}
document.addEventListener('visibilitychange',()=>{state.lastFrame=0;state.keys.clear();if(document.hidden)stopTour();});
init();

function companionMessage(){
 if(!world)return;
 const messages=activeSpace==='garden'?['Bienvenido a la parcela real de Collado dels Llops (Náquera): entramos por la Entrada Este junto a la acequia y los almendros con el móvil de tapones de color (MOV-028).','Frente a nosotros se alza la Caseta-Taller restaurada en madera noble con su porche, pérgola y la trama con flores de color (MOV-025).','Junto al camino norte se alzan los dos almendros escultóricos podados: el almendro en V con las tiras perforadas (MOV-017) y el almendro con figuras geométricas y tejas en su base (MOV-032).','Bajo las ramas bajas y horizontales del gran algarrobo centenario cuelgan a altura humana los tres móviles reales de la fotografía de archivo (MOV-016, MOV-019 y MOV-018).','Junto al algarrobo se eleva el pino alto con la columna de tres cilindros moteados y las cestas oscuras con acentos de color (MOV-022), mirando hacia la Entrada Oeste.','En el claro central dialogan el árbol podado de las botellas azules con su alcorque de piedras (MOV-033), el brocal de pozo, los cuatro cilindros con juncos rojos y el olivo joven de las letras.','Junto al bancal de piedra seca y la acequia interior del jardín, los olivos sostienen los círculos rojos entrelazados (MOV-023) con el pinar mediterráneo al fondo.']:activeSpace==='drawings'?['Bienvenido a la Sala de Dibujo. Recorramos con calma las 48 obras de la serie «Dibujo y espacio».','En este primer tramo dominan los trazos rojos, naranjas y las zonas de sombra cálida sobre el papel.','Las líneas azules, verdes y ocres construyen espacios abiertos y ritmos continuos en los muros laterales.','Los paneles centrales dividen suavemente el pabellón para dar aire y distancia de contemplación a cada dibujo.','Tramas grises, curvas entrelazadas y acentos de color dialogan de un lado a otro del recorrido.','Al fondo del pabellón, las últimas obras cierran el horizonte de papel. Puedes caminar libremente por toda la sala.']:activeSpace==='organic'?['Bienvenido a la Sala de Formas orgánicas. Un salón amplio para rodear en 360° las 8 esculturas en madera y piedra.','A la izquierda, el volumen claro de formas onduladas (ESC-008) muestra sus pliegues suaves en piedra clara.','A la derecha, la veta cálida de la madera acompaña la torsión ascendente de ESC-009.','En el tramo central dialogan el remate bifurcado en madera (ESC-010) y el gran volumen blanco con dos aberturas que dejan pasar la luz (ESC-011).','Las formas estilizadas y verticales en madera tallada (ESC-013 y ESC-014) marcan el eje de esta sección del salón.','Al fondo, la piedra redondeada con cavidades (ESC-015) y la raíz natural sobre soporte de hierro (ESC-038) culminan la visita.']:activeSpace==='curvos'?['Bienvenido a la Sala de Planos curvos y volúmenes abiertos. Aquí puedes rodear en 360° las 12 esculturas de hierro y piedra.','El recorrido comienza con el volumen vertical de planos abiertos (ESC-005) y el plano curvo con abertura central (ESC-006).','Observa el recipiente de planos envolventes sobre travertino (ESC-007) y la figura de perfiles ascendentes con sus 4 vistas (ESC-012).','En el centro del salón, los planos abiertos con curvas ascendentes (ESC-031 y ESC-032) recortan el aire sobre sus peanas de piedra.','Las oquedades y el lazo central de hierro (ESC-033 y ESC-034) permiten ver a través del volumen al girar alrededor.','Los contornos ovalados y las curvas en espiral (ESC-035 y ESC-036) muestran cómo la chapa plegada abraza el vacío.','Al fondo culminan los dos planos curvos ascendentes sobre mármol blanco (ESC-044) y el volumen abierto de contorno ondulado con 5 ángulos de estudio (ESC-053).']:activeSpace==='mobiles'?['Bienvenido al Mirador del Aire. Aquí cuelgan los 33 móviles reales en tres alturas distintas.','Colócate sobre los medallones del suelo para mirar los móviles desde abajo hacia los lucernarios.','Subamos por la rampa a la Terraza Oeste (+1.70m): aquí tienes los móviles cara a cara, a la altura de tus ojos.','En la Terraza Este (+1.70m) puedes alternar entre Volumen 3D e Imagen en 3D para contemplar cada móvil de cerca.','Ahora estamos en la Gran Pasarela Aérea (+3.20m), caminando entre las constelaciones más altas de la sala.','En el extremo norte de la pasarela aérea, las piezas suspendidas parecen flotar en el vacío.','De vuelta al suelo cenital, en la rotonda norte, sopla una corriente de aire para poner todos los móviles en danza.']:['Bienvenido a la galería. Enric y Floki te llevarán por las obras, una parada cada vez.','Observa el móvil rosa: sus piezas se equilibran y cambian cuando te mueves alrededor.','Ahora mira el móvil verde. Sus curvas dibujan tanto el espacio vacío como la forma.','La última parada reúne el color de los móviles con la pintura. Acércate a la obra para verla de cerca.'];
 $('companion-message').textContent=`${String(currentStop+1).padStart(2,'0')} / ${String(world.stops.length).padStart(2,'0')} · ${world.stops[currentStop].title}. ${messages[currentStop]}`;
 $('guide-next').hidden=visitMode!=='guided'||currentStop===world.stops.length-1;
 $('guide-work').hidden=visitMode!=='guided'||!world.stops[currentStop].work;
}
function setVisitMode(mode){
 if(!renderer||!['mute','avatar','floki','guided'].includes(mode))return;stopTour();leaveInspection();const previous=visitMode,wasPlayer=isPlayerMode(),ground=wasPlayer&&state.player?state.player.clone():camera.position.clone();visitMode=mode;state.keys.clear();state.transition=null;state.walkBlend=0;enter();$('tour-label').textContent=mode==='guided'?'Reanudar guía':'Recorrido guiado';
 const gy=world?.heightAt?world.heightAt(ground.x,ground.z):0;
 if(mode==='mute'&&wasPlayer){camera.position.set(ground.x,gy+1.72,ground.z);state.pitch=0;}
 if(isPlayerMode()){state.player.set(ground.x,gy,ground.z);state.pitch=0;if(!wasPlayer)state.avatarHeading=state.yaw+Math.PI;placeAvatar();if(mode==='avatar'){world.companions.father.position.copy(state.player);world.companions.dog.position.copy(avatarDogTarget());}else world.companions.dog.position.copy(state.player);}
 setCompanionsVisible(world,mode!=='mute');if(mode==='floki')world.companions.father.visible=false;if(mode==='guided')positionCompanions(world,currentStop,true);else if(isPlayerMode())updateAvatar(0);
 for(const name of ['mute','avatar','floki','guided'])$(`mode-${name}`).setAttribute('aria-pressed',String(mode===name));
 $('companion-panel').hidden=mode!=='guided'||!entered;$('hover-label').hidden=true;state.hover=null;document.body.classList.toggle('accompanied',mode==='guided');
 $('walk-hint').textContent=isPlayerMode()?'Toca el suelo para caminar allí · Toca una obra para verla · Joystick o W A S D / flechas':'Toca el suelo para caminar allí · Toca una obra para verla · Arrastra para mirar · W A S D / flechas';
 for(const side of ['left','right'])document.querySelector(`[data-move=${side}]`).setAttribute('aria-label',`${isPlayerMode()?'Girar':'Caminar'} a la ${side==='left'?'izquierda':'derecha'}`);
 companionMessage();lookCamera();if(mode==='guided'){goStop(currentStop,true);startTour();}
 const url=new URL(location.href);if(mode==='mute')url.searchParams.delete('visita');else url.searchParams.set('visita',mode==='avatar'?'personaje':mode==='floki'?'floki':'acompanada');history.replaceState(null,'',url.pathname+url.search+url.hash);
 announce(mode==='mute'?'Modo solo: camina en primera persona, sin acompañantes ni audio.':mode==='avatar'?'Juegas como Enric: camina en tercera persona con Floki a tu lado.':mode==='floki'?'Juegas como Floki: acércate a las obras para verlas.':'Enric y Floki te guían por la exposición.');
}
function companionAction(who,action){if(!world?.companions)return;moving=true;updateMotion();act(world.companions[who],action);$('companion-message').textContent=who==='father'?'Enric te devuelve el saludo.':'Floki te mira y mueve la cola.';}
$('mode-mute').onclick=()=>setVisitMode('mute');$('mode-avatar').onclick=()=>setVisitMode('avatar');$('mode-floki').onclick=()=>setVisitMode('floki');$('mode-guided').onclick=()=>setVisitMode('guided');
$('guide-next').onclick=()=>{if(currentStop<world.stops.length-1){tourTimer=0;goStop(currentStop+1);if(!touring)startTour();}};
$('guide-work').onclick=()=>{const id=world.stops[currentStop].work;if(id){const work=world.works.find(w=>w.id===id);if(work)inspect(work);}};
$('meet-father').onclick=()=>inspect(world.companions.father.userData.work);$('meet-dog').onclick=()=>inspect(world.companions.dog.userData.work);
$('wave-father').onclick=()=>companionAction('father','wave');$('pet-dog').onclick=()=>companionAction('dog','pet');

let terraceSide=-1;
function updateMobileGameUI(){
 const panel=$('mobile-game-panel');if(!panel)return;
 panel.hidden=activeSpace!=='mobiles'||!entered;
 if(activeSpace!=='mobiles'||!world)return;
 const total=world.mobiles.length||33,count=world.mobiles.filter(m=>m.awakened).length;
 if($('awakened-count'))$('awakened-count').textContent=`${count} / ${total}`;
 if($('awakened-bar'))$('awakened-bar').style.width=`${Math.min(100,Math.round(count/total*100))}%`;
 const p=state.transition?state.transition.to:(isPlayerMode()&&state.player?state.player:camera?.position);
 const curY=(p&&world.heightAt)?world.heightAt(p.x,p.z):0;
 const lvl=curY>=2.45?2:curY>=.85?1:0;
 if($('mg-level-label'))$('mg-level-label').textContent=lvl===2?'Nivel 2 · Pasarela Aérea (+3.2m)':lvl===1?'Nivel 1 · Terrazas Laterales (+1.7m)':'Nivel 0 · Suelo Cenital (0.0m)';
 document.querySelectorAll('[data-elev]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.elev)===lvl)));
}
function moveVisitorTo(x,z,lookTarget,pitchOverride=null){
 if(!renderer||!world)return;
 leaveInspection(false);enter();stopTour();state.walkTarget=null;if(world.walkRing)world.walkRing.visible=false;
 const dest=validPosition(new THREE.Vector3(x,0,z));
 const gy=world.heightAt?world.heightAt(dest.x,dest.z):0;
 const eye=new THREE.Vector3(dest.x,gy+1.72,dest.z);
 const angles=anglesFor(eye,lookTarget);
 if(pitchOverride!==null)angles.pitch=pitchOverride;
 if(isPlayerMode()){
  state.player.set(dest.x,gy,dest.z);state.yaw=angles.yaw;state.avatarHeading=angles.yaw+Math.PI;state.pitch=angles.pitch;state.transition=null;placeAvatar();
  if(visitMode==='floki')world.companions.dog.position.copy(state.player);
  else{world.companions.father.position.copy(state.player);world.companions.dog.position.copy(avatarDogTarget());}
 }else{
  state.transition={from:camera.position.clone(),to:eye,fromYaw:state.yaw,toYaw:angles.yaw,fromPitch:state.pitch,toPitch:angles.pitch,elapsed:0,duration:.65};
 }
 updateMobileGameUI();
}
function jumpToElevation(lvl){
 if(!world||activeSpace!=='mobiles')return;
 if(lvl===0){
  moveVisitorTo(-4.3,25.6,new THREE.Vector3(-4.3,3.6,24.2),.46);
  announce('Nivel 0 · Suelo Cenital (0.0m): mira hacia arriba para contemplar los móviles suspendidos sobre ti.');
 }else if(lvl===1){
  terraceSide*=-1;
  const tx=terraceSide*9.2;
  moveVisitorTo(tx,12.8,new THREE.Vector3(terraceSide*7.85,3.55,10.0),.04);
  announce(`Nivel 1 · Terraza ${terraceSide<0?'Oeste':'Este'} (+1.70m): observa los móviles cara a cara a la altura de tus ojos.`);
 }else{
  moveVisitorTo(0,2.2,new THREE.Vector3(-3.35,5.05,0),.05);
  announce('Nivel 2 · Gran Pasarela Aérea (+3.20m): camina entre las constelaciones suspendidas en lo alto de la sala.');
 }
}
function lookUpUnderMobile(targetWork=null){
 if(!world||activeSpace!=='mobiles')return;
 const p=isPlayerMode()&&state.player?state.player:camera.position;
 let w=targetWork;
 if(!w){
  const candidates=world.mobiles.filter(m=>m.levelTag==='zenith'||m.levelTag==='skybridge');
  w=candidates.sort((a,b)=>Math.hypot(p.x-a.center.x,p.z-a.center.z)-Math.hypot(p.x-b.center.x,p.z-b.center.z))[0]||world.mobiles[0];
 }
 if(!w)return;
 w.awakened=true;w.spin=Math.max(w.spin,1.5);world.windImpulse=1.1;moving=true;updateMotion();
 const gx=Math.abs(w.center.x)<2.5&&Math.abs(w.center.z)<17.5?3.8*Math.sign(w.center.x||1):w.center.x;
 moveVisitorTo(gx,w.center.z+1.35,w.center.clone(),.48);
 announce(`Mirada cenital desde abajo hacia ${w.title} (${w.code}).`);
}
function triggerBreezeWave(){
 if(!world)return;
 enter();moving=true;updateMotion();world.windImpulse=1.8;
 const p=isPlayerMode()&&state.player?state.player:camera.position;
 const sorted=[...world.mobiles].sort((a,b)=>Math.hypot(p.x-a.center.x,p.z-a.center.z)-Math.hypot(p.x-b.center.x,p.z-b.center.z));
 sorted.slice(0,5).forEach((m,i)=>{m.awakened=true;m.spin=Math.min(3.2,m.spin+2.1-i*.25);});
 updateMobileGameUI();
 const count=world.mobiles.filter(m=>m.awakened).length;
 announce(`Corriente de aire enviada: ${count} de ${world.mobiles.length} móviles en danza.`);
}
function goToNextUnawakenedMobile(){
 if(!world||activeSpace!=='mobiles')return;
 const next=world.mobiles.find(m=>!m.awakened)||world.mobiles[(world.mobiles.indexOf(state.nearbyWork)+1)%world.mobiles.length]||world.mobiles[0];
 if(!next)return;
 next.awakened=true;next.spin=Math.max(next.spin,1.75);world.windImpulse=1.2;moving=true;updateMotion();
 if(next.levelTag==='terrace'){
  const sx=Math.sign(next.center.x)||1;
  moveVisitorTo(sx*9.3,next.center.z+1.4,next.center.clone(),.04);
 }else if(next.levelTag==='skybridge'&&Math.abs(next.center.z)<=12.5){
  moveVisitorTo(0,next.center.z+1.8,next.center.clone(),.06);
 }else{
  lookUpUnderMobile(next);return;
 }
 announce(`Descubriendo ${next.title} (${next.code}) en ${next.levelTag==='terrace'?'Terraza +1.70m':'Pasarela Aérea +3.20m'}.`);
}
document.querySelectorAll('[data-elev]').forEach(b=>b.addEventListener('click',()=>jumpToElevation(Number(b.dataset.elev))));
if($('mg-lookup'))$('mg-lookup').onclick=()=>lookUpUnderMobile();
if($('mg-breeze'))$('mg-breeze').onclick=()=>triggerBreezeWave();
if($('mg-next-mobile'))$('mg-next-mobile').onclick=()=>goToNextUnawakenedMobile();

function toggleNightMode(force){
 isNightMode=typeof force==='boolean'?force:!isNightMode;
 document.body.classList.toggle('night-mode',isNightMode);
 if(setWorldNightMode){for(const w of Object.values(worlds))setWorldNightMode(w,isNightMode);}
 if($('day-night-btn'))$('day-night-btn').setAttribute('aria-pressed',String(isNightMode));
 if($('day-night-icon'))$('day-night-icon').textContent=isNightMode?'🌙':'☀️';
 if($('day-night-label'))$('day-night-label').textContent=isNightMode?'Noche':'Día';
 if(renderer)renderer.toneMappingExposure=isNightMode?0.92:1.08;
 if(musicActive)playAmbientNote(isNightMode?220:293.66,3.2,0.09,true);
 announce(isNightMode?'Modo Noche activado: cielo estrellado y luces cálidas del jardín encendidas.':'Modo Día activado: luz solar mediterránea y nubes en movimiento.');
}
if($('day-night-btn'))$('day-night-btn').onclick=()=>toggleNightMode();

function ensureAudio(){
 if(audioCtx)return audioCtx;
 const Ctx=window.AudioContext||window.webkitAudioContext;
 if(!Ctx)return null;
 audioCtx=new Ctx();
 musicMaster=audioCtx.createGain();
 musicMaster.gain.value=0.34;
 // Lush feedback delay / reverb tail for C418 Minecraft-style felt piano space
 const delayL=audioCtx.createDelay(2.0),delayR=audioCtx.createDelay(2.0);
 delayL.delayTime.value=0.38;delayR.delayTime.value=0.53;
 const fbL=audioCtx.createGain(),fbR=audioCtx.createGain();
 fbL.gain.value=0.36;fbR.gain.value=0.34;
 const damp=audioCtx.createBiquadFilter();damp.type='lowpass';damp.frequency.value=1650;
 musicMaster.connect(audioCtx.destination);
 musicMaster.connect(damp);damp.connect(delayL);damp.connect(delayR);
 delayL.connect(fbL);fbL.connect(delayR);delayR.connect(fbR);fbR.connect(delayL);
 const wet=audioCtx.createGain();wet.gain.value=0.42;
 delayL.connect(wet);delayR.connect(wet);wet.connect(audioCtx.destination);
 return audioCtx;
}
function playAmbientNote(freq,dur=3.6,vel=0.11,isPad=false,delaySec=0){
 const ctx=ensureAudio();if(!ctx||!musicActive)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime+delaySec;
 const osc1=ctx.createOscillator(),osc2=ctx.createOscillator();
 osc1.type=isPad?'sine':'triangle';
 osc2.type='sine';
 osc1.frequency.setValueAtTime(freq,t0);
 osc2.frequency.setValueAtTime(freq*(isPad?1.002:2.0),t0);
 const filter=ctx.createBiquadFilter();
 filter.type='lowpass';
 filter.frequency.setValueAtTime(isPad?680:1450,t0);
 filter.frequency.exponentialRampToValueAtTime(isPad?420:340,t0+dur);
 const env=ctx.createGain(),g2=ctx.createGain();
 g2.gain.value=isPad?0.35:0.16;
 env.gain.setValueAtTime(0.0001,t0);
 env.gain.linearRampToValueAtTime(vel,t0+(isPad?0.65:0.045));
 env.gain.exponentialRampToValueAtTime(0.0002,t0+dur);
 osc1.connect(filter);osc2.connect(g2);g2.connect(filter);
 filter.connect(env);env.connect(musicMaster);
 osc1.start(t0);osc2.start(t0);
 osc1.stop(t0+dur+0.08);osc2.stop(t0+dur+0.08);
}
const DAY_CHORDS=[
 [174.61,220.00,261.63,329.63,392.00], // Fmaj9 (Sweden / Subwoofer Lullaby warmth)
 [130.81,196.00,246.94,293.66,392.00], // Cmaj9
 [196.00,246.94,293.66,329.63,440.00], // G6/9
 [146.83,220.00,261.63,329.63,440.00]  // Dm9
];
const NIGHT_CHORDS=[
 [110.00,164.81,220.00,261.63,329.63], // Am7 nocturnal
 [146.83,220.00,261.63,349.23,440.00], // Dm7 starry
 [130.81,196.00,246.94,329.63,392.00], // Cmaj7 calm
 [174.61,220.00,261.63,329.63,493.88]  // Fmaj7#11 Lydian moon
];
let chordIndex=0;
function scheduleAmbientPhrase(){
 if(!musicActive)return;
 const pool=isNightMode?NIGHT_CHORDS:DAY_CHORDS;
 const chord=pool[chordIndex%pool.length];
 chordIndex++;
 // Warm low pad root + fifth
 playAmbientNote(chord[0],5.8,0.065,true,0);
 playAmbientNote(chord[1],5.2,0.048,true,0.12);
 // Arpeggiated felt-piano melody notes (Minecraft C418 style)
 const notes=3+Math.floor(Math.random()*3);
 for(let i=0;i<notes;i++){
  const n=chord[1+Math.floor(Math.random()*(chord.length-1))]*(Math.random()<0.28?2:1);
  playAmbientNote(n,3.4+Math.random()*1.2,0.085+Math.random()*0.035,false,0.45+i*(0.78+Math.random()*0.35));
 }
 // Occasional gentle bird-chime in daytime garden or starry celesta harmonic at night
 if(activeSpace==='garden'&&Math.random()<0.65){
  const high=isNightMode?1046.5:1318.5;
  playAmbientNote(high,1.6,0.032,false,2.2);
  if(!isNightMode)playAmbientNote(high*1.125,1.2,0.028,false,2.42);
 }
 musicTimer=setTimeout(scheduleAmbientPhrase,isNightMode?5600:4800);
}
function toggleAmbientMusic(force){
 musicActive=typeof force==='boolean'?force:!musicActive;
 if($('music-btn'))$('music-btn').setAttribute('aria-pressed',String(musicActive));
 if($('music-icon'))$('music-icon').textContent=musicActive?'🎶':'🎵';
 if($('music-label'))$('music-label').textContent=musicActive?'Música ON':'Música';
 clearTimeout(musicTimer);
 if(musicActive){
  ensureAudio();
  scheduleAmbientPhrase();
  announce('Música ambiental interactiva activada.');
 }else{
  announce('Música ambiental pausada.');
 }
}
if($('music-btn'))$('music-btn').onclick=()=>toggleAmbientMusic();

addEventListener('message',async e=>{
 const d=e?.data;if(!d)return;
 if(d.type==='garden-cmd'){
  if(activeSpace!=='garden')await switchSpace('garden');
  enter();
  if(d.timeOfDay==='night')toggleNightMode(true);
  else if(d.timeOfDay==='day')toggleNightMode(false);
  else if(d.action==='toggle-time')toggleNightMode();
  if(typeof d.music==='boolean')toggleAmbientMusic(d.music);
  else if(d.action==='toggle-music')toggleAmbientMusic();
  if(d.action==='breeze')triggerBreezeWave();
  if(typeof d.stop==='number')goStop(d.stop);
  return;
 }
 if(d.type!=='mobiles-cmd')return;
 if(activeSpace!=='mobiles')await switchSpace('mobiles');
 enter();
 if(d.mode==='ai3d'||d.mode==='billboard')applySculptureMode(d.mode);
 if(typeof d.elev==='number')jumpToElevation(d.elev);
 if(d.action==='lookup')lookUpUnderMobile();
 if(d.action==='breeze')triggerBreezeWave();
 if(d.action==='next')goToNextUnawakenedMobile();
 if(d.workId){const w=world?.works.find(x=>x.id===d.workId||x.catalogId===d.workId||x.code===d.workId);if(w)inspect(w);}
});
