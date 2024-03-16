import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, Image, Link, useToast } from "@chakra-ui/react";
import { FaYoutube, FaDownload } from "react-icons/fa";

const Index = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const toast = useToast();

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleDownload = (format) => {
    if (!videoInfo) return;
    const { videoId } = videoInfo;
    const url = format === "mp3" ? `https://example.com/download?videoId=${videoId}&format=mp3` : `https://example.com/download?videoId=${videoId}`;
    window.open(url, "_blank");
  };

  const fetchVideoInfo = async () => {
    try {
      const videoId = new URL(videoUrl).searchParams.get("v");
      const response = await fetch(`https://example.com/api/video-info?videoId=${videoId}`);
      const data = await response.json();
      setVideoInfo(data);
    } catch (error) {
      toast({
        title: "Invalid YouTube URL",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          <FaYoutube color="red" /> YouTube Downloader
        </Heading>
        <Input value={videoUrl} onChange={handleInputChange} placeholder="Paste YouTube video URL here" size="lg" />
        <Button onClick={fetchVideoInfo} colorScheme="red" size="lg">
          Get Video Info
        </Button>
        {videoInfo && (
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              {videoInfo.title}
            </Heading>
            <Image src={videoInfo.thumbnailUrl} alt={videoInfo.title} />
            <Text mt={4}>{videoInfo.description}</Text>
            <HStack mt={8} spacing={4}>
              <Button leftIcon={<FaDownload />} onClick={() => handleDownload("video")} colorScheme="green">
                Download Video
              </Button>
              <Button leftIcon={<FaDownload />} onClick={() => handleDownload("mp3")} colorScheme="blue">
                Download MP3
              </Button>
            </HStack>
          </Box>
        )}
        <Text textAlign="center">
          By using our service you are accepting our{" "}
          <Link color="blue.500" href="/terms">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link color="blue.500" href="/privacy">
            Privacy Policy
          </Link>
          .
        </Text>
      </VStack>
    </Box>
  );
};

export default Index;
