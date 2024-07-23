export const generateExpirationUrls = async (files: File[], numberOfExpiryDays: number) => {

    const fileDetails = Array.from(files).map(file => ({
        fileName: file.name,
        fileType: file.type,
    }));

    try {
        const expirationUrls = await fetch(`https://ailaerv7qgh6foxxliowfch6zq0magxe.lambda-url.us-east-1.on.aws/`,{
            method: 'POST',
            body: JSON.stringify({ files: fileDetails, days: numberOfExpiryDays })
        });

        if (!expirationUrls.ok) {
            const errorText = await expirationUrls.text();
            console.error("Lambda function error:", errorText);
            throw new Error(`HTTP error! status: ${expirationUrls.status}`);
        }

        return await expirationUrls.json();

    } catch (error) {   
        console.error("Error in generateExpirationUrls:", error);
        console.log("error", error);
    }
}