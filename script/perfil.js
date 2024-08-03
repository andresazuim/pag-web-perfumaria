document.addEventListener("DOMContentLoaded", function () {
  function showLogin() {
    const loginContainer = document.getElementById("loginContainer");
    const userLoggedContainer = document.getElementById("userLoggedContainer");

    if (loginContainer) {
      loginContainer.classList.remove("hidden");
    }

    if (userLoggedContainer) {
      userLoggedContainer.classList.add("hidden");
    }
  }

  function showUserLogged() {
    const loginContainer = document.getElementById("loginContainer");
    const userLoggedContainer = document.getElementById("userLoggedContainer");

    if (loginContainer) {
      loginContainer.classList.add("hidden");
    }

    if (userLoggedContainer) {
      userLoggedContainer.classList.remove("hidden");
    }
  }

  async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        showUserLogged();
      } else {
        console.error("Login falhou", response.status, response.statusText);
        alert("Email ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao fazer login. Tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    showLogin();
  }

  const loginForm = document.querySelector(".form-cadastro");
  const logoutButton = document.getElementById("logoutButton");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  const token = localStorage.getItem("token");
  if (token) {
    showUserLogged();
  } else {
    showLogin();
  }
});
