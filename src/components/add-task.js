import React from 'react';
import {connect} from 'react-redux';
import './add-task.css';

export class AddTask extends React.Component {
  render() {
    return (
      <button className="add-task">
        Add a task
      </button>
    );
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(AddTask);
