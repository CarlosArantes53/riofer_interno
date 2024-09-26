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
                <a href="modulos/modulosDetalhe.html?id=${doc.id}"> 
                    <img src="${imagemURL}" alt="${curso.Titulo}" class="curso-imagem" onerror="this.onerror=null;this.src='Erro.jpg';">
                </a>
                <h3>${curso.Titulo}</h3>
                <p>${curso.Descricao}</p>
                <p>Categoria: ${curso.Categoria}</p>
                
                <a href="#">
                    Acessar curso
                    <img src="/paginas/home/images-home/play_circle_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="play-circle">
                </a>
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