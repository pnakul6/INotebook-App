import React from 'react'
import "./About.css"
const About = () => {
  return (
    <>
      <div className='maindiv'>
        <h4>Hello Everyone </h4>
        <p>This app is created by <a href='https://www.linkedin.com/in/nakul-pandit-67b959216' target="_blank">Nakul Pandit</a></p>
        <p>This is a simple FullStack web app using MERN Stack. </p>
        <div className="card" style={{ width: "35rem", backgroundColor: 'black' }}>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item" style={{ backgroundColor: 'black' }}>
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button style={{ color: 'white', backgroundColor: 'black' }} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  This is a Web App with (CRUD) functionality with this app you can :-
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <ul className="list-group list-group-flush" style={{ color: 'red', backgroundColor: 'black' }} >
                  <li className="list-group-item list-group-item-action list-group-item-primary"> <strong> Create your Notes on cloud.</strong></li>
                  <li className="list-group-item list-group-item-action list-group-item-primary"> <strong> Read your Notes on cloud.</strong></li>
                  <li className="list-group-item list-group-item-action list-group-item-primary"> <strong> Update your Notes on cloud.</strong></li>
                  <li className="list-group-item list-group-item-action list-group-item-primary"> <strong> Delete your Notes on cloud.</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default About