export default class Pizza {
  public size: string;
  public cheese: string;
  public tomatoSauce: string;
  public mainIngredient: string;
  public secondIndgredient: string;

  constructor() {
    this.size = "m";
    this.cheese = "normal";
    this.tomatoSauce = "normal";
    this.mainIngredient = "none";
    this.secondIndgredient = "none";
  }

  get pizzaInfo() {
    return `Pizza {
                        size:${this.size})
                        cheese: ${this.cheese}
                        tomato Sauce: ${this.tomatoSauce}
                        Main Ingredient: ${this.mainIngredient}
                        Second Ingredient: ${this.secondIndgredient}
    }
                        `;
  }
}
