const db = firebase.firestore();
const treinamentosRef = db.collection("Treinamentos");

function listarCursos() {
    treinamentosRef.get().then((querySnapshot) => {
        const cursosList = document.getElementById("cursos-list");
        cursosList.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const curso = doc.data();
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <h3>${curso.Titulo}</h3>
                <p>${curso.Descricao}</p>
                <p>Categoria: ${curso.Categoria}</p>
                <a href="${curso.LinkUtil}" target="_blank">Acessar Link Útil</a><br>
                <a href="${curso.LinkFormulario}" target="_blank">Acessar Formulário</a>
            `;
            cursosList.appendChild(listItem);
        });
    }).catch((error) => {
        console.error("Erro ao listar cursos: ", error);
    });
}

auth.onAuthStateChanged((user) => {
    if (user) {
        listarCursos();
    } else {
        window.location.href = '/treinamento.html';
    }
});
