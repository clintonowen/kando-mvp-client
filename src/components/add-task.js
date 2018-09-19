import React from 'react';
import {connect} from 'react-redux';
import { showTaskForm } from '../actions/board-data';
import './add-task.css';

export class AddTask extends React.Component {
  handleClick() {
    this.props.dispatch(showTaskForm(this.props.columnId));
  }
  render() {
    const ariaHidden = (this.props.selectStatus === 'started') ? true : false;
    return (
      <button className="add-task" onClick={() => this.handleClick()} aria-hidden={ariaHidden}>
        Add a task
      </button>
    );
  }
}

const mapStateToProps = state => ({
  selectStatus: state.timer.selectStatus
});

export default connect(mapStateToProps)(AddTask);
