(function(){
  'use strict';
  const SEEN='cineplay_wheel_seen_v1';
  function safe(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function init(c){
    if(!c||String(c.wheel_active||'false').toLowerCase()!=='true')return;
    let seen=false;try{seen=sessionStorage.getItem(SEEN)==='1'}catch(e){}
    if(seen)return;
    const prizes=String(c.wheel_prizes||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
    if(prizes.length<2)return;
    const delay=Math.max(0,Math.min(60,Number(c.wheel_delay)||0))*1000;
    const wa=String(c.whatsapp||'5582996062108').replace(/\D/g,'');
    setTimeout(show,delay);
    function show(){
      if(document.getElementById('cpWheelOverlay'))return;
      try{sessionStorage.setItem(SEEN,'1')}catch(e){}
      const overlay=document.createElement('div');overlay.id='cpWheelOverlay';
      const style=document.createElement('style');style.id='cpWheelStyle';style.textContent=`
      #cpWheelOverlay{position:fixed;inset:0;z-index:100000;background:rgba(5,3,10,.88);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:14px;font-family:Arial,sans-serif;color:#fff}
      #cpWheelCard{width:min(540px,100%);max-height:95vh;overflow:auto;text-align:center;background:linear-gradient(145deg,#1b1228,#0d0915);border:1px solid #8b5cf6;border-radius:22px;padding:22px;box-shadow:0 20px 70px rgba(0,0,0,.6)}
      #cpWheelClose{float:right;border:0;background:#30213f;color:white;border-radius:50%;width:36px;height:36px;font-size:22px;cursor:pointer}
      #cpWheelCard h2{font-size:26px;margin:12px 0 8px;color:#d6c3ff}#cpWheelCard p{color:#cfc5dc}
      #cpWheelCanvas{width:min(340px,75vw);height:min(340px,75vw);max-width:340px;max-height:340px;margin:14px auto;display:block}
      #cpWheelSpin{background:linear-gradient(135deg,#8b5cf6,#6d3fd0);color:#fff;border:0;border-radius:12px;padding:14px 22px;font-weight:900;font-size:16px;width:100%;cursor:pointer}
      #cpWheelSpin:disabled{opacity:.6}#cpWheelResult{min-height:30px;font-weight:800;color:#e9d5ff;margin:14px 0}#cpWheelWA{display:none;background:#16a34a;color:white;text-decoration:none;padding:13px;border-radius:12px;font-weight:900}
      `;
      document.head.appendChild(style);
      overlay.innerHTML='<div id="cpWheelCard"><button id="cpWheelClose" aria-label="Fechar">×</button><h2>'+safe(c.wheel_title||'Gire e descubra seu bônus')+'</h2><p>'+safe(c.wheel_text||'Uma oferta de boas-vindas para você!')+'</p><div style="position:relative"><div style="position:absolute;top:-3px;left:50%;transform:translateX(-50%);z-index:2;font-size:30px">▼</div><canvas id="cpWheelCanvas" width="600" height="600"></canvas></div><button id="cpWheelSpin">🎡 GIRAR A ROLETA</button><div id="cpWheelResult" aria-live="polite"></div><a id="cpWheelWA" target="_blank" rel="noopener">📲 FALAR NO WHATSAPP</a><small style="color:#888">Consulte as condições do benefício antes de contratar.</small></div>';
      document.body.appendChild(overlay);
      const canvas=document.getElementById('cpWheelCanvas'),ctx=canvas.getContext('2d'),n=prizes.length,arc=Math.PI*2/n;
      let rotation=0,spinning=false,selected=0;
      const palette=['#7c3aed','#2563eb','#9333ea','#4f46e5','#a855f7','#6d28d9','#8b5cf6','#4338ca'];
      function draw(){ctx.clearRect(0,0,600,600);ctx.save();ctx.translate(300,300);ctx.rotate(rotation);for(let i=0;i<n;i++){ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,285,i*arc,(i+1)*arc);ctx.closePath();ctx.fillStyle=palette[i%palette.length];ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.stroke();ctx.save();ctx.rotate(i*arc+arc/2);ctx.textAlign='right';ctx.fillStyle='#fff';ctx.font='bold 24px Arial';let label=prizes[i];if(label.length>28)label=label.slice(0,26)+'…';ctx.shadowColor='#000';ctx.shadowBlur=4;ctx.fillText(label,255,8);ctx.restore()}ctx.beginPath();ctx.arc(0,0,46,0,Math.PI*2);ctx.fillStyle='#160d25';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.stroke();ctx.restore()}
      draw();
      const close=()=>{overlay.remove();style.remove()};document.getElementById('cpWheelClose').onclick=close;overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
      document.getElementById('cpWheelSpin').onclick=()=>{
        if(spinning)return;spinning=true;const btn=document.getElementById('cpWheelSpin');btn.disabled=true;
        selected=Math.floor(Math.random()*n);const center=-Math.PI/2,angle=selected*arc+arc/2;const target=((center-angle)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);const start=rotation;rotation+=Math.PI*2*6+target;const total=rotation-start,begin=performance.now(),duration=4800;
        function frame(now){const t=Math.min(1,(now-begin)/duration),ease=1-Math.pow(1-t,4);rotation=start+total*ease;draw();if(t<1)requestAnimationFrame(frame);else{spinning=false;const prize=prizes[selected];document.getElementById('cpWheelResult').textContent='🎉 Seu bônus: '+prize;const link=document.getElementById('cpWheelWA');link.href='https://wa.me/'+wa+'?text='+encodeURIComponent('Olá! Girei a roleta no Cine Player Pro e meu bônus foi: '+prize+'. Como faço para aproveitar?');link.style.display='block';btn.textContent='🎉 BÔNUS DESCOBERTO'}}requestAnimationFrame(frame)
      };
    }
  }
  function load(){if(window.cineplaySiteConfig)init(window.cineplaySiteConfig);else window.addEventListener('cineplay-config-loaded',e=>init(e.detail),{once:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();