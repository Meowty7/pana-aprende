
function MyComponent( { level }: { level: number } ) {

    const query = new URLSearchParams(window.location.search);
    const id = query.get('userId');

    return (
        <>
            <a href={`/roulette/${level}?userId=${id}`} 
            className="inline-block py-2.5 px-5 text-base bg-blue-600 text-white no-underline rounded cursor-pointer text-center">
                JUGAR 
            </a>
        </>
    )
}

export default MyComponent;