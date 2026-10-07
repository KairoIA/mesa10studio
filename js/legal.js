/* Página legal (04-oct-2026): monta los datos del titular, que van al revés en data-r para que no los recojan
   los robots (como el correo de la portada), y pone el año del pie. */
(function () {
  document.querySelectorAll('.dato[data-r]').forEach(function (el) {
    var texto = el.getAttribute('data-r').split('').reverse().join('');
    el.textContent = texto;
    el.removeAttribute('data-r');
    if (el.classList.contains('dato--correo')) el.href = 'mailto:' + texto;
  });
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
