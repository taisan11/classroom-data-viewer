import { createSignal, createResource, For, Show,Switch, Match } from 'solid-js';
import {type classroom_v1} from "@googleapis/classroom/v1"
import Post from './components/post';
import Work from './components/work';

// Define a type for your data (adjust based on your JSON structure)
type PostJson = classroom_v1.Schema$Announcement
type HumanJson = {
    students:classroom_v1.Schema$Student[],
    teachers:classroom_v1.Schema$Teacher[],
}
type RoomJson = classroom_v1.Schema$Course
type WorkJson = classroom_v1.Schema$CourseWork
type TopicJson = classroom_v1.Schema$Topic

export default function App() {
    const [data, { mutate }] = createResource<PostJson[]|HumanJson|RoomJson[]|WorkJson[]>(() => [], { initialValue: [] });
    const [error, setError] = createSignal<string | null>(null);
    const [Filetype, setFiletype] = createSignal<"human"|"posts"|"room"|"work"|null>(null);

    const handleFileChange = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        
        if (!file) {
            return;
        }
        
        switch (file.name) {
            case "human.json":
                setFiletype("human");
                break;
            case "posts.json":
                setFiletype("posts");
                break;
            case "room.json":
                setFiletype("room");
                break;
            case "work.json":
                setFiletype("work");
                break;
            default:
                setFiletype(null);
                break;}

        try {
            const text = await file.text();
            const json = JSON.parse(text);
            mutate(json);
            setError(null);
        } catch (e) {
            setError(`Failed to parse JSON: ${e instanceof Error ? e.message : String(e)}`);
            mutate([]);
        }
    };

    return (
        <div>
            <h1>クラスルームビューワー</h1>
            <p>クラスルームアーカイバーでアーカイブしたフォルダを選択してください</p>
            <div style="margin: 20px 0">
                <label for="json-file">選択してね: </label>
                {/* <input type="file" id="json-file" webkitdirectory onChange={handleFileChange}/>フォルダ読み込み... */}
                <input type="file" id="json-file" accept=".json" onChange={handleFileChange}/>
            </div>
            
            <Show when={data.loading}>
                <p>Loading data...</p>
            </Show>
            
            <Show when={error()}>
                <p style="color: red">Error: {error()}</p>
            </Show>
            
            <Show when={!data.loading && !error() && data()}>
                <Switch>
                    <Match when={Filetype() === "posts"}>
                        <For each={data() as PostJson[]}>{(post,i) => <Post post={post} data-index={i()}/>}</For>
                    </Match>
                    <Match when={Filetype() === "human"}>
                        <div>生徒数: {(data() as HumanJson)?.students?.length || 0} 人, 教員数: {(data() as HumanJson)?.teachers?.length || 0} 人</div>
                    </Match>
                    <Match when={Filetype() === "room"}>
                        <For each={data() as RoomJson[]}>{(room:RoomJson) => 
                            <div>クラス名: {room.name}, コード: {room.id}</div>}</For>
                    </Match>
                    <Match when={Filetype() === "work"}>
                        <For each={data() as WorkJson[]}>{(work:WorkJson, index) => <Work work={work} data-index={index()}/>}</For>
                    </Match>
                </Switch>
            </Show>
        </div>
    );
}