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
                <main>
                    <div className="row center-xs">
                        <div className="col-8-xs col-offset-2-xs">
                            <h1>Aurochs</h1>
                            <h3>{greeting}</h3>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
