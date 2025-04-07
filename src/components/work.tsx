import {type classroom_v1} from "@googleapis/classroom/v1"

export default function Work(props: { work: classroom_v1.Schema$CourseWork,"data-index":number }) {
    return (
        <div data-index={props["data-index"]} class="post" style={{border:"1px solid #ccc", padding: "10px", margin: "10px 0","content-visibility": "auto"}}>
            <h3>{props.work.title}</h3>
            <p>{props.work.description}</p>
            {props.work.materials && props.work.materials.map((material) => {
                if (material.driveFile?.driveFile) {
                    return (
                        <div id={material.driveFile.driveFile?.id!}>
                            <a href={material.driveFile.driveFile.alternateLink!} target="_blank" rel="noopener noreferrer">
                                {material.driveFile.driveFile.title}|Gdriveだよ
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
                                {material.youtubeVideo.title}|youtubeだよ
                            </a>
                        </div>
                    );
                }
                return null; // Handle other types or return null if not needed
            })}
            <h4>Meta</h4>
            <div style={{display: "flex", "flex-direction": "row", gap: "15px"}}>
                <p>Course: {props.work.courseId}</p>
                <p>Creator: {props.work.creatorUserId}</p>
                <p>Time: {props.work.creationTime}</p>
            </div>
        </div>
    );
}