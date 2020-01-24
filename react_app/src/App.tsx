import React, { useState, FunctionComponent, useEffect } from "react";
import {connect, DispatchProp} from 'react-redux';
// actions
import { valuesActions } from './@features/store/values';
import { Facility, Exposure } from '../../shared_types/types';
import useOverlay from "./@features/hooks/overlay.hook";
import Overlay from "./components/Overlay";
// css
import "./@features/sass/style.scss";
import "./@features/sass/button.scss";
import "./@features/sass/errors.scss";


interface IProps extends DispatchProp {
  isLoading: boolean,
  serverErrorMessage: string,
  exposureValues: Exposure,
  facilityValues: Facility
}

const App: FunctionComponent<IProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const {isShowing, toggleOverlay, setOverlayMessage, overlayMessage, setOverlayTitle, overlayTitle} = useOverlay();
  
  const getValidationMessage = (value: string): string => {
    if (value.toString().length < 1 || value.toString().length > 10) return 'Characters should be up to 10 length';
    if (!/^[a-zA-Z]+$/.test(value)) return 'Should only contain letters';  
    else return ''
  }

  // When exposure (final) values comes, this hook will fire
  useEffect(() => {
    if (!props.exposureValues) return;
    setOverlayTitle('Success!')
    setOverlayMessage(`The final value is: ${props.facilityValues.val3 * props.facilityValues.val4}`)
    // only open overlay when it's not open yet.
    if(!isShowing) toggleOverlay()
  }, [props.exposureValues])

  const onSubmit = () => {
    const errMsg = getValidationMessage(inputValue)
    setErrMsg(errMsg);
    // if there's error message, it's invalid
    const isValid = !errMsg.length;
    if (!isValid) return;
    props.dispatch(valuesActions.getPersonValues<string>(inputValue));
  };

  return (
    <section className="app-box">
      <h1>Alpha character to number generator!</h1>
      <p>Insert your alpha character:</p>
      <input className="input" type="text" value={inputValue} onChange={(ev) => {
        setErrMsg(getValidationMessage(ev.target.value)); setInputValue(ev.target.value)
      }}/>

      <button className="button button--success" disabled={!!errMsg.length} onClick={onSubmit}>Proceed</button>

      {props.isLoading && <h5>Loading</h5>}
      {!!props.serverErrorMessage.length && <h1 className="error-box__message error-box__message--danger">{props.serverErrorMessage}</h1>}
      {!!errMsg.length && <h1 className="error-box__message error-box__message--warning">{errMsg}</h1>}

      <Overlay
        title={overlayTitle}
        message={overlayMessage}
        isShowing={isShowing}
        hide={toggleOverlay}
      />

    </section>
  );
}

const mapStateToProps = (state: any) => ({
  isLoading: state.values.isLoading,
  serverErrorMessage: state.values.errorMessage,
  exposureValues: state.values.exposureValues,
  facilityValues: state.values.facilityValues
})

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
