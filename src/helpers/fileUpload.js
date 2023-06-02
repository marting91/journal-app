
export const fileUpload = async ( file ) => {
  const cloudURL = import.meta.env.VITE_CLOUDINARY_URL;

  const formData = new FormData();
  formData.append('upload_preset', 'journal-app-react');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudURL, {
      method: 'POST',
      body: formData
    });

    if ( !resp.ok ) throw new Error( 'Problem uploading iamge' );

    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    throw new Error( error.message );
  }
}