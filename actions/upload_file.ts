"use server";

// Use server action always

export const uploadFileAction = async (file: File) => {
    // get file size, type and name
    const fileSize = file.size;
    const fileType = file.type;
    const fileName = file.name;

    // log file information
    console.log('Uploading file...');

    return {
        fileSize,
        fileType,
        fileName
    }
}