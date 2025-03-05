import apiPefa from "./api-pefa";
import replaceSpacesWithUnderscore from "@/helper/replace-spaces-with-underscore";

export const uploadS3File = async (file: File, endpoint: string, mediaId: string | number, accessToken?: string | null) => {
    // PARAMETERS
    const filePathKey = endpoint.replace(/^\/+/, "") + "/" + mediaId
    const fileNameKey = replaceSpacesWithUnderscore(file.name);
    const key = `${filePathKey}/${fileNameKey}`
    const fileType = file.type.split('/')[0]; // Extracts "image" or "video"

    const presignedUrl = await apiPefa.post("/presigned-url/post-url", {
        key: key,
        type: file.type,
    });

    // // DEBUG
    // console.log("fileNameKey", fileNameKey)
    // console.log("key", key)
    // console.log("endpoint", endpoint + "/" + mediaId)
    // console.log("fileType", fileType)
    // console.log("presignedUrl", presignedUrl)

    // UPLOADING TO S3
    await fetch(presignedUrl.data.url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
    });

    // UPDATING DATABASE
    if (fileType === "image") {
        await apiPefa.put(endpoint + "/" + mediaId, { posterKey: key }, {
            headers: {
                Authorization: `${accessToken}`,
                "Content-Type": "application/json",
            },
        });

    }

    if (fileType === "video") {
        await apiPefa.put(endpoint + "/" + mediaId, { videoKey: key }, {
            headers: {
                Authorization: `${accessToken}`,
                "Content-Type": "application/json",
            },
        });
    }
};

export const deleteS3File = async (mediaUrl: string) => {
    const key = mediaUrl.split("net/")[1];

    const presignedUrl = await apiPefa.post("/presigned-url/delete-url", {
        key: key
    });

    await fetch(presignedUrl.data.url, {
        method: "DELETE",
    });
}

export async function createDocument(endpoint: string, payload: any, accessToken: string | null) {
    // PARAMETERS
    let { poster, video, ...rest } = payload;

    let data = {
        ...rest,
        ...(poster && { posterKey: "" }), // pending in backend
        ...(video && { videoKey: "" }), // pending in backend
    };

    // CREATE DOCUMENT
    await apiPefa.post(endpoint, data, {
        headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
        },
    });
}


export async function updateDocument(endpoint: string, mediaId: string | number, data: any, accessToken: string | null) {
    await apiPefa.put(`${endpoint}/${mediaId}`, data, {
        headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json", // set content type to json
        },
    });
}

export async function deleteDocument(endpoint: string, mediaId: string | number, accessToken: string | null) {
    await apiPefa.delete(`${endpoint}/${mediaId}`, {
        headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    })
}