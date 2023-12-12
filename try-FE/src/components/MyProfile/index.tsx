import { Box, Image, Button, Text, Input, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../libs/api/api";
export function MyProfile({ Hphoto }: { Hphoto: string }) {
  const dataProfil = useSelector((item: any) => item.auth);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({
    username: "",
    full_name: "",
  });
  const [editedData, setEditedData] = useState({
    username: "",
    full_name: "",
  });

  const handleEditProfile = async () => {
    const response = await api.patch(`/user/${dataProfil.id}`, dataEdit);
    response && setEditedData(response.data);
  };

  return (
    <>
      <Box position="relative" bg="#403d39" boxSizing="border-box" p="10px" borderRadius="20px">
        <Text color="white" mb="10px">
          My Profile
        </Text>
        <Image src={"https://img.freepik.com/free-photo/flag-indonesia_1401-133.jpg?size=626&ext=jpg&ga=GA1.1.1818359700.1701086645&semt=ais"} w="100%" h="80px" height={Hphoto} borderRadius="10px" />
        <Image src={dataProfil.profile_picture} borderRadius="50%" w="60px" h="60px" m="0 20px" position="absolute" top={Hphoto ? "170px" : "100px"} border="5px solid #403d39" />
        <Box display="flex" justifyContent="end" mt="1rem">
          {Hphoto ? (
            <Button
              variant="outline"
              borderRadius="20px"
              color="white"
              h="25px"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              Edit Profil
            </Button>
          ) : (
            <Button
              variant="outline"
              borderRadius="20px"
              color="white"
              h="30px"
              onClick={() => {
                navigate("/profile");
              }}
            >
              See Details
            </Button>
          )}
        </Box>
        <Text color="white" fontSize="20px">
          {editedData.full_name ? editedData.full_name : dataProfil.full_name}
        </Text>
        <Text fontSize={"10px"} color="#ccc5b9" mb="8px">
          @{editedData.username ? editedData.username : dataProfil.username}
        </Text>
        <Text color="white" fontSize="15px" mb="8px">
          {dataProfil.profile_description}
        </Text>
        <Box display="flex" gap="1rem" color="white" fontSize="12px" mb="8px">
          {/* <Text>291 Following</Text>
          <Text>31 Followers</Text> */}
        </Box>
        {isEdit && (
          <Stack spacing={3}>
            <Input variant="outline" placeholder="Edit full name" color={"white"} onChange={(e) => setDataEdit({ ...dataEdit, full_name: e.target.value })} />
            <Input variant="outline" placeholder="Edit user name" color={"white"} onChange={(e) => setDataEdit({ ...dataEdit, username: e.target.value })} />
            <Button color="#008000" variant={"outline"} w={"100px"} ml="auto" onClick={handleEditProfile}>
              Save
            </Button>
          </Stack>
        )}
      </Box>
    </>
  );
}
