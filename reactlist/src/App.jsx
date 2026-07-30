import editIcon from "./assets/lapis.svg"
import trashIcon from "./assets/lixeira.svg"
import './App.css'
import { useState } from "react"

function App() {
  //states e variedades
  //funções e effects

const [tasklist, setTasklist] = useState([
  {id: 1, descricao: "Revisar HTML Semântico"},
  {id: 2, descricao: "Revisar ReactJS"},
  {id: 3, descricao: "Revisar ReactJS"},
  {id: 4, descricao: "Revisar React Native"},
]);






  return (
    <>
      <header className='header-section'>
        <h1 className='header-section__title'>React List</h1>
      </header>

      <main className='body-section'>
        <form className='cad-task'>
          <input type="text" className="cad-task__entry" placeholder='Adicionar uma tarefa' />
          <button className="cad-task__btn-confirm">adicionar</button>
        </form>

        <section className='cardlist'>
          {
            tasklist.map((task) => {
              return 

              
            })
          }



          <article className='cardtask'>
            <p className="cardtask__task-text">Estudar propriedades em React</p>
          <div className="cardtask__icon-box">  
          <div className="cardlist__icon">
            <img src={editIcon} alt="Imagem de uma caneta - ação editar tarefa" />
            </div>  
           <div className="cardlist__icon">
            <img src={trashIcon} alt="Imagem de uma lixeira - ação excluir tarefa" />
            </div> 
          </div>
          </article>
        </section>
      </main>

      <footer className='footer-section'>
        <p className='footer-section__right-text'>2026 React List - Todos os direitos</p>
      </footer>
    </>
  )
}


export default App
