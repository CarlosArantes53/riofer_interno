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
        <a href="${curso.Link}" target="_blank">Acessar Curso</a>
      `;
      cursosList.appendChild(listItem);
    });
  }).catch((error) => {
    console.error("Erro ao listar cursos:", error);
  });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    listarCursos();
  } else {
    window.location.href = '../html/home.html';
  }
});
