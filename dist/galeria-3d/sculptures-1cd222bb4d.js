import * as THREE from './vendor/three.module.min.js';

// The first cartoon prototype, recovered intact and lightly refined.
// Preserve its proportions, expression, palette and rigid articulation.
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const palette={skin:'#bb886a',light:'#d6a485',beard:'#d2d2c3',hair:'#a6aba5',shirt:'#667484',shorts:'#b6ab93',shoe:'#343d43',black:'#202731',white:'#dadcd3',tan:'#a78a60'};
const rand=s=>{let a=s;return()=>{a=(Math.imul(a,1664525)+1013904223)>>>0;return a/4294967296;};};
const materials=new Map();
function material(color,paint=false){const key=color+paint;if(!materials.has(key))materials.set(key,new THREE.MeshStandardMaterial({color:paint?'#ffffff':color,roughness:.94,flatShading:true,vertexColors:paint}));return materials.get(key);}
function painted(geo,color,style='plain'){
 const g=geo.index?geo.toNonIndexed():geo,ps=g.attributes.position,colors=[],r=rand(134),base=new THREE.Color(color),cream=new THREE.Color(style==='shorts'?'#737f88':'#c5c7b8');
 for(let i=0;i<ps.count;i+=3){const x=(ps.getX(i)+ps.getX(i+1)+ps.getX(i+2))/3,y=(ps.getY(i)+ps.getY(i+1)+ps.getY(i+2))/3,z=(ps.getZ(i)+ps.getZ(i+1)+ps.getZ(i+2))/3;const c=base.clone();const noise=Math.sin(x*28+y*21+Math.sin(z*32)*1.6)+Math.sin(y*44-z*35+x*12)*.6; if(style!=='plain'&&noise>.53)c.lerp(cream,.55+(noise-.53)*.2);c.multiplyScalar(.96+r()*.08);for(let k=0;k<3;k++)colors.push(c.r,c.g,c.b);}
 g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));return g;
}
function mesh(parent,g,color,position=[0,0,0],scale=[1,1,1],style='plain') {const o=new THREE.Mesh(painted(g,color,style),material(color,true));o.position.set(...position);o.scale.set(...scale);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
function ell(parent,color,p,s,detail=2){return mesh(parent,new THREE.IcosahedronGeometry(1,detail),color,p,s);}
function group(parent,name,p=[0,0,0]){const g=new THREE.Group();g.name=name;g.position.set(...p);parent.add(g);return g;}
function rod(parent,a,b,r1,r2,color){const d=V(...b).sub(V(...a)),o=mesh(parent,new THREE.CylinderGeometry(r2,r1,d.length(),10,2),color,V(...a).add(V(...b)).multiplyScalar(.5).toArray());o.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());return o;}
function line(parent,points,color,r=.003){return mesh(parent,new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>V(...p))),Math.max(8,points.length*3),r,5,false),color);}
function loft(parent,rings,color,segments=24,style='plain'){
 // Add a little curvature between the original silhouette landmarks.
 const silhouette=new THREE.CatmullRomCurve3(rings.map(([y,rx,rz,cz=0])=>V(rx,rz,cz)),false,'catmullrom',.18);
 const refined=[];
 for(let j=0;j<rings.length-1;j++)for(let k=0;k<4;k++){
  const f=k/4,p=silhouette.getPoint((j+f)/(rings.length-1));
  refined.push([THREE.MathUtils.lerp(rings[j][0],rings[j+1][0],f),Math.max(.001,p.x),Math.max(.001,p.y),p.z]);
 }
 refined.push(rings.at(-1));rings=refined;
 const vertices=[],indices=[];for(const [y,rx,rz,cz=0]of rings)for(let i=0;i<segments;i++){const a=i/segments*Math.PI*2;vertices.push(Math.sin(a)*rx,y,Math.cos(a)*rz+cz);}
 for(let j=0;j<rings.length-1;j++)for(let i=0;i<segments;i++){const a=j*segments+i,b=j*segments+(i+1)%segments,c=a+segments,d=b+segments;indices.push(a,b,c,b,d,c);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();return mesh(parent,g,color,[0,0,0],[1,1,1],style);
}
function tuft(parent,p,scale,color,tilt=0){
 // Short, rounded locks keep the first design's graphic coat without long spikes.
 const outline=[[0,-1.05],[.65,-.9],[1,-.48],[.88,.15],[.54,.82],[.15,1.35],[0,1.48]];
 const g=new THREE.LatheGeometry(outline.map(([r,y])=>new THREE.Vector2(r,y)),7);
 const pos=g.attributes.position;for(let i=0;i<pos.count;i++)pos.setZ(i,pos.getZ(i)*.62+.12*(pos.getY(i)+1));
 g.computeVertexNormals();const t=mesh(parent,g,color,p,scale);t.rotation.z=tilt;t.rotation.x=Math.PI;return t;
}

export function createFather(){
 const root=new THREE.Group();root.name='Enric_Segarra';const body=group(root,'cuerpo');
 const torso=loft(body,[[.87,.17,.115],[.94,.185,.12],[1.12,.19,.13],[1.34,.23,.125],[1.40,.21,.10],[1.44,.09,.075]],palette.shirt,32,'shirt');
 const neck=ell(body,palette.skin,[0,1.45,0],[.078,.135,.076]);
 const legs=[],arms=[];
 for(const side of [-1,1]){
  const leg=group(body,side<0?'pierna_izquierda':'pierna_derecha',[side*.102,.91,0]);legs.push(leg);
  loft(leg,[[-.34,.10,.108],[-.26,.105,.112],[-.05,.11,.12],[0,.095,.11]],palette.shorts,24,'shorts');
  const pocket=mesh(leg,new THREE.BoxGeometry(.035,.14,.15,1,3,2),palette.shorts,[side*.102,-.2,0],[1,1,1],'shorts');
  line(leg,[[side*.122,-.13,-.065],[side*.125,-.14,.065]],'#807d70',.002);
  ell(leg,palette.skin,[0,-.37,.008],[.073,.09,.073]);
  const shin=group(leg,'rodilla',[0,-.37,.008]);leg.userData.knee=shin;
  loft(shin,[[-.43,.037,.047,.007],[-.31,.048,.05,.007],[-.13,.067,.065,-.018],[.03,.064,.065,-.008]],palette.skin,18);
  ell(shin,palette.shoe,[0,-.472,.044],[.069,.046,.135]);
  ell(shin,'#242c32',[0,-.505,.044],[.073,.021,.139],1);
  line(shin,[[-.05,-.455,.032],[0,-.453,.047],[.05,-.455,.032]],'#858a85',.0025);
  const arm=group(body,side<0?'brazo_izquierdo':'brazo_derecho',[side*.216,1.355,0]);arms.push(arm);arm.rotation.z=side*.10;
  loft(arm,[[-.19,.09,.085],[-.12,.09,.085],[-.035,.095,.085],[.035,.07,.07]],palette.shirt,20,'shirt');
  rod(arm,[0,-.16,0],[side*.015,-.31,.015],.058,.053,palette.skin);
  const fore=group(arm,'antebrazo',[side*.015,-.31,.015]);arm.userData.fore=fore;
  rod(fore,[0,0,0],[side*.012,-.22,.025],.053,.033,palette.skin);
  const hand=group(fore,'mano',[side*.012,-.25,.028]);ell(hand,palette.skin,[0,-.012,0],[.043,.07,.028]);
  for(let j=0;j<4;j++)rod(hand,[(j-1.5)*.017,-.045,.007],[(j-1.5)*.017,-.099+Math.abs(j-1.4)*.008,.019],.009,.006,palette.skin);
  rod(hand,[-side*.028,0,.01],[-side*.053,-.047,.03],.014,.009,palette.skin);
 }
 // The head silhouette and distinct nose/brows are modelled, not a photo plane.
 const head=group(body,'cabeza',[0,1.635,0]);
 const skull=loft(head,[[-.145,.05,.06,.012],[-.115,.09,.08,.01],[-.055,.112,.085,0],[.025,.122,.093,-.005],[.09,.128,.105,-.01],[.155,.12,.10,-.018],[.205,.085,.079,-.018],[.226,.006,.015,-.018]],palette.skin,32);
 for(const side of [-1,1]){
  ell(head,palette.skin,[side*.127,.027,-.002],[.022,.046,.027]);ell(head,'#996a57',[side*.137,.029,.014],[.009,.028,.01],1);
  ell(head,palette.light,[side*.073,-.007,.073],[.043,.031,.023],2);
  ell(head,'#95725f',[side*.051,.054,.087],[.043,.019,.012],2);
  ell(head,'#d0c5aa',[side*.05,.05,.098],[.029,.010,.009],2);
  ell(head,'#5b4531',[side*.048,.05,.106],[.009,.010,.004],2);
  ell(head,'#202a29',[side*.048,.05,.109],[.0045,.006,.003],1);
  ell(head,'#e7e6d9',[side*.045,.054,.111],[.0023,.0023,.0015],1);
  line(head,[[side*.024,.075,.10],[side*.048,.083,.109],[side*.08,.075,.093]],'#53534a',.007);
  line(head,[[side*.03,.032,.105],[side*.057,.028,.099],[side*.083,.036,.091]],'#a7765e',.002);
  for(let i=0;i<16;i++){const a=i/15*1.5+.7;const p=[side*(.12*Math.sin(a)),.072+i*.006,-.024-.07*Math.cos(a)];tuft(head,p,[.01,.018,.009],i%3?palette.hair:palette.beard,side*.4);}
 }
 ell(head,palette.skin,[0,.017,.104],[.025,.049,.027],2);
 ell(head,palette.light,[0,-.013,.133],[.028,.022,.027],2);
 for(const side of [-1,1]){ell(head,palette.skin,[side*.025,-.016,.114],[.019,.014,.02],1);ell(head,'#755649',[side*.02,-.025,.128],[.009,.004,.006],1);}
 line(head,[[-.015,.095,.095],[0,.091,.097],[.012,.099,.095]],'#98725f',.002);
 line(head,[[-.075,.139,.079],[-.025,.147,.086],[.03,.145,.085],[.072,.137,.078]],'#a98168',.0015);
 // Receding silver hair wraps the back, leaving the high forehead visible.
 const random=rand(54),hairPoints=[];
 const sp=skull.geometry.attributes.position;
 for(let i=0;i<sp.count;i+=3){const y=(sp.getY(i)+sp.getY(i+1)+sp.getY(i+2))/3,z=(sp.getZ(i)+sp.getZ(i+1)+sp.getZ(i+2))/3,x=(sp.getX(i)+sp.getX(i+1)+sp.getX(i+2))/3;
  if(y>-.025&&(z<-.008||Math.abs(x)>.108||y>.205&&z<.025))for(let k=0;k<3;k++)hairPoints.push(sp.getX(i+k)*1.018,(sp.getY(i+k)-.025)*1.012+.025,(sp.getZ(i+k)+.015)*1.020-.015);
 }
 const scalp=new THREE.BufferGeometry();scalp.setAttribute('position',new THREE.Float32BufferAttribute(hairPoints,3));scalp.computeVertexNormals();mesh(head,scalp,palette.hair);
 for(let i=0;i<38;i++){const angle=1.14+random()*4,y=.07+random()*.13;const radius=.126*Math.sqrt(1-Math.pow((y-.08)/.18,2));tuft(head,[Math.sin(angle)*radius,y,Math.cos(angle)*radius*.84-.02],[.006,.007,.005],i%3?palette.hair:palette.beard,Math.sin(angle)*.55);}
 const beard=loft(head,[[-.183,.04,.04,.04],[-.15,.078,.061,.034],[-.105,.105,.081,.017],[-.045,.109,.083,.005],[-.008,.094,.077,.004]],palette.beard,32);
 // Beard is an open horseshoe at mouth level; a warm mouth patch defines the lip.
 ell(head,palette.skin,[0,-.052,.089],[.044,.018,.014],2);
 line(head,[[-.035,-.052,.102],[0,-.056,.111],[.033,-.052,.102]],'#755c53',.003);
 for(const side of [-1,1]){const m=ell(head,palette.beard,[side*.026,-.039,.103],[.032,.012,.019],1);m.rotation.z=side*.16;}
 for(let i=0;i<70;i++){const a=(random()-.5)*2.7,y=-.035-random()*.12;const rx=y<-.12?.078:.103;tuft(head,[Math.sin(a)*rx,y,Math.cos(a)*.08+.025],[.007,.012+random()*.009,.006],i%4?palette.beard:'#acb3ad',Math.sin(a)*.22);}
 // Reading glasses hang at the neckline, as in the reference.
 line(body,[[-.06,1.47,.052],[-.10,1.34,.126],[-.06,1.28,.139],[.06,1.28,.139],[.10,1.34,.126],[.06,1.47,.052]],'#9c9f94',.002);
 for(const side of [-1,1]){const points=[];for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;points.push([side*.042+Math.cos(a)*.034,1.285+Math.sin(a)*.017,.143]);}line(body,points,'#a5adab',.0025);}line(body,[[-.008,1.288,.145],[0,1.294,.146],[.008,1.288,.145]],'#a5adab',.0025);
 root.userData.rig={body,head,arms,legs,action:'idle',elapsed:0};return root;
}

