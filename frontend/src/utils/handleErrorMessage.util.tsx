import { toast } from "react-hot-toast";

function instanceOfError (error : Error) {
        if (error.message.includes("Network Error")) {
            return "Network Error, check your internet connection and try again";
        } else if (error.message.includes("status code 413")) {
            return "File size too large";
        } else {
            return error.message;
        }
}

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
            console.log("response data", response.data);
            message = String((response.data as { message?: unknown }).message);
        } else if (error instanceof Error) {
            message = instanceOfError(error);
        }
    }
    else if (error instanceof Error) {
        instanceOfError(error);
    } else {
        message = "An unexpected error occurred";
    }

    toast.error(message);
    console.error(`Error in ${location}:`, error);
};