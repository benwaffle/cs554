import React from 'react';
import './styles/style.css';
import UserListContainer from './containers/UserListContainer';
import TodoListContainer from './containers/TodoListContainer';
import CreateTodo from './components/CreateTodo';
import UpdateTodo from './components/UpdateTodo';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    return <Switch>
        <Route exact path='/' component={UserListContainer}/>
        <Route path='/todos/:userId' component={TodoListContainer}/>
        <Route path='/create' component={CreateTodo} />
        <Route path='/update/:id' component={UpdateTodo} />
    </Switch>
};

export default App;
