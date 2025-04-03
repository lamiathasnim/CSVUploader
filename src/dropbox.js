import { Dropbox } from 'dropbox';

// ✅ Bind fetch properly
const fetchFn = (...args) => fetch(...args);

const DROPBOX_ACCESS_TOKEN = "sl.u.AFpjbo7mNX6OA96LxXvMcHDjdg74Q6JiivR8ho0wHMsLYr0eN_nt1ZbYzRl3B5zZE-Y9mOajGQpMHLSYePnXLbU9PQTXBiQSGNzGiJaT_XwC3jIYuRM2KmrCJxUAUX8cCI43Kxm7iiP6COtuC6nTzR8Lw3fNpIKCg4uqXS0QT6nAhFljCpmxvLesZ3_YZpRTXMTTYhX_ajZ05CgKhl3bQxP62DthzWW4AkvgPyMGjYR21sHjmLV38DWKWiztSMm5_pjwp2dkkf3DjOXoRl0vtbcqGrwGb3sJTg8fEIed4Og7ZQtKYKcUbyQvITzCSALlHOxok8BXhhYFYQUyWQY9jRk9AloIsEZrWGYPZtpRxJiQzeJllOnJI7zbU4jFTuLEnJT1kCCySg8nnPBjdlSsWX8ChewQ0rZvGYjYKZn6HEs-BoD1yVjRGLgSxTu1-xPj9OiSezerdH9AF3X0oxw9SnDUB2aoG3wVjGEJj4-mlVnv0GzWVPzvyQa5X9n67ulc1EcuRb6hjP2vIWq3aJNLm_zcM_GljS0H3Cbkt062LLyT46RiD-q1Mux_NDNI-wRIF5Al5ADjF4aziBKArXPw-88GnD7LOpRqCJCdfWtBkgNx5isGN1yVxCBR79vmbS4aL6pfmqtwyCDENZC-xH4EU8wmMNRBV_rSzIoV-SbvTPVBf9N6LIdEf8zvMp2krAgc7dvcRWKcz2ytB33TiT_pFAOJjgIKpyizAUqjHcExZO_KebGVlqE4PvduXoZNjnpAGzxaprZHi8flBTrPfP8BjGtFFpzPbAW88c7-wOdVA13jatyDi5in5L0wa0HnYQInEGSg4JafX-WCA-rZLep8Z-6OKp_tTdZUHBO6TRxoLHCIevmJCkiOib68Ao6frcXHdrH_r65pvCkVzLBzWhhkiagFFzVrxcnF9XbnDgDbNef-jbsRddQWHMuQ-AiQObXaSYjT2SNqke87nyTarglnNcVbUY4cV2K8HoBLcYKxQMCB-XjD3UG2-PYB0rhT5y9NYK-A4sDsjx816lMG4eQB-mjpmVPlA1neueO7u2HOzvKuaTmqCu8WVOh5G-EJ2X6UYqt8d1nsL_CQYJ43pNJFxOL1V4rmf8b6SZM9sNtUIHqrUlfP6q-fv9IDiYkXZ-XvjkdEjNqTYuQO7x0YvwA8FswWRaI0wh8vGJhv4g30dlbpNosCk7dF2GdoXjZ4WT4YIfzYnBxkBMYEhWVgHiYaG50BIjWBcz0lsKGQCF31eWjrF7ZFqoyZMHl9I2-_oSAaQ1vvf8n_k8Vc0cxFQ8Vt5syFWIawdsCUym5RG_FZXv5JRv0zQPEQmWb86FLuNlhTXIaWaa6RoIkapeWyGkukIDSMoqUYEZjc1yYM1wk799uOPYE4uynflzrrtQZLENbKWXgj38mR14hLKKO1wJVFJpmQtJKoZlSoGaBAONfZqeL6f6JHNy1gWSE-grumTi9hFvW5r7xQ74v58eo_G6xNHQW7"; // 🔄 REPLACE WITH NEW TOKEN

const dbx = new Dropbox({
  accessToken: DROPBOX_ACCESS_TOKEN,
  fetch: fetchFn,
});

export const uploadFileToDropbox = async (file) => {
  try {
    // ✅ Convert file to Blob to avoid content encoding issues
    const blob = new Blob([file]);

    const response = await dbx.filesUpload({
      path: `/${file.name}`, // 🔄 Ensure correct Dropbox path
      contents: blob, // ✅ Use Blob instead of arrayBuffer()
      mode: 'add', // 'add' to avoid overwriting existing files
      autorename: true,
      mute: false,
    });

    console.log('✅ Upload successful:', response);
    return response;
  } catch (error) {
    console.error('❌ Upload failed:', error);
    
    if (error.status === 401) {
      console.error('🚨 401 Unauthorized: Check your Dropbox access token!');
    }

    throw error;
  }
};
