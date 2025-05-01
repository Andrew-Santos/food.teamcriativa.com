// ===== MASCARAR CPF ===== //
// Este script é responsável por aplicar a máscara de CPF no campo de entrada
// O CPF deve ser inserido no formato XXX.XXX.XXX-XX
document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
  
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  
    e.target.value = value;
});

//===== VALIDAR CPF =====//
// Este script é responsável por validar o CPF inserido no campo de entrada
// O CPF deve ser um número válido e não pode ser uma sequência de números iguais
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
  
    return true;
  }
  
  // Escutador no input de CPF
    document.getElementById('cpf').addEventListener('input', function(e) {
        const cpf = e.target.value.replace(/\D/g, '');
        const returnUsers = document.getElementById('return-users');
        const containerReturn = document.getElementById('container-return-users');
        const iconUsers = document.getElementById('icon-users');
    
        if (cpf.length === 11) {
        containerReturn.style.display = 'flex';
    
        if (validarCPF(cpf)) {
            returnUsers.innerText = 'CPF válido ✅';
            returnUsers.style.color = 'green';
            iconUsers.style.color = 'green';
        } else {
            returnUsers.innerText = 'Digite um CPF válido ❌';
            returnUsers.style.color = 'red';
            iconUsers.style.color = 'red';
        }
        } else {
        containerReturn.style.display = 'none';
        returnUsers.innerText = '';
        iconUsers.style.color = ''; // Volta pra cor padrão quando apagar
    }
});



// ===== MASCARAR TELEFONE ===== //
// Este script é responsável por aplicar a máscara de telefone no campo de entrada
// O telefone deve ser inserido no formato +XX XX X XXXX-XXXX
const ddiInput = document.getElementById('ddi');
const dddInput = document.getElementById('ddd');
const telefoneInput = document.getElementById('telefone');
const resultadoDiv = document.getElementById('resultado-telefone');
const checkWhatsappDiv = document.getElementById('check-whatsapp');
const checkWhats = document.getElementById('check-whats');

telefoneInput.addEventListener('input', () => {
  let valor = telefoneInput.value.replace(/\D/g, ''); // tira tudo que não é número

  // Aplica a máscara com hífen depois do quarto dígito
  if (valor.length > 4) {
    valor = valor.slice(0, 4) + '-' + valor.slice(4, 8);
  }
  telefoneInput.value = valor;

  // Gera o número completo sem espaços, parênteses, nem hífens
  const ddi = ddiInput.value.replace('+', '').replace(/\D/g, '');
  const ddd = dddInput.value.replace(/\D/g, '');
  const telefoneSemFormatacao = '9' + telefoneInput.value.replace(/\D/g, '');

  const numeroCompleto = `+${ddi}${ddd}${telefoneSemFormatacao}`;

  // Só exibe se todos os campos tiverem conteúdo
  if (ddi && ddd && telefoneSemFormatacao.length === 9) {
    resultadoDiv.textContent = numeroCompleto;
    checkWhatsappDiv.style.display = 'flex'; // Exibe a div com o checkbox quando o número estiver completo
  } else {
    resultadoDiv.textContent = '';
    checkWhatsappDiv.style.display = 'none'; // Esconde o checkbox quando o número não está completo
  }
});

// Se quiser atualizar o resultado também se mudar DDI ou DDD:
[ddiInput, dddInput].forEach(input => {
  input.addEventListener('input', () => {
    telefoneInput.dispatchEvent(new Event('input'));
  });
});

// ===== MASCARAR CEP ===== //
// Este script é responsável por aplicar a máscara de CEP no campo de entrada
// O CEP deve ser inserido no formato XXXXX-XXX
document.getElementById('cep').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
  if (value.length > 5) {
    value = value.slice(0, 5) + '-' + value.slice(5, 8);
  }
  e.target.value = value;
});