import { useState, useEffect } from "react"
import MealItem from "./MealItem";

export default function Meals() {

    const [meals, setMeals] = useState([]);

    useEffect(() => {
       fetch('http://localhost:3000/meals').then(response => {
        const data = response.json();
        return data;
       }).then(data => {
        setMeals(data);
       }).catch(error => {
        console.log(error);
       })
    }, [])

    return (
        <ul id="meals">
            { meals.map(meal => {
                return (<MealItem key={meal.id} meal={meal} />)
            })}
        </ul>
    )
}