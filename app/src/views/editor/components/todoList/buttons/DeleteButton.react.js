const React = require('react');

const DeleteIcon = require('material-ui/svg-icons/action/delete').default;
const { red300 } = require('material-ui/styles/colors');

class DeleteButton extends React.PureComponent {
    render() {
        return (
            <DeleteIcon onClick={this.props.onClick} color={red300} style={this.props.style} />
        );
    }
}

export default DeleteButton;