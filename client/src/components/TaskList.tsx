import React from 'react';
import TaskItem from './TaskItem';
import styles from './TaskList.module.scss';

interface Task {
    id: number;
    name: string;
    description: string;
    subtasks: Task[];
    isChecked: boolean;
}

interface TaskListProps {
    tasks: Task[];
    expandedTasks: number[];
    onTaskSelect: (task: Task) => void;
    onAddSubtask: (parentId: number, newTask: Task) => void;
    onUpdateTask: (task: Task) => void;
    onDeleteTask: (taskId: number) => void;
    onCheckChange: (taskId: number, checked: boolean) => void;
    selectedTask: Task | null;
    searchTerm: string;
    allChecked: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    expandedTasks,
    onTaskSelect,
    onAddSubtask,
    onUpdateTask,
    onDeleteTask,
    selectedTask,
    searchTerm,
    onCheckChange,
    allChecked
}) => {

    return (
        <div className={styles["tasklist-container"]}>
            <div className={styles["tasks"]}>
                {tasks.map(task => (
                    <>
                        <TaskItem
                            key={task.id}
                            task={task}
                            isExpanded={expandedTasks.includes(task.id)}
                            onTaskSelect={onTaskSelect}
                            onAddSubtask={onAddSubtask}
                            onUpdateTask={onUpdateTask}
                            onDeleteTask={onDeleteTask}
                            onCheckChange={onCheckChange}
                            selectedTask={selectedTask}
                            allChecked={allChecked}
                        />
                    </>
                ))}
            </div>
        </div>
    );
};

export default TaskList;