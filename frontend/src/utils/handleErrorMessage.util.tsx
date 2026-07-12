import { toast } from "react-hot-toast";

export default function handleErrorMessage(error: unknown, location: string) {
    let message = ""
    if (typeof error === "object" && error !== null && "response" in error) {
        const response = (error as { response?: unknown }).response as { data?: unknown } | undefined;
        if (
            response?.data &&
            typeof response.data === "object" &&
            response.data !== null &&
            "message" in response.data
        ) {
            message = String((response.data as { message?: unknown }).message);
        }
    }
    else if (error instanceof Error) {
        message = error.message;
    }
    else{
        message = "An unexpected error occurred";
    }

    toast.error(message);
    console.error(`Error in ${location}:`, error);
};