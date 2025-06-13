import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import logo from './assets/logo.png';
import load from './assets/load.jpg';
import './App.css';

function App() {
  let [data, setData] = useState([]);
  let [sizeText, setSizeText] = useState(true);
  let [more, setMore] = useState(false);
  let [category, setCategory] = useState("HEALTH");
  let [pageSize, setPageSize] = useState(21);
  let [loading, setLoading] = useState(true);
  let [upVisible, setUpVisible] = useState(false);
  let [downVisible, setDownVisible] = useState(true);

  let urlToImage = "https://www.koin.com/wp-content/uploads/sites/10/2024/10/1920x1080-to-resize-pics-34.jpg?w=1280";

  function search() {
    // console.log(import.meta.env.VITE_RAPIDAPI_KEY);
    const url = `https://real-time-news-data.p.rapidapi.com/topic-news-by-section?topic=${category}&limit=${pageSize}&country=US&lang=en`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
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
    search()
  }, [pageSize]);

  return (
    <>
      <nav>
        <div style={{ display: 'inline' }} onClick={() => window.location.href = "/general"}> <img style={{ cursor: 'pointer' }} id='logo' src={logo} alt="err" /></div>
        <ul>
          <a href='#' onClick={() => { setCategory("SPORTS"), setPageSize(21) }}>SPORTS</a>
          <a href='#' onClick={() => { setCategory("HEALTH"), setPageSize(21) }}>HEALTH</a>
          <a href='#' onClick={() => { setCategory("SCIENCE"), setPageSize(21) }}>SCIENCE</a>
          <a href="#" onClick={() => { setCategory("TECHNOLOGY"), setPageSize(21) }}>TECHNOLOGY</a>
        </ul>
        <input
          type="text"
          placeholder='e.g. Science'
          onChange={(e) => setCategory(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              search();
            }
          }}
          style={{
            width: '400px',
            height: '50px',
            padding: '0 12px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <div id='navBut' onClick={search}>Search</div>
      </nav>

      {
        loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}> <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div></div>
      }
      {/* check-check */}

      <br /><br />
      <div className="main">
        {data.map((e, index) => (
          <div key={index}>
            <div className="img-wrapper" onClick={() => check(e.link)}><img style={{ cursor: 'pointer' }} src={!e.photo_url ? urlToImage : e.photo_url} alt='err' /></div>
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
      {!loading &&
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='preNext' onClick={pageNextPre} >
            <svg style={{ display: downVisible ? 'block' : 'none' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
            </svg>
            <svg onClick={goToTop} style={{ display: upVisible ? 'block' : 'none' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
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



