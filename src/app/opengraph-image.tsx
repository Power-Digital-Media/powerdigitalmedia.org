import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'Power Digital Media';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #000000, #111111)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
            }}
        >
             {/* Logo Placeholder */}
            <div style={{ fontSize: 60, fontWeight: 900, letterSpacing: '-0.05em' }}>
                POWER DIGITAL MEDIA
            </div>
        </div>
        <div style={{ fontSize: 30, color: '#4ade80', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Premium Production Studio
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
