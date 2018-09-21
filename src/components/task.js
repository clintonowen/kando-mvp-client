import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import moment from 'moment';
import { updateColumn, moveTask, deleteTask, hideTaskMenu, showTaskMenu, showEditForm, removeTask, pushTask } from '../actions/board-data';
import { selectTask, stopSelect } from '../actions/timer';
import { DropdownMenu } from './dropdown-menu';
import TaskForm from './task-form';
import './task.css';

export class Task extends React.Component {
  toggleMenu() {
    if (this.props.showTaskMenu) {
      this.props.dispatch(hideTaskMenu(this.props.columnId, this.props.taskId));
    } else {
      this.props.dispatch(showTaskMenu(this.props.columnId, this.props.taskId));
    }
  }
  handleTaskClick(taskId) {
    if (this.props.selectStatus === 'started') {
      this.props.dispatch(selectTask(taskId));
      this.props.dispatch(stopSelect());

      const allElements = document.getElementsByTagName('*');
      for (let i = 0; i < allElements.length; i++) {
        allElements[i].removeAttribute('tabIndex');
        // allElements[i].removeAttribute('aria-hidden');
      }
    }
  }
  handleUpdateColumn(columnId, updateData) {
    this.props.dispatch(updateColumn(columnId, updateData));
  }
  handleMoveTask(task, dragIndex, hoverIndex, columnId) {
    this.props.dispatch(moveTask(task, dragIndex, hoverIndex, columnId));
  }
  handleDelete() {
    this.props.dispatch(deleteTask(this.props.taskId));
    const updateData = {
      tasks: this.props.columns
        .find(column => column.id === this.props.columnId).tasks
        .map(task => task.id)
        .filter(taskId => taskId !== this.props.taskId)
    };
    this.props.dispatch(updateColumn(this.props.columnId, updateData));
  }
  handleEdit() {
    this.props.dispatch(hideTaskMenu(this.props.columnId, this.props.taskId));
    this.props.dispatch(showEditForm(this.props.taskId, this.props.columnId));
  }
  handleMoveRight() {
    const { columnId, taskId } = this.props;
    const colIndex = this.props.columns.findIndex(column => column.id === columnId) + 1;
    if (colIndex < this.props.columns.length) {
      const newColumnId = this.props.columns[colIndex].id;
      const task = this.props.columns.find(column => column.id === columnId)
      .tasks.find(task => task.id === taskId);
      this.props.dispatch(removeTask(taskId, columnId));
      this.props.dispatch(pushTask(task, newColumnId));
      this.props.dispatch(hideTaskMenu(newColumnId, taskId));
      
      const newCol = this.props.columns[colIndex];
      this.props.dispatch(updateColumn(newCol.id, {
        tasks: newCol.tasks.map(task => task.id).concat([taskId])
      }));
      this.props.dispatch(updateColumn(columnId, {
        tasks: this.props.columns.find(column => column.id === columnId).tasks.filter(task => task.id !== taskId).map(task => task.id)
      }));
    } else {
      this.props.dispatch(hideTaskMenu(columnId, taskId));
    }
  }
  handleMoveLeft() {
    const { columnId, taskId } = this.props;
    const colIndex = this.props.columns.findIndex(column => column.id === columnId) - 1;
    if (colIndex >= 0) {
      const newColumnId = this.props.columns[colIndex].id;
      const task = this.props.columns.find(column => column.id === columnId)
      .tasks.find(task => task.id === taskId);
      this.props.dispatch(removeTask(taskId, columnId));
      this.props.dispatch(pushTask(task, newColumnId));
      this.props.dispatch(hideTaskMenu(newColumnId, taskId));
      
      const newCol = this.props.columns[colIndex];
      this.props.dispatch(updateColumn(newCol.id, {
        tasks: newCol.tasks.map(task => task.id).concat([taskId])
      }));
      this.props.dispatch(updateColumn(columnId, {
        tasks: this.props.columns.find(column => column.id === columnId).tasks.filter(task => task.id !== taskId).map(task => task.id)
      }));
    } else {
      this.props.dispatch(hideTaskMenu(columnId, taskId));
    }
  }
  render() {
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const ariaHidden = (this.props.selectStatus === 'started') ? true : false;

    let timeSpent;
    let containerClasses = 'task-container'
    let taskClasses = 'task';
    let menuClasses = 'task-menu';
    if (this.props.selected === true) {
      containerClasses += ' selected';
    }
    if (this.props.selectStatus === 'started') {
      containerClasses += ' selectable';
    }
    if (isDragging) {
      containerClasses += ' dragged-border';
      taskClasses += ' dragged-content';
      menuClasses += ' dragged-content';
    }
    if (this.props.time) {
      let duration = '';
      const time = moment.duration(this.props.time);
      const days = Math.floor(time.asDays());
      const hours = Math.floor(time.asHours()) - (days * 24);
      const minutes = Math.floor(time.asMinutes()) - (hours + (days * 24)) * 60;
      if (days > 0) {
        duration += `${days}d `
      }
      if (hours > 0) {
        duration += `${hours}h `;
      }
      if (minutes > 0) {
        duration += `${minutes}m`;
      }
      timeSpent = <span aria-hidden={ariaHidden}>Time spent: {duration}</span>
    }

    if (!this.props.editing) {
      return connectDragSource(connectDropTarget(
        <div
            id={this.props.taskId}
            index={this.props.index}
            className={containerClasses}
            columnid={this.props.columnid}
            onClick={() => this.handleTaskClick(this.props.taskId)}
        >
          <section className={taskClasses}>
            <header>
              {this.props.name}
            </header>
            {timeSpent}
          </section>
          <DropdownMenu
            classes={menuClasses}
            showMenu={this.props.showTaskMenu}
            toggleMenu={() => this.toggleMenu()}
            links={[
              {
                onClick: () => this.handleMoveRight(),
                text: 'Move Right',
                href: "#app"
              },
              {
                onClick: () => this.handleMoveLeft(),
                text: 'Move Left',
                href: "#app"
              },
              {
                onClick: () => this.handleEdit(),
                text: 'Edit',
                href: "#app"
              },
              {
                onClick: () => this.handleDelete(),
                text: 'Delete',
                href: "#app"
              }
            ]}
            ariaHidden={ariaHidden}
          />
          <button aria-label={this.props.name} className="select-task" tabIndex="-1" aria-hidden="true"></button>
        </div>
      ));
    } else {
      return (
        <TaskForm taskId={this.props.taskId} columnId={this.props.columnId} purpose="edit" initValues={{"name": this.props.name}}/>
      );
    }
  }
}

const taskSource = {
  beginDrag(props) {
    return {
      index: props.index,
      columnId: props.columnId,
      task: props.task
    };
  },
  endDrag(props, monitor){
    props.syncCols(props.columnId, props.taskId);
  },
  isDragging(props, monitor) {
    return props.task.id === monitor.getItem().task.id;
  }
};

const taskTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    if (dragIndex !== hoverIndex) {
      props.dispatch(moveTask(monitor.getItem().task, dragIndex, hoverIndex, props.columnId));

      // Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  }
};

const mapStateToProps = state => ({
  selectStatus: state.timer.selectStatus,
  columns: state.boardData.columns
});

export default connect(mapStateToProps)(
  DropTarget(
  "TASK", taskTarget, connect => ({
    connectDropTarget: connect.dropTarget()
    })
  )(DragSource(
  "TASK", taskSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
    })
  )(Task)));
