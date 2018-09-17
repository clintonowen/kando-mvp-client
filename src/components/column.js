import React from 'react';
import { connect } from 'react-redux';
import { reorderTasks, toggleTaskDragging, updateColumn, setTargetColumn, unsetOverElement } from '../actions/board-data';
import Task from './task';
import AddTask from './add-task';
import TaskForm from './task-form';
import Timer from './timer';
import './column.css';

export class Column extends React.Component {
  handleDragOver(event) {
    event.preventDefault();
    if (event.target.className === 'column') {
      this.props.dispatch(setTargetColumn(
        this.props.columns.find(col => col.id === this.props.id)
      ));
      this.props.dispatch(unsetOverElement());
      // this.props.dispatch(addColumnTask());
      event.target.childNodes[1].appendChild(this.props.dragElement);
    }
  }
  handleDrop(event) {
    event.preventDefault();
    console.log('handleDrop ran');
    this.props.dispatch(toggleTaskDragging(this.props.dragElement.id));

    this.props.dispatch(reorderTasks());
    
    let domTask = document.getElementById(this.props.dragElement.id);
    console.log('domTask', domTask);
    if (this.props.overElement) {
      this.props.overElement.parentNode.removeChild(domTask);
    } else {
      event.target.getElementsByClassName('taskList')[0].removeChild(domTask);
    }
    
    // this.props.dispatch(updateColumn(this.props.id, { tasks: targetNewTasks }));
    // this.props.dispatch(updateColumn(sourceCol.id, { tasks: sourceNewTasks }));
  }
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
  targetColumn: state.boardData.targetColumn,
  dragElement: state.boardData.dragElement,
  overElement: state.boardData.overElement,
  nodePlacement: state.boardData.nodePlacement
});

export default connect(mapStateToProps)(Column);
