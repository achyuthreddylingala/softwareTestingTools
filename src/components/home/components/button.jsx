import PropTypes from 'prop-types';

const Button = (props) =>{
  
    return (
        <button style={props.style} className = {props.className} onClick={props.onClick}>
            {props.text}
        </button>
    )
}

Button.propTypes = {
    style: PropTypes.any,       // style prop is an object
    className: PropTypes.any,   // className prop is a string
    onClick: PropTypes.any,       // onClick prop is a function
    text: PropTypes.any         // text prop is a string
};

export default Button;