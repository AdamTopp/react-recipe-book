import React, {useState, useEffect} from 'react'

const Category = ({name, selectCategory, deselectCategory, id}) => {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if(selected) {
            //setStyle({color:"green",fontSize:"30px"});
        } else {
            //setStyle({color:"white", fontSize:"30px"});
        }   
    }, [selected])

    const chooseCategory = (id) => {
        if(selected) {
            deselectCategory(id);
            setSelected(!selected);
        } else {
            selectCategory(id);
            setSelected(!selected);
        }
    }

    let category_active = selected ? '' : 'flexbox__rightMenu__category--active';

    //Render
    return (
        <button className={`flexbox__rightMenu__category ${category_active}`} onClick={() => chooseCategory(id)}>
            <div className={`flexbox__rightMenu__category__name ${category_active}`}>
                {name}
            </div>
        </button>
    )
}

export default React.memo(Category);
