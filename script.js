var raiz = document.documentElement;
var btnTema = document.getElementById("btn-tema");
var iconeTema = document.getElementById("icone-tema");

function aplicarTema(tema) {
  raiz.setAttribute("data-tema", tema);
  iconeTema.textContent = tema === "escuro" ? "☀" : "☾";
  localStorage.setItem("tema", tema);
}

aplicarTema(localStorage.getItem("tema") || "claro");

btnTema.addEventListener("click", function () {
  aplicarTema(raiz.getAttribute("data-tema") === "escuro" ? "claro" : "escuro");
});

var nav = document.getElementById("nav");
var btnMenu = document.getElementById("btn-menu");
var links = nav.querySelectorAll("a");

btnMenu.addEventListener("click", function () {
  var aberto = nav.classList.toggle("aberto");
  btnMenu.classList.toggle("aberto", aberto);
  btnMenu.setAttribute("aria-expanded", aberto);
});

links.forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("aberto");
    btnMenu.classList.remove("aberto");
  });
});

var observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
      observador.unobserve(entrada.target);
    }
  });
}, { rootMargin: "0px 0px -80px 0px" });

document.querySelectorAll(".revelar").forEach(function (el) {
  observador.observe(el);
});

var secoes = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", function () {
  var atual = "";

  secoes.forEach(function (secao) {
    if (window.scrollY + 120 >= secao.offsetTop) atual = secao.id;
  });

  links.forEach(function (link) {
    link.classList.toggle("ativo", link.getAttribute("href") === "#" + atual);
  });
});

var modal = document.getElementById("modal");

function fecharModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.getElementById("btn-contato").addEventListener("click", function () {
  modal.hidden = false;
  document.body.style.overflow = "hidden";
});

document.getElementById("fechar-modal").addEventListener("click", fecharModal);

modal.addEventListener("click", function (e) {
  if (e.target === modal) fecharModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") fecharModal();
});

document.getElementById("ano").textContent = new Date().getFullYear();
