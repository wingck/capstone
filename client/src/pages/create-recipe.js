import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navbar } from "../components/navbar";

export const Create = () => {


  return (
    <div className="auth">
      <Navbar />
      <div>
        <CreateRecipe />
      </div>
        <div>
          <Display />
        </div>
    </div>
  );
};



const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [calorieRange, setCalorieRange] = useState("");
  const [titleOptions, setTitleOptions] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const fetchTitleOptions = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/findByNutrients?apiKey=2a72e2026c5744c6b0d93292fd28f7d1&minCalories=${calorieRange.minCalories}&maxCalories=${calorieRange.maxCalories}&number=10`
        );
        setTitleOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTitleOptions();
  }, [calorieRange]);

  const handleSubmit = async (event) => {
    try {
      const selectedRecipe = titleOptions.find(
        (recipe) => recipe.title === selectedTitle
      );
      if (selectedRecipe) {
        await axios.post(
          "http://localhost:3001/recipes",
          {
            id: selectedRecipe.id,
            title: selectedRecipe.title,
            image: selectedRecipe.image,
            imageType: selectedRecipe.imageType,
            calories: selectedRecipe.calories,
            protein: selectedRecipe.protein,
            fat: selectedRecipe.fat,
            carbs: selectedRecipe.carbs,
            day: selectedDay,
            time: selectedTime,
            userOwner: userID,
          },
          {
            headers: { authorization: cookies.access_token },
          }
        );
      } else {
        alert("Selected recipe not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <form onSubmit={handleSubmit} className="create-form">
        <label htmlFor="calorieRange">Calorie Range</label>
        <select
          id="calorieRange"
          name="calorieRange"
          value={`${calorieRange.minCalories}-${calorieRange.maxCalories}`}
          onChange={(e) => {
            const [minCalories, maxCalories] = e.target.value.split("-");
            setCalorieRange({ minCalories: parseInt(minCalories), maxCalories: parseInt(maxCalories) });
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

        <label htmlFor="selectedTitle">Select Recipe Title</label>
        <select
          id="selectedTitle"
          name="selectedTitle"
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
        >
          <option value="options">--Options--</option>
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
        <SaveButton handleSubmit={handleSubmit} selectedDay={selectedDay} selectedTime={selectedTime} />
      </form>
    </div>
  );
};

const SaveButton = ({ handleSave, selectedDay, selectedTime }) => {
  const navigate = useNavigate();

  const handleSaveClick = async () => {
    await handleSave();
    navigate("/saved-recipes");
  };

  return <button onClick={handleSaveClick}>Save</button>;
};

export const Display = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        const filteredRecipes = response.data.filter(
          (recipe) => !savedRecipes.includes(recipe._id)
        );
        setRecipes(filteredRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
  }, [savedRecipes]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes((prevSavedRecipes) => [...prevSavedRecipes, recipeID]);

      // Remove the saved recipe from the recipes list in frontend
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeID)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="display-recipe">
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.title}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="image">
              <img src={recipe.image} />
            </div>
            <div className="calories">
              <p>Calories: {recipe.calories}</p>
            </div>
            <div className="protein">
              <p>Protein: {recipe.protein}</p>
            </div>
            <div className="fat">
              <p>Fat: {recipe.fat}</p>
            </div>
            <div className="carbs">
              <p>Carbs: {recipe.carbs}</p>
            </div>
            <div className="day">
              <p>Day: {recipe.day}</p>
            </div>
            <div className="time">
              <p>Time: {recipe.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};