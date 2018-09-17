import React from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { pushTask, removeTask, moveTask } from '../actions/board-data';
import Task from './task';
import AddTask from './add-task';
import TaskForm from './task-form';
import Timer from './timer';
import './column.css';

export class Column extends React.Component {
  handlePushTask(task, columnId) {
    this.props.dispatch(pushTask(task, columnId));
  }
  handleRemoveTask(taskId, columnId) {
    this.props.dispatch(removeTask(taskId, columnId));
  }
  handleMoveTask(task, dragIndex, hoverIndex, columnId) {
    this.props.dispatch(moveTask(task, dragIndex, hoverIndex, columnId));
  }
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
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
              task={task}
              time={task.time}
              selected={selected}
              removeTask={this.handleRemoveTask.bind(this)}
              moveTask={this.handleMoveTask.bind(this)}
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
          {connectDropTarget(
            <section className="column">
              <header className="col-header">{this.props.name}</header>
                <div className="taskList">
                  {tasks}
                </div>
              {addTask}
            </section>
          )}
          {timer}
        </div>
      </div>
    );
  }
}

const taskTarget = {
  drop(props, monitor, component) {
    const { id } = props;
    const sourceObj = monitor.getItem();
    if (id !== sourceObj.columnId) {
      component.handlePushTask(sourceObj.task, id);
    }
    return {
      columnId: id
    };
  }
}

const mapStateToProps = state => ({
  selectedTask: state.timer.selectedTask,
  columns: state.boardData.columns
});

export default connect(mapStateToProps)(
    DropTarget("TASK", taskTarget, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }))(Column));
