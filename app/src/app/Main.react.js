const React = require('react');
const { List } = require('immutable');

const ObservableConnector = require('stredux/ObservableConnector.hoc.react').default;

@ObservableConnector('button_click', 'add_item')
class Main extends React.PureComponent {
    render() {
        const { add_item = List(), add_item$, button_click, button_click$ } = this.props;

        return (
            <div>
                Main
                <div>

                    <div>
                        {button_click}
                    </div>
                    <button onClick={() => button_click$.next(button_click + 1)}>Click Me</button>
                </div>

                <div style={{ clear: 'both' }}>
                    {add_item.map(d => <div key={d} style={{ float: 'left', background: 'red' }}>{d}</div>)}
                </div>
                <button onClick={() => add_item$.next(add_item.count())}>Add Item</button>
            </div>
        );
    }
}

export default Main;