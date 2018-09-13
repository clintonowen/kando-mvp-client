import React from 'react';
import {connect} from 'react-redux';
import { showTaskForm } from '../actions/board-data';
import './add-task.css';

export class AddTask extends React.Component {
  handleClick() {
    this.props.dispatch(showTaskForm(this.props.columnId));
  }
  render() {
    return (
      <button className="add-task" onClick={() => this.handleClick()}>
        Add a task
      </button>
    );
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(AddTask);
