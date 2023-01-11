const blogsOutput = document.querySelector(".blog"); 

// inputs 
const newBlogOverlay = document.querySelector(".create-new-blog-overlay"); 
const blogTitleInput = document.querySelector(".new-blog-title"); 
const blogAuthorInput = document.querySelector(".new-blog-author");
const blogBodyInput = document.querySelector(".new-blog-body"); 

// buttons 
const createBlogButton = document.querySelector(".create-new-blog-button"); 
const overlayCloseButton = document.querySelector(".overlay-close-button"); 
const newBlogSubmitButton = document.querySelector(".new-blog-submit-button"); 

//helpers 
let newBlog = false; // This determines whether a blog is brand new or edited 
let blogToEdit; 

let blogData = [
  {
    id: 0,
    title: "Vestibulum Purus Augue",
    author: "Theo Von",
    body: `Vestibulum purus augue, efficitur ut venenatis vel, luctus sed urna. 
    Quisque lacinia libero in justo mollis viverra. Maecenas sit amet congue nulla, 
    non mattis augue. Aliquam erat volutpat. Fusce eget consectetur diam. Praesent 
    et rutrum enim. Integer vel justo eu massa euismod egestas. Sed gravida pulvinar 
    ex eu ornare.`
  },
  {
    id: 1,
    title: "Justo Lorem Aliquam Dui",
    author: "Jacko Willink",
    body: `Class aptent taciti sociosqu ad litora torquent per conubia nostra, per 
    inceptos himenaeos. Phasellus tempus, leo sed viverra pulvinar, tellus dui 
    malesuada enim, at cursus nunc arcu nec est. Quisque porta faucibus sem eu dictum. 
    Ut elementum, massa eu tincidunt rutrum, justo lorem aliquam dui, at iaculis ipsum 
    erat quis dolor. In eget pulvinar tellus, ac ornare mi. Sed at dapibus urna, vel 
    vulputate nisi. Sed odio magna, auctor facilisis turpis sed, porttitor molestie risus. 
    Quisque viverra vulputate lorem, in fermentum odio molestie quis. Integer dignissim 
    enim a orci eleifend, eget facilisis purus vestibulum. Nam sed egestas purus, at 
    congue erat. Integer malesuada leo risus, id venenatis purus lobortis ut. Phasellus 
    sagittis, dolor quis luctus dignissim, augue libero molestie dui, in dignissim mauris 
    arcu ac justo. Fusce blandit sem sit amet imperdiet euismod. Cras congue lorem ex, 
    quis vulputate est lacinia vel. Integer dictum posuere sodales.`
  },
  {
    id: 2,
    title: "Nullam et Hendrerit Orci",
    author: "Homer Simpson",
    body: `Vestibulum arcu nisi, malesuada vitae ornare non, varius nec neque. Aliquam 
    erat volutpat. Integer in massa pharetra ex convallis molestie at vel diam. Nullam 
    ac libero interdum, venenatis nisl eu, vulputate mi. Vestibulum sit amet luctus nisl. 
    Aliquam metus justo, aliquet id suscipit a, tempor vitae erat. Morbi posuere ac velit 
    non aliquet. Pellentesque orci tortor, fringilla sed ultricies ut, tempor ut nunc. 
    Nullam et hendrerit orci. Nullam lacinia diam lectus, facilisis molestie tellus ultrices 
    in. Cras ultricies est eget eros pellentesque accumsan.`
  }
]

/*

===========
  Display  
===========

*/

