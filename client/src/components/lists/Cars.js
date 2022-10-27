import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CARS } from "../../queries";

import { List } from "antd";
import Car from "../listItems/Car";

const getStyles = () => ({
  list: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
});

const Cars = (props) => {
  // eslint-disable-next-line
  const [people, setPeople] = useState(props.people);
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS);
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
      {data.cars.map(({ id, year, make, model, price, personId }) => (
        <List.Item key={id}>
          <Car
            key={id}
            id={id}
            year={year}
            make={make}
            model={model}
            price={price}
            personId={personId}
            people={people}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default Cars;
