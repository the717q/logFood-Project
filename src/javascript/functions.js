// capitalizes a word

export function capitalize(name) {
  return name[0].toUpperCase() + name.substring(1);
}

// returns the total calories

export function logCalories(fat = 0, carbs = 0, protein = 0) {
  return (
    Number.parseInt(fat, 0) * 4 +
    Number.parseInt(carbs, 0) * 4 +
    Number.parseInt(protein, 0) * 4
  );
}
