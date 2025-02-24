import { useState } from "react";
import "./styles.css";

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
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);
    const percentOfCompleting = Math.round((completedTasks.length / tasks.length) * 100);

    return (
        <div className="list">
            <h1 className="todosText">todos</h1>
            <div className="fieldForNewTask">
                <input
                    className="addNewTaskInput"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="What needs to be done?"
                />
                <button className="addBtn" onClick={addTask}>
                    Add
                </button>
            </div>

            <div className="tasksScope">
                <h2>Uncompleted Tasks</h2>
                <ul className="taskList">
                    {uncompletedTasks.map((task) => (
                        <li key={task.id} className="taskItem">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="radio"
                            />
                            <span className="taskText">{task.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="tasksScope">
                <h2>Completed Tasks</h2>
                <ul className="taskList">
                    {completedTasks.map((task) => (
                        <li key={task.id} className="taskItem">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="radio"
                            />
                            <span className="taskText">{task.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {tasks.length > 0 && (
                <div className="rateScope">
                    <span className="percentOfCompleting">Percent of completing {percentOfCompleting}%</span>
                </div>)}
        </div>
    );
}

export default TodoApp;
