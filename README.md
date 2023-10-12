# cloud-todo

With Cloud To-Do you can remember things you want to achieve and improve your productivity. It is a React JS based full stack application using Firestore and OAuth on Google Cloud Platform.

### Steps

1.  Create a new Project on [Google Cloud](https://console.cloud.google.com/projectcreate)
2.  Open Terminal and run -

```
git clone https://github.com/AKSHAYBHOPANI/cloud-todo
```

3. Open Cloud Shell Editor and Expand Cloud To Do
4. Replace **_cliendId_** in **/index.js** which you can get from OAuth Cloud Console API
5. Replace **_firebaseConfig_** in **src/firebase.js** with your config which you can get from creating a new project (When typing Project Name, your existing Google Cloud Project will auto appear. Use that to manage things in one place) in Firebase Console
6. Open Cloud Shell Terminal and run -

```
cd cloud-todo/
yarn install
yarn start (Optional - To Make and Test Local Changes inside GCP)
```

7. Deploy -

```
gcloud artifacts repositories create cloud-repo  --repository-format=docker --location=${REGION}
docker build -t gcr.io/${PROJECT_ID}/cloud-repo/cloud-todo .
docker push gcr.io/${PROJECT_ID}/cloud-repo/cloud-todo
gcloud run deploy cloud-todo \
         --image=gcr.io/${PROJECT_ID}/cloud-repo/cloud-todo
         --allow-unauthenticated \
         --region=${REGION} \
         --platform=managed

```

8. Copy the URL, Click on Edit Icon in Credentials Page under OAuth 2.0 Client IDs and paste the URL in Authorized JavaScript origins and Authorized redirect URI
9. Test - [Cloud Run Demo](https://mindful-cortex-391509.ey.r.appspot.com/)

In-Depth Step By Step Guide - [Read On Google Cloud Community](https://medium.com/google-cloud/building-a-cloud-to-do-react-js-app-on-google-cloud-ce88f2a2d3dc)

Like my work? [See More](https://akshaybhopani.github.io/portfolio/)
