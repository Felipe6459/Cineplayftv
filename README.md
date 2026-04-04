# Cineplayftv
Cineplay TV - Filmes, séries e canais em um só lugar
<!DOCTYPE html><html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cineplay TV</title>
<style>
body{margin:0;font-family:Arial;background:#0b0b0b;color:#fff;text-align:center}
.header{background:#7b2cff;padding:12px;font-weight:bold}
.banner{background:url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop') center/cover no-repeat;padding:70px 20px}
.overlay{background:rgba(0,0,0,0.7);padding:40px;border-radius:10px}
.container{padding:20px}
.btn{display:block;margin:12px auto;padding:15px;background:#ff2d2d;color:#fff;text-decoration:none;border-radius:12px;width:90%;max-width:320px;font-weight:bold;transition:0.3s}
.btn:hover{transform:scale(1.05)}
.card{background:#1a1a1a;margin:15px auto;padding:20px;border-radius:15px;max-width:350px;transition:0.3s}
.card:hover{transform:scale(1.03)}
.highlight{border:2px solid #7b2cff}
.price{font-size:22px;color:#7b2cff;margin:10px 0}
.review{background:#111;padding:15px;margin:10px auto;border-radius:10px;max-width:320px;display:flex;align-items:center;gap:10px}
.review img{width:40px;height:40px;border-radius:50%}
.stars{color:gold}
.footer{margin-top:30px;padding:20px;font-size:14px;color:#aaa}
.whatsapp-float{position:fixed;bottom:20px;right:20px;background:#25d366;color:#fff;padding:15px;border-radius:50%;font-size:22px;text-decoration:none}
.popup{position:fixed;bottom:10px;left:10px;background:#111;padding:10px 15px;border-radius:10px;font-size:13px;display:none}
.countdown{font-size:18px;margin:10px 0;color:#ff2d2d}
</style>
</head>
<body><div class="header">🚨 PROMOÇÃO ACABA EM <span id="timer"></span></div><div class="banner">
<div class="overlay">
<h1>🎬 Cineplay TV</h1>
<p>+100 MIL conteúdos liberados</p>
<p>🔥 Cancele Netflix, Prime e outros</p>
<a class="btn" href="https://wa.me/5582996062108?text=Quero%20teste%20gratis">🎁 TESTE GRÁTIS</a>
</div>
</div><div class="container"><h2>⭐ Avaliações Reais</h2>
<div class="review">
<img src="https://randomuser.me/api/portraits/men/32.jpg">
<div><p>Top demais, sem travar</p><div class="stars">★★★★★</div></div>
</div>
<div class="review">
<img src="https://randomuser.me/api/portraits/women/45.jpg">
<div><p>Melhor que Netflix</p><div class="stars">★★★★★</div></div>
</div>
<div class="review">
<img src="https://randomuser.me/api/portraits/men/12.jpg">
<div><p>Uso todo dia</p><div class="stars">★★★★★</div></div>
</div><h2>💰 Planos Mensais</h2><div class="card">
<h3>1 Tela</h3>
<div class="price">R$ 24,90</div>
<a class="btn" href="https://wa.me/5582996062108?text=Quero%201%20tela">Assinar</a>
</div><div class="card highlight">
<h3>2 Telas ⭐ Mais Vendido</h3>
<div class="price">R$ 34,90</div>
<a class="btn" href="https://wa.me/5582996062108?text=Quero%202%20telas">Assinar</a>
</div><div class="card">
<h3>3 Telas</h3>
<div class="price">R$ 39,90</div>
<a class="btn" href="https://wa.me/5582996062108?text=Quero%203%20telas">Assinar</a>
</div><h2>🔥 Planos Anuais</h2><div class="card">
<h3>1 Tela</h3>
<div class="price">R$ 179,90</div>
<a class="btn" href="https://wa.me/5582996062108?text=Quero%20anual%201%20tela">Assinar</a>
</div><div class="card highlight">
<h3>2 Telas ⭐</h3>
<div class="price">R$ 229,90</div>
<a class="btn" href="https://wa.me/5582996062108?text=Quero%20anual%202%20telas">Assinar</a>
</div><div class="card">
<h3>3 Telas</h3>
<div class="price">R$ 264,90</div>
<a class="btn" href="https://wa.me/5582996062108?text=Quero%20anual%203%20telas">Assinar</a>
</div><h2>📺 Benefícios</h2>
<p>✔ +100 mil conteúdos<br>✔ Sem travamentos<br>✔ Funciona em qualquer dispositivo</p><h2>❓ FAQ</h2>
<p><b>Funciona em TV?</b> Sim</p>
<p><b>Tem fidelidade?</b> Não</p>
<p><b>Precisa de cartão?</b> Não</p><a class="btn" href="https://wa.me/5582996062108?text=Quero%20come%C3%A7ar">🚀 COMEÇAR AGORA</a>

</div><div class="footer">© Cineplay TV</div><a class="whatsapp-float" href="https://wa.me/5582996062108">💬</a>

<div class="popup" id="popup">Alguém acabou de comprar 👀</div><script>
// contador regressivo
let time=600;
setInterval(()=>{
let m=Math.floor(time/60);
let s=time%60;
document.getElementById('timer').innerHTML=m+":"+(s<10?'0':'')+s;
time--;
if(time<0) time=600;
},1000);

// popup vendas
setInterval(()=>{
let p=document.getElementById('popup');
p.style.display='block';
setTimeout(()=>{p.style.display='none';},3000);
},8000);
</script></body>
</html>