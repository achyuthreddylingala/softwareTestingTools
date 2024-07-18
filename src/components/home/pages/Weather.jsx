import React, { useState, useEffect } from "react";
import jQuery from "jquery";
import Button from "./../components/button";
import Footer from "../components/footer";
// import rainIcon from "./../assets/rain (1).png";
// import windIcon from "./../assets/windy.png";
// import humidity from "./../assets/humidity.png";
// import FutureWeatherComponent from "../components/futureWeatherComponent";
import navigate from "../inc/scripts/utilities";
// import ForecastWeatherItems from "../components/forecastWeatherItems";
import Spinner from "../components/spinner";
// import Ripple1 from "./../assets/ripple1.gif";
// import Location from "./../assets/map.png";
import * as formHandler from "../apis/get_Weather";
import { db } from "../backend/app_backend";
// import getGeolocation from "../apis/getGeolocation";
import { getCurrentDate } from "../inc/scripts/utilities";
// import Thunder from "./../assets/static/thunder.svg";
import Day from "../../../assets/static/day.svg";
// import Drizzle from "./../assets/static/rainy-5.svg";
// import Rainy from "./../assets/static/rainy-7.svg";
// import Snowy from "./../assets/static/snowy-6.svg";
// import FreezingRain from "./../assets/static/freezing-rain.svg";
// import Misty from "./../assets/static/mist.svg";
// import BrokenClouds from "./../assets/static/broken-clouds.svg";
// import OvercastClouds from "./../assets/static/overcast-clouds.svg";
// import ScatteredClouds from "./../assets/static/scattered-clouds.svg";
// import FewClouds from "./../assets/static/few-clouds.svg";
// import Haze from "./../assets/static/haze.svg";
import HumidityIcon from "../../../assets/humidity-icon.svg";
import WindIcon from "../../../assets/wind-icon.svg";
import PressureIcon from "../../../assets/pressure-icon.svg";
import backgroung_hills from '../../../assets/static/mountains_bg.jpg'
import PropTypes from 'prop-types';

