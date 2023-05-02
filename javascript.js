class Post{
    constructor(data,previousElement){
        const postFigure=document.createElement('figure');
        const image=document.createElement('img');
        const div_description=document.createElement('div');
        const div_author=document.createElement('div');
        const span_author=document.createElement('span');
        const span_description=document.createElement('span');

        postFigure.setAttribute('class','post');
        div_description.setAttribute('class','post-description');
        div_author.setAttribute('class','author-description');
        span_author.setAttribute('class','author');
        span_description.setAttribute('class','description');

        image.src=data.imgSrc;
        span_author.innerHTML=data.author;
        span_description.innerHTML=data.description;

        previousElement.appendChild(postFigure);
        postFigure.appendChild(image);
        postFigure.appendChild(div_description);
        div_description.appendChild(div_author);
        div_author.appendChild(span_author);
        div_author.appendChild(span_description);

        //comments section
        let div_comments=document.createElement('div');
        div_comments.setAttribute('class','comments');

        div_description.appendChild(div_comments);
        data.comments.forEach(comment=>this.add_comment(comment,div_comments));

        let div_comment_input=document.createElement('div');
        let form=document.createElement('form');
        let input=document.createElement('input');

        div_comment_input.setAttribute('class','comment input');
        form.setAttribute('action','/');
        form.setAttribute('method','post');
        form.setAttribute('onsubmit','return false;');
        input.setAttribute('type','text');
        input.setAttribute('placeholder','Aggiungi un commento....');

        div_comments.appendChild(div_comment_input);
        div_comment_input.appendChild(form);
        form.appendChild(input);

        form.addEventListener('submit',()=>{
            if(input.value!=""){
                this.add_comment({author:current_user,description:input.value},div_comments);
                input.value="";
            }
        })


        //this.data=this.data.bind(this);
        //this.previousElement=this.previousElement.bind(this);

    }

    add_comment(comment,div_comments){
        //comment
        let div_comment=document.createElement('div');
        let span_comment_author=document.createElement('span');
        let span_comment_description=document.createElement('span');

        div_comment.setAttribute('class','comment');
        span_comment_author.setAttribute('class','author');
        span_comment_description.setAttribute('class','description');

        span_comment_author.innerHTML=comment.author;
        span_comment_description.innerHTML=comment.description;

        div_comments.appendChild(div_comment);
        div_comment.appendChild(span_comment_author);
        div_comment.appendChild(span_comment_description);


    }
}

let current_user="Jarvis"
document.getElementById('post-container').innerHTML="";

fetch('https://api.jsonbin.io/v3/b/6450eaf9b89b1e22999564c9?meta=false').then(data=>data.json()).then(data =>{
    for(post_index in data.posts){
        new Post(data.posts[post_index],document.getElementById('post-container'));

    }
});

//  let post=new Post({author:'carlo',description:'descrizione',imgSrc:image},document.getElementById('post-container'));
