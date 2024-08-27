import React, { useState, useEffect, useRef } from 'react';
import TaskList from './TaskList';
import styles from './Main.module.scss';

interface Task {
    id: number;
    name: string;
    description: string;
    subtasks: Task[];
    isChecked: boolean;
}

interface MainProps {
    searchTerm: string;
}

const LOCAL_STORAGE_KEY = 'tasks';

const Main: React.FC<MainProps> = ({ searchTerm }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [expandedTasks, setExpandedTasks] = useState<number[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [newTaskName, setNewTaskName] = useState<string>('');
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');
    const detailsRef = useRef<HTMLDivElement>(null);
    const tasklistRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (storedTasks) {
            try {
                const parsedTasks: Task[] = JSON.parse(storedTasks);
                setTasks(parsedTasks);
            } catch (error) {
                console.error('Ошибка при загрузке:', error);
            }
        }
    }, []);

    const saveTasksToLocalStorage = (tasks: Task[]) => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    const handleAddTask = () => {
        const newTask: Task = {
            id: Date.now(),
            name: newTaskName,
            description: newTaskDescription,
            subtasks: [],
            isChecked: false
        };

        const updatedTasks = [...tasks, newTask];

        setTasks(updatedTasks);
        setNewTaskName('');
        setNewTaskDescription('');
        setSelectedTask(newTask);
        saveTasksToLocalStorage(updatedTasks);
    };

    const handleAddSubtask = (parentId: number) => {
        if (selectedTask) {
            const newSubtask: Task = {
                id: Date.now(),
                name: '',
                description: '',
                subtasks: [],
                isChecked: false
            };

            const addSubtaskToTask = (tasks: Task[], parentId: number, newTask: Task): Task[] => {
                return tasks.map(task => {
                    if (task.id === parentId) {
                        return {
                            ...task,
                            subtasks: [...task.subtasks, newTask]
                        };
                    } else {
                        return {
                            ...task,
                            subtasks: addSubtaskToTask(task.subtasks, parentId, newTask)
                        };
                    }

                });
            };

            const updatedTasks = addSubtaskToTask(tasks, parentId, newSubtask);

            setTasks(updatedTasks);
            setNewTaskName('');
            setNewTaskDescription('');
            setSelectedTask(newSubtask);
            saveTasksToLocalStorage(updatedTasks);
        }
    };

    const handleTaskUpdate = (updatedTask: Task) => {
        const updateTaskInList = (tasks: Task[], updatedTask: Task): Task[] => {
            return tasks.map(task => {
                if (task.id === updatedTask.id) {
                    return updatedTask;
                } else {
                    return {
                        ...task,
                        subtasks: updateTaskInList(task.subtasks, updatedTask)
                    };
                }
            });
        };

        const updatedTasks = updateTaskInList(tasks, updatedTask);

        setTasks(updatedTasks);
        setSelectedTask(updatedTask);
        saveTasksToLocalStorage(updatedTasks);
    };

    const handleTaskDelete = (taskId: number) => {
        const deleteTaskFromList = (tasks: Task[], taskId: number): Task[] => {
            return tasks.filter(task => task.id !== taskId).map(task => ({
                ...task,
                subtasks: deleteTaskFromList(task.subtasks, taskId)
            }));
        };

        const updatedTasks = deleteTaskFromList(tasks, taskId);

        setTasks(updatedTasks);
        setSelectedTask(null);
        setNewTaskName('');
        setNewTaskDescription('');
        saveTasksToLocalStorage(updatedTasks);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (selectedTask) {
                handleTaskUpdate({ ...selectedTask, name: newTaskName, description: newTaskDescription });
            } else {
                handleAddTask();
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target as Node) &&
                tasklistRef.current && !tasklistRef.current.contains(event.target as Node)) {
                if (newTaskName || newTaskDescription) {
                    if (selectedTask) {
                        handleTaskUpdate({ ...selectedTask, name: newTaskName, description: newTaskDescription });
                        setNewTaskName('');
                        setNewTaskDescription('');
                        setSelectedTask(null);
                    }
                } else {
                    setSelectedTask(null);
                    setNewTaskName('');
                    setNewTaskDescription('');
                }
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [selectedTask, newTaskName, newTaskDescription]);

    useEffect(() => {
        if (selectedTask) {
            setNewTaskName(selectedTask.name);
            setNewTaskDescription(selectedTask.description);
        }
    }, [selectedTask]);

    const handleCheckChange = (taskId: number, checked: boolean) => {
        const updateTaskCheck = (tasks: Task[], taskId: number, checked: boolean): Task[] => {
            return tasks.map(task => {
                if (task.id === taskId) {
                    const updateSubtasksCheck = (subtasks: Task[], checked: boolean): Task[] => {
                        return subtasks.map(subtask => ({
                            ...subtask,
                            isChecked: checked,
                            subtasks: updateSubtasksCheck(subtask.subtasks, checked)
                        }));
                    };

                    return {
                        ...task,
                        isChecked: checked,
                        subtasks: updateSubtasksCheck(task.subtasks, checked)
                    };
                } else {
                    return {
                        ...task,
                        subtasks: updateTaskCheck(task.subtasks, taskId, checked)
                    };
                }
            });
        };

        const updatedTasks = updateTaskCheck(tasks, taskId, checked);

        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    };

    const allChecked = tasks.every(task => task.isChecked);

    const filteredTasks = tasks
        .map(task => {
            const filteredSubtasks = task.subtasks.filter(subtask =>
                subtask.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            const isTaskMatched = task.name.toLowerCase().includes(searchTerm.toLowerCase());

            if (isTaskMatched || filteredSubtasks.length > 0) {
                return {
                    ...task,
                    subtasks: filteredSubtasks
                };
            }

            return null;
        })
        .filter(task => task !== null);

    return (
        <div className={styles["main-container"]}>
            <div ref={tasklistRef} className={styles["tasks-container"]}>
                <h1>Задачи</h1>
                <TaskList
                    tasks={filteredTasks}
                    expandedTasks={expandedTasks}
                    onTaskSelect={setSelectedTask}
                    onAddSubtask={handleAddSubtask}
                    onUpdateTask={handleTaskUpdate}
                    onDeleteTask={handleTaskDelete}
                    onCheckChange={handleCheckChange}
                    selectedTask={selectedTask}
                    searchTerm={searchTerm}
                    allChecked={allChecked}
                />
            </div>
            <div
                ref={detailsRef}
                className={`${styles["details-container"]} ${selectedTask || tasks.length === 0 ? styles["details-container--visible"] : ""}`}
            >
                <h1>{selectedTask ? "Просмотр задачи" : "Создание новой задачи"}</h1>
                <div className={styles["details-window"]}>
                    <h2>Заголовок</h2>
                    <textarea
                        className={styles["details__task-name"]}
                        value={newTaskName}
                        placeholder="Введите заголовок задачи"
                        onChange={(e) => setNewTaskName(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <h2>Описание</h2>
                    <textarea
                        className={styles["details__task-description"]}
                        value={newTaskDescription}
                        placeholder="Введите описание задачи"
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className={styles["details__buttons"]}>
                        {!selectedTask && (
                            <>
                                <button className={styles["save"]} onClick={handleAddTask}>Новая задача</button>
                            </>
                        )}

                        {selectedTask && (
                            <>
                                <div className={styles["details__inner-buttons"]}>
                                    <div className={styles["inner-buttons__normal"]}>
                                        <button
                                            className={styles["edit"]}
                                            onClick={() => handleTaskUpdate({ ...selectedTask, name: newTaskName, description: newTaskDescription })}
                                        >Сохранить</button>
                                        <button
                                            className={styles["save"]}
                                            onClick={() => handleAddSubtask(selectedTask.id)}
                                        >Добавить подзадачу</button>
                                    </div>
                                    <button
                                        className={styles["delete"]}
                                        onClick={() => handleTaskDelete(selectedTask.id)}
                                    >Удалить</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Main;