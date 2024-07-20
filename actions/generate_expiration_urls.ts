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

        return await expirationUrls.json();

    } catch (error) {   
        console.log("error", error);
    }
}