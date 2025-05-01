let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault(); // cancela o zoom com duplo toque
    }
    lastTouchEnd = now;
}, false);