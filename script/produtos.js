document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://fakestoreapi.com/products";
  const productContainer = document.querySelector(".lancamentos__cards");

  async function fetchProducts() {
    try {
      const response = await fetch(API_URL);
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  function displayProducts(products) {
    productContainer.innerHTML = "";

    products.forEach((product) => {
      const productHTML = `
                <div class="card" data-id="${product.id}">
                    <div class="card__descricao">
                        <div class="descricao">
                            <h2 class="descricao__titulo-produto">${
                              product.title
                            }</h2>
                            <p class="descricao__texto">${product.category}</p>
                            <p class="descricao__texto descricao__texto__valor__texto">Valor:</p>
                            <p class="descricao__texto descricao__texto__valor">${product.price.toFixed(
                              2
                            )}</p>
                        </div>
                        <img src="${
                          product.image
                        }" class="descricao__imagem" alt="${product.title}">
                    </div>
                   <div class="card__botoes">
                        <ul class="botoes">
                            <li class="botoes__item"><img src="img/Favoritos.svg" alt="Favoritar produto" class="botoes__item__imagem"></li>
                            <li class="botoes__item"><img src="img/Compras.svg" alt="Adicionar no carrinho de compras" class="botoes__item__imagem"></li>
                        </ul>
                        <a href="#" data-id="${
                          product.id
                        }" class="botoes__ancora botoes__ancora__comprar">Comprar</a>
        </div>
                </div>
            `;

      productContainer.innerHTML += productHTML;
    });

    const buyButtons = document.querySelectorAll(".botoes__ancora__comprar");
    buyButtons.forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  }

  function addToCart(event) {
    event.preventDefault();
    const productId = event.target.getAttribute("data-id");
    const productCard = document.querySelector(`.card[data-id="${productId}"]`);
    const productTitle = productCard.querySelector(
      ".descricao__titulo-produto"
    ).innerText;
    const productPrice = productCard.querySelector(
      ".descricao__texto__valor"
    ).innerText;
    const productImage = productCard.querySelector(".descricao__imagem").src;

    const product = {
      id: productId,
      title: productTitle,
      price: parseFloat(productPrice),
      image: productImage,
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Produto adicionado ao carrinho!");
  }

  fetchProducts();
});