function createBlog(object){

  const blogEl = document.createElement("div"); 
  blogEl.classList.add("blog-preview"); 
  blogEl.setAttribute("id", object.id); 
  
  const titleEl = document.createElement("h2"); 
  titleEl.innerText = object.title; 
  titleEl.classList.add("blog-title"); 

  const authorEl = document.createElement("p"); 
  authorEl.innerText = object.author; 
  authorEl.classList.add("blog-author"); 

  const readButtonEl = document.createElement("button"); 
  readButtonEl.innerText = "read";
  readButtonEl.classList.add("read-button"); 
  readButtonEl.onclick = function(e){
    readBlog(e.target.parentElement.id); 
  }

  const editButtonEl = document.createElement("button");
  editButtonEl.innerText = "edit"; 
  editButtonEl.classList.add("blog-edit-button"); 
  editButtonEl.onclick = e => {
    newBlog = false; 
    editBlogPost(e.target.parentElement.id)
  }

  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.innerText = "delete"; 
  deleteButtonEl.classList.add("blog-delete-button"); 
  deleteButtonEl.onclick = function(e){
    deleteBlogData(e.target.parentElement.id); 
  }

  blogEl.appendChild(titleEl);
  blogEl.appendChild(authorEl);  
  blogEl.appendChild(readButtonEl); 
  blogEl.appendChild(editButtonEl);
  blogEl.appendChild(deleteButtonEl);  
  blogsOutput.appendChild(blogEl); 
}

function clearBlogOutput(){
  blogsOutput.innerText = ""; 
}

function clearBlogForm(){
  blogTitleInput.value = ""; 
  blogAuthorInput.value = ""; 
  blogBodyInput.value = ""; 
}

function displayBlogs(){
  clearBlogOutput(); 
  toggleCreateButton(); 
  blogData.map(blog => createBlog(blog)); 
}

function toggleOverlay(){
  newBlogOverlay.classList.toggle("hidden"); 
}

function toggleCreateButton(){
  createBlogButton.classList.toggle("hidden"); 
}

function readBlog(id){
  toggleCreateButton(); 
  
  const readEl = document.createElement("p");
  readEl.innerText = blogData[id].body;
  blogsOutput.innerText = ""; 

  const backButtonEl = document.createElement("button");
  backButtonEl.setHTML("&#8592 back");
  backButtonEl.classList.add("back-button"); 
  backButtonEl.onclick = function(){
    displayBlogs(); 
  }

  blogsOutput.appendChild(readEl); 
  blogsOutput.appendChild(backButtonEl); 
}

/* 

=================
  Data Handling 
=================

*/ 

function resetBlogIds(){
  let helper = 0; 
  for(let i = 0; i < blogData.length; i++){
    blogData[i].id = helper; 
    helper++
  }
}

function deleteBlogData(id){
  blogData.splice(id, 1); 
  displayBlogs();
  resetBlogIds(); 
}

function editBlogPost(id){
  blogToEdit = id; 
  blogTitleInput.value = blogData[id].title; 
  blogAuthorInput.value = blogData[id].author;
  blogBodyInput.value = blogData[id].body; 

  toggleOverlay()
}

function editBlogData(id){
  const blogTitle = blogTitleInput.value;
  const blogAuthor = blogAuthorInput.value; 
  const blogBody = blogBodyInput.value; 

  const blogEl = {
    title: blogTitle, 
    author: blogAuthor,
    body: blogBody 
  };

  blogData[id] = blogEl; 
  resetBlogIds(); 
  clearBlogOutput();
  displayBlogs(); 
}

function createNewBlog(){
  const blogTitle = blogTitleInput.value;
  const blogAuthor = blogAuthorInput.value; 
  const blogBody = blogBodyInput.value; 

  const blogEl = {
    title: blogTitle, 
    author: blogAuthor,
    body: blogBody 
  };

  updateBlogData(blogEl); 
  resetBlogIds(); 
  clearBlogOutput(); 
  displayBlogs(); 
}

function updateBlogData(data){
  if(newBlog === true){
    blogData = [
      ...blogData, 
      data
    ]; 
  } 
}

/*

================
  Program Ops
================

*/

displayBlogs(); 

createBlogButton.addEventListener("click", () => {
  clearBlogForm(); 
  newBlog = true; 
  toggleOverlay()
});

overlayCloseButton.addEventListener("click", () => {
  toggleOverlay()
});

newBlogSubmitButton.addEventListener("click", () => {
  if(newBlog === true){
    createNewBlog(); 
  } else {
    editBlogData(blogToEdit); 
  }
  
}); 