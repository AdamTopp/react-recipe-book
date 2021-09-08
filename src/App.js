import React, {useState, useEffect} from "react";
import data from "./components/data";
import LeftMenu from "./components/LeftMenu";
import RecipeTable from "./components/RecipeTable";
import './App.css'
import RightMenu from "./components/RightMenu";

function App() {

  const [recipes, setRecipes] = useState(data);
  const [filteredRecipes, setFilteredRecipes] = useState(data);
  const [categories, setCategories] = useState([{id:1, name:"Dinner"}, {id:2, name:"Breakfast"}]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  //Recipe Management
  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]); 
  }

  const deleteRecipe = (id) => {
    const newRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(newRecipes);
  }

  const editRecipes = (id, newRecipe) => {
    const newRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes([...newRecipes, newRecipe]);
  }

  //Category Management
  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  }

  const selectCategory = (id) => {
    const category = categories.filter((c) => c.id === id);
    setSelectedCategories([...selectedCategories, category]);
  }

  const deselectCategory = (id) => {
    const newSelectedCategories = selectedCategories.filter((sc) => sc[0].id !== id);
    setSelectedCategories(newSelectedCategories);
  }

  const checkCategories = (categories, category) => {
    let check = false;
    for(let i=0; i<categories.length; i++) {
      if(categories[i][0].name === category) {
        check = true;
      }
    }
    return check;
  }

  useEffect(() => {
    if(selectedCategories.length === 0) {
      const newRecipes = recipes;
      setFilteredRecipes(newRecipes);
    } else {
      const newRecipes = recipes.filter(r => checkCategories(selectedCategories, r.type));
      setFilteredRecipes(newRecipes);
    }   
  }, [selectedCategories, recipes]);

  //Filter Management
  const filterIngredient = (ingredient, minPrice, maxPrice) => {
    if(ingredient==='') {
      const fr = filteredRecipes.filter(r => r.price>=minPrice && r.price<=maxPrice);
      setFilteredRecipes(fr);
    } else {
      const fr = filteredRecipes.filter(r => r.ingredients.includes(ingredient) && r.price>=minPrice && r.price<=maxPrice);
      setFilteredRecipes(fr);
    }
  }

  const filterReset = () => {
    setFilteredRecipes(recipes);
  }

  //Return
  return (
    <div>
        <LeftMenu addRecipe={addRecipe} filterIngredient={filterIngredient} filterReset={filterReset} categories={categories} selectedCategories={selectedCategories}/>
        <RecipeTable recipes={filteredRecipes} deleteRecipe={deleteRecipe} editRecipes={editRecipes}/>
        <RightMenu addCategory={addCategory} categories={categories} selectCategory={selectCategory} deselectCategory={deselectCategory}/>
    </div>
  );
}

export default App;
