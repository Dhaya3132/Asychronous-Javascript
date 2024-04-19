// GITHUB : https://github.com/Dhaya3132/Asychronous-Javascript

// Logic -> Used to updata data from API while clicking the comment button.
//       -> Adding event to the comment button while clicking used to fetch data from API.
//       -> Fetched Datas from api display to UI in the form of list inside the container
//       ->This works like an comment section.


const LoadingMessage = document.getElementById('Results');
const Button = document.getElementById('Asyncbutton');
const List = document.getElementById('Response');
const ErrorMessage = document.getElementById('ErrorMessage');


function UpdateUI(responseData)
{
LoadingMessage.innerText = ' '; 
// if the promise get resolved the loading will become empty.
// the response get from api will be collection of object.
// to print the object in the list dynamically need to iterate the collection. 
// for that using map method to iterate the object

responseData.map(data => {
    const Html =  `
        <li>
            <p>Name : ${data.name}</p>
            <p>Email : ${data.email}</p>
        </li>
    `
    List.innerHTML += Html;
   });
}


async function TofetchData(){

    //to handle the errors used try catch blocks
    //try block - fetch datas from api. 
    //            The data fetched from api will be promise converting it to js object for that using json()
    //            passing the jsobject data to the updateui function to update the data into ui.
    //To check the network status of api :
    //          - checking by using conditional statement 
    //          - inside checking network by promise data
    //          - !promiseresponse.ok it checks status of the response status of an api 
    //          - if it is false it throws an new error to catch block
    try{
        LoadingMessage.innerText = 'Loading....'; // loading status if the promise in pending state.
        const Apiresponse = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
        console.log(Apiresponse);
        if(!Apiresponse.ok)
        {
            throw new Error(`Network Problem : ${Apiresponse.status}`); //throwns new error if the status failed
        }
        const result = await Apiresponse.json(); //converting into jsobject
        UpdateUI(result); 
        //call function to updateui
    }
    catch(error){

        // Catch Block -> it catches error from network and as well as error from api.

        LoadingMessage.innerText = ' ';
        ErrorMessage.innerText = `${error.message}`
    }
}

//Adding eventlistner to the button
Button.addEventListener('click', ()=> {
    TofetchData(); //Calls the fetchdata function
})



//-----------------------------------------------------------//--------------------------------------------//--------------------------------------------//
//
// This is the another method refered by mdn web docs and jsmaster.
// Logic behind this is custom error handling.
// In this we can extend class from Error class. which we used to throw new Error.
// We extend many class from error use of it to handle many type error.

// -> In this i have used networkerror which extend from error. throw the error to catch and checking the error is in network class

// class NetworkError extends Error {
//     constructor(message)
//     {
//         super(message);
//         this.name='NetworkError';
//     }
// }
// catch(error){
//     if(error instanceof NetworkError)
//     {
//         LoadingMessage.innerText = ' ';
//         ErrorMessage.innerText = `${error.message}`
//     }
//     else{
//         LoadingMessage.innerText = ' ';
//         ErrorMessage.innerText = `${error.message}`
//     }
// }
//
//-----------------------------------------------------------//--------------------------------------------//--------------------------------------------//