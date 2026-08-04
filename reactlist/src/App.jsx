import { useEffect, useState } from "react";
import axios from "axios";

import editIcon from "./assets/lapis.svg";
import trashIcon from "./assets/lixeira.svg";
import "./App.css";

function App() {
  const [tasklist, setTasklist] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [idToEdit, setIdToEdit] = useState(0);

  // Buscar tarefas
  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/taskpoin");
      setTasklist(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // Criar tarefa
  const createTasks = async (e) => {
    e.preventDefault();

    if (taskValue.trim() === "") {
      alert("Digite uma tarefa!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/taskpoin", {
        descricao: taskValue,
      });

      setTaskValue("");
      getTasks();
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error);
    }
  };

  // Entrar em modo de edição
  const putTask = (task) => {
    setTaskValue(task.descricao);
    setEditMode(true);
    setIdToEdit(task.id);
  };

  // Confirmar edição
  const confirmPutTask = async (e) => {
    e.preventDefault();

    if (taskValue.trim() === "") {
      alert("Digite uma tarefa!");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/taskpoin/${idToEdit}`, {
        descricao: taskValue,
      });

      alert("Tarefa editada com sucesso!");

      setEditMode(false);
      setIdToEdit(0);
      setTaskValue("");

      getTasks();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  // Excluir tarefa
  const deleteTask = async (task) => {
    const confirmar = confirm(
      `Deseja excluir a tarefa "${task.descricao}"?`
    );

    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3000/taskpoin/${task.id}`);
      getTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <header className="header-section">
        <h1 className="header-section__title">React List</h1>
      </header>

      <main className="body-section">
        <form
          className="cad-task"
          onSubmit={editMode ? confirmPutTask : createTasks}
        >
          <input
            type="text"
            className="cad-task__entry"
            placeholder="Adicione uma tarefa"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
          />

          <button
            type="submit"
            className="cad-task__btn-confirm"
          >
            {editMode ? "Adicionar" : "Adicionar"}
          </button>

          {editMode && (
            <button
              type="button"
              className="cad-task__btn-confirm"
              onClick={() => {
                setEditMode(false);
                setIdToEdit(0);
                setTaskValue("");
              }}
            >
              Cancelar
            </button>
          )}
        </form>

        <section className="cardlist">
          {tasklist.map((task) => (
            <article className="cardtask" key={task.id}>
              <p className="cardtask__task-text">
                {task.descricao}
              </p>

              <div className="cardtask__icon-box">
                <div className="cardlist__icon">
                  <img
                    src={editIcon}
                    alt="Editar tarefa"
                    onClick={() => putTask(task)}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <div className="cardlist__icon">
                  <img
                    src={trashIcon}
                    alt="Excluir tarefa"
                    onClick={() => deleteTask(task)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="footer-section">
        <p className="footer-section__right-text">
          2026 React List - Todos os direitos reservados
        </p>
      </footer>
    </>
  );
}

export default App;