import { Heading, HStack, Spinner } from "native-base"

export const AuthSpinner = ()=>{
    return (
        <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
                Processing, Please wait
            </Heading>
        </HStack>
    )
}