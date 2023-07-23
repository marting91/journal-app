import { fileUpload } from '../../src/helpers';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: process.env.SECURE
});

describe('Test in fileUpload', () => {

  test('Should upload the file to cloudinary', async () => {

    const imageUrl = 'https://th.bing.com/th/id/OIP.e7MNac6duhQDbljmy1a0BgAAAA?pid=ImgDet&rs=1';

    const resp = await fetch( imageUrl );
    const blob = await resp.blob();
    const file = new File( [blob], 'photo.jpg' );

    
    const { secure_url, public_id } = await fileUpload( file );
    expect( typeof secure_url ).toBe( 'string' );

    await cloudinary.api.delete_resources([ public_id ]);

  });

  test('Should throw an Error', async () => {

    const file = new File([], 'photo.jpg');
    // const url = await fileUpload( file );
    await expect( fileUpload( file ) ).rejects.toEqual( new Error( 'Problem uploading iamge' ) );
  });
});