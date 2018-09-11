import React from 'react';
import {connect} from 'react-redux';
import Task from './task';
import AddTask from './add-task';
import './column.css';

export class Column extends React.Component {
  render() {
    const taskList = [
      {name: 'Task 1', time: 0},
      {name: 'Task 2', time: 3900000},
      {name: 'Task 3', time: 1380000}
    ];
    const tasks = taskList.map((task, index) =>
      <Task name={task.name} time={task.time} key={index}/>
    );
    return (
      <section className="column">
        <header className="col-header">To Do</header>
        {tasks}
        <AddTask />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(Column);
