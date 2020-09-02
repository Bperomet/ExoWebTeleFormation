import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [enteredFilterState, setEnteredFilterState] = useState('');
  const inputRef = useRef();

  useEffect(()=>{

    const timer = setTimeout(()=>{
      if(enteredFilterState === inputRef.current.value){
        const query = enteredFilterState.length === 0? '': `?orderBy="title"&equalTo="${enteredFilterState}"`;
        fetch('https://hook-a3306.firebaseio.com/ingredients.json'+query)
        .then(response=>{
          return response.json();
        }).then(respData=>{
          const loadIngredients = [];
          for (const key in respData) {
            loadIngredients.push({id: key, title: respData[key].title, amount: respData[key].amount});
          }
          onLoadIngredients(loadIngredients);
        });
      }
    },500);
    return () => {clearTimeout(timer)};
  },[enteredFilterState, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
          type="text" 
          value={enteredFilterState} 
          onChange={event => setEnteredFilterState(event.target.value)} 
          ref={inputRef}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
