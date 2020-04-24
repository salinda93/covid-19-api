import React from "react";
import Axios from "axios";
import "./style.css";

export default class App extends React.Component{
    state = {
        confirmed :0,
        recovered :0,
        deaths :0,
        countries: []
    };


    componentDidMount(){
        this.getData();

    }

    async getData(){
        const resApi = await Axios.get("https://covid19.mathdro.id/api/");
        const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
        const countries = Object.keys(resCountries.data.countries);
        this.setState({
            confirmed:resApi.data.confirmed.value,
            recovered:resApi.data.recovered.value,
            deaths:resApi.data.deaths.value,
            countries
        });
    }

    async getCountryData(e){
        const res = await Axios.get('https://covid19.mathdro.id/api/countries/NL');
    }

    renderCountryOptions(){
        return this.state.countries.map((country, i) =>{
        return <option key = {i}>{country}</option>
        });

    }

    render(){
        return (
        <div className="container">
            <h1>Covid-19 Update</h1>

            <select onChange={this.getCountryData}>
                {this.renderCountryOptions()}
            </select>




            <div className="flex">

            <div className="box confirmed">
                <h3>Confirmed Cases</h3>
                <h4>{this.state.confirmed}</h4>
            </div>
            <div className="box recovered">
                <h3>Recovered Cases</h3>
                <h4>{this.state.recovered}</h4>
            </div>
            <div className="box deaths">
                <h3>Deaths</h3>
                <h4>{this.state.deaths}</h4>
            </div>
            </div>
            
        </div>);
    }
}