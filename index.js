let arr=["A Full Stack Developer"," A Designer","A Creater"];
let typewriter=document.querySelector('#typewriter');
let idx=1;
let sleep=(ms)=>new Promise((res)=>setTimeout(res,ms));
let currWordIndex=0;
let sleeptime=100
async function showType(){
   while(true){
     let word=arr[currWordIndex];
     for(let i=0;i<word.length;i++){
        typewriter.innerText=word.slice(0,i+1);
        await sleep(sleeptime);
     }
     await(sleep(sleeptime*10));
     for(let i=word.length;i>0;i--){
        typewriter.innerText=word.slice(0,i-1);
        await sleep(sleeptime);
     }
     await sleep(sleeptime*10);
     currWordIndex = (currWordIndex + 1) % arr.length;
   }
}
showType()


function clickHandler(elem){
    let selectedMenu=document.getElementById("check");
    selectedMenu.checked=false;
    changeBox(selectedMenu)
    let par=document.querySelectorAll("nav main div a");
    console.log(par)
    for(let i=0;i<par.length;i++){
        let currElem=par[i];
        console.log(currElem)
        if(currElem.classList.contains("active")){
            currElem.classList.remove("active");
        }
    }
    elem.classList.add("active");
     let targetSection=elem.getAttribute("active");
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    
}

function showBackground(){
        document.querySelector("#home_section").style.backgroundImage="url('./Images/home_image.jpg')";
        document.querySelector("#home_section").style.backgroundRepeat="no-repeat";
        document.querySelector("#home_section").style.backgroundPosition="center";
        document.querySelector("#home_section").style.backgroundSize="cover";
        document.getElementById("intro").style.top="70%";
        

}
showBackground();
function changeBox(elem){
    if(elem.checked){
        document.querySelector("#home_section").style.background=null;
        document.getElementById("intro").style.top="80%";
        
    }
    else{
       showBackground();
    }
}



function createProjectCard(projectData) {
    const card = document.createElement('div');
    card.classList.add('project');
  
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('p_img');
  
    const image = document.createElement('img');
    image.setAttribute('src', projectData.imageSrc);
    image.setAttribute('alt', projectData.title);
  
    imageDiv.appendChild(image);
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = `
      <div class="n_o_proj"><h3>${projectData.title}</h3></div> 
      <div class="desc">${projectData.description}</div>
      <div class="tech">Tech stack used: ${projectData.techStack}</div>
    `;
  
    const linkDiv = document.createElement('div');
    linkDiv.classList.add('ext_site');
  
    const gitButton = createLinkButton('GitHub Repo', projectData.gitRepo);
    const liveButton = createLinkButton('Live Site', projectData.liveSite);
  
    linkDiv.appendChild(gitButton);
    linkDiv.appendChild(liveButton);
  
    card.appendChild(imageDiv);
    card.appendChild(infoDiv);
    card.appendChild(linkDiv);
  
    return card;
  }
  
  
  function createLinkButton(text, href) {
    const button = document.createElement('button');
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.textContent = text;
    link.target = '_blank';
    button.appendChild(link);
    return button;
  }
  
 
function showData(projects){
    projects.map((elem)=>{
        let projectCard=createProjectCard(elem);
        document.querySelector("#project_container").appendChild(projectCard)
    })
}

fetchData();
function fetchData(){
fetch('./Utility/data.json')
.then((response) => response.json()) 
.then((data) => {
  console.log(data.projects);
  showData(data.projects)

})
.catch((error) => {
  console.error('Error loading JSON file:', error);
});
}


const navLinks = document.querySelectorAll('nav main div a');

const sections = document.querySelectorAll('section');
let offset=400;

function updateNavLinks() {
  const scrollPosition = window.scrollY;

  sections.forEach((section, index) => {
   
    const sectionTop = section.offsetTop-offset;
    const sectionBottom = sectionTop + section.offsetHeight+offset;

    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      
      navLinks.forEach((link) => {
        link.classList.remove('active');
      });
      
      navLinks[index].classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNavLinks);
