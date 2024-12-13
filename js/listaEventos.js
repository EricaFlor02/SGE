const eventList = document.getElementById("eventList"); 

  
fetch("http://localhost:5000/api/eventos")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((event) => {
            const eventDiv = document.createElement("div");
            eventDiv.classList.add("event");
            eventDiv.innerHTML = `
                <h2>${event.titulo}</h2>
                <p>${event.descricao}</p>
                <p><strong>Data:</strong> ${event.data} - <strong>Hora:</strong> ${event.horario}</p>
                <p><strong>Local:</strong> ${event.local}</p>
            `;
            eventList.appendChild(eventDiv);
        });
    })
    .catch((error) => console.error("Erro:", error));
;


    
