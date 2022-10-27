const getStyles = () => ({
  title: {
    fontSize: 50,
    padding: "0.3rem",
    marginBottom: "1.5rem",
    border: "1px solid #e8e8e8",
    borderRadius: "30%",
  },
});

const Title = (props) => {
  const styles = getStyles();

  return <h1 style={styles.title}>{props.title || "People & their Cars"}</h1>;
};

export default Title;
