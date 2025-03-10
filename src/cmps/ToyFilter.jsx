import { useEffect, useRef, useState } from "react";
import Select from "react-select";

import { debounce } from "../services/util.service";
import { toyService } from "../services/toy.service";

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  const firstUpdate = useRef(true);
  const labelFilterOptions = toyService.labels.map((label) => ({
    value: label,
    label,
  }));

  onSetFilter = useRef(debounce(onSetFilter)).current;

  useEffect(() => {
    /**do not update the filter in the state the first time this is rendered, to prevent infinite loop */
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    // console.log(value, " ", field, " ", type);
    value =
      (type === "number" && value !== "") || type === "select-one"  //  second condition is for converting the stock dropdown to a number
        ? +value
        : value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function handleSelectChange(selectedOptions) {
    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      label_filter: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  }

  return (
    <section className="toy-filter full main-layout">
      <h2>Toys Filter</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="By name"
          value={filterByToEdit.name}
          onChange={handleChange}
        />

        <label htmlFor="maxPrice">Max price:</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="By max price"
          value={filterByToEdit.maxPrice || ""}
          onChange={handleChange}
        />

        <label htmlFor="stockStatus">Status in stock:</label>
        <select
          id="stockStatus"
          name="stockStatus"
          value={filterByToEdit.stockStatus || ""}
          onChange={handleChange}
        >
          <option value={-1}>Ignore</option>
          <option value={1}>Out of stock</option>
          <option value={2}>In stock</option>
        </select>

        <label htmlFor="label_filter">Labels:</label>
        <Select
          className="label-filter-select"
          defaultValue={[]}
          id="label_filter"
          name="label_filter"
          options={labelFilterOptions}
          onChange={handleSelectChange}
          isMulti
        />
      </form>
    </section>
  );
}
