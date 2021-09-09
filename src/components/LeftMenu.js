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

    //Filter Information
    const [ingredient, setIngredient] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    //Menu
    useEffect(() => {
        setMaxPrice(1000);
    }, [])

    useEffect(() => {
        setType(categories[0].name);
    }, [categories])

    const onSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            id: Math.floor(Math.random() * 10000000),
            name,
            price: +price,
            type,
            days: +days,
            ingredients: ['kiełbasa', 'ser'],
        }
        addRecipe(newRecipe);
    }

    //Filters
    const onFilter = (e) => {
        e.preventDefault();
        setSelectedIngredient(ingredient);
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

    //Render
    console.log("Rendering - Left Menu");
    if(toggle === 0) {
        return (
            <div>
                <button onClick={() => setToggle(1)}>+</button>
                <button onClick={() => setToggle(2)}>F</button>
            </div>
        )
        
    } else if(toggle === 1) {
        return (
            <div className='MenuLeft'>
                <h3>Add new recipes</h3>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name..."/>
                    </div>
                    <div>
                        <label htmlFor="type">Category</label>
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price..."/>
                    </div>
                    <div>
                        <label htmlFor="days">Days</label>
                        <input type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="Days..."/>
                    </div>
                    <button className="btn">Add</button>
                    <button onClick={() => setToggle(0)}>Cancel</button>
                </form>
            </div>
        )
    } else if(toggle === 2) {
        return (
            <div className='MenuLeft'>
                <h3>Filter recipes</h3>
                <form onSubmit={onFilter}>
                    <div>
                        <label htmlFor="ingredient">Ingredient</label>
                        <input type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)} placeholder="Ingredient..."/>
                    </div>
                    <div>
                        <label htmlFor="minPrice">Min</label>
                        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} id="minPrice" required="required" placeholder="Min Price..."/>
                    </div>
                    <div>
                        <label htmlFor="maxPrice">Max</label>
                        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} id="maxPrice" required="required" placeholder="Max Price..."/>
                    </div>
                    <button className="btn">Filter</button>
                </form>
                <button onClick={() => onFilterClear()}>Clear</button>
                <button onClick={() => setToggle(0)}>Cancel</button>
            </div>
        ) 
    } else if(toggle === 3) {
        return (
            <div className='MenuLeft'>
                <h3>Edit recipe</h3>
                <form onSubmit={onFilter}>
                    <div>
                        <label htmlFor="ingredient">Ingredient</label>
                        <input type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)} placeholder="Ingredient..."/>
                    </div>
                    <div>
                        <label htmlFor="minPrice">Min</label>
                        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} id="minPrice" required="required" placeholder="Min Price..."/>
                    </div>
                    <div>
                        <label htmlFor="maxPrice">Max</label>
                        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} id="maxPrice" required="required" placeholder="Max Price..."/>
                    </div>
                    <button className="btn">Filter</button>
                </form>
                <button onClick={() => onFilterClear()}>Clear</button>
                <button onClick={() => setToggle(0)}>Cancel</button>
            </div>
        ) 
    }

    
}

export default React.memo(LeftMenu);
