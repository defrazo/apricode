import React, { useState, useEffect, useRef } from 'react';
import TaskList from './TaskList';
import styles from './Main.module.scss';

interface Task {
    id: number;
    name: string;
    description: string;
    subtasks: string[];
}

interface MainProps {
    searchTerm: string;
}

const initialTasks: Task[] = [
    {
        id: 1,
        name: 'Подготовить макет к печати и отправить на проверку начальнику',
        description: 'Описание задачи 1',
        subtasks: ['Подзадача 1.1', 'Подзадача 1.2'],
    },
    {
        id: 2,
        name: 'Задача 2',
        description: 'Описание задачи 2',
        subtasks: ['Подзадача 2.1', 'Подзадача 2.2', 'Подзадача 2.3', 'Подзадача 2.4'],
    },
    {
        id: 3,
        name: 'Задача 3',
        description: 'Описание задачи 3',
        subtasks: ['Подзадача 2.1', 'Подзадача 2.2', 'Подзадача 2.3', 'Подзадача 2.4', 'Подзадача 2.5', 'Подзадача 2.6', 'Подзадача 2.7'],
    },
];

const Main: React.FC<MainProps> = ({ searchTerm }) => {
    const [expandedTasks, setExpandedTasks] = useState<number[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const tasksContainerRef = useRef<HTMLDivElement>(null);
    const detailsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchTerm) {
            const newExpandedTasks = initialTasks
                .filter(task => task.subtasks.some(subtask => subtask.toLowerCase().includes(searchTerm.toLowerCase())))
                .map(task => task.id);

            setExpandedTasks(newExpandedTasks);
        } else {
            setExpandedTasks([]);
        }
    }, [searchTerm]);

    const filteredTasks = initialTasks.map(task => {
        const filteredSubtasks = task.subtasks.filter(subtask =>
            subtask.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return {
            ...task,
            subtasks: filteredSubtasks
        };
    }).filter(task => {
        const matchesTaskName = task.name.toLowerCase().includes(searchTerm.toLowerCase());
        const hasVisibleSubtasks = task.subtasks.length > 0;
        return matchesTaskName || hasVisibleSubtasks;
    });

    const handleTaskSelect = (task: Task) => {
        setSelectedTask(task);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            tasksContainerRef.current &&
            !tasksContainerRef.current.contains(event.target as Node) &&
            detailsContainerRef.current &&
            !detailsContainerRef.current.contains(event.target as Node)
        ) {
            setSelectedTask(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles['main-container']}>
            <div ref={tasksContainerRef} className={styles["tasks-container"]}>
                <h1>Задачи</h1>
                <TaskList tasks={filteredTasks} expandedTasks={expandedTasks} onTaskSelect={handleTaskSelect} />
            </div>
            {selectedTask && (
                <div ref={detailsContainerRef} className={styles["details-container"]}>
                    <h1>Просмотр задачи</h1>
                    <div className={styles["details-window"]}>
                        <h2>Заголовок</h2>
                        <textarea
                            className={styles["details__task-name"]}
                            value={selectedTask.name}
                            placeholder="Выберите задачу из списка"
                            onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
                        />
                        <h2>Описание</h2>
                        <textarea
                            className={styles["details__task-description"]}
                            value={selectedTask.description}
                            placeholder="Выберите задачу из списка"
                            onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                        />
                        <div className={styles["details__buttons"]}>
                            <button className={styles["save"]}>Сохранить</button>
                            <button className={styles["edit"]}>Изменить</button>
                            <button className={styles["delete"]}>Удалить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;