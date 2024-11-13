// Seleciona o formulário pelo ID
const eventForm = document.getElementById("eventForm");

// Adiciona um listener ao formulário para o evento de envio
eventForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Captura os dados do formulário
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;

    // Cria um objeto para o evento
    const newEvent = {
        title: title,
        description: description,
        date: date,
        time: time,
        location: location
    };

    // Obtém os eventos existentes no Local Storage
    const events = JSON.parse(localStorage.getItem("events")) || [];
    // Adiciona o novo evento à lista de eventos
    events.push(newEvent);
    // Salva a lista de eventos atualizada no Local Storage
    localStorage.setItem("events", JSON.stringify(events));

    // Limpa o formulário após o cadastro
    eventForm.reset();

    // Opção para redirecionar à lista de eventos
    window.location.href = "index.html"; // Redireciona para a tela de lista de eventos
});
