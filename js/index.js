document.addEventListener("DOMContentLoaded", () => {
    const formNode = document.querySelector("#github-form")
    const reposListContainer = document.querySelector(`#repos-list`)
    const listOfUserNames = document.querySelector("#user-list")
    formNode.addEventListener("submit", (e) => {
        e.preventDefault()
        const userName = e.target[0].value

        fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(res => res.json())
        .then(data => {
            const dataOfUsers = data.items
            for(const individualUser of dataOfUsers) {
                createUsersInfoDisplay(individualUser)
            }
        })
    })
    function createUsersInfoDisplay(individualUser) {

        const userInfo = document.createElement("li")
        const imgOfUsers = document.createElement("img")
        const urlOfUser = document.createElement("p")
        
        urlOfUser.innerHTML = individualUser.html_url
        console.log(urlOfUser)
        

        listOfUserNames.appendChild(userInfo)
        imgOfUsers.setAttribute("src", individualUser.avatar_url)

        userInfo.innerHTML = individualUser.login
        userInfo.appendChild(imgOfUsers)
        userInfo.appendChild(urlOfUser)
        
        userInfo.addEventListener("click", () => {
        
            fetch(`https://api.github.com/users/${individualUser.login}/repos`)
            .then(res => res.json())
            .then(data => {
                const userRepos = data
                for(const individualRepo of userRepos){
                const userRepoListed = document.createElement("li")
                userRepoListed.innerHTML = individualRepo.name
                reposListContainer.appendChild(userRepoListed)
                }
                
                
            })
        })
    }
})
