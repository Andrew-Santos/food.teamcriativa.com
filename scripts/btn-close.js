document.querySelectorAll('#close-modal').forEach(div => {
    // Substitui a div por um SVG com a mesma classe e estilos
    const svgHTML = `
        <div id="close-modal" class="modal-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </div>
    `;
    div.outerHTML = svgHTML;
  });
  
  // Adiciona eventos usando delegação (funciona para múltiplos elementos)
  document.addEventListener('mousedown', (e) => {
    if (e.target.closest('#close-modal')) {
      e.target.closest('#close-modal').style.transform = 'scale(0.9)';
      e.target.closest('#close-modal').style.transition = 'transform 0.1s ease';
    }
  });
  
  document.addEventListener('mouseup', (e) => {
    if (e.target.closest('#close-modal')) {
      e.target.closest('#close-modal').style.transform = 'scale(1)';
    }
  });
  
  document.addEventListener('mouseleave', (e) => {
    if (e.target.closest('#close-modal')) {
      e.target.closest('#close-modal').style.transform = 'scale(1)';
    }
  });