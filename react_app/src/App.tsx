import React, { useState, FunctionComponent } from "react";
import {connect, DispatchProp} from 'react-redux';
import "./style.scss";
// actions
import { valuesActions } from './@features/store/values';

const App: FunctionComponent<any> = (props) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onSubmit = () => {
      props.dispatch(valuesActions.getPersonValues(inputValue));
    };

  return (
    <>
      <h1>Alpha number calc!</h1>
      <p>Get your alpha character calculation</p>
      <input type="text" value={inputValue} onChange={(ev) => setInputValue(ev.target.value)}/>
      <button onClick={onSubmit}>Proceed</button>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  isLoading: state.values.isLoading,
})

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
