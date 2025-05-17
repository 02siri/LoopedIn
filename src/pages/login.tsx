
import { useState, useRef } from 'react';
import { Button, Input, FormControl, FormLabel, Box, Text, InputGroup, InputRightElement, Flex, Heading, Link } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';

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
 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loginRef = useRef(null);
  const isInView = useInView(loginRef, {once:true});

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch("https://4v2a7nlxa5.execute-api.us-east-1.amazonaws.com/Prod1/loginHandler-music", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);
    

    if (response.ok && data.success) {
      const {user_name} = data;
      // Store the logged-in user in currentUser table
      await fetch("https://l212qzr8v0.execute-api.us-east-1.amazonaws.com/Prod-setCurrUser/setCurrUser-music", {
        method: "POST",
        body: JSON.stringify({ email, user_name }),
        headers: { "Content-Type": "application/json" },
      });
  
      sessionStorage.setItem("user_email", email); 
      sessionStorage.setItem("user_name", user_name);
      window.location.href = "/"; 
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
  <>
    {/* Full Screen Motion Container with initial fade-in animation */}
    <motion.div
      initial = {{ opacity: 0}}
      animate ={{opacity: 1}}
      transition = {{duration: 1}}
      className="min-h-screen flex items-center justify-center relative text-white bg-black overflow-hidden"
    >
    {/*Background image */}
    <img src="/loginBG.jpg"
        alt = "Background"
        className = "absolute inset-0 w-full h-full object-cover z-0"
      />

    {/*Brand - Top Left */}
    <Box position="absolute" top="4" left="6" zIndex="20">
      <Heading as="h1" size="2xl" color="white" fontWeight="bold">LoopedIn</Heading>
    </Box>
    {/*Login Card motion */}
      <motion.div
            ref = {loginRef}
            initial = {{ opacity: 0, y: 50}}
            animate ={isInView? {opacity: 1, y: 0} : {}}
            transition = {{duration: 1, ease: "easeOut"}}
            className="relative z-10 p-10 rounded-2xl shadow-2xl w-full max-w-lg bg-[rgba(85,112,249,0.2)] backdrop-blur-md text-white"
        >
      {/*Login Card */}
      <Flex direction = {{base: "column", md: "row"}} >
        <Box width="200%" maxWidth="400px" margin="0 auto" padding={4}>
          <motion.div
            initial = {{ opacity: 0, x: 30}}
            animate ={{opacity: 1, x: 0}}
            transition = {{delay: 0.7, duration: 0.8}}
          >
            <Heading as = "h2" size = "lg" color = "white" textAlign = "center" mb= {6}>Sign In</Heading>     
            <FormControl isRequired>
            <FormLabel color = "white" fontWeight = "bold" fontSize="xl">Email</FormLabel>
            <Input 
              name = "email"
              placeholder="Enter your RMIT email"
              focusBorderColor = "blue.400"
              bg = "transparent"
              color = "white"
              rounded = "md"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handling email input change
              />
            </FormControl>

          <FormControl isRequired mt={4}>
          <FormLabel color = "white" fontWeight = "bold" fontSize="xl">Password</FormLabel>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handling password input change
            />
          </FormControl>

          {error && <Text color="white" mt={2}>{error}</Text>} {/* Show error message */}

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
           onMouseUp={(e) => (e.currentTarget.style.cursor = "pointer")}
           color="white"
           fontWeight="semibold"
           className="group cursor-pointer"
           type = "submit" 
           width = "50%" 
           size = "lg" 
           mt={4} 
           rounded="full"
           
           onClick={()=>handleLogin(email,password)}
          >
                                
          {/* Background animation layer */}
           <span className ="absolute inset-0 bg-gradient-to-r from-[#7e0e92] to-[#920e5f] transition-all duration-300 group-hover:from-[#920e5f] group-hover:to-[#7e0e92] rounded-full"></span>
           {/* Button text layer */}
           <span className="relative z-10">Sign In</span> 
          </Button>
          </motion.div>
        </Flex>
        
        {/*Register Link */}
         <Text color="white" mt={6} textAlign="center">
          New to LoopedIn?{" "}
          <Link href="/register" color="purple.200" fontWeight="bold" textDecor="underline">
          Register Now! 
          </Link>

          </Text> 

          </motion.div>
        </Box>
      </Flex>
      </motion.div>
      </motion.div>
    </>
    );
  };

export default Login;
