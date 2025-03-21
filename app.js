
function mostrarParte1() {
    document.getElementById('section1').style.display = 'block';
    document.getElementById('section2').style.display = 'none';
    document.getElementById('section3').style.display = 'none';
}

function mostrarParte2() {
    document.getElementById('section1').style.display = 'none';
    document.getElementById('section2').style.display = 'block';
    document.getElementById('section3').style.display = 'none';
}

function mostrarParte3() {
    document.getElementById('section1').style.display = 'none';
    document.getElementById('section2').style.display = 'none';
    document.getElementById('section3').style.display = 'block';
}

// Inicializa o formulário mostrando apenas a primeira seção

document.querySelector(".cancela").addEventListener("click", function() {
    window.location.href = "capa.html";
});

mostrarParte1();