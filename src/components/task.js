import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import './task.css';

export class Task extends React.Component {
  render() {
    let timeSpent;
    if (this.props.time > 0) {
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
    return (
      <section className="task">
        <header>{this.props.name}</header>
        {timeSpent}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(Task);
