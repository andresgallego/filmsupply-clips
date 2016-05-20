import React from 'React';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';
import filter from 'components/filters';

const Filter = filter(React);
const render = reactDom.renderToStaticMarkup;

test('Filter', nest => {
  nest.test('...filter', assert => {
    const msg = 'Filter should render the filters section.';

    const el = <Filter />;
    const $ = dom.load(render(el));

    const output = $('.filters').length;

    const actual = output > 0;

    const expected = true;

    assert.equal(actual, expected, msg);

    assert.end();
  });

  nest.test('...filter', assert => {
    const msg = 'filter should render list of filters';

    const props = [
      {
        id: 1,
        filterName: 'Age',
        subfilters: [
          {
            id: 67,
            name: 'Baby / Infant'
          }
        ]
      }
    ];

    const el = <Filter filters={props}/>;

    const $ = dom.load(render(el));
    const output = $('.filters').find('.filter').length;

    const actual = output > 0;

    const expected = true;

    assert.deepEqual(actual, expected, msg);

    assert.end();
  });

  nest.test('...filter', assert => {
    const msg = 'filters div should render list of subfilters';

    const props = [
      {
        id: 1,
        filterName: 'Age',
        subfilters: [
          {
            id: 67,
            name: 'Baby / Infant'
          }
        ]
      }
    ];

    const el = <Filter filters={props}/>;

    const $ = dom.load(render(el));
    const output = $('.filter').find('.subfilter-list-item').length;

    const actual = output > 0;

    const expected = true;

    assert.deepEqual(actual, expected, msg);

    assert.end();
  });

  nest.test('...filter', assert => {
    const msg = 'subfilter-list-item should render select list for filters';

    const filterProps = {
      filters: [
        {
          id: 1,
          filterName: 'Age',
          subfilters: [
            {
              id: 19,
              name: 'Toddler (2-4 years old)'
            }
          ]
        },
        {
          id: 2,
          filterName: 'Age',
          subfilters: [
            {
              id: 22,
              name: `20's & 30's`
            }
          ]
        },
        {
          id: 3,
          filterName: 'Ethnicity',
          subfilters: [
            {
              id: 27,
              name: 'Asian'
            }
          ]
        }
      ]
    };

    const el = <Filter { ...filterProps }/>;

    const $ = dom.load(render(el));
    const output = $('input[type="checkbox"]').length;

    const actual = output === 3;

    const expected = true;

    assert.deepEqual(actual, expected, msg);

    assert.end();

  });

  nest.test('...filter', assert => {
    const msg = 'As you select filters with the checkboxes the filter count should increment and decrement';

    const filterProps = {
      selectedFilters: [
        {
          id: 19,
          name: 'Toddler (2-4 years old)'
        },
        {
          id: 22,
          name: `20's & 30's`
        }
      ]
    };

    const el = <Filter { ...filterProps }/>;

    const $ = dom.load(render(el));
    const output = $('filter-counter').text();

    const actual = output === 2;

    const expected = true;

    assert.deepEqual(actual, expected, msg);

    assert.end();

  });

});
