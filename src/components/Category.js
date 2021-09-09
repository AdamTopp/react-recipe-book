import React, {useState, useEffect} from 'react'

const Category = ({name, selectCategory, deselectCategory, id}) => {
    const [selected, setSelected] = useState(false);
    const [style, setStyle] = useState({color:"black"});

    useEffect(() => {
        if(selected) {
            setStyle({color:"green",fontSize:"30px"});
        } else {
            setStyle({color:"white", fontSize:"30px"});
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

    //Render
    console.log("Rendering - Category");
    return (
        <div style={style} onClick={() => chooseCategory(id)}>
            {name}
        </div>
    )
}

export default React.memo(Category);
