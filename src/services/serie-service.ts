import apiPefa from "./api-pefa";

export const uploadFile = async (file: File, document: string) => {
    const presignedUrl = await apiPefa.post("/presigned-url/post-url", {
        name: `${document}/${file.name}`,
        type: `${document}/${file.type}`,
    });

    await fetch(presignedUrl.data.url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
    });
};

export async function createDocument(endpoint: string, document: string, payload: any, accessToken: string | null) {
    let { poster, video, ...rest } = payload;

    let data = {
        ...rest,
        ...(poster && { posterName: poster.name }),
        ...(video && { videoName: video.name }),
    };

    await apiPefa.post(endpoint, data, {
        headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (payload.poster) await uploadFile(payload.poster, document);
    if (payload.video) await uploadFile(payload.video, document);
}

export async function deleteDocument(endpoint: string, id: string, accessToken: string | null) {
    await apiPefa.delete(`${endpoint}/${id}`, {
        headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    })
}

export async function updateDocument(endpoint: string, id: string, data: any, accessToken: string | null) {
    await apiPefa.put(`${endpoint}/${id}`, data, {
        headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json", // set content type to json
        },
    });
}