export function createDog(){
 const root=new THREE.Group();root.name='Companero';const body=group(root,'cuerpo_perro');
 ell(body,palette.black,[0,.43,-.08],[.19,.225,.37]);ell(body,palette.white,[0,.48,.20],[.202,.225,.19]);
 const legs=[];for(const x of [-.12,.12])for(const z of [-.29,.19]){const leg=group(body,`pata_${legs.length}`,[x,.4,z]);legs.push(leg);ell(leg,z<0?palette.black:palette.white,[0,-.08,-.015],[.071,.14,.073]);rod(leg,[0,-.13,0],[0,-.33,.025],.04,.027,palette.white);ell(leg,palette.white,[0,-.359,.058],[.049,.041,.081]);for(let j=-1;j<=1;j++)line(leg,[[j*.022,-.376,.09],[j*.022,-.361,.121]],'#a4a79f',.0015);}
 const head=group(body,'cabeza_perro',[0,.70,.29]);ell(head,palette.black,[0,0,0],[.138,.15,.14]);
 ell(head,palette.white,[0,-.035,.13],[.081,.063,.112]);ell(head,'#524943',[0,-.081,.142],[.078,.022,.087]);ell(head,palette.white,[0,-.097,.129],[.074,.022,.083]);
 ell(head,palette.black,[0,-.022,.225],[.046,.027,.027]);ell(head,'#697079',[-.013,-.012,.246],[.012,.006,.004],1);
 const tongue=ell(head,'#b77c80',[0,-.099,.198],[.03,.012,.04]);tongue.rotation.x=-.35;
 // The white blaze follows the forehead instead of standing off the face.
 const blazePoints=[],blazeIndices=[];
 for(let j=0;j<=12;j++){const y=-.02+j/12*.164,width=.024*(1-Math.pow(j/12,3))+.002;
  for(let i=0;i<=8;i++){const x=(i/8*2-1)*width,z=.14*Math.sqrt(Math.max(.003,1-(y/.15)**2-(x/.138)**2))+.003;blazePoints.push(x,y,z);}}
 for(let j=0;j<12;j++)for(let i=0;i<8;i++){const a=j*9+i;blazeIndices.push(a,a+1,a+9,a+1,a+10,a+9);}
 const blaze=new THREE.BufferGeometry();blaze.setAttribute('position',new THREE.Float32BufferAttribute(blazePoints,3));blaze.setIndex(blazeIndices);blaze.computeVertexNormals();mesh(head,blaze,palette.white);
 for(const side of [-1,1]){
  ell(head,palette.tan,[side*.078,.041,.112],[.026,.012,.009],1);
  ell(head,'#131b22',[side*.073,.012,.121],[.029,.018,.012]);ell(head,'#9b7845',[side*.073,.011,.131],[.012,.012,.005]);ell(head,'#171c23',[side*.072,.011,.136],[.005,.009,.002]);ell(head,'#ffffff',[side*.068,.016,.137],[.0025,.0025,.001]);
  ell(head,palette.tan,[side*.095,-.04,.072],[.026,.023,.016],2);
  const ear=group(head,`oreja_${side}`,[side*.107,.092,-.015]);
  const shape=new THREE.Shape();shape.moveTo(-.048,-.025);shape.quadraticCurveTo(-.047,.016,-.017,.061);shape.quadraticCurveTo(.005,.079,.024,.055);shape.quadraticCurveTo(.050,.022,.044,-.022);shape.quadraticCurveTo(.010,-.049,-.048,-.025);
  const folded=new THREE.ExtrudeGeometry(shape,{depth:.016,bevelEnabled:true,bevelSize:.006,bevelThickness:.005,bevelSegments:2,curveSegments:5,steps:1});
  const e=mesh(ear,folded,palette.black);e.rotation.z=-side*.38;e.rotation.x=.78;
  const tip=ell(ear,palette.black,[side*.012,-.014,.043],[.035,.026,.019],2);tip.rotation.z=side*.35;
 }
 const random=rand(97);for(let i=0;i<105;i++){const angle=random()*Math.PI*2,z=-.40+random()*.77;const white=z>.13;const h=Math.sqrt(Math.max(0,1-Math.pow(white?(z-.20)/.19:(z+.08)/.37,2)));const x=Math.sin(angle)*(white?.195:.183)*h,y=(white?.48:.43)+Math.cos(angle)*.209*h;tuft(body,[x,y,z],[.025,.027+random()*.015,.025],white?palette.white:palette.black,Math.sin(angle)*.9);}
 for(let i=0;i<35;i++){const a=(random()-.5)*3.6;tuft(body,[Math.sin(a)*.17,.43+random()*.15,.24+Math.cos(a)*.07],[.025,.045,.022],palette.white,Math.sin(a)*.5);}
 const tail=group(body,'cola',[0,.48,-.39]);line(tail,[[0,0,0],[.04,-.06,-.16],[.06,-.17,-.27],[.04,-.28,-.33]],palette.black,.071);ell(tail,palette.white,[.04,-.29,-.33],[.061,.083,.068]);for(let i=0;i<14;i++)tuft(tail,[(random()-.5)*.1+.04,-.07-i*.015,-.10-i*.016],[.025,.04,.025],i>10?palette.white:palette.black,.3);
 root.userData.rig={body,head,legs,tail,action:'idle',elapsed:0};return root;
}
