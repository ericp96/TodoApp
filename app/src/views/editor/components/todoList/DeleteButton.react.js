const React = require('react');

const DeleteIcon = require('material-ui/svg-icons/action/delete').default;
const { red300 } = require('material-ui/styles/colors');

class DeleteButton extends React.PureComponent {
    render() {
        const style = { 
            ...(this.props.style || {}),
            top: '10px',
            right: '15px'
        };

        return (
            <DeleteIcon {...this.props} onClick={this.props.onClick} color={red300} style={style} />
        );
    }
}

export default DeleteButton;