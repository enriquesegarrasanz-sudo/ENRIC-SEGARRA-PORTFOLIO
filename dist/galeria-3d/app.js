import {attachCompanions,setCompanionsVisible,positionCompanions,stageCompanionsForPreview,flankCompanionsForInspection,updateCompanions,updateCharacter,act} from './characters.js';
let visitMode='mute';
const $=id=>document.getElementById(id);
let api=null,activeSpace='gallery',currentStop=0,entered=false,selected=null,moving=!matchMedia('(prefers-reduced-motion: reduce)').matches,touring=false,tourTimer=0,previousFocus=null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const state={keys:new Set(),pointers:new Map(),yaw:0,pitch:0,roll:0,camElev:0,transition:null,player:null,avatarHeading:Math.PI,walkBlend:0,movingAt:-10,nearbyWork:null,dismissedNearbyId:null,proximityClock:0,inspectReturn:null,orbitAngle:0,orbitElev:.1,orbitRadius:4,targetOrbitAngle:0,targetOrbitElev:.1,targetOrbitRadius:4,orbitVelAngle:0,orbitVelElev:0,panVelX:0,panVelY:0,autoOrbit:false,inspectPanX:0,inspectPanY:0,targetInspectPanX:0,targetInspectPanY:0,inspectCollapsed:false,userZoomFov:null,lookVelYaw:0,lookVelPitch:0,viewOffsetX:0,viewOffsetY:0,lastFrame:0,time:0,hover:null,dragging:false,frame:0,pixelScale:1.5,slowFrames:0,walkTarget:null,joyX:0,joyY:0,joyActive:false};
let THREE,ART,ORGANIC_IDS,CURVED_PLANE_IDS,MOBILE_GALLERY_IDS,PAINTING_IDS,FIGURAS_DIB_IDS,RELIEF_RECORTADOS_IDS,RELIEF_MURALES_IDS,RELIEF_TEXTURA_IDS,INTERVENCIONES_IDS,renderer,camera,world,worlds={},worldLru=[],raycaster,mouse,updateMobiles,disposeWorld,createGallery,createGarden,createDrawingsRoom,createPaintingsRoom,createOrganicRoom,createCurvedPlanesRoom,createMobilesRoom,setSculpturePresentation,getSculpturePresentation,setWorldNightMode,setGardenTimeOfDay,getGardenTimeOfDay;
let timeOfDayMode='day',isNightMode=false,musicActive=false,cinematicActive=false,cinematicPaused=false,cinematicAllSpaces=true,cinematicSwitching=false,cinematicClock=0,cinematicMode='works',currentWorkIdx=0,tourStepMode='works',fastWalk=false,photoCurrentWork=null,audioCtx=null,musicMaster=null,reverbBus=null,windGainNode=null,waterGainNode=null,hammerBuf=null,musicTimer=0,stepAccum=0,lastTapTime=0,walkHintTimer=0;
let externalPaused=false,isEmbeddedView=false,guideStageActive=false,guideStageMode='avatar',guideStageReelPlaying=!reduced.matches,guideStageReelClock=0,lastStageClickMode=null,lastStageClickAt=0;
function getViewportAspect(){
 const vp=$('viewport');
 return vp&&vp.clientHeight>0?vp.clientWidth/vp.clientHeight:(innerWidth/Math.max(1,innerHeight));
}
function getBaseRoomFov(){
 const aspect=getViewportAspect();
 return aspect>=1?55:Math.min(65,55+(1-aspect)*18);
}
function getBaseInspectFov(){
 const aspect=getViewportAspect();
 return aspect>=1?50:Math.min(58,50+(1-aspect)*14);
}
const isFlatArt=wOrK=>{if(!wOrK)return false;const k=typeof wOrK==='string'?wOrK:wOrK.kind;return k==='painting'||k==='drawing'||(typeof wOrK==='object'&&k==='sculpture'&&!wOrK.applyMode);};
const hasPresentationModes=w=>!!w&&w.kind!=='character'&&w.kind!=='environment'&&!!w.applyMode;
const hasDual3D=w=>!!w&&w.kind!=='character'&&w.kind!=='environment'&&!!w.applyMode&&!!w.views&&(w.kind==='sculpture'||w.kind==='mobile');
const SCULPTURE_MODES={
 ai3d:{
  short:'Versión normal (3D)',
  note:'Versión normal (3D): volumen tridimensional con iluminación de sala, relieve y textura física de la obra.',
  flatNote:'Versión normal (3D): obra montada en sala con su soporte físico, iluminación museográfica y relieve de bastidor o marco.'
 },
 billboard:{
  short:'Versión fotografía',
  note:'Versión fotografía: fotografía original de archivo a color directo sin alteración lumínica; cambia de ángulo al rodearla.',
  flatNote:'Versión fotografía: fotografía original de archivo a color directo 1:1 sin reflejos, marcos añadidos ni alteración lumínica.'
 }
};
function clampOrbitAngleForWork(w,angle){
 if(!w?.isWallRelief||!w.view)return angle;
 const base=Math.atan2(w.view.x-w.center.x,w.view.z-w.center.z);
 const diff=Math.atan2(Math.sin(angle-base),Math.cos(angle-base));
 return base+Math.max(-1.12,Math.min(1.12,diff));
}
function targetOrbitForViewIndex(w,i,n){
 if(w?.isWallRelief){
  const base=Math.atan2(w.view.x-w.center.x,w.view.z-w.center.z);
  const off=i===0?0:(i%2===1?0.48:-0.48);
  return clampOrbitAngleForWork(w,base+off);
 }
 return w.baseRotation+(n<=3?(i===0?0:i===1&&n===3?Math.PI/2:Math.PI):(i/n)*Math.PI*2);
}
const webBase=()=>location.port==='5188'?`${location.protocol}//${location.hostname}:4173/`:'../';
const catalogUrl=w=>w?.catalogId?`${webBase()}#/obra/${w.catalogId}`:`${webBase()}#/`;
const seriesWebUrl=w=>{
 if(!w||w.kind==='character'||w.kind==='environment')return `${webBase()}#/`;
 if(w.series==='Móviles en el jardín')return `${webBase()}#/jardin`;
 const cat=w.category||(w.kind==='mobile'?'moviles':w.kind==='drawing'?'dibujo':w.kind==='painting'?'pintura':'escultura');
 if(cat==='moviles')return `${webBase()}#/moviles`;
 return w.series?`${webBase()}#/obra/${cat}?serie=${encodeURIComponent(w.series)}`:`${webBase()}#/obra/${cat}`;
};
function getRoomNavigableWorks(){
 if(!world?.works)return [];
 return world.works.filter(w=>w.kind!=='character'&&w.kind!=='environment');
}
function getWorkStandPosition(w){
 if(!w||!world||!THREE)return new THREE.Vector3(0,1.72,0);
 const stand=w.view?w.view.clone():new THREE.Vector3(w.center.x,1.72,w.center.z+2.4);
 validPosition(stand);
 const gy=world.heightAt?world.heightAt(stand.x,stand.z):0;
 stand.y=w.kind==='mobile'?Math.max(gy+1.72,Math.min(gy+4.2,w.center.y)):gy+1.72+(state.camElev||0);
 return stand;
}
function getCurrentCinematicWork(){
 const works=getRoomNavigableWorks();
 if(!world)return null;
 if(cinematicMode==='works'&&works.length){
  return works[(currentWorkIdx+works.length)%works.length]||null;
 }
 const s=world.stops?.[currentStop];
 if(s?.work){
  const explicit=world.works.find(x=>x.id===s.work);
  if(explicit)return explicit;
 }
 if(s&&works.length){
  const lx=s.look?.[0]??s.pos[0],lz=s.look?.[2]??s.pos[2];
  let best=works[0],bestD=Infinity;
  for(const w of works){
   const d=Math.hypot(w.center.x-lx,w.center.z-lz);
   if(d<bestD){bestD=d;best=w;}
  }
  return best;
 }
 return works[0]||null;
}
function notifyParentState(){
 try{
  if(window.parent&&window.parent!==window){
   const activeW=selected||(cinematicActive?getCurrentCinematicWork():state.nearbyWork)||(world?.stops?.[currentStop]?.work?world.works.find(x=>x.id===world.stops[currentStop].work):null);
   const works=getRoomNavigableWorks();
   const wIdx=activeW?works.findIndex(x=>x.id===activeW.id):-1;
   window.parent.postMessage({
    type:'museum-state',
    space:activeSpace,
    visitMode,
    guideStageOpen:guideStageActive,
    paused:Boolean(externalPaused||!moving),
    timeOfDay:timeOfDayMode,
    sculptureMode:getSculpturePresentation?getSculpturePresentation():'ai3d',
    cinematic:cinematicActive,
    cinematicPaused,
    cinematicMode,
    stopIndex:currentStop,
    stopCount:world?.stops?.length||0,
    stopTitle:world?.stops?.[currentStop]?.title||'',
    workIndex:wIdx>=0?wIdx:currentWorkIdx,
    workCount:works.length,
    work:activeW&&activeW.kind!=='character'?{
     id:activeW.id,
     code:activeW.code,
     catalogId:activeW.catalogId||'',
     title:activeW.title,
     series:activeW.series||'',
     kind:activeW.kind,
     url:catalogUrl(activeW),
     seriesUrl:seriesWebUrl(activeW)
    }:null
   },'*');
  }
 }catch{}
}
function updateWorkNavCounters(refWork=null){
 const works=getRoomNavigableWorks();
 const total=String(works.length||1).padStart(2,'0');
 const target=refWork||selected||state.nearbyWork||works[currentWorkIdx];
 let idx=target?works.findIndex(w=>w.id===target.id||w.code===target.code):currentWorkIdx;
 if(idx<0)idx=0;
 currentWorkIdx=idx;
 const cur=String(idx+1).padStart(2,'0');
 const label=`${cur} / ${total}`;
 if($('inspect-work-pos'))$('inspect-work-pos').textContent=label;
 if($('nearby-pos'))$('nearby-pos').textContent=label;
 if($('photo-work-pos'))$('photo-work-pos').textContent=label;
 if(tourStepMode==='works'&&works[idx]){
  if($('stop-number'))$('stop-number').textContent=`${cur} / ${total}`;
  if($('stop-title'))$('stop-title').textContent=`${works[idx].code} · ${works[idx].title}`;
 }
}
const SPACE_WEB_INFO={
 gallery:{
  label:'Escultura en el catálogo web ↗',
  route:'#/escultura',
  exhibitions:[
   {id:'colomina',title:'Escultura · Palacio Colomina'},
   {id:'caixa-castello',title:'Dibujo y escultura · Caixa Castelló (2006)'},
   {id:'sala-bellas-artes',title:'Sala de les Belles Arts · Evolución (1984–2004)'},
   {id:'quatre',title:'Exposición Quatre'},
   {id:'signo-agua',title:'Archivo de Signo de Agua'}
  ]
 },
 garden:{
  label:'El Jardín en el catálogo web ↗',
  route:'#/jardin',
  exhibitions:[
   {id:'colomina',title:'Escultura y móviles · Palacio Colomina'}
  ]
 },
 paintings:{
  label:'Pintura (76) en el catálogo web ↗',
  route:'#/pintura',
  exhibitions:[
   {id:'sala-bellas-artes',title:'Sala de les Belles Arts · Evolución (1984–2004)'},
   {id:'quatre',title:'Exposición Quatre'},
   {id:'sant-jordi-estivella',title:'Sant Jordi i el drac · Estivella'},
   {id:'dragonians-casa-libro',title:'Dragonians Cinc · Casa del Libro'}
  ]
 },
 drawings:{
  label:'Dibujo (53) en el catálogo web ↗',
  route:'#/dibujo',
  exhibitions:[
   {id:'caixa-castello',title:'Dibujo y escultura · Caixa Castelló (2006)'},
   {id:'sala-bellas-artes',title:'Sala de les Belles Arts · Evolución (1984–2004)'},
   {id:'sant-jordi-estivella',title:'Sant Jordi i el drac · Estivella'},
   {id:'dragonians-casa-libro',title:'Dragonians Cinc · Casa del Libro'}
  ]
 },
 organic:{
  label:'Formas orgánicas en el catálogo web ↗',
  route:'#/escultura?serie=Formas%20org%C3%A1nicas',
  exhibitions:[
   {id:'caixa-castello',title:'Dibujo y escultura · Caixa Castelló (2006)'},
   {id:'sala-bellas-artes',title:'Sala de les Belles Arts · Evolución (1984–2004)'}
  ]
 },
 curvos:{
  label:'Planos curvos en el catálogo web ↗',
  route:'#/escultura?serie=Planos%20curvos%20y%20vol%C3%BAmenes%20abiertos',
  exhibitions:[
   {id:'caixa-castello',title:'Dibujo y escultura · Caixa Castelló (2006)'},
   {id:'sala-bellas-artes',title:'Sala de les Belles Arts · Evolución (1984–2004)'}
  ]
 },
 mobiles:{
  label:'Móviles (33) en el catálogo web ↗',
  route:'#/moviles',
  exhibitions:[
   {id:'colomina',title:'Escultura y móviles · Palacio Colomina'}
  ]
 }
};
let urlOriginWork=null;
function renderExhibitionLinksInto(box,exhs,base){
 if(!box)return;
 box.replaceChildren();
 if(!exhs||!exhs.length){box.hidden=true;return;}
 box.hidden=false;
 const lbl=document.createElement('span');
 lbl.className=box.classList.contains('intro-exh-links')?'':'re-label';
 lbl.textContent='Exposiciones vinculadas:';
 box.append(lbl);
 exhs.forEach(ex=>{
  const a=document.createElement('a');
  a.href=`${base}#/archivo/${ex.id}`;
  a.target='_top';
  a.textContent=`${ex.title} ↗`;
  box.append(a);
 });
}
function syncWebNavigationLinks(){
 const base=webBase();
 if($('brand-web-link'))$('brand-web-link').href=`${base}#/`;
 if($('bottom-web-link'))$('bottom-web-link').href=`${base}#/`;
 const info=SPACE_WEB_INFO[activeSpace]||SPACE_WEB_INFO.gallery;
 if($('web-section-link')){$('web-section-link').href=`${base}${info.route}`;$('web-section-link').textContent=info.label;}
 if($('intro-web-link')){$('intro-web-link').href=`${base}${info.route}`;$('intro-web-link').textContent=info.label.replace(' ↗',' en el catálogo web ↗');}
 renderExhibitionLinksInto($('intro-exhibition-links'),info.exhibitions,base);
 renderExhibitionLinksInto($('collection-exhibitions'),info.exhibitions,base);
 document.querySelectorAll('[data-web-route]').forEach(a=>{
  const r=a.getAttribute('data-web-route');
  a.href=`${base}${r}`;
  const cleanInfo=info.route.replace('#/obra/','#/');
  a.classList.toggle('active-web-link',(info.route.startsWith(r)||cleanInfo.startsWith(r))&&r!=='#/');
 });
 const refWork=selected||(urlOriginWork&&(!world?.works||world.works.some(w=>w.id===urlOriginWork.id))?urlOriginWork:null);
 if($('web-return-work')){
  $('web-return-work').hidden=false;
  if(refWork&&refWork.catalogId){
   $('web-return-work').href=catalogUrl(refWork);
   $('web-return-work').textContent=`← ${refWork.code}`;
   $('web-return-work').title=`Volver a la ficha de ${refWork.code}`;
  }else{
   $('web-return-work').href=`${base}${info.route}`;
   $('web-return-work').textContent='← Catálogo';
   $('web-return-work').title='Volver al catálogo web';
  }
 }
}
if($('web-nav-toggle')){
 $('web-nav-toggle').onclick=()=>{
  const bar=$('web-sections-bar');if(!bar)return;
  const open=bar.hidden;bar.hidden=!open;
  $('web-nav-toggle').setAttribute('aria-expanded',String(open));
 };
}
function renderAngles(box,w,after){if(!box)return;if(!w?.views||w.views.length<2){box.hidden=true;box.replaceChildren();return;}box.hidden=false;box.replaceChildren();const n=w.views.length;w.views.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.textContent=v.label.replace('Vista ','');b.className=i===(w.viewIndex||0)?'active':'';b.onclick=e=>{e.stopPropagation();w.manualView=true;w.setView?.(i);if(selected===w&&(getSculpturePresentation?.()||'ai3d')==='ai3d'){const targetAng=targetOrbitForViewIndex(w,i,n);state.targetOrbitAngle=clampOrbitAngleForWork(w,state.orbitAngle+shortest(state.orbitAngle,targetAng));if(reduced.matches){state.orbitAngle=state.targetOrbitAngle;orbitCamera();}}after?.(i);};box.append(b);});}
function applySculptureMode(mode){
 if(!SCULPTURE_MODES[mode])return;
 if(setSculpturePresentation){for(const w of Object.values(worlds))setSculpturePresentation(w,mode);}
 if($('sculpture-mode-label'))$('sculpture-mode-label').textContent=SCULPTURE_MODES[mode].short;
 document.querySelectorAll('[data-scmode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scmode===mode)));
 if(selected&&hasPresentationModes(selected)&&$('inspect-note')){
  $('inspect-note').hidden=false;
  $('inspect-note').textContent=isFlatArt(selected)?SCULPTURE_MODES[mode].flatNote:SCULPTURE_MODES[mode].note;
 }
 if(hasDual3D(selected)){orbitCamera();}
 announce(`Visualización cambiada a: ${SCULPTURE_MODES[mode].short}`);
}
document.querySelectorAll('[data-scmode]').forEach(b=>b.addEventListener('click',()=>applySculptureMode(b.dataset.scmode)));
if($('sculpture-mode-btn'))$('sculpture-mode-btn').onclick=()=>{const order=['ai3d','billboard'],cur=getSculpturePresentation?getSculpturePresentation():'ai3d';applySculptureMode(order[(order.indexOf(cur)+1)%order.length]);};
const isPlayerMode=()=>visitMode==='avatar'||visitMode==='enric'||visitMode==='floki';
const fail=message=>{if($('loading'))$('loading').hidden=true;if($('fallback'))$('fallback').hidden=false;if($('status'))$('status').textContent=message;document.body.classList.add('entered');if($('intro'))$('intro').hidden=true;if($('quick-env-wrap'))$('quick-env-wrap').hidden=true;if($('entry-companion-card'))$('entry-companion-card').hidden=true;if($('tourbar'))$('tourbar').hidden=true;if($('minimap'))$('minimap').hidden=true;if($('motion'))$('motion').hidden=true;if($('mode-guided'))$('mode-guided').disabled=true;if($('mode-avatar'))$('mode-avatar').disabled=true;if($('mode-enric'))$('mode-enric').disabled=true;if($('mode-floki'))$('mode-floki').disabled=true;if($('companion-panel'))$('companion-panel').hidden=true;if($('nearby-work'))$('nearby-work').hidden=true;if($('enter'))$('enter').disabled=true;};
function closeQuickVisitMenu(){
 if($('quick-visit-menu'))$('quick-visit-menu').hidden=true;
 if($('quick-visit-btn'))$('quick-visit-btn').setAttribute('aria-expanded','false');
}
const GUIDE_STAGE_CAST={
 avatar:{
  badge:'EN ESCENA · ENRIC Y FLOKI',
  cta:'Comenzar con Enric y Floki',
  quote:'«¡Hola! Soy Enric, y aquí está Floki. Ven con nosotros a recorrer las obras paso a paso.»',
  dist:2.95,camLift:1.50,lookLift:1.04,sideOff:-0.12,fov:46
 },
 enric:{
  badge:'EN ESCENA · SOLO ENRIC',
  cta:'Comenzar solo con Enric',
  quote:'«Paseemos juntos en calma: te acompaño frente a cada escultura, relieve y pintura.»',
  dist:2.38,camLift:1.56,lookLift:1.22,sideOff:0.14,fov:44
 },
 floki:{
  badge:'EN ESCENA · SOLO FLOKI',
  cta:'Comenzar solo con Floki',
  quote:'«¡Guau! Floki abre camino a ras de suelo con paso ágil por toda la sala y el jardín.»',
  dist:1.92,camLift:0.94,lookLift:0.50,sideOff:-0.14,fov:46
 },
 mute:{
  badge:'VISIÓN LIBRE · POR TU CUENTA',
  cta:'Explorar por mi cuenta',
  quote:'«Mirada limpia en primera persona: camina libremente y gira cada pieza en 360°.»',
  dist:0.0,camLift:1.72,lookLift:1.55,sideOff:0.0,fov:52
 },
 guided:{
  badge:'RECORRIDO CURATORIAL · VISITA GUIADA',
  cta:'Iniciar visita guiada',
  quote:'«Recorrido comentado parada a parada con explicaciones de cada serie junto a Enric y Floki.»',
  dist:3.32,camLift:1.62,lookLift:1.12,sideOff:0.26,fov:48
 }
};
const GUIDE_STAGE_ORDER=['avatar','enric','floki','mute','guided'];
function syncGuideStageButtons(mode){
 const cast=GUIDE_STAGE_CAST[mode]||GUIDE_STAGE_CAST.avatar;
 if($('stage-live-badge'))$('stage-live-badge').textContent=cast.badge;
 if($('stage-live-quote'))$('stage-live-quote').textContent=cast.quote;
 if($('intro-stage-quote'))$('intro-stage-quote').textContent=cast.quote;
 if($('stage-confirm-btn'))$('stage-confirm-btn').innerHTML=`${cast.cta} <span>↗</span>`;
 if($('enter'))$('enter').innerHTML=`${cast.cta} <span>↗</span>`;
 document.querySelectorAll('[data-stage-visit]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.stageVisit===mode)));
 document.querySelectorAll('[data-entry-visit]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.entryVisit===mode)));
}
function setGuideStageReel(playing){
 guideStageReelPlaying=Boolean(playing)&&!reduced.matches;
 guideStageReelClock=0;
 if($('stage-reel-pause')){
  $('stage-reel-pause').setAttribute('aria-pressed',String(guideStageReelPlaying));
  $('stage-reel-pause').textContent=guideStageReelPlaying?'Ⅱ Pausar escena':'▷ Animar escena';
 }
 if($('intro-stage-reel-btn')){
  $('intro-stage-reel-btn').setAttribute('aria-pressed',String(guideStageReelPlaying));
  $('intro-stage-reel-btn').textContent=guideStageReelPlaying?'Ⅱ Animática':'▷ Animática';
 }
}
function previewGuideStageMode(mode,instant=false){
 if(!GUIDE_STAGE_CAST[mode])mode='avatar';
 guideStageMode=mode;
 syncGuideStageButtons(mode);
 if(!renderer||!world||!THREE)return;
 const s=world.stops?.[currentStop]||world.stops?.[0];
 if(!s)return;
 const stopPos=new THREE.Vector3(...s.pos);
 const stopLook=new THREE.Vector3(...s.look);
 const fwd=new THREE.Vector3(stopLook.x-stopPos.x,0,stopLook.z-stopPos.z);
 if(fwd.lengthSq()<0.001)fwd.set(0,0,-1);else fwd.normalize();
 const right=new THREE.Vector3(-fwd.z,0,fwd.x);
 const rawSpot=world.id==='gallery'&&currentStop===0?new THREE.Vector3(-0.35,0,12.1):stopPos.clone().addScaledVector(fwd,2.75);
 const stageSpot=validPosition(rawSpot);
 stageSpot.y=world.heightAt?world.heightAt(stageSpot.x,stageSpot.z):0;
 const faceCamAngle=Math.atan2(-fwd.x,-fwd.z);
 stageCompanionsForPreview(world,mode,stageSpot,faceCamAngle,instant||reduced.matches);
 const cast=GUIDE_STAGE_CAST[mode];
 let camTo,camLook;
 if(mode==='mute'){
  camTo=validPosition(stopPos.clone().addScaledVector(fwd,0.65));
  const gy=world.heightAt?world.heightAt(camTo.x,camTo.z):0;
  camTo.y=gy+1.72;
  camLook=stopLook.clone();
 }else{
  const c=world.companions;
  const actorBase=mode==='enric'?c.targets[0].clone():mode==='floki'?c.targets[1].clone():c.targets[0].clone().lerp(c.targets[1],0.45);
  const introShift=(!entered&&innerWidth>760)?-0.62:0;
  const dockDist=guideStageActive?cast.dist+0.28:cast.dist;
  camTo=validPosition(actorBase.clone().addScaledVector(fwd,-dockDist).addScaledVector(right,cast.sideOff+introShift));
  const gy=world.heightAt?world.heightAt(camTo.x,camTo.z):0;
  camTo.y=gy+cast.camLift;
  camLook=actorBase.clone().add(new THREE.Vector3(0,cast.lookLift-(guideStageActive?0.16:0),0));
  if(!entered&&innerWidth>760)camLook.addScaledVector(right,-0.28);
  if(mode==='guided')camLook.lerp(stopLook,0.24);
 }
 if(instant||reduced.matches){
  camera.position.copy(camTo);
  camera.fov=cast.fov;camera.updateProjectionMatrix();
  applyAngles(camTo,camLook);
  state.transition=null;
 }else{
  state.transition=buildSmoothTransition(camTo,camLook,{duration:0.86,toFov:cast.fov,arcFactor:0.08,liftFactor:0.025,maxLift:0.22});
 }
 if(musicActive)triggerMusicChime(0.65);
}
function openGuideStage(initialMode=null){
 if(!renderer||!world)return;
 closeQuickVisitMenu();
 closeDialog($('options'));
 stopTour();
 leaveInspection(false);
 hideNearby();
 enter();
 guideStageActive=true;
 document.body.classList.add('guide-stage-open');
 if($('entry-companion-card'))$('entry-companion-card').hidden=false;
 setGuideStageReel(!reduced.matches);
 previewGuideStageMode(initialMode|| (visitMode==='mute'?'avatar':visitMode),false);
 notifyParentState();
}
function closeGuideStage(restoreVisit=true){
 const wasActive=guideStageActive;
 guideStageActive=false;
 document.body.classList.remove('guide-stage-open');
 if($('entry-companion-card'))$('entry-companion-card').hidden=true;
 if(restoreVisit&&wasActive&&world){
  setVisitMode(visitMode||'mute');
 }
 notifyParentState();
}
function commitGuideStageMode(mode){
 const chosen=GUIDE_STAGE_CAST[mode]?mode:'mute';
 try{sessionStorage.setItem('es3d_visit_chosen',chosen);}catch{}
 const wasStaged=guideStageActive||!entered;
 guideStageActive=false;
 document.body.classList.remove('guide-stage-open');
 if($('entry-companion-card'))$('entry-companion-card').hidden=true;
 if(wasStaged&&world?.companions&&state.player&&(chosen==='avatar'||chosen==='enric'||chosen==='floki')){
  const actor=chosen==='floki'?world.companions.dog:world.companions.father;
  if(actor){
   const p=validPosition(actor.position.clone());
   const gy=world.heightAt?world.heightAt(p.x,p.z):0;
   state.player.set(p.x,gy,p.z);
  }
 }
 setVisitMode(chosen);
 notifyParentState();
}
function dismissEntryCompanionCard(markChosen=true){
 if(markChosen){try{sessionStorage.setItem('es3d_visit_chosen',visitMode||'mute');}catch{}}
 closeGuideStage(true);
}
function openDialog(id){
 const dlg=$(id);if(!dlg)return;
 closeQuickVisitMenu();
 document.querySelectorAll('dialog[open]').forEach(d=>{if(d!==dlg)d.close();});
 stopTour();state.keys.clear();hideNearby();if(!dlg.open)dlg.showModal();
}
function closeDialog(dialog){if(!dialog)return;if(dialog.open)dialog.close();}
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('close',()=>{d.returnValue='';}));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeDialog(b.closest('dialog'))));
if(typeof HTMLDialogElement!=='undefined'&&!('closedBy' in HTMLDialogElement.prototype)){
 const outside=(e,d)=>{const r=d.getBoundingClientRect();return e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom;};
 document.querySelectorAll('dialog[closedby="any"]').forEach(d=>{let pressedOut=false;d.addEventListener('pointerdown',e=>{pressedOut=outside(e,d);});d.addEventListener('pointerup',e=>{if(pressedOut&&outside(e,d))d.close();});});
}
if($('options-open'))$('options-open').onclick=()=>openDialog('options');
if($('quick-options-btn'))$('quick-options-btn').onclick=()=>openDialog('options');
if($('entry-open-options'))$('entry-open-options').onclick=()=>{dismissEntryCompanionCard(false);openDialog('options');};
if($('help-open'))$('help-open').onclick=()=>openDialog('help');
if($('about-open'))$('about-open').onclick=()=>openDialog('about');
if(document.querySelector('.skip'))document.querySelector('.skip').onclick=e=>{e.preventDefault();openDialog('collection');};
if($('collection-open'))$('collection-open').onclick=()=>openDialog('collection');
if($('fallback-collection'))$('fallback-collection').onclick=()=>openDialog('collection');
$('photo-image').onerror=()=>{$('photo-caption').textContent='No se ha podido cargar la fotografía. Comprueba tu conexión y vuelve a abrirla.';};
const kindLabel=k=>k==='mobile'?'MÓVIL':k==='sculpture'?'ESCULTURA':k==='drawing'?'DIBUJO':'PINTURA';
function renderCollection(){
 if(!ART)return;
 const GARDEN_WORK_IDS=['mov016','mov017','mov018','mov019','mov022','mov023','mov025','mov026','mov028','mov032','mov033','esc047','esc048','esc049','esc050','esc051','esc052'];
 const items=activeSpace==='mobiles'?ART.filter(a=>(MOBILE_GALLERY_IDS||[]).includes(a.id)):
  activeSpace==='garden'?ART.filter(a=>GARDEN_WORK_IDS.includes(a.id)):
  activeSpace==='paintings'?ART.filter(a=>(PAINTING_IDS||[]).includes(a.id)):
  activeSpace==='drawings'?ART.filter(a=>a.kind==='drawing'):
  activeSpace==='organic'?ART.filter(a=>(ORGANIC_IDS||[]).includes(a.id)):
  activeSpace==='curvos'?ART.filter(a=>(CURVED_PLANE_IDS||[]).includes(a.id)):
  ART.filter(a=>a.kind!=='drawing'&&!(PAINTING_IDS||[]).includes(a.id)&&!(ORGANIC_IDS||[]).includes(a.id)&&!(CURVED_PLANE_IDS||[]).includes(a.id)&&!(MOBILE_GALLERY_IDS||[]).includes(a.id));
 $('work-count').textContent=String(items.length).padStart(2,'0');
 $('work-grid').replaceChildren();
 items.forEach(a=>{
  const card=document.createElement('div');card.className='work-card';
  const img=document.createElement('img');img.src=a.image;img.alt=a.title;img.loading='lazy';img.style.cursor='pointer';
  const small=document.createElement('small');small.textContent=`${kindLabel(a.kind)} · ${a.code}${a.series?' · '+a.series:''}`;
  const title=document.createElement('strong');title.textContent=a.title;title.style.cursor='pointer';
  const linksRow=document.createElement('div');linksRow.className='work-card-links';
  const btn3d=document.createElement('button');btn3d.type='button';btn3d.className='card-3d-btn';
  btn3d.textContent=renderer?'Ver en 3D ↗':'Ampliar foto ↗';
  const openIn3d=()=>{
   closeDialog($('collection'));
   if(renderer){const wObj=world?.works.find(w=>w.id===a.id||w.code===a.code);if(wObj)focusAndInspectWork(wObj);}
   else showPhoto(a);
  };
  img.onclick=openIn3d;title.onclick=openIn3d;btn3d.onclick=openIn3d;
  linksRow.append(btn3d);
  if(a.catalogId){
   const webLink=document.createElement('a');
   webLink.className='card-web-link';
   webLink.href=catalogUrl(a);
   webLink.target='_top';
   webLink.textContent='Ficha en la web ↗';
   linksRow.append(webLink);
  }
  card.append(img,small,title,linksRow);
  $('work-grid').append(card);
 });
 if(activeSpace==='garden'){
  const button=document.createElement('button');button.className='work-card';
  const img=document.createElement('img');img.src='assets/parque.webp';img.alt='Fotografía del terreno y sus árboles';img.loading='lazy';
  const small=document.createElement('small');small.textContent='ARCHIVO · PARCELA COLLADO DELS LLOPS';
  const title=document.createElement('strong');title.textContent='El lugar de partida (Náquera)';
  const action=document.createElement('span');action.textContent='Ver fotografía del parque ↗';
  button.append(img,small,title,action);
  button.onclick=()=>{closeDialog($('collection'));showPhoto({image:'assets/parque.webp',title:'La parcela real bajo el Gran Algarrobo',code:'COLLADO DELS LLOPS · NÁQUERA',kind:'environment'});};
  $('work-grid').append(button);
 }
}
function swapImgSmooth(imgEl,newSrc,newAlt){
 if(!imgEl||!newSrc)return;
 if(imgEl.getAttribute('src')===newSrc){if(newAlt)imgEl.alt=newAlt;return;}
 if(reduced.matches||!imgEl.complete){
  imgEl.src=newSrc;
  if(newAlt)imgEl.alt=newAlt;
  return;
 }
 const pre=new Image();
 pre.src=newSrc;
 const commit=()=>{
  imgEl.classList.add('img-soft-swap');
  requestAnimationFrame(()=>{
   imgEl.src=newSrc;
   if(newAlt)imgEl.alt=newAlt;
   requestAnimationFrame(()=>imgEl.classList.remove('img-soft-swap'));
  });
 };
 if(pre.decode)pre.decode().then(commit,commit);
 else pre.onload=pre.onerror=commit;
}
const photoZoom={scale:1,x:0,y:0,pointers:new Map(),lastTap:0,startX:0,startY:0,moved:false,pinching:false};
function applyPhotoZoomTransform(){
 const img=$('photo-image'),vp=$('photo-zoom-viewport'),rst=$('photo-zoom-reset');
 if(!img)return;
 if(photoZoom.scale<=1.01){photoZoom.scale=1;photoZoom.x=0;photoZoom.y=0;}
 else if(vp){
  const maxX=(vp.clientWidth*(photoZoom.scale-1))*0.5;
  const maxY=(vp.clientHeight*(photoZoom.scale-1))*0.5;
  photoZoom.x=Math.max(-maxX,Math.min(maxX,photoZoom.x));
  photoZoom.y=Math.max(-maxY,Math.min(maxY,photoZoom.y));
 }
 img.style.transform=photoZoom.scale===1?'':`translate3d(${photoZoom.x.toFixed(1)}px,${photoZoom.y.toFixed(1)}px,0) scale(${photoZoom.scale.toFixed(3)})`;
 if(rst)rst.textContent=`${Math.round(photoZoom.scale*100)}%`;
}
function resetPhotoZoom(){
 photoZoom.scale=1;photoZoom.x=0;photoZoom.y=0;photoZoom.pointers.clear();photoZoom.pinching=false;
 $('photo-zoom-viewport')?.classList.remove('is-gesturing');
 applyPhotoZoomTransform();
}
function setPhotoZoomScale(nextScale,originClientX=null,originClientY=null){
 const vp=$('photo-zoom-viewport');
 const clamped=Math.max(1,Math.min(4.5,nextScale));
 if(vp&&originClientX!==null&&originClientY!==null&&clamped>1){
  const r=vp.getBoundingClientRect();
  const ox=originClientX-(r.left+r.width/2);
  const oy=originClientY-(r.top+r.height/2);
  const ratio=clamped/Math.max(1,photoZoom.scale);
  photoZoom.x=ox-(ox-photoZoom.x)*ratio;
  photoZoom.y=oy-(oy-photoZoom.y)*ratio;
 }
 photoZoom.scale=clamped;
 applyPhotoZoomTransform();
}
if($('photo-zoom-in'))$('photo-zoom-in').onclick=()=>setPhotoZoomScale(photoZoom.scale*1.45);
if($('photo-zoom-out'))$('photo-zoom-out').onclick=()=>setPhotoZoomScale(photoZoom.scale/1.45);
if($('photo-zoom-reset'))$('photo-zoom-reset').onclick=()=>resetPhotoZoom();
if($('photo-zoom-viewport')){
 const pvp=$('photo-zoom-viewport');
 pvp.addEventListener('pointerdown',e=>{
  if(e.button&&e.button!==0)return;
  try{pvp.setPointerCapture(e.pointerId);}catch{}
  photoZoom.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(photoZoom.pointers.size===1){
   photoZoom.startX=e.clientX;photoZoom.startY=e.clientY;photoZoom.moved=false;
  }else if(photoZoom.pointers.size>=2){
   photoZoom.pinching=true;
  }
  pvp.classList.add('is-gesturing');
 });
 pvp.addEventListener('pointermove',e=>{
  const cur=photoZoom.pointers.get(e.pointerId);if(!cur)return;
  const dx=e.clientX-cur.x,dy=e.clientY-cur.y;
  if(Math.hypot(e.clientX-photoZoom.startX,e.clientY-photoZoom.startY)>7)photoZoom.moved=true;
  if(photoZoom.pointers.size===2){
   photoZoom.pinching=true;
   const other=[...photoZoom.pointers.entries()].find(([id])=>id!==e.pointerId)?.[1];
   if(other){
    const prevDist=Math.max(8,Math.hypot(cur.x-other.x,cur.y-other.y));
    const nextDist=Math.max(8,Math.hypot(e.clientX-other.x,e.clientY-other.y));
    const midX=(e.clientX+other.x)*0.5,midY=(e.clientY+other.y)*0.5;
    photoZoom.x+=dx*0.5;photoZoom.y+=dy*0.5;
    setPhotoZoomScale(photoZoom.scale*(nextDist/prevDist),midX,midY);
   }
  }else if(!photoZoom.pinching&&photoZoom.scale>1.01){
   photoZoom.x+=dx;photoZoom.y+=dy;
   applyPhotoZoomTransform();
  }
  cur.x=e.clientX;cur.y=e.clientY;
 });
 const endPhotoPointer=e=>{
  const hadOne=photoZoom.pointers.size===1&&!photoZoom.pinching;
  photoZoom.pointers.delete(e.pointerId);
  if(photoZoom.pointers.size===0){
   pvp.classList.remove('is-gesturing');
   if(hadOne){
    const totalDx=e.clientX-photoZoom.startX,totalDy=e.clientY-photoZoom.startY;
    if(!photoZoom.moved){
     const now=performance.now();
     if(now-photoZoom.lastTap<320){
      photoZoom.lastTap=0;
      if(photoZoom.scale>1.15)resetPhotoZoom();
      else setPhotoZoomScale(2.4,e.clientX,e.clientY);
     }else photoZoom.lastTap=now;
    }else if(photoZoom.scale<=1.02&&Math.abs(totalDx)>52&&Math.abs(totalDx)>Math.abs(totalDy)*1.35){
     stepPhotoWork(totalDx<0?1:-1);
    }
   }
   photoZoom.pinching=false;
  }
 };
 pvp.addEventListener('pointerup',endPhotoPointer);
 pvp.addEventListener('pointercancel',endPhotoPointer);
 pvp.addEventListener('lostpointercapture',endPhotoPointer);
 pvp.addEventListener('wheel',e=>{
  e.preventDefault();
  setPhotoZoomScale(photoZoom.scale*(e.deltaY<0?1.18:1/1.18),e.clientX,e.clientY);
 },{passive:false});
}
function showPhoto(w){
 if(!w?.image)return;
 photoCurrentWork=w;
 resetPhotoZoom();
 const idx=w.viewIndex||0;
 const nextSrc=w.views?.[idx]?.src||w.image;
 if($('photo')?.open)swapImgSmooth($('photo-image'),nextSrc,w.title);
 else{$('photo-image').src=nextSrc;$('photo-image').alt=w.title;}
 $('photo-title').textContent=w.title;
 $('photo-code').textContent=w.code;
 const isEnv=w.kind==='environment'||w.kind==='character';
 if($('photo-work-nav'))$('photo-work-nav').hidden=isEnv;
 if($('photo-focus-3d'))$('photo-focus-3d').hidden=isEnv||!renderer;
 if($('photo-catalog')){$('photo-catalog').href=catalogUrl(w);$('photo-catalog').hidden=isEnv;}
 if($('photo-series')){
  const hasSer=!isEnv&&!!w.series;
  $('photo-series').hidden=!hasSer;
  if(hasSer){$('photo-series').href=seriesWebUrl(w);$('photo-series').textContent=`Ver serie «${w.series}» en la web ↗`;}
 }
 if(!isEnv)updateWorkNavCounters(w);
 renderAngles($('photo-angles'),w,i=>{
  resetPhotoZoom();
  swapImgSmooth($('photo-image'),w.views[i].src,w.title);
  renderAngles($('photo-angles'),w);
  renderAngles($('inspect-angles'),w);
  renderAngles($('nearby-angles'),w);
  if($('inspect-thumb')&&selected===w)swapImgSmooth($('inspect-thumb'),w.views[i].src,w.title);
  if($('nearby-image')&&state.nearbyWork===w)swapImgSmooth($('nearby-image'),w.views[i].src,w.title);
 });
 $('photo-caption').textContent=w.kind==='mobile'||w.kind==='sculpture'?'Fotografía original de estudio del archivo de Enric Segarra.':w.kind==='environment'?'Fotografía de referencia del archivo. El espacio virtual interpreta este entorno; su distribución no es una reproducción topográfica.':'Fotografía del archivo, en su versión de estudio.';
 if(!$('photo').open)openDialog('photo');
}
function stepPhotoWork(delta=1){
 const works=getRoomNavigableWorks();
 if(!works.length)return;
 let idx=photoCurrentWork?works.findIndex(w=>w.id===photoCurrentWork.id||w.code===photoCurrentWork.code):currentWorkIdx;
 if(idx<0)idx=0;
 const nextW=works[(idx+delta+works.length)%works.length];
 if(nextW)showPhoto(nextW);
}
if($('photo-prev-work'))$('photo-prev-work').onclick=()=>stepPhotoWork(-1);
if($('photo-next-work'))$('photo-next-work').onclick=()=>stepPhotoWork(1);
if($('photo-focus-3d'))$('photo-focus-3d').onclick=()=>{
 const targetW=photoCurrentWork;
 closeDialog($('photo'));
 if(targetW&&world){
  const wObj=world.works.find(w=>w.id===targetW.id||w.code===targetW.code)||targetW;
  focusAndInspectWork(wObj);
 }
};
function hideNearby(){state.nearbyWork=null;$('nearby-work').hidden=true;document.body.classList.remove('nearby-active');}
function updateNearby(dt){
 state.proximityClock+=dt;
 if(state.proximityClock<.10)return;
 state.proximityClock=0;
 if(activeSpace==='mobiles')updateMobileGameUI();
 if(!entered||selected||cinematicActive||guideStageActive||hasDialog()||(innerWidth<=700&&$('entry-companion-card')&&!$('entry-companion-card').hidden)){hideNearby();return;}
 const playerMode=isPlayerMode();
 const p=playerMode&&state.player?state.player:camera.position;
 const lookX=-Math.sin(state.yaw),lookZ=-Math.cos(state.yaw);
 let nearest=null,bestScore=Infinity;
 for(const work of world.works){
  if(!work?.center||work.kind==='environment')continue;
  const isStay=state.nearbyWork?.id===work.id;
  const dx=p.x-work.center.x,dz=p.z-work.center.z;
  const horizDist=Math.hypot(dx,dz);
  if(horizDist<3.4&&work.kind==='mobile'&&!work.awakened){
   work.awakened=true;work.spin=Math.max(work.spin,1.05);updateMobileGameUI();playMobileMaterialChime(work,0.85);
  }
  const gazeCos=horizDist>0.05?((-dx)*lookX+(-dz)*lookZ)/horizDist:1;
  if(work.isWallWork&&work.normalXZ){
   const [nx,nz]=work.normalXZ;
   const frontDist=dx*nx+dz*nz;
   const latDist=Math.abs(-dx*nz+dz*nx);
   const halfSpan=(work.width||0.9)*0.5;
   if(frontDist<=0.12||frontDist>=(isStay?4.25:3.65))continue;
   if(latDist>halfSpan+(isStay?1.25:0.92))continue;
   if(!playerMode&&gazeCos<(isStay?-0.12:0.14))continue;
   const score=Math.hypot(frontDist*0.82,Math.max(0,latDist-halfSpan*0.35)*1.35)-gazeCos*0.50-(isStay?0.22:0);
   if(score<bestScore){nearest=work;bestScore=score;}
  }else{
   const limit=work.kind==='character'?(isStay?3.1:2.6):work.kind==='sculpture'?(isStay?4.35:3.80):(isStay?5.5:4.90);
   if(horizDist>=limit)continue;
   if(!playerMode&&horizDist>1.35&&gazeCos<(isStay?-0.25:0.05))continue;
   const score=horizDist*(work.kind==='mobile'?0.92:0.88)-gazeCos*0.55-(isStay?0.22:0);
   if(score<bestScore){nearest=work;bestScore=score;}
  }
 }
 if(!nearest){state.dismissedNearbyId=null;hideNearby();return;}
 if(state.dismissedNearbyId&&state.dismissedNearbyId!==nearest.id)state.dismissedNearbyId=null;
 if(state.dismissedNearbyId===nearest.id){hideNearby();return;}
 const idx=nearest.viewIndex||0,src=nearest.views?.[idx]?.src||nearest.image;
 if(state.nearbyWork?.id!==nearest.id||state.nearbyWorkView!==idx){
  state.nearbyWork=nearest;
  state.nearbyWorkView=idx;
  updateWorkNavCounters(nearest);
  notifyParentState();
  const isChar=nearest.kind==='character';
  if($('nearby-photo-card'))$('nearby-photo-card').hidden=isChar||!src;
  if(!isChar&&src&&$('nearby-image')){
   swapImgSmooth($('nearby-image'),src,`Fotografía original de ${nearest.title}`);
  }
  if($('nearby-code'))$('nearby-code').textContent=isChar?nearest.code:`${kindLabel(nearest.kind)} · ${nearest.code}`;
  if($('nearby-series')){
   const hasSer=!isChar&&!!nearest.series;
   $('nearby-series').hidden=!hasSer;
   $('nearby-series').textContent=hasSer?nearest.series:'';
  }
  if($('nearby-title'))$('nearby-title').textContent=nearest.title;
  if($('nearby-description'))$('nearby-description').textContent=nearest.description||'';
  if($('nearby-open'))$('nearby-open').hidden=isChar;
  if($('nearby-catalog')){$('nearby-catalog').hidden=isChar;$('nearby-catalog').href=catalogUrl(nearest);}
  if($('nearby-scmode')){
   const canSwitch=hasPresentationModes(nearest);
   $('nearby-scmode').hidden=!canSwitch;
   if(canSwitch){
    const curMode=getSculpturePresentation?getSculpturePresentation():'ai3d';
    $('nearby-scmode').querySelectorAll('[data-scmode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scmode===curMode)));
   }
  }
  if($('nearby-explore'))$('nearby-explore').textContent=isChar?'Acercarse':isFlatArt(nearest)?'Inspeccionar':nearest.isWallRelief?'Inspeccionar relieve':'Inspeccionar 360°';
  renderAngles($('nearby-angles'),nearest,i=>{
   if($('nearby-image'))swapImgSmooth($('nearby-image'),nearest.views[i].src,`Fotografía original de ${nearest.title}`);
   state.nearbyWorkView=i;
   renderAngles($('nearby-angles'),nearest);
  });
 }
 if(isEmbeddedView){
  $('nearby-work').hidden=true;
  document.body.classList.remove('nearby-active');
  return;
 }
 $('nearby-work').hidden=false;
 document.body.classList.add('nearby-active');
}
if($('nearby-thumb-wrap'))$('nearby-thumb-wrap').onclick=()=>state.nearbyWork&&showPhoto(state.nearbyWork);
if($('nearby-open'))$('nearby-open').onclick=()=>state.nearbyWork&&showPhoto(state.nearbyWork);
if($('nearby-explore'))$('nearby-explore').onclick=()=>state.nearbyWork&&focusAndInspectWork(state.nearbyWork);
if($('nearby-card-tap'))$('nearby-card-tap').onclick=()=>state.nearbyWork&&focusAndInspectWork(state.nearbyWork);
if($('nearby-prev'))$('nearby-prev').onclick=()=>{state.dismissedNearbyId=null;stepWorkInRoom(-1,{inspect:false});};
if($('nearby-next'))$('nearby-next').onclick=()=>{state.dismissedNearbyId=null;stepWorkInRoom(1,{inspect:false});};
if($('nearby-close'))$('nearby-close').onclick=()=>{if(state.nearbyWork)state.dismissedNearbyId=state.nearbyWork.id;hideNearby();announce('Tarjeta de obra cercana ocultada.');};
function announce(message){if($('status'))$('status').textContent=message;}
function hideWalkHint(){clearTimeout(walkHintTimer);if($('walk-hint'))$('walk-hint').hidden=true;}
function enter(){
 entered=true;
 if($('intro'))$('intro').hidden=true;
 if($('quick-env-wrap'))$('quick-env-wrap').hidden=false;
 document.body.classList.add('entered');
 if($('movement'))$('movement').hidden=false;
 if($('walk-hint')){
  $('walk-hint').hidden=false;
  clearTimeout(walkHintTimer);
  walkHintTimer=setTimeout(hideWalkHint,4600);
 }
 $('viewport')?.focus({preventScroll:true});
 if($('companion-panel'))$('companion-panel').hidden=visitMode!=='guided';
 if($('mobile-game-panel'))$('mobile-game-panel').hidden=activeSpace!=='mobiles';
 if($('mobiles-quick-bar'))$('mobiles-quick-bar').hidden=activeSpace!=='mobiles';
 updateMobileGameUI();
}
if($('enter'))$('enter').onclick=()=>{commitGuideStageMode(guideStageMode||visitMode||'mute');};
if($('stage-confirm-btn'))$('stage-confirm-btn').onclick=()=>commitGuideStageMode(guideStageMode||'avatar');
if($('entry-card-close'))$('entry-card-close').onclick=()=>dismissEntryCompanionCard(true);
if($('stage-reel-pause'))$('stage-reel-pause').onclick=()=>setGuideStageReel(!guideStageReelPlaying);
if($('intro-stage-reel-btn'))$('intro-stage-reel-btn').onclick=()=>setGuideStageReel(!guideStageReelPlaying);
if($('open-guide-stage-btn'))$('open-guide-stage-btn').onclick=()=>openGuideStage(visitMode==='mute'?'avatar':visitMode);
document.querySelectorAll('[data-entry-visit]').forEach(btn=>{
 const mode=btn.dataset.entryVisit||'mute';
 btn.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&!entered){setGuideStageReel(false);previewGuideStageMode(mode,false);}});
 btn.addEventListener('focus',()=>{if(!entered){setGuideStageReel(false);previewGuideStageMode(mode,false);}});
 btn.onclick=()=>{
  const now=performance.now();
  setGuideStageReel(false);
  if(!entered){
   if(lastStageClickMode===mode&&(now-lastStageClickAt)>280){
    commitGuideStageMode(mode);
    return;
   }
   lastStageClickMode=mode;lastStageClickAt=now;
   previewGuideStageMode(mode,false);
   return;
  }
  commitGuideStageMode(mode);
 };
});
document.querySelectorAll('[data-stage-visit]').forEach(btn=>{
 const mode=btn.dataset.stageVisit||'avatar';
 btn.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&guideStageActive){setGuideStageReel(false);previewGuideStageMode(mode,false);}});
 btn.addEventListener('focus',()=>{if(guideStageActive){setGuideStageReel(false);previewGuideStageMode(mode,false);}});
 btn.onclick=()=>{
  const now=performance.now();
  setGuideStageReel(false);
  if(guideStageMode===mode&&lastStageClickMode===mode&&(now-lastStageClickAt)>280){
   commitGuideStageMode(mode);
   return;
  }
  lastStageClickMode=mode;lastStageClickAt=now;
  previewGuideStageMode(mode,false);
 };
});
if($('quick-visit-btn'))$('quick-visit-btn').onclick=e=>{
 e.stopPropagation();
 const menu=$('quick-visit-menu');if(!menu)return;
 const open=menu.hidden;
 menu.hidden=!open;
 $('quick-visit-btn').setAttribute('aria-expanded',String(open));
};
document.querySelectorAll('[data-quick-visit]').forEach(btn=>{
 btn.onclick=()=>{
  const mode=btn.dataset.quickVisit||'mute';
  try{sessionStorage.setItem('es3d_visit_chosen',mode);}catch{}
  closeQuickVisitMenu();
  dismissEntryCompanionCard(false);
  setVisitMode(mode);
 };
});
document.addEventListener('click',e=>{
 if($('quick-visit-menu')&&!$('quick-visit-menu').hidden&&!e.target.closest?.('#quick-env-wrap'))closeQuickVisitMenu();
});
if($('intro-animatica'))$('intro-animatica').onclick=()=>toggleCinematicMode(true,'works');
if($('tourbar-animatica'))$('tourbar-animatica').onclick=()=>toggleCinematicMode(true,'works');
function stopTour(){
 touring=false;tourTimer=0;
 if(cinematicActive){
  const rf=getBaseRoomFov();
  cinematicActive=false;cinematicPaused=false;if($('cinematic-progress-fill'))$('cinematic-progress-fill').style.width='0%';if($('cin-pause')){$('cin-pause').setAttribute('aria-pressed','false');$('cin-pause').textContent='Ⅱ Pausar';}if(camera&&Math.abs(camera.fov-rf)>0.1){camera.fov=rf;camera.updateProjectionMatrix();}
  document.body.classList.remove('cinematic-active');
  if($('cinematic-hud'))$('cinematic-hud').hidden=true;
  if($('cinematic-btn'))$('cinematic-btn').setAttribute('aria-pressed','false');
  if($('cinematic-label'))$('cinematic-label').textContent='Paseo automático';
  notifyParentState();
 }
 if($('tour-toggle'))$('tour-toggle').setAttribute('aria-pressed','false');
 if($('tour-label'))$('tour-label').textContent='Paseo';
 if($('play-symbol'))$('play-symbol').textContent='▷';
 updateMobileGameUI();
}
function updateMotion(){if(!$('motion'))return;$('motion').setAttribute('aria-pressed',String(moving));$('motion').setAttribute('aria-label',moving?'Pausar movimiento de las obras':'Activar movimiento de las obras');if($('motion').firstChild)$('motion').firstChild.textContent=moving?'Ⅱ ':'▷ ';}
updateMotion();if($('motion'))$('motion').onclick=()=>{moving=!moving;updateMotion();announce(moving?'Movimiento de las obras activado':'Movimiento de las obras pausado');};
reduced.addEventListener?.('change',e=>{if(e.matches){moving=false;updateMotion();stopTour();}});
function syncFullscreenUI(){
 const nativeFs=Boolean(document.fullscreenElement||document.webkitFullscreenElement);
 const imm=document.body.classList.contains('immersive-ui');
 const active=nativeFs||imm;
 if($('quick-fullscreen-btn'))$('quick-fullscreen-btn').setAttribute('aria-pressed',String(active));
 if($('quick-fs-label'))$('quick-fs-label').textContent=active?'Salir':'Amplia';
 if($('fullscreen'))$('fullscreen').textContent=active?'Salir de pantalla completa':'Pantalla completa';
 if($('exit-immersive-btn'))$('exit-immersive-btn').hidden=!imm;
 resize();
}
async function toggleFullscreenOrImmersive(forceExit=false){
 closeDialog($('options'));
 const nativeFs=document.fullscreenElement||document.webkitFullscreenElement;
 const imm=document.body.classList.contains('immersive-ui');
 if(forceExit||nativeFs||imm){
  if(imm)document.body.classList.remove('immersive-ui');
  if(nativeFs){
   try{
    if(document.exitFullscreen)await document.exitFullscreen();
    else if(document.webkitExitFullscreen)document.webkitExitFullscreen();
   }catch{}
  }
  syncFullscreenUI();
  announce('Vista estándar restaurada.');
  return;
 }
 const root=document.documentElement;
 const req=root.requestFullscreen||root.webkitRequestFullscreen;
 if(req){
  try{
   await req.call(root);
   syncFullscreenUI();
   announce('Pantalla completa activada.');
   return;
  }catch{}
 }
 document.body.classList.add('immersive-ui');
 syncFullscreenUI();
 announce('Vista inmersiva a pantalla completa activada.');
}
document.addEventListener('fullscreenchange',syncFullscreenUI);
document.addEventListener('webkitfullscreenchange',syncFullscreenUI);
if($('fullscreen'))$('fullscreen').onclick=()=>toggleFullscreenOrImmersive(false);
if($('quick-fullscreen-btn'))$('quick-fullscreen-btn').onclick=()=>toggleFullscreenOrImmersive(false);
if($('exit-immersive-btn'))$('exit-immersive-btn').onclick=()=>toggleFullscreenOrImmersive(true);
if($('map-toggle'))$('map-toggle').onclick=()=>{if($('minimap'))$('minimap').hidden=true;if($('minimap-open-btn'))$('minimap-open-btn').setAttribute('aria-pressed','false');};
if($('minimap-open-btn'))$('minimap-open-btn').onclick=()=>{const mm=$('minimap');if(!mm)return;const show=mm.hidden;mm.hidden=!show;$('minimap-open-btn').setAttribute('aria-pressed',String(show));closeDialog($('options'));};
function anglesFor(position,target){const d=target.clone().sub(position);return{yaw:Math.atan2(-d.x,-d.z),pitch:Math.atan2(d.y,Math.hypot(d.x,d.z))};}
function lookCamera(dt=0){
 if(isPlayerMode()&&!selected){
  const p=state.player,blend=dt?1-Math.exp(-9*dt):1,baseY=world.heightAt?world.heightAt(p.x,p.z):0,elevOff=state.camElev||0;
  state.cameraYaw=(state.cameraYaw??state.yaw)+shortest(state.cameraYaw??state.yaw,state.yaw)*blend;
  const yaw=state.cameraYaw,distance=Math.max(.85,avatarCameraRoom(p,yaw)),openness=THREE.MathUtils.clamp((distance-.85)/3,0,1);
  const shoulder=(visitMode==='floki'?0.10:0.34)*(1-openness*0.42);
  const rightX=Math.cos(yaw),rightZ=-Math.sin(yaw);
  const height=baseY+elevOff+THREE.MathUtils.lerp(visitMode==='floki'?1.65:2.16,3.12,openness),aim=baseY+elevOff+THREE.MathUtils.lerp(visitMode==='floki'?.68:1.24,1.34,openness),ahead=0.35+openness*0.85;
  const desired=new THREE.Vector3(p.x+Math.sin(yaw)*distance+rightX*shoulder,height-state.pitch*openness*2,p.z+Math.cos(yaw)*distance+rightZ*shoulder);
  const target=new THREE.Vector3(p.x-Math.sin(yaw)*ahead+rightX*(shoulder*0.55),aim+state.pitch*(0.85+openness*0.95),p.z-Math.cos(yaw)*ahead+rightZ*(shoulder*0.55));
  camera.position.lerp(desired,blend);const b=world.bounds;
  camera.position.x=THREE.MathUtils.clamp(camera.position.x,b.minX+.12,b.maxX-.12);
  camera.position.z=THREE.MathUtils.clamp(camera.position.z,b.minZ+.12,b.maxZ-.12);
  state.cameraLook??=target.clone();state.cameraLook.lerp(target,blend);camera.lookAt(state.cameraLook);return;
 }
 camera.rotation.order='YXZ';camera.rotation.set(state.pitch,state.yaw,state.roll||0);
}
function applyAngles(position,target){const a=anglesFor(position,target);state.yaw=a.yaw;state.pitch=a.pitch;lookCamera();}
function mapPoint(x,z){const b=world.bounds;return[15+(x-b.minX)/(b.maxX-b.minX)*140,10+(z-b.minZ)/(b.maxZ-b.minZ)*140];}
function updateMap(){if(!world)return;const p=isPlayerMode()&&state.player?state.player:camera.position;const[x,y]=mapPoint(p.x,p.z);$('map-user').setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(-state.yaw*180/Math.PI).toFixed(1)})`);}
function drawMap(){const ns='http://www.w3.org/2000/svg';$('map-dots').replaceChildren();const svg=$('map-boundary')?.ownerSVGElement;let decor=svg?.querySelector('#map-decor');if(svg&&!decor){decor=document.createElementNS(ns,'g');decor.id='map-decor';svg.insertBefore(decor,$('map-path'));}if(decor)decor.replaceChildren();if($('map-boundary')){if(world.boundaryPolygon?.length){const pts=world.boundaryPolygon.map(([px,pz],i)=>{const[sx,sy]=mapPoint(px,pz);return`${i?'L':'M'}${sx.toFixed(1)},${sy.toFixed(1)}`;}).join('')+'Z';$('map-boundary').setAttribute('d',pts);}else{$('map-boundary').setAttribute('d','M15 10H155V150H15Z');}}if(decor&&world.mapFeatures){const mf=world.mapFeatures,b=world.bounds;if(mf.senderos){mf.senderos.forEach(pathPts=>{const d=pathPts.map(([px,pz],i)=>{const[sx,sy]=mapPoint(px,pz);return`${i?'L':'M'}${sx.toFixed(1)},${sy.toFixed(1)}`;}).join('');const p=document.createElementNS(ns,'path');p.setAttribute('d',d);p.setAttribute('fill','none');p.setAttribute('stroke','#cbb994');p.setAttribute('stroke-width','2.2');p.setAttribute('stroke-linecap','round');p.setAttribute('stroke-linejoin','round');p.setAttribute('opacity','0.7');decor.append(p);});}if(mf.bancalCentral){const d=mf.bancalCentral.map(([px,pz],i)=>{const[sx,sy]=mapPoint(px,pz);return`${i?'L':'M'}${sx.toFixed(1)},${sy.toFixed(1)}`;}).join('');const p=document.createElementNS(ns,'path');p.setAttribute('d',d);p.setAttribute('fill','none');p.setAttribute('stroke','#9c927e');p.setAttribute('stroke-width','1.6');decor.append(p);}if(mf.acequiaNorte){const d=mf.acequiaNorte.map(([px,pz],i)=>{const[sx,sy]=mapPoint(px,pz);return`${i?'L':'M'}${sx.toFixed(1)},${sy.toFixed(1)}`;}).join('');const p=document.createElementNS(ns,'path');p.setAttribute('d',d);p.setAttribute('fill','none');p.setAttribute('stroke','#5f9ea8');p.setAttribute('stroke-width','1.8');p.setAttribute('opacity','0.85');decor.append(p);}if(mf.caseta){const[cx,cz,cw,cl,rot]=mf.caseta,[sx,sy]=mapPoint(cx,cz),sw=cw/(b.maxX-b.minX)*140,sh=cl/(b.maxZ-b.minZ)*140,r=document.createElementNS(ns,'rect');r.setAttribute('x',(-sw/2).toFixed(1));r.setAttribute('y',(-sh/2).toFixed(1));r.setAttribute('width',sw.toFixed(1));r.setAttribute('height',sh.toFixed(1));r.setAttribute('rx','1.5');r.setAttribute('fill','#9c6b42');r.setAttribute('stroke','#593a22');r.setAttribute('stroke-width','0.9');r.setAttribute('transform',`translate(${sx.toFixed(1)} ${sy.toFixed(1)}) rotate(${(-rot).toFixed(1)})`);decor.append(r);}if(mf.trees){mf.trees.forEach(([tx,tz,tr,kind])=>{const[sx,sy]=mapPoint(tx,tz),sr=Math.max(2.2,tr/(b.maxX-b.minX)*140),c=document.createElementNS(ns,'circle');c.setAttribute('cx',sx.toFixed(1));c.setAttribute('cy',sy.toFixed(1));c.setAttribute('r',sr.toFixed(1));c.setAttribute('fill',kind==='reeds'?'#c84232':kind==='algarrobo'?'#3f632c':kind==='pine'?'#4d7338':'#728861');c.setAttribute('stroke',kind==='algarrobo'?'#28421b':'none');c.setAttribute('stroke-width','0.6');c.setAttribute('opacity',kind==='reeds'?'0.82':kind==='algarrobo'?'0.65':'0.48');decor.append(c);});}}const route=[];world.stops.forEach((s,i)=>{const[x,y]=mapPoint(s.pos[0],s.pos[2]);route.push(`${i?'L':'M'}${x},${y}`);const g=document.createElementNS(ns,'g');g.setAttribute('transform',`translate(${x} ${y})`);g.setAttribute('role','button');g.setAttribute('tabindex','0');g.setAttribute('aria-label',`Ir a ${s.title}`);g.dataset.index=i;const c=document.createElementNS(ns,'circle');c.setAttribute('r','8.5');const text=document.createElementNS(ns,'text');text.setAttribute('text-anchor','middle');text.setAttribute('y','3');text.textContent=i+1;g.append(c,text);g.onclick=()=>{stopTour();goStop(i);};g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();stopTour();goStop(i);}};$('map-dots').append(g);});$('map-path').setAttribute('d',route.join(''));updateStopUI();}
function updateStopUI(){
 if(!world)return;
 if(tourStepMode==='works'){
  updateWorkNavCounters();
 }else{
  const s=world.stops[currentStop];
  if(s){
   $('stop-number').textContent=`PARADA ${String(currentStop+1).padStart(2,'0')} / ${String(world.stops.length).padStart(2,'0')}`;
   $('stop-title').textContent=s.title;
  }
 }
 [...$('map-dots').children].forEach((g,i)=>g.classList.toggle('active',i===currentStop));
}
function validPosition(p){const b=world.bounds;p.x=Math.max(b.minX,Math.min(b.maxX,p.x));p.z=Math.max(b.minZ,Math.min(b.maxZ,p.z));for(const o of world.colliders){const dx=p.x-o.x,dz=p.z-o.z,d=Math.hypot(dx,dz),r=o.r+.3;if(d<r){p.x=o.x+(d?dx/d:1)*r;p.z=o.z+(d?dz/d:0)*r;}}p.x=Math.max(b.minX,Math.min(b.maxX,p.x));p.z=Math.max(b.minZ,Math.min(b.maxZ,p.z));return p;}
function avatarCameraRoom(p,yaw=state.yaw){const b=world.bounds,dx=Math.sin(yaw),dz=Math.cos(yaw);let room=visitMode==='floki'?4.8:5.2;if(Math.abs(dx)>.001)room=Math.min(room,((dx>0?b.maxX-.25:b.minX+.25)-p.x)/dx);if(Math.abs(dz)>.001)room=Math.min(room,((dz>0?b.maxZ-.25:b.minZ+.25)-p.z)/dz);return Math.max(0,room);}
function placeAvatar(){if(!state.player)return;const shortage=Math.max(0,4.5-avatarCameraRoom(state.player));if(shortage){state.player.x-=Math.sin(state.yaw)*shortage;state.player.z-=Math.cos(state.yaw)*shortage;validPosition(state.player);}state.cameraYaw=state.yaw;state.cameraLook=null;lookCamera();}
function avatarDogTarget(){const p=state.player,t=validPosition(new THREE.Vector3(p.x+Math.cos(state.yaw)*.95-Math.sin(state.yaw)*.35,0,p.z-Math.sin(state.yaw)*.95-Math.cos(state.yaw)*.35));if(world.heightAt)t.y=world.heightAt(t.x,t.z);return t;}
function currentLookPoint(dist=3.2){
 const cp=Math.cos(state.pitch),sp=Math.sin(state.pitch);
 return new THREE.Vector3(
  camera.position.x-Math.sin(state.yaw)*cp*dist,
  camera.position.y+sp*dist,
  camera.position.z-Math.cos(state.yaw)*cp*dist
 );
}
function computeSafeMidpoint(from,to,arcFactor=0.12,liftFactor=0.055,maxLift=0.68){
 const dist=from.distanceTo(to);
 const mid=from.clone().lerp(to,0.5);
 const dx=to.x-from.x,dz=to.z-from.z;
 mid.x+=(-dz)*arcFactor;
 mid.z+=(dx)*arcFactor;
 mid.y+=Math.min(maxLift,dist*liftFactor);
 if(world?.bounds){
  const b=world.bounds;
  mid.x=THREE.MathUtils.clamp(mid.x,b.minX+0.25,b.maxX-0.25);
  mid.z=THREE.MathUtils.clamp(mid.z,b.minZ+0.25,b.maxZ-0.25);
 }
 if(world?.colliders){
  for(const o of world.colliders){
   const cdx=mid.x-o.x,cdz=mid.z-o.z,cd=Math.hypot(cdx,cdz),cr=o.r+0.68;
   if(cd<cr){
    mid.x=o.x+(cd>0.001?cdx/cd:1)*cr;
    mid.z=o.z+(cd>0.001?cdz/cd:0)*cr;
   }
  }
 }
 return mid;
}
function buildSmoothTransition(to,toLook,opts={}){
 const from=camera.position.clone();
 const dist=from.distanceTo(to);
 const lookDist=Math.max(1.8,from.distanceTo(toLook));
 const fromLook=currentLookPoint(lookDist);
 const angles=anglesFor(to,toLook);
 const toYaw=angles.yaw;
 const toPitch=opts.pitchOverride!==undefined&&opts.pitchOverride!==null?opts.pitchOverride:angles.pitch;
 const mid=opts.linear?null:computeSafeMidpoint(from,to,opts.arcFactor??0.12,opts.liftFactor??0.055,opts.maxLift??0.68);
 return {
  from,
  mid,
  to:to.clone(),
  fromLook,
  toLook:toLook.clone(),
  lookTarget:toLook.clone(),
  fromYaw:state.yaw,
  toYaw,
  fromPitch:state.pitch,
  toPitch,
  fromFov:camera.fov,
  toFov:opts.toFov||getBaseRoomFov(),
  cinematicHandoff:Boolean(opts.cinematicHandoff),
  elapsed:0,
  duration:opts.duration||Math.min(1.85,Math.max(0.75,dist/5.4))
 };
}
function goStop(index,instant=false){if(!renderer)return;leaveInspection(false);enter();state.userZoomFov=null;currentStop=(index+world.stops.length)%world.stops.length;const s=world.stops[currentStop];if(!isPlayerMode())positionCompanions(world,currentStop,instant||reduced.matches);companionMessage();let to=new THREE.Vector3(...s.pos),gy=world.heightAt?world.heightAt(to.x,to.z):0,look=visitMode==='guided'?world.companions.targets[0].clone().lerp(world.companions.targets[1],.45).add(new THREE.Vector3(0,1,0)):new THREE.Vector3(...s.look),targetFov=getBaseRoomFov();if(cinematicActive&&!isPlayerMode()){const pose0=getCinematicPoseAt(0,getCurrentCinematicWork(),s,currentStop);if(pose0){to=pose0.pos;look=pose0.look;targetFov=pose0.fov;}}const angles=anglesFor(to,look);if(isPlayerMode()){state.player.set(to.x,gy,to.z);state.yaw=angles.yaw;state.avatarHeading=angles.yaw+Math.PI;state.pitch=0;state.transition=null;placeAvatar();if(visitMode==='floki')world.companions.dog.position.copy(state.player);else if(visitMode==='enric')world.companions.father.position.copy(state.player);else{world.companions.father.position.copy(state.player);world.companions.dog.position.copy(avatarDogTarget());}}else if(instant||reduced.matches){camera.position.copy(to);state.yaw=angles.yaw;state.pitch=angles.pitch;state.transition=null;lookCamera();}else{
 const dist=camera.position.distanceTo(to);
 const dur=cinematicActive?Math.min(3.4,Math.max(1.65,dist/3.4)):visitMode==='guided'?Math.max(2.2,dist/1.85):Math.min(2.2,Math.max(1.0,dist/4.2));
 state.transition=buildSmoothTransition(to,look,{duration:dur,toFov:targetFov,cinematicHandoff:cinematicActive,arcFactor:0.13,liftFactor:0.06,maxLift:0.75});
}updateStopUI();updateMobileGameUI();notifyParentState();announce(`Parada ${currentStop+1}: ${s.title}`);}
if($('prev-stop'))$('prev-stop').onclick=()=>{stopTour();if(tourStepMode==='works')stepWorkInRoom(-1,{inspect:Boolean(selected)});else goStop(currentStop-1);};
if($('next-stop'))$('next-stop').onclick=()=>{stopTour();if(tourStepMode==='works')stepWorkInRoom(1,{inspect:Boolean(selected)});else goStop(currentStop+1);};
if($('stop-inspect-btn'))$('stop-inspect-btn').onclick=()=>{
 if(!world||!renderer)return;
 if(tourStepMode==='works'){
  const works=getRoomNavigableWorks();
  const w=works[(currentWorkIdx+works.length)%Math.max(1,works.length)];
  if(w)focusAndInspectWork(w);
 }else{
  const s=world.stops[currentStop];
  if(s?.work){const w=world.works.find(x=>x.id===s.work);if(w)focusAndInspectWork(w);}
 }
};
if($('tour-step-mode')){
 $('tour-step-mode').onclick=()=>{
  tourStepMode=tourStepMode==='stops'?'works':'stops';
  $('tour-step-mode').dataset.mode=tourStepMode;
  $('tour-step-mode').textContent=tourStepMode==='works'?'Paso: Obra a obra':'Paso: Paradas de sala';
  updateStopUI();
  announce(tourStepMode==='works'?'Flechas inferiores en modo Obra a obra.':'Flechas inferiores en modo Paradas de sala.');
 };
}
if($('tour-toggle'))$('tour-toggle').onclick=()=>{
 if(!renderer)return;
 if(touring||cinematicActive){stopTour();return;}
 if(visitMode==='guided'){startTour();return;}
 toggleCinematicMode(true,'works');
};
function startTour(){leaveInspection();enter();touring=true;tourTimer=0;if($('tour-toggle'))$('tour-toggle').setAttribute('aria-pressed','true');if($('tour-label'))$('tour-label').textContent='Pausar';if($('play-symbol'))$('play-symbol').textContent='Ⅱ';companionMessage();announce(`Enric y Floki te acompañan: ${world.stops[currentStop].title}.`);}
function getInspectLayoutKind(width=innerWidth,height=innerHeight){
 if(height<=540&&width>height)return 'landscape-side';
 if(width<=700||(width<=960&&height>=width))return 'bottom-sheet';
 return 'side-panel';
}
function getIdealOrbitRadius(w){
 if(!w)return 2.4;
 const vp=$('viewport');
 const width=Math.max(1,vp?.clientWidth||innerWidth),height=Math.max(1,vp?.clientHeight||innerHeight);
 const layout=getInspectLayoutKind(width,height);
 const collapsed=Boolean(state.inspectCollapsed);
 let freeW=width,freeH=height;
 if(layout==='landscape-side'){
  if(!collapsed)freeW=Math.max(160,width-Math.min(316,width*0.45));
 }else if(layout==='bottom-sheet'){
  freeH=height*(collapsed?0.86:0.54);
 }else{
  if(!collapsed)freeW=Math.max(220,width-Math.min(384,width*0.36));
 }
 const vfov=(getBaseInspectFov()*Math.PI)/180;
 const tanHalf=Math.tan(vfov*0.5);
 const tanV=Math.max(0.14,tanHalf*(freeH/height));
 const tanH=Math.max(0.11,tanHalf*(freeW/height));
 let spanW=0.9,spanH=0.9;
 const dispW=w.displayWidth||w.width;
 const dispH=w.displayHeight||w.height;
 if(isFlatArt(w)||w.isWallRelief){
  spanW=(dispW||1.05)*1.18;
  spanH=(dispH||1.05)*1.18;
 }else if(w.kind==='character'){
  spanW=1.1;spanH=w.id==='dog'?1.15:2.05;
 }else{
  const h=dispH||0.85;
  const vw=dispW||w.views?.[0]?.w||(h*0.68);
  spanW=Math.max(0.50,vw)*1.24;
  spanH=Math.max(0.50,h)*1.22;
 }
 const distV=(spanH*0.5)/tanV;
 const distH=(spanW*0.5)/tanH;
 return Math.max(w.radius||1.25,Math.min(8.8,Math.max(distV,distH)));
}
function getInspectLookCenter(w,panX=state.inspectPanX,panY=state.inspectPanY){
 const base=w.center.clone();
 if(!panX&&!panY)return base;
 const refAng=w.view?Math.atan2(w.view.x-w.center.x,w.view.z-w.center.z):state.orbitAngle;
 base.x+=Math.cos(refAng)*panX;
 base.z+=-Math.sin(refAng)*panX;
 base.y+=panY;
 return base;
}
function clampInspectPan(w){
 if(!w)return;
 const maxX=Math.max(0.10,((w.displayWidth||w.width)||(w.views?.[0]?.w)||0.95)*0.55);
 const maxY=Math.max(0.10,((w.displayHeight||w.height)||0.95)*0.55);
 state.targetInspectPanX=Math.max(-maxX,Math.min(maxX,state.targetInspectPanX));
 state.targetInspectPanY=Math.max(-maxY,Math.min(maxY,state.targetInspectPanY));
}
function setInspectionCollapsed(collapsed){
 state.inspectCollapsed=Boolean(collapsed);
 const panel=$('inspection'),btn=$('inspect-sheet-toggle'),ct=$('inspect-collapsed-title');
 if(panel)panel.classList.toggle('is-collapsed',state.inspectCollapsed);
 if(btn)btn.setAttribute('aria-expanded',String(!state.inspectCollapsed));
 if(ct){
  ct.hidden=!state.inspectCollapsed||!selected;
  if(selected)ct.textContent=`${selected.code} · ${selected.title}`;
 }
 if(selected){
  state.targetOrbitRadius=getIdealOrbitRadius(selected);
  if(reduced.matches){state.orbitRadius=state.targetOrbitRadius;orbitCamera();}
 }
 resize();
}
if($('inspect-sheet-toggle'))$('inspect-sheet-toggle').onclick=()=>setInspectionCollapsed(!state.inspectCollapsed);
{
 let sheetTouchY=null,sheetTouchX=null;
 const startSheetSwipe=e=>{
  if(e.pointerType==='mouse'||e.target.closest?.('button,a'))return;
  sheetTouchY=e.clientY;sheetTouchX=e.clientX;
 };
 const endSheetSwipe=e=>{
  if(sheetTouchY===null)return;
  const dy=e.clientY-sheetTouchY,dx=e.clientX-sheetTouchX;
  sheetTouchY=null;sheetTouchX=null;
  if(Math.abs(dy)<30||Math.abs(dy)<Math.abs(dx)*1.25)return;
  if(dy>30){
   if(!state.inspectCollapsed)setInspectionCollapsed(true);
   else leaveInspection();
  }else if(dy<-28&&state.inspectCollapsed){
   setInspectionCollapsed(false);
  }
 };
 for(const id of ['inspect-grabber','inspect-top-bar']){
  const el=$(id);
  if(el){
   el.addEventListener('pointerdown',startSheetSwipe);
   el.addEventListener('pointerup',endSheetSwipe);
   el.addEventListener('pointercancel',()=>{sheetTouchY=null;});
  }
 }
}
function getOrbitPositionForWork(w,angle,elev,radius,panX=state.inspectPanX,panY=state.inspectPanY){
 const center=getInspectLookCenter(w,panX,panY);
 const position=new THREE.Vector3(center.x+Math.sin(angle)*radius*Math.cos(elev),center.y+Math.sin(elev)*radius,center.z+Math.cos(angle)*radius*Math.cos(elev));
 validPosition(position);
 const gy=world?.heightAt?world.heightAt(position.x,position.z):0;
 position.y=Math.max(gy+.55,Math.min(activeSpace==='garden'?gy+9:activeSpace==='mobiles'?8.8:6,position.y));
 return position;
}
function inspect(w,opts={}){
 if(!w||!renderer)return;
 stopTour();
 state.walkTarget=null;
 if(world?.walkRing)world.walkRing.visible=false;
 state.keys.clear();
 state.lookVelYaw=0;state.lookVelPitch=0;
 enter();
 hideNearby();
 if(!selected){
  state.inspectReturn={position:camera.position.clone(),yaw:state.yaw,pitch:state.pitch,player:state.player?.clone()};
 }
 selected=w;
 state.inspectPanX=0;state.inspectPanY=0;state.targetInspectPanX=0;state.targetInspectPanY=0;
 state.orbitVelAngle=0;state.orbitVelElev=0;state.panVelX=0;state.panVelY=0;state.autoOrbit=false;
 if($('orbit-auto'))$('orbit-auto').setAttribute('aria-pressed','false');
 if(opts.resetCollapse!==false&&state.inspectCollapsed)setInspectionCollapsed(false);
 else if($('inspect-collapsed-title')&&state.inspectCollapsed)$('inspect-collapsed-title').textContent=`${w.code} · ${w.title}`;
 if(hasDual3D(w))w.manualView=false;
 if(w.kind==='mobile'){w.awakened=true;w.spin=Math.max(w.spin,1.15);updateMobileGameUI();playMobileMaterialChime(w,1.0);}
 else if(musicActive)triggerMusicChime(0.75);
 document.body.classList.add('inspecting');
 $('inspection').hidden=false;$('hover-label').hidden=true;if($('movement'))$('movement').hidden=true;$('walk-hint').hidden=true;
 $('inspect-code').textContent=`${kindLabel(w.kind)} · ${w.code}`;
 const hasSeries=w.kind!=='character'&&w.kind!=='environment'&&!!w.series;
 if($('inspect-series')){$('inspect-series').hidden=!hasSeries;$('inspect-series').textContent=hasSeries?w.series:'';}
 $('inspect-title').textContent=w.title;
 $('inspect-description').textContent=w.description;
 const scMode=getSculpturePresentation?getSculpturePresentation():'ai3d';
 if($('sculpture-modes')){
  const canSwitch=hasPresentationModes(w);
  $('sculpture-modes').hidden=!canSwitch;
  if(canSwitch){
   $('sculpture-modes').querySelectorAll('[data-scmode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scmode===scMode)));
   const lbl=$('sculpture-modes').querySelector('.modes-label');
   if(lbl)lbl.textContent='VERSIÓN EN SALA';
  }
 }
 if($('inspect-photo-card')){$('inspect-photo-card').hidden=w.kind==='character';if(w.kind!=='character'&&$('inspect-thumb')){$('inspect-thumb').src=w.views?.[w.viewIndex||0]?.src||w.image;$('inspect-thumb').alt=w.title;}}
 if($('inspect-catalog')){$('inspect-catalog').hidden=w.kind==='character';$('inspect-catalog').href=catalogUrl(w);}
 if($('inspect-series-link')){$('inspect-series-link').hidden=!hasSeries;if(hasSeries){$('inspect-series-link').href=seriesWebUrl(w);$('inspect-series-link').textContent=`Ver serie «${w.series}» en la web ↗`;}}
 if($('inspect-animatica'))$('inspect-animatica').hidden=w.kind==='character';
 updateWorkNavCounters(w);
 syncWebNavigationLinks();
 notifyParentState();
 renderAngles($('inspect-angles'),w,i=>{if($('inspect-thumb'))swapImgSmooth($('inspect-thumb'),w.views[i].src,w.title);renderAngles($('inspect-angles'),w);});
 const hasMultiAngleSculpture=w.kind==='sculpture'&&w.views&&w.views.length>1;
 $('impulse').hidden=isFlatArt(w)||(w.kind==='sculpture'&&!hasMultiAngleSculpture);
 if($('inspect-note')){
  $('inspect-note').hidden=false;
  $('inspect-note').textContent=hasPresentationModes(w)?(isFlatArt(w)?SCULPTURE_MODES[scMode].flatNote:SCULPTURE_MODES[scMode].note):(w.kind==='character'?'Prototipo en 3D. Gíralo para verlo desde todos los ángulos.':'Fotografía original del archivo de Enric Segarra.');
 }
 document.querySelector('.orbit-tools span').textContent=isFlatArt(w)?'DETALLE':w.isWallRelief?'RELIEVE':'GIRAR 360°';
 $('orbit-left').hidden=$('orbit-right').hidden=isFlatArt(w);
 if($('orbit-auto'))$('orbit-auto').hidden=isFlatArt(w);
 $('original').hidden=w.kind==='character';
 const standRef=w.view||camera.position;
 state.orbitAngle=clampOrbitAngleForWork(w,Math.atan2(standRef.x-w.center.x,standRef.z-w.center.z));
 state.orbitElev=w.isTreeInstallation?0.05:(w.kind==='mobile'?-.02:(w.isWallRelief?0.02:.04));
 if(w.kind==='character'){
  state.orbitAngle=w.object.rotation.y;state.orbitElev=.09;$('inspect-code').textContent=w.code;if($('inspect-note'))$('inspect-note').textContent='Prototipo en 3D. Gíralo para verlo desde todos los ángulos.';$('impulse').hidden=false;$('impulse').textContent=w.id==='father'?'Saludar a Enric':'Acariciar a Floki';const ot=document.querySelector('.orbit-tools span');if(ot)ot.textContent='360°';
 }else{
  $('impulse').textContent=hasMultiAngleSculpture?`Ángulo ${(w.viewIndex||0)+1}/${w.views.length}`:'Impulsar aire';
 }
 if(isFlatArt(w)){state.orbitAngle=Math.atan2(w.view.x-w.center.x,w.view.z-w.center.z);state.orbitElev=0;}
 state.orbitRadius=getIdealOrbitRadius(w);
 state.targetOrbitAngle=state.orbitAngle;
 state.targetOrbitElev=state.orbitElev;
 state.targetOrbitRadius=state.orbitRadius;
 resize();
 updateMobileGameUI();
 const targetPos=getOrbitPositionForWork(w,state.orbitAngle,state.orbitElev,state.orbitRadius,0,0);
 const dist=camera.position.distanceTo(targetPos);
 if(opts.smoothGlide&&!reduced.matches&&dist>0.08){
  state.transition=buildSmoothTransition(targetPos,w.center,{duration:Math.min(1.4,Math.max(0.68,dist/5.8)),toFov:getBaseInspectFov(),arcFactor:0.1,liftFactor:0.045,maxLift:0.48});
 }else{
  state.transition=null;
  orbitCamera();
 }
 announce(`Explorando ${w.title} (${w.code}). Usa las flechas o [ ] para pasar a otra obra, arrastra para explorar o pulsa Escape para volver.`);
}
function orbitCamera(){if(!selected)return;state.orbitAngle=clampOrbitAngleForWork(selected,state.orbitAngle);const center=getInspectLookCenter(selected,state.inspectPanX,state.inspectPanY);const position=getOrbitPositionForWork(selected,state.orbitAngle,state.orbitElev,state.orbitRadius,state.inspectPanX,state.inspectPanY);camera.position.copy(position);applyAngles(position,center);if(hasDual3D(selected)){updateMobiles(world,state.time,0,false,camera.position);const scMode=getSculpturePresentation?getSculpturePresentation():'ai3d';if($('inspect-note')){$('inspect-note').hidden=false;$('inspect-note').textContent=SCULPTURE_MODES[scMode].note;}const hasMulti=selected.kind==='sculpture'&&selected.views&&selected.views.length>1;$('impulse').hidden=selected.kind==='sculpture'&&!hasMulti;if(hasMulti)$('impulse').textContent=`Ángulo ${(selected.viewIndex||0)+1}/${selected.views.length}`;if($('inspect-thumb'))$('inspect-thumb').src=selected.views?.[selected.viewIndex||0]?.src||selected.image;renderAngles($('inspect-angles'),selected,i=>{if($('inspect-thumb'))swapImgSmooth($('inspect-thumb'),selected.views[i].src,selected.title);renderAngles($('inspect-angles'),selected);});}}
function leaveInspection(restore=true){if(!selected)return;if(hasDual3D(selected))selected.manualView=false;const lastW=selected;selected=null;state.transition=null;state.inspectPanX=0;state.inspectPanY=0;state.targetInspectPanX=0;state.targetInspectPanY=0;state.orbitVelAngle=0;state.orbitVelElev=0;state.panVelX=0;state.panVelY=0;state.autoOrbit=false;if($('orbit-auto'))$('orbit-auto').setAttribute('aria-pressed','false');if(state.inspectCollapsed){state.inspectCollapsed=false;$('inspection')?.classList.remove('is-collapsed');if($('inspect-sheet-toggle'))$('inspect-sheet-toggle').setAttribute('aria-expanded','true');if($('inspect-collapsed-title'))$('inspect-collapsed-title').hidden=true;}document.body.classList.remove('inspecting');$('inspection').hidden=true;if($('movement'))$('movement').hidden=!entered;hideWalkHint();resize();if(restore){const stand=getWorkStandPosition(lastW);if(state.player)state.player.set(stand.x,world?.heightAt?world.heightAt(stand.x,stand.z):0,stand.z);const dist=camera.position.distanceTo(stand);if(!reduced.matches&&!isPlayerMode()&&dist>0.08){state.transition=buildSmoothTransition(stand,lastW.center,{duration:Math.min(1.05,Math.max(0.58,dist/4.5)),toFov:getBaseRoomFov(),arcFactor:0.08,liftFactor:0.03,maxLift:0.28});}else{camera.position.copy(stand);applyAngles(camera.position,lastW.center);}}state.inspectReturn=null;updateMobileGameUI();syncWebNavigationLinks();notifyParentState();}
function focusAndInspectWork(w,opts={}){
 if(!w||!renderer||!world)return;
 enter();
 const stand=getWorkStandPosition(w);
 const gy=world.heightAt?world.heightAt(stand.x,stand.z):0;
 if(state.player)state.player.set(stand.x,gy,stand.z);
 if(opts.instant||reduced.matches){
  camera.position.copy(stand);
  applyAngles(camera.position,w.center);
  inspect(w,{smoothGlide:false});
 }else{
  inspect(w,{smoothGlide:true});
 }
}
function flyToWork(w,opts={}){
 if(!w||!renderer||!world)return;
 if(opts.inspect){
  focusAndInspectWork(w,{instant:opts.instant});
  return;
 }
 leaveInspection(false);
 enter();
 stopTour();
 state.walkTarget=null;
 if(world.walkRing)world.walkRing.visible=false;
 const stand=getWorkStandPosition(w);
 const gy=world.heightAt?world.heightAt(stand.x,stand.z):0;
 const angles=anglesFor(stand,w.center);
 if(w.kind==='mobile'){w.awakened=true;w.spin=Math.max(w.spin,1.25);updateMobileGameUI();playMobileMaterialChime(w,0.95);}
 else if(musicActive)triggerMusicChime(0.75);
 if(isPlayerMode()){
  state.player.set(stand.x,gy,stand.z);state.yaw=angles.yaw;state.avatarHeading=angles.yaw+Math.PI;state.pitch=angles.pitch;state.transition=null;placeAvatar();
  if(visitMode==='floki')world.companions.dog.position.copy(state.player);
  else if(visitMode==='enric')world.companions.father.position.copy(state.player);
  else{world.companions.father.position.copy(state.player);world.companions.dog.position.copy(avatarDogTarget());}
 }else if(opts.instant||reduced.matches){
  camera.position.copy(stand);state.yaw=angles.yaw;state.pitch=angles.pitch;state.transition=null;lookCamera();
 }else{
  const dist=camera.position.distanceTo(stand);
  state.transition=buildSmoothTransition(stand,w.center,{duration:Math.min(1.75,Math.max(0.78,dist/5.5)),toFov:getBaseRoomFov(),arcFactor:0.13,liftFactor:0.06,maxLift:0.72});
 }
 state.nearbyWork=null;
 state.proximityClock=1;
 updateWorkNavCounters(w);
 notifyParentState();
 announce(`Frente a ${w.title} (${w.code}).`);
}
function stepWorkInRoom(delta=1,opts={}){
 const works=getRoomNavigableWorks();
 if(!works.length)return;
 const ref=selected||state.nearbyWork||works[currentWorkIdx];
 let idx=ref?works.findIndex(w=>w.id===ref.id||w.code===ref.code):currentWorkIdx;
 if(idx<0)idx=0;
 currentWorkIdx=(idx+delta+works.length)%works.length;
 const targetW=works[currentWorkIdx];
 if(!targetW)return;
 const shouldInspect=typeof opts.inspect==='boolean'?opts.inspect:Boolean(selected);
 flyToWork(targetW,{inspect:shouldInspect,instant:opts.instant});
}
if($('inspect-prev-work'))$('inspect-prev-work').onclick=()=>stepWorkInRoom(-1,{inspect:true});
if($('inspect-next-work'))$('inspect-next-work').onclick=()=>stepWorkInRoom(1,{inspect:true});
if($('prev-work-tb'))$('prev-work-tb').onclick=()=>stepWorkInRoom(-1,{inspect:Boolean(selected)});
if($('next-work-tb'))$('next-work-tb').onclick=()=>stepWorkInRoom(1,{inspect:Boolean(selected)});
if($('inspect-animatica'))$('inspect-animatica').onclick=()=>{
 const startW=selected;
 if(startW){
  const works=getRoomNavigableWorks();
  const idx=works.findIndex(w=>w.id===startW.id||w.code===startW.code);
  if(idx>=0)currentWorkIdx=idx;
 }
 toggleCinematicMode(true,'works');
};
$('inspect-close').onclick=()=>leaveInspection();$('original').onclick=()=>selected&&showPhoto(selected);if($('inspect-thumb-box'))$('inspect-thumb-box').onclick=()=>selected&&showPhoto(selected);
$('impulse').onclick=()=>{if(selected?.kind==='character'){act(selected.object,selected.id==='father'?'wave':'pet');moving=true;updateMotion();announce(selected.id==='father'?'Enric te saluda.':'El perro mueve la cola.');return;}if(selected?.kind==='sculpture'&&selected.views&&selected.views.length>1&&selected.setView){selected.manualView=true;selected.setView((selected.viewIndex||0)+1);const i=selected.viewIndex,n=selected.views.length;if((getSculpturePresentation?.()||'ai3d')==='ai3d'){const targetAng=targetOrbitForViewIndex(selected,i,n);state.targetOrbitAngle=clampOrbitAngleForWork(selected,state.orbitAngle+shortest(state.orbitAngle,targetAng));if(reduced.matches){state.orbitAngle=state.targetOrbitAngle;orbitCamera();}}else orbitCamera();announce(`Mostrando ${selected.views[selected.viewIndex].label} de ${selected.title}.`);return;}if(selected){selected.spin=Math.min(selected.spin+1.8,3.2);selected.awakened=true;if(world)world.windImpulse=1.4;moving=true;updateMotion();updateMobileGameUI();triggerMusicChime(1.2);announce('Corriente de aire aplicada al móvil.');}};
$('orbit-left').onclick=()=>{state.autoOrbit=false;if($('orbit-auto'))$('orbit-auto').setAttribute('aria-pressed','false');if(selected?.kind==='sculpture')selected.manualView=false;state.targetOrbitAngle=clampOrbitAngleForWork(selected,state.targetOrbitAngle-Math.PI/6);if(reduced.matches){state.orbitAngle=state.targetOrbitAngle;orbitCamera();}};$('orbit-right').onclick=()=>{state.autoOrbit=false;if($('orbit-auto'))$('orbit-auto').setAttribute('aria-pressed','false');if(selected?.kind==='sculpture')selected.manualView=false;state.targetOrbitAngle=clampOrbitAngleForWork(selected,state.targetOrbitAngle+Math.PI/6);if(reduced.matches){state.orbitAngle=state.targetOrbitAngle;orbitCamera();}};
if($('orbit-auto'))$('orbit-auto').onclick=()=>{if(!selected||isFlatArt(selected))return;state.autoOrbit=!state.autoOrbit;$('orbit-auto').setAttribute('aria-pressed',String(state.autoOrbit));if(state.autoOrbit&&selected.kind==='sculpture')selected.manualView=false;announce(state.autoOrbit?'Giro continuo 360° activado.':'Giro continuo detenido.');};
function zoom(amount){if(selected){state.targetOrbitRadius=Math.max(isFlatArt(selected)?0.82:selected.kind==='character'?.65:selected.kind==='sculpture'?0.95:0.75,Math.min(9,state.targetOrbitRadius+amount));if(reduced.matches){state.orbitRadius=state.targetOrbitRadius;orbitCamera();}}}$('zoom-in').onclick=()=>zoom(-.5);$('zoom-out').onclick=()=>zoom(.5);
function resetInspectFraming(){
 if(!selected)return;
 const w=selected,standRef=w.view||camera.position;
 if(hasDual3D(w))w.manualView=false;
 state.targetOrbitAngle=w.kind==='character'?w.object.rotation.y:(isFlatArt(w)?Math.atan2(w.view.x-w.center.x,w.view.z-w.center.z):clampOrbitAngleForWork(w,Math.atan2(standRef.x-w.center.x,standRef.z-w.center.z)));
 state.targetOrbitElev=w.kind==='character'?.09:(isFlatArt(w)?0:(w.isTreeInstallation?0.05:(w.kind==='mobile'?-.02:(w.isWallRelief?0.02:.04))));
 state.targetOrbitRadius=getIdealOrbitRadius(w);
 state.targetInspectPanX=0;state.targetInspectPanY=0;
 if(reduced.matches){
  state.orbitAngle=state.targetOrbitAngle;state.orbitElev=state.targetOrbitElev;state.orbitRadius=state.targetOrbitRadius;
  state.inspectPanX=0;state.inspectPanY=0;orbitCamera();
 }
 announce('Encuadre centrado.');
}
if($('orbit-reset'))$('orbit-reset').onclick=resetInspectFraming;
function evictOldWorldsIfNeeded(keepId){
 worldLru=worldLru.filter(k=>k!==keepId);
 worldLru.push(keepId);
 const constrained=matchMedia('(pointer: coarse)').matches||(typeof navigator!=='undefined'&&navigator.deviceMemory&&navigator.deviceMemory<=4);
 const maxCached=constrained?2:7;
 while(worldLru.length>maxCached){
  const evictId=worldLru.shift();
  if(!evictId||evictId===keepId||!worlds[evictId])continue;
  const oldW=worlds[evictId];
  delete worlds[evictId];
  try{disposeWorld?.(oldW);}catch{}
 }
 renderer?.renderLists?.dispose?.();
}
async function switchSpace(id,opts={}){
 if(!['gallery','garden','paintings','drawings','organic','curvos','mobiles'].includes(id))return;
 const keepEntered=opts.preserveEntered??entered;
 stopTour();leaveInspection(false);hideNearby();activeSpace=id;state.keys.clear();state.transition=null;state.camElev=0;state.userZoomFov=null;state.lookVelYaw=0;state.lookVelPitch=0;state.dismissedNearbyId=null;currentStop=0;entered=false;
 document.body.classList.remove('entered','inspecting');
 document.body.classList.toggle('garden',id==='garden');
 document.body.classList.toggle('paintings',id==='paintings');
 document.body.classList.toggle('drawings',id==='drawings');
 document.body.classList.toggle('organic',id==='organic');
 document.body.classList.toggle('curvos',id==='curvos');
 document.body.classList.toggle('mobiles',id==='mobiles');
 if($('mobile-game-panel'))$('mobile-game-panel').hidden=true;
 if($('mobiles-quick-bar'))$('mobiles-quick-bar').hidden=true;
 if($('quick-env-wrap'))$('quick-env-wrap').hidden=true;
 closeQuickVisitMenu();
 $('intro').hidden=false;if($('movement'))$('movement').hidden=true;hideWalkHint();
 const locText=id==='gallery'?'SALA 01 · GALERÍA BLANCA':id==='garden'?'SALA 02 · JARDÍN DE LAS LAGARTIJAS':id==='paintings'?'SALA 03 · SALA DE PINTURA':id==='drawings'?'SALA 04 · SALA DE DIBUJO':id==='organic'?'SALA 05 · FORMAS ORGÁNICAS':id==='curvos'?'SALA 06 · PLANOS CURVOS':'SALA 07 · MÓVILES 3D';
 if($('intro-eyebrow'))$('intro-eyebrow').textContent=locText;
 $('scene-title').innerHTML=id==='gallery'?'La forma<br>del aire<span>.</span>':id==='garden'?'El jardín<br>que se mueve<span>.</span>':id==='paintings'?'El color y<br>el relato<span>.</span>':id==='drawings'?'El trazo y<br>el espacio<span>.</span>':id==='organic'?'La materia<br>orgánica<span>.</span>':id==='curvos'?'El pliegue<br>y el vacío<span>.</span>':'El mirador<br>del aire<span>.</span>';
 $('scene-copy').textContent=id==='gallery'?'Escultura ensamblada, relieves, pintura y móviles en la sala principal.':id==='garden'?'Recreación 3D de la parcela de Náquera con árboles, caseta y móviles al aire libre.':id==='paintings'?'76 pinturas del archivo organizadas en sus ocho series.':id==='drawings'?'53 dibujos originales de «Dibujo y espacio» y «Figuras y símbolos».':id==='organic'?'Ocho esculturas en madera y piedra de la serie «Formas orgánicas».':id==='curvos'?'Doce esculturas de hierro y piedra de «Planos curvos y volúmenes abiertos».':'Los 33 móviles suspendidos en una nave diáfana con altura libre.';
 $('enter').innerHTML='Entrar <span>↗</span>';
 if($('scene-location'))$('scene-location').textContent=locText;
 if($('scene-subtitle'))$('scene-subtitle').textContent='';
 if($('sculpture-mode-btn'))$('sculpture-mode-btn').hidden=false;
 if($('motion'))$('motion').hidden=id==='drawings'||id==='paintings'||id==='organic'||id==='curvos';
 if($('breeze-btn'))$('breeze-btn').hidden=id==='drawings'||id==='paintings'||id==='organic'||id==='curvos';
 if($('space-select'))$('space-select').value=id;
 document.querySelectorAll('[data-space]').forEach(b=>{b.classList.toggle('active',b.dataset.space===id);b.setAttribute('aria-pressed',String(b.dataset.space===id));});
 if(renderer){
  $('loading').hidden=false;await new Promise(resolve=>requestAnimationFrame(resolve));
  if(!worlds[id])worlds[id]=id==='gallery'?createGallery():id==='garden'?createGarden():id==='paintings'?createPaintingsRoom():id==='drawings'?createDrawingsRoom():id==='organic'?createOrganicRoom():id==='curvos'?createCurvedPlanesRoom():createMobilesRoom();
  world=worlds[id];
  evictOldWorldsIfNeeded(id);
  if(world.scene.environment&&!world.scene.userData.pmremApplied&&renderer){
   try{
    const srcEnv=world.scene.environment;
    if(!srcEnv.userData?.pmremTex){
     const pmrem=new THREE.PMREMGenerator(renderer);
     pmrem.compileEquirectangularShader();
     srcEnv.userData={...srcEnv.userData,pmremTex:pmrem.fromEquirectangular(srcEnv).texture};
     pmrem.dispose();
    }
    world.scene.environment=srcEnv.userData.pmremTex;
    world.scene.userData.pmremApplied=true;
   }catch{}
  }
  if(setGardenTimeOfDay)setGardenTimeOfDay(world,timeOfDayMode,true);
  if(!world.companions){
   attachCompanions(world);
   world.companions?.chars?.forEach(c=>{c.userData.persistentActor=true;});
  }
  setCompanionsVisible(world,visitMode!=='mute');
  if(visitMode==='floki')world.companions.father.visible=false;
  if(visitMode==='enric')world.companions.dog.visible=false;
  positionCompanions(world,0,true);updateCompanions(world,0,0,false);
  $('companion-panel').hidden=true;
  const s=world.stops[0],gy=world.heightAt?world.heightAt(s.pos[0],s.pos[2]):0;
  camera.position.set(...s.pos);state.player=new THREE.Vector3(s.pos[0],gy,s.pos[2]);
  applyAngles(camera.position,new THREE.Vector3(...s.look));
  if(isPlayerMode()){
   state.avatarHeading=state.yaw+Math.PI;placeAvatar();
   if(visitMode==='floki')world.companions.dog.position.copy(state.player);
   else if(visitMode==='enric')world.companions.father.position.copy(state.player);
   else{world.companions.father.position.copy(state.player);world.companions.dog.position.copy(avatarDogTarget());}
  }
  drawMap();resize();renderer.shadowMap.needsUpdate=true;$('loading').hidden=true;
 }
 currentWorkIdx=0;
 updateWorkNavCounters();
 renderCollection();syncWebNavigationLinks();
 if(keepEntered){
  enter();
 }else{
  previewGuideStageMode(visitMode==='mute'?'avatar':visitMode,true);
  setGuideStageReel(!reduced.matches);
 }
 notifyParentState();
 if(keepEntered&&visitMode==='guided')setVisitMode('guided');
 const hashOut=id==='garden'?'#jardin':id==='paintings'?'#pintura':id==='drawings'?'#dibujo':id==='organic'?'#formas-organicas':id==='curvos'?'#planos-curvos':id==='mobiles'?'#moviles':'#galeria';
 history.replaceState(null,'',location.search+hashOut);
 updateMobileGameUI();
 announce(id==='gallery'?'Galería blanca preparada':id==='garden'?'Jardín de las Lagartijas preparado':id==='paintings'?'Sala de Pintura preparada':id==='drawings'?'Sala de Dibujo preparada':id==='organic'?'Sala de Formas orgánicas preparada':id==='curvos'?'Sala de Planos curvos y volúmenes abiertos preparada':'Sala de Móviles 3D preparada');
}
document.querySelectorAll('[data-space]').forEach(b=>b.onclick=async()=>{const wasCin=cinematicActive,prevCinMode=cinematicMode;await switchSpace(b.dataset.space,{preserveEntered:true});if(wasCin)toggleCinematicMode(true,prevCinMode);});
if($('space-select'))$('space-select').onchange=async e=>{const wasCin=cinematicActive,prevCinMode=cinematicMode;await switchSpace(e.target.value,{preserveEntered:true});if(wasCin)toggleCinematicMode(true,prevCinMode);};
function cancelNavigation(){stopTour();state.transition=null;}
function toggleFastWalk(force){
 fastWalk=typeof force==='boolean'?force:!fastWalk;
 if($('speed-toggle')){
  $('speed-toggle').setAttribute('aria-pressed',String(fastWalk));
  $('speed-toggle').textContent=fastWalk?'Rápido ON':'Rápido';
 }
 announce(fastWalk?'Paso rápido activado.':'Paso normal activado.');
}
if($('speed-toggle'))$('speed-toggle').onclick=()=>toggleFastWalk();
function adjustCameraElevation(deltaY){
 if(!renderer||!world)return;
 cancelNavigation();
 if(selected)leaveInspection(false);
 enter();
 state.camElev=THREE.MathUtils.clamp((state.camElev||0)+deltaY,-0.95,4.1);
 if(!isPlayerMode()){
  const gy=world.heightAt?world.heightAt(camera.position.x,camera.position.z):0;
  camera.position.y=gy+1.72+state.camElev;
 }
 lookCamera();
 updateMobileGameUI();
}
function adjustCameraPitch(deltaPitch){
 if(!renderer)return;
 cancelNavigation();
 enter();
 if(selected){
  state.targetOrbitElev=Math.max(-1.42,Math.min(1.38,state.targetOrbitElev-deltaPitch));
  if(reduced.matches){state.orbitElev=state.targetOrbitElev;orbitCamera();}
 }else{
  state.pitch=Math.max(-1.45,Math.min(1.48,state.pitch+deltaPitch));
  lookCamera();
 }
}
function move(forward,side,dt){
 cancelNavigation();
 const playerMode=isPlayerMode();
 const boost=((typeof fastWalk!=='undefined'&&fastWalk)||state.shiftHeld)?1.68:1;
 const speed=(playerMode?(visitMode==='floki'?3.15:2.4):3.6)*boost*dt;
 if(playerMode){state.yaw-=side*1.65*dt;state.avatarHeading=state.yaw+Math.PI;side=0;}
 const old=playerMode?state.player:camera.position,p=old.clone();
 p.x+=(-Math.sin(state.yaw)*forward+Math.cos(state.yaw)*side)*speed;
 p.z+=(-Math.cos(state.yaw)*forward-Math.sin(state.yaw)*side)*speed;
 validPosition(p);const gy=world.heightAt?world.heightAt(p.x,p.z):0;p.y=playerMode?gy:gy+1.72+(state.camElev||0);
 if(playerMode){
  const distance=Math.hypot(p.x-old.x,p.z-old.z);if(distance<.0001)return;
  state.movingAt=state.time;const controlled=visitMode==='floki'?world.companions.dog:world.companions.father;
  controlled.userData.rig.gaitPhase=(controlled.userData.rig.gaitPhase||0)+distance*(visitMode==='floki'?3.2:3)*Math.sign(forward);
  state.player.copy(p);
 }else camera.position.copy(p);
}
function hasDialog(){return !!document.querySelector('dialog[open]');}
const keyMap={KeyW:'forward',ArrowUp:'forward',KeyS:'back',ArrowDown:'back',KeyA:'left',ArrowLeft:'left',KeyD:'right',ArrowRight:'right',KeyE:'elevUp',PageUp:'elevUp',KeyQ:'elevDown',PageDown:'elevDown',KeyR:'lookUp',KeyF:'lookDown'};
addEventListener('keydown',e=>{
 if(e.key==='Shift')state.shiftHeld=true;
 if($('photo')?.open&&!e.repeat){
  if(e.code==='ArrowLeft'||e.code==='BracketLeft'){e.preventDefault();stepPhotoWork(-1);return;}
  if(e.code==='ArrowRight'||e.code==='BracketRight'){e.preventDefault();stepPhotoWork(1);return;}
 }
 if(e.key==='Escape'&&!hasDialog()){leaveInspection();stopTour();}
 if(hasDialog()||!renderer)return;
 const tag=document.activeElement?.tagName;
 if(!e.repeat&&!['INPUT','TEXTAREA','SELECT'].includes(tag)){
  if(e.code==='BracketLeft'){e.preventDefault();stepWorkInRoom(-1,{inspect:Boolean(selected)});return;}
  if(e.code==='BracketRight'){e.preventDefault();stepWorkInRoom(1,{inspect:Boolean(selected)});return;}
  if(e.code==='KeyN'){e.preventDefault();cycleTimeOfDay();return;}
  if(e.code==='KeyM'){e.preventDefault();toggleAmbientMusic();return;}
  if(e.code==='KeyC'){e.preventDefault();toggleCinematicMode();return;}
  if(e.code==='KeyB'){e.preventDefault();triggerBreezeWave();return;}
  if(e.code==='KeyV'){e.preventDefault();setVisitMode(visitMode==='mute'?'avatar':visitMode==='avatar'?'enric':visitMode==='enric'?'floki':visitMode==='floki'?'guided':'mute');return;}
 }
 if(cinematicActive&&!e.repeat&&!['INPUT','TEXTAREA','SELECT','BUTTON'].includes(tag)){
  if(e.code==='ArrowLeft'){e.preventDefault();stepCinematicShot(-1);return;}
  if(e.code==='ArrowRight'){e.preventDefault();stepCinematicShot(1);return;}
  if(e.code==='Space'){e.preventDefault();$('cin-pause')?.click();return;}
 }
 if(keyMap[e.code]&&!['INPUT','TEXTAREA','SELECT','BUTTON'].includes(tag)){
  e.preventDefault();
  const direction=keyMap[e.code];
  if(selected&&['forward','back','left','right','elevUp','elevDown'].includes(direction))leaveInspection(false);
  enter();
  if(!state.keys.has(direction)){
   if(direction==='elevUp'||direction==='elevDown')adjustCameraElevation(direction==='elevUp'?0.08:-0.08);
   else if(direction==='lookUp'||direction==='lookDown')adjustCameraPitch(direction==='lookUp'?0.05:-0.05);
   else move(direction==='forward'?1:direction==='back'?-1:0,direction==='right'?1:direction==='left'?-1:0,.016);
  }
  state.keys.add(direction);
 }
});
addEventListener('keyup',e=>{if(e.key==='Shift')state.shiftHeld=false;state.keys.delete(keyMap[e.code]);});addEventListener('blur',()=>{state.shiftHeld=false;state.keys.clear();state.pointers.clear();});
document.querySelectorAll('[data-move]').forEach(b=>{b.onpointerdown=e=>{if(!renderer)return;e.preventDefault();if(selected)leaveInspection(false);enter();state.walkTarget=null;if(world?.walkRing)world.walkRing.visible=false;try{b.setPointerCapture(e.pointerId);}catch{}const direction=b.dataset.move;move(direction==='forward'?1:direction==='back'?-1:0,direction==='right'?1:direction==='left'?-1:0,.016);state.keys.add(direction);};b.onpointerup=b.onpointercancel=b.onlostpointercapture=()=>state.keys.delete(b.dataset.move);});
document.querySelectorAll('[data-look]').forEach(b=>{const k=b.dataset.look==='up'?'lookUp':'lookDown';b.onpointerdown=e=>{if(!renderer)return;e.preventDefault();enter();try{b.setPointerCapture(e.pointerId);}catch{}adjustCameraPitch(k==='lookUp'?0.08:-0.08);state.keys.add(k);};b.onpointerup=b.onpointercancel=b.onlostpointercapture=()=>state.keys.delete(k);});
document.querySelectorAll('[data-elev-move]').forEach(b=>{const k=b.dataset.elevMove==='up'?'elevUp':'elevDown';b.onpointerdown=e=>{if(!renderer)return;e.preventDefault();if(selected)leaveInspection(false);enter();try{b.setPointerCapture(e.pointerId);}catch{}adjustCameraElevation(k==='elevUp'?0.12:-0.12);state.keys.add(k);};b.onpointerup=b.onpointercancel=b.onlostpointercapture=()=>state.keys.delete(k);});
if($('cam-reset-vert'))$('cam-reset-vert').onclick=()=>{if(!renderer)return;cancelNavigation();if(selected){state.targetOrbitElev=0;if(reduced.matches){state.orbitElev=0;orbitCamera();}return;}state.pitch=0;state.camElev=0;if(!isPlayerMode()&&world){const gy=world.heightAt?world.heightAt(camera.position.x,camera.position.z):0;camera.position.y=gy+1.72;}lookCamera();updateMobileGameUI();announce('Vista horizontal centrada a 1.72m.');};
if($('cam-height-slider'))$('cam-height-slider').addEventListener('input',e=>{if(!renderer||!world)return;if(selected)leaveInspection(false);enter();cancelNavigation();const val=parseFloat(e.target.value)||1.72;state.camElev=THREE.MathUtils.clamp(val-1.72,-0.95,4.1);if(!isPlayerMode()){const gy=world.heightAt?world.heightAt(camera.position.x,camera.position.z):0;camera.position.y=gy+1.72+state.camElev;}lookCamera();updateMobileGameUI();});
if($('joystick-pad')){const pad=$('joystick-pad'),knob=$('joystick-knob'),updateJoy=e=>{const r=pad.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,maxR=r.width*.36;let dx=e.clientX-cx,dy=e.clientY-cy;const d=Math.hypot(dx,dy);if(d>maxR){dx=dx/d*maxR;dy=dy/d*maxR;}const norm=Math.min(1,d/Math.max(1,maxR)),mag=norm<0.10?0:(norm-0.10)/0.90,ang=Math.atan2(dy,dx);state.joyX=Math.cos(ang)*mag;state.joyY=Math.sin(ang)*mag;if(knob)knob.style.transform=`translate(calc(-50% + ${dx.toFixed(1)}px), calc(-50% + ${dy.toFixed(1)}px))`;},endJoy=()=>{state.joyActive=false;state.joyX=0;state.joyY=0;if(knob)knob.style.transform='translate(-50%,-50%)';};pad.onpointerdown=e=>{if(!renderer)return;e.preventDefault();if(selected)leaveInspection(false);enter();state.walkTarget=null;state.lookVelYaw=0;state.lookVelPitch=0;if(world?.walkRing)world.walkRing.visible=false;try{pad.setPointerCapture(e.pointerId);}catch{}state.joyActive=true;updateJoy(e);};pad.onpointermove=e=>{if(state.joyActive)updateJoy(e);};pad.onpointerup=pad.onpointercancel=pad.onlostpointercapture=endJoy;}
function findHitSemantic(obj){
 let cur=obj;
 while(cur){
  if(cur.userData&&(cur.userData.work||cur.userData.critter||cur.userData.lookUpMobile||cur.userData.stop!==undefined))return cur;
  cur=cur.parent;
 }
 return null;
}
function pickHit(e){
 const r=renderer.domElement.getBoundingClientRect();
 if(!r.width||!r.height||!world)return undefined;
 const pickables=world.pickables.filter(o=>o.visible&&!((visitMode==='avatar'||visitMode==='enric')&&o===world.companions.father)&&!(visitMode==='floki'&&o===world.companions.dog));
 const castAt=(cx,cy)=>{
  mouse.set((cx-r.left)/r.width*2-1,-(cy-r.top)/r.height*2+1);
  raycaster.setFromCamera(mouse,camera);
  return raycaster.intersectObjects(pickables,true);
 };
 const primaryHits=castAt(e.clientX,e.clientY);
 const primary=primaryHits[0];
 if(primary){
  const sem=findHitSemantic(primary.object);
  if(sem)return {...primary,object:sem};
 }
 if(e.pointerType&&e.pointerType!=='mouse'){
  const maxOccl=primary?primary.distance+0.85:Infinity;
  const offsets=[[-14,0],[14,0],[0,-14],[0,14],[-22,-22],[22,-22],[-22,22],[22,22]];
  let bestHit=null;
  for(const [ox,oy] of offsets){
   const cx=e.clientX+ox,cy=e.clientY+oy;
   if(cx<r.left||cx>r.right||cy<r.top||cy>r.bottom)continue;
   const hList=castAt(cx,cy);
   for(const h of hList){
    if(h.distance>maxOccl)break;
    const sem=findHitSemantic(h.object);
    if(sem){
     if(!bestHit||h.distance<bestHit.distance)bestHit={...h,object:sem};
     break;
    }
   }
  }
  if(bestHit)return bestHit;
  mouse.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
  raycaster.setFromCamera(mouse,camera);
  const orig=raycaster.ray.origin,dir=raycaster.ray.direction;
  let bestWork=null,bestScore=Infinity,bestT=0,bestPt=null;
  for(const w of (world.works||[])){
   if(!w?.center||(w.kind!=='mobile'&&w.kind!=='sculpture'))continue;
   if(w.object&&w.object.visible===false)continue;
   const toC=w.center.clone().sub(orig);
   const tRay=toC.dot(dir);
   if(tRay<0.35||tRay>18||tRay>maxOccl)continue;
   const pt=orig.clone().addScaledVector(dir,tRay);
   const dxz=Math.hypot(pt.x-w.center.x,pt.z-w.center.z);
   const dy=Math.abs(pt.y-w.center.y);
   const rH=Math.max(0.38,((w.displayWidth||w.width)||0.75)*0.52);
   const rV=Math.max(0.40,((w.displayHeight||w.height)||0.85)*0.56);
   if(dxz<=rH&&dy<=rV){
    const score=(dxz/rH)*(dxz/rH)+(dy/rV)*(dy/rV)+tRay*0.015;
    if(score<bestScore){bestScore=score;bestWork=w;bestT=tRay;bestPt=pt;}
   }
  }
  if(bestWork)return {object:{userData:{work:bestWork}},distance:bestT,point:bestPt};
 }
 return primary;
}
function pick(e){return pickHit(e)?.object;}
function setupPointer(){
 const canvas=renderer.domElement;
 canvas.addEventListener('pointerdown',e=>{
  if(hasDialog())return;
  hideWalkHint();
  state.lookVelYaw=0;state.lookVelPitch=0;
  state.orbitVelAngle=0;state.orbitVelElev=0;state.panVelX=0;state.panVelY=0;
  if(audioCtx&&audioCtx.state==='suspended'&&musicActive)audioCtx.resume();
  try{canvas.setPointerCapture(e.pointerId);}catch{}
  state.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,lastT:performance.now()});
  if(state.pointers.size>=2)state.pinching=true;
  state.dragging=false;
  $('viewport').focus({preventScroll:true});
  if(!state.joyActive&&!selected&&!guideStageActive)cancelNavigation();
 });
 canvas.addEventListener('pointermove',e=>{
  const p=state.pointers.get(e.pointerId);
  if(p){
   const now=performance.now();
   const dtMove=Math.max(0.004,(now-(p.lastT||now))/1000);
   const dx=e.clientX-p.x,dy=e.clientY-p.y;
   if(Math.hypot(e.clientX-p.startX,e.clientY-p.startY)>6)state.dragging=true;
   if(state.pointers.size===2){
    state.pinching=true;
    state.lookVelYaw=0;state.lookVelPitch=0;
    state.orbitVelAngle=0;state.orbitVelElev=0;state.panVelX=0;state.panVelY=0;
    const other=[...state.pointers.entries()].find(([k])=>k!==e.pointerId)?.[1];
    if(other){
     const before=Math.hypot(p.x-other.x,p.y-other.y),after=Math.hypot(e.clientX-other.x,e.clientY-other.y);
     const pinchDelta=before-after;
     const midDx=dx*0.5,midDy=dy*0.5;
     if(selected){
      state.transition=null;
      if(Math.abs(pinchDelta)>0.25)zoom(pinchDelta*.011);
      const panScale=state.targetOrbitRadius*0.0014;
      state.targetInspectPanX-=midDx*panScale;
      state.targetInspectPanY+=midDy*panScale;
      clampInspectPan(selected);
      if(reduced.matches){
       state.inspectPanX=state.targetInspectPanX;
       state.inspectPanY=state.targetInspectPanY;
       orbitCamera();
      }
     }else{
      if(guideStageActive)closeGuideStage(true);
      enter();
      if(Math.abs(midDy)>1.1&&Math.abs(pinchDelta)<Math.abs(dy)*0.65){
       adjustCameraElevation(-midDy*0.011);
      }else if(Math.abs(pinchDelta)>=0.35){
       camera.fov=THREE.MathUtils.clamp(camera.fov+pinchDelta*0.045,34,72);
       state.userZoomFov=camera.fov;
       camera.updateProjectionMatrix();
      }
     }
    }
   }else if(!state.pinching){
    if(selected){
     state.transition=null;
     if(state.dragging&&state.autoOrbit){
      state.autoOrbit=false;
      if($('orbit-auto'))$('orbit-auto').setAttribute('aria-pressed','false');
     }
     if(isFlatArt(selected)){
      const panScale=state.targetOrbitRadius*0.0016;
      const dpx=-dx*panScale,dpy=dy*panScale;
      state.targetInspectPanX+=dpx;
      state.targetInspectPanY+=dpy;
      clampInspectPan(selected);
      if(!reduced.matches){
       state.panVelX=state.panVelX*0.5+THREE.MathUtils.clamp(dpx/dtMove,-2.6,2.6)*0.5;
       state.panVelY=state.panVelY*0.5+THREE.MathUtils.clamp(dpy/dtMove,-2.6,2.6)*0.5;
      }else{
       state.inspectPanX=state.targetInspectPanX;
       state.inspectPanY=state.targetInspectPanY;
       orbitCamera();
      }
     }else{
      if(hasDual3D(selected))selected.manualView=false;
      const dAng=-dx*.0065,dEl=dy*.0055;
      state.targetOrbitAngle=clampOrbitAngleForWork(selected,state.targetOrbitAngle+dAng);
      state.targetOrbitElev=Math.max(-1.42,Math.min(1.38,state.targetOrbitElev+dEl));
      if(!reduced.matches){
       state.orbitVelAngle=state.orbitVelAngle*0.48+THREE.MathUtils.clamp(dAng/dtMove,-4.2,4.2)*0.52;
       state.orbitVelElev=state.orbitVelElev*0.48+THREE.MathUtils.clamp(dEl/dtMove,-2.8,2.8)*0.52;
      }else{
       state.orbitAngle=state.targetOrbitAngle;
       state.orbitElev=state.targetOrbitElev;
       orbitCamera();
      }
      if(selected.kind==='mobile'&&Math.abs(dx)>1.5){
       selected.spin=Math.min(3.4,(selected.spin||0)+Math.abs(dx)*0.0065);
       if(musicActive&&Math.random()<0.06)playMobileMaterialChime(selected,0.5);
      }
     }
    }else{
     if(state.dragging){
      if(guideStageActive)closeGuideStage(true);
      enter();
     }
     const sens=e.pointerType==='touch'?0.0046:0.0042;
     const dYaw=-dx*sens;
     state.yaw+=dYaw;
     if((e.buttons&2)===2||e.shiftKey){
      adjustCameraElevation(-dy*0.012);
     }else{
      const dPitch=-dy*sens;
      state.pitch=Math.max(-1.45,Math.min(1.48,state.pitch+dPitch));
      if(e.pointerType!=='mouse'&&!isPlayerMode()){
       const instYaw=THREE.MathUtils.clamp(dYaw/dtMove,-5.5,5.5);
       const instPitch=THREE.MathUtils.clamp(dPitch/dtMove,-4.0,4.0);
       state.lookVelYaw=state.lookVelYaw*0.45+instYaw*0.55;
       state.lookVelPitch=state.lookVelPitch*0.45+instPitch*0.55;
      }
      if(!isPlayerMode())lookCamera();
     }
    }
   }
   p.x=e.clientX;p.y=e.clientY;p.lastT=now;
  }else if(e.pointerType==='mouse'){
   const hit=pick(e);
   const hWork=hit?.userData.work||null;
   const hCrit=hit?.userData.critter||null;
   const showHover=selected?(hWork&&hWork!==selected&&hWork.kind!=='environment'):Boolean(hWork||hCrit);
   state.hover=showHover?hWork:null;
   $('hover-label').hidden=!showHover;
   if(showHover){
    $('hover-label').firstChild.textContent=(hWork?hWork.title:hCrit.name)+' ';
    $('hover-label').style.left=e.clientX+'px';
    $('hover-label').style.top=Math.max(70,e.clientY-document.querySelector('.topbar').offsetHeight-25)+'px';
   }
   canvas.style.cursor=showHover?'pointer':'grab';
  }
 });
 canvas.addEventListener('pointerup',e=>{
  const p=state.pointers.get(e.pointerId);
  const now=performance.now();
  if(p&&(now-(p.lastT||0))>65){state.lookVelYaw=0;state.lookVelPitch=0;state.orbitVelAngle=0;state.orbitVelElev=0;state.panVelX=0;state.panVelY=0;}
  if(p&&!state.dragging&&!state.pinching&&state.pointers.size===1){
   const isDoubleTap=(now-lastTapTime)<320;
   lastTapTime=now;
   if(selected){
    const hit=pickHit(e),obj=hit?.object,otherW=obj?.userData?.work;
    if(!isDoubleTap&&otherW&&otherW!==selected&&otherW.kind!=='environment'&&otherW.kind!=='character'){
     focusAndInspectWork(otherW);
    }else if(isDoubleTap){
     state.transition=null;
     const ideal=getIdealOrbitRadius(selected);
     if(state.targetOrbitRadius<ideal*0.74){
      resetInspectFraming();
     }else{
      state.targetOrbitRadius=Math.max(isFlatArt(selected)?0.82:0.95,ideal*0.48);
      if(reduced.matches){state.orbitRadius=state.targetOrbitRadius;orbitCamera();}
     }
     lastTapTime=0;
    }else if(otherW===selected&&selected.kind==='mobile'){
     selected.spin=Math.min(3.4,(selected.spin||0)+0.95);
     selected.awakened=true;
     playMobileMaterialChime(selected,0.75);
    }
   }else{
    if(guideStageActive)closeGuideStage(true);
    const hit=pickHit(e),obj=hit?.object;
    if(obj?.userData.lookUpMobile){lookUpUnderMobile(obj.userData.lookUpMobile);}
    else if(obj?.userData.work)focusAndInspectWork(obj.userData.work);
    else if(obj?.userData.critter){
     const cr=obj.userData.critter;
     cr.excitedUntil=state.time+2.4;
     if(musicActive){
      if(cr.kind==='squirrel'){
       playKalimbaNote(587.33,1.8,0.065,0,-0.25);
       playKalimbaNote(783.99,1.8,0.065,0.10,0.25);
       playCelestaBell(1174.66,2.2,0.038,0.20,0);
      }else if(cr.kind==='lizard'){
       playCelestaBell(1318.5,1.5,0.042,0,-0.2);
       playCelestaBell(1567.98,1.7,0.042,0.08,0.2);
      }else{
       playBirdChirp(0);
      }
     }
     announce(cr.kind==='squirrel'?`${cr.name}: da un salto alegre con su algarroba entre las ramas.`:cr.kind==='lizard'?`${cr.name}: corretea al sol sobre la piedra caliza.`:`${cr.name}: saluda con un trino y aleteo entre las ramas.`);
    }
    else if(obj?.userData.stop!==undefined)goStop(obj.userData.stop);
    else if(obj?.userData.isFloor&&hit.point){
     enter();stopTour();state.transition=null;state.userZoomFov=null;
     const dest=validPosition(hit.point.clone()),gy=world.heightAt?world.heightAt(dest.x,dest.z):0;
     dest.y=gy;state.walkTarget=dest;
     if(world.walkRing){world.walkRing.position.set(dest.x,gy+.028,dest.z);world.walkRing.visible=true;}
    }else if(isDoubleTap){
     state.userZoomFov=null;
     camera.fov=getBaseRoomFov();camera.updateProjectionMatrix();
     lastTapTime=0;
    }
   }
  }
  state.pointers.delete(e.pointerId);
  if(state.pointers.size===0)state.pinching=false;
 });
 canvas.addEventListener('pointercancel',e=>{state.pointers.delete(e.pointerId);if(state.pointers.size===0){state.pinching=false;state.lookVelYaw=0;state.lookVelPitch=0;}});
 canvas.addEventListener('lostpointercapture',e=>{state.pointers.delete(e.pointerId);if(state.pointers.size===0)state.pinching=false;});
 canvas.addEventListener('pointerleave',()=>{$('hover-label').hidden=true;});
 canvas.addEventListener('wheel',e=>{
  e.preventDefault();if(hasDialog())return;
  if(selected){state.transition=null;zoom(e.deltaY*.004);}
  else{
   enter();state.walkTarget=null;if(world?.walkRing)world.walkRing.visible=false;
   const dir=e.deltaY<0?1:-1;
   move(dir*Math.cos(state.pitch),0,.24);
   if(Math.abs(state.pitch)>0.06)adjustCameraElevation(dir*Math.sin(state.pitch)*0.55);
  }
 },{passive:false});
 canvas.addEventListener('contextmenu',e=>e.preventDefault());
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();stopTour();fail('La sesión 3D se ha interrumpido. Recarga la página para volver a intentarlo.');});
}
let lastInspectLayout=null;
function computeInspectViewOffset(width,height){
 if(!selected)return [0,0];
 const layout=getInspectLayoutKind(width,height);
 if(layout==='landscape-side'){
  if(state.inspectCollapsed)return [0,0];
  const panelW=Math.min(316,width*0.45);
  return [Math.round(panelW*0.48),0];
 }
 if(layout==='bottom-sheet'){
  if(state.inspectCollapsed)return [0,26];
  return [0,Math.round(height*0.185)];
 }
 if(state.inspectCollapsed)return [0,0];
 const panelTotal=Math.min(384,width*0.36);
 return [Math.round(panelTotal*0.5),0];
}
function resize(){const vp=$('viewport');if(!renderer||!vp)return;const width=Math.max(1,vp.clientWidth),height=Math.max(1,vp.clientHeight);const deviceRatio=Math.min(devicePixelRatio||1,state.pixelScale);const pixelCount=width*height*deviceRatio*deviceRatio;const ratio=deviceRatio*Math.min(1,Math.sqrt(3400000/pixelCount));renderer.setPixelRatio(ratio);renderer.setSize(width,height,false);camera.aspect=width/height;const curLayout=getInspectLayoutKind(width,height);if(selected&&lastInspectLayout&&lastInspectLayout!==curLayout){state.targetOrbitRadius=getIdealOrbitRadius(selected);if(reduced.matches){state.orbitRadius=state.targetOrbitRadius;orbitCamera();}}lastInspectLayout=curLayout;if(reduced.matches){camera.clearViewOffset();if(selected){const [ox,oy]=computeInspectViewOffset(width,height);state.viewOffsetX=ox;state.viewOffsetY=oy;camera.setViewOffset(width,height,state.viewOffsetX,state.viewOffsetY,width,height);}else{state.viewOffsetX=0;state.viewOffsetY=0;}}else if(Math.abs(state.viewOffsetX)>0.3||Math.abs(state.viewOffsetY)>0.3){camera.setViewOffset(width,height,state.viewOffsetX,state.viewOffsetY,width,height);}else{camera.clearViewOffset();}camera.updateProjectionMatrix();world&&(world.dirty=true);}
const shortest=(a,b)=>Math.atan2(Math.sin(b-a),Math.cos(b-a));
function updateAvatar(dt){
 const c=world.companions;if(!c?.visible||!state.player)return;
 if(selected&&selected.kind!=='character'){
  flankCompanionsForInspection(world,selected.center,state.orbitAngle,state.orbitRadius,visitMode,dt,state.time,!reduced.matches);
  return;
 }
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
function suppressOccludingCompanions(){
 const c=world?.companions;
 if(!c||!camera)return null;
 const saved=[c.father.visible,c.dog.visible];
 if(!entered||guideStageActive||selected?.kind==='character')return saved;
 const camPos=camera.position;
 const focusTarget=(selected&&selected.kind!=='character')?selected.center:(!selected&&isPlayerMode()&&state.nearbyWork?.isWallWork&&camPos.distanceTo(state.nearbyWork.center)<2.45)?state.nearbyWork.center:null;
 const seg=focusTarget?focusTarget.clone().sub(camPos):null;
 const segLen=seg?seg.length():0;
 const segDir=(seg&&segLen>0.2)?seg.clone().divideScalar(segLen):null;
 const checkActor=(ch,minCamXZ,maxHeadY,rayRadius,midY)=>{
  if(!ch.visible)return;
  const dx=camPos.x-ch.position.x,dz=camPos.z-ch.position.z;
  const dXZ=Math.hypot(dx,dz);
  if(dXZ<minCamXZ&&camPos.y<(ch.position.y+maxHeadY)&&camPos.y>(ch.position.y-0.3)){
   ch.visible=false;return;
  }
  if(segDir&&segLen>0.35){
   const toChX=ch.position.x-camPos.x,toChY=(ch.position.y+midY)-camPos.y,toChZ=ch.position.z-camPos.z;
   const proj=toChX*segDir.x+toChY*segDir.y+toChZ*segDir.z;
   if(proj>0.12&&proj<(segLen-0.12)){
    const px=toChX-segDir.x*proj,py=toChY-segDir.y*proj,pz=toChZ-segDir.z*proj;
    const perp=Math.hypot(px,py*0.72,pz);
    if(perp<rayRadius)ch.visible=false;
   }
  }
 };
 checkActor(c.father,0.82,2.05,0.68,1.05);
 checkActor(c.dog,0.56,1.02,0.46,0.42);
 return saved;
}
function restoreOccludingCompanions(saved){
 const c=world?.companions;
 if(!c||!saved)return;
 c.father.visible=saved[0];
 c.dog.visible=saved[1];
}
function animate(now){state.frame=requestAnimationFrame(animate);if(document.hidden||externalPaused||!world)return;const dt=Math.min((now-(state.lastFrame||now))/1000,.06);state.lastFrame=now;const paused=hasDialog();if(!paused){state.time+=dt;const onGuideStage=(!entered||guideStageActive)&&!selected&&!cinematicActive;if(onGuideStage&&guideStageReelPlaying&&!reduced.matches){guideStageReelClock+=dt;if(guideStageReelClock>=4.6){guideStageReelClock=0;const curIdx=GUIDE_STAGE_ORDER.indexOf(guideStageMode);const nextMode=GUIDE_STAGE_ORDER[(curIdx+1)%GUIDE_STAGE_ORDER.length];previewGuideStageMode(nextMode,false);}}const pitchDir=Number(state.keys.has('lookUp'))-Number(state.keys.has('lookDown'));if(pitchDir)adjustCameraPitch(pitchDir*1.45*dt);const elevDir=Number(state.keys.has('elevUp'))-Number(state.keys.has('elevDown'));if(elevDir)adjustCameraElevation(elevDir*2.2*dt);if(!selected&&(state.keys.has('forward')||state.keys.has('back')||state.keys.has('left')||state.keys.has('right'))){if(guideStageActive)closeGuideStage(true);state.walkTarget=null;if(world.walkRing)world.walkRing.visible=false;let f=Number(state.keys.has('forward'))-Number(state.keys.has('back')),s=Number(state.keys.has('right'))-Number(state.keys.has('left'));if(f&&s&&!isPlayerMode()){f*=Math.SQRT1_2;s*=Math.SQRT1_2;}move(f,s,dt);}else if(!selected&&state.joyActive){if(guideStageActive)closeGuideStage(true);state.walkTarget=null;if(world.walkRing)world.walkRing.visible=false;if(isPlayerMode()||state.pointers.size>0)move(-state.joyY,state.joyX,dt);else{state.yaw-=state.joyX*1.65*dt;lookCamera();move(-state.joyY,0,dt);}}else if(!selected&&state.walkTarget){const cur=isPlayerMode()?state.player:camera.position,dx=state.walkTarget.x-cur.x,dz=state.walkTarget.z-cur.z,dist=Math.hypot(dx,dz);if(world.walkRing)world.walkRing.scale.setScalar(.88+.14*Math.sin(state.time*6));if(dist<.22){state.walkTarget=null;if(world.walkRing)world.walkRing.visible=false;}else{const targetYaw=Math.atan2(-dx,-dz);state.yaw+=shortest(state.yaw,targetYaw)*Math.min(1,dt*8.5);if(isPlayerMode())state.avatarHeading=state.yaw+Math.PI;else lookCamera();move(Math.min(1.25,Math.max(.55,dist*.95)),0,dt);}}if(!selected&&!cinematicActive&&!onGuideStage&&!state.transition&&state.pointers.size===0&&!reduced.matches&&!isPlayerMode()&&(Math.abs(state.lookVelYaw)>0.002||Math.abs(state.lookVelPitch)>0.002)){state.yaw+=state.lookVelYaw*dt;state.pitch=Math.max(-1.45,Math.min(1.48,state.pitch+state.lookVelPitch*dt));const damp=Math.exp(-7.5*dt);state.lookVelYaw*=damp;state.lookVelPitch*=damp;if(Math.abs(state.lookVelYaw)<=0.002)state.lookVelYaw=0;if(Math.abs(state.lookVelPitch)<=0.002)state.lookVelPitch=0;lookCamera();}if(state.transition){
 const t=state.transition;t.elapsed+=dt;
 const a=Math.min(1,t.elapsed/t.duration);
 // Quintic smoothstep C2-continuous easing for silky-smooth acceleration & deceleration
 const v=a*a*a*(a*(a*6-15)+10);
 if(t.cinematicHandoff&&cinematicActive&&!cinematicPaused){
  tourTimer+=dt*(0.28+0.72*v);
  const works=getRoomNavigableWorks();
  const isWorks=cinematicMode==='works'&&works.length>0;
  const shotDur=isWorks?8.8:10.4;
  const wObj=getCurrentCinematicWork();
  const s=world.stops[currentStop];
  const idx=isWorks?currentWorkIdx:currentStop;
  const livePose=getCinematicPoseAt(Math.min(1,tourTimer/shotDur),wObj,s,idx);
  if(livePose){
   t.to.copy(livePose.pos);
   t.toLook.copy(livePose.look);
   t.toFov=livePose.fov;
   const liveAng=anglesFor(t.to,t.toLook);
   t.toYaw=liveAng.yaw;
   t.toPitch=liveAng.pitch;
  }
 }
 if(t.mid){
  const u=1-v;
  camera.position.set(
   u*u*t.from.x+2*u*v*t.mid.x+v*v*t.to.x,
   u*u*t.from.y+2*u*v*t.mid.y+v*v*t.to.y,
   u*u*t.from.z+2*u*v*t.mid.z+v*v*t.to.z
  );
 }else{
  camera.position.lerpVectors(t.from,t.to,v);
 }
 if(world?.bounds){
  const b=world.bounds;
  camera.position.x=THREE.MathUtils.clamp(camera.position.x,b.minX+0.12,b.maxX-0.12);
  camera.position.z=THREE.MathUtils.clamp(camera.position.z,b.minZ+0.12,b.maxZ-0.12);
 }
 if(t.fromFov&&t.toFov&&Math.abs(t.fromFov-t.toFov)>0.05){
  camera.fov=THREE.MathUtils.lerp(t.fromFov,t.toFov,v);
  camera.updateProjectionMatrix();
 }
 if(t.fromLook&&t.toLook){
  const curLook=t.fromLook.clone().lerp(t.toLook,v);
  const lookAng=anglesFor(camera.position,curLook);
  const endYawDelta=shortest(lookAng.yaw,t.toYaw);
  state.yaw=lookAng.yaw+endYawDelta*(v*v);
  state.pitch=THREE.MathUtils.lerp(lookAng.pitch,t.toPitch,v*v)+Math.sin(a*Math.PI)*0.014;
 }else{
  const yawDelta=shortest(t.fromYaw,t.toYaw);
  state.yaw=t.fromYaw+yawDelta*v;
  state.pitch=THREE.MathUtils.lerp(t.fromPitch,t.toPitch,v)+Math.sin(a*Math.PI)*0.016;
 }
 const totalYawDelta=shortest(t.fromYaw,t.toYaw);
 state.roll=Math.sin(a*Math.PI)*Math.max(-0.022,Math.min(0.022,-totalYawDelta*0.018));
 lookCamera();
 if(cinematicActive&&$('cinematic-progress-fill')){
  const works=getRoomNavigableWorks();
  const isWorks=cinematicMode==='works'&&works.length>0;
  const shotDur=isWorks?8.8:10.4;
  const pct=Math.min(100,(a*18)+(tourTimer/shotDur)*82);
  $('cinematic-progress-fill').style.width=pct.toFixed(1)+'%';
 }
 if(a>=1){state.transition=null;if(selected)orbitCamera();else if(!isPlayerMode()&&world){const gy=world.heightAt?world.heightAt(camera.position.x,camera.position.z):0;state.camElev=THREE.MathUtils.clamp(camera.position.y-(gy+1.72),-0.95,4.1);updateMobileGameUI();}}
}else if(cinematicActive&&!selected){
 updateCinematicCamera(dt);
}else if(selected){
 state.roll=THREE.MathUtils.lerp(state.roll||0,0,Math.min(1,dt*6));
 if(state.pointers.size===0&&!reduced.matches){
  if(state.autoOrbit&&!isFlatArt(selected)){
   const nextAng=state.targetOrbitAngle+dt*0.42;
   const clampedAng=clampOrbitAngleForWork(selected,nextAng);
   if(Math.abs(clampedAng-nextAng)>0.001){
    state.targetOrbitAngle=clampOrbitAngleForWork(selected,state.targetOrbitAngle-dt*0.42);
   }else{
    state.targetOrbitAngle=clampedAng;
   }
  }else if(Math.abs(state.orbitVelAngle)>0.002||Math.abs(state.orbitVelElev)>0.002||Math.abs(state.panVelX)>0.001||Math.abs(state.panVelY)>0.001){
   const damp=Math.exp(-6.2*dt);
   if(isFlatArt(selected)){
    state.targetInspectPanX+=state.panVelX*dt;
    state.targetInspectPanY+=state.panVelY*dt;
    clampInspectPan(selected);
    state.panVelX*=damp;state.panVelY*=damp;
    if(Math.abs(state.panVelX)<0.001)state.panVelX=0;
    if(Math.abs(state.panVelY)<0.001)state.panVelY=0;
   }else{
    state.targetOrbitAngle=clampOrbitAngleForWork(selected,state.targetOrbitAngle+state.orbitVelAngle*dt);
    state.targetOrbitElev=Math.max(-1.42,Math.min(1.38,state.targetOrbitElev+state.orbitVelElev*dt));
    state.orbitVelAngle*=damp;state.orbitVelElev*=damp;
    if(Math.abs(state.orbitVelAngle)<0.002)state.orbitVelAngle=0;
    if(Math.abs(state.orbitVelElev)<0.002)state.orbitVelElev=0;
   }
  }
 }
 const da=shortest(state.orbitAngle,state.targetOrbitAngle);
 const de=state.targetOrbitElev-state.orbitElev;
 const dr=state.targetOrbitRadius-state.orbitRadius;
 const dpx=state.targetInspectPanX-state.inspectPanX;
 const dpy=state.targetInspectPanY-state.inspectPanY;
 if(Math.abs(da)>0.0002||Math.abs(de)>0.0002||Math.abs(dr)>0.0005||Math.abs(dpx)>0.0003||Math.abs(dpy)>0.0003){
  const ob=1-Math.exp(-12*dt);
  state.orbitAngle+=da*ob;
  state.orbitElev+=de*ob;
  state.orbitRadius+=dr*ob;
  state.inspectPanX+=dpx*ob;
  state.inspectPanY+=dpy*ob;
  orbitCamera();
 }
 const targetInspFov=getBaseInspectFov();
 if(camera&&Math.abs(camera.fov-targetInspFov)>0.1&&!state.pinching){
  camera.fov=THREE.MathUtils.lerp(camera.fov,targetInspFov,Math.min(1,dt*4));
  camera.updateProjectionMatrix();
 }
}else{
 state.roll=THREE.MathUtils.lerp(state.roll||0,0,Math.min(1,dt*6));
 const targetRoomFov=state.userZoomFov??getBaseRoomFov();
 if(!selected&&camera&&Math.abs(camera.fov-targetRoomFov)>0.15&&!state.pinching){
  camera.fov=THREE.MathUtils.lerp(camera.fov,targetRoomFov,Math.min(1,dt*3.2));
  camera.updateProjectionMatrix();
 }
}
if(renderer&&camera&&!reduced.matches){
 const vpEl=$('viewport');
 if(!vpEl){cancelAnimationFrame(state.frame);return;}
 const vw=vpEl.clientWidth,vh=vpEl.clientHeight;
 const [targetOffX,targetOffY]=computeInspectViewOffset(vw,vh);
 if(Math.abs(state.viewOffsetX-targetOffX)>0.2||Math.abs(state.viewOffsetY-targetOffY)>0.2){
  const vb=1-Math.exp(-8.5*dt);
  state.viewOffsetX=THREE.MathUtils.lerp(state.viewOffsetX,targetOffX,vb);
  state.viewOffsetY=THREE.MathUtils.lerp(state.viewOffsetY,targetOffY,vb);
  if(Math.abs(state.viewOffsetX)<0.3&&Math.abs(state.viewOffsetY)<0.3&&!selected){
   state.viewOffsetX=0;state.viewOffsetY=0;camera.clearViewOffset();
  }else{
   camera.setViewOffset(vw,vh,state.viewOffsetX,state.viewOffsetY,vw,vh);
  }
  camera.updateProjectionMatrix();
 }
}
if(windGainNode&&audioCtx){
 const targetWind=musicActive?(0.016+Math.min(0.068,(world?.windImpulse||0)*0.035)):0.0001;
 windGainNode.gain.setTargetAtTime(targetWind,audioCtx.currentTime,0.25);
}
if(waterGainNode&&audioCtx){
 let targetWater=0.0001;
 if(musicActive&&activeSpace==='garden'&&camera){
  const vp=isPlayerMode()&&state.player?state.player:camera.position;
  // Proximity to Acequia Norte (roadZ-3.85), Bancal Acequia (z~3.2), or Alberca (14.8, 3.1)
  const dAlberca=Math.hypot(vp.x-14.8,vp.z-3.1);
  const dBancal=Math.abs(vp.z-(3.2-0.04*vp.x));
  const dNorte=Math.abs(vp.z-(-13.0-0.50*vp.x));
  const minWaterDist=Math.min(dAlberca,dBancal,dNorte);
  const prox=Math.max(0,1-minWaterDist/10.5);
  targetWater=0.004+prox*prox*0.038;
 }
 waterGainNode.gain.setTargetAtTime(targetWater,audioCtx.currentTime,0.3);
}
if(musicActive&&!selected&&(state.keys.size||state.joyActive||state.walkTarget)){
 stepAccum+=dt;
 if(stepAccum>=0.48){
  stepAccum=0;
  playFootstep();
 }
}
if(touring&&!cinematicActive&&!state.transition){const c=world.companions,arrived=c.chars.every((character,i)=>character.position.distanceTo(c.targets[i])<.12);if(arrived){tourTimer+=dt;if(tourTimer>=14){tourTimer=0;if(currentStop===world.stops.length-1){stopTour();$('companion-message').textContent+=' El recorrido ha terminado; puedes explorar libremente.';announce('Recorrido completado. Puedes seguir explorando libremente.');}else goStop(currentStop+1);}}}updateMobiles(world,state.time,dt,moving,camera.position);if(onGuideStage){updateCompanions(world,state.time,dt,!reduced.matches,false);}else if(isPlayerMode()){updateAvatar(dt);if(!selected)lookCamera(dt);}else if(selected&&selected.kind!=='character'&&visitMode==='guided'){flankCompanionsForInspection(world,selected.center,state.orbitAngle,state.orbitRadius,visitMode,dt,state.time,!reduced.matches);}else updateCompanions(world,state.time,dt,moving&&!reduced.matches,selected?.kind==='character');}updateNearby(dt);if(world.focusLight){const cineWork=cinematicActive?getCurrentCinematicWork():null;const stageFocus=((!entered||guideStageActive)&&!selected&&!cinematicActive&&guideStageMode!=='mute'&&world.companions)?{center:world.companions.father.position.clone().lerp(world.companions.dog.position,guideStageMode==='floki'?1:guideStageMode==='enric'?0:0.35).add(new THREE.Vector3(0,1.05,0))}:null;const fw=selected||cineWork||stageFocus;if(fw&&fw.center){const camDir=camera.position.clone().sub(fw.center).normalize();const targetPos=fw.center.clone().addScaledVector(camDir,1.65);targetPos.y+=0.55;world.focusLight.position.lerp(targetPos,1-Math.exp(-4.5*dt));const targetInt=stageFocus?(timeOfDayMode==='night'?0.64:0.28):(timeOfDayMode==='night'?0.58:timeOfDayMode==='sunset'?0.34:0.16);world.focusLight.intensity=THREE.MathUtils.lerp(world.focusLight.intensity,targetInt,1-Math.exp(-3.8*dt));}else if(world.focusLight.intensity>0.005){world.focusLight.intensity=THREE.MathUtils.lerp(world.focusLight.intensity,0,1-Math.exp(-5*dt));}}const savedCompVis=suppressOccludingCompanions();renderer.render(world.scene,camera);restoreOccludingCompanions(savedCompVis);updateMap();if(dt>.037&&state.time>5){state.slowFrames++;if(state.slowFrames>100&&state.pixelScale>1){state.pixelScale=1;renderer.shadowMap.enabled=false;resize();}}else state.slowFrames=Math.max(0,state.slowFrames-1);}
function resolveSpaceFromHash(h){
 return h==='#jardin'||h==='#garden'?'garden':
  h==='#pintura'||h==='#pinturas'||h==='#paintings'?'paintings':
  h==='#dibujo'||h==='#dibujos'||h==='#drawings'?'drawings':
  h==='#formas-organicas'||h==='#organicas'||h==='#escultura-organica'||h==='#organic'?'organic':
  h==='#planos-curvos'||h==='#curvos'||h==='#volumenes-abiertos'?'curvos':
  h==='#moviles'||h==='#mirador-del-aire'||h==='#mobiles'?'mobiles':
  h==='#galeria'||h==='#ensamblajes'||h==='#relieves'||h==='#gallery'?'gallery':null;
}
function findPreferredSpaceForWork(query,hashSpace){
 if(!ART||!query)return hashSpace||'gallery';
 const q=String(query).trim().toLowerCase();
 const matches=ART.filter(a=>a.id.toLowerCase()===q||a.code.toLowerCase()===q||(a.catalogId&&a.catalogId.toLowerCase()===q));
 if(!matches.length)return hashSpace||'gallery';
 const GARDEN_CODES=new Set(['MOV-016','MOV-017','MOV-018','MOV-019','MOV-022','MOV-023','MOV-025','MOV-026','MOV-028','MOV-032','MOV-033','ESC-047','ESC-048','ESC-049','ESC-050','ESC-051','ESC-052']);
 const GALLERY_CODES=new Set(['MOV-001','MOV-005','MOV-016','PIN-014','PIN-036','PIN-039']);
 const code=matches[0].code;
 if(hashSpace==='garden'&&GARDEN_CODES.has(code))return 'garden';
 if(hashSpace==='gallery'&&(GALLERY_CODES.has(code)||matches[0].kind==='sculpture'))return 'gallery';
 const a=matches[matches.length-1];
 if(a.kind==='mobile')return hashSpace==='garden'&&GARDEN_CODES.has(code)?'garden':'mobiles';
 if(a.kind==='drawing')return 'drawings';
 if(a.kind==='painting')return 'paintings';
 if((ORGANIC_IDS||[]).includes(a.id))return 'organic';
 if((CURVED_PLANE_IDS||[]).includes(a.id))return 'curvos';
 return 'gallery';
}
function jumpToSeriesStop(serieName){
 if(!world||!serieName)return false;
 const target=String(serieName).trim().toLowerCase();
 const idx=world.stops.findIndex(s=>(s.series&&s.series.toLowerCase()===target)||s.title.toLowerCase().includes(target));
 if(idx>=0){enter();goStop(idx,true);return true;}
 return false;
}
async function init(){
 try{
  const initParams=new URLSearchParams(location.search);
  isEmbeddedView=initParams.get('embed')==='1';
  if(isEmbeddedView)document.body.classList.add('is-embedded');
  api=await import('./world.js?v=20261113-v25');
  ({THREE,ART,ORGANIC_IDS,CURVED_PLANE_IDS,MOBILE_GALLERY_IDS,PAINTING_IDS,FIGURAS_DIB_IDS,RELIEF_RECORTADOS_IDS,RELIEF_MURALES_IDS,RELIEF_TEXTURA_IDS,INTERVENCIONES_IDS,updateMobiles,disposeWorld,createGallery,createGarden,createDrawingsRoom,createPaintingsRoom,createOrganicRoom,createCurvedPlanesRoom,createMobilesRoom,setSculpturePresentation,getSculpturePresentation,setWorldNightMode,setGardenTimeOfDay,getGardenTimeOfDay}=api);
  renderCollection();
  renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance',alpha:false});
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.08;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  camera=new THREE.PerspectiveCamera(getBaseRoomFov(),1,.08,150);
  raycaster=new THREE.Raycaster();mouse=new THREE.Vector2();
  state.pixelScale=innerWidth<700?1.5:innerWidth<1100?1.65:1.85;
  for(const ev of ['pointerdown','touchend','keydown']){
   addEventListener(ev,()=>{if(audioCtx&&audioCtx.state==='suspended'&&musicActive)audioCtx.resume();},{passive:true});
  }
  $('viewport').append(renderer.domElement);
  setupPointer();
  new ResizeObserver(resize).observe($('viewport'));
  const h=location.hash.toLowerCase();
  const params=new URLSearchParams(location.search);
  const obraParam=params.get('obra');
  const serieParam=params.get('serie');
  const animParam=params.get('animatica');
  const hashSpace=resolveSpaceFromHash(h);
  const initialSpace=obraParam?findPreferredSpaceForWork(obraParam,hashSpace):(hashSpace||'gallery');
  await switchSpace(initialSpace);
  renderCollection();
  const scParam=params.get('modo');
  if(scParam==='billboard'||scParam==='ai3d')applySculptureMode(scParam);
  const horaParam=params.get('hora');
  if(horaParam==='noche'||horaParam==='night')setTimeOfDay('night',true);
  else if(horaParam==='atardecer'||horaParam==='sunset')setTimeOfDay('sunset',true);
  else if(horaParam==='ciclo'||horaParam==='cycle')setTimeOfDay('cycle',true);
  const requestedMode=params.get('visita')||params.get('visit');
  let savedVisit=null;
  try{savedVisit=sessionStorage.getItem('es3d_visit_chosen');}catch{}
  if(requestedMode==='acompanada'||requestedMode==='guided')setVisitMode('guided');
  else if(requestedMode==='personaje'||requestedMode==='avatar')setVisitMode('avatar');
  else if(requestedMode==='enric'||requestedMode==='padre')setVisitMode('enric');
  else if(requestedMode==='floki')setVisitMode('floki');
  else if(requestedMode==='sola'||requestedMode==='mute')setVisitMode('mute');
  else if(savedVisit&&['mute','avatar','enric','floki','guided'].includes(savedVisit))setVisitMode(savedVisit);
  const maybeShowAutomatedVisitPicker=()=>{
   if(isEmbeddedView||requestedMode||savedVisit||obraParam||animParam)return;
   openGuideStage('avatar');
  };
  const nivelParam=params.get('nivel');
  if(obraParam){
   const q=obraParam.trim().toLowerCase();
   const wObj=world?.works.find(x=>x.id.toLowerCase()===q||x.code.toLowerCase()===q||(x.catalogId&&x.catalogId.toLowerCase()===q));
   if(wObj){
    urlOriginWork=wObj;
    const works=getRoomNavigableWorks();
    const wIdx=works.findIndex(x=>x.id===wObj.id);
    if(wIdx>=0)currentWorkIdx=wIdx;
    if(animParam==='1'||animParam==='true'||animParam==='obras'){
     toggleCinematicMode(true,'works');
    }else if(innerWidth<=700){
     flyToWork(wObj,{inspect:false,instant:true});
    }else{
     focusAndInspectWork(wObj,{instant:true});
    }
   }else if(animParam==='1'||animParam==='true'||animParam==='obras'||animParam==='salas'){
    toggleCinematicMode(true,animParam==='salas'?'stops':'works');
   }else if(params.get('autoenter')==='1'){
    enter();maybeShowAutomatedVisitPicker();
   }
  }else if(serieParam){
   const jumped=jumpToSeriesStop(serieParam);
   const works=getRoomNavigableWorks();
   const sIdx=works.findIndex(x=>x.series&&x.series.toLowerCase()===serieParam.trim().toLowerCase());
   if(sIdx>=0)currentWorkIdx=sIdx;
   if(animParam==='1'||animParam==='true'||animParam==='obras'||animParam==='salas'){
    toggleCinematicMode(true,animParam==='salas'?'stops':'works');
   }else{
    if(!jumped&&params.get('autoenter')==='1')enter();
    if(entered)maybeShowAutomatedVisitPicker();
   }
  }else if(animParam==='1'||animParam==='true'||animParam==='obras'||animParam==='salas'){
   toggleCinematicMode(true,animParam==='salas'?'stops':'works');
  }else if(activeSpace==='mobiles'&&nivelParam!==null){
   enter();
   if(nivelParam==='abajo')lookUpUnderMobile();
   else jumpToElevation(Number(nivelParam)||0);
  }else if(params.get('autoenter')==='1'){
   enter();maybeShowAutomatedVisitPicker();
  }
  syncWebNavigationLinks();
  notifyParentState();
  requestAnimationFrame(animate);
 }catch(error){
  console.error('No se ha podido iniciar la experiencia 3D.',error);
  renderer=null;renderCollection();
  fail('El espacio 3D no está disponible. Puedes explorar las fotografías.');
 }
}
addEventListener('hashchange',async()=>{
 const hs=resolveSpaceFromHash(location.hash.toLowerCase());
 const autoEnter=entered||new URLSearchParams(location.search).get('autoenter')==='1';
 if(hs&&hs!==activeSpace)await switchSpace(hs,{preserveEntered:autoEnter});
});
document.addEventListener('visibilitychange',()=>{state.lastFrame=0;state.keys.clear();if(document.hidden)stopTour();});
init();

function companionMessage(){
 if(!world)return;
 const messages=activeSpace==='garden'?[
  'Bienvenido a la parcela real de Collado dels Llops (Náquera): entramos por la Entrada Este junto a la acequia y los almendros con el móvil de tapones de color (MOV-028).',
  'Frente a nosotros se alza la Caseta-Taller restaurada en madera noble con su porche, pérgola y la trama con flores de color (MOV-025).',
  'Junto al camino norte se alzan los dos almendros escultóricos podados: el almendro en V con las tiras perforadas (MOV-017) y el almendro con figuras geométricas y tejas en su base (MOV-032).',
  'Bajo las ramas bajas y horizontales del gran algarrobo centenario cuelgan a altura humana los tres móviles reales de la fotografía de archivo (MOV-016, MOV-019 y MOV-018).',
  'Junto al algarrobo se eleva el pino alto con la columna de tres cilindros moteados y las cestas oscuras con acentos de color (MOV-022), mirando hacia la Entrada Oeste.',
  'En el claro central dialogan el árbol podado de las botellas azules con su alcorque de piedras (MOV-033), el brocal de pozo, los cuatro cilindros con juncos rojos y el olivo joven de las letras.',
  'Junto al bancal de piedra seca y la acequia interior del jardín, los olivos sostienen los círculos rojos entrelazados (MOV-023) con el pinar mediterráneo al fondo.'
 ]:activeSpace==='paintings'?[
  'Bienvenido a la Sala de Pintura: 76 obras originales en ocho series. Comenzamos frente a las travesías simbólicas de la serie «Arcas» (PIN-001 a PIN-062).',
  'En el muro sur nos reciben las tres composiciones caligráficas de la serie «Letras y signos» (PIN-053, PIN-054 y PIN-055).',
  'En el ala oeste sur recorremos las nueve pinturas de movimiento y contraste de la serie «Tauromaquia» (PIN-020 a PIN-078).',
  'En este panel central se reúnen las escenas corales y narrativas de «Relatos e iconografía» (PIN-065 a PIN-079).',
  'Los paneles centrales despliegan las doce obras de «Figuras y símbolos» (PIN-002 a PIN-073), llenas de signo y presencia humana.',
  'A lo largo del gran muro este dialogan los dieciséis retratos imaginarios de «Rostros y personajes» (PIN-015 a PIN-080).',
  'En el ala oeste norte habitan las nueve siluetas nocturnas de la serie «Gatos» (PIN-003 a PIN-064).',
  'En el panel norte se abren el ritmo y la materia no figurativa de la serie «Abstracciones» (PIN-041 a PIN-048).',
  'En el muro norte culmina el recorrido pictórico con las cinco composiciones finales de «Abstracciones» (PIN-049 a PIN-058).'
 ]:activeSpace==='drawings'?[
  'Bienvenido a la Sala de Dibujo: 53 obras originales sobre papel. Comenzamos ante los primeros paneles de «Dibujo y espacio».',
  'En el muro sur dialogan las cinco obras enmarcadas de la serie «Figuras y símbolos» (DIB-001 a DIB-032).',
  'En este tramo oeste dominan los trazos rojos, naranjas y las zonas de sombra cálida sobre el papel (DIB-002 a DIB-006).',
  'Las líneas azules, verdes y ocres construyen espacios abiertos y ritmos continuos en los muros laterales (DIB-007 a DIB-015).',
  'Los paneles centrales articulan el pabellón dando aire y distancia de contemplación a cada dibujo (DIB-038 a DIB-045).',
  'En el muro este, tramas grises, curvas entrelazadas y acentos cromáticos conversan a lo largo del recorrido (DIB-024 a DIB-033).',
  'Al fondo norte del pabellón, las últimas cuatro obras cierran el horizonte de papel (DIB-050 a DIB-053).'
 ]:activeSpace==='organic'?[
  'Bienvenido a la Sala de Formas orgánicas. Un salón amplio para rodear en 360° las 8 esculturas en madera y piedra.',
  'A la izquierda, el volumen claro de formas onduladas (ESC-008) muestra sus pliegues suaves en piedra caliza.',
  'A la derecha, la veta cálida de la madera acompaña la torsión ascendente de ESC-009.',
  'En el tramo central dialogan el remate bifurcado en madera (ESC-010) y el volumen calizo con aberturas que dejan pasar la luz (ESC-011).',
  'Las formas estilizadas y verticales en madera tallada (ESC-013 y ESC-014) marcan el eje de esta sección del salón.',
  'Al fondo, la piedra redondeada con cavidades (ESC-015) y la raíz natural sobre soporte de hierro (ESC-038) culminan la visita.'
 ]:activeSpace==='curvos'?[
  'Bienvenido a la Sala de Planos curvos y volúmenes abiertos. Aquí puedes rodear en 360° las 12 esculturas de hierro y piedra.',
  'El recorrido comienza con el volumen vertical de planos abiertos (ESC-005) y el plano curvo con abertura central (ESC-006).',
  'Observa el volumen de planos envolventes sobre travertino (ESC-007) y la figura de perfiles ascendentes (ESC-012).',
  'En el centro del salón, los planos abiertos con curvas ascendentes (ESC-031 y ESC-032) recortan el aire sobre sus peanas de piedra.',
  'Las oquedades y el lazo central de hierro sobre travertino dorado (ESC-033 y ESC-034) dejan ver el espacio interior al rodearlos.',
  'Los contornos ovalados y las curvas en espiral (ESC-035 y ESC-036) muestran cómo la chapa plegada abraza el vacío.',
  'Al fondo culminan los dos planos curvos ascendentes (ESC-044) y el volumen abierto de contorno ondulado (ESC-053).'
 ]:activeSpace==='mobiles'?[
  'Bienvenido a la Sala de Móviles 3D: una nave diáfana con los 33 móviles suspendidos. Comenzamos ante el equilibrio rosa (MOV-001).',
  'En el paseo sur cuelgan a media altura la trama oscura con flores de color (MOV-025) y el aro suspendido (MOV-029).',
  'En el ala oeste tienes los móviles cara a cara a altura de mirada, desde la constelación rosa hasta los aros (MOV-011 a MOV-014).',
  'Elevando ligeramente la cámara (teclas E/Q) recorremos el eje central con los tubos rosas sobre arco y la espiral (MOV-006 y MOV-007).',
  'En el ala este dialogan las líneas de color, el aro azul y blanco y la corona de fragmentos suspendidos (MOV-018 a MOV-021).',
  'En el tramo central norte se alza la columna vertical de elementos claros (MOV-010) bajo el lucernario.',
  'En la rotonda norte culmina la sala con los recipientes suspendidos (MOV-033): pulsa «Brisa» para poner los 33 móviles en danza.'
 ]:[
  'Bienvenido a la Galería blanca: el espacio central donde dialogan los móviles suspendidos, la pintura y las series escultóricas.',
  'Sobre peanas exentas se despliega la serie «Estructuras y objetos ensamblados» (ESC-037 a ESC-055), para rodear en 360°.',
  'En el centro norte destacan los ensamblajes de hierro forjado, ruedas dentadas y espirales (ESC-041, ESC-042 y ESC-043).',
  'En el tramo noreste se presentan las cuatro obras en madera y sombra de «Relieves de planos recortados» (ESC-001 a ESC-004).',
  'A lo largo del gran muro oeste recorremos las once piezas en madera, hierro y objetos de «Relieves y ensamblajes murales» (ESC-016 a ESC-046).',
  'En el muro sureste se agrupan las cinco obras matéricas de «Relieves de textura» (ESC-024 a ESC-029).',
  'En el muro sur cierran el recorrido los seis registros documentales de «Intervenciones en el entorno» (ESC-047 a ESC-052).'
 ];
 const msg=messages[currentStop]||messages[messages.length-1]||'';
 $('companion-message').textContent=`${String(currentStop+1).padStart(2,'0')} / ${String(world.stops.length).padStart(2,'0')} · ${world.stops[currentStop].title}. ${msg}`;
 $('guide-next').hidden=visitMode!=='guided'||currentStop===world.stops.length-1;
 $('guide-work').hidden=visitMode!=='guided'||!world.stops[currentStop].work;
}
const VISIT_UI_META={
 mute:{icon:'👁',label:'Visión sola'},
 avatar:{icon:'👥',label:'Enric y Floki'},
 enric:{icon:'🧔',label:'Solo Enric'},
 floki:{icon:'🐕',label:'Solo Floki'},
 guided:{icon:'✦',label:'Visita guiada'}
};
function syncVisitModeUI(mode){
 for(const name of ['mute','avatar','enric','floki','guided'])$(`mode-${name}`)?.setAttribute('aria-pressed',String(mode===name));
 document.querySelectorAll('[data-entry-visit]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.entryVisit===mode)));
 document.querySelectorAll('[data-quick-visit]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.quickVisit===mode)));
 const meta=VISIT_UI_META[mode]||VISIT_UI_META.mute;
 if($('quick-visit-icon'))$('quick-visit-icon').textContent=meta.icon;
 if($('quick-visit-label'))$('quick-visit-label').textContent=meta.label;
}
function setVisitMode(mode){
 if(!renderer||!['mute','avatar','enric','floki','guided'].includes(mode))return;closeDialog($('options'));closeQuickVisitMenu();stopTour();leaveInspection();const previous=visitMode,wasPlayer=isPlayerMode(),ground=wasPlayer&&state.player?state.player.clone():camera.position.clone();visitMode=mode;state.keys.clear();state.transition=null;state.walkBlend=0;enter();if($('tour-label'))$('tour-label').textContent='Paseo';
 const gy=world?.heightAt?world.heightAt(ground.x,ground.z):0;
 if(mode==='mute'&&wasPlayer){camera.position.set(ground.x,gy+1.72,ground.z);state.pitch=0;}
 if(isPlayerMode()){state.player.set(ground.x,gy,ground.z);state.pitch=0;if(!wasPlayer)state.avatarHeading=state.yaw+Math.PI;placeAvatar();if(mode==='avatar'){world.companions.father.position.copy(state.player);world.companions.dog.position.copy(avatarDogTarget());}else if(mode==='enric')world.companions.father.position.copy(state.player);else world.companions.dog.position.copy(state.player);}
 setCompanionsVisible(world,mode!=='mute');if(mode==='floki')world.companions.father.visible=false;if(mode==='enric')world.companions.dog.visible=false;if(mode==='guided')positionCompanions(world,currentStop,true);else if(isPlayerMode())updateAvatar(0);
 syncVisitModeUI(mode);
 if($('companion-panel'))$('companion-panel').hidden=mode!=='guided'||!entered;if($('hover-label'))$('hover-label').hidden=true;state.hover=null;document.body.classList.toggle('accompanied',mode==='guided');
 if($('walk-hint'))$('walk-hint').textContent='Arrastra para mirar · Toca el suelo o una obra · Arriba: Compañía, Música, Luces y ⚙ Ajustes';
 for(const side of ['left','right'])document.querySelector(`[data-move=${side}]`)?.setAttribute('aria-label',`${isPlayerMode()?'Girar':'Caminar'} a la ${side==='left'?'izquierda':'derecha'}`);
 companionMessage();lookCamera();if(mode==='guided'){goStop(currentStop,true);startTour();}
 const url=new URL(location.href);if(mode==='mute')url.searchParams.delete('visita');else url.searchParams.set('visita',mode==='avatar'?'personaje':mode==='enric'?'enric':mode==='floki'?'floki':'acompanada');history.replaceState(null,'',url.pathname+url.search+url.hash);
 announce(mode==='mute'?'Modo en primera persona.':mode==='avatar'?'Visita con Enric y Floki.':mode==='enric'?'Visita solo con Enric.':mode==='floki'?'Visita solo con Floki.':'Visita guiada con Enric y Floki.');
}
function companionAction(who,action){if(!world?.companions)return;moving=true;updateMotion();act(world.companions[who],action);$('companion-message').textContent=who==='father'?'Enric te devuelve el saludo.':'Floki te mira y mueve la cola.';}
if($('mode-mute'))$('mode-mute').onclick=()=>{try{sessionStorage.setItem('es3d_visit_chosen','mute');}catch{}setVisitMode('mute');};
if($('mode-avatar'))$('mode-avatar').onclick=()=>{try{sessionStorage.setItem('es3d_visit_chosen','avatar');}catch{}setVisitMode('avatar');};
if($('mode-enric'))$('mode-enric').onclick=()=>{try{sessionStorage.setItem('es3d_visit_chosen','enric');}catch{}setVisitMode('enric');};
if($('mode-floki'))$('mode-floki').onclick=()=>{try{sessionStorage.setItem('es3d_visit_chosen','floki');}catch{}setVisitMode('floki');};
if($('mode-guided'))$('mode-guided').onclick=()=>{try{sessionStorage.setItem('es3d_visit_chosen','guided');}catch{}setVisitMode('guided');};
$('guide-next').onclick=()=>{if(currentStop<world.stops.length-1){tourTimer=0;goStop(currentStop+1);if(!touring)startTour();}};
$('guide-work').onclick=()=>{const id=world.stops[currentStop].work;if(id){const work=world.works.find(w=>w.id===id);if(work)inspect(work);}};
$('meet-father').onclick=()=>inspect(world.companions.father.userData.work);$('meet-dog').onclick=()=>inspect(world.companions.dog.userData.work);
$('wave-father').onclick=()=>companionAction('father','wave');$('pet-dog').onclick=()=>companionAction('dog','pet');

let terraceSide=-1;
function updateMobileGameUI(){
 const panel=$('mobile-game-panel');
 if(panel)panel.hidden=activeSpace!=='mobiles';
 if($('mobiles-quick-bar'))$('mobiles-quick-bar').hidden=activeSpace!=='mobiles'||!entered||Boolean(selected)||cinematicActive;
 if(activeSpace!=='mobiles'||!world)return;
 const total=world.mobiles.length||33,count=world.mobiles.filter(m=>m.awakened).length;
 if($('awakened-count'))$('awakened-count').textContent=`${count} / ${total}`;
 if($('awakened-bar'))$('awakened-bar').style.width=`${Math.min(100,Math.round(count/total*100))}%`;
 const camY=1.72+(state.camElev||0);
 const lvl=camY>=3.25?2:camY>=2.35?1:0;
 if($('mg-level-label'))$('mg-level-label').textContent=`Altura · ${camY.toFixed(2).replace('.',',')} m`;
 if($('cam-height-slider')&&document.activeElement!==$('cam-height-slider'))$('cam-height-slider').value=camY.toFixed(2);
 document.querySelectorAll('[data-elev]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.elev)===lvl)));
}
function moveVisitorTo(x,z,lookTarget,pitchOverride=null,targetCamY=null){
 if(!renderer||!world)return;
 leaveInspection(false);enter();stopTour();state.walkTarget=null;if(world.walkRing)world.walkRing.visible=false;
 const dest=validPosition(new THREE.Vector3(x,0,z));
 const gy=world.heightAt?world.heightAt(dest.x,dest.z):0;
 if(targetCamY!==null)state.camElev=THREE.MathUtils.clamp(targetCamY-1.72,-0.95,4.1);
 const eye=new THREE.Vector3(dest.x,gy+1.72+(state.camElev||0),dest.z);
 const angles=anglesFor(eye,lookTarget);
 if(pitchOverride!==null)angles.pitch=pitchOverride;
 if(isPlayerMode()){
  state.player.set(dest.x,gy,dest.z);state.yaw=angles.yaw;state.avatarHeading=angles.yaw+Math.PI;state.pitch=angles.pitch;state.transition=null;placeAvatar();
  if(visitMode==='floki')world.companions.dog.position.copy(state.player);
  else if(visitMode==='enric')world.companions.father.position.copy(state.player);
  else{world.companions.father.position.copy(state.player);world.companions.dog.position.copy(avatarDogTarget());}
 }else{
  state.userZoomFov=null;
  const dist=camera.position.distanceTo(eye);
  state.transition=buildSmoothTransition(eye,lookTarget,{duration:Math.min(1.35,Math.max(0.65,dist/5.5)),pitchOverride,toFov:getBaseRoomFov(),arcFactor:0.08,liftFactor:0.03,maxLift:0.35});
 }
 updateMobileGameUI();
}
function jumpToElevation(lvl){
 if(!renderer||!world)return;
 leaveInspection(false);enter();cancelNavigation();
 const targetY=lvl===2?3.60:lvl===1?2.80:1.72;
 state.camElev=targetY-1.72;
 if(!isPlayerMode()){
  const gy=world.heightAt?world.heightAt(camera.position.x,camera.position.z):0;
  camera.position.y=gy+targetY;
 }
 lookCamera();
 updateMobileGameUI();
 announce(lvl===0?'Cámara a altura de paseo (1.72m).':lvl===1?'Cámara elevada a media altura (2.80m) frente a los móviles.':'Cámara elevada a vista aérea (3.60m).');
}
function lookUpUnderMobile(targetWork=null){
 if(!world||activeSpace!=='mobiles')return;
 const p=isPlayerMode()&&state.player?state.player:camera.position;
 let w=targetWork;
 if(!w){
  w=[...world.mobiles].sort((a,b)=>Math.hypot(p.x-a.center.x,p.z-a.center.z)-Math.hypot(p.x-b.center.x,p.z-b.center.z))[0];
 }
 if(!w)return;
 w.awakened=true;w.spin=Math.max(w.spin,1.5);world.windImpulse=1.1;moving=true;updateMotion();
 const stand=getWorkStandPosition(w);
 moveVisitorTo(stand.x,stand.z,w.center.clone(),null,Math.max(1.72,Math.min(3.6,w.center.y)));
 announce(`Encuadrando ${w.title} (${w.code}).`);
}
function triggerBreezeWave(){
 if(!world)return;
 enter();moving=true;updateMotion();world.windImpulse=1.95;
 const p=isPlayerMode()&&state.player?state.player:camera.position;
 const sorted=[...world.mobiles].sort((a,b)=>Math.hypot(p.x-a.center.x,p.z-a.center.z)-Math.hypot(p.x-b.center.x,p.z-b.center.z));
 sorted.slice(0,6).forEach((m,i)=>{m.awakened=true;m.spin=Math.min(3.4,m.spin+2.2-i*.25);});
 triggerMusicChime(1.3);
 playWindGust();
 if($('breeze-btn')){
  $('breeze-btn').classList.add('breeze-active');
  setTimeout(()=>$('breeze-btn')?.classList.remove('breeze-active'),900);
 }
 updateMobileGameUI();
 const count=world.mobiles.filter(m=>m.awakened).length;
 announce(`Corriente de brisa enviada: ${count} de ${world.mobiles.length} móviles en danza.`);
}
function goToNextUnawakenedMobile(){
 if(!world||activeSpace!=='mobiles')return;
 const next=world.mobiles.find(m=>!m.awakened)||world.mobiles[(world.mobiles.indexOf(state.nearbyWork)+1)%world.mobiles.length]||world.mobiles[0];
 if(!next)return;
 next.awakened=true;next.spin=Math.max(next.spin,1.75);world.windImpulse=1.2;moving=true;updateMotion();
 const stand=getWorkStandPosition(next);
 moveVisitorTo(stand.x,stand.z,next.center.clone(),null,Math.max(1.72,Math.min(3.6,next.center.y)));
 announce(`Descubriendo ${next.title} (${next.code}).`);
}
document.querySelectorAll('[data-elev]').forEach(b=>b.addEventListener('click',()=>jumpToElevation(Number(b.dataset.elev))));
if($('mg-lookup'))$('mg-lookup').onclick=()=>lookUpUnderMobile();
if($('mg-breeze'))$('mg-breeze').onclick=()=>triggerBreezeWave();
if($('breeze-btn'))$('breeze-btn').onclick=()=>triggerBreezeWave();
if($('mg-next-mobile'))$('mg-next-mobile').onclick=()=>goToNextUnawakenedMobile();

const TIME_MODES={
 day:{icon:'☀',label:'Día',msg:'Iluminación de día.'},
 sunset:{icon:'◐',label:'Atardecer',msg:'Iluminación de atardecer.'},
 night:{icon:'☾',label:'Noche',msg:'Iluminación nocturna.'},
 cycle:{icon:'↻',label:'Ciclo',msg:'Ciclo continuo de luz activado.'}
};
function setTimeOfDay(mode,instant=false){
 if(!TIME_MODES[mode])mode='day';
 timeOfDayMode=mode;
 isNightMode=(mode==='night');
 document.body.classList.toggle('time-sunset',mode==='sunset');
 document.body.classList.toggle('time-night',mode==='night');
 document.body.classList.toggle('night-mode',mode==='night');
 if(setGardenTimeOfDay){for(const w of Object.values(worlds))setGardenTimeOfDay(w,mode,instant);}
 const btn=$('day-night-btn');
 if(btn){
  btn.dataset.mode=mode;
  btn.setAttribute('aria-pressed',String(mode!=='day'));
 }
 document.querySelectorAll('[data-tod]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tod===mode)));
 if($('day-night-icon'))$('day-night-icon').textContent=TIME_MODES[mode].icon;
 if($('day-night-label'))$('day-night-label').textContent=TIME_MODES[mode].label;
 if($('quick-light-icon'))$('quick-light-icon').textContent=TIME_MODES[mode].icon;
 if($('quick-light-label'))$('quick-light-label').textContent=TIME_MODES[mode].label;
 if($('quick-light-btn'))$('quick-light-btn').setAttribute('aria-pressed',String(mode!=='day'));
 if($('entry-light-label'))$('entry-light-label').textContent=TIME_MODES[mode].label;
 if(renderer)renderer.toneMappingExposure=mode==='night'?1.02:mode==='sunset'?1.05:1.08;
 if(musicActive)triggerMusicChime(0.9);
 announce(TIME_MODES[mode].msg);
}
function cycleTimeOfDay(){
 const order=['day','sunset','night','cycle'];
 const next=order[(order.indexOf(timeOfDayMode)+1)%order.length];
 setTimeOfDay(next,false);
}
if($('day-night-btn'))$('day-night-btn').onclick=()=>cycleTimeOfDay();
if($('quick-light-btn'))$('quick-light-btn').onclick=()=>cycleTimeOfDay();
if($('entry-light-toggle'))$('entry-light-toggle').onclick=()=>cycleTimeOfDay();
document.querySelectorAll('[data-tod]').forEach(b=>b.addEventListener('click',()=>setTimeOfDay(b.dataset.tod,false)));

function createReverbImpulse(ctx,duration=3.6,decay=2.5){
 const rate=ctx.sampleRate,len=Math.floor(rate*duration);
 const buf=ctx.createBuffer(2,len,rate);
 for(let ch=0;ch<2;ch++){
  const data=buf.getChannelData(ch);
  for(let i=0;i<len;i++){
   const t=i/len;
   // Velvet-smooth early reflections + lush exponential hall tail
   const env=Math.pow(1-t,decay)*(1-Math.exp(-i/(rate*0.018)));
   data[i]=(Math.random()*2-1)*env*0.48;
  }
 }
 return buf;
}
function ensureAudio(){
 if(audioCtx)return audioCtx;
 const Ctx=window.AudioContext||window.webkitAudioContext;
 if(!Ctx)return null;
 audioCtx=new Ctx();
 // Master bus with soft studio DynamicsCompressor so polyphonic chords & chimes sound warm and mastered
 const comp=audioCtx.createDynamicsCompressor();
 comp.threshold.value=-16;
 comp.knee.value=18;
 comp.ratio.value=3.2;
 comp.attack.value=0.015;
 comp.release.value=0.28;
 comp.connect(audioCtx.destination);

 musicMaster=audioCtx.createGain();
 musicMaster.gain.value=0.44;
 musicMaster.connect(comp);

 // 1. True 3.6s Stereo Convolution Hall Reverb (warm C418 acoustic space)
 const convolver=audioCtx.createConvolver();
 convolver.buffer=createReverbImpulse(audioCtx,3.6,2.4);
 const revFilter=audioCtx.createBiquadFilter();
 revFilter.type='lowpass';revFilter.frequency.value=2100;
 const revWet=audioCtx.createGain();
 revWet.gain.value=0.58;
 reverbBus=audioCtx.createGain();
 reverbBus.connect(convolver);
 convolver.connect(revFilter);
 revFilter.connect(revWet);
 revWet.connect(comp);
 musicMaster.connect(reverbBus);

 // 2. Stereo Modulated Ping-Pong Tape Delay (analog wow/flutter warmth)
 const delayL=audioCtx.createDelay(2.5),delayR=audioCtx.createDelay(2.5);
 delayL.delayTime.value=0.43;delayR.delayTime.value=0.64;
 const lfo=audioCtx.createOscillator(),lfoGain=audioCtx.createGain();
 lfo.frequency.value=0.22;lfoGain.gain.value=0.0018;
 lfo.connect(lfoGain);lfoGain.connect(delayL.delayTime);lfo.start();
 const fbL=audioCtx.createGain(),fbR=audioCtx.createGain();
 fbL.gain.value=0.34;fbR.gain.value=0.32;
 const damp=audioCtx.createBiquadFilter();damp.type='lowpass';damp.frequency.value=1450;
 musicMaster.connect(damp);damp.connect(delayL);damp.connect(delayR);
 delayL.connect(fbL);fbL.connect(delayR);delayR.connect(fbR);fbR.connect(delayL);
 const delayWet=audioCtx.createGain();delayWet.gain.value=0.36;
 delayL.connect(delayWet);delayR.connect(delayWet);delayWet.connect(comp);

 // 3. Pre-computed Felt Hammer Transient Buffer for intimate tactile piano key strikes
 const hLen=Math.floor(audioCtx.sampleRate*0.045);
 hammerBuf=audioCtx.createBuffer(1,hLen,audioCtx.sampleRate);
 const hData=hammerBuf.getChannelData(0);
 for(let i=0;i<hLen;i++){
  hData[i]=(Math.random()*2-1)*Math.exp(-i/(audioCtx.sampleRate*0.008))*0.35;
 }

 // 4. Continuous Soft Mediterranean Breeze & Acequia Water Ambience
 const wLen=audioCtx.sampleRate*4;
 const wBuf=audioCtx.createBuffer(1,wLen,audioCtx.sampleRate);
 const wData=wBuf.getChannelData(0);
 let b0=0,b1=0,b2=0;
 for(let i=0;i<wLen;i++){
  const wh=Math.random()*2-1;
  b0=0.997*b0+wh*0.029;
  b1=0.985*b1+wh*0.032;
  b2=0.950*b2+wh*0.048;
  wData[i]=(b0+b1+b2)*0.18;
 }
 const windSrc=audioCtx.createBufferSource();
 windSrc.buffer=wBuf;windSrc.loop=true;
 const windFilter=audioCtx.createBiquadFilter();
 windFilter.type='bandpass';windFilter.frequency.value=340;windFilter.Q.value=1.2;
 const windLfo=audioCtx.createOscillator(),windLfoG=audioCtx.createGain();
 windLfo.frequency.value=0.14;windLfoG.gain.value=140;
 windLfo.connect(windLfoG);windLfoG.connect(windFilter.frequency);windLfo.start();
 windGainNode=audioCtx.createGain();
 windGainNode.gain.value=0.0001;
 windSrc.connect(windFilter);windFilter.connect(windGainNode);windGainNode.connect(comp);
 windSrc.start();

 // 5. Positional Flowing Acequia & Alberca Water Stream Generator
 const watSrc=audioCtx.createBufferSource();
 watSrc.buffer=wBuf;watSrc.loop=true;watSrc.playbackRate.value=1.45;
 const watFilter=audioCtx.createBiquadFilter();
 watFilter.type='bandpass';watFilter.frequency.value=780;watFilter.Q.value=2.2;
 const watLfo=audioCtx.createOscillator(),watLfoG=audioCtx.createGain();
 watLfo.frequency.value=3.8;watLfoG.gain.value=240;
 watLfo.connect(watLfoG);watLfoG.connect(watFilter.frequency);watLfo.start();
 waterGainNode=audioCtx.createGain();
 waterGainNode.gain.value=0.0001;
 watSrc.connect(watFilter);watFilter.connect(waterGainNode);waterGainNode.connect(comp);
 watSrc.start();

 return audioCtx;
}
// Instrument 4: Crystalline Celesta / Glass Marimba (Aria Math / Taswell bell harmonics)
function playCelestaBell(freq,dur=3.2,vel=0.045,delaySec=0,pan=0){
 const ctx=ensureAudio();if(!ctx||!musicActive)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime+delaySec;
 const osc1=ctx.createOscillator(),osc2=ctx.createOscillator();
 osc1.type='sine';osc2.type='triangle';
 osc1.frequency.setValueAtTime(freq,t0);
 osc2.frequency.setValueAtTime(freq*2.0,t0);
 const g2=ctx.createGain(),env=ctx.createGain();
 g2.gain.setValueAtTime(0.16,t0);
 g2.gain.exponentialRampToValueAtTime(0.002,t0+0.35);
 env.gain.setValueAtTime(0.0001,t0);
 env.gain.linearRampToValueAtTime(vel,t0+0.012);
 env.gain.exponentialRampToValueAtTime(0.00015,t0+dur);
 osc1.connect(env);osc2.connect(g2);g2.connect(env);
 if(ctx.createStereoPanner){
  const p=ctx.createStereoPanner();
  p.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,pan)),t0);
  env.connect(p);p.connect(reverbBus||musicMaster);
 }else{
  env.connect(reverbBus||musicMaster);
 }
 osc1.start(t0);osc2.start(t0);
 osc1.stop(t0+dur+0.06);osc2.stop(t0+dur+0.06);
}
// Instrument 5: Warm Acoustic Cello / Sub-Bass Foundation
function playWarmBass(freq,dur=5.8,vel=0.065,delaySec=0){
 const ctx=ensureAudio();if(!ctx||!musicActive)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime+delaySec;
 const osc1=ctx.createOscillator(),osc2=ctx.createOscillator();
 osc1.type='sine';osc2.type='triangle';
 osc1.frequency.setValueAtTime(freq*0.5,t0);
 osc2.frequency.setValueAtTime(freq,t0);
 const filt=ctx.createBiquadFilter();
 filt.type='lowpass';filt.frequency.value=210;
 const g2=ctx.createGain(),env=ctx.createGain();
 g2.gain.value=0.35;
 env.gain.setValueAtTime(0.0001,t0);
 env.gain.linearRampToValueAtTime(vel,t0+0.85);
 env.gain.exponentialRampToValueAtTime(0.00015,t0+dur);
 osc1.connect(filt);osc2.connect(g2);g2.connect(filt);filt.connect(env);env.connect(musicMaster);
 osc1.start(t0);osc2.start(t0);
 osc1.stop(t0+dur+0.08);osc2.stop(t0+dur+0.08);
}
// Interactive Foley 1: Stereo Aerodynamic Breeze Swell when blowing wind
function playWindGust(){
 if(!musicActive)return;
 const ctx=ensureAudio();if(!ctx||!hammerBuf)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime;
 const osc=ctx.createOscillator(),filt=ctx.createBiquadFilter(),env=ctx.createGain();
 osc.type='sine';
 osc.frequency.setValueAtTime(220,t0);
 osc.frequency.exponentialRampToValueAtTime(540,t0+0.65);
 osc.frequency.exponentialRampToValueAtTime(180,t0+1.8);
 filt.type='lowpass';filt.frequency.value=600;
 env.gain.setValueAtTime(0.0001,t0);
 env.gain.linearRampToValueAtTime(0.028,t0+0.45);
 env.gain.exponentialRampToValueAtTime(0.0001,t0+1.85);
 osc.connect(filt);filt.connect(env);env.connect(reverbBus||musicMaster);
 osc.start(t0);osc.stop(t0+1.9);
}
// Interactive Foley 2: Subtle Organic Footsteps (Limestone gravel in Garden / Soft wood in Gallery)
function playFootstep(){
 if(!musicActive||!hammerBuf)return;
 const ctx=ensureAudio();if(!ctx)return;
 const t0=ctx.currentTime;
 const src=ctx.createBufferSource(),filt=ctx.createBiquadFilter(),env=ctx.createGain();
 src.buffer=hammerBuf;
 const isGarden=(activeSpace==='garden');
 src.playbackRate.value=isGarden?(0.75+Math.random()*0.25):(0.48+Math.random()*0.12);
 filt.type='bandpass';
 filt.frequency.value=isGarden?(950+Math.random()*280):(320+Math.random()*80);
 filt.Q.value=isGarden?1.4:2.2;
 env.gain.setValueAtTime(isGarden?0.032:0.022,t0);
 env.gain.exponentialRampToValueAtTime(0.0001,t0+0.042);
 src.connect(filt);filt.connect(env);env.connect(musicMaster);
 src.start(t0);
}
// Instrument 1: C418 Intimate Felt Piano (Sweden / Wet Hands / Mice on Venus)
function playFeltPiano(freq,dur=4.2,vel=0.11,delaySec=0,pan=0){
 const ctx=ensureAudio();if(!ctx||!musicActive)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime+delaySec;
 // Warm fundamental + slightly detuned unison string + soft 2nd & 3rd harmonics
 const osc1=ctx.createOscillator(),osc2=ctx.createOscillator(),osc3=ctx.createOscillator();
 osc1.type='triangle';osc2.type='sine';osc3.type='sine';
 osc1.frequency.setValueAtTime(freq,t0);
 osc2.frequency.setValueAtTime(freq*1.0012,t0); // Natural piano string chorus
 osc3.frequency.setValueAtTime(freq*2.0,t0);
 // Dynamic velocity-sensitive lowpass filter (opens on hammer strike, mellows into warm sustain)
 const filter=ctx.createBiquadFilter();
 filter.type='lowpass';
 filter.Q.value=0.7;
 const peakCutoff=Math.min(3400,freq*3.8+vel*6500);
 filter.frequency.setValueAtTime(peakCutoff,t0);
 filter.frequency.exponentialRampToValueAtTime(Math.max(260,freq*1.35),t0+Math.min(1.6,dur*0.48));
 filter.frequency.exponentialRampToValueAtTime(Math.max(190,freq*0.95),t0+dur);
 const env=ctx.createGain(),g2=ctx.createGain(),g3=ctx.createGain();
 g2.gain.value=0.55;
 g3.gain.setValueAtTime(0.18,t0);
 g3.gain.exponentialRampToValueAtTime(0.008,t0+Math.min(0.65,dur*0.32));
 env.gain.setValueAtTime(0.0001,t0);
 env.gain.linearRampToValueAtTime(vel,t0+0.022);
 env.gain.exponentialRampToValueAtTime(vel*0.42,t0+0.38);
 env.gain.exponentialRampToValueAtTime(0.00015,t0+dur);
 osc1.connect(filter);osc2.connect(g2);g2.connect(filter);osc3.connect(g3);g3.connect(filter);
 // Soft wooden felt-hammer key transient
 if(hammerBuf){
  const hSrc=ctx.createBufferSource(),hFilt=ctx.createBiquadFilter(),hGain=ctx.createGain();
  hSrc.buffer=hammerBuf;
  hFilt.type='bandpass';hFilt.frequency.value=Math.min(1200,freq*1.8);hFilt.Q.value=1.5;
  hGain.gain.value=vel*0.28;
  hSrc.connect(hFilt);hFilt.connect(hGain);hGain.connect(filter);
  hSrc.start(t0);
 }
 if(ctx.createStereoPanner){
  const panner=ctx.createStereoPanner();
  panner.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,pan)),t0);
  filter.connect(panner);panner.connect(env);
 }else{
  filter.connect(env);
 }
 env.connect(musicMaster);
 osc1.start(t0);osc2.start(t0);osc3.start(t0);
 osc1.stop(t0+dur+0.08);osc2.stop(t0+dur+0.08);osc3.stop(t0+dur+0.08);
}
// Instrument 2: Lush Analog Stereo Pad (Subwoofer Lullaby / Taswell warm cushion)
function playWarmPad(freq,dur=6.8,vel=0.058,delaySec=0,pan=0){
 const ctx=ensureAudio();if(!ctx||!musicActive)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime+delaySec;
 const osc1=ctx.createOscillator(),osc2=ctx.createOscillator(),oscSub=ctx.createOscillator();
 osc1.type='sawtooth';osc2.type='triangle';oscSub.type='sine';
 osc1.frequency.setValueAtTime(freq*0.9965,t0);
 osc2.frequency.setValueAtTime(freq*1.0035,t0);
 oscSub.frequency.setValueAtTime(freq*0.5,t0);
 const filter=ctx.createBiquadFilter();
 filter.type='lowpass';filter.Q.value=0.9;
 filter.frequency.setValueAtTime(220,t0);
 filter.frequency.exponentialRampToValueAtTime(680,t0+dur*0.42);
 filter.frequency.exponentialRampToValueAtTime(240,t0+dur);
 const gSaw=ctx.createGain(),gSub=ctx.createGain(),env=ctx.createGain();
 gSaw.gain.value=0.26;gSub.gain.value=0.45;
 env.gain.setValueAtTime(0.0001,t0);
 env.gain.linearRampToValueAtTime(vel,t0+1.35);
 env.gain.exponentialRampToValueAtTime(0.00015,t0+dur);
 osc1.connect(gSaw);gSaw.connect(filter);osc2.connect(filter);oscSub.connect(gSub);gSub.connect(filter);
 if(ctx.createStereoPanner){
  const panner=ctx.createStereoPanner();
  panner.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,pan)),t0);
  filter.connect(panner);panner.connect(env);
 }else{
  filter.connect(env);
 }
 env.connect(musicMaster);
 osc1.start(t0);osc2.start(t0);oscSub.start(t0);
 osc1.stop(t0+dur+0.1);osc2.stop(t0+dur+0.1);oscSub.stop(t0+dur+0.1);
}
// Instrument 3: C418 Aria Math / Dreiton Kalimba & Handpan Pluck (for walking arpeggios & mobile wind chimes)
function playKalimbaNote(freq,dur=2.4,vel=0.065,delaySec=0,pan=0){
 const ctx=ensureAudio();if(!ctx||!musicActive)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime+delaySec;
 const osc1=ctx.createOscillator(),osc2=ctx.createOscillator();
 osc1.type='sine';osc2.type='sine';
 osc1.frequency.setValueAtTime(freq,t0);
 osc2.frequency.setValueAtTime(freq*3.98,t0); // Metallic tine overtone
 const g2=ctx.createGain(),env=ctx.createGain();
 g2.gain.setValueAtTime(0.22,t0);
 g2.gain.exponentialRampToValueAtTime(0.001,t0+0.085);
 env.gain.setValueAtTime(0.0001,t0);
 env.gain.linearRampToValueAtTime(vel,t0+0.009);
 env.gain.exponentialRampToValueAtTime(0.00015,t0+dur);
 osc1.connect(env);osc2.connect(g2);g2.connect(env);
 if(ctx.createStereoPanner){
  const panner=ctx.createStereoPanner();
  panner.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,pan)),t0);
  env.connect(panner);panner.connect(musicMaster);
 }else{
  env.connect(musicMaster);
 }
 osc1.start(t0);osc2.start(t0);
 osc1.stop(t0+dur+0.05);osc2.stop(t0+dur+0.05);
}
// Nature Ambience 1: Multi-species Mediterranean Birdsong (Robin, Golden Oriole flute, Hoopoe "up-up-up")
function playBirdChirp(delaySec=0){
 const ctx=ensureAudio();if(!ctx||!musicActive)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime+delaySec;
 const species=Math.floor(Math.random()*3);
 const pan=(Math.random()-0.5)*1.3;
 if(species===0){
  // Golden Oriole (Oropéndola) warm fluted liquid call
  const motif=[1046.5,1318.5,1174.7,1568.0];
  motif.forEach((f,i)=>{
   const st=t0+i*0.14;
   const osc=ctx.createOscillator(),env=ctx.createGain();
   osc.type='sine';
   osc.frequency.setValueAtTime(f,st);
   osc.frequency.exponentialRampToValueAtTime(f*1.04,st+0.11);
   env.gain.setValueAtTime(0.0001,st);
   env.gain.linearRampToValueAtTime(0.018,st+0.025);
   env.gain.exponentialRampToValueAtTime(0.0001,st+0.13);
   osc.connect(env);env.connect(reverbBus||musicMaster);
   osc.start(st);osc.stop(st+0.14);
  });
 }else if(species===1){
  // Hoopoe (Abubilla) soft low "up-up-up" flute triplet
  for(let i=0;i<3;i++){
   const st=t0+i*0.15;
   const osc=ctx.createOscillator(),env=ctx.createGain();
   osc.type='sine';
   osc.frequency.setValueAtTime(545,st);
   osc.frequency.exponentialRampToValueAtTime(585,st+0.04);
   osc.frequency.exponentialRampToValueAtTime(520,st+0.11);
   env.gain.setValueAtTime(0.0001,st);
   env.gain.linearRampToValueAtTime(0.020,st+0.02);
   env.gain.exponentialRampToValueAtTime(0.0001,st+0.12);
   osc.connect(env);env.connect(reverbBus||musicMaster);
   osc.start(st);osc.stop(st+0.13);
  }
 }else{
  // European Robin / Blue Tit crystalline warble
  const notes=3+Math.floor(Math.random()*2);
  for(let i=0;i<notes;i++){
   const st=t0+i*0.13;
   const f1=1860+Math.random()*580,f2=f1*(1.16+Math.random()*0.14);
   const osc=ctx.createOscillator(),env=ctx.createGain();
   osc.type='sine';
   osc.frequency.setValueAtTime(f1,st);
   osc.frequency.exponentialRampToValueAtTime(f2,st+0.07);
   osc.frequency.exponentialRampToValueAtTime(f1*0.95,st+0.12);
   env.gain.setValueAtTime(0.0001,st);
   env.gain.linearRampToValueAtTime(0.017,st+0.018);
   env.gain.exponentialRampToValueAtTime(0.0001,st+0.125);
   if(ctx.createStereoPanner){
    const p=ctx.createStereoPanner();p.pan.value=Math.max(-0.85,Math.min(0.85,pan));
    osc.connect(env);env.connect(p);p.connect(reverbBus||musicMaster);
   }else{
    osc.connect(env);env.connect(reverbBus||musicMaster);
   }
   osc.start(st);osc.stop(st+0.14);
  }
 }
}
// Nature Ambience 2: Soft Mediterranean Night Cricket Stridulation
function playNightCricket(delaySec=0){
 const ctx=ensureAudio();if(!ctx||!musicActive)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime+delaySec;
 for(let p=0;p<4;p++){
  const st=t0+p*0.048;
  const osc=ctx.createOscillator(),env=ctx.createGain();
  osc.type='sine';
  osc.frequency.setValueAtTime(3950+(p%2)*60,st);
  env.gain.setValueAtTime(0.0001,st);
  env.gain.linearRampToValueAtTime(0.0065,st+0.008);
  env.gain.exponentialRampToValueAtTime(0.0001,st+0.036);
  osc.connect(env);env.connect(reverbBus||musicMaster);
  osc.start(st);osc.stop(st+0.04);
 }
}

// Composed C418 Suites with rich 9th/11th/13th voicings and melodic motifs
const DAY_SUITE=[
 {pad:[196.00,293.66],voicing:[246.94,293.66,392.00,493.88,587.33],melody:[783.99,739.99,587.33,493.88,587.33]}, // Gmaj9 (Sweden opening warmth)
 {pad:[185.00,293.66],voicing:[220.00,293.66,369.99,440.00,659.25],melody:[659.25,587.33,440.00,493.88,587.33]}, // Dadd9/F#
 {pad:[164.81,246.94],voicing:[196.00,246.94,329.63,392.00,587.33],melody:[587.33,659.25,783.99,659.25,493.88]}, // Em11
 {pad:[130.81,196.00],voicing:[196.00,246.94,329.63,392.00,493.88],melody:[493.88,587.33,659.25,587.33,392.00]}, // Cmaj9
 {pad:[196.00,293.66],voicing:[246.94,293.66,392.00,493.88,739.99],melody:[880.00,783.99,739.99,587.33,493.88]}, // Gmaj9/B (Wet Hands lyrical rise)
 {pad:[146.83,220.00],voicing:[220.00,293.66,369.99,440.00,587.33],melody:[659.25,739.99,880.00,739.99,587.33]}, // D6/9
 {pad:[110.00,164.81],voicing:[196.00,246.94,329.63,392.00,493.88],melody:[587.33,523.25,493.88,392.00,440.00]}, // Am9
 {pad:[130.81,196.00],voicing:[196.00,293.66,369.99,493.88,587.33],melody:[739.99,659.25,587.33,493.88,440.00]}  // Cmaj9#11
];
const SUNSET_SUITE=[
 {pad:[174.61,261.63],voicing:[220.00,261.63,329.63,392.00,523.25],melody:[659.25,587.33,523.25,440.00,523.25]}, // Fmaj9 (Mice on Venus golden hour)
 {pad:[164.81,246.94],voicing:[196.00,246.94,293.66,392.00,587.33],melody:[587.33,523.25,493.88,392.00,440.00]}, // Em7
 {pad:[146.83,220.00],voicing:[220.00,261.63,329.63,440.00,523.25],melody:[523.25,587.33,659.25,523.25,440.00]}, // Dm9
 {pad:[116.54,174.61],voicing:[220.00,261.63,293.66,392.00,523.25],melody:[587.33,659.25,783.99,659.25,523.25]}  // Bbmaj9#11
];
const NIGHT_SUITE=[
 {pad:[110.00,164.81],voicing:[196.00,246.94,261.63,329.63,493.88],melody:[659.25,587.33,523.25,493.88,392.00]}, // Am9 (Subwoofer Lullaby starry night)
 {pad:[174.61,261.63],voicing:[220.00,261.63,329.63,493.88,659.25],melody:[783.99,659.25,587.33,523.25,440.00]}, // Fmaj7#11
 {pad:[130.81,196.00],voicing:[196.00,246.94,329.63,392.00,587.33],melody:[659.25,783.99,880.00,783.99,587.33]}, // Cmaj9/G
 {pad:[146.83,220.00],voicing:[220.00,261.63,329.63,392.00,523.25],melody:[587.33,523.25,440.00,392.00,329.63]}  // Dm9
];
let chordIndex=0;
function getActiveSuite(){
 const b=world?.skySystem?.blend??(timeOfDayMode==='night'?1:timeOfDayMode==='sunset'?0.5:0);
 return b>0.68?NIGHT_SUITE:b>0.28?SUNSET_SUITE:DAY_SUITE;
}
// Instrument 6: Breathy Wooden Flute / Ocarina (Haggstrom / stal lyrical woodwind)
function playWoodenFlute(freq,dur=2.8,vel=0.042,delaySec=0,pan=0){
 const ctx=ensureAudio();if(!ctx||!musicActive)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime+delaySec;
 const osc=ctx.createOscillator(),vib=ctx.createOscillator(),vibG=ctx.createGain();
 osc.type='triangle';
 osc.frequency.setValueAtTime(freq,t0);
 vib.frequency.value=4.8;vibG.gain.value=freq*0.0065;
 vib.connect(vibG);vibG.connect(osc.frequency);
 const filt=ctx.createBiquadFilter();
 filt.type='lowpass';filt.frequency.value=freq*2.3;
 const env=ctx.createGain();
 env.gain.setValueAtTime(0.0001,t0);
 env.gain.linearRampToValueAtTime(vel,t0+0.18);
 env.gain.exponentialRampToValueAtTime(vel*0.65,t0+dur*0.65);
 env.gain.exponentialRampToValueAtTime(0.00015,t0+dur);
 osc.connect(filt);
 if(hammerBuf){
  const chiff=ctx.createBufferSource(),cFilt=ctx.createBiquadFilter(),cG=ctx.createGain();
  chiff.buffer=hammerBuf;
  cFilt.type='bandpass';cFilt.frequency.value=freq*2.0;cFilt.Q.value=2.5;
  cG.gain.value=vel*0.18;
  chiff.connect(cFilt);cFilt.connect(cG);cG.connect(filt);
  chiff.start(t0);
 }
 if(ctx.createStereoPanner){
  const p=ctx.createStereoPanner();p.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,pan)),t0);
  filt.connect(p);p.connect(env);
 }else{
  filt.connect(env);
 }
 env.connect(reverbBus||musicMaster);
 osc.start(t0);vib.start(t0);
 osc.stop(t0+dur+0.08);vib.stop(t0+dur+0.08);
}
// Instrument 7: Acoustic Harp / Guitar Harmonic Pluck (Taswell / Aria Math shimmer)
function playHarpHarmonic(freq,dur=3.4,vel=0.052,delaySec=0,pan=0){
 const ctx=ensureAudio();if(!ctx||!musicActive)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime+delaySec;
 const o1=ctx.createOscillator(),o2=ctx.createOscillator();
 o1.type='triangle';o2.type='sine';
 o1.frequency.setValueAtTime(freq,t0);
 o2.frequency.setValueAtTime(freq*2.0,t0);
 const filt=ctx.createBiquadFilter();
 filt.type='lowpass';
 filt.frequency.setValueAtTime(freq*4.2,t0);
 filt.frequency.exponentialRampToValueAtTime(freq*1.2,t0+dur);
 const g2=ctx.createGain(),env=ctx.createGain();
 g2.gain.value=0.38;
 env.gain.setValueAtTime(0.0001,t0);
 env.gain.linearRampToValueAtTime(vel,t0+0.014);
 env.gain.exponentialRampToValueAtTime(0.00015,t0+dur);
 o1.connect(filt);o2.connect(g2);g2.connect(filt);
 if(ctx.createStereoPanner){
  const p=ctx.createStereoPanner();p.pan.setValueAtTime(Math.max(-0.85,Math.min(0.85,pan)),t0);
  filt.connect(p);p.connect(env);
 }else{
  filt.connect(env);
 }
 env.connect(musicMaster);
 o1.start(t0);o2.start(t0);
 o1.stop(t0+dur+0.06);o2.stop(t0+dur+0.06);
}
// Nature Ambience 3: Distant Nocturnal Mediterranean Scops Owl ("Autillo" · Otus scops)
function playOwlCall(delaySec=0){
 const ctx=ensureAudio();if(!ctx||!musicActive)return;
 if(ctx.state==='suspended')ctx.resume();
 const t0=ctx.currentTime+delaySec;
 const osc=ctx.createOscillator(),env=ctx.createGain();
 osc.type='sine';
 osc.frequency.setValueAtTime(695,t0);
 osc.frequency.exponentialRampToValueAtTime(662,t0+0.26);
 env.gain.setValueAtTime(0.0001,t0);
 env.gain.linearRampToValueAtTime(0.015,t0+0.045);
 env.gain.exponentialRampToValueAtTime(0.0001,t0+0.28);
 osc.connect(env);env.connect(reverbBus||musicMaster);
 osc.start(t0);osc.stop(t0+0.30);
}
// Material-Specific Acoustic Signature for each Mobile Sculpture
function playMobileMaterialChime(work,intensity=1.0){
 if(!musicActive)return;
 const suite=getActiveSuite();
 const step=suite[chordIndex%suite.length];
 const id=work?.id||'';
 if(id==='mov033'){
  // Blown blue glass bottles: resonant glass flute + crystalline celesta harmonics
  playWoodenFlute(step.melody[0],2.4,0.042*intensity,0,-0.25);
  for(let i=0;i<4;i++)playCelestaBell(step.voicing[i%step.voicing.length]*2,3.0,0.036*intensity,i*0.09,(i-1.5)*0.3);
 }else if(['mov022','mov023','mov017','mov032'].includes(id)){
  // Woven baskets, wood strips & foam frames: warm woody kalimba/marimba + flute
  for(let i=0;i<4;i++)playKalimbaNote(step.voicing[i%step.voicing.length]*2,2.4,0.054*intensity,i*0.085,(i-1.5)*0.3);
  playWoodenFlute(step.melody[1]||step.melody[0],2.2,0.034*intensity,0.18,0.2);
 }else{
  // Polychrome wire & metal mobiles: harp harmonics + celesta bell + felt piano
  for(let i=0;i<4;i++)playHarpHarmonic(step.voicing[i%step.voicing.length]*(i>=2?2:1),2.8,0.045*intensity,i*0.088,(i-1.5)*0.3);
  playCelestaBell(step.melody[0]*2,3.0,0.030*intensity,0.24,0.3);
 }
}
function triggerMusicChime(intensity=1.0){
 if(!musicActive)return;
 const suite=getActiveSuite();
 const step=suite[chordIndex%suite.length];
 // Harp / Kalimba + Crystalline Celesta harmonic cascade tuned to the active chord
 for(let i=0;i<5;i++){
  const f=step.voicing[i%step.voicing.length]*(i>=3?2:1);
  playKalimbaNote(f,2.5,0.048*intensity,i*0.092,(i-2)*0.30);
  if(i===1||i===3)playHarpHarmonic(f,2.8,0.036*intensity,i*0.092+0.02,(i-2)*0.25);
  if(i===2||i===4)playCelestaBell(f*2,3.0,0.028*intensity,i*0.092+0.04,(2-i)*0.32);
 }
}
function scheduleAmbientPhrase(){
 if(!musicActive)return;
 const suite=getActiveSuite();
 const step=suite[chordIndex%suite.length];
 chordIndex++;
 const b=world?.skySystem?.blend??(timeOfDayMode==='night'?1:0);

 // 1. Deep, warm C418 analog pad cushion (Root & Fifth) + Acoustic Sub-Bass
 playWarmBass(step.pad[0],5.8,0.052,0);
 playWarmPad(step.pad[0],6.8,0.055,0,-0.25);
 playWarmPad(step.pad[1],6.2,0.042,0.18,0.25);
 if(Math.random()<0.7)playCelestaBell(step.melody[0]*2,3.4,0.030,1.65,0.42);
 if(Math.random()<0.55)playWoodenFlute(step.melody[2]||step.melody[0],3.1,0.032,2.15,-0.32);

 // 2. Soft rolled felt-piano chord voicing + Acoustic Harp Harmonic
 step.voicing.slice(0,3).forEach((vf,vi)=>{
  playFeltPiano(vf,4.6,0.056+vi*0.008,0.12+vi*0.14,(vi-1)*0.28);
 });
 playHarpHarmonic(step.voicing[2]*2,3.4,0.038,0.45,0.28);

 // 3. Composed lyrical right-hand felt-piano melody motif with expressive rubato timing
 let cursor=0.85;
 const motifLen=3+Math.floor(Math.random()*3);
 for(let i=0;i<motifLen;i++){
  const mf=step.melody[i%step.melody.length];
  const pan=(i%2===0?0.35:-0.35)*(0.5+Math.random()*0.5);
  playFeltPiano(mf,3.8+Math.random()*1.2,0.082+Math.random()*0.026,cursor,pan);
  cursor+=0.78+Math.random()*0.42;
 }

 // 4. Interactive Aria Math / Dreiton Kalimba counter-arpeggio when walking, touring, or in Animática mode!
 const isMoving=(state.time-state.movingAt)<1.0||!!state.walkTarget||touring||cinematicActive;
 if(isMoving){
  for(let k=0;k<4;k++){
   const kf=step.voicing[(k+1)%step.voicing.length]*2;
   playKalimbaNote(kf,2.1,0.036,0.55+k*0.48,(k-1.5)*0.38);
  }
 }

 // 5. Living Garden Acoustic Soundscape: Birdsong by day/sunset, crickets, owl & celesta stars by night
 if(activeSpace==='garden'){
  if(b<0.65){
   if(Math.random()<0.82)playBirdChirp(1.1+Math.random()*1.6);
   if(Math.random()<0.45)playBirdChirp(3.2+Math.random()*1.2);
  }else{
   if(Math.random()<0.78)playNightCricket(0.9+Math.random()*1.4);
   if(Math.random()<0.48)playOwlCall(2.4+Math.random()*1.5);
   if(Math.random()<0.65)playKalimbaNote(step.melody[0]*2,3.4,0.028,2.2,0.45);
  }
 }

 musicTimer=setTimeout(scheduleAmbientPhrase,b>0.65?5400:4800);
}
function toggleAmbientMusic(force){
 musicActive=typeof force==='boolean'?force:!musicActive;
 if($('music-btn'))$('music-btn').setAttribute('aria-pressed',String(musicActive));
 if($('music-icon'))$('music-icon').textContent='';
 if($('music-label'))$('music-label').textContent=musicActive?'Sonido activo':'Sonido ambiental';
 if($('quick-music-btn'))$('quick-music-btn').setAttribute('aria-pressed',String(musicActive));
 if($('quick-music-label'))$('quick-music-label').textContent=musicActive?'Música activa':'Música';
 if($('entry-music-toggle')){$('entry-music-toggle').setAttribute('aria-pressed',String(musicActive));$('entry-music-toggle').textContent=musicActive?'♪ Música activa':'♪ Activar música';}
 clearTimeout(musicTimer);
 if(musicActive){
  ensureAudio();
  if(audioCtx&&audioCtx.state==='suspended')audioCtx.resume();
  scheduleAmbientPhrase();
  announce('Sonido ambiental activado.');
 }else{
  if(windGainNode&&audioCtx)windGainNode.gain.setTargetAtTime(0.0001,audioCtx.currentTime,0.2);
  announce('Sonido ambiental pausado.');
 }
}
if($('music-btn'))$('music-btn').onclick=()=>toggleAmbientMusic();
if($('quick-music-btn'))$('quick-music-btn').onclick=()=>toggleAmbientMusic();
if($('entry-music-toggle'))$('entry-music-toggle').onclick=()=>toggleAmbientMusic();

// Director-Grade Animática Cinemática Controller (button #cinematic-btn or key C)
const SPACE_ORDER=['gallery','garden','paintings','drawings','organic','curvos','mobiles'];
const SPACE_CINEMATIC_NAMES={
 gallery:'SALA 01 · GALERÍA BLANCA',
 garden:'SALA 02 · JARDÍN DE LAS LAGARTIJAS',
 paintings:'SALA 03 · SALA DE PINTURA',
 drawings:'SALA 04 · SALA DE DIBUJO',
 organic:'SALA 05 · FORMAS ORGÁNICAS',
 curvos:'SALA 06 · PLANOS CURVOS',
 mobiles:'SALA 07 · MIRADOR DE MÓVILES 3D'
};
const CINEMATIC_PLANS={
 gallery:[
  {shot:'establishing',lens:'28MM · GRÚA PANORÁMICA',sub:'Travelling de apertura bajo los lucernarios cenitales hacia el móvil «Rosa en suspensión» y la nave escultórica'},
  {shot:'orbit',lens:'50MM · ÓRBITA ESCULTÓRICA 360°',sub:'Rodeando en 360° los ensamblajes en hierro, madera y objetos encontrados sobre plintos de travertino (ESC-037 · ESC-055)'},
  {shot:'orbit',lens:'50MM · ÓRBITA DE DETALLE',sub:'Engranajes, ruedas dentadas y espirales forjadas que transforman el hierro industrial en ritmo escultórico (ESC-041 · ESC-043)'},
  {shot:'closeup',lens:'65MM · PRIMER PLANO EN VITRINA',sub:'Acercamiento a los relieves de planos recortados: capas de madera calada que esculpen con la sombra (ESC-001 · ESC-004)'},
  {shot:'dolly',lens:'40MM · TRAVELLING DE MURO',sub:'Recorrido paralelo frente a los 11 relieves y ensamblajes murales de hierro, madera y pátina cálida (ESC-016 · ESC-046)'},
  {shot:'closeup',lens:'65MM · LUZ RASANTE DE ESTUDIO',sub:'Textura, huella e incisión matérica bajo la iluminación bañadora de las vitrinas del muro Este (ESC-024 · ESC-029)'},
  {shot:'dolly',lens:'35MM · PLANO DE ARQUITECTURA Y ENTORNO',sub:'Las seis intervenciones escultóricas en diálogo con el pórtico acristalado del vestíbulo Sur (ESC-047 · ESC-052)'}
 ],
 garden:[
  {shot:'establishing',lens:'28MM · STEADICAM EXTERIOR',sub:'Entrada Este por el Camino de la Acequia Real bajo los almendros en flor y el móvil de tapones multicolores (MOV-028)'},
  {shot:'dolly',lens:'35MM · GRÚA HACIA EL TALLER',sub:'El Pabellón-Taller de madera rehabilitado con teja árabe, contraventanas mallorquinas y las flores giratorias de la pérgola (MOV-025)'},
  {shot:'orbit',lens:'50MM · ÓRBITA ENTRE RAMAS',sub:'Diálogo al aire libre entre las tiras policromadas del Almendro en V (MOV-017) y los marcos geométricos del Árbol de Espuma (MOV-032)'},
  {shot:'zenith',lens:'32MM · CONTRAPICADO BAJO LA COPA',sub:'Danza cinética bajo las ramas centenarias del Gran Algarrobo: tubos entrelazados, aro azul cobalto y cilindros en el viento (MOV-016 · MOV-019 · MOV-018)'},
  {shot:'zenith',lens:'40MM · CONTRAPICADO VERTICAL',sub:'Ascenso visual junto al Pino Alto donde oscilan las cestas caladas con pompones (MOV-022) frente a las chumberas y pitas del Oeste'},
  {shot:'orbit',lens:'50MM · ÓRBITA DE LUZ Y VIDRIO',sub:'El Claro Central: destellos del sol mediterráneo atravesando las 20 botellas de vidrio azul cobalto (MOV-033) junto a los juncos rojos'},
  {shot:'establishing',lens:'35MM · PANORÁMICA DEL BANCAL',sub:'El muro de mampostería en piedra seca con musgo, la alberca con agua viva y las cestas tejidas en el olivo del Este (MOV-023)'}
 ],
 paintings:[
  {shot:'establishing',lens:'28MM · GRÚA DE GRAN SALÓN',sub:'Apertura sobre el parqué de roble europeo en espiga hacia el panel inaugural de la Serie Arcas (PIN-001 · PIN-062)'},
  {shot:'closeup',lens:'65MM · PRIMER PLANO PICTÓRICO',sub:'Caligrafía plástica, grafismos y signos suspendidos bajo la luz cálida de los apliques de latón en el muro Sur (PIN-053 · PIN-055)'},
  {shot:'dolly',lens:'40MM · TRAVELLING LATERAL',sub:'Serie Tauromaquia: el movimiento del ruedo, la embestida del color y la tensión dramática del trazo (PIN-020 · PIN-078)'},
  {shot:'closeup',lens:'60MM · ENCUADRE NARRATIVO',sub:'Serie Relatos e iconografía: composiciones corales y escenas simbólicas sobre lienzo en caja americana (PIN-065 · PIN-079)'},
  {shot:'dolly',lens:'40MM · TRAVELLING CENTRAL',sub:'Serie Figuras y símbolos: la síntesis del cuerpo humano y el contraste cromático en el corazón del salón (PIN-002 · PIN-073)'},
  {shot:'closeup',lens:'65MM · RETRATO EN PRIMER PLANO',sub:'Serie Rostros y personajes: 16 miradas expresionistas e imaginarias alineadas a lo largo de la galería Este (PIN-015 · PIN-080)'},
  {shot:'dolly',lens:'45MM · TRAVELLING NOCTURNO',sub:'Serie Gatos: siluetas felinas, misterio, texturas matéricas y miradas encendidas en el ala Noroeste (PIN-003 · PIN-064)'},
  {shot:'closeup',lens:'60MM · DETALLE DE MATERIA Y COLOR',sub:'Serie Abstracciones: ritmo libre, empaste pictórico y arquitectura del color no figurativo (PIN-041 · PIN-048)'},
  {shot:'establishing',lens:'32MM · GRAN ANGULAR DE HORIZONTE',sub:'Frente monumental del muro Norte coronado por los grandes lienzos abstractos del archivo (PIN-049 · PIN-058)'}
 ],
 drawings:[
  {shot:'establishing',lens:'28MM · GRÚA DE GABINETE',sub:'Perspectiva longitudinal de 84 metros sobre parqué de roble hacia los paneles de la serie «Dibujo y espacio» (DIB-034)'},
  {shot:'closeup',lens:'65MM · DETALLE SOBRE PAPEL',sub:'Serie Figuras y símbolos: la pureza del trazo y la síntesis icónica enmarcadas con paspartú de algodón biselado (DIB-001 · DIB-032)'},
  {shot:'dolly',lens:'45MM · TRAVELLING CÁLIDO',sub:'Vibración de rojos, tierras y ocres que construyen volumen y atmósfera sobre la textura verjurada del papel (DIB-002 · DIB-006)'},
  {shot:'closeup',lens:'65MM · PRIMER PLANO DE TRAZO',sub:'Geometrías sensibles, líneas en tensión y respiración del blanco del papel bajo cristal antirreflejo (DIB-007 · DIB-015)'},
  {shot:'dolly',lens:'40MM · STEADICAM ENTRE PANELES',sub:'Encuentros de líneas azules, rojas y amarillas en el pabellón central de la sala (DIB-038 · DIB-045)'},
  {shot:'closeup',lens:'60MM · ENCUADRE DE TRAMAS',sub:'Ritmos grises, planos superpuestos y diagonales que sugieren profundidad arquitectónica (DIB-024 · DIB-033)'},
  {shot:'establishing',lens:'35MM · CIERRE PANORÁMICO',sub:'El Horizonte de Papel en la cabecera Norte: 53 obras originales reunidas en silencio y luz cenital (DIB-050 · DIB-053)'}
 ],
 organic:[
  {shot:'establishing',lens:'28MM · GRÚA ESCULTÓRICA',sub:'Entrada al salón de Formas Orgánicas: ocho tótems y volúmenes tallados en diálogo con la luz cenital'},
  {shot:'orbit',lens:'50MM · ÓRBITA 360° EN VOLUMEN',sub:'La veta viva de la madera y la ondulación continua al rodear la escultura sobre su plinto de travertino (ESC-008 · ESC-009)'},
  {shot:'closeup',lens:'65MM · ACERCAMIENTO A LA MATERIA',sub:'Talla directa, calidez orgánica y pulimento natural que invitan a contemplar cada giro de la fibra (ESC-009)'},
  {shot:'orbit',lens:'50MM · ÓRBITA DE LUZ Y HUECO',sub:'El vacío interior como materia escultórica: aberturas que dejan pasar el aire y la luz del salón (ESC-010 · ESC-011)'},
  {shot:'orbit',lens:'45MM · CONTRAPICADO ESCULTÓRICO',sub:'Verticalidad orgánica y equilibrio ascendente en las piezas centrales de la nave (ESC-013 · ESC-014)'},
  {shot:'orbit',lens:'50MM · ÓRBITA DE CIERRE',sub:'Cavidades profundas, nudos y raíces naturales transformados en presencia monumental en 360° (ESC-015 · ESC-038)'}
 ],
 curvos:[
  {shot:'establishing',lens:'28MM · GRÚA DE NAVE CENTRAL',sub:'Doce esculturas de hierro forjado y piedra desplegadas en simetría bajo los pórticos de luz cenital'},
  {shot:'orbit',lens:'50MM · ÓRBITA 360° DE PERFILES',sub:'Aberturas verticales y planos plegados que cambian radicalmente de silueta al rodearlos (ESC-005 · ESC-006)'},
  {shot:'orbit',lens:'50MM · ÓRBITA ENVOLVENTE',sub:'Chapa curvada, pátina de forja y espacio interior abrazado por el metal (ESC-007 · ESC-012)'},
  {shot:'zenith',lens:'40MM · CONTRAPICADO ASCENDENTE',sub:'Curvas ascendentes que desafían la gravedad del hierro con la ligereza de una cinta en el aire (ESC-031 · ESC-032)'},
  {shot:'orbit',lens:'50MM · ÓRBITA DE LAZOS Y HUECOS',sub:'Lazos continuos y oquedades donde la sombra dibuja una segunda escultura sobre el pedestal (ESC-033 · ESC-034)'},
  {shot:'closeup',lens:'65MM · PRIMER PLANO DE ESPIRAL',sub:'Contornos ovalados, aristas vivas y tensión geométrica en primer plano cinematográfico (ESC-035 · ESC-036)'},
  {shot:'orbit',lens:'50MM · ÓRBITA FINAL 360°',sub:'Planos dobles y ondulación rítmica en el cierre monumental de la galería Norte (ESC-044 · ESC-053)'}
 ],
 mobiles:[
  {shot:'establishing',lens:'28MM · GRÚA TRIDIMENSIONAL',sub:'El Mirador del Aire: 33 móviles reales suspendidos en tres niveles arquitectónicos (0.0m, +1.70m y +3.20m)'},
  {shot:'zenith',lens:'32MM · CONTRAPICADO CENITAL ↑',sub:'Mirada vertical desde el suelo de travertino hacia las constelaciones en danza bajo los lucernarios (MOV-025 · MOV-029)'},
  {shot:'dolly',lens:'45MM · TRAVELLING EN TERRAZA (+1.7M)',sub:'Cara a cara con los móviles de la Terraza Oeste: equilibrio de pesos, alambres y contrapesos (MOV-011 · MOV-014)'},
  {shot:'orbit',lens:'50MM · ÓRBITA AÉREA (+1.7M)',sub:'Terraza Este: el giro pausado de las piezas policromadas impulsadas por las corrientes de la sala (MOV-018 · MOV-021)'},
  {shot:'establishing',lens:'35MM · GRÚA EN LA PASARELA (+3.2M)',sub:'Caminando por el cielo de la sala en la Gran Pasarela Aérea Central entre las coronas altas (MOV-006 · MOV-007)'},
  {shot:'closeup',lens:'60MM · PRIMER PLANO EN SUSPENSIÓN',sub:'Coronación Norte a +3.20m de altura: filigrana en el aire y reflejos de luz sobre cada plano móvil (MOV-010)'},
  {shot:'zenith',lens:'30MM · ESPIRAL CENITAL DE CIERRE',sub:'Rotonda Norte: giro ascendente bajo la gran constelación suspendida en el corazón del museo (MOV-033)'}
 ]
};
function getCinematicShotMeta(spaceId,idx){
 if(cinematicMode==='works'){
  const w=getCurrentCinematicWork();
  if(w){
   const m=idx%3;
   if(w.kind==='sculpture'){
    const shot=m===0?'orbit':m===1?'spiral':'low-orbit';
    const lens=m===0?'50MM · ÓRBITA ESCULTÓRICA 360°':m===1?'60MM · ESPIRAL DE MATERIA Y VOLUMEN':'42MM · CONTRAPICADO ESCULTÓRICO';
    return {shot,lens,sub:w.description||'Escultura original del archivo de Enric Segarra vinculada con su ficha del catálogo web.'};
   }
   if(w.kind==='mobile'){
    const shot=m===0?'orbit':m===1?'zenith':'spiral';
    const lens=m===0?'48MM · DANZA CINÉTICA EN EL AIRE':m===1?'32MM · ESPIRAL CENITAL BAJO EL MÓVIL':'55MM · ACERCAMIENTO EN SUSPENSIÓN';
    return {shot,lens,sub:w.description||'Móvil suspendido del archivo de Enric Segarra en equilibrio con las corrientes de la sala.'};
   }
   const shot=m===0?'closeup':m===1?'dolly':'reveal';
   const lens=m===0?'60MM · ACERCAMIENTO CONTEMPLATIVO':m===1?'45MM · TRAVELLING PARALELO DE GALERÍA':'52MM · REVELACIÓN DIAGONAL DE ESTUDIO';
   return {shot,lens,sub:w.description||'Obra original del archivo de Enric Segarra vinculada directamente con su ficha del catálogo web.'};
  }
 }
 const list=CINEMATIC_PLANS[spaceId]||CINEMATIC_PLANS.gallery;
 return list[idx%list.length]||{shot:'orbit',lens:'35MM · STEADICAM',sub:'Cámara orbital suave · Música C418 sincronizada · Pulsa C o Esc para salir'};
}
let hudFadeTimer=0;
function updateCinematicHUD(immediate=false){
 if(!world||!$('cinematic-hud'))return;
 const works=getRoomNavigableWorks();
 const isWorks=cinematicMode==='works'&&works.length>0;
 const idx=isWorks?((currentWorkIdx+works.length)%works.length):currentStop;
 const totalCount=isWorks?works.length:(world.stops.length||1);
 const total=String(totalCount).padStart(2,'0');
 const cur=String(idx+1).padStart(2,'0');
 const meta=getCinematicShotMeta(activeSpace,idx);
 const spaceLabel=SPACE_CINEMATIC_NAMES[activeSpace]||'EXPOSICIÓN 3D';
 const wObj=getCurrentCinematicWork();
 const s=world.stops[currentStop];
 const applyHUDContent=()=>{
  if($('cinematic-tag'))$('cinematic-tag').textContent=`${cur} / ${total}`;
  if($('cinematic-title'))$('cinematic-title').textContent=isWorks&&wObj?`${wObj.code} · ${wObj.title}`:(s?s.title:spaceLabel);
  if($('cinematic-sub'))$('cinematic-sub').textContent=meta.sub;
  if($('cinematic-lens'))$('cinematic-lens').textContent=meta.lens;
  if($('cin-mode')){
   $('cin-mode').setAttribute('aria-pressed',String(isWorks));
   $('cin-mode').textContent=isWorks?'Modo: Obra a obra':'Modo: Planos de sala';
  }
  if($('cin-bottom-web')){
   if(wObj&&wObj.catalogId){$('cin-bottom-web').hidden=false;$('cin-bottom-web').href=catalogUrl(wObj);}
   else $('cin-bottom-web').hidden=true;
  }
  if($('cinematic-work-card')){
   if(wObj){
    $('cinematic-work-card').hidden=false;
    if($('cin-work-thumb')){
     const thumbSrc=wObj.views?.[wObj.viewIndex||0]?.src||wObj.image;
     swapImgSmooth($('cin-work-thumb'),thumbSrc,wObj.title);
    }
    if($('cin-work-code'))$('cin-work-code').textContent=`${kindLabel(wObj.kind)} · ${wObj.code}${wObj.series?' · '+wObj.series:''}`;
    if($('cin-work-title'))$('cin-work-title').textContent=wObj.title;
    if($('cin-web-link'))$('cin-web-link').href=catalogUrl(wObj);
    if($('cin-series-link')){
     const hasSer=Boolean(wObj.series);
     $('cin-series-link').hidden=!hasSer;
     if(hasSer)$('cin-series-link').href=seriesWebUrl(wObj);
    }
   }else{
    $('cinematic-work-card').hidden=true;
   }
  }
  notifyParentState();
 };
 clearTimeout(hudFadeTimer);
 if(immediate||reduced.matches||!$('cinematic-meta')){
  $('cinematic-meta')?.classList.remove('shot-fade');
  $('cinematic-work-card')?.classList.remove('card-fade');
  applyHUDContent();
 }else{
  $('cinematic-meta').classList.add('shot-fade');
  $('cinematic-work-card')?.classList.add('card-fade');
  hudFadeTimer=setTimeout(()=>{
   applyHUDContent();
   requestAnimationFrame(()=>{
    $('cinematic-meta')?.classList.remove('shot-fade');
    $('cinematic-work-card')?.classList.remove('card-fade');
   });
  },185);
 }
}
function triggerCinematicShotCue(){
 if(!world)return;
 const wObj=getCurrentCinematicWork();
 if(wObj&&wObj.kind==='mobile'){
  wObj.awakened=true;
  wObj.spin=Math.max(wObj.spin||0,1.45);
  world.windImpulse=Math.max(world.windImpulse||0,1.05);
  playMobileMaterialChime(wObj,0.92);
 }else{
  if(activeSpace==='garden'||activeSpace==='mobiles')world.windImpulse=Math.max(world.windImpulse||0,0.75);
  triggerMusicChime(0.82);
 }
}
function getCinematicPoseAt(uNorm,wObj,s,idx){
 if(!world||!THREE)return null;
 const works=getRoomNavigableWorks();
 const isWorks=cinematicMode==='works'&&works.length>0;
 if(!(isWorks&&wObj)&&!s)return null;
 const meta=getCinematicShotMeta(activeSpace,idx);
 const basePos=isWorks&&wObj?getWorkStandPosition(wObj):new THREE.Vector3(...s.pos);
 const baseLook=(wObj&&wObj.center)?wObj.center.clone():new THREE.Vector3(...s.look);
 const fwdVec=new THREE.Vector3(baseLook.x-basePos.x,0,baseLook.z-basePos.z);
 if(fwdVec.lengthSq()<0.001)fwdVec.set(0,0,-1);else fwdVec.normalize();
 const rightVec=new THREE.Vector3(-fwdVec.z,0,fwdVec.x);
 const distToWork=Math.max(1.8,Math.hypot(baseLook.x-basePos.x,baseLook.z-basePos.z));
 const u=THREE.MathUtils.clamp(uNorm,0,1);
 // Blended constant-drift + cosine curve: non-zero velocity at endpoints so camera never freezes
 const e=0.42*u+0.58*(0.5-0.5*Math.cos(Math.PI*u));
 const dir=(idx%2===0)?1:-1;
 const desired=basePos.clone();
 const lookTarget=baseLook.clone();
 let craneLift=0,targetFov=50;
 if(meta.shot==='orbit'){
  targetFov=48;
  const orbitR=Math.max(1.9,Math.min(3.85,distToWork*0.90));
  const baseAng=Math.atan2(basePos.x-baseLook.x,basePos.z-baseLook.z);
  const arcSpan=isWorks&&wObj&&(wObj.kind==='sculpture'||wObj.kind==='mobile')?1.65:0.86;
  const arcAng=baseAng+dir*(-arcSpan*0.48+e*arcSpan);
  desired.set(baseLook.x+Math.sin(arcAng)*orbitR,basePos.y,baseLook.z+Math.cos(arcAng)*orbitR);
  craneLift=-0.08+e*0.18;
  lookTarget.y+=-0.03+e*0.07;
 }else if(meta.shot==='spiral'){
  targetFov=45;
  const startR=Math.max(2.05,Math.min(4.0,distToWork*1.04));
  const endR=Math.max(1.55,Math.min(2.85,distToWork*0.72));
  const orbitR=THREE.MathUtils.lerp(startR,endR,e);
  const baseAng=Math.atan2(basePos.x-baseLook.x,basePos.z-baseLook.z);
  const arcAng=baseAng+dir*(-0.62+e*1.24);
  desired.set(baseLook.x+Math.sin(arcAng)*orbitR,basePos.y,baseLook.z+Math.cos(arcAng)*orbitR);
  craneLift=-0.05+e*0.14;
  lookTarget.y+=-0.02+e*0.08;
 }else if(meta.shot==='low-orbit'){
  targetFov=46;
  const orbitR=Math.max(1.85,Math.min(3.6,distToWork*0.86));
  const baseAng=Math.atan2(basePos.x-baseLook.x,basePos.z-baseLook.z);
  const arcAng=baseAng+dir*(-0.58+e*1.16);
  desired.set(baseLook.x+Math.sin(arcAng)*orbitR,basePos.y,baseLook.z+Math.cos(arcAng)*orbitR);
  craneLift=-0.24+e*0.26;
  lookTarget.y+=0.08-e*0.05;
 }else if(meta.shot==='closeup'){
  targetFov=44;
  const pushAmt=Math.min(distToWork*0.36,0.12+e*0.68);
  const latScan=dir*(-0.24+e*0.48);
  const vertScan=-0.05+e*0.10;
  desired.addScaledVector(fwdVec,pushAmt).addScaledVector(rightVec,latScan);
  craneLift=vertScan*0.75;
  lookTarget.addScaledVector(rightVec,latScan*0.26);
  lookTarget.y+=vertScan*0.52;
 }else if(meta.shot==='reveal'){
  targetFov=47;
  const pushAmt=Math.min(distToWork*0.32,0.06+e*0.56);
  const latArc=dir*(1-e)*0.68;
  desired.addScaledVector(fwdVec,pushAmt).addScaledVector(rightVec,latArc);
  craneLift=-0.06+e*0.08;
  lookTarget.addScaledVector(rightVec,latArc*0.15);
 }else if(meta.shot==='zenith'){
  targetFov=54;
  const pushAmt=Math.min(distToWork*0.38,0.38+e*0.44);
  const swirl=dir*(-0.42+e*0.84);
  desired.addScaledVector(fwdVec,pushAmt).addScaledVector(rightVec,swirl);
  craneLift=-0.28+e*0.18;
  lookTarget.y+=0.28+e*0.16;
 }else if(meta.shot==='dolly'){
  targetFov=48;
  const latTrack=dir*(-0.72+e*1.44);
  const fwdWave=0.06+Math.sin(u*Math.PI)*0.22;
  desired.addScaledVector(rightVec,latTrack).addScaledVector(fwdVec,fwdWave);
  craneLift=-0.04+e*0.09;
  lookTarget.addScaledVector(rightVec,latTrack*0.34);
 }else{
  targetFov=54;
  const sway=dir*(-0.68+e*1.36);
  const dolly=-0.12+e*0.58;
  desired.addScaledVector(rightVec,sway).addScaledVector(fwdVec,dolly);
  craneLift=0.24-e*0.14;
  lookTarget.addScaledVector(rightVec,sway*0.22);
 }
 validPosition(desired);
 const gy=world.heightAt?world.heightAt(desired.x,desired.z):0;
 desired.y=Math.max(gy+0.92,gy+1.72+craneLift);
 const roll=Math.sin(u*Math.PI)*dir*0.008;
 return {pos:desired,look:lookTarget,fov:targetFov,roll};
}
function flyToCinematicWork(wObj){
 if(!wObj||!world||!camera)return;
 tourTimer=0;
 const pose0=getCinematicPoseAt(0,wObj,world.stops[currentStop],currentWorkIdx);
 const to=pose0?pose0.pos:getWorkStandPosition(wObj);
 const look=pose0?pose0.look:wObj.center.clone();
 const targetFov=pose0?pose0.fov:48;
 const angles=anglesFor(to,look);
 const dist=camera.position.distanceTo(to);
 if(reduced.matches||dist<0.12){
  camera.position.copy(to);state.yaw=angles.yaw;state.pitch=angles.pitch;state.transition=null;lookCamera();
 }else{
  state.transition=buildSmoothTransition(to,look,{
   duration:Math.min(3.1,Math.max(1.55,dist/3.3)),
   toFov:targetFov,
   cinematicHandoff:true,
   arcFactor:0.13,
   liftFactor:0.055,
   maxLift:0.68
  });
 }
 updateWorkNavCounters(wObj);
}
async function crossDissolveSpace(nextSp){
 const exp=$('experience');
 if(exp&&!reduced.matches){
  exp.classList.add('room-dissolve-active');
  await new Promise(r=>setTimeout(r,360));
 }
 await switchSpace(nextSp);
 if(exp){
  requestAnimationFrame(()=>exp.classList.remove('room-dissolve-active'));
 }
}
async function stepCinematicShot(delta=1){
 if(!world||cinematicSwitching)return;
 tourTimer=0;
 const works=getRoomNavigableWorks();
 if(cinematicMode==='works'&&works.length){
  const nextWIdx=currentWorkIdx+delta;
  if(delta>0&&nextWIdx>=works.length&&cinematicAllSpaces){
   cinematicSwitching=true;
   const nextSp=SPACE_ORDER[(SPACE_ORDER.indexOf(activeSpace)+1)%SPACE_ORDER.length];
   await crossDissolveSpace(nextSp);
   currentWorkIdx=0;
   cinematicSwitching=false;
   toggleCinematicMode(true,'works');
   return;
  }
  if(delta<0&&nextWIdx<0&&cinematicAllSpaces){
   cinematicSwitching=true;
   const prevSp=SPACE_ORDER[(SPACE_ORDER.indexOf(activeSpace)-1+SPACE_ORDER.length)%SPACE_ORDER.length];
   await crossDissolveSpace(prevSp);
   currentWorkIdx=Math.max(0,getRoomNavigableWorks().length-1);
   cinematicSwitching=false;
   toggleCinematicMode(true,'works');
   return;
  }
  currentWorkIdx=(nextWIdx+works.length)%works.length;
  flyToCinematicWork(works[currentWorkIdx]);
  updateCinematicHUD();
  triggerCinematicShotCue();
  return;
 }
 const nextIdx=currentStop+delta;
 if(delta>0&&nextIdx>=world.stops.length&&cinematicAllSpaces){
  cinematicSwitching=true;
  const nextSp=SPACE_ORDER[(SPACE_ORDER.indexOf(activeSpace)+1)%SPACE_ORDER.length];
  await crossDissolveSpace(nextSp);
  cinematicSwitching=false;
  toggleCinematicMode(true,'stops');
  return;
 }
 if(delta<0&&nextIdx<0&&cinematicAllSpaces){
  cinematicSwitching=true;
  const prevSp=SPACE_ORDER[(SPACE_ORDER.indexOf(activeSpace)-1+SPACE_ORDER.length)%SPACE_ORDER.length];
  await crossDissolveSpace(prevSp);
  currentStop=Math.max(0,(world?.stops?.length||1)-1);
  cinematicSwitching=false;
  toggleCinematicMode(true,'stops');
  return;
 }
 goStop((nextIdx+world.stops.length)%world.stops.length,false);
 updateCinematicHUD();
 triggerCinematicShotCue();
}
function updateCinematicCamera(dt){
 cinematicClock+=dt;
 const works=getRoomNavigableWorks();
 const isWorks=cinematicMode==='works'&&works.length>0;
 const shotDur=isWorks?8.8:10.4;
 if($('cinematic-progress-fill')){
  const pct=18+Math.min(1,tourTimer/shotDur)*82;
  $('cinematic-progress-fill').style.width=pct.toFixed(1)+'%';
 }
 const wObj=getCurrentCinematicWork();
 const s=world.stops[currentStop];
 if((isWorks&&wObj)||s){
  const idx=isWorks?currentWorkIdx:currentStop;
  const u=Math.min(1,tourTimer/shotDur);
  const pose=getCinematicPoseAt(u,wObj,s,idx);
  if(pose){
   const posBlend=1-Math.exp(-5.2*dt);
   const rotBlend=1-Math.exp(-6.0*dt);
   camera.position.lerp(pose.pos,posBlend);
   if(Math.abs(camera.fov-pose.fov)>0.03){
    camera.fov=THREE.MathUtils.lerp(camera.fov,pose.fov,posBlend);
    camera.updateProjectionMatrix();
   }
   const ang=anglesFor(camera.position,pose.look);
   state.yaw+=shortest(state.yaw,ang.yaw)*rotBlend;
   state.pitch=THREE.MathUtils.lerp(state.pitch,ang.pitch,rotBlend);
   state.roll=THREE.MathUtils.lerp(state.roll||0,pose.roll||0,posBlend);
   lookCamera();
  }
  if(isWorks&&wObj&&wObj.views?.length>1&&$('cin-work-thumb')){
   const vIdx=Math.min(wObj.views.length-1,Math.floor(u*wObj.views.length));
   const targetSrc=wObj.views[vIdx]?.src;
   if(targetSrc&&$('cin-work-thumb').getAttribute('src')!==targetSrc){
    swapImgSmooth($('cin-work-thumb'),targetSrc,`${wObj.title} (${wObj.views[vIdx].label})`);
   }
  }
 }
 if(!cinematicPaused){
  tourTimer+=dt;
  if(tourTimer>=shotDur){
   tourTimer=0;
   stepCinematicShot(1);
  }
 }
}
function toggleCinematicMode(force,modeOverride=null){
 if(!renderer||!world)return;
 const next=typeof force==='boolean'?force:!cinematicActive;
 if(!next){
  stopTour();
  announce('Animática cinemática finalizada.');
  return;
 }
 if(modeOverride==='works'||modeOverride==='stops')cinematicMode=modeOverride;
 if(selected){
  const works=getRoomNavigableWorks();
  const sIdx=works.findIndex(w=>w.id===selected.id||w.code===selected.code);
  if(sIdx>=0)currentWorkIdx=sIdx;
 }else if(state.nearbyWork){
  const works=getRoomNavigableWorks();
  const nIdx=works.findIndex(w=>w.id===state.nearbyWork.id||w.code===state.nearbyWork.code);
  if(nIdx>=0)currentWorkIdx=nIdx;
 }
 closeDialog($('options'));
 leaveInspection(false);
 enter();
 if(isPlayerMode())setVisitMode('mute');
 cinematicActive=true;
 cinematicPaused=false;
 touring=true;
 tourTimer=0;
 cinematicClock=0;
 document.body.classList.add('cinematic-active');
 if($('cinematic-hud'))$('cinematic-hud').hidden=false;
 if($('cinematic-btn'))$('cinematic-btn').setAttribute('aria-pressed','true');
 if($('cinematic-label'))$('cinematic-label').textContent='Paseo activo';
 if($('cin-pause')){$('cin-pause').setAttribute('aria-pressed','false');$('cin-pause').textContent='Ⅱ Pausar';}
 if($('cin-all-spaces')){$('cin-all-spaces').setAttribute('aria-pressed',String(cinematicAllSpaces));$('cin-all-spaces').textContent=`7 Salas: ${cinematicAllSpaces?'Sí':'No'}`;}
 if($('tour-toggle'))$('tour-toggle').setAttribute('aria-pressed','true');
 if($('tour-label'))$('tour-label').textContent='Pausar';
 if($('play-symbol'))$('play-symbol').textContent='Ⅱ';
 updateMobileGameUI();
 if(!musicActive)toggleAmbientMusic(true);
 const works=getRoomNavigableWorks();
 if(cinematicMode==='works'&&works.length){
  flyToCinematicWork(works[(currentWorkIdx+works.length)%works.length]);
 }else{
  goStop(currentStop,false);
 }
 updateCinematicHUD(true);
 triggerCinematicShotCue();
 announce('Paseo automático iniciado.');
}
if($('cinematic-btn'))$('cinematic-btn').onclick=()=>toggleCinematicMode();
if($('cin-prev'))$('cin-prev').onclick=()=>{stepCinematicShot(-1);};
if($('cin-next'))$('cin-next').onclick=()=>{stepCinematicShot(1);};
if($('cin-mode'))$('cin-mode').onclick=()=>{
 cinematicMode=cinematicMode==='works'?'stops':'works';
 tourTimer=0;
 const works=getRoomNavigableWorks();
 if(cinematicMode==='works'&&works.length){
  flyToCinematicWork(works[(currentWorkIdx+works.length)%works.length]);
 }else{
  goStop(currentStop,false);
 }
 updateCinematicHUD(true);
 triggerCinematicShotCue();
 announce(cinematicMode==='works'?'Modo Obra a obra.':'Modo Planos de sala.');
};
if($('cin-pause'))$('cin-pause').onclick=()=>{
 cinematicPaused=!cinematicPaused;
 $('cin-pause').setAttribute('aria-pressed',String(cinematicPaused));
 $('cin-pause').textContent=cinematicPaused?'▷ Reanudar':'Ⅱ Pausar';
 notifyParentState();
 announce(cinematicPaused?'Paseo en pausa.':'Reanudando paseo.');
};
const inspectFromCinematic=()=>{
 const wObj=getCurrentCinematicWork();
 toggleCinematicMode(false);
 if(wObj)focusAndInspectWork(wObj);
};
if($('cin-inspect'))$('cin-inspect').onclick=inspectFromCinematic;
if($('cin-card-inspect'))$('cin-card-inspect').onclick=inspectFromCinematic;
if($('cinematic-work-pill')){
 $('cinematic-work-pill').style.pointerEvents='auto';
 $('cinematic-work-pill').style.cursor='pointer';
 $('cinematic-work-pill').onclick=inspectFromCinematic;
}
if($('cin-all-spaces'))$('cin-all-spaces').onclick=()=>{
 cinematicAllSpaces=!cinematicAllSpaces;
 $('cin-all-spaces').setAttribute('aria-pressed',String(cinematicAllSpaces));
 $('cin-all-spaces').textContent=`7 Salas: ${cinematicAllSpaces?'Sí':'No'}`;
 announce(cinematicAllSpaces?'Modo continuo por las 7 salas activado.':'Animática limitada a la sala actual.');
};
if($('cin-exit'))$('cin-exit').onclick=()=>toggleCinematicMode(false);

addEventListener('message',async e=>{
 const d=e?.data;if(!d)return;
 if(d.type==='garden-cmd'){
  if(activeSpace!=='garden')await switchSpace('garden');
  enter();
  if(d.mode==='ai3d'||d.mode==='billboard')applySculptureMode(d.mode);
  if(d.timeOfDay)setTimeOfDay(d.timeOfDay,true);
  else if(d.action==='toggle-time')cycleTimeOfDay();
  if(typeof d.music==='boolean')toggleAmbientMusic(d.music);
  else if(d.action==='toggle-music')toggleAmbientMusic();
  if(typeof d.cinematic==='boolean')toggleCinematicMode(d.cinematic,d.cinematicMode);
  else if(d.action==='toggle-cinematic')toggleCinematicMode(undefined,d.cinematicMode);
  else if(d.action==='cinematic-works')toggleCinematicMode(true,'works');
  if(d.action==='prev-work')stepWorkInRoom(-1,{inspect:Boolean(selected)});
  if(d.action==='next-work')stepWorkInRoom(1,{inspect:Boolean(selected)});
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
 if(d.action==='prev-work')stepWorkInRoom(-1,{inspect:Boolean(selected)});
 if(d.action==='next-work')stepWorkInRoom(1,{inspect:Boolean(selected)});
 if(d.action==='toggle-cinematic')toggleCinematicMode(undefined,d.cinematicMode||'works');
 if(d.workId){const w=world?.works.find(x=>x.id===d.workId||x.catalogId===d.workId||x.code===d.workId);if(w)focusAndInspectWork(w);}
});
addEventListener('message',async e=>{
 const d=e?.data;if(!d||d.type!=='museum-cmd')return;
 if(d.action==='set-paused'){
  externalPaused=Boolean(d.paused);
  state.lastFrame=0;
  if(externalPaused&&audioCtx&&audioCtx.state==='running'&&musicActive){try{audioCtx.suspend();}catch{}}
  else if(!externalPaused&&audioCtx&&audioCtx.state==='suspended'&&musicActive){try{audioCtx.resume();}catch{}}
  notifyParentState();
  return;
 }
 if(d.space&&d.space!==activeSpace)await switchSpace(d.space,{preserveEntered:entered||Boolean(d.autoenter)});
 if(d.action==='open-guide-stage'){openGuideStage(d.visitMode||(visitMode==='mute'?'avatar':visitMode));return;}
 if(d.visitMode&&['mute','avatar','enric','floki','guided'].includes(d.visitMode)){
  commitGuideStageMode(d.visitMode);
  if(!d.action&&!d.obra&&!d.serie&&d.stop===undefined&&!d.animatica)return;
 }
 if(d.timeOfDay&&['day','sunset','night','cycle'].includes(d.timeOfDay)){
  setTimeOfDay(d.timeOfDay);
  if(!d.action&&!d.obra&&!d.serie&&d.stop===undefined&&!d.animatica)return;
 }
 if(d.mode==='ai3d'||d.mode==='billboard'){applySculptureMode(d.mode);notifyParentState();if(!d.action&&!d.obra&&!d.serie&&d.stop===undefined&&!d.animatica&&!d.autoenter)return;}
 if(d.action==='prev-work'){stepWorkInRoom(-1,{inspect:Boolean(selected)});return;}
 if(d.action==='next-work'){stepWorkInRoom(1,{inspect:Boolean(selected)});return;}
 if(d.action==='toggle-fast-walk'){toggleFastWalk(d.fastWalk);return;}
 if(d.action==='toggle-music'){toggleAmbientMusic(d.music);return;}
 if(d.action==='toggle-cinematic'){toggleCinematicMode(d.cinematic,d.cinematicMode||'works');return;}
 if(d.action==='breeze'){triggerBreezeWave();return;}
 if(d.obra){
  const targetSp=findPreferredSpaceForWork(d.obra,d.space||activeSpace);
  if(targetSp!==activeSpace)await switchSpace(targetSp,{preserveEntered:true});
  const q=String(d.obra).trim().toLowerCase();
  const wObj=world?.works.find(x=>x.id.toLowerCase()===q||x.code.toLowerCase()===q||(x.catalogId&&x.catalogId.toLowerCase()===q));
  if(wObj){
   urlOriginWork=wObj;
   const works=getRoomNavigableWorks();
   const wIdx=works.findIndex(x=>x.id===wObj.id);
   if(wIdx>=0)currentWorkIdx=wIdx;
   if(d.animatica)toggleCinematicMode(true,'works');
   else focusAndInspectWork(wObj);
  }
  return;
 }
 if(d.serie){
  jumpToSeriesStop(d.serie);
  if(d.animatica)toggleCinematicMode(true,'works');
  return;
 }
 if(d.animatica){toggleCinematicMode(true,d.cinematicMode||'works');return;}
 if(d.autoenter)enter();
 if(typeof d.stop==='number')goStop(d.stop);
});
