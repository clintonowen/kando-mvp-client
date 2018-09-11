import React from 'react';
import {connect} from 'react-redux';
// import Column from './column';
import './column.css';

export class Column extends React.Component {
  render() {
    return (
      <section className="column">
        <header className="col-header">To Do</header>
        {/* <Task /> */}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(Column);
