import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const singleCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      return response.data.drinks[0];
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };
const SingleCocktailData = () => {
  const { id } = useLoaderData();

  const { data } = useQuery(singleCocktailQuery(id));
  const drink = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => value != null)
  );

  const {
    strDrink,
    strAlcoholic,
    strCategory,
    strGlass,
    strInstructions,
    strDrinkThumb,
  } = drink;

  const ingredients = Object.keys(drink).filter((key) =>
    key.includes("strIngredient")
  );

  return (
    <section>
      <div className="section-center">
        <div className="single-cocktail-header">
          <Link to="/" className="btn back-home-btn">
            back home
          </Link>
          <h2>{strDrink}</h2>
        </div>
        <div className="singleCocktail-center">
          <div className="single-cocktail-img-cont">
            <img
              src={strDrinkThumb}
              alt="single-cocktail-image"
              className="single-cocktail-img"
            />
          </div>
          <div className="single-cocktail-info">
            <p className="drink-data">
              <span>name :</span>
              {strDrink}
            </p>
            <p className="drink-data">
              <span>category :</span>
              {strCategory}
            </p>
            <p className="drink-data">
              <span>info :</span>
              {strAlcoholic}
            </p>
            <p className="drink-data">
              <span>glass :</span>
              {strGlass}
            </p>
            <p className="drink-data">
              <span>ingredients :</span>
              {ingredients.map((ingredient) => drink[ingredient]).join(",")}
            </p>
            <p className="drink-data">
              <span>instructions :</span>
              {strInstructions}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktailData;
