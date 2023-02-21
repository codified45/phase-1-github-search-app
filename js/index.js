
    

const init = () => {

let searchForm = document.querySelector('#github-form');
console.log(searchForm);
searchForm.addEventListener('submit', submitSearchTerm);



function submitSearchTerm(e){
    e.preventDefault();
    let searchTerm = document.querySelector('#search').value;

    let userList = document.querySelector('#user-list');
    userList.replaceChildren();
    let searchQueryUrl = `https://api.github.com/search/users?q=${searchTerm}`;
    fetch(searchQueryUrl) // add github custom header "Accept: application/vnd.github.v3+json"
     .then(res => res.json())
        .then(object => {
            for (const element of object.items) {
                console.log(element);
                let li = document.createElement('li');

                let username = element.login
                console.log(username);
                // add stuff to li, like span and img to display: username, avatar and a link to their profile. Then, Clicking on one of these users should send a request to the User Repos Endpoint. There is a repos link in the user object but I think they want me to use the repos endoint. 
                li.textContent = username;
                let a = document.createElement('a');
                a.href = element.html_url;
                a.textContent = "User Profile";
                let img = document.createElement('img');
                img.src = element.avatar_url;
                img.width = 185;
                img.height = 185;
                li.append(img, a);
                userList.appendChild(li);
            }
        });
    searchForm.reset();
    // let formData = {

    // };

    // let configSearchQuery = {
    //     method: 
    //     headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/vnd.github.v3+json",
    //     },
    //     body: {

    //     };
    };
};
document.addEventListener("DOMContentLoaded", init);