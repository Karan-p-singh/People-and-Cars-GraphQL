import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { Form, Input, Button } from "antd";

import { v4 as uuidv4 } from "uuid";

import { ADD_CAR, GET_CARS } from "../../queries";

import { Select } from "antd";

const { Option } = Select;

const AddCar = (props) => {
  const [addCar] = useMutation(ADD_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id: uuidv4(),
        year: Number(year),
        make,
        model,
        price: Number(price),
        personId,
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_CARS });
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
      refetchQueries: [{ query: GET_CARS }],
    });
  };

  return (
    <Form
      form={form}
      name='add-car-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: "40px" }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: "Please input an year!" }]}
      >
        <Input
          placeholder='i.e. 2022'
          type={"number"}
          min='1900'
          max='2099'
        />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: "Please input the car make!" }]}
      >
        <Input placeholder='i.e. BMW' />
      </Form.Item>
      <Form.Item
        name='model'
        rules={[{ required: true, message: "Please input the car model!" }]}
      >
        <Input placeholder='i.e. M3' />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <Input
          placeholder='i.e 110000'
          type={"number"}
          min={0.0}
          step={1.0}
        />
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: "Please choose an owner!" }]}
      >
        <Select style={{ width: 150 }}>
          {props.people.map((person) => (
            <Option
              key={person.id}
              value={person.id}
            >
              {person.firstName + " " + person.lastName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddCar;
