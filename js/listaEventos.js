// Seleciona o contêiner onde a lista de eventos será exibida
const eventList = document.getElementById("eventList");

// Recupera a lista de eventos do Local Storage
let events = JSON.parse(localStorage.getItem("events")) || [];

// Função para exibir os eventos
function displayEvents() {
    eventList.innerHTML = "";

    // Verifica se há eventos
    if (events.length === 0) {
        eventList.innerHTML = "<p>Nenhum evento cadastrado.</p>";
        return;
    }

    // Cria elementos HTML para cada evento
    events.forEach((event, index) => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");

        eventDiv.innerHTML = `
            <h2>${event.title}</h2>
            <p>${event.description}</p>
            <p><strong>Data:</strong> ${event.date} - <strong>Hora:</strong> ${event.time}</p>
            <p><strong>Local:</strong> ${event.location}</p>
            <button onclick="deleteEvent(${index})">Excluir Evento</button>
        `;

        eventList.appendChild(eventDiv);
    });
}

// Função para excluir um evento com base no índice
function deleteEvent(index) {
    events.splice(index, 1);  // Remove o evento da lista
    localStorage.setItem("events", JSON.stringify(events));  // Atualiza o Local Storage
    displayEvents();  // Reexibe a lista de eventos atualizada
}

// Chama a função para exibir os eventos
displayEvents();
