/* Mesa 10 Studio: lo primero que se ejecuta (en el <head>, antes de pintar). Marca que hay JS para que el CSS
   prepare las animaciones. Va en su fichero y no en línea para que la política de seguridad (CSP) pueda
   prohibir todo script en línea: un script inyectado no correría. */
document.documentElement.classList.replace('sin-js', 'js');
