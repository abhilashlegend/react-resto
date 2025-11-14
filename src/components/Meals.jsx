import { useState, useEffect } from "react"
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import ErrorMessage from "./ErrorMessage";

const requestConfig = { method: 'GET'}

export default function Meals() {

   // const [meals, setMeals] = useState([]);

    /* useEffect(() => {
       fetch('http://localhost:3000/meals').then(response => {
        const data = response.json();
        return data;
       }).then(data => {
        setMeals(data);
       }).catch(error => {
        console.log(error);
       })
    }, []) */
    const {data: meals, error, isLoading} = useHttp('http://localhost:3000/meals', requestConfig, [])

    if(isLoading){
        return <p>Fetching meals...</p>
    }

    if(error){
        return <ErrorMessage title="Failed to fetch meals" message={error} />
    }
    return (
        <ul id="meals">
            { meals.map(meal => {
                return (<MealItem key={meal.id} meal={meal} />)
            })}
        </ul>
    )
}