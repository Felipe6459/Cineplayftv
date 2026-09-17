(async()=>{const S='https://jbdjfmvdrwdfnuhqrprc.supabase.co';const K='sb_publishable_3ABEFAwN_wzmSu13EyVOwQ_h5Xfmz80';try{const r=await fetch(S+'/rest/v1/cineplay_site_settings?id=eq.1&select=content',{headers:{apikey:K,Authorization:'Bearer '+K}});if(!r.ok)return;const rows=await r.json();const c=rows?.[0]?.content;if(!c)return;window.__cineplaySiteConfig=c;const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),money=v=>{const n=Number(v);return Number.isFinite(n)?n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}):v},wa=(c.whatsapp||'5582996062108').replace(/\D/g,''),ig=c.instagram||'https://www.instagram.com/cineplayerpro';const youtube=v=>{if(!v)return'';try{const u=new URL(v);if(u.hostname.includes('youtu.be'))return'https://www.youtube.com/embed/'+u.pathname.slice(1).split('/')[0];const id=u.searchParams.get('v');if(id)return'https://www.youtube.com/embed/'+id;if(u.pathname.includes('/embed/'))return v}catch{}return v};const yt=youtube(c.youtube);if(c.site_name){$$('.brand span').forEach(e=>e.textContent=c.site_name);document.title=c.site_name+' — Entretenimento em um só lugar'}if(c.hero_title){const e=$('.hero h1');if(e)e.textContent=c.hero_title}if(c.hero_text){const e=$('.hero p');if(e)e.textContent=c.hero_text}if(c.trial_text){$$('.topbar').forEach(e=>e.textContent='🎁 '+c.trial_text+' • Atendimento pelo WhatsApp');const e=$('.hero .btn-primary');if(e)e.textContent='🎁 '+c.trial_text.toUpperCase()}if(c.content_count)$$('.badge').forEach((e,i)=>{if(i===0)e.textContent='🎬 '+c.content_count});if(c.quality_text)$$('.badge').forEach((e,i)=>{if(i===1)e.textContent='📺 '+c.quality_text});if(yt){const e=$('.video iframe');if(e)e.src=yt}const prices=['monthly_1','monthly_2','monthly_3','annual_1','annual_2','annual_3'];const cards=[...$$('.plan')];prices.forEach((k,i)=>{if(c[k]!==undefined&&cards[i]){const e=cards[i].querySelector('.price');if(e){const annual=i>=3;e.innerHTML=money(c[k])+' <small>/'+(annual?'ano':'mês')+'</small>'}const a=cards[i].querySelector('a[href*="wa.me"]');if(a){const tela=(i%3)+1;const plural=tela>1?'telas':'tela';const periodo=i>=3?' anual':'';a.href='https://wa.me/'+wa+'?text='+encodeURIComponent('Quero '+tela+' '+plural+periodo)}}});$$('a[href*="wa.me"]').forEach(a=>{try{const u=new URL(a.href);const text=u.searchParams.get('text');a.href='https://wa.me/'+wa+'?text='+encodeURIComponent(text||'Olá, quero conhecer o Cineplay TV.')}catch{}});const key=$('#pixKey');if(key&&c.pix_key)key.textContent=c.pix_key;$$('a[href*="instagram.com"]').forEach(a=>a.href=ig);if(c.compatibility){const e=$('#compatibilidade .section-title p');if(e)e.textContent=c.compatibility}if(c.faq_1_q){const d=$$('.faq details');[[c.faq_1_q,c.faq_1_a],[c.faq_2_q,c.faq_2_a],[c.faq_3_q,c.faq_3_a]].forEach((x,i)=>{if(d[i]){if(x[0])d[i].querySelector('summary').textContent=x[0];if(x[1])d[i].querySelector('p').textContent=x[1]}})}}catch(e){console.warn('Configuração dinâmica indisponível',e)}})();

