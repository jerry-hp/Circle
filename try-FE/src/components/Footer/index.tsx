import { Box, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <div>
      <Box position="relative" bg="#403d39" boxSizing="border-box" p="10px" borderRadius="20px">
        <Text color="white" fontSize="13px" fontWeight="semibold" textAlign="justify">
          About ▫ Help ▫ Press ▫ Api ▫ Jobs ▫ Locations ▫ Language{" "}
        </Text>
        <Text color="grey" fontSize="13px">
          @2023 Privacy Terms Cookies Policy
        </Text>
      </Box>
    </div>
  );
}
