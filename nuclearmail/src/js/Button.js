/** @flow */

var Colors = require('./Colors');
var PureRender = require('./PureRender');
var Radium = require('radium');
var StylePropTypes = require('./StylePropTypes');
var {Component, PropTypes} = require('react/addons');

@PureRender
@Radium
class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    use: PropTypes.oneOf(['default', 'special']),
    style: StylePropTypes.layout,
  }

  static defaultProps = {
    use: 'default'
  };

  _onClick = () => {
    this.props.onClick && this.props.onClick();
  };

  render(): any {
    return (
      <button
        onClick={this._onClick}
        style={[
          styles.root,
          (this.props.use === 'default') && styles.default,
          (this.props.use === 'special') && styles.special,
          this.props.style
        ]}
        type="button">
        {this.props.children}
      </button>
    );
  }
}

var styles = {
  root: {
    border: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    lineHeight: '30px',
    margin: 0,
    padding: '1px 16px',
    verticalAlign: 'top',

    ':active': {
      padding: '2px 15px 0 17px',
    },
  },

  default: {
    background: Colors.gray1,
    color: Colors.black,

    ':hover': {
      background: Colors.gray1.darken(5),
    },
  },

  special: {
    background: Colors.accent,
    color: Colors.white,

    ':hover': {
      background: Colors.accent.darken(5),
    },
  },
};

module.exports = Button;
