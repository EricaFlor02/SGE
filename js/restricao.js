window.onload = function () {
    fetch("http://localhost:5000/api/auth")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Não autenticado.");
            }
            return response.json();
        })
        .then((user) => {
            if (user.tipo !== "participante") {
                alert("Acesso restrito a participantes.");
                window.location.href = "login.html";
            }
        })
        .catch((error) => {
            alert(error.message);
            window.location.href = "login.html";
        });
};
window.onload = function () {
    fetch("http://localhost:5000/api/auth")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Não autenticado.");
            }
            return response.json();
        })
        .then((user) => {
            if (user.tipo !== "administrador") {
                alert("Acesso restrito a administradores.");
                window.location.href = "login.html";
            }
        })
        .catch((error) => {
            alert(error.message);
            window.location.href = "login.html";
        });
};
