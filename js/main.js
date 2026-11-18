const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const page=document.body.dataset.page;
const NAV=[['index','Home'],['projects','Projects'],['resume','Resume'],['skills','Skills']];
document.body.insertAdjacentHTML('afterbegin',`<header class="nav"><a class="logo" href="index.html">EG.</a><nav>${NAV.map(([p,t])=>`<a href="${p}.html" class="${p===page?'on':''}">${t}</a>`).join('')}</nav></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer><a href="mailto:emmaleighgold@gmail.com">emmaleighgold@gmail.com</a><a href="https://linkedin.com/in/emmaleigh-goldfarb" target="_blank" rel="noopener">LinkedIn</a><span>© ${new Date().getFullYear()} Emmaleigh Goldfarb</span></footer>`);

/* ---------- particles + cursor trail ---------- */
const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
const cv=document.createElement('canvas');cv.id='fx';document.body.append(cv);
const cx=cv.getContext('2d');let W,H,P=[],T=[];
const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};rs();addEventListener('resize',rs);
for(let i=0;i<55;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3});
if(!still)addEventListener('pointermove',e=>T.push({x:e.clientX,y:e.clientY,l:1}));
(function loop(){cx.clearRect(0,0,W,H);
 P.forEach((p,i)=>{if(!still){p.x=(p.x+p.vx+W)%W;p.y=(p.y+p.vy+H)%H}cx.fillStyle='rgba(255,46,147,.5)';cx.fillRect(p.x,p.y,2,2);
  for(let j=i+1;j<P.length;j++){const q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<120){cx.strokeStyle=`rgba(255,46,147,${.12*(1-d/120)})`;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}});
 T=T.filter(t=>(t.l-=.04)>0);
 T.forEach(t=>{cx.fillStyle=`rgba(255,46,147,${t.l})`;cx.shadowColor='#ff2e93';cx.shadowBlur=12;cx.beginPath();cx.arc(t.x,t.y,4*t.l,0,7);cx.fill()});
 cx.shadowBlur=0;requestAnimationFrame(loop)})();

/* ---------- shared helpers ---------- */
const tilt=r=>$$('.card',r).forEach(c=>{
 c.onmousemove=e=>{const b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;c.style.transform=`perspective(700px) rotateY(${x*12}deg) rotateX(${-y*12}deg)`};
 c.onmouseleave=()=>c.style.transform=''});
const chips=(el,list,cb)=>{el.innerHTML=list.map(([v,t],i)=>`<button class="chip${i?'':' on'}" data-v="${v}">${t}</button>`).join('');
 $$('.chip',el).forEach(b=>b.onclick=()=>{$$('.chip',el).forEach(x=>x.classList.remove('on'));b.classList.add('on');cb(b.dataset.v)})};

/* ---------- HOME ---------- */
const sp=$('#splash');
if(sp){let seen=0;try{seen=sessionStorage.getItem('s')}catch(e){}
 if(seen||still)sp.remove();else{const n=$('#sn'),s='Emmaleigh Goldfarb';let k=0;
  const iv=setInterval(()=>{n.textContent=s.slice(0,++k);if(k>=s.length){clearInterval(iv);n.classList.add('glitch')}},90);
  setTimeout(()=>{sp.classList.add('out');setTimeout(()=>sp.remove(),800);try{sessionStorage.setItem('s',1)}catch(e){}},3200)}}
const ty=$('#typed');
if(ty){const ph=['Computer Science @ Binghamton University','Web Developer','Researcher','Girls Who Code Instructor'];let i=0,j=0,d=0;
 (function t(){const s=ph[i];j+=d?-1:1;ty.textContent=s.slice(0,j);let w=d?35:75;
  if(!d&&j===s.length){d=1;w=1500}else if(d&&!j){d=0;i=(i+1)%ph.length;w=300}setTimeout(t,w)})()}
$$('[data-count]').forEach(el=>{const n=+el.dataset.count;let c=0;(function s(){c+=Math.ceil(n/40);el.textContent=Math.min(c,n)+(el.dataset.suf||'');if(c<n)requestAnimationFrame(s)})()});

