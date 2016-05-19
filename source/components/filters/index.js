export default React => ({filters, addFilter, removeFilter}) => {

  const handleChange = (subfilter, e) => {
    if (e.target.checked) {
      addFilter(subfilter);
    } else {
      removeFilter(subfilter);
    }
  };

  const FilterListItem = ({filter}) => (
    <div className="filter" key={filter.id}>
      <p>{filter.filterName}</p>
      <ul>
        {
          filter.subfilters.map( subfilter => {
            return <li className="subfilter-list-item" key={subfilter.id}>
                    <input type="checkbox" onClick={handleChange.bind(this, subfilter)}></input>
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
