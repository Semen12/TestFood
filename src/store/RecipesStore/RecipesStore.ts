import { AxiosResponse } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { getRecipes } from '@services/recipesService';
import { Recipe } from '@types/recipe';

import { Meta, IRecipesStore } from '../types';

type PrivateFields = '_recipes' | '_meta' | '_searchQuery' | '_totalResults' | '_number';

interface GetRecipesParams {
  page: number;
  query?: string;
  type?: string[];
}

class RecipesStore  {
  private _recipes: Recipe[] = [];
  private _meta: Meta = Meta.initial;
  private _searchQuery: string = '';
  private _totalResults: number = 0;
  private _number: number = 9;
  

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _recipes: observable,
      _meta: observable,
      _searchQuery: observable,
      _totalResults: observable,
      _number: observable,

      recipes: computed,
      meta: computed,
      searchQuery: computed,
      totalResults: computed,
      number: computed,
      
      getRecipesList: action
    });
  }
  
   
  get recipes(): Recipe[] {
    return this._recipes;
  }

 

  get meta(): Meta {
    return this._meta;
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  get totalResults(): number {
    return this._totalResults;
  }

  get number(): number {
    return this._number;
  }

 

  async getRecipesList(params: GetRecipesParams): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }
    this._meta = Meta.loading;

      const response= await getRecipes(params);
      runInAction(() => {
        if (response?.results) {
          this._recipes = response.results;
          this._totalResults = response.totalResults;
          this._number = response.number;
          this._meta = Meta.success;
        } else {
          this._meta = Meta.error;
        }
    });
  }
}

export default RecipesStore;
