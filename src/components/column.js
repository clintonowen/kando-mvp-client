import React from 'react';
import { connect } from 'react-redux';
import { updateColumn } from '../actions/board-data';
import Task from './task';
import AddTask from './add-task';
import TaskForm from './task-form';
import Timer from './timer';
import './column.css';

export class Column extends React.Component {
  allowDrop(event) {
    event.preventDefault();
  }
  previewDrop(event) {
    console.log('`onDropEnter` triggered')
  }
  drop(event, newColumnId) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("number");
    const oldColumn = this.props.columns.find(column => {
      return column.tasks.find(task => task.id === taskId);
    });
    const addColumnTasks = [...this.props.columns.find(column => column.id === newColumnId).tasks.map(task => task.id), taskId];
    const removeColumnTasks = oldColumn.tasks.filter(task => task.id !== taskId).map(task => task.id);
    this.props.dispatch(updateColumn(oldColumn.id, { tasks: removeColumnTasks }));
    this.props.dispatch(updateColumn(newColumnId, { tasks: addColumnTasks }));
  }
  render() {
    let tasks;
    if (this.props.tasks) {
      tasks = this.props.tasks
        .map((task, index) => {
          const selected = (task.id === this.props.selectedTask) ? true : false;
          return (
            <Task
              key={task.id}
              index={index}
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
  selectedTask: state.timer.selectedTask,
  columns: state.boardData.columns
});

export default connect(mapStateToProps)(Column);
