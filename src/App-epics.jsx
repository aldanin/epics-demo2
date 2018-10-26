import React, {Component} from "react";
import "./App.css";
import {connect} from "react-redux";
import * as actions from './actions'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="Age-label">
         <span>
             Selected TAB: <span>Tab{this.props.age}</span>
         </span>
                    <span style={{color: 'red', display: 'inline-block', paddingLeft: '50px'}}>
                        {this.props.isEdit ? 'IS EDITTING!' : ''}
            </span>
                </div>
                <button onClick={this.props.onInc}>Select Tab</button>
                <button onClick={this.props.onDec}>Investigations</button>
                <div>
                    <div>Controls</div>
                    <button onClick={this.props.onCancel}>Cancel</button>
                    <button onClick={this.props.onContinue}>Continue</button>
                </div>
                <div>
                    <button onClick={()=> this.props.onIsEdit(!this.props.isEdit)}>Is editting</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps=state => {
    return {
        age : state.counter,
        isEdit : state.isEdit,
    };
};

const mapDispachToProps=dispatch => {
    return {
        onInc : () => dispatch(actions.increment(1)),
        onDec : () => dispatch(actions.decrement(1)),
        onCancel : () => dispatch(actions.control({command : 'cancel'})),
        onContinue : () => dispatch(actions.control({command : 'continue'})),
        onIsEdit : (isEdit) => dispatch({type : "IS_EDIT", isEdit}),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(App);
