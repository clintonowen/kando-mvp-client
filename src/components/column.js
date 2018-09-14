import React from 'react';
import {connect} from 'react-redux';
import {fetchTasks, moveTask} from '../actions/board-data';
import Task from './task';
import AddTask from './add-task';
import TaskForm from './task-form';
import Timer from './timer';
import './column.css';

export class Column extends React.Component {
  componentDidMount() {
    return this.props.dispatch(fetchTasks());
  }
  allowDrop(event) {
    event.preventDefault();
  }
  previewDrop(event) {
    console.log('`onDropEnter` triggered')
  }
  drop(event, columnId) {
    event.preventDefault();
    // console.log(element);
    const taskId = event.dataTransfer.getData("number");
    this.props.dispatch(moveTask(taskId, columnId));
    // element.appendChild(document.getElementById(data));
  }
  render() {
    let tasks;
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

    let timer;
    if (this.props.showTimer) {
      timer = <Timer />
    }

    let addTask = <AddTask columnId={this.props.columnId} />
    if (this.props.showTaskForm) {
      addTask = <TaskForm columnId={this.props.columnId} />
    }
    return (
      <div className="col-horz-flex-container">
        <div className="col-vert-flex-container">
          <section
            className="column"
            onDragOver={(e) => this.allowDrop(e)}
            onDragEnter={(e) => this.previewDrop(e)}
            onDrop={(ev) => this.drop(ev, this.props.columnId)}
          >
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
  tasks: state.boardData.tasks,
  selectedTask: state.timer.selectedTask
});

export default connect(mapStateToProps)(Column);
