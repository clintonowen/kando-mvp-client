import React from 'react';
import { connect } from 'react-redux';
import { updateColumn, unsetOverElement } from '../actions/board-data';
import Task from './task';
import AddTask from './add-task';
import TaskForm from './task-form';
import Timer from './timer';
import './column.css';

export class Column extends React.Component {
  handleDragOver(event) {
    event.preventDefault();
    const overCol = event.target;
    if (overCol.className === 'column') {
      overCol.childNodes[1].appendChild(this.props.dragElement);
      this.props.dispatch(unsetOverElement());
    }
  }
  handleDrop(event) {
    event.preventDefault();
    // const dragTaskId = this.props.dragElement.getAttribute('id');
    // const sourceCol = this.props.columns.find(column => {
    //   return column.id === this.props.dragElement.getAttribute('columnid')
    // });
    // const sourceNewTasks = sourceCol.tasks
    //   .filter(task => task.id !== dragTaskId)
    //   .map(task => task.id);
    // const targetCol = this.props.columns
    //   .find(column => column.id === this.props.id);
    // const targetOldTasks = targetCol.tasks.map(task => task.id);
    // let targetNewTasks;
    // if (this.props.overElement) {
    //   let to = this.props.overElement.getAttribute('index');
    //   const before = this.props.nodePlacement === 'before';
    //   if (!before) to++;
    //   if (before && to === 0) {
    //     targetNewTasks = [dragTaskId, ...targetOldTasks];
    //   } else {
    //     targetNewTasks = targetOldTasks.slice(0, to)
    //       .concat([dragTaskId])
    //       .concat(targetOldTasks.slice(to));
    //   }
    // } else {
    //   targetNewTasks = [...targetOldTasks, dragTaskId];
    // }
    // this.props.dispatch(updateColumn(this.props.id, { tasks: targetNewTasks }));
    // this.props.dispatch(updateColumn(sourceCol.id, { tasks: sourceNewTasks }));
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
              taskId={task.id}
              columnid={this.props.id}
              name={task.name}
              time={task.time}
              selected={selected}
              dragging={task.dragging}
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
          <section
            className="column"
            onDragOver={(e) => this.handleDragOver(e)}
            onDrop={(e) => this.handleDrop(e)}
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
  columns: state.boardData.columns,
  dragElement: state.boardData.dragElement,
  overElement: state.boardData.overElement,
  nodePlacement: state.boardData.nodePlacement
});

export default connect(mapStateToProps)(Column);
