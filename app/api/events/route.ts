export async function GET() {
  try {
    const response = await fetch(
      'https://app-cultural-606100971917.southamerica-east1.run.app/events',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      }
    )

    if (!response.ok) {
      return Response.json(
        { error: `Failed to fetch events: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=300',
      },
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return Response.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
