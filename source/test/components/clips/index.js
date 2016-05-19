import React from 'React';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';
import clip from 'components/clips';

const Clip = clip(React);
const render = reactDom.renderToStaticMarkup;

test('Clip', nest => {
  nest.test('...clip', assert => {
    const msg = 'Clip should render the clip section.';

    const el = <Clip />;
    const $ = dom.load(render(el));

    const output = $('.clips').length;

    const actual = output > 0;

    const expected = true;

    assert.equal(actual, expected, msg);

    assert.end();
  });

  nest.test('...clip', assert => {
    const msg = 'clips should render list of images';

    const props = [
      {
        id: 1,
        src: {
          480: 'https://s3.amazonaws.com/film.dev.testing/fs/files/staging/clip_th/11932/2-480.yAFPjJlVCb7iHoo3TaI3ZZAaXXXxz7Ss05KjoT7o.jpg'
        }
      }
    ];

    const el = <Clip clips={props}/>;

    const $ = dom.load(render(el));
    const output = $('.clips').find('img').length;

    const actual = output > 0;

    const expected = true;

    assert.deepEqual(actual, expected, msg);

    assert.end();
  });
});
