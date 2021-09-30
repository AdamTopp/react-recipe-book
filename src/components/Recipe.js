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

    const handleDescription = () => {
        
        if(!edit) {
            setDescription(!description);
        }
    }

    const addIngredient = () => {
        const newIngredient = {
            id: Math.floor(Math.random() * 10000000),
            name: _ingredient
        }
        _setIngredients([..._ingredients, newIngredient]);
        _setIngredient('')
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
        _setName(name);
        _setType(type);
        _setPrice(price);
        _setDays(days);
        _setDescription(preparation);
        _setIngredients(ingredients);
        _setIngredient('')
        setEdit(!ed);

    }

    const onSubmit = (e) => {
        e.stopPropagation();
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
        setDescription(!description);
        setEdit(!edit);
    }

    let reicpeDescription = description? 'flexbox__recipeTable__recipe__description--active' : '';
    let recipeEdit = description? 'flexbox__recipeTable__recipe__info__edit--active' : '';

    //Render
    if(edit) {
            return (
                <div className="flexbox__recipeTable__recipe">
                
                <div className="flexbox__recipeTable__recipe__info">
                    <img className="flexbox__recipeTable__recipe__info__image" src="image.png" alt="Recipe"/>
                    <div className="flexbox__recipeTable__recipe__info__details" onClick={() => handleDescription()}>
                        <span className="recipe_name">
                            <input id="name" type="text" value={_name} onChange={(e) => _setName(e.target.value)} placeholder="Name..."/>    
                        </span>
                        <button className={`flexbox__recipeTable__recipe__info__cancel ${recipeEdit}`} onClick={(e) => handleEdit(edit, e)}>
                            <div className="container_recipeCancel">
                                <div className="recipeCancel"></div>
                            </div>
                        </button>

                        <button className={`flexbox__recipeTable__recipe__info__accept ${recipeEdit}`} onClick={(e) => onSubmit(e)}>
                            <div className="container_recipeAccept">
                                <div className="recipeAccept"></div>
                            </div>
                        </button>

                        <p className="recipe_price">
                            Price: <input id="price" type="number" value={_price} onChange={(e) => _setPrice(e.target.value)} placeholder="Price..."/>
                        </p>
                        <p className="recipe_portions">
                            Portions: <input id="days" type="number" value={_days} onChange={(e) => _setDays(e.target.value)} placeholder="Days..."/>
                        </p>
                        <select className="recipe_type--edit" value={_type} onChange={(e) => _setType(e.target.value)}>
                            {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                        </select>
                        
                        <button className='flexbox__recipeTable__recipe__info__delete' onClick={() => deleteRecipe(id)}></button>
                    </div>
                    
                </div>
                
                <div className={`flexbox__recipeTable__recipe__description ${reicpeDescription}`}>
                    
                    <div className="flexbox__recipeTable__recipe__description__ingredients">
                        <ul>{
                        _ingredients.map(element => {
                            return(<li key={element.id}>
                                {element.name}
                                <button className="deleteIngredient" onClick={() => deleteIngredient(element.id)}></button>
                            </li>)  
                        })
                        }</ul>

                        <input type="text" className="ingredientsAddInput" value={_ingredient} onChange={(e) => _setIngredient(e.target.value)} placeholder="Name..."/>
                        <button id="ingredientsAdd"onClick={() => addIngredient()}>+</button>
                    </div>
                    <div className="flexbox__recipeTable__recipe__description__preparation">
                        <textarea className="descriptionTextArea" value={_description} onChange={(e) => _setDescription(e.target.value)} placeholder="Description..."/>
                    </div>
                    
                </div>
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

/*
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
*/