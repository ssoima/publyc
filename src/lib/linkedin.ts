async function postToLinkedIn(imageFile: any, message: string, accessToken: any, personURN: any) {
    const linkedInAPI = "https://api.linkedin.com/v2";

    try {
        // Step 1: Register the image upload
        const registerUploadResponse = await fetch(`${linkedInAPI}/assets?action=registerUpload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                registerUploadRequest: {
                    owner: personURN,
                    recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
                    serviceRelationships: [
                        {
                            identifier: "urn:li:userGeneratedContent",
                            relationshipType: "OWNER",
                        },
                    ],
                },
            }),
        });

        const registerUploadData = await registerUploadResponse.json();
        const uploadUrl = registerUploadData.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
        const assetId = registerUploadData.value.asset;

        // Step 2: Upload the image
        const uploadResponse = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "image/jpeg", // Change based on the file type
            },
            body: imageFile,
        });

        if (!uploadResponse.ok) {
            throw new Error("Image upload failed.");
        }

        // Step 3: Create the post
        const createPostResponse = await fetch(`${linkedInAPI}/ugcPosts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author: personURN,
                lifecycleState: "PUBLISHED",
                specificContent: {
                    "com.linkedin.ugc.ShareContent": {
                        shareCommentary: {
                            text: message,
                        },
                        shareMediaCategory: "IMAGE",
                        media: [
                            {
                                status: "READY",
                                description: {
                                    text: "Uploaded via API",
                                },
                                media: assetId,
                                title: {
                                    text: "Image Title",
                                },
                            },
                        ],
                    },
                },
                visibility: {
                    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
                },
            }),
        });

        if (!createPostResponse.ok) {
            throw new Error("Post creation failed.");
        }

        const createPostData = await createPostResponse.json();
        console.log("Post created successfully:", createPostData);

        return createPostData;

    } catch (error) {
        console.error("Error posting to LinkedIn:", error);
    }
}