// Função para registro de usuário
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const role = document.getElementById("userRole").value;

    // Cria um objeto do usuário
    const newUser = {
        name,
        email,
        password,
        role
    };

    // Salva o usuário no Local Storage (simulando um banco de dados para fins de teste)
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuário registrado com sucesso!");
    document.getElementById("registerForm").reset();
});

// Função de login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === loginEmail && user.password === loginPassword);

    if (user) {
        alert("Login bem-sucedido!");

        // Armazena o usuário logado no Local Storage
        localStorage.setItem("loggedUser", JSON.stringify(user));

        // Redireciona com base no tipo de usuário
        if (user.role === "participante") {
            window.location.href = "index.html";  // Página de Participante
        } else if (user.role === "administrador") {
            window.location.href = "admin-dashboard.html";  // Página de Administrador
        }
    } else {
        alert("E-mail ou senha incorretos.");
    }
});

// Função de recuperação de senha
document.getElementById("forgotPasswordLink").addEventListener("click", function () {
    const email = prompt("Digite seu e-mail para recuperar a senha:");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email);

    if (user) {
        alert("Sua senha é: " + user.password);
    } else {
        alert("E-mail não encontrado.");
    }
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginPassword").value;

    fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Falha na autenticação. Verifique o e-mail e a senha.");
            }
            return response.json();
        })
        .then((data) => {
            alert("Login bem-sucedido!");

            // Redirecionar com base no tipo de usuário
            if (data.tipo === "participante") {
                window.location.href = "index.html"; // Página para Participante
            } else if (data.tipo === "administrador") {
                window.location.href = "admin-dashboard.html"; // Página para Administrador
            }
        })
        .catch((error) => alert(error.message));
});
