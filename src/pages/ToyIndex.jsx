import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toyService } from "../services/toy.service";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { loadToys, removeToy, saveToy } from "../store/actions/toy.actions";
import { ToyFilter } from "../cmps/ToyFilter";
import { ToyList } from "../cmps/ToyList";
import { SET_FILTER_BY } from "../store/reducers/toy.reducer";

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys);
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy);
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading);
  // const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    loadToys().catch(() => showErrorMsg("Cannot load toys"));
  }, [filterBy]);

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy });
  }

  function onRemoveToy(toyID) {
    removeToy(toyID)
      .then(() => showSuccessMsg("Removed toy successfully"))
      .catch((err) => {
        console.error(err);
        showErrorMsg("Could not remove toy");
      });
  }

  function onAddToy() {
    const toyToSave = toyService.getRandomToy();
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy ${savedToy.name} added`);
      })
      .catch((err) => {
        showErrorMsg("Cannot add new toy");
      });
  }

  if (!toys || isLoading) return <div>Loading...</div>;
  return (
    <main className="toy-index">
      <h1>Our Toys</h1>
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <section className="add-toy-buttons">
        <Link className="button-link" to={'/toy/edit'}>
          Add Toy
        </Link>
        <button onClick={onAddToy}>Add Random Toy</button>
      </section>
      <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </main>
  );
}
