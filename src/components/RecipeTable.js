import React from 'react'
import Recipe from './Recipe'

const RecipeTable = ({recipes}) => {
    
    return (
        <div className='flexbox__recipeTable'>
            {recipes.map((recipe)=> {
                return<Recipe key={recipe.id} {...recipe}></Recipe>
            })}
        </div>
    )
}

export default React.memo(RecipeTable);