/* ---------- PROJECTS (edit here) ---------- */
const PROJ=[
{t:'FRI Program Assignment Dashboard',c:'web',when:'Jun 2026 – Aug 2026',s:['Python','Flask','Google OAuth'],d:'A Python/Flask web app used by all FRI Program students and instructors (1,000+ users).',
 b:['Enhanced an existing application by debugging software issues and building new features, including Google OAuth authentication and assignment management.','Designed and built admin workflows so authorized users can assign newly developed student assignments.','Runs on online servers and serves 1,000+ users.'],n:'Private: only available to people in the FRI Program.'},
{t:'Watson Combat Robotics League Website',c:'web',when:'May 2026 – Present',s:['HTML','CSS','JavaScript','GitHub Pages'],d:'The club website, built from scratch and published through GitHub.',
 b:['Designed, developed, and maintain a responsive site with structured layouts and interactive features.','Worked with club leadership to turn requirements into features, troubleshooting independently and improving the site in iterations.'],l:'https://wcrl.github.io/'},
{t:'WCRL Discord Role Bot',c:'bots',when:'2026',s:['Discord bot','Automation'],d:'A Discord bot that automatically assigns roles to new club members.',
 b:['Built with an executive board member of the Watson Combat Robotics League.','Automates role assignment so new members get set up without manual work.']},
{t:'Freshman Research Immersion: 3D Models',c:'research',when:'Aug 2025 – Present',s:['ULIP','CLIP','CG3D','TRELLIS.2','LoRA','ControlNet','Native 3D','Image Reward','FID','CMMD'],d:'Research on 3D generative and vision-language models with a team of seven.',
 b:['Designed experiments, documented results, and presented research to peers and faculty.','Worked with point cloud data analysis, 3D modeling, and annotation of 3D spatial datasets.']}];
const pg=$('#pgrid');
if(pg){const m=document.createElement('div');m.id='modal';document.body.append(m);
 const close=()=>m.classList.remove('open');m.onclick=e=>{if(e.target===m)close()};addEventListener('keydown',e=>e.key==='Escape'&&close());
 const draw=f=>{pg.innerHTML=PROJ.map((p,i)=>({p,i})).filter(({p})=>f==='all'||p.c===f).map(({p,i})=>
  `<article class="card" tabindex="0" data-i="${i}"><h3>${p.t}</h3><p>${p.d}</p><div class="tags">${p.s.slice(0,4).map(x=>`<span class="tag">${x}</span>`).join('')}</div></article>`).join('');
  $$('.card',pg).forEach(c=>{const open=()=>{const p=PROJ[c.dataset.i];
   m.innerHTML=`<div class="mbox"><h3>${p.t}</h3><p class="mono" style="color:var(--blush);font-size:.85rem">${p.when}</p><p style="margin-top:10px">${p.d}</p><ul>${p.b.map(x=>`<li>${x}</li>`).join('')}</ul><div class="tags">${p.s.map(x=>`<span class="tag">${x}</span>`).join('')}</div><p style="margin-top:18px;color:var(--blush)">${p.n||''}</p><p style="margin-top:14px">${p.l?`<a class="btn fill" href="${p.l}" target="_blank" rel="noopener">Visit live site</a>`:''}<button class="btn" id="x">Close</button></p></div>`;
   m.classList.add('open');$('#x').onclick=close};c.onclick=open;c.onkeydown=e=>e.key==='Enter'&&open()});tilt(pg)};
 chips($('#pf'),[['all','All'],['web','Web'],['research','Research'],['bots','Bots']],draw);draw('all')}

