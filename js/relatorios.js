// Recupera os eventos do Local Storage
const events = JSON.parse(localStorage.getItem("events")) || [];
const reportSection = document.getElementById("reportSestion");

// Gera e exibe os relatórios
function generateReports() {
    reportSection.innerHTML = "";

    if (events.length === 0) {
        reportSection.innerHTML = "<p>Nenhum evento disponível para relatório.<p>";
        return;
    }

    events.array.forEach((event) => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("report");

        const feedbackCount = event.feedback ? event.feedback.length : 0;
        eventDiv.innerHTML =
            <><h2>${event.title}</h2><p><strong>Participantes:</strong> ${event.participants || 0}</p><p><strong>Feedbacks recebidos;</strong> ${feedbackCount}</p></>
        ;

       reportSection.appendChild(eventDiv);  
    });
}

// Exporta o relatório em JSON
document.getElementById("exportReport").addEventListener("click", () => {
    const dataStr = "data:text/json;charset=uft-8," + encodeURIComponent(JSON.stringify(events));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "relatorio-eventos.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
});

// Gera relatórios ao iniciar
generateReports();