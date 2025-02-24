import { useState } from "react";
import './styles.css';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

function TodoApp() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // const removeCompleted = () => {
    //     setTasks(tasks.filter(task => !task.completed));
    // };

    const completedTasks = tasks.filter(task => task.completed);
    const uncompletedTasks = tasks.filter(task => !task.completed);

    return (
        <div className="list" >
            <h1 className="todosText" > todos </h1>
            <div className="flex gap-2 mb-4" >
                <input
                    className="border p-2 rounded w-full"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    placeholder="What needs to be do"
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={addTask}
                >
                    Add
                </button>
            </div>

            {/* Список невыполненных задач */}
            <div className="tasksScope">
                <h2 className="">Uncompleted Tasks</h2>
                <ul>
                    {
                        uncompletedTasks.map(task => (
                            <li key={task.id} className="taskItem">
                                {/* Радиокнопка слева от задачи */}
                                <input
                                    type="radio"
                                    name="task"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)} // при клике меняем состояние задачи
                                    className="radio"
                                />
                                <span
                                    className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                                    onClick={() => toggleTask(task.id)} // При клике на текст тоже меняем состояние задачи
                                >
                                    {task.text}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>

            {/* Список выполненных задач */}
            <div className="tasksScope">
                <h2 className="text-lg font-semibold">Completed Tasks</h2>
                <ul>
                    {
                        completedTasks.map(task => (
                            <li key={task.id} className="taskItem">
                                {/* Радиокнопка слева от задачи */}
                                <input
                                    type="radio"
                                    name="task"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)} // при клике меняем состояние задачи
                                    className="radio"
                                />
                                <span
                                    className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                                    onClick={() => toggleTask(task.id)} // При клике на текст тоже меняем состояние задачи
                                >
                                    {task.text}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>

            {/* Количество оставшихся задач */}
            {/* <p className="mt-4">Remaining: {uncompletedTasks.length}</p> */}

            {/* Кнопка для очистки выполненных задач */}
            {/* <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                onClick={removeCompleted}
            >
                Clear Completed
            </button> */}
        </div>
    );
}


export default TodoApp;
