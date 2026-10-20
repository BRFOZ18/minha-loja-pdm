if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .catch(function(erro) {
      console.error('Erro ao registrar service worker:', erro);
    });
}

let pedidoInstalacao;

window.addEventListener('beforeinstallprompt', function(evento) {
  evento.preventDefault();
  pedidoInstalacao = evento;

  document.getElementById('installAppBt')
    .classList.remove('collapse');
});

async function installApp() {
  if (!pedidoInstalacao) {
    return;
  }

  pedidoInstalacao.prompt();
  await pedidoInstalacao.userChoice;

  pedidoInstalacao = null;

  document.getElementById('installAppBt')
    .classList.add('collapse');
}

window.addEventListener('appinstalled', function() {
  pedidoInstalacao = null;

  document.getElementById('installAppBt')
    .classList.add('collapse');
});