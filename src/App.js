import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Denis', age: 27 },
      { id: 2, name: 'Oki', age: 24 },
      { id: 3, name: 'Jiji', age: 26 },
      { id: 4, name: 'Huy4o', age: 12}
    ],
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);

    this.setState({ persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  render() {
    let persons = null;
    let btnClasses = [classes.button]

    if (this.state.showPersons) {
      persons = (
        <div>
            {this.state.persons.map((person, i) => {
              return <Person 
                click={() => this.deletePersonHandler(i)}
                name={person.name} 
                age={person.age} 
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
            })} 
          </div>
      )

      btnClasses.push(classes.Red)
    }

    const assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.App}>
          <h1>Hello I am a React App</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button
            className={btnClasses.join(' ')}
            onClick={this.togglePersonsHandler}>
              Toggle Persons
          </button>
          
            { persons }
        </div>
    );
  }
};

export default App;