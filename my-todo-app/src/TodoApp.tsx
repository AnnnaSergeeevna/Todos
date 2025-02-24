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

    const removeCompletedTasks = () => {
        setTasks(tasks.filter((task) => !task.completed));
    };

    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);
    const percentOfCompleting = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

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

            {tasks.length > 0 && (
                <>
                    <div className="tasksScope">
                        <h2>All Tasks</h2>
                        <ul className="taskList">
                            {tasks.map((task) => (
                                <li key={task.id} className="taskItem">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                        className="radio"
                                    />
                                    <span className={`taskText ${task.completed ? "completed" : ""}`}>
                                        {task.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
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

                    <div className="rateScope">
                        <span className="percentOfCompleting">
                            Percent of completion: {percentOfCompleting}%
                        </span>
                        <span className="percentOfCompleting">Remaining tasks: {uncompletedTasks.length}</span>
                        {completedTasks.length > 0 && (
                            <button className="clearCompletedBtn" onClick={removeCompletedTasks}>
                                Clear Completed
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default TodoApp;
