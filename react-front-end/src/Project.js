import React from 'react';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    }
  }

  toggle = () => {
    this.setState({showInfo: !this.state.showInfo});
  }

  render() {
    return (
      <div className="project" onClick={() => this.toggle()}>
        <h2>{this.props.project.name}</h2>
        {this.state.showInfo ?
          <div className="hidden">
            <p>{this.props.project.description}</p>
            <h3>Actions</h3>
            {this.props.actions.map(a => {
              return <p className="action">{a.description}</p>
            })}
          </div>
          :
          <p></p>
        }
      </div>
    );
  }
}
 
export default Project;