const React = require('react');

const CompleteIcon = require('material-ui/svg-icons/action/done').default;
const { green300, grey400 } = require('material-ui/styles/colors');

class CompleteButton extends React.PureComponent {
    render() {
        const { todo } = this.props;
        const style = {
            ...(this.props.style || {}),
            top: '10px',
            right: '15px'
        };

        return (
            <CompleteIcon {...this.props} onClick={this.props.onClick} color={todo.complete ? green300 : grey400} style={style} />
        );
    }
}

export default CompleteButton;