import React, {useState} from 'react'
import Category from './Category'

const RightMenu = ({addCategory, categories, selectCategory, deselectCategory}) => {
    const [name, setName] = useState('');
    const [toggle, setToggle] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const newCategory = {
            id: Math.floor(Math.random() * 10000000),
            name
        }
        addCategory(newCategory);
        setName('');
        setToggle(!toggle);
    }
    
    //Render
    console.log("Rendering - Right Menu");
    if(toggle) {
        return (
            <div>
                {categories.map(cat => <Category key={cat.id} name={cat.name} id={cat.id} selectCategory={selectCategory} deselectCategory={deselectCategory}/>)}
                <form onSubmit={onSubmit}>
                    <div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name..."/>
                        <button>Add</button>
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            <div >
                {categories.map(cat => <Category key={cat.id} name={cat.name} id={cat.id} selectCategory={selectCategory} deselectCategory={deselectCategory}/>)}
                <button onClick={() => setToggle(!toggle)}>+</button>
            </div>
        )
    }
    
}

export default React.memo(RightMenu);
