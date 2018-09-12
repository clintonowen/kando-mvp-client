import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import './task.css';

export class Task extends React.Component {
  render() {
    let timeSpent;
    let classes = 'task';
    if (this.props.time) {
      let duration;
      const time = moment.duration(this.props.time);
      const hours = Math.floor(time.asHours());
      const minutes = Math.floor(time.asMinutes()) - hours * 60;
      if (hours > 0) {
        duration = `${hours}h ${minutes}m`;
      } else {
        duration = `${minutes}m`;
      }
      timeSpent = <span>Time spent: {duration}</span>
    }
    if (this.props.selected === true) {
      classes += ' selected';
    }
    return (
      <section className={classes}>
        <header>{this.props.name}</header>
        {timeSpent}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(Task);
