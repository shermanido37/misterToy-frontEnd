import { toyService } from "../../services/toy.service";
import { REMOVE_TOY, SET_IS_LOADING, SET_TOYS } from "../reducers/toy.reducer";
import { store } from "../store.js";

export function loadToys() {
  const filterBy = store.getState().toyModule.filterBy;
  // store.dispatch({type: SET_IS_LOADING, isLoading: true})
  return toyService
    .query(filterBy)
    .then((toys) => {
      store.dispatch({ type: SET_TOYS, toys });
    })
    .catch((err) => {
      console.log("toy action => cannot load toys");
      throw err;
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    });
}

export function removeToy(toyID) {
  return toyService
    .remove(toyID)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyID });
    })
    .catch((err) => {
      console.log("toy action -> Cannot remove toy", err);
      throw err;
    });
}

export function saveToy(toy) {
  const type = toy.id ? UPDATE_TOY : ADD_TOY;
  return toyService
    .save(toy)
    .then((savedToy) => {
      store.dispatch({ type, toy: savedToy });
      return savedToy;
    })
    .catch((err) => {
      console.log("toy action -> Cannot save toy", err);
      throw err;
    });
}
