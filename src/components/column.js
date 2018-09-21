import React from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { pushTask, removeTask, updateColumn } from '../actions/board-data';
import Task from './task';
import AddTask from './add-task';
import TaskForm from './task-form';
import './column.css';

export class Column extends React.Component {
  handlePushTask(task, columnId) {
    this.props.dispatch(pushTask(task, columnId));
  }
  handleRemoveTask(taskId, columnId) {
    this.props.dispatch(removeTask(taskId, columnId));
  }
  handleSyncCols(prevColId, taskId) {
    const columns = this.props.columns;
    const newCol = this.props.columns.find(column => {
      return column.tasks.find(task => task.id === taskId);
    });
    if (prevColId !== newCol.id) {
      this.props.dispatch(updateColumn(newCol.id, {
        tasks: newCol.tasks.map(task => task.id)
      }));
    }
    this.props.dispatch(updateColumn(prevColId, {
      tasks: columns.find(column => column.id === prevColId).tasks.map(task => task.id)
    }));
  }
  render() {
    const { connectDropTarget } = this.props;
    let classes = 'column';
    if (this.props.mobile) {
      classes += ' column-mobile';
    }
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
              syncCols={this.handleSyncCols.bind(this)}
              showTaskMenu={task.showTaskMenu}
              editing={task.editing}
            />
          );
        }
      );
    }

    let addTask = <AddTask columnId={this.props.id} />
    if (this.props.showTaskForm) {
      addTask = <TaskForm columnId={this.props.id} purpose="add" />
    }
    return connectDropTarget(
      <section aria-label={`${this.props.name} column`} className={classes}>
        <header aria-hidden="true" className="col-header">{this.props.name}</header>
        <div className="scrollable">
          <div className="taskList">
            {tasks}
          </div>
          {addTask}
        </div>
      </section>
    );
  }
}

const taskTarget = {
  hover(props, monitor, component) {
    const { id } = props;
    const sourceObj = monitor.getItem();
    props.columns.forEach(column => {
      if (column.id !== id && column.tasks.find(task => task.id === sourceObj.task.id)) {
        component.handleRemoveTask(sourceObj.task.id, column.id);
      }
    });
    if (!props.tasks.find(task => task.id === sourceObj.task.id)) {
      component.handlePushTask(sourceObj.task, id);
      sourceObj.index = (props.tasks.length);
    }
  },
  drop(props) {
    const { id, columns } = props;
    return {
      columnId: id,
      columns
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
