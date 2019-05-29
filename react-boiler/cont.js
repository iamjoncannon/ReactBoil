module.exports = name => {

return `import React from 'react';

export default class ${name} extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  render() {

    return (
      <div></div>
    );
  }
}`
}