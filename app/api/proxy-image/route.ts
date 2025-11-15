export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get('url')

  if (!imageUrl) {
    return new Response('URL de imagen no proporcionada', { status: 400 })
  }

  try {
    console.log('Proxy Image Request:', decodeURIComponent(imageUrl))
    
    const response = await fetch(decodeURIComponent(imageUrl), {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://storage.googleapis.com/',
        'Accept': 'image/*',
      },
    })

    if (!response.ok) {
      console.error('Image fetch failed:', response.status, response.statusText)
      return new Response('No se pudo obtener la imagen', { status: response.status })
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = await response.arrayBuffer()

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Error fetching image:', error)
    return new Response('Error al obtener la imagen', { status: 500 })
  }
}
