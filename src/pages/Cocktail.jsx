import { useLoaderData, Link, Navigate } from "react-router-dom";
import { placeholderApi } from "../config";
import Wrapper from "../assets/wrappers/CocktailPage";
import { useQuery } from "@tanstack/react-query";

const singleCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const { data } = await placeholderApi.get(`lookup.php?i=${id}`);
      return data;
    },
  };
};
export const loader = (queryClient) => {
  return async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };
};
const Cocktail = () => {
  const { id } = useLoaderData(loader);
  const { data } = useQuery(singleCocktailQuery(id));
  const singleDrink = data.drinks[0];
  const ingredients = getIngredients(singleDrink);

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back Home
        </Link>
        <h3>{name}</h3>
      </header>

      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">Ingredients:</span>
            {ingredients.map((item, idx) => {
              return (
                <span className="ing" key={idx}>
                  {" "}
                  {item.ingredient}
                  {idx < ingredients.length - 1 ? "," : "."}
                </span>
              );
            })}
          </p>

          <p>
            <span className="drink-data">instructions:</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;

const getIngredients = (singleDrink) => {
  const result = Object.entries(singleDrink)
    .filter((item) => {
      return item[0].includes("Ingredient") && item[1];
    })
    .map((item) => {
      const res = {};
      res["ingredient"] = item[1];
      return res;
    });
  return result;
};
