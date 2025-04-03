import {type classroom_v1} from "@googleapis/classroom/v1"

export default function Post(props: { post: classroom_v1.Schema$Announcement,"data-index":number }) {
    return (
        <div data-index={props["data-index"]} class="post" style={{border:"1px solid #ccc", padding: "10px", margin: "10px 0","content-visibility": "auto"}}>
            <p>{props.post.text}</p>
            {props.post.materials && props.post.materials.map((material) => {
                if (material.driveFile?.driveFile) {
                    return (
                        <div id={material.driveFile.driveFile?.id!}>
                            <a href={material.driveFile.driveFile.alternateLink!} target="_blank" rel="noopener noreferrer">
                                {material.driveFile.driveFile.title}
                            </a>
                        </div>
                    );
                }
                if (material.link) {
                    return (
                        <div id={material.link.url!}>
                            <a href={material.link.url!} target="_blank" rel="noopener noreferrer">
                                {material.link.title}
                            </a>
                        </div>
                    );
                }
                if (material.youtubeVideo) {
                    return (
                        <div id={material.youtubeVideo.id!}>
                            <a href={material.youtubeVideo.alternateLink!} target="_blank" rel="noopener noreferrer">
                                {material.youtubeVideo.title}
                            </a>
                        </div>
                    );
                }
                return null; // Handle other types or return null if not needed
            })}
            <h4>Meta</h4>
            <div style={{display: "flex", "flex-direction": "row", gap: "15px"}}>
                <p>Course: {props.post.courseId}</p>
                <p>Creator: {props.post.creatorUserId}</p>
                <p>Time: {props.post.creationTime}</p>
            </div>
        </div>
    );
}