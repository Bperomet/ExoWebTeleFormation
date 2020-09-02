import React, {useState, useEffect, useCallback, useReducer, useMemo} from 'react';
// useState quand c pas complexe et useReducer quand le projet est tres gros et recupe l'ancienne etat
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action)=> {
  switch (action.type) {
    case 'SET':   
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return  currentIngredients.filter(ingredient=>ingredient.id !== action.id);
    default:
      throw new Error('Should not get there');
      break;
  }
}
/*
const httpReducer = (curhttpState, action)=> {
  switch (action.type) {
    case 'SEND':   
      return {loading: true, error: null};
    case 'RESPONSE':
      return {...curhttpState ,loading: false};
    case 'ERROR':
      return  {loading: false, error: action.errorMessage};
    case 'CLEAR':
      return  {...curhttpState, error: null};
    default:
      throw new Error('Should not get there');
      break;
  }
}
*/
function Ingredients() {
  const [ingredientsState, dispatch] = useReducer(ingredientReducer, []);
  //const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});

  const {isLoading, data, error, sendRequest, reqExtra, reqIdentifier, clear} = useHttp();

 // const [ingredientsState, setIngredientsState] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback(filteredIngredients => {//fonction pas recreer n'y changé
    //setIngredientsState(filteredIngredients);
    dispatch({type: 'SET', ingredients: filteredIngredients});
  },[]);
/*
  useEffect(()=>{//fonction lancé a chaque fois que le composant a été rendu // comme didUpdate  
    fetch('https://hook-a3306.firebaseio.com/ingredients.json')
    .then(response=>{
      return response.json();
    }).then(respData=>{
      const loadIngredients = [];
      for (const key in respData) {
        loadIngredients.push({id: key, title: respData[key].title, amount: respData[key].amount});
      }
      setIngredientsState(loadIngredients);
    });
  }, []);// [] comme second argument act like didMount and runs after second render
*/

  useEffect(()=>{
    //console.log('Rendering ingredients')

    if(!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT'){
      dispatch({type: 'DELETE', id: reqExtra});
    }
    else if(!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT')
    {
      console.log('Rendering ingredients delete')
      dispatch({type: 'ADD', ingredient: {id: data.name, ...reqExtra}});
    }
  },[data, reqExtra, reqIdentifier, isLoading, error]);//la fonction s'execute si les ingredients changent

  const addIngredient = useCallback((ingredient)=>{
    sendRequest('https://hook-a3306.firebaseio.com/ingredients.json', 'POST', JSON.stringify(ingredient), ingredient, 'ADD_INGREDIENT');
    /*
    //setIsLoading(true);
    dispatchHttp({type: 'SEND'});
    fetch('https://hook-a3306.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(response=>{
      dispatchHttp({type: 'RESPONSE'});
      //setIsLoading(false);
      return response.json();
    }).then(respData=>{
      //setIngredientsState(prevIngredientsState=> [...prevIngredientsState, {id: respData.name, ...ingredient}]);
      dispatch({type: 'ADD', ingredient: {id: respData.name, ...ingredient}});

    });*/
  },[sendRequest]);//[] pour la dependance 

  const removeIngredientHandler = useCallback((ingredientId)=>{
    sendRequest(`https://hook-a3306.firebaseio.com/ingredients/${ingredientId}.json`, 'DELETE', null, ingredientId, 'REMOVE_INGREDIENT');
   /* 
    dispatchHttp({type: 'SEND'});
    //setIsLoading(true);
    fetch(`https://hook-a3306.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response=>{
      //setIsLoading(false);
      dispatchHttp({type: 'RESPONSE'});
      return response.json();
    }).then(respData=>{
      //setIngredientsState(prevIngredientsState=> prevIngredientsState.filter(ingredient=>ingredient.id !== ingredientId));
      dispatch({type: 'DELETE', id: ingredientId});

    }).catch(error =>{
      dispatchHttp({type: 'ERROR', errorMessage: error.message});
      //setError(error.message);
    });*/
  },[sendRequest]);

  /*const clearError = useCallback(() => {
    //setIsLoading(false);
    //dispatchHttp({type: 'CLEAR'});
    clear();
    //setError(null);
  },[]);
*/
  const ingredientList = useMemo(()=>{
    return (
      <IngredientList ingredients={ingredientsState} onRemoveItem={removeIngredientHandler} />
    );
    },[ingredientsState, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredient} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
