export default React => ({clips}) => {

  const ClipListItem = ({clip}) => (
    <img className='image-list-item' key={clip.id} src={clip.src['480']} />
  );
  return (
    <section className="clips">
      {
        clips ? clips.map(clip => ClipListItem({clip})) : ''
      }
    </section>
  );
};
