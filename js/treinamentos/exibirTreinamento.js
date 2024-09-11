const db = firebase.firestore();
const treinamentosRef = db.collection("Treinamentos");

function listarCursos() {
    treinamentosRef.get().then((querySnapshot) => {
        const cursosList = document.getElementById("cursos-list");
        cursosList.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const curso = doc.data();
            const listItem = document.createElement("li");
            const imagemURL = curso.ImagemURL || "Erro.jpg";

            listItem.innerHTML = `
                <img src="${imagemURL}" alt="${curso.Titulo}" class="curso-imagem" onerror="this.onerror=null;this.src='Erro.jpg';">
                <h3>${curso.Titulo}</h3>
                <p>${curso.Descricao}</p>
                <p>Categoria: ${curso.Categoria}</p>
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
