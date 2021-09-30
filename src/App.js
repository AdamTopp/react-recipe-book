import React, {useState, useEffect} from "react";
import data from "./components/data";
import LeftMenu from "./components/LeftMenu";
import RecipeTable from "./components/RecipeTable";
import './App.css'
import RightMenu from "./components/RightMenu";

export const deleteRecipeContext = React.createContext();
export const editRecipeContext = React.createContext();
export const categoriesContext = React.createContext();

function App() {

  const [recipes, setRecipes] = useState(data);
  const [filteredRecipes, setFilteredRecipes] = useState(data);
  const [categories, setCategories] = useState([{id:1, name:"Dinner"}, {id:2, name:"Breakfast"}, {id:3, name:"Snacks"}]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(1000);

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

  const checkIngredients = (ingredients, ingredient) => {
    let check = false;

    for(let i=0; i<ingredients.length; i++) {
      if(ingredients[i].name === ingredient) {
        check = true;
      }
    }
    return check;
  }

  //Filter and Category changes
  useEffect(() => {
    if(selectedCategories.length === 0) {
      if(selectedIngredient === '') {
        console.log("A")
        const newRecipes = recipes.filter(r => r.price>=selectedMinPrice && r.price<=selectedMaxPrice);
        setFilteredRecipes(newRecipes);
      } else {
        console.log("B")
        console.log(selectedIngredient);
        const newRecipes = recipes.filter(r => checkIngredients(r.ingredients ,selectedIngredient) && r.price>=selectedMinPrice && r.price<=selectedMaxPrice);;
        setFilteredRecipes(newRecipes);
      }
    } else {
      if(selectedIngredient === '') {
        console.log("C")
        const newRecipes = recipes.filter(r => checkCategories(selectedCategories, r.type) && r.price>=selectedMinPrice && r.price<=selectedMaxPrice);
        setFilteredRecipes(newRecipes);
      } else {
        console.log("D")
        const newRecipes = recipes.filter(r => checkCategories(selectedCategories, r.type) && r.ingredients.includes(selectedIngredient) && r.price>=selectedMinPrice && r.price<=selectedMaxPrice);
        setFilteredRecipes(newRecipes);
      }
    }   
  }, [selectedCategories, recipes, selectedIngredient, selectedMaxPrice, selectedMinPrice]);

  //Return
  return (
    <div>
        
        <div className="flexbox">
          <deleteRecipeContext.Provider value={deleteRecipe}>
            <editRecipeContext.Provider  value={editRecipes}>
              <categoriesContext.Provider  value={categories}>
                <RecipeTable recipes={filteredRecipes}/>
              </categoriesContext.Provider>
            </editRecipeContext.Provider>
          </deleteRecipeContext.Provider>
          <RightMenu addCategory={addCategory} categories={categories} selectCategory={selectCategory} deselectCategory={deselectCategory}/>
          <LeftMenu addRecipe={addRecipe} categories={categories} setSelectedIngredient={setSelectedIngredient} setSelectedMaxPrice={setSelectedMaxPrice} setSelectedMinPrice={setSelectedMinPrice}/>
        </div>
    </div>
  );
}

export default App;
