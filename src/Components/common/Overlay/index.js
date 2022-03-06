
import ReactDOM from 'react-dom';
import "./index.css"

function Overlay({ show, children }) {
    return ReactDOM.createPortal(
        <div className="overlay">{children}</div>,
        document.body
    )
}

export default Overlay;