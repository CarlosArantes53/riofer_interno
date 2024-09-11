document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Usuário logado:', user.email);
            redirectToHome();
        })
        .catch((error) => {
            document.getElementById('error-message').textContent = error.message;
        });
});

function redirectToHome() {
    window.location.href = '/paginas/home/home.html';
}
