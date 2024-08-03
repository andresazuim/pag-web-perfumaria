document.addEventListener("DOMContentLoaded", () => {
  const cartTableBody = document.querySelector("#cart-table tbody");
  const cartTotalElement = document.getElementById("cart-total");

  function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartTableBody.innerHTML = "";
    cart.forEach((product) => {
      const productTotal = (product.price * product.quantity).toFixed(2);
      const productRow = `
                <tr data-id="${product.id}">
                    <td>${product.title}</td>
                    <td>
                        <button class="quantity-btn" data-action="decrease">-</button>
                        <span class="quantity">${product.quantity}</span>
                        <button class="quantity-btn" data-action="increase">+</button>
                    </td>
                    <td>R$ ${product.price.toFixed(2)}</td>
                    <td>R$ ${productTotal}</td>
                    <td><button class="remove-btn">Remover</button></td>
                </tr>
            `;

      cartTableBody.innerHTML += productRow;
      total += product.price * product.quantity;
    });

    cartTotalElement.innerText = total.toFixed(2);
  }

  function updateCart() {
    const cartRows = cartTableBody.querySelectorAll("tr");
    let total = 0;

    const updatedCart = Array.from(cartRows).map((row) => {
      const id = row.getAttribute("data-id");
      const quantity = parseInt(row.querySelector(".quantity").innerText);
      const price = parseFloat(
        row.querySelector("td:nth-child(3)").innerText.replace("R$", "")
      );
      const productTotal = price * quantity;

      row.querySelector(
        "td:nth-child(4)"
      ).innerText = `R$ ${productTotal.toFixed(2)}`;

      total += productTotal;

      return {
        id,
        quantity,
        price,
        title: row.querySelector("td:first-child").innerText,
        image: "",
        category: "",
      };
    });

    cartTotalElement.innerText = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  cartTableBody.addEventListener("click", (event) => {
    const target = event.target;
    const row = target.closest("tr");
    const quantitySpan = row.querySelector(".quantity");

    if (target.classList.contains("quantity-btn")) {
      const action = target.getAttribute("data-action");
      let quantity = parseInt(quantitySpan.innerText);

      if (action === "increase") {
        quantity++;
      } else if (action === "decrease" && quantity > 1) {
        quantity--;
      }

      quantitySpan.innerText = quantity;
      updateCart();
    } else if (target.classList.contains("remove-btn")) {
      row.remove();
      updateCart();
    }
  });
  loadCartItems();

  const checkoutButton = document.getElementById("checkout-button");

  checkoutButton.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("O carrinho está vazio.");
      return;
    }

    fetch("http://localhost:5000/api/cart/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ cart }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Compra finalizada com sucesso!") {
          alert("Compra realizada com sucesso!");
          localStorage.removeItem("cart");
          loadCartItems();
        } else {
          alert("Erro ao realizar a compra. Tente novamente.");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao realizar a compra.");
      });
  });
});
