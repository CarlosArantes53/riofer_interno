document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const nascimento = document.getElementById('nascimento').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    auth.createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Usuário criado:', user.email);
            
            const database = firebase.database();
            const userId = user.uid; 
            const userData = {
                nome: nome,
                cargo: cargo,
                nascimento: nascimento,
                email: email 
            };

            database.ref('usuarios/' + userId).set(userData)
                .then(() => {
                    console.log('Dados do usuário salvos no banco de dados.');
                    redirectToLogin();
                })
                .catch((error) => {
                    console.error('Erro ao salvar dados do usuário:', error);
                    document.getElementById('error-message').textContent = 'Erro ao salvar dados do usuário.';
                });
        })
        .catch((error) => {
            console.error('Erro ao criar usuário:', error);
            document.getElementById('error-message').textContent = error.message;
        });
});

function redirectToLogin() {
    window.location.href = '/index.html'; 
}