import dispatcher from "../dispatchers/dispatcher";
const API = 'https://api.myjson.com/bins/1dlper/';

export function _getAllStudent(){
    
        fetch(API)
            .then(response => response.json())
            .then(data => {
                
                dispatcher.dispatch({
                    students:data,
                    type: 'FETCHED_STUDENT',
                }); 
            }).catch(error=>{
                console.log('error',error);
            });
   
}