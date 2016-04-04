class MyClass extends React.Component<any, any> {
    render() {
        return <h1>hello {this.props.name}</h1>;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<MyClass name="Tom" />, document.body);
})