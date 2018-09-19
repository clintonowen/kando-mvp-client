import React from 'react';
import { connect } from 'react-redux';
import { setWindowSize } from '../actions/activity';

export class WindowDimensions extends React.Component {
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", () => this.updateDimensions());
  }
  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions());
  }
  updateDimensions() {
    const w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

    this.props.dispatch(setWindowSize(width, height));
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  windowDimensions: state.activity.windowSize
});

export default connect(mapStateToProps)(WindowDimensions);
