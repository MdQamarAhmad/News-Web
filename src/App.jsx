import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './assets/logo.png';
import load from './assets/load.jpg';
import './App.css';

function App() {
  let [data, setData] = useState([]);
  let [sizeText, setSizeText] = useState(true);
  let [more, setMore] = useState(false);
  let [category, setCategory] = useState("general");
  let [pageSize, setPageSize] = useState(21);
  let [loading, setLoading] = useState(true);
  let [upVisible, setUpVisible] = useState(false);
  let [downVisible, setDownVisible] = useState(true);
  let searchInput = document.getElementById('searchInput');
  let urlToImage = "https://www.koin.com/wp-content/uploads/sites/10/2024/10/1920x1080-to-resize-pics-34.jpg?w=1280";

  function search() {
    setCategory(searchInput.value);
  }
  function goToTop() {
    window.scrollTo(0, 0);
  }
  function check(url) {
    window.location.href = `${url}`;
  }
  function pageNextPre() {
    setPageSize(pageSize => pageSize + 20);
    setDownVisible(false);
    setUpVisible(true);
  }


  useEffect(() => {
    const url = 'https://real-time-news-data.p.rapidapi.com/topic-news-by-section?topic=TECHNOLOGY&section=CAQiSkNCQVNNUW9JTDIwdk1EZGpNWFlTQldWdUxVZENHZ0pKVENJT0NBUWFDZ29JTDIwdk1ETnliSFFxQ2hJSUwyMHZNRE55YkhRb0FBKi4IACoqCAoiJENCQVNGUW9JTDIwdk1EZGpNWFlTQldWdUxVZENHZ0pKVENnQVABUAE&limit=22&country=US&lang=en';
    
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '803a2dcd7amshc7091c1234aa418p1743fejsnfa731bc175b8',
        'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
      }
    };
    
    fetch(url, options)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(response => {
        setData(response.data)
        setLoading(false);
  })
      .catch(error => console.error('Error:', error))
  }, [category, pageSize]);

  return (
    <>
      <nav>
        <div style={{ display: 'inline' }} onClick={() => window.location.href = "/general"}> <img style={{ cursor: 'pointer' }} id='logo' src={logo} alt="err" /></div>
        <ul>
          <a href='#' onClick={() => { setCategory("sports"), setPageSize(21) }}>Sports</a>
          <a href='#' onClick={() => { setCategory("health"), setPageSize(21) }}>Health</a>
          <a href='#' onClick={() => { setCategory("entertainment"), setPageSize(21) }}>Entertainment</a>
          <a href="#" onClick={() => { setCategory("technology"), setPageSize(21) }}>Technology</a>
        </ul>
        <div style={{ display: 'flex' }}>
          <input id='searchInput' style={{ padding: '8px', color: 'black' }} type="text" placeholder='e.g.Science' />
          <div id='navBut' onClick={search}>Search</div>
        </div>
      </nav>
      {
        loading && <img src={load} alt="err" />
      }
      <br /><br />
      <div className="main">
        {data.map((e, index) => (
          <div key={index}>
            <div onClick={() => check(e.link)}><img style={{ cursor: 'pointer' }} src={!e.photo_url ? urlToImage : e.photo_url} alt='err' /></div>
            <div style={{ padding: '12px' }}>
              <h6>{e.title}</h6>
              <br />
              <p>{e.source_name || "News"} {e.published_datetime_utc}</p>
              <p style={{ color: 'dark' }}>{!e.snippet ? " " : e.snippet.split(" ").slice(0, 20).join(" ")} {!e.snippet ? " " : more ? e.snippet.split(" ").slice(21).join(" ") : " "}</p>
              <h6 id='moreLess' onClick={() => {
                if (more == true) {
                  setMore(false);
                } else {
                  setMore(true)
                }
                if (sizeText == true) {
                  setSizeText(false);

                } else {
                  setSizeText(true);
                }
              }} >{sizeText ? "more" : "less"}</h6>
            </div>
          </div>
        ))
        }
      </div>
      <br /><br />
      {

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='preNext' onClick={pageNextPre} >
            <svg style={{display: downVisible?'block':'none'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
            </svg>
            <svg onClick={goToTop}  style={{ display: upVisible?'block':'none' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
            </svg>
          </div>
        </div>
      }
      <br />
    </>
  )
}

export default App
