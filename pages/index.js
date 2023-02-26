import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import snow from "../lottie/snow.json";
import cloud from "../lottie/cloud.json";
import mist from "../lottie/mist.json";
import rain from "../lottie/rain.json";
import drizzle from "../lottie/drizzle.json";
import thunder from "../lottie/thunder.json";
import clear from "../lottie/clear.json";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_KEY;
  const location = "vancouver";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`;

  const [data, setData] = useState();
  const [weatherIcon, setWeatherIcon] = useState("/icons/snow.json");
  const grabWeather = useRef(false);


  const clearAnim = {
    loop: true,
    autoplay: true,
    animationData: clear,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const cloudAnim = {
    loop: true,
    autoplay: true,
    animationData: cloud,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const mistAnim = {
    loop: true,
    autoplay: true,
    animationData: mist,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const rainAnim = {
    loop: true,
    autoplay: true,
    animationData: drizzle,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  const showerAnim = {
    loop: true,
    autoplay: true,
    animationData: rain,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const snowAnim = {
    loop: true,
    autoplay: true,
    animationData: snow,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const thunderAnim = {
    loop: true,
    autoplay: true,
    animationData: thunder,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };



  const fetchWeather = async () => {
    const response = await axios.get(url);
    console.log(response);

    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8, 2), 10));
      let num = parseInt(weather.dt_txt.substr(8, 2), 10);

      if (num !== arrayOfDays.find((element) => element === num)) {
        arrayOfDays.push(num);
        console.log("here");
        console.log(response.data.list[index]);
        var month = "";
        var icon = "";

        if (response.data.list[index].dt_txt.substr(5, 2) == 1) {
          month = "January";
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 2) {
          month = "February";
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 3) {
          month = "March";
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 4) {
          month = "April";
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 5) {
          month = "May";
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 6) {
          month = "June";
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 7) {
          month = "July";
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 8) {
          month = "August";
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 9) {
          month = "September";
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 10) {
          month = "October";
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 11) {
          month = "November";
        } else if (response.data.list[index].dt_txt.substr(5, 2) == 12) {
          month = "December";
        }

        if (weather.weather[0].main == "Clouds") {
          icon = cloudAnim;
        } else if (weather.weather[0].main == "Clear") {
          icon = clearAnim
        } else if (weather.weather[0].main == "Atmosphere") {
          icon = mistAnim;
        } else if (weather.weather[0].main == "Rain") {
          icon = rainAnim;
        } else if (weather.weather[0].main == "Drizzle") {
          icon = showerAnim
        } else if (weather.weather[0].main == "Thunderstorm") {
          icon = thunderAnim;
        } else if (weather.weather[0].main == "Snow") {
          icon = snowAnim;
        }

     

        var now = new Date(weather.dt_txt);
        var days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        var day = days[now.getDay()];

        return (
          <div className="flex justify-center items-center flex-col bg-fountain-blue-800 m-3 p-2 rounded-lg" key={index}>
            <Lottie options={icon} height={100} width={100} />
            {/* <Image
            src={snowAnim}
            alt="Weather Icon"
            width={180}
            height={180}
            priority
            /> */}
            <p className="bold text-xl">
              {day} <br/> {month}  {weather.dt_txt.substr(8, 2)}, {weather.dt_txt.substr(0, 4)}
            </p>
            <div>{weather.main.temp.toFixed(1)} °C</div>
            <div>{weather.weather[0].main}</div>
          </div>
        );
      }
    });
    console.log(arrayOfDays);
    setData(weatherData);
  };

  useEffect(() => {
    if (grabWeather.current === true) {
      fetchWeather();
    }
    return () => {
      grabWeather.current = true;
    };
  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <>
      <Head>
        <title>Weekly Weather</title>
        <meta name="description" content="Weekly weather of Vancouver using OpenWeather" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
           vancouver, BC Weather <br/>
           Last Updated: {date}
            
          </p>
          <div className="port p-2">
            <a
              className="flex align-middle text-center"
              href="https://portfolio.seanlam.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              Sean Lam
            </a>
          </div>
        </div>

        <div >
          <Image
           
            src="/weather-forecast-logo.png"
            alt="Next.js Logo"
            width={300}
            height={100}
            priority
          />
          
        </div>

        <div className={styles.grid}>
          {data}
        </div>
      </main>
    </>
  );
}
