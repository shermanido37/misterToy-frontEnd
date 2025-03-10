import { utilService } from "../services/util.service";

export function Home(){
    return (
        <section className="home">
            <h1>MisterToy</h1>
            {utilService.makeLorem()}
        </section>
    )
}