const db = firebase.firestore();
const urlParams = new URLSearchParams(window.location.search);
const cursoId = urlParams.get('id');

if (!cursoId) {
    window.location.href = '/treinamento.html';
}

const cursoRef = db.collection("Treinamentos").doc(cursoId);
const modulosRef = cursoRef.collection("Modulos");

function exibirDetalhesCurso(curso) {
    document.getElementById('curso-titulo').textContent = curso.Titulo;
    document.getElementById('curso-descricao').textContent = curso.Descricao;
    document.getElementById('curso-imagem').src = curso.ImagemURL;
}


function listarModulos() {
    modulosRef.orderBy("titulo").get().then((querySnapshot) => {
        const modulosList = document.getElementById("modulos-list");
        modulosList.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const modulo = doc.data();
            const listItem = document.createElement("li");
            const moduloId = doc.id; 

            listItem.innerHTML = `
                <h4>${modulo.titulo}</h4>
                <p>${modulo.descricao}</p>
                <button onclick="excluirModulo('${moduloId}')">Excluir</button> 
            `;
            modulosList.appendChild(listItem);
        });
    }).catch((error) => {
        console.error("Erro ao listar módulos: ", error);
    });
}

document.getElementById('adicionar-modulo-btn').addEventListener('click', () => {
    const titulo = document.getElementById('novo-modulo-titulo').value;
    const descricao = document.getElementById('novo-modulo-descricao').value;

    modulosRef.add({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        alert('Módulo adicionado com sucesso!');
        document.getElementById('novo-modulo-titulo').value = '';
        document.getElementById('novo-modulo-descricao').value = '';
        listarModulos(); 
    }).catch((error) => {
        console.error("Erro ao adicionar módulo: ", error);
        alert('Erro ao adicionar módulo.');
    });
});

cursoRef.get().then((doc) => {
    if (doc.exists) {
        const curso = doc.data();
        exibirDetalhesCurso(curso);
        listarModulos();
    } else {
        console.log("Curso não encontrado!");
        window.location.href = '/treinamento.html';
    }
}).catch((error) => {
    console.error("Erro ao buscar detalhes do curso: ", error);
});

function excluirModulo(moduloId) {
    if (confirm("Tem certeza que deseja excluir este módulo?")) {
        modulosRef.doc(moduloId).delete().then(() => {
            alert("Módulo excluído com sucesso!");
            listarModulos(); 
        }).catch((error) => {
            console.error("Erro ao excluir módulo: ", error);
            alert("Erro ao excluir módulo.");
        });
    }
}

auth.onAuthStateChanged((user) => {
    if (user) {
    } else {
        window.location.href = 'index.html';
    }
});