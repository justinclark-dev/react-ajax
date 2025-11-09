const DimensionsDisplay = (props) => {

  const {width, height} = props;
  return (
    <p>Screen width: {width}px, Screen height: {height}px</p>
  );

};

export default DimensionsDisplay;