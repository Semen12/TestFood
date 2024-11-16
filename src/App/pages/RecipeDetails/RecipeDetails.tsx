import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetailsStore from '@store/RecipeDetailsStore/RecipeDetailsStore';
import { Meta } from '@store/types';
import { getRecipeInfoItems } from '@utils/recipe';
import LoaderContainer from '../components/LoaderContainer/LoaderContainer';
import { RecipeTop } from './components/RecipeTop/RecipeTop';
import { RecipeNecessity } from './components/RecipeNecessity/RecipeNecessity';
import styles from './RecipeDetails.module.scss';

const RecipeDetails = observer(() => {
  const { id } = useParams<{ id: string }>();
  const recipeDetailsStore = useLocalStore(() => new RecipeDetailsStore());

  useEffect(() => {
    if (id) {
      recipeDetailsStore.getRecipeDetails(Number(id));
    }
  }, [id, recipeDetailsStore]);

  return (
    <React.Fragment>
      {recipeDetailsStore.meta === Meta.loading && <LoaderContainer />}
      {recipeDetailsStore.meta === Meta.success && (
        <div className={styles.recipe}>
          <div className={styles.recipe__container}>
            <RecipeTop
              title={recipeDetailsStore.recipe.title}
              image={recipeDetailsStore.recipe.image}
              summary={recipeDetailsStore.recipe.summary}
              recipeInfo={getRecipeInfoItems(recipeDetailsStore.recipe)?.map(item => ({
                ...item,
                value: item.value || ''
              }))}
            />
            <RecipeNecessity
              ingredients={recipeDetailsStore.recipe.extendedIngredients}
              steps={recipeDetailsStore.steps}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
});

export default RecipeDetails;
