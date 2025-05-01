document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logout-users');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            const modalHTML = `
                <div class="card-cancel-ok" id="card-cancel-ok">
                    <div class="header" id="card-header">
                        <div class="image" id="card-icon">
                            <svg id="warning-icon" aria-hidden="true" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
                                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke-linejoin="round" stroke-linecap="round"></path>
                            </svg>
                        </div>
                        <div class="content" id="card-content">
                            <span class="title" id="card-title">Sair da conta</span>
                            <p class="message" id="card-message">
                                Deseja mesmo sair da sua conta? Você precisará fazer login novamente para acessá-la.
                            </p>
                        </div>
                        <div class="actions" id="card-actions">
                            <button class="desactivate" id="btn-deactivate" type="button">Sair</button>
                            <button class="cancel" id="btn-cancel" type="button">Cancelar</button>
                        </div>
                    </div>
                </div>
            `;

            // Insere logo após o <head>, antes do conteúdo principal
            const firstElement = document.body.firstElementChild;
            if (firstElement) {
                firstElement.insertAdjacentHTML('beforebegin', modalHTML);
            } else {
                document.body.insertAdjacentHTML('afterbegin', modalHTML);
            }

            // Trava scroll
            document.body.style.overflow = 'hidden';

            document.getElementById('btn-deactivate').addEventListener('click', function () {
                localStorage.clear();
                location.reload();
            });

            document.getElementById('btn-cancel').addEventListener('click', function () {
                const modal = document.getElementById('card-cancel-ok');
                if (modal) modal.remove();
                document.body.style.overflow = 'auto';
            });
        });
    }
});
