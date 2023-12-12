import { Navbar, MyProfile, SuggestedFollow, Footer } from "../components";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

function Main({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: "100%", backgroundColor: "#343a40", minHeight: "100vh", position: "relative" }}>
      <Box maxW="1366px" m="0 auto" display="flex" flexDirection={{ base: "column", lg: "row" }}>
        <Box w={{ base: "100%", lg: "20%" }} borderRight={{ sm: "none", lg: "1px solid white" }} minH={{ lg: "100vh" }}>
          <Navbar />
        </Box>
        <Box mx={{ base: "auto", lg: "1px" }} w={{ base: "100%", sm: "70%", lg: "50%" }} borderRight={{ base: "none", lg: "1px solid white" }}>
          {children}
        </Box>
        <Box display={{ base: "none", lg: "flex" }} w="30%" boxSizing="border-box" p="10px 15px" position="fixed" top="0" right="0" flexDirection="column" gap="1rem" borderLeft="1px solid white" minH="100vh">
          <MyProfile />
          <SuggestedFollow />
          <Footer />
        </Box>
      </Box>
    </div>
  );
}

export default Main;
