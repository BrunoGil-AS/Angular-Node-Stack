import Pizza from "./Pizza.js";

export default class PizzaBuilder {
  private pizza: Pizza;

  constructor() {
    this.pizza = new Pizza();
  }

  // --- TAMAÑO ---
  public setSize(size: string): this {
    const s = size.toLowerCase();
    switch (s) {
      case "l":
      case "large":
      case "grande":
        this.pizza.size = "Grande";
        break;
      case "m":
      case "medium":
      case "mediana":
        this.pizza.size = "Mediana";
        break;
      case "s":
      case "small":
      case "chica":
      case "pequeña":
        this.pizza.size = "Pequeña";
        break;
      default:
        this.pizza.size = "Mediana"; // Default
    }
    return this;
  }

  // --- QUESO ---
  public setCheese(cheese: string): this {
    const c = cheese.toLowerCase();
    switch (c) {
      case "no":
      case "none":
      case "sin":
      case "sin queso":
        this.pizza.cheese = "Sin queso";
        break;
      case "extra":
      case "doble":
      case "mucho":
        this.pizza.cheese = "Extra queso";
        break;
      case "normal":
      case "regular":
        this.pizza.cheese = "Queso normal";
        break;
      default:
        this.pizza.cheese = "Queso normal"; // Default
    }
    return this;
  }

  // --- SALSA ---
  public setTomatoSauce(sauce: string): this {
    const s = sauce.toLowerCase();
    switch (s) {
      case "bbq":
      case "barbacoa":
        this.pizza.tomatoSauce = "Salsa BBQ";
        break;
      case "spicy":
      case "picante":
      case "mexicana":
        this.pizza.tomatoSauce = "Salsa Picante";
        break;
      case "no":
      case "sin":
      case "none":
        this.pizza.tomatoSauce = "Sin salsa";
        break;
      default:
        this.pizza.tomatoSauce = "Salsa de Tomate Clásica";
    }
    return this;
  }

  // --- INGREDIENTE PRINCIPAL ---
  public setMainIngredient(ingredient: string): this {
    const i = ingredient.toLowerCase();
    switch (i) {
      case "pepperoni":
      case "peperoni":
        this.pizza.mainIngredient = "Pepperoni";
        break;
      case "ham":
      case "jamon":
      case "jamón":
        this.pizza.mainIngredient = "Jamón";
        break;
      case "veggie":
      case "vegetales":
      case "vegetariana":
        this.pizza.mainIngredient = "Vegetales Mixtos";
        break;
      case "pollo":
      case "chicken":
        this.pizza.mainIngredient = "Pollo";
        break;
      default:
        this.pizza.mainIngredient = "Solo Queso"; // Default si no reconoce ingrediente
    }
    return this;
  }

  // --- SEGUNDO INGREDIENTE ---
  public setSecondIngredient(ingredient: string): this {
    const i = ingredient.toLowerCase();
    switch (i) {
      case "mushrooms":
      case "champiñones":
      case "hongos":
        this.pizza.secondIndgredient = "Champiñones";
        break;
      case "piña":
      case "pineapple":
        this.pizza.secondIndgredient = "Piña";
        break;
      case "onion":
      case "cebolla":
        this.pizza.secondIndgredient = "Cebolla";
        break;
      case "no":
      case "none":
      case "ninguno":
        this.pizza.secondIndgredient = "Ninguno";
        break;
      default:
        // Si pone algo raro, simplemente guardamos el texto tal cual
        // o podríamos poner "Ninguno" por seguridad.
        this.pizza.secondIndgredient = ingredient;
    }
    return this;
  }

  public build(): Pizza {
    return this.pizza;
  }
}
