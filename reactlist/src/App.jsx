import { useEffect, useState } from "react";
import axios from "axios";

import editIcon from "./assets/lapis.svg";
import trashIcon from "./assets/lixeira.svg";
import "./App.css";

function App() {
  const [tasklist, setTasklist] = useState([]);

  // Buscar tarefas
  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/taskpoin")
      const dataAPI = response.data

      setTasklist(dataAPI)
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // Criar tarefa
  const createTasks = () => {};

  // Atualizar tarefa
  const putTask = () => {};

  // Excluir tarefa
  const deleteTask = () => {};

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <header className="header-section">
        <h1 className="header-section__title">React List</h1>
      </header>

      <main className="body-section">
        <form className="cad-task">
          <input
            type="text"
            className="cad-task__entry"
            placeholder="Adicione uma tarefa"
          />

          <button
            type="submit"
            className="cad-task__btn-confirm"
          >
            Adicionar
          </button>
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
                  />
                </div>

                <div className="cardlist__icon">
                  <img
                    src={trashIcon}
                    alt="Excluir tarefa"
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