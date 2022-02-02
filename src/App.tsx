import React, { FC, ChangeEvent, useState } from 'react';
import './App.css';
import { ITask } from './interfaces';
import TodoTask from './Components/TodoTask';

const App: FC = () => {
  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === 'task') {
      setTask(e.target.value);
    } else {
      setDeadline(Number(e.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask('');
    setDeadline(0);
    console.log(todoList);
  };

  const completeTask = (taskNameTodoDelete: string): void => {
    setTodoList(
      todoList.filter(task => {
        return task.taskName !== taskNameTodoDelete;
      })
    );
  };
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="DeadLine (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, idx: number) => {
          return <TodoTask key={idx} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
