import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { Navbar } from "../components/navbar";
import Modal from "react-modal";

const API_URL = "http://localhost:3001/recipes";

export const Save = () => {
  return (
    <div className="auth">
      <Navbar />
      <div>
        <SavedRecipes />
      </div>
    </div>
  );
};

  const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const userID = useGetUserID();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calorieRange, setCalorieRange] = useState("");
  const [titleOptions, setTitleOptions] = useState([]);
  const [selectedRecipeData, setSelectedRecipeData] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCalories, setSelectedCalories] = useState("");
  const [selectedProtein, setSelectedProtein] = useState("");
  const [selectedFat, setSelectedFat] = useState("");
  const [selectedCarbs, setSelectedCarbs] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageType, setSelectedImageType] = useState("");

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`${API_URL}/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        setError('An error occurred while fetching saved recipes.');
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  const deleteRecipe = async (recipeID) => {
    try {
      await axios.delete(`${API_URL}/${recipeID}`);
      const updatedRecipes = savedRecipes.filter((recipe) => recipe._id !== recipeID);
      setSavedRecipes(updatedRecipes);
    } catch (err) {
      setError('An error occurred while deleting a recipe.');
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchTitleOptions = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/findByNutrients?apiKey=2a72e2026c5744c6b0d93292fd28f7d1&minCalories=${calorieRange.minCalories}&maxCalories=${calorieRange.maxCalories}&number=10`
        );
        setTitleOptions(response.data);
      } catch (error) {
        setError('An error occurred while fetching title options.');
        console.error(error);
      }
    };

    if (calorieRange) {
      fetchTitleOptions();
    }
  }, [calorieRange]);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setSelectedRecipeData(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateRecipe = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/${selectedRecipe._id}`,
        {
          title: selectedRecipeData.title,
          image: selectedImage,
          imageType: selectedImageType,
          calories: selectedCalories,
          protein: selectedProtein,
          fat: selectedFat,
          carbs: selectedCarbs,
          day: selectedDay,
          time: selectedTime,
        }
      );
  
      const updatedRecipe = response.data;
      const index = savedRecipes.findIndex(recipe => recipe._id === updatedRecipe._id);
      const newSavedRecipes = [...savedRecipes];
      newSavedRecipes[index] = updatedRecipe;
      setSavedRecipes(newSavedRecipes);
      setIsModalOpen(false);
    } catch (err) {
      setError('An error occurred while updating a recipe.');
      console.error(err);
    }
  };

  const weekDays = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 7 };
  const mealTimes = { "Breakfast": 1, "Lunch": 2, "Dinner": 3 };

  // First, sort the savedRecipes array based on the day of the week and meal time
  const sortedRecipes = [...savedRecipes].sort((a, b) => {
    if (weekDays[a.day] - weekDays[b.day] === 0) {
      return mealTimes[a.time] - mealTimes[b.time];
    } else {
      return weekDays[a.day] - weekDays[b.day];
    }
  });

  
  

  return (
    <div className="recipes-container">
          {sortedRecipes.map((recipe) => (
            <div className="saved-recipe" key={recipe._id}>
              <div>
                <h2>{recipe.title}</h2>
              </div>
              <img src={recipe.image} alt={recipe.title} />
              <p>Calories: {recipe.calories}</p>
              <p>Protein: {recipe.protein}</p>
              <p>Fat: {recipe.fat}</p>
              <p>Carbs: {recipe.carbs}</p>
              <p>Day: {recipe.day}</p>
              <p>Time: {recipe.time}</p>
              <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
              <button onClick={() => openModal(recipe)}>Edit</button>
            </div>
          ))}
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
          {selectedRecipe && (
            <div>
              <h2>Edit Recipe</h2>
              <div className="edit-form">
                <label htmlFor="calorieRange">Calorie Range</label>
                <select
                  id="calorieRange"
                  name="calorieRange"
                  value={`${calorieRange.minCalories}-${calorieRange.maxCalories}`}
                  onChange={(e) => {
                    const [minCalories, maxCalories] = e.target.value.split("-");
                    setCalorieRange({
                      minCalories: parseInt(minCalories),
                      maxCalories: parseInt(maxCalories),
                    });
                  }}
                >
                  <option value="options">--Options--</option>
                  <option value="0-100">0-100</option>
                  <option value="100-200">100-200</option>
                  <option value="200-300">200-300</option>
                  <option value="300-400">300-400</option>
                  <option value="400-500">400-500</option>
                  <option value="500-600">500-600</option>
                  <option value="600-700">600-700</option>
                  <option value="700-800">700-800</option>
                  <option value="800-900">800-900</option>
                </select>

                <label htmlFor="selectedRecipe">Select Recipe</label>
                <select
                  id="selectedRecipe"
                  name="selectedRecipe"
                  value={selectedRecipeData ? selectedRecipeData.title : ""}
                  onChange={(e) => {
                    const selectedRecipeTitle = e.target.value;
                    const selectedRecipe = titleOptions.find(
                      (recipe) => recipe.title === selectedRecipeTitle
                    );
                    console.log(selectedRecipe);
                    // Update the selectedRecipeData state with the new selected recipe
                    setSelectedRecipeData(selectedRecipe);
                    setSelectedCalories(selectedRecipe?.calories); // Set the selected calories
                    setSelectedProtein(selectedRecipe?.protein);
                    setSelectedFat(selectedRecipe?.fat);
                    setSelectedCarbs(selectedRecipe?.carbs);
                    setSelectedImage(selectedRecipe?.image);
                    setSelectedImageType(selectedRecipe?.imageType); // Set the selected calories
                  }}
                >
                  <option value="">--Select Recipe--</option>
                  {titleOptions &&
                    titleOptions.map((recipe) => (
                      <option key={recipe.title} value={recipe.title}>
                        {recipe.title}
                      </option>
                    ))}
                </select>

                <label htmlFor="selectedDay">Select Day</label>
                <select
                  id="selectedDay"
                  name="selectedDay"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="">-- Select Day --</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>

                <label htmlFor="selectedTime">Select Time</label>
                <select
                  id="selectedTime"
                  name="selectedTime"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">-- Select Time --</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
                <button onClick={closeModal} className="editbtn">Cancel</button>
                <button onClick={updateRecipe} className="editbtn">Update</button>
              </div>
            </div>
          )}
        </Modal>
    </div>
  );
};
