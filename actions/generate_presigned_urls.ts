export const generatePresignedUrls = async (files: File[]) => {
    
    console.log("files : ", files);

    const fileDetails = Array.from(files).map(file => ({
        fileName: file.name,
        fileType: file.type,
    }));

    try {
        const preSignedUrls = await fetch(`https://x5rtytm247jx4zaapzhlzkg4740phtpe.lambda-url.us-east-1.on.aws/`,{
            method: 'POST',
            body: JSON.stringify({ files: fileDetails })
        });

        return preSignedUrls;
    } catch (error) {   
        console.log("error", error);
    }
}