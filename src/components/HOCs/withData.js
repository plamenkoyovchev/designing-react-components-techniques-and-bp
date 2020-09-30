const withData = (Component) => {
  const speakers = [
    {
      imageSrc: "speaker-component-1124",
      name: "Douglas Crockford",
    },
    {
      imageSrc: "speaker-component-1530",
      name: "Tamara Baker",
    },
    {
      imageSrc: "speaker-component-10803",
      name: "Eugene Chuvyrov",
    },
  ];

  return () => <Component speakers={speakers}></Component>;
};

export default withData;
