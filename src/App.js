import React, { Component } from 'react';
import logo from './logo.svg';
import * as StudentAction from './actions/studentaction';
import StudentStore from './stores/studentstore';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            students:[],
            filterName:'',
            headerName:'',
        }
        this._getStudentStore = this._getStudentStore.bind(this);
    }
    componentWillMount(){
       
        StudentStore.on('change',this._getStudentStore);
    }
    
    componentWillUnmount(){
        StudentStore.removeListener('change',this._getStudentStore);
    }
    _getStudentStore(type){
        if(type=='FETCHED_STUDENT'){
            this.setState({
                students:StudentStore.getStudents()
            })
        }
    }
    componentDidMount(){
         console.log(this.props.history);
        StudentAction.getAllStudent();
    }
    showStudentList(){
        let {students,filterName}=this.state;
        if(filterName==''){
            return students.map((s)=>{
                return(
                    <StudentCard key={s.id} 
                        studentDt={s}
                        showDetailView={(rollNo) => {this.props.history.push(`/${rollNo}`)}}
                    />
                )
            }) 
        }else{
            return students.filter((fs)=>{
                let name = fs.name.toLowerCase();
                filterName = filterName.toLowerCase();
                return name.indexOf(filterName)==0
            }).map((s)=>{
                return(
                    <StudentCard key={s.id} 
                        showDetailView={(rollNo) => {this.props.history.push(`/${rollNo}`)}}
                        studentDt={s}
                        
                    />
                )
            })
        }
    }
    pushPage(rollNo){
        console.log('pushPage',rollNo);
        this.props.history.push(`/${rollNo}`)

    }
    sortResult(hd){
        let {headerName,students}= this.state;
        if(headerName==hd){
            this.setState({
                headerName:hd,
                students:students.reverse()
            })
        }else{
            StudentStore.sortStudents(hd);
            this.setState({
                headerName:hd
            })
            
        }

    }
    render() {
        let {students}=this.state;
        return (
        
          <div>
            
            {students.length==0?
                <div>
                    Please wait All Students are getting fetched...
                </div>
                :
                <div>
                    <div className="fixedHd">
                        <div className="inputCnt">
                            <input type ="text" 
                                    placeholder="Search by name"
                                    className="inputText"
                                    onChange={(event)=>{
                                            this.setState({
                                                filterName:event.target.value
                                            })
                                        }}
                            />
                        </div>
                        <div>
                            <button className="sortButton" onClick={()=>{this.sortResult('name')}}>
                                Name
                            </button>
                        </div>
                        <div >
                            <button className="sortButton"  onClick={()=>{this.sortResult('totalMark')}}>
                                Marks
                            </button>
                        </div>
                    </div>
                    <div className="bodyCnt">
                        {this.showStudentList()}
                    </div>
                </div>
               
            }
          </div>
        );
    }
}

class StudentCard extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
       console.log(this.props);
    }
    showDetails(){
        this.props.showDetailView();
    }
    render() {
        let {studentDt,showDetailView}=this.props;
        return (
            <div className="studentCnt" onClick={()=>{showDetailView(studentDt.id)}}>
                <div className="blockCnt">
                    <div className="blockTitle">Name:</div>
                    <div className="blockText">{studentDt.name}</div>
                </div>
                <div className="blockCnt">
                    <div className="blockTitle">Roll No:</div>
                    <div className="blockText">{studentDt.id}</div>
                </div>
                <div className="blockCnt">
                    <div className="blockTitle">Total Marks:</div>
                    <div className="blockText">{studentDt.totalMark}</div>
                </div>
            </div>
        );
    }
 }