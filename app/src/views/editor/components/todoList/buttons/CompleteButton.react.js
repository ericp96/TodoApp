const React = require('react');

const CompleteIcon = require('material-ui/svg-icons/action/done').default;
const { green400, grey400 } = require('material-ui/styles/colors');

class CompleteButton extends React.PureComponent {
    render() {
        const { todo, style } = this.props;

        return (
            <CompleteIcon style={style} onClick={this.props.onClick} color={todo.complete ? green400 : grey400} />
        );
    }
}

export default CompleteButton;