const WeatherApp = () => {
	//check if the user navigated from the home page
	if (!db.get("HOME_PAGE_SEEN")) {
		navigate("/");
	}
	//holds the current component to insert into the utility footer component
	const [componentToInsert, setComponentToInsert] = useState("");
	const [weatherInput, setWeatherInput] = useState();
	let savedLocation;

	savedLocation = db.get("USER_DEFAULT_LOCATION");

	const addUtilityComponentHeight = () => {
		jQuery(($) => {
			$.noConflict();
			$(".cmp").removeClass("d-none");
			$(".utility-component").toggleClass("add-utility-component-height");
		});
	};

	const showMoreWeather = () => {
		navigate("weathermain");
	};

	const SearchComponent = () => {
		const [searchValue, setSearchValue] = useState("");
		return (
			<section className="cmp d-flex align-items-center justify-content-center flex-column my-5">
				<form
					id="searchWeatherForm"
					onSubmit={(e) => {
						formHandler.handleWeatherForm(e);
						setWeatherInput();
					}} onChange={(e)=>{
						setSearchValue(e.target.value)
					}}>
					<label htmlFor="searchWeather" className="py-2 text-capitalize ">
						search city
					</label>
					<input
						type="text"
						name="searchWeather"
						id="searchWeather"
						placeholder="Enter the name of city"
						value={weatherInput}
						className="form-control search-input p-3 brand-small-text w-100"
						onChange={(e) => {
							setWeatherInput(e.target.value);
						}}
						autoComplete="off"
						autoFocus={true}
					/>
					<p
						className="error-holder text-danger py-3 fs-6 brand-small-text text-center d-none"
						id="searchErrorLog">
						city not found
					</p>

					<section className="d-none "></section>
					<SearchMenuComponent search={searchValue}/>
					<Button
						text="track saved location!"
						className="shadow brand-btn-3-secondary toggle-width-3 my-5 text-dark text-capitalize p-2"
						id="searchSavedLocationWeather"
						onClick={(e) => {
							formHandler.handleWeatherForm(e, savedLocation);
							setWeatherInput();
						}}
					/>
				</form>
			</section>
		);
	};

	const SearchMenuComponent = ({search}) => {
		const [dataArray, changeDataArray] = useState([]);
		useEffect(()=>{
			if(search.length > 3){
				formHandler.findCity(search,changeDataArray)
			}
		},[search])

		function clickHandler(e){
			jQuery("#searchWeather").val(e.target.textContent)
			formHandler.handleWeatherForm(e, savedLocation);
			setWeatherInput()
		}

		return (
			<section className="cmp d-flex align-items-center justify-content-start bg-white px-2 mt-2 rounded">
				<ul className="m-0 p-0">
					{dataArray.map((data,ind)=> <li key={ind} onClick={clickHandler} style={{cursor:"pointer"}}><p className="text-dark text-left m-0" style={{fontSize:"14px"}}>{data.name}</p></li>)}
				</ul>
			</section>		
		)
	}

	//load the search component into the utility component
	const testSearch = () => {
		addUtilityComponentHeight();
		setComponentToInsert(<SearchComponent />);

	};

	return (
		<React.Fragment>
			{/* <Spinner /> */}
			<div
				className="container-fluid d-flex flex-column py-2 px-0 width-toggle-5 m-auto"
				style={{ overflowX: "hidden", background:{backgroung_hills} }}
				id="weatherContainer">
				<section className="app-header d-flex justify-content-center px-2 flex-row-reverse padding-top-100px padding-left-100px padding-right-100px">
					<section className="city-location">
						<h5 className="fw-bold fs-20 font-80px" id="weatherLocation">
							{db.get("WEATHER_LOCATION") || "Location"}
						</h5>
						<p className="date-time text-muted brand-small-text text-capitalize font-20px text-center">
							{getCurrentDate()}
						</p>
					</section>

			
				</section>





				<section className="current-weather-container d-flex justify-content-between px-2 my-3  padding-left-200px padding-right-200px">
					<section className="current-weather-value-container">
						<section className="d-flex ">
							<h1
								className="current-weather-value fw-bold brand-large-text"
								id="currentDeg">
								{Math.ceil(db.get("WEATHER_DEG")) || 30}
							</h1>

							<sup className="fw-bold brand-medium-text current-weather-unit">
								o
							</sup>
						</section>
						<p className="text-muted text-capitalize" id="weatherDes">
							{db.get("WEATHER_DESCRIPTION") || "clear sky"}
						</p>
					</section>
					<section
						className="current-weather-icon my-4 mx-3 px-3"
						id="main-weather-icon-container">
						<img
							src={formHandler.checkWeatherCode(db.get("WEATHER_CODE")) || Day}
							width={64}
							height={64}
							alt="main weather icon"
							id="main-weather-icon"
						/>
					</section>
				</section>








				
				<section
					
					role="button"
					className="mx-2 rounded-3 shadow my-5 py-2 current-weather-assets brand-tertiary-color d-flex align-items-center justify-content-around text-center  margin-top-200px"
					onClick={showMoreWeather}>
					<section className="current-weather-wind-speed d-flex flex-column align-items-center justify-content-center">
						<section className="wind-icon py-1">
							<img src={WindIcon} height={"30"} width={"30"} alt="wind-icon" />
						</section>
						<p
							className="wind-value fw-bold text-light  brand-small-text text-center py-1 m-0"
							id="wind-value">
							{db.get("SUB_WEATHER_WIND_VALUE") || "2.90 m/s"}
						</p>
						<p className="m-0 wind-text text-muted text-capitalize brand-small-text-2 weather-text text-center">
							Wind
						</p>
					</section>

					<section className=" current-weather-humidity-degree d-flex flex-column align-items-center ">
						<section className="humidity-icon py-1">
							<img
								src={HumidityIcon}
								height={"30"}
								width={"30"}
								alt="humidity-icon"
							/>
						</section>
						<p
							className="humidity-value fw-bold text-light  brand-small-text  text-center py-1 m-0"
							id="humidity-value">
							{db.get("SUB_WEATHER_HUMIDITY_VALUE") || "98%"}
						</p>
						<p className="m-0 humidity-text text-muted text-capitalize text-center brand-small-text-2 weather-text">
							humidity
						</p>
					</section>

					<section className="current-weather-rain-degree d-flex flex-column align-items-center">
						<section className="rain-icon py-1">
							<img
								src={PressureIcon}
								height={"30"}
								width={"30"}
								alt="rain-icon"
							/>
						</section>
						<p
							className="rain-value fw-bold text-light brand-small-text  text-center py-1 m-0"
							id="pressure-value">
							{db.get("SUB_WEATHER_PRESSURE_VALUE") || "1000 hPa"}
						</p>
						<p className="m-0 rain-text text-muted text-capitalize text-center brand-small-text-2 weather-text">
							Pressure
						</p>
					</section>
				</section>
				

				<br />
				<br />
				<br />
				{/* @utilityTags - dynamic components to be inserted into the footer component @onClick event - responsible for the search component trigger on the app || weather route*/}
				<Footer utilityTags={componentToInsert} onClick={testSearch} />
			</div>
		</React.Fragment>
	);
};

WeatherApp.propTypes = {
	search: PropTypes.any,
	// 'search.length': PropTypes.any
  
  };

export default WeatherApp;
