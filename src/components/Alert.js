import React from 'react'
function Alert(props) {
  const capi = (word)=>{
    if(word ==="danger"){
      word="ERROR";
    }else{
      word="SUCCESS";
    }
    return word;
  }
  return (
    <div style={{height: '50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{capi(props.alert.type)}</strong>{props.alert.msg}
      </div>}
    </div>
    )
}
export default Alert