import { Box, Button, Card, Flex, Heading } from "@radix-ui/themes";
// import Image from 'next/image';
import Link from "next/link";

export default async function Home() {

  return (
    <Flex justify={"center"} align={"stretch"}  >
      <Card className="w-5xl">
        <Flex direction='column' align={"center"} m='4'>
          <Heading size={'8'} mb='5'>
            Create, edit, and manage your tasks!
          </Heading>
          <Box className="m-5 mb-10">
            {/* <Image src={"/static/projectManagerDashboard.png"} alt={""} width={1000} height={100} priority={true} /> */}
          </Box>

          <p className="mb-2">Manage your project with Project Manager</p>
          <Link href="/api/auth/signin">
            <Button size={'4'}>
              Sign Up
            </Button>
          </Link>
        </Flex>
      </Card>
    </Flex>

  );
}

