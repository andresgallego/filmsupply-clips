
export default React => ({filters, addFilter, removeFilter, selectedFilter, clearAll}) => {

  let checkedFilter = [];

  const handleChange = (subfilter, filter, e) => {
    if (e.target.checked) {
      addFilter(subfilter, filter);
    } else {
      removeFilter(subfilter, filter);
    }
  };

  if (selectedFilter) {
    // array of selected filters
    checkedFilter = selectedFilter.map(filter => {
      // return the ids of selected items
      return filter.name;
    });
  }

  const FilterListItem = ({filter}) => (
    <div className="filter" key={filter.id}>
      <p>
        <span>{filter.filterName}</span>
        <span className="filter-counter">{filter.filterCount > 0 ? filter.filterCount : ''}</span>
      </p>
      <ul>
        {
          filter.subfilters.map( subfilter => {
            return <li className="subfilter-list-item" key={subfilter.id}>
                    <input type="checkbox"
                    checked={checkedFilter.indexOf(subfilter.name) !== -1 ? 'checked' : ''}
                    onChange={handleChange.bind(this, subfilter, filter)}></input>
                    {subfilter.name}
                   </li>;
          })
        }
      </ul>
    </div>
  );
  return (
    <section className="filters">
      {
        filters ? filters.map(filter => FilterListItem({filter})) : ''
      }
      <a onClick={clearAll}>Clear All</a>
    </section>
  );

};
