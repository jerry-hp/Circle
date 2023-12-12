import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { FaHome, FaSearch, FaHeart } from "react-icons/fa";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { AUTH_LOGOUT } from "../../store/rootReducer";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(AUTH_LOGOUT());
    // dispatch(AUTH_ERROR())
    navigate("/login");
  }

  return (
    <div>
      <Box
        color="white"
        backgroundColor={{ base: "#008000", lg: "transparent" }}
        boxSizing="border-box"
        p="10px 25px"
        display={"flex"}
        justifyContent={{ base: "center", lg: "start" }}
        flexDirection={{ base: "row", lg: "column" }}
        gap={{ base: "2rem", lg: "1rem" }}
        position={{ lg: "fixed" }}
        minH={{ lg: "100vh" }}
      >
        <Heading mb={{ lg: "1rem" }} color="#008000" display={{ base: "none", lg: "flex" }} size={{ base: "xl", lg: "4xl" }}>
          circle
        </Heading>
        <Text display={"flex"} flexDirection={{ base: "column", lg: "row" }} alignItems={"center"} gap={{ base: 0, lg: "10px" }} onClick={() => navigate("/")} cursor={"pointer"}>
          <FaHome /> Home
        </Text>
        <Text display={"flex"} flexDirection={{ base: "column", lg: "row" }} alignItems={"center"} gap={{ base: 0, lg: "10px" }} onClick={() => navigate("/search")} cursor={"pointer"}>
          <FaSearch />
          Search
        </Text>
        <Text display={"flex"} flexDirection={{ base: "column", lg: "row" }} alignItems={"center"} gap={{ base: 0, lg: "10px" }} onClick={() => navigate("/follows")} cursor={"pointer"}>
          <FaHeart />
          Follows
        </Text>
        <Text display={"flex"} flexDirection={{ base: "column", lg: "row" }} alignItems={"center"} gap={{ base: 0, lg: "10px" }} onClick={() => navigate("/profile")} cursor={"pointer"}>
          <CgProfile />
          Profile
        </Text>
        <Button display={{ base: "none", lg: "flex" }} mt="1rem" variant={"unstyled"} bg="#008000" p="10px 60px" borderRadius={"40px"}>
          Create Post
        </Button>
        <Button position="absolute" left={{ md: "3px" }} bottom="2%" display={{ base: "none", md: "flex" }} alignItems="center" variant={"unstyled"} p="10px 60px" onClick={handleLogOut}>
          <CgLogOut />
          Log Out
        </Button>
      </Box>
    </div>
  );
}
