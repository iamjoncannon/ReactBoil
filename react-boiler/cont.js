module.exports = name => {

return `import React from 'react';

export default class ${name} extends React.Component {
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
}`
}