import React, { FunctionComponent } from "react";
import {createPortal} from "react-dom"

type Props = {
    title: string,
    message: string,
    isShowing: boolean,
    hide: (event: React.MouseEvent<HTMLElement>) => void
}

const Overlay: FunctionComponent<Props> = ({title, message, isShowing, hide}) => 
    isShowing ? createPortal(<section className="overlay">
        <div className="overlay-box">
            <h2>{title}</h2>
            <p>{message}</p>
            <button onClick={hide}>x</button>
        </div>
    </section>, document.body) :
    null

export default Overlay