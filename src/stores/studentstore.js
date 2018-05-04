import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";
class StarwarStores extends EventEmitter{
	constructor(){
		super();
		this.students=[];
		this.allStudent={};
	}
	saveStudets(student){

		let stud  = Object.values(student)||[];
		stud = stud.map((s)=>{
			let marks = Object.values(s.marks||{}) || [];
			marks = marks.reduce(function(accumulator, currentValue) {
 				 return accumulator + currentValue;
			},0);
			return({name:s.name,id:s.rollNo,totalMark:marks});
		});
		this.students=stud;
		this.allStudent=student;
		this.emit('change','FETCHED_STUDENT');

	}
	getStudents(){
		return this.students || [];
	}
	getParticularStudent(id){
		return this.allStudent[id] || {};
	}
	sortStudents(hd){

		this.students.sort(function(a,b){
			if (a[hd] < b[hd])
		    	return -1;
		  	if (a[hd] > b[hd])
		    	return 1;
		  	return 0;
		})

		// this.planets = planet;
		this.emit('change','FETCHED_STUDENT')
	}
	
	_handleActions(action){
		switch(action.type){
			case 'FETCHED_STUDENT' : {
				this.saveStudets(action.students);
				break;
			}
			
		}
	}
}

const starwarStores = new StarwarStores();
dispatcher.register(starwarStores._handleActions.bind(starwarStores));
export default starwarStores;
