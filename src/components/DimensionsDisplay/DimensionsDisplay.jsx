const DimensionsDisplay = (props) => {

  const {width, height} = props;
  return (
    <div className='dimensionsDisplay'>Screen width: {width}px, Screen height: {height}px</div>
  );

};

export default DimensionsDisplay;