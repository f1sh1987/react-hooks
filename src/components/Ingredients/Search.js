import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
    const {onLoadIngredients} = props;
    const [filter, setFilter] = useState('');
    //will be executed when filter changes
    useEffect(()=>{
        const query =
            filter.length === 0
                ? ''
                : `?orderBy="title"&equalTo="${filter}"`;
        fetch('https://react-hooks-update-3343c.firebaseio.com/ingredients.json'+query).then(response=>response.json())
        .then(responseData=>{
            const loadedIngredients = [];
            for ( const key in responseData){
                loadedIngredients.push({
                    id:key,
                    title: responseData[key].title,
                    amount: responseData[key].amount
                });

            }
           onLoadIngredients(loadedIngredients);
        });
    },[filter, onLoadIngredients]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={filter} onChange={event=>setFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
