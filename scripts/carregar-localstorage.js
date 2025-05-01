document.addEventListener("DOMContentLoaded", () => {
    const clienteData = localStorage.getItem("clienteData");

    if (clienteData) {
        try {
            const data = JSON.parse(clienteData);
            const nome = data.nome || "Usuário";
    
            const loginDiv = document.getElementById("login-users");
            const logoutDiv = document.getElementById("logout-users");
            const loginButton = document.getElementById("users");
    
            if (loginDiv) loginDiv.textContent = `Olá, ${nome}`;
            if (logoutDiv) logoutDiv.style.display = "flex";
            if (loginButton) loginButton.style.display = "none";

    
        } catch (error) {
            console.error("Erro ao processar clienteData:", error);
        }
    }
});
  