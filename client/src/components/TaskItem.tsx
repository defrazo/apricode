import React, { useState, useEffect } from 'react';
import styles from './TaskItem.module.scss';

interface Task {
    id: number;
    name: string;
    description: string;
    subtasks: Task[];
    isChecked: boolean;
}

interface TaskItemProps {
    task: Task;
    isExpanded: boolean;
    onTaskSelect: (task: Task) => void;
    onAddSubtask: (parentId: number, newTask: Task) => void;
    onUpdateTask: (task: Task) => void;
    onDeleteTask: (taskId: number) => void;
    onCheckChange: (taskId: number, checked: boolean) => void;
    selectedTask: Task | null;
    allChecked: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    isExpanded,
    onTaskSelect,
    onAddSubtask,
    onUpdateTask,
    onDeleteTask,
    selectedTask,
    onCheckChange,
    allChecked
}) => {

    const [showSubtasks, setShowSubtasks] = useState<boolean>(isExpanded);
    const [newSubtaskName, setNewSubtaskName] = useState<string>('');

    const toggleSubtasks = () => setShowSubtasks(!showSubtasks);
    const handleCheck = () => {
        const newCheckedState = !task.isChecked;
        onCheckChange(task.id, newCheckedState);
    };

    const handleAddSubtask = () => {
        if (newSubtaskName.trim()) {
            const newSubtask: Task = {
                id: Date.now(),
                name: newSubtaskName,
                description: '',
                subtasks: [],
                isChecked: false
            };

            onAddSubtask(task.id, newSubtask);
            setNewSubtaskName('');
        }

        setShowSubtasks(isExpanded);
    };

    const handleTaskUpdate = () => {
        onUpdateTask(task);
    };

    const handleTaskDelete = () => {
        onDeleteTask(task.id);
    };

    return (
        <div className={styles["task-container"]}>
            <div
                className={`${styles["task-item"]} ${task.id === selectedTask?.id ? styles["task--active"] : ""}`}
                onClick={() => onTaskSelect(task)}
            >
                <div
                    className={`${styles["task-item__arrow"]} ${showSubtasks ? styles["task-item__arrow--open"] : ""}`}
                    onClick={() => { toggleSubtasks() }}
                >
                    ❯
                </div>
                <span className={styles["task-item__task"]}>{task.name}</span>
                <input
                    type="checkbox"
                    checked={task.isChecked}
                    onChange={handleCheck}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            {showSubtasks && (
                <>
                    {task.subtasks.map(subtask => (
                        <div key={subtask.id} className={`${styles["task-item__subtask"]}`}>
                            <TaskItem
                                task={subtask}
                                isExpanded={true}
                                onTaskSelect={onTaskSelect}
                                onAddSubtask={handleAddSubtask}
                                onUpdateTask={handleTaskUpdate}
                                onDeleteTask={handleTaskDelete}
                                onCheckChange={onCheckChange}
                                selectedTask={selectedTask}
                                allChecked={allChecked}
                            />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default TaskItem;