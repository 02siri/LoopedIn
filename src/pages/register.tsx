import { useRef, useState } from "react";
import { Button, Input, FormControl, FormLabel, Box, Text, Heading, InputGroup, InputRightElement, Flex, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { motion , useInView } from "framer-motion";

function PasswordInput({value, onChange} : {value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void}) {
  const [show, setShow] = useState(false); // State to toggle password visibility
  const toggleShow = () => setShow(!show); // Toggle function
  return (
     <InputGroup size='md'>
       <Input
       name = "password"
        placeholder="Enter your password"
         pr='4.5rem' 
         type={show ? 'text' : 'password'} // Conditionally show as text or password
         focusBorderColor = "blue.400"
         value={value}
         onChange={onChange}
         color = "white"
         bg = "transparent" 
         rounded = "md"
       />
       <InputRightElement width='4.5rem'>
         <Button h='1.75rem' size='sm' onClick={toggleShow}>
           {show ? 'Hide' : 'Show'}
         </Button>
       </InputRightElement>
     </InputGroup>
   );
 };

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(""); // General error message
  const router = useRouter();
  const registerRef = useRef(null);
  const isInView = useInView(registerRef, {once:true});


  // Real-time email validation
  const validateEmail = (email: string) => {
    if (!/^s3\d{7}@student\.rmit\.edu\.au$/.test(email)) {
      setEmailError("Email must be a valid RMIT student email address");
    } else {
      setEmailError(""); // Clear error when valid
    }
  };

  // Validate username (must end with a digit)
  const validateUsername = (username: string) => {
    if (!/^\w+\d$/.test(username)) {
      setUsernameError("Username must end with a digit");
    } else {
      setUsernameError(""); // Clear error when valid
    }
  };

  // Validate password (must be 6 digits)
  const validatePassword = (password: string) => {
    if (!/^\d{6}$/.test(password)) {
      setPasswordError("Password must be exactly 6 digits");
    } else {
      setPasswordError(""); // Clear error when valid
    }
  };

  // Handle registration process
  const handleRegister = async () => {
    if (!email || !username || !password) {
      setError("All fields are required");
      return;
    }

    // If there are any field errors, stop the registration process
    if (emailError || usernameError || passwordError) {
      return;
    }

    const res = await fetch("https://zvfepj8ed1.execute-api.us-east-1.amazonaws.com/Prod-register/registerHandler-music", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await res.json();
    if (data.success) {
      router.push("/login"); // Redirect to login page
    } else {
      setError(data.message);
    }
  };
  return (
    <>
    {/* Full Screen Motion Container with initial fade-in animation */}
    <motion.div
      initial = {{ opacity: 0}}
      animate ={{opacity: 1}}
      transition = {{duration: 1}}
      className="min-h-screen flex relative text-white bg-black overflow-hidden"
    >
    {/*Background image */}

    <Box display="flex" width="100%" height="100vh" zIndex="10">
      {/* Left 60% - Image */}
      <Box width="70%" position="relative">
        <img
          src="/registerBG.jpg"
          alt="Background"
          className="w-[1700px] md:w-[90%] lg:w-[100%] h-full object-contain object-center"
        />
      </Box>
   
    {/*Brand - Top Left */}
    <Box position="absolute" top="4" left="6" zIndex="20">
      <Heading as="h1" size="2xl" color="white" fontWeight="bold">LoopedIn</Heading>
    </Box>

    <Box
    width="40%"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    padding="8"
    bg="rgba(0, 0, 0, 0.6)"
    backdropFilter="blur(5px)"
  >
      <Box width="100%" maxW="md">
        {/*Register Card Motion*/}
        <motion.div
            ref = {registerRef}
            initial = {{ opacity: 0, y: 50}}
            animate ={isInView? {opacity: 1, y: 0} : {}}
            transition = {{duration: 1, ease: "easeOut"}}
            className="relative z-10 p-10 rounded-2xl shadow-2xl w-full max-w-lg bg-gradient-to-r from-pink-800 to-blue-600 text-white"
        >
        <Flex direction = {{base: "column", md: "row"}} >
        <Box width="200%" maxWidth="400px" margin="0 auto" padding={4}>
          <motion.div
            initial = {{ opacity: 0, x: 30}}
            animate ={{opacity: 1, x: 0}}
            transition = {{delay: 0.7, duration: 0.8}}
          >
       <Heading as = "h2" size = "lg" color = "white" textAlign = "center" mb= {6}>Register</Heading> 
      <FormControl isInvalid={!!emailError} isRequired>
        <FormLabel color = "white" fontWeight = "bold" fontSize="xl">Email</FormLabel>
        <Input
          type="email"
          focusBorderColor = "blue.400"
          bg = "transparent"
          color = "white"
          rounded = "md"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
        />
        {emailError && <Text color="white" mt={1} fontSize="sm">{emailError}</Text>}
      </FormControl>

      <FormControl isInvalid={!!usernameError} isRequired>
        <FormLabel color = "white" fontWeight = "bold" fontSize="xl">Username</FormLabel>
        <Input
          type="text"
          focusBorderColor = "blue.400"
          bg = "transparent"
          color = "white"
          rounded = "md"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            validateUsername(e.target.value); // Validate username on input change
          }}
        />
        {usernameError && <Text color="white" mt={1} fontSize="sm">{usernameError}</Text>}
      </FormControl>

      <FormControl isInvalid={!!passwordError} isRequired>
        <FormLabel color = "white" fontWeight = "bold" fontSize="xl">Password</FormLabel>
        <PasswordInput
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value); // Validate password on input change
          }}
        />
        {passwordError && <Text color="white" mt={1} fontSize="sm">{passwordError}</Text>}
      </FormControl>
      <Flex justify="center" mt={4}>
          <motion.div
          whileHover= {{scale: 1.03}} // Slightly enlarge on hover
          whileTap = {{scale: 0.97}} // Slightly shrink on click
          style = {{display: "flex", justifyContent: "center", width:"100%"}}
        >
      <Button 
      position= "relative" 
      overflow = "hidden"
      bgGradient="linear(to-r, #7e0e92, #920e5f)" // Gradient background
      _hover={{
      bgGradient:"linear(to-r, #920e5f, #7e0e9)", // Reverse gradient on hover
      }}
      color="white"
      fontWeight="semibold"
      className="group cursor-pointer"
      type = "submit" 
      width = "50%" 
      size = "lg" 
      mt={4} 
      rounded="full"
      onMouseUp={(e) => (e.currentTarget.style.cursor = "pointer")}
      onClick={handleRegister}
      >
       {/* Background animation layer */}
       <span className ="absolute inset-0 bg-gradient-to-r from-[#7e0e92] to-[#920e5f] transition-all duration-300 group-hover:from-[#920e5f] group-hover:to-[#7e0e92] rounded-full"></span>
           {/* Button text layer */}
      <span className="relative z-10">Register</span> 
      </Button>
      </motion.div>
      </Flex>
      {error && <Text color="red.500">{error}</Text>}
    {/*Sign-In Link */}
     <Text color="white" mt={6} textAlign="center">
       Already a Looper?{" "}
      <Link href="/login" color="purple.200" fontWeight="bold" textDecor="underline">
        Sign In! 
       </Link>
      </Text> 
    </motion.div>
    </Box>
    </Flex>
    </motion.div>
    </Box>
    </Box>
    </Box>
    </motion.div>
  </>
  );
};


export default Register;
