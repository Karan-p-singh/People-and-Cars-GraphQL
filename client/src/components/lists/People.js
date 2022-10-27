import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";

import { List } from "antd";
import Person from "../listItems/Person";

const getStyles = () => ({
  list: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
});

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      style={styles.list}
    >
      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <Person
            id={id}
            firstName={firstName}
            lastName={lastName}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default People;
