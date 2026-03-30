import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

type FormData = {
  name: string;
  age: number;
  contry: string;
};

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error("UserContext is undefined");
  const { login } = userContext;

  const onSubmit = (data: FormData) => {
    login(data.name, data.age, data.contry);
  };

  return (
  <FormWrapper onSubmit={handleSubmit(onSubmit)}>
    <Title>Sliding Puzzle Game</Title>
    <Input
      placeholder="Name" maxLength={10}
      {...register("name", { required: "Name is required" })}
    />
    {errors.name ? (
      <ErrorMessage>{errors.name.message}</ErrorMessage>
    ) : null}
    <Input
      type="number"
      min={1} max={120} placeholder="Age"
      {...register("age", { valueAsNumber: true })}
    />
    <Input
      placeholder="Contry" maxLength={13}
      {...register("contry")}
    />
    <SubmitButton type="submit">
      Login
    </SubmitButton>
  </FormWrapper>
);
};

export default LoginPage;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 20rem;
  padding: 2rem;
  border-radius: 0.75rem;
  background-color: yellow;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  text-align: center;
  color: red;
`;

const Input = styled.input`
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 0.4rem;
  border: 0.1rem solid red;
  color: red;

  &:focus {
    outline: none;
    border: 0.2rem solid red;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: -1rem;
`;

const SubmitButton = styled.button`
  padding: 0.6rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.4rem;
  border: none;
  background-color: red;
  color: yellow;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;