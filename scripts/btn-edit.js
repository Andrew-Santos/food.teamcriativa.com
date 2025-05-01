document.querySelectorAll('.container-btn-edit').forEach(div => {
  const svgHTML = `
    <svg class="w-[30px] h-[30px] text-gray-800 dark:text-white"
         style="display: flex; align-items: center; cursor: pointer;"
         aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
         width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round"
            stroke-linejoin="round" stroke-width="1.5"
            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
    </svg>
  `;
  div.insertAdjacentHTML('beforeend', svgHTML);
});

// Eventos continuam funcionando normalmente
document.addEventListener('mousedown', (e) => {
  if (e.target.closest('.container-btn-edit')) {
    e.target.closest('.container-btn-edit').style.transform = 'scale(0.9)';
    e.target.closest('.container-btn-edit').style.transition = 'transform 0.1s ease';
  }
});

document.addEventListener('mouseup', (e) => {
  if (e.target.closest('.container-btn-edit')) {
    e.target.closest('.container-btn-edit').style.transform = 'scale(1)';
  }
});

document.addEventListener('mouseleave', (e) => {
  if (e.target.closest('.container-btn-edit')) {
    e.target.closest('.container-btn-edit').style.transform = 'scale(1)';
  }
});
