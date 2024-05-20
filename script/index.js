const botoesComprar = document.querySelectorAll('#botoes__ancora__comprar');
const modalBackground = document.querySelector('.modal-background');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');

botoesComprar.forEach(botao => {
    botao.addEventListener("click", (e) => {
        modalBackground.style.display = "block"

    });
});


closeModal.addEventListener("click", (e) => {
        modalBackground.style.display = "none";
});


window.addEventListener("click", (e) => {
    if (e.target === modalBackground) {
        modalBackground.style.display = "none";
    }
});