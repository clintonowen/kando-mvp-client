import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import { hideTaskForm, addTask } from '../actions/board-data';
import {required, nonEmpty} from '../validators';
import './task-form.css';

export class TaskForm extends React.Component {
  handleSubmit(values) {
    this.props.dispatch(addTask(values.name, this.props.columnId));
    this.props.dispatch(hideTaskForm(this.props.columnId));
  }
  handleCancel() {
    this.props.dispatch(hideTaskForm(this.props.columnId));
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
          disabled={this.props.pristine || this.props.submitting}>
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