/* ---------- RESUME (edit here) ---------- */
const R={
education:[{t:'Binghamton University',r:'B.S. in Computer Science, Thomas J. Watson College of Engineering and Applied Science',w:'Expected May 2028',b:['Programming and Hardware Fundamentals','Programming with Objects and Data Structures','Architecture from Programmer’s Perspective','Data Structures and Algorithms','Ethics in Computing','Clubs: Binghamton Kickline, CTF Club, Evolution Dance Company, Society of Women Engineers, Taekwondo Club']}],
projects:[{t:'FRI Program Assignment Dashboard',r:'Developer',w:'Jun 2026 – Aug 2026',b:['Debugged and extended a Python/Flask app, adding Google OAuth and assignment management','Built admin workflows for assigning new student assignments','Used by 1,000+ FRI students and instructors']},
 {t:'Watson Combat Robotics League',r:'Lead Web Developer',w:'May 2026 – Present',b:['Built and maintain a responsive HTML/CSS/JS website, published through GitHub','Turned club leadership’s requirements into features','Built a Discord bot with an executive board member to automate role assignments']}],
leadership:[{t:'Freshman Research Immersion Program',r:'Researcher',w:'Aug 2025 – Present',b:['Researching 3D models: ULIP, CLIP, CG3D, TRELLIS.2, LoRA, ControlNet, Native 3D, Image Reward System, FID, CMMD','Worked with a team of seven to design experiments, document results, and present to peers and faculty','Point cloud analysis, 3D modeling, and annotation of 3D spatial datasets']},
 {t:'Girls Who Code',r:'Lead Teaching Instructor',w:'Aug 2025 – Present',b:['Lead weekly coding workshops for middle and high school students at the Binghamton University chapter','Create lessons and hands-on activities that build programming, problem solving, and computational thinking','Adapt instruction to students’ backgrounds with individualized guidance']},
 {t:'Society of Women Engineers',r:'First Year Ambassador',w:'Nov 2025 – Present',b:['Attend sessions on career advancement, technical skills, and leadership','Volunteer in outreach that inspires and mentors young women interested in engineering','Mentor and engage club members while contributing to software development']}],
work:[{t:'Williams Sonoma',r:'Sales Associate and Cashier',w:'Aug 2024 – Present',b:['Processed POS transactions with 100% cash accuracy and kept transaction records','Handled returns and exchanges efficiently','Assisted with merchandising, restocking, and displays']}]};
const tl=$('#tl');
if(tl){const prog=()=>{const b=tl.getBoundingClientRect();tl.style.setProperty('--p',Math.max(0,Math.min(1,(innerHeight*.6-b.top)/b.height)))};
 const draw=k=>{tl.innerHTML=R[k].map((e,i)=>`<div class="ev${i?'':' open'}" tabindex="0"><h3>${e.t}</h3><div class="when">${e.r} · ${e.w}</div><div class="bd"><div><ul>${e.b.map(x=>`<li>${x}</li>`).join('')}</ul></div></div></div>`).join('');
  $$('.ev',tl).forEach(v=>{const f=()=>v.classList.toggle('open');v.onclick=f;v.onkeydown=e=>e.key==='Enter'&&f()});prog()};
 addEventListener('scroll',prog);chips($('#tabs'),[['education','Education'],['projects','Projects'],['leadership','Leadership'],['work','Work']],draw);draw('education')}

