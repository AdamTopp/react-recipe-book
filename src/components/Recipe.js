import React, {useContext, useState, useEffect} from 'react'
import {deleteRecipeContext, editRecipeContext, categoriesContext} from '../App'

const Recipe = ({id, name, type, price, days, ingredients, preparation}) => {
    //Context
    const deleteRecipe = useContext(deleteRecipeContext);
    const editRecipe = useContext(editRecipeContext);
    const categories = useContext(categoriesContext);

    //Toggle menus
    const [description, setDescription] = useState(false);
    const [edit, setEdit] = useState(false);

    //Recipe Info
    const [_name, _setName] = useState(name);
    const [_type, _setType] = useState(type);
    const [_price, _setPrice] = useState(price);
    const [_days, _setDays] = useState(days);
    const [_description, _setDescription] = useState(preparation);
    const [_ingredients, _setIngredients] = useState(ingredients);
    const [_ingredient, _setIngredient] = useState('');

    const addIngredient = () => {
        const newIngredient = {
            id: Math.floor(Math.random() * 10000000),
            name: _ingredient
        }
        _setIngredients([..._ingredients, newIngredient]);
    }

    const deleteIngredient = (id) => {
        const newIngredients = ingredients.filter(ing => ing.id !== id);
        _setIngredients(newIngredients);
    }

    useEffect(()=> {
        _setIngredient('');
    },[ingredients])

    const handleEdit = (ed, e) => {
        e.stopPropagation();
        setEdit(!ed);

    }

    const onSubmit = (e) => {
        const newRecipe = {
            id,
            name: _name,
            price: +_price,
            type: _type,
            days: +_days,
            ingredients: _ingredients,
            preparation: _description
        }
        editRecipe(id, newRecipe);
        setEdit(!edit);
    }

    let reicpeDescription = description? 'flexbox__recipeTable__recipe__description--active' : '';
    let recipeEdit = description? 'flexbox__recipeTable__recipe__info__edit--active' : '';

    //Render
    if(edit) {
            return (
                <div className="Recipe">
                    <hr></hr>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" value={_name} onChange={(e) => _setName(e.target.value)} placeholder="Name..."/>
                    </div>
                    <div>
                        <label htmlFor="type">Category</label>
                        <select id="type" value={_type} onChange={(e) => _setType(e.target.value)}>
                            {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="ingredients">Ingredients</label>
                        {_ingredients.map(ing => <div key={ing.id}>
                            {ing.name}
                            <button onClick={() => deleteIngredient(ing.id)}>X</button>
                        </div>)}
                        <input type="text" id="ingredients" value={_ingredient} onChange={(e) => _setIngredient(e.target.value)} placeholder="Name..."/>
                        <button onClick={() => addIngredient()}>Add</button>
                    </div>

                    <div>
                        <label htmlFor="price">Price</label>
                        <input id="price" type="number" value={_price} onChange={(e) => _setPrice(e.target.value)} placeholder="Price..."/>
                    </div>
                    <div>
                        <label htmlFor="days">Days</label>
                        <input id="days" type="number" value={_days} onChange={(e) => _setDays(e.target.value)} placeholder="Days..."/>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <div>
                            <textarea id="description" value={_description} onChange={(e) => _setDescription(e.target.value)} placeholder="Description..."/>
                        </div>
                    </div>
                    <button className="btn" onClick={() => onSubmit()}>Add</button>
                    <button onClick={() => setEdit(!edit)}>Cancel</button>
                </div>
            )
    } else {
        return (
            <div className="flexbox__recipeTable__recipe">
                
                <div className="flexbox__recipeTable__recipe__info">
                    <img className="flexbox__recipeTable__recipe__info__image" src="image.png" alt="Recipe"/>
                    <div className="flexbox__recipeTable__recipe__info__details" onClick={() => setDescription(!description)}>
                        <span className="recipe_name">{name}</span>
                        <button className={`flexbox__recipeTable__recipe__info__edit ${recipeEdit}`} onClick={(e) => handleEdit(edit, e)}>
                            <div className="container_recipeEdit">
                                <div className="recipeEdit"></div>
                            </div>
                        </button>
                        <p className="recipe_price">Price: {price}</p>
                        <p className="recipe_portions">Portions: {days}</p>
                        <div className="recipe_type">{type}</div>
                        <button className='flexbox__recipeTable__recipe__info__delete' onClick={() => deleteRecipe(id)}></button>
                    </div>
                    
                </div>
                
                <div className={`flexbox__recipeTable__recipe__description ${reicpeDescription}`}>
                    
                    <div className="flexbox__recipeTable__recipe__description__ingredients">
                        <ul>{
                        ingredients.map(element => {
                            return(<li key={element.id}>{element.name}</li>)  
                        })
                        }</ul>
                    </div>
                    <div className="flexbox__recipeTable__recipe__description__preparation">{preparation}</div>
                    
                </div>
            </div>

        )
    }

    
    
}

export default React.memo(Recipe);
