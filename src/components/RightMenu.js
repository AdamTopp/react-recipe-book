import React, {useState} from 'react'
import Category from './Category'

const RightMenu = ({addCategory, categories, selectCategory, deselectCategory}) => {
    const [name, setName] = useState('');
    const [toggle, setToggle] = useState(false);

    const onSubmit = () => {
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
    return (
        <div className="flexbox__rightMenu">
            {categories.map(cat => <Category key={cat.id} name={cat.name} id={cat.id} selectCategory={selectCategory} deselectCategory={deselectCategory}/>)}
            <form>
                <div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name..."/>
                    <button onClick={() => onSubmit()}>Add</button>
                </div>
            </form>
            <button onClick={() => setToggle(!toggle)}>+</button>
        </div>
    )
    
}

export default React.memo(RightMenu);
