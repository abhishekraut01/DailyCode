import React from 'react'

interface SlideParams {
  params: {
    folderId: string[];
  };
}

export default async function Slide({ params }: SlideParams) {
  return (
    <div>
      hello
        {JSON.stringify(params.folderId)}
    </div>
  )
}
