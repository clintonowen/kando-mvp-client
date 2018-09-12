import React from 'react';
import {connect} from 'react-redux';
import {fetchTasks} from '../actions/board-data';
import Task from './task';
import AddTask from './add-task';
import Timer from './timer';
import './column.css';

export class Column extends React.Component {
  componentDidMount() {
    return this.props.dispatch(fetchTasks());
  }
  render() {
    let tasks;
    let timer;
    if (this.props.tasks) {
      tasks = this.props.tasks
        .filter(task => task.columnId === this.props.columnId)
        .map((task) => {
          const selected = (task.id === this.props.selectedTask) ? true : false;
          return (
            <Task
              key={task.id}
              name={task.name}
              time={task.time}
              selected={selected}
              taskId={task.id}
            />
          );
        }
      );
    }
    if (this.props.showTimer) {
      timer = <Timer />
    }
    return (
      <div className="col-container">
        <section className="column">
          <header className="col-header">To Do</header>
          {tasks}
          <AddTask />
        </section>
        {timer}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.boardData.tasks,
  selectedTask: state.timer.selectedTask
});

export default connect(mapStateToProps)(Column);
