
const handleImageUpload = (setImageUrl: (base64Image: string | ArrayBuffer | null) => void): void => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
        const target = event.target as HTMLInputElement | null;
        if (target?.files?.[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(target.files[0]);
            reader.onload = async () => {
                const result = reader.result;
                setImageUrl(result);
            };

        }
    }
    input.click();
}

export default handleImageUpload