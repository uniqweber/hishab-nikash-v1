import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("expenses");
    if (serializedState === null) {
      return [];
    } else {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const initialState = loadState();

const expenseSlice = createSlice({
  name: "itemList",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const { name, amount, category } = action.payload;
      const foundCategory = state.find((categories) => categories.categoryName === category);
      if (foundCategory) {
        const foundItem = foundCategory.item.find((item) => item.name === name);
        if (foundItem) {
          foundItem.amount = Number(foundItem.amount) + Number(amount);
        } else {
          foundCategory.item.push({ id: nanoid(), name, amount });
        }
      } else {
        state.push({
          id: nanoid(),
          categoryName: category,
          item: [{ id: nanoid(), name, amount }],
        });
      }
      saveState(state);
    },
    editExpense: (state, action) => {
      const { name, category, amount } = action.payload;
      const foundCategory = state.find((categories) => categories.categoryName === category);
      if (foundCategory) {
        const foundItem = foundCategory.item.find((item) => item.name === name);
        if (foundItem) {
          foundItem.amount = amount;
          saveState(state);
        }
      }
    },
    deleteExpense: (state, action) => {
      const { name, category } = action.payload;
      const foundCategory = state.find((item) => item.categoryName === category);
      if (foundCategory) {
        const findItem = foundCategory.item.find((item) => item.name === name);
        if (findItem) {
          foundCategory.item = foundCategory.item.filter((item) => item.name !== name);
          saveState(state);
        }
      }
    },
    deleteAllExpenses: (state) => {
      state.splice(0, state.length);
      saveState(state);
    },
  },
});
export const { addExpense, editExpense, deleteExpense, deleteAllExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("expenses", serializedState);
};
