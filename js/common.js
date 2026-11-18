// ===== EDIT YOUR LINKS HERE =====
const LINKS={email:'emmaleighgold@gmail.com',linkedin:'https://linkedin.com/in/emmaleigh-goldfarb',github:'https://github.com/egoldfarb5',wcrl:'https://wcrl.github.io/'};
const PAGES=[['index.html','Home'],['projects.html','Projects'],['resume.html','Resume'],['skills.html','Skills']];
const here=location.pathname.split('/').pop()||'index.html';
document.body.insertAdjacentHTML('afterbegin',`<canvas id="bg" aria-hidden="true"></canvas><nav><a class="logo" href="index.html">EG</a><ul>${PAGES.map(([h,n])=>`<li><a href="${h}"${h===here?' aria-current="page"':''}>${n}</a></li>`).join('')}</ul></nav>`);
document.body.insertAdjacentHTML('beforeend',`<footer><a href="mailto:${LINKS.email}">Email</a><a href="${LINKS.linkedin}">LinkedIn</a><span>© ${new Date().getFullYear()} Emmaleigh Goldfarb</span></footer>`);
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// particle background
(()=>{const c=document.getElementById('bg'),x=c.getContext('2d');let w,h,p=[];
const rs=()=>{w=c.width=innerWidth;h=c.height=innerHeight;p=Array.from({length:Math.min(70,w/18)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8+.4,v:Math.random()*.3+.08}))};rs();addEventListener('resize',rs);
const f=()=>{x.clearRect(0,0,w,h);for(const o of p){o.y-=o.v;if(o.y<0){o.y=h;o.x=Math.random()*w}x.beginPath();x.arc(o.x,o.y,o.r,0,7);x.fillStyle='rgba(255,46,147,.55)';x.fill()}if(!calm)requestAnimationFrame(f)};f()})();
// cursor trail
if(!calm&&matchMedia('(pointer:fine)').matches)addEventListener('mousemove',e=>{const d=document.createElement('div');d.className='cursor-dot';d.style.left=e.clientX-5+'px';d.style.top=e.clientY-5+'px';document.body.append(d);requestAnimationFrame(()=>{d.style.opacity=0;d.style.transform='scale(.2)'});setTimeout(()=>d.remove(),600)});
