import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import * as StudentAction from './actions/studentaction';

import StudentStore from './stores/studentstore';
Charts(FusionCharts);




export default class DetailPage extends Component{
    constructor(props){
        super(props);
        let id = this.props.location.pathname;
        id = id.split('/')[1];
        this.state={
            studentDt:StudentStore.getParticularStudent(id)
        }
        this._getStudentStore = this._getStudentStore.bind(this);
    }
    componentWillMount(){
       
        StudentStore.on('change',this._getStudentStore);
    }
    
    componentWillUnmount(){
        StudentStore.removeListener('change',this._getStudentStore);
    }
    componentDidMount(){
        let sL =  StudentStore.getStudents();
        if (sL.length==0){
            StudentAction.getAllStudent();
        }
    }
    _getStudentStore(type){
        if(type=='FETCHED_STUDENT'){
            let id = this.props.location.pathname;
            id = id.split('/')[1];
            this.setState({
                studentDt:StudentStore.getParticularStudent(id)
            })
        }
    }
    setGraphData(marks){
        let markObj = [];
        for(let i in marks){
            markObj.push({label:i,value:marks[i]})
        }
        return markObj;
    }
  render(){
    
    let {studentDt}=this.state;
    if(Object.keys(studentDt).length==0){
      return(
        <div>Fetching details of invalid student</div>
      )
    }else{
        this.setGraphData(studentDt.marks);
    
        let ds = {"chart": 
                    {
                        "caption": `${studentDt.name} Mark Sheet`,
                        "subCaption": "",
                    },
                  "data": this.setGraphData(studentDt.marks)
                };
        const chartConfigs = {
          type: 'column2d',
          width: 600,
          height: 400,
          dataFormat: 'json',
          dataSource: ds,
        };
        return(
            <div>
                <div className="blockCnt">
                        <div className="blockTitle">Name:</div>
                        <div className="blockText">{studentDt.name}</div>
                </div>
                <div className="blockCnt">
                    <div className="blockTitle">Roll No:</div>
                    <div className="blockText">{studentDt.rollNo}</div>
                </div>
                <div>
                  <ReactFC {...chartConfigs} />
                </div>
            </div>
        )
    }
  }
}




