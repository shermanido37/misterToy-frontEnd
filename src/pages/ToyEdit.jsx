export function ToyEdit(toyID){
    return(
        <section className="toy-edit">
            <form>                
                <input type="submit" value="Submit" />
            </form>
            <Link to='/toys'>Back to List</Link>
        </section>
    )
}