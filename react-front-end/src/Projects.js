import React from 'react';
import axios from 'axios';
import Project from './Project.js';

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      actions: []
    }
    console.log('constructing???')
  }

  componentDidMount() {
    console.log('mounting');
    axios.get('http://localhost:5555/actions')
      .then(res => {
        console.log('setting state', res.data)
        this.setState({
          actions: res.data
        });
      })
      .catch(err => {
        console.log('uh-oh, error fetching projects');
      });
    axios.get('http://localhost:5555/projects')
      .then(res => {
        console.log('setting state', res.data)
        this.setState({
          projects: res.data
        });
      })
      .catch(err => {
        console.log('uh-oh, error fetching projects');
      });
  }

  render() {
    console.log('rendering', this.state.projects);
    if(this.state.projects.length > 0 && this.state.actions.length > 0) {
      return (
        <div className="projectsContainer">
          {this.state.projects.map(p => <Project project={p} actions={this.state.actions.filter(a => a.project_id === p.id)} />)}
        </div>
      );  
    }
    else {
      return <p>Projects not loaded yet :(</p>;
    }
  }
}
 
export default Projects;