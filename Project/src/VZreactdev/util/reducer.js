/* https://redux.js.org/recipes/reducing-boilerplate#generating-reducers */
export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

/* https://redux.js.org/recipes/structuring-reducers/refactoring-reducers-example */
export const updateObject = (oldObject, newValues) => {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
};

export const updateItemInArray = (array, itemId, updateItemCallback) => {
  const updatedItems = array.map(item => {
    //console.log('updateItemInArray: ', item, itemId);
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item;
    }
    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });
  return updatedItems;
};