let postContainer = document.getElementById('post-container');
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

async function fetchPost(userId){
     
  try{
      let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      let posts = await response.json();
      await posts.map(async post =>{
        try{
        if(post.userId == userId){
            let article = document.createElement('article');
            let h2 = document.createElement('h2');
            let p =  document.createElement('p');
            let ul = document.createElement('ul');
            
            h2.textContent = post.title;
            p.textContent = post.body;
            
            article.append(h2);
            article.append(p);
            
            let comments =  await fetchComment(post.id);
                comments.map(comment => {
                let li = document.createElement('li');
                li.textContent = comment.body;
                ul.appendChild(li);  
            });
                article.append(ul);
                postContainer.append(article);
        }
    }catch(err){
            console.log(err)
            }  
    });
}catch(err){
    console.log(err)
    }
}

async function fetchComment(postId){
    try{
   let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
   let data = await res.json()
   return data;
  
    }catch(err){
        console.log(err)
    }
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

