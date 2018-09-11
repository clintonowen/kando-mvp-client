import React from 'react';
import {connect} from 'react-redux';
import {fetchTasks} from '../actions/board-data';
import Task from './task';
import AddTask from './add-task';
import './column.css';

export class Column extends React.Component {
  componentDidMount() {
    return this.props.dispatch(fetchTasks());
  }

  render() {
    let tasks;
    if (this.props.tasks) {
      tasks = this.props.tasks
        .filter(task => task.columnId === this.props.columnId)
        .map((task, index) =>
          <Task name={task.name} time={task.time} key={index}/>
      );
    }
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
  tasks: state.boardData.tasks
});

export default connect(mapStateToProps)(Column);
