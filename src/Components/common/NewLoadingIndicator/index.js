import ReactModal from 'react-modal';
import { reduceHooks } from 'react-table';
import "./index.css"

const contentLabel = "Loading"

function LoaderIcon({ className }) {
    return (
        <div>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        "border": "none",

    },
    overlay: {
        opacity: "0.7"
    }
}

function LoadingIndicator({ isOpen, }) {

    return (<ReactModal
        style={customStyles}
        contentLabel={contentLabel}
        isOpen={isOpen}

    > <LoaderIcon /> </ReactModal>)
}




export default LoadingIndicator;