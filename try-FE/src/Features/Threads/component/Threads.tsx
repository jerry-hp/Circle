import { Text, Image, Box, Button, Heading, Input } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { useState } from "react";
import { useThread } from "../hooks/useThread";
import { LuImagePlus } from "react-icons/lu";
import Formstatus from "./formThread";

// threadsType
export default function Threads() {
  const [detailIndex, setDetailIndex] = useState<number | null>(null); // Melacak thread mana yang ingin ditampilkan detailnya

  const toggleDetail = (index: number) => {
    if (index === detailIndex) {
      setDetailIndex(null); // Menutup detail jika thread yang sama diklik
    } else {
      setDetailIndex(index);
    }
  };

  const { threadData, handlePostReply, handleImageReply, handleContentReply, handleLike, idUser } = useThread();
  console.log({ threadData });

  return (
    <>
      <Box boxSizing="border-box" p="10px">
        <Text color="white" mb="10px">
          Home
        </Text>
        <Formstatus />
      </Box>
      {threadData &&
        threadData.map((item: any, key: any) => (
          <Box boxSizing="border-box" p="0px 15px" key={key}>
            <hr />
            <Box boxSizing="border-box" p="10px 0" display="flex" gap="1rem">
              <Image src={item.user.profile_picture && item.user.profile_picture} w="30px" h="30px" borderRadius="50px" />
              <div style={{ width: "100%", color: "white" }}>
                <Text color="white">
                  {item.user.full_name} <span style={{ color: "grey" }}>@{item.user.username}</span>
                </Text>
                <Text fontSize="13px" color="white">
                  {item.content}
                </Text>
                {item.image && <Image src={item.image} display="inline-block" w="100%" h="400px" borderRadius="10px" border="1px solid white" />}

                <Box display={"flex"} gap="1rem" color="white">
                  <Button variant={"unstyled"} onClick={() => handleLike(item.id)} display="flex" alignItems="center" gap="8px">
                    <FaHeart color={item.like.some((like: any) => like.user.id === idUser) ? "red" : "white"} />
                    {item.like.length}
                  </Button>
                  <Text display="flex" alignItems="center" gap="8px">
                    <button onClick={() => toggleDetail(key)}>
                      <BiCommentDetail />
                    </button>
                    {item.replies.length} Replies
                  </Text>
                </Box>

                {/* detail replies */}
                {detailIndex === key && (
                  <Box>
                    <Box display="flex" gap="1rem" alignItems="center">
                      <Input w="95%" variant={"unstyled"} color={"white"} placeholder="comment here..." border="none" name="content" onChange={handleContentReply} />
                      <Button position={"relative"} variant="unstyled" fontSize="100%">
                        <Input type="file" position={"absolute"} top="0" left="0" right="0" bottom="0" zIndex={2} opacity={0} name="image" onChange={handleImageReply} />
                        <LuImagePlus color="#008000" />
                      </Button>
                      <Button variant="solid" bg="#008000" color="white" borderRadius="10px" display="flex" onClick={() => handlePostReply(item.id)}>
                        Send
                      </Button>
                    </Box>
                    {/* commentar orang */}
                    {item.replies &&
                      item.replies.map((item: any) => (
                        <Box display="grid" gridTemplateAreas="'foto nama''foto isiComment''foto image'" gridTemplateColumns="1fr 15fr" gridTemplateRows="max-content max-content max-content">
                          <Box gridArea="foto" display="flex" alignItems="start">
                            <Image src={item.user.profile_picture} w="30px" h="30px" borderRadius="50px" />
                          </Box>
                          <Heading gridArea="nama" fontSize="medium">
                            {item.user.full_name}
                          </Heading>
                          <Text gridArea="isiComment" color="white">
                            {item.content}
                          </Text>
                          {item.image && <Image src={item.image} w="150px" h="150px" gridArea="image" borderRadius="10px" />}
                        </Box>
                      ))}
                  </Box>
                )}
              </div>
            </Box>
          </Box>
        ))}
    </>
  );
}
