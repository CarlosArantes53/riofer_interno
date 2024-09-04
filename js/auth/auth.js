// auth.js

// Adicione o listener ao formulário de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            const user = userCredential.user;
            console.log('Usuário logado:', user.email);
            redirectToHome(); // Função para redirecionar para a página inicial
        })
        .catch((error) => {
            // Exibe a mensagem de erro no elemento
            document.getElementById('error-message').textContent = error.message;
        });
});

// Função para redirecionar para a página inicial
function redirectToHome() {
    window.location.href = '/paginas/home/home.html';
}
