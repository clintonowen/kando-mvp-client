import React from 'react';
import { connect } from 'react-redux';
import Task from './task';
import AddTask from './add-task';
import TaskForm from './task-form';
import Timer from './timer';
import './column.css';

export class Column extends React.Component {
  render() {
    let tasks;
    if (this.props.tasks.length > 0) {
      tasks = this.props.tasks
        .map((task, index) => {
          const selected = (task.id === this.props.selectedTask) ? true : false;
          return (
            <Task
              key={task.id}
              index={index}
              taskId={task.id}
              columnId={this.props.id}
              name={task.name}
              time={task.time}
              selected={selected}
            />
          );
        }
      );
    }

    let timer;
    if (this.props.showTimer) {
      timer = <Timer />
    }

    let addTask = <AddTask columnId={this.props.id} />
    if (this.props.showTaskForm) {
      addTask = <TaskForm columnId={this.props.id} />
    }
    return (
      <div className="col-horz-flex-container">
        <div className="col-vert-flex-container">
          <section className="column">
            <header className="col-header">{this.props.name}</header>
            <div className="taskList">
              {tasks}
            </div>
            {addTask}
          </section>
          {timer}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTask: state.timer.selectedTask,
  columns: state.boardData.columns
});

export default connect(mapStateToProps)(Column);
