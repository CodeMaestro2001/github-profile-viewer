const username=document.getElementById("username");
const searchBtn=document.getElementById("searchBtn");
const userInfo=document.getElementById("userInfo");
const userRepos=document.getElementById("userRepos");

searchBtn.addEventListener('click',function(){
    const name=username.value;
    if(name){
        fetchGitHubUser(name);
    }else{
        alert("Please enter the valid username:")
    }
})

function fetchGitHubUser(name){
    fetch(`https://api.github.com/users/${name}`)
    .then(response =>{
        if(!response.ok){
            throw new Error ("user not found");
        }else{
            return response.json();
        }
   
    })

    .then(data =>{
        displayUserInfo(data);
        fetchGitHubRepos(name);
    })

    .catch(error =>{
        console.error('Error:',error);
        userInfo.innerHTML='<p>User not found try again</p>'
        userRepos.innerHTML='';
    })




}


function displayUserInfo(user){
    userInfo.innerHTML=`
        <img src="${user.avatar_url}" alt="${user.login}" width="100">
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Bio:</strong> ${user.bio}</p>
        <p><strong>Public Repos:</strong> ${user.public_repos}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
    `;

    
}

function fetchGitHubRepos(name){
    fetch(`https://api.github.com/users/${name}/repos`)
    .then(response => response.json())
    .then(data =>{
        dispalyRepos(data)
    })
    .catch(error =>{
        console.error('Error:',error);
        userRepos.innerHTML='<p>Could not fetch repositories</p>';
    })
}

function dispalyRepos(repos){

    if(repos.length==0){
        userRepos.innerHTML='<p>No repositeries found!!</p>'
    }

    const repoList = repos.map(repo => `
        <div>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <p>${repo.description}</p>
            <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
            <p><strong>Forks:</strong> ${repo.forks_count}</p>
        </div>
    `).join('');

    userRepos.innerHTML=repoList

}