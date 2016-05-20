
export default React => ({filters, addFilter, removeFilter, selectedFilter}) => {

  let checkedFilter = [];

  const handleChange = (subfilter, e) => {
    if (e.target.checked) {
      addFilter(subfilter);
    } else {
      removeFilter(subfilter);
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
      <p><span>{filter.filterName}</span></p>
      <ul>
        {
          filter.subfilters.map( subfilter => {
            return <li className="subfilter-list-item" key={subfilter.id}>
                    <input type="checkbox"
                    checked={checkedFilter.indexOf(subfilter.name) !== -1 ? 'checked' : ''}
                    onChange={handleChange.bind(this, subfilter)}></input>
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
    </section>
  );

};
