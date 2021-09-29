import React , {useState} from 'react'
import { useEffect } from 'react/cjs/react.development';

const LeftMenu = ({addRecipe, categories, setSelectedIngredient, setSelectedMaxPrice, setSelectedMinPrice}) => {
    //Toggle menu
    const [toggle, setToggle] = useState(0);
    
    //Menu information
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [days, setDays] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [description, setDescription] = useState("");

    //Filter Information
    const [filteredIngredient, setFilteredIngredient] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    //Menu
    useEffect(() => {
        setMaxPrice(1000);
    }, [])

    useEffect(() => {
        setType(categories[0].name);
    }, [categories])

    const onSubmit = () => {
        const newRecipe = {
            id: Math.floor(Math.random() * 10000000),
            name,
            price: +price,
            type,
            days: +days,
            ingredients: ingredients,
            preparation: description
        }
        addRecipe(newRecipe);
    }

    //Filters
    const onFilter = (e) => {
        e.preventDefault();
        setSelectedIngredient(filteredIngredient);
        setSelectedMaxPrice(maxPrice);
        setSelectedMinPrice(minPrice)
    }

    const onFilterClear = (e) => {
        setMinPrice(0);
        setMaxPrice(1000);
        setIngredient('');

        setSelectedIngredient('');
        setSelectedMaxPrice(1000);
        setSelectedMinPrice(0)
    }

    const addIngredient = () => {
        const newIngredient = {
            id: Math.floor(Math.random() * 10000000),
            name: ingredient
        }
        setIngredients([...ingredients, newIngredient]);
    }

    const deleteIngredient = (id) => {
        const newIngredients = ingredients.filter(ing => ing.id !== id);
        setIngredients(newIngredients);
    }

    useEffect(()=> {
        setIngredient('');
    },[ingredients])

    let menu_active = toggle===1||toggle===2 ? 'leftMenu--active' : '';
    let menu_buttons_active = toggle===1||toggle===2 ? 'leftMenu__buttons--active' : '';
    let menu_add_active = toggle===1 ? 'leftMenu__add--active' : '';
    let menu_filter_active = toggle===2 ? 'leftMenu__filter--active' : '';

    //Render
    return (
        <div className={`leftMenu ${menu_active}`}>
            <div className={`leftMenu__add ${menu_add_active}`}>
                <h3>Add new recipes</h3>
                <label htmlFor="name">Name</label>
                <div>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name..."/>
                </div>
                <label htmlFor="type">Category</label>
                <div>
                    
                    <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                    </select>
                </div>
                <label htmlFor="ingredients">Ingredients</label>

                <div>
                    {ingredients.map(ing => <div key={ing.id}>
                        <button className="deleteIngredient" onClick={() => deleteIngredient(ing.id)}></button>
                        {ing.name}
                        
                    </div>)}
                    <input type="text" id="ingredients" value={ingredient} onChange={(e) => setIngredient(e.target.value)} placeholder="Name..."/>
                    <button id="ingredientsAdd"onClick={() => addIngredient()}>+</button>
                </div>
                <label htmlFor="price">Price</label>

                <div>
                    <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price..."/>
                </div>
                <label htmlFor="days">Days</label>

                <div>
                    <input id="days" type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="Days..."/>

                </div>
                <label htmlFor="description">Description</label>

                <div>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description..."/>
                </div>
                <button className="btn" onClick={() => onSubmit()}>Add</button>
                <button className="btn" onClick={() => setToggle(0)}>Cancel</button>
            </div>

            <div className={`leftMenu__filter ${menu_filter_active}`}>
                <h3>Filter recipes</h3>
                <form onSubmit={onFilter}>
                    <label htmlFor="ingredient">Ingredient</label>

                    <div>
                        <input id="ingredient" type="text" value={filteredIngredient} onChange={(e) => setFilteredIngredient(e.target.value)} placeholder="Ingredient..."/>
                    </div>
                    <label htmlFor="minPrice">Min</label>

                    <div>
                        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} id="minPrice" required="required" placeholder="Min Price..."/>

                    </div>
                    <label htmlFor="maxPrice">Max</label>

                    <div>
                        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} id="maxPrice" required="required" placeholder="Max Price..."/>
                    </div>
                    <button className="btn">Filter</button>
                </form>
                <button className="btn" onClick={() => onFilterClear()}>Clear</button>
                <button className="btn" onClick={() => setToggle(0)}>Cancel</button>
            </div>

                <button className={`leftMenu__button__add ${menu_buttons_active}`} onClick={() => setToggle(1)}>+</button>
                <button className={`leftMenu__button__filter ${menu_buttons_active}`} onClick={() => setToggle(2)}><div className="leftMenu__burger"></div></button>
        </div>
    )
        

    
}

export default React.memo(LeftMenu);
