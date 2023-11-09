import { Box, Image, Input, Button } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useThread } from "../hooks/useThread";

export default function Formstatus() {
  const pp = useSelector((state: any) => state.auth.profile_picture);

  const { thread, handleContent, handleImage, handlePost } = useThread();

  return (
    <div>
      <Box display="flex" gap="1rem" alignItems="center">
        <Image src={pp} borderRadius="50%" w="30px" h="30px" />
        <Input w="80%" variant={"unstyled"} color={"white"} placeholder="What is happening?" border="none" name="content" onChange={handleContent} value={thread.content} />
        <Button position={"relative"} variant="unstyled" fontSize="200%">
          <Input type="file" position={"absolute"} top="0" left="0" right="0" bottom="0" zIndex={2} opacity={0} name="image" onChange={handleImage} />
          <LuImagePlus color="#008000" />
        </Button>
        <Button variant="solid" bg="#008000" color="white" borderRadius="10px" onClick={handlePost}>
          Post
        </Button>
      </Box>
    </div>
  );
}
