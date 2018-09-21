import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import { hideTaskForm, addTask, hideEditForm, updateTask } from '../actions/board-data';
import {required, nonEmpty} from '../validators';
import './task-form.css';

export class TaskForm extends React.Component {
  componentDidMount() {
    this.handleInitialize();
  }
  handleInitialize() {
    let initData = (this.props.initValues) ? this.props.initValues : {};
    this.props.initialize(initData);
  }
  handleSubmit(values) {
    if (this.props.purpose === 'add') {
      this.props.dispatch(addTask(values.name, this.props.columnId));
      this.props.dispatch(hideTaskForm(this.props.columnId));
    }
    if (this.props.purpose === 'edit') {
      const updateData = {
        "name": values.name
      }
      this.props.dispatch(updateTask(this.props.taskId, updateData));
      this.props.dispatch(hideEditForm(this.props.taskId, this.props.columnId));
    }
  }
  handleCancel() {
    if (this.props.purpose === 'add') {
      this.props.dispatch(hideTaskForm(this.props.columnId));
    }
    if (this.props.purpose === 'edit') {
      this.props.dispatch(hideEditForm(this.props.taskId, this.props.columnId));
    }
  }
  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form
        className="task-form"
        onSubmit={this.props.handleSubmit(values =>
          this.handleSubmit(values)
        )}>
        {error}
        <Field
          label="Task Name:"
          component={Input}
          type="text"
          name="name"
          id="name"
          validate={[required, nonEmpty]}
        />
        <button type="button" onClick={() => this.handleCancel()}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={!this.props.valid || this.props.submitting}>
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'task',
  onSubmitFail: (errors, dispatch) =>
      dispatch(focus('task', Object.keys(errors)[0]))
})(TaskForm);
