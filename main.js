let postTitles = document.getElementById('post-titles');
let albumsTitle = document.getElementById('albums-title');
let userNameOutPut = document.getElementById('user-name-output');
function onSubmit(){
    let userName = document.getElementById('username').value;
    userNameOutPut.textContent = userName;
    fetchUser(userName);
  
}

function fetchUser(username){
    fetch("https://jsonplaceholder.typicode.com/users").then((Res)=> Res.json()).then(users => users.map(user =>{ 
    if(user.username == username){
        fetchPost(user.id)
        fetchAlbum(user.id)
    }
}
    )).catch(err => console.log(err));
} 

function fetchPost(userId){
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`).then((Res)=> Res.json()).then(posts => posts.map(post =>{ 
    if(post.userId == userId){
        let li = document.createElement('li');
        li.textContent = post.title;
        postTitles.appendChild(li);
        }
    }
    )).catch(err => console.log(err));
}

function fetchAlbum(userId){
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`).then((Res)=> Res.json()).then(albums => albums.map(album =>{ 
    if(album.userId == userId){
        let li = document.createElement('li');
        li.textContent = album.title;
        albumsTitle.appendChild(li);
        }
    }
    )).catch(err => console.log(err));
}
