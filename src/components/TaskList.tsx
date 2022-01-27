import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    // id: new Date().toISOString()
    // Math.random()
    if(!newTaskTitle||newTaskTitle==='')return

    const newTask:Task = {
      id: new Date().getTime(),
      title:newTaskTitle,
      isComplete: false
    }
    setTasks([...tasks,newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // https://www.alura.com.br/artigos/manipulacao-de-array-com-map-filter-e-reduce?gclid=Cj0KCQiA_8OPBhDtARIsAKQu0gbBoWESYPAP1yDvxcJeIKFLo2e2Qjr5RZH2tO7oo5BSyjhGoBu9qPAaAjzEEALw_wcB
    //cria uma copia do OBJETO e altera a propriedade isComplete
    const updatedTasks = tasks.map(item => item.id === id ? {
      ...item,
      isComplete: !item.isComplete
    } : item);

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
    const updatedTasks = tasks.filter(item => item.id !== id);
    setTasks(updatedTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}