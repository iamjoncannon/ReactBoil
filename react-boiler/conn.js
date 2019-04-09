module.exports = name => {

return `import React from 'react';
import { connect } from 'react-redux'

class ${name} extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  render() {

    const { } = this.props;

    return (
      <div></div>
    );
  }
}

const mapStateToProps = state => {
  return {
    yada: state.yadaReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    yadaExport: yada => dispatch(yadaAction(yada))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(${name})

`
}