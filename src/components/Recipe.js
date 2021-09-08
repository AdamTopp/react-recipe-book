import React, {useState} from 'react'

const Recipe = ({id, name, type, price, days, ingredients, preparation, deleteRecipe, editRecipes}) => {
    //Toggle menus
    const [description, setDescription] = useState(false);
    const [edit, setEdit] = useState(false);

    //Recipe Info
    const [_name, _setName] = useState(name);
    const [_type, _setType] = useState(type);
    const [_price, _setPrice] = useState(price);
    const [_days, _setDays] = useState(days);

    const onSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            id,
            name: _name,
            price: +_price,
            type: _type,
            days: +_days,
            ingredients: ['kiełbasa', 'ser'],
        }
        editRecipes(id, newRecipe);
        setEdit(!edit);
    }

    //Render
    console.log("Rendering - Recipe");
    if(edit) {
            return (
                <div className="Recipe">
                    <hr></hr>
                    <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" value={_name} onChange={(e) => _setName(e.target.value)} placeholder="Name..."/>
                    </div>
                    <div>
                        <label htmlFor="type">Type</label>
                        <input type="text" value={_type} onChange={(e) => _setType(e.target.value)} placeholder="Type..."/>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" value={_price} onChange={(e) => _setPrice(e.target.value)} placeholder="Price..."/>
                    </div>
                    <div>
                        <label htmlFor="days">Days</label>
                        <input type="number" value={_days} onChange={(e) => _setDays(e.target.value)} placeholder="Days..."/>
                    </div>
                    <button className="btn">Add</button> 
                </form>
                <button onClick={() => setEdit(!edit)}>Cancel</button>
                </div>
            )
    } else {
        if(description) {
            return (
                <div className="Recipe">
                    <hr></hr>
                    <p>{name}</p>
                    <p>{type}</p>
                    <p>{price} lasts for {days} days</p>
                    <button className='delete' onClick={() => deleteRecipe(id)}>X</button>
                    <button className='edit' onClick={() => setEdit(!edit)}>E</button>
                    <button className='description' onClick={() => setDescription(!description)}>D</button>
                    <div className="preparation">{preparation}</div>
                    <div className="ingredients">
                        <p>{ingredients.map(element => {
                            return(element + " ")  
                        })}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="Recipe">
                    <hr></hr>
                    <p>{name}</p>
                    <p>{type}</p>
                    <p>{price} lasts for {days} days</p>
                    <button className='delete' onClick={() => deleteRecipe(id)}>X</button>
                    <button className='edit' onClick={() => setEdit(!edit)}>E</button>
                    <button className='description' onClick={() => setDescription(!description)}>D</button>
                </div>
            )
        }
    }

    
    
}

export default React.memo(Recipe);
