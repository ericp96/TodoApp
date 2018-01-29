const React = require('react');

const CompleteIcon = require('material-ui/svg-icons/action/done').default;
const { green300, grey400 } = require('material-ui/styles/colors');

class CompleteButton extends React.PureComponent {
    render() {
        const { todo, style } = this.props;

        let completeStyle = {
            ...style,
            borderRadius: '50%',
            border: todo.complete ? '1px solid ' + green300 : ''
        }

        return (
            <CompleteIcon style={completeStyle} onClick={this.props.onClick} color={todo.complete ? green300 : grey400} />
        );
    }
}

export default CompleteButton;