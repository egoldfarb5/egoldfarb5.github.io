// Edit the “used” lines to match where you've really used each language.
const L=[
['Python','python.svg','print("Hello, FRI!")\nfor student in roster:\n    assign(student, new_assignment)','Flask back end of the FRI Program Assignment Dashboard, including Google OAuth and admin workflows.',1,-90],
['JavaScript','javascript.svg','const btn = document.querySelector(".join");\nbtn.addEventListener("click", () => welcome());','Interactive features on the Watson Combat Robotics League website.',0,-45],
['HTML','html.svg','<main>\n  <h1>Watson Combat Robotics League</h1>\n</main>','Page structure for the Watson Combat Robotics League website.',0,-135],
['CSS','css.svg','.card:hover {\n  box-shadow: 0 0 30px hotpink;\n}','Responsive layouts and styling for the robotics league website.',0,135],
['Java','java.svg','public class Hello {\n  public static void main(String[] a) {\n    System.out.println("Hi!");\n  }\n}','Object-oriented programming and data structures coursework.',0,45],
['C','c.svg','#include <stdio.h>\nint main(void) {\n  printf("Hello, hardware!\\n");\n}','Coursework on hardware and computer architecture from a programmer’s perspective.',1,198],
['C++','cpp.svg','#include <iostream>\nint main() {\n  std::cout << "Hello!\\n";\n}','Coursework and programming projects.',1,-18],
['GDScript','gdscript.svg','extends Node2D\nfunc _ready():\n\tprint("Game started")','Game projects built in the Godot engine.',1,126],
['Git','git.svg','git status\ngit add .\ngit commit -m "Build something great"','Version control for portfolio work and other programming projects.',1,54]
];
const field=document.getElementById('field');
const code_=document.getElementById('code'),used_=document.getElementById('used'),tname=document.getElementById('tname');
const tracks=[{phase:0,speed:.00042,direction:1,hovered:false},{phase:0,speed:.00024,direction:-1,hovered:false}];
let selected=null,raf=0,running=false,inView=true,last=0;
const orbs=L.map(([name,logo,code,used,ring,angle],i)=>{
  const el=document.createElement('button');
  el.className='orb';el.type='button';el.setAttribute('aria-label',`${name} skill details`);
  el.style.setProperty('--float-time',`${3.2+(i%4)*.55}s`);el.style.setProperty('--float-delay',`${-(i%5)*.7}s`);
  el.innerHTML=`<img src="logos/${logo}" alt=""><span>${name}</span>`;
  const orb={el,name,code,used,ring,offset:angle*Math.PI/180};
  el.addEventListener('pointerenter',()=>{tracks[ring].hovered=true;el.classList.add('is-hovered')});
  el.addEventListener('pointerleave',()=>{tracks[ring].hovered=false;el.classList.remove('is-hovered')});
  el.addEventListener('focus',()=>el.classList.add('is-hovered'));
  el.addEventListener('blur',()=>el.classList.remove('is-hovered'));
  el.addEventListener('click',e=>{e.stopPropagation();select(orb)});
  field.append(el);return orb;
});
function select(orb){
  selected=selected===orb?null:orb;
  orbs.forEach(o=>o.el.classList.toggle('selected',o===selected));
  if(selected){tname.textContent=`~/${selected.name.toLowerCase()} — sample.txt`;code_.textContent=selected.code;used_.innerHTML=`<b>Where I used it:</b> ${selected.used}`}
  else {tname.textContent='Select a language';code_.textContent='// Select an orb above to get started.';used_.textContent=''}
}
field.addEventListener('click',()=>{if(selected)select(selected)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&selected)select(selected)});
function render(){
  const w=field.clientWidth,h=field.clientHeight,cx=w/2,cy=h/2,base=Math.min(h,w*.84),radii=[base*.245,base*.44];
  orbs.forEach(orb=>{const a=tracks[orb.ring].phase+orb.offset,r=radii[orb.ring];orb.el.style.left=`${cx+r*Math.cos(a)}px`;orb.el.style.top=`${cy+r*Math.sin(a)}px`});
}
function frame(now){
  if(!running)return;
  const elapsed=Math.min(now-last||16,40);last=now;
  tracks.forEach((track,i)=>{const factor=selected&&selected.ring===i?.035:track.hovered?.42:1;track.phase+=track.speed*track.direction*factor*elapsed});
  render();raf=requestAnimationFrame(frame);
}
function play(){if(!calm&&!running){running=true;last=0;raf=requestAnimationFrame(frame)}}
function pause(){running=false;cancelAnimationFrame(raf)}
new ResizeObserver(render).observe(field);render();
const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(inView&&!document.hidden)play();else pause()},{threshold:.05});observer.observe(field);
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else if(inView)play()});
if(!calm)play();
// tools
const T=[['Flask','Web'],['GitHub','Dev'],['VS Code','Dev'],['Eclipse','Dev'],['Replit','Dev'],['Arduino IDE','Hardware'],['Godot','Games'],['Google Workspace','Office'],['Microsoft Office Suite','Office']];
const tf=document.getElementById('tf'),tools=document.getElementById('tools');
tools.innerHTML=T.map(([n,c])=>`<span class="tool" data-c="${c}">${n}</span>`).join('');
['All',...new Set(T.map(t=>t[1]))].forEach((n,i)=>{const b=document.createElement('button');b.className='chip';b.textContent=n;b.setAttribute('aria-pressed',i===0);b.onclick=()=>{tf.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));tools.querySelectorAll('.tool').forEach(t=>t.classList.toggle('hide',!(n==='All'||t.dataset.c===n)))};tf.append(b)});
