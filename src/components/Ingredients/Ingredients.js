import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

function Ingredients() {
    const [ingredients, setIngredients] = useState([]);



    const filteredIngredients = useCallback(filteredIngredients => {
        setIngredients(filteredIngredients)
    },[]);

    const addIngredientHandler = ingredient => {
        //prevIngredients to ensure the most recent state
        fetch('https://react-hooks-update-3343c.firebaseio.com/ingredients.json',{
            method:'POST',
            body: JSON.stringify(ingredient),
            headers: {'Content-Type': 'application/json'}
        }).then(response=>{
            return response.json();

        }).then(responseData=>{
            setIngredients(prevIngredients => [...prevIngredients,{id:responseData.name,...ingredient}]);
        });

    }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredients}/>
        <IngredientList ingredients={ingredients} onRemoveItem={()=>{}}/>
      </section>
    </div>
  );
}

export default Ingredients;
