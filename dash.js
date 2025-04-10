document.addEventListener("DOMContentLoaded", function() {
    // Verifica se o usuário está logado
    let usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    
    // Caso nao encontre, busca pelo padrão de chave do login
    if (!usuario) {
        const username = sessionStorage.getItem("ultimoUsuario");
        usuario = JSON.parse(sessionStorage.getItem("usuario_" + username));
    }
    
    if (!usuario) {
        alert("Você precisa fazer login primeiro!");
        window.location.href = "login.html";
        return;
    }

    // Preenche os dados do perfil
    document.getElementById("profile-nome").textContent = usuario.nome;
    document.getElementById("profile-dataNasc").textContent = usuario.dataNasc ? formatarData(usuario.dataNasc) : "Não informado";
    document.getElementById("profile-cpf").textContent = usuario.cpf;
    document.getElementById("profile-sexo").textContent = usuario.sexo ? formatarSexo(usuario.sexo) : "Não informado";
    document.getElementById("profile-email").textContent = usuario.email;
    document.getElementById("profile-telefone").textContent = usuario.telefone;
    document.getElementById("profile-cep").textContent = usuario.cep;
    document.getElementById("profile-rua").textContent = usuario.rua;
    document.getElementById("profile-numero").textContent = usuario.numero;
    document.getElementById("profile-cidade").textContent = usuario.cidade;
    document.getElementById("profile-estado").textContent = usuario.estado;
    

    // Preenche a trilha 
    if (usuario.trilha) {
        const trilhaInfo = getTrilhaInfo(usuario.trilha);
        document.getElementById("profile-trilha").innerHTML = `
            <img src="img/ícones/${trilhaInfo.icone}" alt="${trilhaInfo.nome}" onerror="this.onerror=null;this.src='img/ícones/default.png'">
            <h4>${trilhaInfo.nome}</h4>
        `;
    } else {
        document.getElementById("profile-trilha").innerHTML = `
            <img src="img/ícones/default.png" alt="Nenhuma trilha selecionada">
            
        `;
    }
    
    // Configura o botão de saída
    document.getElementById("logoutBtn").addEventListener("click", function() {
        sessionStorage.removeItem("usuarioLogado");
        window.location.href = "login.html";
    });

    function formatarData(data) {
        if (!data) return "Não informado";
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    function formatarSexo(sexo) {
        if (!sexo) return "Não informado";
        return sexo === "masculino" ? "Masculino" : 
               sexo === "feminino" ? "Feminino" : "Não informado";
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
});