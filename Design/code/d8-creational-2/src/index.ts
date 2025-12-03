import PizzaBuilder from "./PizzaBuilder.js";

const builder = new PizzaBuilder();

const miPizzaHawaiana = builder
  .setSize("Grande") // Entra en el case 'grande' -> "Grande"
  .setCheese("extra") // Entra en el case 'extra' -> "Extra queso"
  .setTomatoSauce("normal") // Default -> "Salsa de Tomate Clásica"
  .setMainIngredient("jamon") // Entra en case 'jamon' -> "Jamón"
  .setSecondIngredient("piña") // Entra en case 'piña' -> "Piña"
  .build();

console.log(miPizzaHawaiana.pizzaInfo);

/* SALIDA ESPERADA:
Pizza {
    size: Grande
    cheese: Extra queso
    tomato Sauce: Salsa de Tomate Clásica
    Main Ingredient: Jamón
    Second Ingredient: Piña
}
*/
