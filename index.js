document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("github-form");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      let user = document.getElementById("search").value;
      let details = document.getElementById("github-container");
      let userList = document.getElementById("user-list");
      let reposList = document.getElementById("repos-list");
  
      userList.innerHTML = "";
      reposList.innerHTML = "";
  
      fetch(`https://api.github.com/search/users?q=${user}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  
          if (data.items.length > 0) {
            let avatar = document.createElement("img");
            avatar.src = data.items[0].avatar_url;
            userList.appendChild(avatar);
  
            let a = document.createElement("a");
            a.href = data.items[0].html_url;
            a.innerHTML = data.items[0].login;
            userList.appendChild(a);
  
            let aRepos = document.createElement("a");
            aRepos.href = `https://www.github.com/${user}?tab=repositories`;
            aRepos.innerHTML = "View Repositories";
            reposList.appendChild(aRepos);
  
            details.appendChild(userList);
            details.appendChild(reposList);
          } else {
            details.innerHTML = "No user found!";
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    });
  });
  