import React, { useEffect, useState } from 'react';
import logo from './assets/logo.png';
import load from './assets/load.jpg';
import './App.css';

function App() {
let [data , setData] = useState([]);
let [sizeText , setSizeText] = useState(true);
let [more , setMore] = useState(false);
let [category , setCategory] = useState("general");
let [pageSize , setPageSize] = useState(21);
let [loading ,setLoading] = useState(false);
let down = document.getElementById('down');
let up = document.getElementById('up');
let loadIMG = document.getElementById('loadIMG');
let [box,setBox] = useState(false);
let searchInput = document.getElementById('searchInput');
let urlToImage = "https://www.koin.com/wp-content/uploads/sites/10/2024/10/1920x1080-to-resize-pics-34.jpg?w=1280";

// up.style.display = 'none';
function search(){
   setCategory(searchInput.value);
}
function goToTop(){
  window.scrollTo(0,0);
}
function check(url){
    console.log("hello");
    window.location.href = `${url}`;
  }
function pageNextPre(){
  setPageSize(pageSize = pageSize + 20);
  down.style.display = 'none';
  up.style.display = 'block';
}
async function getData(){
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=999bd139edd0449c9ad0f7649bc6ebf9&pageSize=${pageSize}&category=${category}`;
 let response =  await fetch(url);
 setLoading(true);
 let data = await response.json();
 setData(data.articles)
 setBox(true);
 }

useEffect(()=>{
getData();
},[category,pageSize]);

  return (
    <>
<nav>
    <div style={{display:'inline'}} onClick={()=>window.location.href="/general"}> <img style={{cursor:'pointer'}}  id='logo' src={logo} alt="err" /></div>
    <ul>
    <a href='#' onClick={()=>{setCategory("sports"),setPageSize(21)}}>Sports</a>
    <a href='#' onClick={()=>{setCategory("health"),setPageSize(21)}}>Health</a>
    <a href='#' onClick={()=>{setCategory("entertainment"),setPageSize(21)} }>Entertainment</a>
    <a href="#" onClick={()=>{setCategory("technology"),setPageSize(21)}}>Technology</a>
    </ul>
  <div style={{display:'flex'}}>
    <input id='searchInput' style={{padding:'8px',color:'black'}} type="text" placeholder='e.g.Science'/>
    <div id='navBut' onClick={search}>Search</div>
    </div>
</nav>
{
!loading && <img id='loadIMG' src={load} alt="err" />
}
<br /><br />
<div className="main">
  {data.map((e,index)=>(
      <div key={index}>
        <div onClick={()=>check(e.url)}><img style={{cursor:'pointer'}} src={!e.urlToImage?urlToImage : e.urlToImage} alt='err' /></div>
        <div style={{padding:'12px'}}>
   <h6>{e.title}</h6>
   <br />
   <p>BBC News {e.publishedAt}</p>
   <p style={{color:'dark'}}>{!e.content?" ":e.content.split(" ").slice(0,20).join(" ")} {!e.content ?" ":more?e.content.split(" ").slice(21).join(" "):" "}</p>
   <h6 id='moreLess' onClick={()=>{
    if(more == true){
      setMore(false);
    }else{
      setMore(true)
    }
   if(sizeText == true){
    setSizeText(false);

   }else{
    setSizeText(true);
   }
   }} >{sizeText ? "more":"less"}</h6>
   </div>
   </div>
  ))
  }
</div>
<br /><br />
{
  box &&
  <div style={{display:'flex',justifyContent:'center'}}>
<div className='preNext' onClick={pageNextPre} >
<svg  id='down' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
</svg>
<svg onClick={goToTop} id='up' style={{display:'none'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
</svg>
</div>
</div>
}
<br />
    </>
  )
}

export default App