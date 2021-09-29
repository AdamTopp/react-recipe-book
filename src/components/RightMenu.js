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
    
    let categoryAddMenu = toggle ? 'flexbox__rightMenu__addCategory--active':''
    let categoryAddToggle = toggle ? 'flexbox__rightMenu__toggle--hidden':''

    //Render
    return (
        <div className="flexbox__rightMenu">
            {categories.map(cat => <Category key={cat.id} name={cat.name} id={cat.id} selectCategory={selectCategory} deselectCategory={deselectCategory}/>)}
            <div className={`flexbox__rightMenu__addCategory ${categoryAddMenu}`}>
                <input className="flexbox__rightMenu__addCategory__name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name..."/>
                <button className="flexbox__rightMenu__addCategory__add" onClick={() => onSubmit()}>+</button>
            </div>
            <button className={`flexbox__rightMenu__toggle ${categoryAddToggle}`} onClick={() => setToggle(!toggle)}>+</button>
        </div>
    )
    
}

export default React.memo(RightMenu);
