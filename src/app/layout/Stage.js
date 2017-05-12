import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { canvasAction } from '../actions/';
import Canvas from '../components/canvas';


class Stage extends PureComponent {
  static defaultProps = {
    className: '',
    onDimensionUpdate: () => {},
  }
  static propTypes = {
    className: PropTypes.string,
    onDimensionUpdate: PropTypes.func,
  }
  render() {
    console.log(this.props)
    const { className, onDimensionUpdate } = this.props;
    const props = {
      className,
    };
    const canvasProps = {
      onDimensionUpdate,
    };
    return (
      <div {...props}><Canvas {...canvasProps} /></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDimensionUpdate: (dimension) => {
      dispatch(canvasAction.updateCanvasDimension(dimension));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stage);
