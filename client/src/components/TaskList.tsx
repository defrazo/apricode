import React from 'react';
import TaskItem from './TaskItem';
import styles from './TaskList.module.scss';

interface Task {
    id: number;
    name: string;
    description: string;
    subtasks: string[];
}

interface TaskListProps {
    tasks: Task[];
    expandedTasks: number[];
    onTaskSelect: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, expandedTasks, onTaskSelect }) => {
    return (
        <div className={styles["tasklist-container"]}>
            <div className={styles["tasks"]}>
                {tasks.map(task => (
                    <div key={task.id}>
                        <TaskItem task={task} isExpanded={expandedTasks.includes(task.id)} onTaskSelect={onTaskSelect} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;