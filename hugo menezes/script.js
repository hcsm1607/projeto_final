const inputTarefa = document.getElementById("inputTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");

function salvarTarefas() {
  const tarefas = [];
  listaTarefas.querySelectorAll("li").forEach(li => {
    tarefas.push({
      texto: li.querySelector("span").textContent,
      concluida: li.classList.contains("concluida")
    });
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

btnAdicionar.addEventListener("click", () => {
  const texto = inputTarefa.value.trim();
  if (texto === "") return;

  const li = document.createElement("li");

  const spanTexto = document.createElement("span");
  spanTexto.textContent = texto;
  li.appendChild(spanTexto);

  li.addEventListener("click", () => {
    li.classList.toggle("concluida");
  });

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.addEventListener("click", (e) => {
    e.stopPropagation();
    listaTarefas.removeChild(li);
  });

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";
  btnEditar.addEventListener("click", (e) => {
    e.stopPropagation();
    
    if (btnEditar.textContent === "Editar") {
      const input = document.createElement("input");
      input.type = "text";
      input.value = spanTexto.textContent;
      li.replaceChild(input, spanTexto);
      btnEditar.textContent = "Salvar";
    } else {
      const novoTexto = li.querySelector("input").value.trim();
      if (novoTexto != "") {
        spanTexto.textContent = novoTexto;
      }

      li.replaceChild(spanTexto, li.querySelector("input"));
      btnEditar.textContent = "Editar";
    }
  });

  li.appendChild(btnEditar);
  li.appendChild(btnRemover);
  listaTarefas.appendChild(li);

  inputTarefa.value = "";
});