import React, { useState } from "react";
import cocktail from "../assets/cocktail.jpg";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigation, Form } from "react-router-dom";
const cocktailsApi =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const allCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailsApi}${searchTerm}`);
      return response.data.drinks;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    let searchTerm = url.searchParams.get("search") || "";
    await queryClient.ensureQueryData(allCocktailsQuery(searchTerm));
    return { searchTerm };
  };
const Cocktails = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(allCocktailsQuery(searchTerm));
  const navigation = useNavigation();

  return (
    <>
      <div className="section-center">
        <Form className="form">
          <div className="form-row search-row">
            <input
              type="search"
              name="search"
              className="form-input search-input"
              defaultValue={searchTerm}
            />
            <button className="btn form-btn" type="submit">
              search
            </button>
          </div>
        </Form>
      </div>
      {!drinks && (
        <h3 className="no-drinks">no drinks matched searched criteria</h3>
      )}
      <div className="section-center cocktails-center">
        {drinks?.map((drink) => {
          const { idDrink, strDrink, strGlass, strAlcoholic, strDrinkThumb } =
            drink;

          return (
            <article className="cocktail" key={idDrink}>
              <div className="cocktail-img-cont">
                <img
                  src={strDrinkThumb}
                  alt="cocktail-image"
                  className="cocktail-img"
                />
              </div>
              <div className="cocktail-info">
                <h4>{strDrink}</h4>
                <h5>{strGlass}</h5>
                <p>{strAlcoholic}</p>
                <Link className="btn" to={`cocktail/${idDrink}`}>
                  details
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default Cocktails;
