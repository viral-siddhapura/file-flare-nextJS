export const generatePresignedUrls = async (files: File[]) => {

    const fileDetails = Array.from(files).map(file => ({
        fileName: file.name,
        fileType: file.type,
    }));

    try {
        const preSignedUrls = await fetch(`https://x5rtytm247jx4zaapzhlzkg4740phtpe.lambda-url.us-east-1.on.aws/`,{
            method: 'POST',
            body: JSON.stringify({ files: fileDetails })
        });

        if (!preSignedUrls.ok) {
            const errorText = await preSignedUrls.text();
            console.error("Lambda function error:", errorText);
            throw new Error(`HTTP error! status: ${preSignedUrls.status}`);
        }

        return await preSignedUrls.json();

    } catch (error) {   
        console.error("Error in generateExpirationUrls:", error);
        console.log("error", error);
    }
}