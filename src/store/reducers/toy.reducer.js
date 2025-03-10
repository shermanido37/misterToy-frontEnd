import { toyService } from "../../services/toy.service.js";

export const SET_TOYS = "SET_TOYS";
export const REMOVE_TOY = "REMOVE_TOY";
export const ADD_TOY = "ADD_TOY";
export const UPDATE_TOY = "UPDATE_TOY";
export const SET_FILTER_BY = "SET_FILTER_BY";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const UNDO_TOYS = "UNDO_TOYS";

const initialState = {
  toys: [],
  filterBy: toyService.getDefaultFilter(),
  isLoading: false,
};

export function toyReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_TOYS:
      return {
        ...state,
        toys: cmd.toys,
      };
    case REMOVE_TOY:
      return {
        ...state,
        toys: state.toys.filter((toy) => toy.id !== cmd.toyID),
      };
    case ADD_TOY:
      return {
        ...state,
        toys: [...toys, cmd.toy],
      };
    case UPDATE_TOY:
      return {
        ...state,
        toys: state.toys.map((toy) => (toy.id === cmd.toy.id ? cmd.toy : toy)),
      };
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...state.filterBy, ...cmd.filterBy },
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: cmd.isLoading,
      };
    default:
      return state;
  }
}
