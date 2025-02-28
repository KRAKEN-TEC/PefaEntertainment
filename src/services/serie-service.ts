import apiPefa from "./api-pefa";
import replaceSpacesWithUnderscore from "@/helper/replace-spaces-with-underscore";

export const uploadFile = async (file: File, endpoint: string, mediaId: string, accessToken?: string | null) => {
    // PARAMETERS
    const filePathKey = endpoint.replace(/^\/+/, "") + "/" + mediaId
    const fileNameKey = file.name.toLowerCase().includes(".mp4") ?
        `videos/${replaceSpacesWithUnderscore(file.name)}` :
        `images/${replaceSpacesWithUnderscore(file.name)}`;
    const key = `${filePathKey}/${fileNameKey}`
    const fileType = file.type.split('/')[0]; // Extracts "image" or "video"

    const presignedUrl = await apiPefa.post("/presigned-url/post-url", {
        key: key,
        type: file.type,
    });

    // DEBUG
    console.log("fileNameKey", fileNameKey)
    console.log("key", key)
    console.log("endpoint", endpoint + "/" + mediaId)
    console.log("fileType", fileType)
    console.log("presignedUrl", presignedUrl)

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

export async function createDocument(endpoint: string, payload: any, accessToken: string | null) {
    // PARAMETERS
    let { poster, video, ...rest } = payload;
    let data = {
        ...rest,
        ...(poster && { posterKey: "" }), // pending in backend
        ...(video && { videoKey: "" }), // pending in backend
    };

    // CREATE DOCUMENT
    const response = await apiPefa.post(endpoint, data, {
        headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    // UPLOADING PROCESS
    const mediaId = response.data?._id || response.data?.seasonNumber || response.data?.episodeNumber
    if (payload.poster) await uploadFile(payload.poster, endpoint, mediaId, accessToken);
    if (payload.video) await uploadFile(payload.video, endpoint, mediaId, accessToken);
}

export async function updateDocument(endpoint: string, id: string, data: any, accessToken: string | null) {
    await apiPefa.put(`${endpoint}/${id}`, data, {
        headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json", // set content type to json
        },
    });
}

export async function deleteDocument(endpoint: string, id: string, accessToken: string | null) {
    await apiPefa.delete(`${endpoint}/${id}`, {
        headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    })
}