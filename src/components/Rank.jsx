
export default async function Rank() {
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://pana-aprende.vercel.app/api";  
    const [ranking, setRanking] = useState([]);

    
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch(`${baseUrl}/users-scores`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRanking(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [baseUrl]);
    if (loading) return <div>Loading...</div>;
    return (
        <div class="flex justify-center flex-col items-center p-4 w-50">
            <div class="container flex flex-col items-center justify-center">
                <h2 class="text-2xl text-center font-bold mb-4">Ranking de Jugadores</h2>
                <table class="border border-gray-200 shadow-md">
                  <thead class=" bg-gray-100 text-gray-600">
                    <tr>
                        <th>{ranking[0].username}</th>
                      <th class="py-2 px-4 text-left">Nombre de usuario</th>
                      <th class="py-2 px-4 text-left">Total de puntos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.map((entry, index) => (
                      <tr class="border-b border-gray-200 ">
                        <td class="text-center">{index === 0 && (
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F7E300"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>
                                )}</td>
                        <td class="font-bold text-center uppercase py-2 px-4">
                            {entry.username}
                        </td>
                        <td class="font-bold text-center py-2 px-4">{entry.total_score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
      </div>
    )
}