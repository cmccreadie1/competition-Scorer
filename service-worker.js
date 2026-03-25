let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // This event ONLY fires if the manifest and service worker are 100% correct
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.remove('hidden'); // Show your custom "Install Now" button
    console.log("PWA Install criteria met! Button is now visible.");
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        installBtn.classList.add('hidden');
    } else {
        alert("Chrome hasn't verified the App yet. Try refreshing and wait 10 seconds.");
    }
});
