import { FormControl, Input, Heading, Button, FormHelperText, InputRightElement, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function FormLogin() {
  const [isShow, setIsShow] = useState(false);

  const { handleChange, handleLogin } = useLogin();
  return (
    <div style={{ width: "100%", backgroundColor: "#343a40", minHeight: "100vh", display: "Flex", alignItems: "center" }}>
      <FormControl w="40%" boxSizing="border-box" p="15px" m="0 auto" display="flex" flexDirection="column" gap="1rem">
        <Heading color="green" fontSize="6xl" textAlign="center">
          circle
        </Heading>
        <Heading fontSize="large" color="white">
          Login
        </Heading>
        <Input color="white" type="email" placeholder="Email" id="email" name="email" onChange={handleChange} />
        <InputGroup>
          <Input color="white" type={isShow ? "text" : "password"} id="Password" placeholder="Password" name="password" onChange={handleChange} />
          <InputRightElement mr="10px">
            <Button mr="10px" variant="unstyled" color="white" onClick={() => setIsShow(!isShow ? true : false)}>
              {!isShow ? "show" : "hidden"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText color="white" textAlign="end">
          Forgot Password?
        </FormHelperText>
        <Button color="green" onClick={handleLogin}>
          Login
        </Button>
      </FormControl>
    </div>
  );
}
