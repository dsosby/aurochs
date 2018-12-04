import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface IInitData {
    greeting: string;
}

interface IAppState {
    greeting: string;
}

interface IAppProps {
}

class App extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);

        this.state = { greeting: '' };
    }

    componentWillMount(): void {
        fetch("/api/init")
            .then(initResponse => initResponse.json())
            .then((initData: IInitData) => this.setState({ greeting: initData.greeting }));
    }

    render() {
        const { greeting } = this.state;

        return (
            <div className="App">
                <h1>Stellar Demos Start Here</h1>
                <h6>{greeting}</h6>
            </div>
        );
    }
}

export default App;
