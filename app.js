document.addEventListener("DOMContentLoaded", function () {
    mostrarParte1();
    carregarDadosSalvos();
    limparInputs();
});

function limparInputs() {
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
     });
 }

function mostrarParte1() {
    alternarSecoes("section1");
}

function mostrarParte2() {
    if (validarParte1()) {
        alternarSecoes("section2");
    }
}

function mostrarParte3() {
    if (validarParte2()) {
        alternarSecoes("section3");
    }
}

function mostrarParte4() {
     if (validarParte3()) { 
        alternarSecoes("section4");
    }
}

function finalizarInscricao() {
    if (validarParte3()) {
        salvarDados();
        alert("✅ Inscrição realizada com sucesso!");
        
    }
}

function alternarSecoes(id) {
    // Seleciona todas as divs filhas diretas do formulário
    const form = document.getElementById("form");
    const secoes = form.querySelectorAll(":scope > div");
    
    secoes.forEach(div => {
        div.style.display = "none";
    });
    
    const secaoAtual = document.getElementById(id);
    if (secaoAtual) {
        secaoAtual.style.display = "block";
    }
}


// Exibir erro abaixo dos campos
function erro(id, mensagem) {
    let erroElemento = document.getElementById(`${id}-erro`);
    if (erroElemento) {
        erroElemento.textContent = mensagem;
        erroElemento.style.color = "red";
        erroElemento.style.display = "block";
    }
}

// Remover erro quando o usuário digitar
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function () {
        let erroElemento = document.getElementById(`${this.id}-erro`);
        if (erroElemento) {
            erroElemento.textContent = "";
        }
    });
});

function limparErros() {
    document.querySelectorAll(".erro").forEach(el => el.textContent = "");
}

//Mascara
function formatar(mascara, documento) {
    let i = documento.value.length;
    let saida = '#';
    let texto = mascara.substring(i);
    while (texto.substring(0, 1) != saida && texto.length ) {
      documento.value += texto.substring(0, 1);
      i++;
      texto = mascara.substring(i);
    }
  }
    






// Validação dos campos
function validarParte1() {
    limparErros();
    let valido = true;

    let nome = document.getElementById("nome");
    let dataNasc = document.getElementById("data_nascimento");
    let cpf = document.getElementById("cpf");
    let sexo = document.getElementById("sexo");
    let email = document.getElementById("email");

    if (!nome.value.trim()) {
        erro("nome", "⚠ Preencha o nome completo.");
        valido = false;
    }
    if (!validarCPF(cpf.value)) {
        erro("cpf", "⚠ CPF inválido.");
        valido = false;
    }

    if (!sexo.value) {
        erro("sexo", "⚠ Selecione o sexo.");
        valido = false;
    }

    if (!validarEmail(email.value)) {
        erro("email", "⚠ E-mail inválido.");
        valido = false;
    }

    // Validação da data de nascimento
    const hoje = new Date();
    const dataInformada = new Date(dataNasc.value);
    const idadeMinima = 16;

    if (!dataNasc.value) {
        erro("data_nascimento", "⚠ A data de nascimento é obrigatória.");
        valido = false;
    } else {
        const diferencaEmMilissegundos = hoje - dataInformada;
        const idadeEmAnos = diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25);

        if (dataInformada > hoje) {
            erro("data_nascimento", "⚠ A data de nascimento não pode ser no futuro.");
            valido = false;
        } else if (idadeEmAnos < idadeMinima) {
            erro("data_nascimento", `⚠ É necessário ter no mínimo ${idadeMinima} anos.`);
            valido = false;
        }
    }
 
    if (valido) salvarDados();
    return valido;
}


function validarParte2() {
    limparErros();
    let valido = true;

    let cep = document.getElementById("cep");
    let rua = document.getElementById("rua");
    let numero = document.getElementById("numero");    
    let cidade = document.getElementById("cidade");
    let estado = document.getElementById("estado");

    if (!cep.value.match(/^\d{5}-\d{3}$/)) {
        erro("cep", "⚠ CEP inválido.");
        valido = false;
    }
    if (!rua.value.trim()) {
        erro("rua", "⚠ Preencha a rua.");
        valido = false;
    }

    if (!numero.value.trim()) {
    erro("numero", "⚠ Preencha o número.");
    valido = false;
} else if (!/^\d+[A-Za-z\-]{0,2}$/.test(numero.value.trim())) {
    erro("numero", "⚠ Número inválido. Use apenas números e no máximo 2 letras.");
    valido = false;
}


    if (!cidade.value.trim()) {
        erro("cidade", "⚠ Preencha a cidade.");
        valido = false;
    }
    if (!estado.value.trim()) {
        erro("estado", "⚠ Preencha o estado.");
        valido = false;
    }

    if (valido) salvarDados();
    return valido;
}

function validarParte3() {
    limparErros();
    let valido = true;

    let telefone = document.getElementById("telefone");

    if (!telefone.value.trim()) {
        erro("telefone", "⚠ Preencha o telefone.");
        valido = false;
    }

    if (valido) salvarDados();
    return valido;
}

// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
}

// Validação de E-mail
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Busca CEP automático
function buscarCEP() {
    let cep = document.getElementById("cep").value;
    if (cep.length === 9) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById("rua").value = data.logradouro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("estado").value = data.uf;
                } else {
                    erro("cep", "⚠ CEP não encontrado.");
                }
            })
            .catch(() => erro("cep", "⚠ Erro ao buscar CEP."));
    }
}
document.getElementById("cep").addEventListener("blur", buscarCEP);

// Armazena os dados preenchidos
function salvarDados() {
    let dados = {
        nome: document.getElementById("nome").value,
        dataNasc: document.getElementById("data_nascimento").value,
        cpf: document.getElementById("cpf").value,
        sexo: document.getElementById("sexo").value,
        email: document.getElementById("email").value,
        cep: document.getElementById("cep").value,
        rua: document.getElementById("rua").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        telefone: document.getElementById("telefone").value
    };
    sessionStorage.setItem("dadosInscricao", JSON.stringify(dados));
}

// Carrega os dados preenchidos
function carregarDadosSalvos() {
    let dados = JSON.parse(sessionStorage.getItem("dadosInscricao"));
    if (dados) {
        document.getElementById("nome").value = dados.nome || "";
        document.getElementById("cpf").value = dados.cpf || "";
        document.getElementById("email").value = dados.email || "";
        document.getElementById("cep").value = dados.cep || "";
        document.getElementById("rua").value = dados.rua || "";
        document.getElementById("cidade").value = dados.cidade || "";
        document.getElementById("estado").value = dados.estado || "";
        document.getElementById("telefone").value = dados.telefone || "";
    }
}
