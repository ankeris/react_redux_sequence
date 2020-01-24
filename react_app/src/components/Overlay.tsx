import React, { FunctionComponent } from "react";
import {createPortal} from "react-dom"
//css
import '../@features/sass/overlay.scss';

type Props = {
    title: string,
    message: string,
    isShowing: boolean,
    hide: (event: React.MouseEvent<HTMLElement>) => void
}

const Overlay: FunctionComponent<Props> = ({title, message, isShowing, hide}) => 
    isShowing ? createPortal(
        <section className="overlay">
                <div className="overlay-shadow"></div>
                <div className="overlay-modal">
                    <h2>{title}</h2>
                    <p>{message}</p>
                    <button className="button button--success" onClick={hide}>Ok</button>
                </div>
        </section>, document.body) :
    null

export default Overlay