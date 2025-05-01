// // Função para abrir/fechar o modal do carrinho
// function toggleCarrinhoModal() {
//     const modal = document.getElementById('carrinho-modal');
//     modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
// }

// // Configura os eventos do carrinho
// document.addEventListener('DOMContentLoaded', () => {
//     // Abrir/fechar modal ao clicar no ícone do carrinho
//     const iconeCarrinho = document.querySelector('.lucide-shopping-cart-icon').closest('.menu-header');
//     if (iconeCarrinho) {
//         iconeCarrinho.addEventListener('click', toggleCarrinhoModal);
//     }
    
//     // Fechar modal ao clicar no X
//     const fecharModal = document.querySelector('.fechar-modal');
//     if (fecharModal) {
//         fecharModal.addEventListener('click', toggleCarrinhoModal);
//     }
    
// });