// Redirecionar para a dashboard com os dados
function redirecionarParaDashboard(usuario) {
    // Salva os dados do usuário logado na sessionStorage
    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    window.location.href = "dash.html";
}


document.addEventListener("DOMContentLoaded", function() {
    // Login Form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const username = document.getElementById("loginUser").value;
            const password = document.getElementById("loginSenha").value;
            const errorElement = document.getElementById("loginError");
            
            // Verifica no sessionStorage
            const userData = JSON.parse(sessionStorage.getItem("usuario_" + username));
            
            if (!userData) {
                errorElement.textContent = "Usuário não encontrado. Por favor, cadastre-se.";
                return;
            }
            
            if (password === userData.senha) {
                redirecionarParaDashboard(userData);
            } else {
                errorElement.textContent = "Senha incorreta.";
            }
        });
    }

    // Configuração da Dashboard
    if (document.getElementById("profile-nome")) {
        carregarDadosDashboard();
        configurarLogout();
    }
});

// Carrega os dados na dashboard
function carregarDadosDashboard() {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    
    if (!usuario) {
        alert("Sessão expirada. Redirecionando para login...");
        window.location.href = "login.html";
        return;
    }

    // Preenche os dados do perfil
    document.getElementById("profile-nome").textContent = usuario.nome || "Não informado";
    document.getElementById("profile-dataNasc").textContent = usuario.dataNasc ? formatarData(usuario.dataNasc) : "Não informado";
    document.getElementById("profile-cpf").textContent = usuario.cpf || "Não informado";
    document.getElementById("profile-sexo").textContent = usuario.sexo ? formatarSexo(usuario.sexo) : "Não informado";
    document.getElementById("profile-email").textContent = usuario.email || "Não informado";
    document.getElementById("profile-telefone").textContent = usuario.telefone ? formatarTelefone(usuario.telefone) : "Não informado";
    document.getElementById("profile-cep").textContent = usuario.cep || "Não informado";
    document.getElementById("profile-rua").textContent = usuario.rua || "Não informado";
    document.getElementById("profile-numero").textContent = usuario.numero || "Não informado";
    document.getElementById("profile-cidade").textContent = usuario.cidade || "Não informado";
    document.getElementById("profile-estado").textContent = usuario.estado || "Não informado";

    // Preenche a trilha 
    if (usuario.trilha) {
        const trilhaInfo = getTrilhaInfo(usuario.trilha);
        document.getElementById("profile-trilha").innerHTML = `
            <img src="img/ícones/${trilhaInfo.icone}" alt="${trilhaInfo.nome}">
            <h4>${trilhaInfo.nome}</h4>
        `;
    }
}


function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

function formatarSexo(sexo) {
    return sexo === "masculino" ? "Masculino" : 
           sexo === "feminino" ? "Feminino" : "Não informado";
}

function formatarTelefone(tel) {
    return tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

function getTrilhaInfo(trilha) {
    const trilhas = {
        "front": { nome: "Programação Front-end", icone: "front-end.png" },
        "back": { nome: "Programação Back-end", icone: "back-end.png" },
        "jogos": { nome: "Programação de Jogos", icone: "jogos.png" },
        "design": { nome: "Design e Experiência", icone: "ux.png" },
        "dados": { nome: "Ciência de Dados", icone: "Frame 48095973.png" }
    };
    return trilhas[trilha] || { nome: "Não selecionada", icone: "default.png" };
}

function configurarLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(e) {
            e.preventDefault();
            sessionStorage.removeItem("usuarioLogado");
            window.location.href = "login.html";
        });
    }
}