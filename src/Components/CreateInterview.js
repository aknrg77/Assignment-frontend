import React, { Component } from 'react'

import InterviewForm from './InterviewForm'

export class CreateInterview extends Component {
    
    render() {
        return (
            <div className='App'>
                
               <InterviewForm method = "create" uid = {null}/>
               
            </div>
        )
    }
}

export default CreateInterview
