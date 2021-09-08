import React from 'react'
import Recipe from './Recipe'

const RecipeTable = ({recipes, deleteRecipe, editRecipes}) => {
    
    console.log("Rendering - Recipe Table");
    return (
        <div className='MenuRight'>
            {recipes.map((recipe)=> {
                return<Recipe key={recipe.id} {...recipe} deleteRecipe={deleteRecipe} editRecipes={editRecipes}></Recipe>
            })}
        </div>
    )
}

export default React.memo(RecipeTable);
