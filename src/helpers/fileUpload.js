export const fileUpload = async ( file ) => {
  // const cloudURL = 'https://api.cloudinary.com/v1_1/dlon8gwl1/upload';
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

    const { secure_url, public_id } = await resp.json();

    return {
      secure_url,
      public_id
    };
  } catch (error) {
    throw new Error( error.message );
  }
}