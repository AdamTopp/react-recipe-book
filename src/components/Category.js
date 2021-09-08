import React, {useState} from 'react'

const Category = ({name, selectCategory, deselectCategory, id}) => {
    const [selected, setSelected] = useState(false);

    const chooseCategory = (id) => {
        if(selected) {
            deselectCategory(id);
            setSelected(!selected);
        } else {
            selectCategory(id);
            setSelected(!selected);
        }
    }

    //Render
    console.log("Rendering - Category");
    return (
        <div onClick={() => chooseCategory(id)}>
            {name}
        </div>
    )
}

export default React.memo(Category);
