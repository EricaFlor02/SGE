// Selecionar o formulário de feedback
const feedbackForm = document.getElementById("feedbackForm");

// Recupera os eventos cadastrados no Local Storage
const events = JSON.parse(localStorage.getItem("events")) || [];

// Preenche o campo de seleção com os eventos disponíveis
function loadEventes() {
    const eventSelect = document.getElementById("event");
    events.array.forEach((evente, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = event.title;
    });
}

//Envia o feedback
feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedEventIndex = document.getElementById("event").value;
    const rating = document.getElementById("rating").value;
    const comments = document.getElementById("comments").value;

    // Adiciona o feedback ao evento
    events[selectedEventIndex].feedback = events[selectedEventIndex].feedback || [];
    events[selectedEventIndex].feedback.push({ rating, comments });

    // Atualiza o Local Storage
    localStorage.setItem("events", JSON.stringify(events));

    alert("Feedback enviado com sucesso!");
    feedbackForm.requestFullscreen();
});

// Carrega os eventos ao iniciar
loadEventes();