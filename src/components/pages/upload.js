import React from 'react'
import TextEditorProvider from '../../context/textEditorContext'
import UploadVDModal from '../modal/uploadVDModal'

export default function UploadPage() {
  return (
    <TextEditorProvider>
        <UploadVDModal/>
    </TextEditorProvider>
  )
}
