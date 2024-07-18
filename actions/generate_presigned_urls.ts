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

        return await preSignedUrls.json();

    } catch (error) {   
        console.log("error", error);
    }
}