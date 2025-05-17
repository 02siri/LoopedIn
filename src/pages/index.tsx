import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Box, Button, Flex, Heading, Input, Text, Image, VStack, HStack, Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface MusicSubscription {
  music_album: string;
  music_title: string;
  music_artist: string;
  music_img_url: string;
  music_year: string;
}

interface MusicQuery {
  title: string;
  year: string;
  artist: string;
  album: string;
}

const MainPage = () => {
  const [subscriptions, setSubscriptions] = useState<MusicSubscription[]>([]);
  const [query, setQuery] = useState<MusicQuery>({ title: "", year: "", artist: "", album: "" });
  const [musicResults, setMusicResults] = useState<MusicSubscription[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [querySubmitted, setQuerySubmitted] = useState(false);
  const router = useRouter();

    const handleGetCurrUser = async()=>{
        // Fetch current user's email from the currentUser table via backend
        const storedEmail = sessionStorage.getItem("user_email");

        if (!storedEmail) {
          router.push("/login");
          return;
        }
        const response = await fetch(`https://e6hzm7gxvh.execute-api.us-east-1.amazonaws.com/Prod-getCurrUser/getCurrUser-music?email=${storedEmail}`,
          {
            method: "GET",
            headers:{ "Content-Type": "application/json" },
          }
        );
        const data = await response.json();

        console.log("Fetched User Data:", data.user);

        if(data.success){
          return data.user;
        }else{
          router.push("/login");
          return null;
        }
    }
 
    const fetchCurrentUserNameAndSubs = async () => {

      const currUser = await handleGetCurrUser();
        if (currUser) {
          console.log("User name:", currUser.user_name);
          setUserName(currUser.user_name || "Guest");
          fetchUserSubscriptions(currUser.email);  // Fetch subscriptions for this user
        } else {
          console.error("No user found, redirecting to login.");
          router.push("/login");
        }
    };

    useEffect(() => {
    fetchCurrentUserNameAndSubs();
    }, []);

  const fetchUserSubscriptions = async (email: string) => {
    try {
      const response = await fetch(`https://ek3y3vqtsi.execute-api.us-east-1.amazonaws.com/Prod-fetchSubs/fetchSubs-music?user_email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers:{ "Content-Type": "application/json" },
        });
      const data = await response.json();
      console.log("Fetched User Subscriptions: ", data.subscriptions);

      if (response.ok) {
        setSubscriptions(data.subscriptions || []);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleQuerySubmit = async () => {
    // Check if at least one field is filled
    if (!query.title && !query.year && !query.artist && !query.album) {
      setErrorMsg("At least one of the fields should be filled.");
      return; // Prevent submission
    } else {
      setErrorMsg(""); // Reset error message if query is valid
    }

    try {
      const response = await fetch("https://v9biqgdrye.execute-api.us-east-1.amazonaws.com/Prod-Querymusic/queryHandler-music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });

      if(!response.ok){
        throw new Error("Failed to fetch music data")
      }
      const data = await response.json();
      console.log("Music Query Response:", data);
      setMusicResults(data.music || []);
      setQuerySubmitted(true);

    } catch (error) {
      console.error("Error querying music:", error);
    }
  };

  const handleSubscribe = async (music: MusicSubscription) => {
    try {
      const currUser = await handleGetCurrUser();

      if (!currUser) {
        console.error("User email not found");
        return;
      }
      const userEmail = currUser.email;
      const artistImageUrl = music.music_img_url;

      console.log("Subscribing with data:", {
        user_email: userEmail,
        music_title: music.music_title,
        music_artist: music.music_artist,
        music_year: music.music_year,
        music_album: music.music_album,
        music_img_url: artistImageUrl,
      });
  
      const response = await fetch("https://xuovhgoj44.execute-api.us-east-1.amazonaws.com/Prod-addSubs/addSubs-music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: userEmail,
          music_title: music.music_title,
          music_artist: music.music_artist,
          music_year: music.music_year,
          music_album: music.music_album,
          music_img_url: artistImageUrl,
        }),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error("Subscription Error:", responseData.message);
        alert("Error subscribing to music: " + responseData.message);
        return;
      }
  
      // Add the new subscription to local state to update UI
      setSubscriptions([...subscriptions, {
        ...music,
        music_img_url: artistImageUrl
      }]);
      
      console.log("Subscription successful:", responseData);
    } catch (error) {
      console.error("Error subscribing to music:", error);
      alert("Error subscribing to music. Please try again.");
    }
  };


  const handleRemove = async (music: MusicSubscription) => {
    try {
      const currUser = await handleGetCurrUser(); 
      // const userEmail = await fetchCurrentUser();
      if (!currUser) {
        console.error("User email not found");
        return;
      }
      const userEmail = currUser.email;
      console.log("Deleting subscription with:", {
        user_email: userEmail,
        music_album: music.music_album,
        music_title: music.music_title
      });

      const expectedMusicId = `${music.music_album}_${music.music_title}`;
      console.log("Expected music_id in DynamoDB:", expectedMusicId);


      const response = await fetch("https://lcf3e0yeo7.execute-api.us-east-1.amazonaws.com/Prod_removeSubs/removeSubs-music", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: userEmail,  // Use current user's email
          music_album: music.music_album,
          music_title: music.music_title,
        }),
      });

      const responseData = await response.json();

      console.log("Remove response:", responseData);
      //setSubscriptions(subscriptions.filter((sub) => sub.music_album !== music.music_album || sub.music_title !== music.music_title));
   
      if (response.ok) {
        // Only update UI if server confirms successful deletion
        setSubscriptions(subscriptions.filter(
          (sub) => !(sub.music_album === music.music_album && sub.music_title === music.music_title)
        ));
      } else {
        console.error("Failed to remove subscription:", responseData.message);
        alert("Failed to remove subscription. Please try again.");
      }

    } catch (error) {
      console.error("Error removing subscription:", error);
    }
  };

  const handleLogout = async () => {
    try {

      const currUser = await handleGetCurrUser(); 

      if (!currUser) {
        console.error("No user email found in session");
        return;
      }
      const userEmail = currUser.email;

      const response = await fetch("https://jmmmy3i9i6.execute-api.us-east-1.amazonaws.com/Prod-logout/logoutHandler-music", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }), // Send email for deletion
      });
  
      const data = await response.json();
  
      if (data.success) {
        sessionStorage.clear();
        router.push("/login"); // Redirect to login page after logout
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  

  return (
    <>
    {/* Full Screen Motion Container with initial fade-in animation */}
    <motion.div
      initial = {{ opacity: 0}}
      animate ={{opacity: 1}}
      transition = {{duration: 1}}
      className="min-h-screen flex flex-col justify-center relative text-white bg-black overflow-hidden"
    >
     {/*Background image */}
    <img src="/homeBG.jpeg"
        alt = "Background"
        className = "absolute inset-0 w-full h-full object-cover z-0 blur-md"
      /> 

        {/*Top Header Area */}
    <Box position="relative" p={4} bg="blackAlpha.700" zIndex={10}>
      <Flex justifyContent="space-between" alignItems="center">
      <Heading as="h1" size="2xl" color="white" fontWeight="bold">LoopedIn</Heading>
      <Heading size="lg" color="white">Welcome, {userName}</Heading>
      <Button bg = "red.800" color="white" onClick={handleLogout}>Logout</Button>
      </Flex>
    </Box>

    {/* Main content area with scrollable containers */}
    <Box flex = "1" position="relative" zIndex={10} p={4} overflow="auto">
      <Flex
        direction ={{base:"column", md:"row"}}
        gap={6}
        h={{base:"auto", md: "calc(100vh-120px)"}}
      >
        {/*Left Container - Subscriptions */}
        <Box 
          flex="1"
          p={4} 
          bg="transparent" 
          boxShadow="2xl" 
          borderRadius="lg" 
          overflow="auto"
          maxH={{base:"500px", md:"100%"}}
        >
      <Heading size="md" mb={3} color="white">Your Subscriptions</Heading>
      <Divider borderColor="blackAlpha.700" borderWidth="2px" mb={4} />
      {subscriptions.length > 0 ? (
          <VStack align="stretch" spacing={4} overflow="auto">
            {subscriptions.map((sub) => (
              <Flex 
              key={`${sub.music_album}-${sub.music_title}`} 
              align="center" 
              p={3} 
              bg= "white"
              borderRadius="md"
              gap={4}
              >
              
                <Image src={sub.music_img_url} alt={sub.music_artist} boxSize="50px" borderRadius="md" />
                <Box flex="1" minW="0">
                  <Text fontWeight="bold" color="red.600">{sub.music_title} - {sub.music_artist}</Text>
                  <Text fontSize="sm" color="red.400">{sub.music_album} ({sub.music_year})</Text>
                </Box>
                <Button 
                size="sm" 
                bgGradient="linear(to-r, #f590a3, #db4b65)" // Gradient background
                _hover={{
                bgGradient:"linear(to-r, #db4b65, #f590a3)", // Reverse gradient on hover
                  }}
                  onMouseUp={(e) => (e.currentTarget.style.cursor = "pointer")}
                onClick={() => handleRemove(sub)}>Remove</Button>
                </Flex>
            ))}
          </VStack>
        ) : (
          <Text color="red.500">No subscriptions found.</Text>
        )}
        </Box>

        {/*Right Container - Query */}
        <Box 
          flex="1"
          p={4} 
          bg="transparent" 
          boxShadow="lg" 
          borderRadius="lg" 
          overflow="auto"
          maxH={{base:"500px", md:"100%"}}
        >
          <Heading size="md" mb={3} color="white">Search Music</Heading>
          <Divider borderColor="blackAlpha.700" borderWidth="2px"mb={4} />
          <HStack spacing={3}>
          <Input placeholder="Title" name="title" value={query.title} onChange={handleQueryChange} bg="white" color="black" _hover={{borderColor: "blue.400"}}/>
          <Input placeholder="Year" name="year" value={query.year} onChange={handleQueryChange} bg="white" color="black" _hover={{borderColor: "blue.400"}}/>
          <Input placeholder="Artist" name="artist" value={query.artist} onChange={handleQueryChange} bg="white" color="black" _hover={{borderColor: "blue.400"}}/>
          <Input placeholder="Album" name="album" value={query.album} onChange={handleQueryChange} bg="white" color="black" _hover={{borderColor: "blue.400"}}/>
          <Button 
          bgGradient="linear(to-r,  #f095e1, #c6f5d6)" // Gradient background
          _hover={{
          bgGradient:"linear(to-r, #c6f5d6, #f095e1)", // Reverse gradient on hover
          }}
          onMouseUp={(e) => (e.currentTarget.style.cursor = "pointer")}
          w="full" 
          onClick={handleQuerySubmit}>
          Search
          </Button>
        </HStack>

        {errorMsg && <Text color="red.500" mt={4}>{errorMsg}</Text>}

        {/*Results */}
        {querySubmitted && (
          <Box mt={10} p={4} bg="transparent" borderRadius="lg">
            <Heading size="md" mb={3} color="white">
              Results
            </Heading>
          <Divider borderColor="gray.600" mb={4}/>
          {musicResults.length>0?(
            <VStack spacing={4}>
              {musicResults.map((music,idx)=>(
                <Flex
                key={`${music.music_album}-${music.music_title}-${idx}`}
                align="center"
                bg= "white"
                borderRadius="md"
                p={3}
                gap={4}
                w="full"
                >
                  <Image src={music.music_img_url} alt={music.music_artist} boxSize="60px" borderRadius="md" />
                  <Box flex="1">
                    <Text fontWeight="bold" color="red.600">
                      {music.music_title} - {music.music_artist}
                    </Text>
                    <Text fontSize="sm" color="red.400">
                      {music.music_album} ({music.music_year})
                    </Text>
                  </Box>
                   {/* Check if the music is already subscribed */}
                   {
                  !subscriptions.some(sub => 
                  sub.music_album === music.music_album && sub.music_title === music.music_title
                ) && (
                  <Button 
                  size="sm" 
                  bgGradient="linear(to-r,#fcfc88, #fca7c0)" // Gradient background
                  _hover={{
                  bgGradient:"linear(to-r, #fca7c0, #fcfc88)", // Reverse gradient on hover
                  }}
                  onMouseUp={(e) => (e.currentTarget.style.cursor = "pointer")}
                  onClick={() => handleSubscribe(music)}>Subscribe</Button>
                )}
                  </Flex>
              ))}
            </VStack>
          ):(
            <Text color = "red.500">No result is retrieved. Please query again </Text>
          )}
      </Box>
        )}
      </Box>
      </Flex>
    </Box>
    </motion.div>
    </>
  );
};

export default MainPage;
