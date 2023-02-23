
    

const init = () => {

    let searchForm = document.querySelector('#github-form');
    let isSearchingUsers = true;
    let userList = document.querySelector('#user-list');
    let reposList = document.querySelector('#repos-list');

    const configGithubApiGet = {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json",
        },
    };

    searchForm.addEventListener('submit', submitSearchTerm);
    let searchSwitchBtn = document.querySelector('#searchSwitch');
    let searchTextBox = document.querySelector('#search');
    searchSwitchBtn.addEventListener('click', switchSearchBool);

    function switchSearchBool(e){
        isSearchingUsers = !isSearchingUsers;
        if (isSearchingUsers){searchTextBox.placeholder = "search users"}
        else {searchTextBox.placeholder = "search repos"};
    };
    
    // choose which function to call, submitUserSearchTerm or submitReposSearchTerm
    function submitSearchTerm(e){
        e.preventDefault();
        userList.replaceChildren();
        reposList.replaceChildren();
        if (searchTextBox.placeholder === "search users"){submitUserSearchTerm();}
        else {submitReposSearchTerm();};
    };

    function submitUserSearchTerm(){
        let searchTerm = document.querySelector('#search').value;
        let userSearchQueryUrl = `https://api.github.com/search/users?q=${searchTerm} in:name`; // add ' in:name' after the search term 
        fetch(userSearchQueryUrl, configGithubApiGet) // add github custom header "Accept: application/vnd.github.v3+json"
        .then(res => res.json())
            .then(object => {
                for (const element of object.items) {
                    let li = document.createElement('li');
                    let username = element.login;
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
    };

    function getUserRepos(e){
        console.log(e.target.id);
        let username = e.target.id;
        let userRepoUrl = `https://api.github.com/users/${username}/repos`;
                fetch(userRepoUrl, configGithubApiGet)
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

    function submitReposSearchTerm(){
        console.log('im in submitrepossearchterm');

        searchForm.reset();
    };

};
document.addEventListener("DOMContentLoaded", init);



            // let formData = {

            // };