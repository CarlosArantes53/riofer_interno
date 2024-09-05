const db = firebase.firestore();
const treinamentosRef = db.collection("Treinamentos");

document.getElementById('curso-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
    const linkUtil = document.getElementById('linkUtil').value;
    const linkFormulario = document.getElementById('linkFormulario').value;

    treinamentosRef.add({
        Titulo: titulo,
        Descricao: descricao,
        Categoria: categoria,
        LinkUtil: linkUtil,
        LinkFormulario: linkFormulario
    }).then(() => {
        alert('Curso cadastrado com sucesso!');
        listarCursos();
        document.getElementById('curso-form').reset();
    }).catch((error) => {
        console.error("Erro ao cadastrar curso: ", error);
        alert('Erro ao cadastrar curso, tente novamente.');
    });
});

auth.onAuthStateChanged((user) => {
    if (user) {
        listarCursos();
    } else {
        window.location.href = '/paginas/treinamento/cursos.html';
    }
});
