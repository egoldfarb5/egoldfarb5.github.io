const sp=document.getElementById('splash');
function type(el,txt,speed,done){let i=0;(function t(){el.textContent=txt.slice(0,++i);i<txt.length?setTimeout(t,speed):done&&done()})()}
function start(){
  const tag=document.getElementById('tag'),lines=['Computer Science @ Binghamton University','Web developer','3D vision researcher','Girls Who Code instructor'];let li=0;
  (function next(){const s=lines[li++%lines.length];type(tag,s,45,()=>setTimeout(()=>{let n=s.length;(function d(){tag.textContent=s.slice(0,--n);n?setTimeout(d,22):next()})()},1600))})();
  document.querySelectorAll('[data-n]').forEach(e=>{const to=+e.dataset.n,suf=e.dataset.s||'',t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1400);e.textContent=Math.round(to*(1-Math.pow(1-k,3)))+suf;if(k<1)requestAnimationFrame(f)})(t0)});
}
if(sessionStorage.getItem('seen')||calm){sp.remove();start()}
else{type(document.getElementById('sname'),'Emmaleigh Goldfarb',90,()=>setTimeout(()=>{sp.classList.add('out');sessionStorage.setItem('seen',1);start();setTimeout(()=>sp.remove(),900)},700))}
