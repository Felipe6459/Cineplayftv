(()=>{
  const S='https://jbdjfmvdrwdfnuhqrprc.supabase.co';
  const K='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGpmbXZkcndkZm51aHFycHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1MTE3MzEsImV4cCI6MjEwMzA4NzczMX0.yofxMaRrQJkP7g9E8ML5vVbHPL51hrnbiTb42g396F8';
  const endpoint=S+'/rest/v1/rpc/cineplay_track_event';

  async function track(event){
    for(let attempt=0;attempt<3;attempt++){
      try{
        const r=await fetch(endpoint,{
          method:'POST',
          mode:'cors',
          headers:{apikey:K,Authorization:'Bearer '+K,'Content-Type':'application/json'},
          body:JSON.stringify({p_event:event}),
          keepalive:true,
          cache:'no-store'
        });
        if(r.ok)return true;
      }catch(e){}
      await new Promise(resolve=>setTimeout(resolve,350*(attempt+1)));
    }
    return false;
  }

  // Registra a visita uma vez por sessão. O marcador só é salvo depois do envio bem-sucedido.
  (async()=>{
    let seen=false;
    try{seen=sessionStorage.getItem('cineplay_visit_registered')==='1'}catch(e){}
    if(!seen){
      const ok=await track('visit');
      if(ok){try{sessionStorage.setItem('cineplay_visit_registered','1')}catch(e){}}
    }
  })();

  // Cliques são registrados independentemente do sessionStorage.
  document.addEventListener('click',e=>{
    try{
      const target=e.target?.closest?.('a,button');
      if(!target)return;
      const text=(target.textContent||'').toLowerCase();
      const href=(target.getAttribute('href')||'').toLowerCase();
      const isTrial=text.includes('teste grátis')||text.includes('teste gratis')||href.includes('teste%20gr')||href.includes('teste%20grátis')||href.includes('teste%20gratis');
      track(isTrial?'trial_click':'click');
    }catch(e){}
  },{passive:true});
})();
