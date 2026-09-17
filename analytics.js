(()=>{
  const S='https://jbdjfmvdrwdfnuhqrprc.supabase.co';
  const K='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGpmbXZkcndkZm51aHFycHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1MTE3MzEsImV4cCI6MjEwMzA4NzczMX0.yofxMaRrQJkP7g9E8ML5vVbHPL51hrnbiTb42g396F8';
  const endpoint=S+'/rest/v1/rpc/cineplay_track_event';
  async function trackVisit(){
    try{
      const r=await fetch(endpoint,{method:'POST',mode:'cors',headers:{apikey:K,Authorization:'Bearer '+K,'Content-Type':'application/json'},body:JSON.stringify({p_event:'visit'}),keepalive:true,cache:'no-store'});
      return r.ok;
    }catch(e){return false;}
  }
  // Conta somente a entrada no site: no máximo 1 visita por sessão neste navegador.
  let seen=false;
  try{seen=sessionStorage.getItem('cineplay_visit_registered')==='1'}catch(e){}
  if(!seen){
    trackVisit().then(ok=>{if(ok){try{sessionStorage.setItem('cineplay_visit_registered','1')}catch(e){}}});
  }
})();
