import React, { useState, useEffect } from 'react';
import styles from './TaskItem.module.scss';

interface Task {
    id: number;
    name: string;
    description: string;
    subtasks: string[];
}

interface TaskItemProps {
    task: Task;
    isExpanded: boolean;
    onTaskSelect: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isExpanded, onTaskSelect }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [showSubtasks, setShowSubtasks] = useState<boolean>(isExpanded);

    useEffect(() => {
        setShowSubtasks(isExpanded);
    }, [isExpanded]);

    const handleCheck = () => setIsChecked(!isChecked);
    const toggleSubtasks = () => setShowSubtasks(!showSubtasks);

    return (
        <div className={styles["task-container"]}>
            <div>
                <div className={`${styles["task-item"]}`} onClick={() => {
                    toggleSubtasks();
                    onTaskSelect(task);
                }}>
                    <div className={`${styles["task-item__arrow"]} ${showSubtasks ? styles["task-item__arrow--open"] : ""}`}>❯</div>
                    <span className={styles["task-item__task"]}>{task.name}</span>
                    <input type="checkbox" checked={isChecked} onChange={handleCheck} />
                </div>
                {showSubtasks && task.subtasks.map((subtask, index) => (
                    <div key={index} className={`${styles["task-item"]} ${styles["task-item__subtask"]}`}>
                        <span>{subtask}</span>
                        <input type="checkbox" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskItem;