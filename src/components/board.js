import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MediaQuery from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import requiresLogin from './requires-login';
import { fetchColumns, setTimerColumn } from '../actions/board-data';
import Column from './column';
import Timer from './timer';
import './board.css';

export class Board extends React.Component {
  state = {
    swipeIndex: 0,
    hoverZones: true
  }
  componentDidMount() {
    this.props.dispatch(fetchColumns())
      .then(() => {
        let columns = this.props.columns;
        let timerColumn = columns.find(column => column.showTimer === true);
        if (columns.length > 0 && !timerColumn) {
          timerColumn = this.props.columns[this.props.columns.length - 1]['id'];
        }
        this.props.dispatch(setTimerColumn(timerColumn));
      });
  }

  handleChangeIndex = (index) => {
    this.setState({
      swipeIndex: index,
    })
  }

  handleHoverRight = () => {
    console.log('handleHoverRight ran');
    if (this.state.swipeIndex < this.props.columns.length - 1
      && this.state.hoverZones === true) {
      this.setState(Object.assign({}, this.state, {
        swipeIndex: this.state.swipeIndex + 1,
        hoverZones: false
      }));
      setTimeout(() => {
        this.setState(Object.assign({}, this.state, {
          hoverZones: true
        }));
      }, 1000);
    }
  }

  handleHoverLeft = () => {
    console.log('handleHoverLeft ran');
    if (this.state.swipeIndex > 0 && this.state.hoverZones === true) {
      this.setState(Object.assign({}, this.state, {
        swipeIndex: this.state.swipeIndex - 1,
        hoverZones: false
      }));
      setTimeout(() => {
        this.setState(Object.assign({}, this.state, {
          hoverZones: true
        }));
      }, 1000);
    }
  }

  render() {
    let columns = (
      <div></div>
    );
    let mobileTimer;
    if (this.props.columns.find(column => column.showTimer)) {
      mobileTimer = <Timer />;
    }
    if (this.props.columns.length > 0) {
      columns = this.props.columns
        .map((column) => {
          let timer;
          if (column.showTimer) {
            timer = <Timer />;
          }
          return (
            <MediaQuery minWidth={700} key={column.id}>
              {(matches) => {
                if (matches) {
                  return (
                    <div className="col-horz-flex-container">
                      <div className="col-vert-flex-container">
                        <Column
                          id={column.id}
                          name={column.name}
                          tasks={column.tasks}
                          showTaskForm={column.showTaskForm}
                        />
                        {timer}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <Column
                      id={column.id}
                      name={column.name}
                      tasks={column.tasks}
                      showTaskForm={column.showTaskForm}
                      mobile={true}
                    />
                  );
                }
              }}
            </MediaQuery>
          );
        });
    }
    let dimOverlay;
    if (this.props.selectStatus === 'started') {
      dimOverlay = <div className="dim-overlay"></div>
    }
    const styles = {
      root: {
        height: '100%',
        padding: '0 40px',
        width: '100%'
      },
      slideContainer: {
        height: '100%',
        padding: '0 10px',
      }
    }
    return (
      <div className="board-wrapper">
        {dimOverlay}
        <MediaQuery minWidth={700} >
          {(matches) => {
            if (matches) {
              return (
                <main className="board">
                  <div className="left-center-columns"></div>
                    {columns}
                  <div className="right-center-columns"></div>
                </main>
              );
            } else {
              return (
                <main className="board">
                  <div className="left-hover-zone"
                    onDragOver={() => this.handleHoverLeft()}>
                  </div>
                  <div className="col-vert-flex-container">
                    <SwipeableViews
                      index={this.state.swipeIndex}
                      onChangeIndex={this.handleChangeIndex}
                      style={styles.root}
                      slideStyle={styles.slideContainer}
                      enableMouseEvents
                      resistance
                      >
                      {columns}
                    </SwipeableViews>
                    <div style={{padding: '0 50px'}}>
                      {mobileTimer}
                    </div>
                  </div>
                  <div className="right-hover-zone"
                    onDragOver={() => this.handleHoverRight()}>
                  </div>
                </main>
              );
            }
          }}
        </MediaQuery>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  columns: state.boardData.columns,
  selectStatus: state.timer.selectStatus
});

export default requiresLogin()(
  connect(mapStateToProps)(
    DragDropContext(HTML5Backend)(Board))
);
