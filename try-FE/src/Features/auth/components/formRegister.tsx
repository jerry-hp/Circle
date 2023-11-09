import { FormControl, Input, Heading, Button, FormHelperText, Text, InputRightElement, InputGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

export default function FormRegister() {
  const [isShow, setIsShow] = useState(false);
  const { handleChange, handleRegister } = useRegister();

  return (
    <div style={{ width: "100%", backgroundColor: "#343a40", minHeight: "100vh", display: "Flex", alignItems: "center" }}>
      <FormControl w="40%" boxSizing="border-box" p="15px" m="0 auto" display="flex" flexDirection="column" gap="1rem">
        <Heading color="green" fontSize="6xl" textAlign="center">
          circle
        </Heading>
        <Heading fontSize="large" color="white">
          Register
        </Heading>
        <Input type="Text" color="white" name="username" placeholder="User name" onChange={handleChange} />
        <Input type="Text" color="white" name="full_name" placeholder="Full name" onChange={handleChange} />
        <Input type="email" color="white" name="email" placeholder="Email" onChange={handleChange} />
        <InputGroup size="md">
          <Input type={isShow ? "text" : "password"} color="white" name="password" placeholder="Password" onChange={handleChange} />
          <InputRightElement width="4.5rem">
            <Button variant="unstyled" color="white" onClick={() => setIsShow(!isShow ? true : false)}>
              {isShow ? "hidden" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button color="green" onClick={handleRegister}>
          Create an account
        </Button>
        <FormHelperText color="white" display="flex" gap="1rem">
          Already have an account?
          <Link to="/login">
            <Text color="green">Login</Text>
          </Link>
        </FormHelperText>
      </FormControl>
    </div>
  );
}
