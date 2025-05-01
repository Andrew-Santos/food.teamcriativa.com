//===== PARA SALVAR E CARREGAR CPF E EMAIL NO LOCAL STORAGE =====//
// Ao carregar a página, preenche os campos com o que estiver salvo no localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedCpf = localStorage.getItem('cpf');
    const savedEmail = localStorage.getItem('email');
  
    if (savedCpf) document.getElementById('cpf').value = savedCpf;
    if (savedEmail) document.getElementById('email').value = savedEmail;
});

// ===== ABRIR E FECHAR MODAL USERS ===== //
// Este script é responsável por abrir e fechar o modal de usuários
document.addEventListener('DOMContentLoaded', function() {
    const closeUsers = document.getElementById('close-users');
    const openUsers = document.getElementById('users');
    const modalUsers = document.getElementById('modal-users');
    const containerFormUsers = document.getElementById('container-form-users');

    // Clicar no botão de abrir o modal
    if (openUsers) {
        openUsers.addEventListener('click', function() {
            if (modalUsers) {
                modalUsers.style.display = 'flex';
            }
        });
    }
    
    // Fechar o modal ao clicar no botão de fechar
    if (closeUsers) {
        closeUsers.addEventListener('click', function() {
            if (modalUsers) {
                modalUsers.style.display = 'none';
            }
        });
    }

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalUsers.style.display === 'block') {
            modalUsers.style.display = 'none';
        }
    });

});




// ===== VALIDAR FORMULÁRIO OU CADASTRAR ===== //
// Este script é responsável por validar o formulário de cadastro de usuários
// e enviar os dados para o servidor
// Função para mostrar mensagens
function showMessage(msg, color) {
    const containerReturn = document.getElementById('container-return-users');
    const returnUsers = document.getElementById('return-users');
    const iconUsers = document.getElementById('icon-users');

  
    containerReturn.style.display = 'flex';
    returnUsers.innerText = msg;
    returnUsers.style.color = color;
    iconUsers.style.color = color;
  }
  
  // Submit do formulário
    document.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault(); // Impede envio padrão
    
        const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        const email = document.getElementById('email').value.trim().toLowerCase();
    
        if (!cpf || !email) {
            showMessage('Preencha todos os campos.', 'red');
            return;
        }
    
        // Busca pelo CPF
        const { data: cpfData, error: cpfError } = await supabase
            .from('cliente')
            .select('*')
            .eq('cpf', cpf)
            .single();
    
        if (cpfData) {
            // CPF encontrado, agora verifica o e-mail
            if (cpfData.email.toLowerCase() === email) {
                showMessage('Usuário encontrado ✅', 'green');

                localStorage.setItem('clienteData', JSON.stringify(cpfData));
                console.log(cpfData);


                document.getElementById('cpf').disabled = true;
                document.getElementById('email').disabled = true;
                document.getElementById('container-btn-users').style.display = 'none';
                document.getElementById('modal-users').style.display = 'none';
                document.getElementById('logout-users').style.display = 'flex';
                
                location.reload(true);

                    // Aqui pode continuar o processo de login ou envio de dados
                } else {
                    showMessage('E-mail divergente ❌', 'red');
                }
        } else {
        // CPF não encontrado, procurar pelo e-mail
        const { data: emailData, error: emailError } = await supabase
            .from('cliente')
            .select('*')
            .eq('email', email)
            .single();
    
        if (emailData) {
            showMessage('CPF divergente ❌', 'red');
        } else {
            // Não encontrou nem CPF nem e-mail: cadastrar novo cliente
            const { data: insertData, error: insertError } = await supabase
                .from('cliente')
                .insert([
                    { cpf: cpf, email: email }
                ]);
    
            if (insertError) {
                showMessage('Erro ao cadastrar. Tente novamente.', 'red');
                console.error(insertError);
            } else {
                showMessage('Nova Conta ✅', 'green');
                localStorage.setItem('cpf', cpf);
                localStorage.setItem('email', email);
                document.getElementById('form-users-completo').style.display = 'flex';
                document.getElementById('cpf').disabled = true;
                document.getElementById('email').disabled = true;
                document.getElementById('editar-dados').style.display = 'inline-flex';
                document.getElementById('container-btn-users').style.display = 'none';



            }
        }
        }
    
});


// ====== PARA EDITAR EMAIL E CPF ====== //
// Este script é responsável por habilitar os campos de CPF e E-mail para edição
// e esconder o botão de editar dados
// quando o usuário clicar nele
document.getElementById('editar-dados').addEventListener('click', function() {
    document.getElementById('cpf').disabled = false;
    document.getElementById('email').disabled = false;
    document.getElementById('form-users-completo').style.display = 'none';
    this.style.display = 'none'; // Esconde o botão de editar depois que clicou
    document.getElementById('container-btn-users').style.display = 'flex'; // Mostra o botão de cadastrar novamente

});


//===== PARA FECHAR O MODAL CADASTRO =====//
// Este script é responsável por fechar o modal de cadastro de usuários
// e voltar para o estado inicial
document.getElementById('close-cadastro-users').addEventListener('click', function() {
    // Colocar display none no formulário de usuários
    document.getElementById('form-users-completo').style.display = 'none';
    
    // Colocar display none no botão editar dados
    document.getElementById('editar-dados').style.display = 'none';
    
    // Colocar display flex no container de botões de usuários
    document.getElementById('container-btn-users').style.display = 'flex';
});
