
    

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
                let li = document.createElement('li');
                let username = element.login
                console.log(username);
                // add stuff to li, like span and img to display: username, avatar and a link to their profile. (Done)
                // Style the above so its not all inline. 
                // Then, Clicking on one of these users should send a request to the User Repos Endpoint. There is a repos link in the user object but I think they want me to use the repos endoint. 
                let h1 = document.createElement('h1');
                h1.textContent = username;
                li.id = username;
                let h2 = document.createElement('h2');
                let a = document.createElement('a');
                a.href = element.html_url;
                a.textContent = "User Profile";
                h2.append(a);
                let img = document.createElement('img');
                img.src = element.avatar_url;
                img.width = 185;
                img.height = 185;
                let div = document.createElement('div');
                let btn = document.createElement('button');
                btn.addEventListener('click', getUserRepos);
                btn.textContent = "Get Repos!";
                div.id = `${username}RepoList`;
                btn.id = username;
                div.append(btn);
                li.append(h1, img, h2, div);
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

    function getUserRepos(e){
        console.log(e.target.id);
        let username = e.target.id;
        let userRepoUrl = `https://api.github.com/users/${username}/repos`;
                fetch(userRepoUrl)
                    .then(res => res.json())
                        .then(object => {
                            console.log(object);
                            let userRepoDiv = document.getElementById(`${username}RepoList`);
                            for (const element of object) {
                                console.log(element);
                                let li = document.createElement('li');
                                let a = document.createElement('a');
                                a.href = element.html_url;
                                a.textContent = element.full_name;
                                li.append(a);
                                userRepoDiv.appendChild(li);
                            }

                            
                        });

    };

};
document.addEventListener("DOMContentLoaded", init);