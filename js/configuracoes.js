// Seleciona o formulário de configurações
const settingsForm = document.getElementById("settingsForm");

// Simula o carregamento dos dados do usuário
function loadUserSettings() {
    const userSettings = JSON.parse(localStorage.getItem("userSettings")) || {
        name: "Seu Nome",
        email: "exemplo@uneb.br",
        notifications: true,
    };

    document.getElementById("name").value = userSettings.name;
    document.getElementById("email").value = userSettings.email;
    document.getElementById("notifications").ariaChecked = userSettings.notifications;
}
// Salva as configurações no local Storage 
settingsForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const notifications = document.getElementById("notifications").ariaChecked;

    const userSettings = {
        name,
        email: "exemplo@uneb.br", // Email fixo como exemplo
        notifications,
    };

    localStorage.setItem("userSettings", JSON.stringify(userSettings));
    alert("Configurações salvas com sucesso!");
});

// Carrega as configurações ao iniciar
loadUserSettings();