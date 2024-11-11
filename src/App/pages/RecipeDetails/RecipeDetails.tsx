import { observer, useLocalStore } from 'mobx-react-lite';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ArrowRound from '@assets/arrow-round.svg?react';
import Loader from '@components/Loader';
import RecipeDetailsStore from '@store/RecipeDetailsStore/RecipeDetailsStore';
import { Meta } from '@store/types';
import styles from './RecipeDetails.module.scss';
import React from 'react';

const RecipeDetails = observer(() => {
  const { id } = useParams<{ id: string }>();
  const recipeStore = useLocalStore(() => new RecipeDetailsStore());

  useEffect(() => {
    if (id) {
      recipeStore.getRecipeDetails(Number(id));
    }
  }, [id, recipeStore]);

  if (recipeStore.meta === Meta.loading) {
    return <div className={styles.loader}><Loader size='l' /></div>;
  }

  if (recipeStore.meta === Meta.error || !recipeStore.recipe) {
    return <div>Рецепт не найден</div>;
  }

  const recipe = recipeStore.recipe;
  console.log(recipe.nutrition);
  return (
    <React.Fragment> 
      
    <div className={styles.recipe}>
      <div className={styles.recipe__container}>
        <div className={styles.recipe__top}>
          <h1 className={styles.recipe__title}>
            {recipe.title}{' '}
            <NavLink to="/recipes">
              <ArrowRound />
            </NavLink>
          </h1>
          <img src={recipe.image} alt={recipe.title} className={styles.recipe__image} />
          <div className={styles.recipe__info}>
            <div className={styles.recipe__infoItem}>
              <span>Preparation</span>
              <span>{recipe.preparationMinutes} minutes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Cooking</span>
              <span>{recipe.cookingMinutes} minutes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Total</span>
              <span>{recipe.readyInMinutes} minutes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Ratings</span>
              <span>{recipe.aggregateLikes} likes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Servings</span>
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          <div className={styles.recipe__summary} dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </div>
        <div className={styles.recipe__necessity}>
          <div className={styles.recipe__section}>
            <h2>Ingredients</h2>
            <ul>
              {recipe.nutrition?.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name} {ingredient.amount} {ingredient.unit}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.recipe__section}>
            <h2>Equipment</h2>
            <ul>
              {recipe.analyzedInstructions[0]?.steps.map((step) => (
                <li key={step.number}>{step.equipment.map((item) => item.name).join(', ')}</li>
              ))}
            </ul>
          </div>
          <div className={styles['recipe__section-steps']}>
            <h2>Directions</h2>
            {recipe.analyzedInstructions[0]?.steps.map((step) => (
              <div key={step.number} className={styles['recipe__section-step']}>
                <h3>Step {step.number}</h3>
                <p>{step.step}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default RecipeDetails;
