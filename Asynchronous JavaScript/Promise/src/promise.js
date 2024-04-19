// Logic -> Used to updata data from API while clicking the comment button.
//       -> Adding event to the comment button while clicking used to fetch data from API.
//       -> Fetched Datas from api display to UI in the form of list inside the container
//       ->This works like an comment section.


const promiseText = document.getElementById("Results"); // getting id to display the pending stage of an promise
const promiseButton = document.getElementById("Promisebutton"); // button referense
const Responses = document.getElementById("Response"); // to display the data in unorderlist reference
const Error = document.getElementById("ErrorMessage"); // error data to be displayes reference

//adding event listener to the button
promiseButton.addEventListener("click", () => {

    // while clicking the button if the promise is in the pending stage it shows that the loading the data.
    promiseText.innerText = "Loading the Datas";
    Error.innerText = "";

    //creating promise with two parameter resolve reject
    const FetchingData = new Promise((resolve, reject) => {
    
        //setting time period for promise to display the data
        setTimeout( ()=> {

            // while promise display the loading text should be cleared for that emptying the text.
            promiseText.innerText="";
            //fetching the data from api 
            fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
            .then(data => resolve(data))
            .catch(err => reject(err));
        }, 5000);
    });

    //creating another promise for timeout 
    const TimeOutData = new Promise((resolve, reject)=> {
        setTimeout( ()=> {
            reject('Operation has been timedout');
        },6000) 
        // setting time period for the promise
    })
    
    // Simple race conducting the race betweent the promise 
    //which promise returning first it will displayed other promises will lose the race.
    Promise.race([FetchingData,TimeOutData])
    .then( datas => datas.json())
    .then( result => result.map( Items => {
    const html = `
    <li>
       <p>Name : ${Items.name}</p>
      <p>Email : ${Items.email}</p>
    </li>
    `;
    Responses.innerHTML += html;
    }))
    .catch(err => Error.innerText = ` ${err}`);


    // Underthe hood of the Promise.race -> it is an js methods takes an array of promise and returns which promise resolves first 
    // in this i have two promise : one promise fetch data 
    //                                second promise reject it after 5seconds
    // The first promise and second promise will be in a race if the first promise takes a more than 5s as well as now the second promise will also be doing it task i have set timeout 6s for second promise 
    // if the first promise takes 7s to display the data the second promise timeout period is 6s the second promise will win the race.
    // finally second promise will display the data

});
