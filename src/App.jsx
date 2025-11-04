import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    //Com Arrow Function: const fetchTasks = async () =>
    async function fetchTasks() {
      // Chamar a API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );

      // Paga os dados que a API retorna
      const data = await response.json();

      // Armazena/Persistir esses dados no State
      setTasks(data);
    }
    // fetchTasks(); // 👈 Chamar a função
  }, []);

  // O que está comentado é exemplo usando API:
  //   useEffect(() => {
  //     localStorage.setItem("tasks", JSON.stringify(tasks));
  //   }, [tasks]);

  //   useEffect(() => {
  //     //Com Arrow Function: const fetchTasks = async () =>
  //     async function fetchTasks() {
  //       try {
  //         // Chamar a API

  //         const response = await fetch(
  //           "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //           {
  //             method: "GET",
  //           }
  //         );

  //         // Aqui você pode armazenar os dados no state
  //         const data = await response.json();

  //         // setTasks(data);
  //         setTasks(data);
  //       } catch (error) {
  //         console.error("Erro ao buscar tarefas:", error);
  //       }
  //     }

  //     fetchTasks(); // 👈 Chamar a função
  //   }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task; // mantém a tarefa igual se não for a clicada
    });

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
