import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function App() {
    const [countryName, setCountryName] = useState(null)
    const [foreCastList, setForeCastList] = useState(null)
    const [errorMsg, setErrorMsg] = useState(false)




    let days=["Sunday","Monday","Tuseday","Wednsday","Thursday","Friday","Saturday"]
    let date=new Date().getDay();

    let currentDay=days[date]
    
    
    function getWeather(term) {

  
       

        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${term}&appid=0e381538ceae00e83fcdbad202b62fee&units=metric`).then((resp)=>{

            let myArray = resp.data.list

            
                setErrorMsg(false)
    const seen = new Set();
  
    const filteredArr = myArray.filter(el => {
      const duplicate = seen.has(el.dt_txt.split(' ').slice(0,1).join());
      seen.add(el.dt_txt.split(' ').slice(0,1).join());
      return !duplicate;
    });
            
  
    
            
           

           

           
            
            setForeCastList(filteredArr)
            setCountryName(resp.data.city.name)

        }).catch((err)=>{console.log(err);
            setErrorMsg(true)
            if(term == '') {
                setErrorMsg(false)
                
            }
      
        })
    }

    useEffect(()=>{
        getWeather('cairo')
        
    },[])
return <>

<div className="container mt-5">
<div className="d-flex align-items-center searching">
<h1 className='display-1 fw-bold'>{countryName}</h1>

<input onKeyUp={function(e){ getWeather(e.target.value)


}} type="text" className='form-control spc-form ms-3 ' placeholder='enter city name' />

</div>
{
    errorMsg ? <div>
    <p className='alert alert-danger w-50'>please enter a valid country name</p>
</div> : ''
}

{
    foreCastList?.slice(0,1).map((day,ind)=>{
        
        return <div key={ind} className="row spc-row1 px-5  align-items-center py-3">





        <div className="col-md-4 col-sm-12 px-5">
            <div className="weather-icon text-center " >
                    <div id="icon">
          <img src={'http://openweathermap.org/img/w/'+day.weather[0].icon+'.png'} alt="weather icon" className='w-50' />
                    </div>
    
                
            </div>
        </div>
        <div className="col-md-4   ">
        <div className="time">
           <p> {currentDay}</p>
        <span className="currentDay">{day.dt_txt.split(" ").slice(0,1).join().split('-').reverse().join('-')
        }</span>
        <span className="currentDayInNum"></span>
        <div className="temp my-2" id="currentTemp">
            {day.main.temp}°C
        </div>
        <div className="feels-like my-2" id="feelsLike">
            <p>feels like : <span className='fw-bold'>{day.main.feels_like}°C</span></p>
        </div>
        <div id="condition">
            <p>{day.weather[0].description}</p>
        </div>
        
        </div>
        </div>
        
        <div className="col-md-4  px-5 remove-div">
        <div className="more-detail">
        <h5>More detail</h5>
        <p id="wind-speed">wind speed: <span className='fw-bold'>{day.wind.speed}kph</span></p>
        <p id="humi">air humidity:{day.main.humidity}%</p>
        <p id="press">pressure:{day.main.pressure}mm</p>
        </div>
        </div>
        
        </div>
    })
}



</div>
<div className="mt-5 ">
    <div className="container ">
        <div className=" d-flex justify-content-between spc-row  spc-w text-center">
        {
            foreCastList?.slice(1,).map((day,ind)=>      <div key={ind} className="  mx-4 daysFore">
            <div className="1stDay">
                
                <div className="date my-2">
                <span className="currentDay">{day.dt_txt.split(" ").slice(0,1).join().split('-').reverse().slice(0,2).join('-')
                
        }</span>
                </div>
                <div className="min my-2">
                   min <span>{day.main.temp_min}°C</span>
                </div>
                <div className="max">
                  max <span> {day.main.temp_max}°C</span>
                </div>
                <div id="icon">
          <img src={'http://openweathermap.org/img/w/'+day.weather[0].icon+'.png'} alt="" />
                    </div>
                <div className="desc">
                <p>{day.weather[0].description}</p>
                </div>
            </div>
        </div>)
        }

        </div>
    </div>
</div>
</>
}
