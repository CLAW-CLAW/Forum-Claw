// Gestion de l'inscription
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const statusMessage = document.getElementById('statusMessage');
const loginStatusMessage = document.getElementById('loginStatusMessage');

const registerContainer = document.getElementById('registerContainer');
const loginContainer = document.getElementById('loginContainer');
const showLogin = document.getElementById('showLogin');
const showRegister = document.getElementById('showRegister');

// Fonction d'inscription
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = users.some(user => user.username === username);
        if (userExists) {
            statusMessage.textContent = "Nom d'utilisateur déjà pris.";
            statusMessage.style.color = "red";
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            statusMessage.textContent = "Inscription réussie !";
            statusMessage.style.color = "green";
            registerForm.reset();
        }
    } else {
        statusMessage.textContent = "Veuillez remplir tous les champs.";
        statusMessage.style.color = "red";
    }
});

// Fonction de connexion
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        loginStatusMessage.textContent = "Connexion réussie ! Redirection...";
        loginStatusMessage.style.color = "green";
        setTimeout(() => {
            window.location.href = "forum.html";
        }, 1000);
    } else {
        loginStatusMessage.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
        loginStatusMessage.style.color = "red";
    }
});


// Fonction pour afficher le formulaire de connexion
showLogin.addEventListener('click', function () {
    registerContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
});

// Fonction pour afficher le formulaire d'inscription
showRegister.addEventListener('click', function () {
    loginContainer.classList.add('hidden');
    registerContainer.classList.remove('hidden');
});

// Vérifier si l'utilisateur est connecté
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
    alert("Veuillez vous connecter pour accéder au forum.");
    window.location.href = "index.html";
}

// Gestion des messages
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

// Afficher les messages existants
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('p');
        messageElement.textContent = msg;
        messagesDiv.appendChild(messageElement);
    });
}

// Enregistrer un message
messageForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!loggedInUser) {
        alert("Vous devez être connecté pour envoyer un message.");
        return;
    }

    const newMessage = messageInput.value.trim();
    if (newMessage) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(`${loggedInUser.username}: ${newMessage}`);
        localStorage.setItem('messages', JSON.stringify(messages));
        messageInput.value = '';
        loadMessages();
    }
});

// Charger les messages au démarrage
loadMessages();

// Gestion de la déconnexion
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
});