/* Promoção controlada pelo GestorPro: permanece inativa até ser ativada e agendada. */
(function(){
  const c=window.__cineplaySiteConfig||null;
  function startPromotion(cfg){
    if(!cfg || String(cfg.promo_active).toLowerCase()!=='true') return;
    if(!cfg.promo_price || !cfg.promo_end) return;
    const now=Date.now(), start=cfg.promo_start?new Date(cfg.promo_start).getTime():0, end=new Date(cfg.promo_end).getTime();
    if(!Number.isFinite(end) || now>end || (start && Number.isFinite(start) && now<start)) return;
    try{if(sessionStorage.getItem('cineplay_promo_seen')==='1')return}catch(e){}
    const delay=Math.max(0,Math.min(3600,Number(cfg.promo_delay)||0))*1000;
    setTimeout(function(){ if(Date.now()>end)return; showPromotion(cfg,end); },delay);
  }
  function showPromotion(cfg,end){
    try{sessionStorage.setItem('cineplay_promo_seen','1')}catch(e){}
    const periodMap={monthly:'Mensal',3months:'3 meses',6months:'6 meses',annual:'1 ano'};
    const monthsMap={monthly:1,3months:3,6months:6,annual:12};
    const period=periodMap[cfg.promo_period]||cfg.promo_period||'Oferta';
    const screens=Math.max(1,Math.min(3,Number(cfg.promo_screens)||1));
    const monthly=Number(cfg['monthly_'+screens]);
    const original=cfg.promo_period==='annual'?Number(cfg['annual_'+screens]):(Number.isFinite(monthly)?monthly*(monthsMap[cfg.promo_period]||1):0);
    const price=Number(cfg.promo_price);
    const money=v=>Number.isFinite(v)?v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}):String(v||'');
    const wa=String(cfg.whatsapp||'5582996062108').replace(/\D/g,'');
    const msg=encodeURIComponent('Quero aproveitar a promoção: '+period+' — '+screens+' '+(screens>1?'telas':'tela')+' por '+money(price)+'.');
    const safe=v=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    const old=document.getElementById('cinePromoOverlay');if(old)old.remove();
    const style=document.createElement('style');style.id='cinePromoStyle';style.textContent=
      '#cinePromoOverlay{position:fixed;inset:0;z-index:99999;background:rgba(3,2,7,.92);display:flex;align-items:center;justify-content:center;padding:18px;opacity:0;transition:opacity .35s ease;backdrop-filter:blur(8px)}'+
      '#cinePromoOverlay.cinePromoOn{opacity:1}#cinePromoBreak{position:absolute;inset:0;pointer-events:none;overflow:hidden}'+
      '.cinePromoCrack{position:absolute;left:50%;top:50%;width:3px;height:80vh;background:rgba(255,255,255,.65);transform-origin:top;box-shadow:0 0 10px rgba(255,255,255,.35);opacity:.8}'+
      '.cinePromoCrack:nth-child(1){transform:rotate(22deg)}.cinePromoCrack:nth-child(2){transform:rotate(68deg)}.cinePromoCrack:nth-child(3){transform:rotate(112deg)}.cinePromoCrack:nth-child(4){transform:rotate(158deg)}'+
      '.cinePromoShard{position:absolute;width:55px;height:55px;background:rgba(167,139,250,.18);border:1px solid rgba(255,255,255,.18);animation:cineShard 1.15s ease-out forwards;opacity:0}'+
      '.cinePromoShard:nth-child(5){left:8%;top:18%;animation-delay:.05s}.cinePromoShard:nth-child(6){right:10%;top:24%;animation-delay:.12s}.cinePromoShard:nth-child(7){left:18%;bottom:15%;animation-delay:.16s}.cinePromoShard:nth-child(8){right:17%;bottom:12%;animation-delay:.22s}'+
      '@keyframes cineShard{0%{opacity:0;transform:translate(0,0) rotate(0) scale(.3)}25%{opacity:1}100%{opacity:0;transform:translate(var(--x,40px),var(--y,150px)) rotate(160deg) scale(.05)}}'+
      '#cinePromoCard{position:relative;width:min(520px,100%);background:linear-gradient(145deg,#171022,#0d0a14);border:2px solid #9b62ff;border-radius:24px;box-shadow:0 25px 90px rgba(0,0,0,.75),0 0 50px rgba(123,44,255,.3);padding:28px;text-align:center;transform:translateY(30px) scale(.92);transition:transform .45s cubic-bezier(.2,.9,.25,1);font-family:Arial,Helvetica,sans-serif;color:#fff}#cinePromoOverlay.cinePromoOn #cinePromoCard{transform:translateY(0) scale(1)}'+
      '#cinePromoClose{position:absolute;right:10px;top:8px;width:38px;height:38px;border:0;border-radius:50%;background:#292035;color:#fff;font-size:24px;cursor:pointer}#cinePromoBadge{display:inline-block;background:#7b2cff;padding:7px 13px;border-radius:999px;font-size:12px;font-weight:900;letter-spacing:.5px;margin-bottom:12px}#cinePromoCard h2{font-size:clamp(27px,7vw,42px);line-height:1.02;margin:5px 0 10px}#cinePromoCard p{color:#d2cde0;margin:8px 0}#cinePromoPrice{font-size:42px;font-weight:900;margin:14px 0 2px;color:#fff}#cinePromoOld{text-decoration:line-through;color:#888;font-size:14px;min-height:20px}#cinePromoTimer{font-size:24px;font-weight:900;letter-spacing:1px;margin:15px 0;padding:12px;border-radius:12px;background:#0a0810;border:1px solid #3b2b50}#cinePromoButton{display:flex;align-items:center;justify-content:center;background:#16b968;color:#fff;border-radius:12px;padding:14px 18px;font-weight:900;text-decoration:none;margin-top:14px}#cinePromoNote{font-size:11px;color:#888;margin-top:10px}';
    document.head.appendChild(style);
    const el=document.createElement('div');el.id='cinePromoOverlay';el.innerHTML='<div id="cinePromoBreak"><i class="cinePromoCrack"></i><i class="cinePromoCrack"></i><i class="cinePromoCrack"></i><i class="cinePromoCrack"></i><i class="cinePromoShard"></i><i class="cinePromoShard"></i><i class="cinePromoShard"></i><i class="cinePromoShard"></i></div><div id="cinePromoCard"><button id="cinePromoClose" aria-label="Fechar">×</button><div id="cinePromoBadge">🔥 OFERTA POR TEMPO LIMITADO</div><h2>'+safe(cfg.promo_title||'Promoção especial')+'</h2><p>'+safe(cfg.promo_text||'Aproveite antes que termine!')+'</p><div style="font-weight:800;margin-top:12px">'+safe(period)+' • '+screens+' '+(screens>1?'telas':'tela')+'</div><div id="cinePromoPrice">'+money(price)+'</div><div id="cinePromoOld">'+(original>0?'De '+money(original):'')+'</div><div id="cinePromoTimer">00d 00h 00m 00s</div><a id="cinePromoButton" href="https://wa.me/'+wa+'?text='+msg+'">🔥 QUERO APROVEITAR</a><div id="cinePromoNote">A oferta encerra automaticamente no horário configurado.</div></div>';
    document.body.appendChild(el);
    const close=()=>{el.style.opacity='0';setTimeout(()=>el.remove(),350);if(style.parentNode)style.remove();clearInterval(timer);if(auto)clearTimeout(auto)};
    document.getElementById('cinePromoClose').onclick=close;
    el.addEventListener('click',e=>{if(e.target===el)close()});
    requestAnimationFrame(()=>el.classList.add('cinePromoOn'));
    const timer=setInterval(()=>{
      const left=end-Date.now(), t=document.getElementById('cinePromoTimer');
      if(left<=0){close();return}
      const s=Math.floor(left/1000),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),sec=s%60;
      if(t)t.textContent=String(d).padStart(2,'0')+'d '+String(h).padStart(2,'0')+'h '+String(m).padStart(2,'0')+'m '+String(sec).padStart(2,'0')+'s';
    },250);
    const autoSeconds=Math.max(0,Math.min(3600,Number(cfg.promo_autoclose)||0));
    const auto=autoSeconds?setTimeout(close,autoSeconds*1000):null;
  }
  function waitForConfig(){if(window.__cineplaySiteConfig)startPromotion(window.__cineplaySiteConfig);else setTimeout(waitForConfig,100)}
  waitForConfig();
})();
