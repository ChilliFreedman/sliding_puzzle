import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LOGIN_RULES } from "../utils/constants/login";
import { useUser } from "../contexts/UserContext";


type FormData = {
  name: string;
  age: number;
  country: string;
};

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { login } = useUser();

  const onSubmit = (data: FormData) => {
    login(data.name, data.age, data.country);
  };

  return (
  <FormWrapper noValidate onSubmit={handleSubmit(onSubmit)}>
    <Title>Sliding Puzzle Game</Title>
    <Input
      placeholder="Name" 
      {...register("name", {
        required: "Name is required",
        maxLength: {
          value: LOGIN_RULES.NAME_MAX_LENGTH,
          message: `Name cannot exceed ${LOGIN_RULES.NAME_MAX_LENGTH} characters`
        }
       })}
    />
    <ErrorMessage>
      {errors.name?.message || null}
    </ErrorMessage>
    <Input
      type="number"
      min={LOGIN_RULES.AGE_MIN} 
      max={LOGIN_RULES.AGE_MAX} 
      placeholder="Age"
      {...register("age",
        { valueAsNumber: true,
        required: "Please enter a number",
        min: {
          value: LOGIN_RULES.AGE_MIN,
          message: "Min age is 1"
        },
        max: {
          value: LOGIN_RULES.AGE_MAX,
          message: "Max age is 120"
        }
      })}
    />
    <ErrorMessage>
      {errors.age?.message || null}
    </ErrorMessage>
    <Input
      placeholder="Country" maxLength={LOGIN_RULES.COUNTRY_MAX_LENGTH}
      {...register("country")}
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
  min-height: 1rem;
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