/* ---------- SKILLS (edit here) ---------- */
const LANG=[
{n:'Python',c:`def greet(name):\n    return f"Hi, {name}!"\n\nprint(greet("world"))`,u:['FRI Program Assignment Dashboard (Flask backend)']},
{n:'C',c:`#include <stdio.h>\n\nint main(void) {\n  printf("Hello, world!\\n");\n  return 0;\n}`,u:['Coursework: Architecture from Programmer’s Perspective','Coursework: Programming and Hardware Fundamentals']},
{n:'C++',c:`#include <iostream>\n\nint main() {\n  std::cout << "Hello, world!\\n";\n}`,u:['Arduino programming (Arduino is C++ based)']},
{n:'Java',c:`public class Hello {\n  public static void main(String[] a) {\n    System.out.println("Hello, world!");\n  }\n}`,u:['Coursework: Programming with Objects and Data Structures','Built in Eclipse']},
{n:'JavaScript',c:`const greet = n => "Hi, " + n + "!";\nconsole.log(greet("world"));`,u:['Watson Combat Robotics League website','This portfolio']},
{n:'HTML',c:`<h1 class="glow">\n  Hello, world!\n</h1>`,u:['Watson Combat Robotics League website','This portfolio']},
{n:'CSS',c:`.glow {\n  color: #ff2e93;\n  text-shadow: 0 0 12px #ff2e93;\n}`,u:['Watson Combat Robotics League website','This portfolio']},
{n:'CoffeeScript',c:`greet = (name) -> "Hi, #{name}!"\nconsole.log greet "world"`,u:['Part of my web development toolkit']},
{n:'GDScript',c:`func _ready():\n\tprint("Hello, world!")`,u:['Game development in Godot']},
{n:'Arduino',c:`void setup() {\n  pinMode(LED_BUILTIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH);\n  delay(500);\n  digitalWrite(LED_BUILTIN, LOW);\n  delay(500);\n}`,u:['Hardware projects with the Arduino IDE']}];
const TOOLS=[['Flask','web'],['GitHub','dev'],['VS Code','dev'],['Eclipse','dev'],['Replit','dev'],['Godot','hw'],['Arduino IDE','hw'],['Google Workspace','office'],['Microsoft Office Suite','office']];
const f=$('#field');
if(f){let w,h;const sz=()=>{w=f.clientWidth;h=f.clientHeight};sz();addEventListener('resize',sz);
 const m={x:-999,y:-999},code=$('#code'),used=$('#used'),tt=$('#tt');let iv;
 const O=LANG.map((l,i)=>{const e=document.createElement('button');e.className='orb';e.textContent=l.n;const s=96+(i%3)*12;e.style.width=e.style.height=s+'px';f.append(e);
  const o={e,s,x:Math.random()*(w-s),y:Math.random()*(h-s),vx:(Math.random()-.5)*1.4,vy:(Math.random()-.5)*1.4};
  e.onclick=()=>{$$('.orb').forEach(x=>x.classList.remove('sel'));e.classList.add('sel');tt.textContent='~/skills/'+l.n.toLowerCase();clearInterval(iv);let j=0;
   iv=setInterval(()=>{code.textContent=l.c.slice(0,++j)+'▍';if(j>=l.c.length){clearInterval(iv);code.textContent=l.c}},18);
   used.innerHTML='<b>Where I’ve used it:</b><ul>'+l.u.map(x=>`<li>${x}</li>`).join('')+'</ul>'};return o});
 f.onpointermove=e=>{const b=f.getBoundingClientRect();m.x=e.clientX-b.left;m.y=e.clientY-b.top};f.onpointerleave=()=>m.x=-999;
 (function a(){O.forEach((o,i)=>{const cx=o.x+o.s/2,cy=o.y+o.s/2,dx=cx-m.x,dy=cy-m.y,d=Math.hypot(dx,dy)||1;
  if(!still){if(d<170){o.vx+=dx/d*.4;o.vy+=dy/d*.4}
  O.forEach((q,j)=>{if(j<=i)return;const ex=cx-q.x-q.s/2,ey=cy-q.y-q.s/2,dd=Math.hypot(ex,ey)||1;if(dd<(o.s+q.s)/2){const fx=ex/dd*.3,fy=ey/dd*.3;o.vx+=fx;o.vy+=fy;q.vx-=fx;q.vy-=fy}});
  o.vx=o.vx*.985+(Math.random()-.5)*.04;o.vy=o.vy*.985+(Math.random()-.5)*.04;const v=Math.hypot(o.vx,o.vy);if(v>4){o.vx*=4/v;o.vy*=4/v}
  o.x+=o.vx;o.y+=o.vy}
  if(o.x<0||o.x>w-o.s){o.vx*=-1;o.x=Math.max(0,Math.min(w-o.s,o.x))}
  if(o.y<0||o.y>h-o.s){o.vy*=-1;o.y=Math.max(0,Math.min(h-o.s,o.y))}
  o.e.style.transform=`translate(${o.x}px,${o.y}px)`});requestAnimationFrame(a)})();
 const tg=$('#tools');const dt=v=>tg.innerHTML=TOOLS.filter(t=>v==='all'||t[1]===v).map(t=>`<span class="tag" style="font-size:.95rem;padding:6px 14px">${t[0]}</span>`).join(' ');
 chips($('#tf'),[['all','All'],['dev','Dev'],['web','Web'],['hw','Game & hardware'],['office','Office']],dt);dt('all')}
