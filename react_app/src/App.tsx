import React, { useState, FunctionComponent, useEffect } from "react";
import {connect, DispatchProp} from 'react-redux';
import "./style.scss";
// actions
import { valuesActions } from './@features/store/values';
import { Person, Facility, Exposure } from '../../shared_types/types';
import useOverlay from "./@features/hooks/overlay.hook";

interface IProps extends DispatchProp {
  isLoading: boolean,
  serverErrorMessage: string,
  exposureValues: Exposure,
  facilityValues: Facility
}

const App: FunctionComponent<IProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  
  const getValidationMessage = (value: string): string => {
    if (value.toString().length < 1 || value.toString().length > 10) return 'Number should be up to 10 characters';
    if (!/^[a-zA-Z]+$/.test(value)) return 'Should only contain letters';  
    else return ''
  }

  const onSubmit = () => {
    const errMsg = getValidationMessage(inputValue)
    setErrMsg(errMsg);
    // if there's error message, it's invalid
    const isValid = !errMsg.length;
    
    if (!isValid) return;
      props.dispatch(valuesActions.getPersonValues<string>(inputValue));
  };

  return (
    <>
      <h1>Alpha number calc!</h1>
      <p>Get your alpha character calculation</p>
      <input type="text" value={inputValue} onChange={(ev) => {
        setErrMsg(getValidationMessage(ev.target.value)); setInputValue(ev.target.value)
      }}/>
      <button disabled={!!errMsg.length} onClick={onSubmit}>Proceed</button>
      {props.isLoading && <h5>Loading</h5>}
      {!!props.serverErrorMessage.length && <h4 className="error error--warning">{props.serverErrorMessage}</h4>}
      {!!errMsg.length && <h1>{errMsg}</h1>}
    </>
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
