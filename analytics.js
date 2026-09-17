(()=>{
  const S='https://jbdjfmvdrwdfnuhqrprc.supabase.co';
  const K=['sb_publishable_3ABEFAwN_','wzmSu13EyVOQ_h5Xfmz80'].join('');
  const endpoint=S+'/rest/v1/rpc/cineplay_track_event';

  async function track(event){
    try{
      const r=await fetch(endpoint,{
        method:'POST',
        mode:'cors',
        headers:{
          apikey:K,
          Authorization:'Bearer '+K,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({p_event:event}),
        keepalive:true,
        cache:'no-store'
      });
      return r.ok;
    }catch(e){
      return false;
    }
  }

  // A visita é registrada uma vez por sessão, mas nunca pode impedir o rastreamento de cliques.
  try{
    let seen=false;
    try{seen=sessionStorage.getItem('cineplay_visit_registered')==='1'}catch(e){}
    if(!seen){
      try{sessionStorage.setItem('cineplay_visit_registered','1')}catch(e){}
      track('visit');
    }
  }catch(e){}

  // Rastreamento de cliques fica independente do sessionStorage.
  document.addEventListener('click',e=>{
    try{
      const target=e.target?.closest?.('a,button');
      if(!target)return;
      const text=(target.textContent||'').toLowerCase();
      const href=(target.getAttribute('href')||'').toLowerCase();
      const isTrial=
        text.includes('teste grátis')||
        text.includes('teste gratis')||
        href.includes('teste%20gr')||
        href.includes('teste%20grátis')||
        href.includes('teste%20gratis');
      track(isTrial?'trial_click':'click');
    }catch(e){}
  },{passive:true});
})();
