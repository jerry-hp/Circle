import { Box, Image, Button, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { api } from "../../libs/api/api";
import { useSelector } from "react-redux";

export function SuggestedFollow() {
  const userId = useSelector((state: any) => state.auth.id);
  const { data } = useQuery("users", async () => {
    const res = await api.get("/users");
    return res.data.user;
  });
  const users = data?.filter((item: any, index: number) => item.id != userId && index < 4);
  console.log(users);
  return (
    <>
      <Box position="relative" bg="#403d39" boxSizing="border-box" p="10px" borderRadius="20px">
        <Text color="white" mb="10px">
          Suggested for you
        </Text>
        <Box display="flex" flexDirection="column" gap="15px">
          {users &&
            users.map((item: any) => (
              <Box display="grid" gridTemplateAreas="'image name btn' 'image username btn'" gridTemplateColumns="1fr 4fr 2fr" gridTemplateRows="auto auto" columnGap={1}>
                <Image src={item.profile_picture} gridArea="image" w="40px" h="40px" borderRadius="50%" />
                <Text color="white" gridArea="name">
                  {item.full_name}
                </Text>
                <Text color="grey" fontSize="13px" gridArea="username">
                  {item.username}
                </Text>
                <Button variant="outline" color="white" gridArea="btn">
                  Follow
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
}
