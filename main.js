let postContainer = document.getElementById('post-container');

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

  let user = JSON.parse(window.sessionStorage.getItem('user'));
  fetchPost(user.